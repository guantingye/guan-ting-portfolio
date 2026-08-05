import React, { useEffect, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, usePrefersReducedMotion, onActivate } from './shared/ispKit.jsx';
import { MODULES, SPECIMEN_COMPANIES } from './data/strategyPlatformContent.js';

const MOD = MODULES.find(m => m.key === 'M06');

// The eight skills — colocated per repo convention (module copy stays in the
// module file). Each writes one section of the M05-shaped analyst note.
const SKILLS = [
    {
        id: 'S1', key: 'SOURCING', section: null,
        en: { name: 'Data research', input: 'Company name / signal', method: 'Pull public filings, funding databases, and reporting; de-dupe against existing DB rows.', output: 'Evidence pack, every claim source-tagged', guard: 'No source, no claim — nothing gets written without a citation.' },
        zh: { name: '資料搜尋', input: '公司名 / 訊號', method: '拉公開申報、募資資料庫與報導；與既有資料庫列去重比對。', output: '帶來源標記的證據包', guard: '無源不寫——沒有引用的主張不會被寫進去。' },
    },
    {
        id: 'S2', key: 'MOAT-DECOMP', section: 'moat',
        en: { name: 'Moat analysis', input: 'Evidence pack', method: 'Classify moat type (technical / data / distribution / regulatory / capital) and rate durability.', output: 'THE MOAT section + type tag', guard: 'Must separate a real moat from a temporary lead.' },
        zh: { name: '護城河拆解', input: '證據包', method: '分類護城河型別（技術／資料／分佈／法規／資本）並評估耐久度。', output: 'THE MOAT 段 + 型別標籤', guard: '必須區分「真護城河」與「暫時領先」。' },
    },
    {
        id: 'S3', key: 'MODEL-MAP', section: 'businessModel',
        en: { name: 'Business model mapping', input: 'Evidence pack', method: 'Infer pricing motion, GTM shape, and upsell surface from public signals.', output: 'BUSINESS MODEL section', guard: 'Uncertain inferences get flagged, never stated as fact.' },
        zh: { name: '商業模式映射', input: '證據包', method: '從公開訊號推論定價機制、GTM 型態與追加銷售面。', output: 'BUSINESS MODEL 段', guard: '不確定的推論需標記，不可寫成事實。' },
    },
    {
        id: 'S4', key: 'FUNDING-RECON', section: 'funding',
        en: { name: 'Funding history reconstruction', input: 'Evidence pack', method: 'Reconstruct rounds, investors, and valuation trajectory from filings and reporting.', output: 'FUNDING STATUS section', guard: 'Amounts as ranges with dates — never a false-precise number.' },
        zh: { name: '資金歷程重建', input: '證據包', method: '從申報與報導重建輪次、投資人與估值軌跡。', output: 'FUNDING STATUS 段', guard: '金額給區間並附日期——絕不給假精確的數字。' },
    },
    {
        id: 'S5', key: 'RISK-FRAMING', section: 'risks',
        en: { name: 'Risk framework synthesis', input: 'S2–S4 outputs', method: 'Classify into competitive / technical / capital / talent / platform risk.', output: 'KEY RISKS section (enumerated)', guard: 'Must surface at least one non-obvious risk, not just the visible one.' },
        zh: { name: '風險框架整理', input: 'S2–S4 輸出', method: '分類為競爭／技術／資本／人才／平台五類風險。', output: 'KEY RISKS 段（編號）', guard: '至少涵蓋一個非顯而易見的風險，而不只是表面那個。' },
    },
    {
        id: 'S6', key: 'VERDICT-SCORE', section: 'verdict',
        en: { name: 'Research judgment scoring', input: 'All prior outputs', method: 'Score track / watch / pass against a rubric; state the reason with its cost.', output: 'VERDICT section', guard: 'Must be falsifiable — flags its own valuation sensitivity.' },
        zh: { name: '研究判斷評分', input: '前述全部輸出', method: '依 rubric 給 track / watch / pass 傾向；說明有成本的理由。', output: 'VERDICT 段', guard: '必須可被反駁——標出自己的估值敏感度。' },
    },
    {
        id: 'S7', key: 'BILINGUAL', section: null,
        en: { name: 'Bilingual content output', input: 'Six drafted sections', method: 'Parallel EN/繁中 generation, numbers held identical across languages.', output: 'Bilingual six-section note', guard: 'A number or proper noun may not drift between languages.' },
        zh: { name: '雙語內容輸出', input: '六段草稿', method: 'EN／繁中平行產出，數字在兩個語言間保持一致。', output: '雙語六段註記', guard: '數字或專有名詞不得因翻譯漂移。' },
    },
    {
        id: 'S8', key: 'STYLE-GUARD', section: null,
        en: { name: 'Style & format guardrails', input: 'Bilingual draft', method: 'Scan for AI-voice tells (list-of-three padding, empty adjectives); align to analyst register.', output: 'Publish-ready draft', guard: 'Every remaining claim must trace back to S1 evidence.' },
        zh: { name: '文風與格式守門', input: '雙語草稿', method: '掃描 AI 腔調痕跡（排比堆砌、空泛形容詞）；對齊分析師語氣。', output: '可發佈草稿', guard: '每個留下的主張都必須能回指到 S1 的證據。' },
    },
];

