const { useState,useEffect,useRef,useCallback,createContext,useContext } = React;

/* ═══════════════════════════════
   TRANSLATIONS
═══════════════════════════════ */
const T = {
  en: {
    navStory:'Story', navWork:'Work', navSkills:'Skills', navAwards:'Awards', navContact:'Contact',
    heroStatusActive:'ITRI / ISTI', heroStatusOpen:'OPEN TO NEW ROLES',
    heroEyebrow:'Deep Tech Translator · Taipei, Taiwan',
    heroTitle1:'I turn frontier‑tech signals into',
    heroTitleEm:'validated products',
    heroTitle2:'& investable strategies.',
    heroSub:'Bridging behavioral science, generative AI, and ecosystem strategy\nto build products with both technical depth and human clarity.\nFrom fMRI signal to MVP shipment — full-stack in every sense.',
    heroCta1:'Explore Work →', heroCta2:'Read the Story',
    statYears:'YEARS IN AI PRODUCTS', statProjects:'PROJECTS',
    statAwards:'AWARDS IN 2025', statPub:'PRESENTATIONS',
    tagActive:'// ACTIVE: ITRI / ISTI', tagAward:'// OHBM 2025 · Brisbane',
    storyLabel:'Chapter Log',
    storyTitle1:'A portfolio you scroll', storyTitleEm:'like a narrative', storyTitle2:'.',
    ch0Meta:'CHAPTER 00 · 2019–2025', ch0Head:'The Foundation: NCCU × TMBIC',
    ch0Body:'M.S. Psychology (Cognitive Neuroscience) at National Chengchi University (NCCU). Concurrent RA at Taiwan Mind & Brain Imaging Center (TMBIC, 2022–2025), leading fMRI experiments, EEG signal processing, and statistical modeling. Presented neuroimaging research at OHBM 2025 (Brisbane). Received Best Thesis Award at TSCN 2025. Accepted to the I-9-9 Youth Tech Innovation International Program (Berlin).',
    ch1Meta:'CHAPTER 01 · 2021–2023', ch1Head:'Applied Research: Three Institutions',
    ch1Body:'Research roles across healthcare and social sectors — quantitative data analysis at the Ministry of Health & Welfare Mental Health Center, UX optimization & data governance at Children & Family Welfare Association, and autism case services & AAC communication tool design at Mennonite Hospital. Each sharpened a different lens: scientific rigor, human-centered design, applied measurement.',
    ch2Meta:'CHAPTER 02 · 2022–2024', ch2Head:'Building Emobot+',
    ch2Body:'My first AI product: a supportive mental-health prototype with personalization, safety guardrails, and evidence-based interaction patterns. Built as an MVP, tested through demos, and evolved through real feedback cycles. Silver Medal at the 2025 AI Interdisciplinary Sustainability Innovation Contest.',
    ch3Meta:'CHAPTER 03 · 2024–PRESENT', ch3Head:'Ecosystem Intelligence at ITRI/ISTI',
    ch3Body:'Independently built the Startup Intelligence Platform (新創商情平台) — a full-stack data visualization system for real-time ecosystem monitoring. Alongside: Taiwan Startup Ecosystem Map covering 230+ companies, global deep tech trend reports, and the Star Program venture incubation support. Selected as 2025 ITRI Star Program seed cultivator.',
    ch4Meta:'CHAPTER 04 · NOW', ch4Head:'The next chapter',
    ch4Body:'Looking for roles where I can bridge rigorous research and real product execution — teams building AI-native systems that genuinely serve people. Open to product, research, and ecosystem strategy roles globally.',
    workLabel:'Selected Projects', workTitle1:'Work that', workTitleEm:'ships', workTitle2:', evidence that holds.',
    skillsLabel:'Capabilities', skillsTitle1:'The full', skillsTitleEm:'stack', skillsTitle2:'.',
    skillDomain:'Domain', skillTech:'Technical', skillLang:'Languages & Soft Skills',
    awardsLabel:'Awards & Recognition',
    awardsTitle1:'Four accolades,', awardsTitleEm:'one year.',
    award1Title:'Silver Medal', award1Inst:'2025 AI Interdisciplinary Sustainability Innovation Contest',
    award1Desc:'Emobot+ Multimodal Emotional Companion System — integrating emotion recognition with generative AI dialogue.',
    award2Title:'Best Thesis Award', award2Inst:'2025 TSCN Annual Conference (Taiwan Cognitive Neuroscience Society)',
    award2Desc:'Graduate thesis: psychometric validation research on emotional intelligence measurement in Taiwanese context.',
    award3Title:'Research Grant Selected', award3Inst:'2025 AI Interdisciplinary Research Proposal Program',
    award3Desc:'Cross-domain AI research proposal selected for national funding among competitive applicants.',
    award4Title:'International Presentation', award4Inst:'2025 OHBM Annual Meeting — Brisbane, Australia',
    award4Desc:'Neuroimaging research presented at the Organization for Human Brain Mapping — top global venue.',
    contactLabel:'Get in Touch',
    contactTitle1:"Let's build something", contactTitleEm:'worth remembering', contactTitle2:'.',
    contactNote:"I'm open to product roles, research collaborations, and ecosystem strategy work. If you're building something ambitious at the frontier of deep tech — let's talk.",
    contactEmail:'EMAIL', contactPhone:'PHONE', contactLang:'LANGUAGES',
    footerCopy:'© 2026 Guan-Ting Ye', footerTag:'Neural Signal OS · v3',
    projBack:'← All Projects',
    projRole:'ROLE', projTimeline:'TIMELINE', projStatus:'STATUS', projImpact:'IMPACT',
    projOverview:'Overview', projOutcomes:'Key Outcomes', projTech:'Technical Approach', projAwards:'Awards & Recognition',
    nextProj:'Next Project →', prevProj:'← Previous',
    comingSoon:'Coming Soon', csDesc:'This project page is under construction. Check back soon.',
  },
  zh: {
    navStory:'故事', navWork:'作品', navSkills:'技能', navAwards:'獎項', navContact:'聯繫',
    heroStatusActive:'工研院 / 產科國際所', heroStatusOpen:'開放新機會',
    heroEyebrow:'深科技翻譯者 · 台灣台北',
    heroTitle1:'我將前沿技術信號，轉化為',
    heroTitleEm:'經過驗證的產品',
    heroTitle2:'與可投資的策略。',
    heroSub:'橋接行為科學、生成式 AI 與生態系策略，\n打造兼具技術深度與人本清晰度的產品。\n從 fMRI 信號到 MVP 交付——每個維度都是全端。',
    heroCta1:'探索作品 →', heroCta2:'閱讀故事',
    statYears:'AI 產品年資', statProjects:'核心專案',
    statAwards:'2025 年獎項', statPub:'學術發表',
    tagActive:'// 現職：工研院 / 產科國際所', tagAward:'// OHBM 2025 · 布里斯本',
    storyLabel:'章節記錄',
    storyTitle1:'這是一份', storyTitleEm:'有敘事弧度', storyTitle2:'的作品集。',
    ch0Meta:'第零章 · 2019–2025', ch0Head:'基礎養成：政大 × 腦造影中心',
    ch0Body:'國立政治大學心理學系暨研究所（認知神經科學組）碩士。同期擔任台灣心智科學腦造影中心（TMBIC，2022–2025）研究助理，主導 fMRI 實驗、EEG 訊號處理與統計建模。於 2025 年國際人腦圖譜學會（OHBM）年會在布里斯本發表研究。榮獲 TSCN 2025 碩士論文優等獎。獲選 I-9-9 青年百億計畫（赴柏林學習參訪）。',
    ch1Meta:'第一章 · 2021–2023', ch1Head:'應用研究：跨機構實戰',
    ch1Body:'跨醫療與社福領域的研究工作——於衛福部心理衛生中心進行量化數據分析，於兒童暨家庭關懷協會進行 UX 優化與資料治理，並於門諾醫院黎明機構提供自閉症個案服務與 AAC 溝通輔具設計。每段經歷都磨利了不同視角：科學嚴謹性、以人為中心的設計、應用測量。',
    ch2Meta:'第二章 · 2022–2024', ch2Head:'打造 Emobot+',
    ch2Body:'我的第一個 AI 產品：具備個性化、安全防護與循證互動設計的心理健康輔助原型。從概念到 MVP，在真實用戶回饋中持續進化。榮獲 2025 AI 跨域永續創新競賽銀獎。',
    ch3Meta:'第三章 · 2024–至今', ch3Head:'工研院生態系情報工作',
    ch3Body:'獨立開發「新創商情平台」——支援即時生態系監控的全端數據視覺化系統。同時進行：涵蓋 230+ 家公司的台灣新創生態系地圖、全球深科技趨勢報告，以及育星計畫新創孵化支援。獲選 2025 年工研院育星計畫種子培育。',
    ch4Meta:'第四章 · 現在', ch4Head:'下一篇章',
    ch4Body:'尋找能橋接嚴謹研究與真實產品執行的機會——與真正服務人的 AI 原生系統團隊合作。開放全球產品、研究與生態系策略相關職位。',
    workLabel:'精選專案', workTitle1:'能夠', workTitleEm:'落地交付', workTitle2:'，經得起驗證的作品。',
    skillsLabel:'能力地圖', skillsTitle1:'完整的', skillsTitleEm:'技能堆疊', skillsTitle2:'。',
    skillDomain:'領域', skillTech:'技術', skillLang:'語言與軟實力',
    awardsLabel:'獎項與認可',
    awardsTitle1:'四項殊榮，', awardsTitleEm:'同一年。',
    award1Title:'銀獎', award1Inst:'2025 AI 跨域永續創新競賽',
    award1Desc:'Emobot+ 多模態情緒陪伴系統——整合情緒辨識模型與生成式 AI 對話功能。',
    award2Title:'碩士論文優等獎', award2Inst:'2025 台灣認知神經科學學會（TSCN）年會',
    award2Desc:'碩士論文：在台灣情境下針對情緒智力測量的心理計量學驗證研究。',
    award3Title:'研究構想計畫獲選補助', award3Inst:'2025 AI 跨域研究構想計畫',
    award3Desc:'跨領域 AI 研究提案從競爭申請者中脫穎而出，獲選國家補助。',
    award4Title:'國際論文發表', award4Inst:'2025 國際人腦圖譜學會年會 · 澳洲布里斯本',
    award4Desc:'於全球頂尖神經科學盛會——人腦圖譜組織年會——發表神經影像研究。',
    contactLabel:'取得聯繫',
    contactTitle1:'讓我們打造', contactTitleEm:'值得被記住', contactTitle2:'的事物。',
    contactNote:'歡迎洽談產品職位、研究合作或生態系策略工作。若你正在深科技前沿打造有野心的東西——我們來談談。',
    contactEmail:'電子郵件', contactPhone:'電話', contactLang:'語言',
    footerCopy:'© 2026 葉冠廷', footerTag:'神經信號 OS · v3',
    projBack:'← 所有專案',
    projRole:'角色', projTimeline:'時程', projStatus:'狀態', projImpact:'成果',
    projOverview:'專案概述', projOutcomes:'關鍵成果', projTech:'技術方法', projAwards:'獎項與認可',
    nextProj:'下一個專案 →', prevProj:'← 上一個',
    comingSoon:'即將推出', csDesc:'此專案頁面建置中，敬請期待。',
  }
};

