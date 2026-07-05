import React from 'react';
import SectionModule, { useI18n, Caption, injectStyles } from './shared/psyKit.jsx';
import { MODULES } from './data/psyContent.js';

const MOD = MODULES.find(m => m.key === 'M04');

const COPY = {
    en: {
        title: 'Intake selection matrix',
        lead: 'Every measured input earns its place by feeding one criterion of the match.',
        soWhat: 'Every measured input pays rent in the algorithm.',
        cols: ['Input', 'Adapted from', 'Items', 'Response', 'Match role', 'Adaptation notes'],
        rows: [
            ['Issue importance', 'Presenting-problem checklists', '7', '1–7 importance', 'Topic-fit · .30', 'Seven topics chosen to map onto therapist specialty tags; Chinese-first wording'],
            ['Orientation preference', 'Common orientation taxonomy', '1', 'Single-select + “no preference”', 'Orientation · .30', 'Ten orientations offered; opting out is a first-class choice, not a blank'],
            ['Budget constraint', 'NT$ fee bands', '1', 'Slider, floor NT$1,000', 'Budget · .20', 'Floor enforced with a spoken error; keeps recommendations reachable'],
            ['Modality & time', 'Online / in-person + slots', '2', 'Single-select', 'Online · .20', 'Weekday-day / weekday-night / weekend windows'],
        ],
        rejected: ['Full personality / symptom battery', 'Big-Five or PHQ/GAD-style scales', '—', '—', '— (cut)', 'Rejected: a validated multi-scale battery would break the 8-minute budget and read as diagnosis, which this product deliberately avoids'],
        rejectedTag: 'REJECTED',
        caption: 'The four inputs and one deliberately cut construct, each tied to the criterion it serves.',
    },
    zh: {
        title: '量表輸入選擇矩陣',
        lead: '每一個被量測的輸入，都因為餵養某一條媒合準則而取得存在的理由。',
        soWhat: '每一個被量測的輸入，都在演算法裡付了租。',
        cols: ['輸入', '改編自', '題數', '作答方式', '媒合角色', '改編註記'],
        rows: [
            ['議題重要程度', '主訴問題檢核表', '7', '1–7 重要程度', '議題吻合 · .30', '七個議題經挑選以對應心理師專長標籤；以中文為主的用詞'],
            ['取向偏好', '常見治療取向分類', '1', '單選 +「不限」', '取向 · .30', '提供十種取向；「不限」是正式選項，而非空白'],
            ['預算限制', 'NT$ 費用區間', '1', '滑桿，下限 NT$1,000', '預算 · .20', '強制下限並以明確錯誤提示；讓推薦維持可負擔'],
            ['形式與時段', '線上／實體 + 時段', '2', '單選', '線上 · .20', '平日日間／平日晚間／週末時段'],
        ],
        rejected: ['完整人格／症狀量表', 'Big-Five 或 PHQ/GAD 類量表', '—', '—', '—（刪除）', '拒絕：一套完整多量表電池會撐破 8 分鐘預算，並讀起來像診斷，而這正是本產品刻意避免的'],
        rejectedTag: '已拒絕',
        caption: '四個輸入與一個刻意刪除的構念，各自綁定它所服務的準則。',
    },
};

export default function M04_ScaleMatrix() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <figure style={{ margin: 0 }}>
                <div className="pm-table-wrap">
                    <table className="pm-table pm-table--matrix">
                        <thead><tr>{c.cols.map(h => <th key={h}>{h}</th>)}</tr></thead>
                        <tbody>
                            {c.rows.map((r, i) => (
                                <tr key={i}>{r.map((cell, j) => <td key={j} data-label={c.cols[j]} className={j === 0 ? 'pm-table-lead' : undefined}>{cell}</td>)}</tr>
                            ))}
                            <tr className="pm-row-rejected">
                                {c.rejected.map((cell, j) => (
                                    <td key={j} data-label={c.cols[j]} className={j === 0 ? 'pm-table-lead' : undefined}>
                                        {j === 0 ? <><span className="pm-tag pm-tag--red">{c.rejectedTag}</span> {cell}</> : cell}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Caption kind="Table" n={1}>{c.caption}</Caption>
            </figure>
        </SectionModule>
    );
}

injectStyles('pm-m4', `
.pm-table--matrix tbody td:nth-child(5) { font-family: var(--pm-font-data); font-size: 12px; color: var(--pm-teal); white-space: nowrap; }
.pm-row-rejected td { background: var(--pm-red-dim); }
.pm-row-rejected .pm-table-lead { color: var(--pm-text-1); }
.pm-row-rejected td:nth-child(5) { color: var(--pm-red) !important; }
.pm-row-rejected .pm-tag { margin-right: 6px; }
@media (max-width: 767px) {
  .pm-table--matrix tbody td:nth-child(5) { color: var(--pm-teal); white-space: normal; }
  .pm-row-rejected { border-color: var(--pm-red) !important; }
}
`);
