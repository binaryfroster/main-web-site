# ██████████████████████████████████████████████████████████████████
# BINARY FROSTER — COMPLETE WEBSITE TESTING & UI/UX QUALITY PROMPT
# Use this with: Cursor AI / v0.dev / Bolt.new / Any AI Dev Tool
# Version 1.0 | April 2026
# ██████████████████████████████████████████████████████████████████

---

## 🎯 PURPOSE OF THIS DOCUMENT

This prompt has TWO goals:

**Goal 1 — Functionality Testing**
Verify every single feature, button, form, animation, link, and interaction
works exactly as designed across all 6 pages, both themes, and all devices.

**Goal 2 — UI/UX Quality Audit**
Ensure the website is not just functional but BEAUTIFUL, ATTRACTIVE,
INTUITIVE, and USER-FRIENDLY — something a visitor from the US or UK
would trust immediately and want to engage with.

---

# ════════════════════════════════════════════════════════
# MASTER TESTING PROMPT (PASTE INTO YOUR AI DEV TOOL)
# ════════════════════════════════════════════════════════

```
You are a senior QA engineer AND a senior UX designer simultaneously.
Your job is to audit the Binary Froster website — a premium IT services
company site targeting US/UK small-medium businesses.

Run TWO audits in parallel:

AUDIT A: COMPLETE FUNCTIONALITY TEST
Test every feature listed below. For each test: state PASS / FAIL / WARN.
If FAIL: describe exactly what broke and how to fix it.
If WARN: describe what's working but could be improved.

AUDIT B: UI/UX QUALITY & ATTRACTIVENESS REVIEW
After each functional section, evaluate the visual design and user experience
quality. Score each section 1–10 and give specific improvement suggestions.
The standard is: "Would a first-time US/UK business owner immediately trust
this company and want to reach out?" If the answer is not an immediate YES,
flag it.

Begin audit now. Go through every page, every section, every component.
Be brutally honest. Every issue must be documented with a fix.
```

---

# ════════════════════════════════════════════════════════
# SECTION A: GLOBAL ELEMENTS (Test on EVERY Page)
# ════════════════════════════════════════════════════════

## A1. PAGE LOADER — Test Cases

```
FUNCTIONALITY TESTS:

Test A1.1 — First Visit Load
  Action: Open site in fresh browser (no cache, no sessionStorage)
  Expected: Full-screen loader appears immediately
  Expected: Binary rain (0s/1s characters) animate downward in violet/purple
  Expected: Binary Froster logo draws itself (SVG stroke animation, ~0.9s)
  Expected: "Binary Froster" wordmark fades in after logo draws
  Expected: Loading bar fills left-to-right with violet→cyan gradient (~1.4s)
  Expected: At 1800ms, entire loader fades out with blur effect
  Expected: Main site content fades in behind the exiting loader
  Check: sessionStorage key 'bf-loaded' is set to '1' after loader exits
  Pass Criteria: Full sequence completes, no flicker, no layout shift

Test A1.2 — Repeat Visit (Same Session)
  Action: Navigate away and back within same browser session
  Expected: Loader does NOT appear again (sessionStorage prevents it)
  Expected: Page loads immediately, hero animations play without loader
  Pass Criteria: Zero delay, no loader shown

Test A1.3 — New Session
  Action: Close browser, reopen, navigate to site
  Expected: Loader DOES appear again (new session = fresh sessionStorage)
  Pass Criteria: Loader fires on first visit of new session

Test A1.4 — Loader on Reduced Motion
  Action: Enable prefers-reduced-motion in OS/browser settings
  Expected: Loader is completely skipped (not shown at all)
  Expected: Page content appears immediately
  Pass Criteria: No loader, page loads direct

Test A1.5 — Performance
  Action: Time the loader sequence with DevTools Performance tab
  Expected: Canvas binary rain runs at minimum 30fps
  Expected: No layout shift (CLS = 0) during loader exit
  Expected: No memory leak from canvas animation after loader removed
  Pass Criteria: 30fps+, clean removal from DOM

UX QUALITY CHECK A1:
  □ Does the loader feel premium, not cheap?
  □ Is the "Binary Froster" branding clearly communicated during wait?
  □ Does the exit transition feel smooth, not jarring?
  □ Is the wait tolerable (under 2 seconds)?
  □ Does the brand concept (frost/binary) come through visually?
  Rating target: 9/10 — This is the first impression. Must be flawless.
```

---

## A2. NAVIGATION BAR — Test Cases

```
FUNCTIONALITY TESTS:

Test A2.1 — Transparent to Glass Transition
  Action: Load any page and slowly scroll down
  Expected: At 0px scroll — navbar is fully transparent, no background
  Expected: At 80px+ scroll — navbar shows frosted glass background (blur + semi-transparent)
  Expected: Transition is smooth (~350ms), not a sudden jump
  Expected: In dark mode: dark glass (rgba dark navy + blur)
  Expected: In light mode: light glass (rgba white + blur)
  Pass Criteria: Smooth state change, correct colors per theme

Test A2.2 — Logo Click
  Action: Click the "Binary Froster" logo from any page
  Expected: Navigate to homepage (/)
  Expected: No full page reload if using Next.js routing
  Pass Criteria: Routes correctly, instant client-side nav

Test A2.3 — Logo Hover Animation
  Action: Hover mouse over the logo (crystal/icon mark)
  Expected: Crystal SVG rotates 360° over ~700ms
  Expected: Rotation eases naturally (power2.inOut)
  Expected: On mouseleave: no broken state, ready for next hover
  Pass Criteria: Clean rotation, no jitter

Test A2.4 — Navigation Links (all 7)
  Action: Click each nav link: Home, Services, Portfolio, Products, About, Blog, Contact
  Expected: Routes to correct page: /, /services, /portfolio, /products, /about, /blog, /contact
  Expected: Active page link shows: different color + underline indicator
  Expected: Inactive links are clearly distinct from active
  Expected: Client-side navigation (no full reload)
  Pass Criteria: All 7 links route correctly, active state visible

Test A2.5 — Nav Link Hover Effect
  Action: Hover over each navigation link
  Expected: Underline grows FROM CENTER outward to both sides
  Expected: Link text color changes to --text-h (brighter)
  Expected: Transition: ~250ms, smooth
  Expected: On mouseleave: underline shrinks back to center
  Pass Criteria: Center-expanding underline on all nav links

Test A2.6 — Dark/Light Mode Toggle
  Action: Click the glass switch toggle in the navbar
  Expected: Entire page theme switches (dark → light or light → dark)
  Expected: Switch thumb slides with spring overshoot animation
  Expected: Moon icon visible in dark mode, sun icon in light mode
  Expected: Icons crossfade smoothly inside thumb
  Expected: All colors update: backgrounds, text, glass cards, shadows
  Expected: Toggle state persists: refresh page → same theme
  Expected: No flash of wrong theme on page load
  Pass Criteria: Complete theme switch, persists in localStorage

Test A2.7 — CTA Button "Start a Project"
  Action: Hover over "Start a Project" button in navbar
  Expected: Liquid wave fills button from bottom up (violet fill, ~400ms)
  Expected: Text color transitions from violet to white as fill rises
  Expected: Box-shadow glow appears (violet glow)
  Action: Click button
  Expected: Ripple effect from click point
  Expected: Routes to /contact page
  Pass Criteria: Liquid animation + correct routing

Test A2.8 — Mobile Navigation (< 1024px)
  Action: Resize browser to 375px width
  Expected: Nav links HIDDEN
  Expected: Hamburger icon visible (3 horizontal bars)
  Action: Click hamburger
  Expected: Glass drawer slides in from RIGHT side (full height)
  Expected: Backdrop overlay appears behind drawer (dark, semi-transparent)
  Expected: All 7 nav links shown vertically in drawer, staggered entry animation
  Expected: Logo + close button (X) visible in drawer header
  Action: Click any drawer link
  Expected: Drawer closes + navigation happens
  Action: Click backdrop
  Expected: Drawer closes
  Action: Click X button
  Expected: Drawer closes
  Pass Criteria: All mobile nav interactions work on 375px

Test A2.9 — Keyboard Navigation
  Action: Press Tab key repeatedly from page start
  Expected: Focus moves through all nav items in logical order
  Expected: Focused element shows visible focus ring (2px cyan outline)
  Expected: Press Enter on focused nav link → navigates
  Expected: Press Enter on mode toggle → toggles theme
  Pass Criteria: Full keyboard accessibility on navbar

UX QUALITY CHECK A2:
  □ Is the navbar noticeable but not distracting at the top of the page?
  □ Does the glass blur feel premium or cheap?
  □ Are nav labels clear? Would a non-technical business owner understand them?
  □ Is the CTA button immediately obvious as the primary action?
  □ On mobile: does the drawer feel smooth and professional?
  □ Is the active page state obvious enough?
  □ Does the dark/light toggle feel fun and satisfying to use?
  Rating target: 9/10
```

