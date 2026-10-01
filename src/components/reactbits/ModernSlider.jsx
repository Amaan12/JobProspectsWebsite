import React from 'react';

/**
 * Precision Minimalist Slider
 * Engineered with smooth geometry, responsive styling, and dynamic theme accent color.
 */
export default function ModernSlider({ 
  label, 
  sublabel, 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  icon: Icon,
  accentHex = "#10b981",
  isDark = true
}) {
  const percentage = Math.round(((value - min) / (max - min)) * 100);

  return (
    <div className={`space-y-3 p-4 rounded-2xl border transition-colors ${
      isDark 
        ? 'bg-[#0f1118]/80 border-white/[0.08] hover:border-white/20' 
        : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          {Icon && (
            <div 
              className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors"
              style={{ backgroundColor: `${accentHex}18`, color: accentHex }}
            >
              <Icon className="w-3.5 h-3.5" />
            </div>
          )}
          <span className={`text-xs font-medium tracking-tight ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            {label}
          </span>
        </div>
        <div 
          className="px-2 py-0.5 rounded-md text-xs font-mono font-medium transition-colors"
          style={{ 
            backgroundColor: `${accentHex}18`, 
            color: accentHex,
            border: `1px solid ${accentHex}40`
          }}
        >
          {value}%
        </div>
      </div>

      {/* Track & Input */}
      <div className="relative pt-1 pb-1">
        <div className={`absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 rounded-full overflow-hidden pointer-events-none ${
          isDark ? 'bg-slate-800' : 'bg-slate-200'
        }`}>
          <div 
            className="h-full rounded-full transition-all duration-75"
            style={{ width: `${percentage}%`, backgroundColor: accentHex }}
          />
        </div>

        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full relative z-10 opacity-0 cursor-pointer h-5"
        />

        <div 
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 rounded-full bg-white shadow-md transition-all duration-75 -ml-2"
          style={{ 
            left: `${percentage}%`,
            border: `2px solid ${accentHex}`
          }}
        />
      </div>

      {sublabel && (
        <p className={`text-[11px] font-light leading-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {sublabel}
        </p>
      )}
    </div>
  );
}
