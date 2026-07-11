import{u as d,j as e,v as m,w as c,i as p}from"./index-BloPbmfu.js";const s=c.find(o=>o.key==="M03"),l={en:{title:"Hypotheses & pre-defined success criteria",lead:"Thresholds written down before any data existed — the point of the module.",soWhat:"Success was specified before data existed.",stamp:"PRE-REGISTERED · DEFINED BEFORE DATA",cols:["Hypothesis","Metric","Threshold","Measurement plan"],rows:[["H1 — the recommendation is accepted","Person selects / books the top-ranked psychologist","> 20% (chance among the five shown)","Log selected rank vs displayed rank; compare against a uniform baseline"],["H2 — completion survives the length","Share of intake starts that reach a result","≥ 70%","Funnel: start → each step → submit; record drop-off per step"],["H3 — the fatigue budget holds","Median time from step 1 to submit","≤ 8 minutes","Timestamp start and submit; report median and inter-quartile range"]],note:"These are targets, not findings. Module M13 reports the pilot against exactly these three rows."},zh:{title:"假設與事先定義的成功標準",lead:"在任何資料出現之前就寫下門檻——這正是本模組的重點。",soWhat:"成功標準在資料存在之前就已明定。",stamp:"事前登錄 · 資料出現前即定義",cols:["假設","指標","門檻","量測計畫"],rows:[["H1 — 推薦被接受","使用者選擇／預約排名第一的心理師","> 20%（五個顯示選項中的隨機機率）","記錄被選排名對顯示排名；對照均勻基準比較"],["H2 — 長度不擊垮完成率","開始量表後抵達結果的比例","≥ 70%","漏斗：開始 → 各步驟 → 送出；記錄各步驟流失"],["H3 — 疲勞預算守得住","從第一步到送出的中位時間","≤ 8 分鐘","記錄開始與送出時間戳；回報中位數與四分位距"]],note:"這些是目標，不是發現。模組 M13 會針對這三列回報試辦結果。"}};function b(){const{lang:o}=d(),t=l[o]??l.en;return e.jsxs(m,{mod:s,sectionNo:s.no,title:t.title,lead:t.lead,soWhat:t.soWhat,children:[e.jsx("div",{className:"pm-h3-stamp",children:e.jsx("span",{className:"pm-tag pm-tag--amber",children:t.stamp})}),e.jsx("div",{className:"pm-table-wrap",children:e.jsxs("table",{className:"pm-table pm-table--reg",children:[e.jsx("thead",{children:e.jsx("tr",{children:t.cols.map(a=>e.jsx("th",{children:a},a))})}),e.jsx("tbody",{children:t.rows.map((a,i)=>e.jsx("tr",{children:a.map((n,r)=>e.jsx("td",{"data-label":t.cols[r],className:r===0?"pm-table-lead":void 0,children:n},r))},i))})]})}),e.jsx("p",{className:"pm-h3-note",children:t.note})]})}p("pm-table",`
.pm-table-wrap { overflow-x: auto; border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-md); }
.pm-table { width: 100%; border-collapse: collapse; font-size: 13.5px; min-width: 560px; }
.pm-table thead th { text-align: left; font-family: var(--pm-font-data); font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--pm-text-3); padding: 12px 16px; background: var(--pm-bg-3); border-bottom: 1px solid var(--pm-line-2); white-space: nowrap; }
.pm-table tbody td { padding: 13px 16px; border-bottom: 1px solid var(--pm-line-1); color: var(--pm-text-2); line-height: 1.5; vertical-align: top; }
.pm-table tbody tr:last-child td { border-bottom: none; }
.pm-table-lead { color: var(--pm-text-1); font-weight: 500; }
.pm-table--reg tbody td:nth-child(3) { font-family: var(--pm-font-data); font-size: 12.5px; color: var(--pm-teal); }
@media (max-width: 767px) {
  .pm-table-wrap { border: none; overflow: visible; }
  .pm-table { min-width: 0; }
  .pm-table thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  .pm-table, .pm-table tbody, .pm-table tr, .pm-table td { display: block; width: 100%; }
  .pm-table tr { border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-sm); margin-bottom: 10px; background: var(--pm-bg-2); }
  .pm-table td { border-bottom: 1px solid var(--pm-line-1); padding: 10px 14px; }
  .pm-table td::before { content: attr(data-label); display: block; font-family: var(--pm-font-data); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--pm-text-3); margin-bottom: 4px; }
  .pm-table--reg tbody td:nth-child(3) { color: var(--pm-teal); }
}
`);p("pm-m3",`
.pm-h3-stamp { margin-bottom: 14px; }
.pm-h3-note { margin: 14px 0 0; font-size: 13px; color: var(--pm-text-3); font-style: italic; }
`);export{b as default};
