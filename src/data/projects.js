// Self-drawn SVG cover for the deeptech-database case (no stock photos): a data-room
// console wireframe — 8 registered sources converging into a relational core, then
// diverging into 4 decision surfaces — in the Neural Signal OS palette.
const DEEPTECH_SOURCE_YS = [92, 182, 272, 362, 452, 542, 632, 722];
const DEEPTECH_OUTPUT_YS = [170, 320, 470, 620];
const DEEPTECH_HERO_IMAGE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">'
    + '<rect width="1600" height="900" fill="#0C0E12"/>'
    + '<g stroke="#262B35" stroke-width="3" fill="#14171D">'
    + DEEPTECH_SOURCE_YS.map(y => `<rect x="110" y="${y}" width="260" height="52" rx="10"/>`).join('')
    + '</g>'
    + '<g>'
    + DEEPTECH_SOURCE_YS.map((y, i) => `<circle cx="126" cy="${y + 26}" r="5" fill="${i === 7 ? '#E8A33D' : '#35C2B0'}"/>`).join('')
    + '</g>'
    + '<g stroke="#35C2B0" stroke-width="2" fill="none" opacity="0.5">'
    + DEEPTECH_SOURCE_YS.slice(0, 7).map(y => `<path d="M370,${y + 26} C 480,${y + 26} 520,420 620,420"/>`).join('')
    + '</g>'
    + `<path d="M370,${DEEPTECH_SOURCE_YS[7] + 26} C 480,${DEEPTECH_SOURCE_YS[7] + 26} 520,420 620,420" stroke="#E8A33D" stroke-width="2.5" fill="none" opacity="0.75"/>`
    + '<g stroke="#333A47" stroke-width="4" fill="#1C2028">'
    + '<ellipse cx="800" cy="230" rx="180" ry="28"/>'
    + '<rect x="620" y="230" width="360" height="430"/>'
    + '<ellipse cx="800" cy="660" rx="180" ry="28"/>'
    + '</g>'
    + '<g fill="#2A303C">'
    + [280, 340, 400, 460, 520, 580].map((y, i) => `<rect x="660" y="${y}" width="${[280, 220, 260, 180, 240, 200][i]}" height="14" rx="7"/>`).join('')
    + '</g>'
    + '<rect x="660" y="340" width="140" height="14" rx="7" fill="#35C2B0" opacity="0.6"/>'
    + '<rect x="660" y="460" width="110" height="14" rx="7" fill="#35C2B0" opacity="0.6"/>'
    + '<g stroke="#262B35" stroke-width="3" fill="#14171D">'
    + DEEPTECH_OUTPUT_YS.map(y => `<rect x="1180" y="${y}" width="280" height="90" rx="12"/>`).join('')
    + '</g>'
    + '<g fill="#35C2B0">'
    + DEEPTECH_OUTPUT_YS.slice(0, 3).map(y => `<circle cx="1204" cy="${y + 45}" r="6"/>`).join('')
    + '</g>'
    + `<circle cx="1204" cy="${DEEPTECH_OUTPUT_YS[3] + 45}" r="6" fill="#E8A33D"/>`
    + '<g stroke="#35C2B0" stroke-width="2.5" fill="none" opacity="0.65">'
    + DEEPTECH_OUTPUT_YS.slice(0, 3).map(y => `<path d="M980,420 C 1080,420 1100,${y + 45} 1180,${y + 45}"/>`).join('')
    + '</g>'
    + `<path d="M980,420 C 1080,420 1100,${DEEPTECH_OUTPUT_YS[3] + 45} 1180,${DEEPTECH_OUTPUT_YS[3] + 45}" stroke="#E8A33D" stroke-width="2.5" fill="none" opacity="0.75"/>`
    + '</svg>');

