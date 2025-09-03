<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useNotifications } from '~/composables/useNotifications'
import { notificationItems } from '~/data'

// composable with sample data
const { notifications, markAsRead } = useNotifications(notificationItems)

const route = useRoute()
const id = Number(route.params.id)

// find notification by id
const notif = computed(() =>
    notifications.value.find(n => n.id === id)
)

// mark notification as read when opened
watchEffect(() => {
    if (notif.value && !notif.value.read) {
        markAsRead(id)
    }
})
</script>

<template>
    <div class="py-6 space-y-6">
        <UContainer class="mx-auto">
            <!-- <UButton label="Back to Notifications" icon="i-lucide-arrow-left" variant="outline" @click="$router.back()" /> -->
             <UButton label="Back to Inbox" icon="i-lucide-arrow-left" variant="outline" @click="navigateTo('/inbox')" />
        </UContainer>
        <UContainer class="mx-auto">
            <UCard>
                <div v-if="notif" class="space-y-2">
                    <h1 class="text-xl font-bold text-highlighted">
                        {{ notif.title }}
                    </h1>
                    <div class="text-sm text-muted">
                        <div class="flex items-center">
                            <span class="font-medium">{{ notif.description.name }}</span>
                            <UIcon name="i-lucide-dot" class="size-4 hidden lg:inline" />
                            <span>{{ notif.description.received }}</span>
                        </div>
                    </div>
                    <!-- Notification content -->
                    <div v-if="notif.content" class="mt-4 text-base text-default leading-relaxed">
                        {{ notif.content }}
                    </div>
                </div>
                <div v-else class="text-muted text-center">
                    Notification not found.
                </div>
            </UCard>
        </UContainer>
    </div>
</template>
