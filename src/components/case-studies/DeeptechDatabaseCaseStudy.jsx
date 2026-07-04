import React, { useState } from 'react';
import itriStarImage from '../../../assets/ITRI star project.png';
import Icon from '../ui/Icon.jsx';

const CONTENT = {
  en: {
    hero: {
      eyebrow: 'ITRI internship / data product case',
      title: 'A working data room for Taiwan startup intelligence.',
      lead: 'I treated the internship output as a data product: source adapters, reviewable company records, bilingual technology tags, and handoff surfaces for maps, analysts, and visualization agents.',
      context: 'Public-safe reconstruction. Company-level records are represented as mock data.',
      thesis: 'The real contribution was not a crawler. It was turning scattered startup signals into a reusable intelligence workflow.',
    },
    metrics: [
      { value: '230+', label: 'company records', detail: 'structured startup universe' },
      { value: '40+', label: 'fields per record', detail: 'identity, market, talent, finance, tags' },
      { value: '9', label: 'source families', detail: 'registries, associations, websites, news' },
      { value: 'v9+', label: 'dataset lineage', detail: 'append-only refresh discipline' },
    ],
    principles: [
      'Every field needs provenance before it becomes intelligence.',
      'Taxonomy has to translate local language into global categories.',
      'The database should be map-ready, query-ready, and reviewable.',
    ],
    contextBoard: {
      eyebrow: 'Public context board',
      title: 'The page is grounded in Taiwan’s real deep-tech geography',
      lead: 'These public references establish the ecosystem context without exposing internal ITRI data. The visuals are reference imagery; the interface and dataset below are portfolio-safe reconstructions.',
      facts: [
        { value: '1980', label: 'Hsinchu Science Park opened', source: 'public HSP record' },
        { value: '584', label: 'registered HSP tenants, 2024-12', source: 'public HSP record' },
        { value: '177k+', label: 'HSP workers, 2024-10', source: 'public HSP record' },
        { value: 'ITRI', label: 'nearby anchor in Taiwan semiconductor history', source: 'public HSP overview' },
      ],
      references: [
        { title: 'Semiconductor substrate', desc: 'A visual proxy for the deep-tech / hardware categories behind the taxonomy.', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Data infrastructure', desc: 'Server and storage imagery used as a reference for the data backbone layer.', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Analyst cockpit', desc: 'Dashboard imagery used as visual direction for the downstream intelligence surface.', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' },
      ],
    },
    pipeline: {
      eyebrow: 'Interactive architecture',
      title: 'Follow one company signal from public source to IEK-ready insight',
      lead: 'Click each station to see what the pipeline adds. The diagram is intentionally concrete: it shows where extraction, review, taxonomy, and downstream applications separate.',
      stages: [
        { icon: 'globe', title: 'Source watchlist', short: 'Capture', detail: 'Public websites, MOPS references, 104 talent pages, association directories, startup lists, and market news are tracked as source families rather than isolated URLs.', artifact: 'source_registry.csv', payload: ['source type', 'URL pattern', 'refresh cadence', 'access notes'] },
        { icon: 'cpu', title: 'Crawler adapter', short: 'Extract', detail: 'Each source gets its own extraction strategy: browser automation for JS-heavy pages, request-based collectors for stable endpoints, and cache fallback when pages are unstable.', artifact: 'adapter_104_jobs.py', payload: ['selectors', 'retry policy', 'cache snapshot', 'raw capture'] },
        { icon: 'database', title: 'Staging ledger', short: 'Preserve', detail: 'Raw extracts land in a staging layer with run IDs, timestamps, and source URLs so the team can audit where each signal came from.', artifact: 'raw_company_snapshot', payload: ['run id', 'source URL', 'raw value', 'extract date'] },
        { icon: 'layers', title: 'Normalization pass', short: 'Clean', detail: 'Pandas transforms align company names, aliases, headcount ranges, finance references, geography, and duplicated records before analyst review.', artifact: 'company_profile_v9', payload: ['canonical name', 'aliases', 'dimensions', 'review state'] },
        { icon: 'target', title: 'Taxonomy mapping', short: 'Classify', detail: 'Chinese company descriptions are mapped into bilingual technical tags so Taiwan-specific signals can be compared with international deep-tech categories.', artifact: 'taxonomy_map.json', payload: ['sector', 'subsector', 'value-chain role', 'confidence'] },
        { icon: 'monitor', title: 'Intelligence surfaces', short: 'Use', detail: 'Clean exports can feed a startup map, IEK-style briefing cards, analyst dashboards, and visualization agents that answer questions with evidence attached.', artifact: 'agent_ready_export', payload: ['map layer', 'brief card', 'chart spec', 'source links'] },
      ],
    },
    sources: {
      eyebrow: 'Crawler source studio',
      title: 'Source adapters designed around messy Taiwanese startup data',
      lead: 'The point was not to scrape everything. It was to decide what signal each source was trusted to provide, then encode that decision into a repeatable adapter.',
      items: [
        { name: '104 talent pages', status: 'stable', signal: 'Hiring demand and headcount clues', method: 'Browser automation with selector checks and cached snapshots.', fields: ['job family', 'location', 'hiring intensity', 'company alias'] },
        { name: 'MOPS / public registry', status: 'validated', signal: 'Finance and governance references', method: 'Parser rules normalize public fields and attach source provenance.', fields: ['capital', 'listed relation', 'filing date', 'registry link'] },
        { name: 'Association directories', status: 'watch', signal: 'Industry membership and sector identity', method: 'Source-specific extractors with drift monitoring for directory layouts.', fields: ['member name', 'sector label', 'website', 'association'] },
        { name: 'News and search layer', status: 'review', signal: 'Recent market movement and aliases', method: 'Search enrichment collects candidate evidence, then routes low-confidence items into review.', fields: ['alias', 'funding mention', 'market signal', 'confidence'] },
      ],
    },
    dataProduct: {
      eyebrow: 'Data product demo',
      title: 'A company record that can survive handoff',
      lead: 'The mock record below shows the interface logic: one canonical company, multiple evidence-backed slices, and a field model that can power maps and agent queries.',
      slices: [
        { key: 'profile', label: 'Profile', title: 'Canonical profile', rows: [['Company ID', 'TW-DT-0187'], ['Sector', 'AI x semiconductor'], ['Stage', 'scale-up candidate'], ['Review state', 'analyst-reviewed']] },
        { key: 'signals', label: 'Signals', title: 'Operating signals', rows: [['Hiring trend', 'rising in edge AI roles'], ['Finance reference', 'public registry matched'], ['News signal', 'export partnership candidate'], ['Confidence', '0.84 source-weighted']] },
        { key: 'taxonomy', label: 'Taxonomy', title: 'Bilingual technical tags', rows: [['Primary tag', 'AI accelerator / AI 加速器'], ['Value-chain role', 'edge inference layer'], ['Benchmark bucket', 'semiconductor enabler'], ['Map layer', 'AI / IC design overlap']] },
      ],
      schema: ['canonical_name', 'source_url', 'sector_tag', 'talent_signal', 'finance_ref', 'confidence_score'],
    },
    datasetBrowser: {
      eyebrow: 'Anonymized dataset browser',
      title: 'A recruiter should be able to inspect the system, not just read about it',
      lead: 'The sample rows are anonymized but shaped like the real working surface: confidence, source coverage, review state, taxonomy, and what the record is ready to power.',
      rows: [
        { id: 'TW-DT-0187', sector: 'AI x Semiconductor', confidence: '0.84', sources: '7/9', review: 'reviewed', ready: 'map + brief', note: 'Strong talent signal, taxonomy overlap with edge inference.' },
        { id: 'TW-DT-0224', sector: 'Biotech / MedTech', confidence: '0.79', sources: '5/9', review: 'needs alias check', ready: 'brief', note: 'Multiple Chinese aliases require analyst confirmation.' },
        { id: 'TW-DT-0311', sector: 'Cleantech / Energy', confidence: '0.72', sources: '4/9', review: 'candidate', ready: 'map', note: 'Useful for ecosystem map, not yet ready for briefing.' },
        { id: 'TW-DT-0442', sector: 'Advanced Manufacturing', confidence: '0.88', sources: '8/9', review: 'reviewed', ready: 'agent query', note: 'High provenance coverage and stable source trail.' },
      ],
    },
    reviewFlow: {
      eyebrow: 'Analyst review flow',
      title: 'The high-value layer is the review loop',
      lead: 'A strong intelligence system makes uncertainty visible. This flow shows how weak evidence becomes a review queue instead of silently entering the database.',
      steps: [
        { icon: 'activity', title: 'Signal enters queue', body: 'Crawler finds a new hiring signal, news mention, or registry field.' },
        { icon: 'shield', title: 'Confidence is calculated', body: 'Source count, freshness, parser reliability, and alias match produce a confidence band.' },
        { icon: 'target', title: 'Analyst resolves ambiguity', body: 'Low-confidence aliases or taxonomy conflicts are reviewed before handoff.' },
        { icon: 'check', title: 'Record becomes usable', body: 'Reviewed records can power maps, IEK brief cards, and agent queries.' },
      ],
    },
    agent: {
      eyebrow: 'Visualization agent prototype',
      title: 'A high-fidelity example of how the database becomes an analyst tool',
      lead: 'These prompts show the intended handoff: the agent does not invent intelligence. It queries cleaned records, renders a view, and keeps provenance visible.',
      prompts: [
        { label: 'Sector density', query: 'Compare AI, semiconductor, and biotech startup density by technical tag.', result: ['group by sector_tag', 'count companies', 'show overlap bucket', 'attach source confidence'], bars: [72, 58, 43, 31] },
        { label: 'Hiring signal', query: 'Find startups with rising technical hiring and export-relevant tags.', result: ['filter hiring trend', 'join taxonomy', 'rank evidence', 'prepare brief card'], bars: [46, 64, 52, 38] },
        { label: 'IEK brief', query: 'Build a briefing view for emerging semiconductor software companies.', result: ['select value-chain role', 'summarize sources', 'render map layer', 'flag review gaps'], bars: [38, 76, 61, 49] },
      ],
    },
    map: {
      eyebrow: 'Startup map workbench',
      title: 'From database rows to ecosystem navigation',
      lead: 'The map is a portfolio-safe mockup of the downstream use case: filter by technology cluster, see density, then open a briefing-ready view.',
      clusters: [
        { name: 'AI / Data', count: '60+', x: 62, y: 24, color: 'blue', brief: 'model tooling, edge AI, data platforms' },
        { name: 'Semiconductor', count: '45+', x: 24, y: 33, color: 'green', brief: 'IC design, packaging, equipment software' },
        { name: 'Biotech', count: '35+', x: 76, y: 54, color: 'amber', brief: 'medtech, diagnostics, bioinformatics' },
        { name: 'Energy', count: '25+', x: 38, y: 75, color: 'lime', brief: 'storage, grid software, climate tech' },
        { name: 'Manufacturing', count: '40+', x: 66, y: 80, color: 'gray', brief: 'automation, robotics, advanced materials' },
      ],
    },
    evidence: {
      eyebrow: 'Proof board',
      title: 'Artifacts that make the work inspectable',
      lead: 'The gallery mixes real internship context with replaceable product mockups. Real company data can be dropped into the same slots later without changing the layout.',
      slots: [
        { icon: 'activity', title: 'Crawler run console', desc: 'Adapter status, retries, snapshots, and data quality gates.', kind: 'mockup' },
        { icon: 'database', title: 'Company schema', desc: 'Canonical fields, provenance, confidence, and review state.', kind: 'mockup' },
        { icon: 'map', title: 'Industry map layer', desc: 'Cluster navigation for startup ecosystem analysis.', kind: 'mockup' },
        { image: itriStarImage, title: 'ITRI context photo', desc: 'Internship context artifact from the Star Program presentation setting.', kind: 'internal image' },
      ],
    },
  },
  zh: {
    hero: {
      eyebrow: '工研院實習 / 資料產品案例',
      title: '一個為台灣新創情報打造的資料工作室。',
      lead: '我把實習成果當成資料產品來設計：來源 adapter、可審核的公司紀錄、雙語技術分類，以及能交付給地圖、分析師與視覺化 agent 的資料介面。',
      context: '公開安全版本重構；公司級資料以 mock data 呈現。',
      thesis: '真正的貢獻不是一支爬蟲，而是把分散的新創訊號整理成可重複使用的情報流程。',
    },
    metrics: [
      { value: '230+', label: '公司紀錄', detail: '結構化的新創樣本宇宙' },
      { value: '40+', label: '單筆資料欄位', detail: '身份、市場、人才、財務、標籤' },
      { value: '9', label: '來源類型', detail: '登記資料、協會、網站、新聞' },
      { value: 'v9+', label: '資料版本脈絡', detail: '附加式更新與 lineage 管理' },
    ],
    principles: [
      '每個欄位都必須先有來源，才能成為情報。',
      '分類法必須把本地語境翻譯成國際可讀的產業類別。',
      '資料庫要同時能被地圖、查詢與審核流程使用。',
    ],
    contextBoard: {
      eyebrow: '公開語境參照',
      title: '這頁的設計建立在台灣真實 deep-tech 地理脈絡上',
      lead: '這些公開參照用來建立生態系語境，不揭露任何 ITRI 內部資料。圖片是視覺參考；下方介面與資料集是作品集安全版本重構。',
      facts: [
        { value: '1980', label: '新竹科學園區啟用', source: '公開 HSP 資料' },
        { value: '584', label: '2024-12 登記廠商數', source: '公開 HSP 資料' },
        { value: '177k+', label: '2024-10 從業員工數', source: '公開 HSP 資料' },
        { value: 'ITRI', label: '台灣半導體歷史中的鄰近錨點', source: '公開 HSP overview' },
      ],
      references: [
        { title: 'Semiconductor substrate', desc: '作為 taxonomy 中 deep-tech / hardware 類別的視覺參照。', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Data infrastructure', desc: '作為資料底層、伺服器與儲存層的視覺方向。', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Analyst cockpit', desc: '作為後續情報介面與儀表板的視覺參考。', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' },
      ],
    },
    pipeline: {
      eyebrow: '互動式架構',
      title: '追蹤一個公司訊號如何從公開來源變成 IEK-ready insight',
      lead: '點選每個站點，可以看到資料管線在不同階段補上什麼。這張圖刻意具體呈現 extraction、review、taxonomy 與下游應用的分工。',
      stages: [
        { icon: 'globe', title: '來源 watchlist', short: '捕捉', detail: '新創官網、MOPS 參照、104 人才頁、協會名錄、新創清單與市場新聞以來源家族管理，而不是零散 URL。', artifact: 'source_registry.csv', payload: ['來源類型', 'URL pattern', '更新週期', '存取備註'] },
        { icon: 'cpu', title: '爬蟲 adapter', short: '擷取', detail: '每個來源都有自己的擷取策略：JS-heavy 頁面用瀏覽器自動化，穩定 endpoint 用 request collector，不穩定頁面保留快取回退。', artifact: 'adapter_104_jobs.py', payload: ['selectors', 'retry policy', 'cache snapshot', 'raw capture'] },
        { icon: 'database', title: '暫存 ledger', short: '保存', detail: '原始擷取結果先落到 staging layer，附上 run ID、時間戳與來源 URL，讓每個訊號都能回查。', artifact: 'raw_company_snapshot', payload: ['run id', 'source URL', 'raw value', 'extract date'] },
        { icon: 'layers', title: '標準化 pass', short: '清理', detail: '透過 Pandas 對齊公司名稱、別名、人數區間、財務參照、地理位置與重複紀錄，再進入分析師審核。', artifact: 'company_profile_v9', payload: ['canonical name', 'aliases', 'dimensions', 'review state'] },
        { icon: 'target', title: '技術分類 mapping', short: '分類', detail: '把中文公司描述映射到雙語技術標籤，讓台灣在地訊號能與國際 deep-tech 分類比較。', artifact: 'taxonomy_map.json', payload: ['sector', 'subsector', 'value-chain role', 'confidence'] },
        { icon: 'monitor', title: '情報介面', short: '應用', detail: '乾淨輸出可支援新創地圖、IEK 類型 briefing card、分析儀表板，以及會附來源證據的視覺化 agent。', artifact: 'agent_ready_export', payload: ['map layer', 'brief card', 'chart spec', 'source links'] },
      ],
    },
    sources: {
      eyebrow: '爬蟲來源工作室',
      title: '針對台灣新創資料的不整齊現實設計 source adapters',
      lead: '重點不是什麼都抓，而是判斷每個來源可信任提供什麼訊號，再把這個判斷寫成可重複執行的 adapter。',
      items: [
        { name: '104 人才頁', status: 'stable', signal: '招募需求與人力規模線索', method: '瀏覽器自動化搭配 selector check 與快取 snapshot。', fields: ['職務類型', '地點', '招募強度', '公司別名'] },
        { name: 'MOPS / 公開登記', status: 'validated', signal: '財務與治理參照', method: 'Parser rules 標準化公開欄位，並附上來源溯源。', fields: ['資本額', '上市櫃關聯', '登記日期', '來源連結'] },
        { name: '產業協會名錄', status: 'watch', signal: '會員身份與產業定位', method: '依來源客製 extractor，監控 directory layout 漂移。', fields: ['會員名稱', '產業標籤', '網站', '協會來源'] },
        { name: '新聞與搜尋層', status: 'review', signal: '近期市場動態與公司別名', method: '搜尋 enrichment 蒐集候選證據，低可信資料進入人工審核。', fields: ['別名', '募資提及', '市場訊號', '可信度'] },
      ],
    },
    dataProduct: {
      eyebrow: '資料產品示範',
      title: '一筆可以被交接、查詢、映射的公司紀錄',
      lead: '下面的 mock record 呈現介面邏輯：一個標準公司、多個有來源的資料切片，以及能支援地圖與 agent 查詢的欄位模型。',
      slices: [
        { key: 'profile', label: 'Profile', title: '標準公司輪廓', rows: [['Company ID', 'TW-DT-0187'], ['Sector', 'AI x semiconductor'], ['Stage', 'scale-up candidate'], ['Review state', 'analyst-reviewed']] },
        { key: 'signals', label: 'Signals', title: '營運訊號', rows: [['Hiring trend', 'edge AI 職缺上升'], ['Finance reference', '公開登記已比對'], ['News signal', '出口合作候選'], ['Confidence', '0.84 source-weighted']] },
        { key: 'taxonomy', label: 'Taxonomy', title: '雙語技術標籤', rows: [['Primary tag', 'AI accelerator / AI 加速器'], ['Value-chain role', 'edge inference layer'], ['Benchmark bucket', 'semiconductor enabler'], ['Map layer', 'AI / IC design overlap']] },
      ],
      schema: ['canonical_name', 'source_url', 'sector_tag', 'talent_signal', 'finance_ref', 'confidence_score'],
    },
    datasetBrowser: {
      eyebrow: '匿名資料集瀏覽器',
      title: '招聘方應該能檢視系統，而不只是閱讀描述',
      lead: '下方樣本列為匿名資料，但保留真實工作介面的形狀：可信度、來源覆蓋、審核狀態、分類標籤，以及這筆資料準備好支援什麼輸出。',
      rows: [
        { id: 'TW-DT-0187', sector: 'AI x Semiconductor', confidence: '0.84', sources: '7/9', review: 'reviewed', ready: 'map + brief', note: '人才訊號強，taxonomy 與 edge inference 重疊。' },
        { id: 'TW-DT-0224', sector: 'Biotech / MedTech', confidence: '0.79', sources: '5/9', review: 'needs alias check', ready: 'brief', note: '多個中文別名需要分析師確認。' },
        { id: 'TW-DT-0311', sector: 'Cleantech / Energy', confidence: '0.72', sources: '4/9', review: 'candidate', ready: 'map', note: '適合進入生態系地圖，但尚未達 briefing 標準。' },
        { id: 'TW-DT-0442', sector: 'Advanced Manufacturing', confidence: '0.88', sources: '8/9', review: 'reviewed', ready: 'agent query', note: '來源覆蓋完整，適合進入 agent 查詢。' },
      ],
    },
    reviewFlow: {
      eyebrow: '分析師審核流程',
      title: '真正高價值的層，是讓不確定性被看見',
      lead: '好的情報系統不會把弱證據偷偷塞進資料庫，而是把它變成可處理的 review queue。',
      steps: [
        { icon: 'activity', title: '訊號進入佇列', body: '爬蟲抓到新的招募訊號、新聞提及或登記欄位。' },
        { icon: 'shield', title: '計算可信度', body: '來源數、更新時間、parser 可靠度與別名比對形成 confidence band。' },
        { icon: 'target', title: '分析師處理模糊性', body: '低可信度別名或 taxonomy 衝突在交付前先被審核。' },
        { icon: 'check', title: '紀錄可被使用', body: '審核後資料才進入地圖、IEK brief card 與 agent query。' },
      ],
    },
    agent: {
      eyebrow: '視覺化 agent 原型',
      title: '資料庫如何變成分析師工具的高保真示範',
      lead: '這些 prompt 展示預期的交接方式：agent 不憑空產生情報，而是查詢清理後資料、產生視圖，並保留來源證據。',
      prompts: [
        { label: '產業密度', query: '依技術標籤比較 AI、半導體與生技新創密度。', result: ['依 sector_tag 分群', '計算公司數', '顯示 overlap bucket', '附上來源可信度'], bars: [72, 58, 43, 31] },
        { label: '人才訊號', query: '找出技術招募上升且具出口相關標籤的新創。', result: ['篩選 hiring trend', '串接 taxonomy', '排序證據', '準備 brief card'], bars: [46, 64, 52, 38] },
        { label: 'IEK brief', query: '建立半導體軟體新創的 briefing view。', result: ['選取價值鏈角色', '摘要來源', '產生地圖圖層', '標記審核缺口'], bars: [38, 76, 61, 49] },
      ],
    },
    map: {
      eyebrow: '新創地圖工作台',
      title: '從資料庫列轉成生態系導航',
      lead: '地圖是下游應用的公開安全 mockup：依技術聚落篩選、檢視密度，再展開 briefing-ready view。',
      clusters: [
        { name: 'AI / 資料', count: '60+', x: 62, y: 24, color: 'blue', brief: '模型工具、edge AI、資料平台' },
        { name: '半導體', count: '45+', x: 24, y: 33, color: 'green', brief: 'IC 設計、封測、設備軟體' },
        { name: '生技醫療', count: '35+', x: 76, y: 54, color: 'amber', brief: '醫療科技、診斷、生物資訊' },
        { name: '能源', count: '25+', x: 38, y: 75, color: 'lime', brief: '儲能、電網軟體、氣候科技' },
        { name: '先進製造', count: '40+', x: 66, y: 80, color: 'gray', brief: '自動化、機器人、先進材料' },
      ],
    },
    evidence: {
      eyebrow: 'Proof board',
      title: '讓作品可被檢視的成果素材',
      lead: '這個 gallery 混合真實實習脈絡與可替換的產品 mockup。之後若有真實公司資料或截圖，可以直接替換進同樣欄位。',
      slots: [
        { icon: 'activity', title: 'Crawler run console', desc: 'Adapter 狀態、retry、snapshot 與資料品質 gate。', kind: 'mockup' },
        { icon: 'database', title: 'Company schema', desc: '標準欄位、來源溯源、可信度與審核狀態。', kind: 'mockup' },
        { icon: 'map', title: 'Industry map layer', desc: '支援新創生態系分析的 cluster navigation。', kind: 'mockup' },
        { image: itriStarImage, title: 'ITRI context photo', desc: '工研院育星計畫期末成果發表情境素材。', kind: 'internal image' },
      ],
    },
  },
};

const h = React.createElement;

function getContent(lang) {
  return CONTENT[lang === 'zh' ? 'zh' : 'en'];
}

function Section({ className = '', eyebrow, title, lead, children }) {
  return h('section', { className: `deeptech-case-section ${className}` },
    h('div', { className: 'deeptech-case-section-head' },
      h('span', { className: 'deeptech-case-eyebrow' }, eyebrow),
      h('h2', null, title),
      h('p', null, lead)),
    children);
}

function ButtonList({ items, activeIndex, onSelect, getLabel, className }) {
  return h('div', { className },
    items.map((item, index) => h('button', {
      type: 'button',
      className: index === activeIndex ? 'active' : '',
      key: getLabel(item),
      onClick: () => onSelect(index),
    }, getLabel(item))));
}

function HeroRoom({ c }) {
  return h('section', { className: 'deeptech-case-hero-room' },
    h('div', { className: 'deeptech-case-hero-copy' },
      h('span', { className: 'deeptech-case-eyebrow' }, c.hero.eyebrow),
      h('h2', null, c.hero.title),
      h('p', null, c.hero.lead),
      h('div', { className: 'deeptech-case-hero-context' },
        h(Icon, { name: 'shield' }),
        h('span', null, c.hero.context))),
    h('div', { className: 'deeptech-case-dossier' },
      h('div', { className: 'deeptech-case-dossier-top' },
        h('span', null, 'INTELLIGENCE DOSSIER'),
        h('strong', null, 'TW-DT-0187')),
      h('p', null, c.hero.thesis),
      h('div', { className: 'deeptech-case-metric-grid' },
        c.metrics.map(metric => h('article', { key: metric.label },
          h('strong', null, metric.value),
          h('span', null, metric.label),
          h('small', null, metric.detail)))),
      h('ul', { className: 'deeptech-case-principles' },
        c.principles.map(principle => h('li', { key: principle }, principle)))));
}

function ContextBoard({ c }) {
  const [active, setActive] = useState(0);
  const reference = c.contextBoard.references[active];
  return h(Section, { className: 'deeptech-case-context-board', ...c.contextBoard },
    h('div', { className: 'deeptech-case-context-grid' },
      h('div', { className: 'deeptech-case-public-facts' },
        c.contextBoard.facts.map(fact => h('article', { key: fact.label },
          h('strong', null, fact.value),
          h('span', null, fact.label),
          h('small', null, fact.source)))),
      h('div', { className: 'deeptech-case-reference-viewer' },
        h('div', { className: 'deeptech-case-reference-image' },
          h('img', { src: reference.image, alt: reference.title, loading: 'lazy', decoding: 'async' })),
        h('div', { className: 'deeptech-case-reference-copy' },
          h(ButtonList, {
            items: c.contextBoard.references,
            activeIndex: active,
            onSelect: setActive,
            getLabel: item => item.title,
            className: 'deeptech-case-reference-tabs',
          }),
          h('span', null, reference.source),
          h('h3', null, reference.title),
          h('p', null, reference.desc),
          h('a', { href: reference.href, target: '_blank', rel: 'noreferrer' }, 'image source')))));
}

function PipelineExplorer({ c }) {
  const [active, setActive] = useState(0);
  const stage = c.pipeline.stages[active];
  return h(Section, { className: 'deeptech-case-pipeline', ...c.pipeline },
    h('div', { className: 'deeptech-case-pipeline-shell' },
      h(ButtonList, {
        items: c.pipeline.stages,
        activeIndex: active,
        onSelect: setActive,
        getLabel: item => item.short,
        className: 'deeptech-case-pipeline-nav',
      }),
      h('div', { className: 'deeptech-case-pipeline-diagram' },
        c.pipeline.stages.map((item, index) => h('button', {
          type: 'button',
          className: `deeptech-case-pipeline-node${index === active ? ' active' : ''}`,
          key: item.title,
          onClick: () => setActive(index),
        },
          h('span', null, String(index + 1).padStart(2, '0')),
          h(Icon, { name: item.icon }),
          h('strong', null, item.title)))),
      h('aside', { className: 'deeptech-case-stage-panel' },
        h('span', null, stage.artifact),
        h('h3', null, stage.title),
        h('p', null, stage.detail),
        h('div', { className: 'deeptech-case-payload-grid' },
          stage.payload.map(item => h('code', { key: item }, item))))));
}

function SourceStudio({ c }) {
  const [active, setActive] = useState(0);
  const source = c.sources.items[active];
  return h(Section, { className: 'deeptech-case-source-studio', ...c.sources },
    h('div', { className: 'deeptech-case-source-grid' },
      h(ButtonList, {
        items: c.sources.items,
        activeIndex: active,
        onSelect: setActive,
        getLabel: item => item.name,
        className: 'deeptech-case-source-list',
      }),
      h('div', { className: `deeptech-case-source-detail ${source.status}` },
        h('div', { className: 'deeptech-case-source-status' },
          h('span', null, source.status),
          h('strong', null, source.signal)),
        h('p', null, source.method),
        h('div', { className: 'deeptech-case-field-chips' },
          source.fields.map(field => h('span', { key: field }, field))),
        h('div', { className: 'deeptech-case-mini-console' },
          h('code', null, `adapter="${source.name}"`),
          h('code', null, `trusted_signal="${source.signal}"`),
          h('code', null, `route="staging -> normalize -> review"`)))));
}

function DataProductDemo({ c }) {
  const [active, setActive] = useState(0);
  const slice = c.dataProduct.slices[active];
  return h(Section, { className: 'deeptech-case-data-product', ...c.dataProduct },
    h('div', { className: 'deeptech-case-record-grid' },
      h('div', { className: 'deeptech-case-record-card' },
        h(ButtonList, {
          items: c.dataProduct.slices,
          activeIndex: active,
          onSelect: setActive,
          getLabel: item => item.label,
          className: 'deeptech-case-segmented',
        }),
        h('h3', null, slice.title),
        h('div', { className: 'deeptech-case-record-table' },
          slice.rows.map(([key, value]) => h('div', { key },
            h('span', null, key),
            h('strong', null, value))))),
      h('aside', { className: 'deeptech-case-schema-strip' },
        h('span', null, 'agent-ready schema'),
        c.dataProduct.schema.map(field => h('code', { key: field }, field)))));
}

function DatasetBrowser({ c }) {
  const [active, setActive] = useState(0);
  const row = c.datasetBrowser.rows[active];
  return h(Section, { className: 'deeptech-case-dataset-browser', ...c.datasetBrowser },
    h('div', { className: 'deeptech-case-dataset-grid' },
      h('div', { className: 'deeptech-case-dataset-table' },
        h('div', { className: 'deeptech-case-dataset-head' },
          h('span', null, 'record id'),
          h('span', null, 'sector'),
          h('span', null, 'confidence'),
          h('span', null, 'review')),
        c.datasetBrowser.rows.map((item, index) => h('button', {
          type: 'button',
          className: index === active ? 'active' : '',
          key: item.id,
          onClick: () => setActive(index),
        },
          h('span', null, item.id),
          h('span', null, item.sector),
          h('strong', null, item.confidence),
          h('em', null, item.review)))),
      h('aside', { className: 'deeptech-case-record-inspector' },
        h('span', null, 'selected record'),
        h('h3', null, row.id),
        h('p', null, row.note),
        h('dl', null,
          h('div', null, h('dt', null, 'source coverage'), h('dd', null, row.sources)),
          h('div', null, h('dt', null, 'ready for'), h('dd', null, row.ready)),
          h('div', null, h('dt', null, 'confidence'), h('dd', null, row.confidence))))));
}

function AgentPrototype({ c }) {
  const [active, setActive] = useState(0);
  const prompt = c.agent.prompts[active];
  return h(Section, { className: 'deeptech-case-agent-prototype', ...c.agent },
    h('div', { className: 'deeptech-case-agent-workbench' },
      h('div', { className: 'deeptech-case-agent-prompts' },
        h(ButtonList, {
          items: c.agent.prompts,
          activeIndex: active,
          onSelect: setActive,
          getLabel: item => item.label,
          className: 'deeptech-case-agent-tabs',
        }),
        h('div', { className: 'deeptech-case-agent-query' },
          h('span', null, 'prompt'),
          h('strong', null, prompt.query))),
      h('div', { className: 'deeptech-case-agent-output' },
        h('div', { className: 'deeptech-case-chart' },
          prompt.bars.map((value, index) => h('i', {
            key: `${prompt.label}-${index}`,
            style: { height: `${value}%` },
          }))),
        h('div', { className: 'deeptech-case-response-list' },
          prompt.result.map(step => h('div', { key: step },
            h(Icon, { name: 'check' }),
            h('span', null, step)))))));
}

function MapWorkbench({ c }) {
  const [active, setActive] = useState(0);
  const cluster = c.map.clusters[active];
  return h(Section, { className: 'deeptech-case-map-section', ...c.map },
    h('div', { className: 'deeptech-case-map-grid' },
      h('div', { className: 'deeptech-case-map-canvas' },
        c.map.clusters.map((item, index) => h('button', {
          type: 'button',
          className: `deeptech-case-map-node ${item.color}${index === active ? ' active' : ''}`,
          key: item.name,
          onClick: () => setActive(index),
          style: { left: `${item.x}%`, top: `${item.y}%` },
        },
          h('strong', null, item.count),
          h('span', null, item.name)))),
      h('aside', { className: 'deeptech-case-map-brief' },
        h('span', null, 'selected cluster'),
        h('h3', null, cluster.name),
        h('p', null, cluster.brief),
        h('div', { className: 'deeptech-case-brief-actions' },
          h('button', { type: 'button' }, 'map layer'),
          h('button', { type: 'button' }, 'brief card'),
          h('button', { type: 'button' }, 'source audit')))));
}

function ReviewFlow({ c }) {
  return h(Section, { className: 'deeptech-case-review-flow', ...c.reviewFlow },
    h('div', { className: 'deeptech-case-review-grid' },
      c.reviewFlow.steps.map((step, index) => h('article', { key: step.title },
        h('span', null, String(index + 1).padStart(2, '0')),
        h(Icon, { name: step.icon }),
        h('h3', null, step.title),
        h('p', null, step.body)))));
}

function EvidenceBoard({ c }) {
  return h(Section, { className: 'deeptech-case-evidence-section', ...c.evidence },
    h('div', { className: 'deeptech-case-evidence-grid refined' },
      c.evidence.slots.map(slot => h('article', { className: `deeptech-case-evidence-card ${slot.image ? 'photo' : ''}`, key: slot.title },
        slot.image
          ? h('img', { src: slot.image, alt: slot.title, loading: 'lazy', decoding: 'async' })
          : h('div', { className: 'deeptech-case-evidence-visual' },
            h(Icon, { name: slot.icon }),
            h('span', null, slot.kind)),
        h('div', { className: 'deeptech-case-evidence-copy' },
          h('span', null, slot.kind),
          h('h3', null, slot.title),
          h('p', null, slot.desc))))));
}

export default function DeeptechDatabaseCaseStudy({ lang }) {
  const c = getContent(lang);
  return h('div', { className: 'deeptech-case deeptech-case-v2 reveal' },
    h(HeroRoom, { c }),
    h(ContextBoard, { c }),
    h(PipelineExplorer, { c }),
    h(SourceStudio, { c }),
    h(DataProductDemo, { c }),
    h(DatasetBrowser, { c }),
    h(ReviewFlow, { c }),
    h(AgentPrototype, { c }),
    h(MapWorkbench, { c }),
    h(EvidenceBoard, { c }));
}
