export const PROJECTS = [
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
        category: 'Data Engineering · Startup Intelligence', zhCategory: '資料工程 · 新創情報',
        title: 'Taiwan Startup Intelligence Data Room', subtitle: 'ITRI Internship Data Product Case',
        zhTitle: '台灣新創情報資料工作室', zhSubtitle: '工研院實習資料產品案例',
        hook: 'A data product case from my ITRI internship: crawlers, evidence-backed company records, bilingual technology tags, and handoff surfaces for maps, analysts, and IEK-style intelligence workflows.',
        zhHook: '一個來自 ITRI 實習的資料產品案例：爬蟲、有來源證據的公司紀錄、雙語技術標籤，以及可交付給地圖、分析師與 IEK 情報流程的資料介面。',
        stack: ['Python', 'Pandas', 'Playwright', 'ETL', 'SQL', 'Taxonomy', 'Data Product'],
        role: 'Data Engineering Intern / Intelligence Workflow Builder', zhRole: '資料工程實習生 / 情報流程建構者',
        timeline: 'ITRI Internship', status: 'Portfolio-safe reconstruction · v9+ dataset', zhStatus: '作品集安全重構 · v9+ 資料集',
        impact: '230+ companies · 40+ dimensions · 9-source pipeline', zhImpact: '230+ 家公司 · 40+ 維度 · 9 類來源管線',
        overview: "At ITRI, I worked on the data layer behind Taiwan startup ecosystem intelligence. The assignment started with crawling and database construction, but the real design problem was broader: how do you make fragmented public company signals useful for analysts, maps, technology classification, and briefing workflows?\n\nI approached the work as a data product. Source adapters captured different kinds of evidence, staging tables preserved provenance, normalization passes made records comparable, and bilingual tags translated Taiwan-specific descriptions into categories an international reader could understand.\n\nThis page reconstructs the work as an interactive portfolio case. It keeps the sensitive company-level records out of view, but shows the operating model: source selection, crawler logic, schema design, taxonomy, quality gates, visualization handoff, and IEK-style intelligence use cases.",
        zhOverview: "在 ITRI 實習期間，我參與的是台灣新創生態系情報背後的資料層。任務從爬蟲與資料庫建立開始，但真正的設計問題更大：如何讓分散的公開公司訊號，能被分析師、產業地圖、技術分類與情報 brief 流程實際使用？\n\n我把這項工作當成資料產品來做。不同來源 adapter 負責擷取不同證據，staging tables 保留來源溯源，標準化流程讓公司紀錄可以互相比較，雙語技術標籤則把台灣在地描述轉成國際讀者也能理解的分類。\n\n本頁以互動作品集形式重構這段成果：不揭露敏感公司級資料，但完整呈現 source selection、crawler logic、schema design、taxonomy、quality gates、visualization handoff 與 IEK 類型情報應用。",
        outcomes: ['Built a public-source crawling and enrichment workflow for 230+ Taiwan startup company records', 'Structured 40+ reusable fields across identity, talent, finance, technology tags, provenance, confidence, and review state', 'Designed bilingual technology tags so Taiwan startup descriptions could be compared across international deep-tech categories', 'Prepared map-ready and query-ready exports for analyst dashboards, startup industry maps, and visualization-agent prototypes', 'Added source-aware quality controls: cache fallback, selector checks, append-only lineage, confidence scoring, and review queues'],
        zhOutcomes: ['建立公開來源爬蟲與資料豐富化流程，支援 230+ 筆台灣新創公司紀錄', '整理 40+ 個可重用欄位，涵蓋公司識別、人才、財務、技術標籤、來源溯源、可信度與審核狀態', '設計雙語技術標籤，讓台灣新創描述能對齊國際 deep-tech 分類進行比較', '準備可製圖、可查詢的資料輸出，支援分析儀表板、新創產業地圖與視覺化 agent 原型', '加入 source-aware 品質控制：快取回退、selector 檢查、附加式 lineage、可信度評分與審核佇列'],
        tech: [{ label: 'Source Acquisition', val: 'Python Playwright, curl_cffi, BeautifulSoup, source-specific crawler adapters' }, { label: 'ETL & Data Store', val: 'Pandas normalization, SQL-ready tables, append-only dataset lineage' }, { label: 'Data Quality', val: 'Source provenance, cache fallback, selector checks, confidence scoring' }, { label: 'Taxonomy', val: 'Bilingual technical tags, sector mapping, value-chain classification' }, { label: 'Handoff Surface', val: 'Map-ready exports, analyst queries, chart-ready aggregation tables' }, { label: 'Applications', val: 'Taiwan startup industry map, IEK intelligence views, briefing-ready evidence blocks' }],
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
export const PROJECT_THEMES = {
    'emobot-plus':                  'emobot',
    'deeptech-database':            'data',
    'ai-product-launch-os':         'ai',
    'ai-news-intelligence':         'ai',
    'ux-hmi-interaction-lab':       'research',
    'semiconductor-map':            'map',
    'startup-intelligence-platform':'platform',
};
