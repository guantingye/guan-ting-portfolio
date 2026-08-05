// Registry + shell copy for the Strategy Intelligence Platform evidence layer.
// Full module copy lives inside each module file (colocation); this file holds
// lightweight metadata the shell needs to count/filter, shared badge/lens
// strings, and the real company records reused across M02/M05/M06/M08.

// Five acts — the page spine (plan v2, §2.2).
export const ACTS = [
    { id: 'build',    num: 'I',   name: { en: 'Build',    zh: '建庫' }, tag: { en: 'why a self-built database, and what it is made of', zh: '為什麼自建資料庫，以及它由什麼組成' } },
    { id: 'write',    num: 'II',  name: { en: 'Write',    zh: '寫作' }, tag: { en: 'the analyst-grade text that is the product', zh: '構成產品本身的分析師等級文本' } },
    { id: 'automate', num: 'III', name: { en: 'Automate', zh: '代理' }, tag: { en: 'making AI analysis workflows inspectable and maintainable', zh: '讓 AI 分析流程可檢查、可維護' } },
    { id: 'query',    num: 'IV',  name: { en: 'Query',    zh: '查詢' }, tag: { en: 'making research on hundreds of companies queryable and verifiable', zh: '讓數百公司研究可以被追問與驗證' } },
    { id: 'ship',     num: 'V',   name: { en: 'Design & Ship', zh: '設計與上線' }, tag: { en: 'wireframe to shipped surface', zh: '從線框圖到上線介面' } },
];

// Lens filter — replaces newsintel's fidelity filter; tuned to the three pillars.
export const LENSES = [
    { id: 'data',    name: { en: 'Data', zh: '資料庫' },    tone: 'var(--isp-teal)' },
    { id: 'writing', name: { en: 'Writing', zh: '產業文本' }, tone: 'var(--isp-amber)' },
    { id: 'ai',      name: { en: 'AI', zh: 'AI' },          tone: 'var(--isp-iris)' },
    { id: 'design',  name: { en: 'Design', zh: '設計' },     tone: 'var(--isp-sky)' },
    { id: 'build',   name: { en: 'Build', zh: '工程' },      tone: 'var(--isp-slate)' },
];

// Authenticity stamps. CONCEPT is new here: a designed proposal grounded in
// the real schema, honestly labelled as not yet running on the live product.
export const BADGES = {
    real:          { term: 'REAL',          en: 'Verified from the live platform on 2026-07-10.',                      zh: '於 2026-07-10 從線上平台核實。' },
    reconstructed: { term: 'RECONSTRUCTED', en: 'A real process; specifics re-created from memory and reasoning.',      zh: '真實流程，細節依記憶與推理重建。' },
    illustrative:  { term: 'ILLUSTRATIVE',  en: 'Conceptual, for explanation only.',                                    zh: '概念性內容，僅供說明。' },
    concept:       { term: 'CONCEPT',       en: 'A feature I designed, grounded in the real schema — not yet live.',    zh: '我設計的功能提案，錨定於真實 schema，尚未於線上運行。' },
};

// Module registry — id, act, lens, badge tier, short title.
const MODULE_LIST = [
    { id: 'isp-m01', key: 'M01', act: 'build',    lens: ['data'],           badge: 'reconstructed', title: { en: 'Why another company database is still needed',          zh: '為什麼還需要一座公司資料庫' } },
    { id: 'isp-m02', key: 'M02', act: 'build',    lens: ['data'],           badge: 'real',           title: { en: 'Data model & industry taxonomy',                     zh: '資料模型與產業分類法' } },
    { id: 'isp-m03', key: 'M03', act: 'build',    lens: ['data'],           badge: 'reconstructed', title: { en: 'Research curation loop',                             zh: '研究策展迴圈' } },
    { id: 'isp-m04', key: 'M04', act: 'write',    lens: ['writing'],        badge: 'real',           title: { en: 'How a strategic brief takes shape',                  zh: '一篇策略簡報如何形成' } },
    { id: 'isp-m05', key: 'M05', act: 'write',    lens: ['writing'],        badge: 'real',           title: { en: 'How an analyst note takes shape',                    zh: '一則分析師註記如何形成' } },
    { id: 'isp-m06', key: 'M06', act: 'automate', lens: ['ai'],             badge: 'concept',        title: { en: 'AI strategy research module',                       zh: 'AI 策略研究模組' } },
    { id: 'isp-m07', key: 'M07', act: 'automate', lens: ['ai'],             badge: 'concept',        title: { en: 'AI draft review workspace',                          zh: 'AI 草稿審查工作台' } },
    { id: 'isp-m08', key: 'M08', act: 'query',    lens: ['ai'],             badge: 'concept',        title: { en: 'Grounded RAG over the company database',           zh: '架在公司資料庫上的依據式 RAG' } },
    { id: 'isp-m09', key: 'M09', act: 'ship',     lens: ['design'],         badge: 'reconstructed', title: { en: 'Interface wireframes: three low-fidelity explorations', zh: '介面線框：三輪低保真探索' } },
    { id: 'isp-m10', key: 'M10', act: 'ship',     lens: ['design'],         badge: 'real',           title: { en: 'Live interfaces and version comparisons',           zh: '上線介面與版本對照' } },
    { id: 'isp-m11', key: 'M11', act: 'ship',     lens: ['design'],         badge: 'real',           title: { en: 'Component & state system',                         zh: '元件與狀態系統' } },
    { id: 'isp-m12', key: 'M12', act: 'ship',     lens: ['build'],          badge: 'reconstructed', title: { en: 'System architecture & known limitations',      zh: '系統架構與已知限制' } },
];
export const MODULES = MODULE_LIST.map((m, i) => ({ ...m, num: String(i + 1).padStart(2, '0') }));

