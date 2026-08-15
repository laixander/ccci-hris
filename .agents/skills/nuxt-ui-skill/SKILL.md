---
name: nuxt-ui
description: Comprehensive reference for building UIs with Nuxt UI v4 (@nuxt/ui), the Vue/Nuxt component library built on Reka UI, Tailwind CSS v4, and Tailwind Variants. Use whenever the user works in a Nuxt or Vue project and mentions Nuxt UI, NuxtUI, @nuxt/ui, U-prefixed components (UButton, UCard, UModal, UTable, UForm, etc.), Tailwind design systems, app.config.ts theming, semantic colors, or asks to build pages, dashboards, forms, or layouts in Nuxt/Vue — even without saying "Nuxt UI" by name, since it's the default UI layer for most modern Nuxt apps. Also use for Nuxt 4 directory structure (app/, server/, pages/, components/) questions on Nuxt UI projects. Covers all 125+ components, the full CSS variable/design-token system, Tailwind Variants theming, installation for Nuxt and Vue, and wiring up the official Nuxt UI MCP server (including in Google Antigravity) for live prop/slot/event lookups.
---

# Nuxt UI (v4) Skill

Nuxt UI is a Vue component library (Nuxt optional) with 125+ accessible, production-ready components built on **Reka UI** (headless primitives/accessibility), **Tailwind CSS v4** (styling), and **Tailwind Variants** (variant API). It works in Nuxt, plain Vue + Vite, Laravel (Inertia), and AdonisJS.

This skill teaches **when to use which component and how to build correctly**. It is intentionally not a copy of every prop table — for exact, up-to-date props/slots/events, prefer the **live MCP server** (see below) or fetch the component's doc page. Use this file + `references/` for architecture, conventions, and the full component catalog.

## 0. Set this up first (do this before writing code)

1. **Confirm/install the Nuxt UI MCP server** so you can pull live, exact component APIs instead of guessing. See `references/mcp-and-antigravity-setup.md` — it includes the exact steps for **Google Antigravity**, Claude Code, Cursor, VS Code, Windsurf, and others.
2. If MCP isn't available in this session, fall back to fetching `https://ui.nuxt.com/raw/docs/components/<kebab-name>.md` for the authoritative component doc, or `https://ui.nuxt.com/llms.txt` for the full index.
3. Read `references/component-catalog.md` once per task to pick the right component(s) before writing markup.

## 1. Non-negotiable conventions

- **Always wrap the app in `<UApp>`** (`app.vue` in Nuxt, root component in Vue). It's required for `Toast`, `Tooltip`, and programmatic overlays (`useOverlay`) to work. It accepts a `locale` prop for i18n.
  ```vue
  <!-- app.vue -->
  <template>
    <UApp>
      <NuxtPage />
    </UApp>
  </template>
  ```
- **Use semantic color/text/bg/border tokens, never raw Tailwind palette classes.** Write `text-default`, `bg-elevated`, `border-muted`, `text-error` — not `text-gray-500` or `bg-slate-800`. This is what makes dark mode and re-theming work for free. Full list in `references/css-variables.md`.
- **Use the semantic `color` prop**, not custom classes, for component intent: `primary | secondary | success | info | warning | error | neutral`. See `references/design-system.md`.
- **Components are auto-imported** with a `U` prefix (`UButton`, `UCard`, `UModal`...). Don't manually import them in Nuxt. In plain Vue they're auto-imported too once the Vite plugin is configured (see `references/installation.md`).
- **Icons use the `i-{collection}-{name}` format** (e.g. `i-lucide-arrow-right`, `i-lucide-check`). `lucide` is the default collection (200,000+ icons via Iconify). Pass icon names as strings to `icon`, `leading-icon`, `trailing-icon` props — don't hand-roll `<svg>`.
- **Theme components via Tailwind Variants, not scoped CSS overrides.** Use the `class` prop (root/base slot only), the `ui` prop (any slot), global `app.config.ts` (all instances), or the `<UTheme>` wrapper (scoped subtree). Full mechanics in `references/theming-customization.md`. Never fight the library with `!important` or deeply nested CSS selectors.
- **Forms**: use `<UForm>` + `<UFormField>` with a Standard Schema validator (Zod, Valibot, Yup, ArkType...) rather than hand-rolled validation state.
- **Overlays** (Modal, Slideover, Drawer, Popover, Toast, ContextMenu, DropdownMenu): prefer the `useOverlay()` / `useToast()` composables for programmatic control over manually toggling `v-model` booleans when triggering from script logic (e.g. after an async action).

## 2. Quick install

**Nuxt:**
```bash
npx nuxi module add ui
```
```css
/* app/assets/css/main.css */
@import "tailwindcss";
@import "@nuxt/ui";
```
```vue
<!-- app.vue -->
<template><UApp><NuxtPage /></UApp></template>
```

**Vue (Vite, no Nuxt):** add `@nuxt/ui/vite` + `vue()` plugins to `vite.config.ts`, same CSS imports, wrap root in `<UApp>`. Full options (prefix, colorMode, theme.colors, defaultVariants, unstyled, i18n) in `references/installation.md`.

## 3. Design tokens at a glance

