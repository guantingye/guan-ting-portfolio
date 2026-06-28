import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from "https://esm.sh/react@18.2.0";
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
import {
  FiAward, FiTarget, FiGlobe, FiCpu, FiMap, FiDatabase, FiActivity, FiShield,
  FiBriefcase, FiZap, FiHeart, FiBarChart2, FiLayers, FiMonitor, FiTrendingUp,
  FiBookOpen, FiCheckCircle
} from "https://esm.sh/react-icons@5/fi?deps=react@18.2.0";
/* ═══════════════════════════════
   TRANSLATIONS
═══════════════════════════════ */
const T = {
    en: {
        navStory: 'Story', navWork: 'Work', navSkills: 'Skills', navAwards: 'Awards', navContact: 'Contact',
        heroStatusActive: 'ITRI / ISTI', heroStatusOpen: 'OPEN TO NEW ROLES',
        heroEyebrow: 'Deep Tech Translator · Taipei, Taiwan',
        heroTitle1: 'I turn frontier‑tech signals into',
        heroTitleEm: 'validated products',
        heroTitle2: '& investable strategies.',
        heroSub: 'Bridging behavioral science, generative AI, and ecosystem strategy\nto build products with both technical depth and human clarity.\nFrom fMRI signal to MVP shipment — full-stack in every sense.',
        heroCta1: 'Explore Work →', heroCta2: 'Read the Story',
        statYears: 'YEARS IN AI PRODUCTS', statProjects: 'PROJECTS',
        statAwards: 'AWARDS IN 2025', statPub: 'PRESENTATIONS',
        tagActive: '// ACTIVE: ITRI / ISTI', tagAward: '// OHBM 2025 · Brisbane',
        storyLabel: 'Chapter Log',
        storyTitle1: 'A portfolio you scroll', storyTitleEm: 'like a narrative', storyTitle2: '.',
        ch0Meta: 'CHAPTER 00 · 2019–2025', ch0Head: 'The Foundation: NCCU × TMBIC',
        ch0Body: 'M.S. Psychology (Cognitive Neuroscience) at National Chengchi University (NCCU). Concurrent RA at Taiwan Mind & Brain Imaging Center (TMBIC, 2022–2025), leading fMRI experiments, EEG signal processing, and statistical modeling. Presented neuroimaging research at OHBM 2025 (Brisbane). Received Best Thesis Award at TSCN 2025. Accepted to the I-9-9 Youth Tech Innovation International Program (Berlin).',
        ch1Meta: 'CHAPTER 01 · 2021–2023', ch1Head: 'Applied Research: Three Institutions',
        ch1Body: 'Research roles across healthcare and social sectors — quantitative data analysis at the Ministry of Health & Welfare Mental Health Center, UX optimization & data governance at Children & Family Welfare Association, and autism case services & AAC communication tool design at Mennonite Hospital. Each sharpened a different lens: scientific rigor, human-centered design, applied measurement.',
        ch2Meta: 'CHAPTER 02 · 2022–2024', ch2Head: 'Building Emobot+',
        ch2Body: 'My first AI product: a supportive mental-health prototype with personalization, safety guardrails, and evidence-based interaction patterns. Built as an MVP, tested through demos, and evolved through real feedback cycles. Silver Medal at the 2025 AI Interdisciplinary Sustainability Innovation Contest.',
        ch3Meta: 'CHAPTER 03 · 2024–PRESENT', ch3Head: 'Ecosystem Intelligence at ITRI/ISTI',
        ch3Body: 'Independently built the Startup Intelligence Platform (新創商情平台) — a full-stack data visualization system for real-time ecosystem monitoring. Alongside: Taiwan Startup Ecosystem Map covering 230+ companies, global deep tech trend reports, and the Star Program venture incubation support. Selected as 2025 ITRI Star Program seed cultivator.',
        ch4Meta: 'CHAPTER 04 · NOW', ch4Head: 'The next chapter',
        ch4Body: 'Looking for roles where I can bridge rigorous research and real product execution — teams building AI-native systems that genuinely serve people. Open to product, research, and ecosystem strategy roles globally.',
        workLabel: 'Selected Projects', workTitle1: 'Work that', workTitleEm: 'ships', workTitle2: ', evidence that holds.',
        skillsLabel: 'Capabilities', skillsTitle1: 'The full', skillsTitleEm: 'stack', skillsTitle2: '.',
        skillDomain: 'Domain', skillTech: 'Technical', skillLang: 'Languages & Soft Skills',
        awardsLabel: 'Awards & Recognition',
        awardsTitle1: 'Signals of proof,', awardsTitleEm: 'across research and product.' ,
        award1Title: 'Silver Medal · AI Sustainability Innovation Contest', award1Inst: '2025 AI Interdisciplinary Sustainability Innovation Contest',
        award1Desc: 'Led Emobot+ as an AI mental-health product prototype, translating psychology, UX research, risk detection, persona matching, and full-stack prototyping into a competition-ready system.' ,
        award2Title: 'The Excellent Award · TSCN Annual Meeting', award2Inst: 'Taiwan Society of Cognitive Neuroscience · 2025',
        award2Desc: 'Presented thesis research integrating behavioral data, learning outcomes, and fMRI functional connectivity to examine instructor presence and online learning effects.' ,
        award3Title: 'AI Interdisciplinary Research Proposal Selected', award3Inst: 'NCCU AI Center · 2025',
        award3Desc: 'Designed a proposal for an affect-adaptive therapeutic companion system, connecting digital mental-health service design, HCI, LLM interaction, and psychologist handoff pathways.' ,
        award4Title: 'International Neuroimaging Presentation', award4Inst: 'OHBM Annual Meeting · Brisbane · 2025',
        award4Desc: 'Presented research on online lecture instructor presence, learning outcomes, and FPN–SN connectivity at an international neuroimaging venue.' ,
        award5Title: 'Youth Tech Innovation International Program', award5Inst: 'Global Pathfinders Initiative · Berlin',
        award5Desc: 'Selected for an international AI innovation program in Berlin, focusing on AI adoption, creative technology, digital transformation, governance, and cross-national ecosystem learning.',
        award6Title: 'ITRI Star Program · Seed Cultivator', award6Inst: 'ITRI / ISTI · 2025',
        award6Desc: 'Joined the Star Program training track for startup industry research, technology trend analysis, data platform development, go-to-market strategy, and commercialization thinking.',
        contactLabel: 'Get in Touch',
        contactTitle1: "Let's build something", contactTitleEm: 'worth remembering', contactTitle2: '.',
        contactNote: "I'm open to product roles, research collaborations, and ecosystem strategy work. If you're building something ambitious at the frontier of deep tech — let's talk.",
        contactEmail: 'EMAIL', contactPhone: 'PHONE', contactLang: 'LANGUAGES',
        footerCopy: '© 2026 Guan-Ting Ye', footerTag: 'Neural Signal OS · v5',
        projBack: '← All Projects',
        projRole: 'ROLE', projTimeline: 'TIMELINE', projStatus: 'STATUS', projImpact: 'IMPACT',
        projOverview: 'Overview', projOutcomes: 'Key Outcomes', projTech: 'Technical Approach', projAwards: 'Awards & Recognition',
        nextProj: 'Next Project →', prevProj: '← Previous',
        comingSoon: 'Coming Soon', csDesc: 'This project page is under construction. Check back soon.',
        certTitle: 'Certifications',
    },
    zh: {
        navStory: '故事', navWork: '作品', navSkills: '技能', navAwards: '獎項', navContact: '聯繫',
        heroStatusActive: '工研院 / 產科國際所', heroStatusOpen: '開放新機會',
        heroEyebrow: '深科技翻譯者 · 台灣台北',
        heroTitle1: '我將前沿技術信號，轉化為',
        heroTitleEm: '經過驗證的產品',
        heroTitle2: '與可投資的策略。',
        heroSub: '橋接行為科學、生成式 AI 與生態系策略，\n打造兼具技術深度與人本清晰度的產品。\n從 fMRI 信號到 MVP 交付——每個維度都是全端。',
        heroCta1: '探索作品 →', heroCta2: '閱讀故事',
        statYears: 'AI 產品年資', statProjects: '核心專案',
        statAwards: '2025 年獎項', statPub: '學術發表',
        tagActive: '// 現職：工研院 / 產科國際所', tagAward: '// OHBM 2025 · 布里斯本',
        storyLabel: '章節記錄',
        storyTitle1: '這是一份', storyTitleEm: '有敘事弧度', storyTitle2: '的作品集。',
        ch0Meta: '第零章 · 2019–2025', ch0Head: '基礎養成：政大 × 腦造影中心',
        ch0Body: '國立政治大學心理學系暨研究所（認知神經科學組）碩士。同期擔任台灣心智科學腦造影中心（TMBIC，2022–2025）研究助理，主導 fMRI 實驗、EEG 訊號處理與統計建模。於 2025 年國際人腦圖譜學會（OHBM）年會在布里斯本發表研究。榮獲 TSCN 2025 碩士論文優等獎。獲選 I-9-9 青年百億計畫（赴柏林學習參訪）。',
        ch1Meta: '第一章 · 2021–2023', ch1Head: '應用研究：跨機構實戰',
        ch1Body: '跨醫療與社福領域的研究工作——於衛福部心理衛生中心進行量化數據分析，於兒童暨家庭關懷協會進行 UX 優化與資料治理，並於門諾醫院黎明機構提供自閉症個案服務與 AAC 溝通輔具設計。每段經歷都磨利了不同視角：科學嚴謹性、以人為中心的設計、應用測量。',
        ch2Meta: '第二章 · 2022–2024', ch2Head: '打造 Emobot+',
        ch2Body: '我的第一個 AI 產品：具備個性化、安全防護與循證互動設計的心理健康輔助原型。從概念到 MVP，在真實用戶回饋中持續進化。榮獲 2025 AI 跨域永續創新競賽銀獎。',
        ch3Meta: '第三章 · 2024–至今', ch3Head: '工研院生態系情報工作',
        ch3Body: '獨立開發「新創商情平台」——支援即時生態系監控的全端數據視覺化系統。同時進行：涵蓋 230+ 家公司的台灣新創生態系地圖、全球深科技趨勢報告，以及育星計畫新創孵化支援。獲選 2025 年工研院育星計畫種子培育。',
        ch4Meta: '第四章 · 現在', ch4Head: '下一篇章',
        ch4Body: '尋找能橋接嚴謹研究與真實產品執行的機會——與真正服務人的 AI 原生系統團隊合作。開放全球產品、研究與生態系策略相關職位。',
        workLabel: '精選專案', workTitle1: '能夠', workTitleEm: '落地交付', workTitle2: '，經得起驗證的作品。',
        skillsLabel: '能力地圖', skillsTitle1: '完整的', skillsTitleEm: '技能堆疊', skillsTitle2: '。',
        skillDomain: '領域', skillTech: '技術', skillLang: '語言與軟實力',
        awardsLabel: '獎項與認可',
        awardsTitle1: '從研究到產品，', awardsTitleEm: '可被驗證的成果。',
        award1Title: '銀獎 · AI 跨域永續創新競賽', award1Inst: '2025 AI 跨域永續創新競賽',
        award1Desc: '以 Emobot+：AI 數位心理支持與情緒陪伴系統參賽，將心理學、UX Research、風險偵測、人格媒合與全端原型整合成可展示的產品系統。',
        award2Title: '碩士論文優等獎 · TSCN 年會', award2Inst: '2025 台灣認知神經科學學會年會',
        award2Desc: '以口頭報告形式發表研究，整合行為資料、學習表現與 fMRI 功能性連結，分析講師臨場感、學習成效與神經網絡變化。',
        award3Title: 'AI 跨域研究構想計畫獲選', award3Inst: '2025 政治大學 AI 中心',
        award3Desc: '提出情緒適應型輔療陪伴機器人與數位心理支持整合系統，涵蓋 HCI、LLM 互動、情緒調節、真人心理師轉介與匿名互動空間設計。',
        award4Title: '國際神經影像學術發表', award4Inst: 'OHBM Annual Meeting 2025 · Brisbane',
        award4Desc: '發表 Instructor presence enhanced learning and strengthened FPN-SN connectivity during online lecture，聚焦線上教學、學習成效與大腦功能性連結。',
        award5Title: '青年科技創新國際 · 德國柏林', award5Inst: '青年百億海外圓夢計畫',
        award5Desc: '獲選赴德國柏林進行科技創新、AI 應用、國際新創生態、智慧製造與數位轉型研習，強化 AI Product Strategy、UX Research、HCI 與跨文化創新判讀能力。',
        award6Title: '工研院產科國際所 · 育星計畫', award6Inst: 'ITRI / ISTI · 2025',
        award6Desc: '參與新創產業研究、科技趨勢分析、資料平台建構、go-to-market 商情平台設計與技術商業化訓練，將分散資訊轉化為策略洞察。',
        contactLabel: '取得聯繫',
        contactTitle1: '讓我們打造', contactTitleEm: '值得被記住', contactTitle2: '的事物。',
        contactNote: '歡迎洽談產品職位、研究合作或生態系策略工作。若你正在深科技前沿打造有野心的東西——我們來談談。',
        contactEmail: '電子郵件', contactPhone: '電話', contactLang: '語言',
        footerCopy: '© 2026 葉冠廷', footerTag: '神經信號 OS · v5',
        projBack: '← 所有專案',
        projRole: '角色', projTimeline: '時程', projStatus: '狀態', projImpact: '成果',
        projOverview: '專案概述', projOutcomes: '關鍵成果', projTech: '技術方法', projAwards: '獎項與認可',
        nextProj: '下一個專案 →', prevProj: '← 上一個',
        comingSoon: '即將推出', csDesc: '此專案頁面建置中，敬請期待。',
        certTitle: '認證',
    }
};
/* ═══════════════════════════════
   AWARDS DATA
═══════════════════════════════ */
const AWARDS_DATA = [
    { iconKey: 'award', year: '2025', period: '2025/03–2025/12', titleKey: 'award1Title', instKey: 'award1Inst', descKey: 'award1Desc', tags: ['AI Product', 'UX Research', 'Full-stack Prototype'], link: 'https://iaic.nccu.edu.tw/achievements/60' },
    { iconKey: 'book', year: '2025', period: '2025/10–2025/11', titleKey: 'award2Title', instKey: 'award2Inst', descKey: 'award2Desc', tags: ['fMRI', 'Learning Science', 'Research Presentation'] },
    { iconKey: 'target', year: '2025', period: '2025/03–2025/12', titleKey: 'award3Title', instKey: 'award3Inst', descKey: 'award3Desc', tags: ['Digital Health', 'Human-AI Interaction', 'Service Design'] },
    { iconKey: 'globe', year: '2025', period: '2025/06', titleKey: 'award4Title', instKey: 'award4Inst', descKey: 'award4Desc', tags: ['OHBM', 'Neuroimaging', 'FPN–SN Connectivity'] },
    { iconKey: 'map', year: '2026', period: '2026/08', titleKey: 'award5Title', instKey: 'award5Inst', descKey: 'award5Desc', tags: ['Berlin', 'AI Governance', 'Innovation Ecosystem'] },
    { iconKey: 'database', year: '2025', period: '2025/07–2025/08', titleKey: 'award6Title', instKey: 'award6Inst', descKey: 'award6Desc', tags: ['Industry Research', 'Data Platform', 'Go-to-market'] },
];

