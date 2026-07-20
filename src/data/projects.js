// Shared polish vocabulary for every hand-drawn hero cover below: a corner accent
// wash, a dark vignette, a faint dot-grid texture, and a panel gradient — each
// parameterized by the project's own accent so the ten covers read as one system
// while staying visually distinct per theme.
const heroBackdrop = (accent) => (
    '<defs>'
    + `<radialGradient id="hv" cx="0.5" cy="0.5" r="0.75"><stop offset="0" stop-color="${accent}" stop-opacity="0.055"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>`
    + '<radialGradient id="hg" cx="0.5" cy="0.5" r="0.72"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.4"/></radialGradient>'
    + '<linearGradient id="hp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#171B22"/><stop offset="1" stop-color="#12151B"/></linearGradient>'
    + '<pattern id="hd" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#181C24"/></pattern>'
    + '</defs>'
    + '<rect width="1600" height="900" fill="#0C0E12"/>'
    + '<rect width="1600" height="900" fill="url(#hd)"/>'
    + '<rect width="1600" height="900" fill="url(#hv)"/>'
    + '<rect width="1600" height="900" fill="url(#hg)"/>'
);
const heroCorners = '<g stroke="#262B35" stroke-width="1.5" fill="none" opacity="0.85">'
    + '<path d="M20,44 L20,20 L44,20"/><path d="M1580,44 L1580,20 L1556,20"/>'
    + '<path d="M20,856 L20,880 L44,880"/><path d="M1580,856 L1580,880 L1556,880"/>'
    + '</g>';

// Self-drawn SVG cover for the deeptech-database case (no stock photos): a data-room
// console wireframe — 8 registered sources converging into a relational core, then
// diverging into 4 decision surfaces — in the Neural Signal OS palette.
const DEEPTECH_SOURCE_YS = [92, 182, 272, 362, 452, 542, 632, 722];
const DEEPTECH_OUTPUT_YS = [170, 320, 470, 620];
const DEEPTECH_HERO_IMAGE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">'
    + heroBackdrop('#35C2B0') + heroCorners
    + '<g stroke="#2A3140" stroke-width="3" fill="url(#hp)">'
    + DEEPTECH_SOURCE_YS.map(y => `<rect x="110" y="${y}" width="260" height="52" rx="10"/>`).join('')
    + '</g>'
    + '<g fill="rgba(255,255,255,0.05)">'
    + DEEPTECH_SOURCE_YS.map(y => `<rect x="111" y="${y + 1}" width="258" height="1" rx="0.5"/>`).join('')
    + '</g>'
    + '<g>'
    + DEEPTECH_SOURCE_YS.map((y, i) => `<circle cx="126" cy="${y + 26}" r="5" fill="${i === 7 ? '#E8A33D' : '#35C2B0'}"/>`).join('')
    + '</g>'
    + '<g fill="#6B7280" font-family="monospace" font-size="11" letter-spacing="1.5">'
    + DEEPTECH_SOURCE_YS.map((y, i) => `<text x="140" y="${y + 30}">SRC ${String(i + 1).padStart(2, '0')}</text>`).join('')
    + '</g>'
    + '<g stroke="#35C2B0" stroke-width="6" fill="none" opacity="0.14">'
    + DEEPTECH_SOURCE_YS.slice(0, 7).map(y => `<path d="M370,${y + 26} C 480,${y + 26} 520,420 620,420"/>`).join('')
    + '</g>'
    + '<g stroke="#35C2B0" stroke-width="2" fill="none" opacity="0.5">'
    + DEEPTECH_SOURCE_YS.slice(0, 7).map(y => `<path d="M370,${y + 26} C 480,${y + 26} 520,420 620,420"/>`).join('')
    + '</g>'
    + `<path d="M370,${DEEPTECH_SOURCE_YS[7] + 26} C 480,${DEEPTECH_SOURCE_YS[7] + 26} 520,420 620,420" stroke="#E8A33D" stroke-width="9" fill="none" opacity="0.18"/>`
    + `<path d="M370,${DEEPTECH_SOURCE_YS[7] + 26} C 480,${DEEPTECH_SOURCE_YS[7] + 26} 520,420 620,420" stroke="#E8A33D" stroke-width="2.5" fill="none" opacity="0.8"/>`
    + '<g stroke="#333A47" stroke-width="4" fill="url(#hp)">'
    + '<ellipse cx="800" cy="230" rx="180" ry="28"/>'
    + '<rect x="620" y="230" width="360" height="430"/>'
    + '<ellipse cx="800" cy="660" rx="180" ry="28"/>'
    + '</g>'
    + '<ellipse cx="800" cy="230" rx="180" ry="28" fill="none" stroke="#3D4658" stroke-width="1.5" opacity="0.6"/>'
    + '<ellipse cx="800" cy="236" rx="164" ry="20" fill="rgba(255,255,255,0.05)"/>'
    + '<text x="712" y="200" fill="#6B7280" font-family="monospace" font-size="13" letter-spacing="2">RELATIONAL CORE</text>'
    + '<g fill="#2A303C">'
    + [280, 340, 400, 460, 520, 580].map((y, i) => `<rect x="660" y="${y}" width="${[280, 220, 260, 180, 240, 200][i]}" height="14" rx="7"/>`).join('')
    + '</g>'
    + '<rect x="660" y="340" width="140" height="14" rx="7" fill="#35C2B0" opacity="0.6"/>'
    + '<rect x="660" y="460" width="110" height="14" rx="7" fill="#35C2B0" opacity="0.6"/>'
    + '<g stroke="#2A3140" stroke-width="3" fill="url(#hp)">'
    + DEEPTECH_OUTPUT_YS.map(y => `<rect x="1180" y="${y}" width="280" height="90" rx="12"/>`).join('')
    + '</g>'
    + '<g fill="rgba(255,255,255,0.06)">'
    + DEEPTECH_OUTPUT_YS.map(y => `<rect x="1181" y="${y + 1}" width="278" height="1"/>`).join('')
    + '</g>'
    + '<g fill="#35C2B0">'
    + DEEPTECH_OUTPUT_YS.slice(0, 3).map(y => `<circle cx="1204" cy="${y + 45}" r="6"/>`).join('')
    + '</g>'
    + `<circle cx="1204" cy="${DEEPTECH_OUTPUT_YS[3] + 45}" r="6" fill="#E8A33D"/>`
    + '<g stroke="#35C2B0" stroke-width="2.5" fill="none" opacity="0.65">'
    + DEEPTECH_OUTPUT_YS.slice(0, 3).map(y => `<path d="M980,420 C 1080,420 1100,${y + 45} 1180,${y + 45}"/>`).join('')
    + '</g>'
    + `<path d="M980,420 C 1080,420 1100,${DEEPTECH_OUTPUT_YS[3] + 45} 1180,${DEEPTECH_OUTPUT_YS[3] + 45}" stroke="#E8A33D" stroke-width="2.5" fill="none" opacity="0.75"/>`
    + '<text x="1180" y="750" fill="#6B7280" font-family="monospace" font-size="16" letter-spacing="3">8 SOURCES · 8 TABLES · 230+ COMPANIES</text>'
    + '</svg>');

// Self-drawn SVG cover for the Strategy Intelligence Platform case (no stock
// photos): a globe with three hub markers on the left, a brief assembling in
// the middle, and a stack of database rows on the right — global signal to
// deep text to structured record, in one frame, in the Neural Signal OS palette.
const ISP_ROW_YS = [268, 342, 416, 490, 564];
const ISP_HERO_IMAGE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">'
    + heroBackdrop('#35C2B0') + heroCorners
    + '<defs><radialGradient id="ggl" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#35C2B0" stop-opacity="0.22"/><stop offset="1" stop-color="#35C2B0" stop-opacity="0"/></radialGradient></defs>'
    + '<circle cx="270" cy="450" r="235" fill="url(#ggl)"/>'
    + '<circle cx="270" cy="450" r="190" fill="url(#hp)" stroke="#2A3140" stroke-width="2"/>'
    + '<g stroke="#262B35" stroke-width="1" fill="none" opacity="0.8">'
    + '<ellipse cx="270" cy="450" rx="190" ry="66"/><ellipse cx="270" cy="450" rx="190" ry="140"/>'
    + '<ellipse cx="270" cy="450" rx="66" ry="190"/><ellipse cx="270" cy="450" rx="140" ry="190"/>'
    + '</g>'
    + '<circle cx="270" cy="450" r="190" fill="none" stroke="#3D4658" stroke-width="1.5" opacity="0.7"/>'
    + '<g fill="#35C2B0"><circle cx="196" cy="366" r="6"/><circle cx="360" cy="522" r="6"/></g>'
    + '<circle cx="318" cy="384" r="10" fill="none" stroke="#E8A33D" stroke-width="2.5"/>'
    + '<circle cx="318" cy="384" r="4.5" fill="#E8A33D"/>'
    + '<g stroke="#35C2B0" stroke-width="5" fill="none" opacity="0.12">'
    + '<path d="M330,392 C 420,430 470,440 520,440"/><path d="M362,522 C 440,500 470,470 520,455"/>'
    + '</g>'
    + '<g stroke="#35C2B0" stroke-width="1.5" fill="none" opacity="0.6" stroke-dasharray="1 7" stroke-linecap="round">'
    + '<path d="M330,392 C 420,430 470,440 520,440"/>'
    + '<path d="M362,522 C 440,500 470,470 520,455"/>'
    + '</g>'
    + '<rect x="520" y="240" width="460" height="420" rx="14" fill="url(#hp)" stroke="#2A3140" stroke-width="2"/>'
    + '<circle cx="552" cy="256" r="5" fill="#35C2B0"/>'
    + '<text x="568" y="261" fill="#6B7280" font-family="monospace" font-size="12" letter-spacing="2">BRIEF</text>'
    + '<rect x="552" y="282" width="220" height="16" rx="8" fill="#2A303C"/>'
    + '<rect x="552" y="310" width="330" height="10" rx="5" fill="#1C2028"/>'
    + '<g fill="#35C2B0" opacity="0.85">'
    + '<rect x="552" y="346" width="10" height="10" rx="2"/><rect x="552" y="368" width="10" height="10" rx="2"/><rect x="552" y="390" width="10" height="10" rx="2"/>'
    + '</g>'
    + '<g fill="#2A303C">'
    + '<rect x="574" y="348" width="360" height="8" rx="4"/><rect x="574" y="370" width="330" height="8" rx="4"/><rect x="574" y="392" width="300" height="8" rx="4"/>'
    + '</g>'
    + '<rect x="552" y="420" width="380" height="1" fill="#262B35"/>'
    + '<g fill="#1C2028"><rect x="552" y="444" width="380" height="8" rx="4"/><rect x="552" y="464" width="360" height="8" rx="4"/><rect x="552" y="484" width="340" height="8" rx="4"/><rect x="552" y="504" width="320" height="8" rx="4"/></g>'
    + '<rect x="552" y="580" width="380" height="34" rx="8" fill="#12241F" stroke="#35C2B0"/>'
    + '<text x="572" y="602" fill="#35C2B0" font-family="monospace" font-size="16">▸ ask the database a question</text>'
    + '<rect x="908" y="589" width="9" height="16" fill="#35C2B0" opacity="0.75"/>'
    + '<g stroke="#E8A33D" stroke-width="5" fill="none" opacity="0.16"><path d="M980,420 C 1030,420 1030,340 1080,340"/></g>'
    + '<g stroke="#E8A33D" stroke-width="1.5" fill="none" opacity="0.6"><path d="M980,420 C 1030,420 1030,340 1080,340"/></g>'
    + '<g>' + ISP_ROW_YS.map((y, i) => (i % 2 === 0 ? `<rect x="1080" y="${y}" width="360" height="56" rx="10" fill="rgba(255,255,255,0.02)"/>` : '')).join('') + '</g>'
    + '<g stroke="#2A3140" stroke-width="2" fill="url(#hp)">'
    + ISP_ROW_YS.map(y => `<rect x="1080" y="${y}" width="360" height="56" rx="10"/>`).join('')
    + '</g>'
    + '<g>' + ISP_ROW_YS.map((y, i) => `<circle cx="1104" cy="${y + 28}" r="6" fill="${i === 1 ? '#E8A33D' : '#35C2B0'}"/>`).join('') + '</g>'
    + '<g fill="#2A303C">'
    + ISP_ROW_YS.map(y => `<rect x="1126" y="${y + 16}" width="200" height="9" rx="4"/><rect x="1126" y="${y + 32}" width="150" height="7" rx="3"/>`).join('')
    + '</g>'
    + '<text x="1080" y="230" fill="#6B7280" font-family="monospace" font-size="18" letter-spacing="3">STRATEGY INTELLIGENCE · 201 RECORDS</text>'
    + '</svg>');

// Self-drawn SVG cover for the AI News Intelligence case (no stock photos): six
// registered sources on the left, a five-stage pipeline column in the middle,
// and two delivery surfaces (Notion + /insights feed) on the right — the news
// firehose resolving into a dated, sourced briefing, in the Neural Signal OS palette.
const NEWS_SOURCE_YS = [150, 250, 350, 450, 550, 650];
const NEWS_STAGE_YS = [252, 360, 468, 576];
const NEWS_STAGE_LABELS = ['EXTRACT', 'SCORE', 'SUMMARISE', 'PUBLISH'];
const NEWS_HERO_IMAGE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">'
    + heroBackdrop('#35C2B0') + heroCorners
    + '<g stroke="#2A3140" stroke-width="2" fill="url(#hp)">'
    + NEWS_SOURCE_YS.map(y => `<rect x="90" y="${y}" width="250" height="60" rx="10"/>`).join('')
    + '</g>'
    + '<g>' + NEWS_SOURCE_YS.map((y, i) => `<circle cx="114" cy="${y + 30}" r="6" fill="${i === 5 ? '#E8A33D' : '#35C2B0'}"/>`).join('') + '</g>'
    + '<g fill="#2A303C">' + NEWS_SOURCE_YS.map(y => `<rect x="134" y="${y + 18}" width="150" height="9" rx="4"/><rect x="134" y="${y + 34}" width="110" height="7" rx="3"/>`).join('') + '</g>'
    + '<g stroke="#35C2B0" stroke-width="6" fill="none" opacity="0.1">'
    + NEWS_SOURCE_YS.map(y => `<path d="M340,${y + 30} C 460,${y + 30} 500,450 620,450"/>`).join('')
    + '</g>'
    + '<g stroke="#35C2B0" stroke-width="2" fill="none" opacity="0.42">'
    + NEWS_SOURCE_YS.map(y => `<path d="M340,${y + 30} C 460,${y + 30} 500,450 620,450"/>`).join('')
    + '</g>'
    + '<rect x="620" y="196" width="360" height="508" rx="16" fill="url(#hp)" stroke="#2A3140" stroke-width="2"/>'
    + '<circle cx="648" cy="222" r="5" fill="#35C2B0"/>'
    + '<text x="664" y="238" fill="#6B7280" font-family="monospace" font-size="16" letter-spacing="2">PIPELINE</text>'
    + '<rect x="620" y="410" width="360" height="34" fill="#35C2B0" opacity="0.04"/>'
    + '<g>' + NEWS_STAGE_YS.map((y, i) => `<rect x="648" y="${y}" width="304" height="76" rx="10" fill="#0C0E12" stroke="#232A36"/><rect x="648" y="${y}" width="5" height="76" rx="2" fill="${i === 3 ? '#E8A33D' : '#35C2B0'}"/>`).join('') + '</g>'
    + '<g fill="#6B7280" font-family="monospace" font-size="9" letter-spacing="1.5">'
    + NEWS_STAGE_YS.map((y, i) => `<text x="674" y="${y + 16}">${String(i + 1).padStart(2, '0')} · ${NEWS_STAGE_LABELS[i]}</text>`).join('')
    + '</g>'
    + '<g fill="#2A303C">' + NEWS_STAGE_YS.map(y => `<rect x="674" y="${y + 30}" width="150" height="10" rx="5"/><rect x="674" y="${y + 52}" width="220" height="8" rx="4"/>`).join('') + '</g>'
    + '<g fill="#4A5262" font-family="monospace" font-size="13">'
    + [328, 436, 544].map(y => `<text x="792" y="${y}">⌄</text>`).join('')
    + '</g>'
    + '<g stroke="#E8A33D" stroke-width="6" fill="none" opacity="0.14"><path d="M980,450 C 1060,450 1080,360 1160,360"/><path d="M980,450 C 1060,450 1080,560 1160,560"/></g>'
    + '<g stroke="#E8A33D" stroke-width="2" fill="none" opacity="0.6"><path d="M980,450 C 1060,450 1080,360 1160,360"/><path d="M980,450 C 1060,450 1080,560 1160,560"/></g>'
    + '<g stroke="#2A3140" stroke-width="2" fill="url(#hp)"><rect x="1160" y="300" width="330" height="120" rx="12"/><rect x="1160" y="500" width="330" height="120" rx="12"/></g>'
    + '<g fill="#35C2B0"><circle cx="1188" cy="330" r="6"/><circle cx="1188" cy="530" r="6"/></g>'
    + '<g fill="#2A303C"><rect x="1206" y="324" width="160" height="12" rx="6"/><rect x="1184" y="356" width="280" height="8" rx="4"/><rect x="1184" y="374" width="250" height="8" rx="4"/><rect x="1184" y="392" width="265" height="8" rx="4"/><rect x="1206" y="524" width="180" height="12" rx="6"/><rect x="1184" y="556" width="280" height="8" rx="4"/><rect x="1184" y="574" width="235" height="8" rx="4"/><rect x="1184" y="592" width="255" height="8" rx="4"/></g>'
    + '<rect x="1420" y="316" width="56" height="18" rx="9" fill="#12241F" stroke="#35C2B0" opacity="0.8"/><text x="1430" y="329" fill="#35C2B0" font-family="monospace" font-size="9">TODAY</text>'
    + '<rect x="1420" y="516" width="56" height="18" rx="9" fill="#12241F" stroke="#35C2B0" opacity="0.8"/><text x="1430" y="529" fill="#35C2B0" font-family="monospace" font-size="9">TODAY</text>'
    + '<text x="90" y="770" fill="#6B7280" font-family="monospace" font-size="18" letter-spacing="3">AI NEWS INTELLIGENCE · 6 SOURCES · DAILY</text>'
    + '</svg>');

// Self-drawn SVG cover for the Startup Intelligence Platform case (no stock
// photos): automated crawlers feeding an ETL node, a SQL store at the centre,
// and an interactive dashboard on the right — a manual spreadsheet replaced by a
// self-refreshing pipeline, in the Neural Signal OS palette.
const STARTUP_CRAWLER_YS = [230, 340, 450, 560];
const STARTUP_BARS = [70, 110, 90, 150, 120, 170];
const STARTUP_HERO_IMAGE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">'
    + heroBackdrop('#35C2B0') + heroCorners
    + '<defs><radialGradient id="getl" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#35C2B0" stop-opacity="0.32"/><stop offset="1" stop-color="#35C2B0" stop-opacity="0"/></radialGradient></defs>'
    + '<circle cx="164" cy="192" r="4" fill="#35C2B0" opacity="0.7"/>'
    + '<text x="90" y="210" fill="#6B7280" font-family="monospace" font-size="15" letter-spacing="2">CRAWLERS</text>'
    + '<g stroke="#2A3140" stroke-width="2" fill="url(#hp)">'
    + STARTUP_CRAWLER_YS.map(y => `<rect x="90" y="${y}" width="210" height="60" rx="10"/>`).join('')
    + '</g>'
    + '<g>' + STARTUP_CRAWLER_YS.map(y => `<circle cx="114" cy="${y + 30}" r="6" fill="#35C2B0"/>`).join('') + '</g>'
    + '<g fill="#2A303C">' + STARTUP_CRAWLER_YS.map(y => `<rect x="132" y="${y + 24}" width="130" height="10" rx="5"/>`).join('') + '</g>'
    + '<g stroke="#35C2B0" stroke-width="6" fill="none" opacity="0.1">' + STARTUP_CRAWLER_YS.map(y => `<path d="M300,${y + 30} C 360,${y + 30} 380,430 440,430"/>`).join('') + '</g>'
    + '<g stroke="#35C2B0" stroke-width="2" fill="none" opacity="0.42">' + STARTUP_CRAWLER_YS.map(y => `<path d="M300,${y + 30} C 360,${y + 30} 380,430 440,430"/>`).join('') + '</g>'
    + '<circle cx="515" cy="430" r="72" fill="url(#getl)"/>'
    + '<rect x="440" y="382" width="150" height="96" rx="12" fill="url(#hp)" stroke="#35C2B0" stroke-width="2"/>'
    + '<rect x="440" y="382" width="150" height="96" rx="12" fill="none" stroke="#35C2B0" stroke-width="1" opacity="0.5"><animate attributeName="opacity" values="0.5;0.05;0.5" dur="2.6s" repeatCount="indefinite"/></rect>'
    + '<text x="474" y="438" fill="#35C2B0" font-family="monospace" font-size="22" letter-spacing="2">ETL</text>'
    + '<g stroke="#E8A33D" stroke-width="6" fill="none" opacity="0.14"><path d="M590,430 C 660,430 680,430 740,430"/></g>'
    + '<g stroke="#E8A33D" stroke-width="2" fill="none" opacity="0.6"><path d="M590,430 C 660,430 680,430 740,430"/></g>'
    + '<g fill="url(#hp)" stroke="#333A47" stroke-width="3"><ellipse cx="850" cy="330" rx="110" ry="26"/><rect x="740" y="330" width="220" height="200"/><ellipse cx="850" cy="530" rx="110" ry="26"/></g>'
    + '<ellipse cx="850" cy="330" rx="110" ry="26" fill="none" stroke="#35C2B0" stroke-width="2"/>'
    + '<ellipse cx="850" cy="324" rx="96" ry="18" fill="rgba(255,255,255,0.05)"/>'
    + '<g stroke="#333A47" stroke-width="1.5" fill="none" opacity="0.7"><path d="M740,400 a110,26 0 0 0 220,0"/><path d="M740,460 a110,26 0 0 0 220,0"/></g>'
    + '<text x="808" y="602" fill="#6B7280" font-family="monospace" font-size="16" letter-spacing="2">SQL</text>'
    + '<g stroke="#35C2B0" stroke-width="6" fill="none" opacity="0.12"><path d="M960,430 C 1030,430 1050,430 1120,430"/></g>'
    + '<g stroke="#35C2B0" stroke-width="2" fill="none" opacity="0.6"><path d="M960,430 C 1030,430 1050,430 1120,430"/></g>'
    + '<rect x="1120" y="240" width="380" height="420" rx="16" fill="url(#hp)" stroke="#2A3140" stroke-width="2"/>'
    + '<circle cx="1148" cy="266" r="5" fill="#35C2B0"/>'
    + '<text x="1164" y="286" fill="#6B7280" font-family="monospace" font-size="15" letter-spacing="2">DASHBOARD</text>'
    + '<g stroke="#232A36" stroke-width="1">' + [440, 480, 520].map(y => `<line x1="1148" y1="${y}" x2="1476" y2="${y}"/>`).join('') + '</g>'
    + '<g fill="#35C2B0">' + STARTUP_BARS.map((h, i) => `<rect x="${1150 + i * 44}" y="${520 - h}" width="26" height="${h}" rx="4" opacity="${i === 3 ? 1 : 0.55}"/>`).join('') + '</g>'
    + '<g fill="#4A5262">' + STARTUP_BARS.map((h, i) => `<rect x="${1150 + i * 44}" y="${520 - h}" width="26" height="2" rx="1" opacity="0.6"/>`).join('') + '</g>'
    + '<line x1="1148" y1="520" x2="1476" y2="520" stroke="#262B35" stroke-width="2"/>'
    + '<g fill="#4A5262" font-family="monospace" font-size="8">' + [150, 190, 230].map((v, i) => `<text x="1120" y="${524 - i * 40}" text-anchor="end">${v}</text>`).join('') + '</g>'
    + '<polyline points="1150,614 1214,594 1278,602 1342,568 1406,586 1476,546" fill="none" stroke="#E8A33D" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.16"/>'
    + '<polyline points="1150,614 1214,594 1278,602 1342,568 1406,586 1476,546" fill="none" stroke="#E8A33D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<circle cx="1476" cy="546" r="12" fill="#E8A33D" opacity="0.16"/>'
    + '<circle cx="1476" cy="546" r="6" fill="#E8A33D"/>'
    + '<text x="90" y="770" fill="#6B7280" font-family="monospace" font-size="18" letter-spacing="3">STARTUP INTELLIGENCE · REAL-TIME · SOLO-BUILT</text>'
    + '</svg>');

