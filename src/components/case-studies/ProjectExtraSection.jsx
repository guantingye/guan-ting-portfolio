import React from 'react';
import DataroomEvidence from '../dataroom/DataroomEvidence.jsx';
import EmobotCaseStudy from './EmobotCaseStudy.jsx';
import LaunchOsEvidence from '../launch-os/LaunchOsEvidence.jsx';
import DesignSystemSpecimen from '../launch-os/DesignSystemSpecimen.jsx';
import EvidenceLab from '../evidence-lab/EvidenceLab.jsx';
import StrategyPlatformEvidence from '../strategy-platform/StrategyPlatformEvidence.jsx';
import NewsIntelEvidence from '../newsintel/NewsIntelEvidence.jsx';
import PsyMatchEvidence from '../psymatch/PsyMatchEvidence.jsx';
import VerificationLayer from '../verification/VerificationLayer.jsx';
import ProductShowcase from '../product-showcase/ProductShowcase.jsx';
import DeepScoutEvidence from '../deepscout/DeepScoutEvidence.jsx';
import FieldJourneyEvidence from '../field-journey/FieldJourneyEvidence.jsx';

// The single "middle" interactive-evidence slot. Every project mounts its big
// interactive module here — after the storytelling case study and before
// KEY OUTCOMES / TECHNICAL APPROACH — so every project page reads
// opening → middle → KEY OUTCOMES → TECHNICAL APPROACH and closes cleanly on
// the technical approach, instead of bolting a huge module on after it.
export default function ProjectExtraSection({ slug, lang }) {
  if (slug === 'emobot-plus') return React.createElement(EmobotCaseStudy, { lang });

  if (slug === 'deeptech-database') return React.createElement(DataroomEvidence, null);

  if (slug === 'ai-product-launch-os') return React.createElement(React.Fragment, null,
    React.createElement(LaunchOsEvidence, null),
    React.createElement('div', { className: 'proj-section reveal' },
      React.createElement(DesignSystemSpecimen, null)));

  if (slug === 'ai-news-intelligence') return React.createElement(NewsIntelEvidence, null);

  if (slug === 'ux-hmi-interaction-lab') return React.createElement(EvidenceLab, null);

  if (slug === 'industry-strategy-platform') return React.createElement(StrategyPlatformEvidence, null);

  if (slug === 'startup-intelligence-platform') return React.createElement(React.Fragment, null,
    React.createElement(ProductShowcase, null),
    React.createElement(VerificationLayer, null));

  if (slug === 'psymatch') return React.createElement(PsyMatchEvidence, null);

  if (slug === 'deepscout') return React.createElement(DeepScoutEvidence, null);

  if (slug === 'field-journey') return React.createElement(FieldJourneyEvidence, null);

  return null;
}
