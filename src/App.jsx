import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CAREER_DATA,
  SECTORS
} from './data/careerData';

// ReactBits Suite
import SideRays from './components/reactbits/SideRays';
import ParticlesBackground from './components/reactbits/ParticlesBackground';
import SpotlightCard from './components/reactbits/SpotlightCard';
import TiltedCard from './components/reactbits/TiltedCard';
import AnimatedTabs from './components/reactbits/AnimatedTabs';
import ModernSlider from './components/reactbits/ModernSlider';

import StrategicCharts from './components/StrategicCharts';
import DossierModal from './components/DossierModal';
import ThemeSettingsModal, { THEME_PRESETS } from './components/ThemeSettingsModal';

import { 
  Printer, 
  Search, 
  ArrowUpDown, 
  ChevronRight, 
  Boxes,
  Activity,
  Binary,
  Sprout,
  Laptop,
  Cpu,
  Compass,
  Sparkles,
  SlidersHorizontal,
  Layers,
  ShieldAlert,
  Network,
  Briefcase
} from 'lucide-react';

export default function App() {
  // Theme & Appearance State
  const [isDark, setIsDark] = useState(true);
  const [activeTheme, setActiveTheme] = useState(THEME_PRESETS[0]); // Emerald default
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [effects, setEffects] = useState({
    particles: true,
    tilt: true,
    spotlight: true,
  });

  const [sideRaysConfig, setSideRaysConfig] = useState({
    enabled: true,
    speed: 2.5,
    rayColor1: '#EAB308',
    rayColor2: '#96c8ff',
    intensity: 3.0,
    spread: 2,
    origin: 'top-right',
    tilt: 0,
    saturation: 1.5,
    blend: 0.75,
    falloff: 1.6,
    opacity: 1.0,
  });

  // Synchronize document colorScheme & html/body styling for scrollbars and system theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.style.colorScheme = 'dark';
      document.body.style.backgroundColor = '#08090d';
      document.body.style.color = '#f1f5f9';
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    }
  }, [isDark]);

  // Track scroll for dynamic top bar transitions
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Table & Filter State
  const [selectedSector, setSelectedSector] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('fitScore');
  const [sortAsc, setSortAsc] = useState(false);
  const [activeCareer, setActiveCareer] = useState(null);

  // Dynamic Fit Simulator Weights
  const [simWeights, setSimWeights] = useState({
    vrSimulation: 90,
    spatialMath: 85,
    physicalMoat: 80,
    dataPlumbing: 65,
  });

  // Filtered & Sorted Careers
  const filteredCareers = useMemo(() => {
    let list = CAREER_DATA.filter(item => {
      const matchesSector = selectedSector === 'all' || item.category === selectedSector;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.humanMoat.toLowerCase().includes(q) ||
        item.domain.toLowerCase().includes(q) ||
        (item.tag && item.tag.toLowerCase().includes(q));

      return matchesSector && matchesSearch;
    });

    return list.sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (sortAsc) {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });
  }, [selectedSector, searchQuery, sortKey, sortAsc]);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(key === 'aiRisk' || key === 'transitionMonths');
    }
  };

  // Dynamic Top Recommendations from Simulator
  const topSimMatches = useMemo(() => {
    return CAREER_DATA.map(c => {
      let score = 50;

      if (c.id === 'enterprise-xr-sim') {
        score = (simWeights.vrSimulation * 0.45) + (simWeights.spatialMath * 0.35) + (simWeights.physicalMoat * 0.20);
      } else if (c.id === 'industrial-digital-twins') {
        score = (simWeights.vrSimulation * 0.35) + (simWeights.spatialMath * 0.40) + (simWeights.dataPlumbing * 0.25);
      } else if (c.id === 'cyber-offensive-bounty' || c.category === 'cyber') {
        score = (simWeights.dataPlumbing * 0.45) + (simWeights.spatialMath * 0.35) + (simWeights.physicalMoat * 0.20);
      } else if (c.id === 'redevelopment-society-liaison' || c.category === 'realestate') {
        score = (simWeights.physicalMoat * 0.55) + (simWeights.spatialMath * 0.30) + (simWeights.dataPlumbing * 0.15);
      } else if (c.id === 'drone-photogrammetry-lead') {
        score = (simWeights.physicalMoat * 0.50) + (simWeights.spatialMath * 0.30) + (simWeights.vrSimulation * 0.20);
      } else if (c.id === 'smart-agriculture-hydroponics') {
        score = (simWeights.physicalMoat * 0.70) + (simWeights.spatialMath * 0.15) + (simWeights.dataPlumbing * 0.15);
      } else if (c.id === 'independent-market-trader') {
        score = (simWeights.spatialMath * 0.50) + (simWeights.dataPlumbing * 0.35) + (simWeights.physicalMoat * 0.15);
      } else if (c.id === 'culinary-cloud-kitchen-ops') {
        score = (simWeights.physicalMoat * 0.75) + (simWeights.spatialMath * 0.15) + (simWeights.dataPlumbing * 0.10);
      } else if (c.id === 'smarthome-iot-integrator') {
        score = (simWeights.physicalMoat * 0.60) + (simWeights.spatialMath * 0.20) + (simWeights.dataPlumbing * 0.20);
      } else if (c.id === 'data-engineering') {
        score = (simWeights.dataPlumbing * 0.60) + (simWeights.spatialMath * 0.25) + (simWeights.physicalMoat * 0.15);
      } else if (c.id === 'software-game-qa') {
        score = (simWeights.vrSimulation * 0.40) + (simWeights.dataPlumbing * 0.30) + (simWeights.spatialMath * 0.30);
      } else if (c.id === 'cctv-physical-security') {
        score = (simWeights.physicalMoat * 0.70) + (simWeights.dataPlumbing * 0.30);
      } else {
        score = (simWeights.spatialMath * 0.3) + (simWeights.physicalMoat * 0.3) + (simWeights.vrSimulation * 0.2) + (simWeights.dataPlumbing * 0.2);
      }

      const normalized = Math.min(99, Math.max(30, Math.round(score)));
      return { ...c, simScore: normalized };
    }).sort((a, b) => b.simScore - a.simScore).slice(0, 4);
  }, [simWeights]);

  const sectorTabs = useMemo(() => {
    return SECTORS.map(s => ({
      id: s.id,
      label: s.label,
      count: s.id === 'all' ? CAREER_DATA.length : CAREER_DATA.filter(c => c.category === s.id).length
    }));
  }, []);

  const navSections = [
    { id: 'executive-memo', label: 'Overview' },
    { id: 'ultimate-matrix', label: 'Matrix' },
    { id: 'visual-analytics', label: 'Analytics' },
    { id: 'fit-simulator', label: 'Simulator' },
    { id: 'execution-roadmap', label: 'Roadmap' },
  ];

  // Theme-aware styles with translucent glassmorphic blur
  const pageBg = isDark ? 'bg-[#08090d] text-slate-100' : 'bg-[#f8fafc] text-slate-900';
  const headerBg = isDark ? 'bg-[#08090d]/60 backdrop-blur-2xl border-white/[0.08]' : 'bg-white/65 backdrop-blur-2xl border-slate-200 shadow-sm';
  const cardBg = isDark 
    ? 'bg-[#0e121d]/45 backdrop-blur-2xl border-white/[0.10] shadow-2xl shadow-black/40' 
    : 'bg-white/60 backdrop-blur-2xl border-slate-200/80 shadow-xl shadow-slate-200/30';
  const innerCardBg = isDark 
    ? 'bg-white/[0.03] backdrop-blur-xl border-white/[0.08] hover:border-white/20' 
    : 'bg-white/50 backdrop-blur-xl border-slate-200/70 shadow-sm hover:border-slate-300';
  const textTitle = isDark ? 'text-white' : 'text-slate-900';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-600';
  const textBody = isDark ? 'text-slate-300' : 'text-slate-700';
  const dividerColor = isDark ? 'border-white/10' : 'border-slate-200';

  // Smooth Reveal / Dereveal motion variants
  const sectionAnimation = {
    hidden: { 
      opacity: 0, 
      y: 32, 
      scale: 0.988,
      transition: { 
        duration: 0.45, 
        ease: [0.16, 1, 0.3, 1] 
      }
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  const staggerGridAnimation = {
    hidden: { 
      opacity: 0,
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1
      }
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const cardItemAnimation = {
    hidden: { 
      opacity: 0, 
      y: 18, 
      scale: 0.988,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.55, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <div className={`min-h-screen ${pageBg} antialiased selection:bg-slate-300 selection:text-black font-sans font-light relative transition-colors duration-200`}>
      
      {/* 1. Official ReactBits Side Rays Background (https://reactbits.dev/backgrounds/side-rays) */}
      {sideRaysConfig.enabled && (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <SideRays
            speed={sideRaysConfig.speed}
            rayColor1={sideRaysConfig.rayColor1}
            rayColor2={sideRaysConfig.rayColor2}
            intensity={sideRaysConfig.intensity}
            spread={sideRaysConfig.spread}
            origin={sideRaysConfig.origin}
            tilt={sideRaysConfig.tilt}
            saturation={sideRaysConfig.saturation}
            blend={sideRaysConfig.blend}
            falloff={sideRaysConfig.falloff}
            opacity={sideRaysConfig.opacity}
          />
        </div>
      )}


      {/* ================= TOP NAVIGATION (ANIMATED ENTRANCE & SCROLL DYNAMICS) ================= */}
      <motion.header 
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-40 backdrop-blur-2xl border-b transition-all duration-300 ${headerBg} ${
          isScrolled ? 'shadow-lg shadow-black/10' : ''
        }`}
      >
        <div className={`max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-14' : 'h-16'
        }`}>
          
          {/* Logo & Brand */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-md transition-colors"
              style={{ backgroundColor: activeTheme.hex }}
            >
              H
            </motion.div>
            <div>
              <span className={`font-heading font-medium tracking-tight text-sm ${textTitle}`}>
                HORIZONS
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono uppercase tracking-widest opacity-60">
                // Career Report 2026
              </span>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <nav className={`hidden md:flex items-center space-x-8 text-xs font-normal ${textMuted}`}>
            {navSections.map((item) => (
              <motion.a 
                key={item.id}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                href={`#${item.id}`} 
                className="hover:text-current transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Actions: Theme Settings & Export */}
          <div className="flex items-center space-x-3">
            {/* Theme Settings Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSettingsOpen(true)}
              className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-normal border transition cursor-pointer backdrop-blur-md ${
                isDark 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200' 
                  : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700 shadow-sm'
              }`}
            >
              <div 
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: activeTheme.hex }}
              />
              <span className="hidden sm:inline">Theme</span>
              <SlidersHorizontal className="w-3.5 h-3.5 opacity-70" />
            </motion.button>

            {/* Print / PDF */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.print()} 
              className={`no-print inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-normal border transition cursor-pointer backdrop-blur-md ${
                isDark 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200' 
                  : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700 shadow-sm'
              }`}
            >
              <Printer className="w-3.5 h-3.5 opacity-70" />
              <span className="hidden sm:inline">PDF</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 py-20 space-y-36">

        {/* ================= SECTION 1: OVERVIEW ================= */}
        <motion.section 
          id="executive-memo" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.12 }}
          variants={sectionAnimation}
          className="space-y-12 pt-4"
        >
          <SpotlightCard 
            spotlightColor={`${activeTheme.hex}18`}
            isDark={isDark}
            className="p-8 sm:p-14 space-y-10 relative overflow-hidden"
          >
            {/* Ambient Floating Particles */}
            {effects.particles && (
              <ParticlesBackground 
                particleCount={35} 
                speed={0.3} 
                particleColor={`${activeTheme.hex}45`}
                lineColor={isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)"}
              />
            )}

            {/* Big Typography (Uniform Title Size Across All 5 Sections) */}
            <div className="max-w-4xl space-y-6 relative z-10">
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight font-heading leading-[1.1] ${textTitle}`}>
                Career Horizons Beyond the AI Horizon.
              </h2>

              {/* Bigger Font for Paragraphs */}
              <p className={`text-xl sm:text-2xl font-light leading-relaxed ${textBody}`}>
                Generic web development and boilerplate coding face intense automation pressure. This empirical brief evaluates <span className={`font-normal ${textTitle}`}>{CAREER_DATA.length} degree-accessible pathways</span> across spatial computing, cybersecurity, Mumbai real estate, hardware IoT, and agtech commanding <span className="font-semibold" style={{ color: activeTheme.hex }}>7.5 to 16.0 LPA</span> with physical-world moats.
              </p>
            </div>

            {/* 4 Candidate Assets: 2x2 Matrix with Staggered Reveal */}
            <motion.div 
              variants={staggerGridAnimation}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 relative z-10"
            >
              
              <motion.div variants={cardItemAnimation}>
                <TiltedCard 
                  maxTilt={effects.tilt ? 10 : 0} 
                  className={`p-7 rounded-3xl border ${innerCardBg}`}
                >
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm"
                    style={{ backgroundColor: `${activeTheme.hex}18`, color: activeTheme.hex }}
                  >
                    <Laptop className="w-6 h-6" />
                  </div>
                  <div className={`font-heading font-medium text-xl mb-2 ${textTitle}`}>RTX 4070 Laptop + VR Headset</div>
                  <p className={`text-base leading-relaxed font-light ${textMuted}`}>
                    You already own the hardware. Zero capital barrier to enter spatial computing, photogrammetry, and local reality capture.
                  </p>
                </TiltedCard>
              </motion.div>

              <motion.div variants={cardItemAnimation}>
                <TiltedCard 
                  maxTilt={effects.tilt ? 10 : 0} 
                  className={`p-7 rounded-3xl border ${innerCardBg}`}
                >
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm"
                    style={{ backgroundColor: `${activeTheme.hex}18`, color: activeTheme.hex }}
                  >
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div className={`font-heading font-medium text-xl mb-2 ${textTitle}`}>2 Yrs Unity & C# Architecture</div>
                  <p className={`text-base leading-relaxed font-light ${textMuted}`}>
                    90%+ direct transfer into industrial simulation & digital twins. Saves 12+ months of foundational learning.
                  </p>
                </TiltedCard>
              </motion.div>

              <motion.div variants={cardItemAnimation}>
                <TiltedCard 
                  maxTilt={effects.tilt ? 10 : 0} 
                  className={`p-7 rounded-3xl border ${innerCardBg}`}
                >
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm"
                    style={{ backgroundColor: `${activeTheme.hex}18`, color: activeTheme.hex }}
                  >
                    <Compass className="w-6 h-6" />
                  </div>
                  <div className={`font-heading font-medium text-xl mb-2 ${textTitle}`}>Flight Simulator Muscle Memory</div>
                  <p className={`text-base leading-relaxed font-light ${textMuted}`}>
                    Stick navigation and spatial orientation bridge directly into a DGCA Commercial Drone Pilot license.
                  </p>
                </TiltedCard>
              </motion.div>

              <motion.div variants={cardItemAnimation}>
                <TiltedCard 
                  maxTilt={effects.tilt ? 10 : 0} 
                  className={`p-7 rounded-3xl border ${innerCardBg}`}
                >
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm"
                    style={{ backgroundColor: `${activeTheme.hex}18`, color: activeTheme.hex }}
                  >
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className={`font-heading font-medium text-xl mb-2 ${textTitle}`}>AI as Productivity Force-Multiplier</div>
                  <p className={`text-base leading-relaxed font-light ${textMuted}`}>
                    Use AI coding tools to write boilerplate C# 3x faster, delivering complex client prototypes in days instead of months.
                  </p>
                </TiltedCard>
              </motion.div>

            </motion.div>
          </SpotlightCard>
        </motion.section>

        {/* ================= SECTION 2: THE CAREER MATRIX ================= */}
        <motion.section 
          id="ultimate-matrix" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.08 }}
          variants={sectionAnimation}
          className="space-y-6"
        >
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b ${dividerColor}`}>
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest font-medium" style={{ color: activeTheme.hex }}>
                Directory Catalog
              </span>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight font-heading ${textTitle}`}>
                Career Matrix ({CAREER_DATA.length} Pathways)
              </h2>
              <p className={`text-base font-light ${textMuted}`}>
                Click on any career row to inspect transferable skills, gaps, anti-AI moat, and Mumbai hiring companies.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 opacity-50 absolute left-3 top-3" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roles, skills, moats..." 
                className={`pl-9 pr-4 py-2 text-xs rounded-xl border w-60 sm:w-72 font-light focus:outline-none transition ${
                  isDark 
                    ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-white/30' 
                    : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-slate-400 shadow-sm'
                }`}
              />
            </div>
          </div>

          {/* Sector Tabs */}
          <div className="overflow-x-auto pb-1">
            <AnimatedTabs 
              tabs={sectorTabs}
              activeTab={selectedSector}
              onChange={setSelectedSector}
              accentHex={activeTheme.hex}
              isDark={isDark}
            />
          </div>

          {/* Clean 8-Item Max Scrollable Table */}
          <div className={`rounded-3xl border overflow-hidden transition-colors ${cardBg}`}>
            <div className="overflow-x-auto max-h-[510px] overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 z-20 backdrop-blur-2xl">
                  <tr className={`border-b text-[10px] font-mono uppercase tracking-wider select-none ${
                    isDark ? 'bg-[#0f1118]/65 backdrop-blur-2xl border-white/10 text-slate-400' : 'bg-slate-100/65 backdrop-blur-2xl border-slate-200 text-slate-700'
                  }`}>
                    <th className="py-4 px-6 font-normal cursor-pointer hover:text-current transition" onClick={() => toggleSort('title')}>
                      <div className="flex items-center space-x-1.5">
                        <span>Career Pathway</span>
                        <ArrowUpDown className="w-3 h-3 opacity-60" />
                      </div>
                    </th>
                    <th className="py-4 px-5 font-normal cursor-pointer hover:text-current transition" onClick={() => toggleSort('compMedianLPA')}>
                      <div className="flex items-center space-x-1.5">
                        <span>Average Salary</span>
                        <ArrowUpDown className="w-3 h-3 opacity-60" />
                      </div>
                    </th>
                    <th className="py-4 px-5 font-normal cursor-pointer hover:text-current transition" onClick={() => toggleSort('transitionMonths')}>
                      <div className="flex items-center space-x-1.5">
                        <span>Prep Time (months)</span>
                        <ArrowUpDown className="w-3 h-3 opacity-60" />
                      </div>
                    </th>
                    <th className="py-4 px-5 font-normal cursor-pointer hover:text-current transition" onClick={() => toggleSort('aiRisk')}>
                      <div className="flex items-center space-x-1.5">
                        <span>AI Risk</span>
                        <ArrowUpDown className="w-3 h-3 opacity-60" />
                      </div>
                    </th>
                    <th className="py-4 px-6 font-normal cursor-pointer hover:text-current transition" onClick={() => toggleSort('fitScore')}>
                      <div className="flex items-center space-x-1.5">
                        <span>Fit Score</span>
                        <ArrowUpDown className="w-3 h-3 opacity-60" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-white/[0.04]' : 'divide-slate-100'}`}>
                  {filteredCareers.map((role) => (
                    <tr 
                      key={role.id} 
                      onClick={() => setActiveCareer(role)}
                      className={`transition-colors cursor-pointer group select-none ${
                        isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-slate-100/80'
                      }`}
                    >
                      {/* Career Pathway */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium text-sm tracking-tight transition group-hover:underline underline-offset-2 ${textTitle}`}>
                            {role.title}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: activeTheme.hex }} />
                        </div>
                        <div className={`text-xs font-mono mt-0.5 ${textMuted}`}>{role.domain}</div>
                      </td>

                      {/* Average Salary */}
                      <td className="py-4 px-5 font-mono font-semibold text-sm whitespace-nowrap" style={{ color: activeTheme.hex }}>
                        {role.compMedianLPA} LPA
                      </td>

                      {/* Prep Time (months) */}
                      <td className={`py-4 px-5 font-mono text-sm tabular-nums ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {role.transitionMonths}
                      </td>

                      {/* AI Risk */}
                      <td className="py-4 px-5 font-mono text-sm tabular-nums">
                        <span className={role.aiRisk < 20 ? "text-emerald-500 font-medium" : (role.aiRisk < 35 ? "text-amber-500" : "text-rose-500")}>
                          {role.aiRisk}%
                        </span>
                      </td>

                      {/* Fit Score */}
                      <td className={`py-4 px-6 font-mono text-sm tabular-nums ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {role.fitScore}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* ================= SECTION 3: ANALYTICS ================= */}
        <motion.section 
          id="visual-analytics" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.08 }}
          variants={sectionAnimation}
          className="space-y-6"
        >
          <div className={`space-y-1 pb-2 border-b ${dividerColor}`}>
            <span className="text-[11px] font-mono uppercase tracking-widest font-medium" style={{ color: activeTheme.hex }}>
              Quantitative Modeling
            </span>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight font-heading ${textTitle}`}>
              ROI & Preparation Analytics
            </h2>
            <p className={`text-base font-light ${textMuted}`}>
              Side-by-side comparison of the highest compensation tracks vs fastest transition gateways.
            </p>
          </div>

          <StrategicCharts 
            careers={CAREER_DATA}
            onSelectCareer={setActiveCareer}
            accentHex={activeTheme.hex}
            isDark={isDark}
          />
        </motion.section>

        {/* ================= SECTION 4: CANDIDATE FIT SIMULATOR ================= */}
        <motion.section 
          id="fit-simulator" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.08 }}
          variants={sectionAnimation}
          className="space-y-6"
        >
          <SpotlightCard 
            spotlightColor={`${activeTheme.hex}18`}
            isDark={isDark}
            className="p-8 sm:p-12 space-y-8"
          >
            <div className="max-w-2xl space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest font-medium" style={{ color: activeTheme.hex }}>
                Tactile Engine
              </span>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight font-heading ${textTitle}`}>
                Live Career Fit Simulator
              </h2>
              <p className={`text-base font-light leading-relaxed ${textBody}`}>
                Drag the sliders below to adjust your personal weighting for spatial simulation, 3D math, physical-world moats, or data pipelines. Rankings update dynamically.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Sliders Controls (5 cols) */}
              <div className="lg:col-span-5 space-y-3.5">
                <ModernSlider
                  label="Enterprise VR Headsets & Simulation"
                  sublabel="Unity XR, OpenXR, Quest Link, spatial training"
                  value={simWeights.vrSimulation}
                  onChange={(val) => setSimWeights(prev => ({ ...prev, vrSimulation: val }))}
                  icon={Boxes}
                  accentHex={activeTheme.hex}
                  isDark={isDark}
                />

                <ModernSlider
                  label="3D Math, Kinematics & Physics Logic"
                  sublabel="Vectors, quaternions, collision matrices, coordinates"
                  value={simWeights.spatialMath}
                  onChange={(val) => setSimWeights(prev => ({ ...prev, spatialMath: val }))}
                  icon={Activity}
                  accentHex={activeTheme.hex}
                  isDark={isDark}
                />

                <ModernSlider
                  label="Physical World Moats (AgTech / Drones / CCTV)"
                  sublabel="Hydroponics, drone flight, CCTV, real-world hardware"
                  value={simWeights.physicalMoat}
                  onChange={(val) => setSimWeights(prev => ({ ...prev, physicalMoat: val }))}
                  icon={Sprout}
                  accentHex={activeTheme.hex}
                  isDark={isDark}
                />

                <ModernSlider
                  label="Data Engineering & Pipeline Plumbing"
                  sublabel="SQL databases, automated ETL, server data feeds"
                  value={simWeights.dataPlumbing}
                  onChange={(val) => setSimWeights(prev => ({ ...prev, dataPlumbing: val }))}
                  icon={Binary}
                  accentHex={activeTheme.hex}
                  isDark={isDark}
                />
              </div>

              {/* Dynamic Matches Output (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className={`text-xs font-mono uppercase tracking-wider flex items-center justify-between pb-1 ${textMuted}`}>
                  <span>Top Dynamic Recommendations:</span>
                  <span className="font-medium flex items-center space-x-1.5" style={{ color: activeTheme.hex }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: activeTheme.hex }} />
                    <span>Live Recalculating</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {topSimMatches.map((match, index) => (
                    <motion.div 
                      key={match.id}
                      layout
                      whileHover={{ y: -3, scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setActiveCareer(match)}
                      className={`p-5 rounded-2xl border transition-colors flex flex-col justify-between space-y-4 cursor-pointer group ${
                        isDark 
                          ? 'bg-white/[0.03] backdrop-blur-xl border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06]' 
                          : 'bg-white/50 backdrop-blur-xl border-slate-200/70 hover:border-slate-300 hover:bg-white/70 shadow-sm'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span 
                            className="text-[10px] font-mono px-2 py-0.5 rounded-full font-medium"
                            style={{ 
                              backgroundColor: `${activeTheme.hex}18`, 
                              color: activeTheme.hex,
                              border: `1px solid ${activeTheme.hex}35`
                            }}
                          >
                            Rank #{index + 1}
                          </span>
                          <span className="font-mono text-xs font-semibold" style={{ color: activeTheme.hex }}>
                            {match.simScore}% Fit
                          </span>
                        </div>
                        <h4 className={`font-heading font-medium text-sm group-hover:underline underline-offset-2 ${textTitle}`}>
                          {match.title}
                        </h4>
                        <p className={`text-[11px] mt-1 line-clamp-2 leading-relaxed font-light ${textMuted}`}>{match.summary}</p>
                      </div>

                      <div className={`pt-3 border-t flex items-center justify-between text-xs ${dividerColor}`}>
                        <span className="font-mono font-medium" style={{ color: activeTheme.hex }}>
                          {match.compMedianLPA} LPA
                        </span>
                        <span className="text-xs font-normal flex items-center space-x-1" style={{ color: activeTheme.hex }}>
                          <span>Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </SpotlightCard>
        </motion.section>

        {/* ================= SECTION 5: 12-MONTH EXECUTION ROADMAP ================= */}
        <motion.section 
          id="execution-roadmap" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.08 }}
          variants={sectionAnimation}
          className="space-y-6"
        >
          <div className={`space-y-1 pb-2 border-b ${dividerColor}`}>
            <span className="text-[11px] font-mono uppercase tracking-widest font-medium" style={{ color: activeTheme.hex }}>
              Milestone Pathway
            </span>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight font-heading ${textTitle}`}>
              12-Month Execution Roadmap to 8–12 LPA
            </h2>
            <p className={`text-base font-light ${textMuted}`}>Clear quarterly milestones calibrated for 15 hours/week alongside your online CS degree.</p>
          </div>

          <motion.div 
            variants={staggerGridAnimation}
            className="grid grid-cols-1 md:grid-cols-4 gap-5"
          >
            <motion.div 
              variants={cardItemAnimation}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 transition-colors ${cardBg}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full"
                    style={{ backgroundColor: `${activeTheme.hex}18`, color: activeTheme.hex }}
                  >
                    Phase 1: M1–M3
                  </span>
                  <Layers className="w-4 h-4 opacity-60" />
                </div>
                <h3 className={`font-heading font-medium text-base ${textTitle}`}>VR Hardware Activation</h3>
                <ul className={`text-xs mt-3 space-y-2 leading-relaxed font-light ${textBody}`}>
                  <li className="flex items-start space-x-2">
                    <span className="font-bold" style={{ color: activeTheme.hex }}>•</span>
                    <span>Connect VR headset to RTX 4070 laptop via Quest Link / PC-VR.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-bold" style={{ color: activeTheme.hex }}>•</span>
                    <span>Master Unity XR Interaction Toolkit (hands, dials, physics).</span>
                  </li>
                </ul>
              </div>
              <div className={`pt-3 border-t text-[11px] font-mono ${dividerColor}`} style={{ color: activeTheme.hex }}>
                Deliverable: Interactive VR Workshop
              </div>
            </motion.div>

            <motion.div 
              variants={cardItemAnimation}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 transition-colors ${cardBg}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full"
                    style={{ backgroundColor: `${activeTheme.hex}18`, color: activeTheme.hex }}
                  >
                    Phase 2: M4–M6
                  </span>
                  <ShieldAlert className="w-4 h-4 opacity-60" />
                </div>
                <h3 className={`font-heading font-medium text-base ${textTitle}`}>Industrial Safety Drill</h3>
                <ul className={`text-xs mt-3 space-y-2 leading-relaxed font-light ${textBody}`}>
                  <li className="flex items-start space-x-2">
                    <span className="font-bold" style={{ color: activeTheme.hex }}>•</span>
                    <span>Build a "High-Voltage Electrical Substation Safety Drill".</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-bold" style={{ color: activeTheme.hex }}>•</span>
                    <span>Use free 3D industrial assets; leverage AI for procedural scripts.</span>
                  </li>
                </ul>
              </div>
              <div className={`pt-3 border-t text-[11px] font-mono ${dividerColor}`} style={{ color: activeTheme.hex }}>
                Deliverable: Enterprise Safety Portfolio
              </div>
            </motion.div>

            <motion.div 
              variants={cardItemAnimation}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 transition-colors ${cardBg}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full"
                    style={{ backgroundColor: `${activeTheme.hex}18`, color: activeTheme.hex }}
                  >
                    Phase 3: M7–M9
                  </span>
                  <Network className="w-4 h-4 opacity-60" />
                </div>
                <h3 className={`font-heading font-medium text-base ${textTitle}`}>Multiplayer Digital Twin</h3>
                <ul className={`text-xs mt-3 space-y-2 leading-relaxed font-light ${textBody}`}>
                  <li className="flex items-start space-x-2">
                    <span className="font-bold" style={{ color: activeTheme.hex }}>•</span>
                    <span>Incorporate multiplayer experience (PurrNet) into VR simulation.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-bold" style={{ color: activeTheme.hex }}>•</span>
                    <span>Allow 2 users in VR to perform collaborative inspection drills.</span>
                  </li>
                </ul>
              </div>
              <div className={`pt-3 border-t text-[11px] font-mono ${dividerColor}`} style={{ color: activeTheme.hex }}>
                Deliverable: Collaborative 2-Player Sim
              </div>
            </motion.div>

            <motion.div 
              variants={cardItemAnimation}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 transition-colors ${cardBg}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full"
                    style={{ backgroundColor: `${activeTheme.hex}18`, color: activeTheme.hex }}
                  >
                    Phase 4: M10–M14
                  </span>
                  <Briefcase className="w-4 h-4 opacity-60" />
                </div>
                <h3 className={`font-heading font-medium text-base ${textTitle}`}>Mumbai Placement</h3>
                <ul className={`text-xs mt-3 space-y-2 leading-relaxed font-light ${textBody}`}>
                  <li className="flex items-start space-x-2">
                    <span className="font-bold" style={{ color: activeTheme.hex }}>•</span>
                    <span>Record clean 60-second video walkthroughs of VR simulations.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-bold" style={{ color: activeTheme.hex }}>•</span>
                    <span>Apply directly to Tata Elxsi, L&T Tech Services, and industrial labs.</span>
                  </li>
                </ul>
              </div>
              <div className={`pt-3 border-t text-[11px] font-mono ${dividerColor}`} style={{ color: activeTheme.hex }}>
                Target Outcome: 8.0 - 12.0 LPA Base
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ================= FOOTER ================= */}
        <motion.footer 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={sectionAnimation}
          className={`pt-8 pb-16 border-t text-xs font-mono font-light flex flex-col sm:flex-row items-center justify-between gap-4 ${dividerColor} ${textMuted}`}
        >
          <div>
            <span>HORIZONS // STRATEGIC CAREER INTELLIGENCE ARCHIVE</span>
            <span className="block text-[10px] opacity-75 mt-0.5">Configured for local presentation.</span>
          </div>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>ENGINE: REACT 18 + REACTBITS</span>
            <span>MUMBAI, IN</span>
          </div>
        </motion.footer>

      </main>

      {/* ================= MODAL BRIEFING ================= */}
      <DossierModal
        career={activeCareer}
        onClose={() => setActiveCareer(null)}
        accentHex={activeTheme.hex}
        isDark={isDark}
      />

      {/* ================= THEME SETTINGS MODAL ================= */}
      <ThemeSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isDark={isDark}
        setIsDark={setIsDark}
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
        effects={effects}
        setEffects={setEffects}
        sideRaysConfig={sideRaysConfig}
        setSideRaysConfig={setSideRaysConfig}
      />

    </div>
  );
}
