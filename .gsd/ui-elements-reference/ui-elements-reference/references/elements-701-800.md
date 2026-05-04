# UI Elements Reference: #701–#800

---

## Category 71: Email Client & Inbox UI (#701–#710)

**#701 Email Compose Window**
A floating or full-page compose window with: To/CC/BCC fields with contact autocomplete, subject line, rich text body editor, attachment dropzone, inline image paste, scheduled send picker, and send button with keyboard shortcut (Ctrl+Enter). Includes a discard confirmation on close if content exists.
Impact: Full composing workflow in one surface — no tool-switching mid-email.

**#702 Thread Grouping / Conversation View**
Email messages with the same subject grouped as expandable threads — showing only the latest message by default with a "Show all X messages" toggle. Reduces inbox visual noise by collapsing chains.
Impact: Inbox items represent conversations — not individual message counts. Cognitive load halved.

**#703 Email Preview Pane**
A split-view layout with message list on the left and selected email rendered on the right — no separate page load required per message. Reading pane orientation switchable (right or bottom).
Impact: Email triage speed doubles — eyes don't leave the list to read a message.

**#704 Snooze Email**
A right-swipe or hover action on an email to schedule it to reappear at a specified time (Later today / Tomorrow / Next week / Custom) — temporarily removed from inbox until then.
Impact: Inbox Zero achievable without losing track of actionable messages.

**#705 Email Labels / Tags with Color**
Multi-label tagging system with color-coded labels applied as left-border accents or pill tags in the message list. Labels persist visually — filter to a label in one click.
Impact: Manual folder hierarchy replaced by flexible, multi-dimensional tagging.

**#706 Unsubscribe / Block Sender**
A one-click "Unsubscribe" or "Block sender" action in email hover state — automating list removal or sender blocking without opening the email or scrolling to a tiny footer link.
Impact: Inbox noise reduced without manual list management.

**#707 Email Alias / Send As Selector**
A dropdown in the compose window for selecting which email address to send from when the user has multiple connected addresses or aliases. Defaults to the address the thread arrived at.
Impact: Professional communication maintained — correct identity used per context.

**#708 HTML Email Preview Toggle**
Toggle between rendered HTML view and plain text fallback view when reading an email — showing what the sender sent vs. what the fallback looks like.
Impact: Email deliverability and rendering issues diagnosed directly in the client.

**#709 Email Templates / Canned Responses**
A library of saved email templates accessible from the compose window via a shortcut or toolbar button — with variable placeholders and a search bar for quick retrieval.
Impact: Repetitive email drafting replaced by template selection — response time cut dramatically.

**#710 Smart Reply Suggestions**
AI-generated one-click reply options appearing below received emails ("Sounds good!", "I'll review by Friday", "Can we reschedule?") — composed contextually from the thread.
Impact: Short, conversational replies sent in one click — low-effort acknowledgments stop delaying.

---

## Category 72: Canvas & Creative Tool UI (#711–#720)

**#711 Artboard / Frame Management**
A canvas that contains multiple named artboards/frames representing different screens, pages, or states — visible in a left-side page list with thumbnail previews. Figma's frames pattern.
Impact: Multi-screen projects organized in one canvas — no separate file per screen.

**#712 Smart Alignment Guides**
Dynamic alignment guides that appear as elements are dragged near edges, centers, or equal-distribution positions of other elements — auto-snapping to maintain alignment.
Impact: Precise alignment without rulers — manual pixel measurement eliminated.

**#713 Component Instance Overrides**
A component system where instances of a master component inherit all properties but allow local overrides (text, color, visibility) — changes to the master propagate except where overridden.
Impact: Design system enforcement with local flexibility — global + specific changes coexist.

**#714 Layers Panel**
A hierarchical panel showing all elements in the canvas as a tree of named layers — with visibility toggles, lock toggles, drag-to-reorder, and group nesting.
Impact: Complex canvases navigable — clicking a layer selects the element directly.

**#715 Object Constraints & Responsive Resize**
Elements with constraint settings (pin to left/right/top/bottom/center, scale proportionally) that determine how they reflow when their parent container resizes.
Impact: Responsive layout behavior defined at the design stage — no hand-off ambiguity.

**#716 Color Styles / Shared Swatches**
A saved palette of named color styles accessible from any element's fill picker — updating a style propagates the change to all elements using it.
Impact: Color updates apply globally — no hunting for every element using the old color.

