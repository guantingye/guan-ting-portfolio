import React from 'react';
import SectionModule, { useI18n, Caption, injectStyles } from './shared/ecoKit.jsx';
import { MODULES, SOURCES } from './data/ecoContent.js';

const MOD = MODULES.find(m => m.key === 'E01');
const KIND_TONE = { talent: 'teal', finance: 'sky', industry: 'ink', policy: 'iris', profile: 'neutral', signal: 'ink', ip: 'sky' };

const COPY = {
    en: {
        title: 'Source atlas & crawl coverage',
        lead: 'Nine public sources, each earning a different kind of evidence, folded into one pipeline.',
        soWhat: 'I can name every source and the evidence it earns.',
        pipeline: ['Crawl', 'Stage', 'Normalise', 'Enrich', 'Tag', 'Dataset'],
        techLabel: 'Crawl stack',
        tech: 'Python · Playwright (JS-heavy sites) · curl_cffi + BeautifulSoup (static) · per-source adapters · cache fallback · append-only lineage.',
        kindLabel: 'Evidence',
        caption: 'The nine sources of record and the six-stage acquisition pipeline.',
    },
    zh: {
        title: '來源地圖與爬取覆蓋',
        lead: '九個公開來源，各自換取不同種類的證據，收攏成一條管線。',
        soWhat: '我能說出每個來源，以及它換來的證據。',
        pipeline: ['爬取', '暫存', '標準化', '豐富化', '標籤', '資料集'],
        techLabel: '爬蟲技術',
        tech: 'Python · Playwright（JS 密集站）· curl_cffi + BeautifulSoup（靜態）· 各來源 adapter · 快取回退 · 附加式 lineage。',
        kindLabel: '證據',
        caption: '九個來源與六段擷取管線。',
    },
};

export default function E01_SourceAtlas() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <ol className="eco-pipe">
                {c.pipeline.map((s, i) => (
                    <li key={s} className="eco-pipe-step">
                        <span className="eco-pipe-k">{String(i + 1).padStart(2, '0')}</span>
                        <span className="eco-pipe-t">{s}</span>
                        {i < c.pipeline.length - 1 && <span className="eco-pipe-arrow" aria-hidden="true">→</span>}
                    </li>
                ))}
            </ol>
            <figure style={{ margin: '20px 0 0' }}>
                <div className="eco-sources">
                    {SOURCES.map(s => (
                        <div className={`eco-source eco-source--${KIND_TONE[s.kind] || 'neutral'}`} key={s.id}>
                            <span className="eco-source-name">{s.name}</span>
                            <span className="eco-source-kind">{s.kind}</span>
                            <span className="eco-source-yield">{s.en}</span>
                        </div>
                    ))}
                </div>
                <Caption kind="Plate" n={1}>{c.caption}</Caption>
            </figure>
            <p className="eco-tech"><span className="eco-tech-k">{c.techLabel}</span>{c.tech}</p>
        </SectionModule>
    );
}

injectStyles('eco-e1', `
.eco-pipe { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
.eco-pipe-step { position: relative; padding: 12px 10px; border: 1px solid var(--eco-line-1); border-top: 2px solid var(--eco-ink); border-radius: var(--eco-r-sm); background: var(--eco-bg-2); }
.eco-pipe-k { font-family: var(--eco-font-data); font-size: 10px; color: var(--eco-text-3); }
.eco-pipe-t { display: block; color: var(--eco-text-1); font-size: 13px; margin-top: 3px; }
.eco-pipe-arrow { position: absolute; right: -8px; top: 50%; transform: translateY(-50%); z-index: 1; color: var(--eco-line-2); font-family: var(--eco-font-data); }
.eco-sources { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.eco-source { padding: 12px 14px; border: 1px solid var(--eco-line-1); border-left: 2px solid var(--eco-line-2); border-radius: var(--eco-r-sm); background: var(--eco-bg-2); }
.eco-source--teal { border-left-color: var(--eco-teal); }
.eco-source--sky { border-left-color: var(--eco-sky); }
.eco-source--ink { border-left-color: var(--eco-ink); }
.eco-source--iris { border-left-color: var(--eco-iris); }
.eco-source-name { display: block; color: var(--eco-text-1); font-size: 13.5px; font-weight: 500; }
.eco-source-kind { font-family: var(--eco-font-data); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--eco-text-3); }
.eco-source-yield { display: block; font-size: 12px; color: var(--eco-text-3); margin-top: 4px; line-height: 1.45; }
.eco-tech { margin: 18px 0 0; font-size: 13px; line-height: 1.6; color: var(--eco-text-2); }
.eco-tech-k { display: block; font-family: var(--eco-font-data); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--eco-text-3); margin-bottom: 4px; }
@media (max-width: 767px) { .eco-pipe { grid-template-columns: repeat(2, 1fr); } .eco-pipe-arrow { display: none; } .eco-sources { grid-template-columns: 1fr; } }
`);