const COPY = {
    en: {
        title: 'AI strategy skill-module system',
        lead: 'Deep analysis cannot rely only on a larger prompt, nor should staffing expand in direct proportion to content volume. This module breaks a complete analytical task into eight independently checkable skills: data research, moat analysis, business model mapping, funding history reconstruction, risk framework synthesis, research judgment scoring, bilingual content output, and style and format guardrails. Each step can be checked, reviewed, and corrected on its own before being assembled into a complete draft. This module is currently a concept and not yet live; the demonstration draft reverse-engineers its writing process from a published analyst note.',
        pick: 'Pick a company',
        run: 'Run pipeline', reset: 'Reset', running: 'Running…',
        gateLabel: 'Confidence + evidence gate',
        gateHold: 'Evidence too thin — held, routed back to S1',
        gatePass: 'Evidence sufficient — proceeding to bilingual + style pass',
        simulateThin: 'Simulate insufficient evidence at any review checkpoint',
        draftTitle: 'Assembling the note',
        draftEmpty: 'Not yet run. Select a company and start the pipeline to follow how the draft is generated, checked, and assembled step by step.',
        readyBadge: 'Ready for editorial review →',
        soWhat: 'Rather than put every task into one giant prompt, I break the analysis into eight checkable, rerunnable skills. When an output is wrong, the team can locate the step where the problem occurred instead of regenerating the whole piece.',
    },
    zh: {
        title: 'AI 策略技能模組系統',
        lead: '深度分析不能只依賴更大的 prompt，也不該隨著內容規模增加而等比例擴張人力。這個模組把完整的分析任務拆成八個可獨立檢查的技能：資料搜尋、護城河拆解、商業模式映射、資金歷程重建、風險框架整理、研究判斷評分、雙語內容輸出與文風與格式守門。每一步都能單獨檢查、複檢與修正，再組合成完整草稿。此模組目前為概念設計，尚未正式上線；示範草稿依據已發布的分析註記，反向重建其寫作流程。',
        pick: '選一家公司',
        run: '執行 pipeline', reset: '重設', running: '執行中…',
        gateLabel: '信心與證據閘門',
        gateHold: '證據不足——保留，退回 S1',
        gatePass: '證據充分——進入雙語與文風守門',
        simulateThin: '模擬：在任一檢查節點標記證據不足',
        draftTitle: '組成草稿中',
        draftEmpty: '尚未執行。選擇一家公司並啟動 pipeline，即可逐步查看草稿如何生成、檢查與組裝。',
        readyBadge: '已可交付編輯審核 →',
        soWhat: '與其把所有任務塞進一個巨大 prompt，我把分析流程拆成八個可檢查、可重跑的技能。輸出出錯時，團隊能定位問題發生在哪一步，而不是只能重新生成整篇。',
    },
};

