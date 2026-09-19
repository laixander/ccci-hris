<script setup lang="ts">
import type { LogCategory, LogActivity } from '~~/app/types'

definePageMeta({
    isTable: true
})

// ─── Data ─────────────────────────────────────────────────────────────────────
const { data: activities } = useLazyFetch<LogActivity[]>('/api/activities')
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
            <UCard v-if="activities?.length" :ui="{ body: 'p-0 sm:p-0' }">
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