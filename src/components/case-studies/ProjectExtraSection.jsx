import React from 'react';
import Icon from '../ui/Icon.jsx';
import EmobotCaseStudy from './EmobotCaseStudy.jsx';

export default function ProjectExtraSection({ slug, lang }) {
  const PA = lang === 'zh';

  if (slug === 'emobot-plus') return React.createElement(EmobotCaseStudy, { lang });

  if (slug === 'deeptech-database') return React.createElement('div', { className: 'proj-section reveal' },
    React.createElement('div', { className: 'proj-section-title' }, PA ? '資料管線架構' : 'Pipeline Architecture'),
    React.createElement('div', { className: 'pipeline-viz' },
      ...['104.com.tw', '→', 'TSIA / SEMI.org', '→', 'MOPS API', '→', 'ETL Clean', '→', 'SQL Store', '→', 'Excel / Notion'].map((n, i) =>
        n === '→'
          ? React.createElement('span', { className: 'pipeline-arrow', key: i }, n)
          : React.createElement('div', { className: 'pipeline-node', key: i }, n)
      )
    ),
    React.createElement('div', { className: 'stats-bar' },
      ...[
        { num: '230+', label: PA ? '公司追蹤' : 'Companies' },
        { num: '40+',  label: PA ? '資料維度' : 'Data Dims' },
        { num: 'v9.2', label: PA ? '目前版本' : 'Version' },
        { num: '9',    label: PA ? '整合來源' : 'Sources' },
      ].map(s => React.createElement('div', { className: 'stats-bar-item', key: s.label },
        React.createElement('div', { className: 'stats-bar-num' }, s.num),
        React.createElement('div', { className: 'stats-bar-label' }, s.label)
      ))
    )
  );

  if (slug === 'ai-news-intelligence') return React.createElement('div', { className: 'proj-section reveal' },
    React.createElement('div', { className: 'proj-section-title' }, PA ? '資料來源矩陣' : 'Source Matrix'),
    React.createElement('div', { className: 'source-grid' },
      ...['TechCrunch', 'MIT Tech Review', 'TechNews 科技新報', 'INSIDE 硬塞', 'TechNewsWorld', '+ Domain Feeds'].map(s =>
        React.createElement('div', { className: 'source-card', key: s },
          React.createElement('span', { className: 'source-dot' }),
          s
        )
      )
    )
  );

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