<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

definePageMeta({
    isTable: true,
})

const UButton = resolveComponent('UButton')
const StatusBadge = resolveComponent('StatusBadge')

type ServiceRequest = {
    id: number
    dateApplied: string
    requestType: string
    remarks: string
    status: string
    lastUpdatedBy: string
    lastUpdate: string
}

const serviceData = ref<ServiceRequest[]>([
    {
        id: 1,
        dateApplied: 'September 5, 2026 at 09:00 AM',
        requestType: 'IT Support',
        remarks: 'Cannot access the HR portal since this morning.',
        status: 'PENDING',
        lastUpdatedBy: '—',
        lastUpdate: 'September 5, 2026 at 09:00 AM',
    },
    {
        id: 2,
        dateApplied: 'August 20, 2026 at 02:30 PM',
        requestType: 'Document Request',
        remarks: 'Requesting Certificate of Employment for visa application.',
        status: 'APPROVED',
        lastUpdatedBy: 'HR Admin',
        lastUpdate: 'August 21, 2026 at 10:15 AM',
    },
    {
        id: 3,
        dateApplied: 'August 10, 2026 at 08:45 AM',
        requestType: 'Payroll Inquiry',
        remarks: 'Discrepancy on my August 1–15 payslip.',
        status: 'APPROVED',
        lastUpdatedBy: 'Payroll Team',
        lastUpdate: 'August 12, 2026 at 03:00 PM',
    },
    {
        id: 4,
        dateApplied: 'July 28, 2026 at 11:00 AM',
        requestType: 'Facilities & Maintenance',
        remarks: 'Air conditioner in Room 204 is not working.',
        status: 'REJECTED',
        lastUpdatedBy: 'Facilities',
        lastUpdate: 'July 29, 2026 at 09:00 AM',
    },
    {
        id: 5,
        dateApplied: 'July 15, 2026 at 03:15 PM',
        requestType: 'Administrative Request',
        remarks: 'Request for a new parking slot assignment.',
        status: 'APPROVED',
        lastUpdatedBy: 'Admin Officer',
        lastUpdate: 'July 16, 2026 at 02:00 PM',
    },
    {
        id: 6,
        dateApplied: 'June 30, 2026 at 09:30 AM',
        requestType: 'HR Concern',
        remarks: 'Clarification on the updated leave policy.',
        status: 'APPROVED',
        lastUpdatedBy: 'HR Admin',
        lastUpdate: 'July 01, 2026 at 11:00 AM',
    },
    {
        id: 7,
        dateApplied: 'June 18, 2026 at 01:00 PM',
        requestType: 'IT Support',
        remarks: 'Requesting a replacement for my broken keyboard.',
        status: 'APPROVED',
        lastUpdatedBy: 'IT Team',
        lastUpdate: 'June 19, 2026 at 04:30 PM',
    },
    {
        id: 8,
        dateApplied: 'June 02, 2026 at 10:00 AM',
        requestType: 'Other',
        remarks: 'Request for company ID replacement.',
        status: 'PENDING',
        lastUpdatedBy: '—',
        lastUpdate: 'June 02, 2026 at 10:00 AM',
    },
])

const container = useTemplateRef('container')
const header = useTemplateRef('header')
const getScrollElement = () => container.value

const { height: headerHeight } = useElementSize(header, undefined, { box: 'border-box' })

const viewMode = ref<'grid' | 'table'>('grid')
const isRequestModalOpen = ref(false)
const isDetailModalOpen = ref(false)
const selectedRequest = ref<ServiceRequest | null>(null)

const search = ref('')
const selectedType = ref('All')

const requestTypes = computed(() => [
    'All',
    ...new Set(serviceData.value.map(s => s.requestType))
])

const filteredRequests = computed(() => {
    return serviceData.value.filter(s => {
        const matchesSearch =
            s.requestType.toLowerCase().includes(search.value.toLowerCase()) ||
            s.remarks.toLowerCase().includes(search.value.toLowerCase()) ||
            s.status.toLowerCase().includes(search.value.toLowerCase())
            
        const matchesType = selectedType.value === 'All' || s.requestType === selectedType.value
        return matchesSearch && matchesType
    })
})

// KPIs
const totalItems = computed(() => serviceData.value.length)
const approvedItems = computed(() => serviceData.value.filter(i => i.status === 'APPROVED').length)
const pendingItems = computed(() => serviceData.value.filter(i => i.status === 'PENDING').length)
const rejectedItems = computed(() => serviceData.value.filter(i => i.status === 'REJECTED').length)

const kpis = computed(() => [
    { label: 'Total Requests', icon: 'i-lucide-headset', color: 'text-indigo-500', bg: 'bg-indigo-500/10', value: totalItems.value.toString(), sublabel: 'ALL TIME' },
    { label: 'Approved', icon: 'i-lucide-check-circle-2', color: 'text-emerald-500', bg: 'bg-emerald-500/10', value: approvedItems.value.toString(), sublabel: 'REQUESTS' },
    { label: 'Pending', icon: 'i-lucide-hourglass', color: 'text-amber-500', bg: 'bg-amber-500/10', value: pendingItems.value.toString(), sublabel: 'AWAITING' },
    { label: 'Rejected', icon: 'i-lucide-x-circle', color: 'text-rose-500', bg: 'bg-rose-500/10', value: rejectedItems.value.toString(), sublabel: 'REQUESTS' },
])