/* ═══════════════════════════════
   AWARDS DATA
═══════════════════════════════ */
const AWARDS_DATA = [
  { icon:'🥈', year:'2025', titleKey:'award1Title', instKey:'award1Inst', descKey:'award1Desc' },
  { icon:'🏅', year:'2025', titleKey:'award2Title', instKey:'award2Inst', descKey:'award2Desc' },
  { icon:'🎯', year:'2025', titleKey:'award3Title', instKey:'award3Inst', descKey:'award3Desc' },
  { icon:'🌏', year:'2025', titleKey:'award4Title', instKey:'award4Inst', descKey:'award4Desc' },
];

/* ═══════════════════════════════
   PROJECTS DATA
═══════════════════════════════ */
const PROJECTS = [
  {
    slug:'emobot-plus', num:'01',
    category:'AI Product · Mental Health', zhCategory:'AI 產品 · 心理健康',
    title:'Emobot+', subtitle:'Supportive AI Companion System',
    zhTitle:'Emobot+', zhSubtitle:'多模態情緒陪伴系統',
    hook:"An AI companion that listens like a person, responds with evidence, and knows when to step aside.",
    zhHook:'一個像人一樣傾聽、以實證回應、並知道何時退讓的 AI 陪伴者。',
    stack:['React','FastAPI','OpenAI API','Python','Wave2Lip','GDPR Design'],
    role:'Founder & Product Lead', zhRole:'創辦人 / 產品負責人',
    timeline:'2022 – 2024', status:'Award-winning MVP', zhStatus:'獲獎 MVP',
    impact:'Silver Medal · 2025 AI Sustainability Contest', zhImpact:'2025 AI 跨域永續創新競賽 · 銀獎',
    overview:"Emobot+ is a digital mental-health support system I co-designed and led from concept to MVP. The core challenge: how do you build an AI that feels genuinely supportive without overpromising clinical capacity?\n\nThe system uses a trait-based onboarding flow to match users with one of four AI personas (Lumi, Solin, Niko, Clara), each calibrated for different emotional support styles. Interactions support text, audio input, and optional video avatars — making the experience accessible across contexts and communication preferences.\n\nEvery design decision was anchored in evidence: interaction patterns draw from CBT and motivational interviewing frameworks, while safety guardrails use escalation logic to route at-risk signals to professional resources.",
    zhOverview:"Emobot+ 是我從概念到 MVP 全程主導設計的數位心理健康支持系統。核心挑戰：如何打造一個真正具有支持感的 AI，同時不過度承諾臨床效能？\n\n系統採用基於人格特質的引導流程，將用戶與四種 AI 人設（Lumi、Solin、Niko、Clara）之一配對，每種人設針對不同情緒支持風格進行校準。互動支援文字、語音輸入及選配視訊虛擬形象。\n\n每項設計決策均以實證為基礎：互動模式取材自 CBT 與動機式晤談架構，安全防護機制採用升級邏輯，將高風險信號導引至專業資源。",
    outcomes:['Designed 4-persona onboarding using psychological trait matching (WLEIS-based)','Built multi-mode interaction: text / audio / avatar (Wave2Lip) + PDF report pipeline','Implemented safety & risk detection with clinical escalation pathways','Won Silver Medal — 2025 AI Interdisciplinary Sustainability Innovation Contest','Presented system architecture at TSCN 2025 Annual Conference'],
    zhOutcomes:['設計基於心理特質配對的四人設引導流程','打造多模式互動：文字/語音/虛擬形象 + PDF 對話報告管線','實作具備臨床升級路徑的安全與風險偵測機制','榮獲 2025 AI 跨域永續創新競賽銀獎','於 2025 TSCN 年會發表系統架構'],
    tech:[{label:'Frontend',val:'React 18, TailwindCSS, custom avatar renderer'},{label:'Backend',val:'FastAPI, Python, async task queues'},{label:'AI Layer',val:'OpenAI GPT-4o, prompt-chained persona system'},{label:'Video',val:'Wave2Lip lip-sync pipeline (open-source)'},{label:'Safety',val:'Multi-layer risk classifier, escalation routing'},{label:'Data',val:'GDPR-ready session logging, anonymized analytics'}],
    awards:[{icon:'🥈',title:'Silver Medal',desc:'2025 AI Interdisciplinary Sustainability Innovation Contest (AI 跨域永續創新競賽)'}],
  },
  {
    slug:'deeptech-database', num:'02',
    category:'Data Engineering', zhCategory:'資料工程',
    title:'Global DeepTech Database', subtitle:'Ecosystem Intelligence System',
    zhTitle:'全球深科技資料庫', zhSubtitle:'生態系情報系統',
    hook:"A living dataset that maps Taiwan's deep tech landscape — company by company, signal by signal.",
    zhHook:'一個持續更新的資料集，逐家公司、逐個信號地描繪台灣深科技生態地圖。',
    stack:['Python','Pandas','Playwright','ETL','SQL','yfinance','curl_cffi'],
    role:'Lead Engineer & Analyst', zhRole:'主任工程師 / 分析師',
    timeline:'2024 – Present', status:'Active · v9+', zhStatus:'持續更新 · v9+',
    impact:'230+ companies tracked', zhImpact:'追蹤 230+ 家公司',
    overview:"This is the data backbone of ITRI/ISTI's startup ecosystem intelligence. Starting from a seed list of ~230 Taiwan deep tech companies, I built a multi-source enrichment pipeline that pulls financial, governance, talent, news, and competitive data automatically.\n\nThe system targets notoriously hard-to-scrape sources: 104 人力銀行, TSIA, SEMI.org, ASIP, MOPS (公開資訊觀測站), and Cloudflare-protected sites. Each required custom handling — Playwright-based browser automation for JS-heavy pages, cache fallback strategies, and append-only protocols to maintain data integrity across versions.\n\nCurrently at v9.2, with ongoing work on Cloudflare bypass and selector stability.",
    zhOverview:"這是工研院產科國際所新創生態系情報工作的數據骨幹。從約 230 家台灣深科技公司的種子名單出發，我建立了多源資料豐富化管線，能自動抓取財務、治理、人才、新聞與競爭情報。\n\n系統針對難以爬取的來源：104 人力銀行、TSIA、SEMI.org、ASIP、MOPS，以及受 Cloudflare 保護的網頁。每個來源都需要客製化處理——Playwright 瀏覽器自動化、快取回退策略，以及維護跨版本資料完整性的附加協議。\n\n目前版本為 v9.2，持續進行 Cloudflare 繞過策略優化。",
    outcomes:['Built multi-source crawler: 104.com.tw, TSIA, SEMI.org, ASIP, MOPS','Designed append-only data protocol maintaining integrity across 9+ versions','Automated ETL pipeline with Playwright for Cloudflare-protected sources','Enriched 230+ company profiles with financial, talent, and competitive signals','Powers national-level ecosystem analysis and investment reports at ITRI'],
    zhOutcomes:['建立多源爬蟲，目標包含 104.com.tw、TSIA、SEMI.org、ASIP、MOPS','設計附加協議，維護 9+ 版本間的資料完整性','以 Playwright 自動化 ETL 管線處理受 Cloudflare 保護的來源','豐富 230+ 家公司資料，涵蓋財務、人才與競爭信號','支撐工研院國家級生態系分析與投資報告'],
    tech:[{label:'Crawler',val:'Python Playwright, BeautifulSoup, curl_cffi'},{label:'Data Store',val:'Pandas DataFrames, CSV append-only protocol'},{label:'Finance',val:'yfinance, MOPS API, custom regex parsers'},{label:'Search',val:'DuckDuckGo / Bing API enrichment layer'},{label:'Anti-block',val:'Cache fallback, Cloudflare bypass, proxy rotation'},{label:'Output',val:'Structured Excel reports, Notion integration'}],
    awards:[],
  },
  {
    slug:'wleis-validation', num:'03',
    category:'Psychometrics Research', zhCategory:'心理計量學研究',
    title:'WLEIS Psychometric Validation', subtitle:'Emotional Intelligence Scale · Taiwan Adaptation',
    zhTitle:'WLEIS 心理計量學驗證', zhSubtitle:'情緒智力量表 · 台灣適用性研究',
    hook:'Rigorously validating whether a leading emotional intelligence scale truly measures what it claims — in a Taiwanese context.',
    zhHook:'嚴謹地驗證一套主流情緒智力量表，在台灣情境中是否真正測量到它所聲稱的構念。',
    stack:['R','JASP','SPSS','SEM','CFA','Python','ggplot2'],
    role:'Researcher & Analyst', zhRole:'研究員 / 分析師',
    timeline:'2023 – 2025', status:'Published · TSCN 2025', zhStatus:'已發表 · TSCN 2025',
    impact:'Best Thesis Award · TSCN 2025', zhImpact:'TSCN 2025 碩士論文優等獎',
    overview:"The Wong & Law Emotional Intelligence Scale (WLEIS) is widely used in organizational and clinical contexts, but its psychometric properties in Traditional Chinese / East Asian samples remain contested. This study conducted a full validation battery across a Taiwanese university sample.\n\nUsing Confirmatory Factor Analysis (CFA) and Structural Equation Modeling (SEM), I tested the 4-factor model proposed by Wong & Law (2002), examined measurement invariance across gender groups, and evaluated convergent and discriminant validity against established criterion measures.\n\nFindings were presented at the 2025 TSCN Annual Conference, where the work received the Best Thesis Award.",
    zhOverview:"Wong & Law 情緒智力量表（WLEIS）廣泛應用於組織與臨床情境，但其在繁體中文 / 東亞樣本中的心理計量特性仍有爭議。本研究針對台灣大學樣本進行完整驗證。\n\n運用驗證性因素分析（CFA）與結構方程模型（SEM），測試 Wong & Law（2002）提出的四因子模型，檢驗跨性別測量不變性，並針對既有效標測量評估聚合效度與區辨效度。\n\n研究結果於 2025 年 TSCN 年會發表，並榮獲碩士論文優等獎。",
    outcomes:['Confirmed 4-factor structure with acceptable fit indices (CFI > .95, RMSEA < .06)','Demonstrated metric invariance across gender groups with chi-square difference tests','Established convergent validity via Big Five Agreeableness and Emotional Stability','Awarded Best Thesis at 2025 TSCN Annual Conference','Methodology documented for future cross-cultural adaptation studies'],
    zhOutcomes:['確認四因子結構，達可接受的模型適配指標（CFI > .95，RMSEA < .06）','以卡方差異檢定驗證跨性別組別的測量不變性','透過大五人格親和性和情緒穩定性確立聚合效度','榮獲 2025 TSCN 年會碩士論文優等獎','記錄方法論以供未來跨文化適用性研究參考'],
    tech:[{label:'Statistics',val:'R (lavaan, psych, semTools), JASP, SPSS 27'},{label:'Models',val:'CFA, SEM, Measurement Invariance Testing'},{label:'Sample',val:'N = 342, Taiwanese university students'},{label:'Criteria',val:'Big Five (BFI), PANAS, Academic Performance'},{label:'Visualization',val:'ggplot2, semPlot, Python Matplotlib'},{label:'Reporting',val:'APA 7th style, R Markdown, academic paper draft'}],
    awards:[{icon:'🏅',title:'Best Thesis Award',desc:'2025 台灣認知神經科學學會 (TSCN) 年會 · 碩士論文優等獎'}],
  },
  {
    slug:'ai-news-intelligence', num:'04',
    category:'AI System · Data Pipeline', zhCategory:'AI 系統 · 資料管線',
    title:'AI News Intelligence System', subtitle:'Automated Tech Trend Analysis & Reporting',
    zhTitle:'AI 新聞情報系統', zhSubtitle:'自動化科技趨勢分析與報告',
    hook:'Turning the firehose of global tech news into structured strategic intelligence — automatically, bilingually, daily.',
    zhHook:'將全球科技新聞的海量資訊，自動轉化為雙語結構化策略情報，每日更新。',
    stack:['Python','Gemini 1.5','GPT-4o','Playwright','Trafilatura','Notion API'],
    role:'System Architect & Lead Developer', zhRole:'系統架構師 / 主任開發者',
    timeline:'2024 – Present', status:'Production · Daily runs', zhStatus:'上線運作 · 每日執行',
    impact:'Cost reduced 75% (GPT→Gemini)', zhImpact:'成本降低 75%（GPT→Gemini）',
    overview:"The challenge: ITRI's deep tech team needs to stay current on global AI, semiconductor, and frontier science news — but manually curating that volume is infeasible at scale.\n\nThis system crawls 6+ sources (TechCrunch, MIT Tech Review, TechNews 科技新報, INSIDE 硬塞, TechNewsWorld, and domain feeds), extracts full text via Trafilatura and Playwright, and feeds a multi-stage Gemini/GPT pipeline that scores relevance, extracts entities, generates strategic summaries, and publishes to Notion.\n\nKey decisions: iterative prompt refinement, native bilingual output (EN/ZH), and a GPT-4o → Gemini migration that cut per-run costs ~75% while maintaining quality.",
    zhOverview:"挑戰在於：工研院深科技團隊需要持續追蹤全球 AI、半導體與前沿科學動態——但手動策展如此大量的資訊在規模上並不可行。\n\n此系統爬取 6+ 個來源，透過 Trafilatura 和 Playwright 提取完整文章文本，並饋入多階段 Gemini/GPT 管線進行相關性評分、實體提取、策略摘要生成，最後將格式化報告發布至 Notion。\n\n關鍵工程決策：迭代式提示工程、原生雙語輸出（EN/ZH），以及從 GPT-4o 遷移至 Gemini，在維持輸出品質的同時將每次執行成本降低約 75%。",
    outcomes:['6-source crawler with Playwright + Trafilatura, handling JS-heavy and static sites','Multi-stage LLM pipeline: relevance scoring → entity extraction → strategic summary','Native bilingual output (EN + ZH-TW) with consistent formatting','Automated Notion publishing with structured database entries','Cost optimization: GPT-4o → Gemini, ~75% cost reduction per run'],
    zhOutcomes:['建立 6 源爬蟲，以 Playwright + Trafilatura 處理 JS 密集與靜態頁面','多階段 LLM 管線：相關性評分 → 實體提取 → 策略摘要','原生雙語輸出（EN + ZH-TW），格式一致','自動化 Notion 發布，建立結構化資料庫條目','成本優化：GPT-4o → Gemini，每次執行成本降低約 75%'],
    tech:[{label:'Crawler',val:'Playwright, Trafilatura, feedparser, httpx'},{label:'AI Layer',val:'Gemini 1.5 Pro, GPT-4o (legacy), prompt chaining'},{label:'Pipeline',val:'Python async, multi-stage processing, retry logic'},{label:'Output',val:'Notion API, structured database, Markdown reports'},{label:'Sources',val:'TechCrunch, MIT TR, TechNews, INSIDE, TNW + feeds'},{label:'Quality',val:'Entity deduplication, relevance scoring, date normalization'}],
    awards:[],
  },
  {
    slug:'loveguard', num:'05',
    category:'AI Product · Relationship Safety', zhCategory:'AI 產品 · 關係安全',
    title:'LoveGuard', subtitle:'AI-Powered Relationship Intelligence',
    zhTitle:'LoveGuard', zhSubtitle:'AI 驅動的關係安全情報',
    hook:'Helping people recognize manipulation patterns in relationships — before they become harm.',
    zhHook:'協助人們在傷害發生之前，辨識關係中的操控模式。',
    stack:['Python','HuggingFace','NLP','React','FastAPI','Classification'],
    role:'Product Designer & Developer', zhRole:'產品設計師 / 開發者',
    timeline:'2023 – 2024', status:'Prototype', zhStatus:'原型階段',
    impact:'Validated with 40+ user scenarios', zhImpact:'40+ 用戶場景驗證',
    overview:"LoveGuard addresses a gap in digital mental health: while most AI companions focus on emotional support after distress, few help users proactively recognize unhealthy relationship dynamics as they unfold.\n\nThe product uses a conversational interface where users describe relationship interactions. An NLP classification layer identifies patterns associated with gaslighting, love-bombing, isolation tactics, and other manipulation dynamics — drawing from psychological literature on coercive control.\n\nThe design challenge: how to surface these insights without being alarmist, stigmatizing, or clinically overreaching. The UX solution uses a 'pattern library' framing, educational micro-content, and agency-centered language.",
    zhOverview:"LoveGuard 填補了數位心理健康領域的空白：大多數 AI 陪伴工具聚焦於苦惱發生後的情緒支持，卻鮮少協助用戶在不健康關係動態展開時主動辨識。\n\n產品採用對話介面，用戶描述關係互動情況。NLP 分類層識別與煤氣燈效應、愛情轟炸、孤立戰術及其他操控動態相關的模式——取材自強制控制的心理學文獻。\n\n設計挑戰：如何呈現這些洞察，同時不製造恐慌、不標籤化。UX 解決方案採用「模式圖書館」框架、教育性微內容，以及全程以行動者為中心的語言。",
    outcomes:['Designed 12-pattern taxonomy of manipulation dynamics from psychological literature','Built NLP classifier fine-tuned on relationship scenario descriptions','Developed "pattern library" UX model — educational, not diagnostic','Validated interaction flows with 40+ user scenarios across 3 test cohorts','Documented ethical design framework for sensitive AI topics'],
    zhOutcomes:['根據心理學文獻設計 12 種操控動態分類體系','建立針對關係場景描述的 NLP 分類器','開發「模式圖書館」UX 模型——教育性而非診斷性','以 40+ 用戶場景跨 3 個測試群組驗證互動流程','記錄敏感 AI 主題的倫理設計框架'],
    tech:[{label:'NLP',val:'HuggingFace transformers, custom fine-tuning'},{label:'Classification',val:'12-class manipulation pattern taxonomy'},{label:'Backend',val:'FastAPI, Python, async processing'},{label:'Frontend',val:'React, conversational UI components'},{label:'Evaluation',val:'User scenario testing, inter-rater reliability'},{label:'Ethics',val:'Documented design framework for sensitive AI'}],
    awards:[],
  },
  {
    slug:'semiconductor-map', num:'06',
    category:'Ecosystem Strategy · Data', zhCategory:'生態系策略 · 資料',
    title:'Taiwan Startup Ecosystem Map', subtitle:'Semiconductor & Deep Tech Intelligence',
    zhTitle:'台灣新創生態系地圖', zhSubtitle:'半導體與深科技情報',
    hook:"Mapping 230+ companies across the deep tech value chain to reveal where Taiwan's innovation gaps truly lie.",
    zhHook:'跨深科技價值鏈描繪 230+ 家公司，揭示台灣創新缺口的真實所在。',
    stack:['Python','Pandas','Excel','Data Visualization','Market Analysis','Bilingual NLP'],
    role:'Lead Analyst & Data Engineer', zhRole:'首席分析師 / 資料工程師',
    timeline:'2024 – Present', status:'Active · ITRI/ISTI', zhStatus:'持續更新 · 工研院',
    impact:'Informs national policy decisions', zhImpact:'支援國家級政策決策',
    overview:"Taiwan's deep tech ecosystem is sophisticated but poorly documented at the company level. This project built the first comprehensive, enriched database of 230+ startups and scale-ups across semiconductor, AI, biotech, and cleantech — with standardized subcategory taxonomies, financial data, headcount trends, and competitive positioning.\n\nThe work combines data engineering with ecosystem strategy: subcategory gap analysis, investment flow mapping, and international benchmark comparisons. Output directly informs ITRI/ISTI's national policy recommendations and the Star Program venture incubation strategy.\n\nA key contribution: a bilingual subcategory taxonomy mapping Chinese company descriptions onto internationally-comparable industry classifications.",
    zhOverview:"台灣深科技生態系相當成熟，但在公司層面的文件記錄卻相對薄弱。本專案建立了首個全面的資料庫，涵蓋半導體、AI、生技與潔淨科技領域的 230+ 家公司——附有標準化子類別分類法、財務數據、人員規模趨勢與競爭定位。\n\n此工作結合了資料工程與生態系策略：子類別缺口分析、投資流向圖、國際基準比較。成果直接為工研院的國家政策建議及育星計畫新創孵化策略提供依據。\n\n重要貢獻：開發雙語子類別分類法，將中文公司描述映射至國際通用的產業分類。",
    outcomes:['Built 230+ company database with 40+ enriched data dimensions per company','Developed bilingual subcategory taxonomy (ZH↔EN industry classification)','Identified 7 critical gaps in Taiwan deep tech value chain via gap analysis','Automated monthly data refresh pipeline reducing manual work ~80%','Directly informed national Star Program incubation strategy at ITRI/ISTI'],
    zhOutcomes:['建立 230+ 家公司資料庫，每家公司具備 40+ 個豐富化資料維度','開發雙語子類別分類法（ZH↔EN 產業分類）','透過缺口分析識別台灣深科技價值鏈的 7 個關鍵缺口','自動化每月資料更新管線，減少約 80% 手動工作量','直接為工研院育星計畫孵化策略提供依據'],
    tech:[{label:'Pipeline',val:'Python ETL, Pandas, multi-source normalization'},{label:'Taxonomy',val:'Custom bilingual classification system (ZH↔EN)'},{label:'Sources',val:'104.com.tw, MOPS, TSIA, SEMI.org, ASIP, news'},{label:'Analysis',val:'Gap analysis, investment flow mapping, benchmarking'},{label:'Visualization',val:'Excel dashboards, Python Matplotlib / Plotly'},{label:'Output',val:'Policy reports, ITRI internal database, Notion'}],
    awards:[],
  },
  {
    slug:'startup-intelligence-platform', num:'07',
    category:'Full-Stack Platform · Data Engineering', zhCategory:'全端平台 · 資料工程',
    title:'Startup Intelligence Platform', subtitle:'Real-time Ecosystem Analytics at ITRI',
    zhTitle:'新創商情平台', zhSubtitle:'工研院即時生態系情報系統',
    hook:"A solo-built full-stack analytics platform that gave ITRI's team their first real-time window into Taiwan's startup ecosystem.",
    zhHook:'獨立打造的全端情報平台，讓工研院團隊第一次擁有即時俯瞰台灣新創生態的視角。',
    stack:['Python','JavaScript','SQL','ETL Pipeline','Dashboard','Web Scraping'],
    role:'Sole Developer', zhRole:'獨立開發者',
    timeline:'2024 – Present', status:'Active · ITRI/ISTI', zhStatus:'上線運作 · 工研院',
    impact:'Selected: 2025 ITRI Star Program', zhImpact:'獲選 2025 年工研院育星計畫種子培育',
    overview:"At ITRI, strategy decisions depend on having current, accurate data about Taiwan's startup landscape. Before this platform, the team relied on manual spreadsheet updates and ad hoc searches — slow, error-prone, and impossible to scale.\n\nI independently designed and built a full-stack web application — 新創商情平台 — that aggregates, processes, and visualizes startup ecosystem data in real time. The architecture spans a Python backend with automated web crawlers, an ETL pipeline writing to a managed SQL database, and a JavaScript frontend with an interactive visualization dashboard.\n\nThis project was recognized by ITRI management and led to my selection as a seed cultivator in the 2025 Star Program — an internal accelerated development track.",
    zhOverview:"在工研院，策略決策仰賴對台灣新創生態的即時、準確掌握。在此平台建立之前，團隊仰賴手動更新的試算表和臨時搜尋——速度慢、易出錯，且無法規模化。\n\n我獨立設計並開發了全端網頁應用「新創商情平台」，能即時彙整、處理並視覺化新創生態系數據。架構涵蓋具備自動化網路爬蟲的 Python 後端、寫入受管 SQL 資料庫的 ETL 管線，以及具備互動式視覺化儀表板的 JavaScript 前端。\n\n此專案獲工研院管理層認可，使我獲選 2025 年育星計畫種子培育——工研院內部加速發展培育計畫。",
    outcomes:['Independently designed and built full-stack architecture (Python backend + JS frontend)','Automated web crawler collects fresh startup baseline data on schedule','ETL pipeline processes, normalizes, and loads data into SQL database','Interactive visualization dashboard enables team data-driven decision-making','Selected as 2025 ITRI Star Program seed cultivator following platform recognition'],
    zhOutcomes:['獨立設計並建構全端架構（Python 後端 + JS 前端）','自動化網路爬蟲定期抓取最新新創基盤數據','ETL 管線處理、標準化數據並載入 SQL 資料庫','互動式視覺化儀表板支援團隊數據驅動決策','平台影響力受認可，獲選 2025 年工研院育星計畫種子培育'],
    tech:[{label:'Backend',val:'Python, SQL database management & maintenance'},{label:'Frontend',val:'JavaScript, interactive data visualization'},{label:'Crawler',val:'Automated web scraper for startup ecosystem data'},{label:'Pipeline',val:'ETL (Extract, Transform, Load) workflow'},{label:'Database',val:'SQL with automated refresh cycle'},{label:'Context',val:'Internal platform at ITRI/ISTI Innovation Division'}],
    awards:[{icon:'🌱',title:'2025 ITRI Star Program',desc:'Selected as seed cultivator — outstanding platform contribution and data engineering excellence at ITRI/ISTI.'}],
  },
  { slug:'coming-soon-2', num:'08', comingSoon:true, title:'Coming Soon', zhTitle:'即將推出', category:'Next Project', zhCategory:'下一個專案', stack:[] },
];

