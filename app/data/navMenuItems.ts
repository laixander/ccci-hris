import type { NavigationMenuItem } from '@nuxt/ui'

export const navigationMenuItemsByRole: Record<string, NavigationMenuItem[]> = {
    'Employee': [
        [
            { label: 'MAIN NAVIGATION', type: 'label' },
            { label: 'Dashboard', icon: 'i-lucide-pie-chart', to: '/dashboard' },
            { label: 'Inbox', icon: 'i-lucide-inbox', to: '/inbox'  },
            { label: 'Menu 3', icon: 'i-lucide-git-branch',  },
            { label: 'Menu 4', icon: 'i-lucide-users',  },
            { label: 'Menu 5', icon: 'i-lucide-file-text',  },
            { label: 'Menu 6', icon: 'i-lucide-folder-open',  },
            { label: 'Menu 7', icon: 'i-lucide-clipboard-check',  },
            { label: 'Menu 8', icon: 'i-lucide-chart-column',  },
            { label: 'Menu 9', icon: 'i-lucide-user-plus',  }
        ]
    ],
    'Head': [
        [
            { label: 'MAIN NAVIGATION', type: 'label' },
            { label: 'Menu 1', icon: 'i-lucide-folder-open', to: '/dashboard'  },
            { label: 'Menu 2', icon: 'i-lucide-chart-column',  }
        ]
    ],
    'Administrator': [
        [
            { label: 'MAIN NAVIGATION', type: 'label' },
            { label: 'Menu 3', icon: 'i-lucide-pie-chart',  },
            { label: 'Menu 4', icon: 'i-lucide-bell',  },
            { label: 'Menu 5', icon: 'i-lucide-settings',  }
        ]
    ]
}