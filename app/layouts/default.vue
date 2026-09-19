<script setup lang="ts">
import type { NavigationMenuItem, SidebarProps } from '@nuxt/ui'

const route = useRoute()

function withActive(item: NavigationMenuItem): NavigationMenuItem {
    if (!item.to || typeof item.to !== 'string') return item
    return {
        ...item,
        active: item.to === '/'
            ? route.path === '/'
            : route.path === item.to || route.path.startsWith(item.to + '/')
    }
}

// Ignore the props for the example
defineProps<Pick<SidebarProps, 'variant' | 'collapsible' | 'side'>>()
const variant = ref<SidebarProps['variant']>('inset')
const collapsible = ref<SidebarProps['collapsible']>('icon')

const open = ref(true)
const { alertMsg, clearAlert } = useAlert()
const { currentUser } = useDemoAuth()
const firstName = computed(() => currentUser.value.name.split(' ')[0])

const isCollapsed = computed(() => collapsible.value === 'icon' && !open.value)

const items = computed<NavigationMenuItem[][]>(() => [
    [
        ...(isCollapsed.value ? [] : [{
            type: 'label' as const,
            label: 'Self-Service'
        }]),
        withActive({
            label: 'Home',
            icon: 'i-lucide-layout-grid',
            to: '/'
        }),
        {
            label: 'Approvals',
            icon: 'i-lucide-clipboard-list',
            to: '/approvals'
        },
        {
            label: 'Timesheet',
            icon: 'i-lucide-timer',
            to: '/timesheet'
        },
        {
            label: 'DTR Evaluation',
            icon: 'i-lucide-clipboard-check',
            to: '/evaluations'
        },
        {
            label: 'Leaves',
            icon: 'i-lucide-calendar',
            to: '/leaves'
        },
        {
            label: 'Overtime',
            icon: 'i-lucide-clock',
            to: '/overtime'
        },
        {
            label: 'Expenses',
            icon: 'i-lucide-piggy-bank',
            to: '/reimbursements'
        },
        {
            label: 'Payslip',
            icon: 'i-lucide-file-text',
            to: '/payslip'
        },
        {
            label: 'Service Request',
            icon: 'i-lucide-user',
            to: '/services'
        },
        {
            label: 'Calendar',
            icon: 'i-lucide-calendar-days',
            to: '/calendar'
        },
        {
            label: 'Directory',
            icon: 'i-lucide-book-open',
            to: '/directory'
        },
        {
            label: 'My Performance',
            icon: 'i-lucide-trending-up',
            to: '/performance'
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
            label: 'Employee Lifecycle'
        }]),
        withActive({
            label: 'Onboarding Templates',
            icon: 'i-lucide-clipboard-list',
            to: '/onboarding/templates'
        }),
        {
            label: 'Employee Onboarding',
            icon: 'i-lucide-user-plus',
            to: '/onboarding'
        }
    ],
    [
        ...(isCollapsed.value ? [] : [{
            type: 'label' as const,
            label: 'Asset Management'
        }]),
        {
            label: 'Inventory',
            icon: 'i-lucide-boxes',
            to: '/assets/inventory'
        },
        {
            label: 'Asset Assignment',
            icon: 'i-lucide-arrow-left-right',
            to: '/assets/assignments'
        },
        {
            label: 'Asset Categories',
            icon: 'i-lucide-tag',
            to: '/assets/categories'
        },
        {
            label: 'Asset Locations',
            icon: 'i-lucide-map-pin',
            to: '/assets/locations'
        },
        {
            label: 'Asset Analytics',
            icon: 'i-lucide-pie-chart',
            to: '/assets/analytics'
        }
    ]
])

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

// add isTable to definePageMeta
const isTable = computed(() => route.meta.isTable || false)

// const breadcrumbItems = computed(() => {
//     const home = { label: 'Home', to: '/' }
//     if (route.path === '/') return [home]
//     return [
//         home,
//         { label: pageTitle.value }
//     ]
// })

const pageBreadcrumbItems = computed(() => {
    const paths = route.path.split('/').filter(Boolean)
    if (paths.length === 0) return [{ label: pageTitle.value }] // For dashboard

    let currentPath = ''
    return paths.map(path => {
        currentPath += `/${path}`
        return {
            label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
            to: currentPath
        }
    })
})

const timeGreeting = computed(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) {
        return {
            text: 'Good Morning',
            icon: 'i-lucide-sun',
            colorClass: 'text-yellow-600 dark:text-yellow-500',
            bgClass: 'bg-linear-to-r from-yellow-500/20 via-yellow-500/5 to-transparent',
            borderColorClass: 'bg-yellow-500/20'
        }
    } else if (hour >= 12 && hour < 17) {
        return {
            text: 'Good Afternoon',
            icon: 'i-lucide-sun-dim',
            colorClass: 'text-orange-600 dark:text-orange-500',
            bgClass: 'bg-linear-to-r from-orange-500/20 via-orange-500/5 to-transparent',
            borderColorClass: 'bg-orange-500/20'
        }
    } else {
        return {
            text: 'Good Evening',
            icon: 'i-lucide-moon-star',
            colorClass: 'text-indigo-600 dark:text-indigo-500',
            bgClass: 'bg-linear-to-r from-indigo-500/20 via-indigo-500/5 to-transparent',
            borderColorClass: 'bg-indigo-500/20'
        }
    }
})