/* ═══════════════════════════════
   LANG CONTEXT
═══════════════════════════════ */
const LangCtx = createContext({ lang:'en', t:k=>k, setLang:()=>{} });
const useLang = () => useContext(LangCtx);

function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => { try { return localStorage.getItem('portfolio-lang')||'en'; } catch { return 'en'; } });
  const setLang = useCallback(l => {
    setLangState(l);
    document.getElementById('html-root').className = l==='zh'?'lang-zh':'';
    try { localStorage.setItem('portfolio-lang',l); } catch {}
  }, []);
  useEffect(() => { document.getElementById('html-root').className = lang==='zh'?'lang-zh':''; }, []);
  const t = useCallback(k => T[lang][k] ?? T.en[k] ?? k, [lang]);
  return <LangCtx.Provider value={{ lang, t, setLang }}>{children}</LangCtx.Provider>;
}

/* ═══════════════════════════════
   ROUTER
═══════════════════════════════ */
function useRoute() {
  const [hash, setHash] = useState(window.location.hash||'#/');
  useEffect(() => {
    const fn = () => setHash(window.location.hash||'#/');
    window.addEventListener('hashchange', fn);
    return () => window.removeEventListener('hashchange', fn);
  }, []);
  const path = hash.replace('#','') || '/';
  const parts = path.split('/').filter(Boolean);
  const isProject = parts[0]==='project' && parts[1];
  return { path, slug: isProject?parts[1]:null, navigate: h => { window.location.hash=h; window.scrollTo(0,0); } };
}

