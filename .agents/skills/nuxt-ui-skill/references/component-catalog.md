# Nuxt UI Component Catalog (v4, 125+ components)

All components are auto-imported with a `U` prefix (e.g. `Button` → `<UButton>`). Doc URLs follow the pattern `https://ui.nuxt.com/docs/components/<kebab-case-name>` (raw markdown at `https://ui.nuxt.com/raw/docs/components/<kebab-case-name>.md`).

For exact props/slots/events, use the MCP server (`get_component_metadata`) or fetch the doc URL — this file is for **choosing the right component**, not full API reference.

## Element

| Component | Purpose |
|---|---|
| Button | Button element that can act as a link or trigger an action. Core CTA component. |
| Badge | Short text to represent a status or category. |
| Avatar | `<img>` with fallback and Nuxt Image support. |
| AvatarGroup | Stack multiple avatars in a group. |
| Chip | Numeric or state indicator, usually anchored to another element (e.g. notification count on an icon). |
| Kbd | Displays a keyboard key/shortcut. |
| Icon | Displays any icon from Iconify or another icon component. |
| Link | Wrapper around `<NuxtLink>` with extra props (active state, exact matching, etc). |
| Separator | Separates content horizontally or vertically. |
| User | Displays user info (name, description, avatar) as a compact unit. |

## Form

| Component | Purpose |
|---|---|
| Form | Form wrapper with built-in validation (Standard Schema: Zod/Valibot/Yup/ArkType) and submission handling. |
| FormField | Wraps a single form control, providing label, hint, error message, and validation wiring. |
| FieldGroup | Groups multiple button-like/input elements together visually (e.g. input + button as one unit). |
| Input | Single-line text input. |
| Textarea | Multi-line text input. |
| InputNumber | Numeric input with customizable range, step controls. |
| InputDate | Date selection input. |
| InputTime | Time selection input. |
| InputTags | Input that renders entered values as interactive tags/chips. |
| InputRating | Collects a star/numeric rating from the user. |
| InputMenu | Autocomplete input with real-time filtered suggestions. |
| PinInput | Segmented input for PIN/OTP codes. |
| ColorPicker | Select a color (hex/rgb/hsl). |
| Select | Native-feeling select dropdown from a list of options. |
| SelectMenu | Advanced searchable select (multi-select, groups, custom item rendering). |
| Listbox | Selectable list of items with search, virtualization, rich item rendering — for inline (non-popover) selection UIs. |
| Checkbox | Single checkbox toggle. |
| CheckboxGroup | Multiple checkboxes as a checklist, select many from a list. |
| RadioGroup | Radio buttons, select one from a list. |
| Switch | Two-state toggle control. |
| Slider | Numeric value picker within a range, draggable handle(s). |
| FileUpload | File input with drag-and-drop, previews. |
| AuthForm | Pre-built, customizable form for login/register/password-reset flows. |

## Data Display

| Component | Purpose |
|---|---|
| Table | Responsive data table — rows/columns, sorting, selection, pagination-friendly. |
| Calendar | Select single dates, multiple dates, or date ranges. |
| Tree | Hierarchical data display/interaction (file trees, nested categories). |
| Timeline | Sequence of events with dates, titles, icons or avatars. |
| Progress | Progress bar/indicator for task completion. |
| Pagination | Buttons/links to navigate through pages of data. |
| Skeleton | Placeholder shown while content loads. |
| Empty | Empty-state placeholder (no data, no results, etc). |
| Error | Pre-built error display, integrates with `NuxtError`. |

## Navigation

