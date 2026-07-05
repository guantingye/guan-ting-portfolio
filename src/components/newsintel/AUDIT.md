# AUDIT.md — AI News Intelligence Evidence Layer (Phase 0)

Spec: `plan (3).txt`. Target page: `#/project/ai-news-intelligence` (project 04).
This file records what is REAL vs reconstructed so no badge lies.

## Repo facts
- Router: hash router (`useRoute`), project data in `src/data/projects.js`.
- Detail render: `src/pages/ProjectPage.jsx`; per-slug extras in
  `src/components/case-studies/ProjectExtraSection.jsx`.
- Established pattern: one self-contained component per module, each injecting a
  scoped stylesheet once (`injectStyles(id, css)`), tokens defined on a scope class.
- Shared hooks reused: `useInView`, `usePrefersReducedMotion`, `useViewport`,
  `mulberry32`, `useI18n` (from launch-os / evidence-lab kits). `useLang` for i18n.
- Tokens (source of truth, reused verbatim): bg-0 #060709 / bg-1 #0C0E12 /
  bg-2 #14171D / bg-3 #1C2028, line #262B35, text #F2F0EB/#A8ADB8/#6B7280,
  teal #35C2B0 (signal), amber #E8A33D (attention), red #E5675A.
  Fonts: Newsreader (display), Inter (body), JetBrains Mono (data/stamps).

## Differentiation (plan 0.3) — new scope `.ni`
Own dialect: intelligence-briefing / wire-service terminal. Wire-feed ticker,
classification stamps, unified diff, ledgers, briefing cards, signal trace.
NOT reused: role filter, phase rail, force graph, RICE, confidence topography,
oscilloscope-as-signature, persona switcher, "verification layer" naming.
F1 uses a FIDELITY filter (dims by fidelity tag), deliberately unlike the
sibling ROLE filter.

## Featured platform (updated): industry-strategy-platform.vercel.app
"Strategy Intelligence Platform" — dark theme, routes / · /insights · /startups. User switched
the featured/linked platform to this deployment. It is fully client-rendered (blank in headless,
/insights 404s on hard load), so real screenshots/data could NOT be captured. Module MP therefore
rebuilds the three surfaces as DOM (RECONSTRUCTED), linking the three real routes. /insights is the
delivery surface for this news system; page references reconciled to /insights + Semiconductor.

## Earlier deployment audit (itri-startup-platform, real evidence in repo — NOT featured now)
Product: 新創商情總覽 · "Go to Global Market" (ITRI). Light theme, azure brand.
Nav (6): 總覽/數據儀表板 · 市場策略/全球市場分析 · 資源補助/政府補助資源 ·
資金支持/投資融資機會 · 專家人才/顧問人才媒合 · 訂單合作/商業合作機會.
Overview KPIs: 合作機會總數 156 (+12%), 進行中計畫 24 (+8%), 專業顧問 89 (+15%),
融資方案 42 (+20%). Domain mix (85 opportunities): 醫療19 硬體10 能源10 AI9 食品8
製造8 服務7 農業5 房地產5 生技4. Market Strategy = "國際商業週報與市場洞察",
2 reports today; real report: 「全球半導體產業AI晶片市場趨勢分析」(2025-01-15,
電資通光; tags AI/半導體/晶片設計/市場趨勢; body: 2024 AI-chip market ~US$53B →
2028 >US$120B, CAGR 23.6%, NVIDIA >80% share, TSMC CoWoS).
=> The 市場策略 tab is the delivery surface of this news-intelligence system.
Screenshots: public/product/{overview,market,subsidy,collab}.png (real captures).

## Module → data → badge map
| Mod | Data source | Badge |
|-----|-------------|-------|
| M1 Analyst morning | GT self-observation + 2 colleague interviews | RECONSTRUCTED |
| M2 Source landscape | Source list real (GT-stated); scores re-created | RECONSTRUCTED |
| M3 Job stories | GT scope decisions | RECONSTRUCTED |
| M4 Prompt lab | Lineage not in repo → re-created diffs+evals | RECONSTRUCTED |
| M5 Model decision | GPT→Gemini ~75% cut is GT-stated; scores re-created | RECONSTRUCTED |
| M6 Taxonomy | Bilingual tag method real; counts illustrative | RECONSTRUCTED |
| M7 Pipeline trace | Path real; terminal artifact = AI-chip report on /insights | REAL data path |
| MP Shipped platform | 3 surfaces (home/insights/startups) rebuilt as DOM; routes real | RECONSTRUCTED |
| M8 IA evolution | Shipped IA verified vs live platform | RECONSTRUCTED |
| M9 Wireframes | Pre-build sketches re-drawn | RECONSTRUCTED |
| M10 Hi-fi comparator | Right side = real platform (screenshot-faithful DOM) | REAL |
| M11 Component inventory | Rebuilt from real platform UI | REAL |
| M12 Architecture ledger | System is real; decisions GT-stated | REAL/RECON |
| M13 Reliability ops | Logs not recoverable → reconstructed | RECONSTRUCTED |
| M14 Impact metrics | Platform figures REAL; time study small-n | REAL/RECON |
| M15 Usability findings | Internal sessions n=3, re-created | RECONSTRUCTED |
| M16 Roadmap & limits | GT-authored | REAL |

Rule applied: where a "REAL" figure can't be verified, badge is downgraded and the
caveat line states why. Platform-derived numbers keep their real values.
