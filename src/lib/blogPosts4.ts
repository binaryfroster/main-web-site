import { BlogPost } from "./blogData";

export const posts4: BlogPost[] = [
  {
    slug: "intro-to-typescript",
    title: "Why TypeScript is Non-Negotiable in 2026",
    cat: "Engineering", date: "Dec 28, 2025", read: "5 min read",
    excerpt: "The undeniable benefits of static typing in JavaScript applications and why we use it for every project.",
    tags: ["TypeScript", "Frontend"],
    content: `
      <img src="/blog/intro-to-typescript-hero.webp" alt="TypeScript code with type annotations" class="w-full h-[420px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <p>In 2020, TypeScript adoption was a competitive differentiator. In 2026, writing a production application in plain JavaScript without TypeScript is an engineering liability — equivalent to deploying without tests or version control. The State of JS survey consistently shows TypeScript usage above 85% among professional developers. The question is no longer "should we use TypeScript?" — it's "how strictly should we configure it?"</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">What TypeScript Actually Prevents</h2>
      <p>The shallow case for TypeScript is autocomplete. The real case is the class of runtime errors it eliminates entirely. Accessing a property on <code>undefined</code> — JavaScript's most infamous runtime error — becomes a compile-time error with strict null checks enabled. Passing the wrong argument type to a function that eventually causes a database write is caught before the code ever runs. Refactoring a shared interface and having the compiler tell you every file that needs updating — instead of discovering broken callers at 2 AM via production alerts.</p>
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">Enable strict mode:</strong> <code>"strict": true</code> in tsconfig.json. Non-negotiable. It enables strictNullChecks, noImplicitAny, and 6 other critical checks.</li>
        <li><strong class="text-[var(--text-h)]">Type your API boundaries:</strong> Request/response types for every HTTP endpoint. Use Zod for runtime validation that generates TypeScript types automatically.</li>
        <li><strong class="text-[var(--text-h)]">Avoid <code>any</code>:</strong> Enable <code>noImplicitAny</code> and treat <code>any</code> like a linter error. Use <code>unknown</code> for genuinely untyped data and narrow it with type guards.</li>
      </ul>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">The Productivity Dividend</h2>
      <p>The common objection — "TypeScript slows us down" — confuses short-term friction with long-term velocity. Writing types for a function takes 30 seconds. Debugging a runtime type error in production that the types would have caught takes hours, sometimes days. On projects longer than 2 months, TypeScript teams consistently outship JavaScript teams because the compiler catches the low-level bugs that would otherwise consume developer time. The investment compounds; the maintenance debt doesn't accumulate.</p>
    `
  },
  {
    slug: "optimizing-react-performance",
    title: "Optimizing React Application Performance",
    cat: "Engineering", date: "Dec 20, 2025", read: "9 min read",
    excerpt: "Techniques for minimizing re-renders, lazy loading components, and improving your core web vitals.",
    tags: ["React", "Performance"],
    content: `
      <img src="/blog/optimizing-react-performance-hero.webp" alt="React component tree performance profiler" class="w-full h-[420px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <p>React's reconciliation algorithm is remarkably efficient — but it only optimises within a tree it understands. When state updates cascade through poorly structured component trees, triggering unnecessary re-renders of expensive components, the result is an application that feels sluggish despite technically running on fast hardware. Most React performance problems are architectural, not algorithmic.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Diagnosing Before Optimising</h2>
      <p>Before reaching for <code>useMemo</code> and <code>useCallback</code>, profile first. React DevTools' Profiler tab shows exactly which components rendered, why they rendered, and how long they took. Sort by "Render duration" and address the outliers before attempting micro-optimisations across the entire tree. The Profiler frequently reveals that the real bottleneck is a single component making a synchronous API call, not the dozens of innocent components you were about to unnecessarily memoise.</p>
      <img src="/blog/optimizing-react-performance-mid.webp" alt="React DevTools flame chart" class="w-full md:w-1/2 float-right ml-6 mb-4 rounded-xl shadow-lg" />
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Strategic Memoisation</h2>
      <p><code>React.memo</code>, <code>useMemo</code>, and <code>useCallback</code> all prevent unnecessary re-computation — but each has a cost: the memoised value must be stored, and the dependency comparison must run on every render. Memoisation is only worth it when the computation cost exceeds the comparison cost. Good candidates: components that render large lists, expensive derived computations (filtering 10,000 records), and callback functions passed to deeply nested child components that would otherwise re-render unnecessarily on every parent render.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Code Splitting and Lazy Loading</h2>
      <p>The single highest-impact optimisation for initial page load is reducing the JavaScript bundle. <code>React.lazy()</code> with <code>Suspense</code> defers loading of route-level components until they're navigated to. Next.js handles this automatically per-page, but in-page lazy loading of heavy modals, charts, or rich text editors can significantly reduce the initial bundle. The rule: if a component isn't visible on initial load, it shouldn't be in the initial bundle.</p>
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">Virtualise long lists:</strong> Rendering 10,000 DOM nodes is slow; <code>@tanstack/virtual</code> renders only the visible rows.</li>
        <li><strong class="text-[var(--text-h)]">State colocation:</strong> Move state as close to where it's used as possible. Global state updates re-render every subscriber.</li>
        <li><strong class="text-[var(--text-h)]">Concurrent features:</strong> Wrap non-urgent state updates in <code>startTransition()</code> to keep the UI responsive during heavy renders.</li>
      </ul>
    `
  },
  {
    slug: "design-systems",
    title: "Building a Design System from the Ground Up",
    cat: "Design", date: "Dec 15, 2025", read: "8 min read",
    excerpt: "How to create a scalable design system that bridges the gap between designers and developers.",
    tags: ["Design Systems", "UI"],
    content: `
      <img src="/blog/design-systems-hero.webp" alt="Design system token hierarchy" class="w-full h-[420px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <p>A design system is not a Figma component library. It's not a CSS framework. It's not Storybook. A design system is a shared language — a single source of truth for how your product looks, behaves, and communicates — expressed simultaneously in design tools and production code. When done well, a designer and developer working on the same feature are, quite literally, speaking the same vocabulary. When done poorly, they're translating between incompatible dialects every sprint.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Start with Design Tokens</h2>
      <p>Tokens are the atomic layer: named values for colour, spacing, typography, border radius, shadow, and motion. They are defined once and referenced everywhere. <code>color.brand.primary</code> is defined in a single JSON file, transformed into CSS custom properties, JavaScript constants, and Figma variables simultaneously via tools like Style Dictionary. When the brand refreshes and primary changes from indigo to violet, you update one token value and every surface — web, mobile, email templates — updates automatically.</p>
      <img src="/blog/design-systems-mid.webp" alt="Storybook component library" class="w-full h-[360px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Component Architecture Principles</h2>
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">Composable, not configurable:</strong> A Button with 47 props is an anti-pattern. Prefer composable primitives — <code>ButtonBase</code>, <code>ButtonIcon</code>, <code>ButtonLabel</code> — that combine cleanly.</li>
        <li><strong class="text-[var(--text-h)]">Accessibility baked in:</strong> Every component ships with correct ARIA attributes, keyboard handling, and focus management. This is enforced in Storybook via a11y addon tests.</li>
        <li><strong class="text-[var(--text-h)]">Documented in isolation:</strong> Every component has a Storybook story for every meaningful state — default, hover, disabled, loading, error. The story is the spec.</li>
      </ul>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">The Governance Challenge</h2>
      <p>The hardest part of a design system is not building it — it's maintaining it as the product evolves. Establish clear ownership (a dedicated "platform" team, or a core maintainer rotation), a component request process (RFC with use case and proposed API before implementation), and a semantic versioning policy for breaking changes. Design systems that lack governance drift into incoherence within 12 months as teams add one-off components to meet deadlines and nobody removes the originals.</p>
    `
  },
  {
    slug: "machine-learning-in-production",
    title: "Deploying Machine Learning Models to Production",
    cat: "AI & Business", date: "Dec 8, 2025", read: "10 min read",
    excerpt: "A pragmatic guide to taking ML models from Jupyter notebooks to scalable, real-time API endpoints.",
    tags: ["ML", "Deployment"],
    content: `
      <img src="/blog/machine-learning-in-production-hero.webp" alt="ML training pipeline visualization" class="w-full h-[420px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <p>The gap between "the model works in my notebook" and "the model is serving predictions reliably in production" is one of the most underestimated engineering challenges in modern software. Studies consistently show that 85–90% of ML projects never make it to production — not because the models are bad, but because the infrastructure, reliability, and operational requirements are vastly more complex than the data science work that preceded them.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">The Production ML Stack</h2>
      <p>A production ML system is not just a model file behind an API. It includes: a feature store that provides consistent features at training and inference time, a model registry (MLflow, Weights & Biases) that versions every trained model with its hyperparameters and training metrics, a serving infrastructure that handles batching, caching, and autoscaling, and a monitoring system that detects data drift and model degradation before they affect users.</p>
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">Feature store:</strong> Feast or Tecton ensure that the features used during training are identical to those at inference — the "training-serving skew" problem that silently degrades model performance.</li>
        <li><strong class="text-[var(--text-h)]">Model serving:</strong> FastAPI for low-latency REST endpoints; Triton Inference Server for high-throughput GPU serving; BentoML for managed deployment with built-in monitoring.</li>
        <li><strong class="text-[var(--text-h)]">Canary deployments:</strong> Route 5% of traffic to a new model version, compare prediction distributions and latency against the baseline, and roll forward only if metrics are satisfactory.</li>
      </ul>
      <img src="/blog/machine-learning-in-production-mid.webp" alt="FastAPI serving ML predictions" class="w-full h-[360px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Model Drift: The Silent Killer</h2>
      <p>A model trained in January on winter shopping patterns will begin to degrade as summer approaches. This is concept drift — the statistical relationship between features and the target variable has changed. Data drift is the related problem: the distribution of input features has shifted (e.g., a new marketing campaign attracting a different demographic). Both require continuous monitoring of prediction distributions, feature distributions, and downstream business metrics.</p>
      <img src="/blog/machine-learning-in-production-end.webp" alt="Model drift detection chart" class="w-full md:w-1/2 float-right ml-6 mb-4 rounded-xl shadow-lg" />
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Retraining Pipelines</h2>
      <p>Automated retraining pipelines are the final piece: a scheduled job (weekly, or triggered by drift alerts) that pulls recent labelled data, retrains the model with the same hyperparameters (or runs a lightweight hyperparameter sweep), evaluates against a holdout set, registers the new model if it outperforms the current production version, and deploys via canary. This loop — monitor → detect → retrain → evaluate → deploy — is what separates teams that have ML in production from teams that had it in production until it quietly stopped working.</p>
    `
  },
  {
    slug: "cybersecurity-basics",
    title: "Cybersecurity Basics Every Developer Should Know",
    cat: "Engineering", date: "Dec 1, 2025", read: "7 min read",
    excerpt: "Common vulnerabilities, secure coding practices, and how to protect your users' data.",
    tags: ["Security", "Best Practices"],
    content: `
      <img src="/blog/cybersecurity-basics-hero.webp" alt="OWASP Top 10 vulnerabilities" class="w-full h-[420px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <p>Security is not a role — it's a responsibility shared by every developer who writes code that touches user data. The majority of security breaches are not sophisticated zero-day exploits. They are basic, well-documented vulnerabilities that have existed for decades: SQL injection, broken authentication, insecure dependencies, and misconfigured cloud resources. The OWASP Top 10 has listed most of these same categories for 20 years. They persist because security is treated as someone else's problem until it isn't.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">The Non-Negotiable Fundamentals</h2>
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">SQL Injection:</strong> Use parameterised queries or a trusted ORM. Never concatenate user input into SQL strings. Ever. This vulnerability is 30 years old and still appears in production code weekly.</li>
        <li><strong class="text-[var(--text-h)]">Password storage:</strong> bcrypt, scrypt, or Argon2. Never MD5 or SHA-1. Never plain text. The hash algorithm must be slow by design — that's the point.</li>
        <li><strong class="text-[var(--text-h)]">Authentication tokens:</strong> Short expiry (15–60 minutes), signed with a strong secret stored in environment variables, validated on every request. Never stored in localStorage — use httpOnly cookies.</li>
        <li><strong class="text-[var(--text-h)]">Input validation:</strong> Validate type, format, length, and range on both client and server. The client validation is for UX; the server validation is for security. Never rely on the former for the latter.</li>
      </ul>
      <img src="/blog/cybersecurity-basics-mid.webp" alt="Secure vs vulnerable code" class="w-full h-[360px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Dependency Security</h2>
      <p>Modern applications depend on hundreds of open-source packages. Any one of them can introduce a critical vulnerability. Run <code>npm audit</code> (or <code>pip-audit</code>, <code>cargo audit</code>) in your CI pipeline and fail the build on high-severity findings. Enable Dependabot or Renovate to automatically open PRs for dependency updates. Subscribe to security advisories for your core dependencies — you want to know about a critical vulnerability in Express or Django before your users do.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Secrets Management</h2>
      <p>Secrets in code are the single most common source of data breaches. Run <code>git secrets</code> or <code>gitleaks</code> as a pre-commit hook to block API keys, connection strings, and passwords from ever entering your repository. Use environment variables for all secrets, manage them via a secrets manager (AWS Secrets Manager, HashiCorp Vault, Doppler) in production, and rotate them on a schedule — ideally automatically. A secret that has never been rotated is a secret that might have been compromised months ago without your knowledge.</p>
    `
  },
];