**#717 Text Styles Library**
Named text styles (Heading 1, Body, Caption, Label) applied from a style panel — a change to the style updates every element using it across all artboards.
Impact: Typography changes system-wide without touching individual text layers.

**#718 Boolean Operations Panel**
A toolbar for combining vector shapes with boolean operations: Union, Subtract, Intersect, Exclude — real-time preview as operations are applied. The path manipulation foundation.
Impact: Complex vector shapes built from simple primitives without manual path editing.

**#719 Pen / Vector Path Tool**
A bezier path drawing tool with: click for corner points, click-drag for smooth curves, Alt-click for cusps — with live path preview and close-path detection near start point.
Impact: Custom vector shapes drawn directly — no external vector editor required.

**#720 Multiplayer Cursor (Design Tool)**
Named cursor indicators showing where each collaborator is on the canvas in real-time — with avatar labels and a "Follow" mode to mirror another user's viewport.
Impact: Design reviews happen simultaneously — async feedback loops replaced by live sessions.

---

## Category 73: AR / VR / Spatial UI Patterns (#721–#730)

**#721 WebXR Entry Point**
A prominent "Enter AR" / "Enter VR" button that requests device immersive session, with a graceful fallback for non-XR devices (3D viewer or static alternative).
Impact: XR experiences accessible from standard web pages — no separate app download.

**#722 Spatial UI Panels (WebXR)**
2D UI panels anchored in 3D space that remain world-locked or head-locked as the user moves — built with Three.js or A-Frame. Menus, labels, and information rendered in 3D space.
Impact: Interface elements coexist with 3D content — 2D chrome doesn't overlay 3D scene.

**#723 Gaze / Dwell Selection**
A cursor that activates elements after dwelling on them for a configurable time (e.g., 1.5 seconds) — for hands-free VR or eye-tracking interfaces where physical buttons aren't available.
Impact: Hands-free interaction enabled — accessibility for users without controller input.

**#724 Product AR Placement (8th Wall / Model Viewer)**
Using the model-viewer web component or 8th Wall to place a 3D product model in the user's real-world camera view — scale-accurate, shadow-casting, rotatable.
Impact: "Will this couch fit in my living room?" answered before purchase — returns reduced.

**#725 3D Model Viewer (model-viewer)**
Google's model-viewer web component displaying GLTF/GLB 3D models in a web page with auto-rotation, user rotation, zoom, AR launch button, and environment lighting.
Impact: 3D product assets viewable on any web page without WebGL expertise.

**#726 Depth-Sorted UI Layers**
UI elements in XR environments properly depth-sorted so nearer elements correctly occlude farther elements — without z-fighting artifacts on coplanar surfaces.
Impact: Spatial depth perception correct — broken depth sorting breaks spatial immersion.

**#727 Spatial Audio Cues**
Directional audio feedback in 3D environments — notifications, interactions, and ambient sounds positioned in 3D space using Web Audio API PannerNode for spatial localization.
Impact: Audio provides directional attention guidance — reduces visual search burden in 3D.

**#728 Hand / Controller Hover State**
Visual highlight on 3D UI elements as the controller ray or hand ray hovers over them — matching the hover state visual language of 2D interfaces in 3D space.
Impact: Interactive elements in 3D discoverable — spatial UI affordances match learned web patterns.

**#729 Passthrough AR Interface**
UI elements composited over the real-world camera passthrough feed on mixed reality headsets — with proper occlusion, lighting estimation, and shadow casting.
Impact: Digital information overlaid on physical environment contextually — instructions visible alongside physical objects.

**#730 XR Loading/Transition Screen**
A branded spatial environment displayed during asset loading in XR — replacing the black void of loading with an atmospheric experience.
Impact: XR entry experience polished — cold void loading replaced by environmental immersion.

---

## Category 74: Voice & Conversational UI (#731–#740)

**#731 Wake Word Indicator**
A microphone icon with animated pulse indicating the system is listening — clearly showing three states: idle (grey), listening (animated blue), processing (spinner).
Impact: Voice interface state unmistakable — users know when to speak.

**#732 Voice Waveform Visualizer**
A real-time audio waveform visualization responding to the user's voice amplitude while recording — providing immediate feedback that audio is being captured.
Impact: Users hear-but-don't-see themselves — waveform confirms microphone is working.

