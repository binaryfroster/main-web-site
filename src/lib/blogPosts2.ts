import { BlogPost } from "./blogData";

export const posts2: BlogPost[] = [
  {
    slug: "migrating-to-postgresql",
    title: "Why We Migrated from MongoDB to PostgreSQL",
    cat: "Engineering", date: "Feb 28, 2026", read: "8 min read",
    excerpt: "Our journey of moving a high-traffic app from NoSQL to a relational database for better data integrity.",
    tags: ["Database", "Backend"],
    content: `
      <img src="/blog/migrating-to-postgresql-hero.webp" alt="MongoDB to PostgreSQL migration" class="w-full h-[420px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <p>Three years ago we chose MongoDB for a fast-growing SaaS product. The reasons were typical: flexible schema for rapidly changing requirements, JSON documents that mapped cleanly to our TypeScript models, and the developer experience of querying JavaScript objects. For the first 18 months, it was a great choice. Then the data model matured, and the cracks appeared.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">When Flexibility Becomes a Liability</h2>
      <p>The pain arrived in stages. First, cross-collection joins required multiple round-trips or the dreaded <code>$lookup</code> aggregation, which became a performance bottleneck as our dataset grew past 50 million documents. Second, the lack of enforced schema meant we had accumulated years of inconsistent data — documents with the same conceptual fields named differently across different time periods of the application. Third, our analytics team couldn't run ad-hoc SQL queries; everything had to be funnelled through application-level aggregations written by engineers.</p>
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">Query performance:</strong> Complex reports that took 8s in Mongo ran in 0.3s with proper PostgreSQL indexes.</li>
        <li><strong class="text-[var(--text-h)]">Data integrity:</strong> Foreign key constraints caught bugs in our application code that had silently corrupted data for months.</li>
        <li><strong class="text-[var(--text-h)]">Tooling ecosystem:</strong> pgAdmin, Metabase, dbt, and every BI tool connect natively to Postgres. MongoDB support is always second-class.</li>
      </ul>
      <img src="/blog/migrating-to-postgresql-mid.webp" alt="Query performance benchmark" class="w-full h-[360px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">The Migration Strategy</h2>
      <p>We ran both databases in parallel for 12 weeks. A Kafka-based CDC (Change Data Capture) pipeline replicated every MongoDB write to Postgres in real time. We used this phase to validate data consistency, test the new query layer, and train our team on Prisma ORM. The application was gradually switched over endpoint by endpoint — starting with read-heavy APIs that could safely run against either database.</p>
      <p>The hardest part was not the migration itself — it was the data cleansing required to fit years of flexible document data into strict relational schemas. We wrote 40,000 lines of migration scripts, ran them against a production snapshot three times before the live cutover, and kept a rollback playbook ready for 72 hours post-migration. We needed it once, for 11 minutes, before a missed edge case was patched.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">What We'd Do Differently</h2>
      <p>Start relational. The advice to use MongoDB for "flexible early-stage development" has a hidden cost: you'll eventually need to enforce structure, and retrofitting schemas onto existing data is far more expensive than defining them upfront. PostgreSQL's JSONB column type gives you document-store flexibility within a relational system for the parts of your data model that genuinely need it.</p>
    `
  },
  {
    slug: "future-of-saas-pricing",
    title: "The Future of SaaS Pricing Models",
    cat: "Business", date: "Feb 22, 2026", read: "6 min read",
    excerpt: "Moving away from traditional subscription models to usage-based pricing and value metrics.",
    tags: ["SaaS", "Strategy"],
    content: `
      <img src="/blog/future-of-saas-pricing-hero.webp" alt="Usage-based pricing meter" class="w-full h-[420px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <p>The £99/month SaaS subscription was the defining business model of the 2010s. It was predictable for vendors, simple for buyers, and generated the ARR multiples that fuelled a decade of venture investment. But buyer sophistication has caught up. Procurement teams now conduct ROI audits before renewal, and software that charges the same whether it's used 10 times or 10,000 times is increasingly unjustifiable.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Usage-Based Pricing: The New Default</h2>
      <p>Usage-based pricing (UBP) aligns cost with value delivered. AWS pioneered it in infrastructure; now it's cascading into every SaaS category. Customers pay for API calls made, documents processed, seats active, or outcomes achieved. The commercial benefit for buyers is immediate: a startup gets access to enterprise-grade tooling at startup-grade cost, and scales their bill only as their business grows.</p>
      <p>For vendors, UBP has a counterintuitive effect on growth: it removes adoption friction at the top of the funnel (low initial commitment) while creating a natural revenue expansion motion as successful customers use more. Stripe, Twilio, and Snowflake all built multi-billion-dollar businesses on this model.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Hybrid Models: The Pragmatic Middle Ground</h2>
      <p>Pure usage-based pricing introduces revenue unpredictability for vendors and budget unpredictability for buyers. The 2026 model that most mature SaaS companies are converging on is a hybrid: a committed spend baseline (e.g., £500/month minimum) that guarantees a usage allowance, with overage charged at a per-unit rate. This gives vendors predictable base revenue and customers a safety floor — eliminating the nightmare scenario of a runaway API loop generating a £50,000 monthly bill.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Outcome-Based Pricing: The Frontier</h2>
      <p>The boldest pricing innovation is outcome-based billing — charging only when measurable business value is delivered. A legal AI tool that charges per contract reviewed and approved. A sales intelligence platform that charges per closed deal influenced. This model requires sophisticated attribution logic and customer trust, but it completely eliminates the ROI objection in procurement conversations. Early adopters of outcome-based pricing are winning enterprise deals that flat-rate competitors cannot.</p>
    `
  },
  {
    slug: "mastering-tailwind-css",
    title: "Mastering Tailwind CSS in Large Projects",
    cat: "Engineering", date: "Feb 15, 2026", read: "7 min read",
    excerpt: "Best practices for maintaining clean, scalable, and reusable utility classes in enterprise codebases.",
    tags: ["CSS", "Frontend"],
    content: `
      <img src="/blog/mastering-tailwind-css-hero.webp" alt="Tailwind CSS utility classes visualization" class="w-full h-[420px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <p>Tailwind CSS changes how you think about styling — and most teams discover the hard way that the utility-first approach requires a different discipline than traditional CSS to remain maintainable at scale. A small project with Tailwind is a joy. A large project where every developer freely applies utilities without convention quickly becomes a different kind of mess to the CSS files it replaced.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">The Component Extraction Rule</h2>
      <p>The single most important practice in large-scale Tailwind codebases is aggressive component extraction. The moment a combination of utilities is used in more than two places, it belongs in a component — not in a shared class string copy-pasted across files. In React this is straightforward. In plain HTML, use Tailwind's <code>@apply</code> directive sparingly and deliberately for genuine design system primitives.</p>
      <img src="/blog/mastering-tailwind-css-mid.webp" alt="Tailwind component library" class="w-full md:w-1/2 float-right ml-6 mb-4 rounded-xl shadow-lg" />
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Design Token Discipline</h2>
      <p>Tailwind's <code>tailwind.config.ts</code> is your design system manifest. Every custom colour, spacing value, font size, and shadow should be defined here with semantic names — not arbitrary hex values scattered through JSX. <code>bg-brand-primary</code> is maintainable. <code>bg-[#1a2b3c]</code> is a future bug waiting to happen when the brand refreshes.</p>
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">Semantic colour tokens:</strong> <code>text-content-primary</code>, <code>bg-surface-elevated</code>, <code>border-interactive</code>.</li>
        <li><strong class="text-[var(--text-h)]">Spacing scale:</strong> Define your spacing system once. Never use arbitrary values like <code>pt-[13px]</code> unless absolutely necessary.</li>
        <li><strong class="text-[var(--text-h)]">Typography scale:</strong> Use <code>text-display-xl</code>, <code>text-body-md</code> rather than raw <code>text-2xl</code>.</li>
      </ul>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Performance: The PurgeCSS Concern</h2>
      <p>Tailwind's JIT engine only generates CSS for classes actually used in your project. But dynamic class construction — like <code>\`text-\${color}-500\`</code> in JavaScript — is invisible to the JIT scanner. Always include the full class string when conditionally applying styles: <code>isError ? 'text-red-500' : 'text-green-500'</code>. Safelist in <code>tailwind.config.ts</code> any classes generated from CMS data or API responses that the scanner cannot see at build time.</p>
    `
  },
  {
    slug: "web-accessibility-guide",
    title: "A Practical Guide to Web Accessibility",
    cat: "Design", date: "Feb 10, 2026", read: "9 min read",
    excerpt: "Why building for everyone isn't just a legal requirement, but a fundamental principle of good software design.",
    tags: ["A11y", "UX"],
    content: `
      <img src="/blog/web-accessibility-guide-hero.webp" alt="Web accessibility design elements" class="w-full h-[420px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <p>Approximately 1 in 6 people globally live with some form of disability. In the UK, the Equality Act 2010 legally requires digital services to be accessible to disabled users. Despite this, WebAIM's annual survey of the top million websites consistently finds that over 96% have detectable WCAG failures on their homepages alone. Accessibility is simultaneously the most impactful and most neglected dimension of web quality.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">The Four WCAG Principles</h2>
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">Perceivable:</strong> Information must be presentable in ways users can perceive. Text alternatives for images, captions for video, sufficient colour contrast.</li>
        <li><strong class="text-[var(--text-h)]">Operable:</strong> All functionality must be accessible via keyboard. No keyboard traps. Users with motor impairments cannot use a mouse.</li>
        <li><strong class="text-[var(--text-h)]">Understandable:</strong> Content and UI must be understandable. Clear language, predictable navigation, helpful error messages.</li>
        <li><strong class="text-[var(--text-h)]">Robust:</strong> Content must be interpretable by assistive technologies. Valid HTML, proper ARIA roles, tested with actual screen readers.</li>
      </ul>
      <img src="/blog/web-accessibility-guide-mid.webp" alt="Screen reader traversing HTML" class="w-full h-[360px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">The Quick Wins That Cover 80% of Issues</h2>
      <p>Most accessibility failures fall into a small number of categories. Fix these and you'll resolve the vast majority of real-world barriers: every image needs an <code>alt</code> attribute (empty string for decorative images), form inputs must have associated labels, interactive elements must be keyboard-reachable and have visible focus styles, colour contrast must meet 4.5:1 for normal text, and the page must have a logical heading hierarchy starting with a single <code>&lt;h1&gt;</code>.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">ARIA: Use It Carefully</h2>
      <p>ARIA (Accessible Rich Internet Applications) attributes extend HTML semantics for dynamic content. The first rule of ARIA is: don't use ARIA if native HTML achieves the same result. <code>&lt;button&gt;</code> is better than <code>&lt;div role="button"&gt;</code>. <code>&lt;nav&gt;</code> is better than <code>&lt;div role="navigation"&gt;</code>. Incorrectly applied ARIA actively harms screen reader users by overriding correct browser behaviour. When building custom components — date pickers, carousels, comboboxes — use the ARIA Authoring Practices Guide as your implementation reference.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Testing: Beyond Automated Tools</h2>
      <p>Automated scanners (axe, Lighthouse, WAVE) catch roughly 30–40% of WCAG issues. The other 60% require human judgment. Add two manual test workflows: keyboard-only navigation (Tab, Shift+Tab, Enter, Space, arrow keys — can you complete every user journey?) and screen reader testing with NVDA on Windows or VoiceOver on Mac. Nothing replaces testing with actual disabled users, which most teams never do and should.</p>
    `
  },
  {
    slug: "automating-customer-support",
    title: "Automating Customer Support Without Losing Empathy",
    cat: "AI & Business", date: "Feb 4, 2026", read: "6 min read",
    excerpt: "How to use AI to handle routine inquiries while seamlessly handing off complex issues to human agents.",
    tags: ["Support", "Automation"],
    content: `
      <img src="/blog/automating-customer-support-hero.webp" alt="AI bot and human agent collaboration" class="w-full h-[420px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <p>The promise of AI in customer support is obvious: instant responses at any hour, infinite scalability, consistent quality, dramatically lower cost per interaction. The risk is equally obvious: customers who feel they're talking to a machine when they have a complex, emotionally charged problem leave and never return. The organisations winning at support automation in 2026 have learned that the goal is not to replace human agents — it's to use AI to protect human agents for the moments that actually require human judgment.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">What AI Handles Well</h2>
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">Status and tracking queries:</strong> "Where is my order?" — retrievable from an API in milliseconds.</li>
        <li><strong class="text-[var(--text-h)]">Password resets and account management:</strong> Deterministic, high-volume, zero emotional complexity.</li>
        <li><strong class="text-[var(--text-h)]">FAQ deflection:</strong> Product questions answerable from your knowledge base — AI handles 60–80% of inbound volume at most SaaS companies.</li>
        <li><strong class="text-[var(--text-h)]">First-response acknowledgement:</strong> Immediate confirmation that the issue is received and being reviewed, preventing the anxiety of silence.</li>
      </ul>
      <img src="/blog/automating-customer-support-mid.webp" alt="Escalation funnel diagram" class="w-full md:w-1/2 float-right ml-6 mb-4 rounded-xl shadow-lg" />
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Designing the Handoff Protocol</h2>
      <p>The quality of your automation is judged almost entirely by the smoothness of its failure mode — the moment it can't help and needs to transfer to a human. A good handoff includes the full conversation transcript, a summary of what the AI already attempted, the customer's account history, and sentiment analysis indicating how frustrated they are. A human agent who receives this context can open with empathy and solutions rather than asking the customer to repeat everything.</p>
      <p>Trigger handoffs based on: negative sentiment detection, three consecutive unresolved turns, explicit customer requests for a human, billing disputes over a defined threshold, and any query containing legal or regulatory terminology. Make the "talk to a human" button easy to find — hiding it damages trust more than the cost of the interaction it prevents.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Measuring Success</h2>
      <p>Don't measure AI support purely on deflection rate — that incentivises suppressing escalations rather than resolving issues. Measure resolution rate (was the problem actually solved?), CSAT on AI-handled interactions, escalation rate as a health metric, and time-to-resolution for both automated and human-handled tickets. The best support teams use AI to reduce their agents' average handle time while increasing their capacity to deliver exceptional service on the complex cases that remain.</p>
    `
  },
];
