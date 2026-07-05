import React from 'react';
import SectionModule, { useI18n, Caption, injectStyles } from './shared/ecoKit.jsx';
import { MODULES, SECTORS } from './data/ecoContent.js';

const MOD = MODULES.find(m => m.key === 'E07');

const LEDGER = {
    en: {
        ic:    { pat: '1,240', grant: '晶創 / A+', bm: 'IP licensing · design service' },
        ai:    { pat: '310', grant: 'TTA · 數位發展部', bm: 'SaaS · API usage' },
        bio:   { pat: '680', grant: 'SBIR · 生醫', bm: 'Milestone licensing · CDMO' },
        clean: { pat: '210', grant: '淨零 / 能源署', bm: 'Project finance · EPC' },
        mfg:   { pat: '520', grant: '智慧機械', bm: 'Hardware + service contract' },
        enab:  { pat: '95', grant: 'A+ 前瞻', bm: 'Tooling licence · consulting' },
    },
    zh: {
        ic:    { pat: '1,240', grant: '晶創 / A+', bm: 'IP 授權 · 設計服務' },
        ai:    { pat: '310', grant: 'TTA · 數位發展部', bm: 'SaaS · API 計量' },
        bio:   { pat: '680', grant: 'SBIR · 生醫', bm: '里程碑授權 · CDMO' },
        clean: { pat: '210', grant: '淨零 / 能源署', bm: '專案融資 · EPC' },
        mfg:   { pat: '520', grant: '智慧機械', bm: '硬體 + 服務合約' },
        enab:  { pat: '95', grant: 'A+ 前瞻', bm: '工具授權 · 顧問' },
    },
};

const COPY = {
    en: {
        title: 'Patent, grant & business-model ledger',
        lead: 'Three columns that turn a company list into an investable read of each sector.',
        soWhat: 'Coverage becomes an investable read: IP depth, public money, how they earn.',
        cols: ['Sector', 'Patent families', 'Grant programmes', 'Dominant model'],
        caption: 'Per-sector IP depth, public-funding routes, and the prevailing business model.',
    },
    zh: {
        title: '專利、補助與商模帳',
        lead: '三個欄位，把公司名單變成每個產業可投資的判讀。',
        soWhat: '覆蓋變成可投資的判讀：IP 深度、公共資金、他們怎麼賺錢。',
        cols: ['產業', '專利家族', '補助計畫', '主要商模'],
        caption: '各產業的 IP 深度、公共資金管道與主流商業模式。',
    },
};

export default function E07_PatentGrant() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    const L = LEDGER[lang] ?? LEDGER.en;
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <figure style={{ margin: 0 }}>
                <div className="eco-table-wrap">
                    <table className="eco-table eco-table--ledger">
                        <thead><tr>{c.cols.map(h => <th key={h}>{h}</th>)}</tr></thead>
                        <tbody>
                            {SECTORS.map(s => (
                                <tr key={s.id}>
                                    <td data-label={c.cols[0]} className="eco-table-lead">{s[lang]}</td>
                                    <td data-label={c.cols[1]}>{L[s.id].pat}</td>
                                    <td data-label={c.cols[2]}>{L[s.id].grant}</td>
                                    <td data-label={c.cols[3]}>{L[s.id].bm}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Caption kind="Table" n={2}>{c.caption}</Caption>
            </figure>
        </SectionModule>
    );
}

injectStyles('eco-e7', `
.eco-table--ledger tbody td:nth-child(2) { font-family: var(--eco-font-data); font-size: 13px; color: var(--eco-teal); }
.eco-table--ledger tbody td:nth-child(3) { font-family: var(--eco-font-data); font-size: 12px; color: var(--eco-text-2); }
.eco-table--ledger tbody td:nth-child(4) { color: var(--eco-text-3); font-size: 12.5px; }
`);
