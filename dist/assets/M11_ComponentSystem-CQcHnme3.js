import{u as o,j as s,f as p,g as d,i as l}from"./index-BCTaCMZ4.js";const m=d.find(e=>e.key==="M11"),n={en:{title:"Component & state system",lead:"Five components carry almost the entire interface. None of them are exotic — the craft is in how few states each one needs to feel complete.",specimens:[{id:"marker",name:"Hub marker",states:["idle","selected"],note:"A ring plus a filled dot — selection reads even at globe scale, without a label."},{id:"row",name:"Expandable table row",states:["collapsed","expanded"],note:"Expansion happens in place; the table underneath never disappears."},{id:"chip",name:"Sector filter chip",states:["inactive","active"],note:'One accent border is the entire "on" state — no fill, no shadow, no motion required.'},{id:"lang",name:"Language toggle",states:["EN","中文"],note:"A pill, not a dropdown — two languages never need more than two taps."},{id:"nav",name:"Floating nav",states:["idle","hover"],note:"Three icons stay pinned across all three routes — home, insights, database, always in reach."}],soWhat:"A design system this small only works if every state pulls real weight — there is nowhere to hide an unnecessary one."},zh:{title:"元件與狀態系統",lead:"五個元件撐起幾乎整個介面。沒有一個是特別的——工藝在於每個元件需要多少種狀態才能感覺完整。",specimens:[{id:"marker",name:"Hub marker",states:["未選取","已選取"],note:"一個外環加一個實心點——即使在地球儀尺度，選取狀態也一眼可辨，不需要文字標籤。"},{id:"row",name:"可展開表格列",states:["收合","展開"],note:"展開發生在原地；底下的表格永遠不會消失。"},{id:"chip",name:"產業篩選 chip",states:["未啟用","已啟用"],note:"一條強調色邊框就是完整的「開啟」狀態——不需要填色、陰影或動畫。"},{id:"lang",name:"語言切換",states:["EN","中文"],note:"一個藥丸型切換，不是下拉選單——兩種語言永遠不需要超過兩次點擊。"},{id:"nav",name:"浮動導覽",states:["未觸碰","hover"],note:"三個圖示固定在所有三條路徑上——首頁、insights、資料庫，永遠觸手可及。"}],soWhat:"這麼小的設計系統之所以行得通，是因為每個狀態都真的有用——沒有地方能藏一個不必要的狀態。"}};function c({on:e}){return s.jsxs("span",{className:`isp-m11-marker${e?" is-on":""}`,"aria-hidden":"true",children:[e&&s.jsx("span",{className:"isp-m11-marker-ring"}),s.jsx("span",{className:"isp-m11-marker-dot"})]})}function x({on:e}){return s.jsxs("span",{className:`isp-m11-row${e?" is-on":""}`,"aria-hidden":"true",children:[s.jsx("span",{className:"isp-m11-row-bar"}),s.jsx("span",{className:"isp-m11-row-chev",children:e?"▾":"▸"})]})}function h({on:e}){return s.jsx("span",{className:`isp-m11-chip${e?" is-on":""}`,"aria-hidden":"true",children:"sector"})}function g({label:e,on:a}){return s.jsx("span",{className:`isp-m11-lang${a?" is-on":""}`,"aria-hidden":"true",children:e})}function v({hover:e}){return s.jsxs("span",{className:`isp-m11-nav${e?" is-hover":""}`,"aria-hidden":"true",children:[s.jsx("span",{}),s.jsx("span",{}),s.jsx("span",{})]})}const u={marker:e=>s.jsx(c,{on:e===1}),row:e=>s.jsx(x,{on:e===1}),chip:e=>s.jsx(h,{on:e===1}),lang:(e,a)=>s.jsx(g,{label:a[e],on:e===0}),nav:e=>s.jsx(v,{hover:e===1})};function f(){const{lang:e}=o(),a=n[e]??n.en;return s.jsx(p,{mod:m,title:a.title,lead:a.lead,soWhat:a.soWhat,children:s.jsx("div",{className:"isp-m11-grid",children:a.specimens.map(i=>s.jsxs("div",{className:"isp-m11-card",children:[s.jsx("strong",{children:i.name}),s.jsx("div",{className:"isp-m11-states",children:i.states.map((r,t)=>s.jsxs("div",{className:"isp-m11-state",children:[s.jsx("span",{className:"isp-m11-preview",children:u[i.id](t,i.states)}),s.jsx("span",{className:"isp-m11-state-label",children:r})]},r))}),s.jsx("p",{children:i.note})]},i.id))})})}l("isp-m11-style",`
.isp-m11-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
.isp-m11-card { padding: 16px; background: var(--isp-bg-2); border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-md); }
.isp-m11-card strong { display: block; font-size: 13px; color: var(--isp-text-1); margin-bottom: 12px; }
.isp-m11-states { display: flex; gap: 18px; margin-bottom: 12px; }
.isp-m11-state { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.isp-m11-preview { display: flex; align-items: center; justify-content: center; width: 56px; height: 40px; background: var(--isp-bg-0); border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-sm); }
.isp-m11-state-label { font-family: var(--isp-font-data); font-size: 10px; color: var(--isp-text-3); }
.isp-m11-card p { margin: 0; font-size: 12px; line-height: 1.55; color: var(--isp-text-3); }

.isp-m11-marker { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; }
.isp-m11-marker-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--isp-text-2); }
.isp-m11-marker.is-on .isp-m11-marker-dot { background: var(--isp-teal); }
.isp-m11-marker-ring { position: absolute; inset: 0; border: 1.5px solid var(--isp-teal); border-radius: 50%; opacity: 0.5; }

.isp-m11-row { display: flex; align-items: center; gap: 6px; width: 40px; }
.isp-m11-row-bar { flex: 1; height: 5px; background: var(--isp-line-2); border-radius: 2px; }
.isp-m11-row.is-on .isp-m11-row-bar { background: var(--isp-teal); }
.isp-m11-row-chev { font-size: 9px; color: var(--isp-text-3); }

.isp-m11-chip { font-family: var(--isp-font-data); font-size: 9.5px; padding: 3px 8px; border-radius: 999px; border: 1px solid var(--isp-line-2); color: var(--isp-text-3); }
.isp-m11-chip.is-on { border-color: var(--isp-teal); color: var(--isp-teal); }

.isp-m11-lang { font-family: var(--isp-font-data); font-size: 10px; padding: 3px 9px; border-radius: 999px; color: var(--isp-text-3); }
.isp-m11-lang.is-on { color: var(--isp-bg-0); background: var(--isp-teal); }

.isp-m11-nav { display: flex; gap: 5px; padding: 5px 8px; border-radius: 999px; background: var(--isp-bg-2); border: 1px solid var(--isp-line-2); }
.isp-m11-nav span { width: 6px; height: 6px; border-radius: 2px; background: var(--isp-text-3); }
.isp-m11-nav.is-hover { border-color: var(--isp-teal); }
.isp-m11-nav.is-hover span:nth-child(2) { background: var(--isp-teal); }
`);export{f as default};
