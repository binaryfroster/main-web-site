import { BlogPost } from "./blogData";

export const posts3: BlogPost[] = [
  {
    slug: "graphql-vs-rest",
    title: "GraphQL vs REST: Which Should You Choose?",
    cat: "Engineering", date: "Jan 28, 2026", read: "8 min read",
    excerpt: "A deep dive into the pros and cons of both API paradigms and how to pick the right one.",
    tags: ["API", "Backend"],
    content: `
      <img src="/blog/graphql-vs-rest-hero.webp" alt="GraphQL vs REST showdown" class="w-full h-[420px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <p>Few engineering debates generate more heat than GraphQL vs REST. Both camps have legitimate arguments. Both have real-world success stories at massive scale. The framing of the question as "which is better?" is the wrong one — the right question is "which is better for this specific use case?"</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">REST: Why It's Still the Right Default</h2>
      <p>REST's strength is its simplicity and ubiquity. Every HTTP client in every language can consume a REST API without a specialised library. Caching at the CDN layer is trivial — a GET to <code>/products/123</code> can be cached globally with standard HTTP headers. Browser DevTools, curl, Postman — all work natively. For public APIs consumed by third parties you don't control, REST is still the only sensible choice.</p>
      <p>The genuine problem REST has is over-fetching and under-fetching. A mobile client displaying a user card might need name, avatar, and follower count — but the <code>/users/:id</code> endpoint returns 40 fields. Multiple endpoints mean multiple round trips. For teams with a single, controlled frontend, this is manageable. For teams with many frontends (iOS, Android, web, partner integrations) needing different data shapes from the same resources, REST's rigidity becomes expensive to maintain.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">GraphQL: Where It Genuinely Shines</h2>
      <img src="/blog/graphql-vs-rest-mid.webp" alt="Over-fetching vs precise query comparison" class="w-full h-[360px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <p>GraphQL's type system and query language eliminate over/under-fetching entirely — clients request exactly the fields they need. A single GraphQL endpoint replaces dozens of REST routes. Schema introspection enables excellent developer tooling (GraphiQL, Apollo Studio) and auto-generated documentation. For complex, highly relational data — think social graphs, content management, e-commerce catalogs — GraphQL produces dramatically cleaner client code.</p>
      <p>The costs are real: no native HTTP caching (requires persisted queries or a CDN with query-aware caching), N+1 query problems require DataLoader to solve, schema design requires significant upfront thought, and the learning curve for REST-trained developers is non-trivial.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Our Decision Framework</h2>
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">Public / partner API:</strong> REST always. Third parties expect it.</li>
        <li><strong class="text-[var(--text-h)]">Internal API with one frontend:</strong> REST with BFF pattern.</li>
        <li><strong class="text-[var(--text-h)]">Internal API with 3+ frontends needing different data shapes:</strong> GraphQL.</li>
        <li><strong class="text-[var(--text-h)]">Highly relational data, complex filtering:</strong> GraphQL.</li>
        <li><strong class="text-[var(--text-h)]">Simple CRUD operations, file uploads, webhooks:</strong> REST.</li>
      </ul>
    `
  },
  {
    slug: "building-scalable-microservices",
    title: "Building Scalable Microservices with Node.js",
    cat: "Engineering", date: "Jan 20, 2026", read: "10 min read",
    excerpt: "Architectural patterns and deployment strategies for microservices in a modern cloud environment.",
    tags: ["Microservices", "Node.js"],
    content: `
      <img src="/blog/building-scalable-microservices-hero.webp" alt="Microservices architecture" class="w-full h-[420px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <p>The microservices hype cycle has matured. Teams that adopted microservices prematurely — splitting a modest monolith into 30 services before they understood their domain boundaries — lived through years of distributed systems pain. Teams that adopted them at the right inflection point — when a modular monolith became a deployment bottleneck, or when different parts of the system had genuinely different scaling characteristics — found them transformative.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Service Decomposition: Domain-Driven Design</h2>
      <p>The most common microservices failure is decomposing by technical function rather than business capability. Services for "authentication", "database", and "email" are technical layers, not bounded contexts. When business requirements change, they ripple across all three simultaneously — defeating the independence microservices are supposed to provide. Instead, decompose by domain: <strong>Orders</strong>, <strong>Inventory</strong>, <strong>Fulfilment</strong>, <strong>Customer</strong>. Each service owns its data, its business logic, and its deployment lifecycle.</p>
      <img src="/blog/building-scalable-microservices-mid.webp" alt="Kubernetes cluster" class="w-full h-[360px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Communication Patterns</h2>
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">Synchronous (REST/gRPC):</strong> Use when the caller needs an immediate response — user-facing APIs, real-time queries. Accept the coupling this creates.</li>
        <li><strong class="text-[var(--text-h)]">Asynchronous (Kafka/RabbitMQ):</strong> Use for background processing, event broadcasting, workflows where steps can fail and retry independently.</li>
        <li><strong class="text-[var(--text-h)]">Saga pattern:</strong> For distributed transactions spanning multiple services. Each step publishes a success/failure event; compensating transactions roll back on failure.</li>
      </ul>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Node.js Specifics at Scale</h2>
      <p>Node's event loop is exceptional for I/O-bound services — API gateways, BFFs, real-time notification services. It becomes a liability for CPU-intensive work. If your service needs image processing, PDF generation, or heavy data transformation, run that work in a Worker Thread or delegate it to a purpose-built service in Go or Python. Node's cluster module or PM2 with multiple processes can saturate all available CPU cores — essential for containers with multiple vCPUs.</p>
      <img src="/blog/building-scalable-microservices-end.webp" alt="Docker containers" class="w-full md:w-1/2 float-right ml-6 mb-4 rounded-xl shadow-lg" />
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Observability is Non-Negotiable</h2>
      <p>Distributed systems fail in distributed ways. You cannot debug a latency spike in your Orders service by reading a single log file. You need structured logging (JSON, with trace IDs), distributed tracing (OpenTelemetry → Jaeger or Tempo), and metrics dashboards (Prometheus → Grafana). The correlation ID pattern — generating a UUID at the entry point and propagating it through every downstream call — is the minimum viable observability requirement for any microservices deployment.</p>
    `
  },
  {
    slug: "ui-animation-principles",
    title: "The 12 Principles of UI Animation",
    cat: "Design", date: "Jan 14, 2026", read: "7 min read",
    excerpt: "Applying Disney's classic animation principles to modern web interfaces for a more natural feel.",
    tags: ["Animation", "UX"],
    content: `
      <img src="/blog/ui-animation-principles-hero.webp" alt="UI animation principles visualized" class="w-full h-[420px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <p>In 1981, Disney animators Frank Thomas and Ollie Johnston codified twelve principles of animation that made characters feel alive rather than mechanical. Seventy-five years later, these same principles determine whether a web interface feels polished and natural or cheap and jarring. The medium is different; the psychology is identical — human brains are wired to read motion as intent.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">The Most Impactful Principles for UI</h2>
      <ul class="list-disc pl-6 my-6 space-y-3">
        <li><strong class="text-[var(--text-h)]">Easing (Slow in, Slow out):</strong> Nothing in the physical world starts or stops instantaneously. Linear animations feel robotic. Every UI transition should decelerate as it arrives at its destination — <code>cubic-bezier(0.22, 1, 0.36, 1)</code> is the standard "ease-out" curve for entrances.</li>
        <li><strong class="text-[var(--text-h)]">Anticipation:</strong> Before an element moves dramatically, a small preparatory motion in the opposite direction signals what's about to happen. A button that slightly compresses before activating feels satisfying rather than abrupt.</li>
        <li><strong class="text-[var(--text-h)]">Staging:</strong> Important information should animate first. Secondary elements follow. Staggered entrance animations (each element 50–80ms after the previous) guide attention and reduce cognitive load compared to everything appearing simultaneously.</li>
        <li><strong class="text-[var(--text-h)]">Follow-through:</strong> When a modal closes, it should overshoot slightly and spring back — not cut to invisible. This communicates the momentum of dismissal.</li>
        <li><strong class="text-[var(--text-h)]">Squash and stretch:</strong> Subtle scale changes on hover (1.02×) or click (0.97×) give buttons physical presence. The element feels like it exists in the real world rather than painted on glass.</li>
      </ul>
      <img src="/blog/ui-animation-principles-mid.webp" alt="Bezier easing functions" class="w-full h-[360px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Duration: The Most Common Mistake</h2>
      <p>Most developers who learn about easing immediately make their animations too slow. A well-crafted UI transition should feel instantaneous while still being perceptible — typically 150–400ms. Micro-interactions (hover states, toggles, button presses) should be 100–200ms. Page transitions and modal entrances: 250–400ms. Anything over 500ms that isn't the centrepiece of a landing page hero feels like lag, not design.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Respecting User Preferences</h2>
      <p>Always implement <code>@media (prefers-reduced-motion: reduce)</code>. Vestibular disorders affect 35% of adults over 40, and parallax effects, auto-playing carousels, and large-scale motion can trigger genuine physical symptoms. Wrap all non-essential animations in a reduced-motion check and provide a static fallback. This is both an accessibility requirement and, increasingly, a legal one in many jurisdictions.</p>
    `
  },
  {
    slug: "serverless-architecture",
    title: "Is Serverless Architecture Right for You?",
    cat: "Engineering", date: "Jan 8, 2026", read: "8 min read",
    excerpt: "Evaluating the cost, performance, and operational overhead of serverless vs traditional hosting.",
    tags: ["Serverless", "Cloud"],
    content: `
      <img src="/blog/serverless-architecture-hero.webp" alt="Serverless lambda functions" class="w-full h-[420px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <p>Serverless computing promised to eliminate infrastructure concerns entirely. Developers write functions; the cloud provider handles provisioning, scaling, patching, and availability. For many workloads, it delivers on that promise spectacularly. For others, it introduces a new class of problems that trade operational complexity for architectural constraints.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Where Serverless Excels</h2>
      <p>The economic case for serverless is compelling for workloads with highly variable or unpredictable traffic. A function that processes uploaded images scales from 0 to 10,000 concurrent executions automatically — you pay for exactly the compute consumed. A container that must be always-on to avoid cold starts costs money 24/7, even at 3 AM when traffic is zero. For event-driven background processing, webhooks, and async jobs, serverless is almost always the right choice.</p>
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">Ideal workloads:</strong> Image/video processing, email sending, PDF generation, scheduled jobs, webhook consumers, API backends with spiky traffic.</li>
        <li><strong class="text-[var(--text-h)]">Poor fits:</strong> Long-running processes (over 15 minutes), WebSocket servers, workloads requiring persistent in-memory state, high-frequency low-latency APIs where cold starts are unacceptable.</li>
      </ul>
      <img src="/blog/serverless-architecture-mid.webp" alt="Serverless vs traditional cost comparison" class="w-full h-[360px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">The Cold Start Reality</h2>
      <p>Cold starts remain serverless' most discussed limitation. When a function hasn't been invoked recently, the provider must initialise a new execution environment — downloading the function code, starting the runtime, executing initialisation code. For Python and Node.js, this is typically 200–500ms. For Java and .NET, it can exceed 2 seconds. For user-facing API routes where p99 latency matters, cold starts require mitigation: provisioned concurrency (which partially negates the cost savings), edge runtimes like Cloudflare Workers (near-zero cold starts), or architectural patterns that keep warm instances alive via periodic pings.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Cost: Not Always Cheaper at Scale</h2>
      <p>The "pay per invocation" model is transformatively cheap at low volumes and becomes surprisingly expensive at high, consistent volumes. At roughly 1–5 million requests per month (depending on function duration), a dedicated container becomes more cost-effective than Lambda. Run the maths for your specific workload before assuming serverless is the cheaper option at production scale. The operational savings in reduced infrastructure management effort are real but must be weighed against the per-invocation cost at volume.</p>
    `
  },
  {
    slug: "effective-remote-teams",
    title: "How We Manage a Fully Remote Engineering Team",
    cat: "Culture", date: "Jan 2, 2026", read: "6 min read",
    excerpt: "The tools, ceremonies, and cultural practices that keep our distributed team aligned and productive.",
    tags: ["Remote Work", "Leadership"],
    content: `
      <img src="/blog/effective-remote-teams-hero.webp" alt="Distributed remote team connected globally" class="w-full h-[420px] object-cover rounded-2xl my-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" />
      <p>Binary Froster has been fully remote since day one. Our team spans the UK, India, and Eastern Europe — six people across four time zones. We've spent three years iterating on what actually keeps a distributed engineering team cohesive, productive, and — crucially — happy to still be on the team. Here's what we've learned.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Async-First Communication</h2>
      <p>The biggest mistake remote teams make is replicating the office in video call form: back-to-back meetings, synchronous discussions for everything, the expectation that everyone is simultaneously available. This fails because it ignores time zones and destroys deep work. Our default is async: detailed Loom videos for design feedback, thorough Linear issue descriptions, architectural decisions documented in Notion with a 48-hour comment window before being considered decided.</p>
      <p>We reserve synchronous time for what actually requires it: the weekly team check-in (30 minutes, no agenda — relationship maintenance), cross-functional planning sessions, and the rare genuinely urgent technical decision. The rule is simple: if it can be async, it should be.</p>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">The Tools That Actually Matter</h2>
      <ul class="list-disc pl-6 my-6 space-y-2">
        <li><strong class="text-[var(--text-h)]">Linear:</strong> Our project management backbone. Issues are comprehensive — context, acceptance criteria, technical constraints. No "TODO: fix bug" issue without a repro case.</li>
        <li><strong class="text-[var(--text-h)]">Notion:</strong> Permanent knowledge base. Every architectural decision, onboarding doc, client brief, and post-mortem lives here. The test: could a new hire be productive in their first week using only Notion?</li>
        <li><strong class="text-[var(--text-h)]">Loom:</strong> Async video has eliminated 70% of our "quick calls". A 3-minute Loom explaining a design critique is clearer and more considerate of the recipient's schedule than a spontaneous meeting request.</li>
      </ul>
      <h2 class="text-2xl font-bold text-[var(--text-h)] mt-8 mb-4">Maintaining Culture at a Distance</h2>
      <p>Technical process is the easy part. Culture is harder. We've found three practices that genuinely move the needle: monthly virtual coffee roulette (random pairs get 30 minutes of non-work chat), an annual in-person team week for planning and social bonding, and a #wins Slack channel where achievements are publicly celebrated — client compliments, shipped features, personal milestones. Remote culture doesn't happen by default; it requires deliberate investment just like the technical infrastructure does.</p>
    `
  },
];
