import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const nodePositions = [
  [10, 26],
  [23, 58],
  [36, 30],
  [49, 62],
  [62, 28],
  [75, 58],
  [87, 30],
  [87, 70],
];

function DetailList({ title, items }) {
  return (
    <div className="deeptech-pipeline-detail-list">
      <span>{title}</span>
      {items.map(item => <code key={item}>{item}</code>)}
    </div>
  );
}

export default function DeepTechPipelineSketch({ labels, stages }) {
  const [activeId, setActiveId] = useState(stages[0].id);
  const reducedMotion = useReducedMotion();
  const activeStage = useMemo(
    () => stages.find(stage => stage.id === activeId) || stages[0],
    [activeId, stages],
  );

  const pathMotion = reducedMotion
    ? {}
    : {
      initial: { pathLength: 0, opacity: 0.2 },
      whileInView: { pathLength: 1, opacity: 1 },
      viewport: { once: true, amount: 0.45 },
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    };

  return (
    <div className="deeptech-pipeline-sketch">
      <div className="deeptech-pipeline-map" aria-label="DeepTech source-to-output pipeline">
        <svg className="deeptech-pipeline-flow" viewBox="0 0 1000 430" role="img" aria-labelledby="deeptech-pipeline-title deeptech-pipeline-desc">
          <title id="deeptech-pipeline-title">DeepTech source-to-output pipeline</title>
          <desc id="deeptech-pipeline-desc">A source-to-output flow connecting public signals, raw staging, normalization, entity resolution, enrichment, research database, analysis mart, and research outputs.</desc>
          <motion.path
            d="M86 112 C 150 248, 214 268, 282 194 S 408 96, 498 234 S 620 330, 710 214 S 846 110, 948 270"
            fill="none"
            stroke="rgba(31, 229, 208, 0.68)"
            strokeWidth="3"
            strokeLinecap="round"
            {...pathMotion}
          />
          <path
            d="M86 112 C 150 248, 214 268, 282 194 S 408 96, 498 234 S 620 330, 710 214 S 846 110, 948 270"
            fill="none"
            stroke="rgba(246, 180, 75, 0.14)"
            strokeWidth="28"
            strokeLinecap="round"
          />
        </svg>

        <div className="deeptech-pipeline-node-grid">
          {stages.map((stage, index) => {
            const [x, y] = nodePositions[index];
            const isActive = stage.id === activeId;

            return (
              <button
                key={stage.id}
                type="button"
                className={`deeptech-pipeline-node${isActive ? ' is-active' : ''}`}
                style={{ '--node-x': `${x}%`, '--node-y': `${y}%` }}
                aria-pressed={isActive}
                onMouseEnter={() => setActiveId(stage.id)}
                onFocus={() => setActiveId(stage.id)}
                onClick={() => setActiveId(stage.id)}
              >
                <span>{stage.step}</span>
                <strong>{stage.title}</strong>
                <small>{stage.subtitle}</small>
              </button>
            );
          })}
        </div>
      </div>

      <aside className="deeptech-pipeline-inspector" aria-live="polite">
        <span className="deeptech-inspector-step">{activeStage.step}</span>
        <h3>{activeStage.title}</h3>
        <p>{activeStage.subtitle}</p>
        <div className="deeptech-pipeline-detail-grid">
          <DetailList title={labels.inputs} items={activeStage.inputs} />
          <DetailList title={labels.operations} items={activeStage.operations} />
          <DetailList title={labels.outputs} items={activeStage.outputs} />
        </div>
      </aside>
    </div>
  );
}
