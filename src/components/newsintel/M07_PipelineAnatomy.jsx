import React, { useEffect, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, usePrefersReducedMotion, useViewport, useInView } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M07');

// One REAL headline (the platform's shipped AI-chip report) traced through
// every stage. Intermediate artifacts are reconstructed; the terminal card is
// the real /insights report on the live platform.
const STAGES = [
    {
        id: 'crawl', label: { en: 'Source retrieval', zh: '來源擷取' },
        inCap: { en: 'Input | source URLs and subscriptions', zh: '輸入｜來源網址與訂閱項目' },
        outCap: { en: 'Output | source snapshot with original HTML preserved', zh: '輸出｜保留原始 HTML 的來源快照' },
        in: 'GET tech&industry feed\n→ item: "AI chip market 2024…"',
        out: '<article><h1>AI 晶片市場…</h1>\n<div class="ad">…</div><p>隨著生成式AI…</p>',
    },
    {
        id: 'clean', label: { en: 'Content cleanup', zh: '內容清理' },
        inCap: { en: 'Entering — raw HTML', zh: '進入——原始 HTML' },
        outCap: { en: 'Leaving — plain text (Trafilatura)', zh: '離開——純文字（Trafilatura）' },
        in: '<article>…<div class="ad">…</div>\n<nav>…</nav><p>隨著生成式AI…</p>',
        out: '隨著生成式AI應用快速普及，AI晶片市場\n呈現爆炸性成長。2024年全球AI晶片市場\n規模達到530億美元…',
    },
    {
        id: 'dedupe', label: { en: 'Duplicate merging', zh: '重複合併' },
        inCap: { en: 'Entering — cleaned text', zh: '進入——清理後文字' },
        outCap: { en: 'Leaving — hash + verdict', zh: '離開——雜湊 + 判定' },
        in: 'title="全球半導體產業AI晶片市場趨勢分析"',
        out: 'sha1(title)=9f3c… · fuzzy=0.12\nverdict: UNIQUE (keep)',
    },
    {
        id: 'classify', label: { en: 'Topic classification', zh: '主題分類' },
        inCap: { en: 'Entering — text', zh: '進入——文字' },
        outCap: { en: 'Leaving — taxonomy JSON', zh: '離開——分類 JSON' },
        in: '隨著生成式AI…台灣半導體供應鏈…',
        out: '{ "primary": "Semiconductor",\n  "tags": ["AI","半導體","晶片設計","市場趨勢"],\n  "confidence": "high" }',
    },
    {
        id: 'summarize', label: { en: 'Bilingual summary', zh: '雙語摘要' },
        inCap: { en: 'Entering — text + tags', zh: '進入——文字 + 標籤' },
        outCap: { en: 'Leaving — bilingual briefing', zh: '離開——雙語簡報' },
        in: 'prompt v5 · quote numbers verbatim, null if absent',
        out: '{ "summary_zh": "2024年AI晶片市場達530億美元，\n  2028年將突破1,200億美元，CAGR 23.6%…",\n  "figures": ["US$53B","US$120B","23.6%","80%"] }',
    },
    {
        id: 'publish', label: { en: 'Data publishing', zh: '資料發布' },
        inCap: { en: 'Entering — briefing JSON', zh: '進入——簡報 JSON' },
        outCap: { en: 'Leaving — structured record', zh: '離開——結構化紀錄' },
        in: '{ summary_zh, figures, tags, source_span }',
        out: 'DB row: { title, date:2025-01-15,\n  category:"Semiconductor", body, tags } → /insights',
    },
    {
        id: 'platform', label: { en: 'Frontend presentation', zh: '前端呈現' },
        inCap: { en: 'Entering — published record', zh: '進入——已發布紀錄' },
        outCap: { en: 'Leaving — live insight card (REAL)', zh: '離開——線上洞察卡（真實）' },
        in: 'record #… on /insights',
        out: '「全球半導體產業AI晶片市場趨勢分析」\n發布日期 2025-01-15 · Semiconductor\n#AI #半導體 #晶片設計 #市場趨勢',
    },
];