---

## A3. SCROLL REVEAL ANIMATIONS — Test Cases

```
FUNCTIONALITY TESTS:

Test A3.1 — Trigger Point
  Action: Slowly scroll down any page
  Expected: Elements animate in when ~12% of element enters viewport
  Expected: Elements do NOT animate prematurely (not visible before scrolling to them)
  Expected: Elements do NOT animate too late (not after fully visible)
  Pass Criteria: Correct IntersectionObserver threshold

Test A3.2 — Animation Sequence
  Action: Scroll to any card grid section
  Expected: Cards animate in sequence (NOT all at once)
  Expected: Each card has ~80ms delay between entries (stagger)
  Expected: Animation: translateY(40px)→0 + opacity 0→1
  Expected: Duration: ~600ms per element
  Pass Criteria: Visible stagger, smooth entry

Test A3.3 — Re-trigger Prevention
  Action: Scroll down (cards animate in), scroll back up, scroll down again
  Expected: Cards do NOT re-animate on second view (animate once, stay visible)
  Pass Criteria: IntersectionObserver unobserves after first trigger

Test A3.4 — Reduced Motion
  Action: Enable prefers-reduced-motion
  Expected: Elements appear instantly (no translateY, no opacity fade)
  Expected: No animation at all — content just present
  Pass Criteria: Static appearance under reduced motion

UX QUALITY CHECK A3:
  □ Do the animations feel natural and purposeful, not gimmicky?
  □ Is the stagger speed appropriate? (Not too slow, not too fast)
  □ Do animations draw attention to content without distracting from it?
  □ On a slow 3G connection, do animations still feel intentional?
  Rating target: 8/10
```

---

## A4. 3D CARD TILT — Test Cases

```
FUNCTIONALITY TESTS:

Test A4.1 — Tilt Response
  Action: Move mouse across any service card, portfolio card, or pricing card
  Expected: Card tilts on X and Y axis following mouse position
  Expected: Maximum tilt: ±13 degrees in any direction
  Expected: Card never tilts MORE than 13° regardless of mouse speed
  Pass Criteria: Bounded tilt response

Test A4.2 — Glare Overlay
  Action: Move mouse across a tilt card
  Expected: Glare (radial gradient, white, semi-transparent) shifts to follow mouse
  Expected: Glare most intense near mouse position
  Expected: Glare opacity 0 at rest → visible on hover
  Pass Criteria: Glare tracks cursor correctly

Test A4.3 — Card Lift
  Action: Hover over any tilt card
  Expected: Card visually lifts (translateZ effect + shadow deepens)
  Expected: Box-shadow increases to Level 2 (deeper, wider)
  Pass Criteria: 3D lift effect visible

Test A4.4 — Reset Behavior
  Action: Move mouse off a tilt card
  Expected: Card smoothly snaps back to flat (0°, 0°, 0Z)
  Expected: Reset uses spring ease (bounces slightly before settling)
  Expected: Duration: ~500ms
  Expected: Glare opacity fades to 0
  Pass Criteria: Clean spring reset

Test A4.5 — Touch Devices
  Action: Open on mobile phone
  Expected: 3D tilt effect is DISABLED (no tilt on touch)
  Expected: Instead: tap press = scale(0.97), release = scale(1.0) with spring
  Pass Criteria: Touch-appropriate interaction, no broken tilt attempt

Test A4.6 — Performance
  Action: Open DevTools Performance tab, hover cards rapidly
  Expected: Frame rate stays at 55fps+ during tilt
  Expected: No janky frames, no paint thrashing
  Pass Criteria: Smooth 60fps tilt via requestAnimationFrame

UX QUALITY CHECK A4:
  □ Does the 3D tilt make cards feel premium and interactive?
  □ Is the effect subtle enough to not feel overwhelming?
  □ Does the glare look like real glass or like a cheap effect?
  □ Does the spring reset feel satisfying?
  Rating target: 9/10
```

---

## A5. GLASS SWITCH TOGGLE (Pricing Monthly/Yearly) — Test Cases

```
FUNCTIONALITY TESTS:

Test A5.1 — Toggle Activation
  Action: Click the Monthly/Yearly toggle on any pricing section
  Expected: Thumb slides from left (Monthly) to right (Yearly) with spring overshoot
  Expected: Track background color shifts subtly
  Pass Criteria: Spring animation, correct state

Test A5.2 — Price Update
  Action: Toggle Monthly → Yearly
  Expected: All price values on pricing cards UPDATE to yearly pricing
  Expected: Prices animate (flip or count-change, not instant jump)
  Expected: "Save 20%" badge appears (slides in from top or fades in)
  Action: Toggle back to Monthly
  Expected: Prices revert to monthly values
  Expected: "Save 20%" badge disappears
  Pass Criteria: Dynamic price updates both directions

Test A5.3 — Label Update
  Action: Toggle the switch
  Expected: "/month" → "/mo billed yearly" label updates on cards
  Expected: Period label transitions smoothly
  Pass Criteria: Label reflects correct billing period

UX QUALITY CHECK A5:
  □ Is it immediately obvious what the toggle does?
  □ Is there a clear label: "Monthly" / "Yearly" on each side?
  □ Is the saving offer (20% off) prominently highlighted?
  □ Would a non-technical user understand the toggle without explanation?
  Rating target: 8/10
```

---

# ════════════════════════════════════════════════════════
# SECTION B: PAGE-BY-PAGE FUNCTIONALITY TESTS
# ════════════════════════════════════════════════════════

## B1. HOME PAGE `/` — Full Test Suite

