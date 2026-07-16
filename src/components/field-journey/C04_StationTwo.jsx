import React, { useState } from 'react';
import { AuthStamp, injectStyles, useI18n, DrawnPath } from './shared/fjKit.jsx';
import PhotoLightbox from './shared/PhotoLightbox.jsx';
import StationChapter from './shared/StationChapter.jsx';
import { CHAPTERS, STATIONS } from './data/fjContent.js';

const chapter = CHAPTERS.find(c => c.key === 'C04');
const station = STATIONS[1];

const COPY = {
    en: {
        spotTitle: 'The annual report that won the argument',
        reportTag: 'ANNUAL DATA REPORT',
        pipeReport: 'How the report was made',
        pipePodcast: 'Production workflow',
        podcastTitle: 'Podcast production, with real evidence',
        podcastIntro: 'One production flow turned co-parenting expertise into clear, published conversations for families.',
        episodesTitle: 'Three published episode cases',
        caption: 'The curve is illustrative. The original figures stayed with the association. The pipeline is real: scales designed, a year of data cleaned and visualized, results read together with the psychologists, and the evidence used to argue for program funding.',
    },
    zh: {
        spotTitle: '把經費說服下來的那份年報',
        reportTag: '年度服務數據報告',
        pipeReport: '這份報告是怎麼做出來的',
        pipePodcast: '產製流程',
        podcastTitle: 'Podcast 產製的真實佐證',
        podcastIntro: '把訪談規劃、邀稿、錄音、剪輯與上架整合成一條親職支持內容產線。',
        episodesTitle: '三集已上架案例',
        caption: '曲線為示意，原始數據留在協會。真實的是這條產線：設計量表、清整一整年的資料並視覺化、和心理師一起對讀結果，最後用這份證據去爭取計畫經費。',
    },
};

const REPORT_STEPS = [
    { en: 'Scale design', zh: '量表設計' },
    { en: 'Data cleaning', zh: '資料清整' },
    { en: 'Visualization', zh: '視覺化' },
    { en: 'Read with psychologists', zh: '與心理師對讀' },
    { en: 'Funding argued', zh: '爭取計畫經費' },
];
const PODCAST_STEPS = [
    { en: 'Interview outline', zh: '訪談大綱' },
    { en: 'Guest invitations', zh: '人選邀稿' },
    { en: 'Recording', zh: '實際錄音' },
    { en: 'Edit & post-production', zh: '剪輯後製' },
    { en: 'Published', zh: '上架平台' },
];

const getFieldJourneyImage = fileName => `${import.meta.env.BASE_URL}field-journey/${fileName}`;
const PODCAST_BRAND = {
    id: 'podcast-brand',
    src: getFieldJourneyImage('st2-podcast-brand.png'),
    title: { en: 'Kids Have Parents podcast', zh: '孩有爸媽相談室' },
    note: { en: 'Chinese Co-Parenting Center podcast identity.', zh: '華人共親職中心 Podcast 品牌主視覺。' },
};
const PODCAST_EPISODES = [
    {
        id: 'podcast-episode-ep73',
        src: getFieldJourneyImage('st2-podcast-episode-ep73.png'),
        code: 'EP73',
        title: { en: 'Children in divorced families through What Maisie Knew', zh: '從《梅西的世界》談離婚家庭孩子的心理轉折' },
    },
    {
        id: 'podcast-episode-ep67',
        src: getFieldJourneyImage('st2-podcast-episode-ep67.png'),
        code: 'EP67',
        title: { en: 'A lawyer’s view on preventing parental alienation', zh: '從律師的角度協助父母如何避免離間孩子' },
    },
    {
        id: 'podcast-episode-ep68',
        src: getFieldJourneyImage('st2-podcast-episode-ep68.png'),
        code: 'EP68',
        title: { en: 'Helping a child face frustration', zh: '我不跟你好了！家長如何陪伴孩子面對挫折' },
    },
];