const COPY = {
    en: {
        title: 'Data pipeline trace | From source news to product page',
        lead: 'This module traces one real news story through its full path: source retrieval, content cleanup and deduplication, industry classification, bilingual summarization, publishing, and frontend presentation. Select any stage to see what data it receives, which transformations it performs, and how its output is handed to the next step. The pipeline is not just a background service—it is a product workflow that can be inspected, debugged, and traced.',
        run: 'Run trace', running: 'Tracing…',
        headlineLabel: 'Signal in transit',
        headline: '「全球半導體產業AI晶片市場趨勢分析」',
        inspectLabel: 'Stage inspection',
        soWhat: 'Review the seven processing stages and the record of data transformations',
    },
    zh: {
        title: '資料管線追蹤｜從原始新聞到產品頁面',
        lead: '這個模組追蹤一則真實新聞，從來源擷取、內容清理與去重，到產業分類、雙語摘要、發布與前端呈現的完整路徑。選取任一階段，即可查看該步驟接收了什麼資料、進行哪些轉換，以及產出如何交給下一個環節。這讓資料管線不只是背景服務，而是一套可以被檢查、除錯與追溯的產品流程。',
        run: '執行追蹤', running: '追蹤中…',
        headlineLabel: '傳輸中的訊號',
        headline: '「全球半導體產業AI晶片市場趨勢分析」',
        inspectLabel: '階段檢視',
        soWhat: '查看七個處理階段與資料轉換紀錄',
    },
};

const DURATION = 4400;

export default function M07_PipelineAnatomy() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const reduced = usePrefersReducedMotion();
    const viewport = useViewport();
    const stepper = reduced || viewport === 'mobile';

    const [active, setActive] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [pulse, setPulse] = useState(1);
    const raf = useRef(0);
    const startAt = useRef(0);
    const played = useRef(false);
    const [wrapRef, inView] = useInView({ rootMargin: '0px 0px -20% 0px' });

    const stop = () => { cancelAnimationFrame(raf.current); setPlaying(false); };
    const loop = () => {
        const p = Math.min(1, (performance.now() - startAt.current) / DURATION);
        setPulse(p);
        setActive(Math.min(STAGES.length - 1, Math.floor(p * STAGES.length)));
        if (p < 1) raf.current = requestAnimationFrame(loop);
        else setPlaying(false);
    };
    const run = () => {
        if (stepper) { setActive(0); return; }
        cancelAnimationFrame(raf.current);
        setPlaying(true); setPulse(0); setActive(0);
        startAt.current = performance.now();
        raf.current = requestAnimationFrame(loop);
    };
    const pickStage = i => { stop(); setActive(i); setPulse(i / (STAGES.length - 1)); };

    useEffect(() => {
        if (inView && !played.current && !stepper) { played.current = true; run(); }
    }, [inView, stepper]);
    useEffect(() => () => cancelAnimationFrame(raf.current), []);

    const s = STAGES[active];

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ni-m7" ref={wrapRef}>
                <div className="ni-m7-top">
                    <div className="ni-m7-headline">
                        <span className="ni-caption">{t.headlineLabel}</span>
                        <span className="ni-m7-headline-text">{t.headline}</span>
                    </div>
                    {!stepper && (
                        <button className={`ni-btn ni-m7-run${playing ? ' is-on' : ''}`} onClick={run} disabled={playing}>
                            <span className="ni-m7-run-dot" aria-hidden="true" />
                            {playing ? t.running : t.run}
                        </button>
                    )}
                </div>

                {stepper ? (
                    <ol className="ni-m7-stepper">
                        {STAGES.map((st, i) => (
                            <li key={st.id} className={`ni-m7-step${i === active ? ' is-on' : ''}`}>
                                <button className="ni-m7-step-head" aria-expanded={i === active} onClick={() => setActive(i)}>
                                    <span className="ni-m7-step-num">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="ni-m7-step-label">{st.label[lang]}</span>
                                </button>
                                {i === active && <Inspector s={st} lang={lang} />}
                            </li>
                        ))}
                    </ol>
                ) : (
                    <>
                        <div className="ni-m7-rail" role="tablist" aria-label={t.title}>
                            <div className="ni-m7-rail-line" aria-hidden="true" />
                            <div className="ni-m7-pulse" aria-hidden="true" style={{ left: `${pulse * 100}%`, opacity: playing ? 1 : 0.001 }} />
                            {STAGES.map((st, i) => {
                                const passed = pulse >= i / (STAGES.length - 1) - 0.001;
                                return (
                                    <button key={st.id} role="tab" aria-selected={i === active}
                                        className={`ni-m7-node${i === active ? ' is-on' : ''}${passed ? ' is-passed' : ''}`}
                                        style={{ left: `${(i / (STAGES.length - 1)) * 100}%` }}
                                        onClick={() => pickStage(i)}>
                                        <span className="ni-m7-node-dot" aria-hidden="true" />
                                        <span className="ni-m7-node-label">{st.label[lang]}</span>
                                        <span className="ni-m7-node-idx">{String(i + 1).padStart(2, '0')}</span>
                                    </button>
                                );
                            })}
                        </div>
                        <Inspector s={s} lang={lang} label={t.inspectLabel} />
                    </>
                )}
            </div>
        </ModuleFrame>
    );
}

