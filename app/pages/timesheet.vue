<script setup lang="ts">
import { ref, computed, h, resolveComponent, watch, nextTick } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UButton = resolveComponent('UButton')
const StatusBadge = resolveComponent('StatusBadge')

definePageMeta({
    isTable: true,
})

import type { TimesheetRecord, TimeAdjustmentRecord } from '~~/app/types'
// ─── State ───────────────────────────────────────────────────────────────────

const isDrawerOpen = ref(false)
const isModalOpen = ref(false)
const selectedRecord = ref<TimesheetRecord | null>(null)
const viewMode = ref<'calendar' | 'week' | 'table'>('calendar')
const selectedWeekIndex = ref(0)

const { register } = useOverlayVisibility()
register(isDrawerOpen)
register(isModalOpen)

const month = ref(new Date().getMonth() + 1)
const year = ref(new Date().getFullYear())

// ─── Data ────────────────────────────────────────────────────────────────────

const { data: timesheetResponse } = useLazyFetch<{
  records: TimesheetRecord[]
  adjustments: TimeAdjustmentRecord[]
}>('/api/timesheet')

const data = computed(() => timesheetResponse.value?.records || [])
const timeAdjustmentData = computed(() => timesheetResponse.value?.adjustments || [])

// Month/year the above data belongs to — update when fetching from API
const dataMonth = ref(8)  // August
const dataYear = ref(2026)

// ─── Table Columns ────────────────────────────────────────────────────────────

const columns: TableColumn<TimesheetRecord>[] = [
  { accessorKey: 'day', header: 'Day' },
  { accessorKey: 'timeIn', header: 'Time In', cell: ({ row }) => row.getValue('timeIn') || '--:--' },
  { accessorKey: 'timeOut', header: 'Time Out', cell: ({ row }) => row.getValue('timeOut') || '--:--' },
  { accessorKey: 'duration', header: 'Duration', meta: { class: { th: 'text-right', td: 'text-right font-medium text-neutral-600 dark:text-neutral-400' } }, cell: ({ row }) => Number(row.getValue('duration')).toFixed(2) },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h(StatusBadge, { status: row.getValue('status') as string })
  },
  { accessorKey: 'overtime', header: 'Overtime', meta: { class: { th: 'text-right', td: 'text-right' } }, cell: ({ row }) => Number(row.getValue('overtime')).toFixed(2) },
  { accessorKey: 'late', header: 'Late', meta: { class: { th: 'text-right', td: 'text-right' } }, cell: ({ row }) => Number(row.getValue('late')).toFixed(2) },
  { accessorKey: 'undertime', header: 'Undertime', meta: { class: { th: 'text-right', td: 'text-right' } }, cell: ({ row }) => Number(row.getValue('undertime')).toFixed(2) },
  { accessorKey: 'leave', header: 'Leave', meta: { class: { th: 'text-right', td: 'text-right' } }, cell: ({ row }) => Number(row.getValue('leave')).toFixed(2) },
  { accessorKey: 'lwop', header: 'LWOP', meta: { class: { th: 'text-right', td: 'text-right' } }, cell: ({ row }) => Number(row.getValue('lwop')).toFixed(2) },
  {
    id: 'actions',
    header: '',
    meta: { class: { th: 'text-right', td: 'text-right' } },
    cell: ({ row }) => h(UButton, {
      icon: 'i-lucide-edit-3',
      size: 'sm',
      variant: 'ghost',
      color: 'neutral',
      onClick: () => {
        selectedRecord.value = row.original
        isModalOpen.value = true
      }
    })
  }
]

// ─── Calendar ─────────────────────────────────────────────────────────────────

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

type CalendarCell = {
  day: number
  date: Date
  isToday: boolean
  isWeekend: boolean
  record: TimesheetRecord | undefined
} | null

const calendarDays = computed<CalendarCell[]>(() => {
  const y = year.value
  const m = month.value // 1-based

  const today = new Date()
  const daysInMonth = new Date(y, m, 0).getDate()       // last day of month
  const firstDayOfWeek = new Date(y, m - 1, 1).getDay() // 0=Sun … 6=Sat

  const cells: CalendarCell[] = []

  // Leading empty cells so day-1 lands in the correct column
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push(null)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(y, m - 1, day)
    const dow = date.getDay()
    cells.push({
      day,
      date,
      isToday: today.getFullYear() === y && today.getMonth() + 1 === m && today.getDate() === day,
      isWeekend: dow === 0 || dow === 6,
      record: (month.value === dataMonth.value && year.value === dataYear.value)
        ? data.value.find(r => r.day === day)
        : undefined,
    })
  }

  // Trailing empty cells so the grid always has complete rows
  const remainder = cells.length % 7
  if (remainder !== 0) {
    for (let i = 0; i < 7 - remainder; i++) {
      cells.push(null)
    }
  }

  return cells
})