**#733 Speech-to-Text Inline Display**
As the user speaks, transcribed text appears inline in real-time — showing word by word with a trailing cursor, so users can correct misrecognitions immediately after speaking.
Impact: Voice input confidence high — users see transcription before it's submitted.

**#734 Conversational Card UI**
Rich response cards within chat/voice interfaces showing structured data (flight results, weather, product cards, maps) rather than text-only answers to data queries.
Impact: Information density in conversational interfaces increases — not limited to prose answers.

**#735 Intent Confirmation UI**
After voice input, a confirmation step showing what was understood ("You said: Book a meeting with Alex tomorrow at 3pm — Confirm?") before executing irreversible actions.
Impact: Voice command misrecognitions caught before causing unintended actions.

**#736 Suggested Prompts / Quick Replies**
Horizontally scrollable chips of suggested follow-up queries or actions below AI or chatbot responses — reducing blank-input paralysis after receiving a response.
Impact: Conversation momentum maintained — users don't stall wondering what to ask next.

**#737 Voice Command Help Overlay**
A triggered overlay showing all available voice commands organized by category — accessible by saying "help" or tapping a help icon.
Impact: Voice commands discoverable — users aren't limited to guessing valid commands.

**#738 TTS Playback Controls**
Text-to-speech read-aloud button on content with: play/pause, speed control (0.75×–2×), voice selector, and highlighted-word tracking showing current read position.
Impact: Content accessible auditorily — commuters, visually impaired, and multitaskers all benefit.

**#739 Ambient Listening Mode Indicator**
A persistent subtle visual indicator (small colored dot, status bar icon) when the microphone is actively listening in ambient mode — privacy awareness and system state in one element.
Impact: Users always know microphone state — passive listening never feels covert.

**#740 Multi-Turn Context Display**
In voice interfaces, a compact visual history of the conversation thread visible on screen — showing previous turns so users can reference context and continue multi-step interactions.
Impact: Voice interaction memory externalized — users don't re-state context for each turn.

---

## Category 75: Real-Time Collaboration UI (#741–#750)

**#741 Presence Avatars on Document**
A row of active collaborator avatars in the document header — each avatar clickable to jump the viewport to that user's cursor position. Count badge for overflow ("+3 others").
Impact: Who is in the document visible at a glance — collaboration feels social.

**#742 Selection / Highlight Broadcasting**
When one user selects text or objects, their selection is broadcast to all other users in the session with their color highlight — making design discussions reference-precise.
Impact: "This part here" has a visual referent — remote collaboration achieves co-located precision.

**#743 Conflict-Free Replicated Data (CRDT) UI**
Underlying CRDTs (Yjs, Automerge) displayed as seamless real-time sync — characters, blocks, and structures merge without manual conflict resolution when users type simultaneously.
Impact: Simultaneous editing without last-write-wins data loss — true concurrent editing.

**#744 Change Attribution Sidebar**
A sidebar showing recent changes with: who made the change, what changed (diff), and when — with click-to-view jumping to the changed element.
Impact: Document history attributed to individuals — "who moved this?" answered instantly.

**#745 Collaborative Commenting with Resolution**
Threaded comment threads anchored to specific content — with Reply, Resolve, and Reopen actions. Resolved comments archived rather than deleted.
Impact: Review feedback loop tracked from comment → discussion → resolution.

**#746 Live Cursor Chat**
Typing a message directly near your cursor broadcasts it as a small speech bubble floating above your cursor in real-time — ephemeral messages without opening a chat panel.
Impact: Contextual micro-communication happens in-canvas — chat panel context switch avoided.

**#747 Session Recording & Playback**
Collaborative sessions recorded and playable as time-lapse replays — showing all cursor movements, edits, and changes compressed into a short video.
Impact: Async collaborators catch up on session activity without reading a change log.

**#748 Multiplayer Voting / Dot Voting**
In collaborative planning sessions, each user places a configurable number of dot votes on options — results aggregated and displayed in real-time as others vote.
Impact: Democratic group decision-making facilitated without scheduling a meeting.

**#749 Collaborative Whiteboard**
An infinite canvas supporting: sticky notes, shapes, connectors, freehand drawing, image embedding, and embedded frames — all fully collaborative in real-time.
Impact: Distributed brainstorming sessions as productive as in-person workshops.

**#750 Handoff Mode (Dev Inspect)**
A design tool mode where developers can inspect element properties (CSS values, spacing, colors, assets) without editing — with copyable CSS snippets and asset download.
Impact: Design-to-development handoff self-served — spec documents and Zeplin replaced.

