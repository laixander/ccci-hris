<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

definePageMeta({
    isTable: true
})

const UButton = resolveComponent('UButton')
const StatusBadge = resolveComponent('StatusBadge')

type Employee = {
    id: number
    name: string
    employeeNo: string
    department: string
    designation: string
    dateHired: string
    employmentType: string
    status: 'ACTIVE' | 'INACTIVE'
    email: string
}

// DiceBear avatar URL — matches project pattern (10.x/thumbs/svg)
const dicebearUrl = (seed: string) =>
    `https://api.dicebear.com/10.x/thumbs/svg?seed=${encodeURIComponent(seed)}`

const employees = ref<Employee[]>([
    {
        id: 1,
        name: 'Maria Almeron',
        employeeNo: '1700099724570',
        department: 'Development Department',
        designation: 'Quality Assurance Analyst',
        dateHired: 'November 16, 2023',
        employmentType: 'REGULAR',
        status: 'ACTIVE',
        email: 'malmeron@ccci-tech.com',
    },
    {
        id: 2,
        name: 'Jose Reyes',
        employeeNo: '1700099724571',
        department: 'Development Department',
        designation: 'Software Engineer',
        dateHired: 'March 5, 2022',
        employmentType: 'REGULAR',
        status: 'ACTIVE',
        email: 'jreyes@ccci-tech.com',
    },
    {
        id: 3,
        name: 'Anna Santos',
        employeeNo: '1700099724572',
        department: 'Human Resources',
        designation: 'HR Officer',
        dateHired: 'January 10, 2021',
        employmentType: 'REGULAR',
        status: 'ACTIVE',
        email: 'asantos@ccci-tech.com',
    },
    {
        id: 4,
        name: 'Mark Dela Cruz',
        employeeNo: '1700099724573',
        department: 'Finance',
        designation: 'Accounting Associate',
        dateHired: 'June 20, 2020',
        employmentType: 'REGULAR',
        status: 'INACTIVE',
        email: 'mdelacruz@ccci-tech.com',
    },
    {
        id: 5,
        name: 'Liza Torres',
        employeeNo: '1700099724574',
        department: 'Development Department',
        designation: 'UI/UX Designer',
        dateHired: 'August 1, 2023',
        employmentType: 'PROJECT-BASED',
        status: 'ACTIVE',
        email: 'ltorres@ccci-tech.com',
    },
    {
        id: 6,
        name: 'Carlos Mendoza',
        employeeNo: '1700099724575',
        department: 'Operations',
        designation: 'Operations Supervisor',
        dateHired: 'February 14, 2019',
        employmentType: 'REGULAR',
        status: 'ACTIVE',
        email: 'cmendoza@ccci-tech.com',
    },
    {
        id: 7,
        name: 'Patricia Lim',
        employeeNo: '1700099724576',
        department: 'Development Department',
        designation: 'Backend Developer',
        dateHired: 'September 9, 2022',
        employmentType: 'REGULAR',
        status: 'ACTIVE',
        email: 'plim@ccci-tech.com',
    },
    {
        id: 8,
        name: 'Ronald Garcia',
        employeeNo: '1700099724577',
        department: 'IT Infrastructure',
        designation: 'Systems Administrator',
        dateHired: 'May 3, 2020',
        employmentType: 'REGULAR',
        status: 'INACTIVE',
        email: 'rgarcia@ccci-tech.com',
    },
    {
        id: 9,
        name: 'Sheila Bautista',
        employeeNo: '1700099724578',
        department: 'Human Resources',
        designation: 'Recruitment Specialist',
        dateHired: 'October 22, 2021',
        employmentType: 'REGULAR',
        status: 'ACTIVE',
        email: 'sbautista@ccci-tech.com',
    },
    {
        id: 10,
        name: 'Felix Navarro',
        employeeNo: '1700099724579',
        department: 'Finance',
        designation: 'Payroll Specialist',
        dateHired: 'July 15, 2018',
        employmentType: 'REGULAR',
        status: 'ACTIVE',
        email: 'fnavarro@ccci-tech.com',
    },
    {
        id: 11,
        name: 'Grace Tan',
        employeeNo: '1700099724580',
        department: 'Development Department',
        designation: 'Mobile Developer',
        dateHired: 'April 4, 2024',
        employmentType: 'PROBATIONARY',
        status: 'ACTIVE',
        email: 'gtan@ccci-tech.com',
    },
    {
        id: 12,
        name: 'Dennis Cruz',
        employeeNo: '1700099724581',
        department: 'Operations',
        designation: 'Logistics Coordinator',
        dateHired: 'December 1, 2017',
        employmentType: 'REGULAR',
        status: 'ACTIVE',
        email: 'dcruz@ccci-tech.com',
    },
])

