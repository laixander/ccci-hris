<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { AssetAssignment } from '~/types'

definePageMeta({
    isTable: true
})

const UButton = resolveComponent('UButton')
const StatusBadge = resolveComponent('StatusBadge')

const { data } = useLazyFetch('/api/asset-assignments')
const { data: employeesData } = useLazyFetch('/api/employees')

const assignments = computed<AssetAssignment[]>(() => data.value?.assignments || [])

const viewMode = ref<'grid' | 'table'>('table')

const search = ref('')
const selectedCategory = ref('All Categories')
const selectedEmployee = ref('All Employees')
const selectedStatus = ref('All Statuses')

const categories = computed(() => [
    'All Categories',
    ...new Set(assignments.value.map(a => a.category))
])

const employeesList = computed(() => {
    const list = employeesData.value?.employees.map((e: any) => e.name) || []
    return ['All Employees', ...list]
})

const statuses = computed(() => [
    { label: 'All Statuses', value: 'All Statuses' },
    ...Array.from(new Set(assignments.value.map(a => a.status))).map(status => ({
        label: status,
        value: status
    }))
])

const filteredAssignments = computed(() => {
    return assignments.value.filter(a => {
        const matchesSearch =
            a.name.toLowerCase().includes(search.value.toLowerCase()) ||
            a.assetTag.toLowerCase().includes(search.value.toLowerCase()) ||
            a.employee.toLowerCase().includes(search.value.toLowerCase())
        const matchesCat = selectedCategory.value === 'All Categories' || a.category === selectedCategory.value
        const matchesEmployee = selectedEmployee.value === 'All Employees' || a.employee === selectedEmployee.value
        const matchesStatus = selectedStatus.value === 'All Statuses' || a.status === selectedStatus.value
        return matchesSearch && matchesCat && matchesEmployee && matchesStatus
    })
})

const columns: TableColumn<AssetAssignment>[] = [
    {
        accessorKey: 'asset',
        header: 'Asset',
        cell: ({ row }) => {
            return h('div', { class: 'flex flex-col' }, [
                h('span', { class: 'font-semibold text-gray-900 dark:text-white' }, row.original.assetTag),
                h('span', { class: 'text-xs text-gray-500 dark:text-gray-400' }, row.original.name)
            ])
        }
    },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'employee', header: 'Employee' },
    { accessorKey: 'assignedDate', header: 'Assigned Date' },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => h(StatusBadge, { status: row.original.status.toUpperCase() })
    },
    { accessorKey: 'returnDate', header: 'Return Date' },
    {
        accessorKey: 'actions',
        header: '',
        meta: { class: { th: 'w-24', td: 'text-right' } },
        cell: ({ row }) => {
            if (row.original.status.toLowerCase() === 'returned') return null
            return h(UButton, {
                icon: 'i-lucide-corner-up-left',
                label: 'Return',
                variant: 'soft',
                size: 'sm',
                onClick: () => openReturnModal(row.original)
            })
        }
    }
]

const container = useTemplateRef('container')
const header = useTemplateRef('header')
const getScrollElement = () => container.value
const { height: headerHeight } = useElementSize(header, undefined, { box: 'border-box' })

const isAssignModalOpen = ref(false)
const isReturnModalOpen = ref(false)
const assignmentToReturn = ref<AssetAssignment | undefined>()

const openAssignModal = () => {
    isAssignModalOpen.value = true
}

const openReturnModal = (assignment: AssetAssignment) => {
    assignmentToReturn.value = assignment
    isReturnModalOpen.value = true
}
</script>