/* ═══════════════════════════════
   NEURAL CANVAS
═══════════════════════════════ */
const NeuralCanvas = React.memo(function() {
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas?.getContext('2d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallOrTouch = window.innerWidth < 960 || window.matchMedia('(pointer: coarse)').matches;

    if (!canvas || !ctx || prefersReducedMotion || isSmallOrTouch) {
      if (canvas) canvas.style.display = 'none';
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
      if (resizeRaf) return;
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
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

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
      if (isRunning && !rafRef.current) draw();
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
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    if (!dot || !ring || prefersReducedMotion || isTouchDevice) return undefined;

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
      if (event.target.closest(interactiveSelector)) document.body.classList.add('cursor-hover');
    };

    const onPointerOut = event => {
      if (event.target.closest(interactiveSelector)) document.body.classList.remove('cursor-hover');
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
    if (!bar) return undefined;

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
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}

/* ═══════════════════════════════
   SCROLL REVEAL
═══════════════════════════════ */
function useReveal(deps=[]) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal,.timeline-item');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold:0.08, rootMargin:'0px 0px -32px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, deps);
}

/* ═══════════════════════════════
   LANG TOGGLE
═══════════════════════════════ */
function LangToggle({ minimal }) {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-toggle">
      <div className="lang-pill" style={{transform: lang==='zh'?'translateX(100%)':'translateX(0)'}}></div>
      <button className={`lang-btn${lang==='en'?' active':''}`} onClick={()=>setLang('en')}>EN</button>
      <button className={`lang-btn${lang==='zh'?' active':''}`} onClick={()=>setLang('zh')}>ZH</button>
    </div>
  );
}

