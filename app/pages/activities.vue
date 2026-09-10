<script setup lang="ts">
definePageMeta(
    {
        isTable: true
    }
)

type ActivityCategory = 'time' | 'leave' | 'login' | 'overtime' | 'profile' | 'system' | 'approval'

interface Activity {
    id: number
    category: ActivityCategory
    text: string
    description: string
    datetime: string
    icon: string
    color: string
    bg: string
}

const activities = ref<Activity[]>([
    {
        id: 1,
        category: 'login',
        text: 'Successful Login Attempt',
        description: 'You successfully logged in from a recognized device.',
        datetime: 'September 09, 2026 at 08:10 AM',
        icon: 'i-lucide-log-in',
        color: 'text-success',
        bg: 'bg-success/10',
    },
    {
        id: 2,
        category: 'leave',
        text: 'Successfully Applied Leave Request',
        description: 'Your leave request has been submitted and is pending approval.',
        datetime: 'September 08, 2026 at 08:48 AM',
        icon: 'i-lucide-zap',
        color: 'text-primary',
        bg: 'bg-primary/10',
    },
    {
        id: 3,
        category: 'time',
        text: 'Successfully timed in.',
        description: 'You clocked in at 07:10 AM on September 04, 2026.',
        datetime: 'September 04, 2026 at 07:10 AM',
        icon: 'i-lucide-zap',
        color: 'text-primary',
        bg: 'bg-primary/10',
    },
    {
        id: 4,
        category: 'login',
        text: 'Successful Login Attempt',
        description: 'You successfully logged in from a recognized device.',
        datetime: 'September 01, 2026 at 08:33 AM',
        icon: 'i-lucide-log-in',
        color: 'text-success',
        bg: 'bg-success/10',
    },
    {
        id: 5,
        category: 'time',
        text: 'Successfully timed in.',
        description: 'You clocked in at 05:13 PM on August 28, 2026.',
        datetime: 'August 28, 2026 at 05:13 PM',
        icon: 'i-lucide-zap',
        color: 'text-primary',
        bg: 'bg-primary/10',
    },
    {
        id: 6,
        category: 'login',
        text: 'Successful Login Attempt',
        description: 'You successfully logged in from a recognized device.',
        datetime: 'August 28, 2026 at 10:11 AM',
        icon: 'i-lucide-log-in',
        color: 'text-success',
        bg: 'bg-success/10',
    },
    {
        id: 7,
        category: 'time',
        text: 'Successfully timed in.',
        description: 'You clocked in at 07:21 AM on August 28, 2026.',
        datetime: 'August 28, 2026 at 07:21 AM',
        icon: 'i-lucide-zap',
        color: 'text-primary',
        bg: 'bg-primary/10',
    },
    {
        id: 8,
        category: 'login',
        text: 'Successful Login Attempt',
        description: 'You successfully logged in from a recognized device.',
        datetime: 'August 27, 2026 at 04:56 PM',
        icon: 'i-lucide-log-in',
        color: 'text-success',
        bg: 'bg-success/10',
    },
    {
        id: 9,
        category: 'time',
        text: 'Successfully timed in.',
        description: 'You clocked in at 07:57 AM on August 19, 2026.',
        datetime: 'August 19, 2026 at 07:57 AM',
        icon: 'i-lucide-zap',
        color: 'text-primary',
        bg: 'bg-primary/10',
    },
    {
        id: 10,
        category: 'time',
        text: 'Successfully timed in.',
        description: 'You clocked in at 07:31 AM on August 18, 2026.',
        datetime: 'August 18, 2026 at 07:31 AM',
        icon: 'i-lucide-zap',
        color: 'text-primary',
        bg: 'bg-primary/10',
    }
])
</script>

<template>
    <div class="flex-1 flex flex-col p-4 space-y-6 overflow-y-auto scrollbar">
        <!-- Page header -->
        <div class="flex items-center gap-4">
            <UPageCard
                title="Activities"
                description="A full log of your recent account activity"
                variant="naked"
                class="flex-1"
                :ui="{
                    title: 'text-2xl font-bold'
                }"
            />
        </div>

        <!-- Activity list -->
        <div class="flex-1 flex flex-col">
            <UCard v-if="activities.length > 0" :ui="{ body: 'p-0 sm:p-0' }">
                <div class="divide-y divide-default">
                    <div
                        v-for="activity in activities"
                        :key="activity.id"
                        class="flex gap-4 p-4 sm:px-5 sm:py-4 transition-colors group relative hover:bg-muted/20"
                    >
                        <!-- Icon -->
                        <div :class="['size-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5', activity.bg]">
                            <UIcon :name="activity.icon" :class="['size-5', activity.color]" />
                        </div>

                        <!-- Content -->
                        <div class="flex-1 min-w-0">
                            <h3 class="text-sm font-semibold mb-1 text-muted group-hover:text-highlighted transition-colors">
                                {{ activity.text }}
                            </h3>
                            <p class="text-sm text-muted leading-relaxed">{{ activity.description }}</p>
                        </div>

                        <!-- Datetime -->
                        <div class="flex items-center gap-2">
                            <span class="text-xs text-dimmed whitespace-nowrap shrink-0">{{ activity.datetime }}</span>
                        </div>
                    </div>
                </div>
            </UCard>
            
            <div v-else class="flex-1 flex items-center justify-center py-16">
                <UEmpty
                    icon="i-lucide-activity"
                    title="No activities found"
                    description="There are no activities to show."
                    variant="naked"
                />
            </div>
        </div>
    </div>
</template>