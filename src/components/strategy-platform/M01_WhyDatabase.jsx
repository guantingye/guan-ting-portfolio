import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/ispKit.jsx';
import { MODULES } from './data/strategyPlatformContent.js';

const MOD = MODULES.find(m => m.key === 'M01');

const COPY = {
    en: {
        title: 'Why build another company database',
        lead: 'Crunchbase will tell you a company exists. It will not tell you whether its moat is real, whether the round was priced for perfection, or whether you should track it or ignore it. That gap is the whole product bet.',
        body: [
            'I have sat on the other side of a Crunchbase profile enough times to know the shape of the problem: a funding table, a one-line description, a handful of similar-company suggestions — and then the actual work starts. Someone still has to read the S-1 excerpts, triangulate the moat, and decide whether this is worth a follow-up meeting.',
            'The bet here is narrower and deeper than "index more companies." Every row in this database carries an analyst\'s answer, not just a fact sheet: what the moat actually is, how durable it looks, what the business model implies about margins, and a verdict a reader can disagree with. 201 companies is small next to Crunchbase\'s millions — on purpose. Depth was the constraint I optimized for, not coverage.',
            'This module is the argument; the rest of the evidence layer is the receipts — the schema (M02), the process that keeps the writing honest at scale (M03), and the AI layer designed to keep this depth from becoming a bottleneck (M06–M08).',
        ],
        compareTitle: 'Coverage vs. judgment — the trade I made on purpose',
        compareCols: ['', 'Crunchbase-style directory', 'This observatory'],
        compareRows: [
            { label: 'Company count', a: 'Millions, self-reported + scraped', b: '201, hand-curated' },
            { label: 'Per-row depth', a: 'Funding facts, firmographics', b: 'Six analyst sections incl. moat & verdict' },
            { label: 'Point of view', a: 'None — data, not judgment', b: 'Explicit: track / watch / pass' },
            { label: 'Update model', a: 'Continuous, crowd + scraper', b: 'Curated batches, dated per row' },
            { label: 'Best for', a: 'Cast a wide net, check a fact', b: 'Decide whether a company matters' },
        ],
        soWhat: 'A directory tells you a company exists. An analyst tells you whether it matters — that difference is the entire product.',
    },
    zh: {
        title: '為什麼要再建一個公司資料庫',
        lead: 'Crunchbase 會告訴你一家公司存在。它不會告訴你護城河是不是真的、那輪估值是不是已經定價到完美、或者你該追蹤還是該放掉。這個缺口，就是整個產品賭注。',
        body: [
            '我坐在 Crunchbase 檔案的另一端夠多次，知道這個問題長什麼樣：一張募資表、一行描述、幾家類似公司建議——然後真正的工作才開始。總得有人去讀 S-1 摘錄、三角驗證護城河，再決定這值不值得一次後續會議。',
            '這裡的賭注比「收錄更多公司」更窄也更深。資料庫裡每一列都帶著分析師的答案，不只是事實表：護城河到底是什麼、看起來多耐久、商業模式對毛利意味著什麼，以及一個讀者可以反駁的判斷。201 家公司比起 Crunchbase 的數百萬家很小——這是刻意的。我優化的限制條件是深度，不是覆蓋率。',
            '這個模組是論證；證據層剩下的部分才是收據——schema（M02）、讓寫作在規模化時仍保持誠實的流程（M03），以及設計來避免這種深度變成瓶頸的 AI 層（M06–M08）。',
        ],
        compareTitle: '覆蓋率 vs. 判斷力——我刻意做的取捨',
        compareCols: ['', 'Crunchbase 式目錄', '這個 observatory'],
        compareRows: [
            { label: '公司數量', a: '數百萬，自報 + 爬取', b: '201 家，人工策展' },
            { label: '單列深度', a: '募資事實、公司基本資料', b: '六段分析師欄位，含護城河與判斷' },
            { label: '觀點', a: '無——是資料，不是判斷', b: '明確：追蹤／觀察／放過' },
            { label: '更新模式', a: '持續、群眾 + 爬蟲', b: '策展批次，每列附日期' },
            { label: '最適合', a: '廣撒網、查一個事實', b: '判斷一家公司重不重要' },
        ],
        soWhat: '目錄告訴你一家公司存在。分析師告訴你它重不重要——這個差異，就是整個產品。',
    },
};

export default function M01_WhyDatabase() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            {t.body.map((p, i) => <p className="isp-m1-p" key={i}>{p}</p>)}
            <div className="isp-m1-compare">
                <span className="isp-caption isp-m1-compare-title">{t.compareTitle}</span>
                <div className="isp-m1-scroll">
                    <table className="isp-m1-table">
                        <thead>
                            <tr>{t.compareCols.map((c, i) => <th key={i} scope="col">{c}</th>)}</tr>
                        </thead>
                        <tbody>
                            {t.compareRows.map(r => (
                                <tr key={r.label}>
                                    <th scope="row">{r.label}</th>
                                    <td className="isp-m1-a">{r.a}</td>
                                    <td className="isp-m1-b">{r.b}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('isp-m1-style', `
.isp-m1-p { margin: 0 0 14px; font-size: 15px; line-height: 1.75; color: var(--isp-text-2); max-width: 780px; }
.isp-m1-p:last-of-type { margin-bottom: 0; }
.isp-m1-compare { margin-top: 24px; }
.isp-m1-compare-title { display: block; margin-bottom: 10px; }
.isp-m1-scroll { overflow-x: auto; }
.isp-m1-table { width: 100%; border-collapse: collapse; font-size: 13.5px; min-width: 520px; }
.isp-m1-table th, .isp-m1-table td { text-align: left; padding: 11px 14px; border-bottom: 1px solid var(--isp-line-1); vertical-align: top; }
.isp-m1-table thead th { font-family: var(--isp-font-data); font-size: 10px; letter-spacing: 0.09em; text-transform: uppercase; color: var(--isp-text-3); border-bottom: 1px solid var(--isp-line-2); }
.isp-m1-table tbody th { font-weight: 500; color: var(--isp-text-1); white-space: nowrap; }
.isp-m1-a { color: var(--isp-text-3); }
.isp-m1-b { color: var(--isp-text-1); }
.isp-m1-b::before { content: '→ '; color: var(--isp-teal); }
`);
