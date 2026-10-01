import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedTabs component
 * High-end segmented control with dynamic theme accent highlighting.
 */
export default function AnimatedTabs({ 
  tabs, 
  activeTab, 
  onChange, 
  className = "",
  accentHex = "#10b981",
  isDark = true
}) {
  return (
    <div className={`inline-flex items-center rounded-2xl p-1 border backdrop-blur-md overflow-x-auto max-w-full ${
      isDark ? 'bg-[#0f1118]/80 border-white/[0.08]' : 'bg-slate-100/90 border-slate-200 shadow-sm'
    } ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative px-4 py-2 text-xs font-normal tracking-wide rounded-xl transition-colors duration-150 cursor-pointer select-none whitespace-nowrap ${
              isActive 
                ? (isDark ? "text-white font-medium" : "text-slate-900 font-medium") 
                : (isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-900")
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 rounded-xl shadow-sm"
                style={{ 
                  backgroundColor: isDark ? `${accentHex}22` : `${accentHex}22`,
                  border: `1px solid ${accentHex}50`
                }}
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center space-x-2">
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span 
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                    isActive 
                      ? "text-white" 
                      : (isDark ? "bg-white/5 text-slate-400" : "bg-slate-200 text-slate-600")
                  }`}
                  style={isActive ? { backgroundColor: accentHex } : undefined}
                >
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