export default function M06_StrategistAgent() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const reduced = usePrefersReducedMotion();
    const [companyId, setCompanyId] = useState(SPECIMEN_COMPANIES[0].id);
    const [step, setStep] = useState(-1); // -1 idle, 0..7 running, 8 done, -2 held
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [thinEvidence, setThinEvidence] = useState(false);
    const timers = useRef([]);
    const company = SPECIMEN_COMPANIES.find(c => c.id === companyId);

    useEffect(() => () => timers.current.forEach(clearTimeout), []);

    const reset = () => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
        setStep(-1);
    };

    const run = () => {
        reset();
        const delay = reduced ? 40 : 420;
        SKILLS.forEach((_, i) => {
            const t2 = setTimeout(() => {
                // Gate check happens right after S6 (index 5, verdict scoring).
                if (i === 6 && thinEvidence) { setStep(-2); return; }
                setStep(i);
            }, delay * (i + 1));
            timers.current.push(t2);
        });
    };

    const changeCompany = id => { setCompanyId(id); reset(); };
    const isDone = step >= 7;
    const isHeld = step === -2;
    const activeSkill = selectedSkill || (step >= 0 && step < 8 ? SKILLS[step] : null);
    const sk = activeSkill ? (activeSkill[lang] ?? activeSkill.en) : null;

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <span className="isp-caption isp-m6-label">{t.pick}</span>
            <div className="isp-m6-companies" role="tablist" aria-label={t.pick}>
                {SPECIMEN_COMPANIES.map(c => (
                    <button key={c.id} role="tab" aria-selected={companyId === c.id}
                        className={`isp-btn isp-m6-company${companyId === c.id ? ' is-on' : ''}`}
                        onClick={() => changeCompany(c.id)}>{c.name}</button>
                ))}
            </div>

            <div className="isp-m6-rail" aria-label="Skill pipeline">
                {SKILLS.map((s, i) => {
                    const active = step === i;
                    const done = step > i || isDone;
                    const heldHere = isHeld && i === 6;
                    return (
                        <button key={s.id}
                            className={`isp-m6-skill${active ? ' is-active' : ''}${done ? ' is-done' : ''}${heldHere ? ' is-held' : ''}${selectedSkill?.id === s.id ? ' is-picked' : ''}`}
                            onClick={() => setSelectedSkill(selectedSkill?.id === s.id ? null : s)}
                            onKeyDown={onActivate(() => setSelectedSkill(selectedSkill?.id === s.id ? null : s))}>
                            <span className="isp-m6-skill-id">{s.id}</span>
                            <span className="isp-m6-skill-name">{(s[lang] ?? s.en).name}</span>
                        </button>
                    );
                })}
            </div>

            <div className="isp-m6-controls">
                <button className="isp-btn is-on" onClick={run} disabled={step >= 0 && step < 7}>{step >= 0 && step < 7 ? t.running : t.run}</button>
                <button className="isp-btn" onClick={reset}>{t.reset}</button>
                <label className="isp-m6-thin">
                    <input type="checkbox" checked={thinEvidence} onChange={e => setThinEvidence(e.target.checked)} />
                    {t.simulateThin}
                </label>
            </div>

            {sk && (
                <div className="isp-m6-detail" aria-live="polite">
                    <div className="isp-m6-detail-row"><span>{lang === 'zh' ? '輸入' : 'INPUT'}</span><p>{sk.input}</p></div>
                    <div className="isp-m6-detail-row"><span>{lang === 'zh' ? '方法' : 'METHOD'}</span><p>{sk.method}</p></div>
                    <div className="isp-m6-detail-row"><span>{lang === 'zh' ? '輸出' : 'OUTPUT'}</span><p>{sk.output}</p></div>
                    <div className="isp-m6-detail-row isp-m6-detail-guard"><span>{lang === 'zh' ? '護欄' : 'GUARDRAIL'}</span><p>{sk.guard}</p></div>
                </div>
            )}

            {isHeld && (
                <div className="isp-m6-gate isp-m6-gate--hold">
                    <span className="isp-tag isp-tag--red">{t.gateLabel}</span>
                    <p>{t.gateHold}</p>
                </div>
            )}
            {step >= 5 && !isHeld && (
                <div className="isp-m6-gate isp-m6-gate--pass">
                    <span className="isp-tag isp-tag--teal">{t.gateLabel}</span>
                    <p>{t.gatePass}</p>
                </div>
            )}

            <div className="isp-m6-draft">
                <span className="isp-caption isp-m6-label">{t.draftTitle}</span>
                {step < 1 ? (
                    <p className="isp-m6-draft-empty">{t.draftEmpty}</p>
                ) : (
                    <div className="isp-m6-draft-body">
                        {SKILLS.filter(s => s.section && SKILLS.indexOf(s) <= step).map(s => (
                            <div className="isp-m6-draft-section" key={s.id}>
                                <span className="isp-m6-draft-label">{s.section === 'moat' ? 'THE MOAT' : s.section === 'businessModel' ? 'BUSINESS MODEL' : s.section === 'funding' ? 'FUNDING STATUS' : s.section === 'risks' ? 'KEY RISKS' : 'VERDICT'}</span>
                                <p>{company[s.section]}</p>
                            </div>
                        ))}
                        {isDone && <span className="isp-tag isp-tag--iris isp-m6-ready">{t.readyBadge}</span>}
                    </div>
                )}
            </div>
        </ModuleFrame>
    );
}

