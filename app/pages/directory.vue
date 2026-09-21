<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { dicebearUrl, initials, avatarColor } from '~/utils'
import type { Employee, OrgNode, FloatingRole } from '~/types'

definePageMeta({
    isTable: true
})

const UButton = resolveComponent('UButton')
const StatusBadge = resolveComponent('StatusBadge')

// ─── Data ─────────────────────────────────────────────────────────────────────
const { data } = useLazyFetch('/api/employees')

const employees = computed<Employee[]>(() => data.value?.employees || [])
const orgData = computed<OrgNode[]>(() => data.value?.orgData || [])
const floatingRoles = computed<FloatingRole[]>(() => data.value?.floatingRoles || [])


const container = useTemplateRef('container')
const header = useTemplateRef('header')
const getScrollElement = () => container.value
const { height: headerHeight } = useElementSize(header, undefined, { box: 'border-box' })

// ─── State ────────────────────────────────────────────────────────────────────
const search = ref('')
const selectedDepartment = ref('All')
const viewMode = ref<'grid' | 'table'>('table')

const departments = computed(() => [
    'All',
    ...new Set(employees.value.map(e => e.department))
])

const filteredEmployees = computed(() => {
    return employees.value.filter(e => {
        const matchesSearch =
            e.name.toLowerCase().includes(search.value.toLowerCase()) ||
            e.designation.toLowerCase().includes(search.value.toLowerCase()) ||
            e.email.toLowerCase().includes(search.value.toLowerCase()) ||
            e.employeeNo.includes(search.value)
        const matchesDept = selectedDepartment.value === 'All' || e.department === selectedDepartment.value
        return matchesSearch && matchesDept
    })
})

// ─── Table columns ────────────────────────────────────────────────────────────
const columns: TableColumn<Employee>[] = [
    {
        id: 'employee',
        header: 'Employee',
        cell: ({ row }) => {
            const e = row.original
            const UAvatar = resolveComponent('UAvatar')
            return h('div', { class: 'flex items-center gap-3' }, [
                h(UAvatar, {
                    src: dicebearUrl(e.name.split(' ')[0] ?? e.name),
                    alt: e.name,
                    size: 'sm',
                    chip: { color: e.status === 'ACTIVE' ? 'success' : 'neutral', inset: true, position: 'bottom-right' }
                }),
                h('div', {}, [
                    h('div', { class: 'font-semibold text-sm' }, e.name),
                    h('div', { class: 'text-xs text-dimmed' }, e.email),
                ])
            ])
        }
    },
    { accessorKey: 'employeeNo', header: 'Employee No.' },
    { accessorKey: 'department', header: 'Department' },
    { accessorKey: 'designation', header: 'Designation' },
    { accessorKey: 'dateHired', header: 'Date Hired' },
    {
        accessorKey: 'employmentType',
        header: 'Employment Type',
        cell: ({ row }) => h('span', { class: 'text-xs font-semibold tracking-wider' }, row.getValue('employmentType') as string)
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => h(StatusBadge, { status: row.getValue('status') as string })
    },
    {
        accessorKey: 'actions',
        header: '',
        meta: { class: { th: 'w-32', td: 'text-right' } },
        cell: ({ row }) => h(resolveComponent('UButton'), {
            icon: 'i-lucide-eye',
            color: 'neutral',
            variant: 'ghost',
            size: 'sm',
            'aria-label': 'View details',
            onClick: () => openDetails(row.original)
        })
    }
]

const isDetailOpen = ref(false)
const selectedEmployee = ref<Employee | null>(null)

const openDetails = (employee: Employee) => {
    selectedEmployee.value = employee
    isDetailOpen.value = true
}

const isOrgChartOpen = ref(false)
</script>

