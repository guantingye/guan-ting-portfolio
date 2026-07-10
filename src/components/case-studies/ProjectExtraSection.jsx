import React from 'react';
import DataroomEvidence from '../dataroom/DataroomEvidence.jsx';
import EmobotCaseStudy from './EmobotCaseStudy.jsx';
import LaunchOsEvidence from '../launch-os/LaunchOsEvidence.jsx';
import EvidenceLab from '../evidence-lab/EvidenceLab.jsx';

export default function ProjectExtraSection({ slug, lang }) {
  const PA = lang === 'zh';

  if (slug === 'emobot-plus') return React.createElement(EmobotCaseStudy, { lang });

  if (slug === 'ai-product-launch-os') return React.createElement(LaunchOsEvidence, null);

  if (slug === 'ux-hmi-interaction-lab') return React.createElement(EvidenceLab, null);

  if (slug === 'deeptech-database') return React.createElement(DataroomEvidence, null);

  // ai-news-intelligence: the source matrix now lives in the Evidence Layer
  // (Module 02), mounted after the technical approach in ProjectPage.

  if (slug === 'semiconductor-map') return React.createElement('div', { className: 'proj-section reveal' },
    React.createElement('div', { className: 'proj-section-title' }, PA ? '深科技價值鏈覆蓋' : 'Deep Tech Value Chain Coverage'),
    React.createElement('div', { className: 'chain-flow' },
      ...[
        { num: '01', name: 'Semiconductor / IC Design', tag: '45+ companies' },
        { num: '02', name: 'AI / Machine Learning',     tag: '62+ companies' },
        { num: '03', name: 'Biotech / MedTech',         tag: '38+ companies' },
        { num: '04', name: 'Cleantech / Energy',        tag: '29+ companies' },
        { num: '05', name: 'Advanced Manufacturing',    tag: '41+ companies' },
        { num: '06', name: 'Deep-Tech Enablers',        tag: '18+ companies' },
      ].map(c => React.createElement('div', { className: 'chain-row', key: c.num },
        React.createElement('span', { className: 'chain-num' }, c.num),
        React.createElement('span', { className: 'chain-name' }, c.name),
        React.createElement('span', { className: 'chain-tag' }, c.tag)
      ))
    )
  );

  if (slug === 'startup-intelligence-platform') return React.createElement('div', { className: 'proj-section reveal' },
    React.createElement('div', { className: 'proj-section-title' }, PA ? '平台關鍵指標' : 'Platform Key Metrics'),
    React.createElement('div', { className: 'metric-row' },
      ...[
        { val: '~80%', desc: PA ? '手動工作量減少' : 'Manual Work Reduced' },
        { val: '100%', desc: PA ? '自動化資料更新' : 'Automated Data Refresh' },
        { val: '1',    desc: PA ? '獨立開發' : 'Solo Built' },
        { val: 'SQL',  desc: PA ? '後端資料庫' : 'Backend DB' },
        { val: 'JS',   desc: PA ? '前端儀表板' : 'Frontend Dashboard' },
        { val: '⭐',   desc: PA ? '育星計畫種子' : 'Star Program 2025' },
      ].map(m => React.createElement('div', { className: 'metric-card', key: m.desc },
        React.createElement('div', { className: 'metric-val' }, m.val),
        React.createElement('div', { className: 'metric-desc' }, m.desc)
      ))
    )
  );

  return null;
}
