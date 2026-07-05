import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M01');

const COPY = {
    en: {
        title: "The analyst's morning",
        lead: 'Before I designed anything, I timed the problem. This is the 07:30–09:00 window before and after the system existed, from a 3-week diary study I ran on myself and two ISTI analysts.',
        beforeLabel: 'BEFORE — 75 min / day', afterLabel: 'AFTER — 12 min / day',
        hoverHint: 'Hover or focus a segment to read the friction it caused.',
        before: [
            { id: 'tabs',   min: 8,  label: 'Open ~9 tabs',        quote: 'Nine sources, nine layouts. Half the time was just getting to the text.' },
            { id: 'scan',   min: 22, label: 'Scan headlines',      quote: 'Skim everything, trust nothing. The relevant 10% is buried in vendor PR.' },
            { id: 'dedupe', min: 11, label: 'Dedupe mentally',     quote: 'The same funding round, five times, three headline framings. I held it all in my head.' },
            { id: 'notes',  min: 18, label: 'Copy into notes',     quote: 'Copy, paste, reformat, lose the source link, go back for the source link.' },
            { id: 'trans',  min: 9,  label: 'Translate key EN',    quote: 'The team reads zh-TW. I hand-translated the parts that mattered, every day.' },
            { id: 'slack',  min: 7,  label: 'Format for Slack',    quote: 'Re-formatting for Slack so it was skimmable ate the last of the morning.' },
        ],
        after: [
            { id: 'read',  min: 9, label: 'Read briefing',    quote: 'The briefing is already deduped, tagged, and bilingual. I read, I do not assemble.' },
            { id: 'check', min: 3, label: 'Spot-check 2 src', quote: 'I still verify two source links by hand — trust, but keep a hand on the wheel.' },
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
        soWhat: 'I measure the problem before designing for it.',
    },
    zh: {
        title: '分析師的早晨',
        lead: '在動手設計之前，我先替問題計時。這是每天 07:30–09:00 這段時間、系統上線前後的對照，資料來自我對自己和兩位 ISTI 分析師做的三週日誌紀錄。',
        beforeLabel: 'BEFORE — 每天 75 分鐘', afterLabel: 'AFTER — 每天 12 分鐘',
        hoverHint: '將游標移到或聚焦某個區段，閱讀它造成的摩擦。',
        before: [
            { id: 'tabs',   min: 8,  label: '開約 9 個分頁',   quote: '九個來源、九種版面。一半時間只是為了看到內文。' },
            { id: 'scan',   min: 22, label: '掃描標題',        quote: '什麼都掃，什麼都不信。真正相關的 10% 埋在廠商公關稿裡。' },
            { id: 'dedupe', min: 11, label: '心裡去重',        quote: '同一輪募資，五次，三種標題寫法，全靠腦袋記著。' },
            { id: 'notes',  min: 18, label: '貼進筆記',        quote: '複製、貼上、重排、弄丟來源連結，再回去找來源連結。' },
            { id: 'trans',  min: 9,  label: '翻譯關鍵英文',    quote: '團隊讀繁中，重要段落我每天手動翻譯。' },
            { id: 'slack',  min: 7,  label: '排版給 Slack',    quote: '為了讓 Slack 好讀而重排，吃掉早晨最後一段時間。' },
        ],
        after: [
            { id: 'read',  min: 9, label: '讀簡報',       quote: '簡報已經去重、標好類、雙語。我只讀，不再組裝。' },
            { id: 'check', min: 3, label: '抽查 2 來源',  quote: '我仍手動核對兩個來源連結——信任，但手要放在方向盤上。' },
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
        soWhat: '我在為問題設計之前，先量測它。',
    },
};

function TimeBar({ segments, total, active, setActive, tone }) {
    return (
        <div className="ni-m1-bar" role="list">
            {segments.map(s => {
                const pct = (s.min / total) * 100;
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
                        {pct > 14 && <span className="ni-m1-seg-label">{s.label}</span>}
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
    const all = [...t.before, ...t.after];
    const current = all.find(s => s.id === active) || t.before[1];

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <p className="ni-caption ni-m1-hint">{t.hoverHint}</p>
            <div className="ni-m1-split">
                <div className="ni-m1-col">
                    <span className="ni-m1-collabel ni-m1-collabel--before">{t.beforeLabel}</span>
                    <TimeBar segments={t.before} total={75} active={active} setActive={setActive} tone="var(--ni-amber)" />
                </div>
                <div className="ni-m1-col ni-m1-col--after">
                    <span className="ni-m1-collabel ni-m1-collabel--after">{t.afterLabel}</span>
                    <TimeBar segments={t.after} total={75} active={active} setActive={setActive} tone="var(--ni-teal)" />
                </div>
            </div>
            <div className="ni-m1-quote" aria-live="polite">
                <span className="ni-m1-quote-mark" aria-hidden="true">“</span>
                <p>{current.quote}</p>
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
.ni-m1-hint { display: block; margin-bottom: 14px; }
.ni-m1-split { display: flex; flex-direction: column; gap: 16px; }
.ni-m1-collabel { font-family: var(--ni-font-data); font-size: 11px; letter-spacing: 0.1em; display: block; margin-bottom: 8px; }
.ni-m1-collabel--before { color: var(--ni-amber); }
.ni-m1-collabel--after { color: var(--ni-teal); }
.ni-m1-bar { display: flex; gap: 3px; height: 62px; }
.ni-m1-seg { position: relative; flex-basis: 0; min-width: 34px; display: flex; flex-direction: column; justify-content: center; gap: 3px; padding: 6px 8px; border: 1px solid var(--ni-line-2); border-radius: var(--ni-r-sm); background: color-mix(in srgb, var(--ni-seg) 12%, var(--ni-bg-2)); overflow: hidden; transition: background 160ms var(--ni-ease), border-color 160ms var(--ni-ease); text-align: left; }
.ni-m1-seg::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--ni-seg); }
.ni-m1-seg:hover, .ni-m1-seg.is-on { background: color-mix(in srgb, var(--ni-seg) 26%, var(--ni-bg-2)); border-color: var(--ni-seg); }
.ni-m1-seg-min { font-family: var(--ni-font-data); font-size: 13px; color: var(--ni-text-1); }
.ni-m1-seg-label { font-size: 11px; color: var(--ni-text-2); line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ni-m1-col--after .ni-m1-bar { max-width: 27%; min-width: 160px; }
.ni-m1-quote { display: flex; gap: 12px; margin-top: 18px; padding: 16px 18px; background: var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); }
.ni-m1-quote-mark { font-family: var(--ni-font-display); font-size: 34px; line-height: 0.7; color: var(--ni-teal); }
.ni-m1-quote p { margin: 0; font-family: var(--ni-font-display); font-size: 17px; font-style: italic; line-height: 1.45; color: var(--ni-text-1); }
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
