import{u as x,r as l,j as s,p as g,t as h,q as b,i as u}from"./index-Bv4593Va.js";const v=b.find(a=>a.key==="MP"),m={en:{title:"The shipped platform: three surfaces",lead:"The briefings do not stop at a database — they surface on a product. This is the Strategy Intelligence Platform I built: a home, an insights feed, and a startup directory. Rebuilt here as DOM; open any surface to see the real one.",tabs:{home:"Home",insights:"Insights",startups:"Startups"},open:"Open",home:{brand:"Strategy Intelligence Platform",tag:"Global tech signal, structured for strategy.",cards:[{k:"Insights",d:"Daily briefings straight from the AI news pipeline."},{k:"Startups",d:"The deep-tech directory, filterable by sector."}],stats:[["6","sources"],["5","sectors"],["daily","refresh"]]},insights:{label:"Insights · weekly briefings",items:[{t:"Global AI-chip market trends",date:"2025-01-15",tags:["AI","Semiconductor","Market"]},{t:"CoWoS packaging and the volume race",date:"2025-01-14",tags:["Semiconductor","Foundry"]},{t:"Export controls hit memory makers",date:"2025-01-13",tags:["Policy","Memory"]}]},startups:{label:"Startups · directory",filters:["All","Semiconductor","AI","Biotech","Cleantech"],note:"Company names masked — records are internal to ITRI.",rows:[{sector:"AI",stage:"Series B",loc:"Taipei"},{sector:"Semiconductor",stage:"Series A",loc:"Hsinchu"},{sector:"Biotech",stage:"Seed",loc:"Taipei"},{sector:"Cleantech",stage:"Series A",loc:"Taichung"}]},soWhat:"The system ends in a product a stranger can open, not a repo they take on trust."},zh:{title:"已上線平台：三個介面",lead:"簡報不會停在資料庫——它們會出現在一個產品上。這是我做的 Strategy Intelligence Platform：一個首頁、一條 insights 動態、一個新創目錄。這裡用 DOM 重建；點任一介面即可看實機。",tabs:{home:"Home",insights:"Insights",startups:"Startups"},open:"開啟",home:{brand:"Strategy Intelligence Platform",tag:"把全球科技訊號，整理成策略看得懂的樣子。",cards:[{k:"Insights",d:"直接來自 AI 新聞管線的每日簡報。"},{k:"Startups",d:"深科技新創目錄，可依產業篩選。"}],stats:[["6","來源"],["5","產業"],["每日","更新"]]},insights:{label:"Insights · 每週簡報",items:[{t:"全球 AI 晶片市場趨勢",date:"2025-01-15",tags:["AI","半導體","市場"]},{t:"CoWoS 封裝與量產競賽",date:"2025-01-14",tags:["半導體","代工"]},{t:"出口管制衝擊記憶體廠",date:"2025-01-13",tags:["政策","記憶體"]}]},startups:{label:"Startups · 目錄",filters:["全部","半導體","AI","生技","潔淨科技"],note:"公司名稱遮罩——紀錄為工研院內部資料。",rows:[{sector:"AI",stage:"B 輪",loc:"台北"},{sector:"半導體",stage:"A 輪",loc:"新竹"},{sector:"生技",stage:"種子",loc:"台北"},{sector:"潔淨科技",stage:"A 輪",loc:"台中"}]},soWhat:"系統的終點是一個陌生人能打開的產品，而不是一份要人憑信任接受的程式庫。"}};function y({s:a}){return s.jsxs("div",{className:"ni-sp-home",children:[s.jsxs("div",{className:"ni-sp-hero",children:[s.jsx("span",{className:"ni-sp-hero-brand",children:a.brand}),s.jsx("span",{className:"ni-sp-hero-tag",children:a.tag})]}),s.jsx("div",{className:"ni-sp-cards",children:a.cards.map(e=>s.jsxs("div",{className:"ni-sp-card",children:[s.jsx("span",{className:"ni-sp-card-k",children:e.k}),s.jsx("span",{className:"ni-sp-card-d",children:e.d})]},e.k))}),s.jsx("div",{className:"ni-sp-stats",children:a.stats.map(([e,r])=>s.jsxs("div",{className:"ni-sp-stat",children:[s.jsx("strong",{children:e}),s.jsx("span",{children:r})]},r))})]})}function j({s:a}){return s.jsxs("div",{className:"ni-sp-insights",children:[s.jsx("span",{className:"ni-sp-surfacelabel",children:a.label}),s.jsx("div",{className:"ni-sp-feed",children:a.items.map((e,r)=>s.jsxs("div",{className:"ni-sp-report",children:[s.jsx("span",{className:"ni-sp-report-t",children:e.t}),s.jsxs("div",{className:"ni-sp-report-meta",children:[s.jsx("span",{className:"ni-sp-report-date",children:e.date}),s.jsx("span",{className:"ni-sp-report-tags",children:e.tags.map(t=>s.jsx("span",{children:t},t))})]})]},r))})]})}function k({s:a}){const[e,r]=l.useState(0);return s.jsxs("div",{className:"ni-sp-startups",children:[s.jsx("span",{className:"ni-sp-surfacelabel",children:a.label}),s.jsx("div",{className:"ni-sp-filters",role:"group","aria-label":"Sector filter",children:a.filters.map((t,o)=>s.jsx("button",{className:`ni-sp-filter${o===e?" is-on":""}`,"aria-pressed":o===e,onClick:()=>r(o),children:t},t))}),s.jsx("div",{className:"ni-sp-rows",children:a.rows.map((t,o)=>s.jsxs("div",{className:"ni-sp-row",children:[s.jsx("span",{className:"ni-sp-row-name","aria-label":"masked name",children:"▪▪▪▪▪▪▪▪"}),s.jsx("span",{className:"ni-sp-row-sector",children:t.sector}),s.jsx("span",{className:"ni-sp-row-stage",children:t.stage}),s.jsx("span",{className:"ni-sp-row-loc",children:t.loc})]},o))}),s.jsx("span",{className:"ni-sp-masknote",children:a.note})]})}const N={home:y,insights:j,startups:k},p=["home","insights","startups"];function S(){const{lang:a}=x(),e=m[a]??m.en,[r,t]=l.useState("home"),o=l.useRef({}),f=N[r],d=n=>{var c;const i=(p.indexOf(r)+n+p.length)%p.length;t(p[i]),(c=o.current[p[i]])==null||c.focus()};return s.jsx(g,{mod:v,title:e.title,lead:e.lead,soWhat:e.soWhat,children:s.jsx("div",{className:"ni-sp",children:s.jsxs("div",{className:"ni-sp-frame",children:[s.jsxs("div",{className:"ni-sp-chrome",children:[s.jsxs("span",{className:"ni-sp-traffic","aria-hidden":"true",children:[s.jsx("i",{}),s.jsx("i",{}),s.jsx("i",{})]}),s.jsx("div",{className:"ni-sp-tabs",role:"tablist","aria-label":"Platform routes",children:p.map(n=>s.jsxs("button",{role:"tab","aria-selected":r===n,tabIndex:r===n?0:-1,ref:i=>o.current[n]=i,className:`ni-sp-tab${r===n?" is-on":""}`,onClick:()=>t(n),onKeyDown:i=>{i.key==="ArrowRight"&&(i.preventDefault(),d(1)),i.key==="ArrowLeft"&&(i.preventDefault(),d(-1))},children:["/",n==="home"?"":n]},n))}),s.jsxs("a",{className:"ni-sp-open",href:h[r],target:"_blank",rel:"noopener noreferrer",children:[e.open," ↗"]})]}),s.jsx("div",{className:"ni-sp-viewport",role:"tabpanel",children:s.jsx(f,{s:e[r]})})]})})})}u("ni-mp",`
.ni-sp { --sp-bg: #0b0d20; --sp-panel: #15173100; --sp-panel2: #171a37; --sp-line: #2a2f52; --sp-t1: #e9eaf7; --sp-t2: #a2a6c4; --sp-t3: #6b6f93; --sp-violet: #8b7ff5; --sp-blue: #5b8def; }
.ni-sp-frame { border: 1px solid var(--ni-line-2); border-radius: var(--ni-r-md); overflow: hidden; background: var(--sp-bg); }
.ni-sp-chrome { display: flex; align-items: center; gap: 12px; padding: 9px 12px; background: #0e1026; border-bottom: 1px solid var(--sp-line); }
.ni-sp-traffic { display: inline-flex; gap: 5px; flex: 0 0 auto; }
.ni-sp-traffic i { width: 9px; height: 9px; border-radius: 50%; background: #2a2f52; }
.ni-sp-tabs { display: flex; gap: 4px; flex: 1; }
.ni-sp-tab { font-family: var(--ni-font-data); font-size: 11.5px; color: var(--sp-t2); padding: 5px 12px; border-radius: 6px; border: 1px solid transparent; transition: color 160ms, background 160ms, border-color 160ms; }
.ni-sp-tab:hover { color: var(--sp-t1); }
.ni-sp-tab.is-on { color: #fff; background: rgba(139,127,245,0.16); border-color: var(--sp-violet); }
.ni-sp-open { font-family: var(--ni-font-data); font-size: 11px; color: var(--sp-blue); text-decoration: none; flex: 0 0 auto; }
.ni-sp-open:hover { text-decoration: underline; }
.ni-sp-viewport { padding: 26px 22px; min-height: 280px; background: radial-gradient(120% 90% at 15% 0%, rgba(91,141,239,0.12), transparent 55%), radial-gradient(90% 80% at 90% 20%, rgba(139,127,245,0.14), transparent 60%), var(--sp-bg); }

/* home */
.ni-sp-hero { text-align: center; padding: 12px 0 26px; }
.ni-sp-hero-brand { display: block; font-family: var(--ni-font-display); font-size: clamp(22px, 3vw, 30px); color: var(--sp-t1); letter-spacing: -0.01em; }
.ni-sp-hero-tag { display: block; margin-top: 8px; font-size: 13px; color: var(--sp-t2); }
.ni-sp-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.ni-sp-card { padding: 16px; border: 1px solid var(--sp-line); border-radius: 12px; background: linear-gradient(180deg, rgba(139,127,245,0.08), transparent), var(--sp-panel2); }
.ni-sp-card-k { display: block; font-size: 15px; font-weight: 700; color: var(--sp-t1); margin-bottom: 6px; }
.ni-sp-card-d { display: block; font-size: 12.5px; line-height: 1.55; color: var(--sp-t2); }
.ni-sp-stats { display: flex; gap: 10px; justify-content: center; margin-top: 18px; }
.ni-sp-stat { text-align: center; padding: 10px 18px; border: 1px solid var(--sp-line); border-radius: 10px; background: var(--sp-panel2); }
.ni-sp-stat strong { display: block; font-family: var(--ni-font-data); font-size: 18px; color: var(--sp-violet); }
.ni-sp-stat span { font-size: 10.5px; color: var(--sp-t3); }

/* insights */
.ni-sp-surfacelabel { display: block; font-family: var(--ni-font-data); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--sp-blue); margin-bottom: 14px; }
.ni-sp-feed { display: flex; flex-direction: column; gap: 10px; }
.ni-sp-report { padding: 14px 16px; border: 1px solid var(--sp-line); border-radius: 10px; background: var(--sp-panel2); }
.ni-sp-report-t { display: block; font-size: 14px; font-weight: 600; color: var(--sp-t1); margin-bottom: 8px; }
.ni-sp-report-meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.ni-sp-report-date { font-family: var(--ni-font-data); font-size: 11px; color: var(--sp-t3); }
.ni-sp-report-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.ni-sp-report-tags span { font-size: 10.5px; color: var(--sp-t2); background: rgba(91,141,239,0.14); border-radius: 4px; padding: 2px 8px; }

/* startups */
.ni-sp-filters { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
.ni-sp-filter { font-size: 11.5px; color: var(--sp-t2); padding: 4px 12px; border: 1px solid var(--sp-line); border-radius: 999px; background: var(--sp-panel2); transition: color 160ms, border-color 160ms, background 160ms; }
.ni-sp-filter:hover { border-color: var(--sp-violet); }
.ni-sp-filter.is-on { color: #fff; background: rgba(139,127,245,0.18); border-color: var(--sp-violet); }
.ni-sp-rows { display: flex; flex-direction: column; gap: 6px; }
.ni-sp-row { display: grid; grid-template-columns: 1.4fr 1fr 0.9fr 0.9fr; gap: 12px; align-items: center; padding: 10px 14px; border: 1px solid var(--sp-line); border-radius: 8px; background: var(--sp-panel2); font-size: 12px; }
.ni-sp-row-name { font-family: var(--ni-font-data); letter-spacing: 0.12em; color: var(--sp-t3); }
.ni-sp-row-sector { color: var(--sp-violet); }
.ni-sp-row-stage, .ni-sp-row-loc { color: var(--sp-t2); font-family: var(--ni-font-data); font-size: 11px; }
.ni-sp-masknote { display: block; margin-top: 12px; font-family: var(--ni-font-data); font-size: 11px; color: var(--sp-t3); }

@media (max-width: 767px) {
  .ni-sp-cards { grid-template-columns: 1fr; }
  .ni-sp-row { grid-template-columns: 1fr 1fr; gap: 6px 10px; }
  .ni-sp-open { display: none; }
}
`);export{S as default};
