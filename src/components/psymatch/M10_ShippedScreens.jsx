import React, { useMemo, useState } from 'react';
import SectionModule, { useI18n, Caption, injectStyles } from './shared/psyKit.jsx';
import { MODULES } from './data/psyContent.js';
import { THERAPISTS, TOPICS, DEFAULT_INTAKE } from './algorithmData.js';
import { rankTherapists } from './matchEngine.js';

const MOD = MODULES.find(m => m.key === 'M10');
const initials = t => (t.enName || t.name).replace(/[^A-Za-z一-鿿]/g, '').slice(0, 2);
const specName = (id, lang) => (TOPICS.find(x => x.id === id) || {})[lang] || id;

const COPY = {
    en: {
        title: 'Shipped screens — results & selection',
        lead: 'The two live screens rebuilt in the DOM, faithful to the audited system.',
        soWhat: 'Algorithm output became a humane decision moment, not a raw number.',
        resultsHead: 'We found psychologists that fit',
        resultsSub: 'Ranked by your needs profile — all options stay open.',
        criteriaMet: n => `${n}/4 criteria met`,
        recommend: 'Top match',
        fee: 'Fee', rating: 'Rating', online: 'Online', inperson: 'In-person',
        detailHead: 'Profile',
        book: 'Book this time',
        message: 'Message first',
        years: y => `${y} yrs`,
        ledgerTitle: 'Annotation ledger',
        ledger: [
            ['Interpreted, not raw', 'Scores are shown as “n/4 criteria met”, not a bare 0.75 — a reason, not a number.'],
            ['All options visible', 'Every match stays selectable; the ranking guides without removing choice.'],
            ['Marked, not forced', 'The top card is labelled and highlighted, but carries no pre-selection or default booking.'],
            ['Bilingual by default', 'Names, orientations and fees render in both languages; the stamps stay in English.'],
        ],
        caption: 'Results screen (left) and selected-profile screen (right), rebuilt from the live site.',
    },
    zh: {
        title: '已上線畫面——結果與選擇',
        lead: '把兩個線上畫面在 DOM 中重建，忠於稽核過的系統。',
        soWhat: '演算法輸出成為一個有人性的決策時刻，而非一個裸數字。',
        resultsHead: '為您找到合適的心理師',
        resultsSub: '依你的需求輪廓排序——所有選項保持開放。',
        criteriaMet: n => `符合 ${n}/4 準則`,
        recommend: '最佳媒合',
        fee: '費用', rating: '評分', online: '線上', inperson: '實體',
        detailHead: '檔案',
        book: '預約此時段',
        message: '先傳訊息',
        years: y => `${y} 年`,
        ledgerTitle: '註記帳',
        ledger: [
            ['詮釋，而非裸值', '分數以「符合 n/4 準則」呈現，而非光禿的 0.75——給的是理由，不是數字。'],
            ['所有選項可見', '每個媒合都保持可選；排序引導但不移除選擇。'],
            ['標示，而非強迫', '最佳卡片被標示與突顯，但不預選、也不預設預約。'],
            ['預設雙語', '姓名、取向與費用以雙語呈現；標記維持英文。'],
        ],
        caption: '結果畫面（左）與所選檔案畫面（右），依線上網站重建。',
    },
};

function Avatar({ t }) {
    return <span className="pm-av" aria-hidden="true">{initials(t)}</span>;
}
function Stars({ r }) {
    return <span className="pm-stars" aria-hidden="true">{'★'.repeat(Math.round(r))}<span className="pm-stars-dim">{'★'.repeat(5 - Math.round(r))}</span></span>;
}

