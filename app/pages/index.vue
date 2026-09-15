<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const timeInList = [
    { name: 'PAOR, SAGE RYAN ARGAMOSA', role: 'Team Lead Developer', time: '08:28:23 AM', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Sage' },
    { name: 'SURRIGA, JOSEPH EBRON', role: 'Team Lead Developer', time: '08:15:23 AM', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Joseph' },
    { name: 'GALAS, WILLIAM SALUNSON', role: 'Team Lead Developer', time: '08:09:38 AM', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=William' },
]

const timeOutList = [
    { name: 'PAOR, MARIA HEIDI', role: 'Chief Operating Officer', time: '08:49:12 AM', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Heidi' },
    { name: 'SUPREMO, ARIEL', role: 'Company Driver', time: '--', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Ariel' },
    { name: 'SUPREMO, ARIES', role: 'Chief Executive Officer', time: '10:07:30 AM', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Aries' },
]

const recentActivities = [
    { text: 'Successfully timed in.', time: '4h ago', icon: 'i-lucide-zap', color: 'text-primary' },
    { text: 'Approved Leave Request for SURRIGA, JOSEPH EBRON', time: '5h ago', icon: 'i-lucide-check-circle', color: 'text-success' },
    { text: 'System Maintenance Scheduled', time: '1d ago', icon: 'i-lucide-settings', color: 'text-neutral-500' },
    { text: 'Successfully Applied Leave Request', time: '3d ago', icon: 'i-lucide-zap', color: 'text-primary' },
    { text: 'Successfully timed in.', time: '4d ago', icon: 'i-lucide-zap', color: 'text-primary' },
    { text: 'Overtime Request Rejected', time: '4d ago', icon: 'i-lucide-x-circle', color: 'text-error' },
    { text: 'Successful Login Attempt', time: '4d ago', icon: 'i-lucide-arrow-right', color: 'text-success' },
    { text: 'Updated Profile Information', time: '1w ago', icon: 'i-lucide-user', color: 'text-primary' },
]

const isTimedIn = ref(false)
const isLeaveModalOpen = ref(false)
const isOvertimeModalOpen = ref(false)

const activityBoxClass = (color: string) => {
    const map: Record<string, string> = {
        'text-primary': 'bg-primary-50 dark:bg-primary-950',
        'text-success': 'bg-success-50 dark:bg-success-950',
        'text-error': 'bg-error-50 dark:bg-error-950',
        'text-warning': 'bg-warning-50 dark:bg-warning-950',
        'text-neutral-500': 'bg-neutral-100 dark:bg-neutral-800',
    }
    return map[color] ?? 'bg-neutral-100 dark:bg-neutral-800'
}


const onLeaveTodayList = [
    { name: 'DELA CRUZ, JUAN', role: 'Software Engineer', leaveType: 'Sick Leave', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Juan' },
    { name: 'SANTOS, MARIA', role: 'HR Manager', leaveType: 'Vacation Leave', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Maria' }
]

const upcomingLeaveList = [
    { name: 'REYES, CARLOS', role: 'UI/UX Designer', leaveType: 'Vacation Leave (Aug 15-18)', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carlos' },
    { name: 'GARCIA, ANA', role: 'Project Manager', leaveType: 'Maternity Leave', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Ana' }
]

const activeLeaveTab = ref('on-leave')

const leaveItems = computed(() => [
    {
        label: 'On Leave Today',
        value: 'on-leave',
        slot: 'on-leave',
        chipColor: 'orange' as const,
        badge: { label: onLeaveTodayList.length, variant: 'soft' as const, color: 'neutral' as const }
    },
    {
        label: 'Upcoming This Week',
        value: 'upcoming',
        slot: 'upcoming',
        chipColor: 'blue' as const,
        badge: { label: upcomingLeaveList.length, variant: 'soft' as const, color: 'neutral' as const }
    }
])

const birthdaysTodayList = [] as any[]

const upcomingBirthdaysList = [
    { name: 'SUPREMO, ARIES', role: 'Chief Executive Officer', date: 'Aug 28', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Aries' }
]

const activeBirthdayTab = ref('today')

const birthdayItems = computed(() => [
    {
        label: 'Today',
        value: 'today',
        slot: 'today',
        chipColor: 'pink' as const,
        badge: { label: birthdaysTodayList.length, variant: 'soft' as const, color: 'neutral' as const }
    },
    {
        label: 'Upcoming This Month',
        value: 'upcoming',
        slot: 'upcoming',
        chipColor: 'purple' as const,
        badge: { label: upcomingBirthdaysList.length, variant: 'soft' as const, color: 'neutral' as const }
    }
])

const currentTime = ref(new Date())
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const formattedTime = computed(() => {
  return currentTime.value.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).split(' ')
})

const timePart = computed(() => formattedTime.value[0])
const amPmPart = computed(() => formattedTime.value[1])

const formattedDate = computed(() => {
  return currentTime.value.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
})

const items = ref<TabsItem[]>([
  {
    label: 'Employee Attendance',
    icon: 'i-lucide-users',
    slot: 'attendance' as const,
    ui: { leadingIcon: 'data-[state=active]:text-blue-500' }
  },
  {
    label: 'Leave Schedule',
    icon: 'i-lucide-calendar',
    slot: 'leave' as const,
    ui: { leadingIcon: 'data-[state=active]:text-amber-500' }
  },
  {
    label: 'Birthdays',
    icon: 'i-lucide-cake',
    slot: 'birthdays' as const,
    ui: { leadingIcon: 'data-[state=active]:text-pink-500' }
  }
])

const active = ref('0')

const colorMap: Record<string, string> = {
  '0': 'bg-blue-500',
  '1': 'bg-amber-500',
  '2': 'bg-pink-500'
}

const textColorMap: Record<string, string> = {
  '0': 'data-[state=active]:text-blue-500',
  '1': 'data-[state=active]:text-amber-500',
  '2': 'data-[state=active]:text-pink-500'
}

const indicatorClass = computed(() => `${colorMap[active.value]} h-0.5`)
const triggerClass = computed(() => textColorMap[active.value])

// AI chat - use global composable
const { aiInput, quickPrompts, sendMessage } = useAIChat()
</script>

<template>
    <div class="space-y-6">
        <!-- Header Section -->
        <!-- <div class="flex items-center gap-4">
            <UIcon name="i-lucide-cloud-sun" class="size-12 text-amber-500" />
            <UPageCard title="Good Morning, Laixander Naguit!" :description="formattedDate" variant="naked"
                orientation="horizontal">
                <div class="flex justify-end gap-2 flex-1">
                </div>
            </UPageCard>
        </div> -->

        <!-- AI Assistance -->
        <UCard :ui="{ root: 'bg-primary-50 dark:bg-primary-950/20 ring-primary-100 dark:ring-primary-900/50 overflow-hidden relative' }">
            <!-- Decorative grid background (far right, fades to top-left) -->
            <div class="pointer-events-none absolute inset-y-0 right-0 w-2/3 overflow-hidden" aria-hidden="true"
                style="mask-image: linear-gradient(to top left, rgba(0,0,0,0.18) 0%, transparent 70%); -webkit-mask-image: linear-gradient(to top left, rgba(0,0,0,0.18) 0%, transparent 70%);">
                <svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="ai-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" class="stroke-primary-500 dark:stroke-primary-400" stroke-width="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#ai-grid)" />
                </svg>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="relative flex items-center justify-center size-11 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400 shrink-0">
                        <UIcon name="i-lucide-sparkles" class="size-6" />
                        <!-- Pulse ring -->
                        <span class="absolute -top-[4px] -right-[4px] flex size-3">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full size-3 bg-primary-300"></span>
                        </span>
                    </div>
                    <div class="flex flex-col">
                        <h3 class="font-bold text-primary-900 dark:text-primary-100">AI Assistant</h3>
                        <p class="text-sm text-primary-600 dark:text-primary-400">Ask me anything about your benefits, leaves, or company policies.</p>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center gap-2">
                <UInput
                    v-model="aiInput"
                    placeholder="E.g. How many vacation leaves do I have left?"
                    class="flex-1"
                    size="md"
                    variant="subtle"
                    color="primary"
                    :ui="{
                        base: 'bg-primary-500/10 ring-primary-300 dark:ring-primary-800 placeholder:text-primary-400 dark:placeholder:text-primary-600',
                        leadingIcon: 'text-primary-500'
                    }"
                    @keydown.enter="sendMessage()"
                />
                <UButton icon="i-lucide-arrow-right" color="primary" size="md" @click="sendMessage()" />
            </div>
            
            <div class="mt-6 flex flex-wrap gap-2">
                <span class="text-xs text-primary-600 dark:text-primary-400 mr-1 flex items-center">Try asking:</span>
                <UButton
                    v-for="p in quickPrompts"
                    :key="p.label"
                    :label="p.label"
                    :icon="p.icon"
                    color="primary"
                    variant="soft"
                    size="xs"
                    @click="sendMessage(p.label)"
                />
            </div>
        </UCard>

        <!-- Top Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Time Card -->
            <UCard 
                :ui="{ root: 'flex flex-col shadow-sm bg-blue-50 dark:bg-blue-950/20 ring-blue-100 dark:ring-blue-900/50 relative', body: 'flex-1 flex flex-col space-y-4' }">
                <UIcon name="i-lucide-timer" class="size-52 absolute -bottom-16 -right-12 text-blue-500 opacity-5 pointer-events-none" />
                <div class="flex items-center gap-4">
                    <div class="flex items-center justify-center p-2 rounded-lg bg-blue-500/10 text-blue-500">
                        <UIcon name="i-lucide-timer" class="size-5" />
                    </div>
                    <span class="font-bold text-blue-900 dark:text-blue-100">Time</span>
                </div>
                <div class="py-2">
                    <h2 class="text-3xl font-bold">{{ timePart }} <span class="text-lg font-normal">{{ amPmPart }}</span>
                    </h2>
                    <p class="text-sm text-blue-600 dark:text-blue-400 mt-1">{{ formattedDate }}</p>
                </div>
                <UButton v-if="!isTimedIn" variant="soft" color="blue" block @click="isTimedIn = true">
                    <UIcon name="i-lucide-log-in" class="size-4" />
                    Time In
                </UButton>
                <UButton v-else variant="soft" color="error" block @click="isTimedIn = false">
                    <UIcon name="i-lucide-log-out" class="size-4" />
                    Time Out
                </UButton>
            </UCard>

            <!-- Leaves Card -->
            <UCard 
                :ui="{ root: 'flex flex-col shadow-sm bg-green-50 dark:bg-green-950/20 ring-green-100 dark:ring-green-900/50 relative', body: 'flex-1 flex flex-col space-y-4' }">
                <UIcon name="i-lucide-calendar" class="size-52 absolute -bottom-16 -right-12 text-green-500 opacity-5 pointer-events-none" />
                <div class="flex items-center gap-4">
                    <div class="flex items-center justify-center p-2 rounded-lg bg-green-500/10 text-green-500">
                        <UIcon name="i-lucide-calendar" class="size-5" />
                    </div>
                    <span class="font-bold text-green-900 dark:text-green-100">Leaves</span>
                </div>
                <div class="py-2">
                    <h2 class="text-3xl font-bold">0.00</h2>
                    <p class="text-sm text-green-600 dark:text-green-400 mt-1">Total Balance</p>
                </div>
                <UButton block variant="soft" color="green" @click="isLeaveModalOpen = true">
                    <UIcon name="i-lucide-plus" class="size-4" />
                    Request Leave
                </UButton>
            </UCard>

            <!-- Overtime Card -->
            <UCard 
                :ui="{ root: 'flex flex-col shadow-sm bg-orange-50 dark:bg-orange-950/20 ring-orange-100 dark:ring-orange-900/50 relative', body: 'flex-1 flex flex-col space-y-4' }">
                <UIcon name="i-lucide-clock-4" class="size-52 absolute -bottom-16 -right-12 text-orange-500 opacity-5 pointer-events-none" />
                <div class="flex items-center gap-4">
                    <div class="flex items-center justify-center p-2 rounded-lg bg-orange-500/10 text-orange-500">
                        <UIcon name="i-lucide-clock-4" class="size-5" />
                    </div>
                    <span class="font-bold text-orange-900 dark:text-orange-100">Overtime</span>
                </div>
                <div class="py-2">
                    <h2 class="text-3xl font-bold">0</h2>
                    <p class="text-sm text-orange-600 dark:text-orange-400 mt-1">Total Requests</p>
                </div>
                <UButton block variant="soft" color="orange" @click="isOvertimeModalOpen = true">
                    <UIcon name="i-lucide-plus" class="size-4" />
                    Request Overtime
                </UButton>
            </UCard>

            <!-- Tasks for Approval Card -->
            <UCard 
                :ui="{ root: 'flex flex-col shadow-sm bg-purple-50 dark:bg-purple-950/20 ring-purple-100 dark:ring-purple-900/50 relative', body: 'flex-1 flex flex-col space-y-4' }">
                <UIcon name="i-lucide-clipboard-check" class="size-52 absolute -bottom-16 -right-12 text-purple-500 opacity-5 pointer-events-none" />
                <div class="flex items-center gap-4">
                    <div class="flex items-center justify-center p-2 rounded-lg bg-purple-500/10 text-purple-500">
                        <UIcon name="i-lucide-clipboard-check" class="size-5" />
                    </div>
                    <span class="font-bold text-purple-900 dark:text-purple-100">Tasks for Approval</span>
                </div>
                <div class="py-2 flex gap-8">
                    <div>
                        <h2 class="text-3xl font-bold">1</h2>
                        <p class="text-sm text-purple-600 dark:text-purple-400 mt-1">Backlog</p>
                    </div>
                    <div>
                        <h2 class="text-3xl font-bold">0</h2>
                        <p class="text-sm text-purple-600 dark:text-purple-400 mt-1">In-Progress</p>
                    </div>
                </div>
                <UButton block variant="soft" color="purple" to="/approvals">
                    <UIcon name="i-lucide-arrow-right" class="size-4" />
                    View All Tasks
                </UButton>
            </UCard>
        </div>

        <!-- Main Content Area -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

            <!-- Left Column -->
            <div class="xl:col-span-2 space-y-6">
                <UTabs v-model="active" :items="items" variant="link" :ui="{ root: 'flex-1 flex flex-col h-full', content: 'flex-1', indicator: indicatorClass, trigger: triggerClass }">

                    <template #attendance>
                        <!-- Employee Attendance -->
                        <UCard :ui="{ root: 'shadow-sm h-full flex flex-col', body: 'p-0 sm:p-0 flex-1 flex flex-col' }">
                            <div class="flex divide-x divide-default w-full flex-1">
                                <!-- TIME-IN Column -->
                                <div class="w-full h-full flex flex-col">
                                    <div class="flex items-center justify-between p-4 sm:px-6 border-b border-default">
                                        <div class="flex items-center gap-2">
                                            <UChip color="success" standalone inset size="sm" />
                                            <span class="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">Time-In</span>
                                        </div>
                                        <UBadge color="neutral" variant="soft" size="sm">{{ timeInList.length }}</UBadge>
                                    </div>
                                    <div v-if="timeInList.length === 0" class="flex-1 flex items-center justify-center">
                                        <UEmpty variant="naked" icon="i-lucide-users" title="No time in yet" description="No one has timed in yet." />
                                    </div>
                                    <div v-else class="space-y-4 p-4 sm:p-6">
                                        <div v-for="(user, i) in timeInList" :key="i" class="flex items-center justify-between">
                                            <div class="flex items-center gap-3">
                                                <UAvatar :src="user.avatar" size="md" />
                                                <div>
                                                    <p class="font-medium text-sm">{{ user.name }}</p>
                                                    <p class="text-xs text-neutral-500">{{ user.role }}</p>
                                                </div>
                                            </div>
                                            <span class="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                                {{ user.time }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- TIME-OUT Column -->
                                <div class="w-full h-full flex flex-col">
                                    <div class="flex items-center justify-between p-4 sm:px-6 border-b border-default">
                                        <div class="flex items-center gap-2">
                                            <UChip color="neutral" standalone inset size="sm" />
                                            <span class="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">Time-Out</span>
                                        </div>
                                        <UBadge color="neutral" variant="soft" size="sm">{{ timeOutList.length }}</UBadge>
                                    </div>

                                    <div v-if="timeOutList.length === 0" class="flex-1 flex items-center justify-center">
                                        <UEmpty variant="naked" icon="i-lucide-users" title="No time out yet" description="No one has timed out yet." />
                                    </div>
                                    <div v-else class="space-y-4 p-4 sm:p-6">
                                        <div v-for="(user, i) in timeOutList" :key="i"
                                            class="flex items-center justify-between">
                                            <div class="flex items-center gap-3">
                                                <UAvatar :src="user.avatar" size="md" />
                                                <div>
                                                    <p class="font-medium text-sm">{{ user.name }}</p>
                                                    <p class="text-xs text-neutral-500">{{ user.role }}</p>
                                                </div>
                                            </div>
                                            <span class="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                                {{ user.time }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </UCard>
                    </template>

                    <template #leave>
                        <!-- Leave Schedule -->
                        <UCard :ui="{ root: 'shadow-sm h-full flex flex-col', body: 'p-0 sm:p-0 flex-1 flex flex-col' }">
                            <div class="flex divide-x divide-default w-full flex-1">
                                <!-- On Leave Today Column -->
                                <div class="w-full h-full flex flex-col">
                                    <div class="flex items-center justify-between p-4 sm:px-6 border-b border-default">
                                        <div class="flex items-center gap-2">
                                            <UChip color="orange" standalone inset size="sm" />
                                            <span class="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">On Leave Today</span>
                                        </div>
                                        <UBadge color="neutral" variant="soft" size="sm">{{ onLeaveTodayList.length }}</UBadge>
                                    </div>
                                    <div v-if="onLeaveTodayList.length === 0" class="flex-1 flex items-center justify-center">
                                        <UEmpty variant="naked" icon="i-lucide-calendar-off" title="No one on leave" description="No one is on leave today." />
                                    </div>
                                    <div v-else class="space-y-4 p-4 sm:p-6">
                                        <div v-for="(user, i) in onLeaveTodayList" :key="i" class="flex items-center justify-between">
                                            <div class="flex items-center gap-3">
                                                <UAvatar :src="user.avatar" size="md" />
                                                <div>
                                                    <p class="font-medium text-sm">{{ user.name }}</p>
                                                    <p class="text-xs text-neutral-500">{{ user.role }}</p>
                                                </div>
                                            </div>
                                            <span class="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                                {{ user.leaveType }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Upcoming This Week Column -->
                                <div class="w-full h-full flex flex-col">
                                    <div class="flex items-center justify-between p-4 sm:px-6 border-b border-default">
                                        <div class="flex items-center gap-2">
                                            <UChip color="blue" standalone inset size="sm" />
                                            <span class="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">Upcoming This Week</span>
                                        </div>
                                        <UBadge color="neutral" variant="soft" size="sm">{{ upcomingLeaveList.length }}</UBadge>
                                    </div>
                                    <div v-if="upcomingLeaveList.length === 0" class="flex-1 flex items-center justify-center">
                                        <UEmpty variant="naked" icon="i-lucide-calendar" title="No upcoming leaves" description="No one is scheduled for leave this week." />
                                    </div>
                                    <div v-else class="space-y-4 p-4 sm:p-6">
                                        <div v-for="(user, i) in upcomingLeaveList" :key="i" class="flex items-center justify-between">
                                            <div class="flex items-center gap-3">
                                                <UAvatar :src="user.avatar" size="md" />
                                                <div>
                                                    <p class="font-medium text-sm">{{ user.name }}</p>
                                                    <p class="text-xs text-neutral-500">{{ user.role }}</p>
                                                </div>
                                            </div>
                                            <span class="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                                {{ user.leaveType }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </UCard>
                    </template>

                    <template #birthdays>
                        <!-- Birthdays -->
                        <UCard :ui="{ root: 'shadow-sm h-full flex flex-col', body: 'p-0 sm:p-0 flex-1 flex flex-col' }">
                            <div class="flex divide-x divide-default w-full flex-1">
                                <!-- Today Column -->
                                <div class="w-full h-full flex flex-col">
                                    <div class="flex items-center justify-between p-4 sm:px-6 border-b border-default">
                                        <div class="flex items-center gap-2">
                                            <UChip color="pink" standalone inset size="sm" />
                                            <span class="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">Today</span>
                                        </div>
                                        <UBadge color="neutral" variant="soft" size="sm">{{ birthdaysTodayList.length }}</UBadge>
                                    </div>
                                    <div v-if="birthdaysTodayList.length === 0" class="flex-1 flex items-center justify-center">
                                        <UEmpty variant="naked" icon="i-lucide-cake" title="No birthdays today" description="There are no birthdays today." />
                                    </div>
                                    <div v-else class="space-y-4 p-4 sm:p-6">
                                        <div v-for="(user, i) in birthdaysTodayList" :key="i" class="flex items-center justify-between">
                                            <div class="flex items-center gap-3">
                                                <UAvatar :src="user.avatar" size="md" />
                                                <div>
                                                    <p class="font-medium text-sm">{{ user.name }}</p>
                                                    <p class="text-xs text-neutral-500">{{ user.role }}</p>
                                                </div>
                                            </div>
                                            <span class="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                                {{ user.date }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Upcoming This Month Column -->
                                <div class="w-full h-full flex flex-col">
                                    <div class="flex items-center justify-between p-4 sm:px-6 border-b border-default">
                                        <div class="flex items-center gap-2">
                                            <UChip color="purple" standalone inset size="sm" />
                                            <span class="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">Upcoming This Month</span>
                                        </div>
                                        <UBadge color="neutral" variant="soft" size="sm">{{ upcomingBirthdaysList.length }}</UBadge>
                                    </div>
                                    <div v-if="upcomingBirthdaysList.length === 0" class="flex-1 flex items-center justify-center">
                                        <UEmpty variant="naked" icon="i-lucide-cake" title="No upcoming birthdays" description="There are no upcoming birthdays this month." />
                                    </div>
                                    <div v-else class="space-y-4 p-4 sm:p-6">
                                        <div v-for="(user, i) in upcomingBirthdaysList" :key="i" class="flex items-center justify-between">
                                            <div class="flex items-center gap-3">
                                                <UAvatar :src="user.avatar" size="md" />
                                                <div>
                                                    <p class="font-medium text-sm">{{ user.name }}</p>
                                                    <p class="text-xs text-neutral-500">{{ user.role }}</p>
                                                </div>
                                            </div>
                                            <span class="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                                {{ user.date }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </UCard>
                    </template>

                </UTabs>
            </div>

            <!-- Right Column -->
            <div class="space-y-6">
                <!-- Recent Activities -->
                <UCard  :ui="{ root: 'shadow-sm h-full' }">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <UIcon name="i-lucide-activity" class="text-neutral-500 size-5" />
                                <h3 class="font-semibold">Recent Activities</h3>
                            </div>
                            <UButton color="primary" variant="ghost" size="xs" trailing-icon="i-lucide-arrow-right"
                                label="View All" to="/activities" />
                        </div>
                    </template>

                    <UEmpty variant="naked" v-if="recentActivities.length === 0" icon="i-lucide-activity" title="No recent activities" description="There are no recent activities to show." />
                    <div v-else class="space-y-6">
                        <div v-for="(activity, i) in recentActivities" :key="i" class="flex items-center gap-4">
                            <div :class="[activityBoxClass(activity.color), 'flex-shrink-0 size-8 rounded-lg flex items-center justify-center']">
                                <UIcon :name="activity.icon" :class="[activity.color, 'size-4']" />
                            </div>
                            <div class="min-w-0">
                                <p class="font-medium text-sm text-neutral-800 dark:text-neutral-200 truncate">
                                    {{ activity.text }}
                                </p>
                                <p class="text-xs text-neutral-500">
                                    {{ activity.time }}
                                </p>
                            </div>
                        </div>
                    </div>
                </UCard>
            </div>

        </div>
    </div>

    <ApplyLeaveModal v-model:open="isLeaveModalOpen" />
    <ApplyOvertimeModal v-model:open="isOvertimeModalOpen" />
</template>
