<script setup lang="ts">
definePageMeta({
    isTable: true
})

const container = ref<HTMLElement | null>(null)
const header = ref<HTMLElement | null>(null)
const getScrollElement = () => container.value
const { height: headerHeight } = useElementSize(header, undefined, { box: 'border-box' })

const status = [
    { label: 'All Status', value: 'all' },
    { label: 'Scheduled', value: 'scheduled' },
    { label: 'In Progress', value: 'inProgress' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
]

const selectedStatus = ref('scheduled')
const search = ref('')
const isScheduleModalOpen = ref(false)

const viewMode = ref<'grid' | 'table'>('table')

const onboardings = ref([
    { id: 1, employee: 'John Doe', role: 'Software Engineer', template: 'Software Engineer Onboarding', status: 'In Progress', progress: 45, startDate: '2026-09-10' },
    { id: 2, employee: 'Jane Smith', role: 'HR Generalist', template: 'HR Generalist Onboarding', status: 'Scheduled', progress: 0, startDate: '2026-09-20' },
    { id: 3, employee: 'Alice Johnson', role: 'Sales Representative', template: 'Sales Representative Onboarding', status: 'Completed', progress: 100, startDate: '2026-08-01' },
    { id: 4, employee: 'Michael Brown', role: 'Marketing Manager', template: 'Marketing Manager Onboarding', status: 'Cancelled', progress: 10, startDate: '2026-08-15' },
    { id: 5, employee: 'David Wilson', role: 'Customer Support Specialist', template: 'Customer Support Onboarding', status: 'In Progress', progress: 75, startDate: '2026-09-05' },
    { id: 6, employee: 'Sarah Miller', role: 'Executive Assistant', template: 'Executive Onboarding', status: 'Scheduled', progress: 0, startDate: '2026-09-25' },
    { id: 7, employee: 'James Taylor', role: 'Intern', template: 'Intern Onboarding', status: 'In Progress', progress: 20, startDate: '2026-09-12' },
    { id: 8, employee: 'Jessica Anderson', role: 'Contractor', template: 'Contractor Onboarding', status: 'Completed', progress: 100, startDate: '2026-07-20' },
    { id: 9, employee: 'Thomas Martinez', role: 'Software Engineer', template: 'Software Engineer Onboarding', status: 'Scheduled', progress: 0, startDate: '2026-09-22' },
    { id: 10, employee: 'Lisa Thomas', role: 'HR Generalist', template: 'HR Generalist Onboarding', status: 'In Progress', progress: 60, startDate: '2026-09-08' },
    { id: 11, employee: 'William Jackson', role: 'Sales Representative', template: 'Sales Representative Onboarding', status: 'Scheduled', progress: 0, startDate: '2026-09-28' },
    { id: 12, employee: 'Ashley White', role: 'Marketing Manager', template: 'Marketing Manager Onboarding', status: 'Completed', progress: 100, startDate: '2026-06-15' },
])

const UBadge = resolveComponent('UBadge')
const UProgress = resolveComponent('UProgress')

const columns = [
    { accessorKey: 'employee', header: 'Employee' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'template', header: 'Template' },
    { accessorKey: 'startDate', header: 'Start Date' },
    { 
        accessorKey: 'progress', 
        header: 'Progress',
        cell: ({ row }: any) => {
            const progress = row.getValue('progress') as number
            return h('div', { class: 'flex items-center gap-2 max-w-[120px]' }, [
                h(UProgress, { 
                    modelValue: progress,
                    size: 'xs', 
                    color: progress === 100 ? 'success' : 'primary', 
                    class: 'flex-1' 
                }),
                h('span', { class: 'text-xs text-muted w-8 text-right' }, `${progress}%`)
            ])
        }
    },
    { 
        accessorKey: 'status', 
        header: 'Status',
        cell: ({ row }: any) => {
            const status = row.getValue('status') as string
            return h(UBadge, {
                label: status,
                color: status === 'Completed' ? 'success' : status === 'In Progress' ? 'primary' : status === 'Cancelled' ? 'error' : 'neutral',
                variant: 'subtle',
                size: 'sm'
            })
        }
    },
]

const filteredOnboardings = computed(() => {
    return onboardings.value.filter(o => {
        const matchStatus = selectedStatus.value === 'all' || 
            (selectedStatus.value === 'scheduled' && o.status === 'Scheduled') ||
            (selectedStatus.value === 'inProgress' && o.status === 'In Progress') ||
            (selectedStatus.value === 'completed' && o.status === 'Completed') ||
            (selectedStatus.value === 'cancelled' && o.status === 'Cancelled');
        
        const matchSearch = search.value === '' || 
            o.employee.toLowerCase().includes(search.value.toLowerCase()) || 
            o.role.toLowerCase().includes(search.value.toLowerCase());
            
        return matchStatus && matchSearch;
    })
})
</script>

<template>
     <div ref="container" class="flex-1 overflow-y-auto scrollbar">
        <div ref="header">
            <!-- Header -->
            <div class="flex items-center gap-4 p-4">
                <UPageCard
                    title="Employee Onboarding"
                    description="Schedule and track onboarding checklists for new employees."
                    variant="naked"
                    orientation="horizontal"
                    class="w-full"
                    :ui="{ title: 'text-2xl font-bold' }"
                >
                    <div class="flex justify-end gap-2 flex-1">
                        <UFieldGroup>
                            <UButton icon="i-lucide-layout-grid" color="neutral" :variant="viewMode === 'grid' ? 'subtle' : 'outline'" @click="viewMode = 'grid'" />
                            <UButton icon="i-lucide-list" color="neutral" :variant="viewMode === 'table' ? 'subtle' : 'outline'" @click="viewMode = 'table'" />
                        </UFieldGroup>
                        <UButton color="primary" @click="isScheduleModalOpen = true">
                            <UIcon name="i-lucide-plus" class="size-4" />
                            Schedule Onboarding
                        </UButton>
                    </div>
                </UPageCard>
            </div>

            <!-- Search & filter -->
            <div class="flex items-center gap-3 px-4 pb-4">
                <UInput
                    v-model="search"
                    placeholder="Search..."
                    icon="i-lucide-search"
                    class="flex-1"
                />
                <USelect v-model="selectedStatus" :items="status" class="w-32" />
            </div>

            <USeparator />
        </div>
        <!-- Onboarding Data View -->
        <UTable v-if="viewMode === 'table'" :data="filteredOnboardings" :columns="columns" class="flex-1 min-h-0" sticky :virtualize="{ scrollMargin: headerHeight, getScrollElement }">
            <template #empty>
                <UEmpty
                    icon="i-lucide-file-check"
                    title="No onboarding schedules found"
                    description="No schedules match your search criteria."
                    variant="naked"
                />
            </template>
        </UTable>

        <div v-else class="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div v-if="filteredOnboardings.length === 0" class="col-span-full">
                <UEmpty
                    icon="i-lucide-file-check"
                    title="No onboarding schedules found"
                    description="No schedules match your search criteria."
                    variant="naked"
                />
            </div>
            
            <UCard v-for="item in filteredOnboardings" :key="item.id" class="flex flex-col h-full shadow-sm group hover:ring-1 hover:ring-primary/50 transition-all" :ui="{ root: 'flex flex-col', body: 'flex-1 flex flex-col gap-4 sm:p-4', footer: 'p-0 sm:p-0' }">
                <div class="flex items-start justify-between gap-2">
                    <div class="space-y-0.5 min-w-0">
                        <div class="font-semibold text-highlighted group-hover:text-primary transition-colors truncate">{{ item.employee }}</div>
                        <div class="text-xs text-dimmed">{{ item.role }}</div>
                    </div>
                    <UBadge
                        :label="item.status"
                        :color="item.status === 'Completed' ? 'success' : item.status === 'In Progress' ? 'primary' : item.status === 'Cancelled' ? 'error' : 'neutral'"
                        variant="subtle"
                        size="sm"
                        class="shrink-0"
                    />
                </div>
                
                <div class="space-y-1 mt-auto">
                    <div class="flex justify-between text-xs">
                        <span class="text-muted">Progress</span>
                        <span class="font-medium">{{ item.progress }}%</span>
                    </div>
                    <UProgress :model-value="item.progress" size="xs" :color="item.progress === 100 ? 'success' : 'primary'" />
                </div>
                
                <div class="text-sm pt-2 border-t border-border">
                    <div class="flex justify-between py-0.5">
                        <span class="text-muted">Template</span>
                        <span class="font-medium text-highlighted truncate max-w-[120px]" :title="item.template">{{ item.template }}</span>
                    </div>
                    <div class="flex justify-between py-0.5">
                        <span class="text-muted">Start Date</span>
                        <span class="font-medium text-highlighted">{{ item.startDate }}</span>
                    </div>
                </div>
            </UCard>
        </div>
    </div>
    
    <ScheduleOnboardingModal v-model:open="isScheduleModalOpen" />
</template>