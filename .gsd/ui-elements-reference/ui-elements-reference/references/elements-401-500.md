# UI Elements Reference: #401–#500

---

## Category 41: Feedback Collection & Surveys (#401–#410)

**#401 NPS Survey Widget**
A one-question "How likely are you to recommend us?" 0–10 scale widget that triggers after key milestones (first month, post-purchase, post-support). Captures Net Promoter Score inline without redirecting users to external survey tools. Conditionally shows a follow-up text field for promoters (why?) and detractors (how can we improve?).
Impact: Continuous NPS measurement without survey fatigue — response rates 4× higher than email surveys.

**#402 In-App Micro Survey**
A two or three-question survey embedded as a bottom-corner card, collecting feedback on specific features or flows immediately after use. Pops up contextually — not on every login.
Impact: Contextual feedback is 60% more accurate than retrospective email surveys.

**#403 Emoji Sentiment Picker**
A row of 5 emoji faces (😡😕😐😊😍) for rating satisfaction on a spectrum. Faster and more universally understood than star ratings or numeric scales — zero cognitive overhead.
Impact: Survey completion rates spike when input requires one emoji tap.

**#404 Feedback Button (Persistent)**
A small "Feedback" or speech-bubble tab affixed to the side of the screen (usually right edge) that opens a modal with a free-text box, category selector, and optional screenshot attachment.
Impact: User feedback collected at any moment — not just at survey trigger points.

**#405 Screenshot Annotation Tool**
When users submit a bug report or feedback, a built-in screenshot capture with drawing tools (highlight, blur, arrow, text) lets them visually mark exactly what they're describing.
Impact: Bug reports become instantly actionable — engineers see exactly what users see.

**#406 CSAT Post-Interaction Widget**
After completing a support interaction, checkout, or key task, a single "How satisfied were you?" prompt with star or emoji options. Captures satisfaction at the freshest possible moment.
Impact: Task-specific satisfaction scores reveal UX friction points invisible to analytics.

**#407 Poll / Quick Vote**
An inline two–five option poll in content, social feeds, or dashboards with real-time vote count bars updating after a user votes. Drives engagement through participatory content.
Impact: Passive readers become active participants — dwell time and return visits increase.

**#408 Feature Request Upvote Board**
A public or internal board where users submit and upvote feature requests. Shows vote count, status (Planned, In Progress, Released), and changelog updates.
Impact: Product roadmap validated by actual demand — loudest voice replaced by vote count.

**#409 Heatmap Feedback Overlay**
A feedback mode where users click anywhere on the page to place a comment pin, creating a spatial feedback layer over the UI. Tools like Hotjar, Marker.io, and Pastel use this pattern.
Impact: Feedback is geographically precise — "the button is confusing" becomes "this button."

**#410 Net Promoter Follow-Up Flow**
After the initial NPS score, a conditional follow-up screen asking promoters to leave a public review and detractors to schedule a call. Converts scores into actions automatically.
Impact: Promoters channeled to G2/Capterra reviews — detractors escalated before churning.

---

## Category 42: Video Player & Streaming UI (#411–#420)

**#411 Chapter / Timestamp Navigation**
A video progress bar with clickable chapter markers and a chapter list sidebar showing titles and timestamps. Makes long-form video (courses, webinars, tutorials) navigable like a document.
Impact: Users jump to relevant sections — completion rates improve when navigation exists.

**#412 Playback Speed Selector**
A speed control dropdown (0.5×, 0.75×, 1×, 1.25×, 1.5×, 2×) in the video player. A standard expectation for educational and podcast-style video content — its absence frustrates users.
Impact: Users consume content at their preferred pace — engagement and retention improve.

**#413 Subtitles / Closed Captions Toggle**
A CC button enabling/disabling subtitles with language selection. Required for accessibility compliance (ADA/WCAG) and dramatically increases comprehension for ESL viewers.
Impact: 80% of captions used in non-hearing-impaired contexts — comprehension improves for all.

**#414 Picture-in-Picture Mode**
A PiP button that detaches the video to a floating mini-player, allowing users to continue watching while browsing other content or filling a form on the same page.
Impact: Multi-taskers keep watching — video engagement survives navigation events.

**#415 Video Quality Selector**
A resolution selector (Auto, 1080p, 720p, 480p, 360p) letting users control bandwidth usage. Auto mode selects based on connection speed — manual gives control for poor-connection users.
Impact: Video playback smooth on all connection speeds — no forced buffering.