const calendarWeeks = computed(() => {
  const weeks = []
  for (let i = 0; i < calendarDays.value.length; i += 7) {
    weeks.push(calendarDays.value.slice(i, i + 7))
  }
  return weeks
})

watch([month, year], () => {
  selectedWeekIndex.value = 0
})

// ─── Months / Years ───────────────────────────────────────────────────────────

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

// Only expose records to the table when the selected month/year matches the loaded data
const tableData = computed(() =>
  month.value === dataMonth.value && year.value === dataYear.value ? data.value : []
)

// ─── Sticky table refs ────────────────────────────────────────────────────────

const container = useTemplateRef('container')
const header = useTemplateRef('header')
const getScrollElement = () => container.value
const { height: headerHeight } = useElementSize(header, undefined, { box: 'border-box' })

function prevMonth() {
  if (month.value === 1) {
    month.value = 12
    year.value--
  } else {
    month.value--
  }
}

function nextMonth() {
  if (month.value === 12) {
    month.value = 1
    year.value++
  } else {
    month.value++
  }
}

function prevWeek() {
  if (selectedWeekIndex.value > 0) {
    selectedWeekIndex.value--
  } else {
    prevMonth()
    nextTick(() => {
      selectedWeekIndex.value = calendarWeeks.value.length - 1
    })
  }
}

function nextWeek() {
  if (selectedWeekIndex.value < calendarWeeks.value.length - 1) {
    selectedWeekIndex.value++
  } else {
    nextMonth()
    selectedWeekIndex.value = 0
  }
}
</script>

