# Nuxt UI Design System

Source: https://ui.nuxt.com/docs/getting-started/theme/design-system

Nuxt UI's design system is built on Tailwind CSS v4's CSS-first `@theme` configuration — no `tailwind.config.js` needed.

## Base setup

```css
/* app/assets/css/main.css */
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
  /* your custom design tokens */
}
```

> Tailwind v4 Preflight sets `cursor: default` on buttons (matches browser default, not `cursor: pointer`). To restore pointer cursor globally:
> ```css
> @layer base {
>   button:not(:disabled),
>   [role="button"]:not(:disabled) {
>     cursor: pointer;
>   }
> }
> ```

## Fonts

```css
@theme {
  --font-sans: 'Public Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```
In Nuxt, fonts declared here are auto-loaded/optimized by `@nuxt/fonts` (bundled with `@nuxt/ui`).

## Colors

Override existing Tailwind shades or define brand-new color scales with `--color-*`:

```css
@theme static {
  /* override a default Tailwind color */
  --color-green-50: #EFFDF5;
  --color-green-100: #D9FBE8;
  --color-green-200: #B3F5D1;
  --color-green-300: #75EDAE;
  --color-green-400: #00DC82;
  --color-green-500: #00C16A;
  --color-green-600: #00A155;
  --color-green-700: #007F45;
  --color-green-800: #016538;
  --color-green-900: #0A5331;
  --color-green-950: #052E16;

  /* define a brand-new custom color */
  --color-brand-50: #fef2f2;
  --color-brand-100: #fee2e2;
  --color-brand-200: #fecaca;
  --color-brand-300: #fca5a5;
  --color-brand-400: #f87171;
  --color-brand-500: #ef4444;
  --color-brand-600: #dc2626;
  --color-brand-700: #b91c1c;
  --color-brand-800: #991b1b;
  --color-brand-900: #7f1d1d;
  --color-brand-950: #450a0a;
}
```
**Rule: always define all shades 50→950 for any custom color** — Nuxt UI's semantic system picks specific shades (e.g. 500 for light mode, 400 for dark mode) so partial scales break theming.

### Breakpoints

```css
@theme {
  --breakpoint-3xl: 1920px;
  --breakpoint-4xl: 2560px;
  --breakpoint-5xl: 3840px;
}
```

### Motion / easing

```css
@theme {
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```
Enter/exit animations use `--ease-out`; indeterminate loading animations use `--ease-in-out`. Overriding these two retimes the whole library. When `prefers-reduced-motion` is set, overlays fade in place instead of scaling/sliding, and movement transitions are disabled automatically.

## Semantic color system

Nuxt UI names colors by **purpose**, not by hue, so swapping the underlying palette re-themes the whole app with zero markup changes.

| Semantic alias | Default palette | Used for |
|---|---|---|
| `primary` | green | Main CTAs, active nav, brand elements, important links |
| `secondary` | blue | Secondary buttons, alternative actions, complementary UI |
| `success` | green | Success messages, completed states, positive confirmations |
| `info` | blue | Info alerts, tooltips, help text, neutral notifications |
| `warning` | yellow | Warning messages, pending states, attention-needed items |
| `error` | red | Error messages, validation errors, destructive actions |
| `neutral` | slate | Text, borders, backgrounds, disabled states |

These are the values accepted by every component's `color` prop:
```vue
<UButton color="primary">Save Changes</UButton>
```

### Runtime configuration — remap semantic aliases to palettes

**Nuxt** (`app/app.config.ts`):
```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      secondary: 'purple',
      neutral: 'zinc'
    }
  }
})
```

**Vue** (`vite.config.ts`):
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

export default defineConfig({
  plugins: [
    vue(),
    ui({ ui: { colors: { primary: 'blue', secondary: 'purple', neutral: 'zinc' } } })
  ]
})
```

You can only assign colors that exist in your theme: Tailwind's default palette (`blue`, `green`, `zinc`, ...) or custom colors you defined via `@theme`. You **cannot** assign a non-scaled value like `black`/`white` directly here — for solid black/white, set the CSS variable directly instead (see `css-variables.md`).

### Adding a new semantic alias (e.g. `tertiary`)

**Nuxt** — register in `nuxt.config.ts`, then assign in `app.config.ts`:
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  ui: { theme: { colors: ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error'] } }
})
```
```ts
// app/app.config.ts
export default defineAppConfig({
  ui: { colors: { primary: 'blue', secondary: 'purple', tertiary: 'indigo' } }
})
```

**Vue** — do both in `vite.config.ts`:
```ts
ui({
  theme: { colors: ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error'] },
  ui: { colors: { primary: 'blue', secondary: 'purple', tertiary: 'indigo' } }
})
```

Then use it like any built-in color: `<UButton color="tertiary">Special Action</UButton>`.
