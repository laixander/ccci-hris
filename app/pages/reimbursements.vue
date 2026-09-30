<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { Reimbursement } from '~~/app/types'
import { Doughnut, Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip as ChartTooltip,
    Legend,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js'

ChartJS.register(Title, ChartTooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale)

definePageMeta({
    isTable: true
})

const UButton = resolveComponent('UButton')

// ─── Table columns ────────────────────────────────────────────────────────────
const columns = [
    { accessorKey: 'dateApplied', header: 'Date Applied' },
    { accessorKey: 'dateOfExpense', header: 'Date of Expense' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'merchant', header: 'Merchant' },
    { accessorKey: 'amount', header: 'Amount' },
    { accessorKey: 'status', header: 'Status' },
    {
        id: 'actions',
        header: '',
        meta: { class: { th: 'w-16', td: 'text-right' } },
        cell: ({ row }: any) => h(UButton as any, {
            icon: 'i-lucide-eye',
            color: 'neutral',
            variant: 'ghost',
            size: 'sm',
            'aria-label': 'View details',
            onClick: (e: Event) => {
                e.stopPropagation()
                openDetails(row.original)
            }
        })
    }
]

// ─── Data ─────────────────────────────────────────────────────────────────────
const { data } = useLazyFetch('/api/reimbursements')
const reimbursementData = computed(() => data.value ?? [])

// ─── State ────────────────────────────────────────────────────────────────────
const container = useTemplateRef('container')
const header = useTemplateRef('header')
const getScrollElement = () => container.value

const { height: headerHeight } = useElementSize(header, undefined, { box: 'border-box' })

const viewMode = ref<'grid' | 'table'>('table')
const isModalOpen = ref(false)
const isDrawerOpen = ref(false)
const isAnalyticsOpen = ref(false)
const selectedRequest = ref<Reimbursement | null>(null)

const openDetails = (request: Reimbursement) => {
    selectedRequest.value = request
    isDrawerOpen.value = true
}

const { register } = useOverlayVisibility()
register(isModalOpen)
register(isDrawerOpen)
register(isAnalyticsOpen)

const status = ref('All Status')
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

const parseAmount = (amt: string) => parseFloat(amt.replace(/[₱,]/g, '')) || 0

const search = ref('')
const selectedType = ref('All Categories')

// ─── Filters & Computeds ──────────────────────────────────────────────────────
const requestTypes = computed(() => [
    'All Categories',
    ...new Set(reimbursementData.value.map(s => s.category))
])

const filteredReimbursements = computed(() => {
    return reimbursementData.value.filter(s => {
        // Search & Category
        const matchesSearch =
            s.category.toLowerCase().includes(search.value.toLowerCase()) ||
            s.merchant.toLowerCase().includes(search.value.toLowerCase()) ||
            s.status.toLowerCase().includes(search.value.toLowerCase())
            
        const matchesType = selectedType.value === 'All Categories' || s.category === selectedType.value
        
        // Status
        const matchesStatus = status.value === 'All Status' || s.status.toUpperCase() === status.value.toUpperCase()
        
        // Period (Date of Expense)
        const itemDate = new Date(s.dateOfExpense)
        const itemMonth = itemDate.getMonth() + 1
        const itemYear = itemDate.getFullYear()
        const itemQuarter = Math.ceil(itemMonth / 3)
        
        let matchesPeriod = false
        if (period.value === 'Yearly') {
            matchesPeriod = itemYear === year.value
        } else if (period.value === 'Quarterly') {
            matchesPeriod = itemYear === year.value && itemQuarter === quarter.value
        } else if (period.value === 'Monthly') {
            matchesPeriod = itemYear === year.value && itemMonth === month.value
        }
        
        return matchesSearch && matchesType && matchesStatus && matchesPeriod
    })
})

const totalExpenses = computed(() => filteredReimbursements.value.reduce((acc, i) => acc + parseAmount(i.amount), 0))
const approvedItems = computed(() => filteredReimbursements.value.filter(i => i.status === 'APPROVED'))
const pendingItems = computed(() => filteredReimbursements.value.filter(i => i.status === 'PENDING'))
const declinedItems = computed(() => filteredReimbursements.value.filter(i => i.status === 'DECLINED'))

const formatAmount = (val: number) => `₱${val.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const kpis = computed(() => [
    { label: 'Total Expenses', icon: 'i-lucide-receipt-text', color: 'text-indigo-500', bg: 'bg-indigo-500/10', value: formatAmount(totalExpenses.value), sublabel: `${filteredReimbursements.value.length} requests` },
    { label: 'Approved', icon: 'i-lucide-check-circle-2', color: 'text-emerald-500', bg: 'bg-emerald-500/10', value: formatAmount(approvedItems.value.reduce((acc, i) => acc + parseAmount(i.amount), 0)), sublabel: `${approvedItems.value.length} requests` },
    { label: 'Pending', icon: 'i-lucide-hourglass', color: 'text-amber-500', bg: 'bg-amber-500/10', value: pendingItems.value.length.toString(), sublabel: 'awaiting review' },
    { label: 'Denied', icon: 'i-lucide-ban', color: 'text-rose-500', bg: 'bg-rose-500/10', value: declinedItems.value.length.toString(), sublabel: formatAmount(declinedItems.value.reduce((acc, i) => acc + parseAmount(i.amount), 0)) },
])

const viewStats = ref(true)

// ─── Analytics Drawer ─────────────────────────────────────────────────────────
const chartColors = {
    category: [
        'rgba(99,102,241,0.85)',
        'rgba(16,185,129,0.85)',
        'rgba(245,158,11,0.85)',
        'rgba(236,72,153,0.85)',
        'rgba(14,165,233,0.85)',
        'rgba(139,92,246,0.85)',
    ],
    status: [
        'rgba(245,158,11,0.85)',
        'rgba(16,185,129,0.85)',
        'rgba(239,68,68,0.85)',
    ],
}

const chartBase = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom' as const,
            labels: { color: '#9ca3af', font: { family: 'Inter', size: 12 }, padding: 16, boxWidth: 12, boxHeight: 12 },
        },
        tooltip: {
            backgroundColor: 'rgba(15,23,42,0.95)',
            titleFont: { family: 'Inter', size: 13 },
            bodyFont: { family: 'Inter', size: 13 },
            padding: 12,
            cornerRadius: 8,
        },
    },
}

const doughnutOptions = {
    ...chartBase,
    cutout: '65%',
    plugins: {
        ...chartBase.plugins,
        legend: { ...chartBase.plugins.legend, position: 'bottom' as const },
    },
}

const categoryChartData = computed(() => {
    const map = new Map<string, number>()
    filteredReimbursements.value.forEach(r => {
        const cat = r.category || 'Others'
        map.set(cat, (map.get(cat) ?? 0) + parseAmount(r.amount))
    })
    const labels = [...map.keys()]
    const values = labels.map(l => map.get(l)!)
    return {
        labels,
        datasets: [{
            data: values,
            backgroundColor: chartColors.category.slice(0, labels.length),
            borderWidth: 0,
        }],
    }
})

const statusChartData = computed(() => {
    const pending = filteredReimbursements.value.filter(r => r.status === 'PENDING').length
    const approved = filteredReimbursements.value.filter(r => r.status === 'APPROVED').length
    const declined = filteredReimbursements.value.filter(r => r.status === 'DECLINED').length
    return {
        labels: ['Pending', 'Approved', 'Declined'],
        datasets: [{
            data: [pending, approved, declined],
            backgroundColor: chartColors.status,
            borderWidth: 0,
        }],
    }
})

const timelineChartData = computed(() => {
    const monthMap = new Map<string, Map<string, number>>()
    const catSet = new Set<string>()

    filteredReimbursements.value.forEach(r => {
        const d = new Date(r.dateOfExpense)
        const key = `${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`
        const cat = r.category || 'Others'
        catSet.add(cat)
        if (!monthMap.has(key)) monthMap.set(key, new Map())
        const m = monthMap.get(key)!
        m.set(cat, (m.get(cat) ?? 0) + parseAmount(r.amount))
    })

    const labels = [...monthMap.keys()].sort((a, b) => new Date('1 ' + a).getTime() - new Date('1 ' + b).getTime())
    const categories = [...catSet]
    const datasets = categories.map((cat, i) => ({
        label: cat,
        data: labels.map(l => monthMap.get(l)?.get(cat) ?? 0),
        backgroundColor: chartColors.category[i % chartColors.category.length],
        borderRadius: 2,
        stack: 'expenses',
    }))

    return { labels, datasets }
})

const timelineOptions = computed(() => ({
    ...chartBase,
    plugins: {
        ...chartBase.plugins,
        legend: { ...chartBase.plugins.legend },
    },
    scales: {
        x: {
            stacked: true,
            grid: { display: false },
            ticks: { color: '#9ca3af', font: { family: 'Inter', size: 11 } },
        },
        y: {
            stacked: true,
            border: { color: 'rgba(156,163,175,0.1)' },
            grid: { color: 'rgba(156,163,175,0.1)' },
            ticks: {
                color: '#9ca3af',
                font: { family: 'Inter', size: 11 },
                callback: (v: number | string) => `₱${Number(v).toLocaleString()}`,
            },
        },
    },
}))
</script>

<template>
    <div ref="container" class="flex-1 overflow-y-auto scrollbar">
        <div ref="header">
            <div class="flex items-center gap-4 p-4">
                <UPageCard title="Reimbursements" description="Submit and track expense reimbursements"
                    variant="naked" :ui="{
                    title: 'text-2xl font-bold'
                }">
                </UPageCard>
                <div class="flex items-center justify-end gap-2 flex-1">
                    <UTooltip :text="viewStats ? 'Hide Stats' : 'View Stats'">
                        <UButton
                            :icon="viewStats ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                            color="neutral"
                            variant="ghost"
                            @click="viewStats = !viewStats"
                        />
                    </UTooltip>
                    <UTooltip text="View Analytics">
                        <UButton icon="i-lucide-chart-pie" variant="outline" color="neutral" square @click="isAnalyticsOpen = true" />
                    </UTooltip>
                    <UFieldGroup>
                        <UButton icon="i-lucide-list" color="neutral" :variant="viewMode === 'table' ? 'subtle' : 'outline'" @click="viewMode = 'table'" />
                        <UButton icon="i-lucide-layout-grid" color="neutral" :variant="viewMode === 'grid' ? 'subtle' : 'outline'" @click="viewMode = 'grid'" />
                    </UFieldGroup>
                    <UButton @click="isModalOpen = true">
                        <UIcon name="i-lucide-plus" class="size-4" />
                        Request Reimbursement
                    </UButton>
                </div>
            </div>

            <!-- Search & filter -->
            <div class="flex items-center gap-3 px-4 pb-4">
                <UInput
                    v-model="search"
                    placeholder="Search by category, merchant, or status..."
                    icon="i-lucide-search"
                    class="flex-1"
                />
                <USelect
                    v-model="selectedType"
                    :items="requestTypes"
                    class="w-56"
                />

                <USelect v-model="status" :items="['All Status', 'Pending', 'Approved', 'Declined']" class="w-32" />
                <USelect v-model="period" :items="['Monthly', 'Quarterly', 'Yearly']" class="w-32" />
                <USelect v-if="period === 'Monthly'" v-model="month" :items="months" class="w-24" />
                <USelect v-if="period === 'Quarterly'" v-model="quarter" :items="quarters" class="w-24" />
                <USelect v-model="year" :items="years" class="w-24" />
            </div>

            <!-- Stats -->
            <div v-if="viewStats" class="flex gap-3 px-4 pb-4">
                <UCard v-for="(kpi, index) in kpis" :key="index" class="shadow-sm flex-1" :ui="{ body: 'sm:p-4' }">
                    <div class="flex items-center gap-3">
                        <div class="rounded-lg p-2 shrink-0 flex" :class="kpi.bg">
                            <UIcon :name="kpi.icon" class="size-5" :class="kpi.color" />
                        </div>
                        <div class="min-w-0">
                            <div class="text-xs text-dimmed truncate">{{ kpi.label }}</div>
                            <div class="flex items-baseline gap-1.5">
                                <span class="text-xl font-bold leading-tight">{{ kpi.value }}</span>
                                <div class="text-[10px] font-semibold text-dimmed/70 uppercase tracking-wider">{{ kpi.sublabel }}</div>
                            </div>
                        </div>
                    </div>
                </UCard>
            </div>

            <USeparator />
        </div>

        <!-- Grid / Card view -->
        <div v-if="viewMode === 'grid'" class="flex-1 flex flex-col p-4">
            <div v-if="reimbursementData.length === 0" class="flex-1 flex items-center justify-center">
                <UEmpty
                    icon="i-lucide-receipt-text"
                    title="No reimbursements"
                    description="No reimbursement requests found for the selected period."
                    variant="naked"
                />
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                <UCard v-for="item in filteredReimbursements" :key="item.id" class="flex flex-col shadow-sm cursor-pointer group hover:ring-1 hover:ring-primary/40 transition-all" :ui="{ body: 'flex flex-col h-full gap-4 sm:p-4 group-hover:bg-linear-to-tl group-hover:from-primary/10 group-hover:from-5% group-hover:to-default transition-all duration-300 ease-out' }" @click="openDetails(item)">
                    <div class="flex items-start justify-between gap-2">
                        <div class="space-y-0.5 min-w-0">
                            <div class="font-semibold text-highlighted truncate group-hover:text-primary transition-colors">{{ item.merchant }}</div>
                            <div class="text-xs text-dimmed">{{ item.category }}</div>
                        </div>
                        <StatusBadge :status="item.status" />
                    </div>

                    <div class="grid grid-cols-2 gap-2 text-sm bg-muted dark:bg-muted/30 p-3 rounded-md">
                        <div class="col-span-2">
                            <div class="text-xs text-dimmed mb-0.5">Date of Expense</div>
                            <div class="font-medium">{{ item.dateOfExpense }}</div>
                        </div>
                        <USeparator class="col-span-2" />
                        <div class="col-span-2">
                            <div class="text-xs text-dimmed mb-0.5">Amount</div>
                            <div class="font-semibold text-primary tabular-nums">{{ item.amount }}</div>
                        </div>
                    </div>

                    <!-- Animated bottom row -->
                    <div class="relative mt-auto">
                        <div class="flex items-center justify-between transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-1">
                            <span class="text-xs text-dimmed">Date Applied</span>
                            <span class="text-xs font-medium">{{ item.dateApplied }}</span>
                        </div>
                        <!-- Hover: View Details button -->
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 gap-2">
                            <UButton block label="View Details" variant="soft" color="primary" @click.stop="openDetails(item)" />
                        </div>
                    </div>
                </UCard>
            </div>
        </div>

        <!-- Table view -->
        <UTable
            v-else
            :data="filteredReimbursements"
            :columns="columns"
            sticky
            class="flex-1 min-h-0"
            :virtualize="{ scrollMargin: headerHeight, getScrollElement }"
        >
            <template #amount-cell="{ row }">
                <span class="font-medium tabular-nums">{{ row.original.amount }}</span>
            </template>
            <template #status-cell="{ row }">
                <StatusBadge :status="row.original.status" />
            </template>
            <template #empty>
                <UEmpty
                    icon="i-lucide-receipt-text"
                    title="No reimbursements"
                    description="No reimbursement requests found for the selected period."
                    variant="naked"
                />
            </template>
        </UTable>
    </div>
    <ApplyReimbursementModal v-model:open="isModalOpen" />
    <ReimbursementDetailDrawer v-model:open="isDrawerOpen" :request="selectedRequest" />

    <!-- Analytics Drawer -->
    <UDrawer
        v-model:open="isAnalyticsOpen"
        inset
        direction="bottom"
        :handle="true"
        :close="{ icon: 'i-lucide-x', size: 'sm', color: 'neutral', variant: 'ghost' }"
        :ui="{ container: 'p-0 gap-6', content: 'max-h-[85vh]', header: 'pt-4 px-4', body: 'overflow-y-auto p-0 sm:p-0 scrollbar' }"
    >
        <template #header>
            <div class="flex items-center gap-4">
                <div class="p-2 rounded-lg bg-indigo-500/10">
                    <UIcon name="i-lucide-chart-pie" class="size-6 text-indigo-500 flex" />
                </div>
                <div>
                    <div class="text-highlighted font-semibold">Expense Analytics</div>
                    <div class="text-muted text-sm">Breakdown for selected period</div>
                </div>
            </div>
        </template>

        <template #body>
            <div class="space-y-6 px-4 pb-4 pt-[1px]">
                <!-- Row 1: Doughnut charts -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- By Category -->
                    <UCard :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
                        <template #header>
                            <div>
                                <div class="font-semibold text-sm">By Category</div>
                                <div class="text-xs text-dimmed">Total amount per expense category</div>
                            </div>
                        </template>
                        <div class="relative h-[220px] flex items-center justify-center">
                            <Doughnut
                                v-if="filteredReimbursements.length > 0"
                                :data="categoryChartData"
                                :options="doughnutOptions"
                            />
                            <UEmpty
                                v-else
                                icon="i-lucide-chart-pie"
                                title="No data"
                                description="No expenses for the selected period."
                                variant="naked"
                            />
                        </div>
                    </UCard>

                    <!-- By Status -->
                    <UCard :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
                        <template #header>
                            <div>
                                <div class="font-semibold text-sm">By Status</div>
                                <div class="text-xs text-dimmed">Number of requests per status</div>
                            </div>
                        </template>
                        <div class="relative h-[220px] flex items-center justify-center">
                            <Doughnut
                                v-if="filteredReimbursements.length > 0"
                                :data="statusChartData"
                                :options="doughnutOptions"
                            />
                            <UEmpty
                                v-else
                                icon="i-lucide-pie-chart"
                                title="No data"
                                description="No expenses for the selected period."
                                variant="naked"
                            />
                        </div>
                    </UCard>
                </div>

                <!-- Row 2: Expenses Over Time -->
                <UCard :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
                    <template #header>
                        <div>
                            <div class="font-semibold text-sm">Expenses Over Time</div>
                            <div class="text-xs text-dimmed">Stacked expense amount by category per month</div>
                        </div>
                    </template>
                    <div class="relative h-[240px]">
                        <Bar
                            v-if="filteredReimbursements.length > 0"
                            :data="timelineChartData"
                            :options="timelineOptions"
                        />
                        <div v-else class="h-full flex items-center justify-center">
                            <UEmpty icon="i-lucide-bar-chart-2" title="No data" description="No expenses for the selected period." variant="naked" />
                        </div>
                    </div>
                </UCard>
            </div>
        </template>
    </UDrawer>
</template>