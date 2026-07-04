// Product Showcase — real data + copy for the shipped ITRI product.
// Figures below are what the live dashboard displays today (real product data),
// not fabricated; screenshots are captured from the running product.

export const LIVE_URL = 'https://itri-startup-platform.vercel.app/';

export const KPIS = [
    { id: 'opportunities', value: 156, delta: 12 },
    { id: 'active',        value: 24,  delta: 8 },
    { id: 'consultants',   value: 89,  delta: 15 },
    { id: 'financing',     value: 42,  delta: 20 },
];

export const DOMAINS = [
    { id: 'health',        count: 19, pct: 15.2 },
    { id: 'hardware',      count: 10, pct: 8.0 },
    { id: 'energy',        count: 10, pct: 8.0 },
    { id: 'ai',            count: 9,  pct: 7.2 },
    { id: 'food',          count: 8,  pct: 6.4 },
    { id: 'manufacturing', count: 8,  pct: 6.4 },
    { id: 'services',      count: 7,  pct: 5.6 },
    { id: 'agri',          count: 5,  pct: 4.0 },
    { id: 'realestate',    count: 5,  pct: 4.0 },
    { id: 'biotech',       count: 4,  pct: 3.2 },
];

export const INVESTORS = [
    { id: 'corp',     value: 2841 },
    { id: 'vc',       value: 1450 },
    { id: 'nds',      value: 594 },
    { id: 'overseas', value: 445 },
];

export const SCREENS = [
    { id: 'overview', img: 'overview.png' },
    { id: 'market',   img: 'market.png' },
    { id: 'subsidy',  img: 'subsidy.png' },
    { id: 'collab',   img: 'collab.png' },
];

export const FEATURES = [
    { id: 'dashboard', icon: 'chart',  state: 'live' },
    { id: 'market',    icon: 'trend',  state: 'live' },
    { id: 'subsidy',   icon: 'gift',   state: 'live' },
    { id: 'collab',    icon: 'bag',    state: 'live' },
    { id: 'funding',   icon: 'coin',   state: 'building' },
    { id: 'talent',    icon: 'people', state: 'building' },
];