const ICONS = {
    award: FiAward,
    target: FiTarget,
    globe: FiGlobe,
    cpu: FiCpu,
    map: FiMap,
    database: FiDatabase,
    activity: FiActivity,
    shield: FiShield,
    briefcase: FiBriefcase,
    zap: FiZap,
    heart: FiHeart,
    chart: FiBarChart2,
    layers: FiLayers,
    monitor: FiMonitor,
    trend: FiTrendingUp,
    book: FiBookOpen,
    check: FiCheckCircle,
};
function Icon({ name, className = '' }) {
    const Component = ICONS[name] || FiAward;
    return React.createElement(Component, { className: `icon-svg ${className}`, 'aria-hidden': 'true', focusable: 'false' });
}
/* ═══════════════════════════════
   PROJECTS DATA
═══════════════════════════════ */
const PROJECTS = [
    {
        slug: 'emobot-plus', num: '01',
        category: 'AI Product · Digital Mental Health', zhCategory: 'AI 產品 · 數位心理健康',
        title: 'Emobot+', subtitle: 'Award-winning AI Mental Health Companion',
        zhTitle: 'Emobot+', zhSubtitle: '得獎 AI 數位心理支持系統',
        hook: "An award-winning AI mental-health companion that turns anonymous campus check-ins into trait-matched support, safety-aware dialogue, and counselor-ready insight.",
        zhHook: '一個得獎的 AI 心理支持系統，將匿名校園情緒入口轉化為特質媒合、風險感知對話與諮商端可用洞察。',
        stack: ['React', 'FastAPI', 'LLM Safety', 'Psychological Embedding', 'Avatar UX', 'SDG 3'],
        role: 'Founder & Product Lead / UX Strategist', zhRole: '創辦人 / 產品負責人 / UX 策略',
        timeline: '2022 – 2024', status: 'Award-winning MVP', zhStatus: '獲獎 MVP',
        impact: 'Silver Medal · 2025 AI Sustainability Contest', zhImpact: '2025 AI 跨域永續創新競賽 · 銀獎',
        overview: "Emobot+ began from a concrete campus service problem: students often need support before they are ready to book counseling, while counseling teams need better early signals without turning everyday emotion into a clinical label. I shaped the project as a product system around low-threshold entry, consent-based data use, and clear boundaries between AI companionship and professional care.\n\nThe proposal that won the 2025 AI Interdisciplinary Sustainability Innovation Contest positioned Emobot+ as a 24/7 emotional support layer for universities. Users can start with everyday language, complete lightweight trait and need signals, and meet a companion persona calibrated to their emotional pattern, disclosure comfort, and preferred support style.\n\nThe product is designed as a bridge rather than a replacement: natural conversation supports reflection and self-awareness, while the backend extracts emotional trends, issue tags, and risk signals that can be summarized for counselors only with user consent.",
        zhOverview: "Emobot+ 的起點是一個具體的校園服務問題：許多學生在願意正式預約諮商之前就已經需要支持，而諮商團隊也需要更早期的訊號，但不能把日常情緒直接臨床化。因此我將專案設計成一個產品系統：低門檻入口、同意制資料使用，以及 AI 陪伴與專業照護之間清楚的邊界。\n\n這份提案獲得 2025 AI 跨域永續創新競賽銀獎，核心定位是大學場域中的 24/7 情緒支持層。使用者可以用日常語言開始對話，透過輕量化特質與需求訊號，媒合到更符合自身情緒模式、自我揭露舒適度與支持偏好的 AI 陪伴角色。\n\n產品不是要取代心理師，而是作為橋接系統：自然對話協助反思與自我覺察，後端則在使用者同意下整理情緒趨勢、議題標籤與風險訊號，轉化為諮商端可快速理解的摘要。",
        outcomes: ['Reframed campus mental-health friction into a product journey spanning anonymous entry, companion matching, safety routing, and counselor handoff', 'Designed trait and need matching around MBTI, attachment style, emotion regulation, basic psychological needs, and conversation history', 'Specified a React + FastAPI architecture with psychological embedding, emotion-topic analysis, risk phrase detection, and consent-based reporting', 'Created a four-persona companion system for different support modes: validation, grounding, action planning, and cognitive reframing', 'Won Silver Medal at the 2025 AI Interdisciplinary Sustainability Innovation Contest and converted the award proposal into a portfolio-ready product case', 'Defined validation signals across PHQ-9 / GAD-7 / PANAS, self-disclosure, companionship, session depth, and qualitative user feedback'],
        zhOutcomes: ['將校園心理支持痛點重構為完整產品旅程：匿名入口、陪伴角色媒合、安全分流與諮商端銜接', '以 MBTI、依附風格、情緒調節、基本心理需求與對話歷程設計特質與需求媒合機制', '規劃 React + FastAPI 架構，結合心理嵌入、情緒議題分析、風險語句偵測與同意制報告', '建立四種 AI 陪伴角色，分別對應情緒接住、穩定安撫、行動規劃與認知重構等支持模式', '獲得 2025 AI 跨域永續創新競賽銀獎，並將競賽提案轉化為作品集中的產品案例', '定義 PHQ-9 / GAD-7 / PANAS、自我揭露、陪伴感、對話深度與質性訪談等驗證訊號'],
        tech: [{ label: 'Frontend', val: 'React 18, guided onboarding, responsive case UI, avatar-ready interaction surfaces' }, { label: 'Backend', val: 'FastAPI, Python services, consent-based session logging and report generation' }, { label: 'Matching', val: 'Psychological embedding with trait vectors, need signals, and conversation history' }, { label: 'AI Layer', val: 'LLM dialogue orchestration, BERT/NRC-style emotion analysis, topic tagging' }, { label: 'Avatar', val: 'D-ID / HeyGen / TTS-ready multimodal companion direction with voice and facial cues' }, { label: 'Safety', val: 'Risk phrase detection, escalation thresholds, counselor summary, professional resource routing' }],
        awards: [{ iconKey: 'award', title: 'Silver Medal', desc: '2025 AI Interdisciplinary Sustainability Innovation Contest (AI 跨域永續創新競賽)' }],
    },
    {
        slug: 'deeptech-database', num: '02',
        category: 'Data Engineering', zhCategory: '資料工程',
        title: 'Global DeepTech Database', subtitle: 'Ecosystem Intelligence System',
        zhTitle: '全球深科技資料庫', zhSubtitle: '生態系情報系統',
        hook: "A living dataset that maps Taiwan's deep tech landscape — company by company, signal by signal.",
        zhHook: '一個持續更新的資料集，逐家公司、逐個信號地描繪台灣深科技生態地圖。',
        stack: ['Python', 'Pandas', 'Playwright', 'ETL', 'SQL', 'yfinance', 'curl_cffi'],
        role: 'Lead Engineer & Analyst', zhRole: '主任工程師 / 分析師',
        timeline: '2024 – Present', status: 'Active · v9+', zhStatus: '持續更新 · v9+',
        impact: '230+ companies tracked', zhImpact: '追蹤 230+ 家公司',
        overview: "This is the data backbone of ITRI/ISTI's startup ecosystem intelligence. Starting from a seed list of ~230 Taiwan deep tech companies, I built a multi-source enrichment pipeline that pulls financial, governance, talent, news, and competitive data automatically.\n\nThe system targets notoriously hard-to-scrape sources: 104 人力銀行, TSIA, SEMI.org, ASIP, MOPS (公開資訊觀測站), and Cloudflare-protected sites. Each required custom handling — Playwright-based browser automation for JS-heavy pages, cache fallback strategies, and append-only protocols to maintain data integrity across versions.\n\nCurrently at v9.2, with ongoing work on Cloudflare bypass and selector stability.",
        zhOverview: "這是工研院產科國際所新創生態系情報工作的數據骨幹。從約 230 家台灣深科技公司的種子名單出發，我建立了多源資料豐富化管線，能自動抓取財務、治理、人才、新聞與競爭情報。\n\n系統針對難以爬取的來源：104 人力銀行、TSIA、SEMI.org、ASIP、MOPS，以及受 Cloudflare 保護的網頁。每個來源都需要客製化處理——Playwright 瀏覽器自動化、快取回退策略，以及維護跨版本資料完整性的附加協議。\n\n目前版本為 v9.2，持續進行 Cloudflare 繞過策略優化。",
        outcomes: ['Built multi-source crawler: 104.com.tw, TSIA, SEMI.org, ASIP, MOPS', 'Designed append-only data protocol maintaining integrity across 9+ versions', 'Automated ETL pipeline with Playwright for Cloudflare-protected sources', 'Enriched 230+ company profiles with financial, talent, and competitive signals', 'Powers national-level ecosystem analysis and investment reports at ITRI'],
        zhOutcomes: ['建立多源爬蟲，目標包含 104.com.tw、TSIA、SEMI.org、ASIP、MOPS', '設計附加協議，維護 9+ 版本間的資料完整性', '以 Playwright 自動化 ETL 管線處理受 Cloudflare 保護的來源', '豐富 230+ 家公司資料，涵蓋財務、人才與競爭信號', '支撐工研院國家級生態系分析與投資報告'],
        tech: [{ label: 'Crawler', val: 'Python Playwright, BeautifulSoup, curl_cffi' }, { label: 'Data Store', val: 'Pandas DataFrames, CSV append-only protocol' }, { label: 'Finance', val: 'yfinance, MOPS API, custom regex parsers' }, { label: 'Search', val: 'DuckDuckGo / Bing API enrichment layer' }, { label: 'Anti-block', val: 'Cache fallback, Cloudflare bypass, proxy rotation' }, { label: 'Output', val: 'Structured Excel reports, Notion integration' }],
        awards: [],
    },
    {
        slug: 'ai-product-launch-os', num: '03',
        category: 'AI Product Management · Launch Strategy', zhCategory: 'AI 產品管理 · 上市策略',
        title: 'AI Product Launch OS', subtitle: 'Cinematic Launch Case Study',
        zhTitle: 'AI Product Launch OS', zhSubtitle: 'AI 產品上市敘事案例',
        hook: 'A launch studio for turning fuzzy market signals into a sharp product bet, a credible story, and a decision system teams can act on.',
        zhHook: '一個產品上市工作室：把模糊市場訊號轉成清楚產品賭注、可信敘事與團隊可執行的決策系統。',
        stack: ['AI PM', 'GTM Strategy', 'Roadmapping', 'Metrics', 'UX Research', 'React Prototype'],
        role: 'AI Product Manager / Product Designer', zhRole: 'AI 產品經理 / 產品設計師',
        timeline: '2025 – 2026', status: 'Applied Capstone · Portfolio Case', zhStatus: '應用型 Capstone · 作品集案例',
        impact: 'Launch workflow aligned with AI PM, analytics, and GTM evidence', zhImpact: '對齊 AI PM、資料分析與上市證據的產品流程',
        overview: "AI Product Launch OS is written as a launch studio, not a certificate showcase. The story begins in the messy middle: a team sees AI opportunity everywhere, but the signals are scattered across customer pain, competitive pressure, model feasibility, data readiness, compliance risk, and unclear buyer urgency.\n\nI turned that ambiguity into a working product narrative: what problem is worth solving, which user moment creates urgency, what should be built first, how the launch should be staged, and which metrics tell us whether the product is becoming useful rather than merely impressive.\n\nThe interface is designed like a room where product, design, engineering, and go-to-market can work from the same wall. Each panel has a job: signal scan, launch bet, roadmap, metric tree, risk register, stakeholder story, and learning loop. Credentials sit in the evidence area as support, while the body of the case focuses on product judgment and execution logic.",
        zhOverview: "AI Product Launch OS 被寫成一個產品上市工作室，而不是證照展示頁。故事從最混亂的中段開始：團隊看見到處都有 AI 機會，但訊號分散在使用者痛點、競品壓力、模型可行性、資料準備度、合規風險與不明確的買方急迫性之中。\n\n我將這些不確定性轉成可工作的產品敘事：什麼問題值得解、哪個使用者瞬間創造急迫性、第一版應該做什麼、上市如何分階段，以及哪些指標能判斷產品正在變得有用，而不只是看起來很厲害。\n\n介面被設計成產品、設計、工程與 go-to-market 可以共用的一面牆。每個面板都有明確任務：訊號掃描、上市賭注、路線圖、指標樹、風險登錄表、利害關係人故事與學習迴圈。證照被放在佐證區，正文聚焦產品判斷與執行邏輯。",
        outcomes: ['Built a product narrative that moves from market ambiguity to a focused launch bet and measurable learning agenda', 'Designed a launch cockpit that connects customer urgency, model readiness, UX risk, roadmap sequencing, and GTM messaging', 'Created an executive-friendly metric tree linking activation, workflow value, trust, retention, and risk reduction', 'Structured the rollout as four learning loops: concept room, pilot corridor, launch theatre, and post-launch signal review', 'Positioned credentials as evidence of discipline while keeping the case centered on product strategy and team decision-making'],
        zhOutcomes: ['建立從市場模糊性到明確上市賭注與可衡量學習議程的產品敘事', '設計上市 cockpit，串接使用者急迫性、模型準備度、UX 風險、路線圖排序與 GTM 訊息', '建立適合主管閱讀的指標樹，連結 activation、workflow value、trust、retention 與風險降低', '將 rollout 拆成四個學習迴圈：concept room、pilot corridor、launch theatre 與 post-launch signal review', '將證照作為紀律佐證，但案例核心仍聚焦產品策略與團隊決策'],
        tech: [{ label: 'Product Strategy', val: 'Opportunity framing, launch thesis, roadmap sequencing, stakeholder narrative' }, { label: 'AI PM Layer', val: 'Model-risk assumptions, data readiness, human-in-the-loop workflow, launch gates' }, { label: 'Analytics', val: 'Metric tree, activation / retention / trust metrics, experiment design' }, { label: 'GTM Design', val: 'Positioning, buyer story, adoption loop, launch communication plan' }, { label: 'Prototype', val: 'React story interface, glass panels, live cockpit, responsive image system' }, { label: 'Evidence', val: 'IBM AI PM, Google PM, Google Advanced Data Analytics credentials' }],
        // Replace later with: assets/projects/ai-product-launch-os-cover.webp
        caseHeroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
        imageReplaceHint: 'Replace with assets/projects/ai-product-launch-os-cover.webp or a launch dashboard screenshot.',
        caseDeck: {
            eyebrow: 'Launch cockpit',
            zhEyebrow: '上市駕駛艙',
            title: 'From fuzzy opportunity to launch-room clarity',
            zhTitle: '從模糊機會到上市會議室的清晰度',
            body: 'A high-signal workspace for reviewing the product bet, the user moment, the rollout path, and the evidence needed before a team commits resources.',
            zhBody: '一個高訊號工作區，用來檢視產品賭注、使用者關鍵時刻、 rollout 路徑，以及團隊投入資源前需要的證據。',
            kpis: [
                { label: 'Launch loops', value: '4', zhLabel: '上市迴圈' },
                { label: 'Evidence walls', value: '3', zhLabel: '證據牆' },
                { label: 'Decision gates', value: '7', zhLabel: '決策門檻' },
            ],
            signals: ['Customer urgency', 'Data readiness', 'Model risk', 'Adoption story', 'Post-launch learning'],
            zhSignals: ['使用者急迫性', '資料準備度', '模型風險', '採用故事', '上線後學習'],
        },
        storyMoments: [
            { iconKey: 'target', title: 'The product bet', zhTitle: '產品賭注', body: 'Name the user, the painful workflow, the promised shift, and the reason now is the right time to launch.', zhBody: '說清楚使用者、痛苦工作流、承諾改變，以及為什麼現在是上市時機。' },
            { iconKey: 'chart', title: 'The evidence wall', zhTitle: '證據牆', body: 'Bring research notes, metrics, risk assumptions, and credential proof into one readable surface.', zhBody: '將研究筆記、指標、風險假設與證照佐證放在同一個可閱讀表面。' },
            { iconKey: 'trend', title: 'The launch rhythm', zhTitle: '上市節奏', body: 'Move from internal conviction to pilot learning, public story, adoption review, and roadmap correction.', zhBody: '從內部確信、pilot 學習、公眾敘事、採用回顧到路線圖修正。' },
        ],
        caseGallery: [
            { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', title: 'Signal dashboard', zhTitle: '訊號儀表板', note: 'Market signals and AI opportunity monitoring', zhNote: '市場訊號與 AI 機會監測' },
            { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', title: 'Metric intelligence', zhTitle: '指標情報', note: 'Evidence-backed prioritization and launch metrics', zhNote: '證據導向的優先級與上市指標' },
            { src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80', title: 'Strategy review', zhTitle: '策略評審', note: 'Stakeholder alignment, roadmap critique, GTM framing', zhNote: '利害關係人對齊、路線圖評審與 GTM framing' },
            { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80', title: 'Narrative workshop', zhTitle: '敘事工作坊', note: 'Turning ambiguous AI ideas into product decisions', zhNote: '將模糊 AI 想法轉成產品決策' },
            { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80', title: 'Launch artifacts', zhTitle: '上市文件', note: 'PRD-lite, risk register, launch checklist placeholders', zhNote: 'PRD-lite、風險登錄表與上市檢查表預留' },
            { src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80', title: 'Decision room', zhTitle: '決策會議室', note: 'Cross-functional launch discussion and stakeholder readiness', zhNote: '跨職能上市討論與利害關係人準備度' },
            { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80', title: 'Workshop board', zhTitle: '工作坊白板', note: 'Opportunity clustering, roadmap debate, and launch storyline', zhNote: '機會聚類、路線圖辯論與上市故事線' },
            { src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80', title: 'GTM planning', zhTitle: 'GTM 規劃', note: 'Positioning, adoption loop, and market-facing narrative', zhNote: '定位、採用迴圈與市場敘事' },
        ],
        storyChapters: [
            { iconKey: 'activity', label: 'Signal', zhLabel: '訊號', title: 'Listen for the pattern behind the noise', zhTitle: '聽見噪音背後的模式', body: 'The launch story starts before the roadmap. I scan market reports, workflow complaints, competitor moves, data availability, and policy pressure, then turn them into a one-page opportunity brief that explains why this problem is becoming urgent now.', zhBody: '上市故事從路線圖之前開始。我掃描市場報告、工作流抱怨、競品動態、資料可用性與政策壓力，再將它們整理成一頁機會 brief，說明為什麼這個問題正在此刻變得急迫。', artifact: 'Opportunity brief', zhArtifact: '機會 brief' },
            { iconKey: 'target', label: 'Problem', zhLabel: '問題', title: 'Make the launch bet small enough to test', zhTitle: '把上市賭注縮小到可測試', body: 'Instead of saying “build an AI product,” the case names a concrete user moment: what the user is trying to finish, what currently slows them down, what trust barrier blocks adoption, and which decision will improve if the product works.', zhBody: '案例不說「打造 AI 產品」，而是命名一個具體使用者瞬間：使用者想完成什麼、目前被什麼拖慢、哪個信任障礙阻擋採用，以及如果產品有效，哪個決策會變好。', artifact: 'User moment map', zhArtifact: '使用者瞬間地圖' },
            { iconKey: 'layers', label: 'OS', zhLabel: '系統', title: 'Design a launch room, not a static deck', zhTitle: '設計上市會議室，而非靜態簡報', body: 'The OS behaves like a shared workspace: roadmap, evidence board, risk register, metric tree, and stakeholder story all sit together. The design goal is to help a team argue clearly, decide faster, and know what evidence is still missing.', zhBody: '這套 OS 像一個共用工作區：路線圖、證據板、風險登錄表、指標樹與利害關係人故事被放在一起。設計目標是幫助團隊更清楚地討論、更快決策，並知道還缺什麼證據。', artifact: 'Launch cockpit', zhArtifact: '上市 cockpit' },
            { iconKey: 'trend', label: 'Launch', zhLabel: '上市', title: 'Turn rollout into a living rhythm', zhTitle: '把 rollout 變成活的節奏', body: 'The launch plan moves through concept room, pilot corridor, beta narrative, public release, and post-launch signal review. Each step has a threshold, a learning question, and a visible owner so momentum does not depend on memory.', zhBody: '上市計畫經過 concept room、pilot corridor、beta narrative、公眾發布與上線後訊號回顧。每一步都有門檻、學習問題與可見 owner，讓進度不依賴記憶。', artifact: 'Rollout rhythm', zhArtifact: 'Rollout 節奏' },
            { iconKey: 'check', label: 'Evidence', zhLabel: '證據', title: 'Let the artifacts do the talking', zhTitle: '讓產出替能力說話', body: 'The credentials are deliberately placed beside product artifacts rather than above them. The viewer should remember the work: PRD excerpts, launch checklist, stakeholder map, metric tree, risk notes, and the way decisions connect.', zhBody: '證照被刻意放在產品產出旁，而不是放在產出之上。觀看者應該記得的是工作本身：PRD 摘要、上市檢查表、利害關係人地圖、指標樹、風險筆記，以及決策如何被串起來。', artifact: 'Evidence wall', zhArtifact: '證據牆' },
        ],
        pullQuote: 'The strongest AI launch story is not “we used AI.” It is “we changed a decision, reduced a risk, and learned faster than the old workflow.”',
        zhPullQuote: '最強的 AI 上市敘事不是「我們使用了 AI」，而是「我們改變了一個決策、降低了一個風險，並比舊流程學得更快」。',
        evidenceSlots: [
            { iconKey: 'chart', title: 'Launch Readiness Board', zhTitle: '上市準備度看板', desc: 'Concept placeholder for product strategy board, roadmap, or metric tree screenshot.', zhDesc: '以概念圖暫代產品策略板、路線圖或指標樹截圖。', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80' },
            { iconKey: 'briefcase', title: 'PRD / GTM Artifact', zhTitle: 'PRD / GTM 文件', desc: 'Concept placeholder for PRD-lite, positioning one-pager, launch checklist, or stakeholder map.', zhDesc: '以概念圖暫代 PRD-lite、定位單頁、上市檢查表或利害關係人地圖。', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80' },
            { iconKey: 'award', title: 'Credential Evidence', zhTitle: '證照佐證', desc: 'Concept placeholder for IBM AI PM, Google PM, and analytics certificate images.', zhDesc: '以概念圖暫代 IBM AI PM、Google PM 與資料分析證照圖片。', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80' },
        ],
        credentials: [
            { iconKey: 'cpu', name: 'IBM AI Product Manager', issuer: 'IBM', relevance: 'AI product strategy, model risk, productization judgment' },
            { iconKey: 'target', name: 'Google Project Management', issuer: 'Google', relevance: 'Roadmap planning, stakeholder communication, launch governance' },
            { iconKey: 'chart', name: 'Google Advanced Data Analytics', issuer: 'Google', relevance: 'Metric design, experiment framing, evidence-backed decisions' },
        ],
        awards: [],
    },
    {
        slug: 'ai-news-intelligence', num: '04',
        category: 'AI System · Data Pipeline', zhCategory: 'AI 系統 · 資料管線',
        title: 'AI News Intelligence System', subtitle: 'Automated Tech Trend Analysis & Reporting',
        zhTitle: 'AI 新聞情報系統', zhSubtitle: '自動化科技趨勢分析與報告',
        hook: 'Turning the firehose of global tech news into structured strategic intelligence — automatically, bilingually, daily.',
        zhHook: '將全球科技新聞的海量資訊，自動轉化為雙語結構化策略情報，每日更新。',
        stack: ['Python', 'Gemini 1.5', 'GPT-4o', 'Playwright', 'Trafilatura', 'Notion API'],
        role: 'System Architect & Lead Developer', zhRole: '系統架構師 / 主任開發者',
        timeline: '2024 – Present', status: 'Production · Daily runs', zhStatus: '上線運作 · 每日執行',
        impact: 'Cost reduced 75% (GPT→Gemini)', zhImpact: '成本降低 75%（GPT→Gemini）',
        overview: "The challenge: ITRI's deep tech team needs to stay current on global AI, semiconductor, and frontier science news — but manually curating that volume is infeasible at scale.\n\nThis system crawls 6+ sources (TechCrunch, MIT Tech Review, TechNews 科技新報, INSIDE 硬塞, TechNewsWorld, and domain feeds), extracts full text via Trafilatura and Playwright, and feeds a multi-stage Gemini/GPT pipeline that scores relevance, extracts entities, generates strategic summaries, and publishes to Notion.\n\nKey decisions: iterative prompt refinement, native bilingual output (EN/ZH), and a GPT-4o → Gemini migration that cut per-run costs ~75% while maintaining quality.",
        zhOverview: "挑戰在於：工研院深科技團隊需要持續追蹤全球 AI、半導體與前沿科學動態——但手動策展如此大量的資訊在規模上並不可行。\n\n此系統爬取 6+ 個來源，透過 Trafilatura 和 Playwright 提取完整文章文本，並饋入多階段 Gemini/GPT 管線進行相關性評分、實體提取、策略摘要生成，最後將格式化報告發布至 Notion。\n\n關鍵工程決策：迭代式提示工程、原生雙語輸出（EN/ZH），以及從 GPT-4o 遷移至 Gemini，在維持輸出品質的同時將每次執行成本降低約 75%。",
        outcomes: ['6-source crawler with Playwright + Trafilatura, handling JS-heavy and static sites', 'Multi-stage LLM pipeline: relevance scoring → entity extraction → strategic summary', 'Native bilingual output (EN + ZH-TW) with consistent formatting', 'Automated Notion publishing with structured database entries', 'Cost optimization: GPT-4o → Gemini, ~75% cost reduction per run'],
        zhOutcomes: ['建立 6 源爬蟲，以 Playwright + Trafilatura 處理 JS 密集與靜態頁面', '多階段 LLM 管線：相關性評分 → 實體提取 → 策略摘要', '原生雙語輸出（EN + ZH-TW），格式一致', '自動化 Notion 發布，建立結構化資料庫條目', '成本優化：GPT-4o → Gemini，每次執行成本降低約 75%'],
        tech: [{ label: 'Crawler', val: 'Playwright, Trafilatura, feedparser, httpx' }, { label: 'AI Layer', val: 'Gemini 1.5 Pro, GPT-4o (legacy), prompt chaining' }, { label: 'Pipeline', val: 'Python async, multi-stage processing, retry logic' }, { label: 'Output', val: 'Notion API, structured database, Markdown reports' }, { label: 'Sources', val: 'TechCrunch, MIT TR, TechNews, INSIDE, TNW + feeds' }, { label: 'Quality', val: 'Entity deduplication, relevance scoring, date normalization' }],
        awards: [],
    },
    {
        slug: 'ux-hmi-interaction-lab', num: '05',
        category: 'UX / HMI Design · Interaction Systems', zhCategory: 'UX / HMI 設計 · 互動系統',
        title: 'UX/HMI Interaction Design Lab', subtitle: 'Scenario-Led Interface Systems',
        zhTitle: 'UX/HMI Interaction Design Lab', zhSubtitle: '情境導向介面系統',
        hook: 'A tactile interaction lab for designing interfaces that stay calm, legible, and humane when people are under pressure.',
        zhHook: '一個具觸感的互動實驗室：設計在壓力情境下仍然冷靜、清楚且有人性的介面。',
        stack: ['UX Research', 'HMI', 'Design Systems', 'React', 'Accessibility', 'State Modeling'],
        role: 'UX/HMI Designer & Frontend Prototyper', zhRole: 'UX/HMI 設計師 / 前端原型開發者',
        timeline: '2025 – 2026', status: 'Applied Design Lab', zhStatus: '應用型設計實驗室',
        impact: 'Interaction patterns for UIUX, HMI, accessibility, and frontend roles', zhImpact: '對應 UIUX、HMI、無障礙與前端職能的互動模式',
        overview: "UX/HMI Interaction Design Lab is built like a studio table covered with scenarios, interface states, and prototype fragments. The central question is simple but demanding: when the user is under pressure, what should the interface do first, second, and never?\n\nThe case translates cognitive science into interaction behavior. Instead of treating HMI as a pretty dashboard, it breaks the experience into human moments: noticing a change, understanding severity, choosing an action, confirming intent, recovering from error, and handing control back to the system or another person.\n\nVisually, the case is intentionally warmer and more tactile than a technical specification. Image strips, transparent panels, state cards, and responsive prototype notes make the work feel like a living design lab. The goal is to show senior-level frontend and UX judgment: not just building screens, but shaping how attention, state, feedback, and safety work together.",
        zhOverview: "UX/HMI Interaction Design Lab 被設計成一張鋪滿情境、介面狀態與原型碎片的工作桌。核心問題很簡單但很嚴苛：當使用者處於壓力之下，介面應該先做什麼、第二步做什麼，以及絕對不該做什麼？\n\n此案例將認知科學轉譯為互動行為。它不把 HMI 視為漂亮 dashboard，而是拆解成人的瞬間：注意到變化、理解嚴重性、選擇行動、確認意圖、從錯誤中復原，以及把控制權交回系統或另一個人。\n\n視覺上，這個案例刻意比技術規格書更溫暖、更有觸感。圖片帶、透明面板、狀態卡與響應式原型筆記，讓作品像一個活的設計實驗室。目標是呈現高階前端與 UX 判斷：不只是做畫面，而是形塑注意力、狀態、回饋與安全如何一起運作。",
        outcomes: ['Translated pressure scenarios into an interaction state system spanning notice, alert, decide, confirm, recover, and handoff', 'Designed HMI patterns that use hierarchy, timing, density, and feedback to reduce cognitive load instead of adding visual noise', 'Created a frontend-oriented prototype narrative with responsive layout, keyboard-friendly tabs, visual evidence, and state documentation', 'Built a design-lab presentation style that makes human factors feel tangible rather than academic', 'Positioned UX, HMI, and frontend prototyping as one integrated craft: behavior, interface, system, and evidence'],
        zhOutcomes: ['將壓力情境轉成互動狀態系統，涵蓋 notice、alert、decide、confirm、recover 與 handoff', '設計 HMI 模式，用層級、時機、密度與回饋降低認知負荷，而不是增加視覺噪音', '建立前端導向的原型敘事，包含響應式版面、鍵盤友善 tabs、視覺證據與狀態文件', '用 design-lab 呈現方式讓人因設計變得具體，而不是停留在學術語言', '將 UX、HMI 與前端原型定位為整合工藝：行為、介面、系統與證據'],
        tech: [{ label: 'Human Factors', val: 'Cognitive load, attention switching, severity perception, error recovery' }, { label: 'UX System', val: 'Scenario maps, interface principles, state matrix, information density' }, { label: 'HMI Patterns', val: 'Alert hierarchy, confirmation timing, handoff rules, recovery affordances' }, { label: 'Frontend Craft', val: 'React state, keyboard tabs, responsive panels, resilient image layout' }, { label: 'Design Evidence', val: 'Scenario boards, state diagrams, usability notes, prototype screenshots' }, { label: 'Credential Fit', val: 'Google UX, Meta Full Stack, IBM Systems & Solutions Architect' }],
        // Replace later with: assets/projects/ux-hmi-interaction-lab-cover.webp
        caseHeroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
        imageReplaceHint: 'Replace with assets/projects/ux-hmi-interaction-lab-cover.webp or an HMI prototype screenshot.',
        caseDeck: {
            eyebrow: 'Interaction lab',
            zhEyebrow: '互動實驗室',
            title: 'Designing the calm layer between human and machine',
            zhTitle: '設計人與機器之間的冷靜層',
            body: 'A scenario-led workspace for testing what users notice, what they miss, and how the interface should respond before an error becomes expensive.',
            zhBody: '一個情境導向工作區，用來測試使用者會注意到什麼、錯過什麼，以及介面該如何在錯誤變昂貴之前回應。',
            kpis: [
                { label: 'Interface states', value: '7', zhLabel: '介面狀態' },
                { label: 'Scenario lenses', value: '5', zhLabel: '情境鏡頭' },
                { label: 'Prototype passes', value: '3', zhLabel: '原型迭代' },
            ],
            signals: ['Attention', 'Severity', 'Confirmation', 'Recovery', 'Handoff'],
            zhSignals: ['注意力', '嚴重性', '確認', '復原', '交接'],
        },
        storyMoments: [
            { iconKey: 'activity', title: 'The pressure moment', zhTitle: '壓力瞬間', body: 'Design begins when the user has less attention than the interface wants. The first task is deciding what deserves the next glance.', zhBody: '設計開始於使用者注意力不足的時刻。第一個任務是決定什麼值得下一眼。' },
            { iconKey: 'shield', title: 'The safety rhythm', zhTitle: '安全節奏', body: 'Warnings should escalate with evidence, not volume. The system needs a rhythm: signal, explain, confirm, recover.', zhBody: '警示應該隨證據升級，而不是隨音量升級。系統需要節奏：提示、解釋、確認、復原。' },
            { iconKey: 'monitor', title: 'The prototype surface', zhTitle: '原型表面', body: 'Frontend decisions make the design real: focus order, disabled states, responsive density, and how components behave under stress.', zhBody: '前端決策讓設計變真實：focus order、disabled states、響應式密度，以及元件在壓力下如何表現。' },
        ],
        caseGallery: [
            { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80', title: 'Touch interaction', zhTitle: '觸控互動', note: 'Scenario-led interface behavior and handoff moments', zhNote: '情境導向介面行為與交接時刻' },
            { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80', title: 'Interaction critique', zhTitle: '互動評審', note: 'Design rationale, information hierarchy, usability discussion', zhNote: '設計理由、資訊層級與可用性討論' },
            { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80', title: 'State documentation', zhTitle: '狀態文件', note: 'Warning, recovery, and confirmation state notes', zhNote: '警示、復原與確認狀態筆記' },
            { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', title: 'Interface telemetry', zhTitle: '介面遙測', note: 'Usage, attention, error, and response-time evidence placeholders', zhNote: '使用、注意力、錯誤與反應時間佐證預留' },
            { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80', title: 'Prototype environment', zhTitle: '原型環境', note: 'Frontend prototype review and system-level constraints', zhNote: '前端原型評審與系統限制' },
            { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80', title: 'Design studio', zhTitle: '設計工作室', note: 'Scenario mapping and interface principle refinement', zhNote: '情境地圖與介面原則細修' },
            { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80', title: 'Review table', zhTitle: '評審桌面', note: 'Cross-functional critique of warning, recovery, and handoff states', zhNote: '跨職能評審警示、復原與交接狀態' },
            { src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80', title: 'System walkthrough', zhTitle: '系統走查', note: 'Prototype walkthrough across devices, density, and focus paths', zhNote: '跨裝置、資訊密度與 focus path 的原型走查' },
        ],
        storyChapters: [
            { iconKey: 'globe', label: 'Context', zhLabel: '情境', title: 'Start with a person, not a panel', zhTitle: '從人開始，而不是從面板開始', body: 'The scenario opens with a user who is busy, uncertain, and moving between tasks. The interface is judged by whether it helps them notice the right change at the right time without forcing them to decode the entire system.', zhBody: '情境從一個忙碌、不確定、正在多任務切換的使用者開始。介面是否成功，取決於它能否讓使用者在正確時間注意到正確變化，而不是逼他理解整個系統。', artifact: 'Scenario storyboard', zhArtifact: '情境 storyboard' },
            { iconKey: 'activity', label: 'Human Factors', zhLabel: '人因', title: 'Design around the limits of attention', zhTitle: '圍繞注意力限制設計', body: 'Attention, memory, perception, and error tolerance become product constraints. Every warning, label, color, and delay has to earn its place because HMI is often used when the user has no spare cognition left.', zhBody: '注意力、記憶、知覺與錯誤容忍度成為產品限制。每個警示、標籤、顏色與延遲都必須有存在理由，因為 HMI 常被用在使用者已經沒有多餘認知資源的時候。', artifact: 'Attention map', zhArtifact: '注意力地圖' },
            { iconKey: 'layers', label: 'Model', zhLabel: '模型', title: 'Build a state machine users can feel', zhTitle: '建立使用者感覺得到的狀態機', body: 'Normal, alert, decision, confirmation, error, recovery, and handoff states are mapped as one behavioral system. The transitions are designed to feel predictable, not dramatic.', zhBody: 'normal、alert、decision、confirmation、error、recovery 與 handoff 狀態被整理成同一套行為系統。轉換被設計成可預期，而不是戲劇化。', artifact: 'State matrix', zhArtifact: '狀態矩陣' },
            { iconKey: 'monitor', label: 'Prototype', zhLabel: '原型', title: 'Let frontend behavior carry the design', zhTitle: '讓前端行為承載設計', body: 'The prototype is where hierarchy becomes motion and states become behavior: focus rings, disabled buttons, progressive disclosure, responsive density, and keyboard navigation are treated as core design material.', zhBody: '原型是層級變成動態、狀態變成行為的地方：focus rings、disabled buttons、漸進揭露、響應式密度與鍵盤操作都被視為核心設計材料。', artifact: 'Frontend prototype', zhArtifact: '前端原型' },
            { iconKey: 'check', label: 'Evidence', zhLabel: '證據', title: 'Make the design reviewable', zhTitle: '讓設計可以被評審', body: 'The case leaves clear slots for screenshots, scenario boards, usability notes, and certificates. A hiring manager should be able to see the reasoning trail, not only the final visual surface.', zhBody: '案例預留清楚位置放置截圖、情境板、可用性筆記與證照。招聘主管應該能看見推理軌跡，而不只是最後的視覺表面。', artifact: 'Review packet', zhArtifact: '評審包' },
        ],
        pullQuote: 'Good HMI does not ask users to think harder. It shapes the system so the next correct action becomes easier to see.',
        zhPullQuote: '好的 HMI 不是要求使用者更努力思考，而是讓系統本身把下一個正確行動變得更容易被看見。',
        evidenceSlots: [
            { iconKey: 'monitor', title: 'Prototype Screenshot', zhTitle: '原型截圖', desc: 'Concept placeholder for HMI dashboard, interaction flow, or responsive frontend screenshot.', zhDesc: '以概念圖暫代 HMI 儀表板、互動流程或響應式前端截圖。', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80' },
            { iconKey: 'layers', title: 'State Matrix', zhTitle: '狀態矩陣', desc: 'Concept placeholder for normal / alert / decision / recovery state documentation.', zhDesc: '以概念圖暫代 normal / alert / decision / recovery 狀態文件。', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80' },
            { iconKey: 'award', title: 'Credential Evidence', zhTitle: '證照佐證', desc: 'Concept placeholder for Google UX, Meta Full Stack, and IBM architect certificate images.', zhDesc: '以概念圖暫代 Google UX、Meta Full Stack 與 IBM architect 證照圖片。', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80' },
        ],
        credentials: [
            { iconKey: 'book', name: 'Google UX Design', issuer: 'Google', relevance: 'UX process, research synthesis, usability and interaction design' },
            { iconKey: 'monitor', name: 'Meta Full Stack Developer', issuer: 'Meta', relevance: 'Frontend prototyping, implementation thinking, UI behavior' },
            { iconKey: 'layers', name: 'IBM Systems & Solutions Architect', issuer: 'IBM', relevance: 'System constraints, architecture thinking, HMI integration logic' },
        ],
        awards: [],
    },
    {
        slug: 'semiconductor-map', num: '06',
        category: 'Ecosystem Strategy · Data', zhCategory: '生態系策略 · 資料',
        title: 'Taiwan Startup Ecosystem Map', subtitle: 'Semiconductor & Deep Tech Intelligence',
        zhTitle: '台灣新創生態系地圖', zhSubtitle: '半導體與深科技情報',
        hook: "Mapping 230+ companies across the deep tech value chain to reveal where Taiwan's innovation gaps truly lie.",
        zhHook: '跨深科技價值鏈描繪 230+ 家公司，揭示台灣創新缺口的真實所在。',
        stack: ['Python', 'Pandas', 'Excel', 'Data Visualization', 'Market Analysis', 'Bilingual NLP'],
        role: 'Lead Analyst & Data Engineer', zhRole: '首席分析師 / 資料工程師',
        timeline: '2024 – Present', status: 'Active · ITRI/ISTI', zhStatus: '持續更新 · 工研院',
        impact: 'Informs national policy decisions', zhImpact: '支援國家級政策決策',
        overview: "Taiwan's deep tech ecosystem is sophisticated but poorly documented at the company level. This project built the first comprehensive, enriched database of 230+ startups and scale-ups across semiconductor, AI, biotech, and cleantech — with standardized subcategory taxonomies, financial data, headcount trends, and competitive positioning.\n\nThe work combines data engineering with ecosystem strategy: subcategory gap analysis, investment flow mapping, and international benchmark comparisons. Output directly informs ITRI/ISTI's national policy recommendations and the Star Program venture incubation strategy.\n\nA key contribution: a bilingual subcategory taxonomy mapping Chinese company descriptions onto internationally-comparable industry classifications.",
        zhOverview: "台灣深科技生態系相當成熟，但在公司層面的文件記錄卻相對薄弱。本專案建立了首個全面的資料庫，涵蓋半導體、AI、生技與潔淨科技領域的 230+ 家公司——附有標準化子類別分類法、財務數據、人員規模趨勢與競爭定位。\n\n此工作結合了資料工程與生態系策略：子類別缺口分析、投資流向圖、國際基準比較。成果直接為工研院的國家政策建議及育星計畫新創孵化策略提供依據。\n\n重要貢獻：開發雙語子類別分類法，將中文公司描述映射至國際通用的產業分類。",
        outcomes: ['Built 230+ company database with 40+ enriched data dimensions per company', 'Developed bilingual subcategory taxonomy (ZH↔EN industry classification)', 'Identified 7 critical gaps in Taiwan deep tech value chain via gap analysis', 'Automated monthly data refresh pipeline reducing manual work ~80%', 'Directly informed national Star Program incubation strategy at ITRI/ISTI'],
        zhOutcomes: ['建立 230+ 家公司資料庫，每家公司具備 40+ 個豐富化資料維度', '開發雙語子類別分類法（ZH↔EN 產業分類）', '透過缺口分析識別台灣深科技價值鏈的 7 個關鍵缺口', '自動化每月資料更新管線，減少約 80% 手動工作量', '直接為工研院育星計畫孵化策略提供依據'],
        tech: [{ label: 'Pipeline', val: 'Python ETL, Pandas, multi-source normalization' }, { label: 'Taxonomy', val: 'Custom bilingual classification system (ZH↔EN)' }, { label: 'Sources', val: '104.com.tw, MOPS, TSIA, SEMI.org, ASIP, news' }, { label: 'Analysis', val: 'Gap analysis, investment flow mapping, benchmarking' }, { label: 'Visualization', val: 'Excel dashboards, Python Matplotlib / Plotly' }, { label: 'Output', val: 'Policy reports, ITRI internal database, Notion' }],
        awards: [],
    },
    {
        slug: 'startup-intelligence-platform', num: '07',
        category: 'Full-Stack Platform · Data Engineering', zhCategory: '全端平台 · 資料工程',
        title: 'Startup Intelligence Platform', subtitle: 'Real-time Ecosystem Analytics at ITRI',
        zhTitle: '新創商情平台', zhSubtitle: '工研院即時生態系情報系統',
        hook: "A solo-built full-stack analytics platform that gave ITRI's team their first real-time window into Taiwan's startup ecosystem.",
        zhHook: '獨立打造的全端情報平台，讓工研院團隊第一次擁有即時俯瞰台灣新創生態的視角。',
        stack: ['Python', 'JavaScript', 'SQL', 'ETL Pipeline', 'Dashboard', 'Web Scraping'],
        role: 'Sole Developer', zhRole: '獨立開發者',
        timeline: '2024 – Present', status: 'Active · ITRI/ISTI', zhStatus: '上線運作 · 工研院',
        impact: 'Selected: 2025 ITRI Star Program', zhImpact: '獲選 2025 年工研院育星計畫種子培育',
        overview: "At ITRI, strategy decisions depend on having current, accurate data about Taiwan's startup landscape. Before this platform, the team relied on manual spreadsheet updates and ad hoc searches — slow, error-prone, and impossible to scale.\n\nI independently designed and built a full-stack web application — 新創商情平台 — that aggregates, processes, and visualizes startup ecosystem data in real time. The architecture spans a Python backend with automated web crawlers, an ETL pipeline writing to a managed SQL database, and a JavaScript frontend with an interactive visualization dashboard.\n\nThis project was recognized by ITRI management and led to my selection as a seed cultivator in the 2025 Star Program — an internal accelerated development track.",
        zhOverview: "在工研院，策略決策仰賴對台灣新創生態的即時、準確掌握。在此平台建立之前，團隊仰賴手動更新的試算表和臨時搜尋——速度慢、易出錯，且無法規模化。\n\n我獨立設計並開發了全端網頁應用「新創商情平台」，能即時彙整、處理並視覺化新創生態系數據。架構涵蓋具備自動化網路爬蟲的 Python 後端、寫入受管 SQL 資料庫的 ETL 管線，以及具備互動式視覺化儀表板的 JavaScript 前端。\n\n此專案獲工研院管理層認可，使我獲選 2025 年育星計畫種子培育——工研院內部加速發展培育計畫。",
        outcomes: ['Independently designed and built full-stack architecture (Python backend + JS frontend)', 'Automated web crawler collects fresh startup baseline data on schedule', 'ETL pipeline processes, normalizes, and loads data into SQL database', 'Interactive visualization dashboard enables team data-driven decision-making', 'Selected as 2025 ITRI Star Program seed cultivator following platform recognition'],
        zhOutcomes: ['獨立設計並建構全端架構（Python 後端 + JS 前端）', '自動化網路爬蟲定期抓取最新新創基盤數據', 'ETL 管線處理、標準化數據並載入 SQL 資料庫', '互動式視覺化儀表板支援團隊數據驅動決策', '平台影響力受認可，獲選 2025 年工研院育星計畫種子培育'],
        tech: [{ label: 'Backend', val: 'Python, SQL database management & maintenance' }, { label: 'Frontend', val: 'JavaScript, interactive data visualization' }, { label: 'Crawler', val: 'Automated web scraper for startup ecosystem data' }, { label: 'Pipeline', val: 'ETL (Extract, Transform, Load) workflow' }, { label: 'Database', val: 'SQL with automated refresh cycle' }, { label: 'Context', val: 'Internal platform at ITRI/ISTI Innovation Division' }],
        awards: [{ iconKey: 'database', title: '2025 ITRI Star Program', desc: 'Selected as seed cultivator — outstanding platform contribution and data engineering excellence at ITRI/ISTI.' }],
    },
    { slug: 'coming-soon-2', num: '08', comingSoon: true, title: 'Coming Soon', zhTitle: '即將推出', category: 'Next Project', zhCategory: '下一個專案', stack: [] },
];
const PROJECT_THEMES = {
    'emobot-plus':                  'emobot',
    'deeptech-database':            'data',
    'ai-product-launch-os':         'ai',
    'ai-news-intelligence':         'ai',
    'ux-hmi-interaction-lab':       'research',
    'semiconductor-map':            'map',
    'startup-intelligence-platform':'platform',
};
/* ═══════════════════════════════
   LANG CONTEXT
═══════════════════════════════ */
const LangCtx = createContext({ lang: 'en', t: k => k, setLang: () => { } });
const useLang = () => useContext(LangCtx);
function LangProvider({ children }) {
    const [lang, setLangState] = useState(() => {
        try { return localStorage.getItem('portfolio-lang') || 'en'; } catch { return 'en'; }
    });
    const setLang = useCallback(l => {
        setLangState(l);
        document.getElementById('html-root').className = l === 'zh' ? 'lang-zh' : '';
        try { localStorage.setItem('portfolio-lang', l); } catch {}
    }, []);
    useEffect(() => { document.getElementById('html-root').className = lang === 'zh' ? 'lang-zh' : ''; }, [lang]);
    const t = useCallback(k => T[lang][k] ?? T.en[k] ?? k, [lang]);
    return React.createElement(LangCtx.Provider, { value: { lang, t, setLang } }, children);
}
/* ═══════════════════════════════
   UTILITIES
═══════════════════════════════ */
const scrollTo = (id, delay = 120) =>
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), delay);

const loc = (obj, field, lang) =>
    (lang === 'zh' && obj['zh' + field.charAt(0).toUpperCase() + field.slice(1)]) || obj[field];

/* ═══════════════════════════════
   ROUTER
═══════════════════════════════ */
function useRoute() {
    const [hash, setHash] = useState(window.location.hash || '#/');
    useEffect(() => {
        const fn = () => setHash(window.location.hash || '#/');
        window.addEventListener('hashchange', fn);
        return () => window.removeEventListener('hashchange', fn);
    }, []);
    const path = hash.replace('#', '') || '/';
    const parts = path.split('/').filter(Boolean);
    const isProject = parts[0] === 'project' && parts[1];
    return { path, slug: isProject ? parts[1] : null, navigate: h => { window.location.hash = h; requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })); } };
}
/* ═══════════════════════════════
   NEURAL CANVAS
═══════════════════════════════ */
const NeuralCanvas = React.memo(function () {
    const rafRef = useRef(null);
    useEffect(() => {
        const canvas = document.getElementById('neural-canvas');
        const ctx = canvas?.getContext('2d');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isSmallOrTouch = window.innerWidth < 960 || window.matchMedia('(pointer: coarse)').matches;
        if (!canvas || !ctx || prefersReducedMotion || isSmallOrTouch) {
            if (canvas)
                canvas.style.display = 'none';
            return undefined;
        }
        let width = 0;
        let height = 0;
        let nodes = [];
        let resizeRaf = null;
        let isRunning = true;
        const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const CONNECTION_DISTANCE = 112;
        const SPEED = 0.22;
        const getNodeCount = () => Math.max(26, Math.min(42, Math.round((window.innerWidth * window.innerHeight) / 52000)));
        const createNodes = () => {
            const count = getNodeCount();
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * SPEED,
                vy: (Math.random() - 0.5) * SPEED,
                r: Math.random() * 1.3 + 0.5,
            }));
        };
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            createNodes();
        };
        const requestResize = () => {
            if (resizeRaf)
                return;
            resizeRaf = requestAnimationFrame(() => {
                resizeRaf = null;
                resize();
            });
        };
        const onPointerMove = event => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };
        const draw = () => {
            if (!isRunning)
                return;
            ctx.clearRect(0, 0, width, height);
            for (const node of nodes) {
                node.x += node.vx;
                node.y += node.vy;
                if (node.x < 0 || node.x > width)
                    node.vx *= -1;
                if (node.y < 0 || node.y > height)
                    node.vy *= -1;
                const dx = mouse.x - node.x;
                const dy = mouse.y - node.y;
                const d = Math.hypot(dx, dy);
                if (d < 90) {
                    node.x += dx * 0.003;
                    node.y += dy * 0.003;
                }
            }
            for (let i = 0; i < nodes.length; i += 1) {
                for (let j = i + 1; j < nodes.length; j += 1) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const d = Math.hypot(dx, dy);
                    if (d < CONNECTION_DISTANCE) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0,229,192,${(1 - d / CONNECTION_DISTANCE) * 0.14})`;
                        ctx.lineWidth = 0.75;
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
                ctx.beginPath();
                ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0,229,192,0.44)';
                ctx.fill();
            }
            rafRef.current = requestAnimationFrame(draw);
        };
        const onVisibilityChange = () => {
            isRunning = !document.hidden;
            if (isRunning && !rafRef.current)
                draw();
            if (!isRunning) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
        resize();
        draw();
        window.addEventListener('resize', requestResize, { passive: true });
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        document.addEventListener('visibilitychange', onVisibilityChange);
        return () => {
            isRunning = false;
            cancelAnimationFrame(rafRef.current);
            cancelAnimationFrame(resizeRaf);
            window.removeEventListener('resize', requestResize);
            window.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, []);
    return null;
});
/* ═══════════════════════════════
   CURSOR  (fixed — RAF loop)
═══════════════════════════════ */
function Cursor() {
    useEffect(() => {
        const dot = document.getElementById('cursor-dot');
        const ring = document.getElementById('cursor-ring');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        if (!dot || !ring || prefersReducedMotion || isTouchDevice)
            return undefined;
        let mx = window.innerWidth / 2;
        let my = window.innerHeight / 2;
        let rx = mx;
        let ry = my;
        let rafId;
        const LERP = 0.14;
        const interactiveSelector = 'a,button,.project-card';
        const onMove = event => {
            mx = event.clientX;
            my = event.clientY;
            dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
        };
        const onPointerOver = event => {
            if (event.target.closest(interactiveSelector))
                document.body.classList.add('cursor-hover');
        };
        const onPointerOut = event => {
            if (event.target.closest(interactiveSelector))
                document.body.classList.remove('cursor-hover');
        };
        const loop = () => {
            rx += (mx - rx) * LERP;
            ry += (my - ry) * LERP;
            ring.style.transform = `translate(${Math.round(rx - 18)}px, ${Math.round(ry - 18)}px)`;
            rafId = requestAnimationFrame(loop);
        };
        loop();
        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerover', onPointerOver);
        document.addEventListener('pointerout', onPointerOut);
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerover', onPointerOver);
            document.removeEventListener('pointerout', onPointerOut);
        };
    }, []);
    return null;
}
/* ═══════════════════════════════
   PROGRESS BAR
═══════════════════════════════ */
function ProgressBar() {
    useEffect(() => {
        const bar = document.getElementById('progress');
        if (!bar)
            return undefined;
        let ticking = false;
        const update = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? (document.documentElement.scrollTop / maxScroll) * 100 : 0;
            bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
            ticking = false;
        };
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return null;
}
/* ═══════════════════════════════
   SCROLL REVEAL
═══════════════════════════════ */
function useReveal(deps = []) {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal,.timeline-item');
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            } });
        }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
        els.forEach(el => io.observe(el));
        return () => io.disconnect();
    }, deps);
}
/* ═══════════════════════════════
   LANG TOGGLE
═══════════════════════════════ */
function LangToggle({ minimal }) {
    const { lang, setLang } = useLang();
    return (React.createElement("div", { className: "lang-toggle" },
        React.createElement("div", { className: "lang-pill", style: { transform: lang === 'zh' ? 'translateX(100%)' : 'translateX(0)' } }),
        React.createElement("button", { className: `lang-btn${lang === 'en' ? ' active' : ''}`, onClick: () => setLang('en') }, "EN"),
        React.createElement("button", { className: `lang-btn${lang === 'zh' ? ' active' : ''}`, onClick: () => setLang('zh') }, "ZH")));
}
/* ═══════════════════════════════
   NAV
═══════════════════════════════ */
function Nav({ navigate }) {
    const { t } = useLang();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
            const sections = ['story', 'work', 'skills', 'awards', 'contact'];
            const active = sections.find(id => {
                const el = document.getElementById(id);
                if (!el) return false;
                const { top, bottom } = el.getBoundingClientRect();
                return top <= 100 && bottom > 100;
            });
            setActiveSection(active || '');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    const go = (id) => {
        setMenuOpen(false);
        navigate('#/');
        scrollTo(id);
    };
    const navLink = (id, label) => React.createElement("a", {
        href: `#${id}`,
        onClick: e => { e.preventDefault(); go(id); },
        style: activeSection === id ? { color: 'var(--teal)' } : undefined
    }, label);
    return (React.createElement(React.Fragment, null,
        React.createElement("nav", { className: scrolled ? 'scrolled' : '' },
            React.createElement("a", { href: "#/", className: "nav-brand", onClick: e => { e.preventDefault(); navigate('#/'); } },
                React.createElement("span", { className: "nav-brand-dot" }),
                "GT.YE"),
            React.createElement("div", { className: "nav-right" },
                React.createElement("ul", { className: "nav-links" },
                    React.createElement("li", null, navLink('story', t('navStory'))),
                    React.createElement("li", null, navLink('work', t('navWork'))),
                    React.createElement("li", null, navLink('skills', t('navSkills'))),
                    React.createElement("li", null, navLink('awards', t('navAwards'))),
                    React.createElement("li", null, navLink('contact', t('navContact')))),
                React.createElement("a", { href: "assets/Ye_Guan%20Ting,%20CV.pdf", download: true, className: "nav-resume", title: "Download Resume PDF" }, "↓ CV"),
                React.createElement(LangToggle, null),
                React.createElement("button", { className: `hamburger${menuOpen ? ' open' : ''}`, onClick: () => setMenuOpen(!menuOpen), "aria-label": "Menu" },
                    React.createElement("span", null),
                    React.createElement("span", null),
                    React.createElement("span", null)))),
        React.createElement("div", { className: `mobile-menu${menuOpen ? ' open' : ''}` },
            React.createElement("a", { href: "#story", onClick: e => { e.preventDefault(); go('story'); } }, t('navStory')),
            React.createElement("a", { href: "#work", onClick: e => { e.preventDefault(); go('work'); } }, t('navWork')),
            React.createElement("a", { href: "#skills", onClick: e => { e.preventDefault(); go('skills'); } }, t('navSkills')),
            React.createElement("a", { href: "#awards", onClick: e => { e.preventDefault(); go('awards'); } }, t('navAwards')),
            React.createElement("a", { href: "#contact", onClick: e => { e.preventDefault(); go('contact'); } }, t('navContact')),
            React.createElement("a", { href: "assets/Ye_Guan%20Ting,%20CV.pdf", download: true }, "CV"),
            React.createElement("div", { className: "mobile-menu-lang" },
                React.createElement(LangToggle, null)))));
}
/* ═══════════════════════════════
   FOOTER
═══════════════════════════════ */
function Footer({ navigate }) {
    const { t } = useLang();
    return (React.createElement("footer", null,
        React.createElement("span", null,
            t('footerCopy'),
            " \u00B7 ",
            React.createElement("span", { style: { color: 'var(--teal)' } }, t('footerTag'))),
        React.createElement("div", { className: "footer-links" },
            React.createElement("a", { href: "#work", onClick: e => { e.preventDefault(); navigate('#/'); scrollTo('work'); } }, t('navWork')),
            React.createElement("a", { href: "mailto:1126guanting@gmail.com" }, "Email"),
            React.createElement("a", { href: "#awards", onClick: e => { e.preventDefault(); navigate('#/'); scrollTo('awards'); } }, t('navAwards')))));
}
/* ═══════════════════════════════
   AWARDS SECTION
═══════════════════════════════ */
function AwardsSection() {
    const { t } = useLang();
    return (React.createElement("section", { className: "awards-section", id: "awards", "aria-label": "Awards and Recognition" },
        React.createElement("div", { className: "awards-grain", "aria-hidden": "true" }),
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "section-label reveal" }, t('awardsLabel')),
            React.createElement("h2", { className: "section-title reveal reveal-delay-1" },
                t('awardsTitle1'),
                " ",
                React.createElement("em", null, t('awardsTitleEm'))),
            React.createElement("div", { className: "awards-grid" }, AWARDS_DATA.map((a, i) => (React.createElement("div", { key: i, className: `award-card reveal reveal-delay-${i + 1}`, role: "article", "aria-label": t(a.titleKey) },
                React.createElement("div", { className: "award-card-top" },
                    React.createElement("span", { className: "award-icon" }, React.createElement(Icon, { name: a.iconKey })),
                    React.createElement("span", { className: "award-year" }, a.year)),
                React.createElement("div", { className: "award-period" }, a.period),
                React.createElement("div", { className: "award-title-text" }, t(a.titleKey)),
                React.createElement("div", { className: "award-inst" }, t(a.instKey)),
                React.createElement("div", { className: "award-desc" }, t(a.descKey)),
                a.link && React.createElement("a", { className: "award-link", href: a.link, target: "_blank", rel: "noopener noreferrer" }, "VIEW SOURCE ", React.createElement("span", null, "→")),
                React.createElement("div", { className: "award-tags" }, a.tags.map(tag => React.createElement("span", { key: tag, className: "award-tag" }, tag))))))))));
}
/* ═══════════════════════════════
   HOME PAGE
═══════════════════════════════ */
function HomePage({ navigate }) {
    const { t, lang } = useLang();
    useReveal([lang]);
    const timeline = [
        { meta: t('ch0Meta'), head: t('ch0Head'), body: t('ch0Body'), type: 'research',
            chips: ['NCCU / M.S. Psych', 'TMBIC', 'fMRI / EEG', 'OHBM 2025', 'TSCN 2025', 'I-9-9 Berlin'] },
        { meta: t('ch1Meta'), head: t('ch1Head'), body: t('ch1Body'), type: 'research',
            chips: ['MoHW Mental Health', 'Children & Family Welfare', 'Mennonite Hospital', 'UX Research', 'Data Analysis'] },
        { meta: t('ch2Meta'), head: t('ch2Head'), body: t('ch2Body'), type: 'product',
            chips: ['LLM', 'UX Research', 'Risk Detection', 'FastAPI', 'Silver Medal 2025'] },
        { meta: t('ch3Meta'), head: t('ch3Head'), body: t('ch3Body'), type: 'industry',
            chips: ['ETL Pipelines', 'Market Analysis', 'Web Crawling', 'Full-Stack Dev', 'Star Program 2025'] },
        { meta: t('ch4Meta'), head: t('ch4Head'), body: t('ch4Body'), type: 'future',
            chips: ['AI Products', 'Research × PM', 'Open to Opportunities'] },
    ];
    return (React.createElement("div", { className: "page-enter" },
        React.createElement("section", { className: "hero", id: "top" },
            React.createElement("div", { className: "hero-left" },
                React.createElement("div", { className: "hero-status" },
                    React.createElement("span", { className: "status-item status-active" },
                        React.createElement("span", { className: "status-dot" }),
                        t('heroStatusActive')),
                    React.createElement("span", { className: "status-sep" }, "\u00B7"),
                    React.createElement("span", { className: "status-item status-open" },
                        React.createElement("span", { className: "status-dot amber" }),
                        t('heroStatusOpen'))),
                React.createElement("p", { className: "hero-eyebrow" }, t('heroEyebrow')),
                React.createElement("h1", { className: "hero-title" },
                    lang === 'en'
                        ? React.createElement(React.Fragment, null,
                            "I turn frontier-tech",
                            React.createElement("br", null),
                            "signals into",
                            React.createElement("br", null),
                            React.createElement("em", null, t('heroTitleEm')),
                            React.createElement("br", null),
                            t('heroTitle2'))
                        : React.createElement(React.Fragment, null,
                            t('heroTitle1'),
                            React.createElement("br", null),
                            React.createElement("em", null, t('heroTitleEm')),
                            React.createElement("br", null),
                            t('heroTitle2'))),
                React.createElement("p", { className: "hero-sub" }, t('heroSub')),
                React.createElement("div", { className: "hero-actions" },
                    React.createElement("button", { className: "btn-primary", onClick: () => scrollTo('work', 0) }, t('heroCta1')),
                    React.createElement("button", { className: "btn-ghost", onClick: () => scrollTo('story', 0) }, t('heroCta2'))),
                React.createElement("div", { className: "hero-stats" },
                    React.createElement("div", { className: "hero-stat" },
                        React.createElement("div", { className: "stat-num" }, "3+"),
                        React.createElement("div", { className: "stat-label" }, t('statYears'))),
                    React.createElement("div", { className: "hero-stat" },
                        React.createElement("div", { className: "stat-num" }, "7"),
                        React.createElement("div", { className: "stat-label" }, t('statProjects'))),
                    React.createElement("div", { className: "hero-stat" },
                        React.createElement("div", { className: "stat-num", style: { color: 'var(--amber)' } }, "4"),
                        React.createElement("div", { className: "stat-label" }, t('statAwards'))),
                    React.createElement("div", { className: "hero-stat" },
                        React.createElement("div", { className: "stat-num" }, "2"),
                        React.createElement("div", { className: "stat-label" }, t('statPub'))))),
            React.createElement("div", { className: "hero-right" },
                React.createElement("div", { className: "hero-img-wrap" },
                    React.createElement("div", { className: "scan-line" }),
                    React.createElement("img", { src: "assets/cv_visual.webp", alt: "Guan-Ting Ye \u2014 Deep Tech Translator", width: "780", height: "1020", decoding: "async", fetchPriority: "high" }),
                    React.createElement("div", { className: "hero-img-glow" }),
                    React.createElement("div", { className: "hero-coords" }, "25.04\u00B0N \u00B7 121.56\u00B0E"),
                    React.createElement("div", { className: "data-tag" }, t('tagActive')),
                    React.createElement("div", { className: "data-tag-2" }, t('tagAward'))))),
        React.createElement("section", { className: "story", id: "story" },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "section-label reveal" }, t('storyLabel')),
                React.createElement("h2", { className: "section-title reveal reveal-delay-1" },
                    t('storyTitle1'),
                    React.createElement("br", null),
                    React.createElement("em", null, t('storyTitleEm')),
                    t('storyTitle2')),
                React.createElement("div", { className: "timeline" }, timeline.map((item, i) => (React.createElement("div", { className: "timeline-item", key: i, "data-type": item.type },
                    React.createElement("div", { className: "timeline-dot" }),
                    React.createElement("div", { className: "timeline-meta" }, item.meta),
                    React.createElement("h3", { className: "timeline-head" }, item.head),
                    React.createElement("p", { className: "timeline-body" }, item.body),
                    React.createElement("div", { className: "chips" }, item.chips.map(c => React.createElement("span", { className: "chip", key: c }, c))))))))),
        React.createElement("section", { className: "work", id: "work" },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "section-label reveal" }, t('workLabel')),
                React.createElement("h2", { className: "section-title reveal reveal-delay-1" },
                    t('workTitle1'),
                    " ",
                    React.createElement("em", null, t('workTitleEm')),
                    t('workTitle2')),
                React.createElement("div", { className: "work-grid" }, PROJECTS.map((p, i) => React.createElement(ProjectCard, { key: p.slug, project: p, index: i, navigate: navigate, lang: lang }))))),
        React.createElement(SkillsSection, null),
            React.createElement(AwardsSection, null),
        React.createElement("section", { className: "contact-section", id: "contact" },
            React.createElement("div", { className: "contact-ghost", "aria-hidden": "true" }, "SIGNAL"),
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "section-label reveal" }, t('contactLabel')),
                React.createElement("div", { className: "contact-grid" },
                    React.createElement("div", null,
                        React.createElement("h2", { className: "contact-title reveal" },
                            t('contactTitle1'),
                            " ",
                            React.createElement("em", null, t('contactTitleEm')),
                            t('contactTitle2')),
                        React.createElement("p", { className: "contact-note reveal reveal-delay-1" }, t('contactNote'))),
                    React.createElement("div", { className: "contact-links reveal reveal-delay-2" },
                        React.createElement("a", { href: "mailto:1126guanting@gmail.com", className: "contact-link" },
                            React.createElement("div", null,
                                React.createElement("div", { className: "contact-link-label" }, t('contactEmail')),
                                React.createElement("div", { className: "contact-link-val" }, "1126guanting@gmail.com")),
                            React.createElement("span", { className: "contact-link-arrow" }, "\u2192")),
                        React.createElement("a", { href: "tel:+886927012867", className: "contact-link" },
                            React.createElement("div", null,
                                React.createElement("div", { className: "contact-link-label" }, t('contactPhone')),
                                React.createElement("div", { className: "contact-link-val" }, "+886 927 012 867")),
                            React.createElement("span", { className: "contact-link-arrow" }, "\u2192")),
                        React.createElement("div", { className: "contact-link", style: { cursor: 'default' } },
                            React.createElement("div", null,
                                React.createElement("div", { className: "contact-link-label" }, t('contactLang')),
                                React.createElement("div", { className: "contact-link-val" }, "Mandarin (Native) \u00B7 English (Professional)")),
                            React.createElement("span", { className: "contact-link-arrow", style: { color: 'var(--amber)' } }, "\u2726"))))))));
}
/* ═══════════════════════════════
   PROJECT CARD
═══════════════════════════════ */
function ProjectCard({ project: p, index, navigate, lang }) {
    const { t } = useLang();
    const ref = useRef(null);
    const onMove = useCallback(e => {
        const r = ref.current.getBoundingClientRect();
        ref.current.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        ref.current.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    }, []);
    if (p.comingSoon)
        return (React.createElement("div", { ref: ref, className: `project-card coming-soon reveal reveal-delay-${(index % 4) + 1}` },
            React.createElement("div", { className: "card-num" }, p.num),
            React.createElement("div", { className: "card-label" }, lang === 'zh' ? p.zhCategory : p.category),
            React.createElement("h3", { className: "card-title" }, lang === 'zh' ? p.zhTitle : p.title),
            React.createElement("p", { className: "card-desc", style: { color: 'var(--gray-dim)' } }, t('csDesc'))));
    const isFeatured = index === 0;
    return (React.createElement("a", { ref: ref, href: `#/project/${p.slug}`, className: `project-card${isFeatured ? ' featured' : ''} reveal reveal-delay-${(index % 4) + 1}`, onMouseMove: onMove, onClick: e => { e.preventDefault(); navigate(`#/project/${p.slug}`); }, "aria-label": `View ${lang === 'zh' ? p.zhTitle : p.title} project` },
        isFeatured ? (React.createElement("div", { className: "featured-inner" },
            React.createElement("div", null,
                React.createElement("div", { className: "card-num" }, p.num),
                React.createElement("div", { className: "card-label" }, lang === 'zh' ? p.zhCategory : p.category),
                React.createElement("h3", { className: "card-title" }, lang === 'zh' ? p.zhTitle : p.title),
                React.createElement("p", { className: "card-desc" }, lang === 'zh' ? p.zhHook : p.hook),
                React.createElement("div", { className: "card-stack" }, p.stack.slice(0, 5).map(s => React.createElement("span", { className: "stack-tag", key: s }, s)))),
            React.createElement("div", null,
                React.createElement("div", { className: "card-label", style: { marginBottom: 16 } }, t('projOutcomes')),
                React.createElement("ul", { className: "card-outcomes" }, (lang === 'zh' ? p.zhOutcomes : p.outcomes).slice(0, 3).map((o, i) => React.createElement("li", { key: i }, o)))))) : (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "card-num" }, p.num),
            React.createElement("div", { className: "card-label" }, lang === 'zh' ? p.zhCategory : p.category),
            React.createElement("h3", { className: "card-title" }, lang === 'zh' ? p.zhTitle : p.title),
            React.createElement("p", { className: "card-desc" }, lang === 'zh' ? p.zhHook : p.hook),
            React.createElement("div", { className: "card-stack" }, p.stack.slice(0, 4).map(s => React.createElement("span", { className: "stack-tag", key: s }, s))))),
        React.createElement("div", { className: "card-arrow" }, "\u2197")));
}

