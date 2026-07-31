import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M16');

const COPY = {
    en: {
        title: 'Next validation gates & known limits',
        lead: 'The next phase is not organised around feature count. Each investment has a clear validation threshold: it enters formal development only when the evidence shows the problem is worth solving and the proposed approach is credible enough. I also retain the current limits in the data, model, operations, and evaluation, making clear what judgments the system can support today and which conclusions cannot yet be extended too far.',
        nextLabel: 'Next roadmap & activation conditions',
        next: [
            { t: 'Source grounding and verification for key numbers', gate: 'Add to the formal publishing flow only when unsupported numerical errors in a fixed test set fall within an acceptable range and every number can be traced back to its original passage.' },
            { t: 'Calibrate confidence cues instead of showing rank alone', gate: 'Show confidence scores in the production interface only when confidence bands reliably correspond to actual classification accuracy and reproduce on test data not used for tuning.' },
            { t: 'Expand regional and Chinese-language sources', gate: 'Add to the formal pipeline only when new sources fill coverage gaps in the current English long-form corpus without materially increasing duplicate or low-quality signals.' },
            { t: 'Build a reader-feedback loop within the platform', gate: 'Expand into a complete feedback feature only when analysts keep using simple markers such as “helpful” or “needs revision,” and that feedback changes classification, sources, or summaries in practice.' },
        ],
        limitsLabel: 'Current known limits',
        limits: [
            'The source mix favours long-form English reporting, with insufficient coverage of local Taiwan sources, real-time Chinese signals, and non-English markets. The system is therefore better suited to tracking international technology trends than serving as a complete regional-intelligence source.',
            'The system preserves original quotations and source links, but does not yet automatically compare other authoritative sources. “Source traceability” does not mean a number is necessarily correct; important data still requires human review.',
            'A single maintainer is still responsible for most of the system. Documentation, monitoring, and incident-response knowledge have not yet been fully transferred, so source updates and anomaly fixes may not continue if maintenance is interrupted.',
            'The evaluation set remains limited, and I assessed both human answer keys and model results. The evaluation is suitable for comparing versions and locating error boundaries, not for representing general accuracy across all data.',
        ],
        reflectLabel: 'Reflection',
        reflect: 'Designing both the AI pipeline and the product interface that uses it changed the order in which I approach problems. I no longer start with model capability; I first observe an analyst’s morning work: which steps consume time, which information builds trust, and the moment an incorrect number causes real harm.\n\nThose observations then shape the prompts, taxonomy, source design, and information hierarchy. Rather than chase a seemingly precise score, I care more about whether the system can show its basis, express uncertainty, and return judgment to people when needed. I would rather deliver a system that knows when to say “I’m not sure” than one that confidently produces incorrect answers.',
        soWhat: 'Review the next validation gates and the current known limits.',
    },
    zh: {
        title: '下一步驗證門檻與已知限制',
        lead: '下階段的工作不以功能數量排列，而是為每一項投資設定明確的驗證門檻。只有當資料顯示問題值得解決、方案也具備足夠可信度時，才進入正式開發。同時，我也保留目前已知的資料、模型、維運與評測限制，清楚說明這套系統現在可以支持哪些判斷，又有哪些結論仍不能被過度延伸。',
        nextLabel: '下一輪路線圖與啟動條件',
        next: [
            { t: '關鍵數字的來源接地與核對', gate: '只有當固定測試集中、無法由來源支持的數字錯誤降至可接受範圍，且每個數字都能回查原始段落時，才納入正式發布流程。' },
            { t: '校準信心提示，而非只呈現排序', gate: '只有當不同信心區間與實際分類正確率呈現穩定對應，且能在未參與調整的測試資料上重現時，才將信心分數呈現在正式介面。' },
            { t: '擴充區域與中文資訊來源', gate: '只有當新增來源能補足現有英文長文的覆蓋缺口，同時不明顯增加重複內容與低品質訊號時，才加入正式管線。' },
            { t: '建立平台內的讀者回饋循環', gate: '只有當分析師持續使用「有幫助／需要修正」等簡單標記，且回饋能實際影響分類、來源或摘要調整時，才擴充成完整回饋功能。' },
        ],
        limitsLabel: '目前已知限制與影響',
        limits: [
            '來源組合偏向英文長篇報導，對台灣在地、中文即時訊號與非英文市場的涵蓋仍不足。因此，系統較適合追蹤國際科技趨勢，不應被視為完整的區域情報來源。',
            '系統能保留原始引文與來源連結，但尚未自動比對其他權威來源。因此，「來源可回查」不代表數字本身必然正確；重要數據仍需由研究人員人工核對。',
            '系統目前主要由單一維護者負責，文件、監控與故障排除知識尚未充分移交。若維護工作中斷，來源更新與異常修復可能無法持續。',
            '目前評測集規模有限，且人工標準答案與模型結果主要由我進行評核。評測結果適合用來比較版本與定位錯誤邊界，不代表模型在所有資料上的普遍準確率。',
        ],
        reflectLabel: '反思',
        reflect: '同時設計 AI 管線與使用它的產品介面，改變了我處理問題的順序。我不再從模型能力開始，而是先觀察分析師的晨間工作：哪些步驟消耗時間、哪些資訊建立信任，以及錯誤數字會在哪一刻造成實際傷害。\n\n這些觀察反過來影響了提示詞、分類架構、來源設計與介面層級。比起追求一個看似精確的分數，我更在意系統能否交代依據、表達不確定性，並在需要時把判斷交回給人。我寧願交付一套知道何時應該說「我不確定」的系統，也不願交付一套自信地產生錯誤的系統。',
        soWhat: '查看下一輪驗證門檻與目前已知限制。',
    },
};