// Self-drawn SVG cover for the DeepScout case (no stock photos): four signal
// sources (funding/patents/news/team) converging into a scan console, which
// resolves into a structured brief card — one field carries the amber
// UNVERIFIED exception, in the Neural Signal OS palette.
const DEEPSCOUT_SOURCE_YS = [140, 320, 500, 680];
const DEEPSCOUT_SOURCE_LABELS = ['FUNDING', 'PATENTS', 'NEWS', 'TEAM'];
const DEEPSCOUT_FIELD_YS = [178, 274, 370, 466, 562];
const DEEPSCOUT_FIELDS_SVG = DEEPSCOUT_FIELD_YS.map((y, i) => {
    const flagged = i === 3;
    const accent = flagged ? '#E8A33D' : '#35C2B0';
    return (flagged ? `<rect x="1068" y="${y - 3}" width="414" height="70" rx="12" fill="none" stroke="#E8A33D" stroke-width="6" opacity="0.14"/>` : '')
        + `<rect x="1072" y="${y}" width="406" height="64" rx="10" fill="#0C0E12" stroke="#232A36"/>`
        + `<rect x="1072" y="${y}" width="4" height="64" rx="2" fill="${accent}"/>`
        + `<circle cx="1454" cy="${y + 20}" r="4" fill="${accent}"/>`
        + `<rect x="1092" y="${y + 14}" width="130" height="9" rx="4.5" fill="#6B7280"/>`
        + `<rect x="1092" y="${y + 34}" width="${flagged ? 190 : 240}" height="11" rx="5.5" fill="${flagged ? '#E8A33D' : '#E9EEF6'}" opacity="${flagged ? 0.85 : 1}"/>`;
}).join('');
const DEEPSCOUT_HERO_IMAGE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">'
    + heroBackdrop('#35C2B0') + heroCorners
    + '<g stroke="#2A3140" stroke-width="2" fill="url(#hp)">'
    + DEEPSCOUT_SOURCE_YS.map(y => `<rect x="80" y="${y}" width="220" height="90" rx="12"/>`).join('')
    + '</g>'
    + '<g>' + DEEPSCOUT_SOURCE_YS.map(y => `<circle cx="104" cy="${y + 30}" r="5" fill="#35C2B0"/>`).join('') + '</g>'
    + '<g fill="#6B7280" font-family="monospace" font-size="13" letter-spacing="2">'
    + DEEPSCOUT_SOURCE_YS.map((y, i) => `<text x="122" y="${y + 35}">${DEEPSCOUT_SOURCE_LABELS[i]}</text>`).join('')
    + '</g>'
    + '<g fill="#2A303C">' + DEEPSCOUT_SOURCE_YS.map(y => `<rect x="104" y="${y + 52}" width="150" height="10" rx="5"/>`).join('') + '</g>'
    + '<g stroke="#35C2B0" stroke-width="6" fill="none" opacity="0.1">'
    + DEEPSCOUT_SOURCE_YS.map(y => `<path d="M300,${y + 45} C 420,${y + 45} 480,450 620,450"/>`).join('')
    + '</g>'
    + '<g stroke="#35C2B0" stroke-width="2" fill="none" opacity="0.4">'
    + DEEPSCOUT_SOURCE_YS.map(y => `<path d="M300,${y + 45} C 420,${y + 45} 480,450 620,450"/>`).join('')
    + '</g>'
    + '<rect x="650" y="170" width="330" height="560" rx="16" fill="url(#hp)" stroke="#2A3140" stroke-width="2"/>'
    + '<circle cx="680" cy="204" r="5" fill="#35C2B0"/>'
    + '<text x="696" y="209" fill="#F2F0EB" font-family="monospace" font-size="14" letter-spacing="2">DEEPSCOUT</text>'
    + '<text x="680" y="250" fill="#6B7280" font-family="monospace" font-size="12" letter-spacing="2">SCANNING SIGNAL SOURCES</text>'
    + '<rect x="680" y="272" width="270" height="150" rx="8" fill="#0C0E12" stroke="#232A36"/>'
    + '<defs><linearGradient id="dscan" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#35C2B0" stop-opacity="0"/><stop offset="0.5" stop-color="#35C2B0" stop-opacity="0.14"/><stop offset="1" stop-color="#35C2B0" stop-opacity="0"/></linearGradient></defs>'
    + '<rect x="680" y="272" width="270" height="150" fill="url(#dscan)"/>'
    + '<polyline points="690,360 720,352 745,330 770,375 795,340 820,352 845,320 870,346 895,335 920,352 940,346" fill="none" stroke="#35C2B0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.16"/>'
    + '<polyline points="690,360 720,352 745,330 770,375 795,340 820,352 845,320 870,346 895,335 920,352 940,346" fill="none" stroke="#35C2B0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<text x="680" y="456" fill="#6B7280" font-family="monospace" font-size="11" letter-spacing="1.5">RESOLVING STRUCTURED BRIEF</text>'
    + '<rect x="680" y="474" width="270" height="8" rx="4" fill="#1C2028"/>'
    + '<rect x="680" y="474" width="168" height="8" rx="4" fill="#35C2B0"/>'
    + '<g stroke="#333A47" stroke-width="1">' + [0, 67.5, 135, 202.5, 270].map(x => `<line x1="${680 + x}" y1="486" x2="${680 + x}" y2="490"/>`).join('') + '</g>'
    + '<g fill="#2A303C">'
    + [520, 552, 584].map((y, i) => `<rect x="680" y="${y}" width="${[220, 190, 150][i]}" height="9" rx="4.5"/>`).join('')
    + '</g>'
    + '<rect x="680" y="654" width="150" height="34" rx="17" fill="#12241F" stroke="#35C2B0"/>'
    + '<text x="704" y="676" fill="#35C2B0" font-family="monospace" font-size="11" letter-spacing="1.5">SCAN SIGNALS</text>'
    + '<g stroke="#35C2B0" stroke-width="2" fill="none" opacity="0.55"><path d="M980,450 C 1010,450 1010,450 1040,450"/></g>'
    + '<rect x="1040" y="120" width="470" height="660" rx="16" fill="url(#hp)" stroke="#2A3140" stroke-width="2"/>'
    + '<text x="1072" y="164" fill="#E8A33D" font-family="monospace" font-size="12" letter-spacing="2">SNAPSHOT</text>'
    + '<rect x="1072" y="180" width="230" height="16" rx="4" fill="#2A303C"/>'
    + DEEPSCOUT_FIELDS_SVG
    + '<rect x="1072" y="662" width="180" height="38" rx="19" fill="#35C2B0"/>'
    + '<text x="1102" y="686" fill="#08120F" font-family="monospace" font-size="11" letter-spacing="1.5">WORTH A CALL</text>'
    + '<text x="1268" y="686" fill="#6B7280" font-family="monospace" font-size="11" letter-spacing="1.5">2 MORE OPTIONS</text>'
    + '</svg>');

// Self-drawn SVG cover for the Field Journey case (no stock photos): a dotted
// route winding across three cream station cards — hospital, house, civic hall —
// each in its station accent, on the dark hero ground so the warm paper world
// is only hinted at before the page itself makes the turn.
const FIELD_HERO_IMAGE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">'
    + heroBackdrop('#D97841') + heroCorners
    // dotted route, lower-left to upper-right (glow layer beneath the crisp dashes)
    + '<path d="M60,790 C 200,730 240,650 330,608 C 470,545 650,525 800,438 C 950,350 1100,365 1270,308 C 1390,266 1470,225 1540,185" fill="none" stroke="#8A7E68" stroke-width="12" stroke-linecap="round" opacity="0.1"/>'
    + '<path d="M60,790 C 200,730 240,650 330,608 C 470,545 650,525 800,438 C 950,350 1100,365 1270,308 C 1390,266 1470,225 1540,185" fill="none" stroke="#8A7E68" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 26" opacity="0.85"/>'
    // station dots on the route, each with a soft halo ring
    + '<circle cx="330" cy="608" r="22" fill="none" stroke="#D97841" stroke-width="1.5" opacity="0.3"/>'
    + '<circle cx="800" cy="438" r="22" fill="none" stroke="#7A8B4E" stroke-width="1.5" opacity="0.3"/>'
    + '<circle cx="1270" cy="308" r="22" fill="none" stroke="#B08D57" stroke-width="1.5" opacity="0.3"/>'
    + '<circle cx="330" cy="608" r="11" fill="#D97841" stroke="#0C0E12" stroke-width="4"/>'
    + '<circle cx="800" cy="438" r="11" fill="#7A8B4E" stroke="#0C0E12" stroke-width="4"/>'
    + '<circle cx="1270" cy="308" r="11" fill="#B08D57" stroke="#0C0E12" stroke-width="4"/>'
    // station 1 card — hospital
    + '<g transform="rotate(-2 330 460)">'
    + '<rect x="222" y="398" width="236" height="164" rx="14" fill="#000" opacity="0.32"/>'
    + '<rect x="212" y="386" width="236" height="164" rx="14" fill="#F6EFE0"/>'
    + '<rect x="222" y="382" width="64" height="20" rx="2" fill="#D97841" opacity="0.35" transform="rotate(-6 254 392)"/>'
    + '<rect x="240" y="414" width="56" height="44" rx="5" fill="none" stroke="#D97841" stroke-width="4"/>'
    + '<path d="M268,424 v24 M256,436 h24" stroke="#D97841" stroke-width="4" stroke-linecap="round"/>'
    + '<rect x="316" y="418" width="104" height="12" rx="6" fill="#D8CCB2"/>'
    + '<rect x="316" y="440" width="76" height="12" rx="6" fill="#D8CCB2"/>'
    + '<rect x="240" y="482" width="180" height="10" rx="5" fill="#E7DDC6"/>'
    + '<rect x="240" y="504" width="142" height="10" rx="5" fill="#E7DDC6"/>'
    + '</g>'
    // station 2 card — house
    + '<g transform="rotate(1.6 800 290)">'
    + '<rect x="692" y="228" width="236" height="164" rx="14" fill="#000" opacity="0.32"/>'
    + '<rect x="682" y="216" width="236" height="164" rx="14" fill="#F6EFE0"/>'
    + '<rect x="852" y="212" width="64" height="20" rx="2" fill="#7A8B4E" opacity="0.35" transform="rotate(5 884 222)"/>'
    + '<path d="M708,262 L738,236 L768,262 M714,260 v28 h48 v-28" fill="none" stroke="#7A8B4E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<rect x="786" y="248" width="104" height="12" rx="6" fill="#D8CCB2"/>'
    + '<rect x="786" y="270" width="76" height="12" rx="6" fill="#D8CCB2"/>'
    + '<rect x="710" y="312" width="180" height="10" rx="5" fill="#E7DDC6"/>'
    + '<rect x="710" y="334" width="142" height="10" rx="5" fill="#E7DDC6"/>'
    + '</g>'
    // station 3 card — civic hall
    + '<g transform="rotate(-1.4 1270 160)">'
    + '<rect x="1162" y="98" width="236" height="164" rx="14" fill="#000" opacity="0.32"/>'
    + '<rect x="1152" y="86" width="236" height="164" rx="14" fill="#F6EFE0"/>'
    + '<rect x="1322" y="82" width="64" height="20" rx="2" fill="#B08D57" opacity="0.35" transform="rotate(-4 1354 92)"/>'
    + '<path d="M1178,124 L1208,106 L1238,124 M1184,130 v26 M1200,130 v26 M1216,130 v26 M1232,130 v26 M1178,160 h60" fill="none" stroke="#B08D57" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<rect x="1256" y="118" width="104" height="12" rx="6" fill="#D8CCB2"/>'
    + '<rect x="1256" y="140" width="76" height="12" rx="6" fill="#D8CCB2"/>'
    + '<rect x="1180" y="182" width="180" height="10" rx="5" fill="#E7DDC6"/>'
    + '<rect x="1180" y="204" width="142" height="10" rx="5" fill="#E7DDC6"/>'
    + '</g>'
    + '</svg>');

// Self-drawn SVG cover for the Brain, Mind & Learning case (no stock photos):
// a three-network connectogram — Frontoparietal (indigo), Salience (coral),
// Default Mode (amber) — in the same triangular arrangement as the real
// analysis figure, on the same dark hero ground as every other cover.
const BRAIN_HERO_IMAGE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">'
    + heroBackdrop('#5B6CF0') + heroCorners
    + '<defs>'
    + '<linearGradient id="eA" x1="0" y1="1" x2="0.5" y2="0">'
    + '<stop offset="0" stop-color="#5B6CF0"/><stop offset="1" stop-color="#E5734E"/>'
    + '</linearGradient>'
    + '<linearGradient id="eB" x1="1" y1="1" x2="0.5" y2="0">'
    + '<stop offset="0" stop-color="#E8A33D"/><stop offset="1" stop-color="#E5734E"/>'
    + '</linearGradient>'
    + '<linearGradient id="eC" x1="0" y1="0" x2="1" y2="0">'
    + '<stop offset="0" stop-color="#5B6CF0"/><stop offset="1" stop-color="#E8A33D"/>'
    + '</linearGradient>'
    + '<radialGradient id="gFPN" cx="0.5" cy="0.5" r="0.5">'
    + '<stop offset="0" stop-color="#5B6CF0" stop-opacity="0.20"/><stop offset="1" stop-color="#5B6CF0" stop-opacity="0"/>'
    + '</radialGradient>'
    + '<radialGradient id="gSN" cx="0.5" cy="0.5" r="0.5">'
    + '<stop offset="0" stop-color="#E5734E" stop-opacity="0.20"/><stop offset="1" stop-color="#E5734E" stop-opacity="0"/>'
    + '</radialGradient>'
    + '<radialGradient id="gDMN" cx="0.5" cy="0.5" r="0.5">'
    + '<stop offset="0" stop-color="#E8A33D" stop-opacity="0.18"/><stop offset="1" stop-color="#E8A33D" stop-opacity="0"/>'
    + '</radialGradient>'
    + '</defs>'
    + '<circle cx="500" cy="610" r="230" fill="url(#gFPN)"/>'
    + '<circle cx="900" cy="270" r="230" fill="url(#gSN)"/>'
    + '<circle cx="1180" cy="610" r="230" fill="url(#gDMN)"/>'
    + '<g fill="none" stroke-linecap="round">'
    + '<path d="M520,540 C 650,440 780,380 860,340" stroke="url(#eA)" stroke-width="6" opacity="0.9"/>'
    + '<path d="M960,340 C 1040,420 1100,480 1150,540" stroke="url(#eB)" stroke-width="6" opacity="0.9"/>'
    + '<path d="M570,620 C 750,650 950,650 1120,620" stroke="url(#eC)" stroke-width="5" opacity="0.75"/>'
    + '</g>'
    + '<circle cx="473" cy="620" r="60" fill="url(#gFPN)"/>'
    + '<circle cx="913" cy="297" r="60" fill="url(#gSN)"/>'
    + '<circle cx="1187" cy="597" r="60" fill="url(#gDMN)"/>'
    + '<g stroke="#5B6CF0" stroke-width="1" fill="none" opacity="0.25">'
    + '<path d="M480,560 C 460,600 440,630 440,660"/><path d="M480,560 C 495,600 500,620 500,640"/>'
    + '</g>'
    + '<g stroke="#E5734E" stroke-width="1" fill="none" opacity="0.25">'
    + '<path d="M880,300 C 900,280 915,265 920,260"/><path d="M920,260 C 930,290 935,310 940,330"/>'
    + '</g>'
    + '<g fill="#5B6CF0">'
    + '<circle cx="480" cy="560" r="14"/><circle cx="500" cy="640" r="14"/><circle cx="440" cy="660" r="10"/>'
    + '</g>'
    + '<g fill="#E5734E">'
    + '<circle cx="880" cy="300" r="14"/><circle cx="920" cy="260" r="14"/><circle cx="940" cy="330" r="10"/>'
    + '</g>'
    + '<g fill="#E8A33D">'
    + '<circle cx="1160" cy="560" r="14"/><circle cx="1180" cy="640" r="14"/><circle cx="1220" cy="590" r="10"/>'
    + '</g>'
    + '<g fill="#6B7280" font-family="monospace" font-size="12" letter-spacing="2">'
    + '<text x="410" y="700">FPN</text><text x="870" y="222">SN</text><text x="1150" y="690">DMN</text>'
    + '</g>'
    + '<g stroke="#262B35" stroke-width="2" opacity="0.7">'
    + [180, 260, 340, 420].map((y) => `<line x1="90" y1="${y}" x2="230" y2="${y}"/>`).join('')
    + '</g>'
    + '<g stroke="#35C2B0" stroke-width="7" fill="none" opacity="0.14"><path d="M1350,780 C 1380,740 1400,810 1420,770 C 1440,730 1460,800 1480,760 C 1500,730 1510,780 1520,750"/></g>'
    + '<g stroke="#35C2B0" stroke-width="2.5" fill="none" opacity="0.55">'
    + '<path d="M1350,780 C 1380,740 1400,810 1420,770 C 1440,730 1460,800 1480,760 C 1500,730 1510,780 1520,750"/>'
    + '</g>'
    + '</svg>');

