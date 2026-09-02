<script setup lang="ts">
/**
 * StatusBadge — Reusable badge for uppercase enum status values.
 *
 * Covers:
 *   Approval:   PENDING | APPROVED | REJECTED
 *   Timesheet:  PRESENT | HOLIDAY | WEEKEND | LWOP | ON LEAVE
 *   Evaluation: PENDING | CONFIRMED
 *   Leaves:     PENDING | APPROVED | REJECTED
 */

const props = withDefaults(defineProps<{
    status: string
    variant?: 'solid' | 'outline' | 'soft' | 'subtle'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    showIcon?: boolean
}>(), {
    variant: 'subtle',
    size: 'md',
    showIcon: false,
})

type StatusConfig = {
    color: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'purple' | 'primary'
    icon?: string
    label?: string
}

const STATUS_MAP: Record<string, StatusConfig> = {
    // Approval / Leave statuses
    APPROVED:   { color: 'success', icon: 'i-lucide-check-circle' },
    CONFIRMED:  { color: 'success', icon: 'i-lucide-check-circle' },
    PENDING:    { color: 'warning', icon: 'i-lucide-clock' },
    REJECTED:   { color: 'error',   icon: 'i-lucide-x-circle' },

    // Timesheet attendance statuses
    PRESENT:    { color: 'success', icon: 'i-lucide-circle-check' },
    HOLIDAY:    { color: 'purple',  icon: 'i-lucide-star' },
    WEEKEND:    { color: 'neutral', icon: 'i-lucide-calendar-off' },
    LWOP:       { color: 'error',   icon: 'i-lucide-circle-minus' },
    'ON LEAVE': { color: 'warning', icon: 'i-lucide-plane' },
}

const config = computed<StatusConfig>(() => {
    const key = props.status?.toUpperCase?.() ?? ''
    return STATUS_MAP[key] ?? { color: 'neutral', icon: 'i-lucide-circle-help' }
})

// Title-case the status for display (e.g. "ON LEAVE" → "On Leave")
const label = computed(() => {
    if (!props.status) return ''
    if (props.status.toUpperCase() === 'LWOP') return 'LWOP'
    
    return props.status
        .toLowerCase()
        .replace(/\b\w/g, c => c.toUpperCase())
})
</script>

<template>
    <UBadge
        :color="config.color"
        :variant="variant"
        :size="size"
        :icon="showIcon ? config.icon : undefined"
        :label="label"
    />
</template>