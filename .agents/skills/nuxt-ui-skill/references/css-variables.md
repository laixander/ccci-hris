# Nuxt UI CSS Variables

Source: https://ui.nuxt.com/docs/getting-started/theme/css-variables

Nuxt UI uses `--ui-*` CSS variables as design tokens with automatic light/dark values. Customize by overriding them in `app/assets/css/main.css` (Nuxt) or your global CSS entry (Vue), under `:root` (light) and `.dark` (dark). All utility classes below map to one of these variables — **always prefer the semantic class over a raw Tailwind color class.**

## Colors — semantic utility classes

`text-primary`, `text-secondary`, `text-success`, `text-info`, `text-warning`, `text-error` (also usable as `bg-*`, `border-*`, `ring-*`, etc.)

```css
/* Light */
:root {
  --ui-primary: var(--ui-color-primary-500);
  --ui-secondary: var(--ui-color-secondary-500);
  --ui-success: var(--ui-color-success-500);
  --ui-info: var(--ui-color-info-500);
  --ui-warning: var(--ui-color-warning-500);
  --ui-error: var(--ui-color-error-500);
}
/* Dark */
.dark {
  --ui-primary: var(--ui-color-primary-400);
  --ui-secondary: var(--ui-color-secondary-400);
  --ui-success: var(--ui-color-success-400);
  --ui-info: var(--ui-color-info-400);
  --ui-warning: var(--ui-color-warning-400);
  --ui-error: var(--ui-color-error-400);
}
```
Adjust which shade is used per mode by overriding, e.g.:
```css
:root { --ui-primary: var(--ui-color-primary-700); }
.dark { --ui-primary: var(--ui-color-primary-200); }
```
To use solid black/white as `primary` (colors without a shade scale), set the variable directly rather than via the `colors` config:
```css
:root { --ui-primary: black; }
.dark  { --ui-primary: white; }
```

## Text colors

`text-dimmed` `text-muted` `text-toned` `text-default` `text-highlighted` `text-inverted`

```css
/* Light */
:root {
  --ui-text-dimmed: var(--ui-color-neutral-400);
  --ui-text-muted: var(--ui-color-neutral-500);
  --ui-text-toned: var(--ui-color-neutral-600);
  --ui-text: var(--ui-color-neutral-700);
  --ui-text-highlighted: var(--ui-color-neutral-900);
  --ui-text-inverted: white;
}
/* Dark */
.dark {
  --ui-text-dimmed: var(--ui-color-neutral-500);
  --ui-text-muted: var(--ui-color-neutral-400);
  --ui-text-toned: var(--ui-color-neutral-300);
  --ui-text: var(--ui-color-neutral-200);
  --ui-text-highlighted: white;
  --ui-text-inverted: var(--ui-color-neutral-900);
}
```
> To shift many of these at once, remap the `neutral` alias in config instead of overriding each variable individually.

## Background colors

`bg-default` `bg-muted` `bg-elevated` `bg-accented` `bg-inverted`

```css
/* Light */
:root {
  --ui-bg: white;
  --ui-bg-muted: var(--ui-color-neutral-50);
  --ui-bg-elevated: var(--ui-color-neutral-100);
  --ui-bg-accented: var(--ui-color-neutral-200);
  --ui-bg-inverted: var(--ui-color-neutral-900);
}
/* Dark */
.dark {
  --ui-bg: var(--ui-color-neutral-900);
  --ui-bg-muted: var(--ui-color-neutral-800);
  --ui-bg-elevated: var(--ui-color-neutral-800);
  --ui-bg-accented: var(--ui-color-neutral-700);
  --ui-bg-inverted: white;
}
```

## Border colors

`border-default` `border-muted` `border-accented` `border-inverted`

```css
/* Light */
:root {
  --ui-border: var(--ui-color-neutral-200);
  --ui-border-muted: var(--ui-color-neutral-200);
  --ui-border-accented: var(--ui-color-neutral-300);
  --ui-border-inverted: var(--ui-color-neutral-900);
}
/* Dark */
.dark {
  --ui-border: var(--ui-color-neutral-800);
  --ui-border-muted: var(--ui-color-neutral-700);
  --ui-border-accented: var(--ui-color-neutral-700);
  --ui-border-inverted: white;
}
```

## Focus ring (v4.9+)

Every interactive element gets a `focus-visible` outline tinted by its `color` prop (e.g. `outline-primary/25`). To force one outline color app-wide regardless of component color, add (outside any `@layer` so it wins):

```css
/* Primary-tinted focus everywhere */
*, ::before, ::after { @apply outline-primary/25; }
*:focus-visible, *:has(> a:focus-visible) { --tw-ring-color: var(--ui-primary); }
```
```css
/* Neutral-tinted focus everywhere */
*, ::before, ::after { @apply outline-inverted/25; }
*:focus-visible, *:has(> a:focus-visible) { --tw-ring-color: var(--ui-border-inverted); }
```

## Radius

`--ui-radius` is the single base value driving `rounded-xs` … `rounded-3xl` everywhere in the app (Nuxt UI overrides Tailwind's default radius scale):

```css
:root { --ui-radius: 0.25rem; }
```
```css
@theme {
  --radius-xs: calc(var(--ui-radius) * 0.5);
  --radius-sm: var(--ui-radius);
  --radius-md: calc(var(--ui-radius) * 1.5);
  --radius-lg: calc(var(--ui-radius) * 2);
  --radius-xl: calc(var(--ui-radius) * 3);
  --radius-2xl: calc(var(--ui-radius) * 4);
  --radius-3xl: calc(var(--ui-radius) * 6);
}
```
Customize just the base value:
```css
:root { --ui-radius: 0.5rem; }
```
> Changing `--ui-radius` also affects `rounded-*` classes on your own markup and third-party components, not just Nuxt UI components.

## Container

Controls the max-width of the `Container` component:
```css
:root { --ui-container: 80rem; /* = var(--container-7xl) */ }
```
```css
@theme { --container-8xl: 90rem; }
:root { --ui-container: var(--container-8xl); }
```

## Header height

Controls the `Header` component's height:
```css
:root { --ui-header-height: 4rem; }
```
```css
:root { --ui-header-height: --spacing(24); }
```

## Body defaults

Nuxt UI applies base classes to `<body>` for consistent light/dark theming:
```css
body {
  @apply antialiased text-default bg-default scheme-light dark:scheme-dark;
}
```

## Complete customization example

```css
/* app/assets/css/main.css */
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
  --font-sans: 'Inter', sans-serif;
}

:root {
  --ui-radius: 0.5rem;
  --ui-text: var(--ui-color-neutral-900);
  --ui-bg: var(--ui-color-neutral-50);
}

.dark {
  --ui-text: white;
  --ui-bg: var(--ui-color-neutral-950);
}
```