function Pipeline({ label, steps, lang }) {
    return (
        <div className="fj-pipe">
            <span className="fj-eyebrow">{label}</span>
            <ol className="fj-pipe-row">
                {steps.map((s, i) => (
                    <li key={i} className={`fj-pipe-step${i === steps.length - 1 ? ' is-final' : ''}`}>
                        <span className="fj-pipe-num" aria-hidden="true">{i + 1}</span>
                        <span>{s[lang]}</span>
                    </li>
                ))}
            </ol>
        </div>
    );
}

// The report spread: a paper "report page" whose trend line draws itself in.
const CHART_PTS = [[50, 152], [131, 141], [212, 156], [293, 112], [374, 121], [455, 82], [536, 60]];
const CHART_D = 'M' + CHART_PTS.map(p => p.join(' ')).join(' L ');

function ReportSpread({ lang, c }) {
    return (
        <div className="fj-report">
            <div className="fj-report-head">
                <span className="fj-report-tag">{c.reportTag}</span>
                <span className="fj-report-rules" aria-hidden="true"><i /><i /><i /></span>
            </div>
            <svg className="fj-report-chart" viewBox="0 0 560 210" role="img"
                aria-label={lang === 'zh' ? '年度服務數據趨勢示意圖' : 'Illustrative annual service-data trend'}>
                <g stroke="var(--fj-line)" strokeWidth="1" strokeDasharray="3 5">
                    {[60, 105, 150].map(y => <line key={y} x1="50" y1={y} x2="536" y2={y} />)}
                </g>
                <g stroke="var(--fj-ink-3)" strokeWidth="1.6" strokeLinecap="round">
                    <line x1="50" y1="30" x2="50" y2="192" />
                    <line x1="50" y1="192" x2="536" y2="192" />
                </g>
                <DrawnPath d={CHART_D} stroke="var(--fj-accent-ink)" strokeWidth="2.4" duration={1.5} />
                <g fill="var(--fj-paper-1)" stroke="var(--fj-accent-ink)" strokeWidth="2">
                    {CHART_PTS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" />)}
                </g>
                <g fontFamily="JetBrains Mono, monospace" fontSize="10.5" fill="var(--fj-ink-3)">
                    {['Q1', 'Q2', 'Q3', 'Q4'].map((q, i) => <text key={q} x={50 + i * 162} y="206">{q}</text>)}
                </g>
            </svg>
            <Pipeline label={c.pipeReport} steps={REPORT_STEPS} lang={lang} />
        </div>
    );
}

function PodcastMediaButton({ image, lang, onOpen, className }) {
    const title = image.title[lang] ?? image.title.en;
    const openLabel = lang === 'zh' ? '放大查看' : 'Enlarge';
    return (
        <button className={className} type="button" onClick={() => onOpen(image)} aria-label={`${openLabel}: ${title}`} aria-haspopup="dialog">
            <img src={image.src} alt={title} loading="lazy" decoding="async" />
        </button>
    );
}

function PodcastBrand({ lang, onOpen }) {
    const title = PODCAST_BRAND.title[lang] ?? PODCAST_BRAND.title.en;
    const note = PODCAST_BRAND.note[lang] ?? PODCAST_BRAND.note.en;
    return (
        <figure className="fj-podcast-brand">
            <PodcastMediaButton image={PODCAST_BRAND} lang={lang} onOpen={onOpen} className="fj-podcast-brand-media" />
            <figcaption>
                <strong>{title}</strong>
                <span>{note}</span>
            </figcaption>
        </figure>
    );
}

function PodcastEpisode({ episode, lang, onOpen, isLead = false }) {
    const title = episode.title[lang] ?? episode.title.en;
    return (
        <article className={`fj-podcast-episode${isLead ? ' is-lead' : ''}`}>
            <PodcastMediaButton image={episode} lang={lang} onOpen={onOpen} className="fj-podcast-episode-media" />
            <div className="fj-podcast-episode-copy">
                <span>{episode.code}</span>
                <h5>{title}</h5>
            </div>
        </article>
    );
}

function PodcastEpisodes({ lang, onOpen }) {
    const [leadEpisode, ...supportingEpisodes] = PODCAST_EPISODES;
    return (
        <div className="fj-podcast-episodes">
            <PodcastEpisode episode={leadEpisode} lang={lang} onOpen={onOpen} isLead />
            <div className="fj-podcast-supporting">
                {supportingEpisodes.map(episode => <PodcastEpisode key={episode.id} episode={episode} lang={lang} onOpen={onOpen} />)}
            </div>
        </div>
    );
}

function PodcastBench({ lang, c, onOpen }) {
    return (
        <section className="fj-podcast-bench" aria-label={c.podcastTitle}>
            <div className="fj-podcast-head">
                <h4>{c.podcastTitle}</h4>
                <AuthStamp tier="real" />
            </div>
            <div className="fj-podcast-showcase">
                <PodcastBrand lang={lang} onOpen={onOpen} />
                <div className="fj-podcast-content">
                    <p className="fj-podcast-intro">{c.podcastIntro}</p>
                    <h5 className="fj-podcast-episodes-title">{c.episodesTitle}</h5>
                    <PodcastEpisodes lang={lang} onOpen={onOpen} />
                    <Pipeline label={c.pipePodcast} steps={PODCAST_STEPS} lang={lang} />
                </div>
            </div>
        </section>
    );
}

export default function C04_StationTwo() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    const [activePodcastImage, setActivePodcastImage] = useState(null);
    return (
        <>
            <StationChapter
                chapter={chapter}
                station={station}
                spotlightTitle={c.spotTitle}
                spotlight={
                    <>
                        <ReportSpread lang={lang} c={c} />
                        <p className="fj-spot-cap">{c.caption}</p>
                        <PodcastBench lang={lang} c={c} onOpen={setActivePodcastImage} />
                    </>
                }
            />
            <PhotoLightbox image={activePodcastImage} lang={lang} onClose={() => setActivePodcastImage(null)} />
        </>
    );
}

