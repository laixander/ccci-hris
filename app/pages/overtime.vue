<script setup lang="ts">
import { h, resolveComponent } from 'vue'

definePageMeta({
    isTable: true,
})

const columns = [
  { accessorKey: 'dateApplied', header: 'Date Applied' },
  { accessorKey: 'start', header: 'Start Time' },
  { accessorKey: 'end', header: 'End Time' },
  { accessorKey: 'duration', header: 'Duration' },
  { accessorKey: 'status', header: 'Status' },
]

const overtimeData = ref([
  {
    id: 1,
    dateApplied: 'August 17, 2026 at 09:16 AM',
    start: 'August 17, 2026 05:00 PM',
    end: 'August 17, 2026 07:00 PM',
    duration: '2h',
    status: 'APPROVED',
  },
  {
    id: 2,
    dateApplied: 'August 11, 2026 at 07:24 AM',
    start: 'August 10, 2026 06:00 PM',
    end: 'August 10, 2026 09:00 PM',
    duration: '3h',
    status: 'APPROVED',
  },
  {
    id: 3,
    dateApplied: 'August 04, 2026 at 08:56 AM',
    start: 'August 03, 2026 05:00 PM',
    end: 'August 03, 2026 06:30 PM',
    duration: '1.5h',
    status: 'APPROVED',
  },
  {
    id: 4,
    dateApplied: 'July 27, 2026 at 09:51 AM',
    start: 'July 26, 2026 06:00 PM',
    end: 'July 26, 2026 08:00 PM',
    duration: '2h',
    status: 'PENDING',
  },
  {
    id: 5,
    dateApplied: 'July 21, 2026 at 06:22 AM',
    start: 'July 20, 2026 05:00 PM',
    end: 'July 20, 2026 09:00 PM',
    duration: '4h',
    status: 'APPROVED',
  },
  {
    id: 6,
    dateApplied: 'July 20, 2026 at 08:40 AM',
    start: 'July 19, 2026 05:00 PM',
    end: 'July 19, 2026 07:30 PM',
    duration: '2.5h',
    status: 'REJECTED',
  },
  {
    id: 7,
    dateApplied: 'July 16, 2026 at 09:55 AM',
    start: 'July 15, 2026 06:00 PM',
    end: 'July 15, 2026 08:00 PM',
    duration: '2h',
    status: 'APPROVED',
  },
  {
    id: 8,
    dateApplied: 'July 02, 2026 at 09:23 AM',
    start: 'July 01, 2026 05:00 PM',
    end: 'July 01, 2026 06:00 PM',
    duration: '1h',
    status: 'APPROVED',
  },
  {
    id: 9,
    dateApplied: 'June 04, 2026 at 09:11 AM',
    start: 'June 03, 2026 07:00 PM',
    end: 'June 03, 2026 09:00 PM',
    duration: '2h',
    status: 'APPROVED',
  },
  {
    id: 10,
    dateApplied: 'May 28, 2026 at 08:50 AM',
    start: 'May 27, 2026 05:00 PM',
    end: 'May 27, 2026 08:00 PM',
    duration: '3h',
    status: 'APPROVED',
  },
  {
    id: 11,
    dateApplied: 'April 15, 2026 at 10:30 AM',
    start: 'April 14, 2026 06:00 PM',
    end: 'April 14, 2026 09:30 PM',
    duration: '3.5h',
    status: 'APPROVED',
  },
  {
    id: 12,
    dateApplied: 'April 02, 2026 at 02:15 PM',
    start: 'April 01, 2026 05:00 PM',
    end: 'April 01, 2026 07:00 PM',
    duration: '2h',
    status: 'APPROVED',
  },
  {
    id: 13,
    dateApplied: 'March 20, 2026 at 11:00 AM',
    start: 'March 19, 2026 05:00 PM',
    end: 'March 19, 2026 10:00 PM',
    duration: '5h',
    status: 'PENDING',
  },
  {
    id: 14,
    dateApplied: 'February 10, 2026 at 09:45 AM',
    start: 'February 09, 2026 06:00 PM',
    end: 'February 09, 2026 08:00 PM',
    duration: '2h',
    status: 'APPROVED',
  },
  {
    id: 15,
    dateApplied: 'January 05, 2026 at 08:30 AM',
    start: 'January 04, 2026 05:00 PM',
    end: 'January 04, 2026 06:30 PM',
    duration: '1.5h',
    status: 'REJECTED',
  }
])

const container = useTemplateRef('container')
const header = useTemplateRef('header')
const getScrollElement = () => container.value

const { height: headerHeight } = useElementSize(header, undefined, { box: 'border-box' })

const isModalOpen = ref(false)

const statuses = ['All statuses', 'Pending', 'Approved', 'Rejected']
const status = ref('All statuses')
</script>

<template>
  <div ref="container" class="flex-1 overflow-y-auto scrollbar">
    <div ref="header">
      <div class="flex flex-col gap-4 p-4">
        <UPageCard title="Overtime Requests" description="Apply and track overtime"
            variant="naked" orientation="horizontal">
        </UPageCard>
        <!-- Filters -->
        <div class="flex items-center justify-between gap-4 w-full">
            <div class="flex flex-wrap gap-2">
                <UButton v-for="tab in statuses" :key="tab" :label="tab"
                    :variant="status === tab ? 'solid' : 'soft'"
                    :color="status === tab ? 'primary' : 'neutral'" class="rounded-full"
                    @click="status = tab" />
            </div>
            <div class="flex items-center gap-2">
                <UInput
                    icon="i-lucide-search"
                    placeholder="Search"
                    class="w-64"
                />
                <UButton @click="isModalOpen = true">
                    <UIcon name="i-lucide-plus" class="size-4" />
                    Request Overtime
                </UButton>
            </div>
        </div>
      </div>
    </div>

    <USeparator />

    <UTable :data="overtimeData" :columns="columns" sticky class="flex-1" :virtualize="{ scrollMargin: headerHeight, getScrollElement }">
        <template #status-cell="{ row }">
            <StatusBadge :status="row.original.status" />
        </template>
        <template #empty>
            <div class="flex items-center justify-center py-6 text-sm text-dimmed">
                No data
            </div>
        </template>
    </UTable>
  </div>

  <ApplyOvertimeModal v-model:open="isModalOpen" />
</template>