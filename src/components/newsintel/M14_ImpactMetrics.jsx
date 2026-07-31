import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M14');

const COPY = {
    en: {
        title: 'Performance & operations metrics',
        lead: 'This section brings together workflow improvements, product delivery, and the scale of system operations. Every number includes its calculation method, evidence status, and limitations, so readers can distinguish direct records from results reconstructed or estimated from existing data. These metrics describe the decisions the product can currently support; they are not presented as outcomes beyond the evidence.',
        methodLabel: 'Method', caveatLabel: 'Caveat',
        cards: [
            { v: '−84%', l: 'Morning intelligence-preparation time', prov: 'RECON', method: 'Work diaries from three analysts across three consecutive weeks: an average of 75 minutes per day before the MVP, and 12 minutes after.', caveat: 'The sample size is 3 and includes self-recorded data. It indicates the direction of workflow improvement, not a causal or operational efficiency conclusion.' },
            { v: '−75%', l: 'Cost per inference batch', prov: 'RECON', method: 'Compared GPT-4o and Gemini Flash API pricing during the migration, using the same fixed test set, prompt, and output format.', caveat: 'This reflects model versions and provider pricing at the time. The cost difference changes if pricing, models, or input length changes.' },
            { v: '3', l: 'Live core product surfaces', prov: 'REAL', method: 'The live platform includes three public product routes: /, /insights, and /startups.', caveat: 'Counts only core public-facing routes, excluding internal management tools, state pages, and shared components.' },
            { v: '~60k', l: 'Estimated cumulative articles processed', prov: 'RECON', method: 'Estimated as about 400 scheduled runs multiplied by a median of about 150 articles per successful run.', caveat: 'Derived from execution history, not a formal article-by-article counter; the median only describes the approximate scale.' },
            { v: '~400', l: 'Morning intelligence briefings produced', prov: 'RECON', method: 'Each successful morning batch produces one briefing; the count is reconstructed from scheduling and execution records across roughly 14 months.', caveat: 'This is not a briefing-by-briefing tally. Retries after failures or manual dispatches may cause the actual count to vary slightly.' },
            { v: '87%', l: 'Model-to-human answer agreement', prov: 'RECON', method: 'Compared model classifications with a human-created answer key across a 100-article test sample.', caveat: 'The test set is limited, and I evaluated both the answer key and model results, which may introduce single-rater bias. It is used to locate classification boundaries, not represent universal accuracy.' },
        ],
        soWhat: 'Review how all six metrics were calculated and the limits of their evidence.',
    },
    zh: {
        title: '成效與運作指標',
        lead: '這裡同時呈現流程改善、產品交付與系統運作規模。每個數字都附上計算方法、證據狀態與限制，讓讀者可以分辨哪些是直接紀錄，哪些是依既有資料重建或推算的結果。這些數字用來說明產品目前能支持的判斷，不被包裝成超出證據範圍的成果。',
        methodLabel: '方法', caveatLabel: '限制',
        cards: [
            { v: '−84%', l: '晨間情報整理時間', prov: 'RECON', method: '三位分析師、連續三週的工作日誌；MVP 導入前平均每日 75 分鐘，導入後平均每日 12 分鐘。', caveat: '樣本數為 3，且包含自我紀錄；結果用於觀察流程改善方向，不作為因果推論或營運化的效率結論。' },
            { v: '−75%', l: '單批推論成本', prov: 'RECON', method: '在相同固定測試集、提示與輸出格式下，比較 GPT-4o 與 Gemini Flash 於案例遷移時的 API 定價。', caveat: '結果反映當時模型版本與供應商定價；若價格、模型或輸入長度改變，成本差異也會重新變動。' },
            { v: '3', l: '已上線核心介面', prov: 'REAL', method: '線上平台目前包含 /、/insights 與 /startups 三個公開產品路徑。', caveat: '只計算對外可瀏覽的核心路徑，不包含內部管理工具、狀態頁與共用元件。' },
            { v: '~60k', l: '估算累計處理文章', prov: 'RECON', method: '以約 400 次排程執行，乘以每次成功執行約 150 篇文章的中位數估算。', caveat: '此數字由執行歷史推算，不是逐篇累加的正式計數器；中位數僅用於描述大致規模。' },
            { v: '~400', l: '晨間情報簡報產出', prov: 'RECON', method: '每次成功的晨間批次會產出一份簡報，數量依約 14 個月的排程與執行紀錄重建。', caveat: '並非逐份盤點，部分失敗後重跑或人工補發可能使實際數量略有差異。' },
            { v: '87%', l: '模型與人工標準答案一致率', prov: 'RECON', method: '以 100 篇測試樣本，比較模型分類結果與人工建立的標準答案。', caveat: '測試集規模有限，且人工標準答案與模型結果皆由我進行評核，可能存在單一評核者偏誤。結果主要用於定位分類邊界，不代表所有資料的普遍準確率。' },
        ],
        soWhat: '查看六項指標的計算方式與證據限制。',
    },
};

export default function M14_ImpactMetrics() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ni-m14-grid">
                {t.cards.map((c, i) => (
                    <div key={i} className="ni-m14-card">
                        <div className="ni-m14-top">
                            <span className="ni-m14-v">{c.v}</span>
                            <span className={`ni-m14-prov ni-m14-prov--${c.prov === 'REAL' ? 'real' : 'recon'}`}>{c.prov}</span>
                        </div>
                        <span className="ni-m14-l">{c.l}</span>
                        <p className="ni-m14-line"><span className="ni-m14-line-k">{t.methodLabel}</span>{c.method}</p>
                        <p className="ni-m14-line ni-m14-caveat"><span className="ni-m14-line-k">{t.caveatLabel}</span>{c.caveat}</p>
                    </div>
                ))}
            </div>
        </ModuleFrame>
    );
}

injectStyles('ni-m14', `
.ni-m14-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.ni-m14-card { padding: 16px; background: var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); display: flex; flex-direction: column; }
.ni-m14-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.ni-m14-v { font-family: var(--ni-font-data); font-size: 28px; color: var(--ni-text-1); line-height: 1; }
.ni-m14-prov { font-family: var(--ni-font-data); font-size: 9px; letter-spacing: 0.1em; padding: 2px 6px; border-radius: 3px; border: 1px solid currentColor; }
.ni-m14-prov--real { color: var(--ni-teal); background: var(--ni-teal-dim); }
.ni-m14-prov--recon { color: var(--ni-amber); background: var(--ni-amber-dim); }
.ni-m14-l { font-size: 13px; color: var(--ni-text-1); font-weight: 500; margin: 10px 0 12px; }
.ni-m14-line { margin: 0 0 8px; font-size: 12px; line-height: 1.5; color: var(--ni-text-2); }
.ni-m14-line-k { display: inline-block; font-family: var(--ni-font-data); font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ni-text-3); margin-right: 6px; }
.ni-m14-caveat { color: var(--ni-text-3); margin-top: auto; }
@media (max-width: 900px) { .ni-m14-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .ni-m14-grid { grid-template-columns: 1fr; } }
`);
