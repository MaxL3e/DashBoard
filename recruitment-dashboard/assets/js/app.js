// 应用主逻辑文件 - 乔布斯风格招聘数据仪表盘
// 负责页面初始化、交互逻辑、动画效果等

class RecruitmentDashboard {
    constructor() {
        this.currentTheme = localStorage.getItem('dashboard-theme') || 'light';
        this.isInitialized = false;
        this.animationQueue = [];
        
        this.init();
    }
    
    // 初始化应用
    async init() {
        try {
            this.showLoadingScreen();
            
            // 设置主题
            this.setTheme(this.currentTheme);
            
            // 显示当前日期
            this.updateCurrentDate();
            
            // 绑定事件监听器
            this.bindEventListeners();
            
            // 等待 Chart.js 库加载完成
            console.log('等待 Chart.js 库加载...');
            await this.waitForChartLibrary();
            
            // 延迟加载以显示Loading效果
            await this.delay(1500);
            
            // 初始化KPI数字动画
            this.initKPIAnimations();
            
            // 初始化图表
            await this.initializeCharts();
            
            // 初始化表格数据
            this.initJobsTable();
            
            // 启动实时数据更新
            this.startRealtimeUpdates();
            
            this.isInitialized = true;
            this.hideLoadingScreen();
            
            // 启动入场动画
            this.playEntranceAnimations();
            
        } catch (error) {
            console.error('仪表盘初始化失败:', error);
            this.showErrorMessage(error.message);
            this.hideLoadingScreen();
        }
    }
    
