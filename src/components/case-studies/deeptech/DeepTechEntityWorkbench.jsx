import React, { useMemo, useState } from 'react';

export default function DeepTechEntityWorkbench({ content }) {
  const [activeTabId, setActiveTabId] = useState(content.tabs[0].id);
  const [activeAlias, setActiveAlias] = useState(content.aliases[0]);
  const activeTab = useMemo(
    () => content.tabs.find(tab => tab.id === activeTabId) || content.tabs[0],
    [activeTabId, content.tabs],
  );

  return (
    <div className="deeptech-entity-workbench">
      <div className="deeptech-workbench-topline">
        <span>{content.sampleNote}</span>
        <strong>{content.confidenceLabel}: {content.confidence}</strong>
      </div>

      <div className="deeptech-workbench-grid">
        <div className="deeptech-workbench-panel">
          <div className="deeptech-tablist" role="tablist" aria-label="Entity normalization views">
            {content.tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={tab.id === activeTabId}
                className={tab.id === activeTabId ? 'is-active' : ''}
                onClick={() => setActiveTabId(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="deeptech-workbench-fields" role="tabpanel" key={activeTab.id}>
            <h3>{activeTab.title}</h3>
            {activeTab.fields.map(([label, value]) => (
              <div className="deeptech-workbench-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>

        <aside className="deeptech-alias-panel">
          <span>{content.aliasesLabel}</span>
          <div className="deeptech-alias-stack">
            {content.aliases.map(alias => (
              <button
                key={alias}
                type="button"
                aria-pressed={alias === activeAlias}
                className={alias === activeAlias ? 'is-active' : ''}
                onMouseEnter={() => setActiveAlias(alias)}
                onFocus={() => setActiveAlias(alias)}
                onClick={() => setActiveAlias(alias)}
              >
                {alias}
              </button>
            ))}
          </div>
          <div className="deeptech-canonical-card">
            <small>{activeAlias}</small>
            <strong>{content.canonical}</strong>
            <span>{content.confidenceLabel}: {content.confidence}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