```
HERO SECTION:

Test B1.1 — Particle Constellation
  Expected: 120+ animated particles visible on dark canvas
  Expected: Particles connected by lines when within 120px of each other
  Expected: Particles slowly drift in random directions
  Expected: Mouse hover over hero: particles gently repel from cursor
  Expected: Parallax: particles move at 0.35× scroll speed (slower than content)
  Light mode: particles visible (lighter color, still visible against white)
  Pass Criteria: Interactive particles, parallax scroll, visible in both modes

Test B1.2 — Typewriter Effect
  Expected: Headline "We Build Software That Thinks." visible
  Expected: Below it: a second line types out a rotating phrase
  Expected: Phrases cycle: "AI Systems." → "Web Applications." → "SaaS Products." → "Automation Tools."
  Expected: Typing speed: ~80ms per character
  Expected: Erasing speed: ~40ms per character
  Expected: Pause between phrases: ~2000ms
  Expected: Cursor blinks between phrases
  Pass Criteria: Continuous loop, correct phrase cycling

Test B1.3 — Hero CTA Buttons
  Button 1 "Start a Project":
    Hover: liquid fill animates
    Click: routes to /contact
  Button 2 "View Our Work":
    Hover: ghost button hover effect
    Click: routes to /portfolio OR smooth-scrolls to portfolio section
  Pass Criteria: Both buttons functional, liquid animation on button 1

Test B1.4 — Scroll Indicator
  Expected: Bouncing "Scroll to explore" arrow at bottom of hero
  Expected: Arrow bounces (translateY 0→8px→0 loop)
  Expected: Indicator DISAPPEARS when page scrolls past 100px
  Pass Criteria: Visible, animated, disappears on scroll

Test B1.5 — Hero 3D Scroll Effect
  Expected: As user scrolls past hero, headline gradually:
    - Moves backward in z-space (appears to recede)
    - Becomes slightly blurred
    - Fades in opacity
  Expected: GSAP ScrollTrigger scrub (tied to scroll position)
  Pass Criteria: Visible depth recession on scroll

MARQUEE TICKER:

Test B1.6 — Infinite Scroll
  Expected: Technology logos/names scroll continuously left
  Expected: No visible gap or jump in the loop
  Expected: Edge gradients fade items in/out at left and right edges
  Expected: On hover: scrolling PAUSES
  Expected: On mouse-leave: scrolling RESUMES from paused position
  Pass Criteria: Seamless loop, hover pause, edge fade

SERVICES CARDS:

Test B1.7 — Card Interactions
  Expected: 3 glass cards visible (AI & Automation, Web & E-commerce, Management Systems)
  Expected: Each card has: animated icon area (Lottie or CSS), title, description, tech tags, CTA link
  Expected: Hover: 3D tilt + glare + card lifts + border brightens
  Expected: "Explore Services →" link routes to /services with category filter pre-selected
  Pass Criteria: All 3 cards interactive, links work

STATS COUNTER:

Test B1.8 — Count-Up Animation
  Expected: Scroll to stats section → numbers COUNT UP from 0 to target
  Expected: "15+" counts to 15+ (includes suffix)
  Expected: Animation uses easeOutExpo (fast then slows down)
  Expected: Duration: ~1600ms
  Expected: Animation triggers ONCE per page load (not every time you scroll by)
  Pass Criteria: Count-up fires on scroll entry, correct values, correct suffix

PORTFOLIO BENTO GRID:

Test B1.9 — Grid Layout
  Expected: Mixed-size bento grid (at least 1 large card + smaller ones)
  Expected: All cells filled with project screenshots or placeholder images
  Expected: Grid is RESPONSIVE: collapses gracefully on tablet and mobile

Test B1.10 — Card Hover Overlay
  Expected: Hover any portfolio card: overlay darkens
  Expected: Project title + description text appears (slides up from bottom)
  Expected: "View Project →" button appears on hover
  Expected: 3D tilt active on portfolio cards
  Pass Criteria: Overlay reveal on hover

Test B1.11 — "View All Work" Button
  Action: Click "View All Work" button below grid
  Expected: Routes to /portfolio page
  Pass Criteria: Correct routing

SAAS PROMO SECTION:

Test B1.12 — Phone Mockup Float
  Expected: Phone frame visible with app mockup inside
  Expected: Phone continuously floats (CSS keyframe, smooth bob)
  Expected: No jank or stuttering in float animation
  Pass Criteria: Smooth continuous float

Test B1.13 — Orbiting Border
  Expected: Animated gradient border orbits around phone frame
  Expected: Gradient cycles: violet → cyan → violet
  Expected: Full rotation: ~3 seconds, continuous
  Pass Criteria: Smooth orbit animation

Test B1.14 — Floating Food Emojis
  Expected: 4 food emojis (🥗 🍎 💪 🔥) float around phone in orbital paths
  Expected: Each on unique orbit speed/radius
  Expected: No collision with each other or phone frame
  Pass Criteria: Orbital motion on all 4 emojis

Test B1.15 — SaaS CTA Button
  Action: Click "Try It Free — 7 Days" button
  Expected: Routes to /products/diet-planner
  Pass Criteria: Correct routing

TESTIMONIALS:

Test B1.16 — Auto Carousel
  Expected: Testimonial cards scroll automatically every 3 seconds
  Expected: On hover: carousel PAUSES
  Expected: On mouse-leave: carousel RESUMES
  Expected: Dot navigation shows current position
  Expected: Click dot → jumps to that testimonial
  Expected: Mobile: swipe left/right to navigate
  Pass Criteria: Auto-advance, hover pause, swipe on mobile

NEWSLETTER FORM (Footer):

Test B1.17 — Email Input
  Action: Enter valid email → click submit button
  Expected: Button shows success state (checkmark or "Subscribed!")
  Expected: Input clears after submission
  Action: Enter INVALID email → click submit
  Expected: Error state shown, shake animation, red border
  Pass Criteria: Valid submit succeeds, invalid shows error

UX QUALITY AUDIT — HOME PAGE:
  □ First 5 seconds: Does a visitor immediately understand what Binary Froster does?
  □ Hero headline: Is it compelling? Does "We Build Software That Thinks." intrigue?
  □ Are the CTAs obvious? Would a business owner know to click them?
  □ Does the page feel too busy/overwhelming or appropriately rich?
  □ Does the dark mode feel premium tech or depressingly dark?
  □ Does the light mode feel clean and professional?
  □ Scroll experience: Is the parallax subtle enough to delight without distract?
  □ Portfolio section: Can a visitor quickly understand what has been built?
  □ SaaS promo: Is the AI Diet Planner presented as a legitimate product?
  □ Overall trust score: Would a UK/US business owner trust this company?
  TARGET: First impression = "Wow, these people are serious professionals."
```

---

## B2. SERVICES PAGE `/services` — Full Test Suite

```
HERO:

Test B2.1 — 3D Grid Background
  Expected: Animated perspective grid visible in hero background
  Expected: Grid appears to zoom forward (infinite scroll-forward animation)
  Expected: Grid color matches brand (violet-tinted lines)
  Expected: Grid does NOT obscure headline readability
  Pass Criteria: Animated grid, readable headline on top

FILTER BAR:

Test B2.2 — Category Filter Pills
  Expected: 5 filter pills visible: All, AI & Automation, Web Development, E-commerce, Management Systems
  Expected: "All" is selected by default (highlighted pill)
  Expected: Active pill has glass fill + violet glow

Test B2.3 — Filter Click Behavior
  Action: Click "AI & Automation" filter
  Expected: Only AI/Automation cards remain visible
  Expected: Other cards smoothly exit (fade + scale down)
  Expected: Remaining cards re-layout with FLIP animation (smooth position change)
  Expected: Card count badge updates: "Showing 6 of 14 services"
  Action: Click "All"
  Expected: All 14+ cards return, staggered entrance animation
  Pass Criteria: FLIP animation, correct card visibility per filter

Test B2.4 — Search Bar
  Action: Type "chatbot" in search input
  Expected: Only chatbot-related service cards remain (real-time filter)
  Expected: Filter is case-insensitive
  Action: Clear search
  Expected: All cards return
  Pass Criteria: Real-time text search filtering

SERVICE CARDS:

Test B2.5 — All 14+ Cards Present
  Verify each service card exists:
  ✓ Voice Call Automation
  ✓ AI Chatbot (Ask Me Anything)
  ✓ AI Diet Planner (SaaS)
  ✓ Stock Market Analysis Tool
  ✓ Crypto Analysis Tool
  ✓ Custom AI Integrations
  ✓ Landing Pages (Local Business)
  ✓ Portfolio Websites
  ✓ Custom Web Applications
  ✓ Full E-commerce Platforms
  ✓ ERP System
  ✓ Student Management System
  ✓ LMS (Learning Management System)
  ✓ Hospital Management System
  ✓ Real Estate Price Prediction
  Pass Criteria: All 15 services represented

Test B2.6 — Card Content
  Each card must have:
  ✓ Service icon (animated or static)
  ✓ Category badge (color-coded by category)
  ✓ Title (clear, readable)
  ✓ Description (2–3 lines, explains the service)
  ✓ Tech tags (2–3 technology badges in JetBrains Mono)
  ✓ Price indicator ("From £500" or "Custom quote")
  ✓ "Get a Quote →" CTA (appears on hover)
  Pass Criteria: All 7 elements present on every card

Test B2.7 — "Get a Quote" Link
  Action: Hover card → CTA appears → Click "Get a Quote →"
  Expected: Routes to /contact with service pre-selected in dropdown
  Pass Criteria: Correct route + pre-filled context

PROCESS TIMELINE:

Test B2.8 — 6-Step Timeline Present
  Verify all 6 steps: Discover → Design → Build → Test → Launch → Support
  Expected: Steps connected by dashed SVG path
  Expected: Each step has: number, icon, name, description

Test B2.9 — Scroll-Driven Path Fill
  Action: Scroll into timeline section
  Expected: SVG path between steps fills/draws from left to right
  Expected: Fill speed tied to scroll position (scrub)
  Expected: As path reaches each node: node glows/activates (cyan highlight)
  Pass Criteria: Progressive path fill tied to scroll

Test B2.10 — Mobile Timeline
  Action: View on mobile (375px)
  Expected: Timeline scrolls HORIZONTALLY (not broken/stacked weirdly)
  Expected: Or: timeline converts to vertical stacked layout
  Pass Criteria: No broken layout on mobile

PRICING SECTION:

Test B2.11 — 3 Pricing Cards Present
  Starter · Growth (featured) · Enterprise
  Each card: tier name, price, "ideal for" text, feature list, CTA button
  Growth card: animated gradient border orbiting it
  Pass Criteria: All 3 cards with complete content

Test B2.12 — Monthly/Yearly Toggle
  (See A5 for full toggle tests)
  Additional: Enterprise card says "Custom Quote" — price does NOT change on toggle
  Pass Criteria: Enterprise price is static

Test B2.13 — Feature List Checkmarks
  Expected: Included features: green/cyan ✓ checkmarks
  Expected: Excluded features: muted ✗ marks (not bold red, just subtle)
  Expected: Checkmarks animate in sequentially on scroll reveal
  Pass Criteria: Clear visual distinction included vs excluded

Test B2.14 — Pricing CTA Buttons
  Starter → "Get Started" → routes to /contact
  Growth → "Start Building" → routes to /contact (highlighted)
  Enterprise → "Contact Us" → routes to /contact
  Pass Criteria: All 3 buttons route correctly

FAQ ACCORDION:

Test B2.15 — Accordion Open/Close
  Action: Click any FAQ question
  Expected: Answer expands smoothly (height animates, not jump)
  Expected: Chevron/icon rotates 135° on open
  Expected: Content fades in as it expands (opacity 0→1 + slight translateY)
  Action: Click same question again
  Expected: Collapses smoothly, icon rotates back
  Pass Criteria: Smooth open/close both directions

Test B2.16 — Multiple FAQs
  Action: Open FAQ #1, then click FAQ #3
  Expected: FAQ #3 opens (either #1 stays open OR #1 closes — both acceptable)
  Expected: No layout jump or broken states
  Pass Criteria: Multi-accordion works without breaking

UX QUALITY AUDIT — SERVICES PAGE:
  □ Can a visitor quickly find the service they need in under 10 seconds?
  □ Are price ranges visible without needing to contact? (Transparency = trust)
  □ Does the filter feel snappy and responsive?
  □ Is the process timeline reassuring? (Shows professionalism)
  □ Does the pricing feel competitive and fair for US/UK market?
  □ Would a UK business owner understand what "ERP" or "LMS" means from context?
  □ Are the "Get a Quote" CTAs positioned well on each card?
  TARGET: A visitor should leave this page feeling: "I know exactly what I can get and roughly what it costs."
```

