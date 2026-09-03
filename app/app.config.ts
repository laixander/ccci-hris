export default defineAppConfig({
  ui: {
    colors: {
      primary: 'teal',
      neutral: 'taupe',
      // Full Tailwind palette
      red: 'red',
      orange: 'orange',
      amber: 'amber',
      yellow: 'yellow',
      lime: 'lime',
      green: 'green',
      emerald: 'emerald',
      teal: 'teal',
      cyan: 'cyan',
      sky: 'sky',
      blue: 'blue',
      indigo: 'indigo',
      violet: 'violet',
      purple: 'purple',
      fuchsia: 'fuchsia',
      pink: 'pink',
      rose: 'rose',
    },
    select: {
      slots: {
        viewport: 'scrollbar',
      },
    },
    selectMenu: {
      slots: {
        base: 'scrollbar',
      }
    },
    table: {
      slots: {
        root: 'scrollbar',
      }
    },
    modal: {
      variants: {
        transition: {
          true: {
            content: 'data-[state=open]:animate-slide-down-in data-[state=closed]:animate-slide-down-out'
          }
        }
      }
    }
  }
})