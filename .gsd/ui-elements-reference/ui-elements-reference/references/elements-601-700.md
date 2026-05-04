# UI Elements Reference: #601–#700

---

## Category 61: Advanced Animation & Motion Patterns (#601–#610)

**#601 Spring Physics Animation**
Animations driven by spring physics (stiffness, damping, mass) rather than cubic-bezier curves — creating natural, organic motion that overshoots and settles like a physical object. React Spring and Framer Motion implement this.
Impact: Animations feel alive and physically grounded — eased cubic curves feel mechanical by comparison.

**#602 Layout Animation (FLIP)**
When elements change position (due to list reordering, filter changes, or layout shifts), they animate from their old position to their new one using the FLIP technique — First, Last, Invert, Play.
Impact: Layout changes feel continuous rather than disorienting jumps — spatial context preserved.

**#603 Shared Element Transition**
An element that exists in both a list view and a detail view (thumbnail, card title) animates between its two states — expanding from its list position to fill the detail view. Material Design's Hero transition.
Impact: Navigation context maintained — origin and destination visually connected.

**#604 Stagger / Cascade Reveal**
A set of elements (list items, feature cards, team photos) that animate in sequence with an offset delay — creating a cascade effect that reads as a single choreographed motion.
Impact: Group of elements feels curated and intentional — simultaneous pop-in feels random.

**#605 Exit Animation**
Elements don't just appear — they also have exit animations (fade out, slide away, scale down) when removed from the DOM. Animating out communicates removal rather than silent disappearance.
Impact: Removal confirmed by animation — users understand what happened and where it went.

**#606 Gesture-Driven Animation**
Animations driven by touch/pointer gesture velocity — faster flicks produce faster exit animations; slower swipes follow the finger with resistance. Matches physical intuition.
Impact: Gesture response feels authentic — digital objects behave like physical ones.

**#607 Path Animation (SVG Draw-in)**
SVG paths animated to draw themselves — logos assembling, lines connecting, diagrams building up. Path length calculated and animated with stroke-dashoffset.
Impact: Illustrations become interactive moments — static SVGs transformed into narrative.

**#608 Morphing Shape Animation**
Shapes that transition between forms — a circle becoming a square, a play button becoming a pause button, a hamburger assembling into an X. SVG path morphing using interpolation.
Impact: State changes communicated through transformation — binary flips replaced by continuity.

**#609 Parallax Depth Layers**
Multiple content layers moving at different speeds on scroll (foreground faster, background slower) — creating a 3D depth illusion with CSS 3D transforms and layered z-index.
Impact: Scroll experience becomes spatially immersive — flat layouts made dimensional.

**#610 Keyframe Orchestration**
Complex animations composed of multiple coordinated keyframes across several elements — timed via animation-delay to create a choreographed sequence rather than simultaneous chaos.
Impact: Multi-element animations read as intentional design — not colliding random movement.

---

## Category 62: Advanced Layout Techniques (#611–#620)

**#611 CSS Subgrid**
Child elements of a grid item that participate in the parent grid's row/column tracks — enabling truly aligned multi-level grid layouts without JavaScript measurement.
Impact: Complex nested grid alignments achievable in pure CSS — JavaScript measurement eliminated.

**#612 Intrinsic / Content-Driven Layout**
Layouts using min-content, max-content, and fit-content keywords to let content determine its own dimensions — not constraining content to arbitrary fixed widths.
Impact: Components adapt to their content naturally — no overflow clipping of unexpected content.

**#613 Multi-Column Text Layout**
Long text content laid out in 2–4 columns using CSS multi-column, like a newspaper — improving scannability for reference content at wide viewport widths.
Impact: Wide-screen readability improved — single column at full width creates uncomfortably long lines.

**#614 Asymmetric Grid Layout**
Intentionally unequal column ratios (3:5, 1:2:1, 2:3) creating visual tension and hierarchy — breaking the tyranny of equal columns for editorial and marketing pages.
Impact: Layouts feel designed and distinctive — equal-column grids read as template defaults.

**#615 CSS Grid Auto-Placement**
Leveraging CSS grid's auto-placement algorithm for masonry-adjacent layouts — items placed automatically in the most appropriate empty cell without JavaScript.
Impact: Dynamic content length accommodated without calculating positions.