<template>
  <div ref="container" class="flex flex-col flex-1 overflow-y-auto scrollbar">

    <!-- Header ────────────────────────────────────────────────────────────── -->
    <div ref="header">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
        <UPageCard
          title="Timesheet Management"
          description="Review and evaluate your daily time records."
          variant="naked"
          orientation="horizontal"
          class="w-full"
          :ui="{
            title: 'text-2xl font-bold'
          }"
        >
          <div class="flex justify-end gap-2 flex-1">
            <UFieldGroup>
              <UButton
                icon="i-lucide-calendar"
                color="neutral"
                :variant="viewMode === 'calendar' ? 'subtle' : 'outline'"
                @click="viewMode = 'calendar'"
              />
              <UButton
                icon="i-lucide-columns-3"
                color="neutral"
                :variant="viewMode === 'week' ? 'subtle' : 'outline'"
                @click="viewMode = 'week'"
              />
              <UButton
                icon="i-lucide-list"
                color="neutral"
                :variant="viewMode === 'table' ? 'subtle' : 'outline'"
                @click="viewMode = 'table'"
              />
            </UFieldGroup>
            <div class="flex gap-2">
              <USelect v-model="month" :items="months" class="w-32" />
              <USelect v-model="year" :items="years" class="w-24" />
            </div>
            <UButton variant="soft" color="neutral" @click="isDrawerOpen = true">
              <UIcon name="i-lucide-clipboard-list" class="size-4" />
              Adjustments List
            </UButton>
          </div>
        </UPageCard>
      </div>
      <USeparator />
    </div>

    <!-- Calendar view ─────────────────────────────────────────────────────── -->
    <template v-if="viewMode === 'calendar'">
      <div class="flex items-center justify-between p-4">
        <UButton square color="neutral" variant="ghost" @click="prevMonth">
          <UIcon name="i-lucide-chevron-left" class="size-4" />
        </UButton>
        <p class="text-lg font-semibold text-toned">{{ months.find(m => m.value === month)?.label }} {{ year }}</p>
        <UButton square color="neutral" variant="ghost" @click="nextMonth">
          <UIcon name="i-lucide-chevron-right" class="size-4" />
        </UButton>
      </div>
      <USeparator />
      <div class="flex-1 flex flex-col overflow-x-auto scrollbar">
        <div class="flex flex-col flex-1 min-w-[800px]">
          <!-- Day-of-week header -->
      <div class="grid grid-cols-7 gap-px bg-[var(--ui-border)] shrink-0 border-b border-[var(--ui-border)]">
        <div
          v-for="wd in WEEK_DAYS"
          :key="wd"
          class="bg-[var(--ui-bg)] py-2 text-center text-xs font-medium"
          :class="wd === 'Sun' || wd === 'Sat' ? 'text-dimmed' : 'text-toned'"
        >
          {{ wd }}
        </div>
      </div>

      <!-- Calendar grid -->
      <div class="grid grid-cols-7 gap-px bg-[var(--ui-border)] flex-1 auto-rows-fr">
        <div
          v-for="(cell, idx) in calendarDays"
          :key="idx"
          class="p-2 flex flex-col transition-colors group relative"
          :class="[
            !cell
              ? 'bg-[var(--ui-bg)]'
              : cell.isWeekend
                ? 'bg-[var(--ui-bg)] cursor-default'
                : 'bg-[var(--ui-bg)] hover:bg-primary/5 cursor-pointer',
          ]"
          @click="if (cell && !cell.isWeekend && cell.record) { selectedRecord = cell.record; isModalOpen = true }"
        >
          <template v-if="cell">
            <!-- Day number -->
            <div class="flex items-center justify-between mb-1">
              <span
                class="text-sm font-medium leading-none w-6 h-6 flex items-center justify-center rounded-full"
                :class="[
                  cell.isToday
                    ? 'bg-primary text-white font-bold'
                    : cell.isWeekend
                      ? 'text-dimmed'
                      : 'text-highlighted',
                ]"
              >
                {{ cell.day }}
              </span>
            </div>

            <!-- Record content -->
            <template v-if="cell.record">
              <div class="flex flex-col gap-0.5 mt-1">
                <div class="text-[10px] flex items-center gap-1 text-dimmed whitespace-nowrap">
                  <UIcon name="i-lucide-log-in" class="size-3 shrink-0" />
                  {{ cell.record.timeIn || '--:--' }}
                </div>
                <div class="text-[10px] flex items-center gap-1 text-dimmed whitespace-nowrap">
                  <UIcon name="i-lucide-log-out" class="size-3 shrink-0" />
                  {{ cell.record.timeOut || '--:--' }}
                </div>
              </div>
              <div class="mt-auto pt-1 flex items-center justify-between">
                <StatusBadge :status="cell.record.status" />
                <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                  <UButton
                    icon="i-lucide-edit-3"
                    size="xs"
                    color="primary"
                    variant="ghost"
                    @click.stop="selectedRecord = cell.record!; isModalOpen = true"
                  />
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
        </div>
      </div>
    </template>

    <!-- Week view ─────────────────────────────────────────────────────────── -->
    <template v-else-if="viewMode === 'week'">
      <div class="flex items-center justify-between p-4">
        <UButton square color="neutral" variant="ghost" @click="prevWeek">
          <UIcon name="i-lucide-chevron-left" class="size-4" />
        </UButton>
        <p class="text-lg font-semibold text-toned">
          Week {{ selectedWeekIndex + 1 }} of {{ months.find(m => m.value === month)?.label }} {{ year }}
        </p>
        <UButton square color="neutral" variant="ghost" @click="nextWeek">
          <UIcon name="i-lucide-chevron-right" class="size-4" />
        </UButton>
      </div>
      <USeparator />
      <div class="flex-1 flex flex-col overflow-x-auto scrollbar">
        <div class="flex flex-col flex-1 min-w-[1200px]">
          <!-- Day-of-week header -->
      <div class="grid grid-cols-7 gap-px bg-[var(--ui-border)] shrink-0 border-b border-[var(--ui-border)]">
        <div
          v-for="wd in WEEK_DAYS"
          :key="wd"
          class="bg-[var(--ui-bg)] py-2 text-center text-xs font-medium"
          :class="wd === 'Sun' || wd === 'Sat' ? 'text-dimmed' : 'text-toned'"
        >
          {{ wd }}
        </div>
      </div>

      <!-- Week grid -->
      <div class="grid grid-cols-7 gap-px bg-[var(--ui-border)] flex-1">
        <div
          v-for="(cell, idx) in (calendarWeeks[selectedWeekIndex] || [])"
          :key="idx"
          class="p-4 flex flex-col transition-colors group relative h-full"
          :class="[
            !cell
              ? 'bg-[var(--ui-bg)]'
              : cell.isWeekend
                ? 'bg-[var(--ui-bg)] cursor-default'
                : 'bg-[var(--ui-bg)] hover:bg-primary/5 cursor-pointer',
          ]"
          @click="if (cell && !cell.isWeekend && cell.record) { selectedRecord = cell.record; isModalOpen = true }"
        >
          <template v-if="cell">
            <!-- Day number -->
            <div class="flex items-center justify-between mb-4">
              <span
                class="text-sm font-medium leading-none w-8 h-8 flex items-center justify-center rounded-full"
                :class="[
                  cell.isToday
                    ? 'bg-primary text-white font-bold'
                    : cell.isWeekend
                      ? 'text-dimmed'
                      : 'text-highlighted',
                ]"
              >
                {{ cell.day }}
              </span>
            </div>

            <!-- Record content -->
            <template v-if="cell.record">
              <div class="flex flex-col gap-2">
                <div class="text-sm flex items-center gap-2 text-toned whitespace-nowrap">
                  <UIcon name="i-lucide-log-in" class="size-4 shrink-0 text-dimmed" />
                  {{ cell.record.timeIn || '--:--' }}
                </div>
                <div class="text-sm flex items-center gap-2 text-toned whitespace-nowrap">
                  <UIcon name="i-lucide-log-out" class="size-4 shrink-0 text-dimmed" />
                  {{ cell.record.timeOut || '--:--' }}
                </div>
              </div>
              
              <USeparator class="my-4" />
              
              <div class="flex flex-col gap-2">
                 <div class="flex justify-between items-center text-sm">
                   <span class="text-dimmed">Duration</span>
                   <span class="font-medium text-toned">{{ cell.record.duration > 0 ? cell.record.duration.toFixed(2) + 'h' : '-' }}</span>
                 </div>
                 <div class="flex justify-between items-center text-sm" v-if="cell.record.overtime > 0">
                   <span class="text-dimmed">Overtime</span>
                   <span class="font-medium text-warning">{{ cell.record.overtime.toFixed(2) + 'h' }}</span>
                 </div>
              </div>
              
              <div class="mt-auto pt-4 flex items-center justify-between">
                <StatusBadge :status="cell.record.status" />
                <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                  <UButton
                    icon="i-lucide-edit-3"
                    size="sm"
                    color="primary"
                    variant="ghost"
                    @click.stop="selectedRecord = cell.record!; isModalOpen = true"
                  />
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
        </div>
      </div>
    </template>

    <!-- Table view ────────────────────────────────────────────────────────── -->
    <UTable
      v-else
      :data="tableData"
      :columns="columns"
      sticky
      class="flex-1"
      :virtualize="{ scrollMargin: headerHeight, getScrollElement }"
    >
      <template #empty>
        <UEmpty
          icon="i-lucide-clock"
          title="No time records"
          description="There are no daily time records available for this period."
          variant="naked"
        />
      </template>
    </UTable>

  </div>

  <!-- Drawer: Time Adjustments ──────────────────────────────────────────────── -->
  <UDrawer
    v-model:open="isDrawerOpen"
    direction="right"
    title="Time Adjustments"
    inset
    close
    class="w-full max-w-[572px]"
    :ui="{ container: 'pr-0', header: 'pr-4', footer: 'pr-4', body: 'pr-4 overflow-y-auto scrollbar' }"
  >
    <template #body>
      <div class="flex-1 min-h-0 overflow-y-auto p-[1px] scrollbar">
        <UCard class="shadow-sm" :ui="{ body: 'p-0 sm:p-0' }">
          <div class="divide-y divide-[var(--ui-border)]">
            <div v-for="(entry, index) in timeAdjustmentData" :key="index" class="p-4 space-y-4">
              <div class="flex justify-between items-start">
                <div>
                  <div class="text-sm font-semibold text-highlighted">Adjustment for {{ entry.date }}</div>
                  <div class="text-xs text-dimmed">Applied on {{ entry.dateApplied }}</div>
                </div>
                <StatusBadge :status="entry.status" />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <div class="text-xs text-dimmed mb-2 font-medium">Current (Recorded)</div>
                  <div class="flex items-center gap-2 text-sm">
                    <div class="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md text-toned">
                      <UIcon name="i-lucide-clock" class="size-3.5 text-warning" />
                      <span>{{ entry.currentTimeIn }}</span>
                    </div>
                    <span class="text-dimmed">&mdash;</span>
                    <div class="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md text-toned">
                      <UIcon name="i-lucide-clock" class="size-3.5 text-warning" />
                      <span>{{ entry.currentTimeOut }}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="text-xs text-dimmed mb-2 font-medium">Adjusted (Requested)</div>
                  <div class="flex items-center gap-2 text-sm">
                    <div class="flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-md text-primary">
                      <UIcon name="i-lucide-clock" class="size-3.5" />
                      <span>{{ entry.timeIn }}</span>
                    </div>
                    <span class="text-dimmed">&mdash;</span>
                    <div class="flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-md text-primary">
                      <UIcon name="i-lucide-clock" class="size-3.5" />
                      <span>{{ entry.timeOut }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </template>
  </UDrawer>

  <!-- Modal: Time Adjustment ────────────────────────────────────────────────── -->
  <ApplyTimeAdjustmentModal
    v-model:open="isModalOpen"
    :record="selectedRecord"
    :month-label="months.find(m => m.value === month)?.label"
    :year="year"
  />
</template>