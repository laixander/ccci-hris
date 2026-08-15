# Nuxt 4 Directory Structure

Source: https://nuxt.com/docs/4.x/directory-structure

Nuxt 4 nests almost all app code under `app/`, separating it clearly from `server/` and root-level config. This is the layout Antigravity (or any agent) should generate/expect for a Nuxt UI project.

```
my-nuxt-app/
├── app/                      # Main application directory (srcDir)
│   ├── assets/                # Build-processed assets (CSS, images, fonts). Nuxt UI's
│   │                           # CSS entrypoint lives here: app/assets/css/main.css
│   ├── components/            # Vue components, auto-imported. Nuxt UI's own U* components
│   │                           # are globally auto-imported separately — no need to
│   │                           # re-export them here.
│   ├── composables/            # Auto-imported composables (useXyz.ts)
│   ├── layouts/                 # Layout components wrapping pages (default.vue, etc.)
│   ├── middleware/               # Route middleware, runs before navigation
│   ├── pages/                     # File-based routing
│   ├── plugins/                    # Vue plugins run at app creation
│   ├── utils/                       # Auto-imported utility functions
│   ├── app.vue                       # Root component — wrap with <UApp> here
│   ├── app.config.ts                  # Reactive runtime config — Nuxt UI theme
│   │                                    # overrides (colors, per-component slots/
│   │                                    # variants/compoundVariants) go under the
│   │                                    # `ui` key here
│   └── error.vue                       # Custom error page
├── content/                  # Nuxt Content markdown/CMS files (if @nuxt/content installed)
├── layers/                   # Reusable/shared Nuxt layers, auto-registered
├── modules/                  # Local custom Nuxt modules
├── public/                   # Served as-is at the root (favicon.ico, robots.txt, ...)
├── server/                   # Nitro server code
│   ├── api/                    # API routes (server/api/foo.ts → /api/foo)
│   ├── routes/                  # Non-API server routes (e.g. dynamic /sitemap.xml)
│   ├── middleware/                # Server middleware
│   ├── plugins/                    # Nitro plugins
│   └── utils/                       # Auto-imported server-only utilities
├── shared/                   # Code usable from BOTH app/ and server/ (types, constants, utils)
├── test/                     # Unit / Nuxt runtime / e2e tests
├── .env
├── .gitignore
├── .nuxtignore                # Exclude files from the build phase
├── .nuxtrc                     # Alternate flat-file config syntax
├── nuxt.config.ts               # Main Nuxt config — @nuxt/ui goes in `modules`, plus
│                                  # the `ui` key for module options (prefix, theme.colors,
│                                  # theme.defaultVariants, experimental.componentDetection, ...)
├── package.json
└── tsconfig.json
```

Generated/build-only directories (do not hand-edit, do not commit): `.nuxt/` (dev build artifacts — also where Nuxt UI writes generated per-component theme files at `.nuxt/ui/<component>.ts`), `.output/` (production build output), `node_modules/`.

## Where Nuxt UI–specific things live

| What | Path |
|---|---|
| Tailwind + Nuxt UI CSS import, `@theme` tokens, `--ui-*` overrides | `app/assets/css/main.css` |
| `<UApp>` root wrapper | `app/app.vue` |
| Runtime theme config (`ui.colors`, per-component `ui.<component>` overrides) | `app/app.config.ts` |
| Module-level options (`prefix`, `theme.colors` registration, `theme.defaultVariants`, `theme.unstyled`, `experimental.componentDetection`) | `nuxt.config.ts` (`ui` key) |
| Generated theme reference for exact slot/variant class names | `.nuxt/ui/<component>.ts` (auto-generated, read-only, git-ignored) |
| Your own reusable components composed from `U*` primitives | `app/components/` |
| Pages built from Nuxt UI layout components (`Page`, `PageHeader`, dashboard components, etc.) | `app/pages/` |

## Nuxt 3 → 4 note
Prior to Nuxt 4, app code lived at the project root instead of under `app/` (e.g. `components/`, `pages/`, `composables/` directly in the root). If working in an older Nuxt 3 project, check `nuxt.config.ts`/`srcDir` before assuming the `app/`-nested layout applies.