**#416 Video Thumbnail Preview on Scrub**
A preview thumbnail that appears above the progress bar as the user hovers or scrubs, showing the frame at that timestamp. Standard in YouTube and Netflix — essential for long-form content.
Impact: Scrubbing to the right moment takes seconds instead of trial-and-error.

**#417 Live Stream Viewer Count & Chat**
A live indicator ("LIVE" badge), viewer count, and real-time chat panel alongside live video streams. Creates the social presence that makes live content distinct from recorded video.
Impact: Live social context drives participation and sustained attention.

**#418 Video Playlist / Queue**
A side panel listing upcoming videos in a playlist with drag-to-reorder and autoplay toggle. Standard for course platforms, tutorial series, and curated video collections.
Impact: Sequential consumption automated — users binge without re-navigation.

**#419 Clip / Share Timestamp**
A "Share from this point" button or right-click on the timeline generating a URL that starts video at the current timestamp. Enables precise content sharing without time stamps.
Impact: Specific moments shareable — "watch from 4:32" links eliminate seek overhead.

**#420 Buffering State UX**
A graceful buffering state that shows a spinner and "Loading…" text rather than freezing — with optional playback quality downgrade prompt for persistent buffering.
Impact: Users understand the wait rather than assuming the player is broken.

---

## Category 43: File & Document Management UI (#421–#430)

**#421 File Tree / Folder Explorer**
A collapsible tree view of nested folders and files, with expand/collapse arrows, folder icons, file type icons, and selection state. The standard navigation pattern for document-heavy apps.
Impact: Hierarchical content structure intuitive to navigate — mirror of OS file system users know.

**#422 File Type Icons System**
Distinct icons per file type (PDF red, Word blue, Excel green, image landscape, video play, audio waveform, zip archive) providing instant identification without reading filenames.
Impact: File type recognized in 200ms — no filename parsing required.

**#423 File Preview Pane**
A right-side panel showing a preview of the selected file (PDF inline, image full-size, video player, text content) without opening it in a new tab. Split-view file management.
Impact: File contents confirmed before opening — wrong-file-opens eliminated.

**#424 Bulk File Operations Bar**
A toolbar appearing when multiple files are selected, offering: Move, Copy, Download, Delete, Share, Tag — with a "Select all" toggle and current selection count.
Impact: Mass file operations in one action — one-by-one management doesn't scale.

**#425 Breadcrumb Folder Navigation**
Clickable breadcrumb showing full path (Root / Projects / Q4 / Assets) with each segment navigable. Combined with a path-click dropdown for jumping multiple levels.
Impact: Deep folder navigation doesn't disorient — position always clear and escapable.

**#426 File Versioning Timeline**
A sidebar showing all versions of a file with timestamps, uploader name, and size — with restore and download-specific-version buttons. Google Drive-style version history.
Impact: Files editable without fear — any version restorable at any time.

**#427 Collaborative File Annotation**
Inline commenting and sticky-note annotations directly on PDFs, images, and documents. Comments tied to spatial positions on the document — not floating in a sidebar.
Impact: Document review workflows self-contained — email feedback threads eliminated.

**#428 Storage Usage Indicator**
A visual storage meter showing used vs. available space (e.g., "12.4 GB of 15 GB used") with a color shift from green to yellow to red as capacity is approached.
Impact: Storage exhaustion is anticipated — users manage proactively rather than discovering failure.

**#429 Quick Rename (F2 / Double-Click)**
Double-clicking a filename (or pressing F2) activates an inline edit of just the filename without opening a modal or detail page. Keyboard Enter confirms, Escape cancels.
Impact: Rename action is instant and direct — modal round-trips eliminated.

**#430 Drag-to-Move Files**
Files and folders that can be dragged to different folders in the tree view or folder grid. Drop targets highlight on hover. Multi-select drag moves the group.
Impact: File organization as direct physical manipulation — menus and dialogs bypassed.

---

## Category 44: Calendar & Scheduling UI (#431–#440)

**#431 Month / Week / Day View Toggle**
A set of view mode buttons (Month | Week | Day | Agenda) switching the calendar between different temporal zoom levels. Each view optimized for its use case — month for overview, day for detail.
Impact: Users match calendar density to their planning horizon — context always appropriate.

