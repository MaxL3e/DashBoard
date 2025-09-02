// 招聘业务模拟数据文件
// 使用真实的招聘业务场景数据，让仪表盘更具说服力

// 核心KPI数据
const kpiData = {
    monthlyHires: {
        current: 128,
        previous: 104,
        trend: 23.1, // 增长百分比
        target: 135
    },
    completionRate: {
        current: 94,
        previous: 86,
        trend: 9.3,
        target: 95
    },
    averageDays: {
        current: 18,
        previous: 20,
        trend: -2,
        target: 15
    },
    costPerHire: {
        current: 1.2,
        previous: 1.5,
        trend: -0.3,
        target: 1.0
    }
};

// 月度招聘趋势数据（最近12个月）
const monthlyTrendData = {
    labels: ['2024-10', '2024-11', '2024-12', '2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09'],
    datasets: [
        {
            label: '新入职人数',
            data: [85, 92, 78, 95, 102, 88, 110, 125, 118, 132, 121, 128],
            borderColor: '#007AFF',
            backgroundColor: 'rgba(0, 122, 255, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: '#007AFF',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2
        },
        {
            label: '目标人数',
            data: [80, 85, 75, 90, 95, 85, 105, 120, 115, 125, 120, 135],
            borderColor: '#30D158',
            backgroundColor: 'rgba(48, 209, 88, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointBackgroundColor: '#30D158',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            borderDash: [5, 5]
        }
    ]
};

// 部门招聘分布数据
const departmentData = {
    labels: ['技术研发', '产品运营', '市场销售', '职能支持', '设计创意'],
    datasets: [{
        label: '招聘人数',
        data: [45, 28, 32, 18, 15],
        backgroundColor: [
            'rgba(0, 122, 255, 0.8)',
            'rgba(48, 209, 88, 0.8)',
            'rgba(255, 159, 10, 0.8)',
            'rgba(175, 82, 222, 0.8)',
            'rgba(255, 69, 58, 0.8)'
        ],
        borderColor: [
            '#007AFF',
            '#30D158',
            '#FF9F0A',
            '#AF52DE',
            '#FF453A'
        ],
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverOffset: 6
    }]
};

// 招聘渠道转化效果数据
const channelData = {
    labels: ['BOSS直聘', '拉勾网', '智联招聘', '内推', '猎头', '校园招聘', '社交媒体'],
    datasets: [{
        label: '简历投递量',
        data: [850, 620, 480, 320, 180, 240, 160],
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        borderColor: '#007AFF',
        borderWidth: 2
    }, {
        label: '面试邀请',
        data: [340, 248, 192, 160, 108, 120, 64],
        backgroundColor: 'rgba(48, 209, 88, 0.1)',
        borderColor: '#30D158',
        borderWidth: 2
    }, {
        label: '最终录用',
        data: [68, 43, 28, 48, 32, 36, 12],
        backgroundColor: 'rgba(255, 159, 10, 0.1)',
        borderColor: '#FF9F0A',
        borderWidth: 2
    }]
};

// 职位需求热度数据
const positionHeatData = [
    { position: 'iOS开发', heat: 'hot', applications: 156, level: 95 },
    { position: 'Android开发', heat: 'hot', applications: 143, level: 92 },
    { position: '前端工程师', heat: 'hot', applications: 189, level: 98 },
    { position: '后端工程师', heat: 'hot', applications: 167, level: 96 },
    { position: '产品经理', heat: 'warm', applications: 89, level: 78 },
    { position: 'UI设计师', heat: 'warm', applications: 76, level: 72 },
    { position: '运营专员', heat: 'warm', applications: 65, level: 68 },
    { position: '测试工程师', heat: 'cool', applications: 45, level: 45 },
    { position: '数据分析师', heat: 'cool', applications: 38, level: 42 },
    { position: 'HR专员', heat: 'cool', applications: 32, level: 38 }
];

// 候选人质量评估雷达图数据
const qualityRadarData = {
    labels: ['技术能力', '沟通表达', '团队协作', '学习能力', '工作态度', '创新思维'],
    datasets: [
        {
            label: '已入职员工平均',
            data: [85, 82, 88, 90, 87, 79],
            backgroundColor: 'rgba(0, 122, 255, 0.2)',
            borderColor: '#007AFF',
            borderWidth: 2,
            pointBackgroundColor: '#007AFF',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 5
        },
        {
            label: '候选人池平均',
            data: [78, 75, 81, 85, 83, 72],
            backgroundColor: 'rgba(48, 209, 88, 0.2)',
            borderColor: '#30D158',
            borderWidth: 2,
            pointBackgroundColor: '#30D158',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 5,
            borderDash: [5, 5]
        }
    ]
};

