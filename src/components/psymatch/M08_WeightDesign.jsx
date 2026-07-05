import React from 'react';
import SectionModule, { useI18n, injectStyles } from './shared/psyKit.jsx';
import { MODULES, EMOBOT_SLUG } from './data/psyContent.js';
import { WEIGHTS } from './algorithmData.js';

const MOD = MODULES.find(m => m.key === 'M08');

const COPY = {
    en: {
        title: 'How the four weights were set',
        lead: 'Each number is a defended choice, including its provisionality.',
        soWhat: 'I can defend every weight, including the fact that it is provisional.',
        cards: [
            { id: 'topic', w: WEIGHTS.topic, name: 'Topic-fit', why: 'A specialty match is the strongest signal a therapist can address the presenting issue — so it shares the top weight.', change: 'Would drop if specialties proved too coarse to separate therapists.' },
            { id: 'approach', w: WEIGHTS.approach, name: 'Orientation', why: 'A client’s stated preference for an approach independently moves outcome, so when given it is honoured strongly.', change: 'Applies only when a preference is stated; “no preference” zeroes it fairly.' },
            { id: 'budget', w: WEIGHTS.budget, name: 'Budget', why: 'A hard access constraint, but binary — it fits or it doesn’t. Over-weighting would surface unaffordable “best” matches.', change: 'Could become a filter rather than a score if affordability complaints rise.' },
            { id: 'online', w: WEIGHTS.online, name: 'Online', why: 'A logistics preference that matters for access but should not outrank clinical fit.', change: 'Secondary by design; kept below the two fit criteria.' },
        ],
        provenanceTag: 'PROVENANCE',
        provenance: 'The weights are expert-set (theory-informed), not learned from user data. Once enough selections are logged, they are candidates for re-derivation — see M16. The companion product for the human-facing support layer is Emobot+ (project 01).',
        whyLabel: 'Why this number', changeLabel: 'What would change it',
    },
    zh: {
        title: '四個權重是怎麼定的',
        lead: '每個數字都是一個守得住的選擇，包括它的暫時性。',
        soWhat: '我能為每個權重辯護，包括承認它是暫時的。',
        cards: [
            { id: 'topic', w: WEIGHTS.topic, name: '議題吻合', why: '專長吻合是心理師能處理主訴議題的最明確訊號——因此與取向並列最高權重。', change: '若專長標籤太粗、難以區分心理師，這個權重會下調。' },
            { id: 'approach', w: WEIGHTS.approach, name: '取向', why: '個案對取向的明確偏好會獨立影響療效，因此一旦表達就給予高度尊重。', change: '僅在有陳述偏好時作用；「不限」會公平地歸零。' },
            { id: 'budget', w: WEIGHTS.budget, name: '預算', why: '硬性的可近性限制，但屬二元——合或不合。過度加權會把負擔不起的「最佳」媒合推上來。', change: '若負擔不起的抱怨增加，可能改為過濾條件而非分數。' },
            { id: 'online', w: WEIGHTS.online, name: '線上', why: '影響可近性的後勤偏好，但不該壓過臨床適配。', change: '設計上屬次要；刻意排在兩個適配準則之下。' },
        ],
        provenanceTag: '來源',
        provenance: '這些權重是專家設定（理論導向），並非從使用者資料學來。一旦累積足夠的選擇紀錄，它們就是重新推導的候選——見 M16。面向真人的支持層之姊妹產品是 Emobot+（專案 01）。',
        whyLabel: '為什麼是這個數字', changeLabel: '什麼會改變它',
    },
};

export default function M08_WeightDesign() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <div className="pm-weights">
                {c.cards.map(card => (
                    <article className="pm-weight" key={card.id}>
                        <div className="pm-weight-top">
                            <span className="pm-weight-num">+{card.w.toFixed(2)}</span>
                            <strong>{card.name}</strong>
                        </div>
                        <div className="pm-weight-bar" aria-hidden="true"><span style={{ width: `${card.w * 100}%` }} /></div>
                        <p><span className="pm-weight-k">{c.whyLabel}</span>{card.why}</p>
                        <p><span className="pm-weight-k">{c.changeLabel}</span>{card.change}</p>
                    </article>
                ))}
            </div>
            <p className="pm-weight-prov">
                <span className="pm-tag pm-tag--amber">{c.provenanceTag}</span>
                {c.provenance.split('Emobot+')[0]}
                {c.provenance.includes('Emobot+') && <a href={`#/project/${EMOBOT_SLUG}`}>Emobot+</a>}
                {c.provenance.split('Emobot+')[1]}
            </p>
        </SectionModule>
    );
}

injectStyles('pm-m8', `
.pm-weights { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.pm-weight { padding: 16px; border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-md); background: var(--pm-bg-2); }
.pm-weight-top { display: flex; align-items: baseline; gap: 10px; }
.pm-weight-num { font-family: var(--pm-font-data); font-size: 20px; color: var(--pm-teal); }
.pm-weight-top strong { color: var(--pm-text-1); font-size: 15px; }
.pm-weight-bar { height: 5px; border-radius: 3px; background: var(--pm-bg-0); margin: 10px 0 12px; overflow: hidden; }
.pm-weight-bar span { display: block; height: 100%; background: var(--pm-teal); }
.pm-weight p { margin: 0 0 8px; font-size: 13px; line-height: 1.55; color: var(--pm-text-2); }
.pm-weight p:last-child { margin-bottom: 0; }
.pm-weight-k { display: block; font-family: var(--pm-font-data); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--pm-text-3); margin-bottom: 3px; }
.pm-weight-prov { margin: 16px 0 0; font-size: 13.5px; line-height: 1.6; color: var(--pm-text-2); }
.pm-weight-prov .pm-tag { margin-right: 8px; }
.pm-weight-prov a { color: var(--pm-teal); text-decoration: none; }
.pm-weight-prov a:hover { text-decoration: underline; }
@media (max-width: 640px) { .pm-weights { grid-template-columns: 1fr; } }
`);