**#432 Drag-to-Create Event**
Clicking and dragging on an empty calendar slot creates a new event spanning the dragged duration. No modal to open — event creation is a single physical gesture.
Impact: Event creation friction reduced to near zero — as fast as writing on paper.

**#433 Drag-to-Reschedule**
Existing events are draggable to new time slots — dropped in place and automatically saved. Resize handles at event edges extend or shorten duration.
Impact: Schedule adjustments made in seconds without opening edit forms.

**#434 Availability / Booking Slot Picker**
A calendar showing only available time slots for booking (service, meeting, appointment) with unavailable times grayed out. Calendly-style self-serve booking UX.
Impact: Booking completed without email back-and-forth — scheduling friction eliminated.

**#435 Time Zone Selector + Converter**
An event detail showing time in the viewer's local timezone, with a toggle to see the organizer's timezone. Time zone selector defaulting to the user's detected zone.
Impact: Global teams book meetings without timezone math — miscalculations eliminated.

**#436 Recurring Event UI**
A repeat configuration panel (Daily / Weekly / Monthly / Custom) with end condition (After N times / On date / Never). Clear display of the recurrence rule in plain language.
Impact: Recurring patterns set once rather than manually re-created every instance.

**#437 Event Color Coding**
Users assign colors to events or categories that persist as background fills on calendar blocks. Visual chunking by category (work=blue, personal=green, travel=orange).
Impact: Calendar scannable by category at a glance — no reading event titles required.

**#438 Mini Calendar Datepicker**
A compact month view embedded in a sidebar or panel for date navigation — clicking a date in the mini calendar jumps the main calendar to that date.
Impact: Date-jump navigation without scroll — any date reachable in 2 clicks.

**#439 Overlay / Conflict Visualization**
Overlapping events displayed with visual overlap (side-by-side columns within the same time slot) — clearly communicating scheduling conflicts without hiding events.
Impact: Double-bookings visible immediately — conflicts identified before commitments.

**#440 Calendar Export (ICS / Google / Outlook)**
"Add to Calendar" buttons generating .ics files or deep links to Google Calendar and Outlook. Standard expectation for event pages, booking confirmations, and reminders.
Impact: Events land in users' primary calendars — reminder and attendance rates rise.

---

## Category 45: Visual Page Builder UI (#441–#450)

**#441 Section / Block Picker**
A panel of pre-built content sections (Hero, Features, Testimonials, Pricing, FAQ, Footer) that users can insert by clicking or dragging into a page canvas. Webflow and Squarespace pattern.
Impact: Non-designers build professional pages from proven section templates.

**#442 Inline Content Editing**
Click-to-edit text, images, and buttons directly on the page canvas rather than in a separate form panel. What-you-see-is-what-you-get editing in its purest form.
Impact: Edit intent maps directly to location — form-based editing breaks spatial thinking.

**#443 Property Panel / Inspector**
A right-side panel showing the properties of the selected element (typography, color, spacing, borders, effects) with live update on change. Figma/Webflow-style inspector.
Impact: All style controls in one panel — element properties and canvas changes in sync.

**#444 Component Library Panel**
A left-side panel browsing available components, saved blocks, and design system elements — with search and categories. Drag from library onto canvas to instantiate.
Impact: Consistent, reusable components used instead of recreated from scratch each time.

**#445 Responsive Preview Mode**
Buttons to preview the layout in desktop, tablet, and mobile viewport widths — with an editable width field for any custom breakpoint. Changes visible in real-time without deployment.
Impact: Responsive behavior verified during building — surprises eliminated at launch.

**#446 Canvas Zoom & Pan**
Mouse wheel zoom and spacebar+drag panning on the editing canvas. Zoom levels from overview (full page visible) to pixel-level inspection. Persistent zoom state per session.
Impact: Complex pages workable at any scale — far views for structure, close for detail.

**#447 Undo History Panel**
A visual list of recent actions in the builder (added section, changed color, moved element) with click-to-jump-to-state capability. More powerful than Ctrl+Z alone.
Impact: Mistakes recoverable with precision — specific actions reverted without losing others.

**#448 Global Styles Panel**
A settings panel for site-wide styles — primary color, font choices, button defaults, link color — that propagates to all instances automatically. Design system enforcement built in.
Impact: Global rebrand takes minutes — not manual updating of every element.