**#616 Sticky Positioning for Feature Rows**
Feature sections where the heading/CTA is sticky while the feature list scrolls past — or a visual sticks while descriptive text scrolls alongside. Common in SaaS landing pages.
Impact: Key content stays visible while supporting details scroll — message reinforced continuously.

**#617 Full-Bleed Section Breaking**
Content within a centered max-width layout that intentionally breaks out to full viewport width for specific sections (hero, gallery, banner). Creates dramatic visual rhythm.
Impact: Full-width sections punctuate the layout — creating emphasis and breaking monotony.

**#618 Overlapping Section Layers**
Sections that visually overlap each other with negative margins or transform offsets — creating a sense of depth and connection between adjacent sections.
Impact: Page feels layered and three-dimensional — sharp section breaks feel flat and disconnected.

**#619 Article Reading Width Constraint**
Body text constrained to 65–75 characters per line (approximately 650–700px at 16px body) — the typographically optimal line length for reading comprehension.
Impact: Reading comfort maximized — too-wide lines require eye tracking that fatigue readers.

**#620 Content-Above-Fold Prioritization**
Critical content (headline, CTA, key value prop) positioned to be fully visible without scrolling on the primary target device — below-fold placement of non-critical elements.
Impact: Core message delivered without scroll dependency — users understand value immediately.

---

## Category 63: Color System Design (#621–#630)

**#621 OKLCH Color Space Usage**
Using OKLCH color values for perceptually uniform color manipulation — hue rotations that maintain perceived lightness, color interpolations that don't muddy through grey.
Impact: Color ramps and gradients look intentionally balanced — not accidentally muddy.

**#622 Adaptive Color System**
A color system where colors are defined as semantic roles (background, surface, primary, secondary) that automatically adjust values for dark mode — rather than separate dark mode overrides.
Impact: Dark mode built into the system — not patched on afterward.

**#623 Color Contrast Automation**
Tooling that automatically selects text colors (black or white) based on the background color's luminance — ensuring WCAG AA contrast without manual per-combination decisions.
Impact: Accessible text color automatic regardless of user-selected background color.

**#624 Tonal Palette Generation**
From a seed color, generating 9–13 tonal steps (10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 990) using perceptual lightness progression — Material Design 3's baseline.
Impact: Complete, harmonically balanced color scale from a single brand color.

**#625 Surface / Container Color Architecture**
A layered surface color system (background → surface → elevated surface → overlay) where elevation is conveyed through tonal steps rather than shadows alone.
Impact: UI depth and hierarchy communicated purely through color in dark mode — shadows invisible on dark backgrounds.

**#626 Brand Color Extraction from Logo**
Using color extraction tools to derive the full design system palette from the brand's primary logo colors — ensuring system and brand are harmonically aligned.
Impact: Design system and brand identity coherent from the first design token.

**#627 High-Contrast Mode Color Pairs**
Pre-defined, tested high-contrast color pair combinations (white on dark navy, black on bright yellow) that meet WCAG AAA (7:1) contrast ratio requirements.
Impact: WCAG AAA compliance achievable with verified safe color pairs — no ratio calculation needed.

**#628 Gradient Direction Consistency**
A system rule for gradient direction — all accent gradients flow in the same direction (135° diagonal, or top-to-bottom) creating visual harmony across gradients in the product.
Impact: Gradients feel intentional system elements — not individually chosen decorations.

**#629 Color Blind Simulation Testing**
Viewing the full UI through color-blindness simulation filters (deuteranopia, protanopia, tritanopia) — verifying that all information is still distinguishable without color.
Impact: Colorblind accessibility verified systematically — individual component checks insufficient.

**#630 Neutral Palette with Brand Warmth**
Grey scales with a slight warm or cool tint derived from the brand hue — "greiges" instead of pure grey — making neutrals feel intentionally on-brand rather than generic.
Impact: Every color in the system feels brand-related — generic grey disappears.

---

## Category 64: Typography Systems (#631–#640)

**#631 Variable Font Usage**
Web fonts loaded as variable fonts (single file with continuous axes for weight, width, optical size) rather than multiple static files — better performance and infinite stylistic granularity.
Impact: Multiple font weights loaded from one file — significant performance improvement.

**#632 Optical Size Axis**
Using the optical size axis (opsz) of variable fonts to render slightly different letterforms at different scales — captions use optically adjusted forms, display text uses high-contrast version.
Impact: Typography optimized for each size context — not one-size-fits-all letterforms.

