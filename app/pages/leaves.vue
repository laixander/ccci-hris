<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UAvatar = resolveComponent('UAvatar')

definePageMeta({
    isTable: true,
})

const kpis = [
  { label: 'Sick', icon: 'i-lucide-thermometer', color: 'text-rose-500', bg: 'bg-rose-500/10', value: '0.00', sublabel: 'DAYS REMAINING' },
  { label: 'Vacation', icon: 'i-lucide-plane', color: 'text-sky-500', bg: 'bg-sky-500/10', value: '0.00', sublabel: 'DAYS REMAINING' },
  { label: 'Birthday', icon: 'i-lucide-cake', color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/10', value: '1.00', sublabel: 'DAYS REMAINING' },
  { label: 'Others', icon: 'i-lucide-calendar-check', color: 'text-emerald-500', bg: 'bg-emerald-500/10', value: '0.00', sublabel: 'DAYS REMAINING' }
]

const columns = [
  { accessorKey: 'dateApplied', header: 'Date Applied' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'start', header: 'Start' },
  { accessorKey: 'end', header: 'End' },
  { accessorKey: 'duration', header: 'Duration' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'approvers', header: 'Approvers' }
]

type LedgerEntry = {
  date: string
  leaveType: string
  credit: number | null
  debit: number | null
  balance: number
  entryBy: string
  avatar: string
}

const ledgerColumns: TableColumn<LedgerEntry>[] = [
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'leaveType', header: 'Leave Type' },
  {
    accessorKey: 'credit',
    header: 'Credit',
    meta: { class: { th: 'text-right', td: 'text-right' } },
    cell: ({ row }) => {
      const v = row.getValue('credit') as number | null
      if (v === null) return h('span', { class: 'text-dimmed' }, '—')
      return h('span', { class: 'text-success-500 font-medium' }, `+${v.toFixed(5)}`)
    }
  },
  {
    accessorKey: 'debit',
    header: 'Debit',
    meta: { class: { th: 'text-right', td: 'text-right' } },
    cell: ({ row }) => {
      const v = row.getValue('debit') as number | null
      if (v === null) return h('span', { class: 'text-dimmed' }, '—')
      return h('span', { class: 'text-error-500 font-medium' }, v.toFixed(5))
    }
  },
  {
    accessorKey: 'balance',
    header: 'Balance',
    meta: { class: { th: 'text-right', td: 'text-right font-medium' } },
    cell: ({ row }) => (row.getValue('balance') as number).toFixed(5)
  },
  {
    accessorKey: 'entryBy',
    header: 'Entry By',
    meta: { class: { th: 'text-right', td: 'text-right' } },
    cell: ({ row }) => {
      const entry = row.original as LedgerEntry
      return h(UAvatar, { src: entry.avatar, alt: entry.entryBy, size: 'sm' })
    }
  },
]