---

## Category 76: Spreadsheet & Data Entry UI (#751–#760)

**#751 Formula Bar with Autocomplete**
A dedicated formula input bar showing the formula of the selected cell — with function autocomplete, parameter hints, and syntax highlighting as formulas are typed.
Impact: Complex formulas written with contextual guidance — syntax errors caught pre-entry.

**#752 Cell Reference Highlighting**
When a cell containing a formula is selected, the cells it references are highlighted with color-coded outlines — blue for direct references, orange for indirect.
Impact: Formula dependencies visible spatially — debugging formula chains is immediate.

**#753 Column / Row Freeze**
Pinning specific rows (headers) and columns (identifiers) so they remain visible as the spreadsheet is scrolled in any direction — the essential complement to large data tables.
Impact: Context row/column always visible — data interpretation maintained at any scroll position.

**#754 Conditional Formatting Rules**
Cell background and text color rules triggered by value conditions (>100 = green, <0 = red, contains "error" = yellow) — applied automatically as data changes.
Impact: Data patterns visible without reading every cell — exceptions surface immediately.

**#755 Data Validation Dropdown**
Cell inputs constrained to a dropdown list of valid values — preventing free-text entry of invalid data and providing a picker for controlled vocabulary fields.
Impact: Data entry errors eliminated at input time — downstream data quality improves.

**#756 Named Ranges**
User-defined names assigned to cell ranges (REVENUE_Q1, TEAM_MEMBERS) — used in formulas instead of cell coordinates for readable, maintainable formula logic.
Impact: Formulas read as business logic — cryptic A1:D47 references replaced by REVENUE_Q1.

**#757 Pivot Table Builder UI**
A drag-and-drop interface for defining pivot table structure: row fields, column fields, value fields (with aggregation selector), and filter fields — live-updating as fields are dragged.
Impact: Dimensional analysis self-served by non-technical users — analyst bottleneck removed.

**#758 Chart-from-Selection**
Selecting a data range and clicking "Insert Chart" automatically infers the appropriate chart type from data shape — offering a recommendation with alternatives.
Impact: Data visualization created from selection without manual chart configuration.

**#759 Cell Comment Threading**
Right-click on a cell to add a comment — stored as an attached thread visible as a corner triangle and expandable panel. Resolving a comment archives it from the cell.
Impact: Contextual discussion anchored to specific data — email discussion threads eliminated.

**#760 Spreadsheet Import API Mapping**
When importing external data (API, database, CSV), a visual column-mapping UI shows source fields on the left and target spreadsheet columns on the right with drag-to-map connectors.
Impact: Data pipeline setup without writing ETL code — visual mapping replaces scripting.

---

## Category 77: Advanced Chart & Infographic Patterns (#761–#770)

**#761 Sankey / Flow Diagram**
A flow chart where link widths represent flow volume between nodes — ideal for budget allocation, traffic sources, conversion flows, and energy diagrams.
Impact: Proportional flow between categories visible simultaneously — impossible in any other chart type.

**#762 Chord Diagram**
A circular diagram showing inter-group relationships with arc thickness proportional to the strength of the connection — for trade flows, migration patterns, and relationship matrices.
Impact: N×N relationship matrix readable spatially — tables with 20×20 cells become scannable.

**#763 Radar / Spider Chart**
A multi-axis polygon chart comparing multiple attributes of one or more entities simultaneously — product feature comparisons, skills assessments, performance reviews.
Impact: Multi-dimensional profiles compared on a single chart — 8 bar charts replaced by one.

**#764 Waterfall Chart**
A bar chart showing cumulative effect of sequential positive and negative values — standard for financial statements, cash flow analysis, and variance analysis.
Impact: Running total built from components visualized — impossible to fake with a standard bar chart.

**#765 Population Pyramid / Diverging Bar**
A horizontally-oriented, back-to-back bar chart showing two-sided distributions (age/gender, pros/cons, before/after) — centered on a zero axis.
Impact: Comparative distributions read symmetrically — visual balance communicates equality of comparison.

**#766 Box Plot / Violin Plot**
Statistical distribution charts showing median, quartiles, and outliers (box plot) or full distribution shape (violin) — standard for data science and A/B test result communication.
Impact: Distribution shape and statistical spread communicated — mean alone is misleading.