**#449 Collaborative Editing Presence**
Multiple users' cursors and selections visible simultaneously on the builder canvas with name labels. Figma-style real-time co-editing for page building.
Impact: Teams build pages together without stepping on each other — workflow parallelized.

**#450 Publish / Preview / Staging Toggle**
Clear controls for Draft (editing), Preview (full-page view), Staging (share-link for review), and Live (published) states. With a diff view showing what changed since last publish.
Impact: Change confidence increases when staging exists between draft and live.

---

## Category 46: Social & Community UI (#451–#460)

**#451 User Profile Card**
A compact card with: avatar, display name, username, bio, follower/following counts, join date, and a Follow/Message CTA. Appears as a hover card and as a profile page header.
Impact: User identity and social graph established in a single compact component.

**#452 Follow / Unfollow Button**
A toggle button with three states: Follow (unfollowed), Following (hover → Unfollow), Unfollow (active). The subtle hover state change ("Following" → "Unfollow" on hover) prevents accidental unfollows.
Impact: Social graph management feels fluid — state is always clear without extra confirmation.

**#453 Activity / News Feed**
A vertically scrolling stream of events from followed users or connected entities — with timestamps, avatars, action descriptions, and expandable rich content previews.
Impact: Relevant content surfaces without search — social discovery drives engagement.

**#454 Like / Heart Button with Counter**
A heart or thumbs-up with animated fill on click and a count badge. Optimistic UI updates immediately. Double-tap support on touch devices. The fundamental social feedback action.
Impact: Emotional response captured with zero friction — drives content creation motivation.

**#455 Comment Thread with Nesting**
Threaded comments with reply nesting (2–3 levels max), vote counts, timestamp, edit/delete for own comments, and collapse controls for long threads. Standard for blog, social, and community.
Impact: Conversations organized contextually — flat comment walls are impossible to follow.

**#456 Mention / Tag Autocomplete (@)**
Typing @ in text inputs triggers a dropdown autocomplete of usernames or team members. Selecting inserts a linked mention that notifies the mentioned user.
Impact: Cross-user reference instant and reliable — copy-pasting usernames eliminated.

**#457 Share to Community**
A share button that posts a page, article, or product directly to an internal community feed or external social platforms — with an optional message field for context.
Impact: Content distribution extended to community without leaving the product.

**#458 User Reputation / Trust Level**
A visual indicator of user standing (level badge, star count, verified checkmark, moderator crown) earned through contributions. Signals credibility to other users.
Impact: Social hierarchy visible — reputation guides whose advice to trust.

**#459 Report / Flag Content**
A "Report" option on user-generated content with: reason selection (spam, harassment, misinformation, inappropriate) and optional details field. Moderator queue integration.
Impact: Community self-policing enabled — moderation scales without full human review.

**#460 Trending / Popular Section**
A dynamic section showing content with highest engagement velocity in a recent time window (24h, 7d) — not just all-time metrics. Surfaces fresh, relevant content for discovery.
Impact: New content competes on merit — not buried by old content with accumulated likes.

---

## Category 47: Notification Center & Inbox UI (#461–#470)

**#461 Unified Notification Inbox**
A full-page or slide-over panel showing all notifications in a unified timeline — mentions, comments, system alerts, billing, activity — with type icons, read/unread state, and timestamps.
Impact: All signals in one place — users don't miss critical notifications scattered across sections.

**#462 Notification Grouping**
Similar notifications collapsed into grouped entries ("5 people liked your post", "3 comments on Article X") rather than individual items. Reduces inbox noise while preserving information.
Impact: High-volume notification streams remain readable — individual flooding prevented.

**#463 Mark All as Read**
A single-click button marking all notifications as read. Essential when returning after absence — users shouldn't click 47 individual notifications.
Impact: Bulk state management in one action — individual dismissal doesn't scale.

**#464 Notification Filtering Tabs**
Tabs segmenting notifications by type: All, Mentions, Comments, Reactions, System, Billing. Each tab shows count badge and allows focused review of one signal type.
Impact: Critical notification types reviewable without scrolling through noise.

**#465 Smart Notification Digest**
A daily/weekly email or in-app digest summarizing what happened while away — batching individual events into a scannable summary. Reduces interruption while preserving awareness.
Impact: Users stay informed without real-time notification fatigue.

**#466 Do Not Disturb Mode**
A toggle muting all non-critical notifications for a set duration (1h, 4h, Today, Custom) with automatic re-enable. Override for critical system alerts.
Impact: Focus periods protected — notification pressure reduced for deep work.

