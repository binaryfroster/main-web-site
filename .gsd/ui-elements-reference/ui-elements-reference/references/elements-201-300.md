# UI Elements Reference: #201–#300

---

## Category 21: Drag & Drop Interactions (#201–#210)

**#201 Kanban Board**
A column-based board (To Do / In Progress / Done) where cards are dragged between columns to update status. Pioneered by Trello, now standard for task management and workflow visualization.
Impact: Status updates happen through physical manipulation — no forms or dropdowns needed.

**#202 Drag-to-Reorder List**
A list where items can be grabbed by a handle and repositioned via drag. Order persists on drop. Used in navigation editors, priority lists, and playlist management.
Impact: Reordering feels direct and physical — more intuitive than up/down buttons.

**#203 Multi-Select with Drag**
Holding Shift or Command to select multiple items, then dragging the selection as a group. Shows a count badge on the dragged ghost ("Moving 4 items"). Essential for file managers.
Impact: Bulk reorganization achievable without tedious one-at-a-time moves.

**#204 Drop Zone with Preview**
A visually distinct drop target that activates (glows, changes color) when a draggable element hovers over it. Shows a preview of where the item will land before release.
Impact: Drop targets obvious and feedback immediate — no guess-and-check behavior.

**#205 Snap-to-Grid Canvas**
Draggable elements that snap to an invisible grid or to alignment guides relative to other elements. Standard in no-code builders, design tools, and dashboard editors.
Impact: Layouts stay aligned without manual pixel-pushing — professional result every time.

**#206 Drag Handle Affordance**
A visible grip icon (⠿ or ≡) on draggable items indicating they can be grabbed. Without a visual affordance, drag functionality is invisible and undiscoverable.
Impact: Drag functionality discovered and used — invisible features don't get used.

**#207 Ghost Element While Dragging**
A semi-transparent copy of the dragged item follows the cursor while the original remains in place. Provides spatial context about origin while showing current drag position.
Impact: Spatial orientation maintained during drag — reduces drop errors.

**#208 Auto-Scroll on Drag Near Edge**
When a dragged element approaches the viewport edge, the scroll container auto-scrolls to reveal content beyond the visible area. Without this, drag-reorder breaks on long lists.
Impact: Long lists remain fully sortable — drag doesn't stop at the visible boundary.

**#209 Drag-to-Resize Block/Image**
Corner and edge handles on images and content blocks allowing resize via drag. Standard in rich text editors, page builders, and presentation tools.
Impact: Sizing feels direct and immediate — no width-field editing required.

**#210 Touch-Compatible Drag (Pointer Events)**
Drag-and-drop implemented with Pointer Events API rather than mouse events alone, enabling natural drag interaction on touch screens and stylus devices.
Impact: Drag functionality works on tablets and touch laptops — not just desktop.

---

## Category 22: Authentication & Security UI (#211–#220)

**#211 Social Login Buttons**
One-click sign-in with Google, GitHub, Apple, Microsoft, or other identity providers. Reduces signup friction from 8 form fields to a single button. Essential for developer and consumer products.
Impact: Signup completion rates nearly double compared to email/password forms.

**#212 Biometric / Face ID Prompt**
WebAuthn-powered biometric authentication that uses device Face ID or fingerprint for quick re-authentication. Available on Safari and modern browsers — eliminates password re-entry.
Impact: Re-auth friction eliminated — users complete sensitive actions faster.

**#213 Magic Link Login Flow**
Email-based passwordless login — user enters email, receives a one-click login link, lands authenticated. No password to forget or reset. Popular in productivity tools.
Impact: Password reset support tickets eliminated — login friction dramatically reduced.

**#214 Invisible CAPTCHA / Bot Detection**
reCAPTCHA v3 or Cloudflare Turnstile running silently in the background, scoring requests without any user interaction. Replaces the "select all traffic lights" torture with a confidence score.
Impact: Bot protection without punishing legitimate users with image puzzles.

**#215 Passkey / WebAuthn Registration**
A modern passwordless credential flow using platform authenticators (Face ID, fingerprint, Windows Hello). The future of auth — eliminates phishing vulnerabilities entirely.
Impact: Most secure auth method available — zero password to steal or forget.

**#216 Active Sessions Dashboard**
A list of all active login sessions showing: device type, location, IP, last active time — with individual "Log out" buttons. Standard in Google, Facebook, and security-conscious apps.
Impact: Users control their security posture — suspicious sessions spotted and revoked.

