// Verification Layer — single source of copy + data (spec 7.1 / 10).
// Components must not hard-code display strings; everything renderable lives
// here, bilingual (EN primary, 繁中 as parallel copy — not machine-translated).

export const ROLES = [
    { id: 'R1', abbr: 'AIPD', name: { en: 'AI Product Designer',       zh: 'AI 產品設計師' } },
    { id: 'R2', abbr: 'UXR',  name: { en: 'UX Researcher',             zh: 'UX 研究員' } },
    { id: 'R3', abbr: 'PD',   name: { en: 'Product Designer',          zh: '產品設計師' } },
    { id: 'R4', abbr: 'FE',   name: { en: 'Front-End Product Engineer', zh: '前端產品工程師' } },
    { id: 'R5', abbr: 'TPM',  name: { en: 'Technical PM',              zh: '技術產品經理' } },
];
export const ROLE_MAP = Object.fromEntries(ROLES.map(r => [r.id, r]));

export const PHASES = [
    { id: 'DISCOVER', accent: 'var(--vf-teal)',  name: { en: 'Discover', zh: '探索' } },
    { id: 'DEFINE',   accent: 'var(--vf-iris)',  name: { en: 'Define',   zh: '定義' } },
    { id: 'LO-FI',    accent: 'var(--vf-slate)', name: { en: 'Lo-fi',    zh: '低保真' } },
    { id: 'HI-FI',    accent: 'var(--vf-sky)',   name: { en: 'Hi-fi',    zh: '高保真' } },
    { id: 'BUILD',    accent: 'var(--vf-amber)', name: { en: 'Build',    zh: '建構' } },
    { id: 'MEASURE',  accent: 'var(--vf-gold)',  name: { en: 'Measure',  zh: '量測' } },
    { id: 'REFLECT',  accent: 'var(--vf-rose)',  name: { en: 'Reflect',  zh: '反思' } },
];
export const PHASE_MAP = Object.fromEntries(PHASES.map(p => [p.id, p]));

export const BADGES = {
    en: {
        real:         { term: 'Real data',    note: 'From the actual production pipeline or real development history.' },
        simulated:    { term: 'Simulated',    note: 'Method is real; the sample figures are modeled, not measured.' },
        illustrative: { term: 'Illustrative', note: 'A diagram to explain thinking — not a measured dataset.' },
    },
    zh: {
        real:         { term: '真實資料', note: '來自實際運作的 pipeline 或真實開發歷程。' },
        simulated:    { term: '模擬資料', note: '方法為真，示例數字為建模推估、非實測。' },
        illustrative: { term: '示意',     note: '用來說明思路的圖解，非實測資料集。' },
    },
};

export const SHELL = {
    en: {
        eyebrow: 'Verification Layer · 14 evidence modules',
        title: 'That is the product. Here is how it was built.',
        lead: 'The showcase above is the shipped product. This layer is the work behind it — research, architecture, wireflows, engineering, and evaluation — rendered live in React. Filter by the role you are hiring for; each module states plainly what it proves and whether its data is real, simulated, or illustrative.',
        roleFilterLabel: 'Filter by role',
        clearLabel: 'Show all',
        navLabel: 'Jump to phase',
        mutedLabel: 'muted for this role',
        footerLabel: 'What this demonstrates',
        disclaimerLabel: 'Note',
        liveDemo: 'Open live demo',
        meta: ['14 modules', 'live in React', 'keyboard-operable', 'reduced-motion aware'],
    },
    zh: {
        eyebrow: '驗證層 · 14 個證據模組',
        title: '那是產品，這是它背後的工。',
        lead: '上方展示的是已上線的產品，這一層則是它背後的工——研究、架構、線稿流程、工程與評估，全由 React 即時渲染。可依你要招募的職務篩選；每個模組都明講它想證明什麼，以及資料屬於真實、模擬或示意。',
        roleFilterLabel: '依職務篩選',
        clearLabel: '顯示全部',
        navLabel: '跳至階段',
        mutedLabel: '此職務下淡化',
        footerLabel: '這證明了什麼',
        disclaimerLabel: '註',
        liveDemo: '開啟線上實機',
        meta: ['14 個模組', 'React 即時渲染', '鍵盤可操作', '尊重減少動態'],
    },
};

export const LIVE_DEMO_URL = 'https://itri-startup-platform.vercel.app/';

// ---- module registry: nav labels + phase mapping ------------------------
export const MODULE_LIST = [
    { id: 'vf-d1', key: 'D1', phase: 'DISCOVER', short: { en: 'Research Ops',       zh: '研究總覽' } },
    { id: 'vf-d2', key: 'D2', phase: 'DISCOVER', short: { en: 'Competitive Teardown', zh: '競品解剖' } },
    { id: 'vf-d3', key: 'D3', phase: 'DISCOVER', short: { en: 'Data Landscape',     zh: '資料源盤點' } },
    { id: 'vf-e1', key: 'E1', phase: 'DEFINE',   short: { en: 'Object Model',       zh: '物件模型' } },
    { id: 'vf-e2', key: 'E2', phase: 'DEFINE',   short: { en: 'Killed Concepts',    zh: '淘汰方向' } },
    { id: 'vf-l1', key: 'L1', phase: 'LO-FI',    short: { en: 'Wireflows',          zh: '線稿流程' } },
    { id: 'vf-h2', key: 'H2', phase: 'HI-FI',    short: { en: 'Micro-interactions', zh: '微互動' } },
    { id: 'vf-h3', key: 'H3', phase: 'HI-FI',    short: { en: 'Opportunity Terrain', zh: '機會地形' } },
    { id: 'vf-b1', key: 'B1', phase: 'BUILD',    short: { en: 'Pipeline',           zh: '系統架構' } },
    { id: 'vf-b2', key: 'B2', phase: 'BUILD',    short: { en: 'Entity Resolution',  zh: '實體解析' } },
    { id: 'vf-b3', key: 'B3', phase: 'BUILD',    short: { en: 'Quality Board',      zh: '品質看板' } },
    { id: 'vf-m1', key: 'M1', phase: 'MEASURE',  short: { en: 'Usability Evidence', zh: '易用性證據' } },
    { id: 'vf-f1', key: 'F1', phase: 'REFLECT',  short: { en: 'Ship Log',           zh: '版本時間軸' } },
    { id: 'vf-f2', key: 'F2', phase: 'REFLECT',  short: { en: 'Retrospective',      zh: '誠實回顧' } },
];

