// ============================================================================
// PsyMatch — matching engine (pure, unit-testable)
// Ported 1:1 from the shipped scoring function (see algorithmData.js provenance):
//
//   const i = o => {                                   // o = therapist
//     let a = 0;
//     r.approach && o.approaches.includes(r.approach) && (a += .3);
//     r.mode === "online" && o.online && (a += .2);
//     r.budget >= o.feeMin && (a += .2);
//     Object.keys(r.topics).filter(u => r.topics[u] >= 4)
//       .some(u => o.specialties.includes(u)) && (a += .3);
//     return a;
//   };
//   wo.map(o => ({t:o, s:i(o)})).sort((o,a) => a.s - o.s).slice(0,5);
// ============================================================================
import { WEIGHTS, TOPIC_THRESHOLD, TOP_N } from './algorithmData.js';

// Topics the user rated at or above the ≥4 threshold.
export function highTopics(topics) {
    return Object.keys(topics).filter(id => topics[id] >= TOPIC_THRESHOLD);
}

// Per-criterion contribution breakdown for one therapist (drives the UI bars).
export function scoreBreakdown(therapist, intake) {
    const highs = highTopics(intake.topics);
    const topicHits = therapist.specialties.filter(s => highs.includes(s));
    return {
        approach: intake.approach && therapist.approaches.includes(intake.approach) ? WEIGHTS.approach : 0,
        online: intake.online && therapist.online ? WEIGHTS.online : 0,
        budget: intake.budget >= therapist.feeMin ? WEIGHTS.budget : 0,
        topic: topicHits.length > 0 ? WEIGHTS.topic : 0,
        topicHits,
    };
}

export function scoreTherapist(therapist, intake) {
    const b = scoreBreakdown(therapist, intake);
    return b.approach + b.online + b.budget + b.topic;
}

// Rank descending; ties keep input order (Array.prototype.sort is stable) —
// faithful to the shipped `.sort((o,a) => a.s - o.s)`.
export function rankTherapists(therapists, intake, limit = TOP_N) {
    return therapists
        .map(t => ({ therapist: t, score: scoreTherapist(t, intake), breakdown: scoreBreakdown(t, intake) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}

// ---- dev-only sanity checks (stripped from production build) ----------------
if (import.meta.env && import.meta.env.DEV) {
    const T = {
        cbt: { id: 'cbt', approaches: ['CBT'], specialties: ['anxiety', 'sleep'], feeMin: 1800, online: true },
        act: { id: 'act', approaches: ['ACT'], specialties: ['work_stress'], feeMin: 1600, online: false },
    };
    // Case A — all four criteria fire → 0.30+0.20+0.20+0.30 = 1.00
    const a = scoreTherapist(T.cbt, { topics: { anxiety: 6 }, approach: 'CBT', online: true, budget: 2000 });
    console.assert(Math.abs(a - 1.0) < 1e-9, `matchEngine A expected 1.0, got ${a}`);
    // Case B — approach mismatch + budget too low + no high topic → online only = 0.20
    const b = scoreTherapist(T.cbt, { topics: { anxiety: 3 }, approach: 'ACT', online: true, budget: 1500 });
    console.assert(Math.abs(b - 0.2) < 1e-9, `matchEngine B expected 0.2, got ${b}`);
    // Case C — no preference (approach "") + in-person + fits budget + topic hit = 0.20+0.30 = 0.50
    const c = scoreTherapist(T.act, { topics: { work_stress: 5 }, approach: '', online: false, budget: 1700 });
    console.assert(Math.abs(c - 0.5) < 1e-9, `matchEngine C expected 0.5, got ${c}`);
}
