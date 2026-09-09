<script setup lang="ts">
type DeductionBreakdown = {
    sss: number
    philhealth: number
    pagibig: number
    late: number
    lateHours: number
    undertime: number
    undertimeHours: number
    lwop: number
    lwopHours: number
    incomeTax: number
}

type Payslip = {
    id: number
    date: string
    cutoffPeriod: string
    grossPay: number
    allowances: number
    deductions: number
    netPay: number
    status: string
    earnings: { basicSalary: number; overtime: number; overtimeHours: number }
    deductionBreakdown: DeductionBreakdown
} | null

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{ payslip: Payslip }>()

const formatPHP = (val: number) =>
    `₱${val.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const totalEarnings = computed(() =>
    (props.payslip?.earnings.basicSalary ?? 0) + (props.payslip?.earnings.overtime ?? 0)
)

const totalDeductions = computed(() => {
    const d = props.payslip?.deductionBreakdown
    if (!d) return 0
    return d.sss + d.philhealth + d.pagibig + d.late + d.undertime + d.lwop + d.incomeTax
})
</script>

<template>
    <UModal
        v-model:open="open"
        class="w-full max-w-[760px]"
        :ui="{
            content: 'overflow-visible group',
            header: 'relative bg-linear-to-r from-primary-500/15 to-primary-500/0 rounded-t-lg',
            body: 'scrollbar max-h-[80vh] overflow-y-auto',
        }"
    >
        <template #header>
            <!-- Watermark icon -->
            <div class="absolute overflow-hidden inset-0 pointer-events-none">
                <UIcon name="i-lucide-file-text" class="size-28 text-primary-500 opacity-10 absolute -bottom-8 end-3" />
            </div>

            <!-- Title row -->
            <div class="flex items-center justify-between gap-3 flex-1">
                <div class="flex flex-col">
                    <h2 class="text-primary font-semibold">Payslip</h2>
                    <p class="text-primary/60 text-sm mt-0.5">{{ payslip?.cutoffPeriod ?? '—' }}</p>
                </div>
                <div class="flex items-center gap-2">
                    <StatusBadge v-if="payslip" :status="payslip.status" />
                    <UButton
                        icon="i-lucide-printer"
                        label="Print Payslip"
                        color="neutral"
                        variant="ghost"
                        size="sm"
                    />
                </div>
            </div>

            <!-- Floating close -->
            <UButton
                icon="i-lucide-x"
                variant="outline"
                color="neutral"
                class="absolute -top-4 -end-4 opacity-0 group-hover:opacity-100 transition-opacity"
                @click="open = false"
            />
        </template>

        <template #body>
            <div v-if="payslip" class="space-y-5 py-1">

                <!-- ── Earnings & Deductions side by side ─────────────── -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <!-- Earnings -->
                    <div>
                        <div class="text-xs font-semibold text-dimmed uppercase tracking-widest mb-2">Earnings</div>
                        <div class="rounded-lg border border-default overflow-hidden text-sm">
                            <div class="flex justify-between px-3 py-2.5 hover:bg-muted/40 transition-colors">
                                <span>Basic Salary</span>
                                <span class="font-medium tabular-nums">{{ formatPHP(payslip.earnings.basicSalary) }}</span>
                            </div>
                            <USeparator />
                            <div class="flex justify-between px-3 py-2.5 hover:bg-muted/40 transition-colors">
                                <span>
                                    Overtime
                                    <span class="text-dimmed text-xs ml-1">({{ payslip.earnings.overtimeHours.toFixed(2) }} hrs)</span>
                                </span>
                                <span class="font-medium tabular-nums">{{ formatPHP(payslip.earnings.overtime) }}</span>
                            </div>
                            <USeparator />
                            <div class="flex justify-between px-3 py-2.5 bg-muted/50 font-semibold">
                                <span>Total Earnings</span>
                                <span class="tabular-nums">{{ formatPHP(totalEarnings) }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Deductions -->
                    <div>
                        <div class="text-xs font-semibold text-dimmed uppercase tracking-widest mb-2">Deductions</div>
                        <div class="rounded-lg border border-default overflow-hidden text-sm">
                            <div class="flex justify-between px-3 py-2.5 hover:bg-muted/40 transition-colors">
                                <span>SSS Contribution</span>
                                <span class="font-medium tabular-nums">{{ formatPHP(payslip.deductionBreakdown.sss) }}</span>
                            </div>
                            <USeparator />
                            <div class="flex justify-between px-3 py-2.5 hover:bg-muted/40 transition-colors">
                                <span>Philhealth</span>
                                <span class="font-medium tabular-nums">{{ formatPHP(payslip.deductionBreakdown.philhealth) }}</span>
                            </div>
                            <USeparator />
                            <div class="flex justify-between px-3 py-2.5 hover:bg-muted/40 transition-colors">
                                <span>Pag-ibig (HDMF)</span>
                                <span class="font-medium tabular-nums">{{ formatPHP(payslip.deductionBreakdown.pagibig) }}</span>
                            </div>
                            <USeparator />
                            <div class="flex justify-between px-3 py-2.5 hover:bg-muted/40 transition-colors">
                                <span>
                                    Late
                                    <span class="text-dimmed text-xs ml-1">({{ payslip.deductionBreakdown.lateHours.toFixed(2) }} hrs)</span>
                                </span>
                                <span class="font-medium tabular-nums">{{ formatPHP(payslip.deductionBreakdown.late) }}</span>
                            </div>
                            <USeparator />
                            <div class="flex justify-between px-3 py-2.5 hover:bg-muted/40 transition-colors">
                                <span>
                                    Undertime
                                    <span class="text-dimmed text-xs ml-1">({{ payslip.deductionBreakdown.undertimeHours.toFixed(2) }} hrs)</span>
                                </span>
                                <span class="font-medium tabular-nums">{{ formatPHP(payslip.deductionBreakdown.undertime) }}</span>
                            </div>
                            <USeparator />
                            <div class="flex justify-between px-3 py-2.5 hover:bg-muted/40 transition-colors">
                                <span>
                                    LWOP
                                    <span class="text-dimmed text-xs ml-1">({{ payslip.deductionBreakdown.lwopHours.toFixed(2) }} hrs)</span>
                                </span>
                                <span class="font-medium tabular-nums">{{ formatPHP(payslip.deductionBreakdown.lwop) }}</span>
                            </div>
                            <USeparator />
                            <div class="flex justify-between px-3 py-2.5 hover:bg-muted/40 transition-colors">
                                <span>Income Tax</span>
                                <span class="font-medium tabular-nums">{{ formatPHP(payslip.deductionBreakdown.incomeTax) }}</span>
                            </div>
                            <USeparator />
                            <div class="flex justify-between px-3 py-2.5 bg-muted/50 font-semibold">
                                <span>Total Deductions</span>
                                <span class="tabular-nums text-rose-500">{{ formatPHP(totalDeductions) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ── Summary ─────────────────────────────────────────── -->
                <div>
                    <div class="text-xs font-semibold text-dimmed uppercase tracking-widest mb-2">Summary</div>
                    <div class="rounded-lg border border-default overflow-hidden text-sm">
                        <div class="flex justify-between px-3 py-2.5 hover:bg-muted/40 transition-colors">
                            <span>Basic Salary</span>
                            <span class="font-medium tabular-nums">{{ formatPHP(payslip.earnings.basicSalary) }}</span>
                        </div>
                        <USeparator />
                        <div class="flex justify-between px-3 py-2.5 hover:bg-muted/40 transition-colors">
                            <span>Overtime</span>
                            <span class="font-medium tabular-nums">{{ formatPHP(payslip.earnings.overtime) }}</span>
                        </div>
                        <USeparator />
                        <div class="flex justify-between px-3 py-2.5 hover:bg-muted/40 transition-colors">
                            <span>Total Allowances</span>
                            <span class="font-medium tabular-nums">{{ formatPHP(payslip.allowances) }}</span>
                        </div>
                        <USeparator />
                        <div class="flex justify-between px-3 py-2.5 hover:bg-muted/40 transition-colors">
                            <span>Total Deductions</span>
                            <span class="font-medium tabular-nums text-rose-500">{{ formatPHP(totalDeductions) }}</span>
                        </div>
                        <USeparator />
                        <div class="flex justify-between px-4 py-3.5 bg-muted/50">
                            <span class="font-bold">Net Pay</span>
                            <span class="font-bold text-lg tabular-nums text-primary">{{ formatPHP(payslip.netPay) }}</span>
                        </div>
                    </div>
                </div>

                <!-- ── Confidentiality note ──────────────────────────── -->
                <div class="text-center text-xs text-dimmed/60 pt-1 pb-2">
                    <div class="font-semibold uppercase tracking-wider">Highly Confidential</div>
                    <div>This is a system generated payslip.</div>
                </div>
            </div>

            <!-- Empty state if no payslip selected -->
            <div v-else class="py-12">
                <UEmpty
                    icon="i-lucide-file-x"
                    title="No payslip selected"
                    description="Please select a payslip to view its details."
                    variant="naked"
                />
            </div>
        </template>
    </UModal>
</template>
