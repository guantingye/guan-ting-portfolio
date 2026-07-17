import{u as l,r as c,l as r,j as i,f as d,o as m,g as h,i as x}from"./index-5Szh5aR5.js";const b=h.find(s=>s.key==="M05"),v=[{key:"founders",en:"FOUNDERS BACKGROUND",zh:"創辦人背景"},{key:"moat",en:"THE MOAT",zh:"護城河"},{key:"businessModel",en:"BUSINESS MODEL",zh:"商業模式"},{key:"funding",en:"FUNDING STATUS",zh:"募資狀態"},{key:"risks",en:"KEY RISKS",zh:"關鍵風險"},{key:"verdict",en:"VERDICT",zh:"判斷"}],p={en:{title:"Anatomy of an analyst note",lead:'Same six sections, three unrelated sectors — an AI coding agent, a humanoid-robotics company, and a CRISPR therapeutics platform. Switch between them; the "verdict" section is where a directory would stop and this database keeps going.',switchLabel:"Switch company",verdictNote:"This is the section a plain fact sheet never has — a stated, disagreeable opinion.",soWhat:"The framework generalizes across a coding agent, a robot, and a gene-editing platform — that consistency is what makes 201 rows one product instead of 201 essays."},zh:{title:"一則分析師註記的解剖",lead:"同樣的六段結構，三個毫不相關的產業——一個 AI 編碼代理、一家人形機器人公司、一個 CRISPR 療法平台。切換看看；「判斷」這段正是目錄式資料庫會停下、而這個資料庫繼續往前的地方。",switchLabel:"切換公司",verdictNote:"這是一張純事實表永遠不會有的段落——一個寫明、可被反駁的意見。",soWhat:"這套框架在編碼代理、機器人與基因編輯平台之間都能通用——正是這種一致性，讓 201 列成為一個產品，而不是 201 篇各自獨立的文章。"}};function f(){const{lang:s}=l(),t=p[s]??p.en,[o,n]=c.useState(r[0].id),a=r.find(e=>e.id===o);return i.jsxs(d,{mod:b,title:t.title,lead:t.lead,soWhat:t.soWhat,children:[i.jsx("span",{className:"isp-caption isp-m5-switch-label",children:t.switchLabel}),i.jsx("div",{className:"isp-m5-switch",role:"tablist","aria-label":t.switchLabel,children:r.map(e=>i.jsxs("button",{role:"tab","aria-selected":o===e.id,className:`isp-m5-switch-btn${o===e.id?" is-on":""}`,onClick:()=>n(e.id),onKeyDown:m(()=>n(e.id)),children:[i.jsx("span",{className:"isp-m5-switch-name",children:e.name}),i.jsx("span",{className:"isp-m5-switch-sector",children:e.sector[s]??e.sector.en})]},e.id))}),i.jsxs("div",{className:"isp-m5-note","aria-live":"polite",children:[i.jsxs("div",{className:"isp-m5-note-head",children:[i.jsx("span",{className:"isp-mono isp-m5-date",children:a.date}),i.jsx("strong",{className:"isp-m5-name",children:a.name}),i.jsx("span",{className:"isp-m5-sector",children:a.sector[s]??a.sector.en})]}),i.jsx("div",{className:"isp-m5-grid",children:v.map(e=>i.jsxs("div",{className:`isp-m5-section${e.key==="verdict"?" isp-m5-section--verdict":""}`,children:[i.jsx("span",{className:"isp-m5-section-label",children:s==="zh"?e.zh:e.en}),i.jsx("p",{children:a[e.key]}),e.key==="verdict"&&i.jsx("span",{className:"isp-m5-verdict-note",children:t.verdictNote})]},e.key))})]})]})}x("isp-m5-style",`
.isp-m5-switch-label { display: block; margin-bottom: 10px; }
.isp-m5-switch { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 18px; }
.isp-m5-switch-btn { display: flex; flex-direction: column; gap: 3px; padding: 11px 13px; border: 1px solid var(--isp-line-2); border-radius: var(--isp-r-sm); background: var(--isp-bg-2); text-align: left; transition: border-color 160ms var(--isp-ease), background 160ms var(--isp-ease); }
.isp-m5-switch-btn:hover { border-color: var(--isp-teal); }
.isp-m5-switch-btn.is-on { border-color: var(--isp-teal); background: var(--isp-teal-dim); }
.isp-m5-switch-name { font-size: 13px; font-weight: 600; color: var(--isp-text-1); }
.isp-m5-switch-sector { font-size: 11px; color: var(--isp-text-3); }
@media (max-width: 720px) { .isp-m5-switch { grid-template-columns: 1fr; } }

.isp-m5-note { border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-md); overflow: hidden; }
.isp-m5-note-head { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; padding: 13px 16px; background: var(--isp-bg-2); border-bottom: 1px solid var(--isp-line-1); }
.isp-m5-date { font-size: 11px; color: var(--isp-text-3); }
.isp-m5-name { font-size: 14.5px; color: var(--isp-text-1); }
.isp-m5-sector { font-size: 12.5px; color: var(--isp-text-2); }
.isp-m5-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
.isp-m5-section { padding: 16px 18px; border-bottom: 1px solid var(--isp-line-1); border-right: 1px solid var(--isp-line-1); }
.isp-m5-section:nth-child(3n) { border-right: none; }
.isp-m5-section-label { display: block; font-family: var(--isp-font-data); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--isp-text-3); margin-bottom: 8px; }
.isp-m5-section p { margin: 0; font-size: 13px; line-height: 1.62; color: var(--isp-text-2); }
.isp-m5-section--verdict { background: var(--isp-iris-dim); grid-column: 1 / -1; border-right: none; border-bottom: none; }
.isp-m5-section--verdict .isp-m5-section-label { color: var(--isp-iris); }
.isp-m5-section--verdict p { color: var(--isp-text-1); font-family: var(--isp-font-display); font-size: 15px; font-style: italic; }
.isp-m5-verdict-note { display: block; margin-top: 8px; font-family: var(--isp-font-data); font-size: 11px; color: var(--isp-text-3); }
@media (max-width: 900px) { .isp-m5-grid { grid-template-columns: 1fr; } .isp-m5-section { border-right: none; } }
`);export{f as default};