export default function M10_ShippedScreens() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    const ranked = useMemo(() => rankTherapists(THERAPISTS, DEFAULT_INTAKE, 4), []);
    const [sel, setSel] = useState(0);
    const met = r => [r.breakdown.approach, r.breakdown.online, r.breakdown.budget, r.breakdown.topic].filter(x => x > 0).length;
    const cur = ranked[Math.min(sel, ranked.length - 1)];
    const T = cur.therapist;
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <div className="pm-screens">
                <div className="pm-screen">
                    <div className="pm-screen-bar"><span className="pm-screen-dot" /><span className="pm-screen-url">psymatch · /results</span></div>
                    <div className="pm-screen-body">
                        <h4 className="pm-screen-h">{c.resultsHead}</h4>
                        <p className="pm-screen-sub">{c.resultsSub}</p>
                        <ul className="pm-reslist">
                            {ranked.map((r, i) => (
                                <li key={r.therapist.id}>
                                    <button className={`pm-rescard${i === sel ? ' is-sel' : ''}${i === 0 ? ' is-top' : ''}`} onClick={() => setSel(i)} aria-pressed={i === sel}>
                                        <Avatar t={r.therapist} />
                                        <div className="pm-rescard-main">
                                            <div className="pm-rescard-top">
                                                <strong>{lang === 'zh' ? r.therapist.name : r.therapist.enName}</strong>
                                                {i === 0 && <span className="pm-tag pm-tag--teal">{c.recommend}</span>}
                                            </div>
                                            <span className="pm-rescard-orient">{r.therapist.approaches.join(' / ')} · {r.therapist.city[lang]}</span>
                                            <span className="pm-rescard-met">{c.criteriaMet(met(r))}</span>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pm-screen">
                    <div className="pm-screen-bar"><span className="pm-screen-dot" /><span className="pm-screen-url">psymatch · /therapist/{T.id}</span></div>
                    <div className="pm-screen-body">
                        <div className="pm-detail-head">
                            <Avatar t={T} />
                            <div>
                                <strong className="pm-detail-name">{lang === 'zh' ? T.name : T.enName}</strong>
                                <span className="pm-detail-lic">{T.license}</span>
                            </div>
                        </div>
                        <p className="pm-detail-blurb">{T.blurb[lang]}</p>
                        <div className="pm-detail-meta">
                            <div><span>{c.fee}</span><strong>NT${T.feeMin}–{T.feeMax}</strong></div>
                            <div><span>{c.rating}</span><strong><Stars r={T.rating} /> {T.rating}</strong></div>
                            <div><span>{T.online ? c.online : c.inperson}</span><strong>{c.years(T.years)}</strong></div>
                        </div>
                        <div className="pm-detail-tags">
                            {T.specialties.map(s => <span key={s} className="pm-tag">{specName(s, lang)}</span>)}
                        </div>
                        <div className="pm-detail-actions">
                            <button className="pm-btn is-on">{c.book}</button>
                            <button className="pm-btn">{c.message}</button>
                        </div>
                    </div>
                </div>
            </div>
            <Caption kind="Fig." n={5}>{c.caption}</Caption>

            <div className="pm-ledger">
                <span className="pm-budget-head">{c.ledgerTitle}</span>
                <div className="pm-ledger-grid">
                    {c.ledger.map(([k, v]) => (
                        <div className="pm-ledger-row" key={k}>
                            <strong>{k}</strong>
                            <p>{v}</p>
                        </div>
                    ))}
                </div>
            </div>
        </SectionModule>
    );
}

injectStyles('pm-m10', `
.pm-screens { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.pm-screen { border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-md); overflow: hidden; background: var(--pm-bg-2); }
.pm-screen-bar { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: var(--pm-bg-3); border-bottom: 1px solid var(--pm-line-1); }
.pm-screen-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--pm-teal); }
.pm-screen-url { font-family: var(--pm-font-data); font-size: 11px; color: var(--pm-text-3); }
.pm-screen-body { padding: 16px; }
.pm-screen-h { font-family: var(--pm-font-display); font-size: 18px; color: var(--pm-text-1); margin: 0; }
.pm-screen-sub { font-size: 12.5px; color: var(--pm-text-3); margin: 4px 0 14px; }
.pm-reslist { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.pm-rescard { display: flex; gap: 11px; align-items: center; width: 100%; text-align: left; padding: 11px; border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-sm); background: var(--pm-bg-1); transition: border-color 150ms var(--pm-ease); }
.pm-rescard:hover { border-color: var(--pm-line-2); }
.pm-rescard.is-sel { border-color: var(--pm-teal); }
.pm-rescard.is-top { background: linear-gradient(180deg, var(--pm-teal-dim), transparent 80%); }
.pm-av { flex: 0 0 auto; width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; background: var(--pm-bg-3); border: 1px solid var(--pm-line-2); font-family: var(--pm-font-data); font-size: 13px; color: var(--pm-teal); }
.pm-rescard-main { min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.pm-rescard-top { display: flex; align-items: center; gap: 8px; }
.pm-rescard-top strong { color: var(--pm-text-1); font-size: 14px; }
.pm-rescard-top .pm-tag { font-size: 8.5px; padding: 1px 6px; }
.pm-rescard-orient { font-size: 12px; color: var(--pm-text-3); }
.pm-rescard-met { font-family: var(--pm-font-data); font-size: 11px; color: var(--pm-teal); }
.pm-detail-head { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.pm-detail-head .pm-av { width: 48px; height: 48px; font-size: 15px; }
.pm-detail-name { display: block; color: var(--pm-text-1); font-size: 16px; }
.pm-detail-lic { font-family: var(--pm-font-data); font-size: 11px; color: var(--pm-text-3); }
.pm-detail-blurb { font-size: 13.5px; line-height: 1.6; color: var(--pm-text-2); margin: 0 0 14px; }
.pm-detail-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 12px; }
.pm-detail-meta div { padding: 9px 10px; border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-sm); background: var(--pm-bg-1); }
.pm-detail-meta span { display: block; font-family: var(--pm-font-data); font-size: 9.5px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--pm-text-3); margin-bottom: 3px; }
.pm-detail-meta strong { color: var(--pm-text-1); font-size: 13px; }
.pm-stars { color: var(--pm-amber); font-size: 12px; }
.pm-stars-dim { color: var(--pm-line-2); }
.pm-detail-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
.pm-detail-actions { display: flex; gap: 8px; }
.pm-ledger { margin-top: 22px; }
.pm-ledger-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.pm-ledger-row { padding: 13px 15px; border: 1px solid var(--pm-line-1); border-left: 2px solid var(--pm-teal); border-radius: 0 var(--pm-r-sm) var(--pm-r-sm) 0; background: var(--pm-bg-2); }
.pm-ledger-row strong { color: var(--pm-text-1); font-size: 13.5px; }
.pm-ledger-row p { margin: 4px 0 0; font-size: 12.5px; line-height: 1.5; color: var(--pm-text-3); }
@media (max-width: 767px) { .pm-screens { grid-template-columns: 1fr; } .pm-ledger-grid { grid-template-columns: 1fr; } }
`);
