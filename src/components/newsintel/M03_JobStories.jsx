import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M03');

const STATUS_TONE = { SHIPPED: 'teal', DEFERRED: 'amber', CUT: 'red' };

const COPY = {
    en: {
        title: 'Job stories & scope contract',
        lead: 'Six job stories map three user roles to three V1 scope decisions. Every request states whether it is included in V1, deferred, or excluded; deferred and excluded items retain the reasoning behind each decision.',
        actorLabels: { analyst: 'Analyst', lead: 'Team lead', policy: 'Policy researcher' },
        stories: [
            { actor: 'analyst', when: 'I start the morning intelligence review at 07:30', want: 'the system has already deduplicated and classified overnight technology signals', outcome: 'I can finish the team briefing by 09:00 and reserve my time for judgment rather than moving data', status: 'SHIPPED' },
            { actor: 'analyst', when: 'I need to cite a funding amount or another key figure from an article', want: 'the data always preserves the original quotation and source link', outcome: 'I can verify it quickly before sharing it and avoid bringing incorrect or unverified information into the briefing', status: 'SHIPPED' },
            { actor: 'analyst', when: 'I read an original English-language report', want: 'a faithful, traceable Traditional Chinese summary', outcome: 'the team can quickly read in a shared language while retaining key details and original context', status: 'SHIPPED' },
            { actor: 'lead', when: "I review the week's industry activity", want: 'content organized according to the taxonomy the team actually uses', outcome: 'I can see how industry themes are changing, rather than being pulled toward the highest-volume stories', status: 'SHIPPED' },
            { actor: 'lead', when: 'the system assigns a topic and industry classification to an item', want: 'a confidence cue and explanation of uncertainty', outcome: 'I can decide when to use it provisionally and when to check the original source or revise manually', status: 'DEFERRED', reason: 'Confidence scoring shipped as a flag, not a calibrated score — needs a bigger eval set first.' },
            { actor: 'policy', when: 'I prepare a quarterly industry memo', want: 'to compare sentiment and narrative changes across coverage related to different companies', outcome: 'I can use market narrative trends as one input to my research judgment', status: 'CUT', reason: 'Sentiment on tech-news headlines is noisy and easy to over-trust; out of scope for v1.' },
        ],
        contractLabel: 'Scope contract — what v1 will NOT do',
        contract: [
            'No news sentiment scoring — headline tone is easily affected by editorial conventions and the type of event, so it is not yet reliable enough to form a credible company-momentum indicator.',
            'No English-only briefings — the primary use case is helping the strategy team in China quickly read international information, so a bilingual comparison is more valuable than English-only output.',
            'No real-time push notifications — the product supports a scheduled morning intelligence review, not an alerting workflow that needs to interrupt users in real time.',
            'No standalone account system — V1 serves a single internal team; there is not yet a use case for individual access controls, preferences, or cross-organization management.',
            'No native mobile app — most work still happens on desktop, and the responsive web app supports ad hoc lookup and mobile reading. There is currently no need to take on the maintenance cost of a second product surface.',
        ],
        soWhat: "Before implementation, I make the first version's non-goals explicit.",
    },
    zh: {
        title: 'Job stories 與範圍契約',
        lead: '六個 Job Stories，對應三種使用角色與三種版本決策。每項需求都清楚標示是否納入 V1，延後或排除的項目，也保留完整的判斷理由。',
        actorLabels: { analyst: '分析師', lead: '組長', policy: '政策研究員' },
        stories: [
            { actor: 'analyst', when: '每天 07:30 開始晨間情報整理時', want: '系統已完成隔夜科技訊號的去重與分類', outcome: '我可以在 09:00 前完成團隊簡報，把時間留給判斷，而不是資料搬運', status: 'SHIPPED' },
            { actor: 'analyst', when: '我需要引用報導中的募資金額或其他關鍵數字時', want: '數據務必保留原始引文與來源連結', outcome: '我可以在傳遞前快速完成核對，避免把錯誤或未經驗證的資訊帶入簡報', status: 'SHIPPED' },
            { actor: 'analyst', when: '我閱讀英文原始報導時', want: '以繁中提供忠實、可回查的摘要', outcome: '讓團隊以一致語言快速閱讀，同時保留重要細節與原始脈絡', status: 'SHIPPED' },
            { actor: 'lead', when: '我回顧一週的產業動態時', want: '內容依照團隊實際使用的分類架構整理', outcome: '我能看見產業主題變化方向，而不是只看聲量最大的事件牽引', status: 'SHIPPED' },
            { actor: 'lead', when: '系統替一則訊息完成主題與產業分類時', want: '看見分類結果的信心提示與不確定性說明', outcome: '我能判斷何時可暫時採用，何時需要回查原文或人工修正', status: 'DEFERRED', reason: '信心分數目前只做成旗標，不是校準過的分數——需要更大的評測集才行。' },
            { actor: 'policy', when: '我準備季度產業備忘錄時', want: '比較不同公司相關報導的情緒與敘事變化', outcome: '將市場敘事趨勢作為研究判斷的其中一項參考', status: 'CUT', reason: '科技新聞標題的情緒訊號雜且容易被過度信任；不在 v1 範圍。' },
        ],
        contractLabel: '範圍契約——v1 明確不做的事',
        contract: [
            '不做新聞情緒評分：標題語氣容易受到媒體慣法與事件類型影響，現階段不足以形成可信的公司動能指標。',
            '不做純英文簡報：主要使用情境是讓策略中國團隊快速閱讀國際資訊，因此雙語對照比單一英文輸出更有價值。',
            '不做即時推播通知：產品支援的是固定時段的晨間情報整理，而不是需要即時打斷使用者的警報流程。',
            '不建立獨立帳號系統：V1 服務單一內部團隊，尚未出現需要個人權限、偏好設定或跨組織管理的使用情境。',
            '不開發原生行動 App：主要工作仍發生在桌面端，響應式網頁已能支援臨時查閱與行動裝置閱讀，暫無必要增加另一套產品維護成本。',
        ],
        soWhat: '在開始實作之前，我先把第一版不做什麼說清楚。',
    },
};