/* ═══════════════════════════════
   NAV
═══════════════════════════════ */
function Nav({ navigate }) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY>40);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const go = (id) => {
    setMenuOpen(false);
    navigate('#/');
    setTimeout(() => document.getElementById(id)?.scrollIntoView({behavior:'smooth'}), 120);
  };
  return (
    <>
      <nav className={scrolled?'scrolled':''}>
        <a href="#/" className="nav-brand" onClick={e=>{ e.preventDefault(); navigate('#/'); }}>
          <span className="nav-brand-dot"></span>GT.YE
        </a>
        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#story"   onClick={e=>{ e.preventDefault(); go('story'); }}>{t('navStory')}</a></li>
            <li><a href="#work"    onClick={e=>{ e.preventDefault(); go('work'); }}>{t('navWork')}</a></li>
            <li><a href="#skills"  onClick={e=>{ e.preventDefault(); go('skills'); }}>{t('navSkills')}</a></li>
            <li><a href="#awards"  onClick={e=>{ e.preventDefault(); go('awards'); }}>{t('navAwards')}</a></li>
            <li><a href="#contact" onClick={e=>{ e.preventDefault(); go('contact'); }}>{t('navContact')}</a></li>
          </ul>
          <LangToggle />
          <button className={`hamburger${menuOpen?' open':''}`} onClick={()=>setMenuOpen(!menuOpen)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen?' open':''}`}>
        <a href="#story"   onClick={e=>{ e.preventDefault(); go('story'); }}>{t('navStory')}</a>
        <a href="#work"    onClick={e=>{ e.preventDefault(); go('work'); }}>{t('navWork')}</a>
        <a href="#skills"  onClick={e=>{ e.preventDefault(); go('skills'); }}>{t('navSkills')}</a>
        <a href="#awards"  onClick={e=>{ e.preventDefault(); go('awards'); }}>{t('navAwards')}</a>
        <a href="#contact" onClick={e=>{ e.preventDefault(); go('contact'); }}>{t('navContact')}</a>
        <div className="mobile-menu-lang"><LangToggle /></div>
      </div>
    </>
  );
}

/* ═══════════════════════════════
   FOOTER
═══════════════════════════════ */
function Footer({ navigate }) {
  const { t } = useLang();
  return (
    <footer>
      <span>{t('footerCopy')} · <span style={{color:'var(--teal)'}}>{t('footerTag')}</span></span>
      <div className="footer-links">
        <a href="#work" onClick={e=>{ e.preventDefault(); navigate('#/'); setTimeout(()=>document.getElementById('work')?.scrollIntoView({behavior:'smooth'}),120); }}>{t('navWork')}</a>
        <a href="mailto:1126guanting@gmail.com">Email</a>
        <a href="#awards" onClick={e=>{ e.preventDefault(); navigate('#/'); setTimeout(()=>document.getElementById('awards')?.scrollIntoView({behavior:'smooth'}),120); }}>{t('navAwards')}</a>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════
   AWARDS SECTION
═══════════════════════════════ */
function AwardsSection() {
  const { t } = useLang();
  return (
    <section className="awards-section" id="awards" aria-label="Awards and Recognition">
      <div className="awards-grain" aria-hidden="true"></div>
      <div className="container">
        <div className="section-label reveal">{t('awardsLabel')}</div>
        <h2 className="section-title reveal reveal-delay-1">{t('awardsTitle1')} <em>{t('awardsTitleEm')}</em></h2>
        <div className="awards-grid">
          {AWARDS_DATA.map((a,i) => (
            <div key={i} className={`award-card reveal reveal-delay-${i+1}`} role="article" aria-label={t(a.titleKey)}>
              <div className="award-card-top">
                <span className="award-icon">{a.icon}</span>
                <span className="award-year">{a.year}</span>
              </div>
              <div className="award-title-text">{t(a.titleKey)}</div>
              <div className="award-inst">{t(a.instKey)}</div>
              <div className="award-desc">{t(a.descKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   HOME PAGE
═══════════════════════════════ */
function HomePage({ navigate }) {
  const { t, lang } = useLang();
  useReveal([lang]);

  const timeline = [
    { meta:t('ch0Meta'), head:t('ch0Head'), body:t('ch0Body'), type:'research',
      chips:['NCCU / M.S. Psych','TMBIC','fMRI / EEG','OHBM 2025','TSCN 2025','I-9-9 Berlin'] },
    { meta:t('ch1Meta'), head:t('ch1Head'), body:t('ch1Body'), type:'research',
      chips:['MoHW Mental Health','Children & Family Welfare','Mennonite Hospital','UX Research','Data Analysis'] },
    { meta:t('ch2Meta'), head:t('ch2Head'), body:t('ch2Body'), type:'product',
      chips:['LLM','UX Research','Risk Detection','FastAPI','Silver Medal 2025'] },
    { meta:t('ch3Meta'), head:t('ch3Head'), body:t('ch3Body'), type:'industry',
      chips:['ETL Pipelines','Market Analysis','Web Crawling','Full-Stack Dev','Star Program 2025'] },
    { meta:t('ch4Meta'), head:t('ch4Head'), body:t('ch4Body'), type:'future',
      chips:['AI Products','Research × PM','Open to Opportunities'] },
  ];

  return (
    <div className="page-enter">
      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-left">
          <div className="hero-status">
            <span className="status-item status-active"><span className="status-dot"></span>{t('heroStatusActive')}</span>
            <span className="status-sep">·</span>
            <span className="status-item status-open"><span className="status-dot amber"></span>{t('heroStatusOpen')}</span>
          </div>
          <p className="hero-eyebrow">{t('heroEyebrow')}</p>
          <h1 className="hero-title">
            {t('heroTitle1')}<br />
            <em>{t('heroTitleEm')}</em><br />
            {t('heroTitle2')}
          </h1>
          <p className="hero-sub">{t('heroSub')}</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={()=>document.getElementById('work')?.scrollIntoView({behavior:'smooth'})}>{t('heroCta1')}</button>
            <button className="btn-ghost"   onClick={()=>document.getElementById('story')?.scrollIntoView({behavior:'smooth'})}>{t('heroCta2')}</button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="stat-num">3+</div><div className="stat-label">{t('statYears')}</div></div>
            <div className="hero-stat"><div className="stat-num">7</div><div className="stat-label">{t('statProjects')}</div></div>
            <div className="hero-stat"><div className="stat-num">4</div><div className="stat-label">{t('statAwards')}</div></div>
            <div className="hero-stat"><div className="stat-num">2</div><div className="stat-label">{t('statPub')}</div></div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-img-wrap">
            <div className="scan-line"></div>
            <img src="assets/cv_visual.webp" alt="Guan-Ting Ye — Deep Tech Translator" width="780" height="1020" decoding="async" fetchPriority="high" onError={e=>{ e.currentTarget.onerror=null; e.currentTarget.src='cv_visual.png'; }} />
            <div className="hero-img-glow"></div>
            <div className="hero-coords">25.04°N · 121.56°E</div>
            <div className="data-tag">{t('tagActive')}</div>
            <div className="data-tag-2">{t('tagAward')}</div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="story" id="story">
        <div className="container">
          <div className="section-label reveal">{t('storyLabel')}</div>
          <h2 className="section-title reveal reveal-delay-1">
            {t('storyTitle1')}<br /><em>{t('storyTitleEm')}</em>{t('storyTitle2')}
          </h2>
          <div className="timeline">
            {timeline.map((item,i) => (
              <div className="timeline-item" key={i} data-type={item.type}>
                <div className="timeline-dot"></div>
                <div className="timeline-meta">{item.meta}</div>
                <h3 className="timeline-head">{item.head}</h3>
                <p className="timeline-body">{item.body}</p>
                <div className="chips">{item.chips.map(c=><span className="chip" key={c}>{c}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="work" id="work">
        <div className="container">
          <div className="section-label reveal">{t('workLabel')}</div>
          <h2 className="section-title reveal reveal-delay-1">
            {t('workTitle1')} <em>{t('workTitleEm')}</em>{t('workTitle2')}
          </h2>
          <div className="work-grid">
            {PROJECTS.map((p,i) => <ProjectCard key={p.slug} project={p} index={i} navigate={navigate} lang={lang} />)}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="skills" id="skills">
        <div className="container">
          <div className="section-label reveal">{t('skillsLabel')}</div>
          <h2 className="section-title reveal reveal-delay-1">
            {t('skillsTitle1')} <em>{t('skillsTitleEm')}</em>{t('skillsTitle2')}
          </h2>
          <div className="skills-grid">
            <div className="skill-group reveal">
              <div className="skill-group-title">{t('skillDomain')}</div>
              <div className="skill-items">
                {['Cognitive Neuroscience','Deep Tech Strategy','AI / Machine Learning','UX Research','Digital Humanism','Psychometrics','Experiment Design','Ecosystem Mapping','Digital Mental Health'].map(s=><span className="skill-tag" key={s}>{s}</span>)}
              </div>
            </div>
            <div className="skill-group reveal reveal-delay-1">
              <div className="skill-group-title">{t('skillTech')}</div>
              <div className="skill-items">
                {['Python','R · Matlab · SPSS','JavaScript · React · Vue','SQL · Database Design','FastAPI · Backend Dev','Playwright · Scrapy','Pandas · Scikit-learn','EEG / fMRI Analysis','ETL Pipelines','LLM APIs · Prompt Eng.','Notion API','Photoshop · Illustrator'].map(s=><span className="skill-tag" key={s}>{s}</span>)}
              </div>
            </div>
            <div className="skill-group reveal reveal-delay-2">
              <div className="skill-group-title">{t('skillLang')}</div>
              <div className="skill-items">
                {['Mandarin Chinese (Native)','English (Professional)','Scientific Writing','Pitch Deck Design','A/B Experiment Design','Cross-disciplinary Facilitation','Data Storytelling','Business Model Design','Market Analysis'].map(s=><span className="skill-tag" key={s}>{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <AwardsSection />

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="contact-ghost" aria-hidden="true">SIGNAL</div>
        <div className="container">
          <div className="section-label reveal">{t('contactLabel')}</div>
          <div className="contact-grid">
            <div>
              <h2 className="contact-title reveal">{t('contactTitle1')} <em>{t('contactTitleEm')}</em>{t('contactTitle2')}</h2>
              <p className="contact-note reveal reveal-delay-1">{t('contactNote')}</p>
            </div>
            <div className="contact-links reveal reveal-delay-2">
              <a href="mailto:1126guanting@gmail.com" className="contact-link">
                <div><div className="contact-link-label">{t('contactEmail')}</div><div className="contact-link-val">1126guanting@gmail.com</div></div>
                <span className="contact-link-arrow">→</span>
              </a>
              <a href="tel:+886927012867" className="contact-link">
                <div><div className="contact-link-label">{t('contactPhone')}</div><div className="contact-link-val">+886 927 012 867</div></div>
                <span className="contact-link-arrow">→</span>
              </a>
              <div className="contact-link" style={{cursor:'default'}}>
                <div><div className="contact-link-label">{t('contactLang')}</div><div className="contact-link-val">Mandarin (Native) · English (Professional)</div></div>
                <span className="contact-link-arrow" style={{color:'var(--amber)'}}>✦</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════
   PROJECT CARD
═══════════════════════════════ */
function ProjectCard({ project:p, index, navigate, lang }) {
  const { t } = useLang();
  const ref = useRef(null);
  const onMove = useCallback(e => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
    ref.current.style.setProperty('--my', ((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
  }, []);
  if(p.comingSoon) return (
    <div ref={ref} className={`project-card coming-soon reveal reveal-delay-${(index%4)+1}`}>
      <div className="card-num">{p.num}</div>
      <div className="card-label">{lang==='zh'?p.zhCategory:p.category}</div>
      <h3 className="card-title">{lang==='zh'?p.zhTitle:p.title}</h3>
      <p className="card-desc" style={{color:'var(--gray-dim)'}}>{t('csDesc')}</p>
    </div>
  );
  const isFeatured = index===0;
  return (
    <div ref={ref}
      className={`project-card${isFeatured?' featured':''} reveal reveal-delay-${(index%4)+1}`}
      onMouseMove={onMove}
      onClick={()=>navigate(`#/project/${p.slug}`)}
      role="link" tabIndex={0}
      onKeyDown={e=>e.key==='Enter'&&navigate(`#/project/${p.slug}`)}
      aria-label={`View ${lang==='zh'?p.zhTitle:p.title} project`}
    >
      {isFeatured ? (
        <div className="featured-inner">
          <div>
            <div className="card-num">{p.num}</div>
            <div className="card-label">{lang==='zh'?p.zhCategory:p.category}</div>
            <h3 className="card-title">{lang==='zh'?p.zhTitle:p.title}</h3>
            <p className="card-desc">{lang==='zh'?p.zhHook:p.hook}</p>
            <div className="card-stack">{p.stack.slice(0,5).map(s=><span className="stack-tag" key={s}>{s}</span>)}</div>
          </div>
          <div>
            <div className="card-label" style={{marginBottom:16}}>Key Outcomes</div>
            <ul className="card-outcomes">
              {(lang==='zh'?p.zhOutcomes:p.outcomes).slice(0,3).map((o,i)=><li key={i}>{o}</li>)}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <div className="card-num">{p.num}</div>
          <div className="card-label">{lang==='zh'?p.zhCategory:p.category}</div>
          <h3 className="card-title">{lang==='zh'?p.zhTitle:p.title}</h3>
          <p className="card-desc">{lang==='zh'?p.zhHook:p.hook}</p>
          <div className="card-stack">{p.stack.slice(0,4).map(s=><span className="stack-tag" key={s}>{s}</span>)}</div>
        </>
      )}
      <div className="card-arrow">↗</div>
    </div>
  );
}