---

## B3. PORTFOLIO PAGE `/portfolio` — Full Test Suite

```
Test B3.1 — All 15 Projects Present
  Verify each project card exists in grid:
  Web: Cafe Landing Page, Local Business Landing, Portfolio Website, Real Estate Website
  E-commerce: Full E-commerce Platform
  Management: ERP System, Student Management, LMS, Hospital Management
  Real Estate: Price Prediction Tool
  AI: Voice Call Automation, Stock Market Analysis, Crypto Analysis, AI Diet Planner, Chatbot
  Pass Criteria: 15 project cards in grid

Test B3.2 — Category Filter + Count Badge
  Action: Click "AI & Automation" filter
  Expected: Only AI projects shown
  Expected: Badge: "Showing 5 projects"
  Action: Click "All"
  Expected: "Showing 15 projects"
  Pass Criteria: Correct count badge per filter state

Test B3.3 — FLIP Re-layout Animation
  Action: Switch between filters
  Expected: Cards that stay: smoothly move to new positions (FLIP animation)
  Expected: Cards that exit: fade + scale down before layout shift
  Expected: Cards that enter: fade + scale up after layout settles
  Expected: No cards teleport or jump to positions
  Pass Criteria: Smooth FLIP animation, no teleporting

Test B3.4 — Screenshot Parallax (within card)
  Action: Scroll past portfolio grid
  Expected: Project screenshot images move SLOWER than the card frame
  Expected: Creates depth illusion (screenshot appears deeper in 3D space)
  Pass Criteria: Inner parallax visible while scrolling

Test B3.5 — Hover Overlay Reveal
  Action: Hover any portfolio card
  Expected: Dark overlay intensifies over screenshot
  Expected: Project description slides up from card bottom
  Expected: Title + tech tags + "View Project →" button all visible
  Expected: 3D tilt active simultaneously
  Pass Criteria: Overlay reveal + tilt work together

Test B3.6 — Click Opens Modal
  Action: Click any portfolio card
  Expected: Glass modal rises from bottom of screen (3D rotationX:8→0)
  Expected: Backdrop blur appears behind modal
  Expected: Modal contains: screenshot carousel, title, challenge text, solution text, tech stack, demo link
  Pass Criteria: Modal opens with 3D entrance

Test B3.7 — Modal Screenshot Carousel
  Action: Inside open modal, click next arrow or swipe
  Expected: Screenshots slide/fade between images
  Expected: Dot indicator updates to show current image position
  Expected: Swipe gesture works on mobile
  Pass Criteria: Functional carousel in modal

Test B3.8 — Modal Close Methods
  Method 1: Click X button (top-right)
  Method 2: Click outside modal (backdrop)
  Method 3: Swipe modal down on mobile
  Method 4: Press Escape key
  All methods: Modal closes with reverse animation (slides back down)
  Pass Criteria: All 4 close methods work

Test B3.9 — "Build Something Similar" Button (in modal)
  Action: Click the button
  Expected: Modal closes → navigates to /contact
  Expected: Service type pre-filled if possible
  Pass Criteria: Routes to contact with context

UX QUALITY AUDIT — PORTFOLIO PAGE:
  □ Do the project screenshots look professional (even if placeholders)?
  □ Is it easy to understand WHAT each project is at a glance?
  □ Does the filter work fast enough to feel snappy?
  □ Does the bento grid feel like a well-curated portfolio or a messy grid?
  □ Does the modal feel premium or like a popup ad?
  □ Is the case study information in the modal convincing?
  □ Would a business owner feel: "If they built all this, they can build mine"?
  TARGET: Portfolio = proof. Every card must communicate competence and quality.
```

---

## B4. AI DIET PLANNER PAGE `/products/diet-planner` — Full Test Suite

```
Test B4.1 — Hero Split Layout
  Expected: Two columns visible (50/50 split on desktop)
  Expected: Left: copy + benefits + CTA visible, not cut off
  Expected: Right: iPhone frame with app mockup visible
  Expected: Phone has orbiting gradient border (violet→cyan rotation)
  Expected: 4 food emojis orbit around phone
  Expected: Parallax: phone moves at 0.6× scroll speed vs content
  Pass Criteria: All hero elements visible and animated

Test B4.2 — "Start Free Trial" CTA
  Action: Click "Start Your Free 7-Day Trial" button
  Expected: Liquid fill animation completes
  Expected: Routes to /contact OR opens inline email capture
  OR: Opens Stripe checkout flow for free trial setup
  Pass Criteria: CTA is functional and goes somewhere meaningful

Test B4.3 — Scroll-Snapped Feature Panels
  Action: Slowly scroll through features section
  Expected: Section "snaps" to each feature panel (smooth snap, not instant)
  Expected: 5 distinct panels total
  Expected: Phone screen changes (crossfade) as each panel becomes active
  Expected: Feature text slides in from right as panel activates
  Expected: Phone slightly rotates (rotationY) per feature
  Expected: Progress indicator shows which feature is active (1/5, 2/5 etc.)
  Pass Criteria: 5 snap panels, phone content updates per panel

Test B4.4 — How It Works Section
  Expected: 3-step process visible: Input Goals → AI Creates Plan → Track Progress
  Expected: SVG connecting path between steps
  Expected: Path DRAWS (stroke animation) as user scrolls into section
  Expected: Each step node has icon + title + description
  Pass Criteria: 3 steps, animated connecting path

Test B4.5 — Pricing Toggle (Monthly/Yearly)
  Basic plan: £7.99/month → £6.39/month billed yearly
  Pro plan: £15.99/month → £12.79/month billed yearly
  Expected: Price FLIPS (3D number flip animation) on toggle
  Expected: "Save 20%" badge appears/disappears correctly
  Expected: Pro card has animated gradient border
  Expected: "Most Popular" badge visible on Pro card
  Pass Criteria: Dynamic pricing, animated flip

Test B4.6 — Free Trial CTA (Final Section)
  Expected: Email input field present
  Expected: "Get Started Free" liquid submit button
  Action: Enter valid email → click submit
  Expected: Button liquid fills → spinner → checkmark
  Expected: "Check your email!" success message appears
  Expected: Form does NOT reset prematurely
  Action: Click without email
  Expected: Error state, shake animation, "Please enter your email" message
  Pass Criteria: Submit sequence works, validation works

Test B4.7 — Testimonial Carousel
  Expected: 3+ testimonial cards
  Expected: Auto-advances every 3 seconds
  Expected: Dot navigation present + functional
  Expected: Swipe on mobile
  Pass Criteria: Auto-advance + navigation

UX QUALITY AUDIT — SAAS PAGE:
  □ Does the AI Diet Planner feel like a REAL product people would pay for?
  □ Is the pricing immediately visible without scrolling? (Crucial for SaaS)
  □ Does the "7 days free, no credit card" feel safe and low-risk?
  □ Are the 5 features compelling and specific (not vague)?
  □ Does the phone mockup app look real enough to be convincing?
  □ Is the "How it Works" section simple enough for a non-technical user?
  □ Do the testimonials sound genuine?
  TARGET: A visitor should think: "This is a real product that works. £7.99 is worth trying."
```

---

## B5. CONTACT PAGE `/contact` — Full Test Suite