function StorytellingCaseStudy({ project: p, lang }) {
    const PA = lang === 'zh';
    const chapters = p.storyChapters || [];
    const [active, setActive] = useState(0);
    if (!chapters.length)
        return null;
    const current = chapters[Math.min(active, chapters.length - 1)];
    const projectTitle = PA ? p.zhTitle : p.title;
    const chapterLabel = PA ? current.zhLabel || current.label : current.label;
    const chapterTitle = PA ? current.zhTitle || current.title : current.title;
    const chapterBody = PA ? current.zhBody || current.body : current.body;
    const chapterArtifact = PA ? current.zhArtifact || current.artifact : current.artifact;
    const quote = PA ? p.zhPullQuote || p.pullQuote : p.pullQuote;
    const deck = p.caseDeck;
    const deckSignals = deck ? (PA ? deck.zhSignals || deck.signals : deck.signals) : [];
    return React.createElement("div", { className: "story-case reveal" },
        React.createElement("div", { className: "story-case-hero" },
            React.createElement("div", { className: "story-case-copy" },
                React.createElement("div", { className: "story-case-kicker" }, PA ? "章節式案例" : "CINEMATIC CASE STUDY"),
                React.createElement("h2", { className: "story-case-title" }, PA ? "用章節式敘事呈現產品思考" : "A chapter-led product story"),
                React.createElement("p", { className: "story-case-lead" }, PA ? "此區塊用更像高階作品集 case study 的節奏，呈現問題、決策、互動、佐證與視覺證據。" : "This section uses a richer case-study rhythm: problem framing, decision logic, interaction evidence, and visual proof points.")),
            React.createElement("div", { className: "story-case-media" },
                React.createElement("img", { src: p.caseHeroImage, alt: `${projectTitle} case study cover`, loading: "lazy", decoding: "async" }),
                React.createElement("div", { className: "story-case-media-glass" },
                    React.createElement("span", null, PA ? "案例封面" : "CASE COVER"),
                    React.createElement("strong", null, projectTitle),
                    React.createElement("small", null, PA ? "產品產出 / 證照 / 原型佐證" : "Product artifacts / credentials / prototype evidence")))),
        deck && React.createElement("div", { className: "story-case-live" },
            React.createElement("div", { className: "story-case-cockpit" },
                React.createElement("div", { className: "story-case-live-top" },
                    React.createElement("span", null, PA ? deck.zhEyebrow || deck.eyebrow : deck.eyebrow),
                    React.createElement("div", { className: "story-case-live-dots", "aria-hidden": "true" },
                        React.createElement("i", null),
                        React.createElement("i", null),
                        React.createElement("i", null))),
                React.createElement("h3", null, PA ? deck.zhTitle || deck.title : deck.title),
                React.createElement("p", null, PA ? deck.zhBody || deck.body : deck.body),
                React.createElement("div", { className: "story-case-kpi-row" },
                    (deck.kpis || []).map(kpi => React.createElement("div", { className: "story-case-kpi", key: kpi.label },
                        React.createElement("strong", null, kpi.value),
                        React.createElement("span", null, PA ? kpi.zhLabel || kpi.label : kpi.label)))),
                React.createElement("div", { className: "story-case-signal-cloud" },
                    deckSignals.map(signal => React.createElement("span", { key: signal }, signal)))),
            React.createElement("div", { className: "story-case-moment-grid" },
                (p.storyMoments || []).map(moment => React.createElement("article", { className: "story-case-moment", key: moment.title },
                    React.createElement("div", { className: "story-case-moment-icon" }, React.createElement(Icon, { name: moment.iconKey || "zap" })),
                    React.createElement("h4", null, PA ? moment.zhTitle || moment.title : moment.title),
                    React.createElement("p", null, PA ? moment.zhBody || moment.body : moment.body))))),
        p.caseGallery && p.caseGallery.length > 0 && React.createElement("div", { className: "story-case-gallery", "aria-label": PA ? "案例圖片集" : "Case image gallery" },
            p.caseGallery.map((img, i) => React.createElement("figure", { className: `story-case-gallery-card${i === 0 ? " featured" : ""}`, key: img.src },
                React.createElement("img", { src: img.src, alt: `${PA ? img.zhTitle || img.title : img.title} preview`, loading: "lazy", decoding: "async" }),
                React.createElement("figcaption", null,
                    React.createElement("span", { className: "story-case-gallery-index" }, String(i + 1).padStart(2, "0")),
                    React.createElement("strong", null, PA ? img.zhTitle || img.title : img.title),
                    React.createElement("span", null, PA ? img.zhNote || img.note : img.note))))),
        React.createElement("div", { className: "story-case-chapters" },
            React.createElement("div", { className: "story-case-rail", role: "tablist", "aria-label": PA ? "案例章節" : "Case chapters" },
                chapters.map((chapter, i) => React.createElement("button", { type: "button", className: `story-case-tab${i === active ? " active" : ""}`, key: chapter.label, onClick: () => setActive(i), role: "tab", "aria-selected": i === active },
                    React.createElement("span", { className: "story-case-tab-num" }, String(i + 1).padStart(2, "0")),
                    React.createElement("span", { className: "story-case-tab-icon" }, React.createElement(Icon, { name: chapter.iconKey || "layers" })),
                    React.createElement("span", null, PA ? chapter.zhLabel || chapter.label : chapter.label)))),
            React.createElement("article", { className: "story-case-panel" },
                React.createElement("div", { className: "story-case-panel-label" }, chapterLabel),
                React.createElement("h3", null, chapterTitle),
                React.createElement("p", null, chapterBody),
                chapterArtifact && React.createElement("div", { className: "story-case-artifact" },
                    React.createElement(Icon, { name: current.iconKey || "layers" }),
                    React.createElement("span", null, PA ? "可交付產出" : "Artifact"),
                    React.createElement("strong", null, chapterArtifact))),
            quote && React.createElement("blockquote", { className: "story-case-quote" }, quote)),
        React.createElement("div", { className: "story-case-section" },
            React.createElement("div", { className: "story-case-section-title" }, PA ? "佐證圖片與文件預留區" : "Evidence Slots"),
            React.createElement("div", { className: "story-case-evidence-grid" },
                (p.evidenceSlots || []).map(slot => React.createElement("div", { className: "story-case-evidence", key: slot.title },
                    slot.image
                        ? React.createElement("div", { className: "story-case-evidence-visual" },
                            React.createElement("img", { src: slot.image, alt: `${PA ? slot.zhTitle || slot.title : slot.title} concept visual`, loading: "lazy", decoding: "async" }),
                            React.createElement(Icon, { name: slot.iconKey || "check" }))
                        : React.createElement("div", { className: "story-case-evidence-icon" }, React.createElement(Icon, { name: slot.iconKey || "check" })),
                    React.createElement("div", { className: "story-case-evidence-title" }, PA ? slot.zhTitle || slot.title : slot.title),
                    React.createElement("p", null, PA ? slot.zhDesc || slot.desc : slot.desc),
                    React.createElement("span", { className: "story-case-replace-note" }, PA ? "概念示意，可替換真實素材" : "Concept visual, replaceable"))))),
        React.createElement("div", { className: "story-case-section" },
            React.createElement("div", { className: "story-case-section-title" }, PA ? "證照佐證" : "Credential Evidence"),
            React.createElement("div", { className: "story-case-credential-grid" },
                (p.credentials || []).map(cred => React.createElement("div", { className: "story-case-credential", key: cred.name },
                    React.createElement("div", { className: "story-case-credential-icon" }, React.createElement(Icon, { name: cred.iconKey || "award" })),
                    React.createElement("div", { className: "story-case-credential-name" }, cred.name),
                    React.createElement("div", { className: "story-case-credential-issuer" }, cred.issuer),
                    React.createElement("p", null, cred.relevance))))));
}
/* ═══════════════════════════════
   PROJECT PAGE
═══════════════════════════════ */
function ProjectPage({ slug, navigate }) {
    const { t, lang } = useLang();
    useReveal([slug, lang]);
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        const progress = document.getElementById('progress');
        if (progress)
            progress.style.width = '0%';
    }, [slug]);
    const idx = PROJECTS.findIndex(p => p.slug === slug);
    const p = PROJECTS[idx];
    if (!p || p.comingSoon)
        return (React.createElement("div", { className: "proj-page page-enter", "data-theme": PROJECT_THEMES[slug] || "data" },
            React.createElement("div", { className: "container", style: { paddingTop: 160, paddingBottom: 80 } },
                React.createElement("a", { href: "#/", className: "proj-back", onClick: e => { e.preventDefault(); navigate('#/'); } }, t('projBack')),
                React.createElement("p", { className: "proj-category" }, t('comingSoon')),
                React.createElement("h1", { className: "proj-title" }, t('comingSoon')),
                React.createElement("p", { className: "proj-hook" }, t('csDesc')))));
    const prevP = idx > 0 && !PROJECTS[idx - 1].comingSoon ? PROJECTS[idx - 1] : null;
    const nextP = idx < PROJECTS.length - 1 && !PROJECTS[idx + 1].comingSoon ? PROJECTS[idx + 1] : null;
    const L = n => lang === 'zh' ? p['zh' + n.charAt(0).toUpperCase() + n.slice(1)] ?? p[n] : p[n];
    const title = L('title');
    const hook = L('hook');
    const overview = L('overview');
    const outcomes = lang === 'zh' ? p.zhOutcomes : p.outcomes;
    const role = lang === 'zh' ? p.zhRole : p.role;
    const status = lang === 'zh' ? p.zhStatus : p.status;
    const impact = lang === 'zh' ? p.zhImpact : p.impact;
    const category = lang === 'zh' ? p.zhCategory : p.category;
    useEffect(() => { document.title = `${title} · GT.YE`; return () => { document.title = 'Guan-Ting Ye · Neural Signal OS'; }; }, [title]);
    return (React.createElement("div", { className: "proj-page page-enter", "data-theme": PROJECT_THEMES[slug] || "data" },
        React.createElement("div", { className: "proj-hero" },
            React.createElement("div", { className: "container" },
                React.createElement("a", { href: "#/", className: "proj-back", onClick: e => { e.preventDefault(); navigate('#/'); } }, t('projBack')),
                React.createElement("p", { className: "proj-category reveal" }, category),
                React.createElement("h1", { className: "proj-title reveal reveal-delay-1" }, title),
                React.createElement("p", { className: "proj-hook reveal reveal-delay-2" }, hook),
                React.createElement("div", { className: "proj-stack reveal reveal-delay-2" }, p.stack.map(s => React.createElement("span", { className: "stack-tag", key: s }, s))),
                React.createElement("div", { className: "proj-meta reveal reveal-delay-3" },
                    React.createElement("div", { className: "proj-meta-item" },
                        React.createElement("div", { className: "proj-meta-key" }, t('projRole')),
                        React.createElement("div", { className: "proj-meta-val" }, role)),
                    React.createElement("div", { className: "proj-meta-item" },
                        React.createElement("div", { className: "proj-meta-key" }, t('projTimeline')),
                        React.createElement("div", { className: "proj-meta-val" }, p.timeline)),
                    React.createElement("div", { className: "proj-meta-item" },
                        React.createElement("div", { className: "proj-meta-key" }, t('projStatus')),
                        React.createElement("div", { className: "proj-meta-val" }, status)),
                    React.createElement("div", { className: "proj-meta-item" },
                        React.createElement("div", { className: "proj-meta-key" }, t('projImpact')),
                        React.createElement("div", { className: "proj-meta-val" }, impact))))),
        React.createElement("div", { className: "proj-body" },
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "proj-section reveal" },
                    React.createElement("div", { className: "proj-section-title" }, t('projOverview')),
                    overview.split('\n\n').map((para, i) => React.createElement("p", { className: "proj-body-text", key: i }, para))),
                React.createElement(StorytellingCaseStudy, { project: p, lang: lang }),
                React.createElement(ProjectExtraSection, { slug: slug, lang: lang }),
                React.createElement("div", { className: "proj-section reveal" },
                    React.createElement("div", { className: "proj-section-title" }, t('projOutcomes')),
                    React.createElement("ol", { className: "proj-outcomes" }, outcomes.map((o, i) => React.createElement("li", { key: i },
                        React.createElement("span", { className: "outcome-num" }, String(i + 1).padStart(2, '0')),
                        React.createElement("span", null, o))))),
                React.createElement("div", { className: "proj-section reveal" },
                    React.createElement("div", { className: "proj-section-title" }, t('projTech')),
                    React.createElement("div", { className: "proj-tech-grid" }, p.tech.map(item => (React.createElement("div", { className: "tech-item", key: item.label },
                        React.createElement("div", { className: "tech-item-label" }, item.label),
                        React.createElement("div", { className: "tech-item-val" }, item.val)))))),
                p.awards && p.awards.length > 0 && (React.createElement("div", { className: "proj-section reveal" },
                    React.createElement("div", { className: "proj-section-title" }, t('projAwards')),
                    p.awards.map((a, i) => (React.createElement("div", { className: "proj-award", key: i },
                        React.createElement("span", { className: "award-badge-icon" }, React.createElement(Icon, { name: a.iconKey || a.icon || "award" })),
                        React.createElement("div", { className: "award-badge-text" },
                            React.createElement("div", { className: "award-badge-title" }, a.title),
                            a.desc)))))),
                React.createElement("div", { className: "proj-nav" },
                    prevP ? (React.createElement("a", { href: `#/project/${prevP.slug}`, className: "proj-nav-link", onClick: e => { e.preventDefault(); navigate(`#/project/${prevP.slug}`); } },
                        React.createElement("span", { className: "proj-nav-dir" }, t('prevProj')),
                        React.createElement("span", { className: "proj-nav-name" }, lang === 'zh' ? prevP.zhTitle : prevP.title))) : React.createElement("span", null),
                    nextP ? (React.createElement("a", { href: `#/project/${nextP.slug}`, className: "proj-nav-link", style: { textAlign: 'right' }, onClick: e => { e.preventDefault(); navigate(`#/project/${nextP.slug}`); } },
                        React.createElement("span", { className: "proj-nav-dir" }, t('nextProj')),
                        React.createElement("span", { className: "proj-nav-name" }, lang === 'zh' ? nextP.zhTitle : nextP.title))) : React.createElement("span", null))))));
}