// ---- per-module meta + copy + body data ---------------------------------
export const MODULES = {

    // ===== DISCOVER =====
    D1: {
        code: 'D1', phase: 'DISCOVER', roles: ['R2', 'R1'], tier: 'simulated',
        en: {
            title: 'Research operations, planned like an engagement',
            lead: 'How I would frame discovery for a market-intelligence tool: the questions, the methods, and how loose signals become a synthesized point of view.',
            foot: 'Demonstrates research planning, synthesis discipline, and the ability to turn raw signals into product direction.',
            disclaimer: 'Methodology shown with simulated participant data.',
            planLabel: 'Research plan', questionsLabel: 'Guiding questions', methodsLabel: 'Methods', sampleLabel: 'Sample frame',
            questions: [
                'How do users decide an opportunity is worth pursuing?',
                'What makes someone trust a grant listing or a market report enough to act on it?',
                'Where does hunting across scattered portals quietly eat the most time?',
            ],
            methods: [
                { name: 'Semi-structured interview', desc: 'Open questions, followed where each answer leads.' },
                { name: 'Contextual inquiry',        desc: 'Watch the real spreadsheet-and-tabs workflow, in place.' },
                { name: 'Diary study',               desc: 'One week of logging every source switch and why.' },
            ],
            sample: [
                { role: 'ITRI scouts',       n: 4 },
                { role: 'VC analysts',       n: 3 },
                { role: 'Policy researchers', n: 2 },
            ],
            wallLabel: 'Affinity wall', wallHint: 'Raw notes, scattered. Cluster them.', clusterBtn: 'Cluster', resetBtn: 'Scatter',
            clusters: [
                { id: 'trust',   name: 'Data trust',            insight: 'Trust is per-field, not per-source — people believe an address but doubt the headcount from the same record.' },
                { id: 'target',  name: 'Opportunity discovery',  insight: 'Finding the right opportunity is a naming and taxonomy problem before it is a filtering problem.' },
                { id: 'reconcile', name: 'Cross-source reconciliation', insight: 'Everyone keeps a private mapping of "which name is really which company" in their head.' },
                { id: 'timely',  name: 'Timeliness anxiety',    insight: 'Stale data is not just wrong — it quietly erodes confidence in everything next to it.' },
            ],
            notes: [
                { c: 'trust', t: '"I trust the capital figure more than the employee count."' },
                { c: 'trust', t: 'Checks two sources before citing a number in a memo.' },
                { c: 'trust', t: 'A single wrong field discredits the whole row.' },
                { c: 'trust', t: 'Wants to see where each number came from.' },
                { c: 'target', t: 'Same firm, four different English spellings.' },
                { c: 'target', t: 'Searches by chairman name when the company name fails.' },
                { c: 'target', t: 'Subsidiaries and parents blur together.' },
                { c: 'target', t: 'Abbreviations differ across every database.' },
                { c: 'reconcile', t: 'Keeps a personal spreadsheet of name aliases.' },
                { c: 'reconcile', t: 'Copies IDs between two tabs by hand.' },
                { c: 'reconcile', t: '"I already know these two rows are the same company."' },
                { c: 'reconcile', t: 'Re-does the same merge every quarter.' },
                { c: 'timely', t: 'Assumes anything older than a quarter is suspect.' },
                { c: 'timely', t: 'Refreshes manually before every meeting.' },
                { c: 'timely', t: 'No way to tell when a field was last updated.' },
                { c: 'timely', t: 'One stale row makes them re-check the rest.' },
            ],
            personaLabel: 'Personas · Jobs to be done',
            personas: [
                {
                    name: 'The scout', role: 'ITRI opportunity scout',
                    when: 'scanning for opportunities worth surfacing to a client company',
                    want: 'to judge each one’s fit and deadline at a glance',
                    so: 'I can shortlist without opening a dozen government sites',
                    pains: ['Grants scattered across dozens of portals', 'No single view of what closes when'],
                    outcomes: ['A ranked shortlist I can hand over', 'Deadlines I can trust before I invest attention'],
                },
                {
                    name: 'The strategist', role: 'Enterprise strategy lead',
                    when: 'building the case to pursue a market or a partner',
                    want: 'to line up the market picture and the open opportunities together',
                    so: 'I can brief leadership without stitching ten tabs',
                    pains: ['Market data and opportunities live apart', 'Figures arrive without provenance'],
                    outcomes: ['One place that connects market to opportunity', 'Every figure traceable to a source'],
                },
                {
                    name: 'The researcher', role: 'Policy / market researcher',
                    when: 'tracking a sector’s momentum over time',
                    want: 'to trust that yesterday’s pull still matches today’s',
                    so: 'I can report a trend, not a data artifact',
                    pains: ['Schema drift breaks longitudinal work', 'Taxonomy churn double-counts domains'],
                    outcomes: ['Stable categories across refreshes', 'Trends I can attribute to the market, not the pipeline'],
                },
            ],
        },
        zh: {
            title: '像做案子一樣規劃研究',
            lead: '為一套市場情報工具規劃探索階段：要問的問題、採用的方法，以及零散訊號如何被收斂成一個明確觀點。',
            foot: '證明研究規劃、收斂的紀律，以及把原始訊號轉為產品方向的能力。',
            disclaimer: '研究方法為真，受測資料為模擬示意。',
            planLabel: '研究計畫', questionsLabel: '核心問題', methodsLabel: '方法', sampleLabel: '樣本框架',
            questions: [
                '使用者如何判斷一則機會值不值得投入？',
                '什麼情況會讓人願意信任一則補助或一份市場報告、進而採取行動？',
                '在零散的入口網站間翻找，到底在哪裡默默吃掉最多時間？',
            ],
            methods: [
                { name: '半結構訪談', desc: '開放式提問，順著每個回答往下追。' },
                { name: '情境訪查',   desc: '在現場觀察真實的試算表與分頁工作流。' },
                { name: '日誌研究',   desc: '記錄一週內每次切換來源的動作與原因。' },
            ],
            sample: [
                { role: '工研院探勘員', n: 4 },
                { role: '創投分析師',   n: 3 },
                { role: '政策研究員',   n: 2 },
            ],
            wallLabel: '親和圖牆', wallHint: '零散的原始便利貼，把它們分群。', clusterBtn: '分群', resetBtn: '打散',
            clusters: [
                { id: 'trust',   name: '資料信任',   insight: '信任是逐欄位的、不是逐來源的——同一筆資料裡，人們相信地址卻懷疑員工數。' },
                { id: 'target',  name: '機會擷取',   insight: '找到對的機會，先是命名與分類問題，才是篩選問題。' },
                { id: 'reconcile', name: '跨源比對', insight: '每個人腦中都有一份「哪個名字其實是哪家公司」的私人對照表。' },
                { id: 'timely',  name: '時效焦慮',   insight: '過期資料不只是錯——它會默默侵蝕旁邊每一欄的可信度。' },
            ],
            notes: [
                { c: 'trust', t: '「資本額我比員工數更信。」' },
                { c: 'trust', t: '寫進備忘錄前會先核對兩個來源。' },
                { c: 'trust', t: '一個欄位錯，整列都失信。' },
                { c: 'trust', t: '想看到每個數字的出處。' },
                { c: 'target', t: '同一家公司，四種英文寫法。' },
                { c: 'target', t: '公司名查不到時改用董事長名查。' },
                { c: 'target', t: '母子公司常常糊在一起。' },
                { c: 'target', t: '每個資料庫的簡稱都不一樣。' },
                { c: 'reconcile', t: '自己維護一份名稱別名對照表。' },
                { c: 'reconcile', t: '手動在兩個分頁間複製 ID。' },
                { c: 'reconcile', t: '「我早就知道這兩列是同一家。」' },
                { c: 'reconcile', t: '每季重做同一份合併。' },
                { c: 'timely', t: '超過一季的資料一律先存疑。' },
                { c: 'timely', t: '每次開會前手動重整一次。' },
                { c: 'timely', t: '看不出欄位上次更新是什麼時候。' },
                { c: 'timely', t: '一列過期，就得重查其餘所有列。' },
            ],
            personaLabel: '人物誌 · 待辦任務',
            personas: [
                {
                    name: '探勘員', role: '工研院機會探勘員',
                    when: '搜尋值得推薦給客戶企業的機會',
                    want: '一眼判斷每則機會的適配度與截止日',
                    so: '不必開十幾個政府網站就能列出短名單',
                    pains: ['補助散落在數十個入口', '沒有單一視圖看清什麼何時截止'],
                    outcomes: ['一份可以直接交出去的排序短名單', '投入注意力前先有可信的截止日'],
                },
                {
                    name: '策略主管', role: '企業策略負責人',
                    when: '建立進軍某市場或尋找夥伴的論述',
                    want: '把市場全貌與開放中的機會並列在一起',
                    so: '向高層簡報時不必拼湊十個分頁',
                    pains: ['市場資料與機會各自分開', '數字到手卻沒有出處'],
                    outcomes: ['一處把市場連到機會', '每個數字都能回溯到來源'],
                },
                {
                    name: '研究員', role: '政策／市場研究員',
                    when: '追蹤某個領域一段時間的動能',
                    want: '相信昨天拉的資料今天仍然對得上',
                    so: '報告的是趨勢，而不是資料假象',
                    pains: ['Schema 飄移破壞縱貫研究', '分類變動導致重複計算領域'],
                    outcomes: ['跨次更新仍穩定的分類', '能歸因於市場、而非 pipeline 的趨勢'],
                },
            ],
        },
    },

    D2: {
        code: 'D2', phase: 'DISCOVER', roles: ['R2', 'R5', 'R3'], tier: 'illustrative',
        competitors: ['Crunchbase', 'PitchBook', 'Gov portals', 'FINDIT', 'This platform'],
        // capability rows; grid values 3=strong 2=mid 1=weak, columns match competitors
        capabilities: [
            { id: 'tw',    grid: [1, 1, 2, 2, 3] },
            { id: 'agg',   grid: [2, 2, 1, 2, 3] },
            { id: 'struct', grid: [3, 3, 1, 2, 3] },
            { id: 'cjk',   grid: [1, 1, 3, 2, 3] },
            { id: 'price', grid: [1, 1, 3, 2, 3] },
            { id: 'gov',   grid: [1, 1, 3, 1, 3] },
            { id: 'viz',   grid: [3, 3, 1, 2, 2] },
            { id: 'api',   grid: [3, 3, 1, 1, 1] },
        ],
        levels: { en: { 3: 'Strong', 2: 'Partial', 1: 'Weak' }, zh: { 3: '強', 2: '中', 1: '弱' } },
        en: {
            title: 'Competitive teardown, by capability',
            lead: 'Eight capabilities that matter for a Taiwan opportunity-intelligence tool, scored against global databases and the scattered status quo — and where the gap becomes a reason to build.',
            foot: 'Demonstrates market analysis and the strategic judgment behind product positioning.',
            capLabel: 'Capability', legendStrong: 'Strong', legendMid: 'Partial', legendWeak: 'Weak',
            capNames: {
                tw: 'Taiwan opportunity coverage', agg: 'Cross-source aggregation', struct: 'Structured & comparable',
                cjk: 'Chinese-language sources', price: 'Free / accessible', gov: 'Government grant coverage',
                viz: 'Visual analysis', api: 'Open API',
            },
            gapLabel: 'Positioning gap',
            gap: 'Global databases index the world but skip Taiwan’s grants and collaboration briefs; the government portals hold that data but scatter it across dozens of sites in prose, not comparable structure. The seam — Taiwan opportunities, aggregated and made comparable in one place — is where this platform stands.',
            sourceLabel: 'Source',
            source: 'Assessed from public product pages, documentation, and free-tier walkthroughs. A desk teardown, not an audit — scored as a designer sizing a gap, not a benchmark lab.',
            asOf: 'Assessment · 2024 Q4',
        },
        zh: {
            title: '以能力為軸的競品解剖',
            lead: '對一套台灣機會情報工具而言重要的八項能力，對照全球資料庫與零散的現況評分——並指出「缺口」在哪裡變成自建的理由。',
            foot: '證明市場分析，以及產品定位背後的策略判斷。',
            capLabel: '能力', legendStrong: '強', legendMid: '中', legendWeak: '弱',
            capNames: {
                tw: '台灣機會覆蓋', agg: '跨來源彙整', struct: '結構化且可比較',
                cjk: '中文來源', price: '免費／可近', gov: '政府補助覆蓋',
                viz: '視覺化分析', api: '開放 API',
            },
            gapLabel: '定位缺口',
            gap: '全球資料庫索引了世界，卻略過台灣的補助與合作徵求；政府入口握有這些資料，卻散落在數十個網站、以散文而非可比較的結構呈現。那道縫——把台灣的機會彙整、並在同一處變得可比較——正是本平台的立足點。',
            sourceLabel: '資料來源',
            source: '依公開產品頁、文件與免費方案實測評估。這是桌面解剖、不是稽核——以設計者估量缺口的角度評分，而非基準測試實驗室。',
            asOf: '評估 · 2024 Q4',
        },
    },

    D3: {
        code: 'D3', phase: 'DISCOVER', roles: ['R5', 'R4', 'R1'], tier: 'real',
        sources: [
            { id: 's1', tier: 'gov' }, { id: 's2', tier: 'gov' }, { id: 's3', tier: 'gov' },
            { id: 's4', tier: 'gov' }, { id: 's5', tier: 'gov' }, { id: 's6', tier: 'gov' },
            { id: 's7', tier: 'niche' }, { id: 's8', tier: 'niche' }, { id: 's9', tier: 'niche' },
        ],
        // radial audit: completeness / freshness / consistency, 0..100 (illustrative reads of real sources)
        quality: [
            { id: 'completeness', v: 74 },
            { id: 'freshness',    v: 61 },
            { id: 'consistency',  v: 48 },
        ],
        en: {
            title: 'Data-source landscape, audited',
            lead: 'Nine sources feed the platform — grant portals, market reports, investment records, and collaboration listings. Before designing a single screen, I mapped what each gives, how often, and where it breaks.',
            foot: 'Demonstrates the ability to audit messy real-world data and frame an engineering problem before designing the interface.',
            sourceNames: {
                s1: 'SBIR grant portal', s2: 'SIIR grant portal', s3: 'U-start (youth grants)',
                s4: 'Regional SBIR (city-level)', s5: 'Government procurement', s6: 'National Development Fund',
                s7: 'FINDIT / startup database', s8: 'Industry market reports', s9: 'Cross-border collaboration briefs',
            },
            typeLabel: 'Type', freqLabel: 'Refresh', defectLabel: 'Known defect',
            typeGov: 'Government portal', typeNiche: 'Niche source',
            rows: {
                s1: { fields: 'Programs, amounts, deadlines', freq: 'Daily', defect: 'Deadline formats vary' },
                s2: { fields: 'Service-innovation grants',    freq: 'Weekly', defect: 'Rolling vs. fixed intake' },
                s3: { fields: 'Campus startup grants',        freq: 'Monthly', defect: 'Phase amounts inconsistent' },
                s4: { fields: 'City-level grant programs',    freq: 'Weekly', defect: 'Each city, its own schema' },
                s5: { fields: 'Tenders, award amounts',       freq: 'Daily', defect: 'Vendor name ≠ registry name' },
                s6: { fields: 'Investment statistics',        freq: 'Quarterly', defect: 'Aggregated, not per-deal' },
                s7: { fields: 'Startup roster, funding stage', freq: 'Weekly', defect: 'Free-text, inconsistent' },
                s8: { fields: 'Sector reports, figures',      freq: 'Ad hoc', defect: 'Prose, not structured data' },
                s9: { fields: 'Company needs, specs',         freq: 'Weekly', defect: 'Company names vary widely' },
            },
            problemLabel: 'The core problem',
            problemTitle: 'Every source speaks a dialect',
            problem: 'A grant, a domain, a company — each is named and formatted differently in every source. Normalizing them into one comparable schema, so opportunities line up side by side, is the technical spine of the aggregation layer.',
            variantsCaption: 'One application domain, as written across sources:',
            variants: ['電資通光', 'ICT', '資通訊', 'Electronics & ICT', '電子資訊', 'Info & Comms'],
            qualityLabel: 'Quality dimensions',
            qNames: { completeness: 'Completeness', freshness: 'Freshness', consistency: 'Consistency' },
            qNote: 'Bars are my working read of the merged corpus, not a certified metric.',
        },
        zh: {
            title: '盤點過的資料源地景',
            lead: '九個來源餵養這個平台——補助入口、市場報告、投資紀錄與合作徵求。在畫任何一張畫面之前，我先盤點了每個來源給什麼、多久一次、以及哪裡會壞。',
            foot: '證明盤點凌亂真實資料、並在設計介面前先界定工程問題的能力。',
            sourceNames: {
                s1: 'SBIR 補助入口', s2: 'SIIR 補助入口', s3: 'U-start 青年創業',
                s4: '地方型 SBIR（縣市）', s5: '政府採購網', s6: '國發基金',
                s7: 'FINDIT／新創資料庫', s8: '產業市場報告', s9: '跨境合作徵求',
            },
            typeLabel: '型態', freqLabel: '更新', defectLabel: '已知缺陷',
            typeGov: '政府入口', typeNiche: '獨特來源',
            rows: {
                s1: { fields: '計畫、金額、截止', freq: '每日', defect: '截止日格式不一' },
                s2: { fields: '服務創新補助', freq: '每週', defect: '隨到隨審 vs 定期受理' },
                s3: { fields: '校園創業補助', freq: '每月', defect: '各階段金額不一致' },
                s4: { fields: '縣市層級補助計畫', freq: '每週', defect: '各縣市各自的結構' },
                s5: { fields: '標案、得標金額', freq: '每日', defect: '廠商名 ≠ 登記名' },
                s6: { fields: '投資統計', freq: '每季', defect: '彙總數、非逐案' },
                s7: { fields: '新創名錄、募資階段', freq: '每週', defect: '自由文字、不一致' },
                s8: { fields: '產業報告、數據', freq: '不定期', defect: '散文、非結構化' },
                s9: { fields: '公司需求、規格', freq: '每週', defect: '公司名稱寫法各異' },
            },
            problemLabel: '核心問題',
            problemTitle: '每個來源各說各話',
            problem: '一項補助、一個領域、一家公司——在每個來源裡的命名與格式都不同。把它們正規化成同一套可比較的結構，讓機會能並排對齊，是這個彙整層的技術脊梁。',
            variantsCaption: '同一個應用領域，跨來源的寫法：',
            variants: ['電資通光', 'ICT', '資通訊', 'Electronics & ICT', '電子資訊', 'Info & Comms'],
            qualityLabel: '品質維度',
            qNames: { completeness: '完整度', freshness: '新鮮度', consistency: '一致性' },
            qNote: '長條是我對合併語料的工作判讀，非經認證的指標。',
        },
    },

    // ===== DEFINE =====
    E1: {
        code: 'E1', phase: 'DEFINE', roles: ['R3', 'R4'], tier: 'real',
        entities: [
            { id: 'opportunity', attrs: ['title', 'domain', 'deadline', 'company_id'], x: 50, y: 20 },
            { id: 'company',     attrs: ['name', 'sector', 'location', 'size'], x: 16, y: 55 },
            { id: 'domain',      attrs: ['name', 'count', 'share'], x: 84, y: 46 },
            { id: 'report',      attrs: ['sector', 'published_at', 'sources[]'], x: 30, y: 88 },
            { id: 'source',      attrs: ['name', 'type', 'cadence'], x: 74, y: 86 },
        ],
        // relationships as [from, to, label-key]
        links: [
            ['opportunity', 'company', 'posted'],
            ['opportunity', 'domain', 'tagged'],
            ['report', 'domain', 'covers'],
            ['company', 'source', 'from'],
            ['report', 'source', 'cites'],
        ],
        sitemap: [
            { id: 'dashboard', children: ['kpis', 'domains', 'investors'] },
            { id: 'market',    children: ['by-sector', 'report'] },
            { id: 'subsidy',   children: ['by-topic', 'by-deadline'] },
            { id: 'collab',    children: ['briefs', 'company'] },
        ],
        en: {
            title: 'Objects before pages',
            lead: 'The information architecture as an object model, not a screen list. Hover an entity to see what connects to what.',
            foot: 'Demonstrates systematic IA thinking — the skeleton hiring managers rarely get to see.',
            objectLabel: 'Object model', attrsLabel: 'attributes', hoverHint: 'Hover or focus an entity to trace its relationships.',
            entityNames: { opportunity: 'Opportunity', company: 'Company', domain: 'Domain', report: 'Report', source: 'Source' },
            linkLabels: { posted: 'posted by', tagged: 'tagged', covers: 'covers', from: 'comes from', cites: 'cites' },
            sitemapLabel: 'Page hierarchy',
            sitemapNames: {
                dashboard: 'Dashboard', market: 'Market strategy', subsidy: 'Grants', collab: 'Collaboration',
                kpis: 'KPIs', domains: 'Domain mix', investors: 'Investors', 'by-sector': 'By sector',
                report: 'Report detail', 'by-topic': 'By topic', 'by-deadline': 'By deadline',
                briefs: 'Briefs', company: 'Company profile',
            },
            principleLabel: 'Principle',
            principle: 'Define the objects, then design the pages. When the object model is right, the screens almost lay themselves out — and stay consistent as the product grows.',
        },
        zh: {
            title: '先有物件，再有頁面',
            lead: '把資訊架構當成物件模型、而不是畫面清單。將滑鼠移到某個實體上，看它與誰相連。',
            foot: '證明系統化的 IA 思考——這是招募者很少有機會看到的骨架。',
            objectLabel: '物件模型', attrsLabel: '屬性', hoverHint: '將滑鼠移到（或聚焦）某個實體，追蹤它的關聯。',
            entityNames: { opportunity: '合作機會', company: '公司', domain: '應用領域', report: '市場報告', source: '來源' },
            linkLabels: { posted: '刊登自', tagged: '標記', covers: '涵蓋', from: '來自', cites: '引用' },
            sitemapLabel: '頁面層級',
            sitemapNames: {
                dashboard: '儀表板', market: '市場策略', subsidy: '補助', collab: '合作',
                kpis: '關鍵指標', domains: '領域分布', investors: '投資人', 'by-sector': '依領域',
                report: '報告內文', 'by-topic': '依主題', 'by-deadline': '依截止',
                briefs: '機會列表', company: '公司檔案',
            },
            principleLabel: '原則',
            principle: '先定義物件，再設計頁面。物件模型對了，畫面幾乎會自己排好——而且在產品長大時仍保持一致。',
        },
    },

    E2: {
        code: 'E2', phase: 'DEFINE', roles: ['R3', 'R1', 'R5'], tier: 'real',
        concepts: [
            { id: 'map',   layout: 'map' },
            { id: 'feed',  layout: 'feed' },
            { id: 'graph', layout: 'graph' },
            { id: 'search', layout: 'search', chosen: true },
        ],
        en: {
            title: 'Three directions I killed',
            lead: 'Before the current design, three other concepts got built far enough to fail. Showing the rejects — and why — is the point.',
            foot: 'Demonstrates decision discipline — showing rejected work and the reasoning is a hallmark of senior practice.',
            diedLabel: 'Why it died', survivedLabel: 'What survived', chosenTag: 'Shipped',
            conceptNames: { map: 'Sector-map first', feed: 'Feed-first', graph: 'Graph-first', search: 'Dashboard-first, sectioned by job' },
            conceptTag: { map: 'Concept A', feed: 'Concept B', graph: 'Concept C', search: 'Final' },
            concepts: {
                map: {
                    died: 'An industry map as the home page looked impressive but answered no real question — users wanted opportunities, not geography.',
                    survived: 'The domain breakdown survived as the dashboard treemap, a summary panel rather than the front door.',
                },
                feed: {
                    died: 'One activity stream had no structure — nobody could separate grants from market reports from collaboration briefs.',
                    survived: 'The chronological view lives on as the "latest updates" strip on the overview, one panel among several.',
                },
                graph: {
                    died: 'A company-relationship graph as the entry point put too much cognitive load on first-time ITRI users.',
                    survived: 'Company relationships moved into the collaboration briefs, surfaced only when a user opens one.',
                },
                search: {
                    reason: 'Users arrive with a job — find a grant, scan a market, respond to an opportunity — not a company name. So the home is an overview that fans out into six task-shaped sections.',
                },
            },
        },
        zh: {
            title: '我淘汰掉的三個方向',
            lead: '在現在這版設計之前，另外三個概念都做到足以失敗的程度。把被淘汰的方案——連同原因——攤開來，正是重點。',
            foot: '證明決策的紀律——把被否決的作品與理由拿出來，是資深工作者的標記。',
            diedLabel: '淘汰原因', survivedLabel: '留下了什麼', chosenTag: '已上線',
            conceptNames: { map: '領域地圖優先', feed: '訊息流優先', graph: '關係圖優先', search: '儀表板優先，依任務分區' },
            conceptTag: { map: '概念 A', feed: '概念 B', graph: '概念 C', search: '最終版' },
            concepts: {
                map: {
                    died: '把產業地圖當首頁看起來很唬人，卻回答不了任何真實問題——使用者要的是機會，不是地理。',
                    survived: '領域分布保留下來，成為儀表板上的樹狀圖，是摘要面板、而非入口。',
                },
                feed: {
                    died: '單一活動流沒有結構——沒人分得清補助、市場報告和合作徵求。',
                    survived: '時間序視圖留在總覽的「最新動態」條上，只是眾多面板之一。',
                },
                graph: {
                    died: '把公司關係圖當入口，對首次使用的工研院使用者認知負荷太高。',
                    survived: '公司關係移到合作機會詳述裡，只在使用者打開某則時才浮現。',
                },
                search: {
                    reason: '使用者帶著任務而來——找補助、看市場、回應機會——而不是公司名。所以首頁是一張總覽，向外展開成六個任務導向的分區。',
                },
            },
        },
    },

    // ===== LO-FI =====
    L1: {
        code: 'L1', phase: 'LO-FI', roles: ['R3', 'R2'], tier: 'real',
        flows: [
            { id: 'f1', frames: ['search', 'filter', 'results', 'track'] },
            { id: 'f2', frames: ['company', 'sources', 'confidence'] },
            { id: 'f3', frames: ['multiselect', 'compare', 'export'] },
        ],
        en: {
            title: 'Wireflows at the fidelity that decides structure',
            lead: 'Three key task flows, drawn as hand-style wireframes. Low fidelity on purpose — this is where structure gets decided, before pixels can distract.',
            foot: 'Demonstrates task-flow thinking at the fidelity where structural decisions are actually made.',
            annotToggle: 'Annotations', flowLabel: 'Task flow',
            flowNames: {
                f1: 'Find a relevant grant', f2: 'Read a market report', f3: 'Respond to a collaboration brief',
            },
            frameNames: {
                search: 'Search', filter: 'Filter', results: 'Results', track: 'Save to apply',
                company: 'Open report', sources: 'Scan highlights', confidence: 'Strategy take',
                multiselect: 'Browse briefs', compare: 'Open a brief', export: 'Contact / apply',
            },
            triggers: {
                search: 'types a topic or sector', filter: 'narrows by deadline + topic', results: 'scans matching grants',
                track: 'saves to apply later', company: 'opens a sector report', sources: 'scans the highlights',
                confidence: 'reads the strategy take', multiselect: 'browses open opportunities', compare: 'opens a company brief',
                export: 'reaches out to the poster',
            },
            annots: {
                f1: 'Deadline is a first-class filter — a grant you can’t apply to in time is noise.',
                f2: 'A report is long-form; the flow makes the summary and the strategy take reachable in two taps.',
                f3: 'A collaboration brief leads with the company profile, so a reader can qualify it before reading specs.',
            },
        },
        zh: {
            title: '在決定結構的保真度上畫流程',
            lead: '三條關鍵任務流程，以手繪風線框呈現。刻意低保真——結構在這裡定案，趁像素還來不及分散注意力。',
            foot: '在真正做出結構決策的保真度上，展現任務流程思考。',
            annotToggle: '註記', flowLabel: '任務流程',
            flowNames: {
                f1: '找到一項相關補助', f2: '讀一份市場報告', f3: '回應一則合作徵求',
            },
            frameNames: {
                search: '搜尋', filter: '篩選', results: '結果', track: '存起來申請',
                company: '開啟報告', sources: '掃視亮點', confidence: '策略建議',
                multiselect: '瀏覽機會', compare: '開啟一則', export: '聯繫／申請',
            },
            triggers: {
                search: '輸入主題或領域', filter: '依截止＋主題收斂', results: '掃視符合的補助',
                track: '存起來稍後申請', company: '開啟一份產業報告', sources: '掃視觀察亮點',
                confidence: '讀策略建議', multiselect: '瀏覽開放中的機會', compare: '開啟一則公司徵求',
                export: '聯繫刊登方',
            },
            annots: {
                f1: '截止日是第一級篩選條件——來不及申請的補助就是雜訊。',
                f2: '報告是長篇；此流程讓摘要與策略建議兩下就到得了。',
                f3: '合作徵求以公司檔案開頭，讓讀者在看規格前先判斷是否合適。',
            },
        },
    },

    // ===== HI-FI =====
    H2: {
        code: 'H2', phase: 'HI-FI', roles: ['R4', 'R3'], tier: 'real',
        samples: [
            { id: 'badge',   dur: 260, ease: 'cubic-bezier(0.22,1,0.36,1)' },
            { id: 'skeleton', dur: 900, ease: 'ease-in-out' },
            { id: 'count',   dur: 520, ease: 'cubic-bezier(0.16,1,0.3,1)' },
            { id: 'save',    dur: 420, ease: 'cubic-bezier(0.34,1.56,0.64,1)' },
        ],
        en: {
            title: 'Micro-interaction lab',
            lead: 'Four interactions with the spec behind them. Every transition has a duration, an easing curve, and a reason — press Replay to run each one.',
            foot: 'Demonstrates that motion is specified, not improvised — duration, easing, and purpose for every transition.',
            replay: 'Replay', propLabel: 'Property', durLabel: 'Duration', easeLabel: 'Easing', whyLabel: 'Rationale',
            reducedNote: 'Reduced motion is on — samples show their end state; Replay is disabled.',
            sampleNames: {
                badge: 'Metric card reveal', skeleton: 'Skeleton load', count: 'Filter count-up', save: 'Save an opportunity',
            },
            sampleDesc: {
                badge: 'Hover reveals what a headline KPI counts.',
                skeleton: 'An opportunity card resolves from skeleton to content.',
                count: 'The result count animates as filters change.',
                save: 'Saving morphs the icon and fires a single confirm.',
            },
            specs: {
                badge: { prop: 'height, opacity', why: 'Fast enough to feel instant, slow enough to read the reveal.' },
                skeleton: { prop: 'opacity (loop)', why: 'A calm pulse signals loading without demanding attention.' },
                count: { prop: 'transform, number', why: 'Motion confirms the filter took effect.' },
                save: { prop: 'transform, color', why: 'A slight overshoot rewards the commit, once.' },
            },
        },
        zh: {
            title: '微互動實驗室',
            lead: '四個帶著規格的互動。每次轉場都有時長、緩動曲線與理由——按「重播」逐一執行。',
            foot: '證明動態是被規格化的、不是即興的——每次轉場都有時長、緩動與目的。',
            replay: '重播', propLabel: '屬性', durLabel: '時長', easeLabel: '緩動', whyLabel: '理由',
            reducedNote: '已開啟減少動態——樣本顯示結束狀態，「重播」停用。',
            sampleNames: {
                badge: '指標卡展開', skeleton: '骨架載入', count: '篩選數字遞增', save: '收藏一則機會',
            },
            sampleDesc: {
                badge: 'hover 揭示一個關鍵數字由什麼組成。',
                skeleton: '機會卡從骨架收斂成內容。',
                count: '結果數量隨篩選變化而動。',
                save: '收藏時圖示變形並觸發單次確認。',
            },
            specs: {
                badge: { prop: 'height, opacity', why: '快到像即時，慢到讀得懂這次展開。' },
                skeleton: { prop: 'opacity（循環）', why: '平穩的脈動示意載入，不搶注意力。' },
                count: { prop: 'transform, number', why: '動態確認篩選確實生效。' },
                save: { prop: 'transform, color', why: '輕微過衝獎勵這次確認，只一次。' },
            },
        },
    },

    H3: {
        code: 'H3', phase: 'HI-FI', roles: ['R1', 'R2', 'R4'], tier: 'illustrative',
        en: {
            title: 'Opportunity terrain — a concept study',
            lead: 'A visualization method I prototyped (not in the live product) for reading where opportunity concentrates: plot opportunities by domain and recency, then let density rise into terrain. Move the sliders and watch it redraw.',
            foot: 'Demonstrates the rare full-stack design skill: inventing a visual method, justifying it, and building it from scratch.',
            steps: [
                { t: 'Raw opportunities', d: 'Each opportunity lands as a point, placed by domain and how recent it is.' },
                { t: 'Density weighting', d: 'Points are weighted by concentration and freshness — busy, current areas count more.' },
                { t: 'Terrain', d: 'Weighted points become contour lines — dense areas rise into peaks, thin or stale areas sink into valleys.' },
            ],
            weightLabel: 'Concentration', decayLabel: 'Recency decay',
            argLabel: 'Why terrain, not a table',
            argument: 'The live product ships a treemap. This is an exploration of the opposite reading: terrain lets you feel where opportunity clusters and where it thins out — you read the shape before any single number.',
            algoNote: 'Rendered with inverse-distance weighting + a hand-written marching-squares contour pass. No plotting library.',
            reducedNote: 'Sliders stay live under reduced motion; contours redraw without the transition tween.',
            peakLabel: 'Dense opportunity', valleyLabel: 'Thin / stale',
        },
        zh: {
            title: '機會地形——一則概念研究',
            lead: '我為了「讀出機會集中在哪裡」而原型化的視覺方法（未上線）：把機會依領域與時效鋪成點，再讓密度隆起成地形。拖動滑桿，看它重繪。',
            foot: '證明少見的全端設計能力：發明一種視覺方法、為它辯護、並從零把它做出來。',
            steps: [
                { t: '原始機會', d: '每則機會化為一個點，依領域與新近程度落位。' },
                { t: '密度加權', d: '點依集中度與新鮮度加權——熱門且近期的區域權重更高。' },
                { t: '地形', d: '加權後的點變成等高線——密集處隆起為峰，稀薄或過期處沉為谷。' },
            ],
            weightLabel: '集中度', decayLabel: '時效衰減',
            argLabel: '為何用地形，而非表格',
            argument: '線上產品用的是樹狀圖，這裡則探索相反的讀法：地形讓你感覺得到機會聚在哪、又在哪裡變薄——你先讀形狀，才讀任何單一數字。',
            algoNote: '以反距離加權＋手寫 marching-squares 等高線繪製。不使用任何繪圖函式庫。',
            reducedNote: '減少動態下滑桿仍可用；等高線重繪，只是少了轉場補間。',
            peakLabel: '機會密集', valleyLabel: '稀薄／過期',
        },
    },

    // ===== BUILD =====
    B1: {
        code: 'B1', phase: 'BUILD', roles: ['R4', 'R5'], tier: 'real',
        nodes: [
            { id: 'sources', kind: 'io' },
            { id: 'scraper', kind: 'proc' },
            { id: 'enrich',  kind: 'proc' },
            { id: 'resolve', kind: 'proc' },
            { id: 'score',   kind: 'proc' },
            { id: 'store',   kind: 'io' },
            { id: 'frontend', kind: 'io' },
        ],
        en: {
            title: 'Pipeline architecture',
            lead: 'From raw scraping to rendered pixel, the whole system on one line. Hover a node for what actually runs there.',
            foot: 'Demonstrates end-to-end system thinking from raw scraping to rendered pixel.',
            nodeNames: {
                sources: 'Sources', scraper: 'Crawler', enrich: 'Enrichment', resolve: 'Normalize',
                score: 'Classify', store: 'Store', frontend: 'Frontend',
            },
            nodeDetails: {
                sources: ['Grant + market feeds', 'Investment + collaboration', 'Mixed formats'],
                scraper: ['Python + Playwright', 'Scheduled crawls', 'Checkpoint / resume'],
                enrich: ['Parse amounts + deadlines', 'Fill missing fields', 'Rate-limit budgeted'],
                resolve: ['Unify domain taxonomy', 'Dedup opportunities', 'Match company names'],
                score: ['Tag by domain + sector', 'Rank by recency', 'Flag closing soon'],
                store: ['Managed SQL', 'Refresh cycle', 'Schema-validated'],
                frontend: ['React SPA', 'Six sections', 'Dashboard + filters'],
            },
            calloutLabel: 'Why it matters',
            callouts: [
                { t: 'Checkpoint / resume', d: 'A long crawl that dies at hour six resumes from the last checkpoint, not from zero.' },
                { t: 'Rate-limit strategy', d: 'Per-source budgets keep the crawler polite and unblocked across many portals.' },
            ],
            flowNote: 'Data flows left to right; hover any stage.',
        },
        zh: {
            title: '系統架構',
            lead: '從原始爬取到渲染像素，整套系統排成一線。將滑鼠移到節點上，看那裡實際跑什麼。',
            foot: '證明從原始爬取到渲染像素的端到端系統思考。',
            nodeNames: {
                sources: '來源', scraper: '爬蟲', enrich: '資料補強', resolve: '正規化',
                score: '分類', store: '儲存', frontend: '前端',
            },
            nodeDetails: {
                sources: ['補助＋市場來源', '投資＋合作', '格式混雜'],
                scraper: ['Python + Playwright', '排程爬取', 'Checkpoint / resume'],
                enrich: ['解析金額＋截止', '補齊缺漏欄位', '限流預算控管'],
                resolve: ['統一領域分類', '去重機會', '比對公司名稱'],
                score: ['依領域＋產業標記', '依時效排序', '標記即將截止'],
                store: ['受管 SQL', '更新週期', 'Schema 驗證'],
                frontend: ['React SPA', '六大分區', '儀表板＋篩選'],
            },
            calloutLabel: '為何重要',
            callouts: [
                { t: 'Checkpoint / resume', d: '跑了六小時才掛掉的長爬蟲，從上個檢查點續跑，不是從零開始。' },
                { t: '限流策略', d: '逐來源的預算讓爬蟲在眾多入口間保持禮貌、不被封鎖。' },
            ],
            flowNote: '資料由左向右流動；將滑鼠移到任一階段。',
        },
    },

    B2: {
        code: 'B2', phase: 'BUILD', roles: ['R4', 'R1'], tier: 'real',
        // Anchor (row 0) is the full legal name; the rest are spacing / typo /
        // suffix / abbreviation / cross-script variants, so the matcher visibly
        // merges near-duplicates and honestly routes hard cases to review.
        presets: [
            ['Taiwan Semiconductor Manufacturing Co., Ltd.', 'Taiwan Semiconductor Manufacturing', 'Taiwan Semiconductor Mfg.', 'TSMC', '台積電'],
            ['MediaTek Inc.', 'MediaTek', 'Media Tek Incorporated', 'MTK', '聯發科'],
            ['Hon Hai Precision Industry Co., Ltd.', 'Hon Hai Precision Industry', 'Hon Hai Precision', 'Foxconn', '鴻海精密'],
            ['Delta Electronics, Inc.', 'Delta Electronics', 'Delta Electronic', 'Delta', '台達電'],
            ['Largan Precision Co., Ltd.', 'Largan Precision', 'Largan Precision Company', 'Largan', '大立光'],
        ],
        // simulated confusion stats (labeled)
        stats: { precision: 0.94, recall: 0.89, humanReview: 0.07 },
        en: {
            title: 'Matching companies across sources, live',
            lead: 'The same company shows up in a collaboration brief, a market report, and an investment record under different names. Is "台積電" the same entity as "Taiwan Semiconductor Manufacturing"? Pick a group or type your own — the matcher runs live.',
            foot: 'Demonstrates the deduplication problem behind a multi-source aggregator — and that the author personally solved it in code.',
            inputLabel: 'Company-name variants', presetLabel: 'Try a preset group', addLabel: 'Add variant', runHint: 'Edit any line; matching updates live.',
            stepsLabel: 'Normalization steps',
            steps: [
                'Case-fold and trim whitespace',
                'Strip company suffixes (股份有限公司, Inc., Ltd.)',
                'Unify romanization and spacing',
                'Token-set similarity vs. the anchor',
            ],
            verdictLabel: 'Verdict', simLabel: 'similarity',
            verdicts: { merge: 'Merge', review: 'Review', reject: 'Reject' },
            anchorTag: 'anchor',
            statsLabel: 'Batch outcome',
            statNames: { precision: 'Precision', recall: 'Recall', humanReview: 'Human-review rate' },
            statsNote: 'Batch figures are simulated to illustrate the tradeoff — the matcher above is the real, simplified pipeline logic.',
            codeNote: 'Simplified re-implementation of the production pipeline logic — normalization + token-set ratio.',
        },
        zh: {
            title: '跨來源比對公司，即時執行',
            lead: '同一家公司會在合作徵求、市場報告與投資紀錄裡以不同名稱出現。「台積電」和「Taiwan Semiconductor Manufacturing」是不是同一個實體？選一組、或自己打——比對器即時執行。',
            foot: '證明多來源彙整背後的去重問題——而且作者親手用程式碼解決了它。',
            inputLabel: '公司名稱變體', presetLabel: '試一組預設', addLabel: '新增變體', runHint: '編輯任一行，比對即時更新。',
            stepsLabel: '正規化步驟',
            steps: [
                '轉小寫並去除空白',
                '去除公司字尾（股份有限公司、Inc.、Ltd.）',
                '統一羅馬拼音與間距',
                '對錨點做 token 集合相似度',
            ],
            verdictLabel: '判定', simLabel: '相似度',
            verdicts: { merge: '合併', review: '複核', reject: '拒絕' },
            anchorTag: '錨點',
            statsLabel: '批次結果',
            statNames: { precision: '精確率', recall: '召回率', humanReview: '人工複核率' },
            statsNote: '批次數字為模擬，用來說明取捨——上方的比對器才是真實、簡化過的 pipeline 邏輯。',
            codeNote: '生產線邏輯的簡化重寫——正規化＋token 集合比率。',
        },
    },

    B3: {
        code: 'B3', phase: 'BUILD', roles: ['R5', 'R4'], tier: 'simulated',
        kpis: [
            { id: 'coverage',  spark: [61, 64, 63, 68, 72, 74, 78], delta: 4 },
            { id: 'freshness', spark: [40, 44, 41, 46, 45, 48, 47], delta: -1 },
            { id: 'precision', spark: [88, 89, 90, 91, 92, 93, 94], delta: 1 },
            { id: 'review',    spark: [14, 12, 11, 10, 9, 8, 7], delta: -1 },
        ],
        gates: ['schema', 'dedup', 'anomaly'],
        en: {
            title: 'Quality metrics board',
            lead: 'What I instrument on a data product I ship: coverage, freshness, match precision, and how much still needs a human. Numbers are modeled; the checks are real.',
            foot: 'Demonstrates that the author instruments what they ship — PM thinking applied to data products.',
            kpiNames: {
                coverage: 'Coverage', freshness: 'Freshness', precision: 'Match precision', review: 'Human-review rate',
            },
            kpiUnits: { coverage: '% of target', freshness: 'median days', precision: '%', review: '%' },
            kpiVals: { coverage: '78%', freshness: '9d', precision: '94%', review: '7%' },
            gateLabel: 'Quality gate',
            gateDesc: 'Every refresh passes three checks before it reaches the frontend:',
            gateNames: { schema: 'Schema validation', dedup: 'Duplicate collapse', anomaly: 'Anomaly flagging' },
            gateStates: { schema: 'pass', dedup: 'pass', anomaly: '2 flagged' },
            note: 'KPI figures are simulated for illustration; the gate workflow is a real part of the design.',
        },
        zh: {
            title: '資料品質看板',
            lead: '出貨一個資料產品時我會盯的東西：覆蓋率、新鮮度、比對精確率，以及還有多少需要人。數字為建模，檢核為真。',
            foot: '證明作者會為自己出的東西裝上量測——把 PM 思維用在資料產品上。',
            kpiNames: {
                coverage: '覆蓋率', freshness: '新鮮度', precision: '比對精確率', review: '人工複核率',
            },
            kpiUnits: { coverage: '% 佔目標', freshness: '中位天數', precision: '%', review: '%' },
            kpiVals: { coverage: '78%', freshness: '9 天', precision: '94%', review: '7%' },
            gateLabel: '品質關卡',
            gateDesc: '每次更新在抵達前端之前，都要通過三道檢核：',
            gateNames: { schema: 'Schema 驗證', dedup: '重複收斂', anomaly: '異常標記' },
            gateStates: { schema: '通過', dedup: '通過', anomaly: '2 筆標記' },
            note: 'KPI 數字為模擬示意；關卡流程是設計中真實的一環。',
        },
    },

    // ===== MEASURE =====
    M1: {
        code: 'M1', phase: 'MEASURE', roles: ['R2', 'R3'], tier: 'simulated',
        tasks: [
            { id: 't1', before: 62, after: 88, timeBefore: 210, timeAfter: 96 },
            { id: 't2', before: 55, after: 81, timeBefore: 260, timeAfter: 132 },
            { id: 't3', before: 70, after: 92, timeBefore: 180, timeAfter: 88 },
        ],
        sus: { before: 68, after: 82 },
        en: {
            title: 'Usability evidence',
            lead: 'How I would evaluate the redesign against the earlier build: same tasks, moderated remote, success rate and time-on-task before and after.',
            foot: 'Demonstrates evaluation rigor and the loop from finding to fix.',
            disclaimer: 'Study design is real; participant figures are simulated and clearly labeled.',
            designLabel: 'Test design', designItems: [
                { k: 'Participants', v: 'n = 8, moderated remote' },
                { k: 'Tasks', v: '3, drawn from the Lo-fi flows' },
                { k: 'Metrics', v: 'Success rate · time-on-task · SUS' },
            ],
            taskNames: { t1: 'Find a relevant grant', t2: 'Read a market report', t3: 'Respond to a brief' },
            beforeLabel: 'Before', afterLabel: 'After', successLabel: 'Success rate', timeLabel: 'Time on task (s)',
            susLabel: 'SUS score', susBandLabel: 'B — good, above the 68 average',
            quotesLabel: 'Representative feedback',
            quotes: [
                'I found the grant and its deadline without leaving the page once.',
                'Seeing the strategy take before the full report is the thing I did not know I needed.',
            ],
            quotesNote: 'Paraphrased and simulated.',
            changedLabel: 'What we changed',
            changed: [
                'Deadline moved from inside the card to a first-class filter, beside topic.',
                'The report view got a pinned summary after users lost the thread mid-scroll.',
            ],
        },
        zh: {
            title: '易用性證據',
            lead: '我會怎麼用同一套任務評估改版對上舊版：中介遠端測試，量測改版前後的成功率與任務時間。',
            foot: '證明評估的嚴謹，以及從發現到修正的閉環。',
            disclaimer: '研究設計為真；受測數字為模擬，並已清楚標示。',
            designLabel: '測試設計', designItems: [
                { k: '受測者', v: 'n = 8，中介遠端' },
                { k: '任務', v: '3 項，取自低保真流程' },
                { k: '指標', v: '成功率 · 任務時間 · SUS' },
            ],
            taskNames: { t1: '找到一項相關補助', t2: '讀一份市場報告', t3: '回應一則徵求' },
            beforeLabel: '改版前', afterLabel: '改版後', successLabel: '成功率', timeLabel: '任務時間（秒）',
            susLabel: 'SUS 分數', susBandLabel: 'B — 良好，高於 68 的平均',
            quotesLabel: '代表性回饋',
            quotes: [
                '我找到補助和它的截止日，全程沒離開過頁面。',
                '在讀完整報告前先看到策略建議，是我原本不知道自己需要的東西。',
            ],
            quotesNote: '經改寫且為模擬。',
            changedLabel: '我們因此改了什麼',
            changed: [
                '截止日從卡片內移出，成為與主題並列的第一級篩選條件。',
                '使用者滑到一半跟丟了，於是報告視圖加上釘選摘要。',
            ],
        },
    },

    // ===== REFLECT =====
    F1: {
        code: 'F1', phase: 'REFLECT', roles: ['R5', 'R4'], tier: 'real',
        milestones: [
            { id: 'v1',  ver: 'v1',  date: '2024', tag: 'bootstrap' },
            { id: 'v3',  ver: 'v3',  date: '2024', tag: 'anti-bot' },
            { id: 'v5',  ver: 'v5',  date: '2024', tag: 'schema-change' },
            { id: 'v7',  ver: 'v7',  date: '2024', tag: 'api-integration' },
            { id: 'v8',  ver: 'v8',  date: '2024', tag: 'anti-bot' },
            { id: 'v9',  ver: 'v9',  date: '2025', tag: 'entity-resolution' },
            { id: 'v11', ver: 'v11', date: '2025', tag: 'checkpoint' },
            { id: 'fe',  ver: 'SPA', date: '2025', tag: 'react-frontend' },
        ],
        en: {
            title: 'Ship log',
            lead: 'Eleven scraper versions and a frontend, along one real timeline. Hover a node for why that version had to exist.',
            foot: 'Demonstrates persistence through real-world messiness — eleven scraper versions is not a vanity metric.',
            whyLabel: 'Why this version existed',
            milestoneNames: {
                v1: 'First working crawl', v3: 'Survived the first block', v5: 'Source changed its DOM',
                v7: 'Wired in official feeds', v8: 'Harder anti-bot', v9: 'Names resolved to entities',
                v11: 'Checkpoint / resume', fe: 'React SPA on top',
            },
            milestoneWhy: {
                v1: 'Proved the data could be gathered at all — a rough single-source crawl.',
                v3: 'The first target started blocking; added request shaping and backoff.',
                v5: 'A source silently rewrote its markup and broke everything overnight.',
                v7: 'Moved from scraping alone to official grant and market portal feeds for authoritative fields.',
                v8: 'Anti-bot escalated; switched transport to curl_cffi to look like a real client.',
                v9: 'Duplicate companies were double-counting; built the resolution pass.',
                v11: 'Long crawls kept dying near the end; checkpoint / resume made them finishable.',
                fe: 'The SQL store finally got a face — a React dashboard the team could actually use.',
            },
        },
        zh: {
            title: '版本時間軸',
            lead: '十一個爬蟲版本加上一個前端，沿著一條真實的時間線。將滑鼠移到節點上，看那個版本為何非存在不可。',
            foot: '證明穿越真實世界混亂的韌性——十一個爬蟲版本不是虛榮指標。',
            whyLabel: '這個版本為何存在',
            milestoneNames: {
                v1: '第一個能跑的爬蟲', v3: '撐過第一次封鎖', v5: '來源改了 DOM',
                v7: '接上官方資料源', v8: '更狠的反爬', v9: '名稱解析成實體',
                v11: 'Checkpoint / resume', fe: '疊上 React SPA',
            },
            milestoneWhy: {
                v1: '先證明資料抓得到——一個粗糙的單一來源爬蟲。',
                v3: '第一個目標開始封鎖；加入請求整形與退避。',
                v5: '某來源默默改寫了標記，一夜之間全壞。',
                v7: '從純爬取轉向官方補助與市場入口資料源，取權威欄位。',
                v8: '反爬升級；把傳輸換成 curl_cffi，看起來像真實用戶端。',
                v9: '重複公司在重複計算；建了解析這一關。',
                v11: '長爬蟲老是在快結束時掛掉；checkpoint / resume 讓它跑得完。',
                fe: 'SQL 儲存終於有了臉——一個團隊真的用得上的 React 儀表板。',
            },
        },
    },

    F2: {
        code: 'F2', phase: 'REFLECT', roles: ['R1', 'R5', 'R2'], tier: 'real',
        tradeoffs: ['confidence', 'taiwan', 'depth'],
        en: {
            title: 'Retrospective',
            lead: 'The honest version. What I chose, what it cost, and what I would revisit with another pass.',
            tradeLabel: 'Honest tradeoffs',
            tradeoffs: {
                confidence: { choice: 'I chose to make four sections deep and trustworthy over shipping all six shallow.', cost: 'The cost is that Funding and Talent are still marked "in progress".', today: 'Today I would revisit whether a thin version of both would have been more useful than none.' },
                taiwan: { choice: 'I chose deep Taiwan coverage over broad pan-Asian reach.', cost: 'The cost was a product that is narrow by design and harder to expand later.', today: 'Today I would revisit the object model so a second market could slot in without a rewrite.' },
                depth: { choice: 'I chose data depth over interface polish in the first year.', cost: 'The cost was a dashboard that worked but looked unfinished for a while.', today: 'Today I would revisit investing in the design system earlier, in parallel.' },
            },
            nextLabel: 'What I’d measure next',
            next: [
                'The first action a real user takes after landing — does the dashboard match the job they came with?',
                'Whether the two unbuilt sections are worth building, or whether users route around them.',
            ],
            quote: 'The hardest part was never the scraping. It was deciding, over and over, how much to trust what I had gathered — and making that judgment visible to someone else.',
        },
        zh: {
            title: '誠實回顧',
            lead: '誠實的版本。我選了什麼、代價是什麼、若再來一次我會重看哪裡。',
            tradeLabel: '誠實的取捨',
            tradeoffs: {
                confidence: { choice: '我選擇把四個分區做深、做得可信，而非六個都上線但都很淺。', cost: '代價是「資金支持」與「專家人才」至今仍標示為建置中。', today: '今天我會重看：兩者各出一個精簡版，會不會比留白更有用。' },
                taiwan: { choice: '我選擇台灣的深度覆蓋，而非泛亞的廣度。', cost: '代價是一個設計上就很窄、日後較難擴張的產品。', today: '今天我會重看物件模型，讓第二個市場能不重寫就接進來。' },
                depth: { choice: '第一年我選擇資料深度，而非介面打磨。', cost: '代價是一個能用、但有段時間看起來未完成的儀表板。', today: '今天我會重看：更早、並行地投資設計系統。' },
            },
            nextLabel: '下一步我會量測什麼',
            next: [
                '真實使用者落地後的第一個動作——儀表板是否對上他帶來的任務？',
                '兩個尚未建置的分區值不值得做，還是使用者其實會繞過它們。',
            ],
            quote: '最難的從來不是爬蟲。而是一次又一次地決定：我蒐集到的東西該信幾分——並把那個判斷，讓另一個人也看得見。',
        },
    },
};
