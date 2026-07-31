import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M01');

const COPY = {
    en: {
        title: "The analyst's morning intelligence workflow",
        lead: 'Before designing a solution, I measured the problem itself. This record focuses on analysts’ daily 07:30–09:00 morning intelligence work, comparing the work steps and time spent before and after the tool was introduced.',
        beforeLabel: 'BEFORE IMPLEMENTATION | AVG. 75 MIN / DAY', afterLabel: 'AFTER IMPLEMENTATION | AVG. 12 MIN / DAY',
        before: [
            { id: 'tabs',   min: 8,  label: 'Open sources' },
            { id: 'scan',   min: 22, label: 'Filter headlines' },
            { id: 'dedupe', min: 11, label: 'Identify duplicates' },
            { id: 'notes',  min: 18, label: 'Organize notes' },
            { id: 'trans',  min: 9,  label: 'Translate key points' },
            { id: 'slack',  min: 7,  label: 'Reformat for publishing' },
        ],
        after: [
            { id: 'read',  min: 9, label: 'Read the compiled results' },
            { id: 'check', min: 3, label: 'Check sources and revise' },
        ],
        protocolToggle: 'Research protocol',
        protocolIntro: 'Method: 3-week diary study · n=3 (myself + 2 ISTI analysts) · self-logged.',
        protoCols: ['Field', 'Logged'],
        proto: [
            ['Window', '07:30–09:00, every working day'],
            ['Instrument', 'Timer + a 6-row activity template (the segments above)'],
            ['Sample', 'n=3 — small, internal, not a controlled trial'],
            ['Caveat', 'Self-observation is biased; I treat this as direction, not proof'],
        ],
        soWhat: 'Morning intelligence work may look like reading, but most of the time goes to searching, comparing, and reorganizing.',
    },
    zh: {
        title: '分析師的晨間情報工作流',
        lead: '在設計解法之前，我先量測問題本身。這份紀錄聚焦分析師每天 07:30–09:00 的晨間情報整理，對照工具導入前後的工作步驟與耗時紀錄。',
        beforeLabel: '導入前｜平均每日 75 分鐘', afterLabel: '導入後｜平均每日 12 分鐘',
        before: [
            { id: 'tabs',   min: 8,  label: '開啟來源' },
            { id: 'scan',   min: 22, label: '篩選標題' },
            { id: 'dedupe', min: 11, label: '辨識重複' },
            { id: 'notes',  min: 18, label: '整理筆記' },
            { id: 'trans',  min: 9,  label: '翻譯重點' },
            { id: 'slack',  min: 7,  label: '重排發布' },
        ],
        after: [
            { id: 'read',  min: 9, label: '閱讀整理結果' },
            { id: 'check', min: 3, label: '核對來源與修正' },
        ],
        protocolToggle: '研究方法',
        protocolIntro: '方法：三週日誌研究 · n=3（我 + 兩位 ISTI 分析師）· 自我紀錄。',
        protoCols: ['欄位', '紀錄'],
        proto: [
            ['時段', '07:30–09:00，每個工作日'],
            ['工具', '計時器 + 六列活動模板（即上方區段）'],
            ['樣本', 'n=3——小樣本、內部、非對照試驗'],
            ['限制', '自我觀察有偏誤；我視此為方向，而非證明'],
        ],
        soWhat: '晨間情報工作看似在閱讀，其實大部分時間都耗在尋找、比對與重新整理。',
    },
};