injectStyles('fj-c04-styles', `
.fj-report { background: var(--fj-paper-1); border: 1px solid var(--fj-line); border-radius: var(--fj-r-lg); box-shadow: var(--fj-shadow); padding: 18px 22px 20px; }
.fj-report-head { display: flex; align-items: center; gap: 16px; padding-bottom: 12px; border-bottom: 1.6px solid var(--fj-line); margin-bottom: 14px; }
.fj-report-tag { font-family: var(--fj-font-data); font-size: 11px; font-weight: 600; letter-spacing: 0.16em; color: var(--fj-accent-ink); }
.fj-report-rules { display: flex; flex-direction: column; gap: 4px; flex: 1; }
.fj-report-rules i { display: block; height: 3px; border-radius: 2px; background: var(--fj-line-soft); }
.fj-report-rules i:nth-child(1) { width: 62%; }
.fj-report-rules i:nth-child(2) { width: 84%; }
.fj-report-rules i:nth-child(3) { width: 47%; }
.fj-report-chart { display: block; width: 100%; height: auto; }

/* pipelines */
.fj-pipe { margin-top: 16px; }
.fj-pipe-row { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; margin: 10px 0 0; padding: 0; align-items: center; }
.fj-pipe-step { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; color: var(--fj-ink-2); background: var(--fj-paper-2); border: 1px solid var(--fj-line); border-radius: 999px; padding: 5px 13px 5px 6px; }
.fj-pipe-step::after { content: '→'; margin-left: 8px; margin-right: -6px; color: var(--fj-ink-3); }
.fj-pipe-step:last-child::after { content: none; }
.fj-pipe-step.is-final { background: var(--fj-accent-soft); border-color: var(--fj-accent); color: var(--fj-accent-ink); font-weight: 600; }
.fj-pipe-num { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; background: var(--fj-paper-1); border: 1.4px solid var(--fj-line); font-family: var(--fj-font-data); font-size: 10px; color: var(--fj-accent-ink); }

.fj-podcast-bench { margin-top: 18px; padding: 18px 20px 20px; background: var(--fj-paper-2); border: 1px solid var(--fj-line); border-radius: var(--fj-r-lg); }
.fj-podcast-head { display: flex; align-items: baseline; justify-content: space-between; gap: 14px; margin-bottom: 14px; }
.fj-podcast-head h4 { margin: 0; color: var(--fj-ink); font-family: var(--fj-font-display); font-size: 18px; font-weight: 500; }
.fj-podcast-showcase { display: grid; grid-template-columns: minmax(210px, 0.72fr) minmax(0, 1.28fr); gap: 26px; align-items: start; }
.fj-podcast-brand { margin: 0; }
.fj-podcast-brand-media { display: block; width: 100%; overflow: hidden; cursor: zoom-in !important; border: 0 !important; border-radius: var(--fj-r-md) !important; background: transparent !important; }
.fj-podcast-brand-media img { display: block; width: 100%; aspect-ratio: 1; object-fit: cover; transition: transform 220ms var(--fj-ease); }
.fj-podcast-brand-media:hover img { transform: scale(1.015); }
.fj-podcast-brand-media:active img { transform: scale(0.99); }
.fj-podcast-brand-media:focus-visible, .fj-podcast-episode-media:focus-visible { outline: 2px solid var(--fj-accent-ink); outline-offset: 4px; }
.fj-podcast-brand figcaption { display: grid; gap: 2px; padding: 10px 2px 0; }
.fj-podcast-brand strong { color: var(--fj-ink); font-family: var(--fj-font-display); font-size: 15px; font-weight: 500; }
.fj-podcast-brand span { color: var(--fj-ink-3); font-size: 12px; line-height: 1.55; }
.fj-podcast-content { min-width: 0; }
.fj-podcast-intro { margin: 0; color: var(--fj-ink-2); font-size: 14px; line-height: 1.65; }
.fj-podcast-episodes-title { margin: 16px 0 10px; color: var(--fj-ink); font-family: var(--fj-font-display); font-size: 17px; font-weight: 500; }
.fj-podcast-episodes { display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr); gap: 16px; align-items: start; }
.fj-podcast-episode { min-width: 0; }
.fj-podcast-episode.is-lead { padding: 10px; background: var(--fj-paper-1); border: 1px solid var(--fj-line); border-radius: var(--fj-r-md); }
.fj-podcast-supporting { display: grid; gap: 14px; }
.fj-podcast-supporting .fj-podcast-episode { display: grid; grid-template-columns: 100px minmax(0, 1fr); gap: 12px; align-items: start; padding-top: 14px; border-top: 1px solid var(--fj-line); }
.fj-podcast-supporting .fj-podcast-episode:first-child { padding-top: 0; border-top: 0; }
.fj-podcast-episode-media { display: block; width: 100%; overflow: hidden; cursor: zoom-in !important; border: 0 !important; border-radius: var(--fj-r-sm) !important; background: transparent !important; }
.fj-podcast-episode-media img { display: block; width: 100%; aspect-ratio: 1; object-fit: cover; transition: transform 220ms var(--fj-ease); }
.fj-podcast-episode-media:hover img { transform: scale(1.025); }
.fj-podcast-episode-media:active img { transform: scale(0.99); }
.fj-podcast-episode-copy { min-width: 0; }
.fj-podcast-episode-copy span { color: var(--fj-accent-ink); font-family: var(--fj-font-data); font-size: 10.5px; letter-spacing: 0.1em; }
.fj-podcast-episode-copy h5 { margin: 5px 0 0; color: var(--fj-ink); font-family: var(--fj-font-display); font-size: 15px; font-weight: 500; line-height: 1.45; }
.fj-podcast-episode.is-lead .fj-podcast-episode-copy { padding: 10px 2px 2px; }
.fj-podcast-bench .fj-pipe { margin-top: 20px; }
@media (max-width: 700px) { .fj-podcast-bench { padding: 16px; } .fj-podcast-head { align-items: flex-start; flex-direction: column; } .fj-podcast-showcase, .fj-podcast-episodes { grid-template-columns: 1fr; } .fj-podcast-brand { width: min(100%, 360px); } .fj-podcast-supporting .fj-podcast-episode { grid-template-columns: 92px minmax(0, 1fr); } }
`);
