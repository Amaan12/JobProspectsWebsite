import React, { useEffect, useState } from 'react';

/**
 * SideScrollProgress Component
 * Floating vertical navigation and reading progress tracker inspired by reactbits.dev & react.dev.
 * Tracks active section dynamically and allows 1-click smooth jump.
 */
export default function SideScrollProgress({
  sections = [
    { id: 'executive-memo', label: 'Overview' },
    { id: 'ultimate-matrix', label: 'Matrix' },
    { id: 'visual-analytics', label: 'Analytics' },
    { id: 'fit-simulator', label: 'Simulator' },
    { id: 'execution-roadmap', label: 'Roadmap' },
  ],
  accentHex = '#10b981',
  isDark = true,
}) {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Overall scroll percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100)));
      }

      // 2. Active Section Detection
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside 
      aria-label="Section Navigation"
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end select-none pointer-events-auto"
    >
      <div className={`p-2.5 rounded-2xl border backdrop-blur-xl shadow-2xl flex flex-col items-center space-y-4 relative ${
        isDark 
          ? 'bg-[#0f1118]/85 border-white/10 shadow-black/80' 
          : 'bg-white/90 border-slate-200 shadow-slate-300/60'
      }`}>
        
        {/* Background Vertical Progress Track */}
        <div className={`absolute top-4 bottom-4 w-0.5 rounded-full pointer-events-none ${
          isDark ? 'bg-white/10' : 'bg-slate-200'
        }`}>
          <div 
            className="w-full rounded-full transition-all duration-150"
            style={{ 
              height: `${scrollProgress}%`, 
              backgroundColor: accentHex 
            }}
          />
        </div>

        {/* Section Dots */}
        {sections.map((section, idx) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none cursor-pointer z-10"
              aria-label={`Jump to ${section.label}`}
            >
              {/* Tooltip on hover */}
              <div 
                className={`absolute right-8 px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none transform translate-x-2 group-hover:translate-x-0 shadow-lg border ${
                  isDark 
                    ? 'bg-[#0f1118] text-white border-white/15' 
                    : 'bg-white text-slate-800 border-slate-200'
                }`}
              >
                <span className="font-semibold" style={{ color: accentHex }}>0{idx + 1}.</span> {section.label}
              </div>

              {/* Indicator Dot */}
              <div 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  isActive 
                    ? 'scale-125 shadow-md' 
                    : (isDark ? 'bg-white/20 group-hover:bg-white/50' : 'bg-slate-300 group-hover:bg-slate-500')
                }`}
                style={isActive ? { 
                  backgroundColor: accentHex,
                  boxShadow: `0 0 10px ${accentHex}90`
                } : undefined}
              />
            </button>
          );
        })}

        {/* Percentage label at bottom */}
        <div className={`text-[9px] font-mono pt-1 tabular-nums ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {Math.round(scrollProgress)}%
        </div>

      </div>
    </aside>
  );
}
