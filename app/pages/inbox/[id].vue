<script setup lang="ts">
import { useRoute } from 'vue-router'
import Page from '~/components/global/Page.vue'
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
    <UContainer v-if="notif">
        <Page>
            <template #title>
                <div class="font-semibold text-xl text-highlighted">
                    {{ notif.title }}
                </div>
            </template>
            <template #description>
                <div class="flex items-center text-muted">
                    <span class="text-sm font-medium">{{ notif.description.name }}</span>
                    <UIcon name="i-lucide-dot" class="size-4 hidden lg:inline" />
                    <span class="text-sm">{{ notif.description.received }}</span>
                </div>
            </template>
            <!-- <UButton label="Back to Notifications" icon="i-lucide-arrow-left" variant="outline" @click="$router.back()" /> -->
            <template #actions>
                <UButton label="Back to Inbox" icon="i-lucide-arrow-left" variant="outline" @click="navigateTo('/inbox')" />
            </template>
            <UCard>
                <div v-if="notif.content" class="text-sm leading-relaxed">
                    {{ notif.content }}
                </div>
                <div v-else class="text-muted text-center">
                    Notification not found.
                </div>
            </UCard>
        </Page>
    </UContainer>
    <UContainer v-else>
        <Page>
            <!-- <UButton label="Back to Notifications" icon="i-lucide-arrow-left" variant="outline" @click="$router.back()" /> -->
            <template #actions>
                <UButton label="Back to Inbox" icon="i-lucide-arrow-left" variant="outline" @click="navigateTo('/inbox')" />
            </template>
            <UCard>
                <div class="text-muted text-center">
                    Notification not found.
                </div>
            </UCard>
        </Page>
    </UContainer>
</template>