**#767 Streamgraph**
A stacked area chart centered on a baseline axis — flowing, organic shapes communicating compositional change over time. Used for music streaming history, news topic trends.
Impact: Temporal composition changes read as visual narrative — stacked bar charts are static by comparison.

**#768 Network Graph / Force-Directed Layout**
Nodes and edges laid out by force-directed simulation — nodes repel each other, edges attract — revealing clusters, hubs, and isolated nodes in relationship networks.
Impact: Network topology visible without predetermined layout — structure emerges from data.

**#769 Slope Chart**
Two parallel vertical axes (before/after, year A/year B) with lines connecting paired data points — making rank changes and trend direction immediately readable.
Impact: Rank changes read as slope direction — sorting a table to compare ranks is manual and slow.

**#770 Small Multiples**
The same chart type applied to each segment of a dataset, displayed as a grid — enabling comparison across all segments without overlaying them into an unreadable tangle.
Impact: Multi-segment comparison without visual collision — 12 overlaid lines become 12 clean charts.

---

## Category 78: Code Editor & IDE UI (#771–#780)

**#771 IntelliSense / Code Completion**
As-you-type autocomplete showing: function signatures, parameter names, return types, and documentation previews — filterable by fuzzy match, ranked by relevance.
Impact: API surface discoverable without documentation tab — typing speed and accuracy improve.

**#772 Inline Error Squiggles**
Wavy underlines (red for errors, yellow for warnings, blue for info) drawn directly under problematic code — matched to the exact token with a hover tooltip explaining the issue.
Impact: Errors visible at the line they occur — no compiler output parsing required.

**#773 Minimap**
A scaled-down overview of the entire file rendered as a tiny column on the right edge of the editor — with a highlighted viewport indicator showing current scroll position.
Impact: Large files navigable by visual landmark — search-and-scroll replaced by click-on-region.

**#774 Split Editor Panes**
Editor panes that can be split horizontally or vertically to show two files or two positions in the same file simultaneously — essential for reference while writing.
Impact: Cross-file editing without alt-tab context switching.

**#775 Git Diff Gutter Indicators**
Colored bars in the editor gutter indicating lines that have been added (green), modified (blue), or deleted (red) since the last git commit — with click-to-expand diff hunks.
Impact: Git changes visible in context — no switching to a separate diff tool.

**#776 Integrated Terminal Pane**
A terminal panel within the editor that runs in the project directory — toggled with a keyboard shortcut. Supports multiple terminal instances as tabs.
Impact: Terminal commands run in project context without leaving the editor.

**#777 File Symbol Outline**
A sidebar or breadcrumb showing all symbols (functions, classes, variables) in the current file — with type icons and line numbers, clickable to jump to definition.
Impact: Large files navigable by structure — scrolling to find a function replaced by outline click.

**#778 Live Share / Pair Programming**
A collaboration mode where another user joins the editing session with their own cursor — seeing edits in real-time and optionally taking control of keyboard focus.
Impact: Remote pair programming with full editor experience — screen sharing is an inadequate substitute.

**#779 Bracket Pair Colorization**
Matching bracket pairs ([], {}, ()) colored with the same hue at each nesting level — making deep nesting depth visually trackable without counting brackets.
Impact: Nesting structure visible at a glance — mismatched brackets identified immediately.

**#780 AI Code Explanation (Inline)**
A right-click "Explain this code" option that opens an inline overlay with a natural language explanation of the selected code block — no context switch to chat required.
Impact: Unfamiliar code understood in seconds — documentation and Googling replaced by inline AI.

---

## Category 79: Advanced Checkout & Payment UI (#781–#790)

**#781 Express Checkout (Apple Pay / Google Pay)**
Top-of-checkout buttons for Apple Pay, Google Pay, and PayPal — enabling one-touch payment with biometric confirmation without filling any form fields.
Impact: 70–80% of express checkout users complete in under 30 seconds — form abandonment eliminated.

**#782 Address Validation at Entry**
Real-time postal address validation against a delivery database — flagging undeliverable addresses before order submission with suggested corrections.
Impact: Failed deliveries from address typos eliminated — carrier cost and re-delivery eliminated.

**#783 Multi-Currency Checkout**
Dynamically serving checkout in the user's local currency with transparent exchange rate display — and settling in the merchant's currency on the backend.
Impact: International purchase anxiety eliminated — no mental currency conversion required.

