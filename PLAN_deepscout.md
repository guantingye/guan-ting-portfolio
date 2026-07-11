# 新增計畫 — 專案 09：DeepScout（深科技偵搜副駕）

> 目標：在作品集新增第 **09** 號專案，主角是已上線的獨立作品 **DeepScout**（[guantingye.github.io/DeepScout](https://guantingye.github.io/DeepScout/)）——一個把 AI 產品設計流程做成「可操作網站」而非簡報的完整案例。
>
> 本文件為「純計畫」。經你確認後，才會在**下一個視窗**動手編輯與實作。
>
> 撰寫：2026-07-10 · **修訂 v2**（同日：線上站路由修復後全站複測，前置問題已解除，細節依實測更新）· 依據：SKILL.md ＋ EVIDENCE_LAYER_TEMPLATE.md ＋ DeepScout 原始碼全量閱讀 ＋ 線上站 Playwright 實測截圖（修復前後各一輪）。

---

## 0. 一頁摘要（TL;DR）

- **要做的事**：新增 `slug: 'deepscout'`、編號 09 的專案頁。定位判斷（本計畫最重要的一條）：**DeepScout 線上站本身已經是完整的案例研究**（八章、可操作、雙語），所以作品集這一頁**不重演那八章**，而是打開它的「**設計檔案（design record）**」——命題怎麼定、線框怎麼演化、低保真到高保真改了什麼、不確定性為什麼要有自己的 UI、真資料的代價是什麼、工程品質怎麼守。線上站是高保真原型與最終品；這一頁是它背後的設計思考。
- **敘事殺手鐧**（寫進 overview 收尾）：底層訊號管線（專案 02 深科技資料庫、04 新聞情報管線）是我親手寫的，上層的產品判斷與介面（DeepScout）也是我設計的——**資料層與產品層接成同一條線**，這是只會做 prototype、碰不到資料的候選人給不出的東西。
- **交付形態**：`projects.js` 完整條目（含自繪 SVG 封面）＋ 一個 `.ds` 命名空間的互動證據層（**11 個模組 + 1 個 Live Bridge**，分五幕），素材全部來自 DeepScout repo 的真實內容與線上站實拍截圖，沿用作品集的誠實標章制度（REAL / RECONSTRUCTED / ILLUSTRATIVE）。
- **簽名互動**：**保真階梯（Fidelity Ladder）**——同一家公司（Corintis）的 brief，從手繪線框 → 低保真 → 結構化中保真 → 上線高保真，四階並排、逐階標註「這一輪決定了什麼」。直接回應線框圖／低保真／高保真／原型的呈現需求，且其他七個證據層都沒有這個機制。
- **✅ 前置問題已解除（2026-07-10 複測確認）**：初版計畫發現的 GH Pages 路由壞損（P1）、footer 佔位符（P2）、sitemap 佔位網域（P3）皆已由你修復，全站八章與 `?company=`／`?state=` 深連結經 Playwright 逐一實測可正常瀏覽。詳見 §1.7 複測紀錄；僅剩一項**選擇性**的署名建議（D6）。**執行階段可直接從截圖採集開始，無阻斷項。**

---

## 1. 實品盤點（可核實的事實，全部來自 repo 與實測）

### 1.1 這個作品是什麼

DeepScout 不是一家公司，是一個 AI 產品設計案例：**把散落在融資、專利、新聞、團隊背景裡的雜訊，收斂成一份結構化、附來源、標記信心、可決策的 scouting brief**。整個案例做成一個雙語（EN／繁中）網站，中心是一個真的能操作的 Copilot demo，而不是一疊 slides。README 開宗明義：「An AI product design case study, built as a working site rather than a deck.」

### 1.2 八章結構（線上站的骨架）

| # | 群組 | 章節 | 互動核心 |
|---|---|---|---|
| 01 | Product | **The Copilot** 偵搜副駕 | 輸入公司名 → 模擬掃描 → 生成附來源、標信心的結構化 brief；主控台上有 **6 家預載公司**（Frore、Ayar Labs、Celestial AI、BrainChip、Prophesee、Proxima Fusion，各帶訊號強度字形，爭議案例以 amber 呈現）與「SHOW DESIGNED STATES」三鍵（低信心／拒答／逾時） |
| 02 | Research | **Personas & JTBD** | 切換分析師／創新主管／被偵搜新創三種角色，同一份 brief 重新標重點，每個 JTBD 對回 Copilot 裡真實上線的設計 |
| 03 | Research | **Analyst Journey** | 兩條疊加的信心波形（有／無 DeepScout），「評估」階段的提升刻意壓低——判斷留給人 |
| 04 | Strategy | **Risk & Guardrail Register** | 打開護欄開關，風險節點在「機率 × 衝擊」矩陣上從固有位置移到殘餘位置 |
| 05 | Strategy | **Prioritization & Decision Gates** | 同一份 backlog 在 RICE 與 Impact/Effort 兩套鏡片下重新排序；七個具名決策閘門 |
| 06 | Strategy | **Experiment Design** | MDE 滑桿即時算樣本數與天數；跑測試畫出 95% CI 效果圖＋護欄指標 |
| 07 | System | **Knowledge Graph** | 手刻力導向模擬；選兩個節點 Find Connection 解出最短路徑 |
| 08 | System | **Component Lab** | 設計系統全覽，每個對比度即時對照 WCAG 計算，不是宣稱 |

另有：⌘K 指令面板（搜公司／章節，深連結進 Copilot 特定狀態）、`/copilot?company=<id>` 與 `?state=` 深連結機制、print 樣式（「brief 本來就是要交給別人的文件」——只有 brief 值得印，chrome 全部隱藏）。每章開場都有一塊 amber 邊線的 **ANALYST'S NOTE** 導讀框——把「章節導讀」寫成分析師眉批的編輯手法，值得在 09 頁當設計細節引用（`.ds` 方言自己**不**複製這個框，保持家族辨識度）。

**深連結格式（實測確認）**：`https://guantingye.github.io/DeepScout/<path>` ＋ query，例如 `/copilot?company=corintis`、`/copilot?state=insufficient`——Live Bridge 與各模組的「看實品」連結一律用此格式。

### 1.3 資料層（V2 的核心決策：虛構換真實）

- **14 家真實、公開可查的深科技新創**，橫跨固態散熱、微流體冷卻、矽光子、神經形態、事件相機、聚變、石墨烯光子、光量子。每個欄位帶 `source.url` + `retrievedAt`（凍結於 2026-07-10），人類可讀的來源索引在 `docs/data-sources.md`。
- **兩家在製作期間被收購**：JetCool → Flex（2024-11，約 $53M）、Celestial AI → Marvell（2026-02，約 $3.25B）——這不是意外，是「每個欄位為什麼帶時效戳」的活證據。
- **兩個真實存在爭議的公開敘事**：Prophesee（2024 司法重整 → 2025–26 恢復營運）、BrainChip（營收 vs. 估值落差）——讓 `CONFLICTING SIGNAL` 與 `UNVERIFIED` 旗標用真資料成立。
- 掃描動畫是**前端模擬重播**，不即時查詢任何來源——這件事在站內首頁誠實聲明區直接寫明。

### 1.4 產品設計框架（站內已成立的方法論）

- **核心迴圈六步**：輸入命題 → 掃描訊號源 → 解析結構化 brief → 標記不確定 → **人工驗證（不可跳過）** → 決策（call / monitor / pass）。
- **三方張力 persona**：分析師（要速度與守得住）、創新主管（要訊噪比與排序）、被偵搜新創（怕被過期資料誤判）。
- **指標樹**：北極星＝每週被改善的分析師決策數；input＝coverage、signal-to-noise、time-to-brief、brief 採用率；guardrail＝誤判率、來源時效、未驗證誠實率。
- **四種設計過的 AI 狀態**：強訊號／低信心／訊號不足拒答（拒絕捏造 brief）／訊號源逾時，加上欄位級 UNVERIFIED／CONFLICTING 兩種旗標，與 HITL 動作（驗證欄位、回報不準確、重新掃描）。

### 1.5 設計系統與工程品質

- **視覺**：深海軍藍底（#0a0e14）＋ teal #34d8c4 主色 ＋ amber #f2a93c ＋ rose #e27a72（不確定／風險語意色）；Newsreader 襯線標題、Inter 內文、JetBrains Mono 標籤——與作品集 Neural Signal OS 調色盤（teal #35C2B0 / amber #E8A33D / red #E5675A）幾乎同族，世界觀天然一致。
- **技術**：Vite + React 18 + react-router-dom + react-icons，**零 UI／CSS framework**；八個模組是「密封的自足構件」，整合只加不改（lang prop、資料外移、深連結參數）。
- **雙語文案工程**：V2 把繁中全部**獨立重寫**（非翻譯），並寫成六條規則的 `docs/copy-style-guide.md`（破折號配額、句式黑名單、動詞在前、行話留英文＋盤古之白、朗讀測試）；V1 全站 51 處「——」被清理，改稿約 400 條字串。
- **品質關卡**：`scripts/verify.mjs`——console 錯誤掃描、360px 溢出掃描、axe 無障礙掃描、EN／中 smoke test；`prefers-reduced-motion` 全站支援；skip-link 與 focus-visible。
- **建置履歷**：`EXECUTION_PLAN_V1.md`／`V2.md` 兩份真實的執行計畫留在 repo 裡（V1 建站、V2「把像 AI 做的作品變成像資深 PM 做的產品」），`originals/` 保存八個模組的原始構件——**這是罕見的、可出示的過程證據**，證據層可以直接引用。

### 1.6 可用的數字清單（本頁只用這些，不發明新數字）

`14` 家真實新創 · `8` 章 · `4` 群組 · `6` 步核心迴圈 · `3` 種 persona · `4` 種 AI 設計狀態 ＋ `2` 種欄位旗標 · `3` 種建議動作（call/monitor/pass）· `6` 家主控台預載公司 · `7` 個決策閘門 · `2` 套優先級鏡片 · 北極星 `1`＋input `4`＋guardrail `3` · `2` 樁製作中收購 · `2` 個爭議敘事案例 · 文案守則 `6` 條 · V1 破折號 `51` 處清理 · 約 `400` 條字串改稿 · 資料凍結 `2026-07-10` · verify.mjs `4` 類檢查 · `2` 份執行計畫。
另有兩個**模組即時計算值**（引用時必須註明是站內即時算出、非固定宣稱）：風險登錄「固有高嚴重度風險 `4` 條」與「開啟護欄後殘餘風險 `↓67%`」。

### 1.7 部署現況（2026-07-10 修復後複測紀錄）

初版計畫發現的三項問題，複測（curl ＋ bundle 檢查 ＋ Playwright 渲染截圖）結果如下：

| # | 初版發現 | 複測結果 |
|---|---|---|
| P1 | `BrowserRouter` 無 `basename`，`/DeepScout/` 子路徑下全站路由匹配失敗 | ✅ **已修復**。部署 bundle 內已含 `"/DeepScout/"` basename；`404.html` SPA fallback 已就位；首頁、`/copilot?company=corintis`、`/copilot?state=insufficient`、`/risks` 等頁面逐一渲染確認正常。注意：子路由硬載入的 **HTTP 狀態碼仍是 404 但內容正常**——這是 GH Pages `404.html` fallback 手法的預期行為，不是 bug，執行時驗連結要看「渲染結果」不能只看狀態碼 |
| P2 | footer 署名為「Your Name」佔位符 | ✅ 佔位符已移除，現為「Designed & built by **DeepScout**」。剩一項選擇性建議：署名掛的是產品名而非作者名，對作品集用途而言，招聘方在站內看不到「這是誰做的」——建議改為真名（見 D6，由你決定） |
| P3 | `sitemap.xml`／`robots.txt` 為佔位網域 | ✅ 已指向正式網址 `https://guantingye.github.io/DeepScout/` |

**結論：無阻斷項**。截圖採集與 Live Bridge 外連可直接進行，正式網址即你提供的 GH Pages 網址。

---

## 2. 專案 09 的定位與敘事

### 2.1 核心定位判斷：設計檔案，不是轉播

線上站已經把「案例研究」這件事做完了，而且做得比一般作品集頁更重（可操作、雙語、有品質關卡）。如果 09 號頁再把八章講一遍，就是「副本的副本」，兩邊互相稀釋。所以分工是：

- **線上站＝作品本體**：高保真原型、最終品、可操作的證據。
- **作品集 09 頁＝設計檔案**：講線上站**沒辦法講自己**的事——命題是怎麼從三方張力收斂的、介面長成這樣之前畫過什麼、低保真到高保真每一輪各決定了什麼、為什麼「拒答」是一個要設計的狀態而不是錯誤頁、真資料遷移付出了什麼代價、文案為什麼要獨立重寫、品質關卡怎麼設。每個模組的結尾都深連結到線上站對應章節：**這裡講理由，那裡看實品**。

### 2.2 一句話定位（草稿）

> **英**：An AI scouting copilot, designed end to end and shipped as a working bilingual site — this page opens the design record behind it: the framing, the wireframes, the fidelity passes, and the decision to give uncertainty its own UI.
>
> **中**：一個從頭到尾自己設計、並以雙語網站形式上線的 AI 偵搜副駕。這一頁打開的是它背後的設計檔案：命題、線框、保真迭代，以及「給不確定性一個自己的介面」這個決定。

### 2.3 敘事弧線（五幕，也是證據層的五個 act）

1. **FRAME／框架** — 分析師的分頁地獄；三種讀者的天然張力；「brief 要守得住」作為產品定義；四路訊號怎麼變成一份 brief 的欄位解剖。
2. **DRAW／成形** — 線框演進（主控台佈局的取捨）→ 保真階梯（同一份 brief 四階並排）→ 不確定性的狀態設計（四狀態＋兩旗標，拒答是設計出來的）。
3. **SYSTEM／系統** — 設計系統與元件誠實（對比度即時計算、print 即交付物）；雙語文案工程（六條守則、V1→V2 真實改稿對照）。
4. **PROOF／驗證** — 真資料的代價（14 家、兩樁收購、兩個爭議案例、時效戳解剖）；指標樹與實驗設計；風險登錄 → 每條護欄在 UI 裡的落點。
5. **SHIP／上線** — 技術框架與工程衛生（密封模組原則、i18n 架構、verify.mjs、⌘K 與深連結）；Live Bridge 開啟實品八章。

### 2.4 與其他專案的邊界（各一句交叉連結，不重述）

- 對 **02（deeptech-database）**：那是「把公開訊號整理成研究資料庫」的資料工程；09 是「假設這條管線餵給一個產品，這個產品該長什麼樣」的產品設計答案。
- 對 **04（ai-news-intelligence）**：那是每天真的在跑的訊號管線；09 把「訊號 → 結構化 → 附來源 → 給人決策」同一套信念做成可操作的產品介面。
- 對 **06／07（策略平台／ITRI 商情平台）**：那兩個是對內／對外的**情報交付面**；09 是站在同一個領域上，把「AI 怎麼誠實地輔助決策」當成設計題目本身。
- **殺手鐧句**（overview 收尾）：「這個領域的資料層我自己爬過、建過（02、04），所以 DeepScout 的每一個產品判斷——哪些訊號可信、哪裡該拒答、時效戳為什麼是一等公民——都是從資料的手感長出來的，不是從想像。」

### 2.5 職缺能力對應（模組 ↔ 招聘方檢核點）

目標職缺：**AI Product Designer／AI PM／Product Designer（AI 團隊）／UX Engineer**。

| 招聘方想看到的能力 | 對應內容 |
|---|---|
| 問題框架與產品判斷 | M01 命題與張力、M02 訊號→欄位、storyChapters |
| UX 研究落地（persona／JTBD／journey） | M01；Live Bridge 直達站內 02／03 章 |
| 資訊架構與互動設計 | M02、M03 線框演進、M05 狀態設計 |
| 視覺與設計系統 | M04 保真階梯、M06 元件誠實 |
| **Responsible AI／AI UX**（本頁最大差異化） | M05 不確定性設計、M10 風險→護欄 |
| 指標素養與實驗設計 | M09 指標樹與實驗 |
| 內容設計／在地化 | M07 雙語文案工程 |
| 前端工程能力 | M11 技術框架、整個證據層本身 |
| 資料工程可信度 | M08 真資料、02／04 交叉連結 |

### 2.6 文字風格守則（本頁文案的驗收標準）

直接沿用 DeepScout 自己的 `copy-style-guide.md` 六條規則來寫 09 頁的所有繁中文案（獨立撰寫非翻譯、破折號每畫面至多一處、句式黑名單、動詞在前、行話留英文＋盤古之白、朗讀測試），疊加 SKILL.md 的聲音標準：講判斷與取捨而非功能清單、只用 §1.6 的已核實數字、雙語數字完全一致。**這個案例的文案守則本身就是展品之一（M07），所以 09 頁自己的文案不能打臉它。**

---

## 3. `projects.js` 條目規格（草稿文案）

### 3.1 Hero 區欄位

| 欄位 | 草稿 |
|---|---|
| `slug` / `num` | `'deepscout'` / `'09'` |
| `category` | `AI Product Design · Decision Intelligence`／`AI 產品設計 · 決策情報` |
| `title` / `subtitle` | `DeepScout` / `AI Scouting Copilot — a working case study` |
| `zhTitle` / `zhSubtitle` | `DeepScout 深科技偵搜副駕` / `一份做成產品的 AI 產品設計案例` |
| `hook` | EN: *A scouting copilot that reads funding, patent, news, and team signals, then writes a brief an analyst can defend — sourced, dated, and honest about what it cannot verify. Shipped as a working bilingual site; this page opens the design record behind it.* |
| `zhHook` | *讓 AI 讀融資、專利、新聞與團隊訊號，寫出一份分析師守得住的 brief：欄位附來源與日期，查不到的老實標成未驗證。作品本身是一個上線的雙語網站，這一頁打開的是它背後的設計檔案。* |
| `stack` | `['React 18', 'Vite', 'React Router', 'Interaction Prototyping', 'Design System', 'Bilingual UX Writing']` |
| `role` | `Product Designer & Sole Builder`／`產品設計 / 獨立建造` |
| `timeline` | `2026` |
| `status` | `Live · 8-chapter bilingual site`／`上線 · 八章雙語網站` |
| `impact` | `14 real startups · 4 designed AI states`／`14 家真實新創 · 4 種 AI 狀態設計` |
| theme | `PROJECT_THEMES['deepscout'] = 'ai'` |

### 3.2 `overview`（繁中版草稿，四段；英文版同資訊獨立撰寫）

> 分析師的一天常是這樣開始的：十幾個分頁攤在螢幕上，融資新聞一頁、專利檢索一頁、團隊背景一頁，心裡懸著的不是資訊太少，而是漏看或看錯一個訊號。DeepScout 的命題是把這些散落的雜訊收斂成一份結構化 brief：每個欄位附來源與時效戳、標好信心等級，查不到的就標成未驗證，而不是替你圓一個好聽的答案。
>
> 這個作品不是一疊 slides，而是一個上線的雙語網站。八個章節從產品（可操作的 Copilot）、研究（persona、旅程）、策略（風險護欄、優先級、實驗設計）到系統（知識圖譜、設計系統），每一章都能動手操作，而且每一章談的決策，最後都能在 Copilot 裡找到對應。
>
> 最誠實的決策在資料層：站內 14 家深科技新創全部真實、公開可查，欄位凍結於 2026 年 7 月並附來源連結。製作期間有兩家被收購、一家經歷司法重整後復原。這些真實變動不是意外，正是產品要處理的「資料時效」問題本身，也是每個欄位都帶 retrievedAt 的理由。
>
> 這一頁不重講網站已經講過的八章，而是打開它的設計檔案：命題與三方張力、線框與保真階梯、不確定性的狀態設計、雙語文案工程、上線前的品質關卡。這個領域的資料層我自己爬過、建過（專案 02、04），所以 DeepScout 的每一個產品判斷，都是從資料的手感長出來的，不是從想像。

### 3.3 `outcomes`（×6，雙語各自撰寫）

1. 上線八章雙語案例網站，中心是可操作的偵搜 Copilot——每一章都是活文件，不是投影片。
2. 把 AI 的誠實設計成一等公民：強訊號、低信心、訊號不足拒答、來源逾時四種狀態，加上 UNVERIFIED／CONFLICTING 欄位旗標。
3. 用 14 家真實、附來源與日期的新創取代虛構資料；其中兩家在製作期間被收購，恰好驗證了產品主張的時效問題。
4. 建立指標樹（北極星＋4 input＋3 guardrail），並做出樣本數隨 MDE 即時計算的可操作實驗設計。
5. 把每個生成式 AI 風險對應到已上線的護欄：捏造→拒答狀態、hype→來源必填、過期→時效戳。
6. 繁中文案依六條守則獨立撰寫而非翻譯，並以自動化檢查（console／360px 溢出／a11y／雙語 smoke）守住上線品質。

### 3.4 `tech`（6 格）

| label | val |
|---|---|
| Frontend | Vite, React 18, react-router-dom — no UI/CSS framework |
| Product Core | Simulated signal-scan replay, structured brief schema, HITL verify / flag / re-scan |
| Data Layer | 14 real startups, per-field source + retrievedAt, knowledge-graph relations |
| AI-State Design | 4 designed states + UNVERIFIED / CONFLICTING flags, per-field confidence |
| i18n & Copy | EN / 繁中 independently written, 6-rule style guide, ⌘K palette, deep links |
| Quality | verify.mjs: console sweep, 360px overflow scan, axe a11y, EN/中 smoke test |

### 3.5 Storytelling 中段

**`caseDeck`** — eyebrow `Scouting console`／`偵搜主控台`；title *From scattered signal to a brief you can defend*／*把散落的訊號，收斂成一份守得住的 brief*；body 講「真的能操作的副駕：掃描四路訊號、解析成附來源標信心的 brief，訊號太稀薄時會拒答而不是硬編」；KPI ×3：`14 Real startups`、`8 Chapters`、`4 AI states`；signals：`Scan / Resolve / Flag / Verify / Decide`（中：掃描／解析／標記／驗證／決策）。

**`storyMoments`** ×3：

1. `activity` **The tab-hell morning／分頁地獄的早晨** — 一次偵搜從十幾個分頁開始，怕的是漏看或看錯一個訊號。問題不是資訊量，是結論守不守得住。
2. `shield` **The step that cannot be skipped／不能跳過的那一步** — 核心迴圈六個動作，第五步是人工驗證。沒有這一步，brief 就不會變成決策，產品層面直接擋住。
3. `target` **The acquisitions that proved the thesis／驗證命題的兩樁收購** — 十四家公司裡有兩家在製作期間被收購。這正是每個欄位都帶時效戳、而不是打包票的理由。

**`storyChapters`** ×5：

| iconKey | label | title（中） | artifact |
|---|---|---|---|
| globe | Thesis 命題 | 三種讀者，一份 brief — 分析師要速度、主管要訊噪比、新創怕被誤判，張力收斂成產品範圍 | Tension map 張力圖 |
| layers | Loop 迴圈 | 先設計迴圈，再畫畫面 — 六步核心迴圈，人工驗證寫成產品層的硬規則 | Core loop 核心迴圈 |
| shield | Doubt 不確定 | 給不確定性一個介面 — 拒答是設計出來的狀態，不是錯誤頁；旗標比華麗的答案更值錢 | State specs 狀態規格 |
| activity | Evidence 真資料 | 付出真資料的代價 — 14 家可查證的公司，收購與爭議照登，時效戳因此成立 | Sourced dataset 附來源資料集 |
| check | Ship 上線 | 上線，然後證明它站得住 — 雙語獨立撰寫、自動化品質關卡、可列印的 brief | Quality gates 品質關卡 |

**`pullQuote`**：
> EN: *The most honest sentence an AI product can say is "unverified." DeepScout is designed around the moments it has to say it.*
> 中：*AI 產品最誠實的一句話是「未驗證」。DeepScout 的整套設計，都圍繞著它必須說出這句話的時刻。*

### 3.6 `caseHeroImage`（自繪 SVG，`DEEPSCOUT_HERO_IMAGE` const）

依 SKILL.md §4 調色盤手繪：**左**＝四個訊號源節點（mono 標籤 FUNDING／PATENTS／NEWS／TEAM，teal）→ 匯流線 → **中**＝掃描主控台面板（波形線、進度條）→ **右**＝結構化 brief 卡（欄位列、來源戳、信心點），其中**恰好一列 amber**（UNVERIFIED 旗標＝全圖唯一例外色），底部 teal 建議動作 chip。無照片、無 clip-art。

### 3.7 深連結欄位

- `outcomeModules`：outcome 1→`ds-mb`、2→`ds-m05`、3→`ds-m08`、4→`ds-m09`、5→`ds-m10`、6→`ds-m07`。
- `evidenceSlots` ×2：`monitor`「Live copilot, real states／可操作的實品」→ `ds-mb`；`layers`「The fidelity ladder／保真階梯」→ `ds-m04`。
- `awards: []`。

---

## 4. 證據層規格（`src/components/deepscout/`，scope `.ds`）

### 4.1 方言宣言（Dialect）

- **名稱**：**Design Record／偵搜檔案櫃** dialect——模組框架做成「檔案卷宗」：mono 卷標（`DS-M04 · FIDELITY`）、時效戳角章、旗標語意色（rose 只用於 UNVERIFIED／CONFLICTING 語意，呼應產品本身的旗標系統）。
- **簽名互動**：M04 保真階梯（四階同一份 brief）。
- **明確不重用**（保持家族內辨識度）：verification 的角色濾鏡、newsintel 的 fidelity 濾鏡與 wire-ticker、psymatch 的 registered-report 編號、launch-os 的 cockpit 儀表、evidence-lab 的示波器。導覽用**五幕 act rail**（sticky），每個模組掛能力 chips（Product／UX／Eng／Data），只標示不過濾。
- Token 全部照 EVIDENCE_LAYER_TEMPLATE §4 逐字複製到 `--ds-*`；顯示字體 Fraunces（不是 DeepScout 站上的 Newsreader——**作品集的字體系統優先**，SKILL.md §3 鐵則）；lazy-load 全模組；只經 `ProjectExtraSection` 掛載。

### 4.2 檔案結構

```
src/components/deepscout/
  DeepScoutEvidence.jsx     ← 層殼：hero + 五幕 act rail + 分組掛載
  shared/dsKit.jsx          ← .ds tokens + ModuleFrame + 標章 + 卷宗框
  data/dsContent.js         ← 五幕/模組登錄、shell 雙語文案、14 家公司精選子集、深連結表
  M01…M11 + MB_LiveBridge.jsx
  AUDIT.md                  ← 每個標章的出處對照（見 §4.5）
```

### 4.3 模組總表（11 + Live Bridge，頁面順序編號）

| Act | id | 模組 | 標章 | 一句話 |
|---|---|---|---|---|
| I FRAME | ds-m01 | **The Brief Behind the Brief** 命題與三方張力 | REAL | 互動張力三角：點分析師／主管／新創任一頂點，看它逼出的設計決策；邊上是兩兩衝突 |
| I FRAME | ds-m02 | **Signal → Schema** 訊號變欄位 | REAL | 四路訊號源 ↔ brief 欄位解剖：點任一欄位，亮出它的來源鏈（label + url + retrievedAt + 信心）與餵它的訊號源 |
| II DRAW | ds-m03 | **Wireflow** 線框演進 | RECONSTRUCTED | 3–4 張標註線框（inline SVG 重繪）：輸入區與訊號源的位置之爭、brief 單欄 vs 雙欄、狀態切換入口、⌘K 的誕生 |
| II DRAW | ds-m04 | **Fidelity Ladder** 保真階梯 ★簽名 | RECONSTRUCTED＋REAL | 同一家公司（Corintis）的 brief 四階並排：手繪線框 → 低保真灰稿 → 結構化中保真 → 上線實拍；逐階標註「這一輪決定了什麼」，末階為真實截圖 |
| II DRAW | ds-m05 | **Designing for Doubt** 不確定狀態設計 | REAL | 四狀態切換器（強訊號／低信心／拒答／逾時）＋兩旗標解剖，每格附設計理由與 `?state=` 深連結——「拒答是一個畫面，不是一個 bug」 |
| III SYSTEM | ds-m06 | **Component Honesty** 元件誠實 | REAL | Token 牆與型別階、對比度即時計算的主張、print-as-deliverable（brief 是要交出去的文件）的取捨 |
| III SYSTEM | ds-m07 | **Two Languages, One Product** 雙語文案工程 | REAL | 六條守則卡＋V1→V2 真實改稿對照（before/after 切換）＋「51 處破折號」的清理帳 |
| IV PROOF | ds-m08 | **The Freshness Problem** 真資料的代價 | REAL | 14 家公司卷宗牆（訊號強度、階段、旗標）；兩樁收購與兩個爭議案例高亮；retrievedAt 戳記解剖 |
| IV PROOF | ds-m09 | **Metric Tree** 北極星與護欄 | REAL | 互動指標樹（北極星＋4 input＋3 guardrail），連到 time-to-brief 實驗的 MDE 設計 |
| IV PROOF | ds-m10 | **Risk → Guardrail** 風險對護欄 | REAL | 捏造／hype 帶風向／資料過期／過度信任，每條接到已上線的控制項與它在 UI 的落點（截圖裁切）；沿用站內登錄的真實語彙：嚴重度 CRITICAL→MEDIUM、「Shipped in Copilot」章、RESIDUAL＋MONITOR 欄位，並引用即時計算的「固有高嚴重度 4 條 · 殘餘 ↓67%」（註明為模組即時值） |
| V SHIP | ds-m11 | **Engineering the Case** 技術框架 | REAL | 架構圖：密封模組原則、chapters.js 單一路由真相、i18n 架構、⌘K 與深連結、verify.mjs 四類關卡、V1/V2 執行計畫作為過程證據 |
| V SHIP | ds-mb | **Live Bridge** 實品入口 | REAL | 八章深連結主控台（實拍縮圖 + 開啟按鈕）＋ 02/04/07 血緣交叉連結卡 |

### 4.4 各模組素材來源（節錄，執行時 AUDIT.md 逐條展開）

- M01/M02/M05/M09/M10：內容直接取自 DeepScout repo 的 `homeCopy.js`、`chapters.js`、`companies.js`、模組 COPY——是**已上線的真實設計內容**，標 REAL。
- M03/M04 前三階：線框與低保真為**事後重繪的設計記錄**（當年直接以程式碼迭代，未留 Figma 稿），一律標 RECONSTRUCTED、在模組內文寫明「重繪自實際演進，非當年檔案」；佐證是 repo 內真實存在的 `EXECUTION_PLAN_V1/V2.md` 與 `originals/`。**標章不說謊是紅線。**
- M04 末階／M08 截圖／MB 縮圖：線上站 Playwright 實拍（見 §5），標 REAL。
- M07：`docs/copy-style-guide.md` 的六規則與改稿對照表原文引用，標 REAL。

### 4.5 誠實標章與 AUDIT.md

沿用家族三級制：`REAL`（線上站、repo 或我的紀錄可驗證）／`RECONSTRUCTED`（真實事件，細節重建）／`ILLUSTRATIVE`（純概念說明）。本層預計 REAL ×10、RECONSTRUCTED ×2（M03、M04 前三階）、ILLUSTRATIVE ×0。AUDIT.md 記錄每個標章的出處（含本計畫 §1 的盤點與 P1 實測證據）。

---

## 5. 素材製作清單（執行階段）

1. **線上站截圖**（Playwright，1280×900 與 360×780 各一組，存 `public/deepscout/`，≤10 張）：首頁、Copilot idle、Copilot 完整 brief（Corintis）、拒答狀態（`?state=insufficient`）、逾時狀態、風險矩陣（護欄開）、決策閘門、知識圖譜（連線點亮）、Component Lab、旅程波形。前置問題已解除，隨時可截。**兩個實測注意事項**：① 站內有捲動顯現動畫，naive `--full-page` 會截到大片未顯現的空白（已實測），每章改用 viewport 截圖、必要時以腳本捲動到目標區塊再截；② 「護欄開」「連線點亮」等互動後狀態需要腳本點擊，不能只靠 URL。
2. **線框重繪**：M03 的 3–4 張標註線框、M04 的前三階，全部 inline SVG 手繪（Neural Signal OS 調色盤），不用任何點陣佔位圖。
3. **資料萃取**：從已 clone 的 DeepScout repo 抽出 M08 需要的 14 家公司精選欄位（名稱／領域／階段／訊號／旗標／一句 tagline，含收購與爭議案例的具體事實）寫進 `dsContent.js`——雙語沿用原站已寫好的母語級文案，不重新發明。
4. **hero SVG**：§3.6 的 `DEEPSCOUT_HERO_IMAGE`。

---

## 6. 檔案改動清單（wiring checklist）

| # | 檔案 | 動作 |
|---|---|---|
| 1 | `src/data/projects.js` | `DEEPSCOUT_HERO_IMAGE` const ＋ `PROJECTS` 第 09 條 ＋ `PROJECT_THEMES['deepscout'] = 'ai'` |
| 2 | `src/components/deepscout/`（新資料夾） | §4.2 全部檔案 |
| 3 | `src/components/case-studies/ProjectExtraSection.jsx` | `if (slug === 'deepscout') return <DeepScoutEvidence/>` 分派一行 |
| 4 | `public/deepscout/` | 實拍截圖 |
| 5 | `src/data/translations.js` | 預期**不動**（shell 標籤已齊；若五幕 rail 需新共用字串再最小新增） |
| —— | DeepScout repo 側 | ✅ 路由與部署問題已由你修復（§1.7）；僅剩選擇性的 footer 署名調整（D6） |

首頁格線、路由、prev/next 導覽、進度條自動接收新專案，不需另外接線。

---

## 7. 驗收清單

- [ ] SKILL.md §8 全項：必填欄位齊、`zh…` 雙生全填、tech 6 格、KPI/moments 3、chapters 5、封面為自繪 SVG、無新字體（顯示字體解析為 Fraunces）、模組只經 `ProjectExtraSection` 掛載、anchors 全部真實存在。
- [ ] 文案通過 §2.6 守則（朗讀測試；破折號配額；雙語數字一致；只用 §1.6 數字）。
- [ ] 標章不說謊：RECONSTRUCTED 模組內文自我聲明；AUDIT.md 逐條可查。
- [ ] 所有外連（八章深連結、GitHub repo）逐一以「實際渲染結果」驗證（HTTP 狀態碼因 404.html fallback 不可靠，見 §1.7）。
- [ ] `npm run build` 乾淨；EN／中兩語言、360px 寬度、`prefers-reduced-motion` 三項目視走查。

---

## 8. 預設決策（若無異議即照此執行）與風險

| # | 決策 | 理由 |
|---|---|---|
| D1 | **不把 Copilot 本體搬進作品集**，以實拍截圖＋深連結取代 | 雙重維護、bundle 膨脹、且違反「線上站＝作品本體」的定位；Live Bridge 已有 newsintel／isp 先例 |
| D2 | slug `deepscout`、theme `ai`、scope `.ds`（已確認無衝突） | 命名最短且無歧義 |
| D3 | 模組數 11＋Bridge（比 newsintel 16 精簡） | 設計檔案要密度不要體積；每模組都對到 §2.5 的一項能力 |
| D4 | 線框／低保真標 RECONSTRUCTED 而非假裝是當年檔案 | 這個作品集的信用建立在標章制度上；而「以程式碼直接迭代」本身就是可以講的方法論 |
| D5 | 正式網址採用 `https://guantingye.github.io/DeepScout/`，所有外連寫死此網域 | 路由已修復、sitemap 已指向此網址（§1.7 複測），是目前唯一的公開部署 |
| D6 | **（選擇性，由你決定）** footer 署名現為「Designed & built by DeepScout」，建議改為真名 | 作品集把招聘方送進站內後，站內應該回答得出「這是誰做的」；README 的 `[your name]` 同理。不改也不影響本計畫執行 |

**風險**：① 與線上站內容重複的誘惑——執行時以「這裡講理由、那裡看實品」為每個模組的自我檢查；② 螢幕截圖時效——截圖檔名帶日期戳，M08 內文沿用「資料凍結 2026-07-10」的說法；③ 外連驗證要看渲染結果而非 HTTP 狀態碼（§1.7）。

## 9. 分階段執行（建議節奏）

| 階段 | 內容 | 估時 |
|---|---|---|
| A | 全套截圖採集（§5 工作流，含互動後狀態）＋ 外連逐一驗證 | 0.25–0.5 天 |
| B | `projects.js` 條目＋hero SVG＋theme（此時 09 頁已完整可看，只缺證據層） | 0.5–1 天 |
| C | `dsKit` ＋ 層殼 ＋ Act I–II（M01–M05，含簽名模組） | 1.5–2 天 |
| D | Act III–V（M06–M11＋MB）＋ AUDIT.md | 1.5–2 天 |
| E | 雙語走查、RWD、驗收清單、`npm run build` | 0.5 天 |

合計約 **4–5.5 個工作天**，可拆成 3–4 個工作視窗執行。（原 Phase A 的 DeepScout repo 修復工作已由你完成，估時據此下修。）