// Self-drawn SVG cover for the Strategy Intelligence Platform case (no stock
// photos): a globe with three hub markers on the left, a brief assembling in
// the middle, and a stack of database rows on the right — global signal to
// deep text to structured record, in one frame, in the Neural Signal OS palette.
const ISP_ROW_YS = [268, 342, 416, 490, 564];
const ISP_HERO_IMAGE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">'
    + '<rect width="1600" height="900" fill="#0C0E12"/>'
    + '<circle cx="270" cy="450" r="190" fill="#14171D" stroke="#262B35" stroke-width="2"/>'
    + '<g stroke="#262B35" stroke-width="1" fill="none" opacity="0.8">'
    + '<ellipse cx="270" cy="450" rx="190" ry="66"/><ellipse cx="270" cy="450" rx="190" ry="140"/>'
    + '<ellipse cx="270" cy="450" rx="66" ry="190"/><ellipse cx="270" cy="450" rx="140" ry="190"/>'
    + '</g>'
    + '<circle cx="270" cy="450" r="190" fill="none" stroke="#333A47" stroke-width="2"/>'
    + '<g fill="#35C2B0"><circle cx="196" cy="366" r="6"/><circle cx="360" cy="522" r="6"/></g>'
    + '<circle cx="318" cy="384" r="10" fill="none" stroke="#E8A33D" stroke-width="2.5"/>'
    + '<circle cx="318" cy="384" r="4.5" fill="#E8A33D"/>'
    + '<g stroke="#35C2B0" stroke-width="1.5" fill="none" opacity="0.55">'
    + '<path d="M330,392 C 420,430 470,440 520,440"/>'
    + '<path d="M362,522 C 440,500 470,470 520,455"/>'
    + '</g>'
    + '<rect x="520" y="240" width="460" height="420" rx="14" fill="#14171D" stroke="#262B35" stroke-width="2"/>'
    + '<rect x="552" y="272" width="220" height="16" rx="8" fill="#2A303C"/>'
    + '<rect x="552" y="300" width="330" height="10" rx="5" fill="#1C2028"/>'
    + '<g fill="#35C2B0" opacity="0.85">'
    + '<rect x="552" y="336" width="10" height="10" rx="2"/><rect x="552" y="358" width="10" height="10" rx="2"/><rect x="552" y="380" width="10" height="10" rx="2"/>'
    + '</g>'
    + '<g fill="#2A303C">'
    + '<rect x="574" y="338" width="360" height="8" rx="4"/><rect x="574" y="360" width="330" height="8" rx="4"/><rect x="574" y="382" width="300" height="8" rx="4"/>'
    + '</g>'
    + '<rect x="552" y="420" width="380" height="1" fill="#262B35"/>'
    + '<g fill="#1C2028"><rect x="552" y="444" width="380" height="8" rx="4"/><rect x="552" y="464" width="360" height="8" rx="4"/><rect x="552" y="484" width="340" height="8" rx="4"/><rect x="552" y="504" width="320" height="8" rx="4"/></g>'
    + '<rect x="552" y="580" width="380" height="34" rx="8" fill="#12241F" stroke="#35C2B0"/>'
    + '<text x="572" y="602" fill="#35C2B0" font-family="monospace" font-size="16">▸ ask the database a question</text>'
    + '<g stroke="#E8A33D" stroke-width="1.5" fill="none" opacity="0.6">'
    + '<path d="M980,420 C 1030,420 1030,340 1080,340"/>'
    + '</g>'
    + '<g stroke="#262B35" stroke-width="2" fill="#14171D">'
    + ISP_ROW_YS.map(y => `<rect x="1080" y="${y}" width="360" height="56" rx="10"/>`).join('')
    + '</g>'
    + '<g>' + ISP_ROW_YS.map((y, i) => `<circle cx="1104" cy="${y + 28}" r="6" fill="${i === 1 ? '#E8A33D' : '#35C2B0'}"/>`).join('') + '</g>'
    + '<g fill="#2A303C">'
    + ISP_ROW_YS.map(y => `<rect x="1126" y="${y + 16}" width="200" height="9" rx="4"/><rect x="1126" y="${y + 32}" width="150" height="7" rx="3"/>`).join('')
    + '</g>'
    + '<text x="1080" y="230" fill="#6B7280" font-family="monospace" font-size="18" letter-spacing="3">STRATEGY INTELLIGENCE · 201 RECORDS</text>'
    + '</svg>');

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
        outcomes: ['Reworked the support journey from anonymous entry and companion matching to emotional conversation, safety routing, and counselor handoff.', 'Used psychological signals such as MBTI, attachment style, emotion regulation, and basic psychological needs to inform companion matching and conversational tone.', 'Designed a React + FastAPI system with psychological embeddings, emotion detection, risk phrase monitoring, and consent-based reporting while preserving professional boundaries.', 'Created a four-persona companion system for different support modes: validation, grounding, action planning, and cognitive reframing', 'Won Silver Medal at the 2025 AI Interdisciplinary Sustainability Innovation Contest and converted the award proposal into a portfolio-ready product case', 'Defined validation signals across PHQ-9 / GAD-7 / PANAS, self-disclosure, companionship, session depth, and qualitative user feedback'],
        zhOutcomes: ['重新整理校園心理支持流程，從匿名入口、陪伴角色媒合、情緒對話到諮商端銜接，形成一條更完整的求助旅程。', '把 人格特質、依附風格、情緒調節與基本心理需求等心理學理論，轉成 AI 角色媒合與對話調性的設計依據。', '規劃 React + FastAPI 架構，結合心理嵌入、情緒議題分析、風險語句偵測與同意制報告', '設計 React + FastAPI 架構，串接心理嵌入、情緒辨識、風險語句偵測等模組，保留人機協作的專業邊界。', '獲得 2025 AI 跨域永續創新競賽銀獎，並將競賽提案轉化為作品集中的產品案例', '定義 PHQ-9 / GAD-7 / PANAS、自我揭露、陪伴感、對話深度與質性訪談等驗證訊號'],
        tech: [{ label: 'Frontend', val: 'React 18, guided onboarding, responsive case UI, avatar-ready interaction surfaces' }, { label: 'Backend', val: 'FastAPI, Python services, consent-based session logging and report generation' }, { label: 'Matching', val: 'Psychological embedding with trait vectors, need signals, and conversation history' }, { label: 'AI Layer', val: 'LLM dialogue orchestration, BERT/NRC-style emotion analysis, topic tagging' }, { label: 'Avatar', val: 'D-ID / HeyGen / TTS-ready multimodal companion direction with voice and facial cues' }, { label: 'Safety', val: 'Risk phrase detection, escalation thresholds, counselor summary, professional resource routing' }],
        awards: [{ iconKey: 'award', title: 'Silver Medal', desc: '2025 AI Interdisciplinary Sustainability Innovation Contest (AI 跨域永續創新競賽)' }],
    },
    {
        slug: 'deeptech-database', num: '02',
        category: 'Data Engineering · Ecosystem Intelligence', zhCategory: '資料工程 · 產業生態情報',
        title: 'Global DeepTech Database', subtitle: 'Ecosystem Intelligence Infrastructure',
        zhTitle: '全球深科技資料庫', zhSubtitle: '產業生態情報資料基礎建設',
        hook: 'From fragmented deep-tech signals to a research-grade ecosystem intelligence database.',
        zhHook: '在工研院產科所的研究工作中，協助將分散在政府資料、公司登記、產業名錄與網頁來源裡的深科技資訊，整理成研究團隊能查找、比對與分析的資料庫。',
        stack: ['Python', 'Pandas', 'Playwright', 'SQL', 'Entity Resolution', 'Data Governance'],
        role: 'Research Assistant / Data Pipeline & Ecosystem Intelligence', zhRole: '研究助理 / 資料管線與產業情報系統',
        timeline: '2024-Present', status: 'ITRI/ISTI research workflow', zhStatus: 'ITRI/ISTI 研究資料流程',
        impact: '230+ companies tracked / enriched', zhImpact: '230+ 家公司追蹤與資料補強',
        overview: "I built a research-oriented data workflow that consolidates fragmented deep-tech and semiconductor ecosystem signals into a structured intelligence database. The system supports company tracking, source traceability, entity normalization, enrichment, and dashboard-ready outputs for research and strategic analysis.\n\nDeep-tech ecosystem research rarely starts with clean data. Company names change across sources, public pages have inconsistent formats, hiring and financial signals live in separate systems, and manual spreadsheets quickly become difficult to maintain.\n\nThis case reconstructs the work as a portfolio-safe data-system study. It shows source acquisition, raw staging, cleaning, entity resolution, relational database modeling, quality controls, and the research outputs enabled by the database.",
        zhOverview: "我建立一套研究導向的資料流程，將分散的深科技與半導體生態訊號整合成結構化情報資料庫。系統支援公司追蹤、來源追溯、實體標準化、欄位補強與儀表板輸出，協助研究與策略分析流程更有效率地運作。\n\n深科技生態研究通常不是從乾淨資料開始。公司名稱在不同來源中不一致，公開頁面格式不穩定，徵才與財務訊號分散在不同系統，手動表格也很快變得難以維護。\n\n本案例以作品集安全方式重構這段工作，呈現來源擷取、原始暫存、資料清理、實體解析、關聯式資料庫建模、品質控制，以及資料庫支援的研究輸出。",
        outcomes: ['Consolidated fragmented public and manually maintained ecosystem signals into a reusable research database workflow', 'Modeled stable company entities with aliases, source rows, company-source relationships, profiles, tags, and update logs', 'Designed source traceability and quality controls around missing fields, stale sources, duplicate candidates, and conflicting values', 'Prepared dashboard-ready and map-ready outputs for company indexes, ecosystem segmentation, research briefs, and enriched dataset packages', 'Translated data engineering work into a high-fidelity portfolio case for AI product, UX research, frontend, and data platform roles'],
        zhOutcomes: ['將分散的公開與人工維護產業訊號整合成可重複使用的研究資料庫流程', '以公司實體為核心建模，串接 aliases、source_rows、company_sources、profiles、tags 與 update_logs', '圍繞缺失欄位、來源過期、重複候選與衝突值設計來源追溯與品質控制', '準備可接入儀表板與地圖的輸出，支援公司索引、生態分群、研究 brief 與補強資料包', '將資料工程工作轉譯為 AI 產品、UX 研究、前端與資料平台職能都能理解的高擬真案例'],
        tech: [{ label: 'Acquisition', val: 'Playwright for dynamic pages, structured requests for stable pages, manual spreadsheet ingestion, cache fallback' }, { label: 'Cleaning', val: 'Pandas normalization, missing-value flags, deduplication, alias mapping, column and type standardization' }, { label: 'Database Modeling', val: 'Canonical company entities, alias tables, source registry, source rows, join tables, update logs' }, { label: 'Quality Controls', val: 'Source traceability, stale-source checks, conflict handling, review queue, field-level confidence indicators' }, { label: 'Visualization', val: 'Power BI-ready tables, HTML ecosystem map, filterable intelligence views, research brief exports' }, { label: 'Portfolio Boundary', val: 'Public-safe reconstruction with sample displays instead of confidential company-level records' }],
        // Self-drawn SVG cover (no stock photos): a data-room console wireframe in the Neural Signal OS palette.
        caseHeroImage: DEEPTECH_HERO_IMAGE,
        caseDeck: {
            eyebrow: 'Data room',
            zhEyebrow: '資料室',
            title: 'From fragmented public records to a queryable research database',
            zhTitle: '把分散的公開紀錄，整理成可查詢的研究資料庫',
            body: 'A relational core where every field can point back to the source row that proved it — built for a research team that needs to trust a number before citing it.',
            zhBody: '一個關聯式資料核心，每個欄位都能指回證明它的來源列 — 為需要在引用數字前先信任它的研究團隊而建。',
            kpis: [
                { label: 'Sources', value: '8', zhLabel: '來源' },
                { label: 'Tables', value: '8', zhLabel: '資料表' },
                { label: 'Companies', value: '230+', zhLabel: '公司數' },
            ],
            signals: ['Intake', 'Resolve', 'Model', 'Gate', 'Deliver'],
            zhSignals: ['登錄', '解析', '建模', '把關', '交付'],
        },
        storyMoments: [
            { iconKey: 'database', title: 'Every source becomes a signal', zhTitle: '每個來源都成為一個訊號', body: 'Company registries, job pages, association lists, and manual sheets get registered with an access method, a cadence, and a trust boundary — not treated as one undifferentiated pile.', zhBody: '公司登記、徵才頁、協會名單與人工表格，都被登錄成有取得方式、更新頻率與信任邊界的訊號，而不是混在一起的資料堆。' },
            { iconKey: 'layers', title: 'Identity becomes stable', zhTitle: '身份變得穩定', body: 'Aliases resolve into one canonical company profile, with a confidence score and a source trail attached to every merge decision.', zhBody: '別名解析為單一標準公司檔案，每個合併判斷都附帶可信度分數與來源軌跡。' },
            { iconKey: 'check', title: 'Every number stays defensible', zhTitle: '每個數字都可以被捍衛', body: 'A quality gate and a provenance ledger sit between the raw data and the dashboard, so a stakeholder question always has a traceable answer.', zhBody: '品質閘門與溯源台帳銜接在原始資料與儀表板之間，讓利害關係人的提問總能得到可追溯的答案。' },
        ],
        // Outcomes deep-link into the Research Database Console modules (src/components/dataroom/).
        outcomeModules: [
            { num: '01', id: 'dt-m01' },
            { num: '03', id: 'dt-m03' },
            { num: '05', id: 'dt-m05' },
            { num: '07', id: 'dt-m07' },
            { num: '02', id: 'dt-m02' },
        ],
        storyChapters: [
            { iconKey: 'activity', label: 'Signal', zhLabel: '訊號', title: 'Register every source as a signal, not a script', zhTitle: '把每個來源登錄為訊號，而不是腳本', body: 'The work starts by treating MOPS, 104, TSIA, SEMI, ASIP, startup lists, news, and manual sheets as registered signals — each with an access method, a cadence, and a set of trusted fields — instead of one-off scraping scripts.', zhBody: '這項工作從把 MOPS、104、TSIA、SEMI、ASIP、新創名單、新聞與人工表格登錄為有登記的訊號開始 — 各自附帶取得方式、更新頻率與可信欄位 — 而不是一次性的爬蟲腳本。', artifact: 'Source registry', zhArtifact: '來源登錄表' },
            { iconKey: 'layers', label: 'Identity', zhLabel: '身份', title: 'Turn unstable names into one canonical entity', zhTitle: '把不穩定的名稱整理成單一標準實體', body: 'Chinese names, English aliases, and renamed entities get mapped to one canonical company profile through a confidence-scored alias workbench, with every merge decision kept reviewable.', zhBody: '中文名稱、英文別名與更名資訊，透過帶有可信度評分的別名工作台對應到單一標準公司檔案，每個合併判斷都保持可被審核。', artifact: 'Alias resolution log', zhArtifact: '別名解析紀錄' },
            { iconKey: 'database', label: 'Model', zhLabel: '建模', title: 'Model a database, not a spreadsheet archive', zhTitle: '建立資料庫模型，而不是試算表堆疊', body: 'Eight relational tables carry the evidence: raw rows stay traceable, canonical companies stay stable, and every enriched field can point back to the source that proved it.', zhBody: '八個關聯式資料表承載證據：原始列保持可追溯、標準公司實體保持穩定，每個補強欄位都能指回證明它的來源。', artifact: 'Relational schema', zhArtifact: '關聯式 schema' },
            { iconKey: 'shield', label: 'Quality', zhLabel: '品質', title: 'Make uncertainty visible instead of silent', zhTitle: '讓不確定性可見，而不是靜默發生', body: 'Six quality gates check coverage, traceability, identity control, freshness, and conflicts — a disagreement between two trusted sources gets held for review, never silently overwritten.', zhBody: '六個品質閘門檢查覆蓋範圍、來源追溯、身份控制、更新鮮度與衝突 — 兩個可信來源間的分歧會被保留審核，絕不會被靜默覆寫。', artifact: 'Quality gate board', zhArtifact: '品質閘門看板' },
            { iconKey: 'check', label: 'Delivery', zhLabel: '交付', title: 'Ship outputs that still carry their evidence', zhTitle: '交付仍保有證據脈絡的輸出', body: 'Company indexes, ecosystem maps, dashboards, research briefs, and dataset packages are exported from the same database — each traceable back to its source tables through the provenance ledger.', zhBody: '公司索引、生態地圖、儀表板、研究 brief 與資料包，全部從同一個資料庫匯出 — 每一項都能透過溯源台帳追溯回其來源資料表。', artifact: 'Decision surfaces', zhArtifact: '決策輸出' },
        ],
        pullQuote: 'The challenge was not collecting more data. It was turning unstable public signals into a reusable research asset.',
        zhPullQuote: '真正的挑戰不是蒐集更多資料，而是把不穩定的公開訊號整理成可重複使用的研究資產。',
        // Deep links from the story into the Research Database Console modules below.
        evidenceSlots: [
            { iconKey: 'layers', title: 'Entity Resolution Workbench', zhTitle: '實體解析工作台', desc: 'Open the merge workbench: alias clusters, a confidence-threshold slider, and an accept/hold review queue you operate yourself.', zhDesc: '打開合併工作台：別名群組、可信度門檻滑桿，以及由你自己操作的接受／保留審核佇列。', anchor: 'dt-m03', anchorNum: '03' },
            { iconKey: 'database', title: 'Provenance Ledger', zhTitle: '溯源台帳', desc: 'Open the audit ledger: pick an output field and trace it, row by row, back to the source that produced it.', zhDesc: '打開稽核台帳：選擇一個輸出欄位，逐列追溯回產生它的來源。', anchor: 'dt-m06', anchorNum: '06' },
        ],
        awards: [],
    },
    {
        slug: 'ai-product-launch-os', num: '03',
        category: 'AI Product Strategy · Launch Decision System', zhCategory: 'AI 產品策略 · 上市決策系統',
        title: 'AI Product Launch OS', subtitle: 'Cinematic Launch Case Study',
        zhTitle: 'AI Product Launch OS', zhSubtitle: 'AI 產品上市敘事案例',
        hook: 'A launch studio for turning fuzzy market signals into a sharp product bet, a credible story, and a decision system teams can act on.',
        zhHook: '一套面向 AI 產品早期驗證與上市準備的決策系統，協助團隊把市場訊號、使用者痛點、模型邊界與商業敘事整理成可執行的產品路線。',
        stack: ['AI Product Strategy', 'GTM Planning', 'Roadmap design', 'Metric Tree', 'UX Research', 'React Prototype'],
        role: 'AI Product Manager / Product Designer', zhRole: 'AI 產品經理 / 產品設計師',
        timeline: '2025 – 2026', status: 'Applied Capstone · Portfolio Case', zhStatus: '應用型 Capstone · 作品集案例',
        impact: 'Launch workflow aligned with AI PM, analytics, and GTM evidence', zhImpact: '建立一套從原型到上市驗證的產品決策流程',
        overview: "AI Product Launch OS is written as a launch studio, not a certificate showcase. The story begins in the messy middle: a team sees AI opportunity everywhere, but the signals are scattered across customer pain, competitive pressure, model feasibility, data readiness, compliance risk, and unclear buyer urgency.\n\nI turned that ambiguity into a working product narrative: what problem is worth solving, which user moment creates urgency, what should be built first, how the launch should be staged, and which metrics tell us whether the product is becoming useful rather than merely impressive.\n\nThe interface is designed like a room where product, design, engineering, and go-to-market can work from the same wall. Each panel has a job: signal scan, launch bet, roadmap, metric tree, risk register, stakeholder story, and learning loop. Credentials sit in the evidence area as support, while the body of the case focuses on product judgment and execution logic.",
        zhOverview: "AI Product Launch OS 是一套為 AI 產品早期驗證與上市準備設計的決策工作台。這個專案從最混亂的階段開始：團隊看見許多可能的 AI 機會，但訊號分散在使用者痛點、競品壓力、模型可行性、資料準備度、合規風險與不明確的商業敘事之中。我將這些不確定性整理成一套可以被團隊共同使用的產品流程：先釐清哪個問題值得解、哪個使用者情境最有急迫性，再進一步判斷 AI 應該介入到哪裡、第一版產品應該做到什麼程度，以及上市前需要哪些證據支持團隊投入資源。整體介面被設計成產品、設計、工程與 go-to-market，讓產品上市討論不只停留在想法，而能被拆解成可驗證追蹤的產品判斷。",
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
            zhTitle: '讓AI產品的不確定性 推進成可討論的上市決策',
            body: 'A high-signal workspace for reviewing the product bet, the user moment, the rollout path, and the evidence needed before a team commits resources.',
            zhBody: '整理 AI 產品上市前的關鍵判斷：需求是否急迫、規格是否清楚、資料模型是否準備好，以及風險是否需要人工審查',
            kpis: [
                { label: 'Launch loops', value: '4', zhLabel: '產品定位判斷' },
                { label: 'Evidence walls', value: '3', zhLabel: '驗證依據' },
                { label: 'Decision gates', value: '7', zhLabel: '上市路徑' },
            ],
            signals: ['Customer urgency', 'Data readiness', 'Model risk', 'Adoption story', 'Post-launch learning'],
            zhSignals: ['使用情境', '需求痛點', '模型邊界', '採用路徑', '迭代學習'],
        },
        storyMoments: [
            { iconKey: 'target', title: 'The product bet', zhTitle: '產品定位判斷', body: 'Name the user, the painful workflow, the promised shift, and the reason now is the right time to launch.', zhBody: '釐清目標使用者、核心痛點、產品承諾與為什麼現在值得投入。' },
            { iconKey: 'chart', title: 'The evidence wall', zhTitle: '驗證依據', body: 'Bring research notes, metrics, risk assumptions, and credential proof into one readable surface.', zhBody: '整合研究訊號、產品指標、模型限制與風險假設，讓上市判斷有跡可循。' },
            { iconKey: 'trend', title: 'The launch rhythm', zhTitle: '上市路徑', body: 'Move from internal conviction to pilot learning, public story, adoption review, and roadmap correction.', zhBody: '從內部對齊、pilot 驗證、公開敘事到採用回顧，建立可持續修正的推進節奏。' },
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
            { iconKey: 'activity', label: 'Signal', zhLabel: '訊號', title: 'Listen for the pattern behind the noise', zhTitle: '在零散訊號中，找出值得投入的產品機會', body: 'The launch story starts before the roadmap. I scan market reports, workflow complaints, competitor moves, data availability, and policy pressure, then turn them into a one-page opportunity brief that explains why this problem is becoming urgent now.', zhBody: '產品上市不從 Roadmap 開始，而是從判斷哪些訊號值得追蹤。從整理市場趨勢、使用者需求、競品動態、資料條件與政策壓力，將零散資訊收斂成一份機會 Opportunity Brief，說明這個問題為什麼現在值得被解決。', artifact: 'Opportunity brief', zhArtifact: 'Opportunity Brief slide' },
            { iconKey: 'target', label: 'Problem', zhLabel: '定義', title: 'Make the launch bet small enough to test', zhTitle: '把 AI 市場機會，收斂成可被驗證的產品問題', body: 'Instead of saying “build an AI product,” the case names a concrete user moment: what the user is trying to finish, what currently slows them down, what trust barrier blocks adoption, and which decision will improve if the product works.', zhBody: '不停留在「做一個 AI 產品」的模糊目標，而是將機會收斂到具體的使用者情境：使用者想完成什麼、現在被什麼卡住、哪個信任障礙影響採用，以及如果產品真的有效，哪個決策或流程會因此變好。', artifact: 'User moment map', zhArtifact: '關鍵情境地圖' },
            { iconKey: 'layers', label: 'OS', zhLabel: '系統', title: 'Design a launch room, not a static deck', zhTitle: '將上市討論設計成一個可操作的工作台', body: 'The OS behaves like a shared workspace: roadmap, evidence board, risk register, metric tree, and stakeholder story all sit together. The design goal is to help a team argue clearly, decide faster, and know what evidence is still missing.', zhBody: '將這套 OS 設計成團隊共用的產品工作介面，將 roadmap、驗證依據、風險登錄、指標樹與利害關係人敘事放在同一個介面中。目標不僅是做一份漂亮簡報，而是讓團隊能更快對齊判斷、看見缺口，並決定下一步要驗證什麼。', artifact: 'Launch cockpit', zhArtifact: '上市決策台' },
            { iconKey: 'trend', label: 'Launch', zhLabel: '推進', title: 'Turn rollout into a living rhythm', zhTitle: '把產品從一次發布，提升成可追蹤的推進節奏', body: 'The launch plan moves through concept room, pilot corridor, beta narrative, public release, and post-launch signal review. Each step has a threshold, a learning question, and a visible owner so momentum does not depend on memory.', zhBody: '將上市流程拆成概念驗證、pilot 測試等。每個階段都對應明確的決策門檻、迭代問題與負責人，讓團隊知道現在推進到哪裡、還缺什麼，以及下一步是否值得繼續投入。', artifact: 'Rollout rhythm', zhArtifact: '上市推進圖' },
            { iconKey: 'check', label: 'Evidence', zhLabel: '證據', title: 'Let the artifacts do the talking', zhTitle: '用可交付成果，證明產品判斷', body: 'The credentials are deliberately placed beside product artifacts rather than above them. The viewer should remember the work: PRD excerpts, launch checklist, stakeholder map, metric tree, risk notes, and the way decisions connect.', zhBody: '從具體的產品產出脈絡中，生成 PRD 摘要、上市檢查表、利害關係人地圖、指標樹、風險筆記與決策紀錄。', artifact: 'Evidence wall', zhArtifact: '成果證據版' },
        ],
        pullQuote: 'The strongest AI launch story is not “we used AI.” It is “we changed a decision, reduced a risk, and learned faster than the old workflow.”',
        zhPullQuote: 'AI 產品真正有說服力的上市敘事，不是「我們應用了 AI」，而是它改善了哪個決策、降低了什麼風險，以及如何讓團隊比舊流程更快學習',
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
        zhHook: '從問題定義、使用者情境、狀態模型、互動原型到研究證據的完整設計，並以 React 實作九個 live modules，展示設計如何從概念推進到可操作驗證的設計思考路徑',
        stack: ['Human Factors','UX Research', 'HMI', 'Interaction Systems', 'React Prototyping', 'Accessibility', 'Design Systems'],
        role: 'UX/HMI Designer & Frontend Prototyper', zhRole: 'UX/HMI 設計師 / 前端原型開發者',
        timeline: '2025 – 2026', status: 'Applied Design Lab', zhStatus: '應用型設計實驗室',
        impact: 'Interaction patterns for UIUX, HMI, accessibility, and frontend roles', zhImpact: '對應 UIUX、HMI、無障礙與前端職能的互動模式',
        overview: "UX/HMI Interaction Design Lab is built like a studio table covered with scenarios, interface states, and prototype fragments. The central question is simple but demanding: when the user is under pressure, what should the interface do first, second, and never?\n\nThe case translates cognitive science into interaction behavior. Instead of treating HMI as a pretty dashboard, it breaks the experience into human moments: noticing a change, understanding severity, choosing an action, confirming intent, recovering from error, and handing control back to the system or another person.\n\nVisually, the case is intentionally warmer and more tactile than a technical specification. Image strips, transparent panels, state cards, and responsive prototype notes make the work feel like a living design lab. The goal is to show senior-level frontend and UX judgment: not just building screens, but shaping how attention, state, feedback, and safety work together.",
        zhOverview: "UX/HMI Interaction Design Lab 探討的是一個很實際的問題：當使用者處在高壓、資訊密集、需要快速判斷的情境中，介面如何幫助他更快看見變化、理解嚴重性、確認下一步，並在自動化交接時保持控制感。\n\n此案例將認知科學轉譯為互動行為。它不把 HMI 視為漂亮 dashboard，而是拆解成人的瞬間：注意到變化、理解嚴重性、選擇行動、確認意圖、從錯誤中復原，以及把控制權交回系統或另一個人。\n\n視覺上，這個案例刻意比技術規格書更溫暖、更有觸感。圖片帶、透明面板、狀態卡與響應式原型筆記，讓作品像一個活的設計實驗室。目標是呈現高階前端與 UX 判斷：不只是做畫面，而是形塑注意力、狀態、回饋與安全如何一起運作。",
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
        slug: 'industry-strategy-platform', num: '06',
        category: 'Strategy Intelligence · Frontier-Tech Database', zhCategory: '策略情報 · 前沿科技資料庫',
        title: 'Strategy Intelligence Platform', subtitle: 'A Crunchbase for frontier tech, with an AI strategist designed on top',
        zhTitle: 'Strategy Intelligence Platform', zhSubtitle: '一個為前沿科技而生的 Crunchbase，並在其上設計了一層 AI 策略師',
        hook: 'A self-built, analyst-grade database of 201 frontier-tech companies — six sections per row, including a stated verdict — plus an AI strategist layer I designed to keep that depth scaling.',
        zhHook: '一個自建、分析師等級的資料庫，收錄 201 家前沿科技公司——每列六段，包含一個明確的判斷——並設計了一層 AI 策略師，讓這種深度可以規模化。',
        stack: ['React', 'Analyst Research', 'Bilingual Writing', 'AI Agent Design', 'Grounded RAG', 'Vercel'],
        role: 'Founder, Analyst & Product Designer', zhRole: '創辦人 / 分析師 / 產品設計師',
        timeline: '2025 – 2026', status: 'Live · database & briefs shipped, AI layer in concept', zhStatus: '上線 · 資料庫與簡報已上線，AI 層為概念設計',
        impact: '201 companies · 5 strategic briefs · 10-field schema', zhImpact: '201 家公司 · 5 篇策略簡報 · 十欄位 schema',
        overview: "Crunchbase will tell you a company exists. It will not tell you whether the moat is real, whether the round was priced for perfection, or whether it is worth a follow-up meeting. That gap is the product bet behind the Strategy Intelligence Platform — a site I designed and built end to end, live at industry-strategy-platform.vercel.app.\n\nThe foundation is a self-curated database of 201 frontier-tech companies — humanoid robotics, CRISPR gene editing, AI agents, photonics, climatetech, and more — where every row carries six analyst-written sections: founders, moat, business model, funding, risks, and a stated verdict. Alongside it, a strategic-briefs feed reads the macro picture: five long-form theses on power constraints, packaging bottlenecks, and where AI infrastructure is actually bottlenecked.\n\nThis page is not a UI tour. It opens the workshop: the schema and taxonomy behind 201 comparable rows, the writing method behind every brief and analyst note, and — the part I want to be most upfront about — an AI strategist layer I designed but have not yet wired to the live product: an agent that drafts a note in eight checkable skills, an editorial-ops board that manages what it drafts, and a grounded RAG layer that can query the database in plain language and cite its sources, or refuse when the schema does not have an answer. Each is labelled honestly as a concept, grounded in the real data.\n\nThis project sits downstream of two others in this portfolio: the ITRI ecosystem-data work (02) that first taught me how to structure a company record, and the AI News Intelligence pipeline (04), a related but distinct system whose daily-briefing discipline shaped how I think about a dated, sourced claim.",
        zhOverview: "Crunchbase 會告訴你一家公司存在。它不會告訴你護城河是不是真的、那輪估值是不是已經定價到完美、或者值不值得一次後續會議。這個缺口，就是 Strategy Intelligence Platform 背後的產品賭注——一個我從頭到尾設計並開發的網站，上線於 industry-strategy-platform.vercel.app。\n\n基礎是一個自建策展的資料庫，收錄 201 家前沿科技公司——人形機器人、CRISPR 基因編輯、AI agent、光子學、潔淨科技等——每一列都帶著六段分析師撰寫的內容：創辦人、護城河、商業模式、資金、風險，以及一個明確的判斷。同時還有一條策略簡報動態，讀懂宏觀局勢：五篇關於電力限制、封裝瓶頸，以及 AI 基礎建設真正卡在哪裡的長文論點。\n\n這一頁不是介面導覽。它打開整個工作間：201 列可互相比較的紀錄背後的 schema 與分類法、每篇簡報與分析師註記背後的寫作方法，以及——我想最先誠實說明的部分——一層我設計、但尚未接上線上產品的 AI 策略師：一個以八個可檢查的技能寫出草稿的 agent、一個管理草稿的文案管理看板，以及一個能用白話查詢資料庫、附引用來源、且在 schema 沒有答案時願意拒答的依據式 RAG 層。每一個都誠實標為概念設計，並錨定在真實資料上。\n\n這個專案下游承接作品集裡的另外兩個專案：教會我如何結構化一筆公司紀錄的工研院生態資料工作（02），以及 AI News Intelligence 管線（04）——一個相關但不同的系統，它每日簡報的紀律，形塑了我對「一個有日期、有來源的主張」該長什麼樣的理解。",
        outcomes: [
            'Designed and shipped a live, bilingual product — a globe-led home, a strategic-briefs reader, and a searchable 201-company observatory',
            'Curated a ten-field schema that holds an analyst\'s full judgment, not just firmographics, and stays constant across wildly different sectors',
            'Wrote the analyst method behind every brief and company note — the same six-section shape from a coding agent to a gene-editing platform',
            'Designed an AI strategist layer — an eight-skill agent, an editorial-ops board, and a grounded RAG console — honestly labelled as concept, not shipped',
            'Built the interaction system (globe hub-switch, expandable rows, sector filter, bilingual toggle) that carries all three routes',
        ],
        zhOutcomes: [
            '設計並上線一個真實、雙語的產品——地球儀導向的首頁、策略簡報閱讀器，以及可搜尋的 201 家公司觀測站',
            '策展出一套十欄位 schema，承載分析師的完整判斷，而不只是公司基本資料，並在極度不同的產業間保持一致',
            '寫出每篇簡報與公司註記背後的分析師方法——同一套六段結構，從編碼代理適用到基因編輯平台',
            '設計一層 AI 策略師——八技能 agent、文案管理看板與依據式 RAG 查詢台——誠實標為概念設計，而非已上線功能',
            '打造撐起三條路徑的互動系統（地球儀 hub 切換、可展開列、產業篩選、雙語切換）',
        ],
        tech: [
            { label: 'Frontend', val: 'React, client-side routing, bilingual EN/繁中 shell, Vercel deployment' },
            { label: 'Database', val: '201-row curated schema — ten fields per company, six analyst-written sections' },
            { label: 'Writing method', val: 'Analyst-authored briefs and notes, dated per curation batch, opinionated verdicts' },
            { label: 'AI Agent design', val: 'Eight-skill drafting pipeline with a confidence + evidence gate (concept)' },
            { label: 'Editorial ops design', val: 'Six-state kanban — backlog through published and stale (concept)' },
            { label: 'RAG design', val: 'Typed chunking, hybrid structured + semantic retrieval, citation and refusal (concept)' },
        ],
        caseHeroImage: ISP_HERO_IMAGE,
        caseDeck: {
            eyebrow: 'Strategy observatory', zhEyebrow: '策略觀測站',
            title: 'From 201 curated companies to a strategist you can question',
            zhTitle: '從 201 家策展公司到一個可以被提問的策略師',
            body: 'A workspace for reading frontier tech the way an analyst does — moat, model, funding, risk, verdict — and a designed AI layer for keeping that depth at scale.',
            zhBody: '一個用分析師的方式讀懂前沿科技的工作區——護城河、商模、資金、風險、判斷——以及一層讓這種深度得以規模化的設計中 AI 層。',
            kpis: [
                { label: 'Companies', value: '201', zhLabel: '公司數' },
                { label: 'Schema fields', value: '10', zhLabel: 'Schema 欄位' },
                { label: 'Strategic briefs', value: '5', zhLabel: '策略簡報' },
            ],
            signals: ['Curate', 'Write', 'Automate', 'Query', 'Ship'],
            zhSignals: ['策展', '寫作', '代理', '查詢', '上線'],
        },
        storyMoments: [
            { iconKey: 'database', title: 'The database is the product', zhTitle: '資料庫本身就是產品', body: '201 companies, ten fields each, six of them an analyst\'s judgment — not a fact sheet with a search bar.', zhBody: '201 家公司，各十個欄位，其中六個是分析師的判斷——不是一張加了搜尋框的事實表。' },
            { iconKey: 'cpu', title: 'An AI strategist, designed honestly', zhTitle: '一個誠實標示的 AI 策略師', body: 'An eight-skill agent, an editorial-ops board, and a grounded RAG layer — labelled concept, grounded in the real schema.', zhBody: '八技能 agent、文案管理看板與依據式 RAG 層——標為概念設計，錨定於真實 schema。' },
            { iconKey: 'globe', title: 'Global by design', zhTitle: '刻意的全球視野', body: 'A globe, not a hero image, because the product\'s first job is to make breadth across geographies legible.', zhBody: '用地球儀而不是主視覺圖，因為產品的第一個任務就是讓跨地理的廣度一眼可辨。' },
        ],
        outcomeModules: [
            { num: '02', id: 'isp-m02' },
            { num: '04', id: 'isp-m04' },
            { num: '06', id: 'isp-m06' },
            { num: '08', id: 'isp-m08' },
            { num: '10', id: 'isp-m10' },
        ],
        storyChapters: [
            { iconKey: 'database', label: 'Build', zhLabel: '建庫', title: 'Curate depth, not just coverage', zhTitle: '策展深度，而不只是覆蓋率', body: 'Crunchbase indexes millions of companies with a fact sheet each. This database holds 201, on purpose — every row carries an analyst\'s full judgment through a constant ten-field schema, so a laser-weeding robot and a CRISPR platform read the same way.', zhBody: 'Crunchbase 用一張事實表索引數百萬家公司。這個資料庫刻意只收 201 家——每一列都透過一套固定的十欄位 schema，承載分析師的完整判斷，讓雷射除草機器人和 CRISPR 平台讀起來是同一套邏輯。', artifact: 'Schema & taxonomy', zhArtifact: 'Schema 與分類法' },
            { iconKey: 'book', label: 'Write', zhLabel: '寫作', title: 'Six sections, one verdict', zhTitle: '六段結構，一個判斷', body: 'The moat, business-model, funding, and risk sections earn the right to the sixth: a stated, disagreeable verdict. That is the section a plain fact sheet never has, and the one this whole product is built around.', zhBody: '護城河、商業模式、資金與風險段落，賺得寫出第六段的資格：一個明確、可被反駁的判斷。這是一張純事實表永遠不會有的段落，也是整個產品圍繞著建立的核心。', artifact: 'Analyst note anatomy', zhArtifact: '分析師註記解剖' },
            { iconKey: 'cpu', label: 'Automate', zhLabel: '代理', title: 'Design an AI strategist, not a black box', zhTitle: '設計一個 AI 策略師，而不是黑箱', body: 'Deep writing does not scale by hand forever, so I designed an agent as eight small, independently checkable skills — sourcing through style-guard — with a confidence gate that holds thin evidence instead of publishing it. Concept, honestly labelled.', zhBody: '深度寫作沒辦法永遠靠人力擴大規模，所以我把 agent 設計成八個小型、各自可獨立檢查的技能——從檢索到文風守門——並附一道信心閘門，讓不足的證據被保留，而不是被發佈。誠實標為概念設計。', artifact: 'Agent skill system', zhArtifact: 'Agent 技能系統' },
            { iconKey: 'zap', label: 'Query', zhLabel: '查詢', title: 'Ground every answer, or refuse', zhTitle: '每個答案都有依據，否則拒答', body: 'A RAG layer designed over the same schema: typed chunks, hybrid structured-plus-semantic retrieval, and a citation on every claim — including a question the database honestly cannot answer.', zhBody: '一層架在同一套 schema 上的 RAG 設計：有型別的切塊、結構化加語意的混合檢索，以及每個主張都附上引用——包含一個資料庫誠實答不出來的問題。', artifact: 'Grounded RAG design', zhArtifact: '依據式 RAG 設計' },
            { iconKey: 'monitor', label: 'Ship', zhLabel: '上線', title: 'From wireframe to a live, bilingual product', zhTitle: '從線框圖到上線的雙語產品', body: 'A globe-led home, a book-like briefs reader, and a dense, expandable company table — three different reading modes for three different jobs, shipped and running today.', zhBody: '地球儀導向的首頁、書籍式的簡報閱讀器，以及一張密集、可展開的公司表格——三種不同的閱讀模式對應三種不同的工作，今天就在線上運作。', artifact: 'Shipped interface', zhArtifact: '已上線介面' },
        ],
        pullQuote: 'Crunchbase tells you a company exists. An analyst tells you whether it matters. The product bet here is a database where every row carries the analyst\'s answer — and an AI layer designed to keep that promise at scale.',
        zhPullQuote: 'Crunchbase 告訴你一家公司存在，分析師告訴你它重不重要。這個產品賭的是：一個每一列都帶著分析師答案的資料庫——以及一層讓這個承諾能規模化的 AI。',
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
    'industry-strategy-platform':   'map',
    'startup-intelligence-platform':'platform',
    'psymatch':                     'research',
};
