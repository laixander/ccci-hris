<script setup lang="ts">
import { ref, computed } from 'vue'

// add request date applied for each leave request
const leaveRequests = ref([
    {
        id: 1,
        employee: { name: 'Alice Smith', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Alice', role: 'Software Engineer' },
        type: 'Vacation',
        startDate: '2026-08-20',
        endDate: '2026-08-25',
        duration: '4 Days',
        reason: 'Annual family trip',
        dateApplied: '2026-08-10',
        status: 'pending',
        approvers: [
            { role: 'Manager', name: 'Bob Jones', status: 'approved', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
            { role: 'HR', name: 'Carol White', status: 'pending', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
        ],
        timeline: [
            { title: 'Manager Approved', description: 'Have a great trip!', date: '2026-08-11', icon: 'i-lucide-check-circle', color: 'green', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
            { title: 'Leave Request Submitted', description: 'Annual family trip', date: '2026-08-10', icon: 'i-lucide-file-text', color: 'gray', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Alice' }
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
        dateApplied: '2026-08-10',
        status: 'pending',
        approvers: [
            { role: 'Manager', name: 'Bob Jones', status: 'pending', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
            { role: 'Director', name: 'Frank Miller', status: 'pending', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
        ],
        timeline: [
            { title: 'Leave Request Submitted', description: 'Flu and high fever', date: '2026-08-14', icon: 'i-lucide-file-text', color: 'gray', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=David' }
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
        dateApplied: '2026-08-10',
        status: 'approved',
        approvers: [
            { role: 'Manager', name: 'Bob Jones', status: 'approved', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
            { role: 'Director', name: 'Frank Miller', status: 'approved', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
            { role: 'HR', name: 'Carol White', status: 'approved', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
        ],
        timeline: [
            { title: 'HR Approved', description: 'Approved by HR', date: '2026-07-05', icon: 'i-lucide-check-circle', color: 'green', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
            { title: 'Director Approved', description: 'Approved by Director', date: '2026-07-04', icon: 'i-lucide-check-circle', color: 'green', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
            { title: 'Manager Approved', description: 'Approved by Manager', date: '2026-07-02', icon: 'i-lucide-check-circle', color: 'green', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
            { title: 'Leave Request Submitted', description: 'Maternity leave', date: '2026-07-01', icon: 'i-lucide-file-text', color: 'gray', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Eve' }
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
        dateApplied: '2026-08-10',
        status: 'rejected',
        approvers: [
            { role: 'Manager', name: 'Bob Jones', status: 'rejected', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
        ],
        timeline: [
            { title: 'Manager Rejected', description: 'Need you during this critical release phase.', date: '2026-08-11', icon: 'i-lucide-x-circle', color: 'red', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
            { title: 'Leave Request Submitted', description: 'Personal errands', date: '2026-08-10', icon: 'i-lucide-file-text', color: 'gray', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Charlie' }
        ]
    }
])

const filterStatus = ref('pending')
const search = ref('')
const tabs = [
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'All', value: 'all' }
]

const filteredRequests = computed(() => {
    let result = leaveRequests.value

    if (filterStatus.value !== 'all') {
        result = result.filter(req => req.status === filterStatus.value)
    }

    if (search.value) {
        const searchTerm = search.value.toLowerCase()
        result = result.filter(req =>
            req.employee.name.toLowerCase().includes(searchTerm) ||
            req.type.toLowerCase().includes(searchTerm) ||
            req.reason.toLowerCase().includes(searchTerm)
        )
    }

    return result
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

const getLeaveTypeIcon = (type: string) => {
    const t = type.toLowerCase()
    if (t.includes('vacation')) return 'i-lucide-plane'
    if (t.includes('sick')) return 'i-lucide-thermometer'
    if (t.includes('birthday')) return 'i-lucide-cake'
    return 'i-lucide-calendar-check'
}

// Modal State
const isModalOpen = ref(false)
const modalAction = ref<'approve' | 'reject'>('approve')
const activeRequestId = ref<number | null>(null)
const actionComment = ref('')

const toast = useToast()
const { currentUser } = useDemoAuth()

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
        req.timeline.unshift({
            title: modalAction.value === 'approve' ? 'Request Approved' : 'Request Rejected',
            description: actionComment.value || (modalAction.value === 'approve' ? 'Approved without comment' : 'Rejected without comment'),
            date: new Date().toISOString().split('T')[0] || '',
            icon: modalAction.value === 'approve' ? 'i-lucide-check-circle' : 'i-lucide-x-circle',
            color: modalAction.value === 'approve' ? 'green' : 'red',
            avatar: currentUser.value.avatar
        })

        toast.add({
            id: `approval_${activeRequestId.value}`,
            title: modalAction.value === 'approve' ? 'Request Approved' : 'Request Rejected',
            description: `The request has been successfully ${modalAction.value === 'approve' ? 'approved' : 'rejected'}.`,
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

const items = [
  {
    label: 'Overview',
    icon: 'i-lucide-file-search-corner',
    slot: 'overview' as const
  },
  {
    label: 'Timeline',
    icon: 'i-lucide-layout-list',
    slot: 'timeline' as const
  }
]
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <UPageCard title="Approval Board" description="Manage and review leave requests from your team."
                variant="naked" orientation="horizontal" class="w-full">
                <div class="flex justify-end gap-4 flex-1">
                    <UInput v-model="search" placeholder="Search requests" icon="i-lucide-search" class="flex-1 sm:max-w-64" />
                    <div class="flex flex-wrap gap-2">
                        <UButton v-for="tab in tabs" :key="tab.value" :label="tab.label"
                            :variant="filterStatus === tab.value ? 'solid' : 'soft'"
                            :color="filterStatus === tab.value ? 'primary' : 'neutral'" class="rounded-full"
                            @click="filterStatus = tab.value" />
                    </div>
                </div>
            </UPageCard>

            <!-- Controls -->
            <!-- add searchbar here -->
            <!-- <div class="flex items-center gap-4">
                <UInput v-model="search" placeholder="Search requests" icon="i-lucide-search" class="flex-1" />
                <div class="flex flex-wrap gap-2">
                    <UButton v-for="tab in tabs" :key="tab.value" :label="tab.label"
                        :variant="filterStatus === tab.value ? 'solid' : 'soft'"
                        :color="filterStatus === tab.value ? 'primary' : 'neutral'" class="rounded-full"
                        @click="filterStatus = tab.value" />
                </div>
            </div> -->
        </div>

        <!-- Requests Grid -->
        <div v-if="filteredRequests.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <UCard v-for="request in filteredRequests" :key="request.id" :ui="{root: 'shadow-sm flex flex-col cursor-pointer transition-shadow hover:shadow-md', body: 'sm:p-4', footer: 'sm:p-4'}" @click="openDrawer(request)">
                <div class="flex justify-between items-center">
                    <div class="space-y-1">
                        <UBadge size="sm" icon="i-lucide-file-text" :label="`#00${request.id}`" variant="soft" />
                        <div class="font-bold text-lg">
                            {{ request.type }}
                        </div>
                    </div>
                    <UBadge :color="getStatusColor(request.status)" variant="subtle" class="capitalize">
                        {{ request.status }}
                    </UBadge>
                </div>
                <template #footer>
                    <div class="flex items-center gap-3">
                        <UAvatar :src="request.employee.avatar" :alt="request.employee.name" size="sm" />
                        <div>
                            <h3 class="text-sm font-medium">{{ request.employee.name }}</h3>
                            <!-- request date -->
                            <p class="text-xs text-dimmed">{{ request.dateApplied }}</p>
                        </div>
                    </div>
                </template>
            </UCard>
            <!-- <UCard v-for="request in filteredRequests" :key="request.id" variant="subtle"
                :ui="{ root: 'shadow-sm flex flex-col cursor-pointer transition-shadow hover:shadow-md', body: 'p-0 sm:p-0 flex-1' }"
                @click="openDrawer(request)">
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
                            <span class="font-medium">{{ request.startDate }} <span class="text-dimmed mx-1">to</span>
                                {{
                                request.endDate }}</span>
                        </div>
                    </div>

                    <div class="text-sm">
                        <span class="font-medium text-dimmed">Reason:</span> {{ request.reason }}
                    </div>

                    <USeparator />

                    <div>
                        <h4 class="text-xs text-dimmed font-semibold uppercase tracking-wider mb-3">Approval Process
                        </h4>
                        <div class="space-y-3">
                            <div v-for="(approver, idx) in request.approvers" :key="idx"
                                class="flex items-center justify-between text-sm">
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
                        <UButton color="red" variant="soft" block class="flex-1"
                            @click.stop="openConfirmModal(request.id, 'reject')">
                            Reject
                        </UButton>
                        <UButton color="green" variant="soft" block class="flex-1"
                            @click.stop="openConfirmModal(request.id, 'approve')">
                            Approve
                        </UButton>
                    </div>
                    <div v-else class="flex gap-3">
                        <UButton color="neutral" variant="ghost" block class="flex-1" disabled>
                            No actions required
                        </UButton>
                    </div>
                </template>
            </UCard> -->
        </div>

        <!-- Empty State -->
        <UEmpty v-else icon="i-lucide-check-circle-2" title="All caught up!"
            :description="`There are no ${filterStatus !== 'all' ? filterStatus + ' ' : ''}leave requests to review.`" />
    </div>

    <!-- Timeline Drawer -->
    <UDrawer v-model:open="isDrawerOpen" direction="right" title="Request Details" inset close class="min-w-[600px]">
        <template #body>
            <div v-if="selectedRequest" class="flex flex-col space-y-4">
                <!-- Header Profile Area -->
                <UCard :ui="{ root: 'shadow-sm', body: 'sm:p-4' }">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
                            <UAvatar :src="selectedRequest.employee.avatar" :alt="selectedRequest.employee.name"
                                size="xl" />
                            <div>
                                <h3 class="text-lg font-bold text-highlighted">{{ selectedRequest.employee.name }}</h3>
                                <p class="text-xs font-medium text-primary">{{ selectedRequest.employee.role }}
                                </p>
                            </div>
                        </div>
                        <UBadge :color="getStatusColor(selectedRequest.status)" variant="subtle" class="capitalize">
                            {{ selectedRequest.status }}
                        </UBadge>
                    </div>
                </UCard>

                <UTabs :items="items" variant="link" :ui="{ content: 'mt-6' }" class="w-full">
                    <template #overview>
                        <div class="grid grid-cols-3 gap-4">
                            <UCard :ui="{ body: 'sm:p-4' }" class="shadow-sm">
                                <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-1">Leave Type</div>
                                <div class="text-sm font-medium flex items-center gap-2 text-highlighted">
                                    <UIcon :name="getLeaveTypeIcon(selectedRequest.type)" class="w-4 h-4 text-primary" />
                                    {{ selectedRequest.type }}
                                </div>
                            </UCard>
                            <UCard :ui="{ body: 'sm:p-4' }" class="shadow-sm">
                                <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-1">Filed On</div>
                                <div class="text-sm font-medium text-highlighted flex items-center gap-2">
                                    <UIcon name="i-lucide-calendar" class="w-4 h-4 text-primary" />
                                    {{ selectedRequest.dateApplied }}
                                </div>
                            </UCard>
                            <UCard :ui="{ body: 'sm:p-4' }" class="shadow-sm">
                                <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-1">Reference No</div>
                                <div class="text-sm font-medium flex items-center gap-2 text-highlighted">
                                    <UIcon name="i-lucide-hash" class="w-4 h-4 text-primary" />
                                    00{{ selectedRequest.id }}
                                </div>
                            </UCard>
                            <UCard :ui="{ body: 'sm:p-4' }" class="shadow-sm">
                                <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-1">Duration</div>
                                <div class="text-sm font-medium text-highlighted flex items-center gap-2">
                                    <UIcon name="i-lucide-clock" class="w-4 h-4 text-primary" />
                                    {{ selectedRequest.duration }}
                                </div>
                            </UCard>

                            <UCard class="col-span-2 shadow-sm" :ui="{ body: 'sm:p-4' }">
                                <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-1">Dates</div>
                                <div class="flex items-center gap-4">
                                    <UTooltip text="Start Date">
                                        <div class="flex items-center gap-2">
                                            <UIcon name="i-lucide-calendar-days" class="size-4 text-primary" /> <span
                                                class="text-sm text-highlighted">{{ selectedRequest.startDate }}</span>
                                        </div>
                                    </UTooltip>
                                    <USeparator orientation="horizontal" color="primary" type="dotted" class="flex-1" />
                                    <UTooltip text="End Date">
                                        <div class="flex items-center gap-2">
                                            <UIcon name="i-lucide-calendar-days" class="size-4 text-primary" /> <span
                                                class="text-sm text-highlighted">{{ selectedRequest.endDate }}</span>
                                        </div>
                                    </UTooltip>
                                </div>
                            </UCard>
                            <UCard class="col-span-3 shadow-sm" :ui="{ body: 'sm:p-4' }">
                                <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-2">Reason for Leave
                                </div>
                                <p class="text-sm text-highlighted leading-relaxed">{{ selectedRequest.reason }}</p>
                            </UCard>
                            <UCard class="col-span-3 shadow-sm" :ui="{ body: 'sm:p-4' }">
                                <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-2">Approval Process
                                </div>
                                <div class="space-y-3">
                                    <div v-for="(approver, idx) in selectedRequest.approvers" :key="idx"
                                        class="flex items-center justify-between text-sm">
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
                            </UCard>
                        </div>
                    </template>
                    <template #timeline>
                        <UTimeline :items="selectedRequest.timeline" :ui="{
                            wrapper: 'w-full border border-default rounded-xl p-4 shadow-sm transition-all hover:shadow-md mt-0 mb-6 ml-2',
                            date: 'float-end font-medium text-muted bg-elevated px-2 py-0.5 rounded-full text-xs',
                            title: 'text-sm font-semibold text-highlighted mb-2',
                            description: 'text-sm text-toned bg-muted/80 p-3 rounded-lg border border-default/50',
                            indicator: 'flex p-0.5 rounded-full bg-default border-2 border-muted transition-colors group-hover:border-primary z-10'
                        }">
                            <template #indicator="{ item }">
                                <UAvatar v-if="item.avatar" :src="(item.avatar as any)" size="xs" />
                                <UIcon v-else :name="item.icon" class="w-4 h-4 m-1" :class="`text-${item.color}-500`" />
                            </template>
                        </UTimeline>
                    </template>
                </UTabs>
            </div>
        </template>
        <template #footer>
            <div v-if="selectedRequest.status === 'pending'" class="flex gap-3 mt-4">
                <UButton color="error" variant="soft" block class="flex-1" @click="openConfirmModal(selectedRequest.id, 'reject')">
                    Reject
                </UButton>
                <UButton color="success" variant="soft" block class="flex-1" @click="openConfirmModal(selectedRequest.id, 'approve')">
                    Approve
                </UButton>
            </div>
        </template>
    </UDrawer>

    <!-- Confirmation Modal -->
    <UModal v-model:open="isModalOpen" :title="`${modalAction === 'approve' ? 'Approve' : 'Reject'} Request`"
        description="Please provide a comment for your action." close>
        <template #body>
            <UTextarea v-model="actionComment" placeholder="Add a comment... (optional)" :rows="4" autofocus
                class="w-full" />
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
</template>