export const LENS_COUNTS = LENSES.reduce((acc, l) => {
    acc[l.id] = MODULES.filter(m => m.lens.includes(l.id)).length;
    return acc;
}, {});

export const LIVE_URL = 'https://industry-strategy-platform.vercel.app/';

export const SHELL = {
    en: {
        eyebrow: 'Evidence layer · v1 · 2026-07',
        title: 'From a company database to a strategy intelligence system you can question',
        lead: 'The section above is a concise summary. This layer explains how the product comes together: the company-data schema, the writing framework behind analyst notes, the AI modules that support research at scale, the retrieval and citation mechanism over the same records, and the product interface that carries it all. I independently completed the data modelling, research workflow, and frontend implementation.',
        indexLabel: 'Module index',
        lensHint: 'Filter by lens',
        clear: 'Clear',
        skipLink: 'Skip to module index',
    },
    zh: {
        eyebrow: '證據層 · v1 · 2026-07',
        title: '從公司資料庫，到可追問的策略情報系統',
        lead: '前段呈現的是成果摘要；這一層則進一步拆解產品如何成立：公司資料的 schema、分析師註記的寫作框架、支援研究規模化的 AI 模組、建立在同一批資料上的檢索與引用機制，以及承接這一切的產品介面。從資料建模、研究流程到前端實作，皆由我獨立完成。',
        indexLabel: '模組索引',
        lensHint: '依鏡頭篩選',
        clear: '清除',
        skipLink: '跳到模組索引',
    },
};