/* ═══════════════════════════════
   PROJECT THEMES MAP
═══════════════════════════════ */
/* ═══════════════════════════════
   SKILLS SECTION V5
═══════════════════════════════ */
function SkillsSection() {
  const { t } = useLang();
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setAnimated(true); io.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const DOMAIN = [
    { name: 'Cognitive Neuroscience',  level: 5 },
    { name: 'AI Product Design',       level: 4 },
    { name: 'UX Research',             level: 4 },
    { name: 'Deep Tech Strategy',      level: 4 },
    { name: 'Psychometrics',           level: 5 },
    { name: 'Ecosystem Mapping',       level: 4 },
    { name: 'Digital Mental Health',   level: 3 },
    { name: 'Data Storytelling',       level: 4 },
  ];

  const TECH = [
    { name: 'Python (Data / AI)',      pct: 90 },
    { name: 'R · SPSS · JASP',         pct: 88 },
    { name: 'JavaScript · React · Vue',pct: 78 },
    { name: 'SQL · Database Design',   pct: 75 },
    { name: 'LLM APIs · Prompt Eng.',  pct: 82 },
    { name: 'Playwright · Web Scraping',pct: 85 },
    { name: 'EEG / fMRI Analysis',     pct: 80 },
    { name: 'ETL Pipelines',           pct: 83 },
    { name: 'FastAPI · Backend Dev',   pct: 72 },
    { name: 'Photoshop · Illustrator', pct: 68 },
  ];

  const CERTS = [
    { logo: 'G', name: 'Google UX Design Professional Certificate',         issuer: 'Google · Coursera', color: '#4285f4', bg: 'rgba(66,133,244,0.1)' },
    { logo: 'G', name: 'Google Advanced Data Analytics',                    issuer: 'Google · Coursera', color: '#34a853', bg: 'rgba(52,168,83,0.1)' },
    { logo: 'G', name: 'Google Project Management',                         issuer: 'Google · Coursera', color: '#ea4335', bg: 'rgba(234,67,53,0.1)' },
    { logo: 'M', name: 'Meta Full Stack Developer (Front-End & Back-End)',   issuer: 'Meta · Coursera',   color: '#1877f2', bg: 'rgba(24,119,242,0.1)' },
    { logo: 'I', name: 'IBM AI Product Manager Professional Certificate',    issuer: 'IBM · Coursera',    color: '#006699', bg: 'rgba(0,102,153,0.1)' },
    { logo: 'I', name: 'IBM Systems & Solutions Architect Certificate',      issuer: 'IBM · Coursera',    color: '#006699', bg: 'rgba(0,102,153,0.1)' },
  ];

  return React.createElement('section', { className: 'skills-v5', id: 'skills' },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'section-label reveal' }, t('skillsLabel')),
      React.createElement('h2', { className: 'section-title reveal reveal-delay-1' },
        t('skillsTitle1'), ' ', React.createElement('em', null, t('skillsTitleEm')), t('skillsTitle2')
      ),
      React.createElement('div', { className: 'skills-v5-grid reveal', ref },
        // Domain Panel
        React.createElement('div', { className: 'skill-panel panel-domain' },
          React.createElement('div', { className: 'skill-panel-title' },
            React.createElement('span', { className: 'skill-panel-title-dot' }),
            t('skillDomain')
          ),
          React.createElement('div', null,
            ...DOMAIN.map(d =>
              React.createElement('div', { className: 'domain-item', key: d.name },
                React.createElement('span', { className: 'domain-name' }, d.name),
                React.createElement('div', { className: 'domain-dots' },
                  ...[1,2,3,4,5].map(i =>
                    React.createElement('span', { className: `domain-dot${i <= d.level ? ' filled' : ''}`, key: i })
                  )
                )
              )
            )
          )
        ),
        // Tech Panel
        React.createElement('div', { className: 'skill-panel panel-tech' },
          React.createElement('div', { className: 'skill-panel-title' },
            React.createElement('span', { className: 'skill-panel-title-dot' }),
            t('skillTech')
          ),
          React.createElement('div', null,
            ...TECH.map(s =>
              React.createElement('div', { className: 'bar-item', key: s.name },
                React.createElement('div', { className: 'bar-header' },
                  React.createElement('span', { className: 'bar-name' }, s.name),
                  React.createElement('span', { className: 'bar-pct' }, `${s.pct}%`)
                ),
                React.createElement('div', { className: 'bar-track' },
                  React.createElement('div', { className: 'bar-fill', style: { width: animated ? `${s.pct}%` : '0%' } })
                )
              )
            )
          )
        ),
        // Certs Panel
        React.createElement('div', { className: 'skill-panel panel-certs' },
          React.createElement('div', { className: 'skill-panel-title' },
            React.createElement('span', { className: 'skill-panel-title-dot' }),
            t('certTitle')
          ),
          React.createElement('div', null,
            ...CERTS.map(c =>
              React.createElement('div', { className: 'cert-item', key: c.name },
                React.createElement('div', { className: 'cert-logo', style: { color: c.color, background: c.bg } }, c.logo),
                React.createElement('div', { className: 'cert-info' },
                  React.createElement('div', { className: 'cert-name' }, c.name),
                  React.createElement('div', { className: 'cert-issuer' }, c.issuer)
                )
              )
            )
          )
        )
      )
    )
  );
}

