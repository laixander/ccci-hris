<script setup lang="ts">
import { ref, computed } from 'vue'

const leaveRequests = ref([
  {
    id: 1,
    employee: { name: 'Alice Smith', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Alice', role: 'Software Engineer' },
    type: 'Vacation',
    startDate: '2026-08-20',
    endDate: '2026-08-25',
    duration: '4 Days',
    reason: 'Annual family trip',
    status: 'pending',
    approvers: [
      { role: 'Manager', name: 'Bob Jones', status: 'approved', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
      { role: 'HR', name: 'Carol White', status: 'pending', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
    ],
    timeline: [
      { title: 'Leave Request Submitted', description: 'Annual family trip', date: '2026-08-10', icon: 'i-lucide-file-text', color: 'gray' },
      { title: 'Manager Approved', description: 'Have a great trip!', date: '2026-08-11', icon: 'i-lucide-check-circle', color: 'green' }
    ]
  },
  {
    id: 2,
    employee: { name: 'David Brown', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=David', role: 'UX Designer' },
    type: 'Sick Leave',
    startDate: '2026-08-14',
    endDate: '2026-08-15',
    duration: '2 Days',
    reason: 'Flu and high fever',
    status: 'pending',
    approvers: [
      { role: 'Manager', name: 'Bob Jones', status: 'pending', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
      { role: 'Director', name: 'Frank Miller', status: 'pending', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
    ],
    timeline: [
      { title: 'Leave Request Submitted', description: 'Flu and high fever', date: '2026-08-14', icon: 'i-lucide-file-text', color: 'gray' }
    ]
  },
  {
    id: 3,
    employee: { name: 'Eve Davis', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Eve', role: 'Marketing Specialist' },
    type: 'Maternity',
    startDate: '2026-09-01',
    endDate: '2026-12-01',
    duration: '3 Months',
    reason: 'Maternity leave',
    status: 'approved',
    approvers: [
      { role: 'Manager', name: 'Bob Jones', status: 'approved', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
      { role: 'Director', name: 'Frank Miller', status: 'approved', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
      { role: 'HR', name: 'Carol White', status: 'approved', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
    ],
    timeline: [
      { title: 'Leave Request Submitted', description: 'Maternity leave', date: '2026-07-01', icon: 'i-lucide-file-text', color: 'gray' },
      { title: 'Fully Approved', description: 'All approvers have signed off.', date: '2026-07-05', icon: 'i-lucide-check-circle', color: 'green' }
    ]
  },
  {
    id: 4,
    employee: { name: 'Charlie Clark', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Charlie', role: 'QA Tester' },
    type: 'Unpaid Leave',
    startDate: '2026-08-18',
    endDate: '2026-08-20',
    duration: '3 Days',
    reason: 'Personal errands',
    status: 'rejected',
    approvers: [
      { role: 'Manager', name: 'Bob Jones', status: 'rejected', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
    ],
    timeline: [
      { title: 'Leave Request Submitted', description: 'Personal errands', date: '2026-08-10', icon: 'i-lucide-file-text', color: 'gray' },
      { title: 'Manager Rejected', description: 'Need you during this critical release phase.', date: '2026-08-11', icon: 'i-lucide-x-circle', color: 'red' }
    ]
  }
])

const filterStatus = ref('pending')
const tabs = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'All', value: 'all' }
]

const filteredRequests = computed(() => {
  if (filterStatus.value === 'all') return leaveRequests.value
  return leaveRequests.value.filter(req => req.status === filterStatus.value)
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved': return 'green'
    case 'rejected': return 'red'
    default: return 'orange'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved': return 'i-lucide-check-circle'
    case 'rejected': return 'i-lucide-x-circle'
    default: return 'i-lucide-clock'
  }
}

// Modal State
const isModalOpen = ref(false)
const modalAction = ref<'approve' | 'reject'>('approve')
const activeRequestId = ref<number | null>(null)
const actionComment = ref('')

const toast = useToast()

const openConfirmModal = (id: number, action: 'approve' | 'reject') => {
  activeRequestId.value = id
  modalAction.value = action
  actionComment.value = ''
  isModalOpen.value = true
}

const confirmAction = () => {
  if (activeRequestId.value === null) return
  const req = leaveRequests.value.find(r => r.id === activeRequestId.value)
  if (req) {
    req.status = modalAction.value
    // Add activity to timeline
    req.timeline.push({
      title: modalAction.value === 'approve' ? 'Request Approved' : 'Request Rejected',
      description: actionComment.value || (modalAction.value === 'approve' ? 'Approved without comment' : 'Rejected without comment'),
      date: new Date().toISOString().split('T')[0] || '',
      icon: modalAction.value === 'approve' ? 'i-lucide-check-circle' : 'i-lucide-x-circle',
      color: modalAction.value === 'approve' ? 'green' : 'red'
    })
    
    toast.add({
      title: modalAction.value === 'approve' ? 'Request Approved' : 'Request Rejected',
      description: `The request has been successfully ${modalAction.value}ed.`,
      color: modalAction.value === 'approve' ? 'success' : 'error',
      icon: modalAction.value === 'approve' ? 'i-lucide-check-circle' : 'i-lucide-x-circle'
    })
  }
  isModalOpen.value = false
}

// Drawer State
const isDrawerOpen = ref(false)
const selectedRequest = ref<any>(null)

const openDrawer = (req: any) => {
  selectedRequest.value = req
  isDrawerOpen.value = true
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <UPageCard title="Approval Board" description="Manage and review leave requests from your team." variant="naked"
          orientation="horizontal">
          <div class="flex justify-end gap-2 flex-1">
          </div>
      </UPageCard>
      
      <!-- Controls -->
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="tab in tabs"
          :key="tab.value"
          :label="tab.label"
          :variant="filterStatus === tab.value ? 'solid' : 'soft'"
          :color="filterStatus === tab.value ? 'primary' : 'neutral'"
          class="rounded-full"
          @click="filterStatus = tab.value"
        />
      </div>
    </div>

    <!-- Requests Grid -->
    <div v-if="filteredRequests.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard 
        v-for="request in filteredRequests" 
        :key="request.id" 
        variant="subtle" 
        :ui="{ root: 'shadow-sm flex flex-col cursor-pointer transition-shadow hover:shadow-md', body: 'p-0 sm:p-0 flex-1' }"
        @click="openDrawer(request)"
      >
        <template #header>
          <div class="flex justify-between items-start">
            <div class="flex items-center gap-3">
              <UAvatar :src="request.employee.avatar" :alt="request.employee.name" size="lg" />
              <div>
                <h3 class="font-medium">{{ request.employee.name }}</h3>
                <p class="text-sm text-dimmed">{{ request.employee.role }}</p>
              </div>
            </div>
            <UBadge :color="getStatusColor(request.status)" variant="subtle" class="capitalize">
              {{ request.status }}
            </UBadge>
          </div>
        </template>

        <div class="p-5 flex-1 space-y-4">
          <!-- Leave Details -->
          <div class="bg-muted rounded-lg p-3 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-dimmed">Leave Type</span>
              <span class="font-medium">{{ request.type }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-dimmed">Duration</span>
              <span class="font-medium">{{ request.duration }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-dimmed">Dates</span>
              <span class="font-medium">{{ request.startDate }} <span class="text-dimmed mx-1">to</span> {{ request.endDate }}</span>
            </div>
          </div>
          
          <div class="text-sm">
            <span class="font-medium text-dimmed">Reason:</span> {{ request.reason }}
          </div>

          <UDivider />

          <!-- Multiple Approvers Pipeline -->
          <div>
            <h4 class="text-xs text-dimmed font-semibold uppercase tracking-wider mb-3">Approval Process</h4>
            <div class="space-y-3">
              <div v-for="(approver, idx) in request.approvers" :key="idx" class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-2">
                  <UAvatar :src="approver.avatar" :alt="approver.name" size="xs" />
                  <span>{{ approver.role }}</span>
                </div>
                <div class="flex items-center gap-1.5" :class="{
                  'text-green-600 dark:text-green-400': approver.status === 'approved',
                  'text-red-600 dark:text-red-400': approver.status === 'rejected',
                  'text-orange-500 dark:text-orange-400': approver.status === 'pending'
                }">
                  <UIcon :name="getStatusIcon(approver.status)" class="w-4 h-4" />
                  <span class="capitalize text-xs font-medium">{{ approver.status }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <div v-if="request.status === 'pending'" class="flex gap-3">
            <UButton color="red" variant="soft" block class="flex-1" @click.stop="openConfirmModal(request.id, 'reject')">
              Reject
            </UButton>
            <UButton color="green" variant="soft" block class="flex-1" @click.stop="openConfirmModal(request.id, 'approve')">
              Approve
            </UButton>
          </div>
          <div v-else class="flex gap-3">
            <UButton color="neutral" variant="ghost" block class="flex-1" disabled>
              No actions required
            </UButton>
          </div>
        </template>
      </UCard>
    </div>

    <!-- Empty State -->
    <UEmpty
      v-else
      icon="i-lucide-check-circle-2"
      title="All caught up!"
      :description="`There are no ${filterStatus !== 'all' ? filterStatus + ' ' : ''}leave requests to review.`"
    />
  </div>

  <!-- Confirmation Modal -->
  <UModal v-model:open="isModalOpen" :title="`${modalAction === 'approve' ? 'Approve' : 'Reject'} Request`" description="Please provide a comment for your action." close>
    <template #body>
      <UTextarea v-model="actionComment" placeholder="Add a comment... (optional)" :rows="4" autofocus class="w-full" />
    </template>

    <template #footer>
      <div class="flex justify-end gap-3 w-full">
        <UButton color="neutral" variant="soft" @click="isModalOpen = false">Cancel</UButton>
        <UButton :color="modalAction === 'approve' ? 'green' : 'red'" @click="confirmAction">
          Confirm <span class="capitalize">{{ modalAction }}</span>
        </UButton>
      </div>
    </template>
  </UModal>

  <!-- Timeline Drawer -->
  <UDrawer v-model:open="isDrawerOpen" direction="right" title="Activity Logs" inset close class="min-w-[600px]">
    <template #body>
      <div v-if="selectedRequest" class="flex flex-col space-y-6">
        <!-- Header Profile Area -->
        <UCard variant="subtle" :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div class="flex items-center gap-4">
              <UAvatar :src="selectedRequest.employee.avatar" :alt="selectedRequest.employee.name" size="3xl" />
              <div>
                <h3 class="text-xl font-bold text-highlighted">{{ selectedRequest.employee.name }}</h3>
                <p class="text-sm font-medium text-primary mt-0.5">{{ selectedRequest.employee.role }}</p>
              </div>
            </div>
            <UBadge :color="getStatusColor(selectedRequest.status)" variant="subtle" class="capitalize">
              {{ selectedRequest.status }}
            </UBadge>
          </div>
        </UCard>

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto space-y-8">
          <!-- <div class="grid grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-muted/50 border border-default transition-colors hover:bg-muted">
              <div class="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Leave Type</div>
              <div class="font-medium flex items-center gap-2 text-highlighted">
                <UIcon name="i-lucide-calendar" class="w-4 h-4 text-primary" />
                {{ selectedRequest.type }}
              </div>
            </div>
            <div class="p-4 rounded-xl bg-muted/50 border border-default transition-colors hover:bg-muted">
              <div class="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Duration</div>
              <div class="font-medium text-highlighted flex items-center gap-2">
                <UIcon name="i-lucide-clock" class="w-4 h-4 text-primary" />
                {{ selectedRequest.duration }}
              </div>
              <div class="text-xs text-dimmed font-normal mt-1">{{ selectedRequest.startDate }} &rarr; {{ selectedRequest.endDate }}</div>
            </div>
            <div class="col-span-2 p-4 rounded-xl bg-muted/50 border border-default">
              <div class="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Reason for Leave</div>
              <p class="text-sm text-toned leading-relaxed">{{ selectedRequest.reason }}</p>
            </div>
          </div> -->

          <!-- <USeparator label="Timeline" /> -->

          <!-- Timeline -->
          <UTimeline
            :items="selectedRequest.timeline"
            :ui="{
              wrapper: 'w-full border border-default rounded-xl p-4 shadow-sm transition-all hover:shadow-md mt-0 mb-6 ml-2',
              date: 'float-end font-medium text-muted bg-elevated px-2 py-0.5 rounded-full text-xs',
              title: 'text-sm font-semibold text-highlighted mb-2',
              description: 'text-sm text-toned bg-muted/80 p-3 rounded-lg border border-default/50',
              indicator: 'flex p-1.5 rounded-full bg-default border-2 border-muted transition-colors group-hover:border-primary z-10'
            }"
          >
            <template #indicator="{ item }">
                <UIcon :name="item.icon" class="w-4 h-4" :class="`text-${item.color}-500`" />
            </template>
          </UTimeline>
        </div>
      </div>
    </template>
  </UDrawer>
</template>