```
Test B5.1 — Two-Column Layout
  Desktop: Left info panel + Right form panel (50/50 or 40/60)
  Tablet: Stacked (info on top, form below)
  Mobile: Stacked (form first — prioritize conversion)
  Pass Criteria: Responsive layout, correct column order on each breakpoint

Test B5.2 — Animated Dot Grid Background
  Expected: Left panel has animated dot-grid background
  Expected: Grid slowly drifts (background-position animation)
  Expected: Grid is subtle, not overpowering
  Pass Criteria: Visible dot grid animation in left panel

Test B5.3 — Info Cards (Left Panel)
  3 glass mini-cards should display:
  Card 1: Email icon + hello@binaryfroster.com (clickable — opens mail client)
  Card 2: Clock icon + "Response within 24 hours (Mon–Fri)"
  Card 3: Globe icon + "Serving UK & US clients"
  Pass Criteria: All 3 cards present, email link functional

Test B5.4 — Contact Form — Field Validation
  
  NAME FIELD:
    Leave empty → submit: error "Name is required"
    Enter single character: error "Name too short"
    Enter valid name: field accepts, no error
  
  EMAIL FIELD:
    Leave empty → submit: error "Email is required"
    Enter "notanemail" → submit: error "Invalid email format"
    Enter "test@example.com": valid, no error
    Real-time validation: show error as user types (after first blur)
  
  COMPANY FIELD:
    Optional — should NOT show error if empty
    Should accept any text
  
  SERVICE DROPDOWN:
    Click → dropdown opens (styled, not default browser dropdown)
    All service options present (8+ options)
    Select any option → dropdown closes, selection shows
    Required — error if not selected on submit
  
  BUDGET SLIDER:
    Drag thumb → value display updates in real-time (e.g., "£2,500 – £5,000")
    Thumb has glass bead style, bounces slightly on interaction
    Track fills violet from left to thumb position
    Works with keyboard (arrow keys for accessibility)
  
  MESSAGE TEXTAREA:
    Auto-resizes as user types (no fixed height overflow)
    Minimum 4 lines visible even when empty
    Required — error if under 20 characters
  
  HOW DID YOU HEAR:
    Dropdown opens correctly
    Options present: Google Search, LinkedIn, Twitter/X, Referral, Freelance Platform, Other
    Optional field — no error if skipped
  
  Pass Criteria: All validation rules work correctly

Test B5.5 — Floating Labels
  Action: Click into any input field
  Expected: Label text moves upward + shrinks (not hidden, just repositioned)
  Expected: Label turns cyan/accent color when field focused
  Expected: Label stays "up" when field has content (not focused)
  Expected: Label returns "down" only when field is empty AND not focused
  Pass Criteria: Floating label behavior on all fields

Test B5.6 — Input Focus Glow
  Action: Click into any form field
  Expected: Border color changes to cyan (#00BFBF)
  Expected: Cyan glow appears around the field (box-shadow)
  Expected: On blur: glow and border color return to default
  Pass Criteria: Cyan focus glow on all inputs

Test B5.7 — Form Submit Sequence
  Action: Fill all required fields correctly → click "Send Message →"
  
  Sequence expected:
    Step 1 (0ms):      Liquid wave fills button from bottom (400ms)
    Step 2 (400ms):    Text disappears, spinner appears (200ms crossfade)
    Step 3 (600ms):    Spinner rotates for ~800ms
    Step 4 (1400ms):   Spinner → checkmark path animation (300ms)
    Step 5 (1700ms):   "We'll reply within 24 hours! ✓" message slides in below
    Step 6 (after):    Form fields clear OR show "Sent!" overlay
  
  Check: Actual email/notification IS sent (test backend integration)
  Pass Criteria: All 5 visual states complete, form data submitted

Test B5.8 — Error State Visual
  Action: Click submit with empty required fields
  Expected: All invalid fields show: red border + shake animation + error message below
  Expected: Page scrolls to first invalid field automatically
  Expected: Button does NOT show loading state (no submit attempted)
  Pass Criteria: Clear error communication, no false submissions

Test B5.9 — Fixed Chat Widget
  Expected: Glass bubble visible bottom-right corner (always fixed)
  Expected: Pulse ring animation around bubble (draws attention)
  Action: Click bubble
  Expected: Chat panel slides up from bubble
  Expected: Panel shows: "Binary Froster Support" header, message area, input
  Action: Close chat
  Expected: Panel slides back down
  Pass Criteria: Chat widget present, opens/closes correctly

UX QUALITY AUDIT — CONTACT PAGE:
  □ Does the form feel like filling in a PROFESSIONAL inquiry, not a basic web form?
  □ Is there any friction that might cause someone to abandon before submitting?
  □ Does the "24 hour response" promise feel credible and reassuring?
  □ Is the budget slider intuitive? Would a non-technical person understand it?
  □ Does the success state feel satisfying and trustworthy?
  □ Is the page too long? Should form be above the fold?
  □ Is the chat widget noticeable but not annoying?
  TARGET: A visitor should feel: "Filling this form was easy. I trust they'll reply."
```

---

## B6. CLIENT PORTAL `/portal` — Full Test Suite

```
LOGIN:

Test B6.1 — Login Screen Appearance
  Expected: Full-screen animated bg (mesh gradients shifting slowly)
  Expected: Centered glass card (login form)
  Expected: Binary Froster logo at top of card
  Expected: "Client Portal — Secure Sign In" subtitle
  Expected: Email + Password fields with floating labels
  Expected: "Sign In" liquid button (full width)
  Expected: "Forgot password?" link
  Expected: "Continue with Google" SSO button
  Expected: "🔒 Protected with SSL" note at bottom
  Pass Criteria: All elements present and styled

Test B6.2 — Login Validation
  Empty email → submit: error "Email required"
  Invalid email → submit: error "Invalid email"
  Valid email + wrong password → submit: error "Invalid credentials" (from backend)
  Valid credentials → submit: login succeeds → dashboard loads
  Pass Criteria: All validation scenarios handled

Test B6.3 — Login → Dashboard Transition
  Action: Submit valid credentials
  Expected: Login card rotates away (rotationY: 0→-90°, fades out)
  Expected: Dashboard slides in from right (rotationY: 90→0°, fades in)
  Expected: Transition duration: ~900ms total
  Expected: No white flash between states
  Pass Criteria: 3D flip transition between login and dashboard

Test B6.4 — Forgot Password
  Action: Click "Forgot password?" link
  Expected: Either: form transforms to show email-only reset field
  OR: navigates to /portal/reset-password
  Expected: Submit email → "Reset email sent" confirmation
  Pass Criteria: Password reset flow functional

Test B6.5 — Google SSO
  Action: Click "Continue with Google"
  Expected: Google OAuth popup opens (correct domain, not phishing-looking)
  Expected: On successful Google auth: redirects to dashboard
  Pass Criteria: Google auth flow functional (or clearly noted as "coming soon")

DASHBOARD:

Test B6.6 — Sidebar Navigation
  Expected: 5+ nav items: Dashboard, Projects, Invoices, Messages, Settings
  Expected: Logout option (bottom of sidebar)
  Expected: Active page highlighted (violet accent)
  Expected: Hover: glass background brightens on each item
  Expected: On tablet: sidebar collapses to icon-only (64px) — tooltips on hover
  Expected: On mobile: sidebar converts to bottom navigation bar
  Pass Criteria: Sidebar functional + responsive

Test B6.7 — Stats Row
  Expected: 4 metric cards: Active Projects, Messages, Invoices Due, Next Deadline
  Expected: Values loaded from backend (or realistic mock data)
  Expected: Skeleton loaders visible WHILE data is loading
  Expected: Skeleton replaces with real content smoothly (no layout jump)
  Pass Criteria: Loading state → populated state transition

Test B6.8 — Project Cards
  Expected: At least 1 project card visible on dashboard
  Each card: project name, type badge, status pill (In Progress / Review / Completed), progress bar, milestone date
  Expected: Click card → navigates to project detail view
  Expected: Progress bar shows correct percentage (animated fill)
  Pass Criteria: Project cards populated, clickable

Test B6.9 — Activity Feed
  Expected: Chronological list of recent activity
  Expected: Each item: icon, description, timestamp
  Expected: Items load with stagger animation
  Pass Criteria: Activity feed visible with entries

KANBAN BOARD:

Test B6.10 — 4 Columns Present
  Todo · In Progress · In Review · Completed
  Each column: correct header + card count badge
  Pass Criteria: 4 columns visible

Test B6.11 — Drag and Drop
  Action: Click and hold a kanban card, drag to another column
  Expected: On drag start: card lifts (scale + shadow + rotation)
  Expected: Ghost card shows original position while dragging
  Expected: Target column highlights (background brightens as drop target)
  Expected: On drop: card lands in new column, smooth spring animation
  Expected: Card count badges update on both columns
  Expected: Progress persists after drag (not lost on next load)
  Pass Criteria: Full drag and drop functionality

Test B6.12 — Circular Progress Rings
  Expected: Each task card shows circular SVG progress ring
  Expected: Ring filled percentage matches task completion %
  Expected: Ring animated (stroke-dashoffset transition) on load
  Pass Criteria: Progress rings present and animated

INVOICES:

Test B6.13 — Invoice Table
  Expected: Table with columns: Invoice #, Description, Date, Amount, Status, Actions
  Expected: At least 1 invoice row present (real or mock data)
  Expected: Status badges: Paid (green), Pending (amber), Overdue (red)
  Pass Criteria: Table renders with correct columns

Test B6.14 — Download PDF
  Action: Click "Download PDF" for any invoice
  Expected: PDF downloads (opens in new tab or downloads to device)
  Expected: PDF contains: invoice number, client name, itemized charges, total, Binary Froster branding
  Pass Criteria: PDF download works

Test B6.15 — "Pay Now" Button (Stripe)
  Action: Click "Pay Now" on a Pending invoice
  Expected: Stripe payment modal opens (not a redirect to another page)
  Expected: Stripe modal shows correct invoice amount
  Expected: Enter test card (4242 4242 4242 4242) → submit
  Expected: Invoice status changes from Pending → Paid (with color transition)
  Expected: Confetti burst animation on successful payment
  Pass Criteria: Stripe payment completes, status updates

MESSAGES:

Test B6.16 — Thread List
  Expected: Left panel: list of message threads
  Expected: Each thread: avatar, name, preview text, timestamp
  Expected: Unread threads: bold text + dot indicator
  Expected: Click thread → opens in right panel

Test B6.17 — Message Thread
  Expected: Messages displayed as chat bubbles
  Expected: Client messages: right-aligned, violet bg
  Expected: Team messages: left-aligned, dark bg + avatar
  Expected: Timestamps visible below each message

Test B6.18 — Send Message
  Action: Type in compose textarea → click Send (or press Enter)
  Expected: Message appears in thread immediately (optimistic update)
  Expected: Send animation: paper plane or send ripple on button
  Pass Criteria: Message sending works

Test B6.19 — Typing Indicator
  Action: Simulate other user typing (or trigger from backend)
  Expected: "..." typing indicator appears in thread
  Expected: 3 dots animate (bounce in wave sequence)
  Pass Criteria: Typing indicator animates correctly

Test B6.20 — Logout
  Action: Click logout in sidebar
  Expected: Session ends (token cleared)
  Expected: Redirects to /portal (login screen)
  Expected: Cannot navigate back to dashboard (protected route)
  Pass Criteria: Secure logout

UX QUALITY AUDIT — CLIENT PORTAL:
  □ Does the portal look enterprise-grade or like a beginner side project?
  □ Is the dashboard information hierarchy clear? (Most important info first)
  □ Does the kanban board feel as smooth as Trello or Notion?
  □ Is the invoice section clear enough that a non-technical client can pay?
  □ Does the messages section feel as natural as Slack or iMessage?
  □ Would a client feel TRUST in this portal with their project data?
  □ Is navigation between sections fast and intuitive?
  TARGET: Portal must feel like Notion/Linear quality, not a college project.
```

