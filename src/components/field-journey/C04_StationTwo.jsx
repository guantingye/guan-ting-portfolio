import React from 'react';
import { injectStyles, useI18n, DrawnPath } from './shared/fjKit.jsx';
import StationChapter from './shared/StationChapter.jsx';
import { CHAPTERS, STATIONS } from './data/fjContent.js';

const chapter = CHAPTERS.find(c => c.key === 'C04');
const station = STATIONS[1];

const COPY = {
    en: {
        spotTitle: 'The annual report that won the argument',
        reportTag: 'ANNUAL DATA REPORT',
        pipeReport: 'How the report was made',
        pipePodcast: 'Second bench · the podcast pipeline',
        caption: 'The curve is illustrative — the original figures stayed with the association. The pipeline is the real part: scales designed, a year of data cleaned and visualized, results read together with the psychologists, and the evidence used to argue for program funding.',
    },
    zh: {
        spotTitle: '把經費說服下來的那份年報',
        reportTag: '年度服務數據報告',
        pipeReport: '這份報告是怎麼做出來的',
        pipePodcast: '第二座工作檯 · Podcast 產線',
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

export default function C04_StationTwo() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    return (
        <StationChapter
            chapter={chapter}
            station={station}
            spotlightTitle={c.spotTitle}
            spotlight={
                <>
                    <ReportSpread lang={lang} c={c} />
                    <div className="fj-podshelf">
                        <Pipeline label={c.pipePodcast} steps={PODCAST_STEPS} lang={lang} />
                    </div>
                </>
            }
            spotlightCaption={c.caption}
        />
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

.fj-podshelf { margin-top: 18px; background: var(--fj-paper-2); border: 1.6px dashed var(--fj-line); border-radius: var(--fj-r-lg); padding: 16px 20px 18px; }
.fj-podshelf .fj-pipe { margin-top: 0; }
`);
