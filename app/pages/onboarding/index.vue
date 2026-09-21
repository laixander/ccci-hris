<script setup lang="ts">
import { h, resolveComponent, computed, ref } from 'vue'
import type { OnboardingRecord } from '~~/app/types'

definePageMeta({
    isTable: true
})

// ─── Data ─────────────────────────────────────────────────────────────────────
const { data: onboardingsResponse } = useLazyFetch<OnboardingRecord[]>('/api/onboarding')
const onboardings = computed(() => onboardingsResponse.value || [])

// ─── State ────────────────────────────────────────────────────────────────────

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

// ─── Table columns ────────────────────────────────────────────────────────────
const StatusBadge = resolveComponent('StatusBadge')
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
            return h(StatusBadge, {
                status: status
            })
        }
    },
]

// ─── Filters & Computeds ──────────────────────────────────────────────────────
const filteredOnboardings = computed(() => {
    return onboardings.value.filter(o => {
        const matchStatus = selectedStatus.value === 'all' || 
            (selectedStatus.value === 'scheduled' && o.status === 'SCHEDULED') ||
            (selectedStatus.value === 'inProgress' && o.status === 'IN PROGRESS') ||
            (selectedStatus.value === 'completed' && o.status === 'COMPLETED') ||
            (selectedStatus.value === 'cancelled' && o.status === 'CANCELLED');
        
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
                            <UButton icon="i-lucide-list" color="neutral" :variant="viewMode === 'table' ? 'subtle' : 'outline'" @click="viewMode = 'table'" />
                            <UButton icon="i-lucide-layout-grid" color="neutral" :variant="viewMode === 'grid' ? 'subtle' : 'outline'" @click="viewMode = 'grid'" />
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
                    <StatusBadge :status="item.status" class="shrink-0" />
                </div>

                <div class="grid grid-cols-1 gap-2 text-sm bg-muted dark:bg-muted/30 p-3 rounded-md">
                    <div>
                        <div class="text-xs text-dimmed mb-0.5">Template</div>
                        <div class="font-medium">{{ item.template }}</div>
                    </div>
                    <USeparator />
                    <div>
                        <div class="text-xs text-dimmed mb-0.5">Start Date</div>
                        <div class="font-medium">{{ item.startDate }}</div>
                    </div>
                </div>
                
                <!-- <div class="text-sm space-y-1">
                    <div class="flex justify-between py-0.5">
                        <span class="text-muted">Template</span>
                        <span class="font-medium text-highlighted truncate max-w-[120px]" :title="item.template">{{ item.template }}</span>
                    </div>
                    <div class="flex justify-between py-0.5">
                        <span class="text-muted">Start Date</span>
                        <span class="font-medium text-highlighted">{{ item.startDate }}</span>
                    </div>
                </div> -->

                <div class="space-y-1 mt-auto">
                    <div class="flex justify-between text-xs">
                        <span class="text-muted">Progress</span>
                        <span class="font-medium">{{ item.progress }}%</span>
                    </div>
                    <UProgress :model-value="item.progress" size="xs" :color="item.progress === 100 ? 'success' : 'primary'" />
                </div>
                
                <!-- <template #footer>
                    <div class="flex items-stretch">
                        <UButton
                            block
                            color="neutral"
                            variant="ghost"
                            :to="`/onboarding/${item.id}`"
                            aria-label="View details"
                            class="flex-1 rounded-none py-2"
                        >
                            <UIcon name="i-lucide-eye" class="size-4" />
                            View
                        </UButton>
                        <USeparator orientation="vertical" class="h-auto" />
                        <UButton
                            block
                            color="error"
                            variant="ghost"
                            aria-label="Delete schedule"
                            class="flex-1 rounded-none py-2"
                        >
                            <UIcon name="i-lucide-trash-2" class="size-4" />
                            Delete
                        </UButton>
                    </div>
                </template> -->
            </UCard>
        </div>
    </div>
    
    <ScheduleOnboardingModal v-model:open="isScheduleModalOpen" />
</template>