| Component | Purpose |
|---|---|
| Breadcrumb | Hierarchy of links to navigate a site. |
| NavigationMenu | Horizontal or vertical list of navigation links, supports nesting/flyouts. |
| Tabs | Tab panels displayed one at a time. |
| Stepper | Steps indicating progress through a multi-step process (wizards, checkout). |
| CommandPalette | Full-text fuzzy search (Fuse.js) command/action launcher (⌘K style). |
| ContentNavigation | Accordion-style nav for organizing page/doc links (sidebar for docs sites). |
| ContentSearch | Ready-to-use CommandPalette wired for documentation search. |
| ContentSearchButton | Pre-styled button that opens `ContentSearch`. |
| ContentSurround | Prev/next link pair to navigate between doc pages. |
| ContentToc | Sticky table of contents with active-anchor highlighting. |
| ContextMenu | Right-click context menu. |
| DropdownMenu | Menu of actions on click of a trigger element. |
| Pagination | (see Data Display) |
| LocaleSelect | Select to switch between i18n locales. |

## Overlay

| Component | Purpose |
|---|---|
| Modal | Dialog window for messages or user input; can be controlled via `useOverlay()`. |
| Slideover | Dialog that slides in from a screen edge. |
| Drawer | Dialog that smoothly slides in/out, typically bottom-anchored (mobile-friendly). |
| Popover | Non-modal floating dialog anchored to a trigger element. |
| Tooltip | Popup revealing info on hover. Requires `<UApp>`. |
| Toast | Succinct feedback/notification message. Requires `<UApp>` + `useToast()`. |
| ContextMenu | (see Navigation) |
| DropdownMenu | (see Navigation) |

## Layout

| Component | Purpose |
|---|---|
| Container | Centers and constrains content width (`--ui-container` variable). |
| Card | Content card with header/body/footer slots. |
| Collapsible | Toggle visibility of a block of content. |
| Accordion | Stacked set of collapsible panels. |
| Main | `<main>` element that fills available viewport height. |
| Header | Responsive site header. |
| Footer | Responsive site footer. |
| FooterColumns | Columns of links to display inside `Footer`. |
| Page | Grid layout for a page with optional left/right columns. |
| PageHeader | Responsive header for an individual page. |
| PageHero | Responsive hero section for a page. |
| PageSection | Responsive content section wrapper. |
| PageBody | Main content area of a `Page`. |
| PageAside | Sticky aside for in-page navigation. |
| PageAnchors | List of anchor links displayed on the page. |
| PageLinks | List of links displayed on the page. |
| PageList | Vertical stacked-list layout. |
| PageGrid | Responsive grid layout system. |
| PageColumns | Responsive multi-column layout for side-by-side content. |
| PageCard | Pre-styled card with title/description/optional link, for feature/link grids. |
| PageCTA | Call-to-action section for pages. |
| PageFeature | Showcases a key feature (icon/title/description). |
| PageLogos | Row/grid of logos or images (e.g. "trusted by"). |
| Marquee | Infinite scrolling content strip. |
| Carousel | Motion + swipe carousel (built on Embla). |
| ScrollArea | Flexible scroll container with virtualization support. |
| Theme | Headless component that scopes theme overrides to its descendants. |
| App | Root wrapper providing global config; required for Toast/Tooltip/overlays. |

## Dashboard

| Component | Purpose |
|---|---|
| DashboardGroup | Fixed layout root providing sidebar-state context (open/collapsed) + persistence. |
| DashboardNavbar | Responsive navbar for dashboard layouts. |
| DashboardSidebar | Resizable, collapsible dashboard sidebar. |
| DashboardSidebarCollapse | Button to collapse the sidebar (desktop). |
| DashboardSidebarToggle | Button to toggle the sidebar (mobile). |
| DashboardPanel | Resizable main content panel. |
| DashboardResizeHandle | Drag handle to resize sidebar/panel. |
| DashboardToolbar | Toolbar displayed under the navbar. |
| DashboardSearch | Ready-to-use CommandPalette for dashboard search. |
| DashboardSearchButton | Pre-styled button that opens `DashboardSearch`. |

## Chat / AI

