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

const isDrawerOpen = ref(false)
const isModalOpen = ref(false)
const selectedEvaluation = ref<EvaluationRecord | null>(null)
const viewMode = ref<'grid' | 'table'>('grid')

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
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
        <UPageCard title="Evaluations" description="Review and evaluate your daily time records."
            variant="naked" orientation="horizontal" class="w-full">
            <div class="flex justify-end gap-2 flex-1">
              <UFieldGroup>
                <UButton icon="i-lucide-layout-grid" color="neutral" :variant="viewMode === 'grid' ? 'subtle' : 'outline'" @click="viewMode = 'grid'" />
                <UButton icon="i-lucide-list" color="neutral" :variant="viewMode === 'table' ? 'subtle' : 'outline'" @click="viewMode = 'table'" />
              </UFieldGroup>
              <USelect :items="cutoffs" placeholder="Select Cut-off" class="w-72" />
            </div>
        </UPageCard>
    </div>
    
    <USeparator />

    <div v-if="viewMode === 'grid'" class="flex-1 flex flex-col p-4">
        <div v-if="evaluationData.length === 0" class="flex-1 flex items-center justify-center">
            <UEmpty icon="i-lucide-calendar-check" title="No evaluations" description="There are no evaluations available for this period." variant="naked" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <UCard v-for="evaluation in evaluationData" :key="evaluation.cutoffPeriod" class="shadow-sm cursor-pointer group hover:ring-1 hover:ring-primary/40 transition-all" :ui="{ body: 'sm:p-4 space-y-4 group-hover:bg-linear-to-tl group-hover:from-primary/10 group-hover:from-5% group-hover:to-default transition-all duration-300 ease-out' }" @click="selectedEvaluation = evaluation; isDrawerOpen = true">
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

    <UTable v-else :data="evaluationData" :columns="evaluationColumns" class="flex-1" />

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

          <UCard :ui="{ body: 'p-0 sm:p-0' }" class="shadow-sm">
            <UTable :data="evaluationDetailsData" :columns="evaluationDetailsColumns" />
          </UCard>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
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