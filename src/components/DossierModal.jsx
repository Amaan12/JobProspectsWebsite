import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, Shield, Zap, Building2, GraduationCap } from 'lucide-react';

export default function DossierModal({ career, onClose, accentHex = "#10b981", isDark = true }) {
  if (!career) return null;

  const modalBg = isDark 
    ? 'bg-[#0f1118]/75 backdrop-blur-3xl border-white/[0.12] text-slate-200 shadow-2xl shadow-black/80' 
    : 'bg-white/80 backdrop-blur-3xl border-slate-200/80 text-slate-800 shadow-2xl shadow-slate-300/50';
  const cardBg = isDark 
    ? 'bg-white/[0.03] backdrop-blur-xl border-white/[0.08]' 
    : 'bg-white/50 backdrop-blur-xl border-slate-200/70 shadow-sm';
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.18 }}
          className={`relative w-full max-w-3xl rounded-3xl border p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-6 text-left font-light ${modalBg}`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-6 right-6 p-2 rounded-xl transition cursor-pointer ${
              isDark ? 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10' : 'bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="space-y-2 border-b border-white/10 pb-5 pr-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span 
                className="px-2.5 py-0.5 rounded-full font-medium"
                style={{ 
                  backgroundColor: `${accentHex}18`, 
                  color: accentHex,
                  border: `1px solid ${accentHex}40`
                }}
              >
                {career.tier}
              </span>
              <span className="opacity-40">•</span>
              <span className="font-semibold" style={{ color: accentHex }}>
                {career.compMedianLPA} LPA Average
              </span>
              <span className="opacity-40">•</span>
              <span className="opacity-80">{career.transitionMonths} months prep</span>
              <span className="opacity-40">•</span>
              <span className="font-medium opacity-90">{career.fitScore}% Fit</span>
            </div>
            <h3 className={`text-2xl sm:text-3xl font-normal font-heading tracking-tight ${textPrimary}`}>{career.title}</h3>
            <p className={`text-xs sm:text-sm leading-relaxed font-light ${textSecondary}`}>{career.summary}</p>
          </div>

          {/* Degree Requirement & Family Proof Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className={`p-4 rounded-2xl border space-y-1 ${cardBg}`}>
              <div className="flex items-center space-x-1.5 text-xs font-medium" style={{ color: accentHex }}>
                <GraduationCap className="w-4 h-4" />
                <span>Degree Requirement</span>
              </div>
              <p className={`text-xs font-light ${textPrimary}`}>{career.degreeRequirement || "None (Portfolio / Practical Testing)"}</p>
            </div>

            <div className={`sm:col-span-2 p-4 rounded-2xl border space-y-1 ${cardBg}`}>
              <div className="flex items-center space-x-1.5 text-xs font-medium" style={{ color: accentHex }}>
                <ShieldCheck className="w-4 h-4" />
                <span>Family Reassurance Proof Point</span>
              </div>
              <p className={`text-xs font-light leading-relaxed ${textSecondary}`}>{career.familyProofPoint}</p>
            </div>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            
            {/* Col 1: Transferable & Gaps */}
            <div className="space-y-5">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-mono flex items-center space-x-1.5 mb-2.5" style={{ color: accentHex }}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Direct Transferable Skills</span>
                </h4>
                <ul className={`space-y-1.5 text-xs font-light ${textSecondary}`}>
                  {career.transferableSkills.map((skill, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="font-bold" style={{ color: accentHex }}>•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-mono flex items-center space-x-1.5 mb-2.5 opacity-80">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Skills to Acquire</span>
                </h4>
                <ul className={`space-y-1.5 text-xs font-light ${textSecondary}`}>
                  {career.skillGaps.map((gap, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="opacity-60">•</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Col 2: Moat, Hiring Companies & Action Plan */}
            <div className="space-y-5">
              <div className={`p-4 rounded-2xl border space-y-1.5 ${cardBg}`}>
                <h4 className="text-xs uppercase tracking-wider font-mono flex items-center space-x-1.5" style={{ color: accentHex }}>
                  <Shield className="w-4 h-4" />
                  <span>The Anti-AI Defense Moat</span>
                </h4>
                <p className={`text-xs leading-relaxed font-light ${textSecondary}`}>
                  {career.humanMoat}
                </p>
              </div>

              {career.targetIndustriesMumbai && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-mono flex items-center space-x-1.5 mb-2 opacity-80">
                    <Building2 className="w-4 h-4" />
                    <span>Target Employers</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {career.targetIndustriesMumbai.map((ind, idx) => (
                      <span key={idx} className={`px-2.5 py-1 rounded-lg border text-[11px] font-light ${cardBg}`}>
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className={`p-4 rounded-2xl border space-y-1.5 ${cardBg}`}>
                <h4 className="text-xs uppercase tracking-wider font-mono flex items-center space-x-1.5" style={{ color: accentHex }}>
                  <Zap className="w-4 h-4" />
                  <span>Milestone Progression</span>
                </h4>
                <ul className={`space-y-1 text-xs font-light ${textSecondary}`}>
                  {career.actionPlan.map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span style={{ color: accentHex }}>›</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl text-xs font-medium transition cursor-pointer text-white shadow-md"
              style={{ backgroundColor: accentHex }}
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
