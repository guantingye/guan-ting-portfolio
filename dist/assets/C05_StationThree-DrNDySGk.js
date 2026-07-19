import{u as l,j as e,Q as p,O as m,r as j,N as h,i as x}from"./index-C8jkLbP4.js";import{S as g}from"./StationChapter-DkHWm9Ak.js";const u=m.find(a=>a.key==="C05"),v=p[2],t={en:{spotTitle:"One form never fits a person in crisis",before:"BEFORE · one form for everyone",after:"AFTER · routed by case type",redesign:"redesigned",beforeNotes:["11 fields, identical for every visitor","Ordered by admin logic, not user logic","People in distress gave up halfway"],afterNotes:["Choose the situation first","Grouped fields, visible progress","The crisis path asks the least"],caption:"Reconstructed from the intake-form redesign at the center: the “before” asked everyone everything; the redesign starts from the case type and shows only what that path needs — and the crisis path is the shortest of all. Tap the case types to see each path."},zh:{spotTitle:"「一張表單通用」從不適用於危機中的人",before:"改版前 · 人人同一張",after:"改版後 · 依個案分流",redesign:"重新設計",beforeNotes:["11 個欄位，對每個人都一樣","順序照行政邏輯，不是使用者邏輯","狀態不好的人，填到一半就放棄"],afterNotes:["先選情境，欄位才出現","欄位分組，看得見進度","危機路徑，問得最少"],caption:"重繪心衛中心的諮詢諮商表單改版：改版前，每個人都要答完所有欄位；改版後，先選情境、只問這條路需要的——而危機那條路，是最短的一條。點上方的個案類型，看看每條路徑長什麼樣。"}},b=[{key:"child",label:{en:"Minor",zh:"兒少"}},{key:"adult",label:{en:"Adult",zh:"成人"}},{key:"family",label:{en:"Family",zh:"家庭"}},{key:"crisis",label:{en:"Crisis",zh:"危機"}}],y={child:[{title:{en:"Basics",zh:"基本資料"},fields:2},{title:{en:"School & care",zh:"就學與照顧"},fields:2},{title:{en:"Main concern",zh:"主要困擾"},fields:1}],adult:[{title:{en:"Basics",zh:"基本資料"},fields:2},{title:{en:"Current stressors",zh:"目前壓力來源"},fields:2},{title:{en:"Help you hope for",zh:"期望的協助"},fields:1}],family:[{title:{en:"Household",zh:"家庭成員"},fields:2},{title:{en:"Relationship issues",zh:"關係議題"},fields:2},{title:{en:"Help you hope for",zh:"期望的協助"},fields:1}],crisis:[{title:{en:"Immediate safety",zh:"立即安全"},fields:1,urgent:!0},{title:{en:"How to reach you",zh:"怎麼聯絡你"},fields:1}]};function n({urgent:a=!1}){return e.jsxs("div",{className:`fj-mf${a?" is-urgent":""}`,"aria-hidden":"true",children:[e.jsx("i",{className:"fj-mf-label"}),e.jsx("i",{className:"fj-mf-input"})]})}function k(){const{lang:a}=l(),o=t[a]??t.en,[i,d]=j.useState("crisis"),f=y[i];return e.jsxs("div",{className:"fj-forms",children:[e.jsxs("div",{className:"fj-form fj-form--before",children:[e.jsx("span",{className:"fj-form-head",children:o.before}),e.jsx("div",{className:"fj-form-sheet",children:Array.from({length:11},(r,s)=>e.jsx(n,{},s))}),e.jsx("ul",{className:"fj-form-notes",children:o.beforeNotes.map((r,s)=>e.jsx("li",{"data-mark":"×",children:r},s))})]}),e.jsxs("div",{className:"fj-form-arrow","aria-hidden":"true",children:[e.jsxs("svg",{viewBox:"0 0 56 90",focusable:"false",children:[e.jsx(h,{d:"M8 22 C 34 30, 40 52, 26 72",stroke:"var(--fj-accent-ink)",strokeWidth:"2",duration:.9}),e.jsx("path",{d:"M20 64 L26 74 L34 66",fill:"none",stroke:"var(--fj-accent-ink)",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),e.jsx("span",{children:o.redesign})]}),e.jsxs("div",{className:"fj-form fj-form--after",children:[e.jsx("span",{className:"fj-form-head",children:o.after}),e.jsxs("div",{className:"fj-form-sheet",children:[e.jsx("div",{className:"fj-form-cases",role:"group","aria-label":o.after,children:b.map(r=>e.jsx("button",{className:`fj-form-case${i===r.key?" is-on":""}`,"aria-pressed":i===r.key,onClick:()=>d(r.key),children:r.label[a]},r.key))}),e.jsx("div",{className:"fj-form-progress","aria-hidden":"true",children:f.map((r,s)=>e.jsx("i",{className:s===0?"is-on":""},s))}),f.map((r,s)=>e.jsxs("div",{className:`fj-form-group${r.urgent?" is-urgent":""}`,children:[e.jsx("span",{className:"fj-form-group-title",children:r.title[a]}),Array.from({length:r.fields},(w,c)=>e.jsx(n,{urgent:r.urgent},c))]},s))]}),e.jsx("ul",{className:"fj-form-notes",children:o.afterNotes.map((r,s)=>e.jsx("li",{"data-mark":"✓",children:r},s))})]})]})}function T(){const{lang:a}=l(),o=t[a]??t.en;return e.jsx(g,{chapter:u,station:v,spotlightTitle:o.spotTitle,spotlight:e.jsx(k,{}),spotlightCaption:o.caption})}x("fj-c05-styles",`
.fj-forms { display: grid; grid-template-columns: minmax(0, 1fr) 60px minmax(0, 1fr); gap: 12px; align-items: stretch; }
.fj-form { display: flex; flex-direction: column; gap: 10px; }
.fj-form-head { font-family: var(--fj-font-data); font-size: 10.5px; font-weight: 600; letter-spacing: 0.12em; color: var(--fj-ink-3); }
.fj-form--after .fj-form-head { color: var(--fj-accent-ink); }
.fj-form-sheet { flex: 1; background: var(--fj-paper-1); border: 1px solid var(--fj-line); border-radius: var(--fj-r-md); box-shadow: var(--fj-shadow); padding: 14px 14px 12px; display: flex; flex-direction: column; gap: 7px; }
.fj-form--before .fj-form-sheet { gap: 5px; }

/* abstract fields */
.fj-mf { display: grid; grid-template-columns: 34% 1fr; gap: 7px; align-items: center; }
.fj-mf-label { height: 7px; border-radius: 4px; background: var(--fj-line); }
.fj-mf-input { height: 15px; border-radius: 4px; border: 1.2px dashed var(--fj-line); background: var(--fj-paper-0); }
.fj-mf.is-urgent .fj-mf-input { border-color: var(--fj-accent); background: var(--fj-accent-soft); }

/* after: case chips + groups + progress */
.fj-form-cases { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 2px; }
.fj-form-case { font-size: 12px; font-weight: 600; color: var(--fj-ink-2); border: 1.4px solid var(--fj-line); border-radius: 999px; padding: 4px 13px; background: var(--fj-paper-0); transition: border-color 150ms var(--fj-ease), background 150ms var(--fj-ease), color 150ms var(--fj-ease); }
.fj-form-case:hover { border-color: var(--fj-accent); }
.fj-form-case.is-on { color: var(--fj-accent-ink); background: var(--fj-accent-soft); border-color: var(--fj-accent-ink); }
.fj-form-progress { display: flex; gap: 5px; margin: 2px 0 4px; }
.fj-form-progress i { width: 22px; height: 4px; border-radius: 2px; background: var(--fj-line-soft); }
.fj-form-progress i.is-on { background: var(--fj-accent); }
.fj-form-group { border: 1px solid var(--fj-line-soft); border-radius: var(--fj-r-sm); padding: 9px 10px 10px; display: flex; flex-direction: column; gap: 6px; background: rgba(255,255,255,0.35); }
.fj-form-group.is-urgent { border-color: var(--fj-accent); }
.fj-form-group-title { font-size: 11px; font-weight: 700; letter-spacing: 0.04em; color: var(--fj-ink); }

/* verdict notes */
.fj-form-notes { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.fj-form-notes li { font-size: 12.5px; line-height: 1.5; color: var(--fj-ink-2); padding-left: 20px; position: relative; }
.fj-form-notes li::before { content: attr(data-mark); position: absolute; left: 2px; font-family: var(--fj-font-data); font-weight: 700; }
.fj-form--before .fj-form-notes li::before { color: #9C4A1B; }
.fj-form--after .fj-form-notes li::before { color: #4F5D2D; }

/* the redesign arrow */
.fj-form-arrow { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; color: var(--fj-accent-ink); }
.fj-form-arrow svg { width: 42px; height: 68px; }
.fj-form-arrow span { font-family: var(--fj-font-display); font-style: italic; font-size: 12.5px; white-space: nowrap; transform: rotate(-4deg); }
html.lang-zh .fj-form-arrow span { font-style: normal; }

@media (max-width: 860px) {
  .fj-forms { grid-template-columns: 1fr; }
  .fj-form-arrow { flex-direction: row; padding: 2px 0; }
  .fj-form-arrow svg { transform: rotate(78deg); width: 34px; height: 52px; }
}
`);export{T as default};
