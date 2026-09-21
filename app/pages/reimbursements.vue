<script setup lang="ts">
definePageMeta({
    isTable: true
})

// ─── Table columns ────────────────────────────────────────────────────────────
const columns = [
    { accessorKey: 'dateApplied', header: 'Date Applied' },
    { accessorKey: 'dateOfExpense', header: 'Date of Expense' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'merchant', header: 'Merchant' },
    { accessorKey: 'amount', header: 'Amount' },
    { accessorKey: 'status', header: 'Status' },
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

const { register } = useOverlayVisibility()
register(isModalOpen)

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
            <div class="flex gap-3 px-4 pb-4">
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
                <UCard v-for="item in filteredReimbursements" :key="item.id" class="flex flex-col shadow-sm" :ui="{ body: 'flex flex-col h-full gap-4 sm:p-4' }">
                    <div class="flex items-start justify-between gap-2">
                        <div class="space-y-0.5 min-w-0">
                            <div class="font-semibold text-highlighted truncate">{{ item.merchant }}</div>
                            <div class="text-xs text-dimmed">{{ item.dateApplied }}</div>
                        </div>
                        <StatusBadge :status="item.status" />
                    </div>

                    <div class="grid grid-cols-2 gap-2 text-sm bg-muted dark:bg-muted/30 p-3 rounded-md mt-auto">
                        <div class="col-span-2">
                            <div class="text-xs text-dimmed mb-0.5">Date of Expense</div>
                            <div class="font-medium">{{ item.dateOfExpense }}</div>
                        </div>
                        <USeparator class="col-span-2" />
                        <div>
                            <div class="text-xs text-dimmed mb-0.5">Category</div>
                            <div class="font-medium">{{ item.category }}</div>
                        </div>
                        <div>
                            <div class="text-xs text-dimmed mb-0.5">Amount</div>
                            <div class="font-semibold tabular-nums">{{ item.amount }}</div>
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
</template>