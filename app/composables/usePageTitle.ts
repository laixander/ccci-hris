// composables/usePageTitle.ts
import { computed } from 'vue'
import { useRoute } from '#imports'
import { customTitles } from '~/data'
import { useNotifications } from '~/composables/useNotifications'
import { notificationItems } from '~/data'

export function usePageTitle() {
  const route = useRoute()

  // bring in notifications composable
  const { notifications } = useNotifications(notificationItems)

  const pageTitle = computed(() => {
    const name = String(route.name ?? '')

    // if we're in notification detail
    if (name.startsWith('notifications-id')) {
      const id = Number(route.params.id)
      const notif = notifications.value.find(n => n.id === id)
      return notif ? notif.title : 'Notification'
    }

    // otherwise fall back to customTitles or route name formatting
    return (
      customTitles[name] ||
      name
        .replace(/[-._]/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, l => l.toUpperCase())
    )
  })

  return {
    pageTitle,
  }
}
