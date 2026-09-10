<script setup lang="ts">
import { ref, computed, h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UButton = resolveComponent('UButton')
const StatusBadge = resolveComponent('StatusBadge')
const UBadge = resolveComponent('UBadge')

definePageMeta({
    isTable: true,
})

type TimesheetRecord = {
  day: number
  timeIn: string | null
  timeOut: string | null
  duration: number
  status: 'PRESENT' | 'HOLIDAY' | 'WEEKEND' | 'LWOP' | 'ON LEAVE'
  overtime: number
  late: number
  undertime: number
  leave: number
  lwop: number
}

type EvaluationRecord = {
  cutoffPeriod: string
  confirmedDate: string
  status: 'PENDING' | 'CONFIRMED'
}

const data = ref<TimesheetRecord[]>([
  { day: 31, timeIn: null, timeOut: null, duration: 0, status: 'HOLIDAY', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 30, timeIn: null, timeOut: null, duration: 0, status: 'WEEKEND', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 29, timeIn: null, timeOut: null, duration: 0, status: 'WEEKEND', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 28, timeIn: '07:21:00 AM', timeOut: '05:13:00 PM', duration: 9.87, status: 'PRESENT', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 27, timeIn: '08:08:00 AM', timeOut: '05:01:00 PM', duration: 8.88, status: 'PRESENT', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 26, timeIn: '08:06:00 AM', timeOut: '05:00:00 PM', duration: 8.90, status: 'PRESENT', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 25, timeIn: '07:37:00 AM', timeOut: '05:01:00 PM', duration: 9.40, status: 'PRESENT', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 24, timeIn: '08:04:00 AM', timeOut: '05:02:00 PM', duration: 8.97, status: 'PRESENT', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 23, timeIn: null, timeOut: null, duration: 0, status: 'WEEKEND', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 22, timeIn: null, timeOut: null, duration: 0, status: 'WEEKEND', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 21, timeIn: null, timeOut: null, duration: 0, status: 'HOLIDAY', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 20, timeIn: '07:57:00 AM', timeOut: '05:00:00 PM', duration: 9.05, status: 'PRESENT', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 19, timeIn: '07:57:00 AM', timeOut: '05:00:00 PM', duration: 9.05, status: 'PRESENT', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 18, timeIn: '07:31:00 AM', timeOut: '05:11:00 PM', duration: 9.67, status: 'PRESENT', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 17, timeIn: null, timeOut: null, duration: 0, status: 'LWOP', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 8.00 },
  { day: 16, timeIn: null, timeOut: null, duration: 0, status: 'WEEKEND', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 15, timeIn: null, timeOut: null, duration: 0, status: 'WEEKEND', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 14, timeIn: '07:32:00 AM', timeOut: '05:23:00 PM', duration: 9.85, status: 'PRESENT', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 13, timeIn: '08:06:00 AM', timeOut: '05:01:00 PM', duration: 8.92, status: 'PRESENT', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 12, timeIn: '08:06:00 AM', timeOut: '05:02:00 PM', duration: 8.93, status: 'PRESENT', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 11, timeIn: null, timeOut: null, duration: 0, status: 'ON LEAVE', overtime: 0, late: 0, undertime: 0, leave: 8.00, lwop: 0 },
  { day: 10, timeIn: '07:30:00 AM', timeOut: '05:05:00 PM', duration: 9.58, status: 'PRESENT', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 9, timeIn: null, timeOut: null, duration: 0, status: 'WEEKEND', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 8, timeIn: null, timeOut: null, duration: 0, status: 'WEEKEND', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 7, timeIn: '07:32:00 AM', timeOut: '05:08:00 PM', duration: 9.60, status: 'PRESENT', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 6, timeIn: '07:55:00 AM', timeOut: '05:04:00 PM', duration: 9.15, status: 'PRESENT', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 5, timeIn: '08:07:00 AM', timeOut: '05:00:00 PM', duration: 8.88, status: 'PRESENT', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 4, timeIn: null, timeOut: null, duration: 0, status: 'ON LEAVE', overtime: 0, late: 0, undertime: 0, leave: 8.00, lwop: 0 },
  { day: 3, timeIn: '08:08:00 AM', timeOut: '05:02:00 PM', duration: 8.90, status: 'PRESENT', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 2, timeIn: null, timeOut: null, duration: 0, status: 'WEEKEND', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 1, timeIn: null, timeOut: null, duration: 0, status: 'WEEKEND', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
])

const evaluationData = ref<EvaluationRecord[]>([
  { cutoffPeriod: 'August 14, 2026 – August 27, 2026', confirmedDate: 'Not yet confirmed', status: 'PENDING' },
  { cutoffPeriod: 'July 31, 2026 – August 13, 2026', confirmedDate: 'August 14, 2026 at 11:58 AM', status: 'CONFIRMED' },
  { cutoffPeriod: 'July 15, 2026 – July 30, 2026', confirmedDate: 'August 05, 2026 at 08:37 AM', status: 'CONFIRMED' },
  { cutoffPeriod: 'June 30, 2026 – July 14, 2026', confirmedDate: 'August 05, 2026 at 08:37 AM', status: 'CONFIRMED' },
  { cutoffPeriod: 'June 15, 2026 – June 29, 2026', confirmedDate: 'July 03, 2026 at 07:36 AM', status: 'CONFIRMED' },
  { cutoffPeriod: 'May 29, 2026 – June 12, 2026', confirmedDate: 'June 11, 2026 at 06:30 PM', status: 'CONFIRMED' },
  { cutoffPeriod: 'May 15, 2026 – May 28, 2026', confirmedDate: 'May 29, 2026 at 11:36 AM', status: 'CONFIRMED' },
  { cutoffPeriod: 'April 30, 2026 – May 14, 2026', confirmedDate: 'May 29, 2026 at 11:36 AM', status: 'CONFIRMED' },
  { cutoffPeriod: 'April 15, 2026 – April 29, 2026', confirmedDate: 'May 11, 2026 at 09:49 AM', status: 'CONFIRMED' },
  { cutoffPeriod: 'March 31, 2026 – April 14, 2026', confirmedDate: 'April 30, 2026 at 08:26 AM', status: 'CONFIRMED' },
])

const cutoffs = [
  { label: 'August 14, 2026 – August 27, 2026', value: 'aug-14-2026' },
  { label: 'July 31, 2026 – August 13, 2026', value: 'jul-31-2026' },
  { label: 'July 15, 2026 – July 30, 2026', value: 'jul-15-2026' },
  { label: 'June 30, 2026 – July 14, 2026', value: 'jun-30-2026' },
  { label: 'June 15, 2026 – June 29, 2026', value: 'jun-15-2026' },
  { label: 'May 29, 2026 – June 12, 2026', value: 'may-29-2026' },
  { label: 'May 15, 2026 – May 28, 2026', value: 'may-15-2026' },
  { label: 'April 30, 2026 – May 14, 2026', value: 'apr-30-2026' },
]

function getCutoffHalf(cutoffPeriod: string) {
  const parts = cutoffPeriod.split('–')
  if (parts.length === 2) {
    const endPart = parts[1]
    if (!endPart) return ''
    const endDate = new Date(endPart.trim())
    if (!isNaN(endDate.getTime())) {
      return endDate.getDate() <= 15 ? '1st Half' : '2nd Half'
    }
  }
  return ''
}

const search = ref('')
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

const filteredEvaluations = computed(() => {
    return evaluationData.value.filter(s => {
        // Search
        const matchesSearch = s.cutoffPeriod.toLowerCase().includes(search.value.toLowerCase()) ||
                              s.status.toLowerCase().includes(search.value.toLowerCase()) ||
                              s.confirmedDate.toLowerCase().includes(search.value.toLowerCase())
                              
        // Status
        const matchesStatus = status.value === 'All Status' || s.status.toUpperCase() === status.value.toUpperCase()
        
        // Period
        const parts = s.cutoffPeriod.split('–')
        let itemDate = new Date()
        if (parts.length === 2 && parts[1]) {
            itemDate = new Date(parts[1].trim())
        }
        
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

const isDrawerOpen = ref(false)
const isModalOpen = ref(false)
const selectedEvaluation = ref<EvaluationRecord | null>(null)
const viewMode = ref<'grid' | 'table'>('grid')
const detailsViewMode = ref<'grid' | 'table'>('grid')

const evaluationColumns: TableColumn<EvaluationRecord>[] = [
  { 
    accessorKey: 'cutoffPeriod', 
    header: 'Cut-off Period',
    cell: ({ row }) => {
      const period = row.getValue('cutoffPeriod') as string
      const half = getCutoffHalf(period).toUpperCase()
      return h('div', { class: 'flex items-center gap-3' }, [
        h(UBadge, { label: half, color: 'neutral', variant: 'soft', size: 'sm' }),
        h('span', { class: 'font-medium' }, period)
      ])
    }
  },
  { 
    accessorKey: 'status', 
    header: 'Status', 
    cell: ({ row }) => h(StatusBadge, { status: row.getValue('status') as string })
  },
  { 
    accessorKey: 'confirmedDate', 
    header: 'Date Confirmed',
    cell: ({ row }) => h('span', { class: 'text-neutral-500 dark:text-neutral-400' }, row.getValue('confirmedDate') as string)
  },
  { 
    id: 'actions', 
    header: '',
    meta: { class: { th: 'w-32', td: 'text-right' } },
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return h(UButton, {
        label: status === 'CONFIRMED' ? 'View Details' : 'Review',
        variant: 'soft',
        color: status === 'CONFIRMED' ? 'primary' : 'warning',
        size: 'xs',
        onClick: (e: Event) => {
          e.stopPropagation()
          selectedEvaluation.value = row.original
          isDrawerOpen.value = true
        }
      })
    }
  },
]

const evaluationDetailsColumns: TableColumn<TimesheetRecord>[] = [
  { accessorKey: 'day', header: 'Date' },
  { accessorKey: 'timeIn', header: 'Time-in', cell: ({ row }) => row.getValue('timeIn') || '--' },
  { accessorKey: 'timeOut', header: 'Time-out', cell: ({ row }) => row.getValue('timeOut') || '--' },
  { 
    accessorKey: 'status', 
    header: 'Status', 
    cell: ({ row }) => h(StatusBadge, { status: row.getValue('status') as string })
  },
  { accessorKey: 'duration', header: 'Duration', meta: { class: { th: 'text-right', td: 'text-right text-neutral-600 dark:text-neutral-400 font-medium' } }, cell: ({ row }) => Number(row.getValue('duration')).toFixed(2) },
  { accessorKey: 'late', header: 'Late', meta: { class: { th: 'text-right', td: 'text-right' } }, cell: ({ row }) => Number(row.getValue('late')).toFixed(2) },
  { accessorKey: 'undertime', header: 'Undertime', meta: { class: { th: 'text-right', td: 'text-right' } }, cell: ({ row }) => Number(row.getValue('undertime')).toFixed(2) },
  { accessorKey: 'lwop', header: 'LWOP', meta: { class: { th: 'text-right', td: 'text-right' } }, cell: ({ row }) => Number(row.getValue('lwop')).toFixed(2) },
  { accessorKey: 'overtime', header: 'Overtime', meta: { class: { th: 'text-right', td: 'text-right' } }, cell: ({ row }) => Number(row.getValue('overtime')).toFixed(2) },
  { accessorKey: 'leave', header: 'VL Deductions', meta: { class: { th: 'text-right', td: 'text-right' } }, cell: ({ row }) => Number(row.getValue('leave')).toFixed(2) },
]

const evaluationDetailsData = computed(() => {
  const allowedDays = [14, 17, 18, 19, 20, 21, 24, 25, 26, 27]
  return data.value.filter(d => allowedDays.includes(d.day)).sort((a, b) => a.day - b.day)
})

const getTotalDeduction = (record: TimesheetRecord) => {
  return record.late + record.undertime + record.lwop + record.leave
}

const toast = useToast()
const handleConfirm = async () => {
  isModalOpen.value = false
  
  toast.add({
    title: 'Success',
    description: 'Timesheet confirmed successfully.',
    color: 'success',
    icon: 'i-lucide-check-circle'
  })
}
</script>

<template>
  <div class="flex-1 overflow-y-auto scrollbar flex flex-col">
    <div class="flex flex-col gap-4 p-4">
        <UPageCard title="Evaluations" description="Review and evaluate your daily time records."
            variant="naked" orientation="horizontal" class="w-full" :ui="{
              title: 'text-2xl font-bold'
            }" >
            <div class="flex justify-end gap-2 flex-1">
              <UFieldGroup>
                <UButton icon="i-lucide-layout-grid" color="neutral" :variant="viewMode === 'grid' ? 'subtle' : 'outline'" @click="viewMode = 'grid'" />
                <UButton icon="i-lucide-list" color="neutral" :variant="viewMode === 'table' ? 'subtle' : 'outline'" @click="viewMode = 'table'" />
              </UFieldGroup>
            </div>
        </UPageCard>

        <!-- Search & filter -->
        <div class="flex items-center gap-3">
            <UInput
                v-model="search"
                placeholder="Search by cutoff or status..."
                icon="i-lucide-search"
                class="flex-1"
            />
            <USelect v-model="status" :items="['All Status', 'Pending', 'Confirmed']" class="w-32" />
            <USelect v-model="period" :items="['Monthly', 'Quarterly', 'Yearly']" class="w-32" />
            <USelect v-if="period === 'Monthly'" v-model="month" :items="months" class="w-24" />
            <USelect v-if="period === 'Quarterly'" v-model="quarter" :items="quarters" class="w-24" />
            <USelect v-model="year" :items="years" class="w-24" />
        </div>
    </div>
    
    <USeparator />

    <div v-if="viewMode === 'grid'" class="flex-1 flex flex-col p-4">
        <div v-if="filteredEvaluations.length === 0" class="flex-1 flex items-center justify-center">
            <UEmpty icon="i-lucide-calendar-check" title="No evaluations" description="There are no evaluations available for this period." variant="naked" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <UCard v-for="evaluation in filteredEvaluations" :key="evaluation.cutoffPeriod" class="shadow-sm cursor-pointer group hover:ring-1 hover:ring-primary/40 transition-all" :ui="{ body: 'sm:p-4 space-y-4 group-hover:bg-linear-to-tl group-hover:from-primary/10 group-hover:from-5% group-hover:to-default transition-all duration-300 ease-out' }" @click="selectedEvaluation = evaluation; isDrawerOpen = true">
                <div class="flex items-start justify-between">
                    <div class="flex items-start justify-between w-full gap-2">
                        <div>
                            <UBadge :label="getCutoffHalf(evaluation.cutoffPeriod).toUpperCase()" color="neutral" variant="soft" size="sm" class="mb-1 group-hover:hidden" />
                            <UBadge :label="getCutoffHalf(evaluation.cutoffPeriod).toUpperCase()" color="primary" variant="soft" size="sm" class="mb-1 hidden group-hover:inline-flex" />
                            <div class="group-hover:text-primary transition-colors font-semibold text-sm">{{ evaluation.cutoffPeriod }}</div>
                        </div>
                    </div>
                </div>
                <USeparator />
                <div class="relative">
                    <!-- Default: status + date -->
                    <div class="flex items-center justify-between transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-1">
                        <StatusBadge :status="evaluation.status" />
                        <div class="text-xs text-dimmed">{{ evaluation.confirmedDate }}</div>
                    </div>
                    <!-- Hover: review button -->
                    <div class="absolute inset-0 flex items-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                        <UButton block :label="evaluation.status === 'CONFIRMED' ? 'View Details' : 'Review'" variant="soft" :color="evaluation.status === 'CONFIRMED' ? 'primary' : 'warning'" @click.stop="selectedEvaluation = evaluation; isDrawerOpen = true" />
                    </div>
                </div>
            </UCard>
        </div>
    </div>

    <UTable v-else :data="filteredEvaluations" :columns="evaluationColumns" class="flex-1">
        <template #empty>
            <UEmpty
                icon="i-lucide-clipboard-x"
                title="No evaluations"
                description="No timesheet evaluations found for the selected period."
                variant="naked"
            />
        </template>
    </UTable>

    <UDrawer v-model:open="isDrawerOpen" direction="right" title="Review Timesheet" inset close class="w-full max-w-[1200px]" :ui="{container: 'pr-0', header: 'pr-4', footer: 'pr-4', body: 'min-h-0 pr-4 pl-[1px] py-[1px] overflow-y-auto scrollbar'}">
      <template #body>
        <div v-if="selectedEvaluation" class="space-y-6">
          <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
            <UCard :ui="{ body: 'flex flex-col items-center justify-center sm:p-4' }" class="shadow-sm">
              <UIcon name="i-lucide-clock" class="size-6 text-primary mb-2" />
              <div class="text-xs text-dimmed mb-1">Duration</div>
              <div class="text-2xl font-bold">73.77</div>
            </UCard>
            <UCard :ui="{ body: 'flex flex-col items-center justify-center sm:p-4' }" class="shadow-sm">
              <UIcon name="i-lucide-alarm-clock" class="size-6 text-warning-500 mb-2" />
              <div class="text-xs text-dimmed mb-1">Late</div>
              <div class="text-2xl font-bold">0.00</div>
            </UCard>
            <UCard :ui="{ body: 'flex flex-col items-center justify-center sm:p-4' }" class="shadow-sm">
              <UIcon name="i-lucide-history" class="size-6 text-orange-500 mb-2" />
              <div class="text-xs text-dimmed mb-1">Undertime</div>
              <div class="text-2xl font-bold">0.00</div>
            </UCard>
            <UCard :ui="{ body: 'flex flex-col items-center justify-center sm:p-4' }" class="shadow-sm">
              <UIcon name="i-lucide-user-x" class="size-6 text-error-500 mb-2" />
              <div class="text-xs text-dimmed mb-1">LWOP</div>
              <div class="text-2xl font-bold">8.00</div>
            </UCard>
            <UCard :ui="{ body: 'flex flex-col items-center justify-center sm:p-4' }" class="shadow-sm">
              <UIcon name="i-lucide-timer" class="size-6 text-success-500 mb-2" />
              <div class="text-xs text-dimmed mb-1">Overtime</div>
              <div class="text-2xl font-bold">0.00</div>
            </UCard>
            <UCard :ui="{ body: 'flex flex-col items-center justify-center sm:p-4' }" class="shadow-sm">
              <UIcon name="i-lucide-calendar-minus" class="size-6 text-purple-500 mb-2" />
              <div class="text-xs text-dimmed mb-1">VL Deductions</div>
              <div class="text-2xl font-bold">0.00</div>
            </UCard>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
                <UIcon name="i-lucide-calendar" class="size-5" />
              </div>
              <div>
                  <UBadge :label="getCutoffHalf(selectedEvaluation.cutoffPeriod).toUpperCase()" color="neutral" variant="soft" size="sm" class="mb-1" />
                  <div class="font-semibold text-sm">{{ selectedEvaluation.cutoffPeriod }}</div>
              </div>
            </div>
            <UFieldGroup>
              <UButton icon="i-lucide-layout-grid" color="neutral" :variant="detailsViewMode === 'grid' ? 'subtle' : 'outline'" @click="detailsViewMode = 'grid'" />
              <UButton icon="i-lucide-list" color="neutral" :variant="detailsViewMode === 'table' ? 'subtle' : 'outline'" @click="detailsViewMode = 'table'" />
            </UFieldGroup>
          </div>

          <div v-if="detailsViewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <UCard v-for="record in evaluationDetailsData" :key="record.day" :class="['shadow-sm', getTotalDeduction(record) > 0 ? 'ring-1 ring-error-500/20 bg-linear-to-tl from-error-500/10 to-transparent' : '']" :ui="{ body: 'sm:p-4 space-y-3' }">
                  <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <UIcon name="i-lucide-calendar-days" class="size-5 text-dimmed" />
                        <div class="font-semibold text-sm">Day {{ record.day }}</div>
                      </div>
                      <StatusBadge :status="record.status" />
                  </div>
                  <USeparator
                    :ui="{ border: getTotalDeduction(record) > 0 ? 'border-error-500/10' : '' }"
                  />
                  <div class="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                      <div class="flex flex-col">
                          <span class="text-dimmed text-xs">Time-in</span>
                          <span class="font-medium">{{ record.timeIn || '--' }}</span>
                      </div>
                      <div class="flex flex-col">
                          <span class="text-dimmed text-xs">Time-out</span>
                          <span class="font-medium">{{ record.timeOut || '--' }}</span>
                      </div>
                      <div class="flex flex-col">
                          <span class="text-dimmed text-xs">Duration</span>
                          <span class="font-medium">{{ Number(record.duration).toFixed(2) }}</span>
                      </div>
                      <div class="flex flex-col">
                          <span class="text-dimmed text-xs">Total Deduction</span>
                          <span :class="getTotalDeduction(record) > 0 ? 'font-bold text-error-500' : 'font-medium'">{{ getTotalDeduction(record).toFixed(2) }}</span>
                      </div>
                  </div>
              </UCard>
              <div v-if="evaluationDetailsData.length === 0" class="col-span-full flex items-center justify-center p-8">
                  <UEmpty
                      icon="i-lucide-calendar-search"
                      title="No daily records"
                      description="No daily time records found for this evaluation period."
                      variant="naked"
                  />
              </div>
          </div>

          <UCard v-else :ui="{ body: 'p-0 sm:p-0' }" class="shadow-sm">
            <UTable :data="evaluationDetailsData" :columns="evaluationDetailsColumns">
                <template #empty>
                    <UEmpty
                        icon="i-lucide-calendar-search"
                        title="No daily records"
                        description="No daily time records found for this evaluation period."
                        variant="naked"
                    />
                </template>
            </UTable>
          </UCard>
        </div>
      </template>
      <template #footer>
        <div class="flex items-center gap-2">
          <UButton :label="selectedEvaluation?.status === 'PENDING' ? 'Cancel' : 'Close'" variant="ghost" color="neutral" @click="isDrawerOpen = false" />
          <UButton v-if="selectedEvaluation?.status === 'PENDING'" label="Confirm" color="warning" @click="isModalOpen = true" />
        </div>
      </template>
    </UDrawer>
    <!-- confirmation modal -->
    <ConfirmModal
      v-model:open="isModalOpen"
      title="Confirmation"
      icon="i-lucide-triangle-alert"
      color="yellow"
      confirm-label="Yes, I Certify"
      cancel-label="Cancel"
      description="By confirming, I certify this timesheet is accurate and complete. It will be used for payroll computation, and no further changes can be made once submitted. False information may lead to disciplinary action."
      @confirm="handleConfirm"
    />
  </div>
</template>