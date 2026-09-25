<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { Reimbursement } from '~~/app/types'

definePageMeta({
    isTable: true
})

const UButton = resolveComponent('UButton')

// ─── Table columns ────────────────────────────────────────────────────────────
const columns = [
    {
        accessorKey: 'employeeName',
        header: 'Employee',
    },
    { accessorKey: 'dateApplied', header: 'Date Applied' },
    { accessorKey: 'dateOfExpense', header: 'Date of Expense' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'merchant', header: 'Merchant' },
    { accessorKey: 'amount', header: 'Amount' },
    { accessorKey: 'status', header: 'Status' },
    {
        id: 'actions',
        header: '',
        meta: { class: { th: 'w-32', td: 'text-right' } },
        cell: ({ row }: any) => {
            const buttons = [
                h(UButton as any, {
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
            ]
            
            if (row.original.status === 'PENDING') {
                buttons.push(
                    h(UButton as any, {
                        icon: 'i-lucide-check',
                        color: 'success',
                        variant: 'ghost',
                        size: 'sm',
                        'aria-label': 'Approve',
                        onClick: (e: Event) => {
                            e.stopPropagation()
                            // handle approve
                        }
                    }),
                    h(UButton as any, {
                        icon: 'i-lucide-x',
                        color: 'error',
                        variant: 'ghost',
                        size: 'sm',
                        'aria-label': 'Deny',
                        onClick: (e: Event) => {
                            e.stopPropagation()
                            // handle deny
                        }
                    })
                )
            }
            return h('div', { class: 'flex items-center justify-end gap-1' }, buttons)
        }
    }
]

// ─── Data ─────────────────────────────────────────────────────────────────────
const { data } = useLazyFetch('/api/hr/expenses')
const reimbursementData = computed(() => data.value ?? [])

// ─── State ────────────────────────────────────────────────────────────────────
const container = useTemplateRef('container')
const header = useTemplateRef('header')
const getScrollElement = () => container.value

const { height: headerHeight } = useElementSize(header, undefined, { box: 'border-box' })

const viewMode = ref<'grid' | 'table'>('table')
const isModalOpen = ref(false)
const isDrawerOpen = ref(false)
const selectedRequest = ref<Reimbursement | null>(null)

const openDetails = (request: Reimbursement) => {
    selectedRequest.value = request
    isDrawerOpen.value = true
}

const { register } = useOverlayVisibility()
register(isModalOpen)
register(isDrawerOpen)

const status = ref('All')
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
const selectedEmployee = ref('All employees')

// ─── Filters & Computeds ──────────────────────────────────────────────────────
const employees = computed(() => [
    'All employees',
    ...new Set(reimbursementData.value.map(s => s.employeeName).filter(Boolean))
] as string[])

const filteredReimbursements = computed(() => {
    return reimbursementData.value.filter(s => {
        // Search
        const searchLower = search.value.toLowerCase()
        const matchesSearch = !search.value || 
            s.category.toLowerCase().includes(searchLower) || 
            s.merchant.toLowerCase().includes(searchLower) ||
            s.status.toLowerCase().includes(searchLower)

        // Employee
        const matchesEmployee = selectedEmployee.value === 'All employees' || s.employeeName === selectedEmployee.value
        
        // Status
        const matchesStatus = status.value === 'All' || s.status.toUpperCase() === status.value.toUpperCase()
        
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
        
        return matchesSearch && matchesEmployee && matchesStatus && matchesPeriod
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
</script>

<template>
    <div ref="container" class="flex-1 overflow-y-auto scrollbar">
        <div ref="header">
            <div class="flex items-center gap-4 p-4">
                <UPageCard title="Expenses" description="Manage and track employee expenses"
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
                    <UFieldGroup>
                        <UButton icon="i-lucide-list" color="neutral" :variant="viewMode === 'table' ? 'subtle' : 'outline'" @click="viewMode = 'table'" />
                        <UButton icon="i-lucide-layout-grid" color="neutral" :variant="viewMode === 'grid' ? 'subtle' : 'outline'" @click="viewMode = 'grid'" />
                    </UFieldGroup>
                    <UButton label="Download" icon="i-lucide-download" color="neutral" variant="outline" />
                    <UButton label="Create Expense" icon="i-lucide-plus" @click="isModalOpen = true" />
                </div>
            </div>

            <!-- Search & filter -->
            <div class="flex items-center justify-between gap-3 px-4 pb-4">
                <UInput
                    v-model="search"
                    placeholder="Search by category, merchant, or status..."
                    icon="i-lucide-search"
                    class="flex-1"
                />
                <USelect
                    v-model="selectedEmployee"
                    :items="employees"
                    class="w-48"
                />
                <USelect v-model="status" :items="['All', 'Pending', 'Approved', 'Declined']" class="w-32" />
                <USelect v-model="period" :items="['Monthly', 'Quarterly', 'Yearly']" class="w-32" />
                <USelect v-if="period === 'Monthly'" v-model="month" :items="months" class="w-32" />
                <USelect v-if="period === 'Quarterly'" v-model="quarter" :items="quarters" class="w-32" />
                <USelect v-model="year" :items="years" class="w-32" />
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
                    title="No expenses"
                    description="No expense requests found for the selected period."
                    variant="naked"
                />
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                <UCard v-for="item in filteredReimbursements" :key="item.id" class="flex flex-col shadow-sm cursor-pointer group hover:ring-1 hover:ring-primary/40 transition-all" :ui="{ body: 'flex flex-col h-full gap-4 sm:p-4 group-hover:bg-linear-to-tl group-hover:from-primary/10 group-hover:from-5% group-hover:to-default transition-all duration-300 ease-out' }" @click="openDetails(item)">
                    <div class="flex items-start justify-between gap-2">
                        <div class="flex items-center gap-2 min-w-0">
                            <UAvatar :src="item.employeeAvatar" :alt="item.employeeName" size="sm" />
                            <div class="space-y-0.5 min-w-0">
                                <div class="font-semibold text-highlighted truncate group-hover:text-primary transition-colors">{{ item.employeeName }}</div>
                                <div class="text-xs text-dimmed truncate">{{ item.merchant }} &middot; {{ item.category }}</div>
                            </div>
                        </div>
                        <StatusBadge :status="item.status" />
                    </div>

                    <div class="grid grid-cols-2 gap-2 text-sm bg-muted dark:bg-muted/30 p-3 rounded-md mt-auto">
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
                        <!-- Hover: Actions -->
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 gap-2">
                            <UTooltip text="View Details"><UButton icon="i-lucide-eye" variant="soft" @click.stop="openDetails(item)" /></UTooltip>
                            <UTooltip text="Approve" v-if="item.status === 'PENDING'"><UButton icon="i-lucide-check" variant="soft" color="success" @click.stop="" /></UTooltip>
                            <UTooltip text="Deny" v-if="item.status === 'PENDING'"><UButton icon="i-lucide-x" variant="soft" color="error" @click.stop="" /></UTooltip>
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
            <template #employeeName-cell="{ row }">
                <div class="flex items-center gap-2">
                    <UAvatar :src="row.original.employeeAvatar" :alt="row.original.employeeName" size="xs" />
                    <span class="font-medium text-highlighted">{{ row.original.employeeName }}</span>
                </div>
            </template>
            <template #amount-cell="{ row }">
                <span class="font-medium tabular-nums">{{ row.original.amount }}</span>
            </template>
            <template #status-cell="{ row }">
                <StatusBadge :status="row.original.status" />
            </template>
            <template #empty>
                <UEmpty
                    icon="i-lucide-receipt-text"
                    title="No expenses"
                    description="No expense requests found for the selected period."
                    variant="naked"
                />
            </template>
        </UTable>
    </div>
    <HRExpenseModal v-model:open="isModalOpen" />
    <ReimbursementDetailDrawer v-model:open="isDrawerOpen" :request="selectedRequest" is-admin />
</template>