export const COPY = {
    en: {
        eyebrow: 'The shipped product · Live at ITRI',
        name: 'Startup Business Intelligence',
        altName: '新創商情總覽',
        tagline: 'Integrating global business intelligence to help enterprises grow.',
        lead: 'A platform I designed and built solo, now running inside ITRI. It gathers Taiwan’s startup-economy signals — market reports, government grants, investment activity, and cross-border collaboration briefs — into one working desk. Everything below is real data the live product surfaces today.',
        cta: 'Open live product',
        stackLabel: 'Built with',
        stack: ['Python crawler', 'ETL pipeline', 'SQL', 'JS dashboard'],
        soloNote: 'Solo-built · Selected for the 2025 ITRI Star Program',
        tourLabel: 'Product tour',
        tourNote: 'Real screens, captured from the running product.',
        metricsLabel: 'What the dashboard surfaces',
        metricsNote: 'Live figures from the product overview, as displayed today.',
        deltaLabel: 'vs. last period',
        kpiNames: {
            opportunities: 'Collaboration opportunities',
            active: 'Active programs',
            consultants: 'Expert consultants',
            financing: 'Financing options',
        },
        domainsLabel: 'Opportunities by application domain',
        domainsNote: '85 curated opportunities spread across ten domains.',
        domainNames: {
            health: 'Healthcare', hardware: 'Hardware', energy: 'Energy', ai: 'AI',
            food: 'Food & Beverage', manufacturing: 'Manufacturing', services: 'Professional services',
            agri: 'Agriculture', realestate: 'Real estate', biotech: 'Biotech',
        },
        investorsLabel: 'Investor participation',
        investorsNote: 'Cumulative investors on record, by type.',
        investorNames: {
            corp: 'Corporate / CVC', vc: 'Venture capital', nds: 'National Development Fund', overseas: 'Overseas investors',
        },
        featuresLabel: 'Six working areas',
        stateLive: 'Live', stateBuilding: 'In progress',
        screenTitles: {
            overview: 'Overview dashboard', market: 'Market strategy', subsidy: 'Grant & subsidy finder', collab: 'Collaboration briefs',
        },
        screenCaptions: {
            overview: 'KPIs, the domain mix, investor activity, and a live updates feed at a glance.',
            market: 'Long-form international market reports — summary, highlights, charts, and a strategy take.',
            subsidy: 'Twelve live Taiwan grant programs with amounts, organizers, and topic filters.',
            collab: 'Cross-border opportunity briefs with full company profiles and technical needs.',
        },
        featureNames: {
            dashboard: 'Data dashboard', market: 'Global market analysis', subsidy: 'Government grants',
            collab: 'Business collaboration', funding: 'Investment & financing', talent: 'Consultant matching',
        },
        featureDesc: {
            dashboard: 'Opportunity, program, and investment metrics in one overview.',
            market: 'Curated international reports on the sectors Taiwan competes in.',
            subsidy: 'A searchable index of Taiwan startup subsidy programs.',
            collab: 'Cross-border partnership opportunities, with company detail.',
            funding: 'Investment and financing matching.',
            talent: 'Expert and advisor matching.',
        },
    },
    zh: {
        eyebrow: '已上線的產品 · 運作於工研院',
        name: '新創商情總覽',
        altName: 'Startup Business Intelligence',
        tagline: '整合全球商業情資，助力企業成長。',
        lead: '我獨立設計並開發、現正運作於工研院內部的平台。它把台灣新創生態的訊號——市場報告、政府補助、投資動態與跨境合作機會——彙整進同一張工作檯。以下皆為線上產品今日呈現的真實資料。',
        cta: '開啟線上產品',
        stackLabel: '技術組成',
        stack: ['Python 爬蟲', 'ETL 管線', 'SQL', 'JS 儀表板'],
        soloNote: '獨立開發 · 獲選 2025 年工研院育星計畫',
        tourLabel: '產品導覽',
        tourNote: '真實畫面，擷取自運作中的產品。',
        metricsLabel: '儀表板呈現的內容',
        metricsNote: '取自產品總覽的即時數字，如今日所示。',
        deltaLabel: '較上期',
        kpiNames: {
            opportunities: '合作機會總數', active: '進行中計畫', consultants: '專業顧問', financing: '融資方案',
        },
        domainsLabel: '合作機會的應用領域分布',
        domainsNote: '85 個精選機會，分布於十個領域。',
        domainNames: {
            health: '醫療保健', hardware: '硬體', energy: '能源', ai: '人工智慧',
            food: '食品飲料', manufacturing: '製造業', services: '專業服務',
            agri: '農業', realestate: '房地產', biotech: '生物科技',
        },
        investorsLabel: '參與投資情況',
        investorsNote: '在案投資人累計數，依類型。',
        investorNames: {
            corp: '企業／企業創投', vc: '創投', nds: '國發基金', overseas: '海外投資人',
        },
        featuresLabel: '六大功能區',
        stateLive: '已上線', stateBuilding: '建置中',
        screenTitles: {
            overview: '總覽儀表板', market: '市場策略', subsidy: '補助資源查找', collab: '合作機會詳述',
        },
        screenCaptions: {
            overview: '關鍵指標、領域分布、投資動態與即時更新，一覽即得。',
            market: '長篇國際市場報告——摘要、觀察亮點、圖表與策略建議。',
            subsidy: '十二項台灣補助計畫，含金額、主辦單位與主題篩選。',
            collab: '跨境合作機會詳述，附完整公司檔案與技術需求。',
        },
        featureNames: {
            dashboard: '數據儀表板', market: '全球市場分析', subsidy: '政府補助資源',
            collab: '商業合作機會', funding: '投資融資機會', talent: '顧問人才媒合',
        },
        featureDesc: {
            dashboard: '合作機會、計畫與投資指標，一頁總覽。',
            market: '針對台灣參與領域的國際市場報告。',
            subsidy: '可搜尋的台灣新創補助計畫索引。',
            collab: '跨境合作機會，附公司細節。',
            funding: '投資與融資媒合。',
            talent: '專家顧問媒合。',
        },
    },
};
