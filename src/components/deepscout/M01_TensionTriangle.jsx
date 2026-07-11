import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/dsKit.jsx';
import { MODULES } from './data/dsContent.js';

const MOD = MODULES.find(m => m.key === 'M01');

const COPY = {
    en: {
        title: 'The brief behind the brief',
        lead: 'Three people read the same DeepScout brief for different reasons, and no interface satisfies all three by default. The product scope is what got cut out of that tension.',
        hint: 'Select a reader to see their pain, their gain, and the design decision it forced.',
        roles: [
            {
                id: 'analyst', tag: 'PRIMARY USER', name: 'The analyst', wants: 'speed without losing defensibility',
                pain: 'Tab-hell, and the quiet fear of missing or misjudging a signal.',
                gain: 'A defensible brief in minutes — not a day lost switching tabs.',
                decision: 'The brief format is fixed and scannable: every field in the same place, every time, so the analyst reads instead of hunts.',
            },
            {
                id: 'lead', tag: 'DECISION MAKER', name: 'The innovation lead', wants: 'a portfolio view, not one company at a time',
                pain: 'Too many things that merely look interesting, with no way to rank them.',
                gain: 'Signal-to-noise and a portfolio view of where attention should actually go.',
                decision: 'A verdict field (call / monitor / pass) sits at the top of every brief — the lead can scan verdicts across many companies without reading every field.',
            },
            {
                id: 'startup', tag: 'SUBJECT OF THE BRIEF', name: 'The scouted startup', wants: 'not to be judged on stale or wrong data',
                pain: 'Being misjudged on data that’s stale, or simply wrong.',
                gain: 'Sourced, timestamped fields — a visible unverified flag instead of a false claim.',
                decision: 'Every field carries a source link and a retrieval date, and low-confidence fields are visually demoted instead of asserted as fact.',
            },
        ],
        edgesLabel: 'Where they pull against each other',
        edges: [
            { a: 'analyst', b: 'lead', text: 'The analyst wants depth on one company; the lead wants breadth across many. The verdict field is the compromise — deep enough to defend, short enough to scan.' },
            { a: 'lead', b: 'startup', text: 'The lead wants to filter aggressively; the startup fears being filtered out on thin data. An UNVERIFIED flag lets DeepScout include a company honestly instead of silently dropping it.' },
            { a: 'startup', b: 'analyst', text: 'The startup wants current information; the analyst wants speed. A retrievedAt stamp on every field lets the analyst move fast without pretending the data is fresher than it is.' },
        ],
        soWhat: 'The product isn’t optimized for any one reader — it’s the resolution of a three-way argument, in interface form.',
    },
    zh: {
        title: '命題與三方張力',
        lead: '三種人讀同一份 DeepScout brief，理由各不相同，沒有一個介面能同時滿足所有人。產品範圍，就是從這個張力裡收斂出來的。',
        hint: '選一位讀者，看他的痛點、他拿到的東西，以及這逼出的設計決策。',
        roles: [
            {
                id: 'analyst', tag: '主要使用者', name: '分析師', wants: '要速度，但不能犧牲可辯護性',
                pain: '開十幾個分頁還拼不出全貌，心裡最怕的是漏看或看錯一個訊號。',
                gain: '幾分鐘就能生出一份守得住的 brief，不用再耗一整天切換分頁。',
                decision: 'brief 的格式固定且可掃視：每個欄位永遠在同一個位置，讓分析師用讀的，而不是用找的。',
            },
            {
                id: 'lead', tag: '決策者', name: '創新主管', wants: '要的是全局視角，不是一家一家看',
                pain: '太多東西「看起來很有趣」，卻沒有一套排序的方法。',
                gain: '拿到的是訊噪比和全局視角，幫他決定注意力該花在哪。',
                decision: '每份 brief 頂端都有一個判斷欄位（值得深談／持續觀察／暫不推進）——主管可以掃過許多公司的判斷，不必逐欄細讀。',
            },
            {
                id: 'startup', tag: '被偵搜對象', name: '被 scout 的新創', wants: '不要被過時或錯誤的資料誤判',
                pain: '最怕被過時或根本錯誤的資料誤判。',
                gain: '拿到的是附來源、附時效戳的欄位，看得見的未驗證旗標，而不是一句空口斷言。',
                decision: '每個欄位都附來源連結與擷取日期，低信心欄位會被視覺降級，而不是被當成事實斷言。',
            },
        ],
        edgesLabel: '他們互相拉扯的地方',
        edges: [
            { a: 'analyst', b: 'lead', text: '分析師要單一公司的深度，主管要跨公司的廣度。判斷欄位是折衷——深到能辯護，短到能掃視。' },
            { a: 'lead', b: 'startup', text: '主管想積極篩選，新創怕因資料稀薄被篩掉。未驗證旗標讓 DeepScout 可以誠實收錄一家公司，而不是悄悄剔除。' },
            { a: 'startup', b: 'analyst', text: '新創要資料夠新，分析師要動作夠快。每個欄位的時效戳讓分析師能快速行動，同時不假裝資料比實際更新。' },
        ],
        soWhat: '這個產品不是為任何單一讀者最佳化的——它是一場三方拉鋸的結論，被做成了介面。',
    },
};

const POS = { analyst: { x: 200, y: 60 }, lead: { x: 60, y: 300 }, startup: { x: 340, y: 300 } };

