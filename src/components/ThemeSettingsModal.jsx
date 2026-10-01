import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Moon, Sun, Sparkles, Sliders, Check, Compass } from 'lucide-react';

export const THEME_PRESETS = [
  { id: 'emerald', name: 'Emerald', hex: '#10b981', rgb: [0.063, 0.725, 0.505] },
  { id: 'cyan', name: 'Cyan', hex: '#06b6d4', rgb: [0.024, 0.714, 0.831] },
  { id: 'violet', name: 'Violet', hex: '#8b5cf6', rgb: [0.545, 0.361, 0.965] },
  { id: 'blue', name: 'Cobalt', hex: '#3b82f6', rgb: [0.231, 0.510, 0.965] },
  { id: 'amber', name: 'Amber', hex: '#f59e0b', rgb: [0.961, 0.620, 0.043] },
];

export default function ThemeSettingsModal({
  isOpen,
  onClose,
  isDark,
  setIsDark,
  activeTheme,
  setActiveTheme,
  effects,
  setEffects,
  sideRaysConfig,
  setSideRaysConfig
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window: Translucent with blur */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full max-w-md p-6 rounded-3xl shadow-2xl border z-10 space-y-6 max-h-[90vh] overflow-y-auto ${
            isDark 
              ? 'bg-[#0b0e17]/80 backdrop-blur-3xl border-white/[0.12] text-white shadow-black/80' 
              : 'bg-white/85 backdrop-blur-3xl border-slate-200/80 text-slate-900 shadow-slate-300/40'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 opacity-70" />
              <h3 className="font-heading font-medium text-base tracking-tight">Appearance & Themes</h3>
            </div>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                isDark ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 1. Mode: Dark vs Light */}
          <div className="space-y-2.5">
            <span className="text-xs uppercase font-mono tracking-widest opacity-60">Color Mode</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsDark(true)}
                className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border text-xs font-normal transition cursor-pointer ${
                  isDark
                    ? 'border-white/20 bg-white/10 text-white shadow-sm font-medium'
                    : 'border-transparent text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Dark Mode</span>
              </button>

              <button
                type="button"
                onClick={() => setIsDark(false)}
                className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border text-xs font-normal transition cursor-pointer ${
                  !isDark
                    ? 'border-slate-300 bg-slate-100 text-slate-900 shadow-sm font-medium'
                    : 'border-transparent text-slate-400 hover:bg-white/5'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Light Mode</span>
              </button>
            </div>
          </div>

          {/* 2. Accent Color Palette */}
          <div className="space-y-2.5">
            <span className="text-xs uppercase font-mono tracking-widest opacity-60">Accent Color</span>
            <div className="grid grid-cols-5 gap-2">
              {THEME_PRESETS.map((t) => {
                const isSelected = activeTheme.id === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTheme(t)}
                    className="flex flex-col items-center space-y-1.5 p-2 rounded-xl transition cursor-pointer hover:scale-105"
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center transition shadow-md"
                      style={{ 
                        backgroundColor: t.hex,
                        boxShadow: isSelected ? `0 0 14px ${t.hex}80` : 'none'
                      }}
                    >
                      {isSelected && <Check className="w-4 h-4 text-black stroke-[3]" />}
                    </div>
                    <span className="text-[10px] font-mono opacity-80">{t.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. NEW HEADER: Side Rays Settings */}
          {sideRaysConfig && setSideRaysConfig && (
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Compass className="w-4 h-4" style={{ color: activeTheme.hex }} />
                  <span className="text-xs uppercase font-mono tracking-widest font-medium">Side Rays Background</span>
                </div>
                <span 
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                  style={{ 
                    backgroundColor: `${activeTheme.hex}15`, 
                    color: activeTheme.hex,
                    borderColor: `${activeTheme.hex}35`
                  }}
                >
                  ReactBits
                </span>
              </div>

              {/* Enable Toggle */}
              <label className="flex items-center justify-between cursor-pointer py-1 text-xs">
                <span>Enable Side Rays</span>
                <input
                  type="checkbox"
                  checked={sideRaysConfig.enabled}
                  onChange={(e) => setSideRaysConfig(prev => ({ ...prev, enabled: e.target.checked }))}
                  className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
                />
              </label>

              {sideRaysConfig.enabled && (
                <div className="space-y-3 pt-1 text-xs">
                  {/* Origin */}
                  <div>
                    <span className="text-[11px] opacity-70 block mb-1.5 font-light">Origin Direction</span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {['top-right', 'top-left', 'bottom-right', 'bottom-left'].map((orig) => {
                        const isSel = sideRaysConfig.origin === orig;
                        return (
                          <button
                            key={orig}
                            type="button"
                            onClick={() => setSideRaysConfig(prev => ({ ...prev, origin: orig }))}
                            className={`py-1.5 px-2 rounded-xl text-[10px] font-mono capitalize border transition cursor-pointer text-center ${
                              isSel
                                ? 'border-white/30 bg-white/20 text-white font-medium shadow-sm'
                                : isDark 
                                  ? 'border-white/5 bg-white/5 text-slate-400 hover:bg-white/10'
                                  : 'border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                            style={isSel ? { borderColor: activeTheme.hex, color: activeTheme.hex } : {}}
                          >
                            {orig.replace('-', ' ')}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ray Color Presets */}
                  <div>
                    <span className="text-[11px] opacity-70 block mb-1.5 font-light">Color Scheme</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSideRaysConfig(prev => ({ ...prev, rayColor1: '#EAB308', rayColor2: '#96c8ff' }))}
                        className={`py-1.5 px-3 rounded-xl border text-[11px] font-light flex items-center justify-between transition cursor-pointer ${
                          sideRaysConfig.rayColor1 === '#EAB308' && sideRaysConfig.rayColor2 === '#96c8ff'
                            ? 'border-white/30 bg-white/15 text-white shadow-sm'
                            : isDark ? 'border-white/5 bg-white/5 text-slate-400 hover:bg-white/10' : 'border-slate-200 bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span>Gold & Ice Blue</span>
                        <div className="flex -space-x-1">
                          <span className="w-3 h-3 rounded-full bg-[#EAB308] border border-black/40" />
                          <span className="w-3 h-3 rounded-full bg-[#96c8ff] border border-black/40" />
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSideRaysConfig(prev => ({ ...prev, rayColor1: activeTheme.hex, rayColor2: '#96c8ff' }))}
                        className={`py-1.5 px-3 rounded-xl border text-[11px] font-light flex items-center justify-between transition cursor-pointer ${
                          sideRaysConfig.rayColor1 === activeTheme.hex
                            ? 'border-white/30 bg-white/15 text-white shadow-sm'
                            : isDark ? 'border-white/5 bg-white/5 text-slate-400 hover:bg-white/10' : 'border-slate-200 bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span>Theme Accent</span>
                        <div className="flex -space-x-1">
                          <span className="w-3 h-3 rounded-full border border-black/40" style={{ backgroundColor: activeTheme.hex }} />
                          <span className="w-3 h-3 rounded-full bg-[#96c8ff] border border-black/40" />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Sliders: Intensity & Speed */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1 font-light opacity-80">
                        <span>Intensity</span>
                        <span className="font-mono">{sideRaysConfig.intensity}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="4.0"
                        step="0.1"
                        value={sideRaysConfig.intensity}
                        onChange={(e) => setSideRaysConfig(prev => ({ ...prev, intensity: parseFloat(e.target.value) }))}
                        className="w-full h-1.5 bg-slate-700/50 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1 font-light opacity-80">
                        <span>Speed</span>
                        <span className="font-mono">{sideRaysConfig.speed}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="5.0"
                        step="0.5"
                        value={sideRaysConfig.speed}
                        onChange={(e) => setSideRaysConfig(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                        className="w-full h-1.5 bg-slate-700/50 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. Micro-Interactions & Physics */}
          <div className="space-y-2.5 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono tracking-widest opacity-60">Physics & Micro-Effects</span>
              <Sparkles className="w-3.5 h-3.5 opacity-50" />
            </div>

            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between cursor-pointer py-1">
                <span>Hero Floating Particles</span>
                <input
                  type="checkbox"
                  checked={effects.particles}
                  onChange={(e) => setEffects(prev => ({ ...prev, particles: e.target.checked }))}
                  className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer py-1">
                <span>Interactive 3D Card Tilt</span>
                <input
                  type="checkbox"
                  checked={effects.tilt}
                  onChange={(e) => setEffects(prev => ({ ...prev, tilt: e.target.checked }))}
                  className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer py-1">
                <span>Mouse Spotlight Glare</span>
                <input
                  type="checkbox"
                  checked={effects.spotlight}
                  onChange={(e) => setEffects(prev => ({ ...prev, spotlight: e.target.checked }))}
                  className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Done Button */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl font-medium text-xs transition cursor-pointer text-white shadow-lg"
              style={{ backgroundColor: activeTheme.hex }}
            >
              Apply & Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