// ---- shared real company records (badge: REAL) ----------------------------
// Full six-section analyst notes, scraped 2026-07-10 from /startups. Reused
// across M05 (anatomy), M06 (agent skill demo) and M08 (RAG grounding).
// Chosen to span three unrelated sectors, proving the schema generalizes.
export const SPECIMEN_COMPANIES = [
    {
        id: 'cognition-ai',
        name: 'Cognition AI (Cognition Labs)',
        sector: { en: 'AI Infrastructure / Agentic Coding SaaS', zh: 'AI 基礎建設 / 代理式編碼 SaaS' },
        date: '2025-12-09',
        snapshot: 'Deep, proprietary agentic stack for software engineering (planning, environment setup, execution, testing) plus integrated products Devin, DeepWiki, and acquired IDE Windsurf.',
        founders: 'Founded in 2023 by Scott Wu (Harvard alum, ex-CTO & co-founder of Lunchclub, triple IOI gold medalist), Steven Hao, and Walden Yan (all IOI gold medalists; Yan is a Thiel Fellow). Early team stacked with world-class competitive programmers from IOI/ICPC/Codeforces.',
        moat: 'Deep, proprietary agentic stack for software engineering (planning, environment setup, execution, testing) plus integrated products Devin, DeepWiki, and acquired IDE Windsurf. Strong data and workflow flywheel from real-world engineering usage, elite algorithmic talent density, and growing enterprise footprint. However, moats are partly execution and distribution-based, not pure foundational-model IP, and face intense competition from hyperscalers and other coding agents.',
        businessModel: 'Enterprise SaaS: Devin sold as an AI software engineer for teams, likely per-seat or per-usage subscription with high ACV contracts, integrated into Slack/Linear/Jira/GitHub. DeepWiki provides freemium top-of-funnel; Windsurf IDE and other tools extend upsell surface across the developer toolchain.',
        funding: 'Backed by Founders Fund, Lux Capital, 8VC, Neo, Elad Gil, Definition Capital, Swish VC, Bain Capital Ventures, Hanabi Capital, D1 Capital, among others. Early 2024 rounds: ≈$21M then $175M led by Founders Fund (valuations from ≈$350M to ≈$2B). 2025 rounds lifted valuation from ≈$4B (Mar 2025) to ≈$10.2B after a ≥$400M raise in Sept 2025.',
        risks: '1) Extremely competitive landscape (Microsoft/GitHub, OpenAI, Anthropic, Replit, Cosine, etc.) compressing margins and differentiation. 2) Technical and reliability risk — public demos have drawn skepticism about real-world performance. 3) Heavy compute and infra costs, sensitive to model pricing. 4) Cultural/people risk from acquired-Windsurf integration. 5) Platform risk if hyperscalers bundle competing agents into core dev tooling.',
        verdict: 'Category-defining leader in agentic coding with strong early revenue traction and a world-class technical founding team. The ~US$10B valuation prices in very high execution success and limits entry for early-stage funds seeking multi-x returns. Recommendation: track closely as market bellwether; prioritize ecosystem plays around Devin’s workflow unless access comes with exceptional terms.',
    },
    {
        id: 'figure-ai',
        name: 'Figure AI',
        sector: { en: 'Robotics & Hard Tech — humanoid robots', zh: '機器人 / 硬科技 — 人形機器人' },
        date: '2025-12-10',
        snapshot: 'Vertically integrated humanoid platform (robot hardware, actuation, perception, control) tied to strategic partnerships with BMW and others, plus large compute and data advantages from training at scale.',
        founders: 'Founded in 2022 by Brett Adcock, a serial entrepreneur who previously founded Vettery and Archer Aviation, bringing experience building and scaling both software marketplaces and capital-intensive aerospace hardware businesses.',
        moat: 'Focuses on a vertically integrated humanoid platform (robot hardware, actuation, perception, and proprietary control stack) tied to large strategic partnerships with BMW and others, plus massive compute and data advantages from training at scale; however, hardware is not yet field-proven at volume and competitors like Tesla, Apptronik and Agility are racing for similar use cases, so durable advantage will hinge on deployment speed and unit economics rather than patents alone.',
        businessModel: 'Develops and manufactures humanoid robots (Figure 01/Helix) aimed at repetitive manual labor tasks in logistics and manufacturing, targeting robot-as-a-service and long-term deployment contracts so customers pay for delivered work hours rather than one-off capex purchases.',
        funding: 'Hyper-funded: raised $70M in 2023 and a $675M round in early 2024 led by investors including Jeff Bezos, Microsoft, Nvidia, Intel, Amazon and OpenAI’s venture arms, valuing the company around $2.6B, followed by a $1B Series C in 2025 at an estimated $39B post-money valuation.',
        risks: 'Extremely ambitious valuation versus still-unproven large-scale deployments, long hardware development cycles, intense competition in humanoids, and dependence on a handful of mega-customers and continued capital-market appetite for deeptech.',
        verdict: 'A flagship bet on humanoid robots with elite founder and capital backing, but priced for perfection and highly sensitive to real-world reliability and labor-replacement economics.',
    },
    {
        id: 'crispr-therapeutics',
        name: 'CRISPR Therapeutics',
        sector: { en: 'CRISPR/Cas9 gene-editing therapeutics', zh: 'CRISPR/Cas9 基因編輯療法' },
        date: '2025-12-13',
        snapshot: 'Only company with a commercialized CRISPR/Cas9 therapy via the Vertex partnership (CASGEVY/exa-cel).',
        founders: 'Co-founded by Emmanuelle Charpentier (CRISPR-Cas9 pioneer) with biotech operators (e.g., Rodger Novak, Shaun Foy); led by CEO Samarth Kulkarni (PhD).',
        moat: 'Only company with a commercialized CRISPR/Cas9 therapy via Vertex partnership (CASGEVY/exa-cel). Regulatory/CMC learning curve plus proven clinical efficacy in hemoglobinopathies create a real execution moat beyond IP.',
        businessModel: 'Co-develop/partner for late-stage and commercialization (Vertex for CASGEVY); pipeline of gene-edited cell therapies; revenue mix of collaboration and product economics.',
        funding: 'Public (Nasdaq: CRSP); commercial-stage via the CASGEVY partnership.',
        risks: 'Conditioning/toxicity burden of the ex vivo transplant workflow; payer/reimbursement and treatment-center capacity; long-term follow-up obligations; fast-moving competition from other gene/cell therapies.',
        verdict: 'One of the few CRISPR players that crossed the ‘science → product’ chasm — now the question is commercial scale, not feasibility.',
    },
];