**#633 Leading (Line-Height) Scaling**
Line-height that decreases as font-size increases — headings at 1.1× line-height, body at 1.6× line-height. Tight headlines, airy body text.
Impact: Typography hierarchy amplified through density contrast — not just size.

**#634 Tracking (Letter-Spacing) by Context**
Uppercase labels and captions have increased letter-spacing (0.08em+) for legibility; large display headings have negative tracking (−0.02em to −0.05em) for visual cohesion.
Impact: Every text context reads as typographically considered — not uniform spacing applied blindly.

**#635 Fluid Modular Type Scale**
A modular type scale (1.25× or 1.333× ratio) applied with fluid clamp() values — each level maintains its ratio relationship at all viewport widths.
Impact: Type hierarchy coherent at every size — ratios maintained through responsive scaling.

**#636 Content Hierarchy via Weight Contrast**
Using contrasting font weights (300 vs 700) for visual hierarchy rather than solely size — a bold label next to light body creates strong contrast without size difference.
Impact: Hierarchy communicated through weight — size alone is a crude hierarchy tool.

**#637 Numbered / Styled Lists**
Custom-styled ordered lists (large, bold numerals; branded colored bullets) that make step-by-step content feel purposeful and visually distinct from body text.
Impact: Procedural content scannable and steps visually countable.

**#638 Dropcap with Proper Lead-In**
An initial dropcap that spans 2–3 body text lines, with the text wrapped tightly around it — with a small cap lead-in for the first word after the dropcap.
Impact: Article openings establish premium editorial quality in the first character.

**#639 Code vs. Prose Font Distinction**
Inline code (monospaced) rendered in a distinctly different typeface from surrounding prose — creating unmissable visual distinction between copyable code and explanatory text.
Impact: Code vs. prose boundary instantly clear — copy intent never ambiguous.

**#640 Responsive Headline Condensation**
Headline fonts that use a condensed width variant (via variable font width axis or separate condensed weight) on mobile — maintaining large display sizes in narrow viewports.
Impact: Impact headlines preserved on mobile without wrapping to four lines.

---

## Category 65: Spatial & Depth Design (#641–#650)

**#641 Z-Index Architecture**
A defined, named z-index scale (base, raised, dropdown, sticky, modal, toast, tooltip) preventing z-index wars and overlap chaos as the component library grows.
Impact: Overlay stacking order predictable system-wide — z-index 9999 wars eliminated.

**#642 Shadow Elevation Tokens**
Named shadow tokens mapped to elevation levels (shadow-sm: card, shadow-md: dropdown, shadow-lg: modal) using multi-layer box-shadows with ambient + key light simulation.
Impact: Physically plausible shadows at every depth level — single-value shadows look flat.

**#643 Inner Shadow for Inset Elements**
Inset box-shadow on input fields, pressed buttons, and container wells — communicating depth inward (content is inside) rather than raised (content is above).
Impact: Inset vs. raised elements distinguishable by shadow direction — spatial logic consistent.

**#644 Frosted Glass Depth Layers**
Multiple glassmorphism layers with varying blur radii and opacity — nearer layers are less blurred, farther layers more blurred — simulating optical depth of field.
Impact: UI layers communicate physical distance — foreground feels closer, background recedes.

**#645 Perspective Transform on Scroll**
Applying slight CSS perspective transforms to sections as they scroll into view — tilting from perspective to flat as they enter, simulating objects tilting to face the viewer.
Impact: Scroll reveal feels three-dimensional — standard fade-in becomes spatial entry.

**#646 Layered Card Stack**
Multiple cards displayed as a stacked deck (slight rotation and offset for each layer below the top) — communicating plurality and depth without showing all items simultaneously.
Impact: "Multiple items behind this" communicated spatially — list count expressed in z-depth.

**#647 Depth of Field Blur**
Background elements slightly blurred when a foreground element (modal, popover, tooltip) is active — simulating photographic depth of field and focusing attention on the foreground.
Impact: Attention directed to the active element — background context present but subordinated.

**#648 3D Product Card Flip**
Product or feature cards that flip on hover to reveal a back face with additional information (price, CTA, description) — using CSS 3D transform rotateY() with backface-visibility.
Impact: Secondary information available without layout space — front/back delivers double content.