**#467 Notification Permission Onboarding**
A soft-permission prompt explaining the value of push notifications before triggering the browser's native (and irreversible if denied) permission dialog. Increases permission grant rates.
Impact: Push notification permission grant rates double with a value-first pre-prompt.

**#468 Real-Time Notification Animation**
New notifications animate into the notification icon (badge increment with bounce) and into the inbox list (slide-in from top) without requiring page refresh.
Impact: New signals feel live — inbox feels like a living feed not a stale list.

**#469 Email vs In-App Channel Toggle**
Per-notification-type controls for delivery channel: in-app only, email only, both, or none. Granular control prevents the "unsubscribe from everything" nuclear option.
Impact: Users tune signal-to-noise rather than opting out entirely — retention of notification engagement.

**#470 Notification Snooze**
Right-click or swipe on a notification to snooze it — removing it from view for 1h/tomorrow/next week, then re-surfacing it. Inbox Zero pattern for notification management.
Impact: Actionable-later notifications managed without loss — nothing falls through the cracks.

---

## Category 48: State & Lifecycle UI (#471–#480)

**#471 Entity Status Lifecycle**
A visual pipeline showing an entity's current state in its lifecycle (Draft → Review → Approved → Published → Archived) with timestamp of last transition and who made it.
Impact: Complex multi-state workflows visible at a glance — status never ambiguous.

**#472 Status History Log**
A chronological list of all state changes for an entity, with actor, timestamp, and optional comment per transition. Provides a complete audit trail of what happened and when.
Impact: Accountability and debugging supported by full state history.

**#473 Optimistic State Toggle**
Toggle buttons or switches that update their visual state immediately on click, before server confirmation, then roll back with an error toast if the server rejects the change.
Impact: Toggling feels instant — server round-trip latency invisible to users.

**#474 Blocked / Locked State Indicator**
A lock icon or greyed-out state on items that are currently being edited by another user, pending approval, or locked for a process. Shows who locked it and when.
Impact: Edit conflicts prevented before they happen — no overwriting in progress.

**#475 Draft Auto-Save with Status**
A persistent, small status indicator ("Saving…" → "Saved 2 min ago") for auto-saving drafts. Changes on every keystroke with a debounced write to the server.
Impact: Users work without anxiety about loss — no compulsive Ctrl+S behavior.

**#476 Published vs Draft Toggle View**
A toggle to switch between viewing the published (live) version and the current draft version of content — with visual diff highlighting between the two states.
Impact: Writers review what's actually live before publishing changes — mistakes caught.

**#477 Processing / In-Progress State**
A persistent indicator on items that are currently processing (video encoding, report generation, data import) — showing spinner, progress %, and estimated completion time.
Impact: Background jobs visible without polling — users know what's in-flight.

**#478 Archived State with Restore**
Items moved to an archive state are visually dimmed in lists, filtered out by default, but restorable via an explicit Restore action. Archiving as reversible soft-delete.
Impact: Data preserved without cluttering active views — nothing permanently lost.

**#479 Scheduled State Indicator**
Entities scheduled for future action (publish, send, delete) show a clock icon with the scheduled time — and a cancel/reschedule option.
Impact: Future-scheduled actions visible without separate calendar checks.

**#480 Conflict State Warning**
When saved changes conflict with concurrent changes made by another user, a diff-aware conflict dialog shows both versions side-by-side with merge/override options.
Impact: Concurrent edits resolved without data loss — no silent overwrites.

---

## Category 49: Advanced Context Menus & Popovers (#481–#490)

**#481 Right-Click Context Menu**
A custom context menu replacing or extending browser defaults with app-relevant actions for the right-clicked element. Keyboard-navigable with submenu support.
Impact: Contextual actions discoverable at zero UI cost — no cluttering visible toolbars.

**#482 Long-Press Action Sheet (Mobile)**
Pressing and holding on a mobile element triggers an action sheet with relevant options — the touch equivalent of right-click. Native feel, no visible action buttons needed.
Impact: Touch interfaces as powerful as desktop right-click — secondary actions surface on demand.

**#483 Popover with Arrow**
A positioned floating panel with a directional arrow pointing to its trigger element. Appears above, below, left, or right depending on available viewport space. Used for quick edits.
Impact: Contextual UI surfaces near the trigger — no eye travel to distant panels.

