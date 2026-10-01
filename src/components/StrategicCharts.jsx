import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Award, ShieldCheck, TrendingUp } from 'lucide-react';

/**
 * Analytics Section Component (Replaces Strategic Quadrant with clear ROI & Speed Analytics)
 */
export default function StrategicCharts({ 
  careers, 
  onSelectCareer,
  accentHex = "#10b981",
  isDark = true 
}) {
  // Sorted top salary subset
  const topSalaryCareers = [...careers]
    .sort((a, b) => b.compMedianLPA - a.compMedianLPA)
    .slice(0, 6);

  // Fastest gateways (shortest prep time with good pay)
  const fastestGateways = [...careers]
    .sort((a, b) => a.transitionMonths - b.transitionMonths || b.fitScore - a.fitScore)
    .slice(0, 6);

  const cardBg = isDark 
    ? 'bg-[#0e121d]/45 backdrop-blur-2xl border-white/[0.10] shadow-2xl shadow-black/40' 
    : 'bg-white/60 backdrop-blur-2xl border-slate-200/80 shadow-xl shadow-slate-200/30';
  const itemBg = isDark 
    ? 'bg-white/[0.03] backdrop-blur-xl border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06]' 
    : 'bg-white/50 backdrop-blur-xl border-slate-200/70 hover:border-slate-300 hover:bg-white/70 shadow-sm';
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* 1. Top Salary Ceilings */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between space-y-6 ${cardBg}`}>
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" style={{ color: accentHex }} />
              <h3 className={`font-heading font-medium text-lg sm:text-xl tracking-tight ${textPrimary}`}>
                Highest Average Salary Ceilings
              </h3>
            </div>
            <span 
              className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full"
              style={{ 
                backgroundColor: `${accentHex}18`, 
                color: accentHex,
                border: `1px solid ${accentHex}40`
              }}
            >
              Top Compensation
            </span>
          </div>
          <p className={`text-sm font-light leading-relaxed ${textSecondary}`}>
            The highest-earning degree-accessible roles in Mumbai, ranked by median starting compensation.
          </p>
        </div>

        <div className="space-y-3">
          {topSalaryCareers.map((c) => (
            <motion.div 
              key={c.id} 
              whileHover={{ y: -2, scale: 1.005 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelectCareer(c)}
              className={`p-3.5 rounded-2xl border transition cursor-pointer group ${itemBg}`}
            >
              <div className="flex items-center justify-between text-sm mb-2">
                <span className={`font-medium transition group-hover:opacity-100 ${textPrimary}`}>
                  {c.title}
                </span>
                <span className="font-mono font-semibold tabular-nums ml-2 whitespace-nowrap" style={{ color: accentHex }}>
                  {c.compMedianLPA} LPA
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs font-mono opacity-80">
                <div className={`flex-1 rounded-full h-1.5 overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(c.compMedianLPA / 16) * 100}%` }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: accentHex }}
                  />
                </div>
                <span className="w-16 text-right tabular-nums text-[11px] opacity-75">{c.transitionMonths} months</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. Fastest Transition Gateways */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between space-y-6 ${cardBg}`}>
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" style={{ color: accentHex }} />
              <h3 className={`font-heading font-medium text-lg sm:text-xl tracking-tight ${textPrimary}`}>
                Fastest Transition Gateways
              </h3>
            </div>
            <span 
              className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full"
              style={{ 
                backgroundColor: `${accentHex}18`, 
                color: accentHex,
                border: `1px solid ${accentHex}40`
              }}
            >
              Quickest ROI
            </span>
          </div>
          <p className={`text-sm font-light leading-relaxed ${textSecondary}`}>
            Roles with the shortest preparation runway (3 to 5 months) to start earning commercial pay.
          </p>
        </div>

        <div className="space-y-3">
          {fastestGateways.map((c) => (
            <motion.div 
              key={c.id} 
              whileHover={{ y: -2, scale: 1.005 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelectCareer(c)}
              className={`p-3.5 rounded-2xl border transition cursor-pointer group ${itemBg}`}
            >
              <div className="flex items-center justify-between text-sm mb-2">
                <span className={`font-medium transition group-hover:opacity-100 ${textPrimary}`}>
                  {c.title}
                </span>
                <span className="font-mono font-semibold tabular-nums ml-2 whitespace-nowrap" style={{ color: accentHex }}>
                  {c.transitionMonths} months
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs font-mono opacity-80">
                <div className={`flex-1 rounded-full h-1.5 overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.max(15, 100 - (c.transitionMonths / 12) * 100)}%` }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: accentHex }}
                  />
                </div>
                <span className="w-16 text-right tabular-nums text-[11px] opacity-75 font-semibold" style={{ color: accentHex }}>
                  {c.compMedianLPA} LPA
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