/* ═══════════════════════════════
   PROJECT PAGE
═══════════════════════════════ */
function ProjectPage({ slug, navigate }) {
  const { t, lang } = useLang();
  useReveal([slug, lang]);
  const idx = PROJECTS.findIndex(p=>p.slug===slug);
  const p = PROJECTS[idx];
  if(!p||p.comingSoon) return (
    <div className="proj-page page-enter">
      <div className="container" style={{paddingTop:160,paddingBottom:80}}>
        <a href="#/" className="proj-back" onClick={e=>{ e.preventDefault(); navigate('#/'); }}>{t('projBack')}</a>
        <p className="proj-category">{t('comingSoon')}</p>
        <h1 className="proj-title">{t('comingSoon')}</h1>
        <p className="proj-hook">{t('csDesc')}</p>
      </div>
    </div>
  );
  const prevP = idx>0 && !PROJECTS[idx-1].comingSoon ? PROJECTS[idx-1] : null;
  const nextP = idx<PROJECTS.length-1 && !PROJECTS[idx+1].comingSoon ? PROJECTS[idx+1] : null;
  const L = n => lang==='zh' ? p['zh'+n.charAt(0).toUpperCase()+n.slice(1)] ?? p[n] : p[n];
  const title    = L('title');
  const hook     = L('hook');
  const overview = L('overview');
  const outcomes = lang==='zh' ? p.zhOutcomes : p.outcomes;
  const role     = lang==='zh' ? p.zhRole     : p.role;
  const status   = lang==='zh' ? p.zhStatus   : p.status;
  const impact   = lang==='zh' ? p.zhImpact   : p.impact;
  const category = lang==='zh' ? p.zhCategory : p.category;
  useEffect(()=>{ document.title=`${title} · GT.YE`; return()=>{ document.title='Guan-Ting Ye · Neural Signal OS'; }; },[title]);
  return (
    <div className="proj-page page-enter">
      <div className="proj-hero">
        <div className="container">
          <a href="#/" className="proj-back" onClick={e=>{ e.preventDefault(); navigate('#/'); }}>{t('projBack')}</a>
          <p className="proj-category reveal">{category}</p>
          <h1 className="proj-title reveal reveal-delay-1">{title}</h1>
          <p className="proj-hook reveal reveal-delay-2">{hook}</p>
          <div className="proj-stack reveal reveal-delay-2">{p.stack.map(s=><span className="stack-tag" key={s}>{s}</span>)}</div>
          <div className="proj-meta reveal reveal-delay-3">
            <div className="proj-meta-item"><div className="proj-meta-key">{t('projRole')}</div><div className="proj-meta-val">{role}</div></div>
            <div className="proj-meta-item"><div className="proj-meta-key">{t('projTimeline')}</div><div className="proj-meta-val">{p.timeline}</div></div>
            <div className="proj-meta-item"><div className="proj-meta-key">{t('projStatus')}</div><div className="proj-meta-val">{status}</div></div>
            <div className="proj-meta-item"><div className="proj-meta-key">{t('projImpact')}</div><div className="proj-meta-val">{impact}</div></div>
          </div>
        </div>
      </div>
      <div className="proj-body">
        <div className="container">
          <div className="proj-section reveal">
            <div className="proj-section-title">{t('projOverview')}</div>
            {overview.split('\n\n').map((para,i)=><p className="proj-body-text" key={i}>{para}</p>)}
          </div>
          <div className="proj-section reveal">
            <div className="proj-section-title">{t('projOutcomes')}</div>
            <ol className="proj-outcomes">
              {outcomes.map((o,i)=><li key={i}><span className="outcome-num">{String(i+1).padStart(2,'0')}</span><span>{o}</span></li>)}
            </ol>
          </div>
          <div className="proj-section reveal">
            <div className="proj-section-title">{t('projTech')}</div>
            <div className="proj-tech-grid">
              {p.tech.map(item=>(
                <div className="tech-item" key={item.label}>
                  <div className="tech-item-label">{item.label}</div>
                  <div className="tech-item-val">{item.val}</div>
                </div>
              ))}
            </div>
          </div>
          {p.awards && p.awards.length>0 && (
            <div className="proj-section reveal">
              <div className="proj-section-title">{t('projAwards')}</div>
              {p.awards.map((a,i)=>(
                <div className="proj-award" key={i}>
                  <span className="award-badge-icon">{a.icon}</span>
                  <div className="award-badge-text">
                    <div className="award-badge-title">{a.title}</div>
                    {a.desc}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="proj-nav">
            {prevP ? (
              <a href={`#/project/${prevP.slug}`} className="proj-nav-link" onClick={e=>{ e.preventDefault(); navigate(`#/project/${prevP.slug}`); }}>
                <span className="proj-nav-dir">{t('prevProj')}</span>
                <span className="proj-nav-name">{lang==='zh'?prevP.zhTitle:prevP.title}</span>
              </a>
            ) : <span/>}
            {nextP ? (
              <a href={`#/project/${nextP.slug}`} className="proj-nav-link" style={{textAlign:'right'}} onClick={e=>{ e.preventDefault(); navigate(`#/project/${nextP.slug}`); }}>
                <span className="proj-nav-dir">{t('nextProj')}</span>
                <span className="proj-nav-name">{lang==='zh'?nextP.zhTitle:nextP.title}</span>
              </a>
            ) : <span/>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════
   APP
═══════════════════════════════ */
function App() {
  const { path, slug, navigate } = useRoute();
  return (
    <LangProvider>
      <NeuralCanvas />
      <Cursor />
      <ProgressBar />
      <Nav navigate={navigate} />
      {slug
        ? <ProjectPage key={slug} slug={slug} navigate={navigate} />
        : <HomePage key="home" navigate={navigate} />
      }
      <Footer navigate={navigate} />
    </LangProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);