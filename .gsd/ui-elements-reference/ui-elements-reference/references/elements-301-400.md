# UI Elements Reference: #301–#400

---

## Category 31: Design System & Component Patterns (#301–#310)

**#301 Design Token System**
A central system of named variables (--color-primary, --spacing-md, --radius-card) used consistently across all components. Tokens connect design decisions to code — the backbone of scalable design.
Impact: Visual changes propagate globally — one token update reskins the entire product.

**#302 Component Variant System**
Components built with explicit variants (Button: primary/secondary/ghost/danger; Badge: success/warning/error/info) rather than one-off custom styles. Documented in Storybook or Figma.
Impact: Consistent UI across teams — every component behaves predictably.

**#303 Spacing Scale**
A defined spacing scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px) used for all margins, paddings, and gaps. Prevents the "random 13px gap" problem — visual rhythm emerges naturally.
Impact: Layouts have inherent harmony — designers and developers speak the same spacing language.

**#304 Color Palette with Semantic Aliases**
Raw colors (blue-500) aliased to semantic names (color-action-primary, color-text-secondary, color-surface-raised). Components use semantic aliases — not raw values — enabling theme swaps.
Impact: Dark mode, white-labeling, and brand pivots achievable by updating aliases only.

**#305 Typography Scale / Type Ramp**
A defined hierarchy of text styles: Display, H1–H4, Body Large, Body, Caption, Label, Code — each with fixed font-size, weight, line-height, and letter-spacing.
Impact: Text hierarchy is automatic — developers pick a style, not arbitrary values.

**#306 Elevation / Shadow System**
Tiered shadow levels (0dp flat, 2dp card, 8dp dropdown, 16dp modal, 24dp dialog) conveying UI layer depth. Shadows establish spatial relationships between overlapping components.
Impact: Interface depth immediately understandable — what's above what is never ambiguous.

**#307 Border Radius System**
Defined corner radius values (none, sm, md, lg, full/pill) applied consistently: small for chips/tags, medium for cards/inputs, large for modals, full for avatars/FABs.
Impact: Visual language is coherent — rounded vs. sharp radiuses signal component type.

**#308 Motion / Animation System**
Named duration tokens (duration-instant: 100ms, duration-fast: 200ms, duration-normal: 300ms) and easing presets (ease-in, ease-out, spring) used consistently across all animations.
Impact: Animations feel choreographed — not individually tweaked per component.

**#309 Grid & Layout System**
Defined column count, gutter widths, and margin sizes at each breakpoint. Documented so designers and developers build to the same grid — no interpretation gaps.
Impact: Layouts are systematically buildable — no pixel-perfect disagreements.

**#310 Component Documentation / Storybook**
A living component library showing every component in isolation with: all variants, interactive controls, usage guidelines, do/don't examples, and copy-paste code snippets.
Impact: New team members productive on day one — no tribal knowledge required.

---

## Category 32: Color & Visual Atmosphere (#311–#320)

**#311 Glassmorphism Cards**
Semi-transparent frosted-glass card backgrounds (backdrop-filter: blur + rgba background) creating depth and layering against colorful or gradient backgrounds.
Impact: UI feels layered and dimensional — modern aesthetic that signals sophistication.

**#312 Gradient Mesh Background**
Multi-point color gradients creating organic, flowing background color fields. CSS gradient meshes or Canvas-based versions. Replace flat colors with atmospheric depth.
Impact: Pages feel alive and warm — flat colored backgrounds feel static by comparison.

**#313 Dark Mode System**
A fully implemented dark theme (not just CSS invert) with purpose-designed dark surface colors, adjusted contrast ratios, muted shadows, and recalibrated accent colors.
Impact: Eye strain reduced in low-light — also communicates premium, technical brand positioning.

**#314 Accent Color Theming**
A user-selectable accent color (blue, green, purple, orange) that propagates through CTAs, highlights, and interactive elements. Linear's accent color system is the benchmark.
Impact: Personalization creates ownership — users identify with their chosen color.

**#315 Noise / Grain Texture Overlay**
A subtle noise texture (via SVG filter or PNG overlay at low opacity) over backgrounds adding visual depth and organic quality to otherwise sterile digital interfaces.
Impact: Surfaces feel tactile and crafted — coldness of pure digital removed.

**#316 Duotone / Color Filter Images**
Images treated with a two-color filter (shadows in one brand color, highlights in another) for a cohesive, editorial look across diverse photography.
Impact: Varied photography assets feel like a unified campaign — brand coherence.