<template>
    <div ref="container" class="flex-1 overflow-y-auto scrollbar">
        <div ref="header">
            <!-- Page header -->
            <div class="flex items-center gap-4 p-4">
                <UPageCard
                    title="Employee Directory"
                    description="Browse and search the company employee directory"
                    variant="naked"
                    class="flex-1"
                    :ui="{
                        title: 'text-2xl font-bold'
                    }"
                />
                <div class="flex items-center gap-2">
                    <UFieldGroup>
                        <UButton icon="i-lucide-list" color="neutral" :variant="viewMode === 'table' ? 'subtle' : 'outline'" @click="viewMode = 'table'" />
                        <UButton icon="i-lucide-layout-grid" color="neutral" :variant="viewMode === 'grid' ? 'subtle' : 'outline'" @click="viewMode = 'grid'" />
                    </UFieldGroup>

                    <UButton variant="soft" @click="isOrgChartOpen = true">
                        <UIcon name="i-lucide-building" class="size-5" /> Org Chart
                    </UButton>
                </div>
            </div>

            <!-- Search & filter -->
            <div class="flex items-center gap-3 px-4 pb-4">
                <UInput
                    v-model="search"
                    placeholder="Search by name, designation, email, or employee no..."
                    icon="i-lucide-search"
                    class="flex-1"
                />
                <USelect
                    v-model="selectedDepartment"
                    :items="departments"
                    class="w-56"
                />
            </div>

            <USeparator />
        </div>

        <!-- Grid view -->
        <div v-if="viewMode === 'grid'" class="flex-1 flex flex-col p-4">
            <div v-if="filteredEmployees.length === 0" class="flex-1 flex items-center justify-center py-16">
                <UEmpty
                    icon="i-lucide-users"
                    title="No employees found"
                    description="Try adjusting your search or filter."
                    variant="naked"
                />
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <UCard
                    v-for="emp in filteredEmployees"
                    :key="emp.id"
                    class="shadow-sm cursor-pointer group hover:ring-1 hover:ring-primary/40 transition-all"
                    :ui="{ body: 'flex flex-col gap-4 sm:p-4 group-hover:bg-linear-to-tl group-hover:from-primary/10 group-hover:from-5% group-hover:to-default transition-all duration-300 ease-out' }"
                    @click="openDetails(emp)"
                >
                    <!-- Avatar + name -->
                    <div class="flex items-center gap-3">
                        <!-- Avatar with status chip -->
                        <UAvatar
                            :src="dicebearUrl(emp.name.split(' ')[0] || emp.name)"
                            :alt="emp.name"
                            size="lg"
                            :chip="{ color: emp.status === 'ACTIVE' ? 'success' : 'neutral', inset: true, position: 'bottom-right' }"
                        />
                        <div class="min-w-0">
                            <div class="font-semibold text-highlighted group-hover:text-primary transition-colors truncate">{{ emp.name }}</div>
                            <div class="text-xs text-dimmed truncate">{{ emp.designation }}</div>
                        </div>
                    </div>

                    <!-- Details -->
                    <div class="grid grid-cols-1 gap-2 text-sm bg-muted dark:bg-muted/30 p-3 rounded-md">
                        <div class="flex items-center gap-1.5">
                            <UIcon name="i-lucide-building-2" class="size-3.5 text-dimmed shrink-0" />
                            <span class="text-xs text-dimmed truncate">{{ emp.department }}</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <UIcon name="i-lucide-mail" class="size-3.5 text-dimmed shrink-0" />
                            <span class="text-xs truncate">{{ emp.email }}</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <UIcon name="i-lucide-calendar" class="size-3.5 text-dimmed shrink-0" />
                            <span class="text-xs text-dimmed">{{ emp.dateHired }}</span>
                        </div>
                    </div>

                    <!-- Animated bottom row -->
                    <div class="relative mt-auto">
                        <!-- Default: status + employment type -->
                        <div class="flex items-center justify-between transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-1">
                            <StatusBadge :status="emp.status" />
                            <span class="text-[10px] font-semibold text-dimmed/70 uppercase tracking-wider">{{ emp.employmentType }}</span>
                        </div>
                        <!-- Hover: View Details button -->
                        <div class="absolute inset-0 flex items-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                            <UButton block label="View Details" variant="soft" color="primary" @click.stop="openDetails(emp)" />
                        </div>
                    </div>
                </UCard>
            </div>
        </div>

        <!-- Table view -->
        <UTable
            v-else
            :data="filteredEmployees"
            :columns="columns"
            sticky
            class="flex-1 min-h-0"
            :virtualize="{ scrollMargin: headerHeight, getScrollElement }"
        >
            <template #empty>
                <UEmpty
                    icon="i-lucide-users"
                    title="No employees found"
                    description="Try adjusting your search or filter."
                    variant="naked"
                />
            </template>
        </UTable>
    </div>

    <!-- Employee Detail Drawer -->
    <EmployeeDetailDrawer v-model:open="isDetailOpen" :employee="selectedEmployee" />

    <!-- Org Chart Modal -->
    <OrgChartModal v-model:open="isOrgChartOpen" :data="orgData" :floating-roles="floatingRoles" />
</template>