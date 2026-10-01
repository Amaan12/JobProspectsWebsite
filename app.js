// Interactive Application Logic & Chart Initialization
// Robust Global State for Alpine.js & Chart.js

let quadrantChartInstance = null;
let radarChartInstance = null;
let barChartInstance = null;

window.reportApp = function() {
  return {
    candidate: typeof CANDIDATE_PROFILE !== 'undefined' ? CANDIDATE_PROFILE : {},
    careers: typeof CAREER_DATA !== 'undefined' ? CAREER_DATA : [],
    macro: typeof MACRO_ANALYSIS !== 'undefined' ? MACRO_ANALYSIS : {},
    selectedCategory: 'all', // 'all', 'cs-adjacent', 'cs', 'non-cs'
    selectedTier: 'all',     // 'all', 'tier1', 'tier2', 'tier3'
    searchQuery: '',
    sortKey: 'fitScore',     // 'fitScore', 'aiRisk', 'compMedianLPA', 'transitionMonths'
    sortAsc: false,
    activeDossier: null,

    // Career Simulator Weights (Default Values)
    sim: {
      vrSimulation: 92,
      spatialMath: 85,
      physicalMoat: 80,
      dataPlumbing: 65
    },

    init() {
      // Ensure icons and charts render after DOM is ready
      this.$nextTick(() => {
        if (window.lucide) {
          lucide.createIcons();
        }
        this.initCharts();
        
        // Auto-observe DOM mutations for Lucide icons
        const observer = new MutationObserver(() => {
          if (window.lucide) lucide.createIcons();
        });
        observer.observe(document.body, { childList: true, subtree: true });
      });
    },

    // Filtered & Sorted Careers for the Ultimate Table
    get filteredCareers() {
      let list = this.careers.filter(item => {
        const matchesCategory = this.selectedCategory === 'all' || item.category === this.selectedCategory;
        const matchesTier = this.selectedTier === 'all' || 
          (this.selectedTier === 'tier1' && item.tier.includes('Tier 1')) ||
          (this.selectedTier === 'tier2' && item.tier.includes('Tier 2')) ||
          (this.selectedTier === 'tier3' && item.tier.includes('Tier 3'));
        
        const q = this.searchQuery.toLowerCase().trim();
        const matchesSearch = q === '' ||
          item.title.toLowerCase().includes(q) ||
          item.humanMoat.toLowerCase().includes(q) ||
          item.domain.toLowerCase().includes(q) ||
          item.tier.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q);

        return matchesCategory && matchesTier && matchesSearch;
      });

      return list.sort((a, b) => {
        let valA = a[this.sortKey];
        let valB = b[this.sortKey];
        if (this.sortAsc) {
          return valA > valB ? 1 : -1;
        } else {
          return valA < valB ? 1 : -1;
        }
      });
    },

    toggleSort(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        // Default ascending for risk and time; descending for fit score and compensation
        this.sortAsc = (key === 'aiRisk' || key === 'transitionMonths') ? true : false;
      }
    },

    openDossier(career) {
      this.activeDossier = career;
      this.$nextTick(() => {
        if (window.lucide) lucide.createIcons();
      });
    },

    closeDossier() {
      this.activeDossier = null;
    },

    // Dynamic Simulator Fit Calculation
    get topSimMatches() {
      return this.careers.map(c => {
        let score = 50;

        if (c.id === 'enterprise-xr-sim') {
          score = (this.sim.vrSimulation * 0.45) + (this.sim.spatialMath * 0.35) + (this.sim.physicalMoat * 0.20);
        } else if (c.id === 'industrial-digital-twins') {
          score = (this.sim.vrSimulation * 0.35) + (this.sim.spatialMath * 0.40) + (this.sim.dataPlumbing * 0.25);
        } else if (c.id === 'drone-photogrammetry-lead') {
          score = (this.sim.physicalMoat * 0.50) + (this.sim.spatialMath * 0.30) + (this.sim.vrSimulation * 0.20);
        } else if (c.id === 'smart-agriculture-hydroponics') {
          score = (this.sim.physicalMoat * 0.70) + (this.sim.spatialMath * 0.15) + (this.sim.dataPlumbing * 0.15);
        } else if (c.id === 'independent-market-trader') {
          score = (this.sim.spatialMath * 0.50) + (this.sim.dataPlumbing * 0.35) + (this.sim.physicalMoat * 0.15);
        } else if (c.id === 'culinary-cloud-kitchen-ops') {
          score = (this.sim.physicalMoat * 0.75) + (this.sim.spatialMath * 0.15) + (this.sim.dataPlumbing * 0.10);
        } else if (c.id === 'data-engineering') {
          score = (this.sim.dataPlumbing * 0.60) + (this.sim.spatialMath * 0.25) + (this.sim.physicalMoat * 0.15);
        } else if (c.id === 'software-game-qa') {
          score = (this.sim.vrSimulation * 0.40) + (this.sim.dataPlumbing * 0.30) + (this.sim.spatialMath * 0.30);
        } else if (c.id === 'cctv-physical-security') {
          score = (this.sim.physicalMoat * 0.70) + (this.sim.dataPlumbing * 0.30);
        } else if (c.id === 'realestate-valuation-analyst') {
          score = (this.sim.spatialMath * 0.45) + (this.sim.physicalMoat * 0.40) + (this.sim.dataPlumbing * 0.15);
        } else {
          score = (this.sim.spatialMath * 0.3) + (this.sim.physicalMoat * 0.3) + (this.sim.vrSimulation * 0.2) + (this.sim.dataPlumbing * 0.2);
        }

        const normalizedScore = Math.min(99, Math.max(30, Math.round(score)));
        return { ...c, simScore: normalizedScore };
      }).sort((a, b) => b.simScore - a.simScore).slice(0, 4);
    },

    // Chart.js Visualizations
    initCharts() {
      // 1. Quadrant Scatter Chart: AI Risk vs Mumbai Compensation (LPA)
      const canvasQuadrant = document.getElementById('quadrantChart');
      if (canvasQuadrant) {
        if (quadrantChartInstance) quadrantChartInstance.destroy();
        
        const scatterPoints = this.careers.map(c => ({
          x: c.aiRisk,
          y: c.compMedianLPA,
          title: c.title,
          tier: c.tier,
          tag: c.tag,
          displayPay: c.compDisplay
        }));

        quadrantChartInstance = new Chart(canvasQuadrant.getContext('2d'), {
          type: 'scatter',
          data: {
            datasets: [
              {
                label: 'Tier 1: Prime Matches',
                data: scatterPoints.filter(p => p.tier.includes('Tier 1')),
                backgroundColor: 'rgba(16, 185, 129, 0.9)',
                borderColor: '#34d399',
                pointRadius: 9,
                pointHoverRadius: 13
              },
              {
                label: 'Tier 2: Gateways & Physical Moats',
                data: scatterPoints.filter(p => p.tier.includes('Tier 2')),
                backgroundColor: 'rgba(59, 130, 246, 0.85)',
                borderColor: '#60a5fa',
                pointRadius: 8,
                pointHoverRadius: 11
              },
              {
                label: 'Tier 3: Evaluated Alternatives',
                data: scatterPoints.filter(p => p.tier.includes('Tier 3')),
                backgroundColor: 'rgba(148, 163, 184, 0.6)',
                borderColor: '#94a3b8',
                pointRadius: 6,
                pointHoverRadius: 9
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
                labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const raw = context.raw;
                    return `${raw.title}: AI Risk ${raw.x}%, Mumbai Med: ₹${raw.y}LPA`;
                  }
                }
              }
            },
            scales: {
              x: {
                title: { display: true, text: 'AI Automation Vulnerability (% Risk, lower is safer)', color: '#94a3b8' },
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { color: '#64748b' },
                min: 0,
                max: 85
              },
              y: {
                title: { display: true, text: 'Mumbai Starting Compensation (₹ LPA)', color: '#94a3b8' },
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { 
                  color: '#64748b',
                  callback: function(value) { return '₹' + value + 'L'; }
                },
                min: 3,
                max: 18
              }
            }
          }
        });
      }

      // 2. Candidate Fit Radar Chart
      const canvasRadar = document.getElementById('radarChart');
      if (canvasRadar) {
        if (radarChartInstance) radarChartInstance.destroy();
        
        radarChartInstance = new Chart(canvasRadar.getContext('2d'), {
          type: 'radar',
          data: typeof CANDIDATE_RADAR_DATA !== 'undefined' ? CANDIDATE_RADAR_DATA : { labels: [], datasets: [] },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { color: '#94a3b8', boxWidth: 12, font: { family: 'Inter', size: 11 } }
              }
            },
            scales: {
              r: {
                grid: { color: 'rgba(255, 255, 255, 0.08)' },
                angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
                pointLabels: { color: '#cbd5e1', font: { family: 'Inter', size: 11, weight: '500' } },
                ticks: { display: false, min: 0, max: 100 }
              }
            }
          }
        });
      }

      // 3. Transition Horizon vs Mumbai LPA Bar Chart
      const canvasBar = document.getElementById('timelineBarChart');
      if (canvasBar) {
        if (barChartInstance) barChartInstance.destroy();
        
        const priorityCareers = this.careers.filter(c => !c.tier.includes('Tier 3')).sort((a, b) => a.transitionMonths - b.transitionMonths);
        
        barChartInstance = new Chart(canvasBar.getContext('2d'), {
          type: 'bar',
          data: {
            labels: priorityCareers.map(c => c.title.split(' ').slice(0, 2).join(' ')),
            datasets: [
              {
                label: 'Study / Prep Months (at 15h/wk)',
                data: priorityCareers.map(c => c.transitionMonths),
                backgroundColor: 'rgba(139, 92, 246, 0.65)',
                borderColor: '#a78bfa',
                borderWidth: 1,
                yAxisID: 'y'
              },
              {
                label: 'Mumbai Median Pay (₹ LPA)',
                data: priorityCareers.map(c => c.compMedianLPA),
                type: 'line',
                borderColor: '#10b981',
                backgroundColor: '#10b981',
                tension: 0.3,
                yAxisID: 'y1'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { labels: { color: '#94a3b8' } }
            },
            scales: {
              x: {
                ticks: { color: '#94a3b8', maxRotation: 45, minRotation: 45, font: { size: 10 } },
                grid: { display: false }
              },
              y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: { display: true, text: 'Months to Job Ready', color: '#a78bfa' },
                ticks: { color: '#94a3b8' },
                grid: { color: 'rgba(255, 255, 255, 0.05)' }
              },
              y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: { display: true, text: 'Mumbai Starting Pay (₹ LPA)', color: '#10b981' },
                ticks: { 
                  color: '#10b981',
                  callback: function(value) { return '₹' + value + 'L'; }
                },
                grid: { drawOnChartArea: false }
              }
            }
          }
        });
      }
    }
  };
};

// Also register with alpine:init if Alpine is listening
document.addEventListener('alpine:init', () => {
  if (window.Alpine && window.Alpine.data) {
    Alpine.data('reportApp', window.reportApp);
  }
});