**#217 Password Manager Auto-fill Friendly Design**
Form fields with proper autocomplete attributes (current-password, new-password, username) that trigger password manager suggestions. Poor autocomplete attributes break 1Password/Bitwarden.
Impact: Password manager users login without friction — most security-conscious users.

**#218 MFA Method Selector**
A screen letting users choose between available 2FA methods: Authenticator app, SMS, Email code, Hardware security key. With clear descriptions of security/convenience tradeoffs.
Impact: Users choose 2FA they'll actually use — adoption and completion increase.

**#219 Account Recovery Flow**
A clear, multi-step account recovery path: verify identity (email, phone, backup code) → reset credential → confirm recovery → resecure account. With support escalation if all else fails.
Impact: Locked-out users recover without contacting support — retention preserved.

**#220 Trusted Device Prompt**
After MFA on a new device, offer "Trust this device for 30 days?" reducing future friction on known devices. Balances security with convenience — the right trade-off for most users.
Impact: Security doesn't compound into daily annoyance on primary devices.

---

## Category 23: Pricing & Plans UI (#221–#230)

**#221 Pricing Card with Recommended Highlight**
A set of plan cards where the most popular or recommended option is visually elevated (badge, border, shadow, larger card). Anchors decision-making toward the intended plan.
Impact: Middle plan selection rate increases when highlighted — anchoring psychology.

**#222 Annual / Monthly Toggle with Savings Badge**
A billing period toggle that switches displayed prices between monthly and annual, showing the annual savings prominently ("Save 25%"). Drives annual plan adoption.
Impact: Annual plan selection increases dramatically with explicit savings display.

**#223 Feature Availability Matrix**
A comparison grid showing which features are available on each plan with clear ✓/✗ or tiered indicators. Interactive rows that expand feature descriptions on hover.
Impact: Plan selection confidence increases — users know exactly what they're buying.

**#224 Usage-Based Pricing Calculator**
An interactive slider or input-based calculator showing estimated cost based on usage inputs (API calls, seats, storage, messages). Makes variable pricing transparent and trustworthy.
Impact: Pricing anxiety removed — users can project costs before committing.

**#225 Contextual Upgrade Prompt**
When a user hits a feature limit or clicks a paywalled feature, an inline upgrade prompt appears in context — not a jarring redirect to a pricing page.
Impact: Upgrade intent captured at peak motivation — highest conversion point.

**#226 Free Trial Counter / Banner**
A persistent indicator showing remaining trial days ("7 days left in your trial") with a progress bar and upgrade CTA. Maintains trial urgency throughout the trial period.
Impact: Trial-to-paid conversion improves with consistent end-date awareness.

**#227 Promo Code Input**
A collapsible "Have a promo code?" field at checkout — hidden by default to avoid anchoring expectations of discounts. Expands smoothly on click with instant validation feedback.
Impact: Non-coupon users aren't tempted to leave and search for codes they don't have.

**#228 Payment Method Selector**
A card selection UI showing stored payment methods with card type icon, last 4 digits, and expiry — with easy add/remove. Stripe's PaymentElement is the gold standard implementation.
Impact: Returning customers pay in two clicks — payment method management frictionless.

**#229 Invoice / Receipt Download**
A billing history table with date, description, amount, status, and a PDF download link per invoice. Tax-compliant receipt generation is a baseline B2B requirement.
Impact: Finance teams can reconcile expenses without contacting support.

**#230 Downgrade / Cancellation Retention Flow**
When a user initiates downgrade or cancellation, a multi-step flow surfaces: reason survey, personalized retention offer (discount, pause option), and consequences summary before final confirmation.
Impact: Churn reduces when alternatives to cancellation are surfaced at the right moment.

---

## Category 24: Advanced Interaction Patterns (#231–#240)

**#231 Multi-Step Wizard with Validation**
A guided form split into sequential steps with per-step validation — users can't advance until the current step is complete. Back navigation retains previously entered values.
Impact: Complex form completion rates increase when broken into digestible steps.

**#232 Undo / Redo Stack**
Keyboard shortcuts (Ctrl+Z / Ctrl+Y) and toolbar buttons implementing a full action history stack. Standard expectation in editors, design tools, and any creative application.
Impact: Users experiment boldly knowing any mistake is reversible.

