<script setup lang="ts">
import { h, resolveComponent } from 'vue'

definePageMeta({
    isTable: true,
})

// ─── Table columns ────────────────────────────────────────────────────────────
const columns = [
    { accessorKey: 'dateApplied', header: 'Date Applied' },
    { accessorKey: 'date', header: 'Overtime Date' },
    { accessorKey: 'start', header: 'Start Time' },
    { accessorKey: 'end', header: 'End Time' },
    { accessorKey: 'duration', header: 'Duration' },
    { accessorKey: 'status', header: 'Status' },
]

// ─── Data ─────────────────────────────────────────────────────────────────────
const { data } = useLazyFetch('/api/overtime')
const overtimeData = computed(() => data.value ?? [])

// ─── State ────────────────────────────────────────────────────────────────────
const container = useTemplateRef('container')
const header = useTemplateRef('header')
const getScrollElement = () => container.value

const { height: headerHeight } = useElementSize(header, undefined, { box: 'border-box' })

const isModalOpen = ref(false)
const viewMode = ref<'grid' | 'table'>('table')

const { register } = useOverlayVisibility()
register(isModalOpen)

const statuses = ['All Status', 'Pending', 'Approved', 'Rejected']
const status = ref('All Status')

const search = ref('')
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

// ─── Filters & Computeds ──────────────────────────────────────────────────────
const filteredOvertime = computed(() => {
    return overtimeData.value.filter(s => {
        // Search
        const matchesSearch = s.status.toLowerCase().includes(search.value.toLowerCase()) ||
            s.date.toLowerCase().includes(search.value.toLowerCase())

        // Status
        const matchesStatus = status.value === 'All Status' || s.status.toUpperCase() === status.value.toUpperCase()

        // Period
        const itemDate = new Date(s.date)
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

        return matchesSearch && matchesStatus && matchesPeriod
    })
})

const totalHours = computed(() => filteredOvertime.value.reduce((acc, curr) => acc + parseFloat(curr.duration), 0))
const approvedItems = computed(() => filteredOvertime.value.filter(i => i.status === 'APPROVED').length)
const pendingItems = computed(() => filteredOvertime.value.filter(i => i.status === 'PENDING').length)
const rejectedItems = computed(() => filteredOvertime.value.filter(i => i.status === 'REJECTED').length)

const kpis = computed(() => [
    { label: 'Total Overtime', icon: 'i-lucide-clock', color: 'text-indigo-500', bg: 'bg-indigo-500/10', value: totalHours.value.toString(), sublabel: 'HOURS' },
    { label: 'Approved Items', icon: 'i-lucide-check-circle-2', color: 'text-emerald-500', bg: 'bg-emerald-500/10', value: approvedItems.value.toString(), sublabel: 'REQUESTS' },
    { label: 'Pending Items', icon: 'i-lucide-hourglass', color: 'text-amber-500', bg: 'bg-amber-500/10', value: pendingItems.value.toString(), sublabel: 'REQUESTS' },
    { label: 'Rejected Items', icon: 'i-lucide-x-circle', color: 'text-rose-500', bg: 'bg-rose-500/10', value: rejectedItems.value.toString(), sublabel: 'REQUESTS' }
])

const viewStats = ref(true)
</script>

<template>
    <div ref="container" class="flex-1 overflow-y-auto scrollbar">
        <div ref="header">
            <div class="flex flex-col gap-4 p-4">
                <UPageCard title="Overtime Requests" description="Apply and track overtime" variant="naked"
                    orientation="horizontal" class="w-full" :ui="{
                        title: 'text-2xl font-bold'
                    }">
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
                            <UButton icon="i-lucide-list" color="neutral"
                                :variant="viewMode === 'table' ? 'subtle' : 'outline'" @click="viewMode = 'table'" />
                            <UButton icon="i-lucide-layout-grid" color="neutral"
                                :variant="viewMode === 'grid' ? 'subtle' : 'outline'" @click="viewMode = 'grid'" />
                        </UFieldGroup>
                        <UButton @click="isModalOpen = true">
                            <UIcon name="i-lucide-plus" class="size-4" />
                            Request Overtime
                        </UButton>
                    </div>
                </UPageCard>
            </div>

            <!-- Search & filter -->
            <div class="flex items-center gap-3 px-4 pb-4">
                <UInput v-model="search" placeholder="Search by date or status..." icon="i-lucide-search"
                    class="flex-1" />
                <USelect v-model="status" :items="statuses" class="w-32" />
                <USelect v-model="period" :items="['Monthly', 'Quarterly', 'Yearly']" class="w-32" />
                <USelect v-if="period === 'Monthly'" v-model="month" :items="months" class="w-24" />
                <USelect v-if="period === 'Quarterly'" v-model="quarter" :items="quarters" class="w-24" />
                <USelect v-model="year" :items="years" class="w-24" />
            </div>

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
                                <span class="text-[10px] font-semibold text-dimmed/70 uppercase tracking-wider">{{
                                    kpi.sublabel }}</span>
                            </div>
                        </div>
                    </div>
                </UCard>
            </div>

            <USeparator />
        </div>

        <div v-if="viewMode === 'grid'" class="flex-1 flex flex-col p-4">
            <div v-if="filteredOvertime.length === 0" class="flex-1 flex items-center justify-center">
                <UEmpty icon="i-lucide-clock-4" title="No overtime requests"
                    description="No overtime records found for the selected period." variant="naked" />
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                <UCard v-for="ot in filteredOvertime" :key="ot.id" class="flex flex-col shadow-sm"
                    :ui="{ body: 'flex flex-col h-full gap-4 sm:p-4' }">
                    <div class="flex items-start justify-between gap-2">
                        <div class="space-y-0.5">
                            <div class="font-semibold text-highlighted">Overtime Request</div>
                            <div class="text-xs text-dimmed">{{ ot.dateApplied }}</div>
                        </div>
                        <StatusBadge :status="ot.status" />
                    </div>

                    <div class="grid grid-cols-2 gap-2 text-sm bg-muted dark:bg-muted/30 p-3 rounded-md mt-auto">
                        <div class="col-span-2">
                            <div class="text-xs text-dimmed mb-0.5">Date</div>
                            <div class="font-medium">{{ ot.date }}</div>
                        </div>
                        <USeparator class="col-span-2" />
                        <div>
                            <div class="text-xs text-dimmed mb-0.5">Start Time</div>
                            <div class="font-medium">{{ ot.start }}</div>
                        </div>
                        <div>
                            <div class="text-xs text-dimmed mb-0.5">End Time</div>
                            <div class="font-medium">{{ ot.end }}</div>
                        </div>
                        <USeparator class="col-span-2" />
                        <div class="col-span-2">
                            <div class="text-xs text-dimmed mb-0.5">Duration</div>
                            <div class="font-medium">{{ ot.duration }}</div>
                        </div>
                    </div>
                </UCard>
            </div>
        </div>

        <UTable v-else :data="filteredOvertime" :columns="columns" sticky class="flex-1 min-h-0"
            :virtualize="{ scrollMargin: headerHeight, getScrollElement }">
            <template #status-cell="{ row }">
                <StatusBadge :status="row.original.status" />
            </template>
            <template #empty>
                <UEmpty icon="i-lucide-clock-4" title="No overtime requests"
                    description="No overtime records found for the selected period." variant="naked" />
            </template>
        </UTable>
    </div>

    <ApplyOvertimeModal v-model:open="isModalOpen" />
</template>