const formattedDate = computed(() => {
    return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })
})

const headerTextureStyle = {
    maskImage: 'linear-gradient(to right, black 10%, transparent 80%)',
    WebkitMaskImage: 'linear-gradient(to right, black 10%, transparent 80%)',
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`
}
</script>

<template>
    <div class="flex flex-1 h-screen w-full" :class="[
        variant === 'inset' && 'bg-neutral-50 dark:bg-neutral-950',
        side === 'right' && 'flex-row-reverse'
    ]">
        <USidebar v-model:open="open" :variant="variant" :collapsible="collapsible" :side="side"
            :ui="{ root: '[--sidebar-width-icon:4.5625rem] data-[state=collapsed]:[--sidebar-width-icon:5.0625rem]', container: 'h-full', header: 'px-5', body: 'group-data-[state=collapsed]/sidebar:overflow-y-auto scrollbar' }">
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

            <!-- <template #footer>
                <UserMenu :collapsed="isCollapsed" />
            </template> -->
        </USidebar>

        <div
            class="flex-1 flex flex-col overflow-hidden lg:peer-data-[variant=floating]:my-4 peer-data-[variant=inset]:m-4 lg:peer-data-[variant=inset]:not-peer-data-[collapsible=offcanvas]:ms-0 peer-data-[variant=inset]:rounded-xl peer-data-[variant=inset]:shadow-sm peer-data-[variant=inset]:ring peer-data-[variant=inset]:ring-default bg-default">
            <div class="h-(--ui-header-height) shrink-0 flex items-center px-4 relative overflow-hidden bg-default z-50"
                :class="[
                    variant !== 'floating' && 'border-b border-default',
                    side === 'right' && 'justify-end'
                ]">
                <!-- Texture BG -->
                <div class="absolute inset-0 w-2/3 md:w-1/2 pointer-events-none transition-colors duration-1000"
                    :class="timeGreeting.bgClass">
                    <div class="absolute inset-0" :style="headerTextureStyle"></div>
                </div>

                <UButton :icon="side === 'left' ? 'i-lucide-panel-left' : 'i-lucide-panel-right'" color="neutral"
                    variant="ghost" aria-label="Toggle sidebar" @click="open = !open" class="lg:hidden mr-1 z-10" />

                <div class="flex items-center gap-3 z-10">
                    <div class="flex items-center gap-2">
                        <UIcon :name="timeGreeting.icon" :class="['size-5', timeGreeting.colorClass]" />
                        <span class="hidden sm:block font-semibold" :class="timeGreeting.colorClass">{{
                            timeGreeting.text }}, {{
                                firstName }}!</span>
                    </div>
                    <div class="h-4 w-px" :class="timeGreeting.borderColorClass"></div>
                    <span class="hidden sm:block text-xs opacity-60" :class="timeGreeting.colorClass">{{ formattedDate
                    }}</span>
                </div>

                <!-- page title / breadcrumbs -->
                <!-- <UBreadcrumb :items="pageBreadcrumbItems" color="neutral" class="z-10" /> -->
                <!-- color mode -->
                <div class="ml-auto z-10 flex items-center gap-2">
                    <!-- notification button -->
                    <UColorModeButton />
                    <UButton icon="i-lucide-bell" variant="ghost" color="neutral" aria-label="Notifications"
                        to="/notifications" />
                    <UserMenu :collapsed="isCollapsed" />
                </div>
            </div>

            <UAlert color="error" variant="soft" orientation="horizontal" close
                @update:open="(val) => !val && clearAlert()" :ui="{
                    root: 'rounded-none border-b border-error/20 alert-glow',
                    title: 'flex w-full items-center gap-3',
                }" :actions="[
                    {
                        label: 'Review Timesheet',
                        color: 'error',
                        variant: 'soft'
                    }
                ]" v-if="alertMsg">
                <template #title>
                    <span class="relative flex size-4">
                        <span
                            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-error opacity-75"></span>
                        <UIcon name="i-lucide-circle-alert" class="size-4 text-error" />
                    </span>
                    {{ alertMsg }}
                </template>
            </UAlert>

            <!-- if isTable true, no padding -->
            <div :class="[isTable ? 'flex flex-col overflow-hidden min-h-0' : 'p-4 overflow-y-auto scrollbar']"
                class="flex-1">
                <slot />
            </div>
        </div>
    </div>

    <!-- Global AI FAB + Chat Drawer -->
    <AIChatDrawer />
</template>
<style scoped>
@keyframes glow-error {

    0%,
    100% {
        box-shadow: 0 2px 6px -3px color-mix(in srgb, var(--ui-color-error-500) 15%, transparent);
    }

    50% {
        box-shadow: 0 4px 12px -3px color-mix(in srgb, var(--ui-color-error-500) 35%, transparent);
    }
}

:deep(.alert-glow) {
    animation: glow-error 2.8s ease-in-out infinite;
}
</style>
