<script setup lang="ts">
import { h, resolveComponent, computed } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { LedgerEntry } from '~~/app/types'

definePageMeta({
    isTable: true,
})

const UAvatar = resolveComponent('UAvatar')

// ─── Data ─────────────────────────────────────────────────────────────────────
const { data } = useLazyFetch('/api/leaves')

const kpis = computed(() => data.value?.kpis ?? [])
const leaves = computed(() => data.value?.leaves ?? [])
const ledgerData = computed(() => data.value?.ledger ?? [])

// ─── Table columns ────────────────────────────────────────────────────────────
const columns = [
  { accessorKey: 'dateApplied', header: 'Date Applied' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'start', header: 'Start' },
  { accessorKey: 'end', header: 'End' },
  { accessorKey: 'duration', header: 'Duration' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'approvers', header: 'Approvers' }
]

// ─── State ────────────────────────────────────────────────────────────────────
const container = useTemplateRef('container')
const header = useTemplateRef('header')
const getScrollElement = () => container.value

const { height: headerHeight } = useElementSize(header, undefined, { box: 'border-box' })

const isDrawerOpen = ref(false)
const isModalOpen = ref(false)
const viewMode = ref<'grid' | 'table' | 'month'>('table')

const { register } = useOverlayVisibility()
register(isDrawerOpen)
register(isModalOpen)

const search = ref('')
const selectedType = ref('All Categories')
const status = ref('All Status')
const period = ref('Monthly')
const month = ref(new Date().getMonth() + 1)
const year = ref(new Date().getFullYear())
const quarter = ref(Math.ceil((new Date().getMonth() + 1) / 3))

