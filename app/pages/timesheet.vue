<script setup lang="ts">
import { ref, h, resolveComponent } from 'vue'
import type { TabsItem, TableColumn } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')

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
  }
])

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

type TimeAdjustmentRecord = {
  dateApplied: string
  date: string
  timeIn: string
  timeOut: string
  duration: number
  status: string
}

const timeAdjustmentData = ref<TimeAdjustmentRecord[]>([])

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
        PRESENT: 'success',
        HOLIDAY: 'primary',
        WEEKEND: 'neutral',
        LWOP: 'error',
        'ON LEAVE': 'error'
      }
      return h(UBadge, { color: colorMap[status] || 'neutral', variant: 'subtle', size: 'sm', class: 'font-semibold text-[10px] tracking-wider' }, () => status)
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
</script>

<template>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
            <UPageCard title="Timesheet" description="Manage and monitor your daily time records."
                variant="naked" orientation="horizontal">
                <div class="flex justify-end gap-2 flex-1">
                </div>
            </UPageCard>
        </div>

        <UTabs v-model="activeTab" :content="false" :items="items" variant="link" class="w-full pb-[1px]" />

        <!-- tab: dtr -->
        <UTable v-if="activeTab === 'dtr'" :data="data" :columns="columns" sticky class="flex-1 scrollbar">
            <template #empty>
                <UEmpty icon="i-lucide-clock" title="No time records" description="There are no daily time records available for this period." variant="naked" />
            </template>
        </UTable>

        <!-- tab: time adjustment -->
        <UTable v-else-if="activeTab === 'time-adjustment'" :data="timeAdjustmentData" :columns="timeAdjustmentColumns" sticky class="flex-1 scrollbar">
            <template #empty>
                <UEmpty icon="i-lucide-calendar-check" title="No time adjustments" description="You haven't applied for any time adjustments yet." variant="naked" />
            </template>
        </UTable>
</template>