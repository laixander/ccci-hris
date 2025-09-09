<script setup lang="ts">
import { notificationItems } from '~/data'
import { useNotifications } from '~/composables/useNotifications'
import Page from '~/components/global/Page.vue';

// bring in notifications composable
const { notifications, handleClick, markAllAsRead, unreadCount } = useNotifications(notificationItems)
</script>

<template>
    <UContainer>
        <Page>
            <template #title>
                <div class="flex items-center gap-2">
                    <div class="text-2xl text-pretty font-bold text-highlighted">
                        Your Inbox
                    </div>
                    <UBadge :color="unreadCount === 0 ? 'neutral' : 'error'" variant="soft">
                        {{ unreadCount }}
                    </UBadge>
                </div>
            </template>
            <template #actions>
                <UButton
                    icon="i-lucide-mail-check"
                    size="lg"
                    variant="subtle"
                    color="neutral"
                    @click="markAllAsRead"
                    :disabled="unreadCount === 0"
                >
                    Mark all as read
                </UButton>
            </template>
            <!-- Notifications list -->
            <Block noBodyPadding>
                <ListGroup>
                    <ListItem
                        v-for="n in notifications"
                        :key="n.id"
                        :title="n.title"
                        :description="typeof n.description === 'string' ? n.description : undefined"
                        :read="n.read"
                        @click="handleClick(n.id)"
                        class="cursor-pointer px-4 py-3 hover:bg-muted/10 transition"
                    >
                        <template v-if="typeof n.description === 'object'" #description>
                        <div class="flex items-center text-xs text-muted">
                            <span class="font-medium">{{ n.description.name }}</span>
                            <UIcon name="i-lucide-dot" class="size-4" />
                            <span>{{ n.description.received }}</span>
                        </div>
                        </template>
                    </ListItem>
                </ListGroup>
            </Block>
        </Page>
    </UContainer>
</template>