const months = Array.from({ length: 12 }, (_, i) => ({
    label: new Date(0, i, 1).toLocaleString('default', { month: 'long' }),
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

const requestTypes = computed(() => [
    'All Categories',
    ...new Set(leaves.value.map(s => s.type))
])

const filteredLeaves = computed(() => {
    return leaves.value.filter(s => {
        // Search
        const matchesSearch = s.type.toLowerCase().includes(search.value.toLowerCase()) ||
                              s.status.toLowerCase().includes(search.value.toLowerCase())
                              
        // Category
        const matchesType = selectedType.value === 'All Categories' || s.type === selectedType.value
        
        // Status
        const matchesStatus = status.value === 'All Status' || s.status.toUpperCase() === status.value.toUpperCase()
        
        // Period
        const itemDate = new Date(s.start)
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
        
        return matchesSearch && matchesType && matchesStatus && matchesPeriod
    })
})

// ─── Calendar ────────────────────────────────────────────────────────────

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const calendarDays = computed(() => {
  const y = year.value
  const m = month.value
  const today = new Date()
  const daysInMonth = new Date(y, m, 0).getDate()
  const firstDayOfWeek = new Date(y, m - 1, 1).getDay()

  const cells = []

  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null)

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(y, m - 1, day)
    const dow = date.getDay()
    // Find leaves that cover this day
    const dayLeaves = leaves.value.filter(l => {
      const start = new Date(l.start)
      const end = new Date(l.end)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      const d = new Date(y, m - 1, day)
      return d >= start && d <= end
    })
    cells.push({
      day,
      date,
      isToday: today.getFullYear() === y && today.getMonth() + 1 === m && today.getDate() === day,
      isWeekend: dow === 0 || dow === 6,
      leaves: dayLeaves,
    })
  }

  const remainder = cells.length % 7
  if (remainder !== 0) {
    for (let i = 0; i < 7 - remainder; i++) cells.push(null)
  }

  return cells
})

const leaveTypeColor: Record<string, string> = {
  'Sick Leave':         'bg-rose-500/15 text-rose-600 dark:text-rose-400',
  'Vacation Leave':     'bg-sky-500/15 text-sky-600 dark:text-sky-400',
  'Birthday Leave':     'bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400',
  'Emergency Leave':    'bg-orange-500/15 text-orange-600 dark:text-orange-400',
  'Maternity Leave':    'bg-pink-500/15 text-pink-600 dark:text-pink-400',
  'Paternity Leave':    'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
  'Bereavement Leave':  'bg-stone-500/15 text-stone-600 dark:text-stone-400',
}

function getLeaveColor(type: string) {
  return leaveTypeColor[type] ?? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
}

function prevMonth() {
  if (month.value === 1) { month.value = 12; year.value-- }
  else { month.value-- }
}

function nextMonth() {
  if (month.value === 12) { month.value = 1; year.value++ }
  else { month.value++ }
}

</script>

<template>
  <div ref="container" class="flex flex-col flex-1 overflow-y-auto scrollbar">
    <div ref="header">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
        <UPageCard title="Leave Management" description="Request and manage your leaves"
            variant="naked" orientation="horizontal" class="w-full" :ui="{
                    title: 'text-2xl font-bold'
                }">
            <div class="flex justify-end gap-2 flex-1">
              <UFieldGroup>
                <UButton icon="i-lucide-list" color="neutral" :variant="viewMode === 'table' ? 'subtle' : 'outline'" @click="viewMode = 'table'" />
                <UButton icon="i-lucide-layout-grid" color="neutral" :variant="viewMode === 'grid' ? 'subtle' : 'outline'" @click="viewMode = 'grid'" />
                <UButton icon="i-lucide-calendar-days" color="neutral" :variant="viewMode === 'month' ? 'subtle' : 'outline'" @click="viewMode = 'month'" />
              </UFieldGroup>
              <UButton variant="soft" @click="isDrawerOpen = true">
                <UIcon name="i-lucide-clipboard-list" class="size-4" />
                Open Ledger
              </UButton>
              <UButton @click="isModalOpen = true">
                <UIcon name="i-lucide-edit" class="size-4" />
                Request Leave
              </UButton>
            </div>
        </UPageCard>
      </div>

      <!-- Search & filter -->
      <div v-if="viewMode !== 'month'" class="flex items-center gap-3 px-4 pb-4">
          <UInput
              v-model="search"
              placeholder="Search by type or status..."
              icon="i-lucide-search"
              class="flex-1"
          />
          <USelect v-model="selectedType" :items="requestTypes" class="w-48" />
          <USelect v-model="status" :items="['All Status', 'Pending', 'Approved', 'Rejected']" class="w-32" />
          <USelect v-model="period" :items="['Monthly', 'Quarterly', 'Yearly']" class="w-32" />
          <USelect v-if="period === 'Monthly'" v-model="month" :items="months" class="w-32" />
          <USelect v-if="period === 'Quarterly'" v-model="quarter" :items="quarters" class="w-24" />
          <USelect v-model="year" :items="years" class="w-24" />
      </div>

      <div v-if="viewMode !== 'month'" class="flex gap-3 px-4 pb-4">
          <UCard v-for="(kpi, index) in kpis" :key="index" class="shadow-sm flex-1" :ui="{ body: 'sm:p-4' }">
              <div class="flex items-center gap-3">
                  <div class="rounded-lg p-2 shrink-0 flex" :class="kpi.bg">
                      <UIcon :name="kpi.icon" class="size-5" :class="kpi.color" />
                  </div>
                  <div class="min-w-0">
                      <div class="text-xs text-dimmed truncate">{{ kpi.label }}</div>
                      <div class="flex items-baseline gap-1.5">
                          <span class="text-xl font-bold leading-tight">{{ kpi.value }}</span>
                          <span class="text-[10px] font-semibold text-dimmed/70 uppercase tracking-wider">{{ kpi.sublabel }}</span>
                      </div>
                  </div>
              </div>
          </UCard>
      </div>

      <USeparator />
    </div>

    <div v-if="viewMode === 'grid'" class="flex-1 flex flex-col p-4">
        <div v-if="filteredLeaves.length === 0" class="flex-1 flex items-center justify-center">
            <UEmpty
                icon="i-lucide-calendar-x"
                title="No leave requests"
                description="No leave records found for the selected period."
                variant="naked"
            />
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            <UCard v-for="leave in filteredLeaves" :key="leave.id" class="flex flex-col shadow-sm" :ui="{ body: 'flex flex-col h-full gap-4 sm:p-4' }">
                <div class="flex items-start justify-between gap-2">
                    <div class="space-y-0.5">
                        <div class="font-semibold text-highlighted">{{ leave.type }}</div>
                        <div class="text-xs text-dimmed">{{ leave.dateApplied }}</div>
                    </div>
                    <StatusBadge :status="leave.status" />
                </div>
                
                <div class="grid grid-cols-2 gap-2 text-sm bg-muted dark:bg-muted/30 p-3 rounded-md">
                    <div>
                        <div class="text-xs text-dimmed mb-0.5">Start</div>
                        <div class="font-medium">{{ leave.start }}</div>
                    </div>
                    <div>
                        <div class="text-xs text-dimmed mb-0.5">End</div>
                        <div class="font-medium">{{ leave.end }}</div>
                    </div>
                    <USeparator class="col-span-2" />
                    <div class="col-span-2">
                        <div class="text-xs text-dimmed mb-0.5">Duration</div>
                        <div class="font-medium">{{ leave.duration }}</div>
                    </div>
                </div>

                <USeparator />
                
                <div class="mt-auto flex items-center justify-between">
                    <span class="text-xs text-dimmed font-medium uppercase tracking-wider">Approvers</span>
                    <UAvatarGroup :max="4" size="sm">
                        <UAvatar v-for="(approver, index) in leave.approvers" :key="index" :src="approver.src" :chip="{ inset: true, color: 'success', position: 'bottom-right', size: 'md' }" />
                    </UAvatarGroup>
                </div>
            </UCard>
        </div>
    </div>

    <!-- Month calendar view -->
    <template v-else-if="viewMode === 'month'">
      <div class="flex items-center justify-between p-4">
        <UButton square color="neutral" variant="ghost" @click="prevMonth">
          <UIcon name="i-lucide-chevron-left" class="size-4" />
        </UButton>
        <p class="text-lg font-semibold text-toned">
          {{ months.find(m => m.value === month)?.label }} {{ year }}
        </p>
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
              class="p-2 flex flex-col bg-[var(--ui-bg)]"
            >
              <template v-if="cell">
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
                <!-- Leave badges with popover -->
                <div class="flex flex-col gap-0.5 mt-0.5">
                  <UPopover
                    v-for="(leave, li) in cell.leaves.slice(0, 2)"
                    :key="li"
                    mode="click"
                    :content="{ align: 'start', side: 'right' }"
                  >
                    <UBadge
                      :label="leave.type"
                      variant="soft"
                      size="sm"
                      class="w-full truncate cursor-pointer text-[10px]"
                      :class="getLeaveColor(leave.type)"
                      :ui="{ base: 'justify-start' }"
                    />
                    <template #content>
                      <div class="p-3 w-auto space-y-2.5">
                        <div class="flex items-start justify-between gap-4">
                          <div class="space-y-0.5">
                            <div class="text-sm font-semibold text-highlighted">{{ leave.type }}</div>
                            <div class="text-xs text-dimmed whitespace-nowrap">{{ leave.dateApplied }}</div>
                          </div>
                          <StatusBadge :status="leave.status" />
                        </div>
                        <div class="grid grid-cols-2 gap-2 text-xs bg-muted/50 rounded-md p-2">
                          <div>
                            <div class="text-dimmed mb-0.5">Start</div>
                            <div class="font-medium text-toned whitespace-nowrap">{{ leave.start }}</div>
                          </div>
                          <div>
                            <div class="text-dimmed mb-0.5">End</div>
                            <div class="font-medium text-toned whitespace-nowrap">{{ leave.end }}</div>
                          </div>
                          <div class="col-span-2 pt-1 border-t border-[var(--ui-border)]">
                            <div class="text-dimmed mb-0.5">Duration</div>
                            <div class="font-medium text-toned">{{ leave.duration }}</div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </UPopover>
                  <div
                    v-if="cell.leaves.length > 2"
                    class="text-[10px] text-dimmed px-1 font-medium"
                  >
                    +{{ cell.leaves.length - 2 }} more
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>

    <UTable v-else :data="filteredLeaves" :columns="columns" sticky class="flex-1 min-h-0" :virtualize="{ scrollMargin: headerHeight, getScrollElement }">
        <template #status-cell="{ row }">
            <StatusBadge :status="row.original.status" />
        </template>
        <template #approvers-cell="{ row }">
            <UAvatarGroup :max="4" size="sm">
                <UAvatar v-for="(approver, index) in row.original.approvers" :key="index" :src="approver.src" :chip="{ inset: true, color: 'success', position: 'bottom-right', size: 'md' }" />
            </UAvatarGroup>
        </template>
        <template #empty>
            <UEmpty
                icon="i-lucide-calendar-x"
                title="No leave requests"
                description="No leave records found for the selected period."
                variant="naked"
            />
        </template>
    </UTable>
  </div>

  <UDrawer
  v-model:open="isDrawerOpen"
  direction="right"
  title="Leave Ledger"
  inset
  close
  class="w-full max-w-[460px]"
  :ui="{container: 'pr-0', header: 'pr-4', footer: 'pr-4', body: 'pr-4 overflow-y-auto scrollbar'}"
