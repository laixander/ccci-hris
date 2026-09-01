<script setup lang="ts">
import { ref, h, resolveComponent } from 'vue'
import type { TabsItem, TableColumn, TableRow } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

definePageMeta({
    isTable: true,
})

const activeTab = ref('dtr')

const items = ref<TabsItem[]>([
  {
    label: 'Daily Time Record',
    icon: 'i-lucide-clock',
    value: 'dtr'
  },
  {
    label: 'Time Adjustment',
    icon: 'i-lucide-calendar-check',
    value: 'time-adjustment'
  },
  {
    label: 'Evaluation',
    icon: 'i-lucide-list-checks',
    value: 'evaluation'
  }
])

type TimesheetRecord = {
  day: number
  timeIn: string | null
  timeOut: string | null
  duration: number
  status: 'Present' | 'Holiday' | 'Weekend' | 'LWOP' | 'On Leave'
  overtime: number
  late: number
  undertime: number
  leave: number
  lwop: number
}

type TimeAdjustmentRecord = {
  dateApplied: string
  date: string
  timeIn: string
  timeOut: string
  duration: number
  status: string
}

type EvaluationRecord = {
  cutoffPeriod: string
  confirmedDate: string
  status: 'Pending' | 'Confirmed'
}

const timeAdjustmentData = ref<TimeAdjustmentRecord[]>([])

const data = ref<TimesheetRecord[]>([
  { day: 31, timeIn: null, timeOut: null, duration: 0, status: 'Holiday', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 30, timeIn: null, timeOut: null, duration: 0, status: 'Weekend', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 29, timeIn: null, timeOut: null, duration: 0, status: 'Weekend', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 28, timeIn: '07:21:00 AM', timeOut: '05:13:00 PM', duration: 9.87, status: 'Present', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 27, timeIn: '08:08:00 AM', timeOut: '05:01:00 PM', duration: 8.88, status: 'Present', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 26, timeIn: '08:06:00 AM', timeOut: '05:00:00 PM', duration: 8.90, status: 'Present', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 25, timeIn: '07:37:00 AM', timeOut: '05:01:00 PM', duration: 9.40, status: 'Present', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 24, timeIn: '08:04:00 AM', timeOut: '05:02:00 PM', duration: 8.97, status: 'Present', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 23, timeIn: null, timeOut: null, duration: 0, status: 'Weekend', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 22, timeIn: null, timeOut: null, duration: 0, status: 'Weekend', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 21, timeIn: null, timeOut: null, duration: 0, status: 'Holiday', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 20, timeIn: '07:57:00 AM', timeOut: '05:00:00 PM', duration: 9.05, status: 'Present', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 19, timeIn: '07:57:00 AM', timeOut: '05:00:00 PM', duration: 9.05, status: 'Present', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 18, timeIn: '07:31:00 AM', timeOut: '05:11:00 PM', duration: 9.67, status: 'Present', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 17, timeIn: null, timeOut: null, duration: 0, status: 'LWOP', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 8.00 },
  { day: 16, timeIn: null, timeOut: null, duration: 0, status: 'Weekend', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 15, timeIn: null, timeOut: null, duration: 0, status: 'Weekend', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 14, timeIn: '07:32:00 AM', timeOut: '05:23:00 PM', duration: 9.85, status: 'Present', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 13, timeIn: '08:06:00 AM', timeOut: '05:01:00 PM', duration: 8.92, status: 'Present', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 12, timeIn: '08:06:00 AM', timeOut: '05:02:00 PM', duration: 8.93, status: 'Present', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 11, timeIn: null, timeOut: null, duration: 0, status: 'On Leave', overtime: 0, late: 0, undertime: 0, leave: 8.00, lwop: 0 },
  { day: 10, timeIn: '07:30:00 AM', timeOut: '05:05:00 PM', duration: 9.58, status: 'Present', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 9, timeIn: null, timeOut: null, duration: 0, status: 'Weekend', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 8, timeIn: null, timeOut: null, duration: 0, status: 'Weekend', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 7, timeIn: '07:32:00 AM', timeOut: '05:08:00 PM', duration: 9.60, status: 'Present', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 6, timeIn: '07:55:00 AM', timeOut: '05:04:00 PM', duration: 9.15, status: 'Present', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 5, timeIn: '08:07:00 AM', timeOut: '05:00:00 PM', duration: 8.88, status: 'Present', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 4, timeIn: null, timeOut: null, duration: 0, status: 'On Leave', overtime: 0, late: 0, undertime: 0, leave: 8.00, lwop: 0 },
  { day: 3, timeIn: '08:08:00 AM', timeOut: '05:02:00 PM', duration: 8.90, status: 'Present', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 2, timeIn: null, timeOut: null, duration: 0, status: 'Weekend', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
  { day: 1, timeIn: null, timeOut: null, duration: 0, status: 'Weekend', overtime: 0, late: 0, undertime: 0, leave: 0, lwop: 0 },
])

const columns: TableColumn<TimesheetRecord>[] = [
  { accessorKey: 'day', header: 'Day' },
  { accessorKey: 'timeIn', header: 'Time In', cell: ({ row }) => row.getValue('timeIn') || '--:--' },
  { accessorKey: 'timeOut', header: 'Time Out', cell: ({ row }) => row.getValue('timeOut') || '--:--' },
  { accessorKey: 'duration', header: 'Duration', cell: ({ row }) => Number(row.getValue('duration')).toFixed(2) },
  { 
    accessorKey: 'status', 
    header: 'Status', 
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const colorMap: Record<string, any> = {
        Present: 'success',
        Holiday: 'primary',
        Weekend: 'neutral',
        LWOP: 'error',
        'On Leave': 'warning'
      }
      return h(UBadge, { color: colorMap[status] || 'neutral', variant: 'subtle' }, () => status)
    }
  },
  { accessorKey: 'overtime', header: 'Overtime', cell: ({ row }) => Number(row.getValue('overtime')).toFixed(2) },
  { accessorKey: 'late', header: 'Late', cell: ({ row }) => Number(row.getValue('late')).toFixed(2) },
  { accessorKey: 'undertime', header: 'Undertime', cell: ({ row }) => Number(row.getValue('undertime')).toFixed(2) },
  { accessorKey: 'leave', header: 'Leave', cell: ({ row }) => Number(row.getValue('leave')).toFixed(2) },
  { accessorKey: 'lwop', header: 'LWOP', cell: ({ row }) => Number(row.getValue('lwop')).toFixed(2) },
]

