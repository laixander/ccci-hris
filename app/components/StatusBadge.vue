<script setup lang="ts">
/**
 * StatusBadge — Reusable badge for uppercase enum status values.
 *
 * Covers:
 *   Approval:        PENDING | APPROVED | REJECTED
 *   Timesheet:       PRESENT | HOLIDAY | WEEKEND | LWOP | ON LEAVE
 *   Evaluation:      PENDING | CONFIRMED
 *   Leaves:          PENDING | APPROVED | REJECTED
 *   Reimbursements:  PENDING | APPROVED | DECLINED
 *   Payslip:         PROCESSING | GENERATED | RELEASED | APPROVED
 *   Directory:       ACTIVE | INACTIVE
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
    APPROVED:    { color: 'success', icon: 'i-lucide-check-circle' },
    CONFIRMED:   { color: 'success', icon: 'i-lucide-check-circle' },
    PENDING:     { color: 'warning', icon: 'i-lucide-clock' },
    REJECTED:    { color: 'error',   icon: 'i-lucide-x-circle' },
    DECLINED:    { color: 'error',   icon: 'i-lucide-ban' },

    // Payslip statuses
    PROCESSING:  { color: 'info',    icon: 'i-lucide-loader-circle' },
    GENERATED:   { color: 'neutral', icon: 'i-lucide-file-check' },
    RELEASED:    { color: 'primary', icon: 'i-lucide-send' },

    // Timesheet attendance statuses
    PRESENT:    { color: 'success', icon: 'i-lucide-circle-check' },
    HOLIDAY:    { color: 'purple',  icon: 'i-lucide-star' },
    WEEKEND:    { color: 'neutral', icon: 'i-lucide-calendar-off' },
    LWOP:       { color: 'error',   icon: 'i-lucide-circle-minus' },
    'ON LEAVE': { color: 'warning', icon: 'i-lucide-plane' },

    // Directory statuses
    ACTIVE:     { color: 'success', icon: 'i-lucide-user-check' },
    INACTIVE:   { color: 'neutral', icon: 'i-lucide-user-minus' },

    // Onboarding template statuses
    DRAFT:      { color: 'neutral', icon: 'i-lucide-file-edit' },
    PUBLISHED:  { color: 'success', icon: 'i-lucide-check-circle' },

    // Onboarding statuses
    SCHEDULED:  { color: 'info',    icon: 'i-lucide-calendar' },
    'IN PROGRESS':{ color: 'primary', icon: 'i-lucide-loader-2' },
    COMPLETED:  { color: 'success', icon: 'i-lucide-check-circle' },
    CANCELLED:  { color: 'error',   icon: 'i-lucide-x-circle' },

    // Asset statuses
    AVAILABLE:  { color: 'success', icon: 'i-lucide-check-circle' },
    ASSIGNED:   { color: 'primary', icon: 'i-lucide-user-check' },
    MAINTENANCE:{ color: 'warning', icon: 'i-lucide-wrench' },
    BROKEN:     { color: 'error',   icon: 'i-lucide-x-circle' },
    'UNDER REPAIR':{ color: 'warning', icon: 'i-lucide-hammer' },
    RETIRED:    { color: 'neutral', icon: 'i-lucide-archive' },
    RETURNED:   { color: 'primary', icon: 'i-lucide-corner-down-left' },
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
        // .toLowerCase()
        // .replace(/\b\w/g, c => c.toUpperCase())
})
</script>

<template>
    <UBadge
        :color="config.color"
        :variant="variant"
        :size="size"
        :icon="showIcon ? config.icon : undefined"
        :label="label"
        :ui="{
            base: 'font-semibold text-[10px] tracking-wider'
        }"
    />
</template>