>
  <template #body>
    <div class="flex-1 min-h-0 overflow-y-auto p-[1px] scrollbar">
      <UCard
        class="shadow-sm"
        :ui="{ body: 'p-0 sm:p-0' }"
      >
        <div class="divide-y divide-[var(--ui-border)]">
          <div
            v-for="(entry, index) in ledgerData"
            :key="index"
            class="flex items-center gap-3 p-4 group"
          >
            <!-- Credit / Debit indicator -->
            <div
              class="shrink-0 size-9 rounded-full flex items-center justify-center"
              :class="entry.credit !== null ? 'bg-success-500/10' : 'bg-error-500/10'"
            >
              <UIcon
                :name="entry.credit !== null ? 'i-lucide-arrow-up-right' : 'i-lucide-arrow-down-left'"
                class="size-4"
                :class="entry.credit !== null ? 'text-success-500' : 'text-error-500'"
              />
            </div>

            <!-- Date + Type -->
            <div class="flex-1 min-w-0">
              <div class="text-xs font-semibold text-highlighted truncate">{{ entry.leaveType }}</div>
              <div class="text-xs text-dimmed truncate">{{ entry.date }}</div>
            </div>

            <!-- Amount -->
            <div class="text-right shrink-0">
              <div
                class="text-sm font-semibold tabular-nums"
                :class="entry.credit !== null ? 'text-success-500' : 'text-error-500'"
              >
                {{ entry.credit !== null ? `+${entry.credit.toFixed(2)}` : `${(entry.debit ?? 0).toFixed(2)}` }}
              </div>
              <div class="text-xs text-dimmed tabular-nums">
                bal. <span class="text-highlighted font-medium">{{ entry.balance.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Avatar -->
            <UAvatar :src="entry.avatar" :alt="entry.entryBy" size="xs" class="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </UCard>
    </div>
  </template>
</UDrawer>

  <ApplyLeaveModal v-model:open="isModalOpen" />
</template>