// ---- lightweight specimen rows for the M02 filterable schema table --------
// Snapshot column only (as shown pre-expand in the real table), spanning a
// wide sector cross-section so the taxonomy reads as genuinely broad.
export const SPECIMEN_ROWS = [
    { date: '2025-12-09', company: 'Cognition AI (Cognition Labs)', sector: 'AI Infrastructure / Agentic Coding SaaS', cluster: 'AI Agents' },
    { date: '2025-12-09', company: 'Sierra', sector: 'Enterprise customer-service AI agents', cluster: 'AI Agents' },
    { date: '2025-12-09', company: 'Dust', sector: 'Enterprise AI agent platform / AI operating system', cluster: 'AI Agents' },
    { date: '2025-12-09', company: 'HaptX', sector: 'Haptic Feedback Suits/Gloves', cluster: 'Haptics' },
    { date: '2025-12-09', company: 'bHaptics', sector: 'Haptic Feedback Suits/Gloves', cluster: 'Haptics' },
    { date: '2025-12-09', company: 'Dispelix', sector: 'AR Optics & Waveguides', cluster: 'AR Optics' },
    { date: '2025-12-09', company: 'Lumus', sector: 'AR Optics & Waveguides', cluster: 'AR Optics' },
    { date: '2025-12-09', company: 'SPAN', sector: 'Smart Home Energy Management (HEMS)', cluster: 'HEMS' },
    { date: '2025-12-09', company: 'Eight Sleep', sector: 'Sleep Tech & Monitoring', cluster: 'Sleep Tech' },
    { date: '2025-12-09', company: 'ZOE', sector: 'Personalized Nutrition AI', cluster: 'Nutrition AI' },
    { date: '2025-12-09', company: 'Port', sector: 'Internal Developer Portals (IDP) / DevEx', cluster: 'IDP' },
    { date: '2025-12-10', company: 'Fervo Energy', sector: 'ClimateTech — enhanced geothermal systems (EGS)', cluster: 'ClimateTech' },
    { date: '2025-12-10', company: 'CarbonCapture Inc.', sector: 'ClimateTech — modular direct air capture (DAC)', cluster: 'ClimateTech' },
    { date: '2025-12-10', company: 'Figure AI', sector: 'Robotics & Hard Tech — humanoid robots', cluster: 'Humanoid Robotics' },
    { date: '2025-12-10', company: 'Agility Robotics', sector: 'Robotics & Hard Tech — bipedal humanoid robots', cluster: 'Humanoid Robotics' },
    { date: '2025-12-10', company: 'Skild AI', sector: 'Robotics & AI — foundation models for general-purpose robots', cluster: 'Robot Foundation Models' },
    { date: '2025-12-10', company: 'Vanta', sector: 'Enterprise SaaS — Security & AI-powered Trust Management', cluster: 'Enterprise SaaS' },
    { date: '2025-12-10', company: 'Lightmatter', sector: 'Photonic computing & optical interconnects for AI data centers', cluster: 'Photonics' },
    { date: '2025-12-13', company: 'CRISPR Therapeutics', sector: 'CRISPR/Cas9 gene-editing therapeutics', cluster: 'CRISPR' },
    { date: '2025-12-13', company: 'Altos Labs', sector: 'Cellular rejuvenation (partial reprogramming) / longevity', cluster: 'Longevity' },
];

// Real sector-cluster counts, computed 2026-07-10 from all 201 rows.
export const SECTOR_CLUSTERS = [
    { name: 'Haptic Feedback Suits/Gloves', count: 10 },
    { name: 'Organ-on-a-Chip / Microphysiological Systems', count: 7 },
    { name: 'Drone Pollination Systems', count: 7 },
    { name: 'AgTech Robotics (laser/precision weeding)', count: 7 },
    { name: 'Cell-free biomanufacturing', count: 6 },
    { name: 'Surgical Robotics', count: 5 },
    { name: 'Smart Home Energy Management (HEMS)', count: 5 },
    { name: 'Sleep Tech & Monitoring', count: 5 },
    { name: 'Single-cell genomics', count: 5 },
    { name: 'Robotics & Hard Tech', count: 5 },
    { name: 'Personalized Nutrition AI', count: 5 },
    { name: 'Internal Developer Portals (IDP)', count: 5 },
    { name: 'Enterprise SaaS', count: 5 },
    { name: 'ClimateTech', count: 5 },
    { name: 'AR Optics & Waveguides', count: 5 },
];
