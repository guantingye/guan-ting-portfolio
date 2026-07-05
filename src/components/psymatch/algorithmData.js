// ============================================================================
// PsyMatch — REAL matching-algorithm artifacts
// ----------------------------------------------------------------------------
// PROVENANCE
//   Source system : https://psymatch-rose.vercel.app  ("心理師個案媒合平台")
//   Extracted from: deployed production bundle /assets/index-B7MHzdX5.js
//                   (client-side matching function, audited 2026-07-05)
//   Repo/commit   : private; live bundle is the citable artifact of record.
//
// WHAT IS REAL (verified against the shipped code):
//   • WEIGHTS below are the exact additive weights in the scoring function.
//   • The scoring LOGIC (approach / online / budget / topic-specialty, ranked
//     descending, top-5) is ported 1:1 from the bundle — see matchEngine.js.
//   • The Likert intake is 1–7 ("1=不重要，7=非常重要") with a ≥4 threshold.
//   • APPROACHES is the real orientation taxonomy offered in the assessment.
//   • The four real seed therapists (isReal:true) keep their shipped
//     approach / fee / rating / licence / city values.
//
// WHAT IS RECONSTRUCTED (labelled, never passed off as real):
//   • TOPICS is collapsed to 7 canonical axes so the intake profile fits one
//     accessible radar (plan 2.6). Real specialties were Chinese free strings;
//     canonical ids preserve the same match semantics (topic id === specialty
//     tag), with a couple of near-synonyms folded (人際困擾→relationship,
//     家庭議題→relationship). Folds are noted per therapist.
//   • Two therapists (isReal:false) are added only to give the playground a
//     fuller ranking; their numbers are plausible, not shipped.
// ============================================================================

// Exact additive weights from the shipped scoring function (sum to 1.00).
export const WEIGHTS = {
    approach: 0.30,   // preferred orientation is in therapist.approaches
    online: 0.20,     // user wants online AND therapist offers online
    budget: 0.20,     // user budget ≥ therapist minimum fee
    topic: 0.30,      // any topic rated ≥4 is one of the therapist's specialties
};

export const TOPIC_THRESHOLD = 4;   // on the 1–7 importance Likert
export const LIKERT_MIN = 1;
export const LIKERT_MAX = 7;
export const BUDGET_MIN = 1000;     // shipped floor: "預算至少需要 NT$1,000"
export const BUDGET_MAX = 4000;
export const TOP_N = 5;

// Seven canonical intake topics. `id` doubles as the therapist specialty tag,
// so the ≥4 topic → specialty intersection is exact.
export const TOPICS = [
    { id: 'anxiety',     en: 'Anxiety',            zh: '焦慮' },
    { id: 'sleep',       en: 'Sleep',              zh: '睡眠困擾' },
    { id: 'work_stress', en: 'Work stress',        zh: '職場壓力' },
    { id: 'relationship',en: 'Relationships',      zh: '關係與家庭' },
    { id: 'self_explore',en: 'Self-exploration',   zh: '自我探索' },
    { id: 'emotion_reg', en: 'Emotion regulation', zh: '情緒調節' },
    { id: 'trauma',      en: 'Trauma',             zh: '創傷經驗' },
];

// Real orientation taxonomy offered by the assessment ("" = 不限 / no preference).
export const APPROACHES = [
    { id: 'CBT',          en: 'Cognitive Behavioral',   zh: '認知行為治療' },
    { id: 'DBT',          en: 'Dialectical Behavior',   zh: '辯證行為治療' },
    { id: 'ACT',          en: 'Acceptance & Commitment', zh: '接納與承諾治療' },
    { id: 'EMDR',         en: 'EMDR',                    zh: '眼動減敏歷程更新' },
    { id: 'IFS',          en: 'Internal Family Systems', zh: '內在家庭系統' },
    { id: 'Humanistic',   en: 'Humanistic',              zh: '人本取向' },
    { id: 'Narrative',    en: 'Narrative',               zh: '敘事治療' },
    { id: 'Psychodynamic',en: 'Psychodynamic',           zh: '精神動力取向' },
    { id: 'Existential',  en: 'Existential',             zh: '存在主義取向' },
    { id: 'PlayTherapy',  en: 'Play Therapy',            zh: '遊戲治療' },
];

