<script setup lang="ts">
import type { NavigationMenuItem, SidebarProps } from '@nuxt/ui'

// Ignore the props for the example
defineProps<Pick<SidebarProps, 'variant' | 'collapsible' | 'side'>>()
const variant = ref<SidebarProps['variant']>('inset')
const collapsible = ref<SidebarProps['collapsible']>('icon')

const open = ref(true)

const isCollapsed = computed(() => collapsible.value === 'icon' && !open.value)

const items = computed<NavigationMenuItem[][]>(() => [
    [
        ...(isCollapsed.value ? [] : [{ 
            type: 'label' as const, 
            label: 'Self-Service' 
        }]),
        {
            label: 'Home',
            icon: 'i-lucide-layout-grid',
            to: '/'
        },
        {
            label: 'Approvals',
            icon: 'i-lucide-clipboard-list',
            to: '/approvals'
        },
        {
            label: 'Timesheet',
            icon: 'i-lucide-timer'
        },
        {
            label: 'DTR Evaluation',
            icon: 'i-lucide-clipboard-check'
        },
        {
            label: 'Leaves',
            icon: 'i-lucide-calendar'
        },
        {
            label: 'Overtime',
            icon: 'i-lucide-clock'
        },
        {
            label: 'Expenses',
            icon: 'i-lucide-piggy-bank'
        },
        {
            label: 'Payslip',
            icon: 'i-lucide-file-text'
        },
        {
            label: 'Service Request',
            icon: 'i-lucide-user'
        },
        {
            label: 'Calendar',
            icon: 'i-lucide-calendar-days'
        },
        {
            label: 'Directory',
            icon: 'i-lucide-book-open'
        },
        {
            label: 'My Performance',
            icon: 'i-lucide-trending-up'
        }
    ],
    [
        ...(isCollapsed.value ? [] : [{ 
            type: 'label' as const, 
            label: 'Human Resources' 
        }]),
        {
            label: 'Expenses',
            icon: 'i-lucide-receipt-text'
        }
    ],
    [
        ...(isCollapsed.value ? [] : [{ 
            type: 'label' as const, 
            label: 'Asset Management' 
        }]),
        {
            label: 'Inventory',
            icon: 'i-lucide-boxes'
        },
        {
            label: 'Asset Assignment',
            icon: 'i-lucide-arrow-left-right'
        },
        {
            label: 'Asset Categories',
            icon: 'i-lucide-tag'
        },
        {
            label: 'Asset Locations',
            icon: 'i-lucide-map-pin'
        },
        {
            label: 'Asset Analytics',
            icon: 'i-lucide-pie-chart'
        }
    ]
])

const route = useRoute()
const pageTitle = computed(() => {
    if (route.meta.title) return route.meta.title as string
    
    for (const group of items.value) {
        for (const item of group) {
            if ('to' in item && item.to === route.path) {
                return item.label
            }
        }
    }
    
    const path = route.path
    if (path === '/') return 'Dashboard'
    
    const segment = path.split('/').filter(Boolean).pop() || ''
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
})
</script>

<template>
    <div class="flex flex-1 h-screen w-full" :class="[
        variant === 'inset' && 'bg-neutral-50 dark:bg-neutral-950',
        side === 'right' && 'flex-row-reverse'
    ]">
        <USidebar v-model:open="open" :variant="variant" :collapsible="collapsible" :side="side"
            :ui="{ root: '[--sidebar-width-icon:4.5625rem]', container: 'h-full', header: 'px-5', body: 'scrollbar' }">
            <template #header="{ close }">
                <div v-if="!isCollapsed" class="flex items-center gap-2.5 flex-1">
                    <UIcon name="i-logos-nuxt-icon" class="size-8" />
                </div>
                <UButton :icon="side === 'left' ? 'i-lucide-panel-left' : 'i-lucide-panel-right'" color="neutral"
                    variant="ghost" aria-label="Toggle sidebar" @click="open = !open" class="invisible lg:visible" />
                <UButton class="lg:hidden ml-auto" icon="i-lucide-x" color="neutral" variant="ghost"
                    aria-label="Close sidebar" @click="close()" />
            </template>

            <UNavigationMenu :items="items" orientation="vertical" :collapsed="isCollapsed" :tooltip="{
                delayDuration: 200,
                content: { side: 'right', sideOffset: 12 },
                arrow: true,
            }" popover :ui="{
                root: 'gap-0.5',
                label: 'text-default uppercase tracking-widest py-2',
                link: 'p-2.5 overflow-hidden',
                list: 'space-y-0.5',
                separator: 'my-2.5',
            }" />

            <template #footer>
                <UserMenu :collapsed="isCollapsed" />
            </template>
        </USidebar>

        <div
            class="flex-1 flex flex-col overflow-hidden lg:peer-data-[variant=floating]:my-4 peer-data-[variant=inset]:m-4 lg:peer-data-[variant=inset]:not-peer-data-[collapsible=offcanvas]:ms-0 peer-data-[variant=inset]:rounded-xl peer-data-[variant=inset]:shadow-sm peer-data-[variant=inset]:ring peer-data-[variant=inset]:ring-default bg-default">
            <div class="h-(--ui-header-height) shrink-0 flex items-center px-4" :class="[
                variant !== 'floating' && 'border-b border-default',
                side === 'right' && 'justify-end'
            ]">
                <UButton :icon="side === 'left' ? 'i-lucide-panel-left' : 'i-lucide-panel-right'" color="neutral"
                    variant="ghost" aria-label="Toggle sidebar" @click="open = !open" class="lg:hidden" />

                <!-- page title -->
                <h1 class="text-lg font-semibold">{{ pageTitle }}</h1>
            </div>

            <div class="flex-1 p-4 overflow-y-auto scrollbar">
                <slot />
            </div>
        </div>
    </div>
</template>