export default function M03_JobStories() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <ul className="ni-m3-list">
                {t.stories.map((s, i) => (
                    <li key={i} className="ni-m3-story">
                        <div className="ni-m3-story-top">
                            <span className="ni-m3-actor">{t.actorLabels[s.actor]}</span>
                            <span className={`ni-tag ni-tag--${STATUS_TONE[s.status]}`}>{s.status}</span>
                        </div>
                        <p className="ni-m3-line">
                            <span className="ni-m3-kw">When</span> {s.when},
                            <span className="ni-m3-kw"> I want</span> {s.want},
                            <span className="ni-m3-kw"> so I can</span> {s.outcome}.
                        </p>
                        {s.reason && <p className="ni-m3-reason">{s.reason}</p>}
                    </li>
                ))}
            </ul>
            <div className="ni-m3-contract">
                <span className="ni-m3-contract-label">{t.contractLabel}</span>
                <ol className="ni-m3-contract-list">
                    {t.contract.map((c, i) => (
                        <li key={i}><span className="ni-m3-no" aria-hidden="true">✕</span>{c}</li>
                    ))}
                </ol>
            </div>
        </ModuleFrame>
    );
}

injectStyles('ni-m3', `
.ni-m3-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
.ni-m3-story { padding: 14px 0; border-bottom: 1px solid var(--ni-line-1); }
.ni-m3-story:first-child { padding-top: 0; }
.ni-m3-story-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 8px; }
.ni-m3-actor { font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ni-text-3); }
.ni-m3-line { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--ni-text-1); }
.ni-m3-kw { font-family: var(--ni-font-data); font-size: 12px; letter-spacing: 0.02em; color: var(--ni-teal); }
.ni-m3-reason { margin: 8px 0 0; font-size: 12.5px; line-height: 1.5; color: var(--ni-text-3); padding-left: 12px; border-left: 2px solid var(--ni-line-2); }
.ni-m3-contract { margin-top: 22px; padding: 18px; background: var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); }
.ni-m3-contract-label { display: block; font-family: var(--ni-font-data); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ni-amber); margin-bottom: 12px; }
.ni-m3-contract-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.ni-m3-contract-list li { font-family: var(--ni-font-data); font-size: 13px; color: var(--ni-text-2); display: flex; gap: 10px; align-items: baseline; }
.ni-m3-no { color: var(--ni-red); flex: 0 0 auto; }
`);