function Inspector({ s, lang, label }) {
    return (
        <div className="ni-m7-inspect" aria-live="polite">
            {label && <span className="ni-caption ni-m7-inspect-label">{label}｜{s.label[lang]}</span>}
            <div className="ni-m7-io">
                <div className="ni-m7-io-col">
                    <span className="ni-m7-io-cap ni-m7-io-cap--in">{s.inCap[lang]}</span>
                    <pre className="ni-m7-io-code ni-m7-io-code--in">{s.in}</pre>
                </div>
                <span className="ni-m7-io-arrow" aria-hidden="true">→</span>
                <div className="ni-m7-io-col">
                    <span className="ni-m7-io-cap ni-m7-io-cap--out">{s.outCap[lang]}</span>
                    <pre className="ni-m7-io-code ni-m7-io-code--out">{s.out}</pre>
                </div>
            </div>
        </div>
    );
}

injectStyles('ni-m7', `
.ni-m7-top { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 30px; }
.ni-m7-headline { display: flex; flex-direction: column; gap: 6px; }
.ni-m7-headline-text { font-family: var(--ni-font-display); font-size: 18px; color: var(--ni-text-1); }
.ni-m7-run-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--ni-teal); box-shadow: 0 0 8px var(--ni-teal); }
.ni-m7-run.is-on { border-color: var(--ni-teal); }

.ni-m7-rail { position: relative; height: 92px; margin: 8px 12px 26px; }
.ni-m7-rail-line { position: absolute; top: 16px; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--ni-line-2), var(--ni-line-1)); }
.ni-m7-pulse { position: absolute; top: 17px; width: 14px; height: 14px; margin: -7px 0 0 -7px; border-radius: 50%; background: var(--ni-teal); box-shadow: 0 0 0 4px rgba(53,194,176,0.25), 0 0 18px 4px var(--ni-teal); transition: opacity 200ms linear; }
.ni-m7-node { position: absolute; top: 0; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 7px; width: 92px; }
.ni-m7-node-dot { width: 13px; height: 13px; border-radius: 50%; background: var(--ni-bg-2); border: 2px solid var(--ni-line-2); margin-top: 10px; transition: background 200ms var(--ni-ease), border-color 200ms var(--ni-ease), box-shadow 200ms var(--ni-ease); }
.ni-m7-node.is-passed .ni-m7-node-dot { border-color: var(--ni-teal); background: var(--ni-teal-dim); }
.ni-m7-node.is-on .ni-m7-node-dot { background: var(--ni-teal); box-shadow: 0 0 10px var(--ni-teal); }
.ni-m7-node-label { font-size: 12px; color: var(--ni-text-3); text-align: center; transition: color 200ms var(--ni-ease); }
.ni-m7-node.is-on .ni-m7-node-label, .ni-m7-node.is-passed .ni-m7-node-label { color: var(--ni-text-1); }
.ni-m7-node-idx { font-family: var(--ni-font-data); font-size: 9px; letter-spacing: 0.1em; color: var(--ni-text-3); }

.ni-m7-inspect { border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); background: var(--ni-bg-2); padding: 16px; }
.ni-m7-inspect-label { display: block; margin-bottom: 12px; }
.ni-m7-io { display: grid; grid-template-columns: 1fr auto 1fr; gap: 12px; align-items: stretch; }
.ni-m7-io-col { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.ni-m7-io-cap { font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; }
.ni-m7-io-cap--in { color: var(--ni-text-3); }
.ni-m7-io-cap--out { color: var(--ni-teal); }
.ni-m7-io-code { margin: 0; flex: 1; font-family: var(--ni-font-data); font-size: 11.5px; line-height: 1.65; color: var(--ni-text-2); background: var(--ni-bg-0); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-sm); padding: 12px; overflow-x: auto; white-space: pre; }
.ni-m7-io-code--out { color: var(--ni-text-1); border-color: var(--ni-line-2); }
.ni-m7-io-arrow { align-self: center; color: var(--ni-teal); font-size: 18px; }

.ni-m7-stepper { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.ni-m7-step { border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); overflow: hidden; background: var(--ni-bg-1); }
.ni-m7-step.is-on { border-color: var(--ni-line-2); }
.ni-m7-step-head { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 14px; background: var(--ni-bg-2); }
.ni-m7-step-num { font-family: var(--ni-font-data); font-size: 12px; color: var(--ni-teal); }
.ni-m7-step-label { font-size: 14px; color: var(--ni-text-1); }
.ni-m7-step .ni-m7-inspect { border: none; border-top: 1px solid var(--ni-line-1); border-radius: 0; }
.ni-m7-step .ni-m7-io { grid-template-columns: 1fr; }
.ni-m7-step .ni-m7-io-arrow { display: none; }

@media (max-width: 900px) { .ni-m7-io { grid-template-columns: 1fr; } .ni-m7-io-arrow { transform: rotate(90deg); } }
`);