**#233 Batch Actions Toolbar**
A contextual toolbar appearing at the top/bottom of the screen when multiple items are selected, offering bulk operations (Delete, Move, Tag, Export). Replaces per-item actions at scale.
Impact: Power users process hundreds of items efficiently — individual actions become obsolete.

**#234 Contextual Right-Click Menu**
A custom context menu (replacing or extending the browser default) with relevant actions for the right-clicked element. Delivers pro-level functionality to mouse/trackpad users.
Impact: Advanced actions discoverable without toolbar hunting — power user delight.

**#235 Drag-to-Select Area**
Click-and-drag on a canvas or grid to draw a selection rectangle that selects all items within bounds. File manager and design tool pattern that speeds up multi-select dramatically.
Impact: Area selection replaces tedious individual Shift+click sequences.

**#236 Keyboard Navigation Mode**
Full keyboard operability with visible focus states, arrow key navigation through lists, Enter to activate, Escape to close — matching native application keyboard behavior.
Impact: Power users and accessibility users both benefit — professional-grade experience.

**#237 Optimistic UI Updates**
UI updates immediately on user action (checkbox ticked, item deleted, message sent) before server confirmation, with silent background sync and error rollback. Made famous by Twitter's like button.
Impact: App feels instantaneous regardless of network latency — zero perceived delay.

**#238 Collaborative Presence Cursors**
Multiple users' cursors shown in real-time with name labels and distinct colors, à la Google Docs or Figma. Instantly communicates "others are here working with you."
Impact: Real-time collaboration feels human — not abstract list of "online users."

**#239 Real-Time Co-Editing Indicator**
Showing which specific element, paragraph, cell, or item another user is currently editing — with their avatar overlaid on it. Prevents edit collisions before they happen.
Impact: Collaboration conflicts prevented rather than resolved — flow maintained.

**#240 Version History / Revision Timeline**
A sidebar or panel listing document/item versions with timestamps, editor names, and change summaries. Click any version to preview and restore it. Notion, Figma, and Google Docs standard.
Impact: Users make bold changes knowing history is their safety net — creativity increases.

---

## Category 25: Marketing & Landing Page (#241–#250)

**#241 Particle / Mesh Animated Hero Background**
WebGL or Canvas-powered animated backgrounds — particle fields, gradient mesh animations, or floating orbs — behind the hero section. Establishes premium positioning instantly.
Impact: First impression communicates technological sophistication before a word is read.

**#242 Alternating Feature Sections**
Feature sections that alternate between image-left/text-right and text-left/image-right layouts as you scroll. Creates visual rhythm and prevents the monotony of same-direction stacking.
Impact: Landing pages read naturally without visual fatigue.

**#243 Scroll-Driven Storytelling Section**
Content that animates in response to scroll position — elements appear, transform, or progress as the user scrolls through a section. Creates narrative momentum in long landing pages.
Impact: Users scroll all the way through — content tells a story instead of listing features.

**#244 Video Background Hero**
A muted, looping video behind the hero headline. Works for lifestyle brands, travel, food, and agency sites where motion conveys more than static imagery can.
Impact: Emotional product context established before any copy is read.

**#245 Interactive Product Demo Embed**
A clickable, interactive product walkthrough (built with Arcade, Navattic, or custom) embedded on the landing page so visitors experience the product pre-signup.
Impact: Qualified leads increase — visitors who interact with demos convert at higher rates.

**#246 Social Proof Ticker / Marquee**
A horizontally scrolling or animating strip of customer logos, review quotes, or press mentions. Creates perpetual motion social proof without demanding fixed screen space.
Impact: Trust signals visible without vertical space cost.

**#247 Lead Magnet Pop-Up**
A timed or scroll-triggered popup offering a high-value resource (ebook, template, audit) in exchange for an email address. Converts non-buyers into leads.
Impact: Email capture from visitors not ready to purchase — nurture funnel entry point.

**#248 Sticky Announcement Bar**
A slim banner at the very top of the page (above the navbar) for critical announcements: product launches, limited offers, event countdown. Dismissable but hard to miss.
Impact: 100% of visitors see high-priority announcements — zero require scrolling.

**#249 GDPR Cookie Consent Banner**
A compliant cookie consent UI offering Accept All, Reject Non-Essential, and granular Manage Preferences options. Built with a proper consent management platform (OneTrust, Cookiebot).
Impact: Legal compliance met without the full-page blocking banners that destroy UX.

