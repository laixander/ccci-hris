<script setup lang="ts">
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

const activeTab = ref('time-in')

const tabItems = computed(() => [
    {
        label: 'Time-In',
        value: 'time-in',
        slot: 'time-in',
        chipColor: 'success' as const, // green dot
        badge: { label: timeInList.length, variant: 'soft' as const }
    },
    {
        label: 'Time-Out',
        value: 'time-out',
        slot: 'time-out',
        chipColor: 'neutral' as const, // gray dot
        badge: { label: timeOutList.length, variant: 'soft' as const }
    }
])

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
</script>

<template>
    <div class="space-y-6">
        <!-- Header Section -->
        <div class="flex items-center gap-4">
            <UIcon name="i-lucide-cloud-sun" class="size-12 text-amber-500" />
            <UPageCard title="Good Morning, Laixander Naguit!" description="Friday, August 14, 2026" variant="naked"
                orientation="horizontal">
                <div class="flex justify-end gap-2 flex-1">
                </div>
            </UPageCard>
        </div>

        <!-- Top Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Time Card -->
            <UCard variant="subtle"
                :ui="{ root: 'flex flex-col shadow-sm', body: 'flex-1 flex flex-col', footer: 'mt-auto' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center justify-center p-2 rounded-lg bg-blue-500/10 text-blue-500">
                            <UIcon name="i-lucide-clock" class="size-5" />
                        </div>
                        <span class="text-xs font-semibold text-neutral-500 uppercase">Time</span>
                    </div>
                </template>
                <div class="py-2">
                    <h2 class="text-3xl font-bold">12:00:39 <span class="text-lg font-normal text-neutral-500">PM</span>
                    </h2>
                    <p class="text-sm text-neutral-500 mt-1">Friday, August 14, 2026</p>
                </div>
                <template #footer>
                    <UButton color="error" variant="soft" block icon="i-lucide-log-out" label="Time Out" />
                </template>
            </UCard>

            <!-- Leaves Card -->
            <UCard variant="subtle"
                :ui="{ root: 'flex flex-col shadow-sm', body: 'flex-1 flex flex-col', footer: 'mt-auto' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center justify-center p-2 rounded-lg bg-green-500/10 text-green-500">
                            <UIcon name="i-lucide-calendar-off" class="size-5" />
                        </div>
                        <span class="text-xs font-semibold text-neutral-500 uppercase">Leaves</span>
                    </div>
                </template>
                <div class="py-2">
                    <h2 class="text-3xl font-bold">0.00</h2>
                    <p class="text-sm text-neutral-500 mt-1">Total Balance</p>
                </div>
                <template #footer>
                    <UButton color="primary" variant="soft" block icon="i-lucide-plus" label="Request Leave" />
                </template>
            </UCard>

            <!-- Overtime Card -->
            <UCard variant="subtle"
                :ui="{ root: 'flex flex-col shadow-sm', body: 'flex-1 flex flex-col', footer: 'mt-auto' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center justify-center p-2 rounded-lg bg-orange-500/10 text-orange-500">
                            <UIcon name="i-lucide-clock-4" class="size-5" />
                        </div>
                        <span class="text-xs font-semibold text-neutral-500 uppercase">Overtime</span>
                    </div>
                </template>
                <div class="py-2">
                    <h2 class="text-3xl font-bold">0</h2>
                    <p class="text-sm text-neutral-500 mt-1">Total Requests</p>
                </div>
                <template #footer>
                    <UButton color="primary" variant="soft" block icon="i-lucide-plus" label="Request Overtime" />
                </template>
            </UCard>

            <!-- Tasks for Approval Card -->
            <UCard variant="subtle"
                :ui="{ root: 'flex flex-col shadow-sm', body: 'flex-1 flex flex-col', footer: 'mt-auto' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center justify-center p-2 rounded-lg bg-purple-500/10 text-purple-500">
                            <UIcon name="i-lucide-clipboard-check" class="size-5" />
                        </div>
                        <span class="text-xs font-semibold text-neutral-500 uppercase">Tasks for Approval</span>
                    </div>
                </template>
                <div class="py-2 flex gap-8">
                    <div>
                        <h2 class="text-3xl font-bold">1</h2>
                        <p class="text-sm text-neutral-500 mt-1">Backlog</p>
                    </div>
                    <div>
                        <h2 class="text-3xl font-bold">0</h2>
                        <p class="text-sm text-neutral-500 mt-1">In-Progress</p>
                    </div>
                </div>
                <template #footer>
                    <UButton color="primary" variant="soft" block>
                        View All Tasks
                        <UIcon name="i-lucide-arrow-right" />
                    </UButton>
                </template>
            </UCard>
        </div>

        <!-- Main Content Area -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

            <!-- Left Column -->
            <div class="xl:col-span-2 space-y-6">
                <!-- Employee Attendance -->
                <UCard variant="subtle" :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <UIcon name="i-lucide-users" class="text-primary size-5" />
                            <h3 class="font-semibold">Employee Attendance</h3>
                        </div>
                    </template>

                    <UTabs v-model="activeTab" :items="tabItems" variant="link" class="w-full"
                        :ui="{ list: 'px-4 sm:px-6', content: 'p-4 sm:p-6' }">
                        <!-- Custom label with chip + counter -->
                        <template #default="{ item }">
                            <span class="flex items-center gap-2">
                                <UChip :color="item.chipColor" standalone inset size="sm" />
                                <span class="text-xs font-bold uppercase tracking-wider">{{ item.label }}</span>
                                <!-- <UBadge color="neutral" size="sm" v-bind="item.badge" /> -->
                            </span>
                        </template>

                        <!-- TIME-IN Panel -->
                        <template #time-in>
                            <UEmpty variant="naked" v-if="timeInList.length === 0" icon="i-lucide-users" title="No time in yet" description="No one has timed in yet." />
                            <div v-else class="space-y-4">
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
                        </template>

                        <!-- TIME-OUT Panel -->
                        <template #time-out>
                            <UEmpty variant="naked" v-if="timeOutList.length === 0" icon="i-lucide-users" title="No time out yet" description="No one has timed out yet." />
                            <div v-else class="space-y-4">
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
                        </template>
                    </UTabs>
                </UCard>

                <!-- Leave Schedule -->
                <UCard variant="subtle" :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <UIcon name="i-lucide-calendar" class="text-orange-500 size-5" />
                            <h3 class="font-semibold">Leave Schedule</h3>
                        </div>
                    </template>

                    <UTabs v-model="activeLeaveTab" :items="leaveItems" variant="link" class="w-full"
                        :ui="{ list: 'px-4 sm:px-6', content: 'p-4 sm:p-6' }">
                        <!-- Custom label with chip + counter -->
                        <template #default="{ item }">
                            <span class="flex items-center gap-2">
                                <UChip :color="item.chipColor" standalone inset size="sm" />
                                <span class="text-xs font-bold uppercase tracking-wider">{{ item.label }}</span>
                                <!-- <UBadge color="neutral" size="sm" v-bind="item.badge" /> -->
                            </span>
                        </template>

                        <!-- On Leave Today content -->
                        <template #on-leave>
                            <UEmpty variant="naked" v-if="onLeaveTodayList.length === 0" icon="i-lucide-calendar-off" title="No one on leave" description="No one is on leave today." />
                            <div v-else class="space-y-4">
                                <div v-for="(user, i) in onLeaveTodayList" :key="i"
                                    class="flex items-center justify-between">
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
                        </template>

                        <!-- Upcoming This Week content -->
                        <template #upcoming>
                            <UEmpty variant="naked" v-if="upcomingLeaveList.length === 0" icon="i-lucide-calendar" title="No upcoming leaves" description="No one is scheduled for leave this week." />
                            <div v-else class="space-y-4">
                                <div v-for="(user, i) in upcomingLeaveList" :key="i"
                                    class="flex items-center justify-between">
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
                        </template>
                    </UTabs>
                </UCard>

                <!-- Birthdays -->
                <UCard variant="subtle" :ui="{ root: 'shadow-sm', body: 'p-0 sm:p-0' }">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <UIcon name="i-lucide-cake" class="text-pink-500 size-5" />
                            <h3 class="font-semibold">Birthdays</h3>
                        </div>
                    </template>

                    <UTabs v-model="activeBirthdayTab" :items="birthdayItems" variant="link" class="w-full"
                        :ui="{ list: 'px-4 sm:px-6', content: 'p-4 sm:p-6' }">
                        <!-- Custom label with chip + counter -->
                        <template #default="{ item }">
                            <span class="flex items-center gap-2">
                                <UChip :color="item.chipColor" standalone inset size="sm" />
                                <span class="text-xs font-bold uppercase tracking-wider">{{ item.label }}</span>
                                <!-- <UBadge color="neutral" size="sm" v-bind="item.badge" /> -->
                            </span>
                        </template>

                        <!-- Today content -->
                        <template #today>
                            <UEmpty variant="naked" v-if="birthdaysTodayList.length === 0" icon="i-lucide-cake" title="No birthdays today" description="There are no birthdays today." />
                            <div v-else class="space-y-4">
                                <div v-for="(user, i) in birthdaysTodayList" :key="i"
                                    class="flex items-center justify-between">
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
                        </template>

                        <!-- Upcoming This Month content -->
                        <template #upcoming>
                            <UEmpty variant="naked" v-if="upcomingBirthdaysList.length === 0" icon="i-lucide-cake" title="No upcoming birthdays" description="There are no upcoming birthdays this month." />
                            <div v-else class="space-y-4">
                                <div v-for="(user, i) in upcomingBirthdaysList" :key="i"
                                    class="flex items-center justify-between">
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
                        </template>
                    </UTabs>
                </UCard>
            </div>

            <!-- Right Column -->
            <div class="space-y-6">
                <!-- Recent Activities -->
                <UCard variant="subtle" :ui="{ root: 'shadow-sm h-full' }">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <UIcon name="i-lucide-activity" class="text-neutral-500 size-5" />
                                <h3 class="font-semibold">Recent Activities</h3>
                            </div>
                            <UButton color="primary" variant="ghost" size="xs" trailing-icon="i-lucide-arrow-right"
                                label="View All" />
                        </div>
                    </template>

                    <UEmpty variant="naked" v-if="recentActivities.length === 0" icon="i-lucide-activity" title="No recent activities" description="There are no recent activities to show." />
                    <div v-else class="space-y-6">
                        <div v-for="(activity, i) in recentActivities" :key="i" class="flex gap-4">
                            <div class="mt-1">
                                <UIcon :name="activity.icon" :class="[activity.color, 'size-4']" />
                            </div>
                            <div>
                                <p class="font-medium text-sm text-neutral-800 dark:text-neutral-200">
                                    {{ activity.text }}
                                </p>
                                <p class="text-xs text-neutral-500 mt-1">
                                    {{ activity.time }}
                                </p>
                            </div>
                        </div>
                    </div>
                </UCard>
            </div>

        </div>
    </div>
</template>
