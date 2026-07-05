import React, { useState } from 'react';
import SectionModule, { useI18n, Caption, injectStyles } from './shared/ecoKit.jsx';
import { MODULES } from './data/ecoContent.js';

const MOD = MODULES.find(m => m.key === 'E09');

const QA = {
    en: [
        {
            id: 'q1', q: 'Which sectors have the biggest value-chain gaps?',
            kw: ['gap', 'thin', 'weak', 'underserved', 'missing'],
            grounded: '233 companies · 7 gaps', conf: 'high',
            a: 'Cleantech/energy and deep-tech enablers show the highest gaps, with biotech close behind. All three are thin on the value chain relative to their downstream demand — grid-scale storage, EDA/packaging tooling, and biomanufacturing scale-up are the sharpest holes.',
            cites: ['Table 1 · gaps', 'Plate 3 · atlas', 'Plate 4 · chain'],
        },
        {
            id: 'q2', q: 'Where is corporate capital concentrated?',
            kw: ['capital', 'corporate', 'invest', 'funding', 'money', 'vc'],
            grounded: '6 sectors · capital composition', conf: 'medium',
            a: 'Corporate money concentrates in semiconductor/IC design (45%) and advanced manufacturing (40%), where incumbents fund adjacent startups. AI is venture-led (55% VC/CVC); cleantech and enablers lean on government grants (50–55%).',
            cites: ['Plate 5 · investment flow'],
        },
        {
            id: 'q3', q: 'What is underfunded relative to its patent depth?',
            kw: ['patent', 'underfunded', 'ip', 'enabler', 'ratio'],
            grounded: 'patent ledger · funding index', conf: 'medium',
            a: 'Deep-tech enablers hold real IP (95 patent families) but carry the lowest funding index (29) and a high gap flag — a candidate for a targeted programme. Advanced packaging under manufacturing shows a similar IP-to-capital mismatch.',
            cites: ['Table 2 · ledger', 'Plate 5 · funding index'],
        },
    ],
    zh: [
        {
            id: 'q1', q: '哪些產業的價值鏈缺口最大？',
            kw: ['缺口', '單薄', '弱', '不足', '缺'],
            grounded: '233 家公司 · 7 個缺口', conf: 'high',
            a: '潔淨科技／能源與深科技賦能層的缺口最高，生技緊追在後。三者在價值鏈上相對下游需求都偏薄——電網級儲能、EDA／封裝工具與生物製造放大是最明顯的洞。',
            cites: ['Table 1 · 缺口', 'Plate 3 · 地圖', 'Plate 4 · 價值鏈'],
        },
        {
            id: 'q2', q: '企業資金集中在哪裡？',
            kw: ['資金', '企業', '投資', '資本', '創投'],
            grounded: '6 產業 · 資金組成', conf: 'medium',
            a: '企業資金集中於半導體／IC 設計（45%）與先進製造（40%），由既有大廠資助鄰近新創。AI 由創投主導（55% VC/CVC）；潔淨科技與賦能層則倚賴政府補助（50–55%）。',
            cites: ['Plate 5 · 投資流向'],
        },
        {
            id: 'q3', q: '相對於專利深度，什麼被低估投資？',
            kw: ['專利', '低估', 'ip', '賦能', '比例'],
            grounded: '專利帳 · 資金指數', conf: 'medium',
            a: '深科技賦能層握有真實 IP（95 個專利家族），資金指數卻最低（29）且屬高缺口——是針對性計畫的候選。先進製造下的先進封裝也呈現類似的 IP 對資本落差。',
            cites: ['Table 2 · 帳', 'Plate 5 · 資金指數'],
        },
    ],
};

const COPY = {
    en: {
        title: 'Atlas RAG console',
        lead: 'Ask the atlas a question in plain language; get an answer grounded in the tagged records, with citations.',
        soWhat: 'The intelligence answers plain-language questions — and shows its sources.',
        placeholder: 'Ask about gaps, capital, patents…',
        ask: 'Ask',
        presets: 'Try',
        retrieved: 'Grounded in',
        conf: 'Confidence',
        confLevels: { high: 'high', medium: 'medium' },
        citesLabel: 'Citations',
        noMatch: 'This grounded demo answers the three questions above — pick one to see the retrieval.',
        disclaimer: 'Demo retrieval over a fixed record set — not a live model. It cites where each claim is grounded so an answer is never a black box.',
        caption: 'A grounded query surface: question → retrieved records → cited answer.',
    },
    zh: {
        title: 'Atlas RAG 查詢台',
        lead: '用白話向地圖集提問；得到一個以標籤化紀錄為依據、附引用的回答。',
        soWhat: '這層商情能回答白話問題——並亮出它的來源。',
        placeholder: '問問缺口、資金、專利…',
        ask: '提問',
        presets: '試試',
        retrieved: '依據',
        conf: '信心',
        confLevels: { high: '高', medium: '中' },
        citesLabel: '引用',
        noMatch: '此依據式示範回答上方三個問題——選一個看看檢索過程。',
        disclaimer: '對固定紀錄集的示範檢索——非即時模型。它標出每個主張的依據所在，讓回答永遠不是黑箱。',
        caption: '一個依據式查詢介面：問題 → 檢索紀錄 → 附引用的回答。',
    },
};

