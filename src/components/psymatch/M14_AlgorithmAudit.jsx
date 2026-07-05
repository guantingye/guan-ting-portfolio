import React, { useMemo } from 'react';
import SectionModule, { useI18n, Caption, injectStyles } from './shared/psyKit.jsx';
import { MODULES } from './data/psyContent.js';
import { THERAPISTS, WEIGHTS, DEFAULT_INTAKE } from './algorithmData.js';
import { rankTherapists } from './matchEngine.js';

const MOD = MODULES.find(m => m.key === 'M14');
const CRIT_ORDER = ['topic', 'approach', 'budget', 'online'];

const COPY = {
    en: {
        title: 'Algorithm audit — sensitivity & degeneracy',
        lead: 'Red-teaming my own model and publishing what I find. Both panels are computed here from the real weights.',
        soWhat: 'I red-team my own model and publish what I find.',
        sensTitle: '(a) Sensitivity — score swing per criterion',
        sensNote: 'Topic-fit and orientation each swing the score by 0.30, so the ranking is most sensitive to a single specialty hit or orientation match. Two therapists can trade the top spot on one topic slider crossing 4.',
        crit: { topic: 'Topic-fit', approach: 'Orientation', budget: 'Budget', online: 'Online' },
        degTitle: '(b) Degeneracy — where the model cannot separate two therapists',
        degIntro: 'Computed under a representative intake (anxiety-led, no orientation preference). Names sharing a score are indistinguishable to the model:',
        tie: 'tie',
        degFinding: 'Because scores are sums of four coarse weights, collisions are common — here two differently-trained therapists land on the same 0.40. The fix direction: sharpen specialties into weighted sub-tags, or add a tie-breaker on rating — revisited in M16.',
        caption: 'Sensitivity (weights) and a live degeneracy collision from the real therapist set.',
    },
    zh: {
        title: '演算法稽核——敏感度與退化',
        lead: '對自己的模型做紅隊測試並公開結果。兩個面板都在此由真實權重計算。',
        soWhat: '我對自己的模型做紅隊測試並公開結果。',
        sensTitle: '(a) 敏感度——各準則的分數擺動',
        sensNote: '議題吻合與取向各自使分數擺動 0.30，因此排序對「單一專長命中」或「取向吻合」最敏感。兩位心理師可能因為一個議題滑桿越過 4 而互換榜首。',
        crit: { topic: '議題吻合', approach: '取向', budget: '預算', online: '線上' },
        degTitle: '(b) 退化——模型無法區分兩位心理師之處',
        degIntro: '在代表性輸入下計算（焦慮為主、不限取向）。共享同一分數的名字，對模型而言無法區分：',
        tie: '平手',
        degFinding: '由於分數是四個粗糙權重的加總，碰撞很常見——此處兩位訓練不同的心理師都落在同一個 0.40。修正方向：把專長細化為加權子標籤，或以評分加入破平手——於 M16 再議。',
        caption: '敏感度（權重）與來自真實心理師集的即時退化碰撞。',
    },
};

const maxW = Math.max(...Object.values(WEIGHTS));

export default function M14_AlgorithmAudit() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    const ranked = useMemo(() => rankTherapists(THERAPISTS, DEFAULT_INTAKE, THERAPISTS.length), []);
    const groups = useMemo(() => {
        const m = new Map();
        ranked.forEach(r => { const k = r.score.toFixed(2); (m.get(k) || m.set(k, []).get(k)).push(r); });
        return [...m.entries()];
    }, [ranked]);
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <div className="pm-audit">
                <section className="pm-audit-panel">
                    <span className="pm-budget-head">{c.sensTitle}</span>
                    <ul className="pm-sens">
                        {CRIT_ORDER.map(id => (
                            <li key={id}>
                                <span className="pm-sens-label">{c.crit[id]}</span>
                                <span className="pm-sens-track"><span className="pm-sens-fill" style={{ width: `${(WEIGHTS[id] / maxW) * 100}%`, background: id === 'topic' || id === 'approach' ? 'var(--pm-teal)' : 'var(--pm-line-2)' }} /></span>
                                <span className="pm-sens-val">±{WEIGHTS[id].toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="pm-audit-note">{c.sensNote}</p>
                </section>

                <section className="pm-audit-panel">
                    <span className="pm-budget-head">{c.degTitle}</span>
                    <p className="pm-audit-intro">{c.degIntro}</p>
                    <ul className="pm-deg">
                        {groups.map(([score, rs]) => (
                            <li key={score} className={`pm-deg-row${rs.length > 1 ? ' is-tie' : ''}`}>
                                <span className="pm-deg-score">{score}</span>
                                <span className="pm-deg-names">
                                    {rs.map(r => (lang === 'zh' ? r.therapist.name : r.therapist.enName) + ` (${r.therapist.approaches[0]})`).join(' · ')}
                                </span>
                                {rs.length > 1 && <span className="pm-tag pm-tag--red">{c.tie}</span>}
                            </li>
                        ))}
                    </ul>
                    <p className="pm-audit-note">{c.degFinding}</p>
                </section>
            </div>
            <Caption kind="Fig." n={7}>{c.caption}</Caption>
        </SectionModule>
    );
}

injectStyles('pm-m14', `
.pm-audit { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.pm-audit-panel { padding: 16px; border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-md); background: var(--pm-bg-2); }
.pm-sens { list-style: none; margin: 12px 0 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.pm-sens li { display: grid; grid-template-columns: 78px 1fr 42px; gap: 10px; align-items: center; }
.pm-sens-label { font-size: 12.5px; color: var(--pm-text-2); }
.pm-sens-track { height: 10px; border-radius: 5px; background: var(--pm-bg-0); overflow: hidden; }
.pm-sens-fill { display: block; height: 100%; }
.pm-sens-val { font-family: var(--pm-font-data); font-size: 12px; color: var(--pm-teal); text-align: right; }
.pm-audit-intro { margin: 10px 0; font-size: 13px; color: var(--pm-text-3); }
.pm-deg { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 5px; }
.pm-deg-row { display: flex; align-items: center; gap: 10px; padding: 8px 11px; border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-sm); background: var(--pm-bg-1); }
.pm-deg-row.is-tie { border-color: var(--pm-red); background: var(--pm-red-dim); }
.pm-deg-score { font-family: var(--pm-font-data); font-size: 13px; color: var(--pm-text-1); flex: 0 0 auto; width: 34px; }
.pm-deg-row.is-tie .pm-deg-score { color: var(--pm-red); }
.pm-deg-names { flex: 1; font-size: 12.5px; color: var(--pm-text-2); }
.pm-audit-note { margin: 12px 0 0; font-size: 13px; line-height: 1.6; color: var(--pm-text-2); }
@media (max-width: 820px) { .pm-audit { grid-template-columns: 1fr; } }
`);