**#784 Buy Now Pay Later Integration**
BNPL options (Klarna, Afterpay, Affirm) displayed as a payment method with monthly installment amount shown inline: "$12/month for 6 months" — not requiring navigation away.
Impact: High-ticket items affordable through installments — AOV increases for considered purchases.

**#785 Saved Address Book**
Returning user checkout pre-selects the most recently used shipping address — with a selector showing all saved addresses and an "Add new" option.
Impact: Returning customers check out in seconds — re-entering known addresses eliminated.

**#786 Order Summary Accordion**
On mobile checkout, the order summary collapses to show only the total and an expand arrow — freeing screen space for the form while keeping the total visible.
Impact: Mobile checkout form usable — order summary doesn't consume the entire above-fold.

**#787 Real-Time Tax Calculation**
Tax amount calculated and displayed as the user enters their shipping address — updating dynamically rather than shown only on the final confirmation page.
Impact: No surprise tax at order confirmation — transparency reduces last-step abandonment.

**#788 Coupon Field Inline Validation**
Promo code fields that validate against the backend immediately on blur or keypress — showing "Code applied: 20% off" or "Invalid code" without a full form submit.
Impact: Coupon frustration resolved at entry — invalid codes don't cause checkout abandonment.

**#789 Checkout Progress Persistence**
Saving checkout progress (email, address, payment method selection) in localStorage or session — so a page refresh or tab restore doesn't wipe the form.
Impact: Accidental refreshes don't restart checkout — entered data preserved across interruptions.

**#790 Post-Purchase Upsell Page**
An interstitial page after payment confirmation (but before the thank you page) offering a complementary product with a one-click "Add to my order" button — no re-entering payment details.
Impact: One-click post-purchase upsells achieve 15–25% attachment rates — zero payment friction.

---

## Category 80: Advertising & Monetization UI (#791–#800)

**#791 Native Ad Card**
An advertisement styled to match the surrounding content cards — same visual treatment, labeled "Sponsored" with a clear disclosure. Better UX and higher CTR than banner ads.
Impact: Engagement 3× higher than display banners — less intrusive, more contextually relevant.

**#792 Rewarded Ad Gate**
A user-initiated "Watch a 30-second ad to unlock premium content" prompt — voluntary, clearly exchanging attention for value rather than interrupting.
Impact: Ad engagement rates dramatically higher when user-initiated — negative sentiment avoided.

**#793 Paywall with Preview**
Showing the first paragraph or section of premium content before a subscription prompt — giving enough value to justify the upgrade, not just blocking access entirely.
Impact: Content-driven conversion — users who preview convert at higher rates than cold paywalls.

**#794 Freemium Limit Indicator**
A visible counter showing remaining free usage ("3 of 5 free exports used") — making the limit tangible before hitting it and creating natural upgrade momentum.
Impact: Upgrade intent built gradually — limit discovery at zero remaining is jarring.

**#795 Affiliate Link / UTM Builder**
A tool for creating trackable affiliate or campaign links — with UTM parameter fields, a generated URL, one-click copy, and click tracking dashboard.
Impact: Marketing attribution self-served — campaign performance trackable from link creation.

**#796 Promoted / Sponsored Listing**
Search and browse results with clearly labeled "Sponsored" entries visually distinct (subtle background, badge) — paid placement visible but not disruptive to organic results.
Impact: Ad revenue generated without destroying organic result trust — clear labeling is mandatory.

**#797 Ad Block Detection & Response**
Detecting ad blocker usage and presenting a respectful alternative: "We noticed you're using an ad blocker — consider subscribing for an ad-free experience" — not an aggressive blocker.
Impact: Adblocker users offered a conversion path — blocking vs. subscription choice presented fairly.

**#798 Donation / Tip Widget**
A one-click donation or tip widget with preset amounts and a custom field — for creator platforms, open-source tools, and nonprofits. Stripe-powered inline payment.
Impact: Micro-support collected at zero friction — PayPal redirect replaced by inline payment.

**#799 Subscription Upgrade Interstitial**
A mid-session interstitial (triggered by limit hit or feature gating) showing upgrade benefits tailored to the action the user was attempting — contextual upgrade framing.
Impact: Upgrade intent captured at peak motivation — generic pricing page misses this moment.

**#800 Dynamic Pricing Experiment UI**
An A/B testing framework for pricing page experiments — showing different prices, plan structures, or offer framings to different user segments with conversion tracking.
Impact: Pricing optimized by data — intuition-based pricing replaced by empirical conversion evidence.
