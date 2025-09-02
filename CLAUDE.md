# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a **recruitment dashboard** project featuring a modern, Apple-inspired recruitment data visualization interface. The project uses vanilla HTML/CSS/JavaScript with Chart.js for data visualization, designed with Apple's design philosophy.

## Development Setup

### Quick Start Commands
- **Local Development**: Simply open `index.html` directly in any browser
- **Python Server**: `python -m http.server 8000`
- **Node.js Server**: `npx live-server`

### Project Structure
```
├── index.html                 # Main dashboard page
├── assets/
│   ├── css/
│   │   ├── reset.css         # Browser reset styles
│   │   ├── jobs.css          # Main application styles
│   │   └── charts.css        # Chart-specific styles
│   └── js/
│       ├── data.js           # Mock recruitment data
│       ├── charts.js         # Chart configurations and rendering
│       └── app.js            # Application logic
├── test.html                 # Test page
└── README.md                 # Comprehensive project documentation
```

### Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Charts**: Chart.js 4.x (bundled locally in `assets/js/vendor/chart.min.js`)
- **Design**: Apple-inspired minimal interface, SF Pro Display typography
- **Themes**: Dark/light mode with local storage persistence

### Key Components
- **KPI Cards**: Monthly hires (128), completion rate (94%), average cycle time (18 days), cost per hire (1.2万)
- **Main Charts**: Monthly recruitment trends with 6m/1y period switching
- **Department Distribution**: Ring chart showing recruitment by department
- **Channel Effectiveness**: Analysis of 7 recruitment platforms (BOSS直聘, 拉勾网, etc.)
- **Position Heatmap**: Hot job demand visualization
- **Quality Radar**: Candidate assessment across 6 dimensions
- **Job Table**: Latest job listings with filtering/export

### File Responsibilities
- **index.html**: Main dashboard layout with responsive grid system
- **assets/css/jobs.css**: Apple-style design system, color variables, responsive breakpoints
- **assets/css/charts.css**: Chart styling, card layouts, animations
- **assets/js/data.js**: All mock recruitment data and configurations
- **assets/js/charts.js**: Chart initialization, Canvas-based rendering, Chart.js configurations
- **assets/js/app.js**: Theme switching, data loading, interactions, keyboard shortcuts

### Browser Compatibility
- Modern browsers: Chrome 80+, Safari 13+, Firefox 75+, Edge 80+
- Mobile: iOS Safari 13+, Android Chrome 80+

### Data Management
- Mock data is hardcoded in `assets/js/data.js`
- Charts use Canvas API via Chart.js
- Theme preferences stored in localStorage
- No backend requirements - pure static implementation

### Responsive Design Points
- Desktop (1920px+): 4-column KPI, 2×2 chart grid
- Laptop (1366px): 2-column KPI, 2×2 charts
- Tablet (768px): 1-column KPI, vertical charts
- Mobile (375px): Compact KPI, touch-friendly

### Styling System
- Fonts: `-apple-system, BlinkMacSystemFont, 'SF Pro Display', system fonts`
- Colors: Apple Design Language (007AFF, 30D158, FF9F0A, FF453A)
- Spacing: 4px/8px/16px/24px/32px scale
- Animations: CSS hardware-accelerated transitions