<template>
    <div ref="container" class="flex-1 overflow-y-auto scrollbar flex flex-col">
        <div ref="header">
            <!-- Page header -->
            <div class="flex items-center justify-between p-4">
                <UPageCard 
                    title="Asset Assignments" 
                    description="Manage employee assets" 
                    variant="naked" 
                    class="flex-1"
                    :ui="{ title: 'text-2xl font-bold' }" 
                />
                <div class="flex items-center gap-2">
                    <UFieldGroup>
                        <UButton icon="i-lucide-list" color="neutral" :variant="viewMode === 'table' ? 'subtle' : 'outline'" @click="viewMode = 'table'" />
                        <UButton icon="i-lucide-layout-grid" color="neutral" :variant="viewMode === 'grid' ? 'subtle' : 'outline'" @click="viewMode = 'grid'" />
                    </UFieldGroup>
                    <UButton icon="i-lucide-plus" label="Assign Asset" color="primary" @click="openAssignModal" />
                </div>
            </div>

            <!-- Search & filter -->
            <div class="flex items-center gap-3 px-4 pb-4">
                <UInput
                    v-model="search"
                    placeholder="Search asset tag or name..."
                    icon="i-lucide-search"
                    class="flex-1"
                />
                <USelect
                    v-model="selectedCategory"
                    :items="categories"
                    class="w-48"
                />
                <USelectMenu
                    v-model="selectedEmployee"
                    placeholder="All Employees"
                    :items="employeesList"
                    :ui="{ viewport: 'scrollbar' }"
                    class="w-48"
                />
                <USelect
                    v-model="selectedStatus"
                    :items="statuses"
                    class="w-48"
                />
            </div>

            <USeparator />
        </div>

        <!-- Grid view -->
        <div v-if="viewMode === 'grid'" class="flex-1 flex flex-col p-4">
            <div v-if="filteredAssignments.length === 0" class="flex-1 flex items-center justify-center py-16">
                <UEmpty
                    icon="i-lucide-users"
                    title="No assignments found"
                    description="Try adjusting your search or filter."
                    variant="naked"
                />
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <UCard
                    v-for="assignment in filteredAssignments"
                    :key="assignment.id"
                    class="shadow-sm cursor-pointer group hover:ring-1 hover:ring-primary/40 transition-all"
                    :ui="{ body: 'flex flex-col gap-4 sm:p-4 group-hover:bg-linear-to-tl group-hover:from-primary/10 group-hover:from-5% group-hover:to-default transition-all duration-300 ease-out' }"
                >
                    <!-- Header -->
                    <div class="flex items-start justify-between gap-4">
                        <div class="min-w-0">
                            <div class="font-semibold text-highlighted group-hover:text-primary transition-colors truncate">{{ assignment.name }}</div>
                            <div class="text-xs text-dimmed truncate">{{ assignment.assetTag }}</div>
                        </div>
                        <StatusBadge :status="assignment.status" class="shrink-0" />
                    </div>

                    <!-- Details -->
                    <div class="grid grid-cols-1 gap-2 text-sm bg-muted dark:bg-muted/30 p-3 rounded-md">
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-dimmed">Assigned To</span>
                            <span class="text-xs font-medium truncate ml-2 text-right">{{ assignment.employee }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-dimmed">Category</span>
                            <span class="text-xs font-medium">{{ assignment.category }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-dimmed">Return Date</span>
                            <span class="text-xs font-medium truncate ml-2 text-right">{{ assignment.returnDate }}</span>
                        </div>
                    </div>

                    <!-- Animated bottom row -->
                    <div class="relative mt-auto">
                        <div class="flex items-center justify-between transition-all duration-200" :class="assignment.status.toLowerCase() !== 'returned' ? 'group-hover:opacity-0 group-hover:-translate-y-1' : ''">
                            <span class="text-xs text-dimmed">Assigned Date</span>
                            <span class="text-xs">{{ assignment.assignedDate }}</span>
                        </div>
                        <!-- Hover: View Details button -->
                        <div v-if="assignment.status.toLowerCase() !== 'returned'" class="absolute inset-0 flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 gap-2">
                            <UButton icon="i-lucide-corner-up-left" variant="soft" label="Return" block @click.stop="openReturnModal(assignment)" />
                        </div>
                    </div>
                </UCard>
            </div>
        </div>

        <UTable
            v-else
            :data="filteredAssignments"
            :columns="columns"
            sticky
            class="flex-1 min-h-0"
            :virtualize="{ scrollMargin: headerHeight, getScrollElement }"
        >
            <template #empty>
                <UEmpty
                    icon="i-lucide-users"
                    title="No assignments found"
                    description="Try adjusting your search or filter."
                    variant="naked"
                />
            </template>
        </UTable>
    </div>
    <AssignAssetModal v-model:open="isAssignModalOpen" />
    <ReturnAssetModal v-model:open="isReturnModalOpen" :assignment="assignmentToReturn" />
</template>