import{u as r,U as d,r as u,j as a,V as p,W as s,ak as c,X as f,al as h,_ as j,O as x,i as g}from"./index-CRXAj-yh.js";import{P as b}from"./PhotoLightbox-D1bGBn8z.js";const w=x.find(t=>t.key==="C06"),n={en:{lead:"Three photographs place the first two stations back in their real settings: an institution activity, a working session, and an association event. Open a photograph to view the full frame."},zh:{lead:"三張照片把前兩站帶回真實場域：機構活動、工作現場與協會活動。點選縮圖可查看完整畫面。"}};function y(){const{lang:t}=r(),o=d(),l=n[t]??n.en,[m,i]=u.useState(null);return a.jsxs(p,{chapter:w,lead:l.lead,children:[a.jsx(s.div,{className:"fj-album",variants:j(),initial:o?!1:"hidden",whileInView:"show",viewport:{once:!0,amount:.08},children:c.map(e=>a.jsx(s.div,{className:`fj-album-item fj-album-item--${e.layout}`,variants:f,children:a.jsx(h,{photo:e,onOpen:i})},e.id))}),a.jsx(b,{image:m,lang:t,onClose:()=>i(null)})]})}g("fj-c06-styles",`
.fj-album { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 22px 18px; padding-top: 10px; align-items: start; }
.fj-album-item--portrait { grid-column: span 3; width: min(100%, 224px); justify-self: start; }
.fj-album-item--work { grid-column: span 4; }
.fj-album-item--event { grid-column: span 5; }
@media (max-width: 1023px) { .fj-album { grid-template-columns: repeat(2, minmax(0, 1fr)); } .fj-album-item { grid-column: span 1; } .fj-album-item--portrait { width: min(100%, 224px); } }
@media (max-width: 520px) { .fj-album { grid-template-columns: 1fr; } }
`);export{y as default};