    // 显示加载屏幕
    showLoadingScreen() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('hidden');
        }
    }
    
    // 隐藏加载屏幕
    hideLoadingScreen() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
            
            // 延迟移除元素以保证动画完成
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 300);
        }
    }
    
    // 设置主题
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('dashboard-theme', theme);
        
        // 更新主题切换按钮
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        
        // 如果图表已初始化，更新图表主题
        if (this.isInitialized && window.chartFunctions) {
            window.chartFunctions.updateChartsForTheme(theme === 'dark');
        }
    }
    
    // 切换主题
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // 添加切换动画
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
    
    // 更新当前日期
    updateCurrentDate() {
        const currentDateElement = document.getElementById('currentDate');
        if (currentDateElement) {
            const now = new Date();
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                weekday: 'short'
            };
            const formattedDate = now.toLocaleDateString('zh-CN', options);
            currentDateElement.textContent = `今日 ${formattedDate}`;
        }
    }
    
    // 绑定事件监听器
    bindEventListeners() {
        // 主题切换按钮
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // 图表时间段切换按钮
        const controlBtns = document.querySelectorAll('[data-period]');
        controlBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const period = e.target.getAttribute('data-period');
                if (window.chartFunctions) {
                    window.chartFunctions.switchTimePeriod(period);
                }
            });
        });
        
        // KPI卡片悬浮效果
        const kpiCards = document.querySelectorAll('.kpi-card');
        kpiCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addKPIHoverEffect(card);
            });
            card.addEventListener('mouseleave', () => {
                this.removeKPIHoverEffect(card);
            });
        });
        
        // 表格刷新按钮
        const refreshBtn = document.querySelector('.table-controls .control-btn');
        if (refreshBtn && refreshBtn.textContent.includes('刷新')) {
            refreshBtn.addEventListener('click', () => this.refreshJobsTable());
        }
        
        // 键盘快捷键
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // 窗口大小变化时重新调整
        window.addEventListener('resize', () => this.handleWindowResize());
    }
    
    // KPI数字动画
    initKPIAnimations() {
        const kpiNumbers = document.querySelectorAll('.kpi-number[data-number]');
        
        kpiNumbers.forEach((element, index) => {
            const targetNumber = parseFloat(element.getAttribute('data-number'));
            
            setTimeout(() => {
                this.animateNumber(element, 0, targetNumber, 1500);
                element.classList.add('animating');
                
                setTimeout(() => {
                    element.classList.remove('animating');
                }, 600);
            }, index * 200);
        });
    }
    
    // 数字滚动动画
    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const isDecimal = end % 1 !== 0;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用缓动函数
            const easedProgress = this.easeOutCubic(progress);
            const currentValue = start + (end - start) * easedProgress;
            
            if (isDecimal) {
                element.textContent = currentValue.toFixed(1);
            } else {
                element.textContent = Math.floor(currentValue);
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = isDecimal ? end.toFixed(1) : end;
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    // 缓动函数
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    // KPI卡片悬浮效果
    addKPIHoverEffect(card) {
        const icon = card.querySelector('.kpi-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'all 0.3s ease';
        }
    }
    
    removeKPIHoverEffect(card) {
        const icon = card.querySelector('.kpi-icon');
        if (icon) {
            icon.style.transform = '';
        }
    }
    
    // 初始化表格数据
    initJobsTable() {
        const tableBody = document.getElementById('jobsTableBody');
        if (!tableBody || !window.recruitmentData) return;
        
        const jobsData = window.recruitmentData.recentJobsData;
        
        tableBody.innerHTML = jobsData.map(job => `
            <tr class="table-row" data-priority="${job.priority}">
                <td>
                    <div class="job-title">${job.title}</div>
                </td>
                <td>${job.department}</td>
                <td>${job.publishDate}</td>
                <td>
                    <span class="application-count">${job.applications}</span>
                </td>
                <td>${job.interviewProgress}</td>
                <td>
                    <span class="status-badge ${job.status}">${this.getStatusText(job.status)}</span>
                </td>
            </tr>
        `).join('');
        
        // 添加表格行的点击效果
        const tableRows = tableBody.querySelectorAll('.table-row');
        tableRows.forEach(row => {
            row.addEventListener('click', () => this.showJobDetails(row));
        });
    }
    
    // 获取状态文本
    getStatusText(status) {
        const statusMap = {
            'active': '招聘中',
            'pending': '待发布',
            'closed': '已关闭'
        };
        return statusMap[status] || status;
    }
    
    // 显示职位详情（模拟功能）
    showJobDetails(row) {
        const jobTitle = row.querySelector('.job-title').textContent;
        
        // 添加视觉反馈
        row.style.backgroundColor = 'var(--primary-blue)';
        row.style.color = 'white';
        row.style.transform = 'scale(1.02)';
        
        setTimeout(() => {
            row.style.backgroundColor = '';
            row.style.color = '';
            row.style.transform = '';
        }, 200);
        
        console.log(`查看职位详情: ${jobTitle}`);
    }
    
    // 刷新表格数据
    refreshJobsTable() {
        const refreshBtn = document.querySelector('.table-controls .control-btn');
        if (refreshBtn && refreshBtn.textContent.includes('刷新')) {
            // 添加加载状态
            const originalText = refreshBtn.textContent;
            refreshBtn.textContent = '刷新中...';
            refreshBtn.disabled = true;
            
            // 模拟数据刷新
            setTimeout(() => {
                this.initJobsTable();
                refreshBtn.textContent = originalText;
                refreshBtn.disabled = false;
                
                // 显示刷新成功提示
                this.showNotification('数据已刷新', 'success');
            }, 1000);
        }
    }
    
    // 启动实时数据更新
    startRealtimeUpdates() {
        // 每30秒更新一次时间
        setInterval(() => {
            this.updateCurrentDate();
        }, 30000);
        
        // 模拟实时数据更新（每5分钟）
        setInterval(() => {
            this.updateRealtimeData();
        }, 300000);
    }
    
    // 更新实时数据
    updateRealtimeData() {
        // 模拟数据变化
        const kpiCards = document.querySelectorAll('.kpi-card');
        kpiCards.forEach(card => {
            const trendElement = card.querySelector('.kpi-trend .trend-value');
            if (trendElement && Math.random() < 0.3) {
                // 30%概率更新趋势数据
                const currentValue = trendElement.textContent;
                const newValue = this.generateRandomTrend();
                trendElement.textContent = newValue;
                
                // 添加更新动画
                card.style.animation = 'pulse 0.5s ease-in-out';
                setTimeout(() => {
                    card.style.animation = '';
                }, 500);
            }
        });
    }
    
    // 生成随机趋势数据
    generateRandomTrend() {
        const isPositive = Math.random() > 0.5;
        const value = Math.random() * 20 + 1;
        const suffix = Math.random() > 0.5 ? '%' : '';
        return `${isPositive ? '+' : '-'}${value.toFixed(1)}${suffix}`;
    }
    
    // 播放入场动画
    playEntranceAnimations() {
        const animatableElements = [
            { selector: '.dashboard-header', delay: 0 },
            { selector: '.kpi-section', delay: 100 },
            { selector: '.main-chart-section', delay: 200 },
            { selector: '.secondary-charts-section', delay: 300 },
            { selector: '.data-table-section', delay: 400 }
        ];
        
        animatableElements.forEach(({ selector, delay }) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 0.6s ease-out';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }
    
    // 显示通知
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-light);
            border-radius: 8px;
            box-shadow: var(--shadow-medium);
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
            animation: slideInFromRight 0.3s ease-out;
        `;
        
        if (type === 'success') {
            notification.style.borderLeftColor = 'var(--success-green)';
            notification.style.borderLeftWidth = '4px';
        } else if (type === 'error') {
            notification.style.borderLeftColor = '#FF453A';
            notification.style.borderLeftWidth = '4px';
            notification.style.backgroundColor = 'rgba(255, 69, 58, 0.1)';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutToRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // 键盘快捷键处理
    handleKeyboardShortcuts(e) {
        // Cmd/Ctrl + D: 切换主题
        if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
            e.preventDefault();
            this.toggleTheme();
        }
        
        // Cmd/Ctrl + R: 刷新数据
        if ((e.metaKey || e.ctrlKey) && e.key === 'r') {
            e.preventDefault();
            this.refreshJobsTable();
        }
        
        // ESC: 清除所有选中状态
        if (e.key === 'Escape') {
            document.querySelectorAll('.selected').forEach(el => {
                el.classList.remove('selected');
            });
        }
    }
    
    // 处理窗口大小变化
    handleWindowResize() {
        // 防抖处理
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            // 重新计算图表大小
            if (window.Chart) {
                Object.values(window.Chart.instances || {}).forEach(chart => {
                    chart.resize();
                });
            }
        }, 250);
    }
    
    // 等待Chart.js库加载完成
    async waitForChartLibrary() {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 100; // 最多等待10秒
            
            const checkLibrary = () => {
                attempts++;
                
                if (window.Chart) {
                    console.log('✓ Chart.js 库检测到，可以开始初始化图表');
                    resolve();
                    return;
                }
                
                if (window.chartLibraryLoadError) {
                    console.error('❌ Chart.js 库加载失败');
                    reject(new Error('Chart.js 库加载失败，无法显示图表'));
                    return;
                }
                
                if (attempts >= maxAttempts) {
                    console.error('❌ Chart.js 库加载超时');
                    reject(new Error('Chart.js 库加载超时，请检查网络连接'));
                    return;
                }
                
                setTimeout(checkLibrary, 100);
            };
            
            checkLibrary();
        });
    }
    
    // 初始化图表（带错误处理）
    async initializeCharts() {
        try {
            if (!window.Chart) {
                throw new Error('Chart.js 库未正确加载');
            }
            
            if (!window.chartFunctions) {
                throw new Error('图表功能模块未正确加载');
            }
            
            if (!window.recruitmentData) {
                throw new Error('图表数据未正确加载');
            }
            
            console.log('开始初始化图表...');
            window.chartFunctions.initAllCharts();
            console.log('✓ 所有图表初始化完成');
            
        } catch (error) {
            console.error('图表初始化失败:', error.message);
            this.showChartError(error.message);
            throw error;
        }
    }
    
    // 显示图表错误信息
    showChartError(message) {
        const chartContainers = document.querySelectorAll('.chart-container');
        chartContainers.forEach(container => {
            const canvas = container.querySelector('canvas');
            if (canvas) {
                container.innerHTML = `
                    <div class="chart-error-state">
                        <div class="error-icon">⚠️</div>
                        <div class="error-message">图表加载失败</div>
                        <div class="error-details">${message}</div>
                        <button class="retry-btn" onclick="location.reload()">重试</button>
                    </div>
                `;
            }
        });
    }
    
    // 显示通用错误信息
    showErrorMessage(message) {
        this.showNotification(`错误: ${message}`, 'error');
    }
    
    // 延迟工具函数
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new RecruitmentDashboard();
    
    // 将实例挂载到window对象供调试使用
    window.dashboard = dashboard;
});

// 添加CSS动画样式
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideInFromRight {
        from { transform: translateX(300px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutToRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(300px); opacity: 0; }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .notification {
        animation: slideInFromRight 0.3s ease-out !important;
    }
`;

document.head.appendChild(animationStyles);