// 图表配置和渲染逻辑
// 使用乔布斯风格的现代化图表设计

// Chart.js 全局默认配置
Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", "SF Pro Display", Roboto, "Helvetica Neue", Arial, sans-serif';
Chart.defaults.font.size = 13;
Chart.defaults.color = '#86868B';
Chart.defaults.borderColor = 'rgba(0, 0, 0, 0.05)';
Chart.defaults.backgroundColor = 'rgba(0, 122, 255, 0.1)';

// 获取主题色彩变量
function getThemeColor(colorName) {
    const root = document.documentElement;
    return getComputedStyle(root).getPropertyValue(`--${colorName}`).trim();
}

// 创建渐变色
function createGradient(ctx, colorStart, colorEnd, direction = 'vertical') {
    const gradient = direction === 'vertical' 
        ? ctx.createLinearGradient(0, 0, 0, 400)
        : ctx.createLinearGradient(0, 0, 400, 0);
    
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    return gradient;
}

// 通用图表配置
const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            align: 'center',
            labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 20,
                font: {
                    size: 12,
                    weight: '500'
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#1D1D1F',
            bodyColor: '#1D1D1F',
            borderColor: '#E5E5E7',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            usePointStyle: true,
            padding: 12,
            font: {
                size: 13
            },
            titleFont: {
                size: 14,
                weight: '600'
            }
        }
    },
    interaction: {
        intersect: false,
        mode: 'index'
    },
    animation: {
        duration: 1000,
        easing: 'easeOutCubic'
    }
};

// 图表实例存储
const chartInstances = {};

// 初始化趋势图表
function initTrendChart() {
    const canvas = document.getElementById('trendChart');
    if (!canvas) {
        throw new Error('找不到 trendChart 画布元素');
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('无法获取 trendChart 画布上下文');
    }
    
    if (!window.recruitmentData || !window.recruitmentData.monthlyTrendData) {
        throw new Error('月度趋势数据未找到');
    }
    
    // 创建渐变背景
    const gradient1 = createGradient(ctx, 'rgba(0, 122, 255, 0.3)', 'rgba(0, 122, 255, 0.05)');
    const gradient2 = createGradient(ctx, 'rgba(48, 209, 88, 0.2)', 'rgba(48, 209, 88, 0.02)');
    
    const config = {
        type: 'line',
        data: {
            ...window.recruitmentData.monthlyTrendData,
            datasets: window.recruitmentData.monthlyTrendData.datasets.map((dataset, index) => ({
                ...dataset,
                fill: true,
                backgroundColor: index === 0 ? gradient1 : gradient2
            }))
        },
        options: {
            ...commonChartOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        padding: 10,
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        padding: 10,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                ...commonChartOptions.plugins,
                tooltip: {
                    ...commonChartOptions.plugins.tooltip,
                    callbacks: {
                        title: function(context) {
                            return `${context[0].label} 招聘数据`;
                        },
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}人`;
                        }
                    }
                }
            }
        }
    };
    
    chartInstances.trendChart = new Chart(ctx, config);
}

// 初始化部门分布图表
function initDepartmentChart() {
    const canvas = document.getElementById('departmentChart');
    if (!canvas) {
        throw new Error('找不到 departmentChart 画布元素');
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('无法获取 departmentChart 画布上下文');
    }
    
    if (!window.recruitmentData || !window.recruitmentData.departmentData) {
        throw new Error('部门分布数据未找到');
    }
    
    const config = {
        type: 'doughnut',
        data: window.recruitmentData.departmentData,
        options: {
            ...commonChartOptions,
            cutout: '60%',
            plugins: {
                ...commonChartOptions.plugins,
                legend: {
                    ...commonChartOptions.plugins.legend,
                    position: 'right',
                    align: 'center'
                },
                tooltip: {
                    ...commonChartOptions.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.label}: ${context.parsed}人 (${percentage}%)`;
                        }
                    }
                }
            }
        }
    };
    
    chartInstances.departmentChart = new Chart(ctx, config);
}

// 初始化渠道效果图表
function initChannelChart() {
    const canvas = document.getElementById('channelChart');
    if (!canvas) {
        throw new Error('找不到 channelChart 画布元素');
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('无法获取 channelChart 画布上下文');
    }
    
    if (!window.recruitmentData || !window.recruitmentData.channelData) {
        throw new Error('渠道数据未找到');
    }
    
    const config = {
        type: 'bar',
        data: window.recruitmentData.channelData,
        options: {
            ...commonChartOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        padding: 10,
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        padding: 10,
                        font: {
                            size: 11
                        },
                        maxRotation: 45
                    }
                }
            },
            plugins: {
                ...commonChartOptions.plugins,
                legend: {
                    ...commonChartOptions.plugins.legend,
                    position: 'top',
                    align: 'end'
                },
                tooltip: {
                    ...commonChartOptions.plugins.tooltip,
                    callbacks: {
                        title: function(context) {
                            return `${context[0].label} 渠道数据`;
                        },
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}`;
                        }
                    }
                }
            }
        }
    };
    
    chartInstances.channelChart = new Chart(ctx, config);
}

// 初始化候选人质量雷达图
function initQualityChart() {
    const canvas = document.getElementById('qualityChart');
    if (!canvas) {
        throw new Error('找不到 qualityChart 画布元素');
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('无法获取 qualityChart 画布上下文');
    }
    
    if (!window.recruitmentData || !window.recruitmentData.qualityRadarData) {
        throw new Error('质量评估数据未找到');
    }
    
    const config = {
        type: 'radar',
        data: window.recruitmentData.qualityRadarData,
        options: {
            ...commonChartOptions,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    pointLabels: {
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    },
                    ticks: {
                        display: false
                    }
                }
            },
            plugins: {
                ...commonChartOptions.plugins,
                legend: {
                    ...commonChartOptions.plugins.legend,
                    position: 'top'
                },
                tooltip: {
                    ...commonChartOptions.plugins.tooltip,
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.r}分`;
                        }
                    }
                }
            }
        }
    };
    
    chartInstances.qualityChart = new Chart(ctx, config);
}

