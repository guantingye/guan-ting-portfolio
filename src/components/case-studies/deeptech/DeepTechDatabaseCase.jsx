import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { getDeepTechContent } from './deepTechContent.js';
import DeepTechEntityWorkbench from './DeepTechEntityWorkbench.jsx';
import DeepTechOutputGallery from './DeepTechOutputGallery.jsx';
import DeepTechPipelineSketch from './DeepTechPipelineSketch.jsx';
import DeepTechQualityBoard from './DeepTechQualityBoard.jsx';
import DeepTechSchemaMap from './DeepTechSchemaMap.jsx';

function RevealSection({ children, className = '' }) {
  const reducedMotion = useReducedMotion();
  const motionProps = reducedMotion
    ? {}
    : {
      initial: { opacity: 0, y: 28 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.18 },
      transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] },
    };

  return (
    <motion.section className={`deeptech-system-section ${className}`} {...motionProps}>
      {children}
    </motion.section>
  );
}

function SectionHeader({ title, lead }) {
  return (
    <div className="deeptech-system-section-head">
      <h2>{title}</h2>
      <p>{lead}</p>
    </div>
  );
}

function HeroConsole({ console }) {
  return (
    <div className="deeptech-hero-console" aria-label="Data intelligence console preview">
      <div className="deeptech-console-column">
        <span>{console.sourcesTitle}</span>
        {console.sources.map(source => <code key={source}>{source}</code>)}
      </div>
      <div className="deeptech-console-core">
        <span>{console.coreTitle}</span>
        <strong>DB</strong>
        <div>
          {console.core.map(item => <code key={item}>{item}</code>)}
        </div>
      </div>
      <div className="deeptech-console-column">
        <span>{console.outputsTitle}</span>
        {console.outputs.map(output => <code key={output}>{output}</code>)}
      </div>
    </div>
  );
}

function Hero({ content }) {
  return (
    <RevealSection className="deeptech-system-hero">
      <div className="deeptech-system-hero-copy">
        <p className="deeptech-system-kicker">{content.label}</p>
        <h2>{content.title}</h2>
        <p className="deeptech-system-one-liner">{content.oneLiner}</p>
        <p className="deeptech-system-summary">{content.summary}</p>
        <div className="deeptech-system-meta">
          {content.meta.map(item => <span key={item}>{item}</span>)}
        </div>
      </div>
      <HeroConsole console={content.console} />
    </RevealSection>
  );
}

function ProblemSection({ content }) {
  return (
    <RevealSection className="deeptech-problem-section">
      <SectionHeader title={content.title} lead={content.lead} />
      <div className="deeptech-problem-grid">
        {content.cards.map(card => (
          <article className="deeptech-problem-card" key={card.title}>
            <h3>{card.title}</h3>
            <div>
              <span>{content.beforeLabel}</span>
              <p>{card.before}</p>
            </div>
            <div>
              <span>{content.afterLabel}</span>
              <p>{card.after}</p>
            </div>
          </article>
        ))}
      </div>
      <blockquote className="deeptech-system-quote">{content.quote}</blockquote>
    </RevealSection>
  );
}

function MethodsSection({ content }) {
  return (
    <RevealSection className="deeptech-method-section">
      <SectionHeader title={content.title} lead={content.lead} />
      <div className="deeptech-method-grid">
        {content.groups.map(group => (
          <article className="deeptech-method-card" key={group.title}>
            <h3>{group.title}</h3>
            {group.items.map(item => <span key={item}>{item}</span>)}
          </article>
        ))}
      </div>
    </RevealSection>
  );
}

function ImpactSection({ content }) {
  return (
    <RevealSection className="deeptech-impact-section">
      <SectionHeader title={content.title} lead={content.lead} />
      <div className="deeptech-impact-grid">
        {content.cards.map(card => (
          <article className="deeptech-impact-card" key={card.role}>
            <h3>{card.role}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
      <article className="deeptech-reflection-panel">
        <span>{content.reflectionTitle}</span>
        <p>{content.reflection}</p>
      </article>
    </RevealSection>
  );
}

export default function DeepTechDatabaseCase({ lang }) {
  const content = getDeepTechContent(lang);

  return (
    <div className="deeptech-system-case">
      <Hero content={content.hero} />

      <ProblemSection content={content.problem} />

      <RevealSection className="deeptech-pipeline-section">
        <SectionHeader title={content.pipeline.title} lead={content.pipeline.lead} />
        <DeepTechPipelineSketch labels={content.pipeline.labels} stages={content.pipeline.stages} />
      </RevealSection>

      <RevealSection className="deeptech-workbench-section">
        <SectionHeader title={content.workbench.title} lead={content.workbench.lead} />
        <DeepTechEntityWorkbench content={content.workbench} />
      </RevealSection>

      <RevealSection className="deeptech-schema-section">
        <SectionHeader title={content.schema.title} lead={content.schema.lead} />
        <DeepTechSchemaMap content={content.schema} />
      </RevealSection>

      <RevealSection className="deeptech-quality-section">
        <SectionHeader title={content.quality.title} lead={content.quality.lead} />
        <DeepTechQualityBoard content={content.quality} />
      </RevealSection>

      <RevealSection className="deeptech-output-section">
        <SectionHeader title={content.outputs.title} lead={content.outputs.lead} />
        <DeepTechOutputGallery content={content.outputs} />
      </RevealSection>

      <MethodsSection content={content.methods} />
      <ImpactSection content={content.impact} />
    </div>
  );
}
