# Customizing Nuxt UI Components (Tailwind Variants API)

Source: https://ui.nuxt.com/docs/getting-started/theme/components

Nuxt UI components are styled with [Tailwind Variants](https://www.tailwind-variants.org/). `tailwind-merge` runs under the hood, so overriding classes never leaves conflicting/duplicate utility classes behind — new classes cleanly replace old ones for the same CSS property.

**Override priority, highest wins:** `ui` prop / `class` prop → `<UTheme>` wrapper → global `app.config.ts` → component theme defaults.

## Anatomy: slots

Multi-part components expose named `slots` (root/header/body/footer/label/icon/...). Example — `Card`:
```ts
export default {
  slots: {
    root: 'bg-default ring ring-default divide-y divide-default rounded-lg',
    header: 'p-4 sm:px-6',
    body: 'p-4 sm:p-6',
    footer: 'p-4 sm:px-6'
  }
}
```
Single-element components (no slots) only expose a `base` string, e.g. `Container`:
```ts
export default { base: 'max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8' }
```
> Components **without** slots have no `ui` prop — only `class` works on them.

## Anatomy: variants

`variants` map a prop value to per-slot classes. Example — `Avatar`'s `size`:
```ts
export default {
  slots: {
    root: 'inline-flex items-center justify-center shrink-0 select-none overflow-hidden rounded-full align-middle bg-elevated',
    image: 'h-full w-full rounded-[inherit] object-cover'
  },
  variants: {
    size: {
      sm: { root: 'size-7 text-sm' },
      md: { root: 'size-8 text-base' },
      lg: { root: 'size-9 text-lg' }
    }
  },
  defaultVariants: { size: 'md' }
}
```
`<UAvatar size="lg" />` applies the `lg` classes to `root`.

## Anatomy: compoundVariants

Applied when multiple variant conditions match simultaneously — e.g. `Button`'s `color` + `variant: 'outline'` combination generates a ring/text/hover class set per color.

## Where to look up a component's theme

- The "Theme" section on each component's doc page.
- Source: https://github.com/nuxt/ui/tree/v4/src/theme
- Generated in the user's own project: Nuxt → `.nuxt/ui/<component>.ts`; Vue → `node_modules/.nuxt-ui/ui/<component>.ts` (exact slot names + default classes for that project's config).

## 1. Global config — retheme a component everywhere

**Nuxt** (`app/app.config.ts`):
```ts
export default defineAppConfig({
  ui: {
    button: {
      slots: { base: 'font-bold' },
      variants: { size: { md: { leadingIcon: 'size-4' } } },
      compoundVariants: [{
        color: 'neutral',
        variant: 'outline',
        class: 'ring-default hover:bg-accented'
      }],
      defaultVariants: { color: 'neutral', variant: 'outline' }
    }
  }
})
```
**Vue** (`vite.config.ts`, inside the `ui()` plugin's `ui` key): identical object shape.

This merges onto existing defaults (`font-bold` + `font-medium` → both win where they don't collide, `tailwind-merge` resolves true conflicts). To **replace** a slot's classes entirely instead of merging, use a function:
```ts
export default defineAppConfig({
  ui: { button: { slots: { label: () => 'text-base font-bold' } } }
})
```
To strip Nuxt UI's default classes from *every* component (keep only structure), set `ui.theme.unstyled: true` in `nuxt.config.ts` / the vite plugin config — warning: this also removes structural classes (positioning/flex/grid/transitions), not just cosmetic ones, so layout-heavy components (`Modal`, `Drawer`, `Calendar`) will need their layout re-supplied manually.

## 2. `<UTheme>` — scope overrides to a subtree

Overrides slots/prop defaults for descendants only, without touching the rest of the app. Wins over global config, loses to `ui`/`class` props on individual components:
```vue
<template>
  <UTheme :ui="{ button: { base: 'rounded-full' } }">
    <div class="flex items-center gap-2">
      <UButton label="Button" color="neutral" />
      <UButton label="Button" color="neutral" variant="outline" />
      <UButton label="Button" color="neutral" variant="subtle" />
    </div>
  </UTheme>
</template>
```

## 3. `ui` prop — override specific slots on one instance

Highest priority besides `class`. Takes precedence over global config and resolved variants:
```vue
<UButton
  trailing-icon="i-lucide-chevron-right"
  color="neutral"
  variant="outline"
  :ui="{ trailingIcon: 'rotate-90 size-3' }"
>
  Button
</UButton>
```
Function form replaces instead of merging, same as global config:
```vue
<UButton :ui="{ label: () => 'text-base font-bold' }" label="Button" />
```

## 4. `class` prop — override the root/base slot only

```vue
<UButton class="font-bold rounded-full">Button</UButton>
```

## Practical rules of thumb

- Reach for `class` first for one-off root-level tweaks.
- Reach for `ui` when you need to touch a slot other than root (icon, label, trailing element...).
- Reach for `<UTheme>` when several sibling components in one section need the same tweak, but the rest of the app shouldn't change.
- Reach for `app.config.ts` when the change should apply to every instance of a component app-wide (this is also where you change **default** `color`/`variant`/`size` for a component).
- Never write custom scoped `<style>` blocks or `!important` to fight Nuxt UI's classes — there's a supported layer for it.