**#317 Bento Grid Layout**
An asymmetric grid of differently-sized cards (inspired by Apple's feature showcases) where content blocks vary in span and create an editorial, magazine-like layout.
Impact: Feature showcases feel dynamic and considered — better than uniform card grids.

**#318 Neumorphism / Soft UI Elements**
Inset and outset shadows on same-background-color elements creating a soft, extruded appearance. Works best for switches, sliders, and control panels in light themes.
Impact: Controls feel physical and touchable — adds depth without color contrast.

**#319 Ambient Background Glow**
Colored radial gradients or glowing orbs behind key UI sections — common in dark-themed SaaS landing pages. Creates atmospheric depth and draws attention to hero content.
Impact: Pages feel premium and futuristic — plain dark backgrounds feel flat.

**#320 High-Contrast Typography on Photography**
Text overlaid on images with text-shadow, a semi-transparent scrim, or a gradient overlay ensuring minimum 4.5:1 contrast ratio regardless of the image content beneath.
Impact: Readable text on any image — accessibility and aesthetics not in conflict.

---

## Category 33: Scroll & Page Behavior (#321–#330)

**#321 Smooth Scroll Behavior**
CSS scroll-behavior: smooth or JavaScript-powered smooth scrolling for anchor link navigation. The abrupt jump-cut of instant scroll feels jarring in contrast.
Impact: Anchor navigation feels fluid — spatial context maintained during jump.

**#322 Scroll Snap**
CSS scroll-snap-type on a container ensures items snap to defined positions when scrolling — card carousels, full-page sections, horizontal product strips.
Impact: Carousel and section navigation feels decisive — items don't stop mid-element.

**#323 Intersection Observer Animations**
Elements animating as they enter the viewport using IntersectionObserver API — the performant, non-jank alternative to scroll event listeners for scroll-triggered animations.
Impact: Scroll animations run smoothly at 60fps — no scroll event performance bottleneck.

**#324 Horizontal Scroll Section**
A section with overflow-x: scroll showing a horizontal strip of cards, images, or features — often with a subtle scrollbar or swipe hint. Adds spatial variety to vertical page flow.
Impact: Multiple items displayed without vertical space cost — lateral exploration enabled.

**#325 Page Anchoring / Hash Navigation**
Sections with ID anchors and in-page navigation that updates the URL hash on scroll. Enables deep linking to specific sections and drives ToC navigation.
Impact: Every section of a page is directly linkable — shareable with precision.

**#326 Scroll Restoration**
When navigating back to a list page from a detail page, the scroll position is restored to where the user was. Without this, users lose their place and must scroll back to their last item.
Impact: List → detail → back workflow preserves context — no relocation required.

**#327 Reduced Scroll Jank (will-change / transform)**
Using CSS will-change: transform on animated elements to move them to their own compositor layer, preventing main-thread jank during complex animations.
Impact: Animations remain smooth even on mid-range hardware.

**#328 Page Loading Progress Indicator**
A thin progress bar at the very top of the viewport filling to completion as a new page loads (NProgress.js pattern). Provides immediate feedback that navigation is happening.
Impact: Navigation feels responsive — blank pages during load are replaced with intent signal.

**#329 Sticky Section Headers**
In long grouped lists (contacts alphabetically, products by category), section headers stick to the top of the scroll container as the section scrolls behind them.
Impact: Section context maintained while scrolling through items — never lost within a group.

**#330 Virtualized Infinite Scroll**
Combines infinite scroll with virtualization — loads new pages as user scrolls while unloading far-scrolled content from DOM. Supports feeds of 10,000+ items without memory degradation.
Impact: Infinite feeds remain performant for hours of scrolling — no tab crash.

---

## Category 34: Rich Text & Editor UI (#331–#340)

**#331 Block-Based Editor (Notion-Style)**
A slash-command-driven editor where "/" opens a block picker (Text, Heading, Image, Code, Table, Embed). Blocks are draggable and transformable. The modern standard for content editing.
Impact: Non-technical users build richly formatted content without HTML knowledge.

**#332 Inline Toolbar on Text Selection**
A floating toolbar appearing when text is selected offering Bold, Italic, Link, Highlight, Comment, and AI actions. Mirrors the Word/Google Docs pattern users already know.
Impact: Formatting accessible exactly where text is — no toolbar hunt.

**#333 Markdown Shortcuts**
Typing "# " converts to H1, "**" wraps in bold, "- " starts a list — live markdown shortcuts that apply formatting as you type. Dramatically accelerates text formatting for keyboard-centric users.
Impact: Power users format without lifting hands from keyboard.

**#334 Link Preview Unfurl**
Pasting a URL into an editor auto-fetches the Open Graph data and renders a rich preview card (title, description, image) rather than displaying a bare URL.
Impact: Shared links communicate context at a glance — URL string replaced by card.

**#335 Comment / Annotation System**
Selecting text and clicking "Comment" attaches a threaded discussion to that specific content range — like Google Docs inline comments. Enables collaborative review workflows.
Impact: Feedback is anchored to exact content — no "see my comment about paragraph 3."

**#336 Version Diff View**
Side-by-side or inline diff showing additions (green) and deletions (red) between two versions of a document, like a GitHub diff. Essential for document collaboration and review.
Impact: Changes between versions visible at a glance — review time cut dramatically.

**#337 AI Writing Assist**
An inline AI prompt triggered by a slash command or "Ask AI" button that rewrites, expands, summarizes, or generates content in the editing context. Notion AI, Notion-style.
Impact: Writing becomes collaborative — AI fills blank pages and unblocks writers.

**#338 Focus / Typewriter Mode**
A distraction-free writing mode that centers the active paragraph on screen, dims everything else, and removes all UI chrome. Hemingway App and iA Writer popularized this.
Impact: Writing output and quality increase in focus mode — cognitive load reduced.

**#339 Word / Character Analytics Sidebar**
A sidebar or footer showing: word count, character count, reading time, reading level, sentence count, and paragraph count — updating live as content is edited.
Impact: Writers self-edit to targets — content meets length and complexity requirements.

**#340 Table of Contents Auto-Generator**
An automatically generated ToC from heading structure, updating live as headings are added/changed/removed. Links to each section with smooth scroll.
Impact: Long documents gain automatic navigation — no manual ToC maintenance.

---

## Category 35: AI-Powered UI Patterns (#341–#350)

**#341 AI Autocomplete / Ghost Text**
Inline ghost text suggestions appearing after the cursor as the user types, accepted with Tab. GitHub Copilot for code, Notion AI for prose — the standard for AI-augmented text entry.
Impact: Writing and coding speed increase dramatically for users who adopt the flow.

**#342 Natural Language Filter / Search**
A search bar accepting plain English queries ("show me orders over $500 from last month that haven't shipped") translated to structured filters by AI. Eliminates filter panel complexity.
Impact: Complex filtering accessible to non-technical users — no filter UI mastery required.

**#343 AI-Generated Summary Card**
A card at the top of long content showing a 3–5 bullet AI-generated summary of the key points. Allows users to decide whether to read further without commitment.
Impact: Content value communicated upfront — qualified readers invest in the full piece.

**#344 Smart Default Form Values**
AI-suggested defaults pre-filling form fields based on user history, context, or inferred preferences. Name, address, and preferences auto-populated — user confirms rather than enters.
Impact: Form completion time drops dramatically when fields arrive pre-filled.

**#345 Semantic Search Results**
Search returning results by meaning rather than keyword matching — "show me marketing tools" returns CRM and email platforms even if they don't contain the word "marketing."
Impact: Zero-result searches disappear — queries find relevant content conceptually.

**#346 AI Content Moderation Feedback**
When AI flags user content, a clear, specific explanation of why and an appeals/override path for edge cases. Transparency in AI decisions prevents user frustration and builds trust.
Impact: Moderation feels fair and explainable — opaque blocks drive user churn.

**#347 Personalized Recommendations Widget**
A "For You" section using collaborative filtering or usage patterns to surface relevant content, features, or next actions. Netflix/Spotify-style personalization applied to product dashboards.
Impact: Users discover value they'd never have found manually — retention increases.

**#348 AI Chat with Source Citations**
AI chat responses that include numbered source citations linking to the exact document, article, or data point the answer is based on. Perplexity-style grounded responses.
Impact: AI responses become verifiable — trust in AI-generated content rises.

**#349 Intelligent Error Recovery**
When a user encounters an error, AI analyzes the context and suggests specific recovery steps tailored to what went wrong ("Your CSV had 3 rows with missing dates — here's how to fix them").
Impact: Errors become learning moments rather than dead ends.

**#350 AI-Powered Accessibility Checker**
A real-time overlay that scans the current page and flags: low contrast ratios, missing alt text, unlabeled inputs, and keyboard traps — in the browser, not a separate tool.
Impact: Accessibility issues caught during building — not discovered during audit.

---

## Category 36: E-Commerce Advanced (#351–#360)

**#351 360° Product Viewer**
A draggable product image that rotates through a sequence of photos taken from multiple angles, simulating physical rotation of the product. Ideal for footwear, electronics, and furniture.
Impact: Online inspection approaches in-store experience — purchase confidence increases.

**#352 Augmented Reality Try-On**
Using WebXR or platform-specific AR (Apple AR Quick Look) to overlay a product in the user's real-world environment via camera. IKEA, Warby Parker, and Sephora lead here.
Impact: Returns reduce dramatically when customers visualize products in their space before buying.

**#353 Size / Fit Recommender**
An AI-powered tool asking a few questions (height, weight, fit preference) to recommend the right product size. Reduces size-related returns — the highest return category in apparel.
Impact: Size confidence increases — "not sure about sizing" is top reason for non-purchase.

**#354 Bundle / Kit Builder**
An interactive UI allowing customers to select and combine individual components into a bundle with real-time price update and visual preview. Increases average order value.
Impact: AOV increases when bundles are built interactively rather than pre-packaged.

**#355 Dynamic Pricing Display**
Prices updating in real-time as users change quantity, select variants, apply coupons, or switch subscription frequency — with instant total recalculation and per-unit savings shown.
Impact: Pricing transparency at decision moments — no checkout surprises.

**#356 One-Click Reorder**
A "Buy again" button on order history items that adds the exact previous order to the cart in one click. Repeat purchases for consumables become frictionless.
Impact: Repeat purchase behavior encouraged — lifetime value increases.

**#357 Saved Cart / Persistent Cart**
Cart items persisting across devices and sessions, including for logged-out users via localStorage or fingerprinting. Users return to find items waiting — no re-adding required.
Impact: Cart abandonment from session loss eliminated — intent preserved.

**#358 Product Availability Notification**
"Notify me when available" email/SMS signup for out-of-stock products. Captures demand that would otherwise be lost, with automated send when stock is replenished.
Impact: Out-of-stock items still convert demand — back-in-stock emails have high open and purchase rates.

**#359 Cross-Sell at Checkout**
A single, non-disruptive "Customers also add" recommendation shown on the cart or checkout page — one product, not a wall of them. Amazon's "Frequently bought together" adapted for checkout.
Impact: Last-moment AOV increase with minimal checkout abandonment risk.

**#360 Order Tracking Status UI**
A visual progress indicator showing order status stages: Placed → Confirmed → Packed → Shipped → Out for Delivery → Delivered — with live carrier tracking integration and estimated arrival.
Impact: Post-purchase anxiety eliminated — "where is my order?" support tickets drop dramatically.

---

## Category 37: Navigation Advanced Patterns (#361–#370)

**#361 Contextual Sidebar Navigation**
A sidebar that adapts its content based on the current context — showing document sections when editing a document, project tasks when in project view, user details in user management.
Impact: Navigation is always relevant to what the user is doing — no mode confusion.

**#362 Global Search with Categories**
A full-site search returning categorized results (Pages, Products, Docs, Users, Actions) in grouped sections. Goes beyond just page titles — searches content, metadata, and related entities.
Impact: Any entity in the product findable from one search box.

**#363 History / Recently Viewed**
A dropdown or sidebar showing recently visited pages, documents, or products — accessible from the navigation. Reduces re-navigation overhead for users moving between multiple items.
Impact: Context switching between recent items takes one click instead of multiple.

**#364 Pinned / Starred Items in Nav**
Users can pin frequently-used pages, documents, or projects to their navigation sidebar for one-click access. Personalized navigation reduces daily search overhead.
Impact: Frequent destinations accessible in one click — personal navigation efficiency.

**#365 Dynamic Breadcrumb with Dropdown**
Breadcrumb segments that, on hover, open a dropdown showing sibling items at that hierarchy level. Allows quick navigation between siblings without going all the way back up.
Impact: Lateral navigation within the hierarchy without full back-and-re-drill.

**#366 Command Center with Action Shortcuts**
An expanded command palette that not only navigates but executes actions ("Create new document", "Invite team member", "Export to CSV") — Linear and Raycast-style.
Impact: Any action in the product executable without navigating to its settings location.

**#367 Navigation Item Counters**
Badge counters on nav items showing unread messages, pending tasks, or open issues — so users know before clicking which section demands attention.
Impact: Attention directed to what matters — proactive rather than reactive navigation.

**#368 Jump-to-Section Keyboard Nav**
Pressing numbers 1–9 or letter shortcuts navigates directly to major sections while in keyboard navigation mode. Reduces navigation to the speed of thought for power users.
Impact: Expert users operate at near-zero navigation overhead.

**#369 Persistent Scroll Memory per Section**
Each major section of a SPA remembers its scroll position independently. Switching between sections returns the user to where they were — not the top of the page.
Impact: Multi-tasking between sections flows naturally — no constant scroll-to-position.

**#370 Smart Back Button Behavior**
A back button that understands context: returns to the filtered list (not the unfiltered version), the same scroll position, and the same selected tab — not just the previous URL.
Impact: Back navigation is meaningful — not disorienting loss of context.

---

## Category 38: Micro-Animations & Polish (#371–#380)

**#371 Button Press Depth Effect**
A subtle scale-down (0.97) and shadow reduction on button mousedown, then scale back on mouseup — simulating physical button press. 2ms of CSS and 100× more tactile.
Impact: Buttons feel physical — click confirmation at the muscle-memory level.

**#372 Input Focus Expansion**
Text inputs that subtly expand (height or scale) on focus, drawing visual attention to the active field. Combined with a label color change — focus becomes unmissable.
Impact: Active field always visually obvious — multi-field forms navigate cleanly.

**#373 Avatar Cluster (Overlap Stack)**
Multiple user avatars displayed as a horizontally overlapping stack with the count of additional users shown as a "+3" pill — standard for showing team members or event attendees.
Impact: Group membership communicated spatially — compact and instantly readable.

**#374 Shimmer / Shine Animation on Loading**
A moving highlight traveling across skeleton or loading elements, suggesting active loading rather than frozen state. Subtler and more refined than a spinning circle.
Impact: Loading feels dynamic — brain interprets shimmer as progress rather than waiting.

**#375 Input Shake Animation on Error**
A brief left-right shake animation on an input field when validation fails, combined with red border and error message. Draws attention to the problematic field through motion.
Impact: Error location immediately obvious — no scanning for the red field.

**#376 Smooth Number Transitions**
When a displayed number changes (cart count, balance, score), it counts up or down to the new value smoothly rather than jumping. Used in financial dashboards and counters.
Impact: Value changes feel continuous — jarring number jumps replaced by smooth flow.

**#377 Icon Swap Animation**
Icons that morph between states — hamburger to X close, play to pause, heart outline to filled. The morphing transition communicates state change through motion continuity.
Impact: State change communicated visually — no ambiguity about what the next click does.

**#378 Elastic Overscroll Bounce**
Content that visually compresses or bounces slightly when scrolled past its limits — the iOS rubber-band effect indicating a boundary has been reached.
Impact: Physical boundary feedback reduces repeated scroll attempts past limits.

**#379 Popover Entrance Animation**
Tooltips, dropdowns, and popovers that scale from their trigger point (transform-origin at trigger) rather than appearing from the top of the screen.
Impact: Popovers feel spatially connected to their trigger — not appearing from nowhere.

**#380 Tab Indicator Slide Animation**
The active tab indicator (underline or pill) slides between tabs when switching rather than snapping. A small detail that signals the UI is polished at every pixel.
Impact: Tab switching feels smooth and intentional — snapping feels unfinished.

---

## Category 39: Responsive & Adaptive Design (#381–#390)

**#381 Container Queries**
CSS container queries (@container) that adapt component layout based on the container's width rather than the viewport width — enabling truly reusable, context-responsive components.
Impact: Components adapt correctly in any layout context — not just at global breakpoints.

**#382 Fluid Typography with clamp()**
Font sizes defined as clamp(min, preferred, max) that scale continuously with viewport width — no sudden text size jumps at breakpoints.
Impact: Typography remains perfectly proportioned at every viewport width.

**#383 Adaptive Images (srcset / sizes)**
Images using srcset attributes to serve appropriately sized files for each device resolution and viewport — 400px image on mobile, 1600px on retina desktop.
Impact: Bandwidth wasted on oversized images eliminated — page loads faster on mobile.

**#384 Mobile-First CSS Architecture**
Styles written for mobile first, with larger screen styles added in min-width media queries. Ensures mobile is the base, not an afterthought — better performance and maintainability.
Impact: Mobile experience is primary, not a stripped-down version of desktop.

**#385 Touch Target Size Enforcement**
Interactive elements (buttons, links, toggles) sized to minimum 44×44px (Apple HIG) or 48×48px (Material Design) touch targets, even when the visible element is smaller.
Impact: Tap accuracy improves on mobile — fat-finger misses eliminated.

**#386 Orientation-Specific Layouts**
Different layouts for landscape vs. portrait orientation on mobile — wider navigation in landscape, stacked in portrait. Rarely done but impactful for media and gaming interfaces.
Impact: Mobile content uses available space optimally in both orientations.

**#387 Print Layout Optimization**
Content reflows into single-column print-friendly format with appropriate page breaks, page numbers, date/URL in footer, and print-specific typography at 12pt+.
Impact: Professional document output from web content — matches user expectation.

**#388 CSS Logical Properties**
Using margin-inline-start instead of margin-left, border-block-end instead of border-bottom — enabling automatic RTL support for Arabic and Hebrew interfaces without separate stylesheets.
Impact: Internationalization and RTL support built in — not added as an afterthought.

**#389 Viewport-Height Independent Layouts**
Layouts using svh (small viewport height) units and dynamic viewport height variables that account for mobile browser chrome (address bar) — prevents content being hidden behind the browser UI.
Impact: Full-height layouts work correctly on mobile — not hidden behind navigation chrome.

**#390 Aspect Ratio Preservation**
Using CSS aspect-ratio to maintain media proportions without padding-hack workarounds. Images and videos always render in correct ratio — no layout shift on load.
Impact: Layout stable during image load — no content jumping as images render.

---

## Category 40: Developer Experience & Technical UI (#391–#400)

**#391 API Documentation Interface**
Interactive API docs with: endpoint list, request builder, live code examples (in multiple languages), response schemas, and try-it-now console. Stripe's docs are the gold standard.
Impact: Integration time halves with excellent documentation UI — developer adoption increases.

**#392 Webhook Configuration UI**
A UI for adding webhook endpoints, selecting event types with checkboxes, configuring retry logic, viewing delivery logs with status, and re-triggering failed deliveries.
Impact: Integrations self-served — no developer support tickets for webhook setup.

**#393 CLI Output Styling**
Terminal-style interfaces in the browser with monospaced font, syntax-colored output, scrollback, and timestamp prefixes. Used in deployment logs, build outputs, and CI/CD dashboards.
Impact: Developers trust familiar terminal aesthetics — foreign UI patterns create friction.

**#394 Code Diff / Merge UI**
A side-by-side or unified code diff view with syntax highlighting, line numbers, comment threading, and approve/request-changes actions — GitHub Pull Request style.
Impact: Code review happens in-product — context switches to GitHub avoided.

**#395 Schema / Data Model Visualizer**
A graphical entity-relationship diagram generated from a database schema or API type definitions — nodes for tables/models, edges for relationships.
Impact: Complex data relationships understood spatially — impossible to grasp from text alone.

**#396 Real-Time Log Viewer**
A live-tailing log panel with: level filters (ERROR, WARN, INFO, DEBUG), text search, timestamp display, and auto-scroll toggle. Log entries stream in with color coding by severity.
Impact: Debugging happens in the product UI — switching to SSH/terminal avoided.

**#397 Environment Switcher**
A prominent, clearly labeled selector for switching between Development, Staging, and Production environments — often with a color-coded indicator (green/yellow/red) to prevent accidental production actions.
Impact: Wrong-environment accidents prevented — color coding provides constant context.

**#398 Feature Flag Management UI**
A list of feature flags with: toggle to enable/disable, target rules (% rollout, specific users/groups), description, and creation date. LaunchDarkly-style, in-product.
Impact: Feature releases controlled by product without deploys — shipping decoupled from releasing.

**#399 Rate Limit / Quota Dashboard**
Visual usage meters showing current API consumption vs. limits across dimensions (requests/min, tokens/day, storage GB) with historical charts and alert thresholds.
Impact: Developers anticipate limits before hitting them — no surprise 429 errors.

**#400 Integration Health Monitor**
A dashboard card per integration showing: connection status (green/red), last successful sync, recent error log, and reconnect button. Single-glance integration health at all times.
Impact: Integration failures detected and resolved before they impact users downstream.