const container = useTemplateRef('container')
const header = useTemplateRef('header')
const getScrollElement = () => container.value
const { height: headerHeight } = useElementSize(header, undefined, { box: 'border-box' })

const search = ref('')
const selectedDepartment = ref('All')
const viewMode = ref<'grid' | 'table'>('grid')

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

// Avatar initials helper
const initials = (name: string) =>
    name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()

// Deterministic avatar color per employee
const avatarColors = ['bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-violet-500', 'bg-cyan-500', 'bg-pink-500', 'bg-teal-500']
const avatarColor = (id: number) => avatarColors[id % avatarColors.length]

// Table columns
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
]

const isDetailOpen = ref(false)
const selectedEmployee = ref<Employee | null>(null)

const openDetails = (employee: Employee) => {
    selectedEmployee.value = employee
    isDetailOpen.value = true
}

const isOrgChartOpen = ref(false)

const orgData = [
  {
    id: 'ceo',
    parentId: '',
    title: 'Chief Executive Officer',
    icon: 'i-lucide-lock',
    employees: 1,
    avatars: ['CEO']
  },
  {
    id: 'coo',
    parentId: 'ceo',
    title: 'Chief Operating Officer',
    icon: 'i-lucide-lock',
    employees: 1,
    avatars: ['COO']
  },
  {
    id: 'cto',
    parentId: 'coo',
    title: 'Chief Technology Officer',
    icon: 'i-lucide-briefcase',
    employees: 1,
    avatars: ['CTO']
  },
  {
    id: 'hr_admin',
    parentId: 'coo',
    title: 'Senior HR Administrator',
    icon: 'i-lucide-briefcase',
    employees: 1,
    avatars: ['HR_Admin']
  },
  {
    id: 'director',
    parentId: 'cto',
    title: 'Director, Business Solutions, and Development',
    icon: 'i-lucide-briefcase',
    employees: 1,
    avatars: ['Dir']
  },
  {
    id: 'pm',
    parentId: 'cto',
    title: 'Project Manager',
    icon: 'i-lucide-briefcase',
    employees: 1,
    avatars: ['PM']
  },
  {
    id: 'qa_lead',
    parentId: 'director',
    title: 'QA Tester Team Lead',
    icon: 'i-lucide-briefcase',
    employees: 1,
    avatars: ['QA_Lead']
  },
  {
    id: 'ui_lead',
    parentId: 'director',
    title: 'Senior UI/UX Designer',
    icon: 'i-lucide-briefcase',
    employees: 1,
    avatars: ['Sr_UX']
  },
  {
    id: 'dev_lead',
    parentId: 'director',
    title: 'Team Lead Developer',
    icon: 'i-lucide-briefcase',
    employees: 4,
    avatars: ['Dev_Lead1', 'Dev_Lead2', 'Dev_Lead3', 'Dev_Lead4']
  },
  {
    id: 'qa1',
    parentId: 'qa_lead',
    title: 'Quality Assurance Analyst',
    icon: 'i-lucide-briefcase',
    employees: 6,
    avatars: ['QAA1', 'QAA2', 'QAA3', 'QAA4', 'QAAX', 'QAAY']
  },
  {
    id: 'qa2',
    parentId: 'qa_lead',
    title: 'Quality Assurance Analyst',
    icon: 'i-lucide-briefcase',
    employees: 9,
    avatars: ['QAA5', 'QAA6', 'QAA7', 'QAA8', 'QAAX', 'QAAY', 'QAAZ', 'QAAW', 'QAAQ']
  },
  {
    id: 'ui1',
    parentId: 'ui_lead',
    title: 'UI/UX Designer',
    icon: 'i-lucide-briefcase',
    employees: 2,
    avatars: ['UX1', 'UX2']
  },
  {
    id: 'ui2',
    parentId: 'ui_lead',
    title: 'UI/UX Designer',
    icon: 'i-lucide-briefcase',
    employees: 2,
    avatars: ['UX3', 'UX4']
  },
  {
    id: 'sr_dev1',
    parentId: 'dev_lead',
    title: 'Senior Developer',
    icon: 'i-lucide-briefcase',
    employees: 4,
    avatars: ['SD1', 'SD2', 'SD3', 'SD4']
  },
  {
    id: 'sr_dev2',
    parentId: 'sr_dev1',
    title: 'Senior Developer',
    icon: 'i-lucide-briefcase',
    employees: 4,
    avatars: ['SD5', 'SD6', 'SD7', 'SD8']
  },
  {
    id: 'dev',
    parentId: 'sr_dev2',
    title: 'Developer',
    icon: 'i-lucide-briefcase',
    employees: 1,
    avatars: ['D1']
  },
  {
    id: 'jr_dev',
    parentId: 'dev',
    title: 'Jr. Developer',
    icon: 'i-lucide-briefcase',
    employees: 7,
    avatars: ['JD1', 'JD2', 'JD3', 'JD4', 'JD5', 'JD6', 'JD7']
  },
  {
    id: 'taa',
    parentId: 'pm',
    title: 'Technical Admin Assistant',
    icon: 'i-lucide-briefcase',
    employees: 1,
    avatars: ['TAA']
  },
  {
    id: 'hra',
    parentId: 'hr_admin',
    title: 'Human Resource Assistant',
    icon: 'i-lucide-briefcase',
    employees: 1,
    avatars: ['HRA']
  },
  {
    id: 'util',
    parentId: 'hr_admin',
    title: 'Utility / Messenger',
    icon: 'i-lucide-briefcase',
    employees: 1,
    avatars: ['Util']
  }
]

