import { BlogPost } from "./blogData";

const h2 = (t: string) => `<h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">${t}</h2>`;
const img = (s: string, a: string, cls = "w-full h-[420px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]") =>
  `<img src="/blog/${s}" alt="${a}" class="${cls}" />`;

export const posts5: BlogPost[] = [
  {
    slug: "state-management",
    title: "State Management in Modern React",
    cat: "Engineering", date: "Nov 25, 2025", read: "6 min read",
    excerpt: "Comparing Redux, Zustand, Context API, and when to use local state versus global stores.",
    tags: ["React", "Architecture"],
    content: `
      ${img("state-management-hero.webp", "React state management options")}
      <p>The React state management landscape has never had more options — or more confusion about which to use. Redux, once considered mandatory for any serious React app, now competes with lighter alternatives like Zustand, Jotai, and Valtio. Meanwhile, Context API and React Query handle many use cases that previously required a global store at all.</p>
      ${h2("The Colocate-First Rule")}
      <p>Before reaching for any state management library, ask: does this state need to be shared across unrelated components? If no, keep it local with <code>useState</code> or <code>useReducer</code>. If the sharing need comes from prop drilling more than 2 levels, lift state up or use Context. Only reach for a dedicated global store when state is genuinely shared across many distant components and changes frequently enough that Context re-renders become a performance problem.</p>
      ${h2("Choosing the Right Tool")}
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">React Query / TanStack Query:</strong> For server state — API data, caching, revalidation. Eliminates 80% of global store usage in data-fetching apps.</li>
        <li><strong class="text-[var(--text-h)]">Zustand:</strong> For lightweight client-side global state. Minimal boilerplate, excellent TypeScript support, no provider wrapping needed.</li>
        <li><strong class="text-[var(--text-h)]">Redux Toolkit:</strong> For large teams needing strict conventions, time-travel debugging, and complex derived state. Still the best choice at enterprise scale.</li>
        <li><strong class="text-[var(--text-h)]">Context API:</strong> For low-frequency global state — theme, locale, authenticated user. Not for high-frequency updates (every keystroke, every animation frame).</li>
      </ul>
      <p>The teams that struggle with state management are not using the wrong library — they're putting everything into the global store out of habit. Treat global state like a database: only persist what genuinely needs to be globally accessible, and keep everything else local.</p>
    `
  },
  {
    slug: "agile-methodology",
    title: "Is Agile Still Relevant?",
    cat: "Management", date: "Nov 18, 2025", read: "5 min read",
    excerpt: "Reflecting on the Agile Manifesto and how modern software teams are adapting its principles.",
    tags: ["Agile", "Process"],
    content: `
      ${img("agile-methodology-hero.webp", "Agile sprint board")}
      <p>The Agile Manifesto turns 25 in 2026. It was written by 17 developers frustrated with heavyweight, document-driven processes that prioritised planning over delivery. Its four values and twelve principles were radical for their time. Today, "Agile" has been industrialised into SAFe frameworks, quarterly PI planning sessions, and sprint ceremonies that consume more time than they save — the exact bureaucratic overhead the manifesto was written to escape.</p>
      ${h2("What the Manifesto Actually Says")}
      <p>Re-reading the original manifesto is clarifying. It doesn't say "two-week sprints." It doesn't say "daily standups." It doesn't say "story points." It says: working software over comprehensive documentation, customer collaboration over contract negotiation, responding to change over following a plan. These principles are as relevant in 2026 as they were in 2001. The ceremonies and frameworks built around them are optional — and often counterproductive when applied rigidly.</p>
      ${h2("What Actually Works in 2026")}
      <p>The teams shipping the best software in 2026 have distilled Agile to its useful core: small batches of work delivered continuously, frequent customer feedback loops, the ability to change direction without a change-control board, and a culture where "done" means deployed and working — not "finished in the sprint." They've discarded the theatrical elements — velocity tracking for the sake of velocity tracking, ceremonies nobody finds valuable — and kept the principles. That's Agile working as intended.</p>
    `
  },
  {
    slug: "progressive-web-apps",
    title: "The Rise of Progressive Web Apps (PWAs)",
    cat: "Engineering", date: "Nov 12, 2025", read: "7 min read",
    excerpt: "Why PWAs are becoming the preferred choice over native apps for many businesses.",
    tags: ["PWA", "Mobile"],
    content: `
      ${img("progressive-web-apps-hero.webp", "PWA installed on mobile homescreen")}
      <p>Progressive Web Apps occupy a unique position in the platform landscape: they're websites that behave like native apps. They install to the homescreen, work offline, receive push notifications, and access device APIs — all without going through an app store. For the right use case, PWAs eliminate the cost and complexity of maintaining separate iOS and Android codebases while delivering an experience most users can't distinguish from a native app.</p>
      ${h2("The Technical Foundations")}
      <p>Three technologies make PWAs work. Service Workers are background scripts that intercept network requests and serve cached responses — enabling offline functionality and dramatically improving load performance on repeat visits. The Web App Manifest defines how the app appears when installed: name, icons, splash screen, display mode. HTTPS is mandatory — not just best practice — because service workers require a secure context to register.</p>
      ${img("progressive-web-apps-mid.webp", "Service worker caching strategy", "w-full md:w-1/2 float-right ml-6 mb-4 rounded-xl shadow-lg")}
      ${h2("When PWA Beats Native")}
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">Content-heavy apps:</strong> News, e-commerce, productivity — any app where the primary value is content rather than hardware integration.</li>
        <li><strong class="text-[var(--text-h)]">Global markets:</strong> Users on low-end Android devices with limited storage strongly prefer PWAs. A 200KB PWA shell beats a 60MB APK download.</li>
        <li><strong class="text-[var(--text-h)]">Fast iteration:</strong> Ship updates without app store review. Critical bug fixes are live in minutes, not days.</li>
      </ul>
      <p>Native wins when you need Bluetooth, NFC, advanced camera APIs, or deep OS integration that the web platform doesn't yet support. For everything else, PWA should be the first serious consideration before committing to native development.</p>
    `
  },
  {
    slug: "open-source-contributions",
    title: "Why Your Company Should Contribute to Open Source",
    cat: "Culture", date: "Nov 5, 2025", read: "6 min read",
    excerpt: "The strategic advantages of open source involvement for recruitment, branding, and technical growth.",
    tags: ["Open Source", "Community"],
    content: `
      ${img("open-source-contributions-hero.webp", "GitHub contribution graph")}
      <p>Open source contribution is often framed as altruism — giving back to the community. The more compelling business case is strategic. Companies that contribute meaningfully to open source attract better engineers, build stronger technical reputations, and accumulate influence over the tools their products depend on. The ROI is real; it's just measured in timescales that quarterly business reviews struggle to accommodate.</p>
      ${h2("The Recruitment Signal")}
      <p>Engineers evaluate potential employers by their technical culture. A company with public GitHub repositories, regular contributions to major open source projects, and engineers who speak at conferences signals something important: this is a place where technical excellence is valued for its own sake. The best engineers — the ones you most want to hire — have options. A strong open source presence differentiates your employer brand in a way that perks and salary alone cannot.</p>
      ${h2("Practical Starting Points")}
      <p>You don't need to open-source your entire product to start. Begin with utilities: internal tooling that has no competitive value but solves a problem other engineers face. Developer tools, testing utilities, configuration libraries. Contribute bug fixes and documentation improvements to your key dependencies — you get influence over the roadmap and your engineers develop expertise in the codebase your products rely on. Sponsor maintainers of critical libraries. The open source ecosystem that your business depends on is a shared commons — contribute to its maintenance or accept the risk of building on unmaintained infrastructure.</p>
    `
  },
  {
    slug: "ci-cd-pipelines",
    title: "Setting Up Robust CI/CD Pipelines",
    cat: "Engineering", date: "Oct 28, 2025", read: "8 min read",
    excerpt: "Automating your testing and deployment workflows to ship code faster and with greater confidence.",
    tags: ["DevOps", "CI/CD"],
    content: `
      ${img("ci-cd-pipelines-hero.webp", "CI/CD pipeline stages visualization")}
      <p>Continuous Integration and Continuous Delivery are the engineering practices that separate teams who ship daily from teams who ship monthly. CI ensures every code change is automatically built and tested before it reaches the main branch. CD ensures that code on the main branch can be deployed to production at any time — and ideally, is deployed automatically when all quality gates pass. Together, they reduce the risk of each individual deployment by making deployments smaller, more frequent, and more automated.</p>
      ${h2("Anatomy of a Production-Grade Pipeline")}
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">Lint & type-check:</strong> Fast feedback — fail within 60 seconds on obvious errors. Blocks the rest of the pipeline if they fail.</li>
        <li><strong class="text-[var(--text-h)]">Unit tests:</strong> Run in parallel, must complete in under 3 minutes. Slow test suites are skipped; fast test suites are run on every commit.</li>
        <li><strong class="text-[var(--text-h)]">Build:</strong> Reproducible production build. Docker image tagged with the commit SHA for precise rollback capability.</li>
        <li><strong class="text-[var(--text-h)]">Integration tests:</strong> Run against a real database and dependent services spun up in the CI environment. Not mocked.</li>
        <li><strong class="text-[var(--text-h)]">Security scan:</strong> Dependency audit, SAST scanning (Semgrep, Snyk), Docker image vulnerability scan.</li>
        <li><strong class="text-[var(--text-h)]">Deploy to staging:</strong> Automatic on merge to main. Smoke tests run against staging after deployment.</li>
        <li><strong class="text-[var(--text-h)]">Deploy to production:</strong> Canary (10% traffic), monitor error rates for 10 minutes, then full rollout. Automated rollback if error rate spikes.</li>
      </ul>
      ${img("ci-cd-pipelines-mid.webp", "GitHub Actions workflow diagram")}
      ${h2("The Deployment Frequency Metric")}
      <p>DORA metrics (Deployment Frequency, Lead Time for Changes, Change Failure Rate, Mean Time to Recovery) are the industry standard for measuring DevOps performance. Elite teams deploy to production multiple times per day with a change failure rate under 5% and MTTR under 1 hour. These numbers are not aspirational — they're achievable with good CI/CD practices, feature flags for risk mitigation, comprehensive observability, and a culture where "revert first, investigate second" is the standard incident response protocol.</p>
    `
  },
  {
    slug: "user-research-methods",
    title: "Effective User Research Methods for Startups",
    cat: "Design", date: "Oct 20, 2025", read: "7 min read",
    excerpt: "How to gather meaningful insights from users without breaking the bank or slowing down development.",
    tags: ["UX", "Research"],
    content: `
      ${img("user-research-methods-hero.webp", "UX researcher with affinity map")}
      <p>The most common product mistake isn't building the wrong thing — it's building the right thing for an imaginary user. Real users have surprising mental models, unexpected workflows, and legitimate needs that contradict product assumptions. User research is the systematic practice of replacing assumption with evidence before committing engineering effort to a direction that might not actually solve the problem.</p>
      ${h2("High-ROI Research Methods for Resource-Constrained Teams")}
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">Moderated usability testing:</strong> 5 users revealing 85% of usability problems — Jakob Nielsen's famous finding still holds. Record the session, watch where users hesitate, ask "what are you thinking right now?" Don't lead. Don't help.</li>
        <li><strong class="text-[var(--text-h)]">Jobs-to-be-done interviews:</strong> Ask about the last time they did the thing your product does. Not hypotheticals — actual recent behaviour. What triggered the need? What did they try first? What was frustrating?</li>
        <li><strong class="text-[var(--text-h)]">Session recordings:</strong> Hotjar, FullStory, or PostHog give you video of real users on your live product. Rage-clicks and dead-end navigation paths reveal problems no interview would surface.</li>
      </ul>
      ${img("user-research-methods-mid.webp", "User journey map", "w-full md:w-1/2 float-right ml-6 mb-4 rounded-xl shadow-lg")}
      ${h2("Synthesising Research into Decisions")}
      <p>Research generates observations; synthesis generates insights. After interviews, extract every distinct observation onto a card (physical or Miro). Group cards by theme — this affinity mapping process reveals patterns invisible in individual sessions. For each theme, write an insight statement: "Users struggle to X because Y" — not "users said they want Z." The difference matters because users are poor at articulating solutions but expert at articulating problems. Your job is to translate their problem descriptions into product decisions.</p>
    `
  },
  {
    slug: "kubernetes-for-beginners",
    title: "Kubernetes Demystified: A Guide for Beginners",
    cat: "Engineering", date: "Oct 15, 2025", read: "10 min read",
    excerpt: "Understanding pods, deployments, and services in the world's most popular container orchestration platform.",
    tags: ["Kubernetes", "DevOps"],
    content: `
      ${img("kubernetes-for-beginners-hero.webp", "Kubernetes cluster architecture")}
      <p>Kubernetes has a reputation for complexity that is, in some ways, deserved — and in others, overstated. The complexity is real when you're operating a Kubernetes cluster (managing etcd, upgrading control planes, configuring network policies). The complexity is manageable when you're deploying applications onto a managed Kubernetes cluster (EKS, GKE, AKS), which is how most teams interact with it. Understanding the core abstractions demystifies 90% of the day-to-day experience.</p>
      ${h2("The Core Abstractions")}
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">Pod:</strong> The smallest deployable unit. One or more containers that share a network namespace and storage. Never manage Pods directly — manage them through higher-level abstractions.</li>
        <li><strong class="text-[var(--text-h)]">Deployment:</strong> Declares the desired state: "I want 3 replicas of this container image running." Kubernetes continuously reconciles actual state with desired state, restarting crashed pods and rolling out image updates.</li>
        <li><strong class="text-[var(--text-h)]">Service:</strong> A stable DNS name and IP address that routes traffic to healthy pods. Pods are ephemeral and change IP addresses; Services provide the stable endpoint that other services call.</li>
        <li><strong class="text-[var(--text-h)]">Ingress:</strong> Routes external HTTP/HTTPS traffic to internal Services based on host and path rules. Your domain name resolves to the Ingress controller, which routes to the appropriate backend.</li>
        <li><strong class="text-[var(--text-h)]">ConfigMap / Secret:</strong> Inject configuration and credentials into containers as environment variables or mounted files — keeping them out of the container image.</li>
      </ul>
      ${img("kubernetes-for-beginners-mid.webp", "kubectl terminal output")}
      ${h2("Horizontal Pod Autoscaling")}
      <p>HPA automatically adjusts replica count based on observed CPU utilisation, memory, or custom metrics. Set a target (e.g., 70% CPU utilisation), set minimum and maximum replica counts, and Kubernetes scales your deployment in response to traffic — adding pods during peak load, removing them at night. Combined with cluster autoscaling (adding nodes when pods can't be scheduled), this creates a system that scales economically without manual intervention.</p>
      ${img("kubernetes-for-beginners-end.webp", "HPA scaling pods", "w-full md:w-1/2 float-right ml-6 mb-4 rounded-xl shadow-lg")}
      ${h2("The Learning Path")}
      <p>Start with <code>kubectl</code> fundamentals: apply, get, describe, logs, exec. Deploy a simple application, expose it with a Service, write a basic Ingress rule. Use <code>k9s</code> as a terminal UI — it makes navigating cluster state dramatically easier than raw kubectl commands. The Kubernetes documentation is genuinely excellent. Once you're comfortable with basic deployments, tackle namespaces (environment isolation), resource requests and limits (preventing noisy neighbours), and then RBAC (role-based access control). That sequence covers 95% of what developers need day-to-day.</p>
    `
  },
  {
    slug: "content-marketing-strategy",
    title: "Content Marketing Strategies for Tech Companies",
    cat: "Marketing", date: "Oct 8, 2025", read: "6 min read",
    excerpt: "How to write content that actually drives developer adoption and B2B sales.",
    tags: ["Marketing", "Content"],
    content: `
      ${img("content-marketing-strategy-hero.webp", "Content marketing funnel")}
      <p>Most tech company blogs are graveyards of product announcements and generic industry trend pieces that nobody reads and Google doesn't rank. Effective content marketing for technology companies looks nothing like this — it's specific, technical, and genuinely useful to the exact audience who would buy the product. The goal is not to broadcast; it's to earn trust through demonstrated expertise before a prospect ever speaks to sales.</p>
      ${h2("Content That Actually Converts")}
      <p>The highest-converting content for B2B technology companies consistently falls into three categories. First: opinionated technical deep-dives that take a clear stance on how something should be done — not "five ways to manage state" but "why we stopped using Redux and what we replaced it with." Second: transparent case studies with real numbers — not "we improved performance" but "we cut load time from 4.2s to 0.9s and conversion rose 18%." Third: problem-first tutorials that search-intent users find via Google when they have a specific technical problem your product solves.</p>
      ${h2("Distribution Is Half the Work")}
      <p>Publishing to your company blog and waiting is not a strategy. Distribution requires active effort: sharing on relevant Hacker News, Reddit communities (r/programming, r/devops), and developer Slack/Discord groups where your audience actually spends time. The engineers who share your content authentically — because it helped them — are worth more than any paid distribution. Build content worth sharing and build genuine community relationships. The compounding effect of consistent valuable content over 12–18 months is one of the highest-ROI marketing investments available to a technical company.</p>
    `
  },
  {
    slug: "web3-and-blockchain",
    title: "Separating Hype from Utility in Web3",
    cat: "Technology", date: "Oct 1, 2025", read: "8 min read",
    excerpt: "A critical look at blockchain technologies and where they actually provide value over traditional systems.",
    tags: ["Web3", "Blockchain"],
    content: `
      ${img("web3-and-blockchain-hero.webp", "Blockchain ledger visualization")}
      <p>The Web3 boom of 2021–2022 produced an extraordinary amount of noise — billion-dollar NFT markets, play-to-earn games that collapsed, algorithmic stablecoins that weren't stable, and DAOs that couldn't agree on anything. The subsequent bear market has been clarifying: projects built entirely on speculation evaporated; projects solving genuine coordination or trust problems with blockchain's unique properties survived and matured.</p>
      ${h2("What Blockchain Actually Solves")}
      <p>Blockchain is not a general-purpose database. It is specifically valuable in exactly one scenario: when multiple parties who don't trust each other need to share a single authoritative record of truth, without delegating authority to a central party any of them control. Cross-border payment settlement between institutions that don't trust a common intermediary. Supply chain provenance verification where participants are competitors. Multi-party financial contracts that must self-execute according to agreed rules without a lawyer or escrow agent. For every other use case, a traditional database managed by a trusted party is faster, cheaper, and easier to maintain.</p>
      ${img("web3-and-blockchain-mid.webp", "Smart contract execution")}
      ${h2("Smart Contracts: Promise and Reality")}
      <p>Smart contracts are programs that execute automatically when pre-defined conditions are met — immutably, without any party able to unilaterally change the terms. For financial settlement and multi-party agreements, this is genuinely powerful. The limitation is the oracle problem: smart contracts cannot natively access real-world data. They can only act on data that exists on-chain or is provided by an oracle service — which reintroduces the trust problem at the oracle layer. The teams building serious infrastructure on smart contracts in 2026 understand this constraint deeply and design around it, rather than pretending it doesn't exist.</p>
      <p>Web3 is neither the future of everything nor an irrelevant technology experiment. It is a specialised set of tools with real utility in specific trust-minimisation contexts. The question to ask is not "can we blockchain this?" but "do the parties in this system have a genuine reason not to trust a common central authority?" If yes, blockchain may be the right tool. If no, it's engineering complexity in search of a problem.</p>
    `
  },
];
