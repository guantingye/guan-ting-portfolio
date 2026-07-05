import React from 'react';
import SectionModule, { useI18n, injectStyles } from './shared/psyKit.jsx';
import { MODULES } from './data/psyContent.js';

const MOD = MODULES.find(m => m.key === 'M12');

const COPY = {
    en: {
        title: 'Edge-case & failure design',
        lead: 'The unhappy paths were designed, not discovered.',
        soWhat: 'The unhappy paths were designed, not discovered.',
        detect: 'Detect', behave: 'Behaviour', copyL: 'User-facing copy',
        verbatim: 'verbatim',
        cases: [
            { case: 'Skipped topic items', detect: 'Every topic starts at a value, so nothing is null', behave: 'Unrated topics stay low and simply do not clear the ≥4 threshold — they never block submit', copy: null },
            { case: 'Budget below floor', detect: 'budget < NT$1,000 at the preferences step', behave: 'Block advance with a spoken error before scoring', copy: '預算至少需要 NT$1,000', real: true },
            { case: 'All-neutral / flat profile', detect: 'no topic reaches ≥4', behave: 'Topic-fit contributes 0 for everyone; ranking falls back to preferences and reads as a weak signal', copy: null },
            { case: 'No match under filters', detect: 'result set is empty', behave: 'Show an empty state that offers to clear filters rather than a dead end', copy: '找不到符合條件的心理師 · 試試調整篩選條件，或清除所有篩選來查看全部心理師', real: true },
            { case: 'Duplicate submit', detect: 'a request is already in flight', behave: 'Disable submit and show the compute state so only one request is sent', copy: '分析您的需求中…', real: true },
        ],
    },
    zh: {
        title: '邊界情境與失效設計',
        lead: '不順的路徑是被設計出來的，而非事後才發現。',
        soWhat: '不順的路徑是被設計出來的，而非事後才發現。',
        detect: '偵測', behave: '行為', copyL: '對使用者的文案',
        verbatim: '逐字',
        cases: [
            { case: '跳過議題題目', detect: '每個議題都有預設值，因此不會是 null', behave: '未評分的議題維持低分，單純無法跨過 ≥4 門檻——絕不阻擋送出', copy: null },
            { case: '預算低於下限', detect: '偏好步驟中 budget < NT$1,000', behave: '在評分前以明確錯誤阻擋前進', copy: '預算至少需要 NT$1,000', real: true },
            { case: '全中性／平坦輪廓', detect: '沒有任何議題達到 ≥4', behave: '議題吻合對所有人皆為 0；排序退回偏好，並讀作弱訊號', copy: null },
            { case: '篩選後無媒合', detect: '結果集為空', behave: '呈現可清除篩選的空狀態，而非死路', copy: '找不到符合條件的心理師 · 試試調整篩選條件，或清除所有篩選來查看全部心理師', real: true },
            { case: '重複送出', detect: '已有請求在途中', behave: '停用送出並顯示運算狀態，只送出一個請求', copy: '分析您的需求中…', real: true },
        ],
    },
};

export default function M12_EdgeCases() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <ul className="pm-cases">
                {c.cases.map((x, i) => (
                    <li className="pm-case" key={i}>
                        <div className="pm-case-name">
                            <span className="pm-case-n">{String(i + 1).padStart(2, '0')}</span>
                            <strong>{x.case}</strong>
                        </div>
                        <div className="pm-case-cols">
                            <div><span className="pm-case-k">{c.detect}</span><p>{x.detect}</p></div>
                            <div><span className="pm-case-k">{c.behave}</span><p>{x.behave}</p></div>
                            <div>
                                <span className="pm-case-k">{c.copyL}{x.real && <span className="pm-tag pm-tag--teal pm-case-verbatim">{c.verbatim}</span>}</span>
                                {x.copy ? <p className="pm-case-copy">{x.copy}</p> : <p className="pm-case-none">—</p>}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </SectionModule>
    );
}

injectStyles('pm-m12', `
.pm-cases { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.pm-case { border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-md); background: var(--pm-bg-2); overflow: hidden; }
.pm-case-name { display: flex; align-items: center; gap: 10px; padding: 11px 15px; background: var(--pm-bg-3); border-bottom: 1px solid var(--pm-line-1); }
.pm-case-n { font-family: var(--pm-font-data); font-size: 12px; color: var(--pm-teal); }
.pm-case-name strong { color: var(--pm-text-1); font-size: 14px; }
.pm-case-cols { display: grid; grid-template-columns: 1fr 1.2fr 1.1fr; gap: 0; }
.pm-case-cols > div { padding: 12px 15px; border-right: 1px solid var(--pm-line-1); }
.pm-case-cols > div:last-child { border-right: none; }
.pm-case-k { display: flex; align-items: center; gap: 7px; font-family: var(--pm-font-data); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--pm-text-3); margin-bottom: 6px; }
.pm-case-verbatim { font-size: 8px; padding: 0 4px; }
.pm-case-cols p { margin: 0; font-size: 12.5px; line-height: 1.5; color: var(--pm-text-2); }
.pm-case-copy { font-family: var(--pm-font-data); font-size: 12px !important; color: var(--pm-teal) !important; background: var(--pm-bg-0); border: 1px solid var(--pm-line-1); border-radius: 4px; padding: 7px 9px; }
.pm-case-none { color: var(--pm-text-3) !important; }
@media (max-width: 720px) {
  .pm-case-cols { grid-template-columns: 1fr; }
  .pm-case-cols > div { border-right: none; border-bottom: 1px solid var(--pm-line-1); }
  .pm-case-cols > div:last-child { border-bottom: none; }
}
`);
