import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, onActivate } from './shared/ispKit.jsx';
import { MODULES } from './data/strategyPlatformContent.js';

const MOD = MODULES.find(m => m.key === 'M03');

const STEPS = [
    {
        id: 'discover',
        en: { name: 'Candidate discovery', detail: 'Candidate companies typically come from funding announcements, product launches, industry lists, or new leads that surface in existing research. The threshold for entering the candidate pool is intentionally loose; only after entity confirmation, research writing, and source verification do they enter the official database.' },
        zh: { name: '候選發掘', detail: '候選公司通常來自募資公告、產品發布、產業名單，或既有研究中出現的新線索。進入候選池的門檻刻意維持寬鬆；只有完成後續的實體確認、研究撰寫與來源查核，才會被正式收錄。' },
    },
    {
        id: 'dedupe',
        en: { name: 'Entity deduplication & placement', detail: 'I first confirm whether the company already exists in the database, resolving Chinese and English names, brand names, parent-subsidiary relationships, and similarly named entities before deciding which industry cluster it belongs to. This prevents the same company from being recorded twice and distinct companies with similar names from being merged incorrectly.' },
        zh: { name: '實體去重與定位', detail: '我先確認公司是否已存在於資料庫中，處理中英文名稱、品牌名稱、母子公司與名稱相近的實體，再判斷它應歸入哪一個產業叢集。這一步避免同一家公司被重複收錄，也避免不同公司因名稱相似而被錯誤合併。' },
    },
    {
        id: 'draft',
        en: { name: 'Analytical writing', detail: 'Only after entity confirmation does the company enter a fixed six-part analysis structure. The writing covers company positioning, founding team, moat, business model, funding signals, and primary risks. The fixed structure is not meant to make the content formulaic; it ensures every company answers the same research questions.' },
        zh: { name: '分析撰寫', detail: '公司完成實體確認後，才進入固定的六段分析架構。撰寫內容涵蓋公司定位、創辦團隊、護城河、商業模式、資金訊號與主要風險。固定結構不是為了讓內容變得制式，而是確保每一家公司都回答相同的研究問題。' },
    },
    {
        id: 'check',
        en: { name: 'Fact, funding & source checks', detail: 'After analysis, I return to company websites, funding announcements, investor information, and other public sources to verify key facts, amounts, dates, and company descriptions. Content that cannot be confirmed is removed, downgraded to information pending verification, or explicitly marked as analytical judgment rather than mixed with verified facts.' },
        zh: { name: '事實、募資與來源查核', detail: '分析完成後，我會回到公司網站、募資公告、投資人資料與其他公開來源，核對關鍵事實、金額、日期與公司描述。無法被確認的內容會被刪除、降級為待查資訊，或明確標示為分析判斷，而不會與已驗證事實混在一起。' },
    },
    {
        id: 'include',
        en: { name: 'Formal inclusion & version marking', detail: 'Only companies that have completed the preceding steps enter the official database. Each record retains its inclusion date, sources, and research judgment, so later updates can identify what changed. Inclusion means the record has met the current version’s quality threshold, not that it will never need correction.' },
        zh: { name: '正式收錄與版本標記', detail: '只有完成前述步驟的公司才會進入正式資料庫。每筆紀錄都保留收錄日期、來源與研究判斷，後續更新時也能辨識哪些內容已經改變。收錄代表這筆資料已達到目前版本的品質門檻，而不是代表它永遠不需要修正。' },
    },
];

const COPY = {
    en: {
        title: 'Company data curation loop',
        lead: 'Large company databases can rapidly expand coverage through automation, but research depth still comes from curating records one by one. This module lays out the five-step process I use for each company and distinguishes work I actually performed from repeatable methods reorganized from established research practice.',
        stepHint: 'Step through it',
        soWhat: 'Data quality depends not just on how much was captured, but on whether every record has completed the same processes of verification, analysis, and inclusion.',
    },
    zh: {
        title: '公司資料的策展迴圈',
        lead: '大型公司資料庫可以透過自動化快速擴大收錄範圍，但研究深度仍來自逐筆策展。這個模組整理我處理每家公司的五步流程，並清楚區分哪些是實際執行過的工作，哪些是根據既有研究習慣重新整理出的可重複方法。',
        stepHint: '逐步查看',
        soWhat: '資料品質不只取決於抓到多少，而取決於每一筆紀錄是否走完同一套查核、分析與收錄流程。',
    },
};

export default function M03_CurationLoop() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [active, setActive] = useState(0);
    const step = STEPS[active];

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <span className="isp-caption isp-m3-hint">{t.stepHint}</span>
            <div className="isp-m3-loop" role="tablist" aria-label={t.stepHint}>
                {STEPS.map((s, i) => (
                    <React.Fragment key={s.id}>
                        <button
                            role="tab"
                            aria-selected={active === i}
                            className={`isp-m3-node${active === i ? ' is-on' : ''}`}
                            onClick={() => setActive(i)}
                            onKeyDown={onActivate(() => setActive(i))}>
                            <span className="isp-m3-node-num">{String(i + 1).padStart(2, '0')}</span>
                            <span className="isp-m3-node-name">{s[lang]?.name ?? s.en.name}</span>
                        </button>
                        {i < STEPS.length - 1 && <span className="isp-m3-arrow" aria-hidden="true">→</span>}
                    </React.Fragment>
                ))}
            </div>
            <div className="isp-m3-detail" aria-live="polite">
                <span className="isp-tag isp-tag--teal">{step[lang]?.name ?? step.en.name}</span>
                <p>{step[lang]?.detail ?? step.en.detail}</p>
            </div>
        </ModuleFrame>
    );
}

injectStyles('isp-m3-style', `
.isp-m3-hint { display: block; margin-bottom: 12px; }
.isp-m3-loop { display: flex; align-items: center; flex-wrap: wrap; gap: 4px; margin-bottom: 18px; }
.isp-m3-node { display: flex; flex-direction: column; align-items: flex-start; gap: 3px; padding: 10px 14px; border: 1px solid var(--isp-line-2); border-radius: var(--isp-r-sm); background: var(--isp-bg-2); transition: border-color 160ms var(--isp-ease), background 160ms var(--isp-ease); }
.isp-m3-node:hover { border-color: var(--isp-teal); }
.isp-m3-node.is-on { border-color: var(--isp-teal); background: var(--isp-teal-dim); }
.isp-m3-node-num { font-family: var(--isp-font-data); font-size: 10px; color: var(--isp-text-3); }
.isp-m3-node.is-on .isp-m3-node-num { color: var(--isp-teal); }
.isp-m3-node-name { font-size: 12.5px; color: var(--isp-text-1); font-weight: 500; }
.isp-m3-arrow { color: var(--isp-line-2); font-size: 14px; padding: 0 2px; }
.isp-m3-detail { padding: 16px 18px; background: var(--isp-bg-2); border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-md); }
.isp-m3-detail p { margin: 10px 0 0; font-size: 14.5px; line-height: 1.65; color: var(--isp-text-1); }
@media (max-width: 640px) { .isp-m3-loop { flex-direction: column; align-items: stretch; } .isp-m3-arrow { display: none; } }
`);
