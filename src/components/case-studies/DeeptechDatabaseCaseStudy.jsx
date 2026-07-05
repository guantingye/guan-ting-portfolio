import React, { useState } from 'react';
import itriStarImage from '../../../assets/ITRI star project.png';
import deeptechResearchStudio from '../../../assets/deeptech-research-studio.png';
import Icon from '../ui/Icon.jsx';

const CONTENT = {
  en: {
    hero: {
      eyebrow: 'ITRI internship / data product case',
      title: 'A research system for Taiwan startup intelligence.',
      lead: 'I turned public startup signals into reviewable records, bilingual taxonomy, and handoff surfaces for analysts, maps, and AI-assisted briefings.',
      context: 'Public-safe reconstruction. Company-level records are represented as mock data.',
      thesis: 'The real contribution was not a crawler. It was turning scattered startup signals into a reusable intelligence workflow.',
      mediaCaption: 'Research studio reconstruction: source maps, schema sketches, taxonomy notes, and analyst review logic.',
      roles: [
        { label: 'Product question', text: 'How can analysts trust a scraped startup record?' },
        { label: 'My role', text: 'Crawler workflow, schema, taxonomy, QA, and handoff UX.' },
        { label: 'Portfolio boundary', text: 'Public sources and anonymized sample records only.' },
      ],
    },
    metrics: [
      { value: '230+', label: 'company records', detail: 'structured startup universe' },
      { value: '40+', label: 'fields per record', detail: 'identity, market, talent, finance, tags' },
      { value: '9', label: 'source families', detail: 'registries, associations, websites, news' },
      { value: 'v9+', label: 'dataset lineage', detail: 'append-only refresh discipline' },
    ],
    principles: [
      'Every field needs provenance before it becomes intelligence.',
      'Taxonomy has to translate local language into global categories.',
      'The database should be map-ready, query-ready, and reviewable.',
    ],
    contextBoard: {
      eyebrow: 'Public context board',
      title: 'The page is grounded in Taiwan’s real deep-tech geography',
      lead: 'These public references establish the ecosystem context without exposing internal ITRI data. The visuals are reference imagery; the interface and dataset below are portfolio-safe reconstructions.',
      facts: [
        { value: '1980', label: 'Hsinchu Science Park opened', source: 'HSP public record', href: 'https://en.wikipedia.org/wiki/Hsinchu_Science_Park' },
        { value: '584', label: 'registered HSP tenants, 2024-12', source: 'HSP public record', href: 'https://en.wikipedia.org/wiki/Hsinchu_Science_Park' },
        { value: '177k+', label: 'HSP workers, 2024-10', source: 'HSP public record', href: 'https://en.wikipedia.org/wiki/Hsinchu_Science_Park' },
        { value: 'IEK', label: 'industrial-intelligence taxonomy context', source: 'IEKNet public topics', href: 'https://ieknet.iek.org.tw/' },
      ],
      references: [
        { title: 'Semiconductor substrate', desc: 'A visual proxy for the deep-tech / hardware categories behind the taxonomy.', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Data infrastructure', desc: 'Server and storage imagery used as a reference for the data backbone layer.', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Analyst cockpit', desc: 'Dashboard imagery used as visual direction for the downstream intelligence surface.', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Networked economy', desc: 'A systems reference for connecting companies, sources, tags, and market activity.', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
        { title: 'AI operations', desc: 'A reference for the agent-assisted workflow layer rather than a literal screenshot.', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Industrial automation cell', desc: 'A reference for advanced manufacturing, robotics, and hardware-heavy startup categories.', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Founder review room', desc: 'A visual proxy for analyst moderation, company verification, and cross-source review.', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80' },
      ],
    },
    publicEvidence: {
      eyebrow: 'Public evidence atlas',
      title: 'Real public sources turn the mockup into a credible intelligence system',
      lead: 'The interface below shows how I would evaluate public material before allowing it into the startup database: what each source is trusted for, what it cannot prove, and which downstream surface it can support.',
      tabs: [
        {
          label: 'Ecosystem',
          source: 'Startup Island TAIWAN x Crunchbase',
          href: 'https://about.crunchbase.com/blog/decoding-taiwans-thriving-startup-scene-startup-island-taiwan-2023-investor-report',
          image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1300&q=80',
          title: 'Startup ecosystem report as discovery input',
          fact: 'Crunchbase and Startup Island TAIWAN describe Taiwan as a growing technology startup ecosystem, with the 2023 report covering government support, VC activity, investment opportunities, and innovation trends.',
          trusted: 'Discover ecosystem lists, program names, public community signals, and startup narrative categories.',
          caution: 'Useful for discovery and framing; company-level claims still need registry, website, or analyst review before promotion.',
          fields: ['ecosystem_source', 'program_reference', 'startup_alias', 'market_story'],
          signals: [['Discovery value', 'high'], ['Verification level', 'secondary'], ['Refresh cadence', 'manual watch']],
        },
        {
          label: 'Policy',
          source: 'National Development Council',
          href: 'https://www.ndc.gov.tw/en/',
          image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1300&q=80',
          title: 'Policy context and startup agenda',
          fact: 'NDC lists the Action Plan for Enhancing Taiwan’s Startup Ecosystem alongside Asia Silicon Valley, Ten AI Initiatives, and national development programs.',
          trusted: 'Connect startup records to policy context, strategic sectors, investment programs, and national priority language.',
          caution: 'Policy pages describe national direction; they do not validate a specific company’s traction or financial status.',
          fields: ['policy_theme', 'priority_sector', 'program_link', 'strategic_context'],
          signals: [['Discovery value', 'medium'], ['Verification level', 'context'], ['Refresh cadence', 'quarterly review']],
        },
        {
          label: 'Industry',
          source: 'IEK Industrial Intelligence',
          href: 'https://ieknet.iek.org.tw/',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1300&q=80',
          title: 'Industry taxonomy and briefing language',
          fact: 'IEK publishes topic areas across semiconductor, ICT, cross-domain technology, green energy, biotech, machinery, vehicles, global markets, and startup news.',
          trusted: 'Shape taxonomy labels, analyst briefing categories, and the language used by downstream IEK-style intelligence views.',
          caution: 'Good for classification and brief framing; individual company evidence still needs a field-level source trail.',
          fields: ['iek_topic', 'industry_bucket', 'briefing_theme', 'trend_context'],
          signals: [['Discovery value', 'high'], ['Verification level', 'taxonomy'], ['Refresh cadence', 'topic watch']],
        },
        {
          label: 'Open Data',
          source: 'data.gov.tw',
          href: 'https://data.gov.tw/en',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1300&q=80',
          title: 'Government open-data backbone',
          fact: 'Taiwan’s open-data portal includes dataset categories such as Opening New Companies, Public Information, and Investment and Financial Management.',
          trusted: 'Identify official datasets, registry-like references, and repeatable public-data entry points for source adapters.',
          caution: 'Dataset availability and schema quality vary; adapters need schema checks, snapshots, and fallback parsing.',
          fields: ['dataset_id', 'agency_owner', 'license_note', 'schema_version'],
          signals: [['Discovery value', 'medium'], ['Verification level', 'official'], ['Refresh cadence', 'schema watch']],
        },
        {
          label: 'Science Park',
          source: 'Hsinchu Science Park',
          href: 'https://web.sipa.gov.tw/english/',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1300&q=80',
          title: 'Deep-tech geography anchor',
          fact: 'Public records identify Hsinchu Science Park as a 1980 science-park anchor with hundreds of tenants and a large technical workforce.',
          trusted: 'Ground company records in geography, cluster density, hardware supply-chain proximity, and science-park context.',
          caution: 'Park-level facts support location intelligence, not company-level product or funding claims.',
          fields: ['park_context', 'city_cluster', 'workforce_anchor', 'value_chain_region'],
          signals: [['Discovery value', 'high'], ['Verification level', 'geography'], ['Refresh cadence', 'semiannual check']],
        },
        {
          label: 'Benchmark',
          source: 'Crunchbase Pro / linked-data research',
          href: 'https://arxiv.org/abs/1907.08671',
          image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1300&q=80',
          title: 'Knowledge-graph benchmark',
          fact: 'The Linked Crunchbase paper describes an RDF dataset with 347M+ triples across people, organizations, and investments.',
          trusted: 'Benchmark entity relationships, sameAs aliases, organization-person-investment links, and machine-readable graph thinking.',
          caution: 'This is a benchmark pattern, not a source of Taiwan company facts for this portfolio reconstruction.',
          fields: ['entity_uri', 'same_as', 'relationship_type', 'graph_confidence'],
          signals: [['Discovery value', 'benchmark'], ['Verification level', 'model'], ['Refresh cadence', 'design reference']],
        },
      ],
      ledger: [
        ['Discovery', 'Find candidate companies, aliases, programs, and sectors.', 'source_registry'],
        ['Verification', 'Promote only fields with official source, company site, or cross-source evidence.', 'field_review'],
        ['Classification', 'Map local descriptions into bilingual deep-tech taxonomy.', 'taxonomy_map'],
        ['Handoff', 'Export only reviewed records to map, briefing cards, and agent views.', 'agent_export'],
      ],
    },
    benchmark: {
      eyebrow: 'Benchmark translation',
      title: 'From Crunchbase pattern to Taiwan-specific intelligence workflow',
      lead: 'The design reference is a professional private-market database, but the implementation logic is different: Taiwan startup data needs source provenance, bilingual aliases, taxonomy review, and analyst-safe handoff.',
      modes: [
        {
          label: 'Database UX',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1300&q=80',
          source: 'Crunchbase Pro search pattern',
          href: 'https://support.crunchbase.com/hc/en-us/articles/360046653554-How-can-I-search-using-Crunchbase-Pro',
          title: 'Entity-first search, profile, and enrichment',
          body: 'The reference pattern is not a pretty table. It is search depth, configurable filters, saved lists, export paths, and profiles that help users act on private-market information.',
          takeaways: ['Company-first profile', 'Filterable search surface', 'Export-ready records'],
          nodes: [
            { label: 'Company', x: 45, y: 44, tone: 'core' },
            { label: 'Aliases', x: 19, y: 23, tone: 'gold' },
            { label: 'People', x: 72, y: 24, tone: 'blue' },
            { label: 'Funding', x: 74, y: 67, tone: 'gold' },
            { label: 'Sources', x: 20, y: 70, tone: 'green' },
          ],
          evidence: [['Primary test', 'Can an analyst find one company and understand why it is trusted?'], ['Portfolio proof', 'Search, filter, profile, validation, and export readiness are visible in one surface.']],
        },
        {
          label: 'Knowledge Graph',
          image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1300&q=80',
          source: 'Linked Crunchbase RDF model',
          href: 'https://arxiv.org/abs/1907.08671',
          title: 'Relationships matter as much as fields',
          body: 'The benchmark is not only a table. A startup intelligence database should preserve relationships between organizations, people, investments, evidence, and equivalent aliases.',
          takeaways: ['sameAs alias thinking', 'Organization-person-investment graph', 'Machine-readable handoff model'],
          nodes: [
            { label: 'Org', x: 47, y: 48, tone: 'core' },
            { label: 'Founder', x: 20, y: 35, tone: 'blue' },
            { label: 'Investor', x: 75, y: 34, tone: 'gold' },
            { label: 'sameAs', x: 24, y: 75, tone: 'green' },
            { label: 'Topic', x: 72, y: 76, tone: 'blue' },
          ],
          evidence: [['Primary test', 'Can the data model represent uncertainty without flattening it away?'], ['Portfolio proof', 'Alias conflicts and candidate fields remain reviewable before promotion.']],
        },
        {
          label: 'Taiwan Context',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1300&q=80',
          source: 'Hsinchu Science Park / ITRI ecosystem',
          href: 'https://web.sipa.gov.tw/english/',
          title: 'Geography turns records into an ecosystem map',
          body: 'Taiwan deep-tech intelligence needs local anchors: Hsinchu, Taipei, Taichung, science parks, industrial clusters, and value-chain roles.',
          takeaways: ['Map-ready geography fields', 'Cluster and value-chain layers', 'Taiwan-specific sector context'],
          nodes: [
            { label: 'Hsinchu', x: 38, y: 29, tone: 'core' },
            { label: 'Taipei', x: 66, y: 21, tone: 'blue' },
            { label: 'Taichung', x: 26, y: 63, tone: 'gold' },
            { label: 'Tainan', x: 58, y: 76, tone: 'green' },
            { label: 'Park', x: 73, y: 52, tone: 'blue' },
          ],
          evidence: [['Primary test', 'Can records become a navigable Taiwan startup map?'], ['Portfolio proof', 'The case includes sector clusters, map nodes, and export-ready fields.']],
        },
        {
          label: 'IEK Handoff',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1300&q=80',
          source: 'IEK intelligence application pattern',
          href: 'https://ieknet.iek.org.tw/',
          title: 'Records need to become briefing material',
          body: 'The end state is not a spreadsheet. The dataset should support analyst dashboards, IEK-style topic views, brief cards, and visualization-agent responses with provenance attached.',
          takeaways: ['Brief-ready evidence blocks', 'Chart-ready aggregate tables', 'Agent responses with source trail'],
          nodes: [
            { label: 'Dataset', x: 44, y: 44, tone: 'core' },
            { label: 'Brief', x: 18, y: 30, tone: 'gold' },
            { label: 'Agent', x: 72, y: 30, tone: 'blue' },
            { label: 'Map', x: 25, y: 72, tone: 'green' },
            { label: 'IEK', x: 72, y: 70, tone: 'gold' },
          ],
          evidence: [['Primary test', 'Can downstream users reuse the record without asking where it came from?'], ['Portfolio proof', 'Every demo surface keeps source coverage, confidence, and review state visible.']],
        },
      ],
    },
    marketProfile: {
      eyebrow: 'Private-market database benchmark',
      title: 'A Crunchbase-style company profile, rebuilt for Taiwan deep-tech intelligence',
      lead: 'The professional database pattern is entity-first: a clean company profile, funding and people signals, source-backed validation, and a traceable edit history. This mockup shows how I would translate that pattern into an ITRI-safe internal intelligence surface.',
      tabs: [
        {
          label: 'Profile',
          headline: 'Anonymized AI semiconductor scale-up',
          meta: [['Founded', '2019'], ['HQ', 'Hsinchu / Taipei'], ['Stage', 'growth candidate'], ['Sector', 'AI x IC design']],
          notes: ['Canonical record links three aliases across Chinese and English sources.', 'Sector tag is analyst-reviewed; value-chain role is edge inference software.'],
        },
        {
          label: 'Signals',
          headline: 'Market activity signal board',
          meta: [['Hiring velocity', '+18%'], ['News mentions', '12'], ['Source coverage', '7/9'], ['Confidence', '0.84']],
          notes: ['Hiring and news signals move together across two source families.', 'Funding references remain candidate-level until registry evidence is confirmed.'],
        },
        {
          label: 'Validation',
          headline: 'Evidence and moderation layer',
          meta: [['Open issues', '2'], ['Alias conflicts', '1'], ['Freshness', '18 days'], ['Audit state', 'ready']],
          notes: ['Low-confidence aliases are kept out of the profile until resolved.', 'Every promoted field carries source URL, extraction date, and review state.'],
        },
      ],
      sideStats: [
        { label: 'source URLs', value: '31' },
        { label: 'verified fields', value: '37' },
        { label: 'candidate fields', value: '6' },
      ],
    },
    pipeline: {
      eyebrow: 'Interactive architecture',
      title: 'Follow one company signal from public source to IEK-ready insight',
      lead: 'Click each station to see what the pipeline adds. The diagram is intentionally concrete: it shows where extraction, review, taxonomy, and downstream applications separate.',
      stages: [
        { icon: 'globe', title: 'Source watchlist', short: 'Capture', detail: 'Public websites, MOPS references, 104 talent pages, association directories, startup lists, and market news are tracked as source families rather than isolated URLs.', artifact: 'source_registry.csv', payload: ['source type', 'URL pattern', 'refresh cadence', 'access notes'] },
        { icon: 'cpu', title: 'Crawler adapter', short: 'Extract', detail: 'Each source gets its own extraction strategy: browser automation for JS-heavy pages, request-based collectors for stable endpoints, and cache fallback when pages are unstable.', artifact: 'adapter_104_jobs.py', payload: ['selectors', 'retry policy', 'cache snapshot', 'raw capture'] },
        { icon: 'database', title: 'Staging ledger', short: 'Preserve', detail: 'Raw extracts land in a staging layer with run IDs, timestamps, and source URLs so the team can audit where each signal came from.', artifact: 'raw_company_snapshot', payload: ['run id', 'source URL', 'raw value', 'extract date'] },
        { icon: 'layers', title: 'Normalization pass', short: 'Clean', detail: 'Pandas transforms align company names, aliases, headcount ranges, finance references, geography, and duplicated records before analyst review.', artifact: 'company_profile_v9', payload: ['canonical name', 'aliases', 'dimensions', 'review state'] },
        { icon: 'target', title: 'Taxonomy mapping', short: 'Classify', detail: 'Chinese company descriptions are mapped into bilingual technical tags so Taiwan-specific signals can be compared with international deep-tech categories.', artifact: 'taxonomy_map.json', payload: ['sector', 'subsector', 'value-chain role', 'confidence'] },
        { icon: 'monitor', title: 'Intelligence surfaces', short: 'Use', detail: 'Clean exports can feed a startup map, IEK-style briefing cards, analyst dashboards, and visualization agents that answer questions with evidence attached.', artifact: 'agent_ready_export', payload: ['map layer', 'brief card', 'chart spec', 'source links'] },
      ],
    },
    sources: {
      eyebrow: 'Crawler source studio',
      title: 'Source adapters designed around messy Taiwanese startup data',
      lead: 'The point was not to scrape everything. It was to decide what signal each source was trusted to provide, then encode that decision into a repeatable adapter.',
      items: [
        { name: '104 talent pages', status: 'stable', signal: 'Hiring demand and headcount clues', method: 'Browser automation with selector checks and cached snapshots.', fields: ['job family', 'location', 'hiring intensity', 'company alias'] },
        { name: 'MOPS / public registry', status: 'validated', signal: 'Finance and governance references', method: 'Parser rules normalize public fields and attach source provenance.', fields: ['capital', 'listed relation', 'filing date', 'registry link'] },
        { name: 'Association directories', status: 'watch', signal: 'Industry membership and sector identity', method: 'Source-specific extractors with drift monitoring for directory layouts.', fields: ['member name', 'sector label', 'website', 'association'] },
        { name: 'News and search layer', status: 'review', signal: 'Recent market movement and aliases', method: 'Search enrichment collects candidate evidence, then routes low-confidence items into review.', fields: ['alias', 'funding mention', 'market signal', 'confidence'] },
      ],
    },
    dataProduct: {
      eyebrow: 'Data product demo',
      title: 'A company record that can survive handoff',
      lead: 'The mock record below shows the interface logic: one canonical company, multiple evidence-backed slices, and a field model that can power maps and agent queries.',
      slices: [
        { key: 'profile', label: 'Profile', title: 'Canonical profile', rows: [['Company ID', 'TW-DT-0187'], ['Sector', 'AI x semiconductor'], ['Stage', 'scale-up candidate'], ['Review state', 'analyst-reviewed']] },
        { key: 'signals', label: 'Signals', title: 'Operating signals', rows: [['Hiring trend', 'rising in edge AI roles'], ['Finance reference', 'public registry matched'], ['News signal', 'export partnership candidate'], ['Confidence', '0.84 source-weighted']] },
        { key: 'taxonomy', label: 'Taxonomy', title: 'Bilingual technical tags', rows: [['Primary tag', 'AI accelerator / AI 加速器'], ['Value-chain role', 'edge inference layer'], ['Benchmark bucket', 'semiconductor enabler'], ['Map layer', 'AI / IC design overlap']] },
      ],
      schema: ['canonical_name', 'source_url', 'sector_tag', 'talent_signal', 'finance_ref', 'confidence_score'],
    },
    datasetBrowser: {
      eyebrow: 'Anonymized dataset browser',
      title: 'A recruiter should be able to inspect the system, not just read about it',
      lead: 'The sample rows are anonymized but shaped like the real working surface: confidence, source coverage, review state, taxonomy, and what the record is ready to power.',
      rows: [
        { id: 'TW-DT-0187', sector: 'AI x Semiconductor', confidence: '0.84', sources: '7/9', review: 'reviewed', ready: 'map + brief', note: 'Strong talent signal, taxonomy overlap with edge inference.' },
        { id: 'TW-DT-0224', sector: 'Biotech / MedTech', confidence: '0.79', sources: '5/9', review: 'needs alias check', ready: 'brief', note: 'Multiple Chinese aliases require analyst confirmation.' },
        { id: 'TW-DT-0311', sector: 'Cleantech / Energy', confidence: '0.72', sources: '4/9', review: 'candidate', ready: 'map', note: 'Useful for ecosystem map, not yet ready for briefing.' },
        { id: 'TW-DT-0442', sector: 'Advanced Manufacturing', confidence: '0.88', sources: '8/9', review: 'reviewed', ready: 'agent query', note: 'High provenance coverage and stable source trail.' },
      ],
    },
    databaseConsole: {
      eyebrow: 'Crunchbase-like database console',
      title: 'A high-fidelity startup intelligence surface with verification built in',
      lead: 'This is the product-facing proof layer: search the anonymized company universe, inspect one entity, and see which fields are promoted, candidate, or blocked from downstream AI / map usage.',
      searchPlaceholder: 'Search company, city, sector, tag, evidence...',
      empty: 'No anonymized records match the current query.',
      filters: ['All', 'AI x Semiconductor', 'Biotech / MedTech', 'Cleantech / Energy', 'Advanced Manufacturing'],
      references: [
        { label: 'Crunchbase pattern', source: 'Company profiles, search filters, alerts, API, enrichment', href: 'https://www.crunchbase.com', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' },
        { label: 'Linked data model', source: 'Company, people, investment relations and sameAs thinking', href: 'https://arxiv.org/abs/1907.08671', image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1200&q=80' },
        { label: 'Taiwan tech geography', source: 'Hsinchu Science Park and ITRI ecosystem context', href: 'https://web.sipa.gov.tw/english/', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' },
      ],
      companies: [
        {
          id: 'TW-DT-0187',
          name: 'NovaGrid Analytics',
          mark: 'NG',
          sector: 'AI x Semiconductor',
          city: 'Hsinchu',
          score: '86',
          stage: 'scale-up candidate',
          employees: '51-100',
          readiness: 'map + brief',
          coverage: '7/9',
          freshness: '14d',
          tags: ['edge AI', 'IC design', 'export-ready'],
          signals: [['Hiring velocity', '+18%'], ['News mentions', '12'], ['Taxonomy fit', '0.91']],
          evidence: ['website verified', '104 signal stable', 'registry relation reviewed'],
          checks: [
            { field: 'canonical_name', state: 'promoted', value: '3 aliases merged' },
            { field: 'sector_tag', state: 'reviewed', value: 'AI x IC design' },
            { field: 'funding_signal', state: 'candidate', value: 'news mention only' },
          ],
        },
        {
          id: 'TW-DT-0224',
          name: 'AsterBio Systems',
          mark: 'AB',
          sector: 'Biotech / MedTech',
          city: 'Taipei',
          score: '79',
          stage: 'research commercialization',
          employees: '11-50',
          readiness: 'brief draft',
          coverage: '5/9',
          freshness: '27d',
          tags: ['diagnostics', 'bioinformatics', 'medical AI'],
          signals: [['Hiring velocity', '+7%'], ['News mentions', '8'], ['Taxonomy fit', '0.83']],
          evidence: ['registry matched', 'alias review pending', 'clinical claim excluded'],
          checks: [
            { field: 'canonical_name', state: 'review', value: 'Chinese alias conflict' },
            { field: 'sector_tag', state: 'promoted', value: 'medical AI' },
            { field: 'clinical_claim', state: 'blocked', value: 'insufficient public proof' },
          ],
        },
        {
          id: 'TW-DT-0311',
          name: 'HelioCell Materials',
          mark: 'HM',
          sector: 'Cleantech / Energy',
          city: 'Taoyuan',
          score: '73',
          stage: 'emerging startup',
          employees: '11-50',
          readiness: 'map only',
          coverage: '4/9',
          freshness: '31d',
          tags: ['storage', 'materials', 'climate'],
          signals: [['Hiring velocity', '+4%'], ['News mentions', '5'], ['Taxonomy fit', '0.76']],
          evidence: ['website verified', 'association pending', 'funding candidate'],
          checks: [
            { field: 'company_site', state: 'promoted', value: 'active source' },
            { field: 'industry_member', state: 'candidate', value: 'directory pending' },
            { field: 'funding_signal', state: 'review', value: 'no registry match' },
          ],
        },
        {
          id: 'TW-DT-0442',
          name: 'ForgeSense Robotics',
          mark: 'FR',
          sector: 'Advanced Manufacturing',
          city: 'Taichung',
          score: '88',
          stage: 'industrial pilot',
          employees: '101-250',
          readiness: 'agent query',
          coverage: '8/9',
          freshness: '9d',
          tags: ['robotics', 'vision', 'automation'],
          signals: [['Hiring velocity', '+22%'], ['News mentions', '15'], ['Taxonomy fit', '0.89']],
          evidence: ['job source stable', 'filing reviewed', 'brief-ready'],
          checks: [
            { field: 'hiring_signal', state: 'promoted', value: 'role-family normalized' },
            { field: 'sector_tag', state: 'reviewed', value: 'industrial automation' },
            { field: 'brief_card', state: 'promoted', value: 'agent-ready export' },
          ],
        },
      ],
    },
    qualityRoom: {
      eyebrow: 'Data quality evidence room',
      title: 'The database is designed to prove improvement, not only display records',
      lead: 'Professional private-market databases earn trust through field definitions, lineage, QA gates, and release notes. This interactive room shows how the startup dataset could be governed after each crawler refresh.',
      tabs: [
        {
          label: 'Schema',
          headline: 'Field dictionary as a product contract',
          stats: [['40+', 'profile dimensions'], ['12', 'core entity fields'], ['4', 'handoff surfaces']],
          rows: [
            ['canonical_name', 'promoted', 'Alias-merged company name used by maps and agent queries.'],
            ['sector_tag', 'reviewed', 'Bilingual taxonomy label aligned to global deep-tech categories.'],
            ['confidence_score', 'computed', 'Weighted score from source coverage, freshness, parser reliability, and analyst review.'],
          ],
        },
        {
          label: 'Lineage',
          headline: 'Append-only refresh history for every record',
          stats: [['v9+', 'dataset lineage'], ['9', 'source families'], ['31d', 'oldest sample age']],
          rows: [
            ['run_id', 'required', 'Every crawler execution keeps a run identifier for audit and rollback.'],
            ['source_snapshot', 'required', 'Raw HTML / extracted values are preserved before normalization.'],
            ['review_state', 'required', 'Candidate records cannot power briefings until conflicts are resolved.'],
          ],
        },
        {
          label: 'QA gates',
          headline: 'Weak evidence becomes a queue, not a silent database field',
          stats: [['5', 'promotion gates'], ['0', 'unverified claims'], ['3', 'review states']],
          rows: [
            ['source URL', 'gate', 'No promoted field can exist without a source URL.'],
            ['alias conflict', 'gate', 'Chinese / English aliases are checked before canonical merge.'],
            ['funding claim', 'blocked', 'Funding mentions stay candidate-only without trusted public evidence.'],
          ],
        },
      ],
      releaseLog: [
        { version: 'v9.2', status: 'stable', note: 'Promoted reviewed taxonomy fields into map-ready export.' },
        { version: 'v9.1', status: 'review', note: 'Moved low-confidence funding mentions into analyst queue.' },
        { version: 'v9.0', status: 'stable', note: 'Rebuilt source provenance model for 9 source families.' },
      ],
    },
    reviewFlow: {
      eyebrow: 'Analyst review flow',
      title: 'The high-value layer is the review loop',
      lead: 'A strong intelligence system makes uncertainty visible. This flow shows how weak evidence becomes a review queue instead of silently entering the database.',
      steps: [
        { icon: 'activity', title: 'Signal enters queue', body: 'Crawler finds a new hiring signal, news mention, or registry field.' },
        { icon: 'shield', title: 'Confidence is calculated', body: 'Source count, freshness, parser reliability, and alias match produce a confidence band.' },
        { icon: 'target', title: 'Analyst resolves ambiguity', body: 'Low-confidence aliases or taxonomy conflicts are reviewed before handoff.' },
        { icon: 'check', title: 'Record becomes usable', body: 'Reviewed records can power maps, IEK brief cards, and agent queries.' },
      ],
    },
    agent: {
      eyebrow: 'Visualization agent prototype',
      title: 'A high-fidelity example of how the database becomes an analyst tool',
      lead: 'These prompts show the intended handoff: the agent does not invent intelligence. It queries cleaned records, renders a view, and keeps provenance visible.',
      prompts: [
        { label: 'Sector density', query: 'Compare AI, semiconductor, and biotech startup density by technical tag.', result: ['group by sector_tag', 'count companies', 'show overlap bucket', 'attach source confidence'], bars: [72, 58, 43, 31] },
        { label: 'Hiring signal', query: 'Find startups with rising technical hiring and export-relevant tags.', result: ['filter hiring trend', 'join taxonomy', 'rank evidence', 'prepare brief card'], bars: [46, 64, 52, 38] },
        { label: 'IEK brief', query: 'Build a briefing view for emerging semiconductor software companies.', result: ['select value-chain role', 'summarize sources', 'render map layer', 'flag review gaps'], bars: [38, 76, 61, 49] },
      ],
    },
    map: {
      eyebrow: 'Startup map workbench',
      title: 'From database rows to ecosystem navigation',
      lead: 'The map is a portfolio-safe mockup of the downstream use case: filter by technology cluster, see density, then open a briefing-ready view.',
      clusters: [
        { name: 'AI / Data', count: '60+', x: 62, y: 24, color: 'blue', brief: 'model tooling, edge AI, data platforms' },
        { name: 'Semiconductor', count: '45+', x: 24, y: 33, color: 'green', brief: 'IC design, packaging, equipment software' },
        { name: 'Biotech', count: '35+', x: 76, y: 54, color: 'amber', brief: 'medtech, diagnostics, bioinformatics' },
        { name: 'Energy', count: '25+', x: 38, y: 75, color: 'lime', brief: 'storage, grid software, climate tech' },
        { name: 'Manufacturing', count: '40+', x: 66, y: 80, color: 'gray', brief: 'automation, robotics, advanced materials' },
      ],
    },
    evidence: {
      eyebrow: 'Proof board',
      title: 'Artifacts that make the work inspectable',
      lead: 'The gallery mixes real internship context with replaceable product mockups. Real company data can be dropped into the same slots later without changing the layout.',
      slots: [
        { icon: 'activity', title: 'Crawler run console', desc: 'Adapter status, retries, snapshots, and data quality gates.', kind: 'mockup' },
        { icon: 'database', title: 'Company schema', desc: 'Canonical fields, provenance, confidence, and review state.', kind: 'mockup' },
        { icon: 'map', title: 'Industry map layer', desc: 'Cluster navigation for startup ecosystem analysis.', kind: 'mockup' },
        { image: itriStarImage, title: 'ITRI context photo', desc: 'Internship context artifact from the Star Program presentation setting.', kind: 'internal image' },
      ],
    },
  },
  zh: {
    hero: {
      eyebrow: '工研院實習 / 資料產品案例',
      title: '一套台灣新創情報研究系統。',
      lead: '我將公開新創訊號轉成可審核紀錄、雙語 taxonomy，以及能交付給分析師、地圖與 AI briefing 的資料介面。',
      context: '公開安全版本重構；公司級資料以 mock data 呈現。',
      thesis: '真正的貢獻不是一支爬蟲，而是把分散的新創訊號整理成可重複使用的情報流程。',
      mediaCaption: '研究工作室重構：來源地圖、schema 草圖、taxonomy 筆記與分析師審核邏輯。',
      roles: [
        { label: '產品問題', text: '分析師如何信任一筆由爬蟲產生的新創紀錄？' },
        { label: '我的角色', text: '爬蟲流程、schema、taxonomy、QA 與交接 UX。' },
        { label: '公開邊界', text: '只使用公開來源與匿名樣本紀錄。' },
      ],
    },
    metrics: [
      { value: '230+', label: '公司紀錄', detail: '結構化的新創樣本宇宙' },
      { value: '40+', label: '單筆資料欄位', detail: '身份、市場、人才、財務、標籤' },
      { value: '9', label: '來源類型', detail: '登記資料、協會、網站、新聞' },
      { value: 'v9+', label: '資料版本脈絡', detail: '附加式更新與 lineage 管理' },
    ],
    principles: [
      '每個欄位都必須先有來源，才能成為情報。',
      '分類法必須把本地語境翻譯成國際可讀的產業類別。',
      '資料庫要同時能被地圖、查詢與審核流程使用。',
    ],
    contextBoard: {
      eyebrow: '公開語境參照',
      title: '這頁的設計建立在台灣真實 deep-tech 地理脈絡上',
      lead: '這些公開參照用來建立生態系語境，不揭露任何 ITRI 內部資料。圖片是視覺參考；下方介面與資料集是作品集安全版本重構。',
      facts: [
        { value: '1980', label: '新竹科學園區啟用', source: 'HSP 公開資料', href: 'https://zh.wikipedia.org/wiki/%E6%96%B0%E7%AB%B9%E7%A7%91%E5%AD%B8%E5%9C%92%E5%8D%80' },
        { value: '584', label: '2024-12 登記廠商數', source: 'HSP 公開資料', href: 'https://zh.wikipedia.org/wiki/%E6%96%B0%E7%AB%B9%E7%A7%91%E5%AD%B8%E5%9C%92%E5%8D%80' },
        { value: '177k+', label: '2024-10 從業員工數', source: 'HSP 公開資料', href: 'https://zh.wikipedia.org/wiki/%E6%96%B0%E7%AB%B9%E7%A7%91%E5%AD%B8%E5%9C%92%E5%8D%80' },
        { value: 'IEK', label: '產業情報 taxonomy 語境', source: 'IEKNet 公開主題', href: 'https://ieknet.iek.org.tw/' },
      ],
      references: [
        { title: 'Semiconductor substrate', desc: '作為 taxonomy 中 deep-tech / hardware 類別的視覺參照。', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Data infrastructure', desc: '作為資料底層、伺服器與儲存層的視覺方向。', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Analyst cockpit', desc: '作為後續情報介面與儀表板的視覺參考。', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Networked economy', desc: '作為公司、來源、標籤與市場活動互相連結的系統參照。', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
        { title: 'AI operations', desc: '作為 agent-assisted workflow 的視覺參照，而非真實系統截圖。', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Industrial automation cell', desc: '作為先進製造、機器人與硬體型新創分類的視覺參照。', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Founder review room', desc: '作為分析師 moderation、公司驗證與跨來源審核流程的視覺 proxy。', source: 'Unsplash reference', href: 'https://unsplash.com', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80' },
      ],
    },
    publicEvidence: {
      eyebrow: '公開證據地圖',
      title: '用真實公開來源，讓 mockup 變成可信的情報系統',
      lead: '下方介面示範我會如何評估公開資料，決定哪些內容可以進入新創資料庫：每個來源可信任什麼、不能證明什麼，以及可以支援哪個下游介面。',
      tabs: [
        {
          label: 'Ecosystem',
          source: 'Startup Island TAIWAN x Crunchbase',
          href: 'https://about.crunchbase.com/blog/decoding-taiwans-thriving-startup-scene-startup-island-taiwan-2023-investor-report',
          image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1300&q=80',
          title: '把新創生態報告作為 discovery input',
          fact: 'Crunchbase 與 Startup Island TAIWAN 將台灣描述為成長中的科技新創生態系，2023 report 涵蓋政府支持、VC 活動、投資機會與創新趨勢。',
          trusted: '適合用來發現生態系名單、計畫名稱、公開社群訊號與新創敘事分類。',
          caution: '適合 discovery 與 framing；公司級主張仍需登記資料、公司官網或分析師審核後才能 promoted。',
          fields: ['ecosystem_source', 'program_reference', 'startup_alias', 'market_story'],
          signals: [['Discovery value', 'high'], ['Verification level', 'secondary'], ['Refresh cadence', 'manual watch']],
        },
        {
          label: 'Policy',
          source: 'National Development Council',
          href: 'https://www.ndc.gov.tw/en/',
          image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1300&q=80',
          title: '政策脈絡與新創議程',
          fact: 'NDC 頁面列出 Action Plan for Enhancing Taiwan’s Startup Ecosystem，也同時呈現 Asia Silicon Valley、Ten AI Initiatives 與國家發展計畫等政策脈絡。',
          trusted: '適合把公司紀錄連到政策語境、策略產業、投資計畫與國家級優先語言。',
          caution: '政策頁能說明方向，但不能單獨驗證某家公司 traction、財務狀態或產品成熟度。',
          fields: ['policy_theme', 'priority_sector', 'program_link', 'strategic_context'],
          signals: [['Discovery value', 'medium'], ['Verification level', 'context'], ['Refresh cadence', 'quarterly review']],
        },
        {
          label: 'Industry',
          source: 'IEK Industrial Intelligence',
          href: 'https://ieknet.iek.org.tw/',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1300&q=80',
          title: '產業 taxonomy 與 briefing 語言',
          fact: 'IEK 產業情報網涵蓋半導體、資通訊、跨域科技、綠能、生技醫療、機械、車輛、國際產經與新創新聞等主題。',
          trusted: '適合塑造 taxonomy label、分析師 briefing 類別，以及下游 IEK-style 情報介面的語言。',
          caution: '適合分類與 brief framing；單一公司欄位仍需要 field-level source trail。',
          fields: ['iek_topic', 'industry_bucket', 'briefing_theme', 'trend_context'],
          signals: [['Discovery value', 'high'], ['Verification level', 'taxonomy'], ['Refresh cadence', 'topic watch']],
        },
        {
          label: 'Open Data',
          source: 'data.gov.tw',
          href: 'https://data.gov.tw/en',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1300&q=80',
          title: '政府開放資料骨幹',
          fact: '政府資料開放平臺列出 Opening New Companies、Public Information、Investment and Financial Management 等資料分類。',
          trusted: '適合辨識官方資料集、登記類參照，以及可重複接入 source adapter 的公開資料入口。',
          caution: '資料集可用性與 schema 品質不一；adapter 需要 schema check、snapshot 與 fallback parsing。',
          fields: ['dataset_id', 'agency_owner', 'license_note', 'schema_version'],
          signals: [['Discovery value', 'medium'], ['Verification level', 'official'], ['Refresh cadence', 'schema watch']],
        },
        {
          label: 'Science Park',
          source: 'Hsinchu Science Park',
          href: 'https://web.sipa.gov.tw/english/',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1300&q=80',
          title: 'Deep-tech 地理錨點',
          fact: '公開資料將新竹科學園區標示為 1980 年啟用的科技聚落，並具備大量進駐廠商與技術人力。',
          trusted: '適合把公司紀錄連到地理、cluster density、硬體供應鏈 proximity 與科學園區脈絡。',
          caution: '園區層級資料能支援 location intelligence，但不能驗證單一公司的產品、募資或營運狀態。',
          fields: ['park_context', 'city_cluster', 'workforce_anchor', 'value_chain_region'],
          signals: [['Discovery value', 'high'], ['Verification level', 'geography'], ['Refresh cadence', 'semiannual check']],
        },
        {
          label: 'Benchmark',
          source: 'Crunchbase Pro / linked-data research',
          href: 'https://arxiv.org/abs/1907.08671',
          image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1300&q=80',
          title: 'Knowledge graph benchmark',
          fact: 'Linked Crunchbase 論文描述一個 RDF dataset，包含 347M+ triples，涵蓋 people、organizations 與 investments。',
          trusted: '適合作為 entity relationship、sameAs alias、organization-person-investment link 與 machine-readable graph 的設計 benchmark。',
          caution: '這是資料模型參考，不是本作品集中台灣公司事實的來源。',
          fields: ['entity_uri', 'same_as', 'relationship_type', 'graph_confidence'],
          signals: [['Discovery value', 'benchmark'], ['Verification level', 'model'], ['Refresh cadence', 'design reference']],
        },
      ],
      ledger: [
        ['Discovery', '找出候選公司、別名、計畫名稱與產業分類。', 'source_registry'],
        ['Verification', '只有具官方來源、公司官網或跨來源證據的欄位才能 promoted。', 'field_review'],
        ['Classification', '把在地描述映射成雙語 deep-tech taxonomy。', 'taxonomy_map'],
        ['Handoff', '只把已審核紀錄輸出到地圖、briefing cards 與 agent views。', 'agent_export'],
      ],
    },
    benchmark: {
      eyebrow: 'Benchmark 轉譯',
      title: '從 Crunchbase 資料庫模式，轉成台灣新創情報工作流',
      lead: '設計參照的是專業私募市場資料庫，但落地邏輯不同：台灣新創資料更需要來源溯源、雙語別名、taxonomy 審核，以及可安全交付給分析師與下游系統的資料介面。',
      modes: [
        {
          label: 'Database UX',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1300&q=80',
          source: 'Crunchbase Pro search pattern',
          href: 'https://support.crunchbase.com/hc/en-us/articles/360046653554-How-can-I-search-using-Crunchbase-Pro',
          title: '以公司 entity 為核心的搜尋、profile 與 enrichment',
          body: '參照模式不是漂亮表格，而是深度搜尋、可配置 filters、saved lists、export paths，以及能讓使用者採取行動的公司 profile。',
          takeaways: ['公司優先 profile', '可篩選搜尋表面', '可匯出紀錄'],
          nodes: [
            { label: 'Company', x: 45, y: 44, tone: 'core' },
            { label: 'Aliases', x: 19, y: 23, tone: 'gold' },
            { label: 'People', x: 72, y: 24, tone: 'blue' },
            { label: 'Funding', x: 74, y: 67, tone: 'gold' },
            { label: 'Sources', x: 20, y: 70, tone: 'green' },
          ],
          evidence: [['主要檢驗', '分析師能否快速找到一家公司，並理解它為什麼可信？'], ['作品證明', '搜尋、篩選、profile、驗證與 export readiness 被放在同一個表面。']],
        },
        {
          label: 'Knowledge Graph',
          image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1300&q=80',
          source: 'Linked Crunchbase RDF model',
          href: 'https://arxiv.org/abs/1907.08671',
          title: '資料關係和欄位本身一樣重要',
          body: 'benchmark 不是只有表格。新創情報資料庫要保存組織、人物、投資、證據與等價別名之間的關係。',
          takeaways: ['sameAs 別名思維', 'Organization-person-investment graph', '可被機器讀取的交接模型'],
          nodes: [
            { label: 'Org', x: 47, y: 48, tone: 'core' },
            { label: 'Founder', x: 20, y: 35, tone: 'blue' },
            { label: 'Investor', x: 75, y: 34, tone: 'gold' },
            { label: 'sameAs', x: 24, y: 75, tone: 'green' },
            { label: 'Topic', x: 72, y: 76, tone: 'blue' },
          ],
          evidence: [['主要檢驗', '資料模型能否保留不確定性，而不是把它壓平成假確定？'], ['作品證明', '別名衝突與 candidate fields 在 promoted 前都維持可審核。']],
        },
        {
          label: 'Taiwan Context',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1300&q=80',
          source: 'Hsinchu Science Park / ITRI ecosystem',
          href: 'https://web.sipa.gov.tw/english/',
          title: '地理脈絡讓公司紀錄變成生態系地圖',
          body: '台灣 deep-tech 情報需要在地錨點：新竹、台北、台中、科學園區、產業聚落，以及價值鏈角色。',
          takeaways: ['map-ready geography fields', 'cluster 與 value-chain layer', '台灣特有產業語境'],
          nodes: [
            { label: 'Hsinchu', x: 38, y: 29, tone: 'core' },
            { label: 'Taipei', x: 66, y: 21, tone: 'blue' },
            { label: 'Taichung', x: 26, y: 63, tone: 'gold' },
            { label: 'Tainan', x: 58, y: 76, tone: 'green' },
            { label: 'Park', x: 73, y: 52, tone: 'blue' },
          ],
          evidence: [['主要檢驗', '紀錄能否轉成可導航的台灣新創地圖？'], ['作品證明', '案例中包含產業 cluster、地圖節點與 export-ready fields。']],
        },
        {
          label: 'IEK Handoff',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1300&q=80',
          source: 'IEK intelligence application pattern',
          href: 'https://ieknet.iek.org.tw/',
          title: '公司紀錄必須能變成 briefing material',
          body: '終點不是 spreadsheet。資料集應該支援分析儀表板、IEK 類型 topic views、brief cards，以及會附來源證據的視覺化 agent responses。',
          takeaways: ['brief-ready evidence blocks', 'chart-ready aggregate tables', '帶 source trail 的 agent responses'],
          nodes: [
            { label: 'Dataset', x: 44, y: 44, tone: 'core' },
            { label: 'Brief', x: 18, y: 30, tone: 'gold' },
            { label: 'Agent', x: 72, y: 30, tone: 'blue' },
            { label: 'Map', x: 25, y: 72, tone: 'green' },
            { label: 'IEK', x: 72, y: 70, tone: 'gold' },
          ],
          evidence: [['主要檢驗', '下游使用者能否直接重用紀錄，而不需要再追問來源？'], ['作品證明', '每個 demo surface 都保留 source coverage、confidence 與 review state。']],
        },
      ],
    },
    marketProfile: {
      eyebrow: '私募市場資料庫對標',
      title: '以 Crunchbase 類公司 profile 邏輯，重建台灣 deep-tech 情報介面',
      lead: '專業資料庫的核心是 entity-first：乾淨的公司 profile、募資與人物訊號、具來源的驗證層，以及可追溯的修改歷史。這個 mockup 呈現我會如何把該模式轉成 ITRI-safe 的內部情報介面。',
      tabs: [
        {
          label: 'Profile',
          headline: '匿名 AI 半導體成長型公司',
          meta: [['Founded', '2019'], ['HQ', 'Hsinchu / Taipei'], ['Stage', 'growth candidate'], ['Sector', 'AI x IC design']],
          notes: ['標準紀錄串接三個中英文別名來源。', '產業標籤已由分析師審核；價值鏈角色為 edge inference software。'],
        },
        {
          label: 'Signals',
          headline: '市場活動訊號板',
          meta: [['Hiring velocity', '+18%'], ['News mentions', '12'], ['Source coverage', '7/9'], ['Confidence', '0.84']],
          notes: ['人才與新聞訊號在兩個來源類型中同步上升。', '募資參照仍維持候選狀態，等待登記資料確認。'],
        },
        {
          label: 'Validation',
          headline: '證據與 moderation layer',
          meta: [['Open issues', '2'], ['Alias conflicts', '1'], ['Freshness', '18 days'], ['Audit state', 'ready']],
          notes: ['低可信度別名在解決前不會進入正式 profile。', '每個 promoted field 都保留來源 URL、擷取日期與審核狀態。'],
        },
      ],
      sideStats: [
        { label: 'source URLs', value: '31' },
        { label: 'verified fields', value: '37' },
        { label: 'candidate fields', value: '6' },
      ],
    },
    pipeline: {
      eyebrow: '互動式架構',
      title: '追蹤一個公司訊號如何從公開來源變成 IEK-ready insight',
      lead: '點選每個站點，可以看到資料管線在不同階段補上什麼。這張圖刻意具體呈現 extraction、review、taxonomy 與下游應用的分工。',
      stages: [
        { icon: 'globe', title: '來源 watchlist', short: '捕捉', detail: '新創官網、MOPS 參照、104 人才頁、協會名錄、新創清單與市場新聞以來源家族管理，而不是零散 URL。', artifact: 'source_registry.csv', payload: ['來源類型', 'URL pattern', '更新週期', '存取備註'] },
        { icon: 'cpu', title: '爬蟲 adapter', short: '擷取', detail: '每個來源都有自己的擷取策略：JS-heavy 頁面用瀏覽器自動化，穩定 endpoint 用 request collector，不穩定頁面保留快取回退。', artifact: 'adapter_104_jobs.py', payload: ['selectors', 'retry policy', 'cache snapshot', 'raw capture'] },
        { icon: 'database', title: '暫存 ledger', short: '保存', detail: '原始擷取結果先落到 staging layer，附上 run ID、時間戳與來源 URL，讓每個訊號都能回查。', artifact: 'raw_company_snapshot', payload: ['run id', 'source URL', 'raw value', 'extract date'] },
        { icon: 'layers', title: '標準化 pass', short: '清理', detail: '透過 Pandas 對齊公司名稱、別名、人數區間、財務參照、地理位置與重複紀錄，再進入分析師審核。', artifact: 'company_profile_v9', payload: ['canonical name', 'aliases', 'dimensions', 'review state'] },
        { icon: 'target', title: '技術分類 mapping', short: '分類', detail: '把中文公司描述映射到雙語技術標籤，讓台灣在地訊號能與國際 deep-tech 分類比較。', artifact: 'taxonomy_map.json', payload: ['sector', 'subsector', 'value-chain role', 'confidence'] },
        { icon: 'monitor', title: '情報介面', short: '應用', detail: '乾淨輸出可支援新創地圖、IEK 類型 briefing card、分析儀表板，以及會附來源證據的視覺化 agent。', artifact: 'agent_ready_export', payload: ['map layer', 'brief card', 'chart spec', 'source links'] },
      ],
    },
    sources: {
      eyebrow: '爬蟲來源工作室',
      title: '針對台灣新創資料的不整齊現實設計 source adapters',
      lead: '重點不是什麼都抓，而是判斷每個來源可信任提供什麼訊號，再把這個判斷寫成可重複執行的 adapter。',
      items: [
        { name: '104 人才頁', status: 'stable', signal: '招募需求與人力規模線索', method: '瀏覽器自動化搭配 selector check 與快取 snapshot。', fields: ['職務類型', '地點', '招募強度', '公司別名'] },
        { name: 'MOPS / 公開登記', status: 'validated', signal: '財務與治理參照', method: 'Parser rules 標準化公開欄位，並附上來源溯源。', fields: ['資本額', '上市櫃關聯', '登記日期', '來源連結'] },
        { name: '產業協會名錄', status: 'watch', signal: '會員身份與產業定位', method: '依來源客製 extractor，監控 directory layout 漂移。', fields: ['會員名稱', '產業標籤', '網站', '協會來源'] },
        { name: '新聞與搜尋層', status: 'review', signal: '近期市場動態與公司別名', method: '搜尋 enrichment 蒐集候選證據，低可信資料進入人工審核。', fields: ['別名', '募資提及', '市場訊號', '可信度'] },
      ],
    },
    dataProduct: {
      eyebrow: '資料產品示範',
      title: '一筆可以被交接、查詢、映射的公司紀錄',
      lead: '下面的 mock record 呈現介面邏輯：一個標準公司、多個有來源的資料切片，以及能支援地圖與 agent 查詢的欄位模型。',
      slices: [
        { key: 'profile', label: 'Profile', title: '標準公司輪廓', rows: [['Company ID', 'TW-DT-0187'], ['Sector', 'AI x semiconductor'], ['Stage', 'scale-up candidate'], ['Review state', 'analyst-reviewed']] },
        { key: 'signals', label: 'Signals', title: '營運訊號', rows: [['Hiring trend', 'edge AI 職缺上升'], ['Finance reference', '公開登記已比對'], ['News signal', '出口合作候選'], ['Confidence', '0.84 source-weighted']] },
        { key: 'taxonomy', label: 'Taxonomy', title: '雙語技術標籤', rows: [['Primary tag', 'AI accelerator / AI 加速器'], ['Value-chain role', 'edge inference layer'], ['Benchmark bucket', 'semiconductor enabler'], ['Map layer', 'AI / IC design overlap']] },
      ],
      schema: ['canonical_name', 'source_url', 'sector_tag', 'talent_signal', 'finance_ref', 'confidence_score'],
    },
    datasetBrowser: {
      eyebrow: '匿名資料集瀏覽器',
      title: '招聘方應該能檢視系統，而不只是閱讀描述',
      lead: '下方樣本列為匿名資料，但保留真實工作介面的形狀：可信度、來源覆蓋、審核狀態、分類標籤，以及這筆資料準備好支援什麼輸出。',
      rows: [
        { id: 'TW-DT-0187', sector: 'AI x Semiconductor', confidence: '0.84', sources: '7/9', review: 'reviewed', ready: 'map + brief', note: '人才訊號強，taxonomy 與 edge inference 重疊。' },
        { id: 'TW-DT-0224', sector: 'Biotech / MedTech', confidence: '0.79', sources: '5/9', review: 'needs alias check', ready: 'brief', note: '多個中文別名需要分析師確認。' },
        { id: 'TW-DT-0311', sector: 'Cleantech / Energy', confidence: '0.72', sources: '4/9', review: 'candidate', ready: 'map', note: '適合進入生態系地圖，但尚未達 briefing 標準。' },
        { id: 'TW-DT-0442', sector: 'Advanced Manufacturing', confidence: '0.88', sources: '8/9', review: 'reviewed', ready: 'agent query', note: '來源覆蓋完整，適合進入 agent 查詢。' },
      ],
    },
    databaseConsole: {
      eyebrow: 'Crunchbase-like 資料庫 console',
      title: '把驗證流程直接做進資料庫介面的高保真新創情報產品',
      lead: '這是作品集中最接近專業資料產品的一層：搜尋匿名公司宇宙、檢視單一 entity，並看見哪些欄位已 promoted、哪些仍是 candidate、哪些不可交付給 AI / 地圖下游使用。',
      searchPlaceholder: '搜尋公司、城市、產業、標籤、證據...',
      empty: '沒有符合條件的匿名紀錄。',
      filters: ['All', 'AI x Semiconductor', 'Biotech / MedTech', 'Cleantech / Energy', 'Advanced Manufacturing'],
      references: [
        { label: 'Crunchbase pattern', source: '公司 profile、搜尋篩選、alerts、API、enrichment', href: 'https://www.crunchbase.com', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' },
        { label: 'Linked data model', source: '公司、人物、投資關係與 sameAs schema 思維', href: 'https://arxiv.org/abs/1907.08671', image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1200&q=80' },
        { label: 'Taiwan tech geography', source: '新竹科學園區與 ITRI 生態系脈絡', href: 'https://web.sipa.gov.tw/english/', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' },
      ],
      companies: [
        {
          id: 'TW-DT-0187',
          name: 'NovaGrid Analytics',
          mark: 'NG',
          sector: 'AI x Semiconductor',
          city: 'Hsinchu',
          score: '86',
          stage: 'scale-up candidate',
          employees: '51-100',
          readiness: 'map + brief',
          coverage: '7/9',
          freshness: '14d',
          tags: ['edge AI', 'IC design', 'export-ready'],
          signals: [['Hiring velocity', '+18%'], ['News mentions', '12'], ['Taxonomy fit', '0.91']],
          evidence: ['website verified', '104 signal stable', 'registry relation reviewed'],
          checks: [
            { field: 'canonical_name', state: 'promoted', value: '3 aliases merged' },
            { field: 'sector_tag', state: 'reviewed', value: 'AI x IC design' },
            { field: 'funding_signal', state: 'candidate', value: 'news mention only' },
          ],
        },
        {
          id: 'TW-DT-0224',
          name: 'AsterBio Systems',
          mark: 'AB',
          sector: 'Biotech / MedTech',
          city: 'Taipei',
          score: '79',
          stage: 'research commercialization',
          employees: '11-50',
          readiness: 'brief draft',
          coverage: '5/9',
          freshness: '27d',
          tags: ['diagnostics', 'bioinformatics', 'medical AI'],
          signals: [['Hiring velocity', '+7%'], ['News mentions', '8'], ['Taxonomy fit', '0.83']],
          evidence: ['registry matched', 'alias review pending', 'clinical claim excluded'],
          checks: [
            { field: 'canonical_name', state: 'review', value: 'Chinese alias conflict' },
            { field: 'sector_tag', state: 'promoted', value: 'medical AI' },
            { field: 'clinical_claim', state: 'blocked', value: 'insufficient public proof' },
          ],
        },
        {
          id: 'TW-DT-0311',
          name: 'HelioCell Materials',
          mark: 'HM',
          sector: 'Cleantech / Energy',
          city: 'Taoyuan',
          score: '73',
          stage: 'emerging startup',
          employees: '11-50',
          readiness: 'map only',
          coverage: '4/9',
          freshness: '31d',
          tags: ['storage', 'materials', 'climate'],
          signals: [['Hiring velocity', '+4%'], ['News mentions', '5'], ['Taxonomy fit', '0.76']],
          evidence: ['website verified', 'association pending', 'funding candidate'],
          checks: [
            { field: 'company_site', state: 'promoted', value: 'active source' },
            { field: 'industry_member', state: 'candidate', value: 'directory pending' },
            { field: 'funding_signal', state: 'review', value: 'no registry match' },
          ],
        },
        {
          id: 'TW-DT-0442',
          name: 'ForgeSense Robotics',
          mark: 'FR',
          sector: 'Advanced Manufacturing',
          city: 'Taichung',
          score: '88',
          stage: 'industrial pilot',
          employees: '101-250',
          readiness: 'agent query',
          coverage: '8/9',
          freshness: '9d',
          tags: ['robotics', 'vision', 'automation'],
          signals: [['Hiring velocity', '+22%'], ['News mentions', '15'], ['Taxonomy fit', '0.89']],
          evidence: ['job source stable', 'filing reviewed', 'brief-ready'],
          checks: [
            { field: 'hiring_signal', state: 'promoted', value: 'role-family normalized' },
            { field: 'sector_tag', state: 'reviewed', value: 'industrial automation' },
            { field: 'brief_card', state: 'promoted', value: 'agent-ready export' },
          ],
        },
      ],
    },
    qualityRoom: {
      eyebrow: '資料品質證據室',
      title: '資料庫不是只展示紀錄，而是要證明它會持續變好',
      lead: '專業私募市場資料庫的可信度來自 field definitions、lineage、QA gates 與 release notes。這個互動模組展示每次爬蟲更新後，台灣新創資料集可以如何被治理。',
      tabs: [
        {
          label: 'Schema',
          headline: '把欄位字典當成資料產品合約',
          stats: [['40+', 'profile dimensions'], ['12', 'core entity fields'], ['4', 'handoff surfaces']],
          rows: [
            ['canonical_name', 'promoted', '經過 alias merge 的標準公司名，供地圖與 agent query 使用。'],
            ['sector_tag', 'reviewed', '雙語技術 taxonomy，對齊國際 deep-tech 類別。'],
            ['confidence_score', 'computed', '由來源覆蓋、更新時間、parser 可靠度與分析師審核加權。'],
          ],
        },
        {
          label: 'Lineage',
          headline: '每筆紀錄都有 append-only refresh history',
          stats: [['v9+', 'dataset lineage'], ['9', 'source families'], ['31d', 'oldest sample age']],
          rows: [
            ['run_id', 'required', '每次爬蟲執行都有 run identifier，方便 audit 與 rollback。'],
            ['source_snapshot', 'required', 'raw HTML / extracted values 在 normalization 前先被保留。'],
            ['review_state', 'required', '候選紀錄在 conflict 解決前不會進入 briefing。'],
          ],
        },
        {
          label: 'QA gates',
          headline: '弱證據會進入 queue，而不是偷偷變成正式欄位',
          stats: [['5', 'promotion gates'], ['0', 'unverified claims'], ['3', 'review states']],
          rows: [
            ['source URL', 'gate', '沒有 source URL 的欄位不可被 promoted。'],
            ['alias conflict', 'gate', '中英文別名在 canonical merge 前需要檢查。'],
            ['funding claim', 'blocked', '募資提及在沒有可信公開證據前只能維持 candidate。'],
          ],
        },
      ],
      releaseLog: [
        { version: 'v9.2', status: 'stable', note: '把已審核 taxonomy 欄位推進 map-ready export。' },
        { version: 'v9.1', status: 'review', note: '將低可信募資訊號移入 analyst queue。' },
        { version: 'v9.0', status: 'stable', note: '為 9 source families 重建 source provenance model。' },
      ],
    },
    reviewFlow: {
      eyebrow: '分析師審核流程',
      title: '真正高價值的層，是讓不確定性被看見',
      lead: '好的情報系統不會把弱證據偷偷塞進資料庫，而是把它變成可處理的 review queue。',
      steps: [
        { icon: 'activity', title: '訊號進入佇列', body: '爬蟲抓到新的招募訊號、新聞提及或登記欄位。' },
        { icon: 'shield', title: '計算可信度', body: '來源數、更新時間、parser 可靠度與別名比對形成 confidence band。' },
        { icon: 'target', title: '分析師處理模糊性', body: '低可信度別名或 taxonomy 衝突在交付前先被審核。' },
        { icon: 'check', title: '紀錄可被使用', body: '審核後資料才進入地圖、IEK brief card 與 agent query。' },
      ],
    },
    agent: {
      eyebrow: '視覺化 agent 原型',
      title: '資料庫如何變成分析師工具的高保真示範',
      lead: '這些 prompt 展示預期的交接方式：agent 不憑空產生情報，而是查詢清理後資料、產生視圖，並保留來源證據。',
      prompts: [
        { label: '產業密度', query: '依技術標籤比較 AI、半導體與生技新創密度。', result: ['依 sector_tag 分群', '計算公司數', '顯示 overlap bucket', '附上來源可信度'], bars: [72, 58, 43, 31] },
        { label: '人才訊號', query: '找出技術招募上升且具出口相關標籤的新創。', result: ['篩選 hiring trend', '串接 taxonomy', '排序證據', '準備 brief card'], bars: [46, 64, 52, 38] },
        { label: 'IEK brief', query: '建立半導體軟體新創的 briefing view。', result: ['選取價值鏈角色', '摘要來源', '產生地圖圖層', '標記審核缺口'], bars: [38, 76, 61, 49] },
      ],
    },
    map: {
      eyebrow: '新創地圖工作台',
      title: '從資料庫列轉成生態系導航',
      lead: '地圖是下游應用的公開安全 mockup：依技術聚落篩選、檢視密度，再展開 briefing-ready view。',
      clusters: [
        { name: 'AI / 資料', count: '60+', x: 62, y: 24, color: 'blue', brief: '模型工具、edge AI、資料平台' },
        { name: '半導體', count: '45+', x: 24, y: 33, color: 'green', brief: 'IC 設計、封測、設備軟體' },
        { name: '生技醫療', count: '35+', x: 76, y: 54, color: 'amber', brief: '醫療科技、診斷、生物資訊' },
        { name: '能源', count: '25+', x: 38, y: 75, color: 'lime', brief: '儲能、電網軟體、氣候科技' },
        { name: '先進製造', count: '40+', x: 66, y: 80, color: 'gray', brief: '自動化、機器人、先進材料' },
      ],
    },
    evidence: {
      eyebrow: 'Proof board',
      title: '讓作品可被檢視的成果素材',
      lead: '這個 gallery 混合真實實習脈絡與可替換的產品 mockup。之後若有真實公司資料或截圖，可以直接替換進同樣欄位。',
      slots: [
        { icon: 'activity', title: 'Crawler run console', desc: 'Adapter 狀態、retry、snapshot 與資料品質 gate。', kind: 'mockup' },
        { icon: 'database', title: 'Company schema', desc: '標準欄位、來源溯源、可信度與審核狀態。', kind: 'mockup' },
        { icon: 'map', title: 'Industry map layer', desc: '支援新創生態系分析的 cluster navigation。', kind: 'mockup' },
        { image: itriStarImage, title: 'ITRI context photo', desc: '工研院育星計畫期末成果發表情境素材。', kind: 'internal image' },
      ],
    },
  },
};

const h = React.createElement;

function getContent(lang) {
  return CONTENT[lang === 'zh' ? 'zh' : 'en'];
}

function Section({ className = '', eyebrow, title, lead, children }) {
  return h('section', { className: `deeptech-case-section ${className}` },
    h('div', { className: 'deeptech-case-section-head' },
      h('span', { className: 'deeptech-case-section-label' }, eyebrow),
      h('h2', null, title),
      h('p', null, lead)),
    children);
}

function ButtonList({ items, activeIndex, onSelect, getLabel, className }) {
  return h('div', { className },
    items.map((item, index) => h('button', {
      type: 'button',
      className: index === activeIndex ? 'active' : '',
      key: getLabel(item),
      'aria-pressed': index === activeIndex,
      onClick: () => onSelect(index),
    }, getLabel(item))));
}

function getCompanySearchText(company) {
  return [
    company.name,
    company.id,
    company.sector,
    company.city,
    company.stage,
    company.readiness,
    ...company.tags,
    ...company.evidence,
  ].join(' ').toLowerCase();
}

function HeroRoom({ c }) {
  return h('section', { className: 'deeptech-case-hero-room' },
    h('div', { className: 'deeptech-case-hero-copy' },
      h('span', { className: 'deeptech-case-eyebrow' }, c.hero.eyebrow),
      h('h2', null, c.hero.title),
      h('p', null, c.hero.lead),
      h('div', { className: 'deeptech-case-role-rail' },
        c.hero.roles.map(item => h('article', { key: item.label },
          h('span', null, item.label),
          h('strong', null, item.text)))),
      h('div', { className: 'deeptech-case-hero-context' },
        h(Icon, { name: 'shield' }),
        h('span', null, c.hero.context))),
    h('div', { className: 'deeptech-case-dossier' },
      h('div', { className: 'deeptech-case-dossier-top' },
        h('span', null, 'Intelligence dossier'),
        h('strong', null, 'TW-DT-0187')),
      h('figure', { className: 'deeptech-case-hero-media' },
        h('img', { src: deeptechResearchStudio, alt: c.hero.mediaCaption, loading: 'eager', decoding: 'async' }),
        h('figcaption', null, c.hero.mediaCaption)),
      h('p', null, c.hero.thesis),
      h('div', { className: 'deeptech-case-metric-grid' },
        c.metrics.map(metric => h('article', { key: metric.label },
          h('strong', null, metric.value),
          h('span', null, metric.label),
          h('small', null, metric.detail)))),
      h('ul', { className: 'deeptech-case-principles' },
        c.principles.map(principle => h('li', { key: principle }, principle)))));
}

function ContextBoard({ c }) {
  const [active, setActive] = useState(0);
  const reference = c.contextBoard.references[active];
  return h(Section, { className: 'deeptech-case-context-board', ...c.contextBoard },
    h('div', { className: 'deeptech-case-context-grid' },
      h('div', { className: 'deeptech-case-public-facts' },
        c.contextBoard.facts.map(fact => h('article', { key: fact.label },
          h('strong', null, fact.value),
          h('span', null, fact.label),
          h('a', { href: fact.href, target: '_blank', rel: 'noreferrer' }, fact.source)))),
      h('div', { className: 'deeptech-case-reference-viewer' },
        h('div', { className: 'deeptech-case-reference-image' },
          h('img', { src: reference.image, alt: reference.title, loading: 'lazy', decoding: 'async' })),
        h('div', { className: 'deeptech-case-reference-copy' },
          h(ButtonList, {
            items: c.contextBoard.references,
            activeIndex: active,
            onSelect: setActive,
          getLabel: item => item.title,
          className: 'deeptech-case-reference-tabs',
          }),
          h('span', null, reference.source),
          h('h3', null, reference.title),
          h('p', null, reference.desc),
          h('a', { href: reference.href, target: '_blank', rel: 'noreferrer' }, 'image source')))));
}

function EvidenceSignals({ signals }) {
  return h('div', { className: 'deeptech-case-atlas-signals' },
    signals.map(([label, value]) => h('div', { key: label },
      h('span', null, label),
      h('strong', null, value))));
}

function PublicEvidenceAtlas({ c }) {
  const [active, setActive] = useState(0);
  const item = c.publicEvidence.tabs[active];
  return h(Section, { className: 'deeptech-case-public-atlas', ...c.publicEvidence },
    h('div', { className: 'deeptech-case-atlas-shell' },
      h('div', { className: 'deeptech-case-atlas-media' },
        h('img', { src: item.image, alt: item.title, loading: 'lazy', decoding: 'async' }),
        h(ButtonList, {
          items: c.publicEvidence.tabs,
          activeIndex: active,
          onSelect: setActive,
          getLabel: tab => tab.label,
          className: 'deeptech-case-atlas-tabs',
        })),
      h('article', { className: 'deeptech-case-atlas-card' },
        h('span', null, item.source),
        h('h3', null, item.title),
        h('p', null, item.fact),
        h(EvidenceSignals, { signals: item.signals }),
        h('a', { href: item.href, target: '_blank', rel: 'noreferrer' }, 'open public source')),
      h('aside', { className: 'deeptech-case-atlas-field-panel' },
        h('span', null, 'Field extraction plan'),
        h('div', { className: 'deeptech-case-atlas-field-list' },
          item.fields.map(field => h('code', { key: field }, field))),
        h('div', { className: 'deeptech-case-atlas-note trusted' },
          h('strong', null, 'Trusted for'),
          h('p', null, item.trusted)),
        h('div', { className: 'deeptech-case-atlas-note caution' },
          h('strong', null, 'Cannot prove alone'),
          h('p', null, item.caution)))),
    h('div', { className: 'deeptech-case-atlas-ledger' },
      c.publicEvidence.ledger.map(([stage, detail, artifact], index) => h('article', { key: stage },
        h('span', null, String(index + 1).padStart(2, '0')),
        h('h3', null, stage),
        h('p', null, detail),
        h('code', null, artifact)))));
}

function BenchmarkGraph({ mode }) {
  return h('div', { className: 'deeptech-case-benchmark-graph' },
    h('div', { className: 'deeptech-case-benchmark-orbit' }),
    mode.nodes.map(node => h('span', {
      className: `deeptech-case-benchmark-node ${node.tone}`,
      key: node.label,
      style: { left: `${node.x}%`, top: `${node.y}%` },
    }, node.label)));
}

function BenchmarkEvidence({ evidence }) {
  return h('div', { className: 'deeptech-case-benchmark-evidence' },
    evidence.map(([label, value]) => h('div', { key: label },
      h('span', null, label),
      h('p', null, value))));
}

function BenchmarkStudio({ c }) {
  const [active, setActive] = useState(0);
  const mode = c.benchmark.modes[active];
  return h(Section, { className: 'deeptech-case-benchmark-studio', ...c.benchmark },
    h('div', { className: 'deeptech-case-benchmark-layout' },
      h('div', { className: 'deeptech-case-benchmark-media' },
        h('img', { src: mode.image, alt: mode.title, loading: 'lazy', decoding: 'async' }),
        h(ButtonList, {
          items: c.benchmark.modes,
          activeIndex: active,
          onSelect: setActive,
          getLabel: item => item.label,
          className: 'deeptech-case-benchmark-tabs',
        })),
      h('article', { className: 'deeptech-case-benchmark-copy' },
        h('span', null, mode.source),
        h('h3', null, mode.title),
        h('p', null, mode.body),
        h('div', { className: 'deeptech-case-benchmark-takeaways' },
          mode.takeaways.map(item => h('strong', { key: item }, item))),
        h('a', { href: mode.href, target: '_blank', rel: 'noreferrer' }, 'open reference')),
      h(BenchmarkGraph, { mode }),
      h(BenchmarkEvidence, { evidence: mode.evidence })));
}

function PipelineExplorer({ c }) {
  const [active, setActive] = useState(0);
  const stage = c.pipeline.stages[active];
  return h(Section, { className: 'deeptech-case-pipeline', ...c.pipeline },
    h('div', { className: 'deeptech-case-pipeline-shell' },
      h(ButtonList, {
        items: c.pipeline.stages,
        activeIndex: active,
        onSelect: setActive,
        getLabel: item => item.short,
        className: 'deeptech-case-pipeline-nav',
      }),
      h('div', { className: 'deeptech-case-pipeline-diagram' },
        c.pipeline.stages.map((item, index) => h('button', {
          type: 'button',
          className: `deeptech-case-pipeline-node${index === active ? ' active' : ''}`,
          key: item.title,
          onClick: () => setActive(index),
        },
          h('span', null, String(index + 1).padStart(2, '0')),
          h(Icon, { name: item.icon }),
          h('strong', null, item.title)))),
      h('aside', { className: 'deeptech-case-stage-panel' },
        h('span', null, stage.artifact),
        h('h3', null, stage.title),
        h('p', null, stage.detail),
        h('div', { className: 'deeptech-case-payload-grid' },
          stage.payload.map(item => h('code', { key: item }, item))))));
}

function SourceStudio({ c }) {
  const [active, setActive] = useState(0);
  const source = c.sources.items[active];
  return h(Section, { className: 'deeptech-case-source-studio', ...c.sources },
    h('div', { className: 'deeptech-case-source-grid' },
      h(ButtonList, {
        items: c.sources.items,
        activeIndex: active,
        onSelect: setActive,
        getLabel: item => item.name,
        className: 'deeptech-case-source-list',
      }),
      h('div', { className: `deeptech-case-source-detail ${source.status}` },
        h('div', { className: 'deeptech-case-source-status' },
          h('span', null, source.status),
          h('strong', null, source.signal)),
        h('p', null, source.method),
        h('div', { className: 'deeptech-case-field-chips' },
          source.fields.map(field => h('span', { key: field }, field))),
        h('div', { className: 'deeptech-case-mini-console' },
          h('code', null, `adapter="${source.name}"`),
          h('code', null, `trusted_signal="${source.signal}"`),
          h('code', null, `route="staging -> normalize -> review"`)))));
}

function MarketProfile({ c }) {
  const [active, setActive] = useState(0);
  const tab = c.marketProfile.tabs[active];
  return h(Section, { className: 'deeptech-case-market-profile', ...c.marketProfile },
    h('div', { className: 'deeptech-case-profile-shell' },
      h('div', { className: 'deeptech-case-profile-main' },
        h('div', { className: 'deeptech-case-profile-topbar' },
          h('div', null,
            h('span', null, 'Anonymized entity'),
            h('strong', null, 'TW-DT-0187')),
          h(ButtonList, {
            items: c.marketProfile.tabs,
            activeIndex: active,
            onSelect: setActive,
            getLabel: item => item.label,
            className: 'deeptech-case-profile-tabs',
          })),
        h('div', { className: 'deeptech-case-company-card' },
          h('div', { className: 'deeptech-case-company-mark' }, 'DT'),
          h('div', null,
            h('h3', null, tab.headline),
            h('p', null, 'Portfolio-safe company profile modeled after professional private-market database patterns.'))),
        h('div', { className: 'deeptech-case-profile-meta' },
          tab.meta.map(([label, value]) => h('div', { key: label },
            h('span', null, label),
            h('strong', null, value)))),
        h('div', { className: 'deeptech-case-profile-notes' },
          tab.notes.map(note => h('p', { key: note }, note)))),
      h('aside', { className: 'deeptech-case-profile-side' },
        h('span', null, 'Verification summary'),
        c.marketProfile.sideStats.map(stat => h('article', { key: stat.label },
          h('strong', null, stat.value),
          h('small', null, stat.label))),
        h('div', { className: 'deeptech-case-validation-meter' },
          h('i', null),
          h('span', null, 'review-ready confidence')))));
}

function DataProductDemo({ c }) {
  const [active, setActive] = useState(0);
  const slice = c.dataProduct.slices[active];
  return h(Section, { className: 'deeptech-case-data-product', ...c.dataProduct },
    h('div', { className: 'deeptech-case-record-grid' },
      h('div', { className: 'deeptech-case-record-card' },
        h(ButtonList, {
          items: c.dataProduct.slices,
          activeIndex: active,
          onSelect: setActive,
          getLabel: item => item.label,
          className: 'deeptech-case-segmented',
        }),
        h('h3', null, slice.title),
        h('div', { className: 'deeptech-case-record-table' },
          slice.rows.map(([key, value]) => h('div', { key },
            h('span', null, key),
            h('strong', null, value))))),
      h('aside', { className: 'deeptech-case-schema-strip' },
        h('span', null, 'Agent-ready schema'),
        c.dataProduct.schema.map(field => h('code', { key: field }, field)))));
}

function DatasetBrowser({ c }) {
  const [active, setActive] = useState(0);
  const row = c.datasetBrowser.rows[active];
  return h(Section, { className: 'deeptech-case-dataset-browser', ...c.datasetBrowser },
    h('div', { className: 'deeptech-case-dataset-grid' },
      h('div', { className: 'deeptech-case-dataset-table' },
        h('div', { className: 'deeptech-case-dataset-head' },
          h('span', null, 'record id'),
          h('span', null, 'sector'),
          h('span', null, 'confidence'),
          h('span', null, 'review')),
        c.datasetBrowser.rows.map((item, index) => h('button', {
          type: 'button',
          className: index === active ? 'active' : '',
          key: item.id,
          onClick: () => setActive(index),
        },
          h('span', null, item.id),
          h('span', null, item.sector),
          h('strong', null, item.confidence),
          h('em', null, item.review)))),
      h('aside', { className: 'deeptech-case-record-inspector' },
        h('span', null, 'Selected record'),
        h('h3', null, row.id),
        h('p', null, row.note),
        h('dl', null,
          h('div', null, h('dt', null, 'source coverage'), h('dd', null, row.sources)),
          h('div', null, h('dt', null, 'ready for'), h('dd', null, row.ready)),
          h('div', null, h('dt', null, 'confidence'), h('dd', null, row.confidence))))));
}

function DatabaseReferenceStrip({ references }) {
  return h('div', { className: 'deeptech-case-db-reference-strip' },
    references.map(item => h('a', {
      href: item.href,
      key: item.label,
      target: '_blank',
      rel: 'noreferrer',
      style: { backgroundImage: `url(${item.image})` },
    },
      h('span', null, item.label),
      h('strong', null, item.source))));
}

function CompanyList({ companies, activeIndex, empty, onSelect }) {
  return h('div', { className: 'deeptech-case-db-list' },
    companies.length === 0
      ? h('p', { className: 'deeptech-case-db-empty' }, empty)
      : companies.map((company, index) => h('button', {
        type: 'button',
        className: index === activeIndex ? 'active' : '',
        key: company.id,
        onClick: () => onSelect(index),
      },
        h('div', null,
          h('strong', null, company.name),
          h('span', null, `${company.sector} / ${company.city}`)),
        h('em', null, `${company.score}%`))));
}

function CompanyProfile({ company }) {
  if (!company) return null;
  return h('article', { className: 'deeptech-case-db-profile' },
    h('div', { className: 'deeptech-case-db-profile-head' },
      h('div', { className: 'deeptech-case-db-mark' }, company.mark),
      h('div', null,
        h('span', null, company.id),
        h('h3', null, company.name),
        h('p', null, `${company.stage} / ${company.employees} employees / ${company.city}`)),
      h('strong', null, company.score)),
    h('div', { className: 'deeptech-case-db-stat-grid' },
      [['source coverage', company.coverage], ['freshness', company.freshness], ['ready for', company.readiness]].map(([label, value]) => h('div', { key: label },
        h('span', null, label),
        h('strong', null, value)))),
    h('div', { className: 'deeptech-case-db-tags' },
      company.tags.map(tag => h('span', { key: tag }, tag))),
    h('div', { className: 'deeptech-case-db-signal-grid' },
      company.signals.map(([label, value]) => h('div', { key: label },
        h('span', null, label),
        h('strong', null, value)))));
}

function VerificationPanel({ company }) {
  if (!company) return null;
  return h('aside', { className: 'deeptech-case-db-verification' },
    h('span', null, 'Field-level validation'),
    h('div', { className: 'deeptech-case-db-checks' },
      company.checks.map(check => h('div', { className: check.state, key: check.field },
        h('span', null, check.state),
        h('strong', null, check.field),
        h('p', null, check.value)))),
    h('div', { className: 'deeptech-case-db-proof' },
      company.evidence.map(item => h('div', { key: item },
        h(Icon, { name: 'check' }),
        h('span', null, item)))));
}

function DatabaseConsole({ c }) {
  const [filter, setFilter] = useState(0);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const normalizedQuery = query.trim().toLowerCase();
  const companies = c.databaseConsole.companies.filter(company => {
    const matchesFilter = filter === 0 || company.sector === c.databaseConsole.filters[filter];
    return matchesFilter && (!normalizedQuery || getCompanySearchText(company).includes(normalizedQuery));
  });
  const selectedCompany = companies[Math.min(active, companies.length - 1)];

  return h(Section, { className: 'deeptech-case-db-console-section', ...c.databaseConsole },
    h(DatabaseReferenceStrip, { references: c.databaseConsole.references }),
    h('div', { className: 'deeptech-case-db-toolbar' },
      h('label', { className: 'deeptech-case-db-search' },
        h(Icon, { name: 'target' }),
        h('input', {
          type: 'search',
          value: query,
          'aria-label': c.databaseConsole.searchPlaceholder,
          placeholder: c.databaseConsole.searchPlaceholder,
          onChange: event => { setQuery(event.target.value); setActive(0); },
        })),
      h('span', null, `${companies.length}/${c.databaseConsole.companies.length} records`)),
    h('div', { className: 'deeptech-case-db-filters' },
      c.databaseConsole.filters.map((item, index) => h('button', {
        type: 'button',
        className: index === filter ? 'active' : '',
        key: item,
        onClick: () => { setFilter(index); setActive(0); },
      }, item))),
    h('div', { className: 'deeptech-case-db-grid' },
      h(CompanyList, {
        companies,
        activeIndex: active,
        empty: c.databaseConsole.empty,
        onSelect: setActive,
      }),
      h(CompanyProfile, { company: selectedCompany }),
      h(VerificationPanel, { company: selectedCompany })));
}

function QualityEvidenceRoom({ c }) {
  const [active, setActive] = useState(0);
  const tab = c.qualityRoom.tabs[active];
  return h(Section, { className: 'deeptech-case-quality-room', ...c.qualityRoom },
    h('div', { className: 'deeptech-case-quality-grid' },
      h(ButtonList, {
        items: c.qualityRoom.tabs,
        activeIndex: active,
        onSelect: setActive,
        getLabel: item => item.label,
        className: 'deeptech-case-quality-tabs',
      }),
      h('article', { className: 'deeptech-case-quality-panel' },
        h('h3', null, tab.headline),
        h('div', { className: 'deeptech-case-quality-stats' },
          tab.stats.map(([value, label]) => h('div', { key: label },
            h('strong', null, value),
            h('span', null, label)))),
        h('div', { className: 'deeptech-case-quality-table' },
          tab.rows.map(([field, state, detail]) => h('div', { key: field },
            h('code', null, field),
            h('span', { className: state }, state),
            h('p', null, detail))))),
      h('aside', { className: 'deeptech-case-release-log' },
        h('span', null, 'Release log'),
        c.qualityRoom.releaseLog.map(item => h('div', { className: item.status, key: item.version },
          h('strong', null, item.version),
          h('em', null, item.status),
          h('p', null, item.note))))));
}

function AgentPrototype({ c }) {
  const [active, setActive] = useState(0);
  const prompt = c.agent.prompts[active];
  return h(Section, { className: 'deeptech-case-agent-prototype', ...c.agent },
    h('div', { className: 'deeptech-case-agent-workbench' },
      h('div', { className: 'deeptech-case-agent-prompts' },
        h(ButtonList, {
          items: c.agent.prompts,
          activeIndex: active,
          onSelect: setActive,
          getLabel: item => item.label,
          className: 'deeptech-case-agent-tabs',
        }),
        h('div', { className: 'deeptech-case-agent-query' },
          h('span', null, 'prompt'),
          h('strong', null, prompt.query))),
      h('div', { className: 'deeptech-case-agent-output' },
        h('div', { className: 'deeptech-case-chart' },
          prompt.bars.map((value, index) => h('i', {
            key: `${prompt.label}-${index}`,
            style: { height: `${value}%` },
          }))),
        h('div', { className: 'deeptech-case-response-list' },
          prompt.result.map(step => h('div', { key: step },
            h(Icon, { name: 'check' }),
            h('span', null, step)))))));
}

function MapWorkbench({ c }) {
  const [active, setActive] = useState(0);
  const cluster = c.map.clusters[active];
  return h(Section, { className: 'deeptech-case-map-section', ...c.map },
    h('div', { className: 'deeptech-case-map-grid' },
      h('div', { className: 'deeptech-case-map-canvas' },
        c.map.clusters.map((item, index) => h('button', {
          type: 'button',
          className: `deeptech-case-map-node ${item.color}${index === active ? ' active' : ''}`,
          key: item.name,
          onClick: () => setActive(index),
          style: { left: `${item.x}%`, top: `${item.y}%` },
        },
          h('strong', null, item.count),
          h('span', null, item.name)))),
      h('aside', { className: 'deeptech-case-map-brief' },
        h('span', null, 'Selected cluster'),
        h('h3', null, cluster.name),
        h('p', null, cluster.brief),
        h('div', { className: 'deeptech-case-brief-actions' },
          h('button', { type: 'button' }, 'map layer'),
          h('button', { type: 'button' }, 'brief card'),
          h('button', { type: 'button' }, 'source audit')))));
}

function ReviewFlow({ c }) {
  return h(Section, { className: 'deeptech-case-review-flow', ...c.reviewFlow },
    h('div', { className: 'deeptech-case-review-grid' },
      c.reviewFlow.steps.map((step, index) => h('article', { key: step.title },
        h('span', null, String(index + 1).padStart(2, '0')),
        h(Icon, { name: step.icon }),
        h('h3', null, step.title),
        h('p', null, step.body)))));
}

function EvidenceBoard({ c }) {
  return h(Section, { className: 'deeptech-case-evidence-section', ...c.evidence },
    h('div', { className: 'deeptech-case-evidence-grid refined' },
      c.evidence.slots.map(slot => h('article', { className: `deeptech-case-evidence-card ${slot.image ? 'photo' : ''}`, key: slot.title },
        slot.image
          ? h('img', { src: slot.image, alt: slot.title, loading: 'lazy', decoding: 'async' })
          : h('div', { className: 'deeptech-case-evidence-visual' },
            h(Icon, { name: slot.icon }),
            h('span', null, slot.kind)),
        h('div', { className: 'deeptech-case-evidence-copy' },
          h('span', null, slot.kind),
          h('h3', null, slot.title),
          h('p', null, slot.desc))))));
}

export default function DeeptechDatabaseCaseStudy({ lang }) {
  const c = getContent(lang);
  return h('div', { className: 'deeptech-case deeptech-case-v2 deeptech-case-v3' },
    h(HeroRoom, { c }),
    h(ContextBoard, { c }),
    h(PublicEvidenceAtlas, { c }),
    h(BenchmarkStudio, { c }),
    h(PipelineExplorer, { c }),
    h(SourceStudio, { c }),
    h(MarketProfile, { c }),
    h(DataProductDemo, { c }),
    h(DatasetBrowser, { c }),
    h(DatabaseConsole, { c }),
    h(QualityEvidenceRoom, { c }),
    h(ReviewFlow, { c }),
    h(AgentPrototype, { c }),
    h(MapWorkbench, { c }),
    h(EvidenceBoard, { c }));
}