**#250 Floating Live Chat Widget**
A bottom-right chat bubble (Intercom, Crisp, Freshchat) for real-time support and proactive messaging. Fires automated messages based on page visited or time on page.
Impact: Visitor questions answered instantly — support converts hesitant prospects.

---

## Category 26: Icons & Visual Language (#251–#260)

**#251 Cohesive Icon System**
A single consistent icon library (Lucide, Phosphor, Heroicons, or custom) used throughout the product. Mixed icon styles (filled here, outlined there, different stroke weights) signal carelessness.
Impact: Visual consistency communicates intentional design — trust in product quality rises.

**#252 Animated Micro Icons**
SVG icons that play a short animation on hover or trigger — a trash can lid opening, a bell ringing, a heart filling. Lottie or CSS-animated SVGs. Adds delight to routine actions.
Impact: Common actions become memorable micro-moments — interfaces feel crafted.

**#253 Icon-Only Toolbar with Tooltips**
A toolbar of icon-only buttons where hovering reveals a tooltip with the action name and keyboard shortcut. Saves space in dense UIs while maintaining discoverability.
Impact: Dense toolbars remain learnable — tooltips eliminate guesswork.

**#254 Dynamic Favicon**
The browser tab favicon updates to reflect app state: notification count badge, dark/light mode variant, or status color. Gmail and Notion do this — it's a tiny but powerful touch.
Impact: App state visible in tab bar without switching — multitaskers stay informed.

**#255 Logo Entrance Animation**
The brand logo animates on page load — drawing in, assembling, fading up, or morphing. Adds a moment of brand storytelling and creates a "loading complete" signal.
Impact: Brand personality established in the first 2 seconds — memorable first impression.

**#256 Avatar with Fallback**
User avatars that degrade gracefully: try profile photo → fall back to initials on colored background → fall back to generic icon. Never shows a broken image.
Impact: Every user represented meaningfully — no broken image boxes.

**#257 Emoji Status Indicators**
User-settable status emoji (🎧 Focusing, 🏖️ On vacation, 🤒 Out sick) displayed next to names in collaboration tools. Communicates context and availability naturally.
Impact: Async collaboration improved — team members calibrate communication timing.

**#258 Category Color Coding**
Consistent color assignments to categories, labels, or tags throughout the interface. Once learned, color becomes a secondary navigation layer faster than reading labels.
Impact: Experienced users navigate by color — reading labels becomes optional.

**#259 Badge / Tag System**
Reusable pill tags for status, category, role, or label — with consistent color-size-font across the application. Used in tables, cards, and profiles to add structured metadata visually.
Impact: At-a-glance categorization replaces column scanning in data-dense interfaces.

**#260 Illustrated Brand Mascot**
A custom illustration or character used in empty states, error pages, onboarding, and marketing. Slack's Octocat era, Mailchimp's Freddie — mascots make brand feel approachable.
Impact: Brand becomes personable — mascots convert features into personality.

---

## Category 27: Tables & Data Grids (#261–#270)

**#261 Sortable Column Headers**
Clicking a column header cycles through ascending/descending/unsorted states with a sort direction arrow. Click-to-sort is the most used table interaction — its absence is immediately noticed.
Impact: Data ordered by the dimension most relevant to each user's task.

**#262 Row Selection Checkboxes**
A checkbox in the first column of each row (with a select-all checkbox in the header) enabling multi-row selection for bulk operations. Standard UX for any data management table.
Impact: Bulk operations become possible — operating on one row at a time doesn't scale.

**#263 Expandable Row Detail**
Clicking a row expands it inline to show additional fields, related records, or nested data without navigating to a separate detail page. Keeps context while providing depth.
Impact: Drilling into detail doesn't lose the list context — back navigation eliminated.

**#264 Sticky First Column**
The leftmost column (typically the identifier: name, ID, or checkbox) remains fixed while remaining columns scroll horizontally on wide tables.
Impact: Row identity always visible regardless of horizontal scroll position.

**#265 Column Visibility Toggle**
A columns control dropdown letting users show/hide columns to personalize their table view. Persisted per user. Essential for tables with 8+ columns.
Impact: Users see only relevant columns — cognitive overload from unused columns eliminated.

