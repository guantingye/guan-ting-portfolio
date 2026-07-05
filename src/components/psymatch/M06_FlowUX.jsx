import React, { useEffect, useRef, useState } from 'react';
import SectionModule, { useI18n, Caption, injectStyles } from './shared/psyKit.jsx';
import { MODULES } from './data/psyContent.js';

const MOD = MODULES.find(m => m.key === 'M06');
const GS = { fill: 'none', stroke: 'var(--pm-line-2)', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

const PLATES = {
    A: <g {...GS}><rect x="10" y="10" width="140" height="16" rx="3" /><rect x="20" y="42" width="90" height="7" className="a" /><rect x="20" y="56" width="120" height="5" /><rect x="20" y="66" width="100" height="5" /><rect x="20" y="84" width="52" height="16" rx="4" className="a" fill="var(--pm-teal-dim)" /></g>,
    B: <g {...GS}><rect x="10" y="12" width="140" height="6" rx="3" /><rect x="10" y="12" width="70" height="6" rx="3" className="a" /><rect x="20" y="34" width="70" height="6" /><rect x="20" y="50" width="120" height="42" rx="4" className="a" /><rect x="110" y="98" width="40" height="0" /></g>,
    C: <g {...GS}>{[0, 1, 2, 3].map(i => <rect key={i} x={12 + i * 36} y="16" width="30" height="8" rx="4" className={i < 2 ? 'a' : undefined} fill={i < 2 ? 'var(--pm-teal-dim)' : 'none'} />)}<rect x="12" y="40" width="60" height="6" /><rect x="12" y="58" width="130" height="34" rx="4" /></g>,
    D: <g {...GS}><rect x="18" y="20" width="124" height="26" rx="4" /><rect x="18" y="56" width="110" height="6" stroke="var(--pm-amber)" className="a" /><rect x="100" y="80" width="44" height="16" rx="4" stroke="var(--pm-line-1)" /></g>,
    E: <g {...GS}><circle cx="80" cy="46" r="18" className="a" strokeDasharray="60 24" /><rect x="46" y="78" width="68" height="6" /><rect x="58" y="90" width="44" height="5" /></g>,
    F: <g {...GS}><rect x="14" y="14" width="132" height="24" rx="4" className="a" fill="var(--pm-teal-dim)" /><rect x="14" y="46" width="132" height="22" rx="4" /><rect x="14" y="76" width="132" height="22" rx="4" /></g>,
    G: <g {...GS}>{[16, 28, 40, 52, 64, 76, 88].map(y => <rect key={y} x="18" y={y} width="124" height="6" />)}<path d="M40 26 L120 84 M120 26 L40 84" stroke="var(--pm-red)" strokeWidth="3" /></g>,
};

const COPY = {
    en: {
        title: 'Assessment flow & fatigue budget',
        lead: 'The questionnaire designed as a product, not a form. Click a plate to enlarge.',
        soWhat: 'The questionnaire is designed as a product, not a form.',
        plates: [
            { k: 'A', title: 'Landing', note: 'One promise, one call to action: “three simple steps.” No account wall before value is shown.' },
            { k: 'B', title: 'Step template', note: 'One construct per step. Mixing scales mid-step would contaminate the response set.' },
            { k: 'C', title: 'Progress header', note: 'Step n of 4, always visible, so length feels bounded rather than open-ended.' },
            { k: 'D', title: 'Step gating', note: 'The budget floor (NT$1,000) is enforced here with a spoken error before advancing.' },
            { k: 'E', title: 'Compute / wait', note: 'A short “analysing your needs” state sets expectation for the recommendation.' },
            { k: 'F', title: 'Results reveal', note: 'Top match marked, all options kept visible — the humane decision moment.' },
        ],
        rejected: { k: 'G', title: 'Single long form', note: 'Rejected — every field on one page reads as a wall and completion drops. Step-gating trades a few clicks for a finishable flow.' },
        rejectedTag: 'REJECTED',
        budgetTitle: 'Fatigue budget',
        budgetCols: ['Step', 'Items', 'Est. seconds', 'Cumulative'],
        budgetRows: [
            ['1 · Preferences', '3', '60', '1:00'],
            ['2 · Issue topics', '7', '180', '4:00'],
            ['3 · Orientation', '1', '30', '4:30'],
            ['4 · Schedule', '1', '20', '4:50'],
            ['Submit / compute', '—', '10', '5:00'],
        ],
        budgetRule: 'Design rule: keep the median completion under ~8 minutes. The layout above sits near 5:00, leaving margin.',
        close: 'Close',
        dialogHint: 'Wireframe detail',
    },
    zh: {
        title: '評估流程與疲勞預算',
        lead: '把問卷當成產品來設計，而不是一張表單。點擊圖板放大。',
        soWhat: '這份問卷是被當成產品設計的，而不是一張表單。',
        plates: [
            { k: 'A', title: '著陸頁', note: '一個承諾、一個行動呼籲：「簡單三步驟」。在展示價值之前不設帳號牆。' },
            { k: 'B', title: '步驟模板', note: '每步一個構念。步驟中途混入不同量表會汙染作答組。' },
            { k: 'C', title: '進度標頭', note: '第 n / 4 步始終可見，讓長度感覺有界，而非無止盡。' },
            { k: 'D', title: '步驟守門', note: '預算下限（NT$1,000）在此以明確錯誤提示強制，才能前進。' },
            { k: 'E', title: '運算 / 等待', note: '短暫的「分析您的需求中」狀態，為推薦建立期待。' },
            { k: 'F', title: '結果揭曉', note: '標示最佳媒合，但所有選項保持可見——有人性的決策時刻。' },
        ],
        rejected: { k: 'G', title: '單頁長表單', note: '拒絕——所有欄位擠在一頁讀起來像一面牆，完成率下降。步驟守門以幾次點擊換得一條走得完的流程。' },
        rejectedTag: '已拒絕',
        budgetTitle: '疲勞預算',
        budgetCols: ['步驟', '題數', '估計秒數', '累積'],
        budgetRows: [
            ['1 · 偏好設定', '3', '60', '1:00'],
            ['2 · 議題評估', '7', '180', '4:00'],
            ['3 · 取向偏好', '1', '30', '4:30'],
            ['4 · 時段', '1', '20', '4:50'],
            ['送出 / 運算', '—', '10', '5:00'],
        ],
        budgetRule: '設計準則：把中位完成時間控制在約 8 分鐘內。上述版面約落在 5:00，留有餘裕。',
        close: '關閉',
        dialogHint: '線框細節',
    },
};

function Lightbox({ plate, hint, closeLabel, onClose }) {
    const ref = useRef(null);
    useEffect(() => {
        const prev = document.activeElement;
        const node = ref.current;
        const focusables = () => node.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        node.querySelector('button')?.focus();
        const onKey = e => {
            if (e.key === 'Escape') { onClose(); return; }
            if (e.key !== 'Tab') return;
            const f = focusables();
            if (!f.length) return;
            const first = f[0], last = f[f.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        };
        node.addEventListener('keydown', onKey);
        return () => { node.removeEventListener('keydown', onKey); prev?.focus?.(); };
    }, [onClose]);
    return (
        <div className="pm-lb" ref={ref} role="dialog" aria-modal="true" aria-label={`${plate.title} — ${hint}`} onClick={onClose}>
            <div className="pm-lb-panel" onClick={e => e.stopPropagation()}>
                <div className="pm-lb-head">
                    <span className="pm-lb-letter">{plate.k}</span>
                    <strong>{plate.title}</strong>
                    <button className="pm-btn pm-lb-close" onClick={onClose}>{closeLabel} ✕</button>
                </div>
                <svg className="pm-lb-svg" viewBox="0 0 160 110" aria-hidden="true">{PLATES[plate.k]}</svg>
                <p className="pm-lb-note">{plate.note}</p>
            </div>
        </div>
    );
}

function Plate({ plate, rejected, tag, onOpen }) {
    return (
        <figure className={`pm-plate${rejected ? ' is-rejected' : ''}`}>
            <button className="pm-plate-btn" onClick={() => onOpen(plate)} aria-label={`${plate.title} — enlarge`}>
                <svg viewBox="0 0 160 110" aria-hidden="true">{PLATES[plate.k]}</svg>
                <span className="pm-plate-letter">{plate.k}</span>
                {rejected && <span className="pm-tag pm-tag--red pm-plate-tag">{tag}</span>}
            </button>
            <figcaption className="pm-plate-cap"><strong>{plate.k}</strong> {plate.title}</figcaption>
        </figure>
    );
}

export default function M06_FlowUX() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    const [open, setOpen] = useState(null);
    const notes = [...c.plates, c.rejected];
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <div className="pm-plates">
                {c.plates.map(p => <Plate key={p.k} plate={p} tag={c.rejectedTag} onOpen={setOpen} />)}
                <Plate plate={c.rejected} rejected tag={c.rejectedTag} onOpen={setOpen} />
            </div>
            <ol className="pm-plate-notes">
                {notes.map(p => (
                    <li key={p.k}><span className="pm-plate-notes-k">{p.k}</span>{p.note}</li>
                ))}
            </ol>

            <div className="pm-budget">
                <span className="pm-budget-head">{c.budgetTitle}</span>
                <div className="pm-table-wrap">
                    <table className="pm-table pm-table--budget">
                        <thead><tr>{c.budgetCols.map(h => <th key={h}>{h}</th>)}</tr></thead>
                        <tbody>
                            {c.budgetRows.map((r, i) => (
                                <tr key={i} className={i === c.budgetRows.length - 1 ? 'pm-budget-total' : undefined}>
                                    {r.map((cell, j) => <td key={j} data-label={c.budgetCols[j]} className={j === 0 ? 'pm-table-lead' : undefined}>{cell}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="pm-budget-rule">{c.budgetRule}</p>
                <Caption kind="Fig." n={3}>{lang === 'zh' ? '六個線框圖板、一個被拒版本，與疲勞預算。' : 'Six wireframe plates, one rejected alternative, and the fatigue budget.'}</Caption>
            </div>

            {open && <Lightbox plate={open} hint={c.dialogHint} closeLabel={c.close} onClose={() => setOpen(null)} />}
        </SectionModule>
    );
}

injectStyles('pm-m6', `
.pm-plates { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.pm-plate { margin: 0; }
.pm-plate-btn { position: relative; display: block; width: 100%; border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-sm); background: var(--pm-bg-2); padding: 8px; transition: border-color 150ms var(--pm-ease), transform 150ms var(--pm-ease); }
.pm-plate-btn:hover { border-color: var(--pm-teal); transform: translateY(-2px); }
.pm-plate-btn svg { display: block; width: 100%; height: auto; }
.pm-plate-btn svg .a { stroke: var(--pm-teal); }
.pm-plate-letter { position: absolute; top: 10px; left: 12px; font-family: var(--pm-font-data); font-size: 11px; color: var(--pm-teal); }
.pm-plate-tag { position: absolute; top: 8px; right: 8px; font-size: 8.5px; padding: 1px 5px; }
.pm-plate.is-rejected .pm-plate-btn { border-color: var(--pm-red); }
.pm-plate-cap { font-family: var(--pm-font-data); font-size: 10.5px; color: var(--pm-text-3); margin-top: 6px; }
.pm-plate-cap strong { color: var(--pm-teal); }
.pm-plate-notes { list-style: none; margin: 18px 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 22px; }
.pm-plate-notes li { font-size: 13px; line-height: 1.5; color: var(--pm-text-2); padding-left: 26px; position: relative; }
.pm-plate-notes-k { position: absolute; left: 0; top: 0; font-family: var(--pm-font-data); font-size: 11px; color: var(--pm-teal); border: 1px solid var(--pm-line-2); border-radius: 3px; padding: 0 5px; }
.pm-budget { margin-top: 24px; }
.pm-budget-head { font-family: var(--pm-font-data); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--pm-text-3); display: block; margin-bottom: 10px; }
.pm-table--budget tbody td:nth-child(n+2) { font-family: var(--pm-font-data); font-size: 12.5px; color: var(--pm-text-2); }
.pm-budget-total td { color: var(--pm-text-1) !important; background: var(--pm-bg-3); }
.pm-budget-total td:nth-child(4) { color: var(--pm-teal) !important; }
.pm-budget-rule { margin: 12px 0 0; font-size: 13px; color: var(--pm-text-3); font-style: italic; }
/* lightbox */
.pm-lb { position: fixed; inset: 0; z-index: 60; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(6,7,9,0.82); backdrop-filter: blur(3px); }
.pm-lb-panel { width: min(520px, 100%); background: var(--pm-bg-1); border: 1px solid var(--pm-line-2); border-radius: var(--pm-r-lg); padding: 20px; }
.pm-lb-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.pm-lb-letter { font-family: var(--pm-font-data); font-size: 13px; color: var(--pm-teal); border: 1px solid var(--pm-line-2); border-radius: 4px; padding: 1px 7px; }
.pm-lb-head strong { flex: 1; color: var(--pm-text-1); font-size: 16px; }
.pm-lb-close { font-size: 12px; padding: 6px 12px; }
.pm-lb-svg { width: 100%; height: auto; background: var(--pm-bg-2); border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-sm); padding: 16px; }
.pm-lb-svg .a { stroke: var(--pm-teal); }
.pm-lb-note { margin: 14px 0 0; font-size: 14px; line-height: 1.6; color: var(--pm-text-2); }
@media (max-width: 767px) {
  .pm-plates { grid-template-columns: repeat(2, 1fr); }
  .pm-plate-notes { grid-template-columns: 1fr; }
}
`);