**#484 Nested Context Submenu**
Context menu items that expand to a submenu on hover/arrow key — used for "Move to…", "Copy to…", "Share with…" where the action requires a secondary selection.
Impact: Multi-step actions composable in context menus — modals avoided for simple choices.

**#485 Smart Positioning Popover**
Popovers that detect viewport edges and flip their position (top ↔ bottom, left ↔ right) to stay fully visible — never clipped by viewport edges.
Impact: Popovers always fully visible — no off-screen overflow requiring scroll.

**#486 Persistent Popover (Pinnable)**
A popover that can be "pinned" open as a panel rather than dismissing on click-outside. Users keep reference information visible while working elsewhere.
Impact: Reference content accessible alongside work — context switching eliminated.

**#487 Color Picker Popover**
A compact color picker with: hex/RGB/HSL input, opacity slider, recent colors palette, and preset swatches — activated as a popover from a color swatch button.
Impact: Color selection in-context without leaving the editing flow.

**#488 Emoji Reaction Popover**
A floating emoji bar (6 most common + expand option) appearing on element hover or long-press. Select reacts; hover on an existing reaction shows who reacted.
Impact: Emotional response captured without navigating away from content.

**#489 Quick Edit Popover**
Clicking an attribute (price, tag, status, assignee) opens a small inline popover with just that field for editing — not a full record edit form.
Impact: Single-field edits without full modal overhead — friction proportional to action size.

**#490 Preview Popover**
Hovering a link, user mention, or file reference shows a rich preview card — title, image, description, key metadata — without navigating. Wikipedia-style hover previews.
Impact: Context checked without navigation — link clicking becomes intentional not exploratory.

---

## Category 50: Command Input & Power User Tools (#491–#500)

**#491 Slash Command Menu**
Typing "/" in a text input or editor opens a menu of available actions and content types. Notion and Linear's signature interaction — eliminates toolbar hunting for editor actions.
Impact: All editor actions reachable from keyboard at cursor position — zero UI navigation.

**#492 @ Mention with Rich Linking**
Typing @ opens a picker that links to users, documents, issues, or entities — not just usernames. Cross-entity linking creates a knowledge graph within the application.
Impact: Any resource linkable from any text field — cross-referencing becomes effortless.

**#493 # Tag Autocomplete**
Typing # opens a tag/topic autocomplete. Selecting adds a structured tag rather than freeform text. Existing tags suggested; new ones created on Enter.
Impact: Consistent taxonomy maintained without central enforcement — organic tag reuse.

**#494 Advanced Search Syntax**
A search box supporting operators: from:user, date:>2024-01-01, type:document, has:attachment, is:unread. Documented syntax discoverable via "?" or help icon near search.
Impact: Power users build precise queries without UI filter panels — expert-level search speed.

**#495 Hotkey Customization**
A settings panel where users can rebind keyboard shortcuts to their preferred keys. Used in code editors (VS Code), creative tools, and complex productivity apps.
Impact: Muscle memory preserved — users coming from other tools don't relearn shortcuts.

**#496 Quick Action Bar**
A persistent bar (often bottom of screen) showing the most frequent user actions derived from usage patterns — personalized shortcuts that surface automatically.
Impact: Most-used actions accessible in one keystroke — learned from behavior, not configuration.

**#497 Multi-cursor / Multi-Select Editing**
Holding a modifier key while clicking adds additional cursors or selection ranges in an editor — enabling simultaneous editing of multiple locations in a file.
Impact: Repetitive multi-location edits done in a single operation — regex-level power in visual UI.

**#498 Command Palette Search with Fuzzy Matching**
The command palette searches by fuzzy match across commands, pages, settings, and recent items — "nw doc" finds "New Document", "nav sett" finds "Navigation Settings".
Impact: Commands reachable without knowing exact names — prefix typing sufficient.

**#499 Saved / Pinned Searches**
Users can save a complex search query (filters, sort, date range) with a name, making it a one-click shortcut in a "Saved Searches" panel or sidebar.
Impact: Repeated research queries reduced to one click — complex filters not re-built.

**#500 Variable / Template Shortcodes**
In content and communication templates, typing {{variable_name}} inserts a placeholder replaced by dynamic data at send/publish time. Email template and doc merge field standard.
Impact: Personalized content at scale without individual editing — merge fields power CRM emails.
