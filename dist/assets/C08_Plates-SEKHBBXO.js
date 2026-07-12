import{u as d,Q as r,j as a,a6 as p,W as s,aj as h,a8 as m,ak as c,aa as u,a5 as g,i as x}from"./index-BKqYgZus.js";const w=g.find(e=>e.key==="C08"),i={en:{lead:"The award, the poster, and both methodology figures already appear inline above. This is what's still waiting on a scan: the room where it happened, and the people who made it possible."},zh:{lead:"獎項、海報，與兩張方法論圖版，都已經出現在上方的章節裡。這裡是還在等掃描檔的部分：事情發生的房間，還有讓這一切成真的人。"}};function j(){const{lang:e}=d(),n=r(),l=i[e]??i.en;return a.jsx(p,{chapter:w,lead:l.lead,children:a.jsx(s.div,{className:"bl-plate-grid",variants:u(.06),initial:n?!1:"hidden",whileInView:"show",viewport:{once:!0,amount:.1},children:h.map((t,o)=>a.jsx(s.div,{variants:m,children:a.jsx(c,{photo:t,num:o+1})},t.id))})})}x("bl-c08-styles",`
.bl-plate-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 280px)); gap: 16px; }
@media (max-width: 560px) {
  .bl-plate-grid { grid-template-columns: 1fr; }
}
`);export{j as default};