---

# ════════════════════════════════════════════════════════
# SECTION C: CROSS-CUTTING CONCERNS
# ════════════════════════════════════════════════════════

## C1. DARK / LIGHT MODE — Cross-Page Tests

```
Test C1.1 — Complete Color Switch
  Toggle to light mode → visit every page
  Check on each page:
  ✓ Background: white/near-white (#F8F9FF) not dark navy
  ✓ Text: dark navy (#0D1530), not white on white
  ✓ Cards: white bg with light border, readable
  ✓ Glass blur: visible on light bg (not invisible)
  ✓ Violet accents: darker violet (#534AB7) for light bg contrast
  ✓ Cyan accents: darker cyan (#007A7A) for light bg contrast
  ✓ Shadows: blue-tinted, soft (not harsh black shadows)
  ✓ Navbar scrolled: white glass, not dark glass
  ✓ Particles: visible (lower opacity to work on white)
  ✓ All buttons: readable text in both states
  Pass Criteria: Complete, usable light mode on all pages

Test C1.2 — No Flash on Load
  Action: Set theme to light mode. Refresh page.
  Expected: Page loads in LIGHT mode immediately (no dark flash first)
  Expected: No "flicker" between themes on load
  Pass Criteria: Zero theme flicker on load (requires SSR or inline script)

Test C1.3 — Transition Quality
  Action: Toggle theme on a content-heavy page
  Expected: All colors transition smoothly (background, text, borders, shadows)
  Expected: Duration: ~400ms
  Expected: No element stays wrong color after transition completes
  Pass Criteria: No stuck elements after theme switch

Test C1.4 — Contrast Compliance
  Use axe DevTools or contrast checker:
  Dark mode: all body text must be ≥ 4.5:1 contrast ratio vs background
  Light mode: all body text must be ≥ 4.5:1 contrast ratio vs background
  Pass Criteria: WCAG AA contrast for all text in both modes
```

---

## C2. RESPONSIVE DESIGN — Device Tests

```
BREAKPOINTS TO TEST: 375px, 428px, 768px, 1024px, 1280px, 1440px, 1920px

Test C2.1 — 375px (iPhone SE)
  ✓ No horizontal scroll on any page
  ✓ All text readable (minimum 14px)
  ✓ Tap targets minimum 44px height
  ✓ Hero headline wraps correctly (no overflow)
  ✓ Cards: 1-column layout
  ✓ Navbar: hamburger menu only (no nav links visible)
  ✓ Forms: full-width fields, no cut-off
  ✓ Portfolio modal: full-screen or near-full-screen
  ✓ Chat widget: doesn't cover form fields
  Pass Criteria: Fully usable on smallest common phone

Test C2.2 — 768px (iPad portrait)
  ✓ Cards: 2-column layout
  ✓ Pricing: 1-column or 2-column (not 3-column squeezed)
  ✓ Contact: stacked layout (info above form)
  ✓ Navbar: hamburger OR compact links
  Pass Criteria: Clean tablet layout

Test C2.3 — 1024px (Desktop minimum)
  ✓ 3-column card grids visible
  ✓ Sidebar visible in portal
  ✓ Split layouts (50/50) active
  ✓ Full navbar visible
  Pass Criteria: Desktop layout correct

Test C2.4 — 1920px (Large monitor)
  ✓ Content stays within max-width container (1320px)
  ✓ No ultra-wide stretching of text or cards
  ✓ Margins/padding comfortable at large size
  Pass Criteria: Container clamps correctly

Test C2.5 — Touch vs Mouse Detection
  On touch device (or pointer: coarse):
  ✓ 3D tilt DISABLED
  ✓ Parallax DISABLED
  ✓ Cards respond to tap (scale press effect)
  ✓ Carousel: swipe gesture enabled
  ✓ Modal: swipe-to-close enabled
  Pass Criteria: Touch-optimized behavior
```

---

## C3. PERFORMANCE AUDIT

```
Test C3.1 — Lighthouse Scores (Run on each page)
  Target scores:
  Performance:     ≥ 90 (desktop), ≥ 75 (mobile)
  Accessibility:   ≥ 95
  Best Practices:  ≥ 95
  SEO:             ≥ 90

Test C3.2 — Core Web Vitals
  LCP (Largest Contentful Paint): < 2.5 seconds
  FID / INP (Interaction to Next Paint): < 200ms
  CLS (Cumulative Layout Shift): < 0.1
  FCP (First Contentful Paint): < 1.5 seconds

Test C3.3 — Animation Performance
  Open Chrome DevTools → Performance tab → Record while scrolling
  Expected: Frame rate stays ≥ 55fps during all animations
  Check: No "long task" blocks (> 50ms) during scroll/hover
  Check: No forced reflows (avoid animating width/height/top/left)

Test C3.4 — Image Optimization
  ✓ All images served in WebP format
  ✓ All images have explicit width + height attributes
  ✓ All below-fold images have loading="lazy"
  ✓ Hero image (if any): preloaded via <link rel="preload">
  ✓ No image larger than 200KB (compress all screenshots)

Test C3.5 — Font Loading
  ✓ Fonts preloaded in <head>: Space Grotesk 700 (critical for hero)
  ✓ All fonts use font-display: swap
  ✓ No invisible text (FOIT) during font load
  ✓ Text always visible (may flash to fallback, then switch to brand font)
```