// Seed therapists. The first four keep their shipped values (isReal:true).
export const THERAPISTS = [
    {
        id: 't1', isReal: true, name: '林佳宜', enName: 'Lin C.-Y.', license: 'PSY-011234',
        approaches: ['CBT'], specialties: ['anxiety', 'sleep', 'work_stress'],
        years: 8, feeMin: 1800, feeMax: 2400, online: true, city: { en: 'Taipei', zh: '台北' }, rating: 4.9,
        blurb: { en: 'Integrative CBT for anxiety and sleep; values pace and collaboration.', zh: '整合式認知行為取向，專長焦慮與睡眠議題，重視合作與步調。' },
    },
    {
        id: 't2', isReal: true, name: '王承恩', enName: 'Wang C.-E.', license: 'PSY-022456',
        approaches: ['Humanistic'], specialties: ['relationship', 'self_explore'], fold: '家庭議題 → relationship',
        years: 6, feeMin: 2000, feeMax: 2600, online: true, city: { en: 'New Taipei', zh: '新北' }, rating: 4.8,
        blurb: { en: 'Humanistic and emotion-focused; couples work and boundary-setting.', zh: '以人本與情緒焦點為主，專精伴侶諮商與界線建立。' },
    },
    {
        id: 't3', isReal: true, name: '陳雅婷', enName: 'Chen Y.-T.', license: 'PSY-033789',
        approaches: ['ACT'], specialties: ['work_stress', 'relationship', 'emotion_reg'], fold: '人際困擾 → relationship',
        years: 5, feeMin: 1600, feeMax: 2200, online: true, city: { en: 'Taichung', zh: '台中' }, rating: 4.9,
        blurb: { en: 'ACT for workplace stress, interpersonal strain and emotion regulation.', zh: '接納與承諾治療，專長職場壓力、人際困擾與情緒調節。' },
    },
    {
        id: 't4', isReal: true, name: '許志明', enName: 'Hsu C.-M.', license: 'PSY-041027',
        approaches: ['Existential'], specialties: ['self_explore', 'trauma'], fold: '憂鬱 → (unmapped)',
        years: 12, feeMin: 2200, feeMax: 2800, online: false, city: { en: 'Taipei', zh: '台北' }, rating: 4.7,
        blurb: { en: 'Existential, long-term work with childhood trauma and meaning.', zh: '存在主義取向，適合長期治療，專長童年創傷與自我探索。' },
    },
    {
        id: 't5', isReal: false, name: '張博愷', enName: 'Chang P.-K.', license: 'PSY-05·recon',
        approaches: ['DBT'], specialties: ['emotion_reg', 'trauma'],
        years: 9, feeMin: 2200, feeMax: 2800, online: true, city: { en: 'Kaohsiung', zh: '高雄' }, rating: 4.7,
        blurb: { en: 'DBT for emotion dysregulation and trauma recovery.', zh: '辯證行為治療，專長情緒調節與創傷復原。' },
    },
    {
        id: 't6', isReal: false, name: '李思妤', enName: 'Lee S.-Y.', license: 'PSY-06·recon',
        approaches: ['Psychodynamic'], specialties: ['relationship', 'self_explore', 'anxiety'],
        years: 15, feeMin: 2600, feeMax: 3200, online: false, city: { en: 'Taipei', zh: '台北' }, rating: 4.8,
        blurb: { en: 'Psychodynamic depth work on relationships and self.', zh: '精神動力取向，深度處理關係與自我議題。' },
    },
];

// Default intake used by presets/reset — mirrors the shipped default state
// ({焦慮:4, 睡眠:2, 關係:3} on the 1–7 scale), extended to all seven axes.
export const DEFAULT_INTAKE = {
    topics: { anxiety: 4, sleep: 2, work_stress: 3, relationship: 3, self_explore: 2, emotion_reg: 3, trauma: 1 },
    approach: '',      // "" = 不限 / no preference
    online: true,
    budget: 2000,
};