| Component | Purpose |
|---|---|
| Chat | Full AI chat interface: streaming, reasoning display, tool-call display. |
| ChatMessage | Single chat message with icon/avatar/actions. |
| ChatMessages | List of chat messages; integrates with Vercel AI SDK message format. |
| ChatPrompt | Enhanced Textarea for submitting prompts. |
| ChatPromptSubmit | Submit button with automatic streaming-status handling (loading/stop states). |
| ChatReasoning | Collapsible display of AI "thinking"/reasoning content. |
| ChatTool | Collapsible display of a tool invocation and its status/result. |
| ChatShimmer | Text shimmer/loading animation for "typing" states. |
| ChatPalette | Chatbot UI packaged inside an overlay (command-palette-style chat). |

## Editor (rich text, TipTap-based)

| Component | Purpose |
|---|---|
| Editor | Rich text editor (TipTap) supporting markdown/HTML/JSON content. |
| EditorToolbar | Formatting toolbar — fixed, bubble, or floating menu modes. |
| EditorDragHandle | Draggable handle to reorder/select blocks. |
| EditorEmojiMenu | Emoji picker triggered by typing `:`. |
| EditorMentionMenu | @mention suggestion menu. |
| EditorSuggestionMenu | Slash-command (`/`) menu for formatting/actions. |

## Color Mode

| Component | Purpose |
|---|---|
| ColorModeButton | Button to switch light/dark mode. |
| ColorModeSwitch | Switch control to toggle light/dark. |
| ColorModeSelect | Select between system/dark/light. |
| ColorModeImage | `<img>` with different source per color mode. |
| ColorModeAvatar | Avatar with different source per color mode. |

## Content / Marketing

| Component | Purpose |
|---|---|
| BlogPost | Customizable article card for a blog listing/page. |
| BlogPosts | Responsive grid of `BlogPost`s. |
| ChangelogVersion | Article-style entry for a single changelog/release. |
| ChangelogVersions | Timeline list of `ChangelogVersion`s. |
| PricingPlan | Single pricing plan/tier card. |
| PricingPlans | Responsive grid of `PricingPlan`s. |
| PricingTable | Tiered pricing table with feature-by-feature comparison rows. |
| Banner | Top-of-site banner for announcements. |

## Composables (not components, but core to the API)

| Composable | Purpose |
|---|---|
| `useOverlay()` | Programmatically open/close/control Modal, Slideover, Drawer instances. |
| `useToast()` | Trigger Toast notifications imperatively. |
| `useTour()` | Build guided product tours by re-anchoring one Popover across steps. |
| `useScrollShadow()` | Apply scroll-shadow affordances to a scrollable element. |
| `defineShortcuts()` | Register keyboard shortcuts declaratively. |
| `extractShortcuts()` | Derive keyboard shortcuts from menu-item definitions. |
| `defineLocale()` / `extendLocale()` | Create or extend an i18n locale for Nuxt UI's own translated strings. |

## Selection guide (common ambiguities)

- **Select vs SelectMenu vs Listbox vs InputMenu**: `Select` = simple native-style dropdown, few static options. `SelectMenu` = searchable, supports multi-select/groups/custom rendering, still a popover. `Listbox` = same rich item rendering as SelectMenu but rendered inline (no popover) — use for always-visible option lists. `InputMenu` = free-text input with autocomplete suggestions (value doesn't have to match a suggestion).
- **Modal vs Slideover vs Drawer vs Popover**: `Modal` = centered blocking dialog. `Slideover` = edge-anchored blocking panel (settings, cart). `Drawer` = swipeable, often bottom-anchored, mobile-first. `Popover` = non-blocking, anchored to a trigger, dismissable by outside click.
- **DropdownMenu vs ContextMenu vs CommandPalette**: `DropdownMenu` = click-triggered action menu. `ContextMenu` = right-click-triggered. `CommandPalette` = searchable command launcher, usually global (⌘K).
- **Card vs PageCard**: `Card` = generic content container (header/body/footer slots). `PageCard` = opinionated marketing/feature card with title/description/link, built for grids.
- **Table vs Tree**: `Table` = flat/tabular rows+columns. `Tree` = nested/hierarchical data.
