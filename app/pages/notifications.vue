<script setup lang="ts">
import type { LogCategory, LogActivity } from '~~/app/types'

definePageMeta({ title: 'notifications' })

// ─── Data ─────────────────────────────────────────────────────────────────────
const { data: notifications } = useLazyFetch<LogActivity[]>('/api/notifications')

const categories: { key: LogCategory, label: string, icon: string }[] = [
    { key: 'all', label: 'All', icon: 'i-lucide-layout-grid' },
    { key: 'time', label: 'Time & Attendance', icon: 'i-lucide-zap' },
    { key: 'leave', label: 'Leave', icon: 'i-lucide-calendar-check' },
    { key: 'overtime', label: 'Overtime', icon: 'i-lucide-clock-4' },
    { key: 'approval', label: 'Approvals', icon: 'i-lucide-check-circle' },
    { key: 'login', label: 'Security', icon: 'i-lucide-shield' },
    { key: 'profile', label: 'Profile', icon: 'i-lucide-user' },
    { key: 'system', label: 'System', icon: 'i-lucide-settings' },
]

// ─── State ────────────────────────────────────────────────────────────────────
const activeCategory = ref<LogCategory>('all')

// ─── Computed ─────────────────────────────────────────────────────────────────
const filtered = computed(() =>
    activeCategory.value === 'all'
        ? (notifications.value || [])
        : (notifications.value || []).filter(a => a.category === activeCategory.value)
)

const unreadCount = computed(() => (notifications.value || []).filter(a => a.unread).length)

// ─── Methods ──────────────────────────────────────────────────────────────────
function markAllRead() {
    if (notifications.value) {
        notifications.value.forEach(a => { a.unread = false })
    }
}

function markRead(id: number) {
    if (!notifications.value) return
    const a = notifications.value.find(a => a.id === id)
    if (a) a.unread = false
}

function dismiss(id: number) {
    if (!notifications.value) return
    const idx = notifications.value.findIndex(a => a.id === id)
    if (idx !== -1) notifications.value.splice(idx, 1)
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold text-highlighted">Notifications</h1>
                <p class="text-muted text-sm mt-1">
                    A full log of your recent account activity
                    <UBadge v-if="unreadCount > 0" :label="`${unreadCount} unread`" variant="soft" class="ml-2" />
                </p>
            </div>
        </div>

        <!-- Category filter pills -->
        <div class="flex items-center justify-between gap-2">
            <div class="flex flex-wrap gap-2">
                <UButton v-for="cat in categories" :key="cat.key" :label="cat.label" :leading-icon="cat.icon"
                    :variant="activeCategory === cat.key ? 'solid' : 'soft'"
                    :color="activeCategory === cat.key ? 'primary' : 'neutral'" class="rounded-full"
                    @click="activeCategory = cat.key" />
            </div>
            <UButton
                label="Mark all as read"
                color="neutral"
                variant="ghost"
                size="sm"
                icon="i-lucide-check-check"
                :disabled="unreadCount === 0"
                @click="markAllRead"
            />
        </div>

        <!-- Activity list -->
        <UCard v-if="filtered.length > 0" :ui="{ body: 'p-0 sm:p-0' }">
            <div class="divide-y divide-default">
                <div
                    v-for="activity in filtered"
                    :key="activity.id"
                    :class="[
                        'flex gap-4 p-4 sm:px-5 sm:py-4 transition-colors group relative',
                        activity.unread ? 'bg-muted/40' : 'hover:bg-muted/20'
                    ]"
                >
                    <!-- Icon -->
                    <div :class="['size-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5', activity.bg]">
                        <UIcon :name="activity.icon" :class="['size-5', activity.color]" />
                    </div>

                    <!-- Content -->
                    <div class="flex-1 min-w-0">
                        <h3 :class="['text-sm font-semibold mb-1', activity.unread ? 'text-highlighted' : 'text-muted']">
                            {{ activity.text }}
                        </h3>
                        <p class="text-sm text-muted leading-relaxed">{{ activity.description }}</p>
                    </div>

                    <!-- Unread dot + dismiss -->
                    <div class="flex items-center gap-2">
                        <span class="text-xs text-dimmed whitespace-nowrap shrink-0">{{ activity.datetime }}</span>
                        <UChip :show="activity.unread" inset standalone />
                    </div>
                </div>
            </div>
        </UCard>

        <!-- Empty state -->
        <div v-else class="py-20">
            <UEmpty
                icon="i-lucide-activity"
                title="No notifications"
                description="There are no notifications to show for this category."
            />
        </div>
    </div>
</template>