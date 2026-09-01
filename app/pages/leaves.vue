<script setup lang="ts">
const kpis = [
  { label: 'Sick', icon: 'i-lucide-thermometer', color: 'text-rose-500', value: '0.00', sublabel: 'DAYS REMAINING' },
  { label: 'Vacation', icon: 'i-lucide-plane', color: 'text-sky-500', value: '0.00', sublabel: 'DAYS REMAINING' },
  { label: 'Birthday', icon: 'i-lucide-cake', color: 'text-fuchsia-500', value: '1.00', sublabel: 'DAYS REMAINING' },
  { label: 'Others', icon: 'i-lucide-calendar-check', color: 'text-emerald-500', value: '0.00', sublabel: 'DAYS REMAINING' }
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
  }
]
</script>

<template>
    <div class="space-y-6">
        <UPageCard title="Leave Management" description="Request and manage your leaves"
            variant="naked" orientation="horizontal">
            <div class="flex justify-end gap-2 flex-1">
                <UButton color="primary" variant="soft">
                    <UIcon name="i-lucide-edit" />
                    Request Leave
                </UButton>
            </div>
        </UPageCard>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <UCard v-for="(kpi, index) in kpis" :key="index" class="shadow-sm">
                <div class="flex flex-col">
                    <UIcon :name="kpi.icon" class="size-6 mb-3" :class="kpi.color" />
                    <span class="text-sm font-medium text-dimmed">{{ kpi.label }}</span>
                    <span class="text-3xl font-bold mt-1 mb-2">{{ kpi.value }}</span>
                    <span class="text-xs font-semibold text-dimmed/80 uppercase tracking-wider">{{ kpi.sublabel }}</span>
                </div>
            </UCard>
        </div>

        <UTable :data="leaves" :columns="columns" class="flex-1">
            <template #status-cell="{ row }">
                <UBadge :label="row.original.status" color="success" variant="outline" size="sm" />
            </template>
            <template #approvers-cell="{ row }">
                <UAvatarGroup :max="4" size="sm">
                    <UAvatar v-for="(approver, index) in row.original.approvers" :key="index" :src="approver.src" :chip="{ inset: true, color: 'success', position: 'bottom-right', size: 'md' }" />
                </UAvatarGroup>
            </template>
        </UTable>
    </div>
</template>