**#649 Neumorphic Toggle States**
Toggle buttons using inset shadow for "pressed/on" and outset shadow for "raised/off" states — tactile state differentiation through shadow direction rather than color.
Impact: Toggle state readable through shadow — not color dependent.

**#650 Background Blur Vignette**
A subtle radial gradient darkening/blurring toward the edges of the page or section — focusing visual attention on the center content.
Impact: Natural eye guidance toward center — peripheral content recedes without hiding.

---

## Category 66: Micro-Interaction Design (#651–#660)

**#651 Toggle Switch Thumb Animation**
The toggle switch thumb slides with momentum — overshooting slightly then springing back to settled position. The "on" and "off" states have distinct thumb sizes (slightly larger when on).
Impact: Toggle has physical weight — flipping it feels like a real switch.

**#652 Accordion Eased Expand**
Accordion panels expand with a smooth height animation eased from 0 to auto using a max-height trick or ResizeObserver-measured animation — not a jarring instant expand.
Impact: Content reveal feels gentle — abrupt panel opens feel like errors.

**#653 Drag Resistance Start**
When initiating a drag, a small resistance delay before the element "picks up" — mimicking the static friction of physical objects. Prevents accidental drags from intentional clicks.
Impact: Accidental drags eliminated — clicks and drags feel meaningfully different.

**#654 Input Caret Custom Styling**
Custom styled text cursor (caret) — brand-colored, wider, or animated blinking at a custom rate. A small branding touch in focused input fields.
Impact: Brand personality extends to the cursor — text input feels proprietary.

**#655 Scrollbar Custom Styling**
Custom scrollbar thumb and track styling (thin, rounded, brand-tinted) — replacing browser default scrollbars. Used carefully to maintain visibility.
Impact: Scrollbars match visual design — browser default scrollbars break visual consistency.

**#656 Link Underline Offset Animation**
Links where the underline slides in from left to right on hover, or the underline offset changes smoothly — rather than the underline simply appearing instantly.
Impact: Link hover state feels intentional — animated underlines establish brand polish.

**#657 Focus Ring Expansion**
Focus rings that expand outward from the element (growing scale) rather than simply appearing — communicating that focus has arrived at this element from elsewhere.
Impact: Focus state communicates arrival — keyboard navigation feels spatial.

**#658 Checkbox Fill Animation**
Checkboxes that fill from the center outward (not instant fill) with a slight overshoot — and the checkmark drawing itself into the filled box.
Impact: Checking a box becomes a satisfying micro-ceremony — completion ritualized.

**#659 Notification Badge Bounce**
When a new notification arrives and increments the bell badge count, the badge bounces (scale up then settle) to draw attention to the change.
Impact: Count change noticed without constant badge monitoring — motion draws the eye.

**#660 Menu Item Hover Slide**
Menu items where the background highlight slides in from the left (or from the previous hovered item) rather than each item independently highlighting.
Impact: Menu hover feels physically continuous — shared slide context connects items spatially.

---

## Category 67: Interactive Data Patterns (#661–#670)

**#661 Brushable Chart Selection**
Click-and-drag on a chart to "brush" a time range or data range — selected data highlights while non-selected data dims. Zooms or filters to the brushed range.
Impact: Precise sub-range exploration without slider handles — direct chart interaction.

**#662 Crosshair Tooltip on Chart Hover**
A vertical (and optional horizontal) crosshair line following cursor position on a chart — with a tooltip showing all series values at that x-position simultaneously.
Impact: Multi-series comparison at any point trivial — individual data point identification instant.

**#663 Threshold / Target Line Annotation**
A horizontal reference line on charts annotating a target, average, or threshold value — with a label. Makes "above/below target" immediately visually obvious.
Impact: Performance vs. target readable at a glance — no mental comparison to stored number.

**#664 Data Table with Row Grouping**
Rows grouped by a shared attribute (department, date, status) with group header rows showing group-level aggregations and expand/collapse controls.
Impact: Hierarchical data understandable in table format — flat list loses group context.

**#665 Pivot Table UI**
A drag-and-drop interface for pivoting rows to columns and vice versa — Excel-style pivot functionality in the browser for ad-hoc analysis.
Impact: Non-technical users build custom analyses without SQL or spreadsheet exports.

**#666 Chart Annotation Tool**
Users can click on chart data points to add text annotations — notes explaining spikes, drops, or events. Stored as metadata and rendered as labeled markers.
Impact: Business context added to data — anomalies explained rather than left mysterious.

