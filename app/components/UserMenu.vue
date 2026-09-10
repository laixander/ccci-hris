<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
    collapsed?: boolean
}>()

const router = useRouter()
const { currentUser, role, isAdmin, logout } = useDemoAuth()

const items = computed<DropdownMenuItem[][]>(() => [
    // Settings shortcut
    [{
        label: 'Settings',
        icon: 'i-lucide-settings',
        onSelect: () => router.push('/settings')
    }],
    [{
        label: 'Log out',
        icon: 'i-lucide-log-out',
        onSelect: () => logout()
    }]
])
</script>

<template>
    <UDropdownMenu :items="items" :content="{ align: 'end', collisionPadding: 12 }">
        <UButton color="neutral" variant="ghost" class="data-[state=open]:bg-elevated/50 py-2 w-full group">
            <div class="flex items-center gap-2 text-left w-full">
                <UAvatar src="https://api.dicebear.com/10.x/thumbs/svg?seed=JohnDoe"
                    alt="John Doe" />
                <!-- <span v-if="!collapsed" class="flex-1 truncate">John Doe</span>
                <UBadge v-if="!collapsed" label="Admin" color="primary"
                    variant="soft" size="sm" class="shrink-0" /> -->
                <UIcon name="i-lucide-chevron-down" class="transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </div>
        </UButton>
    </UDropdownMenu>
</template>