| Category | Examples | Details |
|---|---|---|
| Semantic colors | `primary`, `secondary`, `success`, `info`, `warning`, `error`, `neutral` | `references/design-system.md` |
| Text | `text-dimmed` `text-muted` `text-toned` `text-default` `text-highlighted` `text-inverted` | `references/css-variables.md` |
| Background | `bg-default` `bg-muted` `bg-elevated` `bg-accented` `bg-inverted` | `references/css-variables.md` |
| Border | `border-default` `border-muted` `border-accented` `border-inverted` | `references/css-variables.md` |
| Radius | `--ui-radius` drives `rounded-xs` … `rounded-3xl` | `references/css-variables.md` |
| Container / Header | `--ui-container`, `--ui-header-height` | `references/css-variables.md` |

All tokens are CSS variables (`--ui-*`) with automatic light/dark values, customizable in `app/assets/css/main.css` under `:root` and `.dark`, or by remapping which base color (`primary`, `neutral`, ...) each alias points to in `app.config.ts` / `vite.config.ts`.

## 4. Component catalog

Nuxt UI ships 125+ components across these categories — see **`references/component-catalog.md`** for the full list (every component, its purpose, and its doc URL):

- **Element**: Button, Badge, Avatar(+Group), Chip, Kbd, Icon, Link, Separator
- **Form**: Input, Textarea, Select, SelectMenu, InputMenu, Checkbox(Group), RadioGroup, Switch, Slider, PinInput, InputNumber, InputDate, InputTime, InputTags, InputRating, ColorPicker, FileUpload, Form, FormField, FieldGroup, AuthForm
- **Data**: Table, Calendar, Tree, Timeline, Progress, Pagination
- **Navigation**: Breadcrumb, NavigationMenu, Tabs, Stepper, CommandPalette, ContentNavigation
- **Overlay**: Modal, Slideover, Drawer, Popover, Tooltip, ContextMenu, DropdownMenu, Toast
- **Layout**: Container, Card, Collapsible, Accordion, Separator, Page* family (PageHeader, PageHero, PageGrid, PageCTA...), Footer, Header
- **Dashboard**: DashboardGroup, DashboardNavbar, DashboardSidebar, DashboardPanel, DashboardToolbar, DashboardSearch, DashboardResizeHandle
- **Chat / AI**: Chat, ChatMessage(s), ChatPrompt(Submit), ChatReasoning, ChatTool, ChatShimmer, ChatPalette
- **Editor**: Editor, EditorToolbar, EditorDragHandle, EditorEmojiMenu, EditorMentionMenu, EditorSuggestionMenu
- **Color Mode**: ColorModeButton, ColorModeSwitch, ColorModeSelect, ColorModeImage, ColorModeAvatar
- **Marketing/Content**: PricingPlan(s)/Table, BlogPost(s), Testimonial-style Page components, ChangelogVersion(s)
- **Utility/composables**: `useToast`, `useOverlay`, `useTour`, `useScrollShadow`, `defineShortcuts`, `defineLocale`

## 5. Theming & customization

Slots, variants, compoundVariants, default variants, `app.config.ts` global overrides, the `ui` prop, the `class` prop, and the `<UTheme>` component are all covered in **`references/theming-customization.md`**. Read this before writing custom CSS for a Nuxt UI component — there is almost always a supported theming mechanism instead.

## 6. Nuxt 4 project structure

If the project is Nuxt (not plain Vue), see **`references/nuxt-directory-structure.md`** for where things live: `app/` (components, pages, layouts, composables, `app.config.ts`, `app.vue`), `server/`, `shared/`, `public/`, `content/`, `layers/`, `modules/`. Nuxt UI's CSS entrypoint lives at `app/assets/css/main.css` and its runtime theme config lives at `app/app.config.ts`.

## 7. When you need exact props/slots/events

Don't guess prop names from memory. In order of preference:
1. MCP tool `get_component_metadata` (props/slots/events, lightweight) or `get_component` with `sections: ["api"]`.
2. Fetch `https://ui.nuxt.com/raw/docs/components/<kebab-name>.md`.
3. Generated theme files in the user's project: Nuxt → `.nuxt/ui/<component>.ts`, Vue → `node_modules/.nuxt-ui/ui/<component>.ts` — these show every slot, variant, and default class.

## Reference files

- `references/component-catalog.md` — every component, grouped, with description + doc link
- `references/design-system.md` — semantic colors, fonts, breakpoints, motion/easing, radius, runtime color config
- `references/css-variables.md` — full `--ui-*` variable reference (color/text/bg/border/radius/container/header) with light+dark values
- `references/theming-customization.md` — Tailwind Variants mechanics: slots, variants, compoundVariants, app.config, `ui`/`class` props, `<UTheme>`
- `references/installation.md` — Nuxt & Vue setup, all module options (prefix, colorMode, theme.colors, unstyled, defaultVariants, prefix scoping, component detection)
- `references/nuxt-directory-structure.md` — Nuxt 4 `app/`-based directory structure and where Nuxt UI config lives
- `references/mcp-and-antigravity-setup.md` — installing the Nuxt UI MCP server and skill, with exact steps for **Google Antigravity** plus Claude Code, Cursor, VS Code, Windsurf, Zed, ChatGPT