**#667 Mini Bar Chart in Table Cell**
A small horizontal bar rendered inside a table cell proportional to the cell's value relative to column max — combining table precision with chart spatial encoding.
Impact: Relative magnitude visible without a separate chart column — table becomes self-visualizing.

**#668 Interactive Legend Toggle**
Chart legends where clicking a series name toggles its visibility on/off — allowing users to isolate specific series and reduce visual complexity on multi-series charts.
Impact: Individual series isolatable — crowded charts with 8+ lines become readable.

**#669 Zoom & Pan on Chart**
Mouse wheel zoom (into time range) and click-drag pan on time-series charts — allowing drill-in from year view to day view without separate chart instances.
Impact: Any time range explorable from one chart instance — zoom level is a navigation dimension.

**#670 Export Chart as Image**
A download button on charts exporting the current chart state (including any applied filters or zoom level) as a high-resolution PNG or SVG for use in presentations.
Impact: Chart screenshots replaced by properly exported visuals — no screen-grab degradation.

---

## Category 68: Security & Privacy UI (#671–#680)

**#671 Password Manager UX Design**
Forms built to work correctly with password managers — no autocomplete="off" overrides, proper input type="password", and page-level field identification matching password manager expectations.
Impact: Password manager users login instantly — autocomplete="off" breaks their entire workflow.

**#672 Privacy Mode / Incognito View**
A UI toggle that masks sensitive data (balances, personal info, health data) behind a blur or placeholder — for screen-sharing scenarios or public viewing.
Impact: Users share screens without exposing sensitive information — work in public safely.

**#673 Audit Log UI**
A chronological log of all security-relevant actions: logins, permission changes, data exports, admin actions — with actor, IP, timestamp, and action description. Filterable.
Impact: Security incidents reconstructable — accountability for all privileged actions.

**#674 Role-Based UI Visibility**
UI elements (buttons, sections, menu items) that are hidden or disabled based on the user's permission role — not just server-side but in the interface itself to reduce confusion.
Impact: Users see only actions they can perform — no "permission denied" dead ends.

**#675 Consent Management UI**
A granular privacy preference center built on a proper CMP — showing purpose, legal basis, retention period, and data processors per tracking category. Not just "Accept All."
Impact: GDPR/CCPA compliance with user trust rather than dark pattern acceptance.

**#676 Data Sensitivity Labels**
Visual labels on documents, records, or fields indicating their sensitivity level (Public, Internal, Confidential, Restricted) — color-coded with handling instructions.
Impact: Data classification communicated at the item level — handling expectations set at point of access.

**#677 Secure Input Visual Confirmation**
After entering a password or sensitive code, a brief "secure entry confirmed" checkmark animation — distinct from regular validation. Communicates security is working.
Impact: Security processes feel visible and confirmed — invisible security creates anxiety.

**#678 Redacted / Masked Data Display**
Sensitive data (SSN, credit card, API key) displayed as partially redacted (•••• •••• •••• 4242) with a "reveal" button requiring re-authentication. Security by default.
Impact: Sensitive data protected from casual viewing — reveal is a deliberate, authenticated action.

**#679 HTTPS / Secure Connection Indicator**
Explicitly surfacing the security status of the connection within the app UI (not just relying on browser padlock) for sensitive pages — "Your connection is encrypted."
Impact: Users who don't notice browser chrome are reassured at the application level.

**#680 Permission Scope Explainer**
When requesting OAuth scopes or device permissions, a plain-language explainer for each scope: "We're asking for calendar access to: show your availability to teammates."
Impact: Permission requests granted confidently — users understand what they're authorizing.

---

## Category 69: Empty, Zero & First-Run States (#681–#690)

**#681 Illustrated Empty State**
A purpose-built illustration for each specific empty context — an empty inbox differs from an empty project list differs from no search results. Generic "nothing here" illustrations feel lazy.
Impact: Empty states guide users toward filling them — blanks don't inspire blank stares.

**#682 Call-to-Action within Empty State**
Empty states include the primary CTA needed to fill them: "No projects yet — Create your first project." The action is in the empty state, not separately navigated to.
Impact: Path from empty to filled is zero clicks away — creation is right there.

**#683 Sample / Demo Data Prompt**
For dashboards and data tools, an empty state offering "Load sample data" to see what the product looks like when full — then clear and import real data.
Impact: Feature value demonstrated before user data exists — cold start paralysis resolved.

