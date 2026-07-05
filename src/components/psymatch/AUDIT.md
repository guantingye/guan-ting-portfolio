# PsyMatch (slot 08) — Phase 0 audit & provenance map

Audited 2026-07-05 against the live system **https://psymatch-rose.vercel.app**
(title: 心理師個案媒合平台) and its production bundle
`/assets/index-B7MHzdX5.js`.

## 0. Headline finding — the plan's premise did not match reality

`plan_psymatch.txt` assumed PsyMatch matches a user to **four AI-companion
prototype vectors** (empathy / insight / solution / cognitive) via **weighted
cosine similarity**, with 7 personality features (distress, attach_anxiety …).

The shipped system is **not that**. PsyMatch is a **two-sided counselling
marketplace**: a person completes a psychometric-style intake, and an algorithm
recommends **licensed human psychologists** — not AI companions. The scoring is
a **four-criterion additive rule**, not cosine similarity. The 7 "features" are
**issue topics**, not personality subscales.

Per the plan's own **STOP CONDITION (§1.4)** — "if the live flow or algorithm
differs, the audit findings win; update content, keep the structure" — and the
user's explicit instruction to introduce the *real completed project* (title /
content / structure all changeable), the page is built around the **real
system**, keeping the laboratory-report structure and quality bars.

This also cleanly satisfies the **Emobot+ scope boundary (§0.2)**: the two are
now framed as opposite ends of one care continuum (M8, M15, M17) — PsyMatch
measures & matches to humans; Emobot+ is the AI-companion layer. No overlap.

## 1. The REAL algorithm (crown-jewel evidence)

Extracted verbatim from the bundle's client-side scoring function:

```js
const i = o => {                                   // o = therapist, r = intake
  let a = 0;
  r.approach && o.approaches.includes(r.approach) && (a += .3);
  r.mode === "online" && o.online && (a += .2);
  r.budget >= o.feeMin && (a += .2);
  Object.keys(r.topics).filter(u => r.topics[u] >= 4)
    .some(u => o.specialties.includes(u)) && (a += .3);
  return a;
};
wo.map(o => ({t:o, s:i(o)})).sort((o,a) => a.s - o.s).slice(0,5);
```

Ported 1:1 → `matchEngine.js`. Weights (`WEIGHTS`) and threshold are REAL.

Real facts also captured: intake is a **1–7 importance Likert**
("請評估以下議題對您的重要程度（1=不重要，7=非常重要）"), threshold **≥4**;
assessment is **4 steps** (preferences → issue topics → orientation → schedule,
"步驟 t / 4"); budget floor **NT$1,000**; real orientation taxonomy (CBT, DBT,
ACT, EMDR, IFS, Humanistic, Narrative, Psychodynamic, Existential, Play Therapy);
four real seed therapists (林佳宜 / 王承恩 / 陳雅婷 + a 12-yr existential profile)
with their approaches / feeMin / rating / licence.

## 2. Hand-computed score check (QA requirement)

Verifying the playground/engine against the rule by hand:

- **Intake A** `{topics:{anxiety:6}, approach:CBT, online:true, budget:2000}`
  vs **林佳宜** (CBT; specialties anxiety/sleep/work_stress; feeMin 1800; online):
  `.30 (CBT∈approaches) + .20 (online) + .20 (2000≥1800) + .30 (anxiety≥4 ∈ spec) = 1.00`
- **Intake B** `{topics:{work_stress:5}, approach:"", online:false, budget:1700}`
  vs **陳雅婷** (ACT; specialties work_stress/relationship/emotion_reg; feeMin 1600; online):
  `0 (no pref) + 0 (not online) + .20 (1700≥1600) + .30 (work_stress≥4 ∈ spec) = 0.50`

Both reproduced by `matchEngine.js` (dev sanity block, DEV-only). ✔

## 3. Badge provenance (per module)

| Module | Badge | Basis |
|---|---|---|
| M1 Abstract | REAL | describes the shipped system |
| M2 Why fit | REAL (lit) | Flückiger 2018, Swift & Callahan 2009, Wampold 2015 |
| M3 Hypotheses | RECONSTRUCTED | pre-registration framing; targets, not data |
| M4 Intake matrix | REAL | real intake inputs + orientation taxonomy |
| M5 Item→criterion | REAL | real threshold + ported scoring excerpt |
| M6 Flow UX | RECONSTRUCTED | wireframes of the real 4-step flow |
| M7 Playground | REAL | real algorithm live; 2 of 6 therapists reconstructed (labelled) |
| M8 Weights | REAL | real weights; rationale is expert-set (stated) |
| M9 Decision record | REAL | real model choice, honestly costed |
| M10 Shipped screens | REAL | DOM rebuild of the live results/detail screens |
| M11 Data flow | REAL + inline RECONSTRUCTED | real payload; server excerpt labelled reconstructed |
| M12 Edge cases | REAL/RECON | 3 rows use verbatim shipped copy (tagged) |
| M13 Pilot | RECONSTRUCTED | no logs recovered; stamped, caveated |
| M14 Audit | REAL | sensitivity/degeneracy computed live from real weights |
| M15 Ethics | REAL | positioning + notice |
| M16 Limitations | REAL | frank limits + gated future work |
| M17 System map | REAL | care-continuum map + live URL |

## 4. Reserved-pattern check (plan §0.4)

No sibling-page patterns used: no role/fidelity **filter** over modules (F1 is
pure nav), no diff viewer, no drag comparator, no signal-trace/pulse animation,
no chat sim, no force-directed graph, no risk-matrix heatmap. Radar plot and
sticky contents rail are explicitly allowed.

## 5. Reconstructed items (never passed off as real)

- 2 of 6 playground therapists (`isReal:false`, shown as `recon`).
- 7-axis canonical topic set (real specialties folded; noted in `algorithmData.js`).
- M6 wireframes, M11 FastAPI excerpt, M13 pilot numbers.