// Table columns
const columns: TableColumn<ServiceRequest>[] = [
    { accessorKey: 'dateApplied', header: 'Date Applied' },
    { accessorKey: 'requestType', header: 'Request Type' },
    { accessorKey: 'remarks', header: 'Remarks', cell: ({ row }) => h('span', { class: 'text-dimmed truncate max-w-[200px] block' }, row.getValue('remarks') as string || '—') },
    { accessorKey: 'status', header: 'Status', cell: ({ row }) => h(StatusBadge, { status: row.getValue('status') as string }) },
    { accessorKey: 'lastUpdatedBy', header: 'Last Updated By' },
    { accessorKey: 'lastUpdate', header: 'Last Update' },
    {
        id: 'actions',
        header: '',
        meta: { class: { th: 'w-32', td: 'text-right' } },
        cell: ({ row }) => h(UButton, {
            icon: 'i-lucide-eye',
            color: 'neutral',
            variant: 'ghost',
            size: 'sm',
            'aria-label': 'View details',
            onClick: (e: Event) => {
                e.stopPropagation()
                selectedRequest.value = row.original
                isDetailModalOpen.value = true
            }
        })
    },
]

const openDetails = (request: ServiceRequest) => {
    selectedRequest.value = request
    isDetailModalOpen.value = true
}
</script>

<template>
    <div ref="container" class="flex-1 overflow-y-auto scrollbar">
        <div ref="header">
            <!-- Page header -->
            <div class="flex items-center gap-4 p-4">
                <UPageCard
                    title="Service Requests"
                    description="Submit and track IT, HR, or administrative concerns"
                    variant="naked"
                    class="flex-1"
                    :ui="{
                        title: 'text-2xl font-bold'
                    }"
                />
                <div class="flex items-center gap-2">
                    <UFieldGroup>
                        <UButton icon="i-lucide-layout-grid" color="neutral" :variant="viewMode === 'grid' ? 'subtle' : 'outline'" @click="viewMode = 'grid'" />
                        <UButton icon="i-lucide-list" color="neutral" :variant="viewMode === 'table' ? 'subtle' : 'outline'" @click="viewMode = 'table'" />
                    </UFieldGroup>
                    <UButton icon="i-lucide-plus" @click="isRequestModalOpen = true">
                        New Request
                    </UButton>
                </div>
            </div>

            <!-- Search & filter -->
            <div class="flex items-center gap-3 px-4 pb-4">
                <UInput
                    v-model="search"
                    placeholder="Search by request type, remarks, or status..."
                    icon="i-lucide-search"
                    class="flex-1"
                />
                <USelect
                    v-model="selectedType"
                    :items="requestTypes"
                    class="w-56"
                />
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
                                <span class="text-xl font-bold leading-tight">{{ kpi.value }}</span>
                                <span class="text-[10px] font-semibold text-dimmed/70 uppercase tracking-wider">{{ kpi.sublabel }}</span>
                            </div>
                        </div>
                    </div>
                </UCard>
            </div>

            <USeparator />
        </div>

        <!-- Grid / Card view -->
        <div v-if="viewMode === 'grid'" class="flex-1 flex flex-col p-4">
            <div v-if="serviceData.length === 0" class="flex-1 flex items-center justify-center py-16">
                <UEmpty
                    icon="i-lucide-headset"
                    title="No service requests"
                    description="You haven't submitted any service requests yet."
                    variant="naked"
                />
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                <UCard
                    v-for="item in filteredRequests"
                    :key="item.id"
                    class="flex flex-col shadow-sm cursor-pointer group hover:ring-1 hover:ring-primary/40 transition-all"
                    :ui="{ body: 'flex flex-col h-full gap-4 sm:p-4 group-hover:bg-linear-to-tl group-hover:from-primary/10 group-hover:from-5% group-hover:to-default transition-all duration-300 ease-out' }"
                    @click="openDetails(item)"
                >
                    <div class="flex items-start justify-between gap-2">
                        <div class="font-semibold text-highlighted group-hover:text-primary transition-colors truncate">{{ item.requestType }}</div>
                        <StatusBadge :status="item.status" />
                    </div>

                    <div class="text-sm bg-muted dark:bg-muted/30 p-3 rounded-md">
                        <div class="text-xs text-dimmed mb-0.5">Remarks</div>
                        <div class="font-medium truncate">{{ item.remarks || '—' }}</div>
                    </div>

                    <!-- Animated bottom row -->
                    <div class="relative mt-auto">
                        <!-- Default: date applied -->
                        <div class="flex items-center justify-between transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-1">
                            <span class="text-xs text-dimmed">Date Applied</span>
                            <span class="text-xs font-medium tabular-nums">{{ item.dateApplied }}</span>
                        </div>
                        <!-- Hover: View Details button -->
                        <div class="absolute inset-0 flex items-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                            <UButton block label="View Details" variant="soft" color="primary" @click.stop="openDetails(item)" />
                        </div>
                    </div>
                </UCard>
            </div>
        </div>

        <!-- Table view -->
        <UTable
            v-else
            :data="filteredRequests"
            :columns="columns"
            sticky
            class="flex-1 min-h-0"
            :virtualize="{ scrollMargin: headerHeight, getScrollElement }"
        >
            <template #empty>
                <UEmpty
                    icon="i-lucide-headset"
                    title="No service requests"
                    description="You haven't submitted any service requests yet."
                    variant="naked"
                />
            </template>
        </UTable>
    </div>

    <!-- New Request Modal -->
    <ServiceRequestModal v-model:open="isRequestModalOpen" />

    <!-- View Details Drawer -->
    <ServiceRequestDetailDrawer v-model:open="isDetailModalOpen" :request="selectedRequest" />
</template>