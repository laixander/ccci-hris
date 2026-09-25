<script setup lang="ts">
import type { Reimbursement } from '~~/app/types'
import { computed } from 'vue'

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{ 
    request: Reimbursement | null
    isAdmin?: boolean 
}>()

const { register } = useOverlayVisibility()
register(open)


const parseAmount = (amt: string) => parseFloat(amt.replace(/[₱,]/g, '')) || 0
const formatAmount = (val: number) => `₱ ${val.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const vatableAmount = computed(() => {
    if (!props.request) return '₱ 0.00'
    const amount = parseAmount(props.request.amount)
    return formatAmount(amount / 1.12)
})

const vat = computed(() => {
    if (!props.request) return '₱ 0.00'
    const amount = parseAmount(props.request.amount)
    return formatAmount(amount - (amount / 1.12))
})
</script>

<template>
    <UDrawer
        v-model:open="open"
        direction="right"
        title="Expense Details"
        inset
        close
        class="w-full max-w-[480px]"
        :ui="{
            container: 'pr-0',
            header: 'pr-4',
            footer: 'pr-4',
            body: 'pr-4 overflow-y-auto scrollbar'
        }"
    >
        <template #body>
            <div v-if="props.request" class="space-y-4">
                <!-- Header Banner Card -->
                <div class="relative overflow-hidden p-4 rounded-lg bg-linear-to-r from-primary-500/15 to-primary-500/0 border border-[var(--ui-border)] shadow-xs">
                    <div class="absolute overflow-hidden inset-0 pointer-events-none">
                        <UIcon name="i-lucide-receipt-text" class="size-24 text-primary-500 opacity-10 absolute -bottom-7 end-2" />
                    </div>
                    <div class="flex items-center justify-between gap-3 relative z-10">
                        <div class="flex items-center gap-3">
                            <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <UIcon name="i-lucide-receipt-text" class="size-5 text-primary" />
                            </div>
                            <div class="min-w-0">
                                <h3 class="text-base font-semibold text-highlighted leading-tight truncate">{{ props.request.category }}</h3>
                                <p class="text-xs text-dimmed mt-0.5">{{ props.request.dateApplied.split(' at ')[0] }}</p>
                            </div>
                        </div>
                        <StatusBadge :status="props.request.status" />
                    </div>
                </div>

                <!-- Details -->
                <div class="space-y-2">
                    <p class="text-xs font-semibold text-dimmed uppercase tracking-wider">Expense Information</p>
                    <div class="grid grid-cols-2 gap-3 text-sm bg-muted dark:bg-muted/30 p-4 rounded-lg">
                        
                        <template v-if="props.isAdmin">
                            <div class="col-span-2">
                                <div class="text-xs text-dimmed mb-1">Employee</div>
                                <div class="flex items-center gap-2">
                                    <UAvatar :src="props.request.employeeAvatar" :alt="props.request.employeeName" size="sm" />
                                    <span class="font-medium text-highlighted">{{ props.request.employeeName }}</span>
                                </div>
                            </div>
                            <USeparator class="col-span-2" />
                        </template>

                        <div class="col-span-2">
                            <div class="text-xs text-dimmed mb-0.5">Date of Expense</div>
                            <div class="font-medium">{{ props.request.dateOfExpense }}</div>
                        </div>
                        <USeparator class="col-span-2" />
                        
                        <div class="col-span-2">
                            <div class="text-xs text-dimmed mb-0.5">Merchant</div>
                            <div class="font-medium">{{ props.request.merchant }}</div>
                        </div>
                        <USeparator class="col-span-2" />
                        
                        <div class="col-span-2">
                            <div class="text-xs text-dimmed mb-0.5">Merchant Address</div>
                            <div class="font-medium leading-relaxed">{{ props.request.merchantAddress || '—' }}</div>
                        </div>
                        <USeparator class="col-span-2" />

                        <div class="col-span-2">
                            <div class="text-xs text-dimmed mb-0.5">TIN</div>
                            <div class="font-medium">{{ props.request.merchantTIN || '—' }}</div>
                        </div>
                        <USeparator class="col-span-2" />

                        <div>
                            <div class="text-xs text-dimmed mb-0.5">Amount</div>
                            <div class="font-semibold text-primary">{{ props.request.amount.replace('₱', '₱ ') }}</div>
                        </div>
                        <div class="col-span-2 lg:col-span-1" />
                        <USeparator class="col-span-2" />

                        <div>
                            <div class="text-xs text-dimmed mb-0.5">Vatable Amount</div>
                            <div class="font-medium">{{ vatableAmount }}</div>
                        </div>
                        <div>
                            <div class="text-xs text-dimmed mb-0.5">VAT</div>
                            <div class="font-medium">{{ vat }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="flex items-center gap-2 w-full">
                <template v-if="props.isAdmin && props.request?.status === 'PENDING'">
                    <UButton label="Approve" color="success" class="flex-1 justify-center" @click="open = false" />
                    <UButton label="Deny" color="error" variant="subtle" class="flex-1 justify-center" @click="open = false" />
                </template>
                <div v-else class="flex-1"></div>
                <UButton label="Close" variant="ghost" color="neutral" @click="open = false" />
            </div>
        </template>
    </UDrawer>
</template>
