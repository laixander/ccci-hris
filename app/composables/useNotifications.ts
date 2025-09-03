import { ref, computed } from 'vue'
import { navigateTo } from '#app'
import type { ListItemProps } from '~/types/models'

export interface Notification extends ListItemProps {
    id: number
    read: boolean
    content?: string
}

export function useNotifications(initial: Notification[] = []) {
    const notifications = ref<Notification[]>([...initial])

    // limit count
    const limitedNotifications = computed(() => notifications.value.slice(0, 12))

    const markAsRead = (id: number) => {
        const notif = notifications.value.find(n => n.id === id)
        if (notif) notif.read = true
    }

    const toggleRead = (id: number) => {
        const notif = notifications.value.find(n => n.id === id)
        if (notif) notif.read = !notif.read
    }

    const markAllAsRead = () => {
        notifications.value.forEach(n => (n.read = true))
    }

    const unreadCount = computed(
        () => notifications.value.filter(n => !n.read).length
    )

    /**
     * Handles notification click:
     * - Marks as read
     * - Navigates to details page
     */
    const handleClick = async (id: number, afterNavigate?: () => void) => {
        markAsRead(id)
        await navigateTo(`/inbox/${id}`)
        if (afterNavigate) afterNavigate()
    }

    return {
        notifications,
        limitedNotifications,
        markAsRead,
        toggleRead,
        markAllAsRead,
        unreadCount,
        handleClick
    }
}