const timeAdjustmentColumns: TableColumn<TimeAdjustmentRecord>[] = [
  { accessorKey: 'dateApplied', header: 'Date Applied' },
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'timeIn', header: 'Time In' },
  { accessorKey: 'timeOut', header: 'Time Out' },
  { accessorKey: 'duration', header: 'Duration' },
  { accessorKey: 'status', header: 'Status' }
]

const evaluationData = ref<EvaluationRecord[]>([
  { cutoffPeriod: 'August 14, 2026 – August 27, 2026', confirmedDate: 'Not yet confirmed', status: 'Pending' },
  { cutoffPeriod: 'July 31, 2026 – August 13, 2026', confirmedDate: 'August 14, 2026 at 11:58 AM', status: 'Confirmed' },
  { cutoffPeriod: 'July 15, 2026 – July 30, 2026', confirmedDate: 'August 05, 2026 at 08:37 AM', status: 'Confirmed' },
  { cutoffPeriod: 'June 30, 2026 – July 14, 2026', confirmedDate: 'August 05, 2026 at 08:37 AM', status: 'Confirmed' },
  { cutoffPeriod: 'June 15, 2026 – June 29, 2026', confirmedDate: 'July 03, 2026 at 07:36 AM', status: 'Confirmed' },
  { cutoffPeriod: 'May 29, 2026 – June 12, 2026', confirmedDate: 'June 11, 2026 at 06:30 PM', status: 'Confirmed' },
  { cutoffPeriod: 'May 15, 2026 – May 28, 2026', confirmedDate: 'May 29, 2026 at 11:36 AM', status: 'Confirmed' },
  { cutoffPeriod: 'April 30, 2026 – May 14, 2026', confirmedDate: 'May 29, 2026 at 11:36 AM', status: 'Confirmed' },
  { cutoffPeriod: 'April 15, 2026 – April 29, 2026', confirmedDate: 'May 11, 2026 at 09:49 AM', status: 'Confirmed' },
  { cutoffPeriod: 'March 31, 2026 – April 14, 2026', confirmedDate: 'April 30, 2026 at 08:26 AM', status: 'Confirmed' },
])

const evaluationColumns: TableColumn<EvaluationRecord>[] = [
  { accessorKey: 'cutoffPeriod', header: 'Cut-off Period' },
  { accessorKey: 'confirmedDate', header: 'Confirmed Date' },
  { 
    accessorKey: 'status', 
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const color = status === 'Confirmed' ? 'success' : 'warning';
      return h(UBadge, { color, variant: 'subtle' }, () => status)
    }
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      return h(UButton, { label: 'Review', variant: 'soft', color: 'primary', size: 'xs', onclick: () => isDrawerOpen.value = true })
    }
  }
]

const month = ref(new Date().getMonth() + 1)
const year = ref(new Date().getFullYear())

const months = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
]

const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i)

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

const isDrawerOpen = ref(false)
const isModalOpen = ref(false)
const selectedEvaluation = ref<EvaluationRecord | null>(null)

function onSelect(e: Event, row: TableRow<EvaluationRecord>) {
  selectedEvaluation.value = row.original
  isDrawerOpen.value = true
}