---

## C4. ACCESSIBILITY AUDIT

```
Test C4.1 — Keyboard Navigation (entire site)
  Press Tab from top of page:
  ✓ Focus moves in logical ORDER (left→right, top→bottom)
  ✓ EVERY interactive element reachable by keyboard:
     nav links, buttons, form fields, accordion items, modal close, carousel
  ✓ Focus ring visible on ALL focused elements (2px cyan outline)
  ✓ Focus ring is visible in BOTH dark and light mode
  ✓ No focus traps (except inside open modal — that's correct)
  ✓ Escape key closes modals and drawers

Test C4.2 — Screen Reader (test with NVDA/JAWS on Windows, VoiceOver on Mac)
  ✓ Page title changes per page (not stuck on "Home" everywhere)
  ✓ Logo: alt text or aria-label "Binary Froster - Homepage"
  ✓ All icon buttons have aria-label (e.g., "Open menu", "Close", "Toggle dark mode")
  ✓ All images have meaningful alt text (not "image1.png")
  ✓ Form fields have associated <label> elements
  ✓ Form errors are announced (aria-live or aria-describedby)
  ✓ Modal: role="dialog", aria-labelledby, aria-modal="true"
  ✓ Accordion: aria-expanded, aria-controls on buttons
  ✓ Carousel: aria-live="polite" on content area

Test C4.3 — Color Contrast Check (use axe DevTools)
  ✓ All body text: ≥ 4.5:1 ratio (WCAG AA)
  ✓ All large text (H1-H2): ≥ 3:1 ratio
  ✓ All interactive elements: ≥ 3:1 against adjacent colors
  ✓ Cyan (#00BFBF) on dark navy: CHECK (it may fail — adjust shade if needed)
  ✓ Violet (#7F77DD) on dark navy: CHECK contrast
  ✓ All check: in BOTH dark and light mode

Test C4.4 — Reduced Motion
  Enable: OS Setting → Accessibility → Reduce Motion
  ✓ Page loader: NOT shown
  ✓ Scroll reveal: elements appear instantly (no translateY animation)
  ✓ 3D tilt: completely disabled
  ✓ Parallax: static backgrounds
  ✓ Marquee: paused or very slow
  ✓ Counter: jumps to final value immediately (no count animation)
  ✓ Button liquid fill: immediate color change (no wave)
  ✓ All transitions: ≤ 100ms (imperceptibly fast)
  Pass Criteria: Site fully usable with reduced motion preference
```

---

# ════════════════════════════════════════════════════════
# SECTION D: UI/UX QUALITY RUBRIC
# ════════════════════════════════════════════════════════

## D1. THE 10 USER-FRIENDLINESS STANDARDS

```
For each standard below, rate Binary Froster 1–10 and describe findings:

STANDARD 1: CLARITY — "Can a visitor understand the site in 5 seconds?"
  Test: Show homepage to someone who doesn't know Binary Froster.
  Ask after 5 seconds: "What does this company do?"
  If they can't answer: FAIL. Redesign hero headline + sub.
  Target answer: "They build custom software and AI tools for businesses."

STANDARD 2: HIERARCHY — "Does the most important information come first?"
  Check each page: does eye travel naturally from most to least important?
  Hero → Services → Proof (portfolio) → Action (CTA) = correct hierarchy
  If pricing is buried → move it up
  If CTA is at bottom only → add above-fold CTA

STANDARD 3: TRUST — "Would a UK/US business owner trust this company?"
  Trust signals to verify are present:
  ✓ Real contact information (email, response time)
  ✓ Portfolio with specific, real-looking projects
  ✓ Transparent pricing (not "contact for pricing" for everything)
  ✓ Professional typography, no spelling errors
  ✓ SSL badge on contact/portal pages
  ✓ UK/US flag indicators (they serve these markets specifically)
  ✓ Consistent, professional visual style (not mismatched colors/fonts)

STANDARD 4: SPEED — "Does the site feel fast?"
  Perceived performance matters as much as actual:
  ✓ Loader communicates progress (not just spinning indefinitely)
  ✓ Skeleton loaders on portal data (not blank white boxes)
  ✓ Transitions are smooth (no janky reflows)
  ✓ Forms respond instantly to input
  ✓ Navigation between pages feels instant (Next.js prefetch)

STANDARD 5: FEEDBACK — "Does the site tell me what's happening?"
  Every action must have feedback:
  ✓ Button click → immediate visual response (not frozen)
  ✓ Form submit → clear progress indication (spinner → success)
  ✓ Form errors → immediate, clear error messages per field
  ✓ Loading states → skeleton or spinner visible
  ✓ Navigation → page loads with progress indication
  ✓ Toggle switch → clear on/off state visually

STANDARD 6: SCANNABILITY — "Can someone find what they need quickly?"
  ✓ Clear section headings on every page
  ✓ Card layouts allow quick scanning (no walls of text)
  ✓ Price ranges visible on service cards
  ✓ Tech stack badges visible without opening anything
  ✓ Portfolio filter works fast (no loading delay on filter)
  ✓ FAQ accordion lets users skip to their question

STANDARD 7: EMOTIONAL DESIGN — "Does the site create positive emotions?"
  ✓ Animations feel delightful, not clinical
  ✓ Microinteractions reward user actions
  ✓ Dark mode feels sophisticated and premium
  ✓ Light mode feels clean and trustworthy
  ✓ Color palette feels tech-forward but not cold
  ✓ Copy tone: confident but not arrogant, expert but friendly

STANDARD 8: MOBILE EXPERIENCE — "Is mobile a first-class experience?"
  ✓ No "squished desktop" — truly mobile-optimized layouts
  ✓ Touch targets are comfortable (minimum 44px, ideally 48px+)
  ✓ Forms are easy to fill on phone keyboard
  ✓ Portfolio modal is usable on phone (not cut off)
  ✓ All CTAs accessible without zooming
  ✓ Phone number/email are tap-to-call/tap-to-email

STANDARD 9: CONSISTENCY — "Does the site feel like ONE unified product?"
  ✓ Same glass card style on every page
  ✓ Same button style (liquid fill) everywhere
  ✓ Same font sizes and weights across pages
  ✓ Same spacing patterns (8px grid maintained)
  ✓ Same animation timings (not different speeds per page)
  ✓ Same terminology (not "Get Quote" on one page, "Request Estimate" on another)

STANDARD 10: CONVERSION — "Does the site turn visitors into leads?"
  ✓ At least 1 CTA visible above the fold on every page
  ✓ Contact form is SHORT (not overwhelming)
  ✓ Trust signals are near the CTA (not just at bottom)
  ✓ "Free trial" or low-commitment offer exists (diet planner free trial)
  ✓ Response time promise is visible (24 hours)
  ✓ No dead ends — every page has a next step
```

---

## D2. VISUAL DESIGN QUALITY CHECKLIST

```
TYPOGRAPHY:
  □ Space Grotesk renders correctly for all headings (no fallback font showing)
  □ Inter renders correctly for all body text
  □ JetBrains Mono renders for badges and prices
  □ No heading is too large (breaks layout on mobile)
  □ No body text too small (minimum 14px)
  □ Line height comfortable (≥ 1.6 for body text)
  □ Letter spacing correct (tighter for headings, normal for body)
  □ No orphaned words (single word on last line) in hero headlines
  □ No ALL CAPS except for eyebrow labels (12px)

COLORS:
  □ Violet and cyan used consistently (not random purple/blue variants)
  □ Glass effect looks like frosted glass (not muddy grey)
  □ Dark mode feels dark blue/navy (not pure black — too harsh)
  □ Light mode feels off-white (not bright white — too clinical)
  □ Gradient text (on headline) animates smoothly
  □ Status colors consistent: green=success, amber=warning, red=error
  □ Tech badges all same violet-tinted style (not random colors)

SPACING:
  □ Sections have generous breathing room (80–120px vertical padding)
  □ Cards have comfortable internal padding (24–32px)
  □ No elements touching edges of screen on any device
  □ Consistent gap between sibling cards (24px standard)
  □ Form fields have enough spacing between them (16–24px)

IMAGERY:
  □ All project screenshots are clean and professional-looking
  □ No pixelated or stretched images anywhere
  □ Phone mockup on SaaS page looks like a real phone
  □ Logo crystal is visible and recognizable at all sizes
  □ No placeholder "lorem ipsum" text visible to users
  □ No "image not found" broken images

GLASS EFFECT QUALITY:
  □ Glass cards have visible blur (background blurred through card)
  □ Top edge highlight visible (inner glow at top = realism)
  □ Border subtle but visible (1px, not 3px)
  □ Cards don't look completely opaque (glass should be semi-transparent)
  □ On light mode: glass still visible (not invisible white on white)
  □ Refraction shimmer tracks mouse (cursor-responsive)

ANIMATION QUALITY:
  □ No animation feels mechanical or robotic (all use appropriate easing)
  □ No animation is too fast (under 150ms for complex animations)
  □ No animation is too slow (over 800ms without reason)
  □ Animations don't cause elements to flicker or flash
  □ Scroll reveal doesn't start too early (not visible before user reaches it)
  □ Liquid button fill looks organic (wave shape, not straight line)
  □ 3D tilt looks 3D (perspective set correctly)
  □ Page transitions feel deliberate, not random
```

