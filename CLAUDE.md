# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a recruitment dashboard application built with HTML, JavaScript, and Tailwind CSS. It visualizes recruitment metrics and data through interactive charts and tables.

## Key Features
1. KPI Metrics Display - Shows key recruitment metrics like positions, resumes, interviews, and hires
2. Interactive Charts - Multiple Chart.js visualizations for trends, department distribution, branch performance, and position popularity
3. Data Tables - Detailed branch data with sorting capabilities
4. Time Period Selection - Toggle between total, current month, last month, and quarterly views
5. Responsive Design - Mobile-friendly layout using Tailwind CSS

## Data Structure
- Static data embedded in JavaScript objects (source_data, branch_data, monthly_data, dept_data, position_data)
- KPI calculations based on monthly and aggregated data
- Branch and position ranking systems

## Main Components
1. Navigation bar with date display and KPI period selector
2. KPI cards showing recruitment metrics with trend indicators
3. Trend analysis chart (line chart)
4. Department distribution chart (doughnut chart)
5. Branch performance chart (bar chart) with metric selector
6. Position popularity chart (horizontal bar chart)
7. Detailed branch data table with ranking

## Development Notes
- All data is currently static/mock data
- Uses Chart.js v4.4.8 for data visualization
- Uses Tailwind CSS v3.x for styling
- Uses Font Awesome v6.7.2 for icons
- Single HTML file application with embedded JavaScript
- No external backend or database dependencies