/* ═══════════════════════════════
   EMOBOT+ EXTRA SECTIONS
═══════════════════════════════ */
function EmobotCaseStudy({ lang }) {
  const PA = lang === 'zh';
  const [activePersona, setActivePersona] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const pick = (item, key) => {
    const zhKey = 'zh' + key.charAt(0).toUpperCase() + key.slice(1);
    return PA && item[zhKey] ? item[zhKey] : item[key];
  };

  const proof = [
    { num: 'Silver', label: 'Award Signal', zhLabel: '獎項證據', desc: '2025 AI Interdisciplinary Sustainability Innovation Contest', zhDesc: '2025 AI 跨域永續創新競賽銀獎' },
    { num: '23.1%', label: 'Student Need', zhLabel: '學生需求', desc: 'High depressive tendency cited in the proposal context', zhDesc: '提案脈絡引用大學生高憂鬱傾向比例' },
    { num: '24/7', label: 'Support Layer', zhLabel: '支持層', desc: 'Always-available, low-threshold emotional check-in', zhDesc: '全天候、低門檻的情緒檢核與陪伴入口' },
  ];

  const liveProjectUrl = 'https://emobot-plus.vercel.app';
  const iaicReportUrl = 'https://iaic.nccu.edu.tw/achievements/60';
  const awardVideoUrl = 'https://www.youtube.com/watch?v=3wb-ZB9ALIg';

  const mediaLinks = [
    { kind: 'Interview', zhKind: '專訪報導', title: 'NCCU IAIC feature', zhTitle: '政大 AI 中心專訪', desc: 'Published 2026-01-20', zhDesc: '2026-01-20 發佈', href: iaicReportUrl },
    { kind: 'Live build', zhKind: '實際專案', title: 'Emobot+ prototype', zhTitle: 'Emobot+ 線上原型', desc: 'Open the deployed product', zhDesc: '開啟 Vercel 實際作品', href: liveProjectUrl },
    { kind: 'Award proof', zhKind: '得獎佐證', title: 'Contest video', zhTitle: '競賽得獎影片', desc: 'Watch on YouTube', zhDesc: '前往 YouTube 觀看', href: awardVideoUrl },
  ];

  const problems = [
    { iconKey: 'heart', title: 'Hidden Distress', zhTitle: '隱性心理壓力', body: 'Students often avoid formal help because of stigma, self-denial, or fear that their issue is not serious enough. The product starts with everyday language instead of a clinical intake form.', zhBody: '學生常因污名、自我否認或覺得問題不夠嚴重而延後求助。產品以日常語言開始，而不是一開始就要求臨床式填表。' },
    { iconKey: 'activity', title: 'Counseling Bottleneck', zhTitle: '諮商量能瓶頸', body: 'Campus counseling teams face long queues and limited session capacity. Emobot+ creates a pre-counseling layer that helps users organize emotions before professional support.', zhBody: '校園諮商端面臨排程等待與接案量能限制。Emobot+ 建立諮商前支持層，協助使用者先整理情緒與問題脈絡。' },
    { iconKey: 'shield', title: 'Weak Risk Continuity', zhTitle: '風險追蹤斷點', body: 'Most tools answer one message at a time. The proposal reframed safety as longitudinal tracking: emotional trend, issue tags, risk phrases, and consent-based escalation.', zhBody: '多數工具只回覆單次訊息。提案將安全性重構為長期追蹤：情緒趨勢、議題標籤、風險語句與同意制轉介。' },
  ];

  const swot = [
    { iconKey: 'award', label: 'Strengths', zhLabel: 'Strengths 優勢', points: ['Trait-matched support instead of one-size-fits-all chat', 'Avatar and voice direction increases emotional presence', 'Anonymous, low-threshold entry reduces help-seeking pressure'], zhPoints: ['心理特質智慧媒合，提供個人化支持體驗', '擬人化視覺與語音互動，提升沉浸感與情感連結', '即時、匿名、低進入門檻，降低心理防衛與求助壓力'] },
    { iconKey: 'shield', label: 'Weaknesses', zhLabel: 'Weaknesses 弱點', points: ['AI support still needs trust calibration', 'Matching quality depends on long-term feedback data', 'Technical development and safety governance are costly'], zhPoints: ['使用者對 AI 數位心理支持的信任仍需建立', '精準媒合需要長期優化與足夠資料量', '技術研發、安全治理與維運成本較高'] },
    { iconKey: 'trend', label: 'Opportunities', zhLabel: 'Opportunities 機會', points: ['Mental-health demand continues to grow globally', 'Schools and public agencies need preventive support systems', 'Most AI companions still lack structured referral architecture'], zhPoints: ['全球心理健康市場需求持續成長', '政府與教育單位推動心理健康促進與防治計畫', '現有 AI 陪伴產品仍缺乏完整心理支持與轉介架構'] },
    { iconKey: 'target', label: 'Threats', zhLabel: 'Threats 威脅', points: ['Ethical and regulatory expectations for AI intervention', 'Fast-moving AI companion competitors', 'Habit formation and sustainable business model risk'], zhPoints: ['AI 介入心理支持涉及法規與倫理挑戰', '競爭者快速跟進，產品差異化需要持續深化', '使用者接受度、習慣養成與商業模式仍需驗證'] },
  ];

  const solutions = [
    { index: '01', iconKey: 'heart', title: 'Low-threshold Companion', zhTitle: '低門檻陪伴入口', body: 'A non-judgmental dialogue surface for self-disclosure, emotional labeling, grounding prompts, and self-awareness before the user is ready to seek formal help.', zhBody: '建立非評價式對話介面，支持自我揭露、情緒標記、穩定練習與自我覺察，讓使用者在正式求助前也有安全出口。', tags: ['Self-disclosure', 'CASA', 'Daily check-in'] },
    { index: '02', iconKey: 'target', title: 'Trait-matched AI Persona', zhTitle: '特質媒合 AI 人設', body: 'Psychological scales and conversation history become a need vector that selects a companion style, not a diagnosis. The match can adapt as user feedback and emotion patterns change.', zhBody: '心理量表與對話歷程轉為需求向量，用來媒合陪伴風格，而不是診斷。媒合結果可隨回饋與情緒模式動態調整。', tags: ['Attachment', 'DERS', 'Needs vector'] },
    { index: '03', iconKey: 'shield', title: 'Safety-aware Handoff', zhTitle: '風險感知銜接', body: 'Risk phrase detection, topic labels, and emotional trends feed a structured counselor summary when consent is granted, reducing the friction between AI support and human care.', zhBody: '風險語句偵測、議題標籤與情緒趨勢在使用者同意後整理成諮商摘要，降低 AI 支持與真人照護之間的銜接成本。', tags: ['Risk routing', 'Consent', 'Counselor report'] },
  ];

  const architectureColumns = [
    {
      num: '1',
      title: 'Frontend System',
      zhTitle: '前端系統架構',
      sub: 'React + JavaScript',
      nodes: [
        { top: 'Figma + Framer Motion', bottom: 'User interface design and interaction planning', zhBottom: '使用者介面設計與互動規劃' },
        { top: 'React Router + Axios', bottom: 'Route, state, and API connection framework', zhBottom: '系統框架管理與資料串接' },
        { top: 'Tailwind CSS + styled components', bottom: 'Immersive visual layer and responsive components', zhBottom: '視覺化沉浸體驗與響應式元件' },
      ],
    },
    {
      num: '2',
      title: 'Backend Data Processing',
      zhTitle: '後端資料處理',
      sub: 'Python + FastAPI',
      nodes: [
        { top: 'MBTI + DERS + ERQ + BPNS', bottom: 'Psychological signal and trait module', zhBottom: '心理測驗與特質訊號模組' },
        { top: 'Siamese Net + Bayesian Inference', bottom: 'Personalized matching algorithm direction', zhBottom: '個人化推薦與媒合演算法方向' },
        { top: 'Pandas + NumPy + PyTorch', bottom: 'Data vectorization and model training pipeline', zhBottom: '資料向量化與模型訓練流程' },
      ],
    },
    {
      num: '3',
      title: 'AI Interaction Module',
      zhTitle: 'AI 互動模組',
      sub: 'Python + FastAPI',
      nodes: [
        { top: 'LLM + Prompt Engineering', bottom: 'Language generation and support-tone control', zhBottom: '語言模組生成與支持語氣控制' },
        { top: 'TTS + Avatar Animation API', bottom: 'Dynamic AI avatar and multimodal presence', zhBottom: 'AI avatar 動態影像與多模態臨場感' },
        { top: 'BERT + NRC Emotion Lexicon', bottom: 'Emotion recognition and risk classification', zhBottom: '情緒辨識與風險分類' },
      ],
    },
  ];

  const flow = [
    { title: 'Anonymous Entry', zhTitle: '匿名入口', body: 'The first screen avoids diagnostic pressure and invites a small emotional check-in.', zhBody: '首屏避免診斷壓力，以低壓的情緒檢核開啟互動。' },
    { title: 'Trait Signal', zhTitle: '特質訊號', body: 'MBTI, attachment style, emotion regulation, and basic psychological needs form a lightweight support profile.', zhBody: 'MBTI、依附風格、情緒調節與基本心理需求形成輕量支持輪廓。' },
    { title: 'Companion Session', zhTitle: '陪伴對話', body: 'The selected persona adjusts tone, structure, and support mode across text, audio, and avatar-ready surfaces.', zhBody: '被媒合的人設會調整語氣、結構與支持方式，對應文字、語音與虛擬形象介面。' },
    { title: 'Insight & Referral', zhTitle: '洞察與轉介', body: 'Emotion-topic analysis creates trends, issue labels, risk flags, and counselor-ready summaries with consent.', zhBody: '情緒議題分析整理趨勢、議題標籤、風險旗標與同意制諮商摘要。' },
  ];

  const journey = [
    { iconKey: 'heart', title: 'Contact & Guidance', zhTitle: '接觸與引導', body: 'Anonymous login, simple consent language, and a gentle entry prompt frame the experience as digital support and self-exploration.', zhBody: '匿名登入、簡明同意條款與柔性入口提示，將體驗定位為數位情緒支持與自我探索。', purpose: 'Lower defense and help-seeking pressure', zhPurpose: '降低心理防衛與求助壓力' },
    { iconKey: 'target', title: 'Matching Algorithm', zhTitle: '媒合演算法', body: 'Psychological scales and early dialogue signals become trait vectors that map users to a better-fit companion style.', zhBody: '心理測驗與早期對話訊號轉為特徵向量，媒合更適合的 AI 陪伴風格。', purpose: 'Understand trait and support needs', zhPurpose: '理解使用者特質與支持需求' },
    { iconKey: 'cpu', title: 'AI Companion', zhTitle: 'AI 互動陪伴', body: 'The system adapts language, response length, emotional tone, and optional avatar presentation during conversation.', zhBody: '系統在對話中調整語言、回覆長度、情緒語氣與可選虛擬形象呈現。', purpose: 'Build trust, emotional support, and early insight', zhPurpose: '建立信任、情緒陪伴與初步覺察' },
    { iconKey: 'shield', title: 'Risk Sensing', zhTitle: '情緒風險偵測', body: 'Persistent risk phrases, despair signals, and emotional volatility trigger flags for professional resource guidance.', zhBody: '對話中的持續風險語句、無望感與情緒波動會觸發專業資源提示與預警。', purpose: 'Detect risk without over-claiming clinical diagnosis', zhPurpose: '進行情緒分析與即時風險判斷' },
    { iconKey: 'briefcase', title: 'Feedback & Intervention', zhTitle: '回饋與介入', body: 'After feedback and consent, structured summaries can support school counselors or mental-health partners.', zhBody: '完成回饋與同意後，系統整理結構化摘要，支援校方或專業心理資源介入。', purpose: 'Connect AI support back to human care', zhPurpose: '必要時與專業心理資源合作介入' },
  ];

  const personaPrinciples = [
    { label: 'Match', zhLabel: '媒合', body: 'Each persona maps to a different help-seeking state, not a visual skin.', zhBody: '每個人設對應不同求助狀態，而不是替換外觀而已。' },
    { label: 'Tone', zhLabel: '語氣', body: 'Response length, pacing, and emotional directness change with the support need.', zhBody: '回覆長度、節奏與情緒直率度，會隨支持需求調整。' },
    { label: 'Boundary', zhLabel: '邊界', body: 'The system keeps care language supportive while avoiding clinical over-claiming.', zhBody: '系統維持支持語言，但避免宣稱取代臨床判斷。' },
  ];

  const personas = [
    {
      name: 'Lumi',
      iconKey: 'heart',
      image: 'assets/emobot-persona-lumi.webp',
      type: 'Empathic listener',
      zhType: '同理型 AI',
      trait: 'Validation and warmth',
      zhTrait: '情緒接住與溫暖支持',
      ability: 'Builds a warm, receptive atmosphere and helps users feel seen before problem solving.',
      zhAbility: '擅長建立溫暖、接納的氛圍，陪伴使用者覺察情緒並與之共處。',
      topics: 'Loneliness, low self-esteem, emotional loss, self-doubt, relationship tension',
      zhTopics: '孤獨感、低自尊、情感失落、自我懷疑、親密關係議題',
      desc: 'Reflects the user in clear, gentle language and helps them feel seen before moving into problem solving.',
      zhDesc: '以清楚且溫和的語言映照使用者，先讓對方感覺被理解，再逐步進入問題整理。',
      prompt: 'I keep replaying a conflict with my friend and I cannot stop blaming myself.',
      zhPrompt: '我一直重播跟朋友吵架的畫面，停不下來地責怪自己。',
      response: 'It makes sense that your mind keeps returning to it. Let us separate what actually happened from what your guilt is adding on top.',
      zhResponse: '你的腦袋一直回到那件事是可以理解的。我們先把實際發生的事情，和罪惡感額外加上的部分分開看。',
    },
    {
      name: 'Solin',
      iconKey: 'activity',
      image: 'assets/emobot-persona-solin.webp',
      type: 'Insight companion',
      zhType: '洞察型 AI',
      trait: 'Depth and hidden motives',
      zhTrait: '深層理解與內在探索',
      ability: 'Explores subconscious patterns, repeated interpersonal scripts, and unresolved inner conflicts.',
      zhAbility: '探索潛意識與隱藏動機，引導使用者對過往經驗進行深層理解。',
      topics: 'Repeated relationship patterns, trauma narratives, self-worth questions, dream exploration',
      zhTopics: '反覆的人際模式、創傷經驗、自我價值疑問、夢境探索、內在空虛感',
      desc: 'Guides reflective conversation when the user needs meaning-making, not immediate action.',
      zhDesc: '當使用者需要理解脈絡而不是立刻行動時，引導更深層的反思與意義整理。',
      prompt: 'I always choose people who make me feel small, and I do not understand why.',
      zhPrompt: '我總是靠近讓我覺得自己很渺小的人，但我不知道為什麼。',
      response: 'That pattern may be protecting something older. Let us look at when this feeling first became familiar, without rushing to judge it.',
      zhResponse: '這個模式可能在保護某個更早形成的感受。我們先看看這種熟悉感最早從哪裡來，不急著評價它。',
    },
    {
      name: 'Niko',
      iconKey: 'zap',
      image: 'assets/emobot-persona-niko.webp',
      type: 'Solution strategist',
      zhType: '解決型 AI',
      trait: 'Action planning and focus',
      zhTrait: '目標拆解與行動推進',
      ability: 'Turns vague pressure into goals, priorities, resources, and small executable steps.',
      zhAbility: '現實導向，強調目標設定與資源活用，能快速聚焦在問題解決上。',
      topics: 'Work stress, conflict handling, time management, short-term decisions, daily pressure',
      zhTopics: '職場壓力、衝突處理、時間管理、短期決策困難、日常壓力應對',
      desc: 'Turns vague pressure into options, priorities, and a visible plan without dismissing the emotional context.',
      zhDesc: '把模糊壓力拆成選項、優先順序與可視化計畫，但不忽略情緒脈絡。',
      prompt: 'Everything is overdue and I do not know where to start.',
      zhPrompt: '每件事都延後了，我不知道要從哪裡開始。',
      response: 'We will not solve everything tonight. Pick the task with the closest consequence, then we make a 20-minute first move.',
      zhResponse: '今晚不用一次解決全部。我們先挑出後果最近的任務，再設定一個 20 分鐘就能開始的第一步。',
    },
    {
      name: 'Clara',
      iconKey: 'book',
      image: 'assets/emobot-persona-clara.webp',
      type: 'Cognitive reframer',
      zhType: '認知型 AI',
      trait: 'Structure and cognitive clarity',
      zhTrait: '邏輯釐清與認知重建',
      ability: 'Clarifies structure, analyzes irrational thoughts, and proposes cognitive reconstruction steps.',
      zhAbility: '結構明確、邏輯清晰，分析非理性思考並提供認知重建步驟。',
      topics: 'Negative self-talk, anxiety, perfectionism, procrastination, emotion regulation',
      zhTopics: '負面自我對話、焦慮、完美主義、拖延、情緒管理',
      desc: 'Uses evidence-based questioning to identify assumptions, reframe self-criticism, and generate a structured reflection.',
      zhDesc: '透過實證式提問辨識假設、重構自我批評，並整理成結構化反思。',
      prompt: 'If I fail this interview, it means I am not capable.',
      zhPrompt: '如果我這次面試失敗，就代表我不夠有能力。',
      response: 'That sentence sounds like a conclusion, not evidence. What are two other explanations that would still fit the facts?',
      zhResponse: '這句話比較像結論，而不是證據。還有哪些解釋也符合事實？我們先列兩個。',
    },
  ];

  const active = personas[activePersona];

  const architecture = [
    { iconKey: 'monitor', name: 'React Experience Layer', zhName: 'React 體驗層', desc: 'Onboarding, companion chat, avatar-ready surface, report preview, responsive portfolio case UI', zhDesc: '引導流程、陪伴對話、虛擬形象介面、報告預覽與響應式案例頁' },
    { iconKey: 'database', name: 'FastAPI Service Layer', zhName: 'FastAPI 服務層', desc: 'Session logging, consent state, report generation, counselor integration boundaries', zhDesc: '對話紀錄、同意狀態、報告生成與諮商端整合邊界' },
    { iconKey: 'target', name: 'Psychological Embedding', zhName: '心理嵌入媒合', desc: 'Trait vectors from scales, needs, emotion regulation patterns, and conversation history', zhDesc: '從量表、需求、情緒調節模式與對話歷程形成特質向量' },
    { iconKey: 'cpu', name: 'Emotion and Risk Intelligence', zhName: '情緒與風險智慧層', desc: 'LLM dialogue, BERT/NRC-style emotion analysis, topic tagging, risk phrase detection', zhDesc: 'LLM 對話、BERT/NRC 式情緒分析、議題標籤與風險語句偵測' },
    { iconKey: 'activity', name: 'Avatar and Voice Direction', zhName: '虛擬形象與語音方向', desc: 'D-ID, HeyGen, and TTS-ready design direction for face, voice, gaze, and tone', zhDesc: '以 D-ID、HeyGen 與 TTS 為方向規劃表情、聲音、眼神與語氣' },
  ];

  const features = [
    { iconKey: 'layers', title: 'Consent-first data model', zhTitle: '同意優先的資料模型', body: 'The product distinguishes private companionship, anonymized analytics, and counselor handoff so trust is designed into the workflow.', zhBody: '產品區分私人陪伴、匿名化分析與諮商端銜接，讓信任從流程中被設計出來。' },
    { iconKey: 'chart', title: 'Issue and emotion timeline', zhTitle: '議題與情緒時間軸', body: 'Dialogue records can be transformed into topic labels, emotional fluctuations, support needs, and longitudinal change.', zhBody: '對話紀錄可轉成議題標籤、情緒波動、支持需求與長期變化。' },
    { iconKey: 'shield', title: 'Risk threshold logic', zhTitle: '風險門檻邏輯', body: 'Extreme self-negation, hopelessness, and self-harm signals trigger supportive guidance and professional resource routing.', zhBody: '極端自我否定、無望感與自傷傾向會觸發支持性引導與專業資源導向。' },
    { iconKey: 'briefcase', title: 'Counselor-ready summary', zhTitle: '諮商端摘要', body: 'The system can generate structured intake context: scale results, key phrases, emotional trends, and priority markers.', zhBody: '系統可生成結構化初談脈絡：量表結果、關鍵語句、情緒趨勢與優先標記。' },
    { iconKey: 'globe', title: 'Campus to EAP expansion', zhTitle: '校園到企業 EAP', body: 'The same support logic can extend to universities, NGOs, community mental health centers, and employee assistance programs.', zhBody: '同一套支持邏輯可延伸到大學、NGO、社區心理衛生中心與企業員工協助方案。' },
    { iconKey: 'trend', title: 'Research-backed iteration', zhTitle: '研究驅動迭代', body: 'Qualitative interviews, questionnaire analysis, dialogue semantics, and prototype feedback become concrete changes to matching, tone, and safety handoff.', zhBody: '質性訪談、問卷分析、對話語意與原型回饋會轉化為媒合、語氣與安全銜接的具體迭代。' },
  ];

  const researchMetrics = [
    { value: 'Mixed', label: 'Qual + Quant design', zhLabel: '質性 + 量化研究設計' },
    { value: '3', label: 'Evidence artifacts', zhLabel: '研究結果圖' },
    { value: '2', label: 'Questionnaire analysis views', zhLabel: '問卷分析視角' },
    { value: '1', label: 'Dialogue semantic model', zhLabel: '對話語意模型' },
  ];

  const researchMethods = [
    { label: '01 / Discovery', zhLabel: '01 / 探索', title: 'User interviews', zhTitle: '使用者質性訪談', body: 'Interviewed target users around help-seeking friction, disclosure comfort, AI trust, and the emotional language they naturally use before counseling.', zhBody: '針對求助阻力、自我揭露舒適度、AI 信任感，以及進入諮商前會自然使用的情緒語言進行使用者訪談。' },
    { label: '02 / Instrument', zhLabel: '02 / 工具', title: 'Survey and construct design', zhTitle: '問卷與構念設計', body: 'Translated psychological constructs into measurable questionnaire dimensions, then connected responses back to persona matching and support-style design.', zhBody: '將心理構念轉成可測量的問卷維度，再把回應結果連回人設媒合與支持風格設計。' },
    { label: '03 / Experiment', zhLabel: '03 / 實驗', title: 'Prototype response testing', zhTitle: '原型互動測試', body: 'Compared user responses to different companion tones, emotional prompts, and dialogue structures to identify which patterns improved perceived understanding.', zhBody: '比較使用者面對不同陪伴語氣、情緒提示與對話結構時的反應，找出能提升被理解感的互動模式。' },
    { label: '04 / Analysis', zhLabel: '04 / 分析', title: 'Semantic and quantitative readout', zhTitle: '語意與量化讀出', body: 'Combined semantic dialogue analysis with questionnaire distributions, correlation patterns, and design implications for the next MVP iteration.', zhBody: '整合對話語意分析、問卷分布、相關模式與設計推論，回饋到下一輪 MVP 迭代。' },
  ];

  const researchArtifacts = [
    {
      src: 'assets/p1.png',
      title: 'Dialogue Semantic Analysis',
      zhTitle: '對話語意分析結果',
      meta: 'Qualitative coding / semantic clustering',
      zhMeta: '質性編碼 / 語意群集',
      desc: 'Maps user language into emotional themes, support needs, and candidate response strategies for AI companion dialogue design.',
      zhDesc: '將使用者語言映射為情緒主題、支持需求與 AI 陪伴回應策略，作為對話設計依據。',
      badge: 'P1',
    },
    {
      src: 'assets/p2.png',
      title: 'User Design Questionnaire',
      zhTitle: '使用者設計問卷量化分析',
      meta: 'Survey distribution / construct readout',
      zhMeta: '問卷分布 / 構念讀出',
      desc: 'Shows how questionnaire responses inform trust, disclosure comfort, interaction preference, and support-mode prioritization.',
      zhDesc: '呈現問卷回應如何回饋信任感、自我揭露舒適度、互動偏好與支持模式排序。',
      badge: 'P2',
    },
    {
      src: 'assets/p3.png',
      title: 'Quantitative Pattern Comparison',
      zhTitle: '量化模式比較分析',
      meta: 'Comparative analysis / design implication',
      zhMeta: '比較分析 / 設計推論',
      desc: 'Compares questionnaire dimensions to identify which signals should influence onboarding, persona matching, and counselor-facing summaries.',
      zhDesc: '比較不同問卷維度，判斷哪些訊號應影響引導流程、人設媒合與諮商端摘要。',
      badge: 'P3',
      wide: true,
    },
  ];

  const researchInsights = [
    { label: 'Finding 01', zhLabel: '發現 01', title: 'Trust is earned before advice', zhTitle: '信任先於建議', body: 'Users respond better when the system validates emotion and clarifies boundaries before moving into planning.', zhBody: '系統先接住情緒並說清楚邊界，再進入行動建議時，使用者反應更穩定。' },
    { label: 'Finding 02', zhLabel: '發現 02', title: 'Questionnaires need a product role', zhTitle: '問卷需要產品角色', body: 'Survey results are not decoration; they become onboarding signals that shape tone, pacing, and support depth.', zhBody: '問卷不是裝飾，而是引導流程訊號，用來調整語氣、節奏與支持深度。' },
    { label: 'Finding 03', zhLabel: '發現 03', title: 'Semantic evidence guides safety', zhTitle: '語意證據導向安全設計', body: 'Repeated emotional themes and risk-adjacent language define when the system should slow down, summarize, or route to human care.', zhBody: '重複出現的情緒主題與風險鄰近語言，決定系統何時放慢、摘要或導向真人支持。' },
  ];

  const evidence = [
    { iconKey: 'award', title: 'Award Video', zhTitle: '得獎影片', body: 'Embedded contest video for the portfolio reader to verify the award context.', zhBody: '嵌入競賽影片，讓作品集讀者能直接驗證得獎脈絡。' },
    { iconKey: 'book', title: 'Proposal PDF', zhTitle: '提案計畫書', body: 'Reserve for the final deck, problem analysis, market research, and SDG impact page.', zhBody: '預留放置完整提案書、問題分析、市場研究與 SDG 影響頁。' },
    { iconKey: 'monitor', title: 'MVP Screens', zhTitle: 'MVP 畫面', body: 'Reserve for onboarding, persona match, chat interface, report preview, and dashboard screenshots.', zhBody: '預留放置引導流程、人設媒合、對話介面、報告預覽與儀表板截圖。' },
  ];

  return React.createElement(React.Fragment, null,
    React.createElement('div', { className: 'proj-section reveal' },
      React.createElement('div', { className: 'emobot-case' },
        React.createElement('div', { className: 'emobot-case-hero' },
          React.createElement('div', { className: 'emobot-case-copy' },
            React.createElement('div', { className: 'emobot-case-kicker' },
              React.createElement(Icon, { name: 'award' }),
              PA ? '得獎數位心理健康案例' : 'Award-winning digital mental health case'
            ),
            React.createElement('h2', { className: 'emobot-case-title' },
              PA ? '把校園心理支持，設計成一個' : 'Designing campus mental health as a ',
              React.createElement('span', null, PA ? '可被信任的產品系統' : 'trusted product system'),
              PA ? '。' : '.'
            ),
            React.createElement('p', { className: 'emobot-case-lead' },
              PA
                ? '這個頁面將 Emobot+ 從競賽提案重新轉譯成作品集案例：從問題洞察、互動策略、AI 架構、安全邊界，到如何讓諮商中心在使用者同意後更快理解個案脈絡。'
                : 'This case translates the award proposal into a portfolio-ready product story: problem framing, interaction strategy, AI architecture, safety boundaries, and the handoff logic that helps counselors understand context after consent.'
            ),
            React.createElement('div', { className: 'emobot-pill-row' },
              ...['SDG 3', 'Campus Care', 'AI Companion', 'Risk Routing'].map((label, i) =>
                React.createElement('span', { className: 'emobot-pill', key: label },
                  React.createElement(Icon, { name: ['globe', 'heart', 'cpu', 'shield'][i] }),
                  label
                )
              )
            )
          ),
          React.createElement('div', { className: 'emobot-video-panel' },
            React.createElement('div', { className: 'emobot-video-toolbar' },
              React.createElement('div', { className: 'emobot-video-dots' },
                React.createElement('span', null),
                React.createElement('span', null),
                React.createElement('span', null)
              ),
              React.createElement('span', null, PA ? '得獎影片 / 點擊播放' : 'Award video / click to play')
            ),
            React.createElement('div', { className: 'emobot-video-frame' },
              !videoLoaded && React.createElement('button', {
                className: 'emobot-video-poster',
                type: 'button',
                onClick: () => setVideoLoaded(true),
                'aria-label': PA ? '播放 Emobot+ 得獎影片' : 'Play Emobot+ award video'
              },
                React.createElement('img', {
                  src: 'https://img.youtube.com/vi/3wb-ZB9ALIg/hqdefault.jpg',
                  alt: PA ? 'Emobot+ 得獎影片封面' : 'Emobot+ award video thumbnail',
                  loading: 'lazy'
                }),
                React.createElement('span', { className: 'emobot-play-badge' }, React.createElement(Icon, { name: 'zap' })),
                React.createElement('span', { className: 'emobot-video-poster-copy' },
                  React.createElement('span', null, PA ? '先顯示可見封面，點擊後載入影片' : 'Visible poster first, iframe loads after click'),
                  React.createElement('span', null, PA ? '銀獎佐證' : 'Silver Medal proof')
                )
              ),
              videoLoaded && React.createElement('iframe', {
                src: 'https://www.youtube.com/embed/3wb-ZB9ALIg?autoplay=1&rel=0&modestbranding=1&playsinline=1',
                title: PA ? 'Emobot+ 得獎影片' : 'Emobot+ award video',
                loading: 'lazy',
                referrerPolicy: 'strict-origin-when-cross-origin',
                allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
                allowFullScreen: true
              })
            ),
            React.createElement('div', { className: 'emobot-reference-grid' },
              ...mediaLinks.map(link => React.createElement('a', {
                className: 'emobot-reference-card',
                href: link.href,
                target: '_blank',
                rel: 'noreferrer',
                key: link.href
              },
                React.createElement('span', null, PA ? link.zhKind : link.kind),
                React.createElement('strong', null, PA ? link.zhTitle : link.title),
                React.createElement('small', null, PA ? link.zhDesc : link.desc)
              ))
            ),
            React.createElement('div', { className: 'emobot-live-preview' },
              React.createElement('img', {
                src: 'assets/emobot-live-home.webp',
                alt: PA ? 'Emobot+ 線上專案首頁截圖' : 'Emobot+ live project home screen',
                loading: 'lazy',
                decoding: 'async'
              }),
              React.createElement('div', { className: 'emobot-live-preview-copy' },
                React.createElement('div', null,
                  React.createElement('div', { className: 'emobot-live-preview-label' }, PA ? 'Live product reference' : 'Live product reference'),
                  React.createElement('p', null,
                    PA
                      ? '實際部署版本保留柔和藍色、低壓入口與機器人介紹；作品集頁將其轉譯成更完整的產品敘事與研究證據。'
                      : 'The deployed build carries the soft blue product language and low-pressure entry; this portfolio page reframes it as a fuller product and research case.'
                  )
                ),
                React.createElement('a', { href: liveProjectUrl, target: '_blank', rel: 'noreferrer' }, PA ? '開啟線上作品 ↗' : 'Open live build ↗')
              )
            )
          )
        ),
        React.createElement('div', { className: 'emobot-proof-grid' },
          ...proof.map(item => React.createElement('div', { className: 'emobot-proof-card', key: item.label },
            React.createElement('div', { className: 'emobot-proof-num' }, item.num),
            React.createElement('div', { className: 'emobot-proof-label' }, pick(item, 'label')),
            React.createElement('div', { className: 'emobot-proof-desc' }, pick(item, 'desc'))
          ))
        )
      )
    ),
    React.createElement('div', { className: 'proj-section reveal emobot-case-section' },
      React.createElement('div', { className: 'emobot-section-head' },
        React.createElement('div', null,
          React.createElement('div', { className: 'emobot-section-kicker' }, PA ? '01 / 問題不是缺少聊天機器人' : '01 / The problem is not another chatbot'),
          React.createElement('h3', { className: 'emobot-section-title' }, PA ? '真正缺的是低壓入口、持續訊號與安全銜接。' : 'What is missing is a low-pressure entry, continuous signals, and safe handoff.')
        ),
        React.createElement('p', { className: 'emobot-section-copy' },
          PA
            ? '提案中的問題分析被整理成三個產品設計約束：不能讓學生一開始就感覺被診斷、不能加重諮商端負擔，也不能忽略高風險訊號。'
            : 'The proposal becomes three product constraints: avoid making students feel diagnosed at entry, avoid adding burden to counseling teams, and avoid missing high-risk signals.'
        )
      ),
      React.createElement('div', { className: 'emobot-swot-stage' },
        ...swot.map(item => React.createElement('article', { className: 'emobot-swot-card', key: item.label },
          React.createElement('div', { className: 'emobot-swot-label' },
            React.createElement('strong', null, pick(item, 'label')),
            React.createElement(Icon, { name: item.iconKey })
          ),
          React.createElement('ul', null,
            ...(PA ? item.zhPoints : item.points).map(point => React.createElement('li', { key: point }, point))
          )
        )),
        React.createElement('div', { className: 'emobot-swot-center' },
          React.createElement('div', null,
            React.createElement('strong', null, 'SWOT'),
            React.createElement('span', null, PA ? '市場診斷' : 'Market diagnosis')
          )
        )
      ),
      React.createElement('div', { className: 'emobot-problem-rhythm' },
        ...problems.map(item => React.createElement('span', { className: 'emobot-problem-pill', key: item.title },
          React.createElement(Icon, { name: item.iconKey }),
          pick(item, 'title')
        ))
      )
    ),
    React.createElement('div', { className: 'proj-section reveal emobot-case-section' },
      React.createElement('div', { className: 'emobot-section-head' },
        React.createElement('div', null,
          React.createElement('div', { className: 'emobot-section-kicker' }, PA ? '02 / 技術互動架構' : '02 / Interaction architecture'),
          React.createElement('h3', { className: 'emobot-section-title' }, PA ? '用三條能力線，串起前端、心理訊號與 AI 陪伴。' : 'Three capability lanes connect frontend, psychological signals, and AI companionship.')
        ),
        React.createElement('p', { className: 'emobot-section-copy' },
          PA
            ? '參考原始架構圖的資訊組織方式，這裡將系統改寫成前端體驗、後端資料處理、AI 互動模組三條 runway，讓面試官能快速讀懂我的產品架構思維。'
            : 'Inspired by the original architecture diagram, this turns the system into three runways: frontend experience, backend data processing, and AI interaction modules.'
        )
      ),
      React.createElement('div', { className: 'emobot-architecture-runway' },
        ...architectureColumns.map(col => React.createElement('section', { className: 'emobot-arch-column', key: col.num },
          React.createElement('div', { className: 'emobot-arch-column-head' },
            React.createElement('div', { className: 'emobot-arch-column-num' }, col.num),
            React.createElement('div', null,
              React.createElement('div', { className: 'emobot-arch-column-title' }, pick(col, 'title')),
              React.createElement('span', { className: 'emobot-arch-column-sub' }, col.sub)
            )
          ),
          ...col.nodes.map(node => React.createElement('div', { className: 'emobot-arch-node', key: node.top },
            React.createElement('strong', null, node.top),
            React.createElement('span', null, pick(node, 'bottom'))
          ))
        ))
      ),
      React.createElement('div', { className: 'emobot-problem-rhythm' },
        ...solutions.map(item => React.createElement('span', { className: 'emobot-problem-pill', key: item.title },
          React.createElement(Icon, { name: item.iconKey }),
          pick(item, 'title')
        ))
      )
    ),
    React.createElement('div', { className: 'proj-section reveal emobot-case-section' },
      React.createElement('div', { className: 'emobot-section-head' },
        React.createElement('div', null,
          React.createElement('div', { className: 'emobot-section-kicker' }, PA ? '03 / 服務旅程' : '03 / Service journey'),
          React.createElement('h3', { className: 'emobot-section-title' }, PA ? '從一則匿名訊息，到可行的支持路徑。' : 'From one anonymous message to an actionable support path.')
        ),
        React.createElement('p', { className: 'emobot-section-copy' },
          PA
            ? '流程把心理學語言轉成產品語言：入口要輕、媒合要有理由、對話要能變成可被理解的趨勢，轉介則必須由使用者同意啟動。'
            : 'The journey translates psychology into product behavior: the entry stays light, matching has a reason, dialogue becomes legible trends, and referral begins only after consent.'
        )
      ),
      React.createElement('div', { className: 'emobot-flow-ribbon' },
        ...journey.map((step, i) => React.createElement('article', { className: 'emobot-flow-card', key: step.title },
          React.createElement('div', null,
            React.createElement('div', { className: 'emobot-flow-badge' }, String(i + 1).padStart(2, '0')),
            React.createElement(Icon, { name: step.iconKey }),
            React.createElement('h4', null, pick(step, 'title')),
            React.createElement('p', null, pick(step, 'body'))
          ),
          React.createElement('div', { className: 'emobot-flow-purpose' }, pick(step, 'purpose'))
        ))
      )
    ),
    React.createElement('div', { className: 'proj-section reveal emobot-case-section' },
      React.createElement('div', { className: 'emobot-section-head' },
        React.createElement('div', null,
          React.createElement('div', { className: 'emobot-section-kicker' }, PA ? '04 / 互動原型' : '04 / Interaction prototype'),
          React.createElement('h3', { className: 'emobot-section-title' }, PA ? 'Persona 是心理支持策略，不是角色裝飾。' : 'Personas are support strategies, not character skins.')
        ),
        React.createElement('p', { className: 'emobot-section-copy' },
          PA
            ? '此區塊依據實際專案的人設卡片重構：每個 AI 代表不同支持任務，從同理、洞察、行動到認知重構，回應不同情緒狀態與求助議題。'
            : 'This section rebuilds the deployed persona cards as a design system: each AI owns a support job, from validation and insight to action planning and cognitive reframing.'
        )
      ),
      React.createElement('div', { className: 'emobot-persona-evidence' },
        ...personaPrinciples.map(item => React.createElement('article', { key: item.label },
          React.createElement('span', null, PA ? item.zhLabel : item.label),
          React.createElement('p', null, PA ? item.zhBody : item.body)
        ))
      ),
      React.createElement('div', { className: 'emobot-live-panel emobot-persona-lab' },
        React.createElement('div', { className: 'emobot-persona-list', role: 'tablist', 'aria-label': PA ? '選擇 AI 人設' : 'Choose AI persona' },
          ...personas.map((persona, i) => React.createElement('button', {
            className: `emobot-persona-button ${i === activePersona ? 'active' : ''}`,
            key: persona.name,
            type: 'button',
            role: 'tab',
            'aria-selected': i === activePersona,
            onClick: () => setActivePersona(i)
          },
            React.createElement('strong', null, persona.name),
            React.createElement('span', null, pick(persona, 'trait'))
          ))
        ),
        React.createElement('div', { className: 'emobot-persona-stage' },
          React.createElement('figure', { className: 'emobot-persona-visual' },
            React.createElement('img', {
              src: active.image,
              alt: `${active.name} ${PA ? active.zhType : active.type}`,
              loading: 'lazy',
              decoding: 'async'
            }),
            React.createElement('figcaption', null,
              React.createElement('strong', null, active.name),
              React.createElement('span', null, PA ? active.zhType : active.type)
            )
          ),
          React.createElement('div', { className: 'emobot-persona-copy-stack' },
            React.createElement('article', { className: 'emobot-persona-card' },
              React.createElement('div', { className: 'emobot-persona-icon' }, React.createElement(Icon, { name: active.iconKey })),
              React.createElement('div', { className: 'emobot-mini-label' }, PA ? '媒合支持模式' : 'Matched support mode'),
              React.createElement('div', { className: 'emobot-persona-name' }, active.name),
              React.createElement('div', { className: 'emobot-persona-trait' }, pick(active, 'trait')),
              React.createElement('p', { className: 'emobot-persona-desc' }, pick(active, 'desc')),
              React.createElement('div', { className: 'emobot-persona-stats' },
                React.createElement('div', { className: 'emobot-persona-stat' },
                  React.createElement('span', { className: 'emobot-persona-stat-label' }, PA ? '特色能力' : 'Core ability'),
                  React.createElement('strong', null, pick(active, 'ability'))
                ),
                React.createElement('div', { className: 'emobot-persona-stat' },
                  React.createElement('span', { className: 'emobot-persona-stat-label' }, PA ? '適合議題' : 'Best-fit topics'),
                  React.createElement('strong', null, pick(active, 'topics'))
                )
              )
            ),
            React.createElement('div', { className: 'emobot-chat-shell' },
              React.createElement('div', { className: 'emobot-mini-label' }, PA ? '互動語氣樣本' : 'Sample interaction tone'),
              React.createElement('div', { className: 'emobot-chat-row user' },
                React.createElement('div', { className: 'emobot-chat-bubble' }, pick(active, 'prompt'))
              ),
              React.createElement('div', { className: 'emobot-chat-row' },
                React.createElement('div', { className: 'emobot-chat-dot' }, React.createElement(Icon, { name: active.iconKey })),
                React.createElement('div', { className: 'emobot-chat-bubble' }, pick(active, 'response'))
              )
            )
          )
        )
      )
    ),
    React.createElement('div', { className: 'proj-section reveal emobot-case-section' },
      React.createElement('div', { className: 'emobot-section-head' },
        React.createElement('div', null,
          React.createElement('div', { className: 'emobot-section-kicker' }, PA ? '05 / 系統架構' : '05 / System architecture'),
          React.createElement('h3', { className: 'emobot-section-title' }, PA ? '把心理學、AI 與前端互動放進同一個可交付架構。' : 'A deliverable architecture across psychology, AI, and frontend interaction.')
        ),
        React.createElement('p', { className: 'emobot-section-copy' },
          PA
            ? '提案中的技術路線被整理成五層：體驗層、服務層、心理嵌入、情緒風險智慧，以及虛擬形象與語音方向。'
            : 'The technical proposal is translated into five layers: experience, service, psychological embedding, emotion-risk intelligence, and avatar or voice direction.'
        )
      ),
      React.createElement('div', { className: 'emobot-architecture' },
        React.createElement('div', { className: 'emobot-arch-panel' },
          React.createElement('div', { className: 'emobot-section-kicker' }, PA ? '產品架構' : 'Product architecture'),
          React.createElement('p', { className: 'emobot-section-copy' },
            PA
              ? '此架構讓作品集讀者能看見我如何把心理學研究、UX 流程、AI 模組與前端實作拆成可被工程化的產品邊界。'
              : 'This architecture shows how I translate psychology, UX flow, AI modules, and frontend implementation into product boundaries an engineering team can reason about.'
          ),
          React.createElement('blockquote', { className: 'emobot-quote' },
            PA ? 'AI 不應該假裝自己是心理師；它應該讓使用者更早被接住，讓專業者更快看見脈絡。' : 'AI should not pretend to be a therapist; it should help users be held earlier and help professionals see context faster.'
          )
        ),
        React.createElement('div', { className: 'emobot-arch-diagram' },
          ...architecture.map(layer => React.createElement('div', { className: 'emobot-arch-layer', key: layer.name },
            React.createElement(Icon, { name: layer.iconKey }),
            React.createElement('div', null,
              React.createElement('div', { className: 'emobot-arch-name' }, pick(layer, 'name')),
              React.createElement('div', { className: 'emobot-arch-desc' }, pick(layer, 'desc'))
            )
          ))
        )
      )
    ),
    React.createElement('div', { className: 'proj-section reveal emobot-case-section' },
      React.createElement('div', { className: 'emobot-section-head' },
        React.createElement('div', null,
          React.createElement('div', { className: 'emobot-section-kicker' }, PA ? '06 / 功能亮點' : '06 / Feature system'),
          React.createElement('h3', { className: 'emobot-section-title' }, PA ? '讓功能回到使用者、諮商端與導入場域。' : 'Features mapped to the user, counselor, and adoption context.')
        ),
        React.createElement('p', { className: 'emobot-section-copy' },
          PA
            ? '這些功能不是規格清單，而是對應到提案中的真實情境：學生如何願意說、系統如何辨識、諮商端如何使用，以及未來如何擴散到其他支持場域。'
            : 'These are not generic specs. They map to proposal scenarios: how students begin, how the system interprets, how counselors use the output, and how the model expands to other support settings.'
        )
      ),
      React.createElement('div', { className: 'emobot-feature-grid' },
        ...features.map(item => React.createElement('article', { className: 'emobot-feature-card', key: item.title },
          React.createElement('div', { className: 'emobot-card-icon' }, React.createElement(Icon, { name: item.iconKey })),
          React.createElement('h4', { className: 'emobot-card-title' }, pick(item, 'title')),
          React.createElement('p', { className: 'emobot-card-body' }, pick(item, 'body'))
        ))
      )
    ),
    React.createElement('div', { className: 'proj-section reveal emobot-case-section' },
      React.createElement('div', { className: 'emobot-section-head' },
        React.createElement('div', null,
          React.createElement('div', { className: 'emobot-section-kicker' }, PA ? '07 / 使用者研究與實驗分析' : '07 / User research and experiment analysis'),
          React.createElement('h3', { className: 'emobot-section-title' }, PA ? '我把使用者研究做成可回饋產品決策的證據系統。' : 'I turned user research into an evidence system for product decisions.')
        ),
        React.createElement('p', { className: 'emobot-section-copy' },
          PA
            ? '此區塊整合完整使用者研究工作：質性訪談、使用者設計問卷、原型互動測試、對話語意分析與量化分析。重點不是只證明有人使用，而是讓研究結果直接改變 onboarding、人設媒合、支持語氣與安全銜接設計。'
            : 'This section combines complete user research work: qualitative interviews, design questionnaires, prototype response testing, dialogue semantic analysis, and quantitative analysis. The goal is not only to prove usage, but to let evidence reshape onboarding, persona matching, support tone, and safe handoff.'
        )
      ),
      React.createElement('div', { className: 'emobot-research-lab' },
        React.createElement('div', { className: 'emobot-research-brief' },
          React.createElement('div', null,
            React.createElement('div', { className: 'emobot-research-kicker' }, PA ? '研究作業系統' : 'Research operating system'),
            React.createElement('h4', { className: 'emobot-research-title' }, PA ? '從訪談語句到量化結果，再回到產品介面。' : 'From interview language to quantitative readout, then back into the interface.'),
            React.createElement('p', { className: 'emobot-research-lead' },
              PA
                ? '我將心理支持產品的研究流程拆成可追蹤的四個階段：先理解使用者如何描述壓力與求助阻力，再用問卷量化互動偏好與支持需求，最後把語意與量化結果轉成下一版產品決策。'
                : 'I structured the research flow into four traceable stages: understand how users describe distress and help-seeking friction, quantify support needs and interaction preferences, then translate semantic and survey evidence into the next product iteration.'
            )
          ),
          React.createElement('div', { className: 'emobot-research-metrics' },
            ...researchMetrics.map(metric => React.createElement('div', { className: 'emobot-research-metric', key: metric.label },
              React.createElement('div', { className: 'emobot-research-metric-num' }, metric.value),
              React.createElement('div', { className: 'emobot-research-metric-label' }, PA ? metric.zhLabel : metric.label)
            ))
          )
        ),
        React.createElement('div', { className: 'emobot-research-methods' },
          ...researchMethods.map(step => React.createElement('article', { className: 'emobot-research-method-step', key: step.label },
            React.createElement('span', null, PA ? step.zhLabel : step.label),
            React.createElement('h4', null, PA ? step.zhTitle : step.title),
            React.createElement('p', null, PA ? step.zhBody : step.body)
          ))
        ),
        React.createElement('div', { className: 'emobot-research-artifacts' },
          ...researchArtifacts.map(item => React.createElement('figure', { className: `emobot-research-artifact${item.wide ? ' wide' : ''}`, key: item.src },
            React.createElement('div', { className: 'emobot-research-artifact-image' },
              React.createElement('img', { src: item.src, alt: PA ? item.zhTitle : item.title, loading: 'lazy', decoding: 'async' })
            ),
            React.createElement('figcaption', { className: 'emobot-research-artifact-caption' },
              React.createElement('div', null,
                React.createElement('div', { className: 'emobot-research-artifact-meta' }, PA ? item.zhMeta : item.meta),
                React.createElement('h4', null, PA ? item.zhTitle : item.title),
                React.createElement('p', null, PA ? item.zhDesc : item.desc)
              ),
              React.createElement('span', { className: 'emobot-research-artifact-badge' }, item.badge)
            )
          ))
        ),
        React.createElement('div', { className: 'emobot-research-insights' },
          ...researchInsights.map(item => React.createElement('article', { className: 'emobot-research-insight', key: item.label },
            React.createElement('span', null, PA ? item.zhLabel : item.label),
            React.createElement('strong', null, PA ? item.zhTitle : item.title),
            React.createElement('p', null, PA ? item.zhBody : item.body)
          ))
        )
      )
    ),
    React.createElement('div', { className: 'proj-section reveal emobot-case-section' },
      React.createElement('div', { className: 'emobot-section-head' },
        React.createElement('div', null,
          React.createElement('div', { className: 'emobot-section-kicker' }, PA ? '08 / 佐證素材預留區' : '08 / Evidence slots'),
          React.createElement('h3', { className: 'emobot-section-title' }, PA ? '讓作品集之後能直接接上真實畫面與文件。' : 'A page ready for real artifacts, screenshots, and documents.')
        ),
        React.createElement('p', { className: 'emobot-section-copy' },
          PA
            ? '此區塊先保留完整素材位置，後續可以替換為得獎截圖、提案書頁面、MVP 操作畫面、使用者流程或報告輸出。'
            : 'These slots are prepared for award screenshots, proposal pages, MVP screens, user flows, and report artifacts once final assets are ready.'
        )
      ),
      React.createElement('div', { className: 'emobot-evidence-grid' },
        ...evidence.map(item => React.createElement('article', { className: 'emobot-evidence-card', key: item.title },
          React.createElement('div', { className: 'emobot-evidence-placeholder' }, React.createElement(Icon, { name: item.iconKey })),
          React.createElement('h4', { className: 'emobot-card-title' }, pick(item, 'title')),
          React.createElement('p', { className: 'emobot-card-body' }, pick(item, 'body'))
        ))
      )
    )
  );
}