export default function E09_RAGConsole() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    const qa = QA[lang] ?? QA.en;
    const [answer, setAnswer] = useState(qa[0]);
    const [input, setInput] = useState('');
    const [noMatch, setNoMatch] = useState(false);

    const run = text => {
        const q = text.toLowerCase();
        const hit = qa.find(item => item.kw.some(k => q.includes(k.toLowerCase())));
        if (hit) { setAnswer(hit); setNoMatch(false); } else { setNoMatch(true); }
    };
    const submit = e => { e.preventDefault(); run(input); };

    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <div className="eco-rag">
                <form className="eco-rag-bar" onSubmit={submit}>
                    <span className="eco-rag-prompt" aria-hidden="true">▸</span>
                    <input className="eco-rag-input" value={input} onChange={e => setInput(e.target.value)}
                        placeholder={c.placeholder} aria-label={c.placeholder} />
                    <button type="submit" className="eco-btn is-on eco-rag-ask">{c.ask}</button>
                </form>
                <div className="eco-rag-presets">
                    <span className="eco-rag-presets-k">{c.presets}</span>
                    {qa.map(item => (
                        <button key={item.id} className={`eco-btn eco-rag-chip${answer.id === item.id && !noMatch ? ' is-on' : ''}`}
                            onClick={() => { setAnswer(item); setNoMatch(false); setInput(item.q); }}>{item.q}</button>
                    ))}
                </div>

                <div className="eco-rag-out" aria-live="polite">
                    {noMatch ? (
                        <p className="eco-rag-nomatch">{c.noMatch}</p>
                    ) : (
                        <div className="eco-rag-card">
                            <div className="eco-rag-retrieval">
                                <span className="eco-rag-ret-k">{c.retrieved}</span>
                                <span className="eco-rag-ret-v">{answer.grounded}</span>
                                <span className="eco-rag-conf">{c.conf}: <b>{c.confLevels[answer.conf]}</b></span>
                            </div>
                            <p className="eco-rag-answer">{answer.a}</p>
                            <div className="eco-rag-cites">
                                <span className="eco-rag-cites-k">{c.citesLabel}</span>
                                {answer.cites.map(ct => <span key={ct} className="eco-tag eco-tag--teal">{ct}</span>)}
                            </div>
                        </div>
                    )}
                </div>
                <p className="eco-rag-disclaimer">{c.disclaimer}</p>
            </div>
            <Caption kind="Plate" n={6}>{c.caption}</Caption>
        </SectionModule>
    );
}

injectStyles('eco-e9', `
.eco-rag { border: 1px solid var(--eco-line-2); border-radius: var(--eco-r-md); background: var(--eco-bg-2); padding: 16px; }
.eco-rag-bar { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: 1px solid var(--eco-line-2); border-radius: var(--eco-r-sm); background: var(--eco-bg-0); }
.eco-rag-prompt { color: var(--eco-ink); font-family: var(--eco-font-data); }
.eco-rag-input { flex: 1; min-width: 0; font-family: var(--eco-font-data); font-size: 13px; color: var(--eco-text-1); background: none; border: none; outline: none; }
.eco-rag-input::placeholder { color: var(--eco-text-3); }
.eco-rag-ask { flex: 0 0 auto; font-size: 12px; padding: 6px 14px; }
.eco-rag-presets { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin-top: 12px; }
.eco-rag-presets-k { font-family: var(--eco-font-data); font-size: 10px; letter-spacing: 0.1em; color: var(--eco-text-3); }
.eco-rag-chip { font-size: 11.5px; padding: 6px 10px; font-weight: 500; }
.eco-rag-out { margin-top: 14px; }
.eco-rag-card { border: 1px solid var(--eco-line-1); border-radius: var(--eco-r-sm); background: var(--eco-bg-1); padding: 14px 16px; }
.eco-rag-retrieval { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; padding-bottom: 10px; border-bottom: 1px dashed var(--eco-line-1); margin-bottom: 12px; }
.eco-rag-ret-k { font-family: var(--eco-font-data); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--eco-text-3); }
.eco-rag-ret-v { font-family: var(--eco-font-data); font-size: 12px; color: var(--eco-teal); }
.eco-rag-conf { margin-left: auto; font-family: var(--eco-font-data); font-size: 11px; color: var(--eco-text-3); }
.eco-rag-conf b { color: var(--eco-ink); }
.eco-rag-answer { margin: 0 0 12px; font-size: 14.5px; line-height: 1.65; color: var(--eco-text-1); }
.eco-rag-cites { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.eco-rag-cites-k { font-family: var(--eco-font-data); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--eco-text-3); }
.eco-rag-nomatch { margin: 0; padding: 14px 16px; border: 1px dashed var(--eco-line-2); border-radius: var(--eco-r-sm); font-size: 13.5px; color: var(--eco-text-2); }
.eco-rag-disclaimer { margin: 12px 0 0; font-size: 12px; line-height: 1.55; color: var(--eco-text-3); font-style: italic; }
`);