function TimeBar({ segments, active, setActive, tone }) {
    return (
        <div className="ni-m1-bar" role="list">
            {segments.map(s => {
                const on = active === s.id;
                return (
                    <button key={s.id} role="listitem"
                        className={`ni-m1-seg${on ? ' is-on' : ''}`}
                        style={{ flexGrow: s.min, '--ni-seg': tone }}
                        onMouseEnter={() => setActive(s.id)}
                        onFocus={() => setActive(s.id)}
                        aria-pressed={on}
                        aria-label={`${s.label}, ${s.min} minutes`}>
                        <span className="ni-m1-seg-min">{s.min}′</span>
                        <span className="ni-m1-seg-label">{s.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

export default function M01_AnalystMorning() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [active, setActive] = useState(t.before[1].id);
    const [open, setOpen] = useState(false);
    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ni-m1-split">
                <div className="ni-m1-col">
                    <span className="ni-m1-collabel ni-m1-collabel--before">{t.beforeLabel}</span>
                    <TimeBar segments={t.before} active={active} setActive={setActive} tone="var(--ni-amber)" />
                </div>
                <div className="ni-m1-col ni-m1-col--after">
                    <span className="ni-m1-collabel ni-m1-collabel--after">{t.afterLabel}</span>
                    <TimeBar segments={t.after} active={active} setActive={setActive} tone="var(--ni-teal)" />
                </div>
            </div>
            <button className="ni-m1-proto-toggle" aria-expanded={open} onClick={() => setOpen(o => !o)}>
                <span className="ni-m1-proto-chevron" data-open={open} aria-hidden="true">▸</span>
                {t.protocolToggle}
            </button>
            {open && (
                <div className="ni-m1-proto">
                    <p className="ni-caption" style={{ marginBottom: 10 }}>{t.protocolIntro}</p>
                    <table className="ni-m1-table">
                        <thead><tr>{t.protoCols.map(c => <th key={c} scope="col">{c}</th>)}</tr></thead>
                        <tbody>{t.proto.map((r, i) => <tr key={i}><th scope="row">{r[0]}</th><td>{r[1]}</td></tr>)}</tbody>
                    </table>
                </div>
            )}
        </ModuleFrame>
    );
}

injectStyles('ni-m1', `
.ni-m1-split { display: flex; flex-direction: column; gap: 16px; }
.ni-m1-collabel { font-family: var(--ni-font-data); font-size: 11px; letter-spacing: 0.1em; display: block; margin-bottom: 8px; }
.ni-m1-collabel--before { color: var(--ni-amber); }
.ni-m1-collabel--after { color: var(--ni-teal); }
.ni-m1-bar { display: flex; gap: 3px; height: 62px; }
.ni-m1-seg { position: relative; flex-basis: 0; min-width: 34px; display: flex; flex-direction: column; justify-content: center; gap: 3px; padding: 6px 8px; border: 1px solid var(--ni-line-2); border-radius: var(--ni-r-sm); background: color-mix(in srgb, var(--ni-seg) 12%, var(--ni-bg-2)); overflow: hidden; transition: background 160ms var(--ni-ease), border-color 160ms var(--ni-ease); text-align: left; }
.ni-m1-seg::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--ni-seg); }
.ni-m1-seg:hover, .ni-m1-seg.is-on { background: color-mix(in srgb, var(--ni-seg) 26%, var(--ni-bg-2)); border-color: var(--ni-seg); }
.ni-m1-seg-min { font-family: var(--ni-font-data); font-size: 13px; color: var(--ni-text-1); }
.ni-m1-seg-label { font-size: 11px; color: var(--ni-text-2); line-height: 1.25; overflow-wrap: anywhere; }
.ni-m1-col--after .ni-m1-bar { max-width: 27%; min-width: 160px; }
.ni-m1-proto-toggle { display: inline-flex; align-items: center; gap: 8px; margin-top: 20px; font-family: var(--ni-font-data); font-size: 12px; letter-spacing: 0.06em; color: var(--ni-teal); }
.ni-m1-proto-chevron { display: inline-block; transition: transform 160ms var(--ni-ease); }
.ni-m1-proto-chevron[data-open="true"] { transform: rotate(90deg); }
.ni-m1-proto { margin-top: 14px; padding: 16px; background: var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); }
.ni-m1-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.ni-m1-table th, .ni-m1-table td { text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--ni-line-1); }
.ni-m1-table thead th { font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ni-text-3); }
.ni-m1-table tbody th { font-family: var(--ni-font-data); font-size: 12px; color: var(--ni-text-2); font-weight: 400; width: 34%; }
.ni-m1-table tbody td { color: var(--ni-text-1); }
@media (min-width: 768px) { .ni-m1-split { flex-direction: row; align-items: flex-start; } .ni-m1-col { flex: 1; } .ni-m1-col--after { flex: 0 0 auto; } }
@media (max-width: 767px) { .ni-m1-col--after .ni-m1-bar { max-width: none; } .ni-m1-seg-label { display: none; } }
`);