**#266 Paginated Table with Page Size Selector**
Standard pagination controls (First / ← Prev / 1 2 3 / Next → / Last) with a "rows per page" dropdown (10, 25, 50, 100). Combines navigation with density control.
Impact: Large datasets navigable without performance-killing full renders.

**#267 Inline Row Actions**
Edit and Delete (and other contextual) buttons appearing on row hover in an actions column. More discoverable than right-click menus, less space-consuming than always-visible buttons.
Impact: Row-level actions accessible without selecting or navigating away.

**#268 Bulk Edit Mode**
A mode toggle that makes selected row cells directly editable in place, supporting batch updates to a field across multiple rows simultaneously.
Impact: Mass updates accomplished without opening individual records one by one.

**#269 CSV / Excel Import UI**
A multi-step import flow: upload file → map columns to fields → preview first N rows → confirm → import with progress bar. With error reporting for failed rows after import.
Impact: Data migrations self-served — eliminates manual data entry for existing datasets.

**#270 Table Quick Filter / Search**
A search input above the table filtering visible rows in real-time by any text match across all columns. Complements faceted filters — instant scope narrowing for known values.
Impact: Finding a specific record in a large table takes 3 seconds instead of 3 minutes.

---

## Category 28: Maps & Geolocation (#271–#280)

**#271 Interactive Marker Map**
A map with clickable markers opening info popups with relevant data (business name, hours, rating, distance). Custom styled tiles and custom marker icons replace generic blue pins.
Impact: Location-based discovery becomes visual and spatial rather than list-based.

**#272 Cluster Map for Dense Data**
When many markers are near each other, they cluster into a single circle showing count. Clicking zooms in and unclusters. Prevents marker overlap chaos on zoomed-out views.
Impact: Maps with hundreds of markers remain navigable — no overlapping confusion.

**#273 Location Autocomplete Input**
A text input powered by Google Places or Mapbox Geocoding API that suggests location names as the user types, returning structured address data on selection.
Impact: Address and location entry fast and error-free — no manual coordinate entry.

**#274 Radius / Distance Filter**
A map overlay showing a draggable circle representing a search radius (e.g., "within 10 miles"), combined with a distance slider. Standard for local search interfaces.
Impact: Geographic filtering communicated visually — more intuitive than numeric radius.

**#275 Map Style Switcher**
Toggle buttons for map tile styles: Standard, Satellite, Terrain. Users switch to satellite to verify a location's appearance or terrain to understand topography.
Impact: Users get the map context they need — not locked into one view.

**#276 "Near Me" / User Location**
A button triggering browser geolocation permission to center the map on the user's position and show nearby results. Provides instant contextual relevance.
Impact: Location-relevant results surfaced with one click — manual location entry bypassed.

**#277 Route / Direction Overlay**
A polyline drawn between two or more points on the map showing a route, with optional turn-by-turn waypoints and travel mode (walk, drive, transit) selector.
Impact: Spatial relationship between locations communicated — not just proximity.

**#278 Polygon Area Selector**
A drawing tool letting users define a custom geographic area by placing points on a map. Used for delivery zones, territory management, and custom geographic filters.
Impact: Freeform geographic selection possible — not constrained to radius circles.

**#279 Mini Map Preview**
A small thumbnail map inset within a card, article, or listing showing the location without requiring the user to open a full map modal.
Impact: Location context delivered inline — no click required for quick orientation.

**#280 Geo-Based Content Personalization**
Automatically showing location-relevant content (nearest store, local pricing, regional events) based on IP or GPS detection. Silent, immediate, requires no user input.
Impact: Content relevance increases dramatically — generic global content replaced.

---

## Category 29: Print, Export & Sharing (#281–#290)

**#281 Print-Optimized Stylesheet**
A @media print CSS block hiding navigation, sidebars, ads, and UI chrome while formatting content for paper (black text, no backgrounds, page breaks at appropriate points).
Impact: Documents print cleanly — users don't waste ink on navigation chrome.

**#282 Share Link Generator**
A share button that generates a unique, copyable link to the current view/state of a page — including filters, scroll position, or selected content.
Impact: Specific views sharable with teammates — no "go to X and then filter by Y" instructions.

**#283 QR Code Generator**
A UI component generating a QR code for a URL, with download as PNG and a copy button. Used in profile pages, event registrations, and physical-digital bridge touchpoints.
Impact: Physical-to-digital handoff enabled — offline attendees reach online resources instantly.

