import React, { useEffect, useRef } from 'react';

/**
 * Minimalist WebGL Shader Background
 * Fluidly adapts to user-selected Theme Accent (Emerald, Cyan, Violet, Blue, Amber)
 * and Light vs Dark mode.
 */
export default function ShaderBackground({ 
  className = "", 
  theme = { rgb: [0.063, 0.725, 0.505] }, 
  isDark = true,
  enabled = true 
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    let animationFrameId;

    // Vertex shader
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Dynamic fragment shader with uniform accent color
    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_accent;
      uniform float u_is_dark;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        uv.y = 1.0 - uv.y;

        float t = u_time * 0.12;
        float wave1 = sin(uv.x * 2.2 + t) * cos(uv.y * 1.6 + t * 0.7);
        float wave2 = sin(uv.y * 2.5 - t * 0.6) * cos(uv.x * 1.8 + t);
        float blend = (wave1 + wave2) * 0.5 + 0.5;

        vec3 base;
        vec3 glow;

        if (u_is_dark > 0.5) {
          // Dark Mode palette
          base = vec3(0.031, 0.035, 0.045); // #08090d
          glow = mix(base, u_accent, 0.12);
        } else {
          // Light Mode palette
          base = vec3(0.97, 0.98, 0.995); // soft light slate
          glow = mix(base, u_accent, 0.06);
        }

        vec3 color = mix(base, glow, blend * 0.55);

        // Soft vignette
        float vignette = uv.x * (1.0 - uv.x) * uv.y * (1.0 - uv.y) * 16.0;
        vignette = clamp(pow(vignette, 0.25), 0.0, 1.0);

        if (u_is_dark > 0.5) {
          color *= (0.82 + 0.18 * vignette);
        }

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const createShader = (gl, type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const accentLocation = gl.getUniformLocation(program, 'u_accent');
    const isDarkLocation = gl.getUniformLocation(program, 'u_is_dark');

    const resize = () => {
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    let startTime = performance.now();

    const render = (now) => {
      const time = (now - startTime) * 0.001;
      resize();

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time);
      gl.uniform3f(accentLocation, theme.rgb[0], theme.rgb[1], theme.rgb[2]);
      gl.uniform1f(isDarkLocation, isDark ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
    };
  }, [theme, isDark, enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none -z-10 w-full h-full ${className}`}
    />
  );
}