export const PROJECTS = [
    {
        slug: 'emobot-plus', num: '01',
        category: 'AI Product · Digital Mental Health', zhCategory: 'AI 產品 · 數位心理健康',
        title: 'Emobot+', subtitle: 'Award-winning AI Mental Health Companion',
        zhTitle: 'Emobot+', zhSubtitle: '得獎 AI 數位心理支持系統',
        hook: "An award-winning AI mental-health companion that turns anonymous campus check-ins into trait-matched support, safety-aware dialogue, and counselor-ready insight.",
        zhHook: '一套得獎的校園 AI 心理支持系統，將匿名校園情緒議題轉化為特質媒合、風險感知對話與諮商量能解決方案的系統專案。',
        stack: ['React', 'FastAPI', 'LLM Safety', 'Psychological Embedding', 'Avatar UX', 'SDG 3'],
        role: 'Founder & Product Lead / UX Strategist', zhRole: '創辦人 / 產品負責人 / UIUX設計 / 前後端系統架構',
        timeline: '2025 – 2026', status: 'Award-winning MVP', zhStatus: '獲獎 MVP',
        impact: 'Silver Medal · 2025 AI Sustainability Contest', zhImpact: '2025 AI 跨域永續創新競賽 · 銀獎',
        heroBrief: {
            context: 'Students need a safe, low-barrier entry point before formal counselling.',
            zhContext: '學生在正式求助前，需要低門檻且安全的情緒支持入口。',
            problem: 'Disconnected companionship, risk detection, and handoff delay support.',
            zhProblem: '陪伴、風險辨識與專業轉介彼此斷裂，容易錯失支持時機。',
            strategy: 'Connect trait matching, safety-aware dialogue, and consent-based summaries.',
            zhStrategy: '串接心理特質媒合、風險感知對話與同意制諮商摘要。',
            delivery: '4 AI companion modes · React/FastAPI MVP · 2025 Silver Medal.',
            zhDelivery: '4 種 AI 陪伴角色・React／FastAPI MVP・2025 創新競賽銀獎。',
        },
        overview: `Emobot+ was created in response to a real gap in campus support: many students need a safe entry point to process emotions, understand their current state, or simply express what they are going through before they are ready to book formal counseling. At the same time, everyday emotional support and clinical intervention must remain clearly distinguished.

I designed Emobot+ as a bridge between students and professional support systems. It provides a low-barrier emotional entry point, a consent-based data-use flow, and a clear boundary between AI companionship and professional care.

The proposal won the Silver Medal at the 2025 AI Interdisciplinary Sustainability Innovation Contest. Its core positioning is a 24/7 emotional support system for university settings. Users can start with everyday language, while the system matches them with a suitable AI companion based on psychological traits, emotional needs, and support preferences.

Emobot+ is not designed to replace professional counseling. Instead, it helps students who have not yet formally sought help organize their emotions and build self-awareness. With user consent, it also turns emotional trends, issue tags, and risk signals into concise summaries that help counseling teams understand the context and continue support more effectively.`,
        zhOverview: `Emobot+ 源自一個真實的校園心理服務缺口：許多學生在正式預約諮商之前，已經需要一個能協助梳理情緒、理解狀態，或安全宣洩的入口；但日常情緒支持與臨床介入之間，也必須被清楚區分。

因此，我將 Emobot+ 設計成介於學生與專業支持系統之間的橋接產品。它提供低門檻的情緒入口、同意制資料使用流程，以及 AI 陪伴與專業之間明確的角色邊界與合作關係。

這份提案獲得 2025 AI 跨域永續創新競賽銀獎，核心定位是大學場域中的 24/7 情緒支持系統。使用者可以用日常語言開始對話，系統則根據心理特質、情緒需求與支持偏好，媒合到更合適的 AI 陪伴角色。

Emobot+ 並不是要取代專業諮商，而是協助校園中尚未正式求助的使用者，先完成初步情緒整理與自我覺察；並在使用者同意下，將情緒裝態、議題標籤與風險訊號整理成諮商端可快速理解的摘要，讓後續支持更容易銜接，同時降低諮商不足的量能問題。`,
        overviewSingle: "Emobot+ responds to a real gap in campus mental-health support: many students need a safe place to organize emotions before they are ready to book formal counselling. I designed it as a bridge rather than a clinical replacement, combining low-barrier check-ins, trait-based companion matching, four AI support modes, safety-aware dialogue, and consent-based summaries for counselling teams. The React and FastAPI MVP keeps a clear boundary between everyday emotional support and professional care, and the proposal won a Silver Medal at the 2025 AI Interdisciplinary Sustainability Innovation Contest.",
        zhOverviewSingle: "Emobot+ 回應校園心理支持的真實缺口：許多學生在正式預約諮商前，就需要一個安全且低門檻的情緒整理入口。我將產品定位為學生與專業支持之間的橋樑，而非臨床替代方案，整合心理特質媒合、四種 AI 陪伴角色、風險感知對話與同意制諮商摘要，同時清楚區分日常支持與專業介入。React／FastAPI MVP 並獲得 2025 AI 跨域永續創新競賽銀獎。",
        outcomes: ['Reworked the support journey from anonymous entry and companion matching to emotional conversation, safety routing, and counselor handoff.', 'Used psychological signals such as MBTI, attachment style, emotion regulation, and basic psychological needs to inform companion matching and conversational tone.', 'Designed a React + FastAPI system with psychological embeddings, emotion detection, risk phrase monitoring, and consent-based reporting while preserving professional boundaries.', 'Created a four-persona companion system for different support modes: validation, grounding, action planning, and cognitive reframing', 'Won Silver Medal at the 2025 AI Interdisciplinary Sustainability Innovation Contest and converted the award proposal into a portfolio-ready product case', 'Defined validation signals across PHQ-9 / GAD-7 / PANAS, self-disclosure, companionship, session depth, and qualitative user feedback'],
        zhOutcomes: ['重新整理校園心理支持流程，從匿名入口、陪伴角色媒合、情緒對話到諮商端銜接，形成一條更完整的求助旅程。', '把 人格特質、依附風格、情緒調節與基本心理需求等心理學理論，轉成 AI 角色媒合與對話調性的設計依據。', '規劃 React + FastAPI 架構，結合心理嵌入、情緒議題分析、風險語句偵測與同意制報告', '設計 React + FastAPI 架構，串接心理嵌入、情緒辨識、風險語句偵測等模組，保留人機協作的專業邊界。', '獲得 2025 AI 跨域永續創新競賽銀獎，並將競賽提案轉化為作品集中的產品案例', '定義 PHQ-9 / GAD-7 / PANAS、自我揭露、陪伴感、對話深度與質性訪談等驗證訊號'],
        tech: [{ label: 'Frontend', val: 'React 18, guided onboarding, responsive case UI, avatar-ready interaction surfaces' }, { label: 'Backend', val: 'FastAPI, Python services, consent-based session logging and report generation' }, { label: 'Matching', val: 'Psychological embedding with trait vectors, need signals, and conversation history' }, { label: 'AI Layer', val: 'LLM dialogue orchestration, BERT/NRC-style emotion analysis, topic tagging' }, { label: 'Avatar', val: 'D-ID / HeyGen / TTS-ready multimodal companion direction with voice and facial cues' }, { label: 'Safety', val: 'Risk phrase detection, escalation thresholds, counselor summary, professional resource routing' }],
    },
    {
        slug: 'deeptech-database', num: '02',
        category: 'Data Engineering · Deep Tech Industry Intelligence', zhCategory: '資料工程 · 深科技產業情報',
        title: 'Global Deep Tech Company Database', subtitle: 'Ecosystem Intelligence Infrastructure',
        zhTitle: '全球深科技企業資料庫', zhSubtitle: '產業生態情報資料基礎建設',
        hook: 'From fragmented deep-tech signals to a research-grade ecosystem intelligence database.',
        zhHook: '在工研院產科所的研究工作中，協助將分散在政府資料、公司登記、產業名錄與網頁來源裡的深科技資訊，整理成研究團隊能查找、比對與分析的資料庫。',
        stack: ['Python', 'Pandas', 'Playwright', 'SQL', 'Entity Resolution', 'Data Governance'],
        role: 'Research Assistant / Data Pipeline & Ecosystem Intelligence', zhRole: '資料管線與產業情報系統',
        timeline: '2024-Present', status: 'ITRI/ISTI research workflow', zhStatus: 'ITRI/ISTI 研究資料流程',
        impact: '230+ companies tracked / enriched', zhImpact: '230+ 家公司追蹤與資料補強',
        heroBrief: {
            context: 'Research teams need to find, verify, and track company information across sources.',
            zhContext: '研究團隊需要跨來源查找、核對與追蹤企業資訊。',
            problem: 'Inconsistent field schemas make manual spreadsheets difficult to maintain.',
            zhProblem: '欄位規格不一，人工表格難以維護。',
            strategy: 'Build a company master record with data lineage and quality-check workflows.',
            zhStrategy: '建立企業主檔、資料溯源與品質檢核流程。',
            delivery: '8 source categories integrated · 8 tables · 230+ companies tracked.',
            zhDelivery: '整合 8 類來源、8 張資料表，追蹤 230+ 家企業。',
        },
        overview: "I built a research-oriented data workflow that consolidates fragmented deep-tech and semiconductor ecosystem signals into a structured intelligence database. The system supports company tracking, source traceability, entity normalization, enrichment, and dashboard-ready outputs for research and strategic analysis.\n\nDeep-tech ecosystem research rarely starts with clean data. Company names change across sources, public pages have inconsistent formats, hiring and financial signals live in separate systems, and manual spreadsheets quickly become difficult to maintain.\n\nThis case reconstructs the work as a portfolio-safe data-system study. It shows source acquisition, raw staging, cleaning, entity resolution, relational database modeling, quality controls, and the research outputs enabled by the database.",
        zhOverview: "我建立一套研究導向的資料流程，將分散的深科技與半導體生態訊號整合成結構化情報資料庫。系統支援公司追蹤、來源追溯、實體標準化、欄位補強與儀表板輸出，協助研究與策略分析流程更有效率地運作。\n\n深科技生態研究通常不是從乾淨資料開始。公司名稱在不同來源中不一致，公開頁面格式不穩定，徵才與財務訊號分散在不同系統，手動表格也很快變得難以維護。\n\n本案例以作品集安全方式重構這段工作，呈現來源擷取、原始暫存、資料清理、實體解析、關聯式資料庫建模、品質控制，以及資料庫支援的研究輸出。",
        overviewSingle: `Deep-tech industry research rarely starts with complete and consistent data. The same company may use different names across sources, and public-page formats change frequently; financial, hiring, and technology information is scattered across different platforms, forcing researchers to repeatedly search, verify, and update records.

To reduce this repetitive work, I built a research-oriented data workflow covering source registration, raw-data preservation, company entity resolution, relational modeling, field enrichment, and quality checks. It turns fragmented information into an industry intelligence database that is queryable, comparable, and traceable.

The system currently supports ongoing tracking of 230+ companies, field-level provenance, dashboard outputs, and strategic analysis. This case reconstructs and presents its core workflow and design decisions without exposing sensitive internal data.`,
        zhOverviewSingle: `深科技產業研究，很少從完整且一致的資料開始。相同企業在不同來源中可能使用不同名稱，公開頁面的格式也經常改變；財務、徵才與技術資訊則分散在不同平台，使研究人員必須反覆搜尋、核對與更新資料。

為了降低這些重複工作，我建立一套研究導向的資料流程，涵蓋來源登錄、原始資料保存、企業實體解析、關聯式建模、欄位補強與品質檢核，將零散資訊整理成可查詢、可比對且可追溯的產業情報資料庫。

目前系統支援 230+ 家企業的持續追蹤、欄位溯源、儀表板輸出與策略分析。本案例在不揭露內部敏感資料的前提下，重構並呈現其中的核心流程與設計決策。`,
        outcomes: ['Consolidated fragmented public and manually maintained ecosystem signals into a reusable research database workflow', 'Modeled stable company entities with aliases, source rows, company-source relationships, profiles, tags, and update logs', 'Designed source traceability and quality controls around missing fields, stale sources, duplicate candidates, and conflicting values', 'Prepared dashboard-ready and map-ready outputs for company indexes, ecosystem segmentation, research briefs, and enriched dataset packages', 'Translated data engineering work into a high-fidelity portfolio case for AI product, UX research, frontend, and data platform roles'],
        zhOutcomes: ['將分散的公開與人工維護產業訊號整合成可重複使用的研究資料庫流程', '以公司實體為核心建模，串接 aliases、source_rows、company_sources、profiles、tags 與 update_logs', '圍繞缺失欄位、來源過期、重複候選與衝突值設計來源追溯與品質控制', '準備可接入儀表板與地圖的輸出，支援公司索引、生態分群、研究 brief 與補強資料包', '將資料工程工作轉譯為 AI 產品、UX 研究、前端與資料平台職能都能理解的高擬真案例'],
        tech: [{ label: 'Acquisition', val: 'Playwright for dynamic pages, structured requests for stable pages, manual spreadsheet ingestion, cache fallback' }, { label: 'Cleaning', val: 'Pandas normalization, missing-value flags, deduplication, alias mapping, column and type standardization' }, { label: 'Database Modeling', val: 'Canonical company entities, alias tables, source registry, source rows, join tables, update logs' }, { label: 'Quality Controls', val: 'Source traceability, stale-source checks, conflict handling, review queue, field-level confidence indicators' }, { label: 'Visualization', val: 'Power BI-ready tables, HTML ecosystem map, filterable intelligence views, research brief exports' }, { label: 'Portfolio Boundary', val: 'Public-safe reconstruction with sample displays instead of confidential company-level records' }],
        // Self-drawn SVG cover (no stock photos): a data-room console wireframe in the Neural Signal OS palette.
        caseHeroImage: DEEPTECH_HERO_IMAGE,
        storyIntro: {
            kicker: 'DATA ROOM DOSSIER', zhKicker: '資料室檔案',
            title: 'Every record can be traced back to its source', zhTitle: '每筆資料，都能回到它的來源',
            lead: 'Eight source categories, eight relational tables, and records for 230+ companies turn continuously changing public information into a data foundation that research teams can query, verify, and reuse.',
            zhLead: '整合 8 類資料來源、8 張關聯式資料表與 230+ 家企業紀錄，將持續變動的公開資訊整理成研究團隊可查詢、可核對、可重複使用的資料基礎。',
            motif: 'grid',
        },
        caseCoverCaption: 'Data workflow / interactive prototype / system evidence',
        zhCaseCoverCaption: '資料流程 / 互動原型 / 系統證據',
        caseDeck: {
            eyebrow: 'Data room',
            zhEyebrow: '資料室',
            title: 'Turn fragmented public information into trustworthy research data',
            zhTitle: '把分散的公開資訊，整理成可信的研究資料',
            body: 'Built around a canonical company record, the system connects raw source records with enriched fields. Every record retains its origin, update time, and processing status, so research teams can see not only the cleaned result but also return to the original source data to verify it.',
            zhBody: '以企業主檔為核心，串接來源原始紀錄與補強欄位。每筆資料都保留出處、更新時間與處理狀態，讓研究團隊不只看見整理後的結果，也能回到原始資料進行核對。',
            kpis: [
                { label: 'Sources', value: '8', zhLabel: '來源' },
                { label: 'Tables', value: '8', zhLabel: '資料表' },
                { label: 'Companies', value: '230+', zhLabel: '公司數' },
            ],
            signals: ['Source registration', 'Entity resolution', 'Data modeling', 'Quality checks', 'Research delivery'],
            zhSignals: ['來源登錄', '實體解析', '資料建模', '品質檢核', '研究交付'],
        },
        storyMoments: [
            { iconKey: 'database', title: 'Separate sources before integrating information', zhTitle: '先分清來源，再整合資訊', body: 'Company registries, job pages, industry directories, and manual spreadsheets are recorded separately with their access methods, update frequencies, and use restrictions before entering subsequent processing, preventing data with different levels of reliability from being directly mixed.', zhBody: '公司登記、徵才頁、產業名錄與人工表格，會分別記錄取得方式、更新頻率與使用限制，再進入後續整理流程，避免不同可信程度的資料被直接混用。' },
            { iconKey: 'layers', title: 'Identify the same company clearly', zhTitle: '把同一家公司辨認清楚', body: 'Through company-name normalization, alias management, and cross-source comparison, records from different websites are consolidated into a consistent company master record. Each merge retains its rationale and source trail, reducing duplicate records and incorrect matches.', zhBody: '透過公司名稱正規化、別名整理與跨來源比對，將不同網站中的紀錄歸併至一致的企業主檔。每次合併都保留判斷依據與來源軌跡，降低重複建檔與錯誤配對。' },
            { iconKey: 'check', title: 'Make every data point evidence-backed', zhTitle: '讓每項資料都有證據', body: 'Add field checks, version records, and source tracking between the raw data and the dashboard. When researchers question a specific value, they can quickly return to the original source and processing record to verify it.', zhBody: '在原始資料與儀表板之間加入欄位檢核、版本記錄與來源追蹤。當研究人員對某項數據提出疑問時，可以快速回到原始來源與處理紀錄進行確認。' },
        ],
        // Outcomes deep-link into the Research Database Console modules (src/components/dataroom/).
        outcomeModules: [
            { num: '01', id: 'dt-m01' },
            { num: '03', id: 'dt-m03' },
            { num: '05', id: 'dt-m05' },
            { num: '07', id: 'dt-m07' },
            { num: '02', id: 'dt-m02' },
        ],
        storyChapters: [
            { iconKey: 'activity', label: 'Signal', zhLabel: '訊號', title: 'Register every source as a signal, not a script', zhTitle: '把每個來源登錄為訊號，而不是腳本', body: 'The work starts by treating MOPS, 104, TSIA, SEMI, ASIP, startup lists, news, and manual sheets as registered signals — each with an access method, a cadence, and a set of trusted fields — instead of one-off scraping scripts.', zhBody: '這項工作從把 MOPS、104、TSIA、SEMI、ASIP、新創名單、新聞與人工表格登錄為有登記的訊號開始 — 各自附帶取得方式、更新頻率與可信欄位 — 而不是一次性的爬蟲腳本。', artifact: 'Source registry', zhArtifact: '來源登錄表' },
            { iconKey: 'layers', label: 'Identity', zhLabel: '身份', title: 'Turn unstable names into one canonical entity', zhTitle: '把不穩定的名稱整理成單一標準實體', body: 'Chinese names, English aliases, and renamed entities get mapped to one canonical company profile through a confidence-scored alias workbench, with every merge decision kept reviewable.', zhBody: '中文名稱、英文別名與更名資訊，透過帶有可信度評分的別名工作台對應到單一標準公司檔案，每個合併判斷都保持可被審核。', artifact: 'Alias resolution log', zhArtifact: '別名解析紀錄' },
            { iconKey: 'database', label: 'Model', zhLabel: '建模', title: 'Model a database, not a spreadsheet archive', zhTitle: '建立資料庫模型，而不是試算表堆疊', body: 'Eight relational tables carry the evidence: raw rows stay traceable, canonical companies stay stable, and every enriched field can point back to the source that proved it.', zhBody: '八個關聯式資料表承載證據：原始列保持可追溯、標準公司實體保持穩定，每個補強欄位都能指回證明它的來源。', artifact: 'Relational schema', zhArtifact: '關聯式 schema' },
            { iconKey: 'shield', label: 'Quality', zhLabel: '品質', title: 'Make uncertainty visible instead of silent', zhTitle: '讓不確定性可見，而不是靜默發生', body: 'Six quality gates check coverage, traceability, identity control, freshness, and conflicts — a disagreement between two trusted sources gets held for review, never silently overwritten.', zhBody: '六個品質閘門檢查覆蓋範圍、來源追溯、身份控制、更新鮮度與衝突 — 兩個可信來源間的分歧會被保留審核，絕不會被靜默覆寫。', artifact: 'Quality gate board', zhArtifact: '品質閘門看板' },
            { iconKey: 'check', label: 'Delivery', zhLabel: '交付', title: 'Ship outputs that still carry their evidence', zhTitle: '交付仍保有證據脈絡的輸出', body: 'Company indexes, ecosystem maps, dashboards, research briefs, and dataset packages are exported from the same database — each traceable back to its source tables through the provenance ledger.', zhBody: '公司索引、生態地圖、儀表板、研究 brief 與資料包，全部從同一個資料庫匯出 — 每一項都能透過溯源台帳追溯回其來源資料表。', artifact: 'Decision surfaces', zhArtifact: '決策輸出' },
        ],
        pullQuote: 'The challenge was not collecting more data. It was turning unstable public signals into a reusable research asset.',
        zhPullQuote: '真正的挑戰不是蒐集更多資料，而是把不穩定的公開訊號整理成可重複使用的研究資產。',
        awards: [],
    },
    {
        slug: 'ai-product-launch-os', num: '03',
        category: 'AI Product Strategy · Launch Decision System', zhCategory: 'AI 產品策略 · 上市決策系統',
        flushHeroToOverview: true,
        title: 'AI Product Launch OS', subtitle: 'Cinematic Launch Case Study',
        zhTitle: 'AI Product Launch OS', zhSubtitle: 'AI 產品上市敘事案例',
        hook: 'A launch studio for turning fuzzy market signals into a sharp product bet, a credible story, and a decision system teams can act on.',
        zhHook: '一套面向 AI 產品早期驗證與上市準備的決策系統，協助團隊把市場訊號、使用者痛點、模型邊界與商業敘事整理成可執行的產品路線。',
        stack: ['AI Product Strategy', 'GTM Planning', 'Roadmap design', 'Metric Tree', 'UX Research', 'React Prototype'],
        role: 'AI Product Manager / Product Designer', zhRole: 'AI 產品經理 / 產品設計師',
        timeline: '2025 – 2026', status: 'Applied Capstone · Portfolio Case', zhStatus: '應用型 Capstone · 作品集案例',
        impact: 'Launch workflow aligned with AI PM, analytics, and GTM evidence', zhImpact: '建立一套從原型到上市驗證的產品決策流程',
        heroBrief: {
            context: 'AI teams need aligned product, model, and market evidence before launch.',
            zhContext: 'AI 團隊需在投入上市前，對齊產品、模型與市場證據。',
            problem: 'Scattered signals leave the product bet vague and hard to govern.',
            zhProblem: '市場訊號、風險與驗證依據分散，產品賭注難以決策。',
            strategy: 'Unify opportunity, risk, metrics, and rollout gates in one launch cockpit.',
            zhStrategy: '用同一工作台整合機會、風險、指標與上市門檻。',
            delivery: '4 launch loops · 3 evidence walls · 7 decision gates.',
            zhDelivery: '4 組產品定位判斷・3 組驗證依據・7 道上市門檻。',
        },
        overview: "AI Product Launch OS is written as a launch studio, not a certificate showcase. The story begins in the messy middle: a team sees AI opportunity everywhere, but the signals are scattered across customer pain, competitive pressure, model feasibility, data readiness, compliance risk, and unclear buyer urgency.\n\nI turned that ambiguity into a working product narrative: what problem is worth solving, which user moment creates urgency, what should be built first, how the launch should be staged, and which metrics tell us whether the product is becoming useful rather than merely impressive.\n\nThe interface is designed like a room where product, design, engineering, and go-to-market can work from the same wall. Each panel has a job: signal scan, launch bet, roadmap, metric tree, risk register, stakeholder story, and learning loop. Credentials sit in the evidence area as support, while the body of the case focuses on product judgment and execution logic.",
        zhOverview: "AI Product Launch OS 是一套為 AI 產品早期驗證與上市準備設計的決策工作台。這個專案從最混亂的階段開始：團隊看見許多可能的 AI 機會，但訊號分散在使用者痛點、競品壓力、模型可行性、資料準備度、合規風險與不明確的商業敘事之中。我將這些不確定性整理成一套可以被團隊共同使用的產品流程：先釐清哪個問題值得解、哪個使用者情境最有急迫性，再進一步判斷 AI 應該介入到哪裡、第一版產品應該做到什麼程度，以及上市前需要哪些證據支持團隊投入資源。整體介面被設計成產品、設計、工程與 go-to-market，讓產品上市討論不只停留在想法，而能被拆解成可驗證追蹤的產品判斷。",
        overviewSingle: "AI Product Launch OS turns scattered customer, market, model, data, and compliance signals into a shared launch workflow. I designed it as a working studio for product, design, engineering, and go-to-market teams to decide which problem is worth solving, where AI creates real value, what the first release must prove, and how rollout risk should be governed. Signal scans, a launch thesis, roadmap, metric tree, risk register, stakeholder narrative, and learning loops connect the initial opportunity to measurable evidence, keeping the case focused on product judgment rather than credentials.",
        zhOverviewSingle: "AI Product Launch OS 將分散在使用者痛點、競品壓力、模型可行性、資料準備度與合規風險中的訊號，整理成跨團隊共用的上市決策流程。我把它設計成產品、設計、工程與 go-to-market 能共同工作的工作台，協助判斷哪個問題值得解、AI 應介入何處、第一版必須證明什麼，以及上市風險如何被管理；並以訊號掃描、產品賭注、路線圖、指標樹、風險清單與學習迴圈，將機會轉成可追蹤的產品證據。",
        outcomes: ['Built a product narrative that moves from market ambiguity to a focused launch bet and measurable learning agenda', 'Designed a launch cockpit that connects customer urgency, model readiness, UX risk, roadmap sequencing, and GTM messaging', 'Created an executive-friendly metric tree linking activation, workflow value, trust, retention, and risk reduction', 'Structured the rollout as four learning loops: concept room, pilot corridor, launch theatre, and post-launch signal review', 'Positioned credentials as evidence of discipline while keeping the case centered on product strategy and team decision-making'],
        zhOutcomes: ['建立從市場模糊性到明確上市賭注與可衡量學習議程的產品敘事', '設計上市 cockpit，串接使用者急迫性、模型準備度、UX 風險、路線圖排序與 GTM 訊息', '建立適合主管閱讀的指標樹，連結 activation、workflow value、trust、retention 與風險降低', '將 rollout 拆成四個學習迴圈：concept room、pilot corridor、launch theatre 與 post-launch signal review', '將證照作為紀律佐證，但案例核心仍聚焦產品策略與團隊決策'],
        tech: [{ label: 'Product Strategy', val: 'Opportunity framing, launch thesis, roadmap sequencing, stakeholder narrative' }, { label: 'AI PM Layer', val: 'Model-risk assumptions, data readiness, human-in-the-loop workflow, launch gates' }, { label: 'Analytics', val: 'Metric tree, activation / retention / trust metrics, experiment design' }, { label: 'GTM Design', val: 'Positioning, buyer story, adoption loop, launch communication plan' }, { label: 'Prototype', val: 'React story interface, glass panels, live cockpit, responsive image system' }, { label: 'Evidence', val: 'IBM AI PM, Google PM, Google Advanced Data Analytics credentials' }],
        // Self-drawn SVG cover (no stock photos on this case): cockpit wireframe in the Neural Signal OS palette.
        caseHeroImage: 'data:image/svg+xml;utf8,' + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">'
            + heroBackdrop('#35C2B0') + heroCorners
            + '<g stroke="#2A3140" stroke-width="3" fill="url(#hp)">'
            + '<rect x="120" y="140" width="340" height="620" rx="16"/>'
            + '<rect x="520" y="140" width="560" height="620" rx="16"/>'
            + '<rect x="1140" y="140" width="340" height="620" rx="16"/>'
            + '</g>'
            + '<g fill="#3D4658">'
            + '<circle cx="150" cy="170" r="5"/><circle cx="550" cy="170" r="5"/><circle cx="1170" cy="170" r="5"/>'
            + '</g>'
            + '<g fill="#6B7280" font-family="monospace" font-size="12" letter-spacing="2">'
            + '<text x="170" y="175">ROADMAP</text><text x="570" y="175">LAUNCH COCKPIT</text><text x="1190" y="175">SIGNALS</text>'
            + '</g>'
            + '<g fill="#35C2B0">'
            + '<circle cx="160" cy="238" r="4"/><circle cx="160" cy="318" r="4"/><circle cx="160" cy="398" r="4"/><circle cx="160" cy="478" r="4"/>'
            + '</g>'
            + '<circle cx="160" cy="558" r="4" fill="#E8A33D"/>'
            + '<g stroke="#4A5262" stroke-width="5" stroke-linecap="round">'
            + '<path d="M180 240h240M180 320h200M180 400h240M180 480h170M180 560h220"/>'
            + '</g>'
            + '<circle cx="1350" cy="230" r="46" fill="none" stroke="#232A36" stroke-width="10"/>'
            + '<circle cx="1350" cy="230" r="46" fill="none" stroke="#35C2B0" stroke-width="10" stroke-linecap="round" stroke-dasharray="215 289" transform="rotate(-90 1350 230)"/>'
            + '<text x="1350" y="238" fill="#F2F0EB" font-family="monospace" font-size="20" text-anchor="middle">74%</text>'
            + '<g stroke="#35C2B0" stroke-width="10" stroke-linecap="round" fill="none" opacity="0.14"><path d="M560 640l90-70 80 30 110-90 90 20 100-60"/></g>'
            + '<g stroke="#35C2B0" stroke-width="6" stroke-linecap="round" fill="none">'
            + '<path d="M560 640l90-70 80 30 110-90 90 20 100-60"/>'
            + '<circle cx="560" cy="240" r="12" fill="#35C2B0" stroke="none"/>'
            + '<circle cx="560" cy="320" r="12" fill="#35C2B0" stroke="none" opacity="0.6"/>'
            + '</g>'
            + '<circle cx="1000" cy="580" r="7" fill="#35C2B0" opacity="0.16"/>'
            + '<circle cx="1000" cy="580" r="12" fill="#E8A33D" opacity="0.18"/><circle cx="1000" cy="580" r="6" fill="#E8A33D"/>'
            + '<g fill="#35C2B0"><circle cx="1160" cy="260" r="9"/><circle cx="1160" cy="380" r="9"/><circle cx="1160" cy="500" r="9"/></g>'
            + '<circle cx="1160" cy="620" r="9" fill="#E8A33D"/>'
            + '<rect x="620" y="220" width="360" height="18" rx="9" fill="#2A303C"/>'
            + '<rect x="620" y="220" width="230" height="18" rx="9" fill="#35C2B0" opacity="0.7"/>'
            + '<text x="990" y="234" fill="#6B7280" font-family="monospace" font-size="11">64%</text>'
            + '<rect x="620" y="300" width="360" height="18" rx="9" fill="#2A303C"/>'
            + '<rect x="620" y="300" width="150" height="18" rx="9" fill="#35C2B0" opacity="0.5"/>'
            + '<text x="990" y="314" fill="#6B7280" font-family="monospace" font-size="11">42%</text>'
            + '</svg>'),
        storyIntro: {
            kicker: 'LAUNCH CONTROL', zhKicker: '上市控制室',
            title: 'Make the bet testable', zhTitle: '把賭注拆成可驗證的節奏',
            lead: 'A launch cockpit that turns scattered signals — customer urgency, model risk, rollout timing — into one wall a team can argue from before committing resources.',
            zhLead: '一座上市駕駛艙，把使用者急迫性、模型風險與推進節奏整理成同一面牆，讓團隊在投入資源前，能對著同一份依據討論。',
            motif: 'pulse',
        },
        caseDeck: {
            eyebrow: 'Launch cockpit',
            zhEyebrow: '上市駕駛艙',
            title: 'From fuzzy opportunity to launch-room clarity',
            zhTitle: '讓AI產品的不確定性 推進成可討論的上市決策',
            body: 'A high-signal workspace for reviewing the product bet, the user moment, the rollout path, and the evidence needed before a team commits resources.',
            zhBody: '整理 AI 產品上市前的關鍵判斷：需求是否急迫、規格是否清楚、資料模型是否準備好，以及風險是否需要人工審查',
            kpis: [
                { label: 'Launch loops', value: '4', zhLabel: '產品定位判斷' },
                { label: 'Evidence walls', value: '3', zhLabel: '驗證依據' },
                { label: 'Decision gates', value: '7', zhLabel: '上市路徑' },
            ],
            signals: ['Customer urgency', 'Data readiness', 'Model risk', 'Adoption story', 'Post-launch learning'],
            zhSignals: ['使用情境', '需求痛點', '模型邊界', '採用路徑', '迭代學習'],
        },
        storyMoments: [
            { iconKey: 'target', title: 'The product bet', zhTitle: '產品定位判斷', body: 'Name the user, the painful workflow, the promised shift, and the reason now is the right time to launch.', zhBody: '釐清目標使用者、核心痛點、產品承諾與為什麼現在值得投入。' },
            { iconKey: 'chart', title: 'The evidence wall', zhTitle: '驗證依據', body: 'Bring research notes, metrics, risk assumptions, and credential proof into one readable surface.', zhBody: '整合研究訊號、產品指標、模型限制與風險假設，讓上市判斷有跡可循。' },
            { iconKey: 'trend', title: 'The launch rhythm', zhTitle: '上市路徑', body: 'Move from internal conviction to pilot learning, public story, adoption review, and roadmap correction.', zhBody: '從內部對齊、pilot 驗證、公開敘事到採用回顧，建立可持續修正的推進節奏。' },
        ],
        // Gallery replaced by six interactive evidence modules (src/components/launch-os/)
        outcomeModules: [
            { num: '04', id: 'los-module-prd' },
            { num: '01', id: 'los-module-cockpit' },
            { num: '02', id: 'los-module-metric-tree' },
            { num: '03', id: 'los-module-research' },
            { num: '05', id: 'los-module-risk' },
        ],
        storyChapters: [
            { iconKey: 'activity', label: 'Signal', zhLabel: '訊號', title: 'Listen for the pattern behind the noise', zhTitle: '在零散訊號中，找出值得投入的產品機會', body: 'The launch story starts before the roadmap. I scan market reports, workflow complaints, competitor moves, data availability, and policy pressure, then turn them into a one-page opportunity brief that explains why this problem is becoming urgent now.', zhBody: '產品上市不從 Roadmap 開始，而是從判斷哪些訊號值得追蹤。從整理市場趨勢、使用者需求、競品動態、資料條件與政策壓力，將零散資訊收斂成一份機會 Opportunity Brief，說明這個問題為什麼現在值得被解決。', artifact: 'Opportunity brief', zhArtifact: 'Opportunity Brief slide' },
            { iconKey: 'target', label: 'Problem', zhLabel: '定義', title: 'Make the launch bet small enough to test', zhTitle: '把 AI 市場機會，收斂成可被驗證的產品問題', body: 'Instead of saying “build an AI product,” the case names a concrete user moment: what the user is trying to finish, what currently slows them down, what trust barrier blocks adoption, and which decision will improve if the product works.', zhBody: '不停留在「做一個 AI 產品」的模糊目標，而是將機會收斂到具體的使用者情境：使用者想完成什麼、現在被什麼卡住、哪個信任障礙影響採用，以及如果產品真的有效，哪個決策或流程會因此變好。', artifact: 'User moment map', zhArtifact: '關鍵情境地圖' },
            { iconKey: 'layers', label: 'OS', zhLabel: '系統', title: 'Design a launch room, not a static deck', zhTitle: '將上市討論設計成一個可操作的工作台', body: 'The OS behaves like a shared workspace: roadmap, evidence board, risk register, metric tree, and stakeholder story all sit together. The design goal is to help a team argue clearly, decide faster, and know what evidence is still missing.', zhBody: '將這套 OS 設計成團隊共用的產品工作介面，將 roadmap、驗證依據、風險登錄、指標樹與利害關係人敘事放在同一個介面中。目標不僅是做一份漂亮簡報，而是讓團隊能更快對齊判斷、看見缺口，並決定下一步要驗證什麼。', artifact: 'Launch cockpit', zhArtifact: '上市決策台' },
            { iconKey: 'trend', label: 'Launch', zhLabel: '推進', title: 'Turn rollout into a living rhythm', zhTitle: '把產品從一次發布，提升成可追蹤的推進節奏', body: 'The launch plan moves through concept room, pilot corridor, beta narrative, public release, and post-launch signal review. Each step has a threshold, a learning question, and a visible owner so momentum does not depend on memory.', zhBody: '將上市流程拆成概念驗證、pilot 測試等。每個階段都對應明確的決策門檻、迭代問題與負責人，讓團隊知道現在推進到哪裡、還缺什麼，以及下一步是否值得繼續投入。', artifact: 'Rollout rhythm', zhArtifact: '上市推進圖' },
            { iconKey: 'check', label: 'Evidence', zhLabel: '證據', title: 'Let the artifacts do the talking', zhTitle: '用可交付成果，證明產品判斷', body: 'The credentials are deliberately placed beside product artifacts rather than above them. The viewer should remember the work: PRD excerpts, launch checklist, stakeholder map, metric tree, risk notes, and the way decisions connect.', zhBody: '從具體的產品產出脈絡中，生成 PRD 摘要、上市檢查表、利害關係人地圖、指標樹、風險筆記與決策紀錄。', artifact: 'Evidence wall', zhArtifact: '成果證據版' },
        ],
        pullQuote: 'The strongest AI launch story is not “we used AI.” It is “we changed a decision, reduced a risk, and learned faster than the old workflow.”',
        zhPullQuote: 'AI 產品真正有說服力的上市敘事，不是「我們應用了 AI」，而是它改善了哪個決策、降低了什麼風險，以及如何讓團隊比舊流程更快學習',
        certWall: [
            { img: 'ibm-ai-product-manager.webp', name: 'IBM AI Product Manager', zhName: 'IBM AI 產品經理專業證書', issuer: 'IBM',
                focus: 'AI product strategy, model risk, productization judgment — applied in the risk register and model card (Module 05)',
                zhFocus: 'AI 產品策略、模型風險與產品化判斷——應用於風險登錄與模型卡（Module 05）' },
            { img: 'google-project-management.webp', name: 'Google Project Management', zhName: 'Google 專案管理專業證書', issuer: 'Google',
                focus: 'Roadmap planning, stakeholder communication, launch governance — applied in the decision gates (Module 01)',
                zhFocus: '路線圖規劃、利害關係人溝通與上市治理——應用於決策門檻（Module 01）' },
            { img: 'google-advanced-data-analytics.webp', name: 'Google Advanced Data Analytics', zhName: 'Google 進階資料分析專業證書', issuer: 'Google',
                focus: 'Metric design, experiment framing, evidence-backed decisions — applied in the metric tree (Module 02)',
                zhFocus: '指標設計、實驗框架與證據導向決策——應用於指標樹（Module 02）' },
        ],
        awards: [],
    },
    {
        slug: 'ai-news-intelligence', num: '04',
        category: 'AI System · Data Pipeline', zhCategory: 'AI 系統 · 資料管線',
        title: 'AI News Intelligence System', subtitle: 'Automated Tech Trend Analysis & Reporting',
        zhTitle: 'AI 新聞情報系統', zhSubtitle: '自動化科技趨勢分析與報告',
        hook: 'Turning the firehose of global tech news into structured strategic intelligence — automatically, bilingually, daily. I designed the AI system and the platform that delivers it, end to end, solo.',
        zhHook: '將全球科技新聞的海量資訊，自動轉化為雙語結構化策略情報，每日更新。AI 系統與交付它的平台，都由我獨立從頭到尾設計。',
        stack: ['Python', 'Gemini 1.5', 'GPT-4o', 'Playwright', 'Trafilatura', 'Notion API'],
        role: 'System Architect & Lead Developer', zhRole: '系統架構師 / 主任開發者',
        timeline: '2024 – Present', status: 'Production · Daily runs', zhStatus: '上線運作 · 每日執行',
        impact: 'Cost reduced 75% (GPT→Gemini)', zhImpact: '成本降低 75%（GPT→Gemini）',
        heroBrief: {
            context: 'Strategy teams need a daily, traceable view of global tech news.',
            zhContext: '策略團隊需要每日掌握可追溯的全球科技動態。',
            problem: 'Manual reading cannot keep pace with volume, language, or source churn.',
            zhProblem: '人工閱讀跟不上資訊量、雙語處理與來源變動。',
            strategy: 'Automate crawl, extraction, scoring, bilingual summary, and publishing.',
            zhStrategy: '自動串接爬取、萃取、評分、雙語摘要與發布流程。',
            delivery: '6 sources · daily bilingual briefings · 75% lower run cost.',
            zhDelivery: '6 個來源・每日雙語簡報・單次成本降低 75%。',
        },
        overview: "The challenge: ITRI's deep tech team needs to stay current on global AI, semiconductor, and frontier science news — but manually curating that volume is infeasible at scale.\n\nThis system crawls 6+ sources (TechCrunch, MIT Tech Review, TechNews 科技新報, INSIDE 硬塞, TechNewsWorld, and domain feeds), extracts full text via Trafilatura and Playwright, and feeds a multi-stage Gemini/GPT pipeline that scores relevance, extracts entities, generates strategic summaries, and publishes to Notion.\n\nKey decisions: iterative prompt refinement, native bilingual output (EN/ZH), and a GPT-4o → Gemini migration that cut per-run costs ~75% while maintaining quality.\n\nThe briefings land on a real delivery surface: the /insights feed of the Strategy Intelligence Platform, which I also designed and built. The Evidence Layer below opens the whole workshop — the research, the prompt evaluations, the model tradeoffs, the interface decisions, and the MVP that still runs.",
        zhOverview: "挑戰在於：工研院深科技團隊需要持續追蹤全球 AI、半導體與前沿科學動態——但手動策展如此大量的資訊在規模上並不可行。\n\n此系統爬取 6+ 個來源，透過 Trafilatura 和 Playwright 提取完整文章文本，並饋入多階段 Gemini/GPT 管線進行相關性評分、實體提取、策略摘要生成，最後將格式化報告發布至 Notion。\n\n關鍵工程決策：迭代式提示工程、原生雙語輸出（EN/ZH），以及從 GPT-4o 遷移至 Gemini，在維持輸出品質的同時將每次執行成本降低約 75%。\n\n這些簡報有一個真實的交付面：Strategy Intelligence Platform 的 /insights 動態，那個平台也是我設計並開發的。下方的證據層打開了整個工作間——研究、提示評測、模型取捨、介面決策，以及到現在還在跑的 MVP。",
        overviewSingle: "To help ITRI's deep-tech team track global AI, semiconductor, and frontier-science developments at scale, I built an automated intelligence pipeline that crawls more than six sources, extracts full text with Trafilatura and Playwright, and uses a multi-stage Gemini/GPT workflow for relevance scoring, entity extraction, and strategic summarization. Iterative prompt evaluation and native bilingual output improved delivery quality, while migrating from GPT-4o to Gemini reduced per-run cost by about 75%. The resulting briefings publish to Notion and the Strategy Intelligence Platform's insights feed, where the MVP remains an active delivery system.",
        zhOverviewSingle: "為協助工研院深科技團隊持續追蹤全球 AI、半導體與前沿科學動態，我建立自動化情報管線，爬取 6+ 個來源，透過 Trafilatura 與 Playwright 擷取全文，再以多階段 Gemini／GPT 流程完成相關性評分、實體提取與策略摘要。迭代式提示評測與原生中英雙語輸出提升交付品質，而從 GPT-4o 遷移至 Gemini 後，每次執行成本約降低 75%；最終簡報會發布至 Notion 與 Strategy Intelligence Platform 的 insights 動態，形成仍在運作的交付系統。",
        outcomes: ['6-source crawler with Playwright + Trafilatura, handling JS-heavy and static sites', 'Multi-stage LLM pipeline: relevance scoring → entity extraction → strategic summary', 'Native bilingual output (EN + ZH-TW) with consistent formatting', 'Automated Notion publishing with structured database entries', 'Cost optimization: GPT-4o → Gemini, ~75% cost reduction per run'],
        zhOutcomes: ['建立 6 源爬蟲，以 Playwright + Trafilatura 處理 JS 密集與靜態頁面', '多階段 LLM 管線：相關性評分 → 實體提取 → 策略摘要', '原生雙語輸出（EN + ZH-TW），格式一致', '自動化 Notion 發布，建立結構化資料庫條目', '成本優化：GPT-4o → Gemini，每次執行成本降低約 75%'],
        tech: [{ label: 'Crawler', val: 'Playwright, Trafilatura, feedparser, httpx' }, { label: 'AI Layer', val: 'Gemini 1.5 Pro, GPT-4o (legacy), prompt chaining' }, { label: 'Pipeline', val: 'Python async, multi-stage processing, retry logic' }, { label: 'Output', val: 'Notion API, structured database, Markdown reports' }, { label: 'Sources', val: 'TechCrunch, MIT TR, TechNews, INSIDE, TNW + feeds' }, { label: 'Quality', val: 'Entity deduplication, relevance scoring, date normalization' }],
        caseHeroImage: NEWS_HERO_IMAGE,
        storyIntro: {
            kicker: 'DAILY SIGNAL DESK', zhKicker: '每日訊號台',
            title: 'The firehose, filed by breakfast', zhTitle: '早餐前，馴服新聞消防栓',
            lead: 'Six sources, five pipeline stages, one dated bilingual briefing a day — from raw crawl to a claim a strategy team can trace back to the article that made it.',
            zhLead: '六個來源、五段管線、每天一份有日期的雙語簡報——從爬取原文，到策略團隊能追溯回原始報導的主張。',
            motif: 'wave',
        },
        caseDeck: {
            eyebrow: 'Newsroom pipeline', zhEyebrow: '編輯室管線',
            title: 'From a global news firehose to a dated, sourced briefing',
            zhTitle: '把全球新聞的消防栓，收斂成有日期、有來源的簡報',
            body: 'A solo-built pipeline that crawls six sources, reads the full text, scores what matters, and publishes a bilingual briefing every day — each claim traceable to the article that made it.',
            zhBody: '一套獨立打造的管線，爬取六個來源、讀取全文、為重要程度評分，每天發布雙語簡報——每個主張都能追溯回產生它的原文。',
            kpis: [
                { label: 'Sources', value: '6', zhLabel: '來源' },
                { label: 'Cost cut', value: '75%', zhLabel: '成本降低' },
                { label: 'Cadence', value: 'Daily', zhLabel: '更新頻率' },
            ],
            signals: ['Crawl', 'Extract', 'Score', 'Summarise', 'Publish'],
            zhSignals: ['爬取', '萃取', '評分', '摘要', '發布'],
        },
        storyMoments: [
            { iconKey: 'activity', title: 'The firehose problem', zhTitle: '消防栓問題', body: 'A deep-tech team cannot manually read every AI, semiconductor, and frontier-science story published each day. The volume is the problem before the analysis is.', zhBody: '深科技團隊無法手動讀完每天發布的每一則 AI、半導體與前沿科學新聞。在分析之前，數量本身就是問題。' },
            { iconKey: 'layers', title: 'A pipeline, not a prompt', zhTitle: '一條管線，而不是一個提示', body: 'Crawl, extract, score, summarise, publish — each stage is separable, retryable, and inspectable, so a bad run is diagnosable instead of mysterious.', zhBody: '爬取、萃取、評分、摘要、發布——每個階段都可分離、可重試、可檢查，讓出狀況的那次執行是可以被診斷的，而不是神秘的。' },
            { iconKey: 'zap', title: 'The cost migration', zhTitle: '成本遷移', body: 'Moving the summarising stage from GPT-4o to Gemini cut per-run cost about 75% while holding output quality — a decision the pipeline was built to make cheaply.', zhBody: '把摘要階段從 GPT-4o 換到 Gemini，在維持輸出品質下把每次執行成本降低約 75%——這是管線被設計成能低成本做出的決策。' },
        ],
        storyChapters: [
            { iconKey: 'activity', label: 'Crawl', zhLabel: '爬取', title: 'Poll six sources without breaking on the seventh', zhTitle: '輪詢六個來源，且不因第七個而崩潰', body: 'Playwright handles the JS-heavy pages while feedparser and httpx handle the static ones. Each source is registered with its own quirks, so adding a seventh does not mean rewriting the crawler.', zhBody: 'Playwright 處理 JS 密集頁面，feedparser 與 httpx 處理靜態頁面。每個來源都登錄了自己的特性，因此新增第七個來源不需要重寫爬蟲。', artifact: 'Source registry', zhArtifact: '來源登錄表' },
            { iconKey: 'layers', label: 'Extract', zhLabel: '萃取', title: 'Pull clean full text out of messy HTML', zhTitle: '從雜亂 HTML 中抽出乾淨全文', body: 'Trafilatura strips navigation, ads, and boilerplate down to the article body, so the model reads the story rather than the page furniture around it.', zhBody: 'Trafilatura 剝除導覽、廣告與樣板，只留下文章本體，讓模型讀到的是報導本身，而不是頁面裝飾。', artifact: 'Extraction pass', zhArtifact: '萃取流程' },
            { iconKey: 'target', label: 'Score', zhLabel: '評分', title: 'Decide what a deep-tech team should actually see', zhTitle: '判斷深科技團隊真正該看到什麼', body: 'A relevance stage scores each item and pulls out entities, so the briefing leads with what matters to this audience instead of whatever happened to be loudest.', zhBody: '相關性階段為每一則評分並抽取實體，讓簡報以「對這群讀者重要的事」開頭，而不是剛好聲量最大的事。', artifact: 'Relevance + entities', zhArtifact: '相關性與實體' },
            { iconKey: 'book', label: 'Summarise', zhLabel: '摘要', title: 'Write it once, in two languages, with the numbers intact', zhTitle: '一次寫成，雙語，且數字不走樣', body: 'The summariser produces native EN and ZH-TW with consistent formatting, quoting figures verbatim so a translated briefing never quietly changes a number.', zhBody: '摘要器產出原生的英文與繁中，格式一致，並逐字引用數字，讓翻譯後的簡報不會悄悄改動任何一個數值。', artifact: 'Bilingual summary', zhArtifact: '雙語摘要' },
            { iconKey: 'check', label: 'Publish', zhLabel: '發布', title: 'Land it where the team already reads', zhTitle: '把它送到團隊已經在讀的地方', body: 'Each briefing is written to a structured Notion database and surfaced on the Strategy Platform /insights feed — the same delivery surface project 06 is built around.', zhBody: '每篇簡報寫入結構化的 Notion 資料庫，並呈現在 Strategy Platform 的 /insights 動態上——正是專案 06 圍繞著建立的交付面。', artifact: 'Notion + /insights', zhArtifact: 'Notion 與 /insights' },
        ],
        pullQuote: 'The hard part was never calling a model. It was building a pipeline that turns a firehose of news into a dated, sourced claim a team can trust before breakfast.',
        zhPullQuote: '困難的從來不是呼叫模型，而是打造一條管線，把新聞的消防栓，變成團隊能在早餐前就信任的、有日期有來源的主張。',
        awards: [],
    },
    {
        slug: 'ux-hmi-interaction-lab', num: '05',
        category: 'UX / HMI Design · Interaction Systems', zhCategory: 'UX / HMI 設計 · 互動系統',
        title: 'UX/HMI Interaction Design Lab', subtitle: 'Scenario-Led Interface Systems',
        zhTitle: 'UX/HMI Interaction Design Lab', zhSubtitle: '情境導向介面系統',
        hook: 'A tactile interaction lab for designing interfaces that stay calm, legible, and humane when people are under pressure.',
        zhHook: '從問題定義、使用者情境、狀態模型、互動原型到研究證據的完整設計，並以 React 實作九個 live modules，展示設計如何從概念推進到可操作驗證的設計思考路徑',
        stack: ['Human Factors','UX Research', 'HMI', 'Interaction Systems', 'React Prototyping', 'Accessibility', 'Design Systems'],
        role: 'UX/HMI Designer & Frontend Prototyper', zhRole: 'UX/HMI 設計師 / 前端原型開發者',
        timeline: '2025 – 2026', status: 'Applied Design Lab', zhStatus: '應用型設計實驗室',
        impact: 'Interaction patterns for UIUX, HMI, accessibility, and frontend roles', zhImpact: '對應 UIUX、HMI、無障礙與前端職能的互動模式',
        heroBrief: {
            context: 'High-pressure interfaces must stay legible when attention is scarce.',
            zhContext: '高壓操作情境中，介面必須在注意力有限時仍保持清楚。',
            problem: 'Warnings and transitions often add cognitive load at the worst moment.',
            zhProblem: '警示與狀態切換常在最緊繃的時刻增加認知負荷。',
            strategy: 'Design from scenarios, human factors, and an explicit seven-state model.',
            zhStrategy: '以情境、人因限制與七狀態模型建立互動規則。',
            delivery: '7 interface states · 5 scenario lenses · 3 prototype passes.',
            zhDelivery: '7 種介面狀態・5 組情境鏡頭・3 輪原型迭代。',
        },
        overview: "UX/HMI Interaction Design Lab is built like a studio table covered with scenarios, interface states, and prototype fragments. The central question is simple but demanding: when the user is under pressure, what should the interface do first, second, and never?\n\nThe case translates cognitive science into interaction behavior. Instead of treating HMI as a pretty dashboard, it breaks the experience into human moments: noticing a change, understanding severity, choosing an action, confirming intent, recovering from error, and handing control back to the system or another person.\n\nVisually, the case is intentionally warmer and more tactile than a technical specification. Image strips, transparent panels, state cards, and responsive prototype notes make the work feel like a living design lab. The goal is to show senior-level frontend and UX judgment: not just building screens, but shaping how attention, state, feedback, and safety work together.",
        zhOverview: "UX/HMI Interaction Design Lab 探討的是一個很實際的問題：當使用者處在高壓、資訊密集、需要快速判斷的情境中，介面如何幫助他更快看見變化、理解嚴重性、確認下一步，並在自動化交接時保持控制感。\n\n此案例將認知科學轉譯為互動行為。它不把 HMI 視為漂亮 dashboard，而是拆解成人的瞬間：注意到變化、理解嚴重性、選擇行動、確認意圖、從錯誤中復原，以及把控制權交回系統或另一個人。\n\n視覺上，這個案例刻意比技術規格書更溫暖、更有觸感。圖片帶、透明面板、狀態卡與響應式原型筆記，讓作品像一個活的設計實驗室。目標是呈現高階前端與 UX 判斷：不只是做畫面，而是形塑注意力、狀態、回饋與安全如何一起運作。",
        overviewSingle: "UX/HMI Interaction Design Lab asks how an interface should behave when users face pressure, dense information, and time-sensitive decisions. I translated cognitive-science principles into a sequence of observable interaction moments: noticing change, understanding severity, choosing an action, confirming intent, recovering from error, and handing control between human and system. Scenarios, state models, prototypes, and responsive interface notes make those decisions tangible, while the warmer visual language keeps the case grounded in human attention. The result demonstrates frontend and UX judgment across hierarchy, feedback, automation, and safety, not simply screen styling.",
        zhOverviewSingle: "UX/HMI Interaction Design Lab 探討高壓、資訊密集且需要快速判斷的情境中，介面應如何協助使用者看見變化、理解嚴重性並保有控制感。我將認知科學轉譯為一連串可觀察的互動時刻，包括注意變化、選擇行動、確認意圖、錯誤復原，以及人與系統之間的控制權交接，再透過情境、狀態模型、原型與響應式介面筆記具體呈現。成果不只展示畫面設計，也呈現資訊層級、回饋、自動化與安全如何共同運作的前端與 UX 判斷。",
        outcomes: ['Translated pressure scenarios into an interaction state system spanning notice, alert, decide, confirm, recover, and handoff', 'Designed HMI patterns that use hierarchy, timing, density, and feedback to reduce cognitive load instead of adding visual noise', 'Created a frontend-oriented prototype narrative with responsive layout, keyboard-friendly tabs, visual evidence, and state documentation', 'Built a design-lab presentation style that makes human factors feel tangible rather than academic', 'Positioned UX, HMI, and frontend prototyping as one integrated craft: behavior, interface, system, and evidence'],
        zhOutcomes: ['將壓力情境轉成互動狀態系統，涵蓋 notice、alert、decide、confirm、recover 與 handoff', '設計 HMI 模式，用層級、時機、密度與回饋降低認知負荷，而不是增加視覺噪音', '建立前端導向的原型敘事，包含響應式版面、鍵盤友善 tabs、視覺證據與狀態文件', '用 design-lab 呈現方式讓人因設計變得具體，而不是停留在學術語言', '將 UX、HMI 與前端原型定位為整合工藝：行為、介面、系統與證據'],
        tech: [{ label: 'Human Factors', val: 'Cognitive load, attention switching, severity perception, error recovery' }, { label: 'UX System', val: 'Scenario maps, interface principles, state matrix, information density' }, { label: 'HMI Patterns', val: 'Alert hierarchy, confirmation timing, handoff rules, recovery affordances' }, { label: 'Frontend Craft', val: 'React state, keyboard tabs, responsive panels, resilient image layout' }, { label: 'Design Evidence', val: 'Scenario boards, state diagrams, usability notes, prototype screenshots' }, { label: 'Credential Fit', val: 'Google UX, Meta Full Stack, IBM Systems & Solutions Architect' }],
        // Self-drawn SVG cover (no stock photos): a pressure-console preview in the Neural Signal OS palette.
        caseHeroImage: 'data:image/svg+xml;utf8,' + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">'
            + heroBackdrop('#35C2B0') + heroCorners
            + '<rect x="120" y="96" width="1360" height="64" rx="12" fill="url(#hp)" stroke="#2A3140"/>'
            + '<circle cx="164" cy="128" r="9" fill="#35C2B0"/>'
            + '<rect x="192" y="119" width="190" height="18" rx="9" fill="#2A303C"/>'
            + '<rect x="1300" y="112" width="140" height="32" rx="16" fill="#12241F" stroke="#35C2B0"/>'
            + '<circle cx="1326" cy="128" r="6" fill="#35C2B0"/><rect x="1342" y="122" width="78" height="12" rx="6" fill="#35C2B0" opacity="0.6"/>'
            + '<rect x="120" y="196" width="840" height="512" rx="16" fill="url(#hp)" stroke="#2A3140"/>'
            + '<rect x="152" y="230" width="776" height="196" rx="8" fill="#0C0E12" stroke="#232A36"/>'
            + '<g stroke="#232A36" stroke-width="1">' + [270, 300, 330, 360, 390].map(y => `<line x1="152" y1="${y}" x2="928" y2="${y}"/>`).join('') + '</g>'
            + '<rect x="152" y="300" width="776" height="60" fill="#E8A33D" opacity="0.07"/>'
            + '<line x1="152" y1="255" x2="928" y2="255" stroke="#E8A33D" stroke-width="1.5" stroke-dasharray="2 6" opacity="0.6"/>'
            + '<text x="792" y="250" fill="#E8A33D" font-family="monospace" font-size="10" letter-spacing="1.5" text-anchor="end" opacity="0.85">THRESHOLD</text>'
            + '<polyline points="152,340 230,332 300,318 370,300 440,255 510,232 580,244 650,300 720,336 792,330 860,334 928,332" fill="none" stroke="#E8A33D" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0.14"/>'
            + '<polyline points="152,340 230,332 300,318 370,300 440,255 510,232 580,244 650,300 720,336 792,330 860,334 928,332" fill="none" stroke="#E8A33D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'
            + '<circle cx="928" cy="332" r="7" fill="#E8A33D"/>'
            + '<rect x="152" y="452" width="776" height="196" rx="8" fill="#0C0E12" stroke="#232A36"/>'
            + '<g stroke="#232A36" stroke-width="1">' + [490, 520, 550, 580, 610] .map(y => `<line x1="152" y1="${y}" x2="928" y2="${y}"/>`).join('') + '</g>'
            + '<polyline points="152,560 230,548 300,566 370,552 440,558 510,544 580,560 650,550 720,566 792,552 860,560 928,556" fill="none" stroke="#35C2B0" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0.12"/>'
            + '<polyline points="152,560 230,548 300,566 370,552 440,558 510,544 580,560 650,550 720,566 792,552 860,560 928,556" fill="none" stroke="#35C2B0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'
            + '<circle cx="928" cy="556" r="7" fill="#35C2B0"/>'
            + '<g fill="url(#hp)" stroke="#2A3140">'
            + '<rect x="1000" y="196" width="480" height="90" rx="12"/><rect x="1000" y="300" width="480" height="90" rx="12"/>'
            + '<rect x="1000" y="404" width="480" height="90" rx="12"/><rect x="1000" y="508" width="480" height="90" rx="12"/>'
            + '<rect x="1000" y="612" width="480" height="96" rx="12"/></g>'
            + '<g><rect x="1000" y="196" width="4" height="90" fill="#35C2B0"/><rect x="1000" y="300" width="4" height="90" fill="#35C2B0"/>'
            + '<rect x="1000" y="404" width="4" height="90" fill="#E8A33D"/><rect x="1000" y="508" width="4" height="90" fill="#35C2B0"/></g>'
            + '<g fill="#35C2B0"><circle cx="1036" cy="241" r="7"/><circle cx="1036" cy="345" r="7"/><circle cx="1036" cy="553" r="7"/></g>'
            + '<circle cx="1036" cy="449" r="7" fill="#E8A33D"/>'
            + '<g fill="#2A303C"><rect x="1060" y="232" width="150" height="16" rx="8"/><rect x="1060" y="336" width="120" height="16" rx="8"/>'
            + '<rect x="1060" y="440" width="170" height="16" rx="8"/><rect x="1060" y="544" width="130" height="16" rx="8"/></g>'
            + '<rect x="1370" y="228" width="72" height="22" rx="11" fill="#12241F" stroke="#35C2B0"/><text x="1382" y="243" fill="#35C2B0" font-family="monospace" font-size="10">NOTICE</text>'
            + '<rect x="1370" y="332" width="72" height="22" rx="11" fill="#12241F" stroke="#35C2B0"/><text x="1388" y="347" fill="#35C2B0" font-family="monospace" font-size="10">OK</text>'
            + '<rect x="1360" y="436" width="82" height="22" rx="11" fill="#2A1712" stroke="#E8A33D"/><text x="1372" y="451" fill="#E8A33D" font-family="monospace" font-size="10">ALERT</text>'
            + '<rect x="1362" y="540" width="78" height="22" rx="11" fill="#12241F" stroke="#35C2B0"/><text x="1374" y="555" fill="#35C2B0" font-family="monospace" font-size="10">RECOVER</text>'
            + '<rect x="1024" y="640" width="180" height="40" rx="8" fill="#35C2B0" opacity="0.18"/>'
            + '<rect x="1024" y="640" width="180" height="40" rx="8" fill="#35C2B0"/>'
            + '<rect x="1224" y="640" width="150" height="40" rx="8" fill="none" stroke="#E8A33D"/>'
            + '</svg>'),
        storyIntro: {
            kicker: 'INTERACTION LAB', zhKicker: '互動實驗室',
            title: 'Design for the worst minute', zhTitle: '為最緊繃的一分鐘設計',
            lead: 'When attention runs out before the interface does, design becomes triage — seven interface states built to keep people calm and correct under pressure.',
            zhLead: '當注意力比介面先耗盡，設計就是分流——七種介面狀態，讓人在壓力下依然保持冷靜與正確。',
            motif: 'grid',
        },
        caseDeck: {
            eyebrow: 'Interaction lab',
            zhEyebrow: '互動實驗室',
            title: 'Designing the calm layer between human and machine',
            zhTitle: '設計人與機器之間的冷靜層',
            body: 'A scenario-led workspace for testing what users notice, what they miss, and how the interface should respond before an error becomes expensive.',
            zhBody: '一個情境導向工作區，用來測試使用者會注意到什麼、錯過什麼，以及介面該如何在錯誤變昂貴之前回應。',
            kpis: [
                { label: 'Interface states', value: '7', zhLabel: '介面狀態' },
                { label: 'Scenario lenses', value: '5', zhLabel: '情境鏡頭' },
                { label: 'Prototype passes', value: '3', zhLabel: '原型迭代' },
            ],
            signals: ['Attention', 'Severity', 'Confirmation', 'Recovery', 'Handoff'],
            zhSignals: ['注意力', '嚴重性', '確認', '復原', '交接'],
        },
        storyMoments: [
            { iconKey: 'activity', title: 'The pressure moment', zhTitle: '壓力瞬間', body: 'Design begins when the user has less attention than the interface wants. The first task is deciding what deserves the next glance.', zhBody: '設計開始於使用者注意力不足的時刻。第一個任務是決定什麼值得下一眼。' },
            { iconKey: 'shield', title: 'The safety rhythm', zhTitle: '安全節奏', body: 'Warnings should escalate with evidence, not volume. The system needs a rhythm: signal, explain, confirm, recover.', zhBody: '警示應該隨證據升級，而不是隨音量升級。系統需要節奏：提示、解釋、確認、復原。' },
            { iconKey: 'monitor', title: 'The prototype surface', zhTitle: '原型表面', body: 'Frontend decisions make the design real: focus order, disabled states, responsive density, and how components behave under stress.', zhBody: '前端決策讓設計變真實：focus order、disabled states、響應式密度，以及元件在壓力下如何表現。' },
        ],
        storyChapters: [
            { iconKey: 'globe', label: 'Context', zhLabel: '情境', title: 'Start with a person, not a panel', zhTitle: '從人開始，而不是從面板開始', body: 'The scenario opens with a user who is busy, uncertain, and moving between tasks. The interface is judged by whether it helps them notice the right change at the right time without forcing them to decode the entire system.', zhBody: '情境從一個忙碌、不確定、正在多任務切換的使用者開始。介面是否成功，取決於它能否讓使用者在正確時間注意到正確變化，而不是逼他理解整個系統。', artifact: 'Scenario storyboard', zhArtifact: '情境 storyboard' },
            { iconKey: 'activity', label: 'Human Factors', zhLabel: '人因', title: 'Design around the limits of attention', zhTitle: '圍繞注意力限制設計', body: 'Attention, memory, perception, and error tolerance become product constraints. Every warning, label, color, and delay has to earn its place because HMI is often used when the user has no spare cognition left.', zhBody: '注意力、記憶、知覺與錯誤容忍度成為產品限制。每個警示、標籤、顏色與延遲都必須有存在理由，因為 HMI 常被用在使用者已經沒有多餘認知資源的時候。', artifact: 'Attention map', zhArtifact: '注意力地圖' },
            { iconKey: 'layers', label: 'Model', zhLabel: '模型', title: 'Build a state machine users can feel', zhTitle: '建立使用者感覺得到的狀態機', body: 'Normal, alert, decision, confirmation, error, recovery, and handoff states are mapped as one behavioral system. The transitions are designed to feel predictable, not dramatic.', zhBody: 'normal、alert、decision、confirmation、error、recovery 與 handoff 狀態被整理成同一套行為系統。轉換被設計成可預期，而不是戲劇化。', artifact: 'State matrix', zhArtifact: '狀態矩陣' },
            { iconKey: 'monitor', label: 'Prototype', zhLabel: '原型', title: 'Let frontend behavior carry the design', zhTitle: '讓前端行為承載設計', body: 'The prototype is where hierarchy becomes motion and states become behavior: focus rings, disabled buttons, progressive disclosure, responsive density, and keyboard navigation are treated as core design material.', zhBody: '原型是層級變成動態、狀態變成行為的地方：focus rings、disabled buttons、漸進揭露、響應式密度與鍵盤操作都被視為核心設計材料。', artifact: 'Frontend prototype', zhArtifact: '前端原型' },
            { iconKey: 'check', label: 'Evidence', zhLabel: '證據', title: 'Make the design reviewable', zhTitle: '讓設計可以被評審', body: 'The case leaves clear slots for screenshots, scenario boards, usability notes, and certificates. A hiring manager should be able to see the reasoning trail, not only the final visual surface.', zhBody: '案例預留清楚位置放置截圖、情境板、可用性筆記與證照。招聘主管應該能看見推理軌跡，而不只是最後的視覺表面。', artifact: 'Review packet', zhArtifact: '評審包' },
        ],
        pullQuote: 'Good HMI does not ask users to think harder. It shapes the system so the next correct action becomes easier to see.',
        zhPullQuote: '好的 HMI 不是要求使用者更努力思考，而是讓系統本身把下一個正確行動變得更容易被看見。',
        certWall: [
            { img: 'google-ux-design.webp', name: 'Google UX Design', zhName: 'Google UX 設計專業證書', issuer: 'Google',
                focus: 'UX process, research synthesis, usability and interaction design',
                zhFocus: 'UX 流程、研究整合、可用性與互動設計——應用於情境鏡頭與七態介面設計' },
            { img: 'meta-full-stack-developer.webp', name: 'Meta Full Stack Developer', zhName: 'Meta 全端工程師專業證書', issuer: 'Meta',
                focus: 'Frontend prototyping, implementation thinking, UI behavior',
                zhFocus: '前端原型、實作思維與 UI 行為——應用於可操作的壓力主控台（Module 06）' },
            { img: 'ibm-system-and-solutions-architect.webp', name: 'IBM Systems & Solutions Architect', zhName: 'IBM 系統與解決方案架構師證書', issuer: 'IBM',
                focus: 'System constraints, architecture thinking, HMI integration logic',
                zhFocus: '系統限制、架構思維與 HMI 整合邏輯——支撐狀態機與情境矩陣的設計' },
        ],
        awards: [],
    },
    {
        slug: 'industry-strategy-platform', num: '06',
        category: 'Strategy Intelligence · Frontier-Tech Database', zhCategory: '策略情報 · 前沿科技資料庫',
        title: 'Strategy Intelligence Platform', subtitle: 'A Crunchbase for frontier tech, with an AI strategist designed on top',
        zhTitle: 'Strategy Intelligence Platform', zhSubtitle: '一個為前沿科技而生的 Crunchbase，並在其上設計了一層 AI 策略師',
        hook: 'A self-built, analyst-grade database of 201 frontier-tech companies — six sections per row, including a stated verdict — plus an AI strategist layer I designed to keep that depth scaling.',
        zhHook: '一個自建、分析師等級的資料庫，收錄 201 家前沿科技公司——每列六段，包含一個明確的判斷——並設計了一層 AI 策略師，讓這種深度可以規模化。',
        stack: ['React', 'Analyst Research', 'Bilingual Writing', 'AI Agent Design', 'Grounded RAG', 'Vercel'],
        role: 'Founder, Analyst & Product Designer', zhRole: '創辦人 / 分析師 / 產品設計師',
        timeline: '2025 – 2026', status: 'Live · database & briefs shipped, AI layer in concept', zhStatus: '上線 · 資料庫與簡報已上線，AI 層為概念設計',
        impact: '201 companies · 5 strategic briefs · 10-field schema', zhImpact: '201 家公司 · 5 篇策略簡報 · 十欄位 schema',
        heroBrief: {
            context: 'Frontier-tech strategy needs comparable intelligence across companies.',
            zhContext: '前沿科技策略需要可跨公司比較的結構化情報。',
            problem: 'Broad databases capture facts but omit defensible analyst judgment.',
            zhProblem: '大型資料庫能收錄事實，卻缺少可被辯論的分析判斷。',
            strategy: 'Pair a fixed schema with authored verdicts and a grounded AI-strategist concept.',
            zhStrategy: '以固定 schema 串接分析師判斷，並設計有依據的 AI 策略師概念。',
            delivery: '201 companies · 10-field schema · 5 strategic briefs.',
            zhDelivery: '201 家公司・10 欄位 schema・5 篇策略簡報。',
        },
        overview: "Crunchbase will tell you a company exists. It will not tell you whether the moat is real, whether the round was priced for perfection, or whether it is worth a follow-up meeting. That gap is the product bet behind the Strategy Intelligence Platform — a site I designed and built end to end, live at industry-strategy-platform.vercel.app.\n\nThe foundation is a self-curated database of 201 frontier-tech companies — humanoid robotics, CRISPR gene editing, AI agents, photonics, climatetech, and more — where every row carries six analyst-written sections: founders, moat, business model, funding, risks, and a stated verdict. Alongside it, a strategic-briefs feed reads the macro picture: five long-form theses on power constraints, packaging bottlenecks, and where AI infrastructure is actually bottlenecked.\n\nThis page is not a UI tour. It opens the workshop: the schema and taxonomy behind 201 comparable rows, the writing method behind every brief and analyst note, and — the part I want to be most upfront about — an AI strategist layer I designed but have not yet wired to the live product: an agent that drafts a note in eight checkable skills, an editorial-ops board that manages what it drafts, and a grounded RAG layer that can query the database in plain language and cite its sources, or refuse when the schema does not have an answer. Each is labelled honestly as a concept, grounded in the real data.\n\nThis project sits downstream of two others in this portfolio: the ITRI ecosystem-data work (02) that first taught me how to structure a company record, and the AI News Intelligence pipeline (04), a related but distinct system whose daily-briefing discipline shaped how I think about a dated, sourced claim.",
        zhOverview: "Crunchbase 會告訴你一家公司存在。它不會告訴你護城河是不是真的、那輪估值是不是已經定價到完美、或者值不值得一次後續會議。這個缺口，就是 Strategy Intelligence Platform 背後的產品賭注——一個我從頭到尾設計並開發的網站，上線於 industry-strategy-platform.vercel.app。\n\n基礎是一個自建策展的資料庫，收錄 201 家前沿科技公司——人形機器人、CRISPR 基因編輯、AI agent、光子學、潔淨科技等——每一列都帶著六段分析師撰寫的內容：創辦人、護城河、商業模式、資金、風險，以及一個明確的判斷。同時還有一條策略簡報動態，讀懂宏觀局勢：五篇關於電力限制、封裝瓶頸，以及 AI 基礎建設真正卡在哪裡的長文論點。\n\n這一頁不是介面導覽。它打開整個工作間：201 列可互相比較的紀錄背後的 schema 與分類法、每篇簡報與分析師註記背後的寫作方法，以及——我想最先誠實說明的部分——一層我設計、但尚未接上線上產品的 AI 策略師：一個以八個可檢查的技能寫出草稿的 agent、一個管理草稿的文案管理看板，以及一個能用白話查詢資料庫、附引用來源、且在 schema 沒有答案時願意拒答的依據式 RAG 層。每一個都誠實標為概念設計，並錨定在真實資料上。\n\n這個專案下游承接作品集裡的另外兩個專案：教會我如何結構化一筆公司紀錄的工研院生態資料工作（02），以及 AI News Intelligence 管線（04）——一個相關但不同的系統，它每日簡報的紀律，形塑了我對「一個有日期、有來源的主張」該長什麼樣的理解。",
        overviewSingle: "Strategy Intelligence Platform addresses the gap between knowing a frontier-tech company exists and deciding whether its moat, funding, risks, and market position justify deeper attention. I designed and built the live product around a curated database of 201 companies, each supported by analyst-written assessments, plus five strategic briefs on constraints shaping AI infrastructure. This case exposes the schema, taxonomy, and editorial method behind those comparable records. It also presents an AI strategist, editorial-operations board, and grounded RAG query layer as clearly labelled concepts rather than live features, all anchored in the real data workflows developed across projects 02 and 04.",
        zhOverviewSingle: "Strategy Intelligence Platform 回應的是「知道一家公司存在」與「判斷它是否值得深入追蹤」之間的缺口。我從零設計並開發這個上線產品，以自建策展的 201 家前沿科技公司資料庫為核心，每筆紀錄包含創辦人、護城河、商業模式、資金、風險與判斷，並搭配五篇 AI 基礎建設策略長文。本案例進一步公開可比較紀錄背後的 schema、分類法與寫作方法；AI 策略師、文案管理看板與依據式 RAG 查詢層則清楚標示為尚未接上線上產品的概念設計，並建立在專案 02、04 的真實資料流程上。",
        outcomes: [
            'Designed and shipped a live, bilingual product — a globe-led home, a strategic-briefs reader, and a searchable 201-company observatory',
            'Curated a ten-field schema that holds an analyst\'s full judgment, not just firmographics, and stays constant across wildly different sectors',
            'Wrote the analyst method behind every brief and company note — the same six-section shape from a coding agent to a gene-editing platform',
            'Designed an AI strategist layer — an eight-skill agent, an editorial-ops board, and a grounded RAG console — honestly labelled as concept, not shipped',
            'Built the interaction system (globe hub-switch, expandable rows, sector filter, bilingual toggle) that carries all three routes',
        ],
        zhOutcomes: [
            '設計並上線一個真實、雙語的產品——地球儀導向的首頁、策略簡報閱讀器，以及可搜尋的 201 家公司觀測站',
            '策展出一套十欄位 schema，承載分析師的完整判斷，而不只是公司基本資料，並在極度不同的產業間保持一致',
            '寫出每篇簡報與公司註記背後的分析師方法——同一套六段結構，從編碼代理適用到基因編輯平台',
            '設計一層 AI 策略師——八技能 agent、文案管理看板與依據式 RAG 查詢台——誠實標為概念設計，而非已上線功能',
            '打造撐起三條路徑的互動系統（地球儀 hub 切換、可展開列、產業篩選、雙語切換）',
        ],
        tech: [
            { label: 'Frontend', val: 'React, client-side routing, bilingual EN/繁中 shell, Vercel deployment' },
            { label: 'Database', val: '201-row curated schema — ten fields per company, six analyst-written sections' },
            { label: 'Writing method', val: 'Analyst-authored briefs and notes, dated per curation batch, opinionated verdicts' },
            { label: 'AI Agent design', val: 'Eight-skill drafting pipeline with a confidence + evidence gate (concept)' },
            { label: 'Editorial ops design', val: 'Six-state kanban — backlog through published and stale (concept)' },
            { label: 'RAG design', val: 'Typed chunking, hybrid structured + semantic retrieval, citation and refusal (concept)' },
        ],
        caseHeroImage: ISP_HERO_IMAGE,
        storyIntro: {
            kicker: 'STRATEGY OBSERVATORY', zhKicker: '策略觀測站',
            title: '201 companies, one verdict each', zhTitle: '201 家公司，各一個判斷',
            lead: 'A self-built Crunchbase for frontier tech — ten fields, six analyst-written sections, a stated verdict per row — plus an honestly-labelled AI strategist designed to keep that depth at scale.',
            zhLead: '一座自建的前沿科技 Crunchbase——每列十個欄位、六段分析師書寫、一個明確判斷——加上一層誠實標為概念的 AI 策略師，用來讓這種深度規模化。',
            motif: 'orbit',
        },
        caseDeck: {
            eyebrow: 'Strategy observatory', zhEyebrow: '策略觀測站',
            title: 'From 201 curated companies to a strategist you can question',
            zhTitle: '從 201 家策展公司到一個可以被提問的策略師',
            body: 'A workspace for reading frontier tech the way an analyst does — moat, model, funding, risk, verdict — and a designed AI layer for keeping that depth at scale.',
            zhBody: '一個用分析師的方式讀懂前沿科技的工作區——護城河、商模、資金、風險、判斷——以及一層讓這種深度得以規模化的設計中 AI 層。',
            kpis: [
                { label: 'Companies', value: '201', zhLabel: '公司數' },
                { label: 'Schema fields', value: '10', zhLabel: 'Schema 欄位' },
                { label: 'Strategic briefs', value: '5', zhLabel: '策略簡報' },
            ],
            signals: ['Curate', 'Write', 'Automate', 'Query', 'Ship'],
            zhSignals: ['策展', '寫作', '代理', '查詢', '上線'],
        },
        storyMoments: [
            { iconKey: 'database', title: 'The database is the product', zhTitle: '資料庫本身就是產品', body: '201 companies, ten fields each, six of them an analyst\'s judgment — not a fact sheet with a search bar.', zhBody: '201 家公司，各十個欄位，其中六個是分析師的判斷——不是一張加了搜尋框的事實表。' },
            { iconKey: 'cpu', title: 'An AI strategist, designed honestly', zhTitle: '一個誠實標示的 AI 策略師', body: 'An eight-skill agent, an editorial-ops board, and a grounded RAG layer — labelled concept, grounded in the real schema.', zhBody: '八技能 agent、文案管理看板與依據式 RAG 層——標為概念設計，錨定於真實 schema。' },
            { iconKey: 'globe', title: 'Global by design', zhTitle: '刻意的全球視野', body: 'A globe, not a hero image, because the product\'s first job is to make breadth across geographies legible.', zhBody: '用地球儀而不是主視覺圖，因為產品的第一個任務就是讓跨地理的廣度一眼可辨。' },
        ],
        outcomeModules: [
            { num: '02', id: 'isp-m02' },
            { num: '04', id: 'isp-m04' },
            { num: '06', id: 'isp-m06' },
            { num: '08', id: 'isp-m08' },
            { num: '10', id: 'isp-m10' },
        ],
        storyChapters: [
            { iconKey: 'database', label: 'Build', zhLabel: '建庫', title: 'Curate depth, not just coverage', zhTitle: '策展深度，而不只是覆蓋率', body: 'Crunchbase indexes millions of companies with a fact sheet each. This database holds 201, on purpose — every row carries an analyst\'s full judgment through a constant ten-field schema, so a laser-weeding robot and a CRISPR platform read the same way.', zhBody: 'Crunchbase 用一張事實表索引數百萬家公司。這個資料庫刻意只收 201 家——每一列都透過一套固定的十欄位 schema，承載分析師的完整判斷，讓雷射除草機器人和 CRISPR 平台讀起來是同一套邏輯。', artifact: 'Schema & taxonomy', zhArtifact: 'Schema 與分類法' },
            { iconKey: 'book', label: 'Write', zhLabel: '寫作', title: 'Six sections, one verdict', zhTitle: '六段結構，一個判斷', body: 'The moat, business-model, funding, and risk sections earn the right to the sixth: a stated, disagreeable verdict. That is the section a plain fact sheet never has, and the one this whole product is built around.', zhBody: '護城河、商業模式、資金與風險段落，賺得寫出第六段的資格：一個明確、可被反駁的判斷。這是一張純事實表永遠不會有的段落，也是整個產品圍繞著建立的核心。', artifact: 'Analyst note anatomy', zhArtifact: '分析師註記解剖' },
            { iconKey: 'cpu', label: 'Automate', zhLabel: '代理', title: 'Design an AI strategist, not a black box', zhTitle: '設計一個 AI 策略師，而不是黑箱', body: 'Deep writing does not scale by hand forever, so I designed an agent as eight small, independently checkable skills — sourcing through style-guard — with a confidence gate that holds thin evidence instead of publishing it. Concept, honestly labelled.', zhBody: '深度寫作沒辦法永遠靠人力擴大規模，所以我把 agent 設計成八個小型、各自可獨立檢查的技能——從檢索到文風守門——並附一道信心閘門，讓不足的證據被保留，而不是被發佈。誠實標為概念設計。', artifact: 'Agent skill system', zhArtifact: 'Agent 技能系統' },
            { iconKey: 'zap', label: 'Query', zhLabel: '查詢', title: 'Ground every answer, or refuse', zhTitle: '每個答案都有依據，否則拒答', body: 'A RAG layer designed over the same schema: typed chunks, hybrid structured-plus-semantic retrieval, and a citation on every claim — including a question the database honestly cannot answer.', zhBody: '一層架在同一套 schema 上的 RAG 設計：有型別的切塊、結構化加語意的混合檢索，以及每個主張都附上引用——包含一個資料庫誠實答不出來的問題。', artifact: 'Grounded RAG design', zhArtifact: '依據式 RAG 設計' },
            { iconKey: 'monitor', label: 'Ship', zhLabel: '上線', title: 'From wireframe to a live, bilingual product', zhTitle: '從線框圖到上線的雙語產品', body: 'A globe-led home, a book-like briefs reader, and a dense, expandable company table — three different reading modes for three different jobs, shipped and running today.', zhBody: '地球儀導向的首頁、書籍式的簡報閱讀器，以及一張密集、可展開的公司表格——三種不同的閱讀模式對應三種不同的工作，今天就在線上運作。', artifact: 'Shipped interface', zhArtifact: '已上線介面' },
        ],
        pullQuote: 'Crunchbase tells you a company exists. An analyst tells you whether it matters. The product bet here is a database where every row carries the analyst\'s answer — and an AI layer designed to keep that promise at scale.',
        zhPullQuote: 'Crunchbase 告訴你一家公司存在，分析師告訴你它重不重要。這個產品賭的是：一個每一列都帶著分析師答案的資料庫——以及一層讓這個承諾能規模化的 AI。',
        awards: [],
    },
    {
        slug: 'startup-intelligence-platform', num: '07',
        category: 'Full-Stack Platform · Data Engineering', zhCategory: '全端平台 · 資料工程',
        title: 'Startup Intelligence Platform', subtitle: 'Real-time Ecosystem Analytics at ITRI',
        zhTitle: '新創商情平台', zhSubtitle: '工研院即時生態系情報系統',
        hook: "A solo-built full-stack analytics platform that gave ITRI's team their first real-time window into Taiwan's startup ecosystem.",
        zhHook: '獨立打造的全端情報平台，讓工研院團隊第一次擁有即時俯瞰台灣新創生態的視角。',
        stack: ['Python', 'JavaScript', 'SQL', 'ETL Pipeline', 'Dashboard', 'Web Scraping'],
        role: 'Sole Developer', zhRole: '獨立開發者',
        timeline: '2024 – Present', status: 'Active · ITRI/ISTI', zhStatus: '上線運作 · 工研院',
        impact: 'Selected: 2025 ITRI Star Program', zhImpact: '獲選 2025 年工研院育星計畫種子培育',
        heroBrief: {
            context: 'ITRI strategy teams need a current view of Taiwan’s startup ecosystem.',
            zhContext: '工研院策略團隊需要即時掌握台灣新創生態系。',
            problem: 'Manual spreadsheets keep data stale, inconsistent, and slow to compare.',
            zhProblem: '手動試算表使資料過期、不一致，也難以快速比較。',
            strategy: 'Connect scheduled crawlers, ETL, SQL, and a filterable dashboard.',
            zhStrategy: '串接定時爬蟲、ETL、SQL 與可篩選的決策儀表板。',
            delivery: '80% less manual work · automated refresh · built solo.',
            zhDelivery: '手動工作減少 80%・全自動更新・獨立開發。',
        },
        overview: "At ITRI, strategy decisions depend on having current, accurate data about Taiwan's startup landscape. Before this platform, the team relied on manual spreadsheet updates and ad hoc searches — slow, error-prone, and impossible to scale.\n\nI independently designed and built a full-stack web application — 新創商情平台 — that aggregates, processes, and visualizes startup ecosystem data in real time. The architecture spans a Python backend with automated web crawlers, an ETL pipeline writing to a managed SQL database, and a JavaScript frontend with an interactive visualization dashboard.\n\nThis project was recognized by ITRI management and led to my selection as a seed cultivator in the 2025 Star Program — an internal accelerated development track.",
        zhOverview: "在工研院，策略決策仰賴對台灣新創生態的即時、準確掌握。在此平台建立之前，團隊仰賴手動更新的試算表和臨時搜尋——速度慢、易出錯，且無法規模化。\n\n我獨立設計並開發了全端網頁應用「新創商情平台」，能即時彙整、處理並視覺化新創生態系數據。架構涵蓋具備自動化網路爬蟲的 Python 後端、寫入受管 SQL 資料庫的 ETL 管線，以及具備互動式視覺化儀表板的 JavaScript 前端。\n\n此專案獲工研院管理層認可，使我獲選 2025 年育星計畫種子培育——工研院內部加速發展培育計畫。",
        overviewSingle: "ITRI's strategy team relied on manually updated spreadsheets and ad hoc searches to understand Taiwan's startup ecosystem, a process that was slow, error-prone, and difficult to scale. I independently designed and built the Startup Intelligence Platform as a full-stack system that automates collection, processing, and interactive exploration of ecosystem data. Its architecture connects Python web crawlers, an ETL pipeline, a managed SQL database, and a JavaScript dashboard, turning fragmented updates into a maintainable decision-support workflow. The project received management recognition and led to my selection as a seed cultivator in ITRI's 2025 Star Program.",
        zhOverviewSingle: "工研院策略團隊原先仰賴人工更新試算表與臨時搜尋掌握台灣新創生態，流程速度慢、易出錯，也難以規模化。我獨立設計並開發「新創商情平台」，以 Python 網路爬蟲、ETL 管線、受管 SQL 資料庫與 JavaScript 互動式儀表板，串接資料的自動蒐集、處理與視覺化探索，將分散更新轉成可維護的決策支援流程。專案獲工研院管理層認可，並使我獲選 2025 年育星計畫種子培育。",
        outcomes: ['Independently designed and built full-stack architecture (Python backend + JS frontend)', 'Automated web crawler collects fresh startup baseline data on schedule', 'ETL pipeline processes, normalizes, and loads data into SQL database', 'Interactive visualization dashboard enables team data-driven decision-making', 'Selected as 2025 ITRI Star Program seed cultivator following platform recognition'],
        zhOutcomes: ['獨立設計並建構全端架構（Python 後端 + JS 前端）', '自動化網路爬蟲定期抓取最新新創基盤數據', 'ETL 管線處理、標準化數據並載入 SQL 資料庫', '互動式視覺化儀表板支援團隊數據驅動決策', '平台影響力受認可，獲選 2025 年工研院育星計畫種子培育'],
        tech: [{ label: 'Backend', val: 'Python, SQL database management & maintenance' }, { label: 'Frontend', val: 'JavaScript, interactive data visualization' }, { label: 'Crawler', val: 'Automated web scraper for startup ecosystem data' }, { label: 'Pipeline', val: 'ETL (Extract, Transform, Load) workflow' }, { label: 'Database', val: 'SQL with automated refresh cycle' }, { label: 'Context', val: 'Internal platform at ITRI/ISTI Innovation Division' }],
        caseHeroImage: STARTUP_HERO_IMAGE,
        storyIntro: {
            kicker: 'ECOSYSTEM COCKPIT', zhKicker: '生態系駕駛艙',
            title: 'The spreadsheet retires', zhTitle: '讓試算表光榮退休',
            lead: 'One developer, one pipeline: crawlers, ETL, SQL, and a live dashboard that gave an ITRI team its first real-time window into Taiwan\'s startup ecosystem.',
            zhLead: '一位開發者、一條管線：爬蟲、ETL、SQL 與即時儀表板，讓工研院團隊第一次擁有俯瞰台灣新創生態的即時視窗。',
            motif: 'pulse',
        },
        caseDeck: {
            eyebrow: 'Ecosystem cockpit', zhEyebrow: '生態系駕駛艙',
            title: 'From manual spreadsheets to a real-time window on the ecosystem',
            zhTitle: '從手動試算表，到即時俯瞰生態系的視窗',
            body: "A solo-built full-stack platform that crawls, cleans, stores, and visualises Taiwan's startup landscape — so an ITRI team stopped hand-updating spreadsheets and started reading a live dashboard.",
            zhBody: '一套獨立打造的全端平台，爬取、清理、儲存並視覺化台灣新創版圖——讓工研院團隊不再手動更新試算表，而是開始讀一個即時儀表板。',
            kpis: [
                { label: 'Manual work', value: '−80%', zhLabel: '手動工作' },
                { label: 'Refresh', value: '100% auto', zhLabel: '資料更新' },
                { label: 'Built by', value: '1', zhLabel: '開發人數' },
            ],
            signals: ['Crawl', 'Transform', 'Store', 'Visualise', 'Decide'],
            zhSignals: ['爬取', '轉換', '儲存', '視覺化', '決策'],
        },
        storyMoments: [
            { iconKey: 'activity', title: 'The spreadsheet ceiling', zhTitle: '試算表的天花板', body: 'Before the platform, ecosystem data lived in hand-updated spreadsheets and ad hoc searches — slow, error-prone, and impossible to scale past a few analysts.', zhBody: '在平台之前，生態系資料活在手動更新的試算表與臨時搜尋裡——慢、易錯，且無法擴展到少數幾位分析師以外。' },
            { iconKey: 'database', title: 'An automated backbone', zhTitle: '自動化骨幹', body: 'Python crawlers feed an ETL pipeline that normalises and loads into SQL on a schedule, so the data refreshes itself instead of waiting for someone to remember.', zhBody: 'Python 爬蟲餵給一條 ETL 管線，定期標準化並載入 SQL，讓資料自我更新，而不是等某個人想起來。' },
            { iconKey: 'chart', title: 'A window, not a report', zhTitle: '一扇窗，而不是一份報告', body: 'An interactive JS dashboard turned the database into something a strategy team could look through — recognised by ITRI with a 2025 Star Program place.', zhBody: '互動式 JS 儀表板把資料庫變成策略團隊真正能俯瞰的東西——並獲工研院以 2025 育星計畫的名額肯定。' },
        ],
        storyChapters: [
            { iconKey: 'target', label: 'Problem', zhLabel: '問題', title: 'Name the real cost of manual data', zhTitle: '指出手動資料的真實成本', body: 'Strategy decisions at ITRI depended on current, accurate startup data — but manual spreadsheet updates meant the picture was always a little stale and never fully trusted.', zhBody: '工研院的策略決策仰賴即時、準確的新創資料——但手動更新試算表意味著這幅圖像總是有點過期，也從未被完全信任。', artifact: 'Problem framing', zhArtifact: '問題定義' },
            { iconKey: 'activity', label: 'Crawl', zhLabel: '爬取', title: 'Collect the baseline on a schedule', zhTitle: '定期蒐集基盤資料', body: 'Automated web crawlers gather fresh startup ecosystem data on a cadence, replacing the ad hoc searches that used to eat an analyst’s morning.', zhBody: '自動化網路爬蟲定期抓取最新的新創生態資料，取代過去吃掉分析師整個早上的臨時搜尋。', artifact: 'Crawler jobs', zhArtifact: '爬蟲任務' },
            { iconKey: 'layers', label: 'Transform', zhLabel: '轉換', title: 'Make the data loadable and consistent', zhTitle: '讓資料可載入且一致', body: 'An ETL pipeline extracts, normalises, and loads the raw signals into a managed SQL database, so what reaches the dashboard is clean and comparable.', zhBody: '一條 ETL 管線把原始訊號萃取、標準化並載入受管的 SQL 資料庫，讓抵達儀表板的資料是乾淨且可比較的。', artifact: 'ETL workflow', zhArtifact: 'ETL 流程' },
            { iconKey: 'monitor', label: 'Visualise', zhLabel: '視覺化', title: 'Turn a database into a decision surface', zhTitle: '把資料庫變成決策介面', body: 'A JavaScript dashboard makes the ecosystem browsable and filterable, so the team reads and compares in seconds instead of scrolling a spreadsheet.', zhBody: '一個 JavaScript 儀表板讓生態系可瀏覽、可篩選，讓團隊在幾秒內閱讀與比較，而不是滑動一張試算表。', artifact: 'Dashboard', zhArtifact: '儀表板' },
            { iconKey: 'check', label: 'Impact', zhLabel: '影響', title: 'Recognised, and still running', zhTitle: '被肯定，且仍在運作', body: 'The platform gave the team their first real-time window on the ecosystem and led to selection as a 2025 ITRI Star Program seed cultivator — an internal accelerated-development track.', zhBody: '這個平台給了團隊第一個即時俯瞰生態系的視窗，並促成獲選 2025 年工研院育星計畫種子培育——一個內部加速發展的軌道。', artifact: 'Star Program', zhArtifact: '育星計畫' },
        ],
        pullQuote: 'The win was not the crawler or the dashboard. It was that a team stopped trusting a stale spreadsheet and started trusting a system that refreshes itself.',
        zhPullQuote: '真正的成果不是爬蟲或儀表板，而是一個團隊不再信任一張過期的試算表，開始信任一個會自我更新的系統。',
        awards: [{ iconKey: 'database', title: '2025 ITRI Star Program', desc: 'Selected as seed cultivator — outstanding platform contribution and data engineering excellence at ITRI/ISTI.' }],
    },
    {
        slug: 'psymatch', num: '08',
        category: 'Psychometrics · Counselling Matching', zhCategory: '心理計量 · 諮商媒合系統',
        title: 'PsyMatch', subtitle: 'Trait-based counselling-matching engine',
        zhTitle: 'PsyMatch 心理諮商媒合引擎', zhSubtitle: '以自陳量表媒合合適的心理師',
        hook: "A self-report intake and a transparent scoring algorithm that recommends a licensed psychologist to fit — issue, orientation, budget, and time — and still lets the person choose freely.",
        zhHook: '一套自陳量表加上一個透明的評分演算法：依議題、取向、預算與時段，推薦合適的合格心理師，並且始終讓使用者自由選擇。',
        stack: ['React', 'FastAPI', 'Python', 'Psychometrics', 'Matching Algorithm', 'SVG Data Viz'],
        role: 'Product Designer & Algorithm Designer', zhRole: '產品設計 / 演算法設計',
        timeline: '2025 – 2026', status: 'Live MVP · self-initiated', zhStatus: '上線 MVP · 自主專案',
        impact: '7-topic intake · 4-criterion transparent match', zhImpact: '七題量表 · 四準則透明媒合',
        heroBrief: {
            context: 'People need a clearer first step when choosing a licensed psychologist.',
            zhContext: '使用者在選擇合格心理師時，需要更清楚的第一步。',
            problem: 'Profile directories cannot explain who fits a person’s actual needs.',
            zhProblem: '心理師名錄能展示資料，卻無法解釋誰更符合個人需求。',
            strategy: 'Turn a short intake into a transparent, user-overridable ranking.',
            zhStrategy: '將短量表轉成透明排序，同時保留使用者最終選擇權。',
            delivery: '7-topic intake · 4-criterion algorithm · live React/FastAPI MVP.',
            zhDelivery: '7 題量表・4 準則透明演算法・React／FastAPI 上線 MVP。',
        },
        overview: "PsyMatch is a counselling-matching platform I designed and built end to end. A person completes a short self-report intake, and an algorithm recommends licensed psychologists whose orientation, fee, availability, and areas of focus fit what the person said they need.\n\nThe design problem sits before the recommendation. Support only works when the fit is right, yet most directories ask people to pick a therapist from a wall of profiles with no structure. I turned that into a measured intake — seven issue topics rated for importance, plus preferences for orientation, budget, and time — and a scoring rule simple enough to read out loud and defend.\n\nThis page opens the whole method as a research report: the instrument, the exact four-criterion algorithm you can operate in §3, the shipped system and its failure paths, a pilot read against pre-set criteria, and where the measurement stops being my responsibility and a licensed professional's begins. PsyMatch is not a diagnostic tool; it profiles needs and routes people to human care.",
        zhOverview: "PsyMatch 是我獨立從頭到尾設計並開發的心理諮商媒合平台。使用者填寫一份簡短的自陳量表，演算法便依據取向、費用、可預約時段與專長，推薦合適的合格心理師。\n\n真正的設計問題發生在推薦之前。心理支持只有在「適配」時才有效，但多數名錄卻要人在一整面缺乏結構的心理師檔案牆前自行挑選。我把這件事轉成一份可量測的量表——七個議題各自評分重要程度，再加上取向、預算與時段的偏好——以及一條簡單到可以唸出來、也守得住的評分規則。\n\n本頁以研究報告的方式攤開整套方法：量表工具、可在 §3 親手操作的四準則演算法、已上線的系統與它的失效路徑、對照事前設定標準的試辦讀數，以及量測責任在哪裡結束、由合格專業人員接手。PsyMatch 並非診斷工具；它描繪需求，並把人導向真人的專業照護。",
        overviewSingle: "PsyMatch is an end-to-end counselling-matching platform designed to replace an unstructured wall of therapist profiles with a transparent path to human care. A short self-report intake measures seven issue topics and preferences for therapeutic orientation, fee, availability, and focus area, then applies a four-criterion scoring rule simple enough to explain and audit. The case presents the instrument, operable algorithm, shipped system, failure paths, and pilot evaluation against pre-set criteria. PsyMatch does not diagnose users or replace professional judgment; it organizes stated needs and routes people toward licensed psychologists whose services are more likely to fit.",
        zhOverviewSingle: "PsyMatch 是我從零設計並開發的心理諮商媒合平台，目標是用透明流程取代缺乏結構的心理師檔案牆。使用者透過簡短自陳量表評估七類議題，並填寫取向、費用、時段與專長偏好，系統再以可解釋、可檢查的四準則演算法推薦合格心理師。本案例完整呈現量表、可操作演算法、已上線系統、失效路徑與依事前標準進行的試辦評估；PsyMatch 不進行診斷，也不取代專業判斷，而是整理使用者所陳述的需求，協助更適切地銜接真人照護。",
        outcomes: [
            'Designed a seven-topic self-report intake (1–7 importance) that builds a needs profile in about eight minutes — framed as profiling, not diagnosis',
            'Ported and can operate the real matching algorithm: a four-criterion additive score (orientation .30, online .20, budget .20, topic-fit .30) ranking licensed psychologists',
            'Built the full request path — React intake → FastAPI scoring → ranked results → booking — and designed its edge cases: skipped items, flat profiles, network failure at submit',
            'Wrote model choice as a costed decision record: rule-based additive scoring chosen over cosine distance and learned ranking, with the cold-start reason stated',
            'Audited my own model for sensitivity and degeneracy, and reported where two orientations are hard to separate rather than hiding it',
            'Set measurement-ethics boundaries: non-clinical positioning, consent and data handling, and a documented handoff to professional care',
        ],
        zhOutcomes: [
            '設計七題自陳量表（重要程度 1–7），約八分鐘建立需求輪廓——定位為需求描繪，而非診斷',
            '移植並能親手操作真實媒合演算法：四準則加總評分（取向 .30、線上 .20、預算 .20、議題吻合 .30）對合格心理師排序',
            '打造完整請求路徑——React 量表 → FastAPI 評分 → 排序結果 → 預約——並設計其邊界情境：跳題、平坦輪廓、送出時斷線',
            '以有成本的決策紀錄書寫模型選擇：規則式加總評分勝過餘弦距離與學習式排序，並說明冷啟動理由',
            '對自己的模型進行敏感度與退化稽核，誠實回報兩種取向難以區分之處，而非隱藏',
            '設定量測倫理邊界：非臨床定位、同意制資料處理，以及有文件紀錄的專業照護交接',
        ],
        tech: [
            { label: 'Frontend', val: 'React 18, multi-step intake, results ranking, hand-rolled SVG profile radar (no chart library)' },
            { label: 'Matching', val: 'Four-criterion additive scoring, deterministic top-N ranking, pure-JS port with unit sanity tests' },
            { label: 'Instrument', val: 'Seven-topic 1–7 self-report intake plus orientation / budget / time preferences' },
            { label: 'Backend', val: 'FastAPI scoring endpoint; selection logged as future training signal' },
            { label: 'Data model', val: 'Therapist records: orientation, specialties, fee range, availability, licence' },
            { label: 'Ethics', val: 'Non-clinical framing, consent-based data handling, licensed-professional handoff' },
        ],
        // Self-drawn SVG cover (no stock photos): the matching bench — an intake
        // profile radar feeding a ranked, score-barred shortlist.
        caseHeroImage: 'data:image/svg+xml;utf8,' + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">'
            + heroBackdrop('#35C2B0') + heroCorners
            + '<defs><radialGradient id="pmr" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#35C2B0" stop-opacity="0.14"/><stop offset="1" stop-color="#35C2B0" stop-opacity="0"/></radialGradient>'
            + '<linearGradient id="pmb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#35C2B0"/><stop offset="1" stop-color="#7FE0D0"/></linearGradient></defs>'
            + '<rect x="120" y="150" width="560" height="600" rx="16" fill="url(#hp)" stroke="#2A3140"/>'
            + '<rect x="900" y="150" width="580" height="600" rx="16" fill="url(#hp)" stroke="#2A3140"/>'
            + '<text x="152" y="196" fill="#6B7280" font-family="monospace" font-size="20" letter-spacing="3">FIG · INTAKE PROFILE</text>'
            + '<text x="932" y="196" fill="#6B7280" font-family="monospace" font-size="20" letter-spacing="3">RANKED MATCH · TOP 4</text>'
            + '<circle cx="400" cy="455" r="210" fill="url(#pmr)"/>'
            + '<g fill="none" stroke="#2A303C" stroke-width="2">'
            + '<polygon points="400,270 548,344 588,502 486,632 314,632 212,502 252,344"/>'
            + '<polygon points="400,340 474,377 494,456 443,521 357,521 306,456 326,377"/></g>'
            + '<g stroke="#2A303C" stroke-width="1"><path d="M400,455 L400,270M400,455 L548,344M400,455 L588,502M400,455 L486,632M400,455 L314,632M400,455 L212,502M400,455 L252,344"/></g>'
            + '<polygon points="400,300 470,399 517,482 461,581 365,527 273,484 353,418" fill="rgba(53,194,176,0.16)" stroke="#35C2B0" stroke-width="7" opacity="0.16"/>'
            + '<polygon points="400,300 470,399 517,482 461,581 365,527 273,484 353,418" fill="rgba(53,194,176,0.16)" stroke="#35C2B0" stroke-width="3"/>'
            + '<g fill="#35C2B0"><circle cx="400" cy="300" r="6"/><circle cx="470" cy="399" r="6"/><circle cx="517" cy="482" r="6"/><circle cx="461" cy="581" r="6"/><circle cx="365" cy="527" r="6"/><circle cx="273" cy="484" r="6"/><circle cx="353" cy="418" r="6"/></g>'
            + '<g stroke="#35C2B0" stroke-width="5" fill="none" stroke-linecap="round"><path d="M700 450 h150"/><path d="M832 434 l22 16 l-22 16"/></g>'
            + '<text x="712" y="432" fill="#35C2B0" font-family="monospace" font-size="18" letter-spacing="2">score</text>'
            + '<g font-family="monospace">'
            // row 1 — top match (teal)
            + '<rect x="936" y="228" width="508" height="112" rx="12" fill="#12241F" stroke="#35C2B0" stroke-width="2"/>'
            + '<circle cx="992" cy="284" r="30" fill="#1C2028" stroke="#35C2B0" stroke-width="2"/>'
            + '<rect x="1040" y="256" width="220" height="16" rx="8" fill="#2A303C"/>'
            + '<rect x="1040" y="286" width="404" height="20" rx="10" fill="#0C0E12" stroke="#232A36"/><rect x="1040" y="286" width="404" height="20" rx="10" fill="url(#pmb)"/>'
            + '<text x="1408" y="301" fill="#08120F" font-family="monospace" font-size="11" text-anchor="end">1.00</text>'
            + '<circle cx="1416" cy="252" r="15" fill="#E8A33D" opacity="0.22"/><circle cx="1416" cy="252" r="9" fill="#E8A33D"/>'
            // row 2
            + '<rect x="936" y="356" width="508" height="112" rx="12" fill="#0C0E12" stroke="#262B35"/>'
            + '<circle cx="992" cy="412" r="30" fill="#1C2028" stroke="#333A47" stroke-width="2"/>'
            + '<rect x="1040" y="384" width="180" height="16" rx="8" fill="#2A303C"/>'
            + '<rect x="1040" y="414" width="404" height="20" rx="10" fill="#0C0E12" stroke="#232A36"/><rect x="1040" y="414" width="300" height="20" rx="10" fill="url(#pmb)" opacity="0.65"/>'
            + '<text x="1408" y="429" fill="#6B7280" font-family="monospace" font-size="11" text-anchor="end">0.74</text>'
            // row 3
            + '<rect x="936" y="484" width="508" height="112" rx="12" fill="#0C0E12" stroke="#262B35"/>'
            + '<circle cx="992" cy="540" r="30" fill="#1C2028" stroke="#333A47" stroke-width="2"/>'
            + '<rect x="1040" y="512" width="150" height="16" rx="8" fill="#2A303C"/>'
            + '<rect x="1040" y="542" width="404" height="20" rx="10" fill="#0C0E12" stroke="#232A36"/><rect x="1040" y="542" width="210" height="20" rx="10" fill="url(#pmb)" opacity="0.5"/>'
            + '<text x="1408" y="557" fill="#6B7280" font-family="monospace" font-size="11" text-anchor="end">0.52</text>'
            // row 4
            + '<rect x="936" y="612" width="508" height="112" rx="12" fill="#0C0E12" stroke="#262B35"/>'
            + '<circle cx="992" cy="668" r="30" fill="#1C2028" stroke="#333A47" stroke-width="2"/>'
            + '<rect x="1040" y="640" width="196" height="16" rx="8" fill="#2A303C"/>'
            + '<rect x="1040" y="670" width="404" height="20" rx="10" fill="#0C0E12" stroke="#232A36"/><rect x="1040" y="670" width="150" height="20" rx="10" fill="url(#pmb)" opacity="0.35"/>'
            + '<text x="1408" y="685" fill="#6B7280" font-family="monospace" font-size="11" text-anchor="end">0.37</text>'
            + '</g>'
            + '</svg>'),
        storyIntro: {
            kicker: 'MATCHING BENCH', zhKicker: '媒合工作台',
            title: 'A score you can read out loud', zhTitle: '一個能唸出來的分數',
            lead: 'Seven intake topics, four weighted criteria, one transparent ranking — the instrument and the algorithm behind recommending a psychologist while leaving the choice human.',
            zhLead: '七題量表、四個加權準則、一份透明排序——推薦心理師的同時，把量表與演算法攤開，選擇權仍留給人。',
            motif: 'orbit',
        },
        caseDeck: {
            eyebrow: 'Matching bench', zhEyebrow: '媒合台',
            title: 'From a needs profile to a defensible shortlist',
            zhTitle: '從需求輪廓到可被辯護的推薦名單',
            body: 'A workspace for reading the intake, the four weighted criteria, and the ranked result the way a reviewer would — every point of score accounted for.',
            zhBody: '一個工作區，用審查者的眼光讀懂量表輸入、四個加權準則，以及排序結果——每一分都有交代。',
            kpis: [
                { label: 'Intake topics', value: '7', zhLabel: '量表議題' },
                { label: 'Match criteria', value: '4', zhLabel: '媒合準則' },
                { label: 'Max score', value: '1.00', zhLabel: '滿分' },
            ],
            signals: ['Issue profile', 'Orientation', 'Budget fit', 'Availability', 'Free choice'],
            zhSignals: ['議題輪廓', '治療取向', '預算吻合', '可預約', '自由選擇'],
        },
        storyMoments: [
            { iconKey: 'activity', title: 'The measurement, first', zhTitle: '先量測', body: 'Before any recommendation, the person is measured: seven issue topics rated for importance on a 1–7 scale.', zhBody: '在任何推薦之前，先量測使用者：七個議題各自以 1–7 評分重要程度。' },
            { iconKey: 'target', title: 'The transparent score', zhTitle: '透明的分數', body: 'Four weighted criteria decide the ranking. Nothing is hidden; every added point maps to a stated reason.', zhBody: '四個加權準則決定排序。沒有黑箱；每加一分都對應一個寫明的理由。' },
            { iconKey: 'shield', title: 'Recommendation, not mandate', zhTitle: '推薦而非指派', body: 'The top match is marked, but every option stays open and the person chooses. Their choice is logged as signal.', zhBody: '最佳媒合會被標示，但所有選項都保持開放，由使用者選擇。他們的選擇被記錄為訊號。' },
        ],
        storyChapters: [
            { iconKey: 'activity', label: 'Premise', zhLabel: '前提', title: 'Fit is the product, not the profile wall', zhTitle: '產品是「適配」，不是檔案牆', body: 'The evidence for matching is old and consistent: the working alliance and a client’s own preferences move outcomes more than the brand of therapy. So the design starts by measuring the person, not by decorating a directory.', zhBody: '媒合的證據既老且一致：治療同盟與個案自身的偏好，對療效的影響大於治療的品牌。因此設計從量測使用者開始，而不是把名錄裝飾得更漂亮。', artifact: 'Evidence brief', zhArtifact: '證據摘要' },
            { iconKey: 'layers', label: 'Instrument', zhLabel: '量表', title: 'Turn a questionnaire into a needs profile', zhTitle: '把問卷變成需求輪廓', body: 'Seven issue topics, each rated 1–7 for importance, plus preferences for orientation, budget, and time. One construct per step, a fatigue budget under eight minutes, and a threshold that decides which topics actually drive the match.', zhBody: '七個議題，各以 1–7 評分重要程度，再加上取向、預算與時段的偏好。每步一個構念、疲勞預算控制在八分鐘內，並用一個門檻決定哪些議題真正驅動媒合。', artifact: 'Intake spec', zhArtifact: '量表規格' },
            { iconKey: 'target', label: 'Algorithm', zhLabel: '演算法', title: 'A score you can read out loud', zhTitle: '一個可以唸出來的分數', body: 'Four weighted criteria add to a score out of 1.00, ranked descending. I chose additive rules over cosine distance and learned ranking because there are no users to learn from yet, and because a reviewer must be able to see why a name rose. You can operate the real math in §3.', zhBody: '四個加權準則加總為滿分 1.00 的分數，由高至低排序。我選擇加總規則而非餘弦距離或學習式排序，因為目前還沒有使用者可供學習，也因為審查者必須看得見某個名字為何上升。真實運算可在 §3 親手操作。', artifact: 'Scoring model', zhArtifact: '評分模型' },
            { iconKey: 'monitor', label: 'System', zhLabel: '系統', title: 'Ship the whole path, design the failures', zhTitle: '交付整條路徑，設計失效', body: 'The request path runs from a React intake to a FastAPI scoring endpoint, back to a ranked result and a booking step. The interesting design work is the unhappy paths: skipped items, an all-neutral profile, a dropped connection at submit.', zhBody: '請求路徑從 React 量表到 FastAPI 評分端點，再回到排序結果與預約步驟。真正有意思的設計是不順的路徑：跳題、全中性的輪廓、送出時斷線。', artifact: 'System map', zhArtifact: '系統圖' },
            { iconKey: 'check', label: 'Ethics', zhLabel: '倫理', title: 'Measuring people is an ethical act', zhTitle: '量測人是一種倫理行為', body: 'PsyMatch profiles needs; it does not diagnose. The page states what is stored, what is not, and the boundary where its responsibility ends and a licensed psychologist’s begins — the same care continuum that Emobot+ (project 01) sits at the other end of.', zhBody: 'PsyMatch 描繪需求，並不診斷。本頁寫明儲存什麼、不儲存什麼，以及它的責任在哪裡結束、由合格心理師接手——這條照護連續帶的另一端，正是 Emobot+（專案 01）。', artifact: 'Ethics panel', zhArtifact: '倫理面板' },
        ],
        pullQuote: 'The honest version of a matching product is the one that shows its weights, reports where they fail, and still lets the person overrule it.',
        zhPullQuote: '一個誠實的媒合產品，會攤開它的權重、指出它失準的地方，並且仍然讓使用者可以推翻它。',
        awards: [],
    },
    {
        slug: 'deepscout', num: '09',
        category: 'AI Product Design · Decision Intelligence', zhCategory: 'AI 產品設計 · 決策情報',
        title: 'DeepScout', subtitle: 'AI Scouting Copilot — a working case study',
        zhTitle: 'DeepScout 深科技偵搜副駕', zhSubtitle: '一份做成產品的 AI 產品設計案例',
        hook: 'A scouting copilot that reads funding, patent, news, and team signals, then writes a brief an analyst can defend — sourced, dated, and honest about what it cannot verify. Shipped as a working bilingual site; this page opens the design record behind it.',
        zhHook: '讓 AI 讀融資、專利、新聞與團隊訊號，寫出一份分析師守得住的 brief：欄位附來源與日期，查不到的老實標成未驗證。作品本身是一個上線的雙語網站，這一頁打開的是它背後的設計檔案。',
        stack: ['React 18', 'Vite', 'React Router', 'Interaction Prototyping', 'Design System', 'Bilingual UX Writing'],
        role: 'Product Designer & Sole Builder', zhRole: '產品設計 / 獨立建造',
        timeline: '2026', status: 'Live · 8-chapter bilingual site', zhStatus: '上線 · 八章雙語網站',
        impact: '14 real startups · 4 designed AI states', zhImpact: '14 家真實新創 · 4 種 AI 狀態設計',
        heroBrief: {
            context: 'Analysts must turn fragmented startup signals into decision-ready briefs.',
            zhContext: '分析師需要把分散的新創訊號收斂成可決策的 brief。',
            problem: 'Stale facts and confident AI claims make conclusions hard to defend.',
            zhProblem: '過期事實與過度自信的 AI 主張，讓偵搜結論難以捍衛。',
            strategy: 'Attach sources, retrieval dates, verification gates, and refusal states.',
            zhStrategy: '為每項主張附上來源、日期、驗證關卡與拒答狀態。',
            delivery: '14 real startups · 8 chapters · 4 designed AI states.',
            zhDelivery: '14 家真實新創・8 個章節・4 種 AI 狀態設計。',
        },
        overview: "An analyst's morning usually starts the same way: a dozen tabs open, one for funding news, one for patent search, one for team backgrounds. The thing weighing on them isn't a shortage of information — it's the fear of missing or misreading a single signal. DeepScout's premise is to collapse that scattered noise into one structured brief: every field carries a source and a timestamp, tagged with a confidence level, and anything that can't be verified is marked unverified instead of smoothed into a good-sounding answer.\n\nThis isn't a stack of slides — it's a bilingual site that's actually live. Eight chapters run from Product (an operable Copilot) through Research (personas, journey) and Strategy (risk guardrails, prioritization, experiment design) to System (knowledge graph, design system), and every chapter can be operated by hand. Every decision each chapter argues for eventually shows up, live, inside the Copilot.\n\nThe most honest decision sits in the data layer: the 14 deep-tech startups inside the site are all real and publicly verifiable, their fields frozen as of July 2026 with source links attached. Two were acquired during production; one went through judicial recovery. Those aren't edge cases invented for effect — they're the freshness problem the product exists to handle, and the reason every field carries a retrievedAt stamp instead of a promise that it's still true.\n\nThis page doesn't re-narrate the eight chapters the site already tells — it opens the design record behind them: the premise and its three-way tension, the wireframes and the same brief carried through four passes, the state design for uncertainty, the bilingual copywriting discipline, the quality gates before shipping. I've crawled and built this domain's data layer myself, in projects 02 and 04 — so every product judgment DeepScout makes is shaped by the feel of real data, not imagination.",
        zhOverview: "分析師的一天常是這樣開始的：十幾個分頁攤在螢幕上，融資新聞一頁、專利檢索一頁、團隊背景一頁，心裡懸著的不是資訊太少，而是漏看或看錯一個訊號。DeepScout 的命題是把這些散落的雜訊收斂成一份結構化 brief：每個欄位附來源與時效戳、標好信心等級，查不到的就標成未驗證，而不是替你圓一個好聽的答案。\n\n這個作品不是一疊 slides，而是一個上線的雙語網站。八個章節從產品（可操作的 Copilot）、研究（persona、旅程）、策略（風險護欄、優先級、實驗設計）到系統（知識圖譜、設計系統），每一章都能動手操作，而且每一章談的決策，最後都能在 Copilot 裡找到對應。\n\n最誠實的決策在資料層：站內 14 家深科技新創全部真實、公開可查，欄位凍結於 2026 年 7 月並附來源連結。製作期間有兩家被收購、一家經歷司法重整後復原。這些真實變動不是意外，正是產品要處理的「資料時效」問題本身，也是每個欄位都帶 retrievedAt 的理由。\n\n這一頁不重講網站已經講過的八章，而是打開它的設計檔案：命題與三方張力、線框與同一份 brief 的四道工序、不確定性的狀態設計、雙語文案工程、上線前的品質關卡。這個領域的資料層我自己爬過、建過（專案 02、04），所以 DeepScout 的每一個產品判斷，都是從資料的手感長出來的，不是從想像。",
        overviewSingle: "DeepScout turns an analyst's scattered funding, patent, team, and market research into one structured brief where every field carries a source, retrieval date, confidence level, or explicit unverified state. The shipped bilingual site connects eight operable chapters, from research and strategy to knowledge graph and design system, with each decision reflected in the Copilot. Its evidence layer uses 14 real, publicly verifiable deep-tech companies frozen as of July 2026, including acquisitions and judicial recovery that expose the freshness problem the product must handle. This case opens the design record behind the live system, including wireframes, uncertainty states, bilingual copy, and release quality gates.",
        zhOverviewSingle: "DeepScout 將分析師分散在融資、專利、團隊與市場研究中的訊號，收斂成一份結構化 brief；每個欄位都附來源、擷取日期、信心等級，或明確標示為未驗證。這個已上線的雙語網站由八個可操作章節組成，從研究、策略到知識圖譜與設計系統，所有決策最終都反映在 Copilot 中。資料層採用 14 家真實且公開可查的深科技新創，凍結於 2026 年 7 月，並保留收購與司法重整等變動來呈現資料時效問題；本案例則公開線框、不確定性狀態、雙語文案與上線品質關卡等完整設計紀錄。",
        outcomes: [
            'Shipped an 8-chapter bilingual case-study site centered on an operable scouting Copilot — every chapter is a working artifact, not a slide.',
            'Designed AI honesty as a first-class citizen: strong-signal, low-confidence, insufficient-signal refusal, and feed-timeout states, plus UNVERIFIED / CONFLICTING field flags.',
            'Replaced fictional data with 14 real, sourced, dated startups — two were acquired mid-production, which proved the product\'s freshness thesis rather than undermining it.',
            'Built a metric tree (1 north star + 4 input + 3 guardrail metrics) and an operable experiment design with sample size computed live off an MDE slider.',
            'Mapped every generative-AI risk to a shipped guardrail: fabrication → refusal state, hype → mandatory sourcing, staleness → retrieval timestamps.',
            'Rewrote all Traditional Chinese copy natively rather than translating it, under a six-rule style guide, and gated shipping with automated checks (console errors, 360px overflow, a11y, bilingual smoke test).',
        ],
        zhOutcomes: [
            '上線八章雙語案例網站，中心是可操作的偵搜 Copilot——每一章都是活文件，不是投影片。',
            '把 AI 的誠實設計成一等公民：強訊號、低信心、訊號不足拒答、來源逾時四種狀態，加上 UNVERIFIED／CONFLICTING 欄位旗標。',
            '用 14 家真實、附來源與日期的新創取代虛構資料；其中兩家在製作期間被收購，恰好驗證了產品主張的時效問題。',
            '建立指標樹（北極星＋4 input＋3 guardrail），並做出樣本數隨 MDE 即時計算的可操作實驗設計。',
            '把每個生成式 AI 風險對應到已上線的護欄：捏造→拒答狀態、hype→來源必填、過期→時效戳。',
            '繁中文案依六條守則獨立撰寫而非翻譯，並以自動化檢查（console／360px 溢出／a11y／雙語 smoke）守住上線品質。',
        ],
        tech: [
            { label: 'Frontend', val: 'Vite, React 18, react-router-dom — no UI/CSS framework' },
            { label: 'Product Core', val: 'Simulated signal-scan replay, structured brief schema, HITL verify / flag / re-scan' },
            { label: 'Data Layer', val: '14 real startups, per-field source + retrievedAt, knowledge-graph relations' },
            { label: 'AI-State Design', val: '4 designed states + UNVERIFIED / CONFLICTING flags, per-field confidence' },
            { label: 'i18n & Copy', val: 'EN / 繁中 independently written, 6-rule style guide, ⌘K palette, deep links' },
            { label: 'Quality', val: 'verify.mjs: console sweep, 360px overflow scan, axe a11y, EN/中 smoke test' },
        ],
        caseHeroImage: DEEPSCOUT_HERO_IMAGE,
        storyIntro: {
            kicker: 'SCOUTING CONSOLE', zhKicker: '偵搜主控台',
            title: 'The brief that shows its doubt', zhTitle: '敢說未驗證的偵搜簡報',
            lead: 'Four signal sources, four designed AI states, fourteen real startups — the design record behind a live scouting copilot that cites, dates, and sometimes refuses.',
            zhLead: '四路訊號、四種 AI 狀態、十四家真實新創——一個上線偵搜副駕背後的設計檔案：附來源、標日期，必要時拒答。',
            motif: 'orbit',
        },
        caseDeck: {
            eyebrow: 'Scouting console', zhEyebrow: '偵搜主控台',
            title: 'From scattered signal to a brief you can defend',
            zhTitle: '把散落的訊號，收斂成一份守得住的 brief',
            body: 'A console that actually runs: scan four signal sources, resolve them into a sourced, confidence-scored brief, and refuse to write one when the signal is too thin to defend.',
            zhBody: '真的能操作的副駕：掃描四路訊號、解析成附來源標信心的 brief，訊號太稀薄時會拒答而不是硬編。',
            kpis: [
                { label: 'Real startups', value: '14', zhLabel: '真實新創' },
                { label: 'Chapters', value: '8', zhLabel: '章節' },
                { label: 'AI states', value: '4', zhLabel: 'AI 狀態' },
            ],
            signals: ['Scan', 'Resolve', 'Flag', 'Verify', 'Decide'],
            zhSignals: ['掃描', '解析', '標記', '驗證', '決策'],
        },
        storyMoments: [
            { iconKey: 'activity', title: 'The tab-hell morning', zhTitle: '分頁地獄的早晨', body: "A scouting pass starts with a dozen open tabs. What's feared isn't a shortage of information — it's missing or misreading one signal. The problem is not volume; it's whether the conclusion can be defended.", zhBody: '一次偵搜從十幾個分頁開始，怕的是漏看或看錯一個訊號。問題不是資訊量，是結論守不守得住。' },
            { iconKey: 'shield', title: 'The step that cannot be skipped', zhTitle: '不能跳過的那一步', body: 'The core loop has six moves; step five is human verification. Without it, a brief never becomes a decision — the product enforces that at the loop level, not as a suggestion.', zhBody: '核心迴圈六個動作，第五步是人工驗證。沒有這一步，brief 就不會變成決策，產品層面直接擋住。' },
            { iconKey: 'target', title: 'The acquisitions that proved the thesis', zhTitle: '驗證命題的兩樁收購', body: "Two of the fourteen companies were acquired while this case study was being built. That's exactly why every field carries a retrieval date instead of a promise that it's still true.", zhBody: '十四家公司裡有兩家在製作期間被收購。這正是每個欄位都帶時效戳、而不是打包票的理由。' },
        ],
        outcomeModules: [
            { num: '01', id: 'ds-mb' },
            { num: '02', id: 'ds-m05' },
            { num: '03', id: 'ds-m08' },
            { num: '04', id: 'ds-m09' },
            { num: '05', id: 'ds-m10' },
            { num: '06', id: 'ds-m07' },
        ],
        storyChapters: [
            { iconKey: 'globe', label: 'Thesis', zhLabel: '命題', title: 'Three readers, one brief', zhTitle: '三種讀者，一份 brief', body: 'The analyst wants speed, the innovation lead wants signal-to-noise, the scouted startup fears being misjudged on stale data. That three-way tension is what the product scope collapsed into.', zhBody: '分析師要速度、主管要訊噪比、新創怕被誤判，張力收斂成產品範圍。', artifact: 'Tension map', zhArtifact: '張力圖' },
            { iconKey: 'layers', label: 'Loop', zhLabel: '迴圈', title: 'Design the loop before the screen', zhTitle: '先設計迴圈，再畫畫面', body: 'The six-step core loop was fixed before a single screen was drawn, with human verification written in as a hard product-level rule, not a nice-to-have.', zhBody: '六步核心迴圈，人工驗證寫成產品層的硬規則。', artifact: 'Core loop', zhArtifact: '核心迴圈' },
            { iconKey: 'shield', label: 'Doubt', zhLabel: '不確定', title: 'Give uncertainty its own interface', zhTitle: '給不確定性一個介面', body: 'Refusal is a designed state, not an error page. A flag is worth more than a beautifully confident answer that turns out to be wrong.', zhBody: '拒答是設計出來的狀態，不是錯誤頁；旗標比華麗的答案更值錢。', artifact: 'State specs', zhArtifact: '狀態規格' },
            { iconKey: 'activity', label: 'Evidence', zhLabel: '真資料', title: 'Pay the price of real data', zhTitle: '付出真資料的代價', body: 'Fourteen verifiable companies, acquisitions and disputed narratives included rather than hidden, are what make the retrieval-date stamp mean something.', zhBody: '14 家可查證的公司，收購與爭議照登，時效戳因此成立。', artifact: 'Sourced dataset', zhArtifact: '附來源資料集' },
            { iconKey: 'check', label: 'Ship', zhLabel: '上線', title: 'Ship it, then prove it holds', zhTitle: '上線，然後證明它站得住', body: 'Natively written bilingual copy, automated quality gates, and a brief designed to be the one thing on the site worth printing.', zhBody: '雙語獨立撰寫、自動化品質關卡、可列印的 brief。', artifact: 'Quality gates', zhArtifact: '品質關卡' },
        ],
        pullQuote: 'The most honest sentence an AI product can say is "unverified." DeepScout is designed around the moments it has to say it.',
        zhPullQuote: 'AI 產品最誠實的一句話是「未驗證」。DeepScout 的整套設計，都圍繞著它必須說出這句話的時刻。',
        certWall: [
            { img: 'ibm-ai-engineering.webp', name: 'IBM AI Engineering', zhName: 'IBM AI 工程專業證書', issuer: 'IBM',
                focus: 'Model behavior, evaluation, and failure modes — the grounding behind the refusal states and the verification-first copilot design',
                zhFocus: '模型行為、評估與失效模式——支撐拒答狀態與「先驗證再回答」的 copilot 設計' },
            { img: 'ibm-ai-product-manager.webp', name: 'IBM AI Product Manager', zhName: 'IBM AI 產品經理專業證書', issuer: 'IBM',
                focus: 'AI product scoping and risk judgment — applied in the six-step core loop and the product-level human-verification rule',
                zhFocus: 'AI 產品範圍界定與風險判斷——應用於六步核心迴圈與人工驗證的產品層硬規則' },
            { img: 'meta-full-stack-developer.webp', name: 'Meta Full Stack Developer', zhName: 'Meta 全端工程師專業證書', issuer: 'Meta',
                focus: 'Frontend implementation discipline — the shipped React interface, its designed states, and the quality gates behind it',
                zhFocus: '前端實作紀律——上線的 React 介面、精心設計的狀態，與背後的自動化品質關卡' },
        ],
        awards: [],
    },
    {
        slug: 'field-journey', num: '10',
        category: 'Service Design in the Field', zhCategory: '社福×醫療場域的服務設計實務',
        title: 'Field Journey', subtitle: 'Three stations of care, data, and design',
        zhTitle: '三站田野', zhSubtitle: '在醫療與社福場域長出來的設計',
        hook: 'Before I designed AI products, I spent three years as a project assistant inside a hospital institution, a family-welfare association, and a ministry-level mental-health center. This page packages that fieldwork the way I package products: a journey, reconstructed artifacts you can operate, and the skills that carried forward.',
        zhHook: '在設計 AI 產品之前，我在醫院附設機構、社福協會與部級心衛中心當了三年計畫助理。這一頁用我包裝產品的方式包裝那段田野：一段旅程、可實際操作的重建產出，和那些被帶走的能力。',
        stack: ['Service Design', 'AAC / Accessibility', 'Data & Scale Design', 'Form Design', 'Content Production', 'Event Operations'],
        role: 'Project Assistant · 3 institutions', zhRole: '計畫助理 · 三個機構',
        timeline: '2021 – 2023', status: 'Field record · 3 stations', zhStatus: '田野紀錄 · 三站',
        impact: 'Hospital · NGO · ministry-level center', zhImpact: '醫院 · 協會 · 部級中心',
        heroBrief: {
            context: 'Care teams need tools that work across people, cases, and institutions.',
            zhContext: '醫療與社福現場需要能跨越不同使用者、個案與機構尺度的工具。',
            problem: 'Standard materials and workflows often fail frontline needs.',
            zhProblem: '標準教材、表單與流程，往往接不住第一線的真實需求。',
            strategy: 'Turn field observation into AAC, instruments, content, and coordination.',
            zhStrategy: '從田野觀察出發，設計 AAC、量表、內容與協作流程。',
            delivery: '3 institutions · nearly 3 years · 5 practice lines carried forward.',
            zhDelivery: '3 個機構・近 3 年田野・5 條延續至今的實務能力。',
        },
        overview: "Before any of the dashboards in this portfolio existed, I spent close to three years as a project assistant in three very different institutions: a hospital-affiliated facility serving autistic residents, a small children-and-family welfare association, and a mental-health center in the Ministry of Health and Welfare system. The job title never said designer. The work kept insisting on it.\n\nEach station taught a different scale. At Mennonite's Liming Institution I served on the floor and built what the floor needed — structured course materials and AAC communication boards for people whom standard interfaces don't serve. At the association, a team small enough to count on two hands meant one seat covered statistics, scale design, podcast production, web content, and event logistics. At the ministry-level center, the same crafts scaled up into strategy, cross-department coordination, and resource integration.\n\nThis page treats those three years with the same case-study discipline as the other nine projects — but in a different voice: a warm paper world instead of a console, a journey map, one chapter per station, and reconstructed artifacts you can operate. A communication board that builds sentences. The annual data report that argued for program funding. The intake form redesigned around case types, where the crisis path asks the least.\n\nOne honesty note, in the same spirit as the rest of this portfolio: this is work experience packaged as a case study, not a product launch. Institutional facts are real; artifact details are re-drawn from memory and stamped accordingly; numbers I can no longer verify are left out rather than invented.",
        zhOverview: "在這本作品集的任何一座儀表板出現之前，我當了將近三年的計畫助理，走過三個非常不同的機構：服務自閉症院生的醫院附設機構、一個小小的兒童暨家庭關懷協會，以及衛福部體系下的心理衛生中心。職稱裡從來沒有「設計」兩個字，但工作本身一直堅持要它。\n\n每一站教的是不同的尺度。在門諾黎明機構，我在第一線服務，也為第一線做東西——結構化課程教材，和給「一般介面服務不到的人」的 AAC 溝通板。在協會，十指可數的團隊意味著一個位子要同時扛統計、量表設計、Podcast 產製、網站內容與活動後勤。到了部級的心衛中心，同樣的手藝被放大成策略、跨部門協調與資源整合。\n\n這一頁用和其他九個專案相同的 case-study 紀律來對待這三年——但換了一種聲音：不是主控台，而是一個暖紙色的世界；一張旅程地圖、一站一章，以及可以實際操作的重建產出。拼得出句子的溝通板、把經費說服下來的年度數據報告、依個案分流重新設計的諮詢表單——危機那條路，問得最少。\n\n照這本作品集一貫的誠實原則說明：這是工作經歷，用案例的方式整理，不是一次產品上線。機構事實為真；產出物細節依記憶重繪並蓋上對應戳章；已無法查證的數字，寧可留白也不編造。",
        overviewSingle: "Before building the dashboards in this portfolio, I spent nearly three years working across a hospital-affiliated autism service, a small children-and-family welfare association, and a ministry-level mental-health center. Each setting taught a different scale of design practice: AAC boards and structured teaching materials on the frontline; statistics, instruments, content production, and event operations in a small team; then strategy, cross-department coordination, and resource integration at institutional scale. This case reconstructs that fieldwork through a journey map and operable artifacts while remaining explicit that it is work experience, not a product launch; institutional facts are real, artifacts are redrawn from memory, and unverifiable numbers remain omitted.",
        zhOverviewSingle: "在作品集的儀表板出現之前，我曾用近三年走過醫院附設自閉症服務機構、小型兒童暨家庭關懷協會，以及衛福部體系的心理衛生中心。三個場域分別教會我不同尺度的設計實務：第一線的 AAC 溝通板與結構化教材、小團隊中的統計、量表、內容與活動營運，以及部級單位的策略、跨部門協調與資源整合。本案例以旅程地圖與可操作的重建產出整理這段田野，同時清楚說明它是工作經歷而非產品上線；機構事實為真，產出依記憶重繪，無法查證的數字則保留空白。",
        outcomes: [
            'Designed and produced AAC communication boards and structured course materials for autistic residents — accessibility practice before I knew its name.',
            'Planned the statistical workflow, designed the scales, and built the annual data report that argued for program funding alongside the psychologists.',
            'Ran an end-to-end content pipeline — interview outlines, guest invitations, recording, post-production, publishing — plus the association website and visual materials.',
            'Redesigned counseling intake forms around case types and consultation purposes, so the crisis path asks the least.',
            'Planned and ran lectures and large-scale events end to end, then coordinated cross-department resource surveys and integration at ministry level.',
            'Carried five craft lines out of the field — data, instruments, accessibility, content, operations — each traceable to the portfolio projects where it lives now.',
        ],
        zhOutcomes: [
            '為自閉症院生設計並製作 AAC 溝通板與結構化課程教材——在我認識「無障礙設計」這個詞之前，就先做了它。',
            '規劃統計流程、設計量表，完成年度數據報告，並和心理師一起用這份證據爭取計畫經費。',
            '一個人跑完整條內容產線——訪談大綱、邀稿、錄音、後製、上架——外加協會網站與視覺物。',
            '依個案類型與諮詢目的重新設計諮詢諮商表單，讓危機路徑問得最少。',
            '端到端籌辦講座與大型活動，並在部級單位協調跨部門的資源調查與整合。',
            '從田野帶走五條手藝線——資料、工具、無障礙、內容、營運——每一條都能對到它現在住的作品集專案。',
        ],
        tech: [
            { label: 'Care & Accessibility', val: 'Daily autism services, AAC picture boards, structured teaching materials' },
            { label: 'Data & Statistics', val: 'Case-data pipelines, scale design, annual integrated analysis and visualization' },
            { label: 'Forms & Instruments', val: 'Counseling intake forms differentiated by case type and consultation purpose' },
            { label: 'Content Production', val: 'Podcast pipeline (outline → publish), web publishing, copywriting and layout' },
            { label: 'Event Operations', val: 'Theme design, guest invitations, venue, promotion, logistics, feedback follow-up' },
            { label: 'Coordination', val: 'Team strategy, cross-department and cross-institution resource integration' },
        ],
        caseHeroImage: FIELD_HERO_IMAGE,
        storyIntro: {
            kicker: 'FIELD NOTES', zhKicker: '田野筆記',
            title: 'Three stations, one practice', zhTitle: '三站田野，一條手藝',
            lead: 'A hospital floor, a small association, a ministry-level center — three years of care work, packaged with the same discipline as the other cases: a journey, operable artifacts, and the skills that carried forward.',
            zhLead: '醫院第一線、小協會、部級中心——三年田野現場，用和其他案例相同的紀律整理：一段旅程、可操作的重建產出，與被帶走的能力。',
            motif: 'paper',
        },
        caseDeck: {
            eyebrow: 'Field log', zhEyebrow: '田野日誌',
            title: 'Three institutions, one continuous practice',
            zhTitle: '三個機構，一條連續的實務',
            body: 'Three stations read as one practice: serve people directly, measure what the service does, design the instruments, produce the content, and coordinate the people who make it land.',
            zhBody: '三站讀起來是同一條實務：直接服務人、量測服務的效果、設計工具、產製內容，然後協調讓這一切落地的人。',
            kpis: [
                { label: 'Institutions', value: '3', zhLabel: '機構' },
                { label: 'Craft lines', value: '5', zhLabel: '手藝線' },
                { label: 'Years', value: '~3', zhLabel: '年' },
            ],
            signals: ['Serve', 'Measure', 'Design', 'Produce', 'Coordinate'],
            zhSignals: ['服務', '量測', '設計', '產製', '協調'],
        },
        storyMoments: [
            { iconKey: 'heart', title: 'The sentence on the strip', zhTitle: '句條上的那句話', body: 'The first time a nonverbal resident used a board we made to say what he wanted, the room understood what design is for.', zhBody: '當無口語的院生第一次用我們做的溝通板說出他想要什麼，整個空間都明白了設計是做什麼用的。' },
            { iconKey: 'chart', title: 'Numbers that argued', zhTitle: '會說話的數字', body: 'A year of case data, cleaned and visualized, then read aloud with the psychologists — and the program funding followed.', zhBody: '一整年的個案資料被清整、視覺化，再和心理師一起對讀——計畫經費跟著來了。' },
            { iconKey: 'globe', title: 'The table got bigger', zhTitle: '桌子變大了', body: 'At ministry level the deliverable changed: not an artifact but an agreement — which unit offers what resource, and who follows up.', zhBody: '到了部級單位，交付物變了：不是一件產出，而是一份共識——哪個單位出什麼資源、誰負責跟進。' },
        ],
        outcomeModules: [
            { num: '03', id: 'fj-c03' },
            { num: '04', id: 'fj-c04' },
            { num: '04', id: 'fj-c04' },
            { num: '05', id: 'fj-c05' },
            { num: '05', id: 'fj-c05' },
            { num: '07', id: 'fj-c07' },
        ],
        storyChapters: [
            { iconKey: 'map', label: 'Route', zhLabel: '路線', title: 'Three institutions, one route', zhTitle: '三個機構，一條路', body: 'Hospital floor, small association, ministry-level center — the same person walking three scales of the same care system.', zhBody: '醫院第一線、小協會、部級中心——同一個人，走過同一套照護系統的三種尺度。', artifact: 'Journey map', zhArtifact: '旅程地圖' },
            { iconKey: 'heart', label: 'Serve', zhLabel: '服務', title: 'Design starts on the floor', zhTitle: '設計從第一線開始', body: 'Daily autism services set the bar: if a course step or a picture card was ambiguous, it failed immediately and visibly.', zhBody: '自閉症日常服務把標準定死：課程步驟或圖卡只要模糊，立刻且明顯地失敗。', artifact: 'AAC board', zhArtifact: '溝通板' },
            { iconKey: 'chart', label: 'Measure', zhLabel: '量測', title: 'Scales, statistics, and an argument', zhTitle: '量表、統計，與一場說服', body: 'Case data became scales, scales became an annual report, and the report became the argument that won program funding.', zhBody: '個案資料變成量表，量表變成年報，年報變成把經費說服下來的那場論證。', artifact: 'Annual report', zhArtifact: '年度報告' },
            { iconKey: 'mic', label: 'Produce', zhLabel: '產製', title: 'One seat, a whole pipeline', zhTitle: '一個位子，一條產線', body: 'Podcast episodes, web content, visual materials — outlined, recorded, edited, and published from a single seat.', zhBody: 'Podcast、網站內容、視覺物——從大綱、錄音、剪輯到上架，都是同一個位子做完的。', artifact: 'Content pipeline', zhArtifact: '內容產線' },
            { iconKey: 'trend', label: 'Carry', zhLabel: '帶走', title: 'What walked out with me', zhTitle: '跟著我走出來的', body: 'Five craft lines — data, instruments, accessibility, content, operations — each now living inside projects 01–09.', zhBody: '五條手藝線——資料、工具、無障礙、內容、營運——如今都住在專案 01–09 裡。', artifact: 'Skills bridge', zhArtifact: '技能橋接' },
        ],
        pullQuote: 'The field taught the lesson no tool teaches: a form, a board, or a report has to work for someone who cannot tell you it doesn\'t.',
        zhPullQuote: '田野教了工具教不了的事：一張表單、一塊溝通板、一份報告，必須為「沒辦法告訴你它不好用」的人工作。',
        awards: [],
    },
    {
        slug: 'brain-and-learning', num: '11',
        category: 'Cognitive Neuroscience Research', zhCategory: '認知神經科學研究',
        title: 'Brain, Mind & Learning', subtitle: 'fMRI research on attention, presence, and how people learn',
        zhTitle: '腦・心智・學習', zhSubtitle: '一場關於注意力、臨場感與學習的 fMRI 研究',
        hook: 'Before I designed AI products, I spent two years inside a cognitive-neuroscience lab, designing experiments that step outside the sterile button-press paradigm. This page packages that science the way I package products: a naturalistic study, two genuinely novel analysis methods, and the real figures and photographs from the two conferences that tested it in public.',
        zhHook: '在設計 AI 產品之前，我在認知神經科學實驗室待了兩年，設計跳脫「按鍵反應」制式典範的實驗。這一頁用我包裝產品的方式包裝這門科學：一項自然情境研究、兩套真正新穎的分析方法，以及兩場公開檢驗它的會議留下的真實圖片與照片。',
        stack: ['fMRI & Neuroimaging', 'Experimental Design', 'R / Python / MATLAB / SPSS', 'Statistics & Machine Learning', 'Academic Writing & Presentation'],
        role: 'Research Assistant · M.S. Thesis', zhRole: '研究助理 · 碩士論文',
        timeline: '2023 – 2025', status: 'Published research · 2 conferences', zhStatus: '已發表研究 · 兩場會議',
        impact: 'TSCN Excellent Award · OHBM Brisbane', zhImpact: 'TSCN 優等獎 · OHBM 布里斯本',
        heroBrief: {
            context: 'Natural learning needs research methods closer to real attention.',
            zhContext: '自然學習情境需要更貼近真實注意力運作的研究方法。',
            problem: 'Single-region analysis misses network differences in continuous learning.',
            zhProblem: '單一腦區分析難以解釋連續學習中的跨網絡連結差異。',
            strategy: 'Combine naturalistic fMRI, network connectivity, and ML classification.',
            zhStrategy: '結合自然情境 fMRI、網絡功能連結與機器學習分類。',
            delivery: '43 participants · 3 brain networks · TSCN award and OHBM presentation.',
            zhDelivery: '43 位受試者・3 個腦網絡・TSCN 優等獎與 OHBM 發表。',
        },
        overview: "Before any of the consoles in this portfolio existed, I spent close to two years as a research assistant at the Taiwan Mind and Brain Imaging Center, running MRI, cognitive, and physiological experiments across child and adult participants. Alongside that floor work, I carried a flagship study of my own — one built on a deliberate departure from how this kind of research usually gets done.\n\nMost fMRI attention research still relies on artificial, repeated-trial tasks. This study used a naturalistic paradigm instead: 43 participants watched one continuous lecture, delivered either by a dynamic live instructor or a static instructor image. The real innovation was in what came after — reading the result not through single-region activation, but through network-wise functional connectivity across the Frontoparietal, Salience, and Default Mode networks, and through a machine-learning classifier trained on those connectivity features.\n\nThis page treats that research with the same case-study discipline as the other ten projects — but in a different register: a journal-paper world instead of a console. Rather than building custom charts to dramatize results, it shows the real methodology figures and photographs from the actual thesis and its two conferences — the award, the poster, the connectivity diagram, the classification pipeline. The work was recognized with The Excellent Award at the 2025 Taiwan Society for Cognitive Neuroscience Annual Meeting, and presented internationally at the 2025 OHBM Annual Meeting in Brisbane.\n\nOne honesty note, in the same spirit as the rest of this portfolio: institutional facts, the thesis design, the methodology, and the directional findings are real and already published. No specific experimental statistics are disclosed on this page — the figures shown are the actual analysis diagrams, and the text describes direction and method, not exact numbers.",
        zhOverview: "在這本作品集的任何一座主控台出現之前，我在台灣心智科學腦造影中心當了將近兩年的研究助理，執行橫跨孩童與成人受試者的 MRI、認知與生理實驗。在第一線工作之餘，我也帶著一項屬於自己的旗艦研究——一項刻意背離這類研究慣常做法的研究。\n\n多數 fMRI 注意力研究仍仰賴人工化、重複試次的作業設計。這項研究改用自然情境典範：43 名受試者觀看一段連續的講課內容，分別由動態真人講師或靜態講師圖像呈現。真正的創新在於後續的分析方式——不是看單一腦區活化，而是透過額葉頂葉網絡、顯著性網絡與預設模式網絡之間的網絡層級功能性連結，並用建立在這些連結特徵上的機器學習分類器來解讀。\n\n這一頁用和其他十個專案相同的 case-study 紀律來對待這項研究——但換了一種語域：不是主控台，而是一個期刊論文的世界。這裡不打造自製圖表來誇飾結果，而是展示碩論與兩場會議留下的真實方法論圖版與照片——獎項、海報、連結分析示意圖、分類流程圖。這項研究獲頒 2025 年台灣認知神經科學年會（TSCN）碩士論文優等獎，並於 2025 年 OHBM 年會於澳洲布里斯本進行國際發表。\n\n照這本作品集一貫的誠實原則說明：機構事實、研究設計、方法論與方向性發現皆為真實且已公開發表。此頁面不揭露任何具體實驗統計數字——所展示的圖版皆為實際分析示意圖，文字描述的是方向與方法，而非精確數值。",
        overviewSingle: "During nearly two years at the Taiwan Mind and Brain Imaging Center, I ran MRI, cognitive, and physiological experiments while leading a naturalistic fMRI study of attention and learning. Forty-three participants watched one continuous lecture presented by either a dynamic live instructor or a static instructor image; analysis then moved beyond single-region activation to functional connectivity across the Frontoparietal, Salience, and Default Mode networks, supported by a machine-learning classifier. The case uses real thesis and conference materials rather than decorative charts. The work received the 2025 TSCN Excellent Award and was presented at OHBM Brisbane, while this page reports methods and directional findings without disclosing specific experimental statistics.",
        zhOverviewSingle: "在台灣心智科學腦造影中心近兩年的研究助理工作中，我執行 MRI、認知與生理實驗，並主導一項自然情境 fMRI 的注意力與學習研究。43 名受試者觀看由動態真人講師或靜態講師圖像呈現的連續課程，分析則跳脫單一腦區活化，檢視額葉頂葉、顯著性與預設模式三個網絡的功能性連結，並以機器學習分類器輔助解讀。本案例直接使用真實碩論與會議材料；研究獲 2025 TSCN 優等獎並於 OHBM 布里斯本發表，頁面僅呈現方法與方向性發現，不揭露具體實驗統計。",
        outcomes: [
            'Ran MRI, cognitive, and physiological experiments end to end at the Taiwan Mind and Brain Imaging Center, across child and adult participants.',
            'Designed a naturalistic fMRI paradigm — a real, continuous lecture rather than an artificial repeated-trial task — contrasting a dynamic live instructor against a static instructor image across 43 participants.',
            'Applied network-wise functional connectivity analysis across the Frontoparietal, Salience, and Default Mode networks — moving the analysis past single-region activation.',
            'Built a machine-learning classification pipeline (feature selection, leave-one-out cross-validation, logistic regression, ROC/AUC) that separated learner groups from connectivity features alone.',
            'Won The Excellent Award for the thesis at TSCN 2025, and presented the findings internationally at OHBM 2025 in Brisbane.',
            'Carried the underlying discipline — naturalistic experimental design, connectivity-based analysis, classification methodology — into the UX research and data-product work in projects 01–10.',
        ],
        zhOutcomes: [
            '在台灣心智科學腦造影中心執行橫跨孩童與成人受試者的 MRI、認知與生理實驗全流程。',
            '設計一項自然情境 fMRI 典範——以一段真實連續的講課內容取代人工化重複試次作業——比較 43 名受試者觀看動態真人講師與靜態講師圖像的差異。',
            '運用網絡層級功能性連結分析，橫跨額葉頂葉網絡、顯著性網絡與預設模式網絡——讓分析跳脫單一腦區活化。',
            '建立機器學習分類流程（特徵選取、留一法交叉驗證、邏輯迴歸、ROC／AUC），僅憑連結特徵便能區分學習者群組。',
            '碩士論文於 TSCN 2025 榮獲優等獎，並於 2025 年 OHBM 布里斯本年會進行國際發表。',
            '把底層紀律——自然情境實驗設計、連結基礎分析、分類方法論——帶進專案 01–10 的 UX 研究與資料產品工作。',
        ],
        tech: [
            { label: 'Experimental Design', val: 'Naturalistic paradigm — continuous lecture stimulus, live vs. static instructor, N=43, MRI/cognitive/physiological protocols' },
            { label: 'Neuroimaging Analysis', val: 'Network-wise functional connectivity (Frontoparietal · Salience · Default Mode), preprocessing, multivariate integration with behavioral data' },
            { label: 'Statistics & ML', val: 'SPSS, R, Python, MATLAB — median-split classification, RFE feature selection, leave-one-out cross-validation, logistic regression' },
            { label: 'Academic Communication', val: 'Oral presentation (TSCN 2025), international poster (OHBM 2025), academic report writing' },
        ],
        caseHeroImage: BRAIN_HERO_IMAGE,
        storyIntro: {
            kicker: 'RESEARCH RECORD', zhKicker: '研究紀錄',
            title: 'Let the brain do what it does', zhTitle: '讓大腦做它會做的事',
            lead: 'A naturalistic fMRI study — 43 participants, one continuous lecture, three networks — read through functional connectivity and a classifier, then defended at TSCN and OHBM Brisbane.',
            zhLead: '一項自然情境 fMRI 研究——43 名受試者、一段連續講課、三個腦網絡——以功能性連結與分類器解讀，並於 TSCN 與 OHBM 布里斯本公開檢驗。',
            motif: 'wave',
        },
        caseDeck: {
            eyebrow: 'Research record', zhEyebrow: '研究紀錄',
            title: 'Two years, one flagship study',
            zhTitle: '兩年，一項旗艦研究',
            body: 'Design an experiment, collect the data, find the connectivity signature, defend it twice — the same spine that now runs every case study in this portfolio.',
            zhBody: '設計實驗、收集資料、找出連結訊號、上台辯護兩次——這正是現在跑在作品集每一個案例底下的同一條脊椎。',
            kpis: [
                { label: 'Participants', value: '43', zhLabel: '受試者' },
                { label: 'Networks studied', value: '3', zhLabel: '研究網絡' },
                { label: 'Conferences', value: '2', zhLabel: '會議發表' },
            ],
            signals: ['Design', 'Collect', 'Analyze', 'Model', 'Present'],
            zhSignals: ['設計', '收集', '分析', '建模', '發表'],
        },
        storyMoments: [
            { iconKey: 'zap', title: 'Trading control for reality', zhTitle: '用控制力換真實', body: 'Deciding to hand a scanner participant a real, continuous lecture instead of another button-press task — and trusting that the analysis method could catch up.', zhBody: '決定讓掃描儀裡的受試者看一段真實、連續的講課內容，而不是又一個按鍵反應作業——並相信分析方法跟得上這個決定。' },
            { iconKey: 'award', title: 'The name they called', zhTitle: '被念出來的那個名字', body: 'Hearing "The Excellent Award" called at TSCN 2025 for a thesis that started as a stubborn question about eye contact and attention.', zhBody: '在 TSCN 2025 聽見自己的碩論被念出「優等獎」——它原本只是一個關於眼神接觸與注意力的固執提問。' },
            { iconKey: 'globe', title: 'A poster in Brisbane', zhTitle: '布里斯本的那張海報', body: 'Explaining a naturalistic connectivity paradigm to researchers who had never met a UX designer who could also run a classifier — and vice versa.', zhBody: '向從沒遇過「也會跑分類器的 UX 設計師」的研究者解釋自然情境連結典範——反之亦然。' },
        ],
        outcomeModules: [
            { num: '03', id: 'bl-c03' },
            { num: '04', id: 'bl-c04' },
            { num: '05', id: 'bl-c05' },
            { num: '06', id: 'bl-c06' },
            { num: '07', id: 'bl-c07' },
            { num: '09', id: 'bl-c09' },
        ],
        storyChapters: [
            { iconKey: 'target', label: 'Question', zhLabel: '提問', title: 'The question behind the dashboards', zhTitle: '儀表板背後的提問', body: 'Two years inside a cognitive-neuroscience lab, testing what every learning interface quietly assumes.', zhBody: '兩年在認知神經科學實驗室，驗證每一個學習介面都在默默假設的事。', artifact: 'Abstract', zhArtifact: '摘要' },
            { iconKey: 'activity', label: 'Lab', zhLabel: '實驗室', title: 'Running the experiments', zhTitle: '執行實驗', body: 'MRI, cognitive, and physiological sessions across children and adults, at the Taiwan Mind and Brain Imaging Center.', zhBody: '在台灣心智科學腦造影中心，執行橫跨孩童與成人的 MRI、認知與生理實驗。', artifact: 'Lab role', zhArtifact: '實驗室角色' },
            { iconKey: 'zap', label: 'Design', zhLabel: '設計', title: 'A naturalistic paradigm, N = 43', zhTitle: '自然情境典範，N = 43', body: 'A real, continuous lecture in two formats — trading some experimental control for ecological validity.', zhBody: '一段真實連續的講課內容、兩種呈現格式——用一部分實驗控制力，換取生態效度。', artifact: 'Fig. 1–2', zhArtifact: '圖一至圖二' },
            { iconKey: 'trend', label: 'Method', zhLabel: '方法', title: 'Functional connectivity + ML classification', zhTitle: '功能性連結＋機器學習分類', body: 'Two novel analysis lenses — network-wise connectivity, and a classifier trained on those features.', zhBody: '兩個新穎的分析視角——網絡層級連結分析，以及在這些特徵上訓練出的分類器。', artifact: 'Fig. 3–4', zhArtifact: '圖三至圖四' },
            { iconKey: 'award', label: 'Recognition', zhLabel: '肯定', title: 'TSCN excellence, OHBM Brisbane', zhTitle: 'TSCN 優等獎，OHBM 布里斯本', body: 'The Excellent Award for the thesis, then an international poster in Brisbane.', zhBody: '碩論獲頒優等獎，接著於布里斯本進行國際海報發表。', artifact: 'Two conferences', zhArtifact: '兩場會議' },
        ],
        pullQuote: 'Most of what we know about the brain comes from rooms built to remove everything natural from it. This thesis let the brain do what it actually does, then read the answer through two lenses most labs weren\'t using yet.',
        zhPullQuote: '我們對大腦的理解，多半來自被設計來移除一切自然元素的房間。這篇論文讓大腦做它實際會做的事，再用兩個多數實驗室還沒用上的視角，去讀那個答案。',
        awards: [
            { iconKey: 'award', title: 'The Excellent Award — Master\'s Thesis', desc: '2025 Taiwan Society for Cognitive Neuroscience Annual Meeting (TSCN)' },
        ],
    },
];
export const PROJECT_THEMES = {
    'emobot-plus':                  'emobot',
    'deeptech-database':            'data',
    'ai-product-launch-os':         'ai',
    'ai-news-intelligence':         'ai',
    'ux-hmi-interaction-lab':       'research',
    'industry-strategy-platform':   'map',
    'startup-intelligence-platform':'platform',
    'psymatch':                     'research',
    'deepscout':                    'ai',
    'field-journey':                'field',
    'brain-and-learning':           'mind',
};
