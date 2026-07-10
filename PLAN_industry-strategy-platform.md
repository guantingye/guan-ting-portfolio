# 重構計畫 — Strategy Intelligence Platform（全球前沿科技策略情報平台）

> 目標：把作品集現有的第 06 號專案「台灣新創生態系地圖 / Taiwan Startup Ecosystem Atlas」**整個打掉重寫**，改為介紹線上作品 `industry-strategy-platform`（[industry-strategy-platform.vercel.app](https://industry-strategy-platform.vercel.app/)）。
>
> 本文件為「純計畫」。經你確認後，才會在**下一個視窗**動手編輯與實作。
>
> 撰寫：2026-07-10 · 修訂 v2（依你對三個關鍵決策的回覆更新）· 分支：`deeptech-dataroom`

---

## 0. 一頁摘要（TL;DR）

- **要做的事**：新增一個 senior 級的專案頁面，主角是我獨立打造的 **Strategy Intelligence Platform**——定位為「**全球前沿科技的策略情報平台（Crunchbase for frontier tech）**」。頁面骨架與文案調性沿用 `UX/HMI Interaction Design Lab` 與 `AI Product Launch OS`，並以最新的 `AI News Intelligence`（newsintel）證據層為架構藍本。
- **敘事三支柱**：
  1. **深度產業文本的撰寫** — /insights 的策略簡報與 /startups 的分析師註記（moat / model / funding / risks / verdict）都是分析師等級的長文，本頁把這套寫作方法**當成產品核心資產**攤開講。
  2. **自建的專業公司資料庫** — 201 家前沿科技公司、~40 個產業分群、六段式分析師 schema，對標 Crunchbase 的收錄與策展方法，並講清楚「比 Crunchbase 深在哪」。
  3. **AI 功能概念設計（量身定做）** — 由我基於平台真實的資料結構**發想並設計**的 AI 層概念預覽：(a) **AI 產業策略師 Agent** 的技能模組系統、(b) **文案管理工作台**（editorial ops）、(c) **Grounded RAG 資料庫查詢**的完整檢索架構設計。三者互相咬合、全部錨定在真實的 201 筆紀錄與六段式 schema 上，以「概念設計提案」的誠實身份呈現。
- **交付形態**：一個 `.isp` 命名空間的互動證據層（**12 個 lazy-load 模組** + Live Demo Bridge），素材來自線上平台的**真實爬取**，沿用作品集的誠實標章制度（並為 AI 概念層新增 `CONCEPT` 標章）。

---

## 1. 已拍板的決策（2026-07-10 你已確認）

| # | 決策 | 結論 |
|---|---|---|
| A | 產品定位 | ✅ **全球前沿科技策略情報平台（Crunchbase for frontier tech）**，聚焦此定位進行介紹。不做台灣資料庫敘事；僅在故事背景以一句話交代「延續 ITRI 生態系資料的底子，推進成全球視野的對外產品」，串起 02／07 的成長曲線。 |
| B | 與 04（AI News Intelligence）的邊界 | ✅ 06-new 專講「**產品＋資料庫＋深度寫作＋AI Agent＋設計**」，不重述爬蟲管線（僅一句交叉連結）。且這五塊的技能內容**帶到最深、最專業**——見 §5 加深後的模組規格。 |
| C | AI Agent / RAG 的真實性 | ✅ 線上尚未有精確的 Agent／RAG 實作。由我**直接發想與概念設計**：根據平台真實的資料 schema 量身定做 AI 功能模組（Agent 技能系統、文案管理、RAG 檢索架構），以「概念預覽（CONCEPT）」的誠實身份放進頁面介紹。這反而是加分項——展示 AI 產品設計能力，而非含糊宣稱已上線。 |

**沿用預設、若無異議即照此執行**（不另等回覆）：
- slug 改名為 `industry-strategy-platform`（編號維持 06；舊 `semiconductor-map` 不留別名）。
- 舊 `src/components/ecosystem/`（E01–E10，未掛載死碼）整組停用刪除，全部重寫；僅 E09 RAG console 的互動殼**評估後可移植**，資料與文案全換。
- 模組數 12 + Demo Bridge（比 newsintel 的 16 精簡，但 AI 三模組加深）。

---

## 2. 專案定位與故事

### 2.1 一句話定位（草稿）

> **英**：A Crunchbase for frontier tech — a self-built, analyst-grade intelligence platform where every company row reads like a brief, and an AI strategist layer is designed to keep it that deep at scale.
>
> **中**：一個為前沿科技而生的 Crunchbase——自建、分析師等級的情報平台：每一列公司紀錄都能當一份簡報來讀，並設計了一層 AI 策略師，讓這種深度能夠規模化。

### 2.2 敘事弧線（五幕）

1. **BUILD／建庫** — 「Crunchbase 告訴你這家公司**存在**，卻不告訴你它**值不值得追**。」從這個缺口出發，自建 201 家前沿科技公司、六段式分析師 schema 的資料庫。
2. **WRITE／寫作** — 把公司與趨勢寫成有觀點的深度文本：護城河、商業模式、資金、風險、投資判斷（VERDICT）。這是產品的靈魂，也是最貴的成本。
3. **AUTOMATE／代理** — 深度寫作無法無限手工。設計 **AI 產業策略師 Agent** 與**文案管理工作台**：把「檢索→分析→撰寫→審核→發佈」拆成可組合的技能模組與可管理的編輯狀態流。（概念設計）
4. **QUERY／查詢** — 設計 **Grounded RAG 查詢層**：讓決策者用白話向 201 筆結構化紀錄提問，每個回答都引用背後的公司列。（概念設計）
5. **DESIGN & SHIP／設計與上線** — 線框圖 → 低保真 → 高保真 → 互動原型 → Vercel 上線：地球儀首頁、雙欄簡報、可展開的觀測站表格。

### 2.3 與其他專案的差異化（寫進 overview）

- 對 02（deeptech-database）：那是「把公開訊號整理成研究資料庫」的**內部工程**；這個是「對外、全球、有觀點」的**產品**。
- 對 04（news-intelligence）：那是「每天自動產生 briefing 的**AI 管線**」；這個是「承接訊號之後，資料庫、深度寫作、AI 策略師與介面如何構成一個**產品**」。（僅此一句交叉連結，不重述爬蟲。）
- 對 07（ITRI 新創商情平台）：那是「給團隊的內部即時儀表板」；這個是「陌生人打開就能用的對外情報產品」。

### 2.4 pull quote（草稿）

> **英**："Crunchbase tells you a company exists. An analyst tells you whether it matters. The product bet here is a database where every row carries the analyst's answer — and an AI layer designed to keep that promise at scale."
>
> **中**：「Crunchbase 告訴你一家公司存在，分析師告訴你它重不重要。這個產品賭的是：一個每一列都帶著分析師答案的資料庫——以及一層讓這個承諾能規模化的 AI。」

---

## 3. 從線上平台萃取的真實素材（Evidence inventory）

> 已用 Playwright 實際渲染三個頁面並存下截圖與內文（實作時會重新擷取存進 repo）。以下是**可核實**的事實。

### 3.1 首頁 `/`
- 品牌膠囊：**Strategy Intelligence Platform**；主標 **"Strategy Intelligence for Frontier Tech"**；副文「Explore global innovation hubs and track emerging companies — designed for continuous monitoring.」
- 兩個 CTA：**Industry Strategy Insights**、**Startup Observatory**。
- 主視覺：**互動地球儀** + hub marker，點選切換 **TECH HUB BRIEF** 卡（範例：San Francisco Bay Area；FOCUS THEMES：AI infrastructure / Venture capital / Enterprise SaaS / Compute ecosystems）。
- 深色主題、右上 **EN / 中文** 切換、底部浮動導覽（home／chart／database）。

### 3.2 洞察 `/insights`
- 左欄 **CHAPTERS** 時間軸，右欄單篇全文。目前 5 篇策略簡報（皆 2025-12）：
  1. Power is becoming the binding constraint for AI scale-out
  2. Advanced packaging is the new "fab capacity" bottleneck
  3. Photonics is moving from "research" to "network necessity" for AI clusters
  4. Autonomy is redefining the defense–rescue drone stack
  5. Enterprise semantic search is moving from "RAG demos" to governance-grade systems
- **單篇結構**：`Strategic brief` → 大標 → 摘要 → 主題標籤 → **KEY TAKEAWAYS**（3 條）→ 多段敘事本文 → **SIGNALS TO WATCH**（Grid / Hardware / Real estate / Ops）→ **SOURCES (PUBLIC)**（IEA、LBNL 等）。

### 3.3 新創觀測站 `/startups`
- 標題 **"Curated frontier-tech companies"**，副文「Fast scan → open a row for analyst notes: moat, model, risks, and verdict.」**Results: 201**。
- 控制列：**Search（company / sector / moat / model）** + **Filter: all sectors**（~40 個 sector）。
- 表格四欄：**DATE / COMPANY / SECTOR / SNAPSHOT**；**展開一列**見六段分析師註記：**FOUNDERS BACKGROUND / THE MOAT / BUSINESS MODEL / FUNDING STATUS / KEY RISKS / VERDICT**。（範例：Cognition AI — VERDICT 給出「category-defining leader… richly priced… track as bellwether」的明確判斷。）
- 叢集舉例：Haptics(10)、Organ-on-chip(7)、Drone pollination(7)、AgTech laser weeding(7)、Humanoid robotics(5)、Single-cell(5)、Personalized nutrition AI(5)、Internal Developer Portals(5)、Enterprise SaaS(5)、ClimateTech(5)、AR optics(5)、CRISPR、Microbiome、Photonics、Hypersonics、Space/orbital、Perovskite solar、Longevity、Radar-absorbing 迷彩、Neurotech/BCI、AI agents… 資料日期集中在 2025-12-09～2025-12-15。

### 3.4 截圖清單（實作時擷取並存入 repo）
存到 `public/strategy-platform/`，比照 product-showcase 的 `public/product/` 慣例，以 `import.meta.env.BASE_URL + 'strategy-platform/...'` 引用：
- `home-globe.png`（地球儀 + TECH HUB BRIEF）
- `insights-brief.png`（單篇簡報全文 + KEY TAKEAWAYS）
- `startups-table.png`（201 列表格 + 搜尋/篩選）
- `startups-detail.png`（展開列的六段分析師註記）
- 可選 `home-zh.png`（中文版），供雙語示意。

> 擷取方法（已驗證可用）：Playwright headless shell `~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-x64/chrome-headless-shell`；SPA 內導覽要**點 CTA**（`Industry Strategy Insights` / `Startup Observatory`）而非直接打 `/insights`（直接打會 404，client-side routing）。地球儀 canvas 會擋 `fullPage`，改用 viewport + 分段捲動截圖。

---

## 4. 頁面資訊架構（Page IA）

沿用 `ProjectPage.jsx` 既有骨架，維持與其他專案一致的閱讀節奏：

```
Hero（category / title / hook / stack tags / role·timeline·status·impact）
  └─ 新的自繪 SVG 封面（Neural Signal OS 調色盤；見 §6.3）
Overview（3–4 段：全球定位 + 差異化 + 誠實邊界）
─ StorytellingCaseStudy（caseDeck + storyMoments + storyChapters + pullQuote）  ← 既有共用元件，只餵資料
─ ProjectExtraSection → <StrategyPlatformEvidence/>  ← 本專案互動證據層（§5，新建）
Outcomes（5 條，deep-link 到對應模組，沿用 outcomeModules 機制）
Technical Approach（tech grid，6 塊）
Prev / Next 專案導覽
```

掛載點（與 dataroom / evidence-lab 同模式）：
- `ProjectExtraSection.jsx`：`if (slug === 'industry-strategy-platform') return <StrategyPlatformEvidence/>`。
- `projects.js` 第 06 筆整筆改寫（含 `outcomeModules` 指向新模組 id）。
- `PROJECT_THEMES['industry-strategy-platform'] = 'map'`（沿用暗色系，貼近線上地球儀主題）。

---

## 5. 互動證據層模組設計（核心）

### 5.1 殼層（Shell）— 以 newsintel 為藍本

新建 `StrategyPlatformEvidence.jsx`，結構比照 `NewsIntelEvidence.jsx`：

1. **Hero**：eyebrow（`Evidence layer · v1 · 2026-07`）+ 標題 + lead + 一條 **WireTicker**（產品的一天：`CURATE → WRITE → AGENT DRAFT → REVIEW → PUBLISH`）。
2. **Sticky Ledger**：左邊五幕跳點（BUILD / WRITE / AUTOMATE / QUERY / DESIGN），右邊 **Lens 篩選 chips**。
3. **Navigator（contact sheet）**：模組縮圖網格，每格一個手繪 glyph（沿用 newsintel 的 THUMBS 手法）。
4. **Act-grouped 模組**：`React.lazy` + `Suspense` + Skeleton，逐一 Reveal。
5. **Live Demo Bridge**：三張卡連到真實 `/`、`/insights`、`/startups`（文案與 04 區隔：強調「來查資料庫、來讀一篇真的簡報」）。

**Lens 篩選**（取代 newsintel 的 fidelity，貼合三支柱）：
`DATA`（資料庫）· `WRITING`（產業文本）· `AI`（Agent + Ops + RAG）· `DESIGN`（線框到高保真）· `BUILD`（工程）。每 chip 顯示該鏡頭模組數，可切換高亮/淡出（`.is-muted` 40%）。

**標章制度**（沿用 + 新增一枚）：`REAL`／`RECONSTRUCTED`／`SIMULATED`／`ILLUSTRATIVE`，**新增 `CONCEPT`＝我設計的功能提案，錨定在真實資料上、但尚未於線上運行**。AI 三模組全部掛 `CONCEPT`（明確、誠實、且是加分項）。

### 5.2 模組清單（12 個 + Demo Bridge）

#### 幕一 BUILD／建庫

**M01 · 為什麼自己建一個前沿科技公司資料庫**（Lens: DATA · badge: RECONSTRUCTED）
故事背景。切入點：「Crunchbase 很廣但很貴、對前沿深科技的護城河/風險判讀不夠深」。含一張「Crunchbase vs 這個 observatory」取捨對照表（覆蓋廣度 vs 判讀深度、事實欄位 vs 觀點欄位）。

**M02 · 資料庫 schema 與產業分類法**（Lens: DATA · badge: REAL）
攤開真實資料模型：一列公司的欄位（DATE / COMPANY / SECTOR / SNAPSHOT + 六段分析師欄位）+ ~40 個 sector 分類法。互動：**可篩選、可搜尋的資料庫縮影**（15–20 筆真實公司 specimen，點 sector chip 即時過濾），示意線上 201 筆結構。數字全部來自真實爬取。

**M03 · 策展與收錄方法（Curation loop）**（Lens: DATA · badge: RECONSTRUCTED）
對標 Crunchbase 的品質維持機制：候選發掘 → 去重（同賽道多家並列）→ 分析師撰寫 → 事實/資金查核 → 收錄。標明可核實 vs 流程重建。

#### 幕二 WRITE／產業文本

**M04 · 拆解一篇策略簡報**（Lens: WRITING · badge: REAL）
以真實一篇（如「Power is becoming the binding constraint for AI scale-out」）逐段標記：`Strategic brief` → 大標 → 摘要 → 主題標籤 → KEY TAKEAWAYS → 敘事本文 → SIGNALS TO WATCH → SOURCES。互動：點各區塊，右側說明「這一段在回答讀者的哪個問題」。

**M05 · 拆解一筆公司分析師註記**（Lens: WRITING · badge: REAL）
以真實一列（如 Cognition AI）展示六段結構，並可切換 2–3 家不同賽道公司（AI agent / humanoid robotics / CRISPR），看同一套框架如何套用。強調「有觀點的 VERDICT」是與純資料庫的分野。

---

#### 幕三 AUTOMATE／AI 產業策略師 ★本專案技術重點，帶到最深★

> 這一幕是回應你「特別介紹 AI 功能、帶越深越專業越好」。三個 AI 模組（M06/M07/M08）**互相咬合成一個系統**：M06 是「一顆會寫分析的大腦」、M07 是「管這顆大腦產出的編輯台」、M08 是「讓別人查詢這些產出的入口」。全部量身錨定在平台真實的六段式 schema 與 201 筆紀錄上，標 `CONCEPT`。

**M06 · AI 產業策略師 Agent：技能模組系統**（Lens: AI · badge: CONCEPT）

*模組目標*：定義一個 agent，工作是「給一個公司名或一個產業訊號 → 產出一篇符合 M05 六段結構、且達到 M05 深度的分析師註記」。把它拆成**可組合、可獨立驗證的技能模組**，每個技能講清楚 `輸入 / 方法 / 輸出 / 護欄（guardrail）`：

| # | 技能模組 | 輸入 | 方法（設計） | 輸出 | 護欄 |
|---|---|---|---|---|---|
| S1 | `SOURCING` 檢索 | 公司名／訊號 | 拉公開申報、募資、新聞；與既有 DB 列去重比對 | 帶來源標記的證據包 | 每項事實需附來源，無源不寫 |
| S2 | `MOAT-DECOMP` 護城河拆解 | 證據包 | 分類護城河型別（技術／資料／分佈／法規／資本）並評估耐久度 | THE MOAT 段 + 型別標籤 | 區分「真護城河」與「暫時領先」 |
| S3 | `MODEL-MAP` 商模對映 | 證據包 | 定價、ACV、GTM motion、upsell 面 | BUSINESS MODEL 段 | 不確定處標「推測」而非斷言 |
| S4 | `FUNDING-RECON` 資金重建 | 證據包 | 輪次、投資人、估值軌跡、資本密集度 | FUNDING STATUS 段 | 金額給區間 + 日期，不給假精確 |
| S5 | `RISK-FRAMING` 風險框架 | S2–S4 輸出 | 分類競爭／技術／資本／人才／平台五類風險 | KEY RISKS 段（編號） | 至少涵蓋一個「非顯而易見」風險 |
| S6 | `VERDICT-SCORE` 判斷評分 | 全部技能輸出 | 依 rubric 給 track / avoid / prioritise 傾向 + 有成本的理由 | VERDICT 段 | 必須可被反駁；標估值敏感度 |
| S7 | `BILINGUAL` 雙語產出 | 上述各段 | EN／繁中平行產出，數字逐字一致 | 雙語六段 | 數字/專有名詞不得因翻譯漂移 |
| S8 | `STYLE-GUARD` 文風守門 | 草稿全文 | 掃 AI 腔（排比堆砌、空泛形容詞）、對齊分析師語氣 | 定稿 | 每個主張需可回指證據 |

*編排（orchestration）*：一個 controller 依序調度 S1→S8，並在「草稿 → 發佈」之間插一道 **confidence + evidence gate**（證據不足就退回 S1 補料，而非硬寫）。

*互動設計*：使用者選一家公司或一個訊號 → 技能卡依序「亮起」→ 逐段拼出一篇註記；右側同步顯示每段對應到哪些技能與哪些證據。呈現成一張**技能系統圖 + 逐步組稿動畫**（尊重 reduced-motion）。

*誠實*：CONCEPT — 這是我設計的 agent 技能架構，grounding 用平台真實 schema；不宣稱線上已全自動運行。

**M07 · 文案管理工作台（Editorial Ops）**（Lens: AI · badge: CONCEPT）

> 回應你明確點名的「AI Agent 產業策略師的**文案管理**與撰寫工作」。M06 產草稿，M07 管草稿——這是把 AI 產出變成**可信賴內容資產**的人機協作層，也是「designed for continuous monitoring」那句 tagline 的落地。

*編輯狀態機*：`BACKLOG → AGENT-DRAFTED → HUMAN-REVIEW → FACT-CHECK → PUBLISHED → STALE`（當某公司募資/風險有新訊號 → 自動回到 backlog 觸發 M06 重跑）。

*看板視圖（kanban）*：卡片＝一家公司或一篇簡報，在各狀態欄之間移動。每張卡帶：指派的 agent run、版本、provenance（哪個來源證明了哪個欄位）、鮮度（多久沒更新）。

*互動設計*：一個看板 + 點卡展開「agent 草稿 vs 審稿人修訂 diff」+ 一個「鮮度佇列」（哪些列因訊號變動而過期、待重寫）。示意 3–4 家真實公司在不同狀態。

*為什麼專業*：它把 AI 內容生產當**編輯營運（editorial operations）**問題來設計——版本、審核、溯源、鮮度、重跑觸發——而不是「按一顆按鈕生成文章」。這正是 senior AI 產品設計的分野。CONCEPT。

**M08 · Grounded RAG 資料庫查詢層**（Lens: AI · badge: CONCEPT）

> 回應你「強調 RAG 資料庫的設計應用」。不是一個聊天框，而是一套**檢索架構設計**，把六段式 schema 變成可被白話提問、且每個回答都引用來源列的知識層。

*檢索設計（retrieval architecture）*：
- **切塊（chunking）**：把每列的六段拆成有型別、可引用的單元（company-level 事實、moat/risk 敘事、sector-level 聚合、cross-company 比較）。
- **混合檢索（hybrid）**：結構化過濾（sector / date / 有無某風險類型）**＋** 對 moat/model/risk 長文做語意檢索——先用結構縮小候選集，再語意排序。
- **查詢型別**：單一公司查詢、賽道比較（「humanoid robotics 裡誰護城河最弱？」）、主題橫切（「哪些公司會被 /insights 那篇 power constraint 波及？」）、以及 **insights 簡報 ↔ startup 列的交叉連結**。

*grounding 與引用*：每個回答**列出被引用的公司列**（可點回 M02 specimen 的那幾列）；證據不足時**明說「資料庫尚無足夠依據」而非幻覺**（anti-hallucination 設計）。答案旁同步顯示被檢索到的來源集。

*評測設計（eval）*：附一個小 gold-set（Q → 期望被引用的列），量測「引用正確率」而非只看語氣流暢——展示我把 RAG 當**可被評測的系統**在設計。

*自我指涉的巧思*：線上 /insights 第 5 篇正好是「Enterprise semantic search is moving from RAG demos to governance-grade systems」——本模組直接呼應：這個資料庫的 RAG 是**治理級（有引用、有評測、會拒答）**，不是 demo。

*互動設計*：釘選 3–4 個示範問題 → 回答 + 被引用列（可跳轉）。以真實 201 筆做 client-side grounding 展示。CONCEPT。

---

#### 幕四 DESIGN & SHIP／設計與上線

**M09 · 資訊架構與線框圖（Lo-fi wireflow）**（Lens: DESIGN · badge: LO-FI）
手繪風 SVG 線框呈現三介面（globe home / insights 雙欄 / startups 表格）低保真版 + IA 樹，說明「為什麼首頁是地球儀、insights 用時間軸雙欄、startups 用可展開表格」。

**M10 · 高保真與已上線介面**（Lens: DESIGN · badge: HI-FI / REAL）
真實截圖（§3.4）置於瀏覽器框內，三分頁切換（比照 newsintel MP 與 product-showcase 的 browser-frame 手法）。每張標一句設計決策（如「地球儀 hub-switch 讓『全球視野』一眼可感」）。

**M11 · 元件與互動系統**（Lens: DESIGN · badge: HI-FI / CODE）
拆解可重用元件與狀態：地球儀 hub marker 選取態、可展開表格列、sector 篩選 chip、EN/中文 i18n 切換、浮動導覽；示意 focus/hover/expanded/empty 狀態。

**M12 · 技術架構與誠實限制**（Lens: BUILD · badge: REAL / RECONSTRUCTED）
前後端與資料流、與 04 news-pipeline 的一句話交叉連結、Vercel 部署、雙語架構。收尾一段**誠實限制與 roadmap**：AI 三層（Agent/Ops/RAG）目前為概念設計、資料更新頻率、下一步實作優先序。

**Live Demo Bridge**：三張卡 → 真實 `/`、`/insights`、`/startups`。

### 5.3 模組 ↔ 幕 ↔ Lens ↔ 標章對照

| 模組 | 幕 | Lens | 標章 |
|---|---|---|---|
| M01 建庫緣起 | BUILD | DATA | RECONSTRUCTED |
| M02 Schema/分類法 | BUILD | DATA | REAL |
| M03 策展方法 | BUILD | DATA | RECONSTRUCTED |
| M04 簡報解剖 | WRITE | WRITING | REAL |
| M05 公司註記解剖 | WRITE | WRITING | REAL |
| **M06 AI Agent 技能系統** | AUTOMATE | AI | **CONCEPT** |
| **M07 文案管理工作台** | AUTOMATE | AI | **CONCEPT** |
| **M08 RAG 查詢層** | QUERY | AI | **CONCEPT** |
| M09 線框/IA | DESIGN | DESIGN | LO-FI |
| M10 高保真/截圖 | DESIGN | DESIGN | HI-FI/REAL |
| M11 元件/互動 | DESIGN | DESIGN | HI-FI/CODE |
| M12 架構/限制 | SHIP | BUILD | REAL/RECONSTRUCTED |

Lens 計數：DATA 3 · WRITING 2 · **AI 3** · DESIGN 3 · BUILD 1。（AI 為第二大鏡頭，符合「特別強調」的要求。）

---

## 6. 視覺與設計系統

### 6.1 主題與命名空間
- CSS scope 前綴 **`.isp`**（已確認 repo 未占用；現有為 `.dt / .eco / .gx / .ni / .sp / .vf`）。token 放 `.isp` root 的 `--isp-*` 區塊，**不得**污染 `:root`（全域有衝突的 `--teal`/`--bg-2`/`--amber`）。
- `PROJECT_THEMES` 沿用 `'map'`（深藍夜色，貼近線上暗色地球儀主題）。

### 6.2 調色盤
- 沿用 **Neural Signal OS**：底近黑藍、teal `#35C2B0` 主訊號、amber `#E8A33D` 強調/警示、red `#E5675A` 高風險。與線上平台的深色冷色 UI 一致，重建截圖不突兀。
- 圖表若涉分類/連續色，先讀 `dataviz` skill 再落色。

### 6.3 新的自繪 Hero SVG（取代舊 field-atlas 封面）
概念（Neural Signal OS 調色盤、無外部圖片、inline `data:image/svg+xml`）：**左：地球儀 + 3 個 hub marker；中：一份正在被組成的 brief（標題列 + takeaways 條）；右：一疊資料庫列（teal/amber 狀態點）**——一眼講完「全球訊號 → 深度文本 → 結構化資料庫」。與 02/04/05 同語彙。

### 6.4 響應式與無障礙
- 沿用斷點（1023 / 767 / 640）；sticky ledger 窄螢幕改 static；表格類 `overflow-x:auto`。
- 鍵盤可達（`onActivate`）、`usePrefersReducedMotion` 尊重減動、SVG `aria-hidden`、模組 `aria-label`。全部沿用 kit 既有工具。

---

## 7. 技術實作規劃

### 7.1 檔案結構（新建）
```
src/components/strategy-platform/
  StrategyPlatformEvidence.jsx      # 殼層（hero + ledger + navigator + acts + demo bridge）
  shared/
    ispKit.jsx                      # injectStyles / useI18n / usePrefersReducedMotion /
                                    #   useInView / Reveal / ActDivider / IspProvider / tokens
  data/
    strategyPlatformContent.js      # ACTS / MODULES 註冊表 / LENSES / SHELL 文案 / BADGES(含 CONCEPT) /
                                    #   LIVE_URL / ROUTES / 真實公司 specimen / Agent 技能表 / RAG 示範問答
  M01_WhyDatabase.jsx
  M02_SchemaTaxonomy.jsx
  M03_CurationLoop.jsx
  M04_BriefAnatomy.jsx
  M05_AnalystNote.jsx
  M06_StrategistAgent.jsx           # ★ AI Agent 技能系統
  M07_EditorialOps.jsx              # ★ 文案管理工作台
  M08_RagConsole.jsx                # ★ Grounded RAG 查詢層
  M09_Wireflow.jsx
  M10_ShippedSurfaces.jsx
  M11_ComponentSystem.jsx
  M12_ArchitectureLimits.jsx
  AUDIT.md                          # provenance 對照（哪些數字/文本來自真實爬取 vs 概念設計）
public/strategy-platform/           # 真實截圖（§3.4）
```

### 7.2 復用既有基礎建設（不重造輪子）
- `injectStyles` / `usePrefersReducedMotion` / `useViewport` ← `launch-os/shared/ModuleFrame.jsx`。
- `useInView` / `mulberry32`（決定式隨機，供 specimen）← `evidence-lab/shared/labKit.jsx`。
- `useI18n` ← `launch-os/shared/useI18n.js`（與 `LanguageProvider` 同步）。
- `ispKit.jsx` 只做「`.isp` token + ActDivider/Reveal/Provider + re-export 上述 hooks」。

### 7.3 關鍵慣例（踩過的坑）
- **injectStyles 的 id 不可等於 section id**：style id 一律加 `-style` 尾綴（否則 `<style id="isp-m06">` 會蓋掉 `<section id="isp-m06">`，讓 ledger 跳點與 scroll-spy 失效）。
- 錨點跳轉一律 `scrollIntoView`，不可 `href="#id"`（撞 hash 路由）。
- 模組單檔 `// ---- DATA ----` 區塊；顯示字串集中在 content 檔或各模組 COPY，元件不硬編字串。
- 按鈕 reset 用 `:where()` 保 0 specificity。
- 截圖用 `import.meta.env.BASE_URL + 'strategy-platform/...'` 引用。

### 7.4 資料真實性（AUDIT.md 逐項記錄）
- **可核實（REAL）**：201 家、sector 叢集大小、5 篇簡報標題與結構、公司六段註記結構、三介面外觀——來自 2026-07-10 真實爬取。
- **重建（RECONSTRUCTED）**：M03 策展流程。
- **概念設計（CONCEPT）**：M06 Agent 技能系統、M07 文案管理工作台、M08 RAG 架構——明標「我設計的功能提案，grounding 於真實 schema，尚未於線上運行」。

---

## 8. 文案風格指南

- **雙語**：英文為主、繁中對照（content 檔 `{ en, zh }`）。繁中用台灣用語、半形英數與中文間留空格。
- **語氣**：像做過這產品的人跟資深同行講話——具體、有觀點、敢說限制。學 04/05 的 lead（第一人稱、講「我怎麼做、為什麼這樣選」）。
- **避免 AI 腔**：不要「In today's fast-paced world」「revolutionary/seamless/robust」堆砌；不要每段三點排比；不要空泛形容詞代替事實。
- **多用真實名詞**：直接寫 Cognition AI、CoWoS、perovskite tandem、humanoid robotics（資料庫本來就有），比抽象描述可信。
- **誠實**：AI 三模組明說「概念設計」——這是 senior 感的來源，不是弱點。

---

## 9. 交付與驗收清單

**交付物**
- [ ] `projects.js` 第 06 筆整筆改寫（新 hero SVG、caseDeck、storyMoments、storyChapters、outcomes+outcomeModules、tech、pullQuote、雙語全備）。
- [ ] `src/components/strategy-platform/` 全套（殼層 + 12 模組 + kit + content + AUDIT.md）。
- [ ] `public/strategy-platform/` 4–5 張真實截圖。
- [ ] `ProjectExtraSection.jsx`、`PROJECT_THEMES`、home 專案卡、slug 改名。
- [ ] 移除舊 `ecosystem/` 與舊 `chain-flow` 區塊。

**驗收（用 `verify` / `run` skill 實跑）**
- [ ] `npm run dev` 開 `#/project/industry-strategy-platform`：五幕 ledger 跳點、Lens 篩選、12 模組 lazy-load、Demo Bridge 外連正常。
- [ ] AI 三模組互動（Agent 組稿動畫、Ops 看板、RAG 問答+引用）皆可操作。
- [ ] EN/中文 全頁無漏字、無破版。
- [ ] 窄螢幕（<768）ledger 轉 static、表格可橫捲、無水平溢出。
- [ ] 鍵盤可操作、reduced-motion 生效。
- [ ] scroll-spy 與 outcome→module deep-link 準確（injectStyles id 無撞 section id）。
- [ ] 對照 AUDIT.md，頁面每個數字可溯源；AI 模組明標 CONCEPT。

---

## 10. 施工範圍與檔案異動一覽

| 動作 | 檔案 | 說明 |
|---|---|---|
| 改寫 | `src/data/projects.js`（第 06 筆） | slug/標題/hook/overview/story/outcomes/tech/hero SVG 全換 |
| 新增 | `src/components/strategy-platform/**` | 殼層 + 12 模組 + kit + content + AUDIT |
| 新增 | `public/strategy-platform/*.png` | 真實截圖 |
| 編輯 | `src/components/case-studies/ProjectExtraSection.jsx` | 新增 slug 分派，移除舊 chain-flow |
| 編輯 | `src/data/projects.js` `PROJECT_THEMES` | 新 slug → 主題 |
| 刪除 | `src/components/ecosystem/**` | 未掛載死碼，全部重寫 |
| 可選同步 | `src/main.optimized.jsx` | 目前 index.html 走 `src/main.jsx`，此檔未使用；預設**不動** |

> 實際渲染路徑：`src/main.jsx` → `App.jsx` → `HomePage`/`ProjectPage` → `src/data/projects.js`；`main.optimized.jsx` 未被引用，可忽略。

---

## 11. 開放問題（可回可不回；不回則照計畫執行）

1. **AI 模組數**：AI 幕現為 3 模組（Agent / Ops / RAG）帶到最深。若你覺得頁面偏長，可把 M07 文案管理併進 M06 → AI 剩 2 模組、總數 11。**預設維持 3 個**（你要求帶深）。
2. **Agent 示範對象**：M06/M08 用哪幾家真實公司當示範？預設挑跨賽道三家：**Cognition AI（AI agent）、Figure AI（humanoid robotics）、CRISPR Therapeutics（生技）**，展示同一套框架跨領域適用。
3. **RAG 示範問題**：預設釘選三題——單一公司、賽道比較（humanoid robotics 護城河最弱）、主題橫切（power-constraint 曝險）。若你有想秀的特定問句，告訴我。

---

### 附：已完成的前置作業
- 已用 Playwright 實際渲染並存下 `/`、`/insights`、`/startups` 的內文與截圖（含 startups 展開列六段註記、insights 單篇全文結構、201 家/~40 群的分佈），作為上述事實依據。
- 已核對 repo：確認實際渲染路徑、既有證據層架構（newsintel/dataroom/evidence-lab/launch-os）、CSS scope 佔用、舊 `ecosystem/` 為未掛載死碼。

> 本版已依你 2026-07-10 的三點回覆定稿。確認後，我會在下一個視窗開始實作。
