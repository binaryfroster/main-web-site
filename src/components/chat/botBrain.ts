// Binary Froster — Chatbot Knowledge Base
// Comprehensive pattern-matched responses

type Rule = { patterns: RegExp[]; reply: string };

const rules: Rule[] = [
  // GREETINGS
  {
    patterns: [/^(hi|hello|hey|good\s?(morning|afternoon|evening)|hiya|sup|howdy|yo|what'?s up)/i],
    reply: "Hello! 👋 Welcome to Binary Froster. I can help you with:\n\n→ Our **services** & capabilities\n→ **Pricing** & packages\n→ **Portfolio** & case studies\n→ **Contact** & booking a call\n→ **Tech stack** & process\n→ **AI solutions** we build\n\nWhat would you like to know?",
  },
  // SERVICES
  {
    patterns: [/services?|what do you (do|build|make|offer)|capabilities|specializ|provide/i],
    reply: "We offer 6 core service areas:\n\n🤖 **AI & Automation** — Chatbots, voice AI, stock analysis (from £1,500)\n⚡ **Web & E-commerce** — Landing pages, full platforms (from £800)\n📊 **Management Systems** — ERP, LMS, hospital portals (from £3,000)\n🏠 **Real Estate Tech** — Property portals, predictions (from £2,000)\n🛒 **SaaS Development** — Full products with billing (from £5,000)\n🔗 **Custom Integrations** — APIs, CRMs, third-party tools (from £500)\n\nWhich service interests you?",
  },
  // PRICING
  {
    patterns: [/pric|cost|how much|rate|budget|package|quot|fee|cheap|afford|invest|money|pay/i],
    reply: "Here's our pricing guide:\n\n💡 **Starter** — £800–2K\nLanding pages, simple websites, small integrations\n\n🚀 **Growth** — £2K–8K\nFull business sites, e-commerce, management tools\n\n🏢 **Enterprise** — £8K–25K+\nERP systems, SaaS products, complex AI solutions\n\n📦 **Retainers** from £500/month for ongoing support\n\nAll quotes are bespoke — **[Request a tailored quote here](/contact)** to get an accurate estimate within 24 hours.",
  },
  // PORTFOLIO
  {
    patterns: [/portfolio|work|project|example|case study|built|previous|past|show me|client|deliver/i],
    reply: "We've delivered 15+ projects! Highlights:\n\n🏆 **FlowOps ERP** — 40% processing time saved for 200-person manufacturer\n🛒 **ShopLocal UK** — £50K+ revenue in first 3 months\n🤖 **Voice Call AI** — 70% of calls fully automated\n📚 **LearnBridge LMS** — £30K/month recurring revenue\n🏥 **MediCare Hub** — 100% paperless clinic in 60 days\n\nVisit our **Portfolio** page for full case studies!",
  },
  // ABOUT
  {
    patterns: [/about|who are you|company|team|founded|binary frost|tell me about|background|member/i],
    reply: "**Binary Froster** is a premium software agency serving businesses worldwide.\n\n👥 **6-person expert team** — Backend, Frontend, AI, Mobile, DevOps & UI/UX\n📍 Operating since 2023\n🌍 Clients in UK, US, India & worldwide\n✅ You own the code, data & IP — no lock-in\n📧 hello@binaryfroster.com\n\nVisit our **About** page to meet the full team!",
  },
  // CONTACT
  {
    patterns: [/contact|reach|email|phone|call|speak|talk to|get in touch|meet|book|schedule/i],
    reply: "Ways to reach us:\n\n📧 **Email:** hello@binaryfroster.com\n⏱ **Response:** Within 24 hours (Mon–Fri)\n🕒 **Hours:** 9am–6pm GMT / 10am–7pm IST\n\nYou can also:\n→ Fill out our **contact form** for a detailed estimate\n→ Book a free **30-min discovery call**\n→ Connect on **LinkedIn**: linkedin.com/in/binary-froster\n\nWe look forward to hearing from you!",
  },
  // TIMELINE
  {
    patterns: [/how long|timeline|deadline|time|fast|quick|duration|week|month|deliver|turnaround/i],
    reply: "Typical delivery timelines:\n\n⚡ **Landing page:** 1–2 weeks\n🌐 **Business website:** 2–4 weeks\n🛒 **E-commerce:** 4–8 weeks\n🤖 **AI integration:** 3–6 weeks\n📊 **Management system:** 8–16 weeks\n🏢 **Full SaaS:** 10–20 weeks\n\nWe work in 2-week sprints with weekly updates. Rush delivery available!",
  },
  // TECH STACK
  {
    patterns: [/tech|stack|language|framework|react|next|python|node|database|tools|what.*(use|built with)/i],
    reply: "Our tech stack:\n\n⚛️ **Frontend:** React, Next.js, TypeScript, TailwindCSS\n🐍 **Backend:** Python (FastAPI), Node.js, Express\n🗄️ **Database:** PostgreSQL, Supabase, MongoDB, Firebase\n🤖 **AI/ML:** OpenAI GPT-4, LangChain, Whisper\n☁️ **Cloud:** AWS, GCP, Vercel, Docker\n💳 **Payments:** Stripe, Stripe Connect\n\nWe pick the right tool for each project!",
  },
  // AI
  {
    patterns: [/\bai\b|artificial intel|chatbot|gpt|openai|llm|machine learning|\bml\b|automation|voice ai/i],
    reply: "AI is our strongest area! We build:\n\n💬 **Custom chatbots** — RAG + LangChain (from £1,500)\n📞 **Voice AI agents** — Whisper + GPT-4 + Twilio (from £3,000)\n📈 **Market analysis** — Stock/crypto ML signals (from £2,500)\n🔄 **Business automation** — Workflows & data pipelines (from £800)\n\nAll AI projects include 30-day post-launch support!",
  },
  // E-COMMERCE
  {
    patterns: [/ecommerce|e-commerce|shop|store|sell online|woocommerce|shopify|stripe|payment|cart/i],
    reply: "We build powerful e-commerce from scratch:\n\n✅ Multi-vendor marketplace (Stripe Connect)\n✅ Real-time inventory management\n✅ Automated shipping & labels\n✅ Customer loyalty programs\n✅ Full admin dashboard\n\n📦 **ShopLocal UK** hit £50K revenue in 3 months.\n\nStarting from **£2,500**. What kind of store are you building?",
  },
  // PROCESS
  {
    patterns: [/process|how (does|do) it work|step|methodology|approach|start|begin|next step|workflow/i],
    reply: "Our process in 5 steps:\n\n1️⃣ **Discovery Call** (Free, 30 min) — Understand your goals\n2️⃣ **Proposal & Quote** — Detailed scope + fixed price (48hrs)\n3️⃣ **Design Sprint** — Wireframes & mockups for approval\n4️⃣ **Build & Test** — 2-week sprints, weekly updates\n5️⃣ **Launch & Support** — Deploy + 30-day support included\n\nReady? Fill out our contact form to get started!",
  },
  // SUPPORT / MAINTENANCE
  {
    patterns: [/support|maintain|after launch|post.?launch|bug|fix|ongoing|retainer|maintenance/i],
    reply: "Post-launch options:\n\n🛡️ **Free (all projects):** 30 days bug fixes & support\n\n🔄 **Retainer Plans:**\n• Basic: £500/mo — Bug fixes + minor updates (5hrs)\n• Growth: £1,000/mo — New features + priority support (12hrs)\n• Enterprise: £2,000/mo — Dedicated dev + 24hr response (30hrs)\n\nMost clients choose the Growth plan after launch.",
  },
  // GUARANTEE / QUALITY
  {
    patterns: [/guarantee|quality|refund|trust|review|testimonial|rating|reliable|safe/i],
    reply: "We stand behind our work:\n\n✅ **Fixed-price quotes** — No surprise invoices\n✅ **You own everything** — Code, IP, data. No lock-in\n✅ **30-day post-launch support** — We don't disappear\n✅ **Milestone-based payments** — Pay as we deliver\n✅ **15+ projects, 5-star ratings**\n\n📣 \"They built our entire e-commerce in 6 weeks. Flawless.\" — ShopLocal UK",
  },
  // MOBILE APPS
  {
    patterns: [/mobile|app|ios|android|react native|flutter|phone|tablet/i],
    reply: "We build cross-platform mobile apps:\n\n📱 **React Native & Flutter** — One codebase, iOS + Android\n🎨 Smooth animations & offline-first architecture\n🔗 API integration with your existing backend\n📊 Push notifications & analytics\n\nOur mobile specialist Jawad Khan ensures pixel-perfect experiences. Starting from **£3,000**.",
  },
  // WEBSITE / LANDING PAGE
  {
    patterns: [/landing page|website|web design|redesign|new site|business site|web page/i],
    reply: "We build stunning websites:\n\n🌐 **Landing Pages** — From £500 (1–2 weeks)\n🏢 **Business Websites** — From £1,500 (2–4 weeks)\n🎨 **Custom Web Apps** — From £3,000 (4–8 weeks)\n\nAll include:\n✅ Mobile-responsive design\n✅ SEO optimization\n✅ Performance tuning\n✅ SSL & security setup\n\nReady to start? Visit our contact page!",
  },
  // ERP / MANAGEMENT
  {
    patterns: [/erp|management system|lms|hospital|student|crm|inventory|dashboard/i],
    reply: "Management systems we build:\n\n📊 **ERP** — Invoicing, HR, inventory, reporting\n📚 **LMS** — Course creation, video, quizzes, certificates\n🏥 **Hospital** — Patient records, appointments, billing\n🎓 **Student Portal** — Attendance, grades, timetables\n📦 **Inventory** — Real-time stock tracking & alerts\n\nStarting from **£3,000**. All custom-built to your workflow.",
  },
  // SAAS
  {
    patterns: [/saas|software as a service|subscription|recurring|product|platform/i],
    reply: "Full SaaS development:\n\n🚀 Multi-tenant architecture\n💳 Stripe subscriptions & billing\n👥 User management & roles\n📊 Admin dashboards & analytics\n🔐 Auth, security & compliance\n📧 Transactional emails\n\nWe've built SaaS products generating **£30K/month** for our clients. Starting from **£5,000**.",
  },
  // SECURITY / NDA
  {
    patterns: [/secur|nda|confidential|privacy|hipaa|gdpr|compliance|encrypt/i],
    reply: "Security is built into everything we do:\n\n🔒 End-to-end encryption\n📋 HIPAA compliance frameworks\n🛡️ Regular vulnerability audits\n📝 NDAs signed for all enterprise projects\n🔐 GDPR-compliant data handling\n✅ Secure deployment practices\n\nYour data and IP are always protected.",
  },
  // LOCATION
  {
    patterns: [/where|location|office|based|country|india|uk|london|mumbai|remote/i],
    reply: "We're a globally distributed team:\n\n🇬🇧 **UK presence** — Serving London, Manchester & beyond\n🇮🇳 **India operations** — Mumbai & Delhi\n🌍 **Remote-first** — We work with clients worldwide\n\n⏰ Available during UK (9am–6pm GMT) and India (10am–7pm IST) hours.\n\nAll communication is direct — no middlemen!",
  },
  // HIRING / CAREERS / JOIN
  {
    patterns: [/hire|career|job|join|work with you|position|opening|recruit/i],
    reply: "Interested in joining Binary Froster? 🎉\n\nWe're always looking for talented developers, designers, and AI engineers.\n\n📧 Send your resume to: **hello@binaryfroster.com**\n💼 Subject line: \"Career Inquiry — [Your Role]\"\n\nWe value passion, clean code, and continuous learning!",
  },
  // PAYMENT
  {
    patterns: [/payment|how.*pay|invoice|installment|milestone|deposit|upfront/i],
    reply: "Our payment structure:\n\n💰 **Fixed Projects:**\n• 50% upfront deposit\n• 50% on completion\n\n📅 **Large Projects (£5K+):**\n• Milestone-based payments\n• Pay as each phase completes\n\n🔄 **Retainers:**\n• Monthly billing\n\n💳 We accept bank transfer & Stripe.\nNo surprise fees — ever!",
  },
  // THANKS
  {
    patterns: [/thank|thanks|cheers|appreciate|helpful|great|awesome|perfect/i],
    reply: "You're welcome! 😊 Glad I could help.\n\nReady to take the next step?\n→ Fill out our **contact form** for a free estimate\n→ Email us at **hello@binaryfroster.com**\n\nWe'd love to work with you!",
  },
  // BYE
  {
    patterns: [/bye|goodbye|see you|later|take care|cya/i],
    reply: "Goodbye! 👋 Thanks for visiting Binary Froster.\n\nWhenever you're ready to start your project, we're just one message away.\n\n📧 hello@binaryfroster.com\n🌐 binaryfroster.com/contact",
  },
  // YES / INTERESTED
  {
    patterns: [/^(yes|yeah|yep|sure|ok|okay|interested|tell me more|go ahead|definitely)/i],
    reply: "Great! 🎉 To get you the most accurate information, could you tell me:\n\n1. What type of project are you looking for? (website, app, AI, etc.)\n2. Do you have a rough budget in mind?\n3. What's your ideal timeline?\n\nOr simply **[submit your project details here](/contact)** for a tailored assessment!",
  },
  // NO / NOT SURE
  {
    patterns: [/^(no|nah|not sure|maybe|i don'?t know|idk|unsure)/i],
    reply: "No worries! Take your time. 😊\n\nHere are some things you can explore:\n→ Browse our **services** page\n→ Check out our **portfolio**\n→ Read our **blog** for tech insights\n\nOr ask me anything — I'm here to help!",
  },
  // COMPARISON
  {
    patterns: [/vs|versus|compare|better than|differ|why you|why not|competitor|alternative/i],
    reply: "What makes us different:\n\n✅ **100% Code Ownership** — You own everything, no lock-in\n✅ **Fixed Pricing** — No hourly surprise bills\n✅ **AI-First** — We integrate cutting-edge AI natively\n✅ **Direct Communication** — Talk to engineers, not managers\n✅ **End-to-End** — Design → Build → Deploy → Support\n\nUnlike agencies that use templates, we build everything custom.",
  },
  // BLOG
  {
    patterns: [/blog|article|read|learn|resource|tutorial|guide|insight/i],
    reply: "Check out our blog for tech insights:\n\n📝 Topics we cover:\n• AI & automation trends\n• Web performance optimization\n• Cloud architecture best practices\n• Cybersecurity insights\n• Data streaming vs batch processing\n\nVisit **binaryfroster.com/blog** for all articles!",
  },
  // HELP
  {
    patterns: [/help|assist|support|can you|what can|how do i/i],
    reply: "I can help you with:\n\n🔹 **Services** — What we build\n🔹 **Pricing** — Cost estimates\n🔹 **Portfolio** — Past projects\n🔹 **Tech Stack** — Technologies we use\n🔹 **Process** — How we work\n🔹 **Contact** — How to reach us\n🔹 **AI Solutions** — Our AI capabilities\n🔹 **Timeline** — Project durations\n\nJust type a topic or ask any question!",
  },
];

export function getBotReply(input: string): string {
  const q = input.trim();
  if (!q) return "Please type a message and I'll help you out! 😊";

  for (const rule of rules) {
    for (const pattern of rule.patterns) {
      if (pattern.test(q)) return rule.reply;
    }
  }

  // DEFAULT FALLBACK
  return "That's a great question! 🤔 I might not have the specific answer, but here's how to get help:\n\n📧 **Email:** hello@binaryfroster.com\n📋 **Contact form:** binaryfroster.com/contact\n\nOr try asking about our **services**, **pricing**, **portfolio**, **AI**, **tech stack**, or **process** — I know all about those!";
}