**#684 "Getting Started" First-Run Banner**
A dismissable banner appearing for new users on their first few sessions — offering a checklist, video tour, or help article links. Disappears once key actions are completed.
Impact: Onboarding guidance persists without being intrusive — users encounter it when ready.

**#685 Zero State with Context**
When a filtered view returns zero results (not no data), a zero state that explains why: "No issues match 'status: open + assignee: you' — try changing the filters." With clear filter reset.
Impact: Filtered zeros distinguished from empty data zeros — users debug their filter, not assume no data.

**#686 First Success State**
The very first time a user completes a core action (first task completed, first report generated, first email sent), a special celebratory state acknowledging the milestone.
Impact: First success moments celebrated — the "aha moment" is reinforced and memorable.

**#687 Personalized Empty Prompt**
Empty states that reference the user's name or context: "Hey Shivam, you haven't added any team members yet." Personal address turns generic emptiness into a directed invitation.
Impact: Empty state feels like a message to the user — not a system status message.

**#688 Progress-Toward-Value Empty State**
For features that unlock after setup steps, empty states show a visual progress of what's been done vs. what remains: "Do 2 more things to unlock your first report."
Impact: Empty features feel close to useful — steps to activation visible and achievable.

**#689 Guided First Action Flow**
Immediately after signup, a mandatory or strongly suggested first action sequence (create first X) — keeping users in motion rather than landing in an empty dashboard.
Impact: Activation rates improve when first action is prescribed rather than left to exploration.

**#690 Celebration on Data First-Load**
When a user's first real data appears (first metric, first transaction, first user), a brief celebration animation and "Your data is in!" state — marking the transition from setup to real use.
Impact: Data arrival is a milestone — celebrating it reinforces product value at a critical moment.

---

## Category 70: Platform & System Integration UI (#691–#700)

**#691 OAuth Integration Cards**
A grid of integration cards (Slack, Google, Salesforce, HubSpot) each showing: logo, name, description, connection status badge, and Connect/Disconnect button.
Impact: Integration ecosystem visible and manageable from one screen.

**#692 Webhook Event Log**
A filterable log of all webhook events with: timestamp, event type, target URL, HTTP status code, response time, payload preview, and retry button for failed deliveries.
Impact: Integration debugging self-served — engineers diagnose webhook issues without log access.

**#693 Import Wizard**
A step-by-step import flow: select source (CSV, Excel, Google Sheets, Salesforce) → map fields → preview → validate → import with row-level error reporting.
Impact: Data migrations self-served with zero developer involvement.

**#694 Native App Download CTA**
A smart banner detecting the user's OS and showing a device-specific download prompt (App Store for iOS, Google Play for Android, .dmg for macOS) — auto-detected, relevant.
Impact: App download offered at the right moment — not generic "Download our app."

**#695 Browser Extension Install Prompt**
A contextual CTA for installing the companion browser extension — shown at the right moment with value proposition and one-click install for detected browser (Chrome, Firefox, Safari).
Impact: Extension adoption highest when promoted in-product at relevant moments.

**#696 Desktop App Deep Link**
URLs that open the desktop application directly to the relevant content (specific document, conversation, project) — bypassing the web version for users with the native app installed.
Impact: Native app users stay in native app — web URLs don't force web experience.

**#697 Embedded Third-Party Widgets**
Thoughtfully embedded external widgets (Intercom chat, Calendly booking, Typeform survey) styled to match the surrounding UI — not jarring chrome-break iframes.
Impact: Third-party tools feel native — jarring iframe embeds break the product experience.

**#698 API Status Page Link**
A link to a public status page (status.product.com) accessible from the app's footer or help menu — showing real-time system health and incident history.
Impact: Trust maintained during incidents — users check status instead of assuming the worst.

**#699 System Health Dashboard**
An internal (admin-visible) dashboard showing: API error rates, response times, queue depths, background job status, and active user count — real-time operational metrics.
Impact: Operations team monitors system health without infrastructure dashboard access.

**#700 SSO / Enterprise Login UI**
A login flow with "Sign in with SSO" option — entering work email domain detects the SSO provider and redirects to the correct identity provider automatically. Okta/Azure AD standard.
Impact: Enterprise users log in with corporate credentials — no separate password to manage.