export default function M01_TensionTriangle() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [active, setActive] = useState('analyst');
    const role = t.roles.find(r => r.id === active);
    const relevantEdges = t.edges.filter(e => e.a === active || e.b === active);

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <p className="ds-caption ds-m01-hint">{t.hint}</p>
            <div className="ds-m01-grid">
                <div className="ds-m01-tri">
                    <svg viewBox="0 0 400 360" width="100%" role="img" aria-label="Tension triangle">
                        <line x1={POS.analyst.x} y1={POS.analyst.y} x2={POS.lead.x} y2={POS.lead.y} className="ds-m01-edge" />
                        <line x1={POS.lead.x} y1={POS.lead.y} x2={POS.startup.x} y2={POS.startup.y} className="ds-m01-edge" />
                        <line x1={POS.startup.x} y1={POS.startup.y} x2={POS.analyst.x} y2={POS.analyst.y} className="ds-m01-edge" />
                        {t.roles.map(r => (
                            <g key={r.id} transform={`translate(${POS[r.id].x} ${POS[r.id].y})`}
                                className={`ds-m01-node${active === r.id ? ' is-on' : ''}`}
                                onClick={() => setActive(r.id)} role="button" tabIndex={0}
                                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(r.id); } }}
                                aria-pressed={active === r.id}>
                                <circle r="34" />
                                <text textAnchor="middle" dy="5" className="ds-m01-node-label">{r.name}</text>
                            </g>
                        ))}
                    </svg>
                </div>
                <div className="ds-m01-panel">
                    <span className="ds-eyebrow" style={{ color: 'var(--ds-teal)' }}>{role.tag}</span>
                    <h4 className="ds-m01-role-name">{role.name}</h4>
                    <p className="ds-m01-wants">{role.wants}</p>
                    <div className="ds-m01-pg">
                        <div className="ds-m01-pg-row ds-m01-pg-row--pain">
                            <span className="ds-m01-pg-label">{lang === 'zh' ? '痛點' : 'PAIN'}</span>
                            <p>{role.pain}</p>
                        </div>
                        <div className="ds-m01-pg-row ds-m01-pg-row--gain">
                            <span className="ds-m01-pg-label">{lang === 'zh' ? '收穫' : 'GAIN'}</span>
                            <p>{role.gain}</p>
                        </div>
                    </div>
                    <div className="ds-m01-decision">
                        <span className="ds-m01-pg-label">{lang === 'zh' ? '設計決策' : 'DESIGN DECISION'}</span>
                        <p>{role.decision}</p>
                    </div>
                </div>
            </div>
            <div className="ds-m01-edges">
                <span className="ds-caption">{t.edgesLabel}</span>
                {relevantEdges.map((e, i) => <p key={i} className="ds-m01-edge-text">{e.text}</p>)}
            </div>
        </ModuleFrame>
    );
}

injectStyles('ds-m01-style', `
.ds-m01-hint { display: block; margin-bottom: 14px; }
.ds-m01-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 22px; align-items: start; }
.ds-m01-tri { padding: 8px; }
.ds-m01-edge { stroke: var(--ds-line-2); stroke-width: 1.5; }
.ds-m01-node { cursor: pointer; }
.ds-m01-node circle { fill: var(--ds-bg-2); stroke: var(--ds-line-2); stroke-width: 2; transition: fill 160ms var(--ds-ease), stroke 160ms var(--ds-ease); }
.ds-m01-node:hover circle { stroke: var(--ds-teal); }
.ds-m01-node.is-on circle { fill: var(--ds-teal-dim); stroke: var(--ds-teal); stroke-width: 2.5; }
.ds-m01-node-label { font-family: var(--ds-font-body); font-size: 12px; fill: var(--ds-text-2); pointer-events: none; }
.ds-m01-node.is-on .ds-m01-node-label { fill: var(--ds-text-1); font-weight: 600; }
.ds-m01-panel { padding: 18px 20px; background: var(--ds-bg-2); border: 1px solid var(--ds-line-1); border-radius: var(--ds-r-md); }
.ds-m01-role-name { font-family: var(--ds-font-display); font-size: 22px; color: var(--ds-text-1); margin: 8px 0 2px; }
.ds-m01-wants { margin: 0 0 16px; font-size: 13.5px; font-style: italic; color: var(--ds-text-3); }
.ds-m01-pg { display: grid; gap: 10px; margin-bottom: 16px; }
.ds-m01-pg-row { padding: 10px 12px; border-radius: var(--ds-r-sm); border-left: 2px solid var(--ds-line-2); }
.ds-m01-pg-row--pain { border-left-color: var(--ds-red); background: var(--ds-red-dim); }
.ds-m01-pg-row--gain { border-left-color: var(--ds-teal); background: var(--ds-teal-dim); }
.ds-m01-pg-label { display: block; font-family: var(--ds-font-data); font-size: 10px; letter-spacing: 0.1em; color: var(--ds-text-3); margin-bottom: 4px; }
.ds-m01-pg-row p { margin: 0; font-size: 13.5px; color: var(--ds-text-1); }
.ds-m01-decision { padding: 12px; background: var(--ds-bg-3); border-radius: var(--ds-r-sm); }
.ds-m01-decision p { margin: 4px 0 0; font-size: 13.5px; color: var(--ds-text-2); }
.ds-m01-edges { margin-top: 20px; display: grid; gap: 8px; }
.ds-m01-edge-text { margin: 0; font-size: 13.5px; line-height: 1.6; color: var(--ds-text-2); padding-left: 14px; border-left: 2px solid var(--ds-line-2); }
@media (max-width: 767px) { .ds-m01-grid { grid-template-columns: 1fr; } }
`);