// 最新职位动态表格数据
const recentJobsData = [
    {
        title: 'iOS开发工程师',
        department: '技术研发',
        publishDate: '2025-08-28',
        applications: 47,
        interviewProgress: '复试中',
        status: 'active',
        priority: 'high'
    },
    {
        title: '高级产品经理',
        department: '产品运营',
        publishDate: '2025-08-25',
        applications: 32,
        interviewProgress: '终面',
        status: 'active',
        priority: 'high'
    },
    {
        title: 'UI/UX设计师',
        department: '设计创意',
        publishDate: '2025-08-24',
        applications: 28,
        interviewProgress: '初面',
        status: 'active',
        priority: 'medium'
    },
    {
        title: '前端开发工程师',
        department: '技术研发',
        publishDate: '2025-08-22',
        applications: 56,
        interviewProgress: '已结束',
        status: 'closed',
        priority: 'low'
    },
    {
        title: '市场营销经理',
        department: '市场销售',
        publishDate: '2025-08-20',
        applications: 24,
        interviewProgress: '复试中',
        status: 'active',
        priority: 'medium'
    },
    {
        title: '数据分析师',
        department: '职能支持',
        publishDate: '2025-08-18',
        applications: 18,
        interviewProgress: '筛选中',
        status: 'pending',
        priority: 'low'
    },
    {
        title: 'Android开发工程师',
        department: '技术研发',
        publishDate: '2025-08-15',
        applications: 41,
        interviewProgress: 'Offer发放',
        status: 'active',
        priority: 'high'
    },
    {
        title: '运营专员',
        department: '产品运营',
        publishDate: '2025-08-12',
        applications: 15,
        interviewProgress: '初面',
        status: 'active',
        priority: 'medium'
    }
];

// 实时统计数据
const realtimeStats = {
    totalPositions: 156,
    activePositions: 89,
    totalCandidates: 2847,
    interviewsToday: 23,
    offersThisWeek: 18,
    onboardingNext: 12,
    averageResponseTime: '2.3小时',
    satisfactionScore: 4.6
};

// 招聘漏斗数据
const recruitmentFunnelData = {
    totalApplications: 2847,
    screening: 1425,
    firstInterview: 712,
    secondInterview: 356,
    finalInterview: 178,
    offer: 89,
    accepted: 67,
    onboarded: 58
};

// 月度费用分析
const costAnalysisData = {
    labels: ['招聘平台费', '猎头费用', '内推奖金', '面试成本', '入职成本', '其他费用'],
    datasets: [{
        label: '费用金额(万元)',
        data: [45.8, 89.2, 23.5, 12.8, 18.7, 8.3],
        backgroundColor: [
            'rgba(0, 122, 255, 0.8)',
            'rgba(48, 209, 88, 0.8)',
            'rgba(255, 159, 10, 0.8)',
            'rgba(175, 82, 222, 0.8)',
            'rgba(255, 69, 58, 0.8)',
            'rgba(142, 142, 147, 0.8)'
        ],
        borderWidth: 0,
        hoverOffset: 8
    }]
};

// 候选人来源城市分布
const candidateLocationData = {
    '北京': { count: 847, percentage: 29.8 },
    '上海': { count: 654, percentage: 23.0 },
    '深圳': { count: 423, percentage: 14.9 },
    '杭州': { count: 298, percentage: 10.5 },
    '广州': { count: 245, percentage: 8.6 },
    '成都': { count: 187, percentage: 6.6 },
    '南京': { count: 134, percentage: 4.7 },
    '其他': { count: 59, percentage: 2.1 }
};

// 工作经验分布
const experienceDistributionData = {
    labels: ['应届生', '1-3年', '3-5年', '5-8年', '8-10年', '10年以上'],
    datasets: [{
        label: '候选人数量',
        data: [312, 856, 1023, 487, 134, 35],
        backgroundColor: [
            'rgba(255, 159, 10, 0.8)',
            'rgba(0, 122, 255, 0.8)',
            'rgba(48, 209, 88, 0.8)',
            'rgba(175, 82, 222, 0.8)',
            'rgba(255, 69, 58, 0.8)',
            'rgba(142, 142, 147, 0.8)'
        ],
        borderColor: '#FFFFFF',
        borderWidth: 2
    }]
};

// 面试反馈评分统计
const interviewFeedbackData = {
    technical: { average: 4.2, count: 245 },
    communication: { average: 4.5, count: 245 },
    cultural: { average: 4.3, count: 245 },
    motivation: { average: 4.6, count: 245 },
    overall: { average: 4.4, count: 245 }
};

// 导出所有数据供其他文件使用
window.recruitmentData = {
    kpiData,
    monthlyTrendData,
    departmentData,
    channelData,
    positionHeatData,
    qualityRadarData,
    recentJobsData,
    realtimeStats,
    recruitmentFunnelData,
    costAnalysisData,
    candidateLocationData,
    experienceDistributionData,
    interviewFeedbackData
};