---

## D3. COPY & CONTENT QUALITY AUDIT

```
HOME PAGE COPY:
  □ Hero headline: compelling? Would a business owner pause to read it?
  □ Sub-headline: specific? Mentions US & UK?
  □ CTA button text: action-oriented? Not just "Submit" or "Click Here"
  □ Service card descriptions: explain BENEFIT not just feature?
  □ Stats: believable? (15+ projects is modest and honest, not "10,000 clients")
  □ Testimonials: specific enough to feel real? (name + role + company)

SERVICES PAGE COPY:
  □ Service descriptions explain WHO it's for, not just WHAT it is
  □ Price ranges visible (even rough ranges = trust-builder)
  □ Process timeline: reassuring? Does it show Binary Froster is organized?
  □ FAQ answers: complete? Honest? Not evasive?

CONTACT PAGE COPY:
  □ Headline motivates action: "Let's Build Something Together" (yes!)
  □ Response time promise specific: "24 hours" (yes, not "soon")
  □ No jargon in form labels (would a cafe owner understand "Service Needed"? Yes.)
  □ Success message: warm, specific, reassuring

GENERAL COPY RULES:
  □ No typos (run Grammarly or similar across all copy)
  □ British English for UK-facing copy (colour, optimise, etc.) OR consistent US English
  □ No buzzwords without substance ("innovative", "world-class", "cutting-edge" alone)
  □ All prices in £ (British pounds — primary market) with $ equivalent noted
  □ "US & UK" mentioned multiple times across site (trust signal for both markets)
```

---

# ════════════════════════════════════════════════════════
# SECTION E: FINAL COMPLETE TESTING PROMPT (FOR AI TOOLS)
# ════════════════════════════════════════════════════════

```
=== BINARY FROSTER — COMPLETE WEBSITE AUDIT PROMPT ===
=== Use this in: Cursor AI, Bolt.new, v0.dev, ChatGPT-4o, Claude ===

You are auditing the Binary Froster website — a premium IT services company
targeting US & UK small-medium businesses.

CONDUCT FULL AUDIT ACROSS 3 DIMENSIONS:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DIMENSION 1: FUNCTIONALITY (Pass/Fail)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Test every interactive element across all 6 pages:
/ (Home), /services, /portfolio, /products/diet-planner, /contact, /portal

For each element below, state PASS ✓ or FAIL ✗ and explain any failures:

HOME: particle constellation, typewriter headline, marquee ticker,
hero parallax layers, scroll-triggered hero depth recession, service card
hover (3D tilt + glare), stats count-up animation, bento portfolio hover reveal,
portfolio modal open/close (3D rise from bottom), SaaS phone float + orbit border +
food emoji orbits, testimonial auto-carousel, all CTAs route correctly,
newsletter form submit (valid + invalid), footer links

SERVICES: 3D perspective grid background animation, category filter pills
(FLIP animation on filter), real-time search, all 15 service cards present,
card hover (tilt+glare+CTA reveal), "Get a Quote" links pre-fill context,
6-step timeline (SVG path fills on scroll, nodes activate sequentially),
3-tier pricing cards (monthly/yearly glass switch, price number flip,
animated gradient border on Growth card, all 3 CTA buttons), FAQ accordion
(smooth height expand, icon rotation, scroll-triggered 3D entrance)

PORTFOLIO: all 15 projects in grid, category filter (FLIP re-layout),
card count badge updates, card hover (overlay slide-up reveal + tilt),
screenshot inner parallax on scroll, modal opens (3D rise), screenshot
carousel works (swipe on mobile), all 4 modal close methods, "Build
Something Similar" button routes to /contact

SAAS PAGE: hero phone float + orbit border + 4 food emoji orbits, parallax
layers (phone at 0.6×), 5 scroll-snapped feature panels (phone crossfades
per panel, phone rotates per panel), how-it-works SVG path draws on scroll,
pricing toggle (price flip animation + Save 20% badge), testimonial carousel,
final email CTA submit sequence (liquid→spinner→checkmark), form validation

CONTACT: two-column layout responsive, animated dot-grid in left panel,
3 info cards (email clickable), all 6 form fields present, floating labels
on all inputs, cyan glow on focus, full validation (all required fields,
email format, min-length checks), budget slider (track fills, thumb bounces,
value display updates), auto-resize textarea, form submit 5-state sequence
(liquid→spinner→checkmark→message), chat bubble (opens + closes), keyboard
navigation through all form fields

PORTAL (LOGIN): glass card entrance animation, floating labels, all
validation (empty, invalid email, wrong password, valid), Google SSO button,
3D flip transition login→dashboard, forgot password flow

PORTAL (DASHBOARD): sidebar navigation (all items, active states, responsive
collapse), stats row skeleton loaders then data, project cards (progress bars,
status badges, click navigation), activity feed entries, messages preview

PORTAL (KANBAN): 4 columns present, drag-and-drop (card lift+rotate, drop target
highlight, spring settle, count updates), circular progress rings animated,
card detail view on click

PORTAL (INVOICES): table renders correctly, status badges (correct colors),
PDF download works, "Pay Now" opens Stripe, payment completes, status
transitions Pending→Paid with animation

PORTAL (MESSAGES): thread list renders, unread indicator, click thread opens
in panel, messages display as bubbles, typing indicator animates, send
message works, file attachment visible

GLOBAL: page loader (first visit only, binary rain, logo draws, exit blur),
liquid glass switch (spring overshoot, icon crossfade, localStorage persist,
no flash on load), all scroll reveals (correct threshold, stagger, once-only),
3D card tilt (all tilt-enabled cards, ±13° max, spring reset, touch disabled),
parallax (three layers correct speeds, touch disabled), marquee (seamless
loop, hover pause, edge fade), dark mode complete (all colors correct per
token), light mode complete (all colors correct per token)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DIMENSION 2: VISUAL QUALITY (Score 1–10 per page)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
For each page, score 1–10 on:
  A. First impression (does it look premium and trustworthy immediately?)
  B. Readability (can all text be read comfortably in both modes?)
  C. Visual consistency (same design language throughout?)
  D. Motion quality (do animations feel smooth and intentional?)
  E. Responsive quality (does it look good on mobile?)

Provide specific improvement suggestions for any score below 8.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DIMENSION 3: USER-FRIENDLINESS (Describe findings)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Evaluate against these 10 user-friendliness standards:
  1. Clarity: Can someone understand Binary Froster in 5 seconds?
  2. Hierarchy: Most important info → least important, per page?
  3. Trust: Would a UK/US business owner trust this company?
  4. Speed: Does the site feel fast (perceived + actual performance)?
  5. Feedback: Every action has visual feedback?
  6. Scannability: Can users find what they need quickly?
  7. Emotional design: Does the site create positive emotions?
  8. Mobile experience: Is mobile truly first-class?
  9. Consistency: Does it feel like one unified product?
  10. Conversion: Does every page have a clear next step / CTA?

For each standard: PASS / NEEDS WORK / FAIL with specific examples.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Section 1: FUNCTIONALITY REPORT
  → List each test with ✓ PASS or ✗ FAIL + fix description

Section 2: VISUAL QUALITY SCORECARD
  → Table: Page | First Impression | Readability | Consistency | Motion | Mobile | Avg
  → List specific improvement suggestions per page

Section 3: USER-FRIENDLINESS REPORT
  → Rate each of the 10 standards
  → Priority Issues list: top 5 UX problems to fix FIRST (highest impact)
  → Quick Wins list: top 5 improvements that take under 1 hour each

Section 4: CRITICAL FIXES (must fix before launch)
  → Any FAIL in functionality
  → Any score below 6 in visual quality
  → Any UX standard marked FAIL

Section 5: NICE-TO-HAVE IMPROVEMENTS (post-launch)
  → Everything else

=== END AUDIT PROMPT ===
```

---

*Binary Froster — Complete Functionality & UX Testing Prompt*
*Version 1.0 | April 2026*
*Use before every release, after every major change, and when onboarding QA testers.*