injectStyles('isp-m6-style', `
.isp-m6-label { display: block; margin-bottom: 10px; }
.isp-m6-companies { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
.isp-m6-company { font-size: 12px; padding: 7px 12px; }
.isp-m6-rail { display: grid; grid-template-columns: repeat(8, 1fr); gap: 5px; margin-bottom: 14px; }
.isp-m6-skill { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 4px; border: 1px solid var(--isp-line-2); border-radius: var(--isp-r-sm); background: var(--isp-bg-2); text-align: center; transition: border-color 200ms var(--isp-ease), background 200ms var(--isp-ease), transform 200ms var(--isp-ease); }
.isp-m6-skill-id { font-family: var(--isp-font-data); font-size: 10px; color: var(--isp-text-3); }
.isp-m6-skill-name { font-size: 10.5px; line-height: 1.2; color: var(--isp-text-2); }
.isp-m6-skill.is-done { border-color: var(--isp-teal); background: var(--isp-teal-dim); }
.isp-m6-skill.is-done .isp-m6-skill-id { color: var(--isp-teal); }
.isp-m6-skill.is-active { border-color: var(--isp-amber); background: var(--isp-amber-dim); transform: scale(1.04); }
.isp-m6-skill.is-active .isp-m6-skill-id { color: var(--isp-amber); }
.isp-m6-skill.is-held { border-color: var(--isp-red); background: var(--isp-red-dim); }
.isp-m6-skill.is-picked { box-shadow: 0 0 0 1px var(--isp-iris) inset; }
@media (max-width: 720px) { .isp-m6-rail { grid-template-columns: repeat(4, 1fr); } }

.isp-m6-controls { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
.isp-m6-thin { display: inline-flex; align-items: center; gap: 7px; font-size: 12px; color: var(--isp-text-3); }

.isp-m6-detail { display: grid; gap: 8px; padding: 14px 16px; background: var(--isp-bg-2); border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-md); margin-bottom: 14px; }
.isp-m6-detail-row { display: grid; grid-template-columns: 90px 1fr; gap: 10px; }
.isp-m6-detail-row span { font-family: var(--isp-font-data); font-size: 10px; letter-spacing: 0.08em; color: var(--isp-text-3); padding-top: 2px; }
.isp-m6-detail-row p { margin: 0; font-size: 13px; line-height: 1.55; color: var(--isp-text-1); }
.isp-m6-detail-guard p { color: var(--isp-amber); }
@media (max-width: 640px) { .isp-m6-detail-row { grid-template-columns: 1fr; gap: 3px; } }

.isp-m6-gate { display: flex; align-items: baseline; gap: 12px; padding: 11px 14px; border-radius: var(--isp-r-sm); margin-bottom: 14px; }
.isp-m6-gate--hold { background: var(--isp-red-dim); border: 1px solid var(--isp-red); }
.isp-m6-gate--pass { background: var(--isp-teal-dim); border: 1px solid var(--isp-teal); }
.isp-m6-gate p { margin: 0; font-size: 13px; color: var(--isp-text-1); }

.isp-m6-draft { padding: 16px 18px; background: var(--isp-bg-0); border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-md); }
.isp-m6-draft-empty { margin: 0; font-size: 13px; color: var(--isp-text-3); font-style: italic; }
.isp-m6-draft-body { display: grid; gap: 14px; }
.isp-m6-draft-section { animation: isp-m6-fade 400ms var(--isp-ease); }
.isp-m6-draft-label { display: block; font-family: var(--isp-font-data); font-size: 10px; letter-spacing: 0.1em; color: var(--isp-teal); margin-bottom: 5px; }
.isp-m6-draft-section p { margin: 0; font-size: 13.5px; line-height: 1.62; color: var(--isp-text-2); }
.isp-m6-ready { margin-top: 4px; }
@keyframes isp-m6-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .isp-m6-draft-section { animation: none; } }
`);