**#284 Social Share Buttons**
Open Graph-powered share buttons for Twitter/X, LinkedIn, Facebook, and WhatsApp that pre-fill with the page title, description, and image. Include share count for social proof.
Impact: Content distribution extended to social networks with one click.

**#285 Export Format Selector**
A dropdown or modal offering export format choices: PDF (formatted), CSV (data), Excel (XLSX), PNG/JPG (chart), JSON (raw). Different user types need different formats.
Impact: Data accessible to every user type — not just spreadsheet users.

**#286 Embed Code Generator**
A modal showing a copyable <iframe> or <script> snippet for embedding the content (chart, widget, map, form) on external sites, with width/height customization options.
Impact: Content distribution extended to partner sites — reach multiplied.

**#287 Deep Link / Anchor Copy**
A ¶ or link icon appearing on hover next to headings, allowing one-click copy of a direct anchor link to that section. Standard in documentation and long-form content.
Impact: Specific sections linkable — "scroll down to the third section" instructions obsolete.

**#288 Referral Link UI**
A personal referral link with copy button, share options, and a dashboard showing referral count, conversion status, and earned rewards. Drives word-of-mouth growth programmatically.
Impact: Viral loops activated — satisfied users recruit new users with clear incentive.

**#289 Custom Report Builder**
A drag-and-drop or configuration UI letting users select metrics, dimensions, date ranges, and visualization types to build custom reports. Exported as PDF or scheduled by email.
Impact: Self-service analytics — custom reporting reduces support/analyst burden.

**#290 Email This Page**
A "Send to email" option that delivers a clean HTML or text version of the current page or content to a specified email address. Bridges web and email communication.
Impact: Content saved to inbox for later reference — bookmarks for email-first users.

---

## Category 30: Gamification & Engagement (#291–#300)

**#291 XP / Progress Bar**
A linear bar showing progress toward a level, goal, or completion milestone. Fills incrementally with each qualifying action. The simplest possible gamification element.
Impact: Progress visibility creates intrinsic motivation to complete the bar.

**#292 Achievement Badges**
Unlockable badge icons awarded for completing specific actions or milestones (First post, 10 connections, 100-day streak). Displayed on profile and in achievement galleries.
Impact: Accomplishment made visible — users have a reason to tell others about their status.

**#293 Leaderboard**
A ranked list of users or teams by a chosen metric (points, sales, contributions, activity). Weekly/monthly resets prevent permanent rank calcification. Opt-in participation is best practice.
Impact: Competitive motivation drives engagement and metric performance.

**#294 Streak Counter**
A consecutive-day or consecutive-action counter showing how many days/times in a row a user has performed a target action. Duolingo's streak is the canonical example.
Impact: Loss aversion psychology keeps users returning daily to protect their streak.

**#295 Points / Reward Balance**
A visible points balance in the header or profile showing earned currency from actions (comments, purchases, referrals). Spendable in a rewards store or on discounts.
Impact: Every interaction has tangible value — points accumulate into meaningful rewards.

**#296 Daily Challenge / Task Prompt**
A time-limited challenge card presented daily (or weekly) prompting a specific action with bonus reward for completion. Resets the engagement clock and gives users a concrete starting point.
Impact: Re-engagement reason delivered to users who have run out of intrinsic motivation.

**#297 Spin-to-Win / Interactive Reward Wheel**
An animated prize wheel that users can spin once (per email, per purchase, per day) to win a discount, freebie, or badge. Adds delight and gamified discovery to promotions.
Impact: Email capture and promotion engagement dramatically higher than static discount forms.

**#298 Level-Up Animation**
A full-screen or overlay celebration when a user advances to a new level, tier, or status. Shows old level → new level with unlocked perks and a share option.
Impact: Status transitions are emotional peaks — celebrated moments drive retention and sharing.

**#299 Community Feed / Activity Wall**
A social feed showing recent activity across the community: new members, achievements earned, content posted, milestones reached. Creates social proof and FOMO simultaneously.
Impact: Users feel part of an active community — isolation of solo tools replaced by belonging.

**#300 Referral Milestone Tracker**
A visual tracker showing progress toward a referral reward (e.g., "Refer 3 friends for 1 month free") with each slot showing referred user status (invited / signed up / converted).
Impact: Referral program progress visible — sustained motivation through to completion.
