export const PROJECTS = [
    {
        slug: 'emobot-plus', num: '01',
        category: 'AI Product · Digital Mental Health', zhCategory: 'AI 產品 · 數位心理健康',
        title: 'Emobot+', subtitle: 'Award-winning AI Mental Health Companion',
        zhTitle: 'Emobot+', zhSubtitle: '得獎 AI 數位心理支持系統',
        hook: "An award-winning AI mental-health companion that turns anonymous campus check-ins into trait-matched support, safety-aware dialogue, and counselor-ready insight.",
        zhHook: '一套得獎的校園 AI 心理支持系統，將匿名校園情緒議題轉化為特質媒合、風險感知對話與諮商量能解決方案的系統專案。',
        stack: ['React', 'FastAPI', 'LLM Safety', 'Psychological Embedding', 'Avatar UX', 'SDG 3'],
        role: 'Founder & Product Lead / UX Strategist', zhRole: '創辦人 / 產品負責人 / UIUX設計 / 前後端系統架構',
        timeline: '2025 – 2026', status: 'Award-winning MVP', zhStatus: '獲獎 MVP',
        impact: 'Silver Medal · 2025 AI Sustainability Contest', zhImpact: '2025 AI 跨域永續創新競賽 · 銀獎',
        overview: `Emobot+ was created in response to a real gap in campus support: many students need a safe entry point to process emotions, understand their current state, or simply express what they are going through before they are ready to book formal counseling. At the same time, everyday emotional support and clinical intervention must remain clearly distinguished.

I designed Emobot+ as a bridge between students and professional support systems. It provides a low-barrier emotional entry point, a consent-based data-use flow, and a clear boundary between AI companionship and professional care.

The proposal won the Silver Medal at the 2025 AI Interdisciplinary Sustainability Innovation Contest. Its core positioning is a 24/7 emotional support system for university settings. Users can start with everyday language, while the system matches them with a suitable AI companion based on psychological traits, emotional needs, and support preferences.

Emobot+ is not designed to replace professional counseling. Instead, it helps students who have not yet formally sought help organize their emotions and build self-awareness. With user consent, it also turns emotional trends, issue tags, and risk signals into concise summaries that help counseling teams understand the context and continue support more effectively.`,
        zhOverview: `Emobot+ 源自一個真實的校園心理服務缺口：許多學生在正式預約諮商之前，已經需要一個能協助梳理情緒、理解狀態，或安全宣洩的入口；但日常情緒支持與臨床介入之間，也必須被清楚區分。

因此，我將 Emobot+ 設計成介於學生與專業支持系統之間的橋接產品。它提供低門檻的情緒入口、同意制資料使用流程，以及 AI 陪伴與專業之間明確的角色邊界與合作關係。

這份提案獲得 2025 AI 跨域永續創新競賽銀獎，核心定位是大學場域中的 24/7 情緒支持系統。使用者可以用日常語言開始對話，系統則根據心理特質、情緒需求與支持偏好，媒合到更合適的 AI 陪伴角色。

Emobot+ 並不是要取代專業諮商，而是協助校園中尚未正式求助的使用者，先完成初步情緒整理與自我覺察；並在使用者同意下，將情緒裝態、議題標籤與風險訊號整理成諮商端可快速理解的摘要，讓後續支持更容易銜接，同時降低諮商不足的量能問題。`,
        outcomes: ['Reframed campus mental-health friction into a product journey spanning anonymous entry, companion matching, safety routing, and counselor handoff', 'Designed trait and need matching around MBTI, attachment style, emotion regulation, basic psychological needs, and conversation history', 'Specified a React + FastAPI architecture with psychological embedding, emotion-topic analysis, risk phrase detection, and consent-based reporting', 'Created a four-persona companion system for different support modes: validation, grounding, action planning, and cognitive reframing', 'Won Silver Medal at the 2025 AI Interdisciplinary Sustainability Innovation Contest and converted the award proposal into a portfolio-ready product case', 'Defined validation signals across PHQ-9 / GAD-7 / PANAS, self-disclosure, companionship, session depth, and qualitative user feedback'],
        zhOutcomes: ['將校園心理支持痛點重構為完整產品旅程：匿名入口、陪伴角色媒合、安全分流與諮商端銜接', '以 MBTI、依附風格、情緒調節、基本心理需求與對話歷程設計特質與需求媒合機制', '規劃 React + FastAPI 架構，結合心理嵌入、情緒議題分析、風險語句偵測與同意制報告', '建立四種 AI 陪伴角色，分別對應情緒接住、穩定安撫、行動規劃與認知重構等支持模式', '獲得 2025 AI 跨域永續創新競賽銀獎，並將競賽提案轉化為作品集中的產品案例', '定義 PHQ-9 / GAD-7 / PANAS、自我揭露、陪伴感、對話深度與質性訪談等驗證訊號'],
        tech: [{ label: 'Frontend', val: 'React 18, guided onboarding, responsive case UI, avatar-ready interaction surfaces' }, { label: 'Backend', val: 'FastAPI, Python services, consent-based session logging and report generation' }, { label: 'Matching', val: 'Psychological embedding with trait vectors, need signals, and conversation history' }, { label: 'AI Layer', val: 'LLM dialogue orchestration, BERT/NRC-style emotion analysis, topic tagging' }, { label: 'Avatar', val: 'D-ID / HeyGen / TTS-ready multimodal companion direction with voice and facial cues' }, { label: 'Safety', val: 'Risk phrase detection, escalation thresholds, counselor summary, professional resource routing' }],
        awards: [{ iconKey: 'award', title: 'Silver Medal', desc: '2025 AI Interdisciplinary Sustainability Innovation Contest (AI 跨域永續創新競賽)' }],
    },
    {
        slug: 'deeptech-database', num: '02',
        category: 'Data Engineering · Ecosystem Intelligence', zhCategory: '資料工程 · 產業生態情報',
        title: 'Global DeepTech Database', subtitle: 'Ecosystem Intelligence Infrastructure',
        zhTitle: '全球深科技資料庫', zhSubtitle: '產業生態情報資料基礎建設',
        hook: 'From fragmented deep-tech signals to a research-grade ecosystem intelligence database.',
        zhHook: '將分散的深科技與半導體產業訊號，整理成可查證、可索引、可分析的研究級資料庫。',
        stack: ['Python', 'Pandas', 'Playwright', 'SQL', 'Entity Resolution', 'Data Governance'],
        role: 'Research Assistant / Data Pipeline & Ecosystem Intelligence', zhRole: '研究助理 / 資料管線與產業情報系統',
        timeline: '2024-Present', status: 'ITRI/ISTI research workflow', zhStatus: 'ITRI/ISTI 研究資料流程',
        impact: '230+ companies tracked / enriched', zhImpact: '230+ 家公司追蹤與資料補強',
        overview: "I built a research-oriented data workflow that consolidates fragmented deep-tech and semiconductor ecosystem signals into a structured intelligence database. The system supports company tracking, source traceability, entity normalization, enrichment, and dashboard-ready outputs for research and strategic analysis.\n\nDeep-tech ecosystem research rarely starts with clean data. Company names change across sources, public pages have inconsistent formats, hiring and financial signals live in separate systems, and manual spreadsheets quickly become difficult to maintain.\n\nThis case reconstructs the work as a portfolio-safe data-system study. It shows source acquisition, raw staging, cleaning, entity resolution, relational database modeling, quality controls, and the research outputs enabled by the database.",
        zhOverview: "我建立一套研究導向的資料流程，將分散的深科技與半導體生態訊號整合成結構化情報資料庫。系統支援公司追蹤、來源追溯、實體標準化、欄位補強與儀表板輸出，協助研究與策略分析流程更有效率地運作。\n\n深科技生態研究通常不是從乾淨資料開始。公司名稱在不同來源中不一致，公開頁面格式不穩定，徵才與財務訊號分散在不同系統，手動表格也很快變得難以維護。\n\n本案例以作品集安全方式重構這段工作，呈現來源擷取、原始暫存、資料清理、實體解析、關聯式資料庫建模、品質控制，以及資料庫支援的研究輸出。",
        outcomes: ['Consolidated fragmented public and manually maintained ecosystem signals into a reusable research database workflow', 'Modeled stable company entities with aliases, source rows, company-source relationships, profiles, tags, and update logs', 'Designed source traceability and quality controls around missing fields, stale sources, duplicate candidates, and conflicting values', 'Prepared dashboard-ready and map-ready outputs for company indexes, ecosystem segmentation, research briefs, and enriched dataset packages', 'Translated data engineering work into a high-fidelity portfolio case for AI product, UX research, frontend, and data platform roles'],
        zhOutcomes: ['將分散的公開與人工維護產業訊號整合成可重複使用的研究資料庫流程', '以公司實體為核心建模，串接 aliases、source_rows、company_sources、profiles、tags 與 update_logs', '圍繞缺失欄位、來源過期、重複候選與衝突值設計來源追溯與品質控制', '準備可接入儀表板與地圖的輸出，支援公司索引、生態分群、研究 brief 與補強資料包', '將資料工程工作轉譯為 AI 產品、UX 研究、前端與資料平台職能都能理解的高擬真案例'],
        tech: [{ label: 'Acquisition', val: 'Playwright for dynamic pages, structured requests for stable pages, manual spreadsheet ingestion, cache fallback' }, { label: 'Cleaning', val: 'Pandas normalization, missing-value flags, deduplication, alias mapping, column and type standardization' }, { label: 'Database Modeling', val: 'Canonical company entities, alias tables, source registry, source rows, join tables, update logs' }, { label: 'Quality Controls', val: 'Source traceability, stale-source checks, conflict handling, review queue, field-level confidence indicators' }, { label: 'Visualization', val: 'Power BI-ready tables, HTML ecosystem map, filterable intelligence views, research brief exports' }, { label: 'Portfolio Boundary', val: 'Public-safe reconstruction with sample displays instead of confidential company-level records' }],
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
        // Self-drawn SVG cover (no stock photos on this case): cockpit wireframe in the Neural Signal OS palette.
        caseHeroImage: 'data:image/svg+xml;utf8,' + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">'
            + '<rect width="1600" height="900" fill="#14171D"/>'
            + '<g stroke="#566173" stroke-width="4" fill="#1C2028">'
            + '<rect x="120" y="140" width="340" height="620" rx="16"/>'
            + '<rect x="520" y="140" width="560" height="620" rx="16"/>'
            + '<rect x="1140" y="140" width="340" height="620" rx="16"/>'
            + '</g>'
            + '<g stroke="#4A5262" stroke-width="5" stroke-linecap="round">'
            + '<path d="M160 240h260M160 320h220M160 400h260M160 480h190M160 560h240"/>'
            + '<path d="M1180 260h200M1180 380h160M1180 500h220M1180 620h180"/>'
            + '</g>'
            + '<g stroke="#35C2B0" stroke-width="6" stroke-linecap="round" fill="none">'
            + '<path d="M560 640l90-70 80 30 110-90 90 20 100-60"/>'
            + '<circle cx="560" cy="240" r="12" fill="#35C2B0" stroke="none"/>'
            + '<circle cx="560" cy="320" r="12" fill="#35C2B0" stroke="none" opacity="0.6"/>'
            + '</g>'
            + '<g fill="#35C2B0"><circle cx="1160" cy="260" r="9"/><circle cx="1160" cy="380" r="9"/><circle cx="1160" cy="500" r="9"/></g>'
            + '<circle cx="1160" cy="620" r="9" fill="#E8A33D"/>'
            + '<rect x="620" y="220" width="360" height="18" rx="9" fill="#2A303C"/>'
            + '<rect x="620" y="220" width="230" height="18" rx="9" fill="#35C2B0" opacity="0.7"/>'
            + '<rect x="620" y="300" width="360" height="18" rx="9" fill="#2A303C"/>'
            + '<rect x="620" y="300" width="150" height="18" rx="9" fill="#35C2B0" opacity="0.5"/>'
            + '</svg>'),
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
        // Gallery replaced by six interactive evidence modules (src/components/launch-os/)
        outcomeModules: [
            { num: '04', id: 'los-module-prd' },
            { num: '01', id: 'los-module-cockpit' },
            { num: '02', id: 'los-module-metric-tree' },
            { num: '03', id: 'los-module-research' },
            { num: '05', id: 'los-module-risk' },
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
        // Evidence slots replaced by the Working Evidence modules; credentials stay as a text-only list.
        credentials: [
            { iconKey: 'cpu', name: 'IBM AI Product Manager', issuer: 'IBM', relevance: 'AI product strategy, model risk, productization judgment — applied in the risk register and model card (Module 05)' },
            { iconKey: 'target', name: 'Google Project Management', issuer: 'Google', relevance: 'Roadmap planning, stakeholder communication, launch governance — applied in the decision gates (Module 01)' },
            { iconKey: 'chart', name: 'Google Advanced Data Analytics', issuer: 'Google', relevance: 'Metric design, experiment framing, evidence-backed decisions — applied in the metric tree (Module 02)' },
        ],
        awards: [],
    },
    {
        slug: 'ai-news-intelligence', num: '04',
        category: 'AI System · Data Pipeline', zhCategory: 'AI 系統 · 資料管線',
        title: 'AI News Intelligence System', subtitle: 'Automated Tech Trend Analysis & Reporting',
        zhTitle: 'AI 新聞情報系統', zhSubtitle: '自動化科技趨勢分析與報告',
        hook: 'Turning the firehose of global tech news into structured strategic intelligence — automatically, bilingually, daily. I designed the AI system and the platform that delivers it, end to end, solo.',
        zhHook: '將全球科技新聞的海量資訊，自動轉化為雙語結構化策略情報，每日更新。AI 系統與交付它的平台，都由我獨立從頭到尾設計。',
        stack: ['Python', 'Gemini 1.5', 'GPT-4o', 'Playwright', 'Trafilatura', 'Notion API'],
        role: 'System Architect & Lead Developer', zhRole: '系統架構師 / 主任開發者',
        timeline: '2024 – Present', status: 'Production · Daily runs', zhStatus: '上線運作 · 每日執行',
        impact: 'Cost reduced 75% (GPT→Gemini)', zhImpact: '成本降低 75%（GPT→Gemini）',
        overview: "The challenge: ITRI's deep tech team needs to stay current on global AI, semiconductor, and frontier science news — but manually curating that volume is infeasible at scale.\n\nThis system crawls 6+ sources (TechCrunch, MIT Tech Review, TechNews 科技新報, INSIDE 硬塞, TechNewsWorld, and domain feeds), extracts full text via Trafilatura and Playwright, and feeds a multi-stage Gemini/GPT pipeline that scores relevance, extracts entities, generates strategic summaries, and publishes to Notion.\n\nKey decisions: iterative prompt refinement, native bilingual output (EN/ZH), and a GPT-4o → Gemini migration that cut per-run costs ~75% while maintaining quality.\n\nThe briefings land on a real delivery surface: the /insights feed of the Strategy Intelligence Platform, which I also designed and built. The Evidence Layer below opens the whole workshop — the research, the prompt evaluations, the model tradeoffs, the interface decisions, and the MVP that still runs.",
        zhOverview: "挑戰在於：工研院深科技團隊需要持續追蹤全球 AI、半導體與前沿科學動態——但手動策展如此大量的資訊在規模上並不可行。\n\n此系統爬取 6+ 個來源，透過 Trafilatura 和 Playwright 提取完整文章文本，並饋入多階段 Gemini/GPT 管線進行相關性評分、實體提取、策略摘要生成，最後將格式化報告發布至 Notion。\n\n關鍵工程決策：迭代式提示工程、原生雙語輸出（EN/ZH），以及從 GPT-4o 遷移至 Gemini，在維持輸出品質的同時將每次執行成本降低約 75%。\n\n這些簡報有一個真實的交付面：Strategy Intelligence Platform 的 /insights 動態，那個平台也是我設計並開發的。下方的證據層打開了整個工作間——研究、提示評測、模型取捨、介面決策，以及到現在還在跑的 MVP。",
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
        // Self-drawn SVG cover (no stock photos): a pressure-console preview in the Neural Signal OS palette.
        caseHeroImage: 'data:image/svg+xml;utf8,' + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">'
            + '<rect width="1600" height="900" fill="#0C0E12"/>'
            + '<rect x="120" y="96" width="1360" height="64" rx="12" fill="#14171D" stroke="#262B35"/>'
            + '<circle cx="164" cy="128" r="9" fill="#35C2B0"/>'
            + '<rect x="192" y="119" width="190" height="18" rx="9" fill="#2A303C"/>'
            + '<rect x="1300" y="112" width="140" height="32" rx="16" fill="#12241F" stroke="#35C2B0"/>'
            + '<circle cx="1326" cy="128" r="6" fill="#35C2B0"/><rect x="1342" y="122" width="78" height="12" rx="6" fill="#35C2B0" opacity="0.6"/>'
            + '<rect x="120" y="196" width="840" height="512" rx="16" fill="#14171D" stroke="#262B35"/>'
            + '<rect x="152" y="230" width="776" height="196" rx="8" fill="#0C0E12" stroke="#232A36"/>'
            + '<rect x="152" y="300" width="776" height="60" fill="#35C2B0" opacity="0.06"/>'
            + '<polyline points="152,340 230,332 300,318 370,300 440,255 510,232 580,244 650,300 720,336 792,330 860,334 928,332" fill="none" stroke="#E8A33D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'
            + '<circle cx="928" cy="332" r="7" fill="#E8A33D"/>'
            + '<rect x="152" y="452" width="776" height="196" rx="8" fill="#0C0E12" stroke="#232A36"/>'
            + '<polyline points="152,560 230,548 300,566 370,552 440,558 510,544 580,560 650,550 720,566 792,552 860,560 928,556" fill="none" stroke="#35C2B0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'
            + '<circle cx="928" cy="556" r="7" fill="#35C2B0"/>'
            + '<g fill="#14171D" stroke="#262B35">'
            + '<rect x="1000" y="196" width="480" height="90" rx="12"/><rect x="1000" y="300" width="480" height="90" rx="12"/>'
            + '<rect x="1000" y="404" width="480" height="90" rx="12"/><rect x="1000" y="508" width="480" height="90" rx="12"/>'
            + '<rect x="1000" y="612" width="480" height="96" rx="12"/></g>'
            + '<g><rect x="1000" y="196" width="4" height="90" fill="#35C2B0"/><rect x="1000" y="300" width="4" height="90" fill="#35C2B0"/>'
            + '<rect x="1000" y="404" width="4" height="90" fill="#E8A33D"/><rect x="1000" y="508" width="4" height="90" fill="#35C2B0"/></g>'
            + '<g fill="#35C2B0"><circle cx="1036" cy="241" r="7"/><circle cx="1036" cy="345" r="7"/><circle cx="1036" cy="553" r="7"/></g>'
            + '<circle cx="1036" cy="449" r="7" fill="#E8A33D"/>'
            + '<g fill="#2A303C"><rect x="1060" y="232" width="150" height="16" rx="8"/><rect x="1060" y="336" width="120" height="16" rx="8"/>'
            + '<rect x="1060" y="440" width="170" height="16" rx="8"/><rect x="1060" y="544" width="130" height="16" rx="8"/></g>'
            + '<rect x="1024" y="640" width="180" height="40" rx="8" fill="#35C2B0"/>'
            + '<rect x="1224" y="640" width="150" height="40" rx="8" fill="none" stroke="#E8A33D"/>'
            + '</svg>'),
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
        storyChapters: [
            { iconKey: 'globe', label: 'Context', zhLabel: '情境', title: 'Start with a person, not a panel', zhTitle: '從人開始，而不是從面板開始', body: 'The scenario opens with a user who is busy, uncertain, and moving between tasks. The interface is judged by whether it helps them notice the right change at the right time without forcing them to decode the entire system.', zhBody: '情境從一個忙碌、不確定、正在多任務切換的使用者開始。介面是否成功，取決於它能否讓使用者在正確時間注意到正確變化，而不是逼他理解整個系統。', artifact: 'Scenario storyboard', zhArtifact: '情境 storyboard' },
            { iconKey: 'activity', label: 'Human Factors', zhLabel: '人因', title: 'Design around the limits of attention', zhTitle: '圍繞注意力限制設計', body: 'Attention, memory, perception, and error tolerance become product constraints. Every warning, label, color, and delay has to earn its place because HMI is often used when the user has no spare cognition left.', zhBody: '注意力、記憶、知覺與錯誤容忍度成為產品限制。每個警示、標籤、顏色與延遲都必須有存在理由，因為 HMI 常被用在使用者已經沒有多餘認知資源的時候。', artifact: 'Attention map', zhArtifact: '注意力地圖' },
            { iconKey: 'layers', label: 'Model', zhLabel: '模型', title: 'Build a state machine users can feel', zhTitle: '建立使用者感覺得到的狀態機', body: 'Normal, alert, decision, confirmation, error, recovery, and handoff states are mapped as one behavioral system. The transitions are designed to feel predictable, not dramatic.', zhBody: 'normal、alert、decision、confirmation、error、recovery 與 handoff 狀態被整理成同一套行為系統。轉換被設計成可預期，而不是戲劇化。', artifact: 'State matrix', zhArtifact: '狀態矩陣' },
            { iconKey: 'monitor', label: 'Prototype', zhLabel: '原型', title: 'Let frontend behavior carry the design', zhTitle: '讓前端行為承載設計', body: 'The prototype is where hierarchy becomes motion and states become behavior: focus rings, disabled buttons, progressive disclosure, responsive density, and keyboard navigation are treated as core design material.', zhBody: '原型是層級變成動態、狀態變成行為的地方：focus rings、disabled buttons、漸進揭露、響應式密度與鍵盤操作都被視為核心設計材料。', artifact: 'Frontend prototype', zhArtifact: '前端原型' },
            { iconKey: 'check', label: 'Evidence', zhLabel: '證據', title: 'Make the design reviewable', zhTitle: '讓設計可以被評審', body: 'The case leaves clear slots for screenshots, scenario boards, usability notes, and certificates. A hiring manager should be able to see the reasoning trail, not only the final visual surface.', zhBody: '案例預留清楚位置放置截圖、情境板、可用性筆記與證照。招聘主管應該能看見推理軌跡，而不只是最後的視覺表面。', artifact: 'Review packet', zhArtifact: '評審包' },
        ],
        pullQuote: 'Good HMI does not ask users to think harder. It shapes the system so the next correct action becomes easier to see.',
        zhPullQuote: '好的 HMI 不是要求使用者更努力思考，而是讓系統本身把下一個正確行動變得更容易被看見。',
        // Superseded by the live Evidence Lab below — each card jumps to the working module.
        evidenceSlots: [
            { iconKey: 'monitor', title: 'Working MVP', zhTitle: '可操作 MVP', desc: 'Open the live pressure console: streaming telemetry, an injectable fault, and a recovery flow you complete.', zhDesc: '打開即時壓力主控台：串流遙測、可注入的故障，以及由你完成的復原流程。', anchor: 'gx-m06', anchorNum: '06' },
            { iconKey: 'layers', title: 'State Matrix', zhTitle: '狀態矩陣', desc: 'Open the real matrix: 7 interface states across 4 operating contexts, each rendered live with its spec.', zhDesc: '打開真正的矩陣：7 種介面狀態 × 4 種操作情境，每格即時渲染並附規格。', anchor: 'gx-m02', anchorNum: '02' },
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
        category: 'Ecosystem Intelligence · B2B Data Product', zhCategory: '生態系商情 · B2B 資料產品',
        title: 'Taiwan Startup Ecosystem Atlas', subtitle: 'A crawled, tagged, queryable deep-tech intelligence layer',
        zhTitle: '台灣新創生態系地圖', zhSubtitle: '可爬取、標籤化、可查詢的深科技商情層',
        hook: 'A B2B intelligence layer over 230+ deep-tech companies: crawled and tagged into one atlas, read for gaps, capital, patents and grants — and questioned in plain language over RAG.',
        zhHook: '一層覆蓋 230+ 家深科技公司的 B2B 商情：爬取並標籤化為一張地圖，讀出缺口、資金、專利與補助，並透過 RAG 用白話查詢。',
        stack: ['Python', 'Playwright', 'ETL', 'Bilingual Taxonomy', 'RAG', 'SVG Data Viz'],
        role: 'Data Engineer & Intelligence Product Designer', zhRole: '資料工程 / 商情產品設計',
        timeline: '2024 – Present', status: 'Data foundation live · B2B layer proposed', zhStatus: '資料基礎上線 · B2B 層提案中',
        impact: '230+ companies · 40+ dimensions · 9 sources', zhImpact: '230+ 家公司 · 40+ 維度 · 9 類來源',
        overview: "Taiwan's deep-tech ecosystem is dense but poorly documented at the company level. The foundation of this project — built during my ITRI/ISTI work — is a crawled, enriched dataset of 230+ startups and scale-ups across semiconductor, AI, biotech and cleantech, with a bilingual taxonomy that maps Chinese company descriptions onto internationally-comparable categories.\n\nThis page re-envisions that dataset as a B2B intelligence product: acquire and structure the records, map them into a navigable ecosystem atlas, read them for value-chain gaps, capital flow, patent depth and grant routes, then deliver the result as briefs, an API, and a plain-language RAG query surface.\n\nThe evidence layer below opens the whole workshop — the sources, the schema and tagging, the interactive sector atlas, the gap and investment analysis, and the RAG console — with each artifact labelled for what is shipped versus proposed.",
        zhOverview: "台灣深科技生態系相當密集，但在公司層面的文件記錄卻相對薄弱。本專案的基礎——建立於我在工研院的工作——是一份爬取並豐富化的資料集，涵蓋半導體、AI、生技與潔淨科技的 230+ 家新創與成長型公司，並以雙語分類法把中文公司描述對映到國際可比的類別。\n\n本頁把那份資料集重新設想為一個 B2B 商情產品：擷取並結構化紀錄、繪成可導覽的生態系地圖、讀出價值鏈缺口、資金流向、專利深度與補助管道，再以商情卡、API 與白話 RAG 查詢介面交付結果。\n\n下方的證據層打開整個工作間——來源、結構與標籤、可互動的產業地圖、缺口與投資分析，以及 RAG 查詢台——每個產出都標明哪些已上線、哪些為提案。",
        outcomes: [
            'Crawled and enriched 230+ deep-tech companies from 9 public sources into 40+ dimensions each',
            'Built a bilingual taxonomy (ZH↔EN) so a record is findable from either a Chinese or an English search',
            'Mapped the set into an interactive sector atlas and a value-chain transect that exposes thin stages at a glance',
            'Read the ecosystem for 7 value-chain gaps, per-sector capital composition, and patent-to-funding mismatches',
            'Designed the B2B delivery layer — briefs, query API, and a grounded RAG console that cites where each answer comes from',
        ],
        zhOutcomes: [
            '從 9 個公開來源爬取並豐富化 230+ 家深科技公司，每家 40+ 維度',
            '建立雙語分類法（中↔英），使一筆紀錄從中文或英文搜尋都找得到',
            '將資料集繪成可互動的產業地圖與價值鏈剖面，一眼看出單薄的階段',
            '讀出 7 個價值鏈缺口、各產業資金組成，以及專利對資金的落差',
            '設計 B2B 交付層——商情卡、查詢 API，以及會標出每個回答依據的 RAG 查詢台',
        ],
        tech: [
            { label: 'Acquisition', val: 'Python, Playwright, per-source adapters, cache fallback, append-only lineage' },
            { label: 'Structure', val: '40+ dimension schema, bilingual ZH↔EN taxonomy, confidence & review state' },
            { label: 'Sources', val: '104, MOPS, TSIA, SEMI.org, ASIP, patents, grants, news, company sites' },
            { label: 'Analysis', val: 'Sector atlas, value-chain transect, gap analysis, investment flow' },
            { label: 'Delivery', val: 'Brief cards, query API, atlas dashboard, grounded RAG console' },
            { label: 'Context', val: 'ITRI/ISTI foundation; sits between the Data Room (02) and Platform (07)' },
        ],
        caseHeroImage: 'data:image/svg+xml;utf8,' + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">'
            + '<rect width="1600" height="900" fill="#0C0E12"/>'
            + '<g stroke="#1B2029" stroke-width="1">'
            + Array.from({ length: 17 }, (_, i) => `<path d="M${120 + i * 80} 90V810"/>`).join('')
            + Array.from({ length: 10 }, (_, i) => `<path d="M120 ${90 + i * 80}H1480"/>`).join('')
            + '</g>'
            + '<g stroke="#E8A33D" stroke-width="1.5" opacity="0.6">'
            + '<path d="M120 90h16M120 90v16M1464 90h16M1480 90v16M120 794v16M120 810h16M1464 810h16M1480 794v16"/></g>'
            + '<text x="132" y="130" fill="#6B7280" font-family="monospace" font-size="20" letter-spacing="4">FIELD ATLAS · TAIWAN DEEP-TECH</text>'
            // sector bubbles: teal=low gap, amber=mid, red=high
            + '<circle cx="419" cy="300" r="56" fill="rgba(53,194,176,0.14)" stroke="#35C2B0" stroke-width="2"/><text x="419" y="308" fill="#F2F0EB" font-family="monospace" font-size="26" text-anchor="middle">45</text>'
            + '<circle cx="800" cy="260" r="66" fill="rgba(232,163,61,0.14)" stroke="#E8A33D" stroke-width="2"/><text x="800" y="270" fill="#F2F0EB" font-family="monospace" font-size="30" text-anchor="middle">62</text>'
            + '<circle cx="1099" cy="348" r="52" fill="rgba(229,103,90,0.14)" stroke="#E5675A" stroke-width="2"/><text x="1099" y="357" fill="#F2F0EB" font-family="monospace" font-size="24" text-anchor="middle">38</text>'
            + '<circle cx="582" cy="452" r="47" fill="rgba(229,103,90,0.14)" stroke="#E5675A" stroke-width="2"/><text x="582" y="460" fill="#F2F0EB" font-family="monospace" font-size="22" text-anchor="middle">29</text>'
            + '<circle cx="963" cy="470" r="54" fill="rgba(232,163,61,0.14)" stroke="#E8A33D" stroke-width="2"/><text x="963" y="479" fill="#F2F0EB" font-family="monospace" font-size="24" text-anchor="middle">41</text>'
            + '<circle cx="1235" cy="500" r="40" fill="rgba(229,103,90,0.14)" stroke="#E5675A" stroke-width="2"/><text x="1235" y="508" fill="#F2F0EB" font-family="monospace" font-size="20" text-anchor="middle">18</text>'
            + '<g stroke="#333A47" stroke-width="1.5" stroke-dasharray="5 5"><path d="M475 300 L734 260M866 260 L1047 348M619 452 L909 470M1017 470 L1195 500"/></g>'
            // value-chain transect
            + '<g>' + [22, 45, 41, 62, 45, 18].map((v, i) => {
                const h = 20 + v * 1.8; const x = 200 + i * 190;
                return `<rect x="${x}" y="${700 - h}" width="60" height="${h}" rx="4" fill="${i === 0 || i === 5 ? '#E5675A' : '#35C2B0'}" opacity="0.85"/>`;
            }).join('') + '</g>'
            + '<path d="M180 730H1420" stroke="#333A47" stroke-width="1.5"/>'
            + '<rect x="200" y="756" width="1050" height="34" rx="8" fill="#14171D" stroke="#333A47"/><text x="220" y="778" fill="#E8A33D" font-family="monospace" font-size="16">▸ ask the atlas: which sectors have the biggest gaps?</text>'
            + '</svg>'),
        caseDeck: {
            eyebrow: 'Intelligence atlas', zhEyebrow: '商情地圖集',
            title: 'From 230+ scraped companies to a queryable market read',
            zhTitle: '從 230+ 家爬取的公司到可查詢的市場判讀',
            body: 'A workspace for reading the ecosystem the way an analyst, an investor, and a policymaker each would — coverage, gaps, capital, and a plain-language way in.',
            zhBody: '一個工作區，用分析師、投資人與政策制定者各自的眼光讀懂生態系——覆蓋、缺口、資金，以及一個白話的入口。',
            kpis: [
                { label: 'Companies', value: '230+', zhLabel: '公司數' },
                { label: 'Sources', value: '9', zhLabel: '來源' },
                { label: 'Value-chain gaps', value: '7', zhLabel: '價值鏈缺口' },
            ],
            signals: ['Crawl', 'Tag', 'Map', 'Gap', 'Capital', 'RAG'],
            zhSignals: ['爬取', '標籤', '製圖', '缺口', '資金', 'RAG'],
        },
        storyMoments: [
            { iconKey: 'database', title: 'Acquire & structure', zhTitle: '擷取與結構化', body: 'Nine public sources, each earning a different kind of evidence, folded into one 40+ dimension record and tagged in both languages.', zhBody: '九個公開來源各換取不同證據，收攏成一筆 40+ 維度的紀錄，並以雙語標籤化。' },
            { iconKey: 'map', title: 'Map & analyze', zhTitle: '製圖與分析', body: 'The set becomes a navigable atlas: sectors sized by count, a value-chain transect, and gaps read from coverage and capital.', zhBody: '資料集變成可導覽的地圖：產業依數量大小、價值鏈剖面，以及讀自覆蓋與資金的缺口。' },
            { iconKey: 'cpu', title: 'Deliver & query', zhTitle: '交付與查詢', body: 'Intelligence reaches a decision as briefs, an API, and a grounded RAG console that cites where each answer comes from.', zhBody: '商情以商情卡、API 與會標出依據的 RAG 查詢台觸及決策。' },
        ],
        storyChapters: [
            { iconKey: 'database', label: 'Acquire', zhLabel: '擷取', title: 'Turn scattered public signals into one record', zhTitle: '把分散的公開訊號變成一筆紀錄', body: 'Crawlers with per-source adapters pull talent, filings, patents, grants, and news; a staging layer keeps provenance; normalisation makes companies comparable; a bilingual tag layer makes them findable from either language.', zhBody: '帶各來源 adapter 的爬蟲擷取人才、財報、專利、補助與新聞；暫存層保留來源溯源；標準化讓公司可比較；雙語標籤層讓它們從任一語言都找得到。', artifact: 'Source atlas', zhArtifact: '來源地圖' },
            { iconKey: 'map', label: 'Map', zhLabel: '製圖', title: 'Make the ecosystem one navigable picture', zhTitle: '把生態系變成一張可導覽的圖', body: 'The atlas places sectors on a field sized by company count and coloured by value-chain gap; a transect re-cuts the same set upstream-to-downstream so a thin stage is visible before a word of analysis.', zhBody: '地圖把產業放在一片場域上，大小依公司數、顏色依價值鏈缺口；剖面把同一集合由上游到下游重切，讓單薄的階段在任何分析之前就看得見。', artifact: 'Sector atlas', zhArtifact: '產業地圖' },
            { iconKey: 'chart', label: 'Analyze', zhLabel: '分析', title: 'Read gaps, capital, patents and grants', zhTitle: '讀出缺口、資金、專利與補助', body: 'Seven value-chain gaps stated with a reason and a data signal; capital composition per sector; a ledger of patent depth, grant routes, and the prevailing business model — the read an investor or policymaker actually needs.', zhBody: '七個價值鏈缺口，各附理由與資料訊號；各產業資金組成；一份專利深度、補助管道與主流商模的帳——投資人或政策制定者真正需要的判讀。', artifact: 'Gap & flow analysis', zhArtifact: '缺口與流向分析' },
            { iconKey: 'cpu', label: 'Deliver', zhLabel: '交付', title: 'Let a decision-maker ask it a question', zhTitle: '讓決策者能向它提問', body: 'The B2B layer names who reads this and the decision they owe, then meets them with briefs, a query API, and a grounded RAG console that answers plain language and cites the records behind every claim.', zhBody: 'B2B 層指明誰在讀、他們該做的決策，再以商情卡、查詢 API 與依據式 RAG 查詢台迎接他們——回答白話、並為每個主張引用背後的紀錄。', artifact: 'RAG console', zhArtifact: 'RAG 查詢台' },
        ],
        pullQuote: 'A market map earns its keep when an analyst, an investor, and a policymaker can each read it from their own angle — and then ask it a question.',
        zhPullQuote: '一張市場地圖真正有價值，是當分析師、投資人與政策制定者各自都能從自己的角度讀懂它——然後能向它提問。',
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
    {
        slug: 'psymatch', num: '08',
        category: 'Psychometrics · Counselling Matching', zhCategory: '心理計量 · 諮商媒合系統',
        title: 'PsyMatch', subtitle: 'Trait-based counselling-matching engine',
        zhTitle: 'PsyMatch 心理諮商媒合引擎', zhSubtitle: '以自陳量表媒合合適的心理師',
        hook: "A self-report intake and a transparent scoring algorithm that recommends a licensed psychologist to fit — issue, orientation, budget, and time — and still lets the person choose freely.",
        zhHook: '一套自陳量表加上一個透明的評分演算法：依議題、取向、預算與時段，推薦合適的合格心理師，並且始終讓使用者自由選擇。',
        stack: ['React', 'FastAPI', 'Python', 'Psychometrics', 'Matching Algorithm', 'SVG Data Viz'],
        role: 'Product Designer & Algorithm Designer', zhRole: '產品設計 / 演算法設計',
        timeline: '2025 – 2026', status: 'Live MVP · self-initiated', zhStatus: '上線 MVP · 自主專案',
        impact: '7-topic intake · 4-criterion transparent match', zhImpact: '七題量表 · 四準則透明媒合',
        overview: "PsyMatch is a counselling-matching platform I designed and built end to end. A person completes a short self-report intake, and an algorithm recommends licensed psychologists whose orientation, fee, availability, and areas of focus fit what the person said they need.\n\nThe design problem sits before the recommendation. Support only works when the fit is right, yet most directories ask people to pick a therapist from a wall of profiles with no structure. I turned that into a measured intake — seven issue topics rated for importance, plus preferences for orientation, budget, and time — and a scoring rule simple enough to read out loud and defend.\n\nThis page opens the whole method as a research report: the instrument, the exact four-criterion algorithm you can operate in §3, the shipped system and its failure paths, a pilot read against pre-set criteria, and where the measurement stops being my responsibility and a licensed professional's begins. PsyMatch is not a diagnostic tool; it profiles needs and routes people to human care.",
        zhOverview: "PsyMatch 是我獨立從頭到尾設計並開發的心理諮商媒合平台。使用者填寫一份簡短的自陳量表，演算法便依據取向、費用、可預約時段與專長，推薦合適的合格心理師。\n\n真正的設計問題發生在推薦之前。心理支持只有在「適配」時才有效，但多數名錄卻要人在一整面缺乏結構的心理師檔案牆前自行挑選。我把這件事轉成一份可量測的量表——七個議題各自評分重要程度，再加上取向、預算與時段的偏好——以及一條簡單到可以唸出來、也守得住的評分規則。\n\n本頁以研究報告的方式攤開整套方法：量表工具、可在 §3 親手操作的四準則演算法、已上線的系統與它的失效路徑、對照事前設定標準的試辦讀數，以及量測責任在哪裡結束、由合格專業人員接手。PsyMatch 並非診斷工具；它描繪需求，並把人導向真人的專業照護。",
        outcomes: [
            'Designed a seven-topic self-report intake (1–7 importance) that builds a needs profile in about eight minutes — framed as profiling, not diagnosis',
            'Ported and can operate the real matching algorithm: a four-criterion additive score (orientation .30, online .20, budget .20, topic-fit .30) ranking licensed psychologists',
            'Built the full request path — React intake → FastAPI scoring → ranked results → booking — and designed its edge cases: skipped items, flat profiles, network failure at submit',
            'Wrote model choice as a costed decision record: rule-based additive scoring chosen over cosine distance and learned ranking, with the cold-start reason stated',
            'Audited my own model for sensitivity and degeneracy, and reported where two orientations are hard to separate rather than hiding it',
            'Set measurement-ethics boundaries: non-clinical positioning, consent and data handling, and a documented handoff to professional care',
        ],
        zhOutcomes: [
            '設計七題自陳量表（重要程度 1–7），約八分鐘建立需求輪廓——定位為需求描繪，而非診斷',
            '移植並能親手操作真實媒合演算法：四準則加總評分（取向 .30、線上 .20、預算 .20、議題吻合 .30）對合格心理師排序',
            '打造完整請求路徑——React 量表 → FastAPI 評分 → 排序結果 → 預約——並設計其邊界情境：跳題、平坦輪廓、送出時斷線',
            '以有成本的決策紀錄書寫模型選擇：規則式加總評分勝過餘弦距離與學習式排序，並說明冷啟動理由',
            '對自己的模型進行敏感度與退化稽核，誠實回報兩種取向難以區分之處，而非隱藏',
            '設定量測倫理邊界：非臨床定位、同意制資料處理，以及有文件紀錄的專業照護交接',
        ],
        tech: [
            { label: 'Frontend', val: 'React 18, multi-step intake, results ranking, hand-rolled SVG profile radar (no chart library)' },
            { label: 'Matching', val: 'Four-criterion additive scoring, deterministic top-N ranking, pure-JS port with unit sanity tests' },
            { label: 'Instrument', val: 'Seven-topic 1–7 self-report intake plus orientation / budget / time preferences' },
            { label: 'Backend', val: 'FastAPI scoring endpoint; selection logged as future training signal' },
            { label: 'Data model', val: 'Therapist records: orientation, specialties, fee range, availability, licence' },
            { label: 'Ethics', val: 'Non-clinical framing, consent-based data handling, licensed-professional handoff' },
        ],
        // Self-drawn SVG cover (no stock photos): the matching bench — an intake
        // profile radar feeding a ranked, score-barred shortlist.
        caseHeroImage: 'data:image/svg+xml;utf8,' + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">'
            + '<rect width="1600" height="900" fill="#0C0E12"/>'
            + '<g stroke="#242A34" stroke-width="1"><path d="M120 150h1360" opacity="0"/></g>'
            + '<rect x="120" y="150" width="560" height="600" rx="16" fill="#14171D" stroke="#262B35"/>'
            + '<rect x="900" y="150" width="580" height="600" rx="16" fill="#14171D" stroke="#262B35"/>'
            + '<text x="152" y="196" fill="#6B7280" font-family="monospace" font-size="20" letter-spacing="3">FIG · INTAKE PROFILE</text>'
            + '<text x="932" y="196" fill="#6B7280" font-family="monospace" font-size="20" letter-spacing="3">RANKED MATCH · TOP 4</text>'
            + '<g fill="none" stroke="#2A303C" stroke-width="2">'
            + '<polygon points="400,270 548,344 588,502 486,632 314,632 212,502 252,344"/>'
            + '<polygon points="400,340 474,377 494,456 443,521 357,521 306,456 326,377"/></g>'
            + '<g stroke="#2A303C" stroke-width="1"><path d="M400,455 L400,270M400,455 L548,344M400,455 L588,502M400,455 L486,632M400,455 L314,632M400,455 L212,502M400,455 L252,344"/></g>'
            + '<polygon points="400,300 470,399 517,482 461,581 365,527 273,484 353,418" fill="rgba(53,194,176,0.16)" stroke="#35C2B0" stroke-width="3"/>'
            + '<g fill="#35C2B0"><circle cx="400" cy="300" r="6"/><circle cx="470" cy="399" r="6"/><circle cx="517" cy="482" r="6"/><circle cx="461" cy="581" r="6"/><circle cx="365" cy="527" r="6"/><circle cx="273" cy="484" r="6"/><circle cx="353" cy="418" r="6"/></g>'
            + '<g stroke="#35C2B0" stroke-width="5" fill="none" stroke-linecap="round"><path d="M700 450 h150"/><path d="M832 434 l22 16 l-22 16"/></g>'
            + '<text x="712" y="432" fill="#35C2B0" font-family="monospace" font-size="18" letter-spacing="2">score</text>'
            + '<g font-family="monospace">'
            // row 1 — top match (teal)
            + '<rect x="936" y="228" width="508" height="112" rx="12" fill="#12241F" stroke="#35C2B0" stroke-width="2"/>'
            + '<circle cx="992" cy="284" r="30" fill="#1C2028" stroke="#35C2B0" stroke-width="2"/>'
            + '<rect x="1040" y="256" width="220" height="16" rx="8" fill="#2A303C"/>'
            + '<rect x="1040" y="286" width="404" height="20" rx="10" fill="#0C0E12" stroke="#232A36"/><rect x="1040" y="286" width="404" height="20" rx="10" fill="#35C2B0"/>'
            + '<circle cx="1416" cy="252" r="9" fill="#E8A33D"/>'
            // row 2
            + '<rect x="936" y="356" width="508" height="112" rx="12" fill="#0C0E12" stroke="#262B35"/>'
            + '<circle cx="992" cy="412" r="30" fill="#1C2028" stroke="#333A47" stroke-width="2"/>'
            + '<rect x="1040" y="384" width="180" height="16" rx="8" fill="#2A303C"/>'
            + '<rect x="1040" y="414" width="404" height="20" rx="10" fill="#0C0E12" stroke="#232A36"/><rect x="1040" y="414" width="300" height="20" rx="10" fill="#35C2B0" opacity="0.55"/>'
            // row 3
            + '<rect x="936" y="484" width="508" height="112" rx="12" fill="#0C0E12" stroke="#262B35"/>'
            + '<circle cx="992" cy="540" r="30" fill="#1C2028" stroke="#333A47" stroke-width="2"/>'
            + '<rect x="1040" y="512" width="150" height="16" rx="8" fill="#2A303C"/>'
            + '<rect x="1040" y="542" width="404" height="20" rx="10" fill="#0C0E12" stroke="#232A36"/><rect x="1040" y="542" width="210" height="20" rx="10" fill="#35C2B0" opacity="0.4"/>'
            // row 4
            + '<rect x="936" y="612" width="508" height="112" rx="12" fill="#0C0E12" stroke="#262B35"/>'
            + '<circle cx="992" cy="668" r="30" fill="#1C2028" stroke="#333A47" stroke-width="2"/>'
            + '<rect x="1040" y="640" width="196" height="16" rx="8" fill="#2A303C"/>'
            + '<rect x="1040" y="670" width="404" height="20" rx="10" fill="#0C0E12" stroke="#232A36"/><rect x="1040" y="670" width="150" height="20" rx="10" fill="#35C2B0" opacity="0.3"/>'
            + '</g>'
            + '</svg>'),
        caseDeck: {
            eyebrow: 'Matching bench', zhEyebrow: '媒合台',
            title: 'From a needs profile to a defensible shortlist',
            zhTitle: '從需求輪廓到可被辯護的推薦名單',
            body: 'A workspace for reading the intake, the four weighted criteria, and the ranked result the way a reviewer would — every point of score accounted for.',
            zhBody: '一個工作區，用審查者的眼光讀懂量表輸入、四個加權準則，以及排序結果——每一分都有交代。',
            kpis: [
                { label: 'Intake topics', value: '7', zhLabel: '量表議題' },
                { label: 'Match criteria', value: '4', zhLabel: '媒合準則' },
                { label: 'Max score', value: '1.00', zhLabel: '滿分' },
            ],
            signals: ['Issue profile', 'Orientation', 'Budget fit', 'Availability', 'Free choice'],
            zhSignals: ['議題輪廓', '治療取向', '預算吻合', '可預約', '自由選擇'],
        },
        storyMoments: [
            { iconKey: 'activity', title: 'The measurement, first', zhTitle: '先量測', body: 'Before any recommendation, the person is measured: seven issue topics rated for importance on a 1–7 scale.', zhBody: '在任何推薦之前，先量測使用者：七個議題各自以 1–7 評分重要程度。' },
            { iconKey: 'target', title: 'The transparent score', zhTitle: '透明的分數', body: 'Four weighted criteria decide the ranking. Nothing is hidden; every added point maps to a stated reason.', zhBody: '四個加權準則決定排序。沒有黑箱；每加一分都對應一個寫明的理由。' },
            { iconKey: 'shield', title: 'Recommendation, not mandate', zhTitle: '推薦而非指派', body: 'The top match is marked, but every option stays open and the person chooses. Their choice is logged as signal.', zhBody: '最佳媒合會被標示，但所有選項都保持開放，由使用者選擇。他們的選擇被記錄為訊號。' },
        ],
        storyChapters: [
            { iconKey: 'activity', label: 'Premise', zhLabel: '前提', title: 'Fit is the product, not the profile wall', zhTitle: '產品是「適配」，不是檔案牆', body: 'The evidence for matching is old and consistent: the working alliance and a client’s own preferences move outcomes more than the brand of therapy. So the design starts by measuring the person, not by decorating a directory.', zhBody: '媒合的證據既老且一致：治療同盟與個案自身的偏好，對療效的影響大於治療的品牌。因此設計從量測使用者開始，而不是把名錄裝飾得更漂亮。', artifact: 'Evidence brief', zhArtifact: '證據摘要' },
            { iconKey: 'layers', label: 'Instrument', zhLabel: '量表', title: 'Turn a questionnaire into a needs profile', zhTitle: '把問卷變成需求輪廓', body: 'Seven issue topics, each rated 1–7 for importance, plus preferences for orientation, budget, and time. One construct per step, a fatigue budget under eight minutes, and a threshold that decides which topics actually drive the match.', zhBody: '七個議題，各以 1–7 評分重要程度，再加上取向、預算與時段的偏好。每步一個構念、疲勞預算控制在八分鐘內，並用一個門檻決定哪些議題真正驅動媒合。', artifact: 'Intake spec', zhArtifact: '量表規格' },
            { iconKey: 'target', label: 'Algorithm', zhLabel: '演算法', title: 'A score you can read out loud', zhTitle: '一個可以唸出來的分數', body: 'Four weighted criteria add to a score out of 1.00, ranked descending. I chose additive rules over cosine distance and learned ranking because there are no users to learn from yet, and because a reviewer must be able to see why a name rose. You can operate the real math in §3.', zhBody: '四個加權準則加總為滿分 1.00 的分數，由高至低排序。我選擇加總規則而非餘弦距離或學習式排序，因為目前還沒有使用者可供學習，也因為審查者必須看得見某個名字為何上升。真實運算可在 §3 親手操作。', artifact: 'Scoring model', zhArtifact: '評分模型' },
            { iconKey: 'monitor', label: 'System', zhLabel: '系統', title: 'Ship the whole path, design the failures', zhTitle: '交付整條路徑，設計失效', body: 'The request path runs from a React intake to a FastAPI scoring endpoint, back to a ranked result and a booking step. The interesting design work is the unhappy paths: skipped items, an all-neutral profile, a dropped connection at submit.', zhBody: '請求路徑從 React 量表到 FastAPI 評分端點，再回到排序結果與預約步驟。真正有意思的設計是不順的路徑：跳題、全中性的輪廓、送出時斷線。', artifact: 'System map', zhArtifact: '系統圖' },
            { iconKey: 'check', label: 'Ethics', zhLabel: '倫理', title: 'Measuring people is an ethical act', zhTitle: '量測人是一種倫理行為', body: 'PsyMatch profiles needs; it does not diagnose. The page states what is stored, what is not, and the boundary where its responsibility ends and a licensed psychologist’s begins — the same care continuum that Emobot+ (project 01) sits at the other end of.', zhBody: 'PsyMatch 描繪需求，並不診斷。本頁寫明儲存什麼、不儲存什麼，以及它的責任在哪裡結束、由合格心理師接手——這條照護連續帶的另一端，正是 Emobot+（專案 01）。', artifact: 'Ethics panel', zhArtifact: '倫理面板' },
        ],
        pullQuote: 'The honest version of a matching product is the one that shows its weights, reports where they fail, and still lets the person overrule it.',
        zhPullQuote: '一個誠實的媒合產品，會攤開它的權重、指出它失準的地方，並且仍然讓使用者可以推翻它。',
        awards: [],
    },
];
export const PROJECT_THEMES = {
    'emobot-plus':                  'emobot',
    'deeptech-database':            'data',
    'ai-product-launch-os':         'ai',
    'ai-news-intelligence':         'ai',
    'ux-hmi-interaction-lab':       'research',
    'semiconductor-map':            'map',
    'startup-intelligence-platform':'platform',
    'psymatch':                     'research',
};