// 初始化职位热度地图
function initPositionHeatMap() {
    const container = document.getElementById('positionHeatMap');
    if (!container) {
        throw new Error('找不到 positionHeatMap 容器元素');
    }
    
    if (!window.recruitmentData || !window.recruitmentData.positionHeatData) {
        throw new Error('职位热度数据未找到');
    }
    
    container.innerHTML = '';
    
    window.recruitmentData.positionHeatData.forEach(item => {
        const heatItem = document.createElement('div');
        heatItem.className = `heat-item ${item.heat}`;
        heatItem.innerHTML = `
            <div class="heat-label">${item.position}</div>
            <div class="heat-value">${item.applications}</div>
        `;
        
        // 添加点击事件
        heatItem.addEventListener('click', () => {
            showPositionDetails(item);
        });
        
        container.appendChild(heatItem);
    });
}

// 显示职位详情（模拟功能）
function showPositionDetails(position) {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-title">${position.position}</div>
        <div class="tooltip-body">
            <div>申请人数: ${position.applications}</div>
            <div>热度指数: ${position.level}%</div>
            <div>状态: ${position.heat === 'hot' ? '非常热门' : position.heat === 'warm' ? '较为热门' : '一般'}</div>
        </div>
    `;
    
    // 简单的提示框显示（实际项目中可以使用更复杂的Modal）
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.remove();
    }, 3000);
}

// 更新图表数据
function updateChartData(chartName, newData) {
    if (chartInstances[chartName]) {
        chartInstances[chartName].data = newData;
        chartInstances[chartName].update('active');
    }
}

// 切换图表时间段
function switchTimePeriod(period) {
    // 移除所有按钮的活动状态
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 添加当前按钮的活动状态
    event.target.classList.add('active');
    
    // 根据时间段更新数据（这里使用模拟数据）
    let newData = { ...window.recruitmentData.monthlyTrendData };
    
    if (period === '6m') {
        // 显示最近6个月数据
        newData.labels = newData.labels.slice(-6);
        newData.datasets = newData.datasets.map(dataset => ({
            ...dataset,
            data: dataset.data.slice(-6)
        }));
    }
    // 1年数据已经是完整的，不需要修改
    
    updateChartData('trendChart', newData);
}

// 主题切换时更新图表
function updateChartsForTheme(isDarkMode) {
    const textColor = isDarkMode ? '#98989D' : '#86868B';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
    const tooltipBg = isDarkMode ? 'rgba(28, 28, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    const tooltipText = isDarkMode ? '#FFFFFF' : '#1D1D1F';
    
    Object.values(chartInstances).forEach(chart => {
        // 更新默认颜色
        Chart.defaults.color = textColor;
        Chart.defaults.borderColor = gridColor;
        
        // 更新tooltip样式
        if (chart.options.plugins && chart.options.plugins.tooltip) {
            chart.options.plugins.tooltip.backgroundColor = tooltipBg;
            chart.options.plugins.tooltip.titleColor = tooltipText;
            chart.options.plugins.tooltip.bodyColor = tooltipText;
        }
        
        // 更新坐标轴颜色
        if (chart.options.scales) {
            Object.keys(chart.options.scales).forEach(scaleKey => {
                if (chart.options.scales[scaleKey].grid) {
                    chart.options.scales[scaleKey].grid.color = gridColor;
                }
                if (chart.options.scales[scaleKey].ticks) {
                    chart.options.scales[scaleKey].ticks.color = textColor;
                }
            });
        }
        
        chart.update();
    });
}

// 初始化所有图表
function initAllCharts() {
    const chartInitializers = [
        { name: '月度招聘趋势图', fn: initTrendChart },
        { name: '部门招聘分布图', fn: initDepartmentChart },
        { name: '渠道转化效果图', fn: initChannelChart },
        { name: '候选人质量评估图', fn: initQualityChart },
        { name: '职位需求热度图', fn: initPositionHeatMap }
    ];
    
    console.log('开始初始化 5 个图表...');
    
    chartInitializers.forEach((chart, index) => {
        try {
            console.log(`正在初始化第 ${index + 1}/5 个图表: ${chart.name}`);
            chart.fn();
            console.log(`✓ ${chart.name} 初始化成功`);
        } catch (error) {
            console.error(`❌ ${chart.name} 初始化失败:`, error);
            // 继续初始化其他图表，不要因为一个图表失败而停止
        }
    });
    
    console.log('图表初始化流程完成');
    
    // 检查所有图表是否成功创建
    const successCount = Object.keys(chartInstances).length;
    console.log(`成功创建了 ${successCount}/4 个 Chart.js 图表实例`);
    
    if (successCount === 0) {
        throw new Error('没有任何图表成功创建');
    }
}

// 销毁所有图表（清理内存）
function destroyAllCharts() {
    Object.values(chartInstances).forEach(chart => {
        if (chart && typeof chart.destroy === 'function') {
            chart.destroy();
        }
    });
    
    // 清空实例存储
    Object.keys(chartInstances).forEach(key => {
        delete chartInstances[key];
    });
}

// 导出函数供其他文件使用
window.chartFunctions = {
    initAllCharts,
    destroyAllCharts,
    updateChartData,
    switchTimePeriod,
    updateChartsForTheme
};