export default function M16_Roadmap() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ni-m16-cols">
                <div className="ni-m16-next">
                    <span className="ni-caption ni-m16-collabel">{t.nextLabel}</span>
                    <ol className="ni-m16-nextlist">
                        {t.next.map((n, i) => (
                            <li key={i}>
                                <span className="ni-m16-next-t">{n.t}</span>
                                <span className="ni-m16-gate"><span className="ni-m16-gate-tag">GATE</span>{n.gate}</span>
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="ni-m16-limits">
                    <span className="ni-caption ni-m16-collabel">{t.limitsLabel}</span>
                    <ul className="ni-m16-limitlist">
                        {t.limits.map((l, i) => <li key={i}><span className="ni-m16-limit-mark" aria-hidden="true">▸</span>{l}</li>)}
                    </ul>
                </div>
            </div>
            <figure className="ni-m16-reflect">
                <figcaption className="ni-m16-reflect-label">{t.reflectLabel}</figcaption>
                <blockquote>{t.reflect}</blockquote>
            </figure>
        </ModuleFrame>
    );
}

injectStyles('ni-m16', `
.ni-m16-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ni-m16-collabel { display: block; margin-bottom: 12px; }
.ni-m16-nextlist { list-style: none; margin: 0; padding: 0; counter-reset: nx; display: flex; flex-direction: column; gap: 12px; }
.ni-m16-nextlist li { counter-increment: nx; position: relative; padding: 12px 14px 12px 40px; background: var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); }
.ni-m16-nextlist li::before { content: counter(nx, decimal-leading-zero); position: absolute; left: 14px; top: 12px; font-family: var(--ni-font-data); font-size: 12px; color: var(--ni-teal); }
.ni-m16-next-t { display: block; font-size: 13.5px; font-weight: 500; color: var(--ni-text-1); margin-bottom: 6px; }
.ni-m16-gate { display: block; font-size: 12px; line-height: 1.5; color: var(--ni-text-3); }
.ni-m16-gate-tag { display: inline-block; font-family: var(--ni-font-data); font-size: 9px; letter-spacing: 0.1em; color: var(--ni-amber); border: 1px solid var(--ni-amber); border-radius: 3px; padding: 1px 5px; margin-right: 7px; }
.ni-m16-limitlist { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.ni-m16-limitlist li { display: flex; gap: 10px; font-size: 13px; line-height: 1.55; color: var(--ni-text-2); }
.ni-m16-limit-mark { color: var(--ni-red); flex: 0 0 auto; }
.ni-m16-reflect { margin: 24px 0 0; padding: 22px 24px; background: linear-gradient(180deg, var(--ni-teal-dim), transparent 70%), var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-left: 3px solid var(--ni-teal); border-radius: var(--ni-r-md); }
.ni-m16-reflect-label { font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ni-teal); margin-bottom: 12px; }
.ni-m16-reflect blockquote { margin: 0; font-family: var(--ni-font-display); font-size: clamp(17px, 1.9vw, 21px); font-style: italic; line-height: 1.55; color: var(--ni-text-1); white-space: pre-line; }
@media (max-width: 767px) { .ni-m16-cols { grid-template-columns: 1fr; } }
`);