const ledgerData = ref<LedgerEntry[]>([
  { date: 'September 01, 2026 at 04:57 PM', leaveType: 'Sick Leave',     credit: 1,    debit: null, balance: 1, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
  { date: 'September 01, 2026 at 04:57 PM', leaveType: 'Vacation Leave', credit: 1,    debit: null, balance: 1, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
  { date: 'August 20, 2026 at 03:03 PM',    leaveType: 'Vacation Leave', credit: null, debit: -1,   balance: 0, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
  { date: 'August 13, 2026 at 10:03 AM',    leaveType: 'Vacation Leave', credit: null, debit: -1,   balance: 0, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
  { date: 'August 10, 2026 at 02:36 PM',    leaveType: 'Sick Leave',     credit: null, debit: -1,   balance: 0, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
  { date: 'August 04, 2026 at 03:31 PM',    leaveType: 'Sick Leave',     credit: 1,    debit: null, balance: 1, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
  { date: 'August 04, 2026 at 03:31 PM',    leaveType: 'Vacation Leave', credit: 1,    debit: null, balance: 1, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
  { date: 'July 29, 2026 at 10:08 AM',      leaveType: 'Vacation Leave', credit: null, debit: -1,   balance: 0, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
  { date: 'July 28, 2026 at 07:29 AM',      leaveType: 'Vacation Leave', credit: null, debit: -1,   balance: 1, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
  { date: 'July 28, 2026 at 07:28 AM',      leaveType: 'Vacation Leave', credit: null, debit: -1,   balance: 2, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
  { date: 'July 24, 2026 at 05:27 PM',      leaveType: 'Sick Leave',     credit: null, debit: -1,   balance: 0, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
  { date: 'July 08, 2026 at 05:38 PM',      leaveType: 'Sick Leave',     credit: null, debit: -1,   balance: 1, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
  { date: 'July 01, 2026 at 07:54 AM',      leaveType: 'Sick Leave',     credit: 1,    debit: null, balance: 2, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
  { date: 'July 01, 2026 at 07:54 AM',      leaveType: 'Vacation Leave', credit: 2,    debit: null, balance: 3, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
  { date: 'June 08, 2026 at 04:38 PM',      leaveType: 'Sick Leave',     credit: null, debit: -1,   balance: 1, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
  { date: 'June 04, 2026 at 01:32 PM',      leaveType: 'Birthday Leave', credit: 1,    debit: null, balance: 1, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
  { date: 'June 03, 2026 at 09:16 AM',      leaveType: 'Sick Leave',     credit: 1,    debit: null, balance: 2, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
  { date: 'June 03, 2026 at 09:04 AM',      leaveType: 'Vacation Leave', credit: 1,    debit: null, balance: 2, entryBy: 'MAXIANE MANIQUIZ',  avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Maxiane' },
  { date: 'May 28, 2026 at 10:26 PM',       leaveType: 'Vacation Leave', credit: null, debit: -1,   balance: 1, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
  { date: 'May 14, 2026 at 08:50 AM',       leaveType: 'Sick Leave',     credit: null, debit: -1,   balance: 1, entryBy: 'LAIXANDER NAGUIT', avatar: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Laixander' },
])

const leaves = [
  {
    id: 1,
    dateApplied: 'August 17, 2026 at 09:16 AM',
    type: 'Emergency Leave',
    start: 'August 17, 2026',
    end: 'August 17, 2026',
    duration: '1 day/s',
    status: 'APPROVED',
    approvers: [
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Doe' }
    ]
  },
  {
    id: 2,
    dateApplied: 'August 11, 2026 at 07:24 AM',
    type: 'Emergency Leave',
    start: 'August 11, 2026',
    end: 'August 11, 2026',
    duration: '1 day/s',
    status: 'APPROVED',
    approvers: [
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Doe' }
    ]
  },
  {
    id: 3,
    dateApplied: 'August 04, 2026 at 08:56 AM',
    type: 'Sick Leave',
    start: 'August 04, 2026',
    end: 'August 04, 2026',
    duration: '1 day/s',
    status: 'APPROVED',
    approvers: [
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Doe' }
    ]
  },
  {
    id: 4,
    dateApplied: 'July 27, 2026 at 09:51 AM',
    type: 'Emergency Leave',
    start: 'July 27, 2026',
    end: 'July 27, 2026',
    duration: '1 day/s',
    status: 'APPROVED',
    approvers: [
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Doe' }
    ]
  },
  {
    id: 5,
    dateApplied: 'July 21, 2026 at 06:22 AM',
    type: 'Emergency Leave',
    start: 'July 21, 2026',
    end: 'July 21, 2026',
    duration: '1 day/s',
    status: 'APPROVED',
    approvers: [
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Doe' }
    ]
  },
  {
    id: 6,
    dateApplied: 'July 20, 2026 at 08:40 AM',
    type: 'Emergency Leave',
    start: 'July 20, 2026',
    end: 'July 20, 2026',
    duration: '1 day/s',
    status: 'APPROVED',
    approvers: [
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Doe' }
    ]
  },
  {
    id: 7,
    dateApplied: 'July 16, 2026 at 09:55 AM',
    type: 'Sick Leave',
    start: 'July 16, 2026',
    end: 'July 16, 2026',
    duration: '1 day/s',
    status: 'APPROVED',
    approvers: [
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Doe' }
    ]
  },
  {
    id: 8,
    dateApplied: 'July 02, 2026 at 09:23 AM',
    type: 'Sick Leave',
    start: 'July 02, 2026',
    end: 'July 02, 2026',
    duration: '1 day/s',
    status: 'APPROVED',
    approvers: [
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Doe' }
    ]
  },
  {
    id: 9,
    dateApplied: 'June 04, 2026 at 09:11 AM',
    type: 'Sick Leave',
    start: 'June 04, 2026',
    end: 'June 04, 2026',
    duration: '1 day/s',
    status: 'APPROVED',
    approvers: [
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Doe' }
    ]
  },
  {
    id: 10,
    dateApplied: 'May 28, 2026 at 08:50 AM',
    type: 'Emergency Leave',
    start: 'May 28, 2026',
    end: 'May 28, 2026',
    duration: '1 day/s',
    status: 'APPROVED',
    approvers: [
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Doe' }
    ]
  },
  {
    id: 11,
    dateApplied: 'April 15, 2026 at 10:30 AM',
    type: 'Vacation Leave',
    start: 'May 01, 2026',
    end: 'May 05, 2026',
    duration: '5 day/s',
    status: 'APPROVED',
    approvers: [
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' }
    ]
  },
  {
    id: 12,
    dateApplied: 'April 02, 2026 at 02:15 PM',
    type: 'Sick Leave',
    start: 'April 03, 2026',
    end: 'April 04, 2026',
    duration: '2 day/s',
    status: 'APPROVED',
    approvers: [
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' }
    ]
  },
  {
    id: 13,
    dateApplied: 'March 20, 2026 at 11:00 AM',
    type: 'Maternity Leave',
    start: 'July 01, 2026',
    end: 'October 28, 2026',
    duration: '120 day/s',
    status: 'PENDING',
    approvers: [
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=John' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Doe' }
    ]
  },
  {
    id: 14,
    dateApplied: 'February 10, 2026 at 09:45 AM',
    type: 'Paternity Leave',
    start: 'March 15, 2026',
    end: 'March 21, 2026',
    duration: '7 day/s',
    status: 'APPROVED',
    approvers: [
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka' },
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Doe' }
    ]
  },
  {
    id: 15,
    dateApplied: 'January 05, 2026 at 08:30 AM',
    type: 'Bereavement Leave',
    start: 'January 06, 2026',
    end: 'January 08, 2026',
    duration: '3 day/s',
    status: 'REJECTED',
    approvers: [
      { src: 'https://api.dicebear.com/9.x/thumbs/svg?seed=Felix' }
    ]
  }
]

const container = useTemplateRef('container')
const header = useTemplateRef('header')
const getScrollElement = () => container.value

const { height: headerHeight } = useElementSize(header, undefined, { box: 'border-box' })

const isDrawerOpen = ref(false)
</script>

<template>
  <div ref="container" class="flex-1 overflow-y-auto scrollbar">
    <div ref="header">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
        <UPageCard title="Leave Management" description="Request and manage your leaves"
            variant="naked" orientation="horizontal">
            <div class="flex justify-end gap-2 flex-1">
            </div>
        </UPageCard>
        <div class="flex justify-end gap-2">
          <UButton variant="ghost" color="neutral" @click="isDrawerOpen = true">
            <UIcon name="i-lucide-calendar-plus" />
            Open Ledger
          </UButton>
        <UButton color="primary" variant="soft">
            <UIcon name="i-lucide-edit" />
            Request Leave
        </UButton>
        </div>
      </div>

      <div class="flex gap-3 px-4 pb-4">
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

    <UTable :data="leaves" :columns="columns" sticky class="flex-1" :virtualize="{ scrollMargin: headerHeight, getScrollElement }">
        <template #status-cell="{ row }">
            <StatusBadge :status="row.original.status" />
        </template>
        <template #approvers-cell="{ row }">
            <UAvatarGroup :max="4" size="sm">
                <UAvatar v-for="(approver, index) in row.original.approvers" :key="index" :src="approver.src" :chip="{ inset: true, color: 'success', position: 'bottom-right', size: 'md' }" />
            </UAvatarGroup>
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
    <div class="flex-1 min-h-0 overflow-y-auto space-y-3 p-[1px] scrollbar">
      <UCard
        v-for="(entry, index) in ledgerData"
        :key="index"
        class="shadow-sm group"
        :ui="{ body: 'sm:p-4' }"
      >
        <div class="flex items-center gap-3">
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
      </UCard>
    </div>
  </template>
</UDrawer>
</template>