/* ═══════════════════════════════
   PER-PROJECT UNIQUE SECTIONS
═══════════════════════════════ */
function ProjectExtraSection({ slug, lang }) {
  const PA = lang === 'zh';

  if (slug === 'emobot-plus') return React.createElement(EmobotCaseStudy, { lang });

  if (slug === 'deeptech-database') return React.createElement('div', { className: 'proj-section reveal' },
    React.createElement('div', { className: 'proj-section-title' }, PA ? '資料管線架構' : 'Pipeline Architecture'),
    React.createElement('div', { className: 'pipeline-viz' },
      ...['104.com.tw', '→', 'TSIA / SEMI.org', '→', 'MOPS API', '→', 'ETL Clean', '→', 'SQL Store', '→', 'Excel / Notion'].map((n, i) =>
        n === '→'
          ? React.createElement('span', { className: 'pipeline-arrow', key: i }, n)
          : React.createElement('div', { className: 'pipeline-node', key: i }, n)
      )
    ),
    React.createElement('div', { className: 'stats-bar' },
      ...[
        { num: '230+', label: PA ? '公司追蹤' : 'Companies' },
        { num: '40+',  label: PA ? '資料維度' : 'Data Dims' },
        { num: 'v9.2', label: PA ? '目前版本' : 'Version' },
        { num: '9',    label: PA ? '整合來源' : 'Sources' },
      ].map(s => React.createElement('div', { className: 'stats-bar-item', key: s.label },
        React.createElement('div', { className: 'stats-bar-num' }, s.num),
        React.createElement('div', { className: 'stats-bar-label' }, s.label)
      ))
    )
  );

  if (slug === 'ai-news-intelligence') return React.createElement('div', { className: 'proj-section reveal' },
    React.createElement('div', { className: 'proj-section-title' }, PA ? '資料來源矩陣' : 'Source Matrix'),
    React.createElement('div', { className: 'source-grid' },
      ...['TechCrunch', 'MIT Tech Review', 'TechNews 科技新報', 'INSIDE 硬塞', 'TechNewsWorld', '+ Domain Feeds'].map(s =>
        React.createElement('div', { className: 'source-card', key: s },
          React.createElement('span', { className: 'source-dot' }),
          s
        )
      )
    )
  );

  if (slug === 'semiconductor-map') return React.createElement('div', { className: 'proj-section reveal' },
    React.createElement('div', { className: 'proj-section-title' }, PA ? '深科技價值鏈覆蓋' : 'Deep Tech Value Chain Coverage'),
    React.createElement('div', { className: 'chain-flow' },
      ...[
        { num: '01', name: 'Semiconductor / IC Design', tag: '45+ companies' },
        { num: '02', name: 'AI / Machine Learning',     tag: '62+ companies' },
        { num: '03', name: 'Biotech / MedTech',         tag: '38+ companies' },
        { num: '04', name: 'Cleantech / Energy',        tag: '29+ companies' },
        { num: '05', name: 'Advanced Manufacturing',    tag: '41+ companies' },
        { num: '06', name: 'Deep-Tech Enablers',        tag: '18+ companies' },
      ].map(c => React.createElement('div', { className: 'chain-row', key: c.num },
        React.createElement('span', { className: 'chain-num' }, c.num),
        React.createElement('span', { className: 'chain-name' }, c.name),
        React.createElement('span', { className: 'chain-tag' }, c.tag)
      ))
    )
  );

  if (slug === 'startup-intelligence-platform') return React.createElement('div', { className: 'proj-section reveal' },
    React.createElement('div', { className: 'proj-section-title' }, PA ? '平台關鍵指標' : 'Platform Key Metrics'),
    React.createElement('div', { className: 'metric-row' },
      ...[
        { val: '~80%', desc: PA ? '手動工作量減少' : 'Manual Work Reduced' },
        { val: '100%', desc: PA ? '自動化資料更新' : 'Automated Data Refresh' },
        { val: '1',    desc: PA ? '獨立開發' : 'Solo Built' },
        { val: 'SQL',  desc: PA ? '後端資料庫' : 'Backend DB' },
        { val: 'JS',   desc: PA ? '前端儀表板' : 'Frontend Dashboard' },
        { val: '⭐',   desc: PA ? '育星計畫種子' : 'Star Program 2025' },
      ].map(m => React.createElement('div', { className: 'metric-card', key: m.desc },
        React.createElement('div', { className: 'metric-val' }, m.val),
        React.createElement('div', { className: 'metric-desc' }, m.desc)
      ))
    )
  );

  return null;
}

/* ═══════════════════════════════
   APP
═══════════════════════════════ */
function App() {
    const { path, slug, navigate } = useRoute();
    return (React.createElement(LangProvider, null,
        React.createElement(NeuralCanvas, null),
        React.createElement(Cursor, null),
        React.createElement(ProgressBar, null),
        React.createElement(Nav, { navigate: navigate }),
        slug
            ? React.createElement(ProjectPage, { key: slug, slug: slug, navigate: navigate })
            : React.createElement(HomePage, { key: "home", navigate: navigate }),
        React.createElement(Footer, { navigate: navigate })));
}
createRoot(document.getElementById('root')).render(React.createElement(App, null));