const floatingRoles = [
  { title: 'Company Driver', icon: 'i-lucide-lock', employees: 1, avatars: ['CD'] },
  { title: 'Student-Intern', icon: 'i-lucide-lock', employees: 1, avatars: ['SI'] }
]
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
                />
                <div class="flex items-center gap-2">
                    <UFieldGroup>
                        <UButton icon="i-lucide-layout-grid" color="neutral" :variant="viewMode === 'grid' ? 'subtle' : 'outline'" @click="viewMode = 'grid'" />
                        <UButton icon="i-lucide-list" color="neutral" :variant="viewMode === 'table' ? 'subtle' : 'outline'" @click="viewMode = 'table'" />
                    </UFieldGroup>

                    <UButton variant="soft" @click="isOrgChartOpen = true">
                        <UIcon name="i-lucide-git-fork" class="size-5 rotate-180" /> Open Org Chart
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

    <!-- Detail Modal -->
    <UModal v-model:open="isDetailOpen" class="w-full max-w-[480px]" :ui="{
        content: 'overflow-visible group',
        header: 'relative bg-linear-to-r from-primary-500/15 to-primary-500/0 rounded-t-lg',
    }">
        <template #header>
            <div class="absolute overflow-hidden inset-0">
                <UIcon name="i-lucide-user" class="size-24 text-primary-500 opacity-10 absolute -bottom-7 end-2" />
            </div>
            <div v-if="selectedEmployee" class="flex items-center gap-3">
                <UAvatar
                    :src="dicebearUrl(selectedEmployee.name.split(' ')[0] || selectedEmployee.name)"
                    :alt="selectedEmployee.name"
                    size="md"
                    :chip="{ color: selectedEmployee.status === 'ACTIVE' ? 'success' : 'neutral', inset: true }"
                />
                <div>
                    <h2 class="text-primary font-semibold leading-tight">{{ selectedEmployee.name }}</h2>
                    <p class="text-primary/60 text-sm">{{ selectedEmployee.designation }}</p>
                </div>
            </div>
            <UButton icon="i-lucide-x" variant="outline" color="neutral"
                class="absolute -top-4 -end-4 opacity-0 group-hover:opacity-100 transition-opacity"
                @click="isDetailOpen = false" />
        </template>

        <template #body>
            <div v-if="selectedEmployee" class="space-y-3">
                <p class="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Employment Details</p>
                <div class="grid grid-cols-2 gap-3 text-sm bg-muted dark:bg-muted/30 p-4 rounded-lg">
                    <div>
                        <div class="text-xs text-dimmed mb-0.5">Department</div>
                        <div class="font-medium">{{ selectedEmployee.department }}</div>
                    </div>
                    <div>
                        <div class="text-xs text-dimmed mb-0.5">Designation</div>
                        <div class="font-medium">{{ selectedEmployee.designation }}</div>
                    </div>
                    <USeparator class="col-span-2" />
                    <div>
                        <div class="text-xs text-dimmed mb-0.5">Employee No.</div>
                        <div class="font-medium tabular-nums">{{ selectedEmployee.employeeNo }}</div>
                    </div>
                    <div>
                        <div class="text-xs text-dimmed mb-0.5">Date Hired</div>
                        <div class="font-medium">{{ selectedEmployee.dateHired }}</div>
                    </div>
                    <USeparator class="col-span-2" />
                    <div>
                        <div class="text-xs text-dimmed mb-0.5">Employment Type</div>
                        <div class="font-semibold text-xs tracking-wider">{{ selectedEmployee.employmentType }}</div>
                    </div>
                    <div>
                        <div class="text-xs text-dimmed mb-1">Status</div>
                        <StatusBadge :status="selectedEmployee.status" />
                    </div>
                    <USeparator class="col-span-2" />
                    <div class="col-span-2">
                        <div class="text-xs text-dimmed mb-0.5">Email</div>
                        <div class="font-medium">{{ selectedEmployee.email }}</div>
                    </div>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="flex justify-end">
                <UButton label="Close" variant="ghost" color="neutral" @click="isDetailOpen = false" />
            </div>
        </template>
    </UModal>

    <UModal fullscreen v-model:open="isOrgChartOpen" :ui="{ content: 'flex flex-col', body: 'flex-1 min-h-0 p-0 overflow-hidden' }">
        <template #header>
            <div class="flex items-center justify-between px-2">
                <div class="flex items-center gap-3">
                    <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <UIcon name="i-lucide-git-fork" class="size-4 text-primary rotate-180" />
                    </div>
                    <div>
                        <div class="text-base font-semibold">Organization Chart</div>
                        <div class="text-xs text-dimmed">CCCI Company Structure</div>
                    </div>
                </div>
                <UButton color="neutral" variant="ghost" icon="i-lucide-x" @click="isOrgChartOpen = false" />
            </div>
        </template>
        <template #body>
            <div class="relative w-full h-full overflow-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
                <!-- Subtle grid background -->
                <div class="absolute inset-0 opacity-30"
                    style="background-image: radial-gradient(circle, var(--ui-border) 1px, transparent 1px); background-size: 28px 28px;" />

                <!-- Floating roles (top right) -->
                <div class="absolute top-6 right-6 flex flex-col gap-3 z-10">
                    <div class="text-[9px] font-semibold text-dimmed uppercase tracking-widest text-right mb-1">Floating Roles</div>
                    <div v-for="role in floatingRoles" :key="role.title"
                        class="w-36 bg-default/80 backdrop-blur-sm border border-[var(--ui-border)] rounded-xl p-3 shadow-lg hover:border-primary/50 hover:shadow-primary/10 hover:shadow-xl transition-all">
                        <div class="flex justify-center mb-2">
                            <div class="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
                                <UIcon :name="role.icon" class="size-3.5 text-primary" />
                            </div>
                        </div>
                        <div class="text-[10px] font-semibold text-center mb-2 leading-tight px-1">
                            {{ role.title }}
                        </div>
                        <div class="flex justify-center mb-2">
                            <UAvatar :src="dicebearUrl(role.avatars[0] || '')" :alt="role.avatars[0]" size="xs" class="ring-2 ring-background" />
                        </div>
                        <div class="flex justify-center">
                            <div class="text-[9px] bg-muted px-2 py-0.5 rounded-full text-dimmed font-medium">
                                {{ role.employees }} employee
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Org Chart — fills full area -->
                <ClientOnly>
                    <OrgChart :data="orgData" />
                </ClientOnly>
            </div>
        </template>
    </UModal>
</template>