# ARCHITECTURE — Verified Structure & Diagrams

> Every edge below was confirmed by reading imports/JSX in the named files (2026-07-20). Legend: **[V]** verified · **[I]** interpretation · **[?]** uncertain.

## 1. Layered frontend architecture

**[V]** The codebase has five clean layers. The one architectural oddity: the shared "framework" for all evidence layers lives inside one project's folder (`launch-os/shared/`), not in a neutral location.

```mermaid
flowchart TB
    subgraph L0["Layer 0 — Host page"]
        html["index.html<br/>#root · #neural-canvas · cursor divs · Google Fonts"]
    end
    subgraph L1["Layer 1 — App shell (React.createElement style)"]
        main["src/main.jsx"] --> app["src/app/App.jsx"]
        app --> lang["LanguageProvider.jsx<br/>(lang state, t(), localStorage)"]
        app --> route["hooks/useRoute.js<br/>(hash router)"]
        app --> chrome["layout/: NeuralCanvas · Cursor ·<br/>ProgressBar · Nav · Footer"]
    end
    subgraph L2["Layer 2 — Pages"]
        home["pages/HomePage.jsx"]
        proj["pages/ProjectPage.jsx"]
    end
    subgraph L3["Layer 3 — Project frame"]
        story["case-studies/StorytellingCaseStudy.jsx"]
        extra["case-studies/ProjectExtraSection.jsx<br/>(slug → layer dispatch)"]
        cert["cert-wall/CertificateWall.jsx"]
    end
    subgraph L4["Layer 4 — Evidence layers (JSX, self-styled, mostly lazy)"]
        layers["emobot · dataroom(.dt) · launch-os(.los) · newsintel(.ni) ·<br/>evidence-lab(.gx) · strategy-platform(.isp) · product-showcase+verification(.vf) ·<br/>psymatch(.pm) · deepscout(.ds) · field-journey(.fj) · brain-and-learning(.bl)"]
    end
    subgraph L5["Layer 5 — Shared kernel & data"]
        mf["launch-os/shared/ModuleFrame.jsx<br/>injectStyles · useViewport · usePrefersReducedMotion"]
        i18n["launch-os/shared/useI18n.js"]
        data["src/data/projects.js · translations.js · awards.js · icons.js"]
        css["src/styles/index.css (global)"]
    end
    html --> main
    app --> home
    app --> proj
    proj --> story
    proj --> extra
    proj --> cert
    extra --> layers
    layers --> mf
    layers --> i18n
    i18n --> lang
    L2 --> data
    L1 --> css
```

## 2. Route → page → section → component

**[V]** Only two route shapes exist (`useRoute.js:10-15`); everything else is section-level anchors.

```mermaid
flowchart LR
    subgraph Routes
        r1["#/ (or any non-project hash)"]
        r2["#/project/:slug"]
    end
    subgraph shellsub["App.jsx shell (always mounted)"]
        nc["NeuralCanvas"]; cur["Cursor"]; pb["ProgressBar<br/>(theme = PROJECT_THEMES[slug])"]; nav["Nav"]; foot["Footer"]
    end
    r1 --> HP["HomePage"]
    HP --> hh["HomeHero"]
    HP --> st["#story timeline (inline)"]
    HP --> wk["#work → ProjectCard × PROJECTS"]
    HP --> sk["#skills → SkillsSection"]
    HP --> aw["#awards → AwardsSection ← awards.js"]
    HP --> ct["#contact (inline)"]
    wk -- "navigate('#/project/'+slug)" --> r2
    r2 --> PP["ProjectPage (key=slug)"]
    PP --> hero["Hero: category · title · stack · meta/heroBrief"]
    PP --> ov["專案概述 overview"]
    PP --> SCS["StorytellingCaseStudy<br/>(null for emobot-plus — no storyChapters)"]
    PP --> PES["ProjectExtraSection (slug dispatch)"]
    PP --> out["KEY OUTCOMES (+ outcomeModules → Module anchors)"]
    PP --> tech["TECHNICAL APPROACH grid"]
    PP --> paw["Awards · CertificateWall (optional)"]
    PP --> pn["prev/next project nav"]
    PES --> e1["emobot-plus → EmobotCaseStudy → EmobotAtelier"]
    PES --> e2["deeptech-database → DataroomEvidence → M01–M07 (lazy)"]
    PES --> e3["ai-product-launch-os → LaunchOsEvidence (eager) + DesignSystemSpecimen"]
    PES --> e4["ai-news-intelligence → NewsIntelEvidence → M01–M16+MP (lazy)"]
    PES --> e5["ux-hmi-interaction-lab → EvidenceLab → M01–M09 (lazy)"]
    PES --> e6["industry-strategy-platform → StrategyPlatformEvidence → M01–M12 (lazy)"]
    PES --> e7["startup-intelligence-platform → ProductShowcase + VerificationLayer → 14 modules (lazy)"]
    PES --> e8["psymatch → PsyMatchEvidence → M01–M17 (lazy)"]
    PES --> e9["deepscout → DeepScoutEvidence → M01–M11+MB (lazy)"]
    PES --> e10["field-journey → FieldJourneyEvidence → C01–C07 (lazy)"]
    PES --> e11["brain-and-learning → BrainLearningEvidence → C01–C09 (lazy)"]
```

## 3. Shared component dependencies

**[V]** The critical fan-in: every evidence kit imports `launch-os/shared/*` and re-exports it (e.g. `labKit.jsx:2-5`), so each layer's modules import only their own kit. `useI18n` chains into the app-level `LanguageProvider`, which is how language toggling reaches every module without prop drilling.

```mermaid
flowchart BT
    subgraph Kits ["per-layer kits (each re-exports the kernel + adds its own dialect)"]
        labKit[".gx labKit"]; dsKit[".ds dsKit"]; niKit[".ni niKit"]; psyKit[".pm psyKit"]; vfKit[".vf vfKit"]
        blKit[".bl blKit"]; ispKit[".isp ispKit"]; fjKit[".fj fjKit"]; dtKit[".dt dtKit"]
    end
    MF["launch-os/shared/ModuleFrame.jsx<br/>injectStyles(id, css) · useViewport · usePrefersReducedMotion<br/>+ injects .los token sheet at import time"]
    UI18N["launch-os/shared/useI18n.js"]
    LP["app/providers/LanguageProvider.jsx<br/>useLang() ← data/translations.js"]
    labKit & dsKit & niKit & psyKit & vfKit & blKit & ispKit & fjKit & dtKit --> MF
    labKit & dsKit & niKit & psyKit & vfKit & blKit & ispKit & fjKit & dtKit --> UI18N
    UI18N --> LP
    losMods["launch-os modules<br/>(Cockpit, MetricTree, PRD, RiskRegister, UXHub, Specimen)"] --> MF
    losMods --> UI18N
    ICON["ui/Icon.jsx ← data/icons.js (react-icons/fi)"]
    PP2["ProjectPage"] --> ICON
    SCS2["StorytellingCaseStudy"] --> ICON
    EMO["EmobotCaseStudy / EmobotAtelier"] --> ICON
    PP2 & HP2["HomePage"] --> REV["hooks/useReveal.js (.reveal → .visible)"]
    NAV["Nav / Footer / HomeHero"] --> ST["utils/scrollTo.js"]
    NAV --> LP
```

**[V]** Side-effect to know: importing *any* kit transitively imports `ModuleFrame.jsx`, which immediately injects the `.los` token stylesheet (`ModuleFrame.jsx:56`). Because most layers are behind `React.lazy`, that only happens once a project page mounts a layer.

## 4. Content / data flow

```mermaid
flowchart LR
    subgraph globaldata["src/data/"]
        P["projects.js<br/>PROJECTS[11] + PROJECT_THEMES<br/>(bilingual copy, SVG hero covers,<br/>storyChapters/caseDeck/storyMoments,<br/>outcomes, tech, certWall)"]
        T["translations.js"]
        A["awards.js"]
        I["icons.js"]
    end
    subgraph layerdata["per-layer data/ files"]
        LC["dtContent · dsContent · newsIntelContent ·<br/>psyContent(+algorithmData+matchEngine) ·<br/>strategyPlatformContent · fjContent · blContent ·<br/>verificationContent · productContent"]
    end
    subgraph Assets
        RA["repo-root assets/ → bundled via new URL()<br/>(emobot only)"]
        PA["public/{assets,product,deepscout,field-journey,<br/>brain-and-learning,strategy-platform}<br/>→ BASE_URL or bare 'assets/…' strings"]
    end
    T --> LP2["LanguageProvider t()"] --> Shell["Nav/Footer/HomePage/ProjectPage labels"]
    P --> HP3["HomePage #work cards + SkillsSection layer links"]
    P --> PP3["ProjectPage hero/overview/outcomes/tech"]
    P --> SCS3["StorytellingCaseStudy deck"]
    P --> XB["cross-links: brain-and-learning/C09_Bridge ·<br/>field-journey/C07_SkillsBridge"]
    LC --> EL["evidence-layer modules (each layer reads only its own file;<br/>bilingual via COPY objects + useI18n)"]
    RA --> EMO2["EmobotCaseStudy/Atelier"]
    PA --> EL
    PA --> Shell
```

**[V]** Two i18n systems coexist by design: shell copy goes through `translations.js` key lookup (`t('projOverview')`), while project copy uses **field twins** (`title`/`zhTitle`, resolved in `ProjectPage.jsx:38` and `StorytellingCaseStudy`), and evidence modules use per-module `COPY = {en:{…}, zh:{…}}` read through `useI18n`.

## 5. Build & deployment flow

```mermaid
flowchart LR
    dev["npm run dev<br/>(vite, serves /src directly)"]
    push["git push origin main"] --> gha[".github/workflows/deploy.yml"]
    gha --> ci["npm ci (Node 20)"] --> build["npm run build<br/>vite build · base=/guan-ting-portfolio/<br/>→ dist/ (hash-named chunks per lazy module)"]
    build --> art["upload-pages-artifact (path: dist)"] --> pages["actions/deploy-pages →<br/>https://guantingye.github.io/guan-ting-portfolio/"]
    stale["committed dist/ in git<br/>(NOT used by deploy — stale snapshot)"] -.-> pages
    olddocs["README_DEPLOY.md / DEPLOY_GUIDE_zh.md<br/>(describe obsolete branch-deploy flow)"] -.-> pages
```

**[V]** Code-splitting falls out of the `React.lazy(() => import(...))` pattern inside each evidence entry — `dist/assets/` contains one chunk per module (e.g. `C01_Question-*.js`, `B1PipelineArchitecture-*.js`), so a visitor downloads a layer's modules only on that project page.

## Uncertainties **[?]**

- Whether GitHub Pages settings are actually set to "GitHub Actions" source can't be verified from the repo; the workflow implies it, and the committed `dist/` implies an *earlier* branch-deploy era.
- `MotionSection`'s exact animation behavior (in-view fade vs. layout) was not read line-by-line; verified only that it wraps home sections and imports `motion/react`.
- Runtime icon CDNs in `SkillsSection` (`cdn.jsdelivr.net`, `cdn.simpleicons.org`, `SkillsSection.jsx:6-7`) — verified the URLs exist in code; not verified which are actually rendered on the current design.