const evaluationDetailsColumns: TableColumn<TimesheetRecord>[] = [
  { accessorKey: 'day', header: 'Date' },
  { accessorKey: 'timeIn', header: 'Time-in', cell: ({ row }) => row.getValue('timeIn') || '--' },
  { accessorKey: 'timeOut', header: 'Time-out', cell: ({ row }) => row.getValue('timeOut') || '--' },
  { 
    accessorKey: 'status', 
    header: 'Status', 
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const colorMap: Record<string, any> = {
        Present: 'success',
        Holiday: 'error',
        Weekend: 'neutral',
        LWOP: 'error',
        'On Leave': 'warning'
      }
      return h(UBadge, { color: colorMap[status] || 'neutral', variant: 'subtle' }, () => status)
    }
  },
  { accessorKey: 'duration', header: 'Duration', cell: ({ row }) => Number(row.getValue('duration')).toFixed(2) },
  { accessorKey: 'late', header: 'Late', cell: ({ row }) => Number(row.getValue('late')).toFixed(2) },
  { accessorKey: 'undertime', header: 'Undertime', cell: ({ row }) => Number(row.getValue('undertime')).toFixed(2) },
  { accessorKey: 'lwop', header: 'LWOP', cell: ({ row }) => Number(row.getValue('lwop')).toFixed(2) },
  { accessorKey: 'overtime', header: 'Overtime', cell: ({ row }) => Number(row.getValue('overtime')).toFixed(2) },
  { accessorKey: 'leave', header: 'VL Deductions', cell: ({ row }) => Number(row.getValue('leave')).toFixed(2) },
]

const evaluationDetailsData = computed(() => {
  const allowedDays = [14, 17, 18, 19, 20, 21, 24, 25, 26, 27]
  return data.value.filter(d => allowedDays.includes(d.day)).sort((a, b) => a.day - b.day)
})
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
      <UPageCard title="Timesheet Management" description="Review and evaluate your daily time records."
          variant="naked" orientation="horizontal">
          <div class="flex justify-end gap-2 flex-1">
          </div>
      </UPageCard>
      <div v-if="activeTab === 'dtr'" class="flex gap-2">
        <USelect v-model="month" :items="months" class="w-40" />
        <USelect v-model="year" :items="years" class="w-32" />
      </div>
      <div v-else-if="activeTab === 'evaluation'" class="flex gap-2">
        <USelect :items="cutoffs" placeholder="Select Cut-off" class="w-72" />
      </div>
      <!-- <UButton label="Apply for Time Adjustment" variant="subtle" color="neutral" icon="i-lucide-calendar-check" /> -->
  </div>

  <UTabs v-model="activeTab" :content="false" :items="items" variant="link" class="w-full pb-[1px]" />

  <!-- tab: dtr -->
  <UTable v-if="activeTab === 'dtr'" :data="data" :columns="columns" sticky class="flex-1">
      <template #empty>
          <UEmpty icon="i-lucide-clock" title="No time records" description="There are no daily time records available for this period." variant="naked" />
      </template>
  </UTable>

  <!-- tab: time adjustment -->
  <UTable v-else-if="activeTab === 'time-adjustment'" :data="timeAdjustmentData" :columns="timeAdjustmentColumns" sticky class="flex-1">
      <template #empty>
          <UEmpty icon="i-lucide-calendar-check" title="No time adjustments" description="You haven't applied for any time adjustments yet." variant="naked" />
      </template>
  </UTable>

  <!-- tab: evaluation -->
  <UTable v-else-if="activeTab === 'evaluation'" :data="evaluationData" :columns="evaluationColumns" sticky class="flex-1" @select="onSelect">
      <template #empty>
          <UEmpty icon="i-lucide-calendar-check" title="No evaluations" description="There are no evaluations available for this period." variant="naked" />
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

        <UCard :ui="{ body: 'p-0 sm:p-0' }" class="shadow-sm">
          <UTable :data="evaluationDetailsData" :columns="evaluationDetailsColumns" />
        </UCard>


      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton label="Cancel" variant="ghost" color="neutral" @click="isDrawerOpen = false" />
        <UButton label="Confirm" variant="subtle" color="warning" @click="isModalOpen = true" />
      </div>
    </template>
  </UDrawer>
  <!-- confirmation modal -->
  <ConfirmModal
    v-model:open="isModalOpen"
    title="Confirmation"
    icon="i-lucide-triangle-alert"
    color="warning"
    confirm-label="Confirm"
    cancel-label="Cancel"
    description="By clicking 'Confirm', I hereby certify that the information provided in my timesheet is true, accurate, and complete to the best of my knowledge and belief. I understand that this timesheet will serve as the basis for payroll computation, and that no further corrections will be entertained after submission. I also acknowledge that any false or misleading information may be subject to disciplinary action in accordance with company policies."
    @confirm="isModalOpen = false; isDrawerOpen = false"
  />
</template>