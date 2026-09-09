<script setup lang="ts">
definePageMeta({
    isTable: true
})

const container = useTemplateRef('container')
const header = useTemplateRef('header')
const getScrollElement = () => container.value

const { height: headerHeight } = useElementSize(header, undefined, { box: 'border-box' })

// ─── View / modal state ───────────────────────────────────────────────────────
const viewMode = ref<'grid' | 'table'>('table')
const isDetailOpen = ref(false)
const selectedPayslip = ref<(typeof payslipData.value)[0] | null>(null)

// ─── Filters ──────────────────────────────────────────────────────────────────
const period = ref('Monthly')
const month = ref(new Date().getMonth() + 1)
const year = ref(new Date().getFullYear())
const quarter = ref(Math.ceil((new Date().getMonth() + 1) / 3))

const months = Array.from({ length: 12 }, (_, i) => ({
    label: new Date(0, i, 1).toLocaleString('default', { month: 'short' }),
    value: i + 1
}))
const years = Array.from({ length: 10 }, (_, i) => ({
    label: (new Date().getFullYear() - 5 + i).toString(),
    value: new Date().getFullYear() - 5 + i
}))
const quarters = [
    { label: 'Q1', value: 1 },
    { label: 'Q2', value: 2 },
    { label: 'Q3', value: 3 },
    { label: 'Q4', value: 4 }
]

// ─── Data ─────────────────────────────────────────────────────────────────────
const payslipData = ref([
    {
        id: 1,
        date: 'August 28, 2026',
        cutoffPeriod: 'August 14, 2026 – August 27, 2026',
        grossPay: 8000,
        allowances: 1500,
        deductions: 660,
        netPay: 7340,
        status: 'APPROVED',
        earnings: { basicSalary: 8000, overtime: 0, overtimeHours: 0 },
        deductionBreakdown: { sss: 360, philhealth: 200, pagibig: 100, late: 0, lateHours: 0, undertime: 0, undertimeHours: 0, lwop: 0, lwopHours: 0, incomeTax: 0 }
    },
    {
        id: 2,
        date: 'August 14, 2026',
        cutoffPeriod: 'July 31, 2026 – August 13, 2026',
        grossPay: 8000,
        allowances: 0,
        deductions: 0,
        netPay: 8000,
        status: 'APPROVED',
        earnings: { basicSalary: 8000, overtime: 0, overtimeHours: 0 },
        deductionBreakdown: { sss: 0, philhealth: 0, pagibig: 0, late: 0, lateHours: 0, undertime: 0, undertimeHours: 0, lwop: 0, lwopHours: 0, incomeTax: 0 }
    },
    {
        id: 3,
        date: 'July 31, 2026',
        cutoffPeriod: 'July 15, 2026 – July 30, 2026',
        grossPay: 8000,
        allowances: 1500,
        deductions: 660,
        netPay: 7340,
        status: 'APPROVED',
        earnings: { basicSalary: 8000, overtime: 0, overtimeHours: 0 },
        deductionBreakdown: { sss: 360, philhealth: 200, pagibig: 100, late: 0, lateHours: 0, undertime: 0, undertimeHours: 0, lwop: 0, lwopHours: 0, incomeTax: 0 }
    },
    {
        id: 4,
        date: 'July 15, 2026',
        cutoffPeriod: 'June 30, 2026 – July 14, 2026',
        grossPay: 8000,
        allowances: 0,
        deductions: 0,
        netPay: 8000,
        status: 'APPROVED',
        earnings: { basicSalary: 8000, overtime: 0, overtimeHours: 0 },
        deductionBreakdown: { sss: 0, philhealth: 0, pagibig: 0, late: 0, lateHours: 0, undertime: 0, undertimeHours: 0, lwop: 0, lwopHours: 0, incomeTax: 0 }
    },
    {
        id: 5,
        date: 'June 30, 2026',
        cutoffPeriod: 'June 15, 2026 – June 29, 2026',
        grossPay: 8000,
        allowances: 1500,
        deductions: 660,
        netPay: 7340,
        status: 'APPROVED',
        earnings: { basicSalary: 8000, overtime: 0, overtimeHours: 0 },
        deductionBreakdown: { sss: 360, philhealth: 200, pagibig: 100, late: 0, lateHours: 0, undertime: 0, undertimeHours: 0, lwop: 0, lwopHours: 0, incomeTax: 0 }
    },
    {
        id: 6,
        date: 'June 15, 2026',
        cutoffPeriod: 'May 29, 2026 – June 12, 2026',
        grossPay: 8000,
        allowances: 0,
        deductions: 0,
        netPay: 8000,
        status: 'APPROVED',
        earnings: { basicSalary: 8000, overtime: 0, overtimeHours: 0 },
        deductionBreakdown: { sss: 0, philhealth: 0, pagibig: 0, late: 0, lateHours: 0, undertime: 0, undertimeHours: 0, lwop: 0, lwopHours: 0, incomeTax: 0 }
    },
    {
        id: 7,
        date: 'May 29, 2026',
        cutoffPeriod: 'May 15, 2026 – May 28, 2026',
        grossPay: 8000,
        allowances: 1500,
        deductions: 660,
        netPay: 7340,
        status: 'APPROVED',
        earnings: { basicSalary: 8000, overtime: 0, overtimeHours: 0 },
        deductionBreakdown: { sss: 360, philhealth: 200, pagibig: 100, late: 0, lateHours: 0, undertime: 0, undertimeHours: 0, lwop: 0, lwopHours: 0, incomeTax: 0 }
    },
    {
        id: 8,
        date: 'May 15, 2026',
        cutoffPeriod: 'April 30, 2026 – May 14, 2026',
        grossPay: 8000,
        allowances: 0,
        deductions: 0,
        netPay: 8000,
        status: 'APPROVED',
        earnings: { basicSalary: 8000, overtime: 0, overtimeHours: 0 },
        deductionBreakdown: { sss: 0, philhealth: 0, pagibig: 0, late: 0, lateHours: 0, undertime: 0, undertimeHours: 0, lwop: 0, lwopHours: 0, incomeTax: 0 }
    },
])

// ─── Table columns ────────────────────────────────────────────────────────────
const columns = [
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'cutoffPeriod', header: 'Cut-off Period' },
    { accessorKey: 'grossPay', header: 'Gross Pay' },
    { accessorKey: 'deductions', header: 'Deductions' },
    { accessorKey: 'netPay', header: 'Net Pay' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'actions', header: '' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatPHP = (val: number) =>
    `₱${val.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

// ─── KPIs ─────────────────────────────────────────────────────────────────────
const latestPayslip = computed(() => payslipData.value[0])
const totalAllowances = computed(() => payslipData.value.reduce((acc, i) => acc + i.allowances, 0))
const totalDeductions = computed(() => payslipData.value.reduce((acc, i) => acc + i.deductions, 0))

const kpis = computed(() => [
    {
        label: 'Net Pay',
        icon: 'i-lucide-banknote',
        color: 'text-primary-500',
        bg: 'bg-primary-500/10',
        value: formatPHP(latestPayslip.value?.netPay ?? 0),
        sublabel: latestPayslip.value?.date ?? '—',
        highlight: true,
    },
    {
        label: 'Allowances',
        icon: 'i-lucide-gift',
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        value: formatPHP(totalAllowances.value),
        sublabel: `${payslipData.value.length} payslips`,
    },
    {
        label: 'Deductions',
        icon: 'i-lucide-trending-down',
        color: 'text-rose-500',
        bg: 'bg-rose-500/10',
        value: formatPHP(totalDeductions.value),
        sublabel: `${payslipData.value.length} payslips`,
    },
    {
        label: 'Payslips',
        icon: 'i-lucide-file-text',
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10',
        value: payslipData.value.length.toString(),
        sublabel: 'RECORDS',
    },
])

// ─── Actions ─────────────────────────────────────────────────────────────────
function openDetail(row: (typeof payslipData.value)[0]) {
    selectedPayslip.value = row
    isDetailOpen.value = true
}
</script>

<template>
    <div ref="container" class="flex-1 overflow-y-auto scrollbar">
        <div ref="header">
            <!-- Page header -->
            <div class="flex items-center gap-4 p-4">
                <UPageCard
                    title="Payslip"
                    description="Download and view your payslips"
                    variant="naked"
                    class="flex-1"
                />
                <div class="flex items-center gap-2">
                    <UFieldGroup>
                        <UButton icon="i-lucide-layout-grid" color="neutral"
                            :variant="viewMode === 'grid' ? 'subtle' : 'outline'"
                            @click="viewMode = 'grid'" />
                        <UButton icon="i-lucide-list" color="neutral"
                            :variant="viewMode === 'table' ? 'subtle' : 'outline'"
                            @click="viewMode = 'table'" />
                    </UFieldGroup>
                </div>
            </div>

            <!-- KPIs -->
            <div class="flex gap-3 px-4 pb-4">
                <UCard v-for="(kpi, index) in kpis" :key="index" class="shadow-sm flex-1" :ui="{ body: 'sm:p-4' }">
                    <div class="flex items-center gap-3">
                        <div class="rounded-lg p-2 shrink-0 flex" :class="kpi.bg">
                            <UIcon :name="kpi.icon" class="size-5" :class="kpi.color" />
                        </div>
                        <div class="min-w-0">
                            <div class="text-xs text-dimmed truncate">{{ kpi.label }}</div>
                            <div class="flex items-baseline gap-1.5">
                                <span
                                    class="font-bold text-xl leading-tight"
                                    :class="kpi.highlight ? 'text-primary' : ''"
                                >{{ kpi.value }}</span>
                                <span class="text-[10px] font-semibold text-dimmed/70 uppercase tracking-wider">{{ kpi.sublabel }}</span>
                            </div>
                        </div>
                    </div>
                </UCard>
            </div>

            <USeparator />
        </div>

        <!-- ── Grid / Card view ──────────────────────────────────────── -->
        <div v-if="viewMode === 'grid'" class="flex-1 flex flex-col p-4">
            <div v-if="payslipData.length === 0" class="flex-1 flex items-center justify-center py-20">
                <UEmpty
                    icon="i-lucide-file-x"
                    title="No payslips"
                    description="No payslip records found for the selected period."
                    variant="naked"
                />
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                <UCard
                    v-for="item in payslipData"
                    :key="item.id"
                    class="flex flex-col shadow-sm cursor-pointer group hover:ring-1 hover:ring-primary/40 transition-all"
                    :ui="{ body: 'flex flex-col h-full gap-4 sm:p-4 group-hover:bg-linear-to-tl group-hover:from-primary/10 group-hover:from-5% group-hover:to-default transition-all duration-300 ease-out' }"
                    @click="openDetail(item)"
                >
                    <div class="flex items-start justify-between gap-2">
                        <div class="space-y-0.5 min-w-0">
                            <div class="font-semibold text-highlighted truncate group-hover:text-primary transition-colors">{{ item.date }}</div>
                            <!-- <div class="text-xs text-dimmed">{{ item.cutoffPeriod }}</div> -->
                        </div>
                        <StatusBadge :status="item.status" />
                    </div>

                    <div class="grid grid-cols-2 gap-2 text-sm bg-muted dark:bg-muted/30 p-3 rounded-md mt-auto">
                        <div>
                            <div class="text-xs text-dimmed mb-0.5">Gross Pay</div>
                            <div class="font-medium tabular-nums">{{ formatPHP(item.grossPay) }}</div>
                        </div>
                        <div>
                            <div class="text-xs text-dimmed mb-0.5">Deductions</div>
                            <div class="font-medium tabular-nums text-rose-500">{{ formatPHP(item.deductions) }}</div>
                        </div>
                        <USeparator class="col-span-2" />
                        <div class="col-span-2">
                            <div class="text-xs text-dimmed mb-0.5">Net Pay</div>
                            <div class="font-bold text-lg tabular-nums text-primary">{{ formatPHP(item.netPay) }}</div>
                        </div>
                    </div>

                    <!-- Crossfade: stats out / button in -->
                    <div class="relative">
                        <!-- Default: Net Pay summary row, slides up + fades out on hover -->
                        <div class="flex items-center justify-between transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-1">
                            <span class="text-xs text-dimmed">Cut-off</span>
                            <span class="text-xs font-medium tabular-nums">{{ item.cutoffPeriod }}</span>
                        </div>
                        <!-- Hover: View Details button slides up from below -->
                        <div class="absolute inset-0 flex items-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                            <UButton block label="View Details" variant="soft" color="primary" @click.stop="openDetail(item)" />
                        </div>
                    </div>
                </UCard>
            </div>
        </div>

        <!-- ── Table view ─────────────────────────────────────────────── -->
        <UTable
            v-else
            :data="payslipData"
            :columns="columns"
            sticky
            class="flex-1 min-h-0"
            :virtualize="{ scrollMargin: headerHeight, getScrollElement }"
        >
            <template #grossPay-cell="{ row }">
                <span class="tabular-nums">{{ formatPHP(row.original.grossPay) }}</span>
            </template>
            <template #deductions-cell="{ row }">
                <span class="tabular-nums text-rose-500">{{ formatPHP(row.original.deductions) }}</span>
            </template>
            <template #netPay-cell="{ row }">
                <span class="tabular-nums font-semibold text-primary">{{ formatPHP(row.original.netPay) }}</span>
            </template>
            <template #status-cell="{ row }">
                <StatusBadge :status="row.original.status" />
            </template>
            <template #actions-cell="{ row }">
                <UButton
                    icon="i-lucide-eye"
                    color="neutral"
                    variant="ghost"
                    size="sm"
                    aria-label="View payslip"
                    @click="openDetail(row.original)"
                />
            </template>
            <template #empty>
                <UEmpty
                    icon="i-lucide-file-x"
                    title="No payslips"
                    description="No payslip records found for the selected period."
                    variant="naked"
                />
            </template>
        </UTable>
    </div>

    <!-- ── Payslip Detail Modal ──────────────────────────────────────── -->
    <PayslipDetailModal v-model:open="isDetailOpen" :payslip="selectedPayslip" />
</template>