<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
    isTable: true,
})

// add request date applied for each request
const approvalRequests = ref([
    {
        id: 1,
        requestType: 'leave',
        employee: { name: 'Alice Smith', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Alice', role: 'Software Engineer' },
        type: 'Vacation',
        scheduleType: 'Whole Day',
        startDate: '2026-08-20',
        endDate: '2026-08-25',
        duration: '4 Days',
        reason: 'Annual family trip',
        dateApplied: '2026-08-10',
        status: 'PENDING',
        approvers: [
            { role: 'Manager', name: 'Bob Jones', status: 'APPROVED', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
            { role: 'Director', name: 'Frank Miller', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
            { role: 'HR', name: 'Carol White', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
        ],
        timeline: [
            { title: 'Manager Approved', description: 'Have a great trip!', date: '2026-08-11', icon: 'i-lucide-check-circle', color: 'green', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
            { title: 'Leave Request Submitted', description: 'Annual family trip', date: '2026-08-10', icon: 'i-lucide-file-text', color: 'gray', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Alice' }
        ]
    },
    {
        id: 2,
        requestType: 'leave',
        employee: { name: 'David Brown', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=David', role: 'UX Designer' },
        type: 'Sick Leave',
        scheduleType: 'Half Day (AM)',
        startDate: '2026-08-14',
        endDate: '2026-08-15',
        duration: '2 Days',
        reason: 'Flu and high fever',
        dateApplied: '2026-08-10',
        status: 'PENDING',
        approvers: [
            { role: 'Manager', name: 'Bob Jones', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
            { role: 'Director', name: 'Frank Miller', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
            { role: 'HR', name: 'Carol White', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
        ],
        timeline: [
            { title: 'Leave Request Submitted', description: 'Flu and high fever', date: '2026-08-14', icon: 'i-lucide-file-text', color: 'gray', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=David' }
        ]
    },
    {
        id: 3,
        requestType: 'leave',
        employee: { name: 'Eve Davis', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Eve', role: 'Marketing Specialist' },
        type: 'Maternity',
        scheduleType: 'Whole Day',
        startDate: '2026-09-01',
        endDate: '2026-12-01',
        duration: '3 Months',
        reason: 'Maternity leave',
        dateApplied: '2026-08-10',
        status: 'APPROVED',
        approvers: [
            { role: 'Manager', name: 'Bob Jones', status: 'APPROVED', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
            { role: 'Director', name: 'Frank Miller', status: 'APPROVED', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
            { role: 'HR', name: 'Carol White', status: 'APPROVED', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
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
        requestType: 'leave',
        employee: { name: 'Charlie Clark', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Charlie', role: 'QA Tester' },
        type: 'Unpaid Leave',
        scheduleType: 'Whole Day',
        startDate: '2026-08-18',
        endDate: '2026-08-20',
        duration: '3 Days',
        reason: 'Personal errands',
        dateApplied: '2026-08-10',
        status: 'REJECTED',
        approvers: [
            { role: 'Manager', name: 'Bob Jones', status: 'REJECTED', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
            { role: 'Director', name: 'Frank Miller', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
            { role: 'HR', name: 'Carol White', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
        ],
        timeline: [
            { title: 'Manager Rejected', description: 'Need you during this critical release phase.', date: '2026-08-11', icon: 'i-lucide-x-circle', color: 'red', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
            { title: 'Leave Request Submitted', description: 'Personal errands', date: '2026-08-10', icon: 'i-lucide-file-text', color: 'gray', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Charlie' }
        ]
    },
    {
        id: 5,
        requestType: 'overtime',
        employee: { name: 'John Doe', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=John', role: 'Frontend Developer' },
        type: 'Regular Overtime',
        date: '2026-08-20',
        timeStart: '18:00',
        timeEnd: '22:00',
        duration: '4 Hours',
        reason: 'Urgent bug fixes for release',
        dateApplied: '2026-08-19',
        status: 'PENDING',
        approvers: [
            { role: 'Manager', name: 'Bob Jones', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
            { role: 'Director', name: 'Frank Miller', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
            { role: 'HR', name: 'Carol White', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
        ],
        timeline: [
            { title: 'Overtime Request Submitted', description: 'Urgent bug fixes for release', date: '2026-08-19', icon: 'i-lucide-file-text', color: 'gray', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=John' }
        ]
    },
    {
        id: 6,
        requestType: 'adjustment',
        employee: { name: 'Sarah Lee', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Sarah', role: 'Backend Developer' },
        type: 'Time Adjustment',
        date: '2026-09-06',
        currentTimeStart: '09:32',
        currentTimeEnd: '18:45',
        timeStart: '09:00',
        timeEnd: '18:00',
        duration: '9 Hours',
        reason: 'Forgot to clock in due to network issue',
        dateApplied: '2026-09-07',
        status: 'PENDING',
        approvers: [
            { role: 'Manager', name: 'Bob Jones', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Bob' },
            { role: 'Director', name: 'Frank Miller', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Frank' },
            { role: 'HR', name: 'Carol White', status: 'PENDING', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Carol' },
        ],
        timeline: [
            { title: 'Time Adjustment Submitted', description: 'Forgot to clock in due to network issue', date: '2026-09-07', icon: 'i-lucide-file-text', color: 'gray', avatar: 'https://api.dicebear.com/10.x/thumbs/svg?seed=Sarah' }
        ]
    }
])

const filterStatus = ref('PENDING')
const search = ref('')
const selectedType = ref('All Categories')
const period = ref('Monthly')
const month = ref(new Date().getMonth() + 1)
const year = ref(new Date().getFullYear())
const quarter = ref(Math.ceil((new Date().getMonth() + 1) / 3))

const months = Array.from({ length: 12 }, (_, i) => ({
    label: new Date(0, i, 1).toLocaleString('default', { month: 'short' }),
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
    ...new Set(approvalRequests.value.map(s => s.type))
])
const tabs = [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Approved', value: 'APPROVED' },
    { label: 'Rejected', value: 'REJECTED' },
    { label: 'All', value: 'ALL' }
]

const filteredRequests = computed(() => {
    let result = approvalRequests.value

    if (filterStatus.value !== 'ALL') {
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

    if (selectedType.value !== 'All Categories') {
        result = result.filter(req => req.type === selectedType.value)
    }

    result = result.filter(req => {
        const itemDate = new Date(req.dateApplied)
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
        
        return matchesPeriod
    })

    return result
})

const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
        case 'approved': return 'green'
        case 'rejected': return 'red'
        default: return 'orange'
    }
}

const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
        case 'approved': return 'i-lucide-check-circle'
        case 'rejected': return 'i-lucide-x-circle'
        default: return 'i-lucide-clock'
    }
}

const getRequestTypeIcon = (type: string) => {
    const t = type.toLowerCase()
    if (t.includes('vacation')) return 'i-lucide-plane'
    if (t.includes('sick')) return 'i-lucide-thermometer'
    if (t.includes('birthday')) return 'i-lucide-cake'
    if (t.includes('overtime')) return 'i-lucide-clock-plus'
    if (t.includes('adjustment')) return 'i-lucide-history'
    return 'i-lucide-calendar-check'
}

const getRequestCategoryLabel = (requestType: string) => {
    switch (requestType) {
        case 'overtime': return 'Overtime'
        case 'adjustment': return 'Time Adjustment'
        default: return 'Leave'
    }
}

const getRequestKeyDetail = (req: any) => {
    if (req.requestType === 'leave') {
        return { icon: 'i-lucide-calendar-range', text: `${req.startDate} to ${req.endDate}`, sub: req.duration }
    }
    // overtime & adjustment
    return { icon: 'i-lucide-calendar-clock', text: req.date, sub: `${req.timeStart} – ${req.timeEnd}` }
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
    const req = approvalRequests.value.find(r => r.id === activeRequestId.value)
    if (req) {
        req.status = modalAction.value === 'approve' ? 'APPROVED' : 'REJECTED'
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
    <div class="flex-1 overflow-y-auto scrollbar flex flex-col">
        <div class="flex flex-col gap-4 p-4">
            <UPageCard title="Approval Board" description="Manage and review requests from your team."
                variant="naked" orientation="horizontal" class="w-full"
                :ui="{
                    title: 'text-2xl font-bold'
                }"
            >
                <div class="flex justify-end gap-4 flex-1">
                    <div class="flex flex-wrap gap-2">
                        <UButton v-for="tab in tabs" :key="tab.value" :label="tab.label"
                            :variant="filterStatus === tab.value ? 'solid' : 'soft'"
                            :color="filterStatus === tab.value ? 'primary' : 'neutral'" class="rounded-full"
                            @click="filterStatus = tab.value" />
                    </div>
                </div>
            </UPageCard>

            <div class="flex items-center gap-3">
                <UInput
                    v-model="search"
                    placeholder="Search by name, type, or reason..."
                    icon="i-lucide-search"
                    class="flex-1"
                />
                <USelect v-model="selectedType" :items="requestTypes" class="w-48" />
                <USelect v-model="period" :items="['Monthly', 'Quarterly', 'Yearly']" class="w-32" />
                <USelect v-if="period === 'Monthly'" v-model="month" :items="months" class="w-24" />
                <USelect v-if="period === 'Quarterly'" v-model="quarter" :items="quarters" class="w-24" />
                <USelect v-model="year" :items="years" class="w-24" />
            </div>
        </div>

        <USeparator />

        <div class="flex-1 flex flex-col p-4">
            <!-- Requests Grid -->
            <div v-if="filteredRequests.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <UCard v-for="request in filteredRequests" :key="request.id"
                    class="shadow-sm cursor-pointer group hover:ring-1 hover:ring-primary/40 transition-all"
                    :ui="{ root: 'flex flex-col', body: 'sm:p-4 group-hover:bg-linear-to-tl group-hover:from-primary/10 group-hover:from-5% group-hover:to-default transition-all duration-300 ease-out', footer: 'sm:p-4' }"
                    @click="openDrawer(request)">
                    <div class="flex justify-between items-start gap-2">
                        <div class="flex items-center gap-2 min-w-0">
                            <div class="size-8 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                                <UIcon :name="getRequestTypeIcon(request.type)" class="size-4 text-primary" />
                            </div>
                            <div class="min-w-0">
                                <div class="text-xs font-medium text-dimmed">#00{{ request.id }}</div>
                                <div class="text-sm font-semibold text-highlighted group-hover:text-primary transition-colors truncate">
                                    {{ getRequestCategoryLabel(request.requestType) }}
                                </div>
                            </div>
                        </div>
                        <StatusBadge :status="request.status" class="shrink-0" />
                    </div>
                    <div class="py-2 flex items-center text-xs text-dimmed">
                        <UIcon :name="getRequestKeyDetail(request).icon" class="size-3.5 text-primary/70 shrink-0" />
                        <span class="truncate ml-2">{{ getRequestKeyDetail(request).text }}</span>
                        <UIcon name="i-lucide-dot" class="size-6 text-primary/70 shrink-0" />
                        <span class="shrink-0 font-medium text-toned">{{ getRequestKeyDetail(request).sub }}</span>
                    </div>
                    <USeparator />
                    <!-- <div class="mt-1">
                        <UBadge size="xs" :label="`#00${request.id}`" variant="subtle" color="neutral" />
                    </div> -->
                    <div class="relative mt-4">
                        <!-- Default: employee info -->
                        <div class="flex items-center gap-3 transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-1">
                            <UAvatar :src="request.employee.avatar" :alt="request.employee.name" size="sm" />
                            <div>
                                <h3 class="text-sm font-medium">{{ request.employee.name }}</h3>
                                <p class="text-xs font-medium text-dimmed">{{ request.employee.role }}</p>
                            </div>
                        </div>
                        <!-- Hover: review button -->
                        <div class="absolute inset-0 flex items-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                            <UButton block :label="request.status === 'PENDING' ? 'Review' : 'View Details'" :color="request.status === 'PENDING' ? 'warning' : 'primary'" variant="soft" @click.stop="openDrawer(request)" />
                        </div>
                    </div>
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
                            <StatusBadge :status="request.status" />
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
                :description="`There are no ${filterStatus !== 'all' ? filterStatus + ' ' : ''}requests to review.`" />
        </div>
    </div>

    <!-- Timeline Drawer -->
    <UDrawer v-model:open="isDrawerOpen" direction="right" title="Request Details" inset close class="min-w-[600px]"
        :ui="{
            container: 'w-full flex flex-col gap-0 p-0 overflow-hidden',
            header: 'p-4',
            body: 'flex-1 overflow-y-auto p-4 scrollbar',
            footer: 'p-4 bg-default'
        }"
    >
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
                        <StatusBadge :status="selectedRequest.status" />
                    </div>
                </UCard>

                <UTabs :items="items" variant="link" :ui="{ content: 'mt-6' }" class="w-full">
                    <template #overview>
                        <div class="space-y-5">

                            <!-- Section 1: Common Details -->
                            <div>
                                <!-- <h4 class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <UIcon name="i-lucide-info" class="size-3.5" />
                                    Common Details
                                </h4> -->
                                <div class="grid grid-cols-3 gap-3">
                                    <UCard :ui="{ body: 'sm:p-4' }" class="shadow-sm">
                                        <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-1">Reference No</div>
                                        <div class="text-sm font-medium flex items-center gap-2 text-highlighted">
                                            <UIcon name="i-lucide-hash" class="w-4 h-4 text-primary" />
                                            00{{ selectedRequest.id }}
                                        </div>
                                    </UCard>
                                    <UCard :ui="{ body: 'sm:p-4' }" class="shadow-sm">
                                        <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-1">Request</div>
                                        <div class="text-sm font-medium text-highlighted flex items-center gap-2">
                                            <UIcon :name="getRequestTypeIcon(selectedRequest.type)" class="w-4 h-4 text-primary" />
                                            {{ getRequestCategoryLabel(selectedRequest.requestType) }}
                                        </div>
                                    </UCard>
                                    <UCard :ui="{ body: 'sm:p-4' }" class="shadow-sm">
                                        <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-1">Filed On</div>
                                        <div class="text-sm font-medium text-highlighted flex items-center gap-2">
                                            <UIcon name="i-lucide-calendar" class="w-4 h-4 text-primary" />
                                            {{ selectedRequest.dateApplied }}
                                        </div>
                                    </UCard>
                                    <!-- <UCard :ui="{ body: 'sm:p-4' }" class="shadow-sm">
                                        <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-1">Duration</div>
                                        <div class="text-sm font-medium text-highlighted flex items-center gap-2">
                                            <UIcon name="i-lucide-clock" class="w-4 h-4 text-primary" />
                                            {{ selectedRequest.duration }}
                                        </div>
                                    </UCard> -->
                                </div>
                            </div>

                            <USeparator />

                            <!-- Section 2: Type-Specific Request Details -->
                            <div>
                                <h4 class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <UIcon name="i-lucide-layers" class="size-3.5" />
                                    Request Details
                                </h4>

                                <!-- LEAVE -->
                                <template v-if="selectedRequest.requestType === 'leave'">
                                    <div class="grid grid-cols-2 gap-3">
                                        <UCard :ui="{ body: 'sm:p-4' }" class="shadow-sm">
                                            <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-1">Duration</div>
                                            <div class="text-sm font-medium text-highlighted flex items-center gap-2">
                                                <UIcon name="i-lucide-clock" class="w-4 h-4 text-primary" />
                                                {{ selectedRequest.duration }}
                                            </div>
                                        </UCard>
                                        <UCard :ui="{ body: 'sm:p-4' }" class="shadow-sm">
                                            <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-1">Leave Type</div>
                                            <div class="text-sm font-medium text-highlighted flex items-center gap-2">
                                                <UIcon :name="getRequestTypeIcon(selectedRequest.type)" class="w-4 h-4 text-primary" />
                                                {{ selectedRequest.type }}
                                            </div>
                                        </UCard>
                                        <UCard :ui="{ body: 'sm:p-4' }" class="shadow-sm">
                                            <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-1">Schedule Type</div>
                                            <div class="text-sm font-medium text-highlighted flex items-center gap-2">
                                                <UIcon name="i-lucide-sun" class="w-4 h-4 text-primary" />
                                                {{ selectedRequest.scheduleType || 'Whole Day' }}
                                            </div>
                                        </UCard>
                                        <UCard :ui="{ body: 'sm:p-4' }" class="shadow-sm">
                                            <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-2">Date Range</div>
                                            <div class="flex items-center gap-3">
                                                <UTooltip text="Start Date">
                                                    <div class="flex items-center gap-1.5">
                                                        <UIcon name="i-lucide-calendar-days" class="size-4 text-primary" />
                                                        <span class="text-sm text-highlighted">{{ selectedRequest.startDate }}</span>
                                                    </div>
                                                </UTooltip>
                                                <span class="text-dimmed">&mdash;</span>
                                                <UTooltip text="End Date">
                                                    <div class="flex items-center gap-1.5">
                                                        <UIcon name="i-lucide-calendar-days" class="size-4 text-primary" />
                                                        <span class="text-sm text-highlighted">{{ selectedRequest.endDate }}</span>
                                                    </div>
                                                </UTooltip>
                                            </div>
                                        </UCard>
                                    </div>
                                </template>

                                <!-- OVERTIME -->
                                <template v-else-if="selectedRequest.requestType === 'overtime'">
                                    <div class="grid grid-cols-3 gap-3">
                                        <UCard :ui="{ body: 'sm:p-4' }" class="shadow-sm">
                                            <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-1">Duration</div>
                                            <div class="text-sm font-medium text-highlighted flex items-center gap-2">
                                                <UIcon name="i-lucide-clock" class="w-4 h-4 text-primary" />
                                                {{ selectedRequest.duration }}
                                            </div>
                                        </UCard>
                                        <UCard :ui="{ body: 'sm:p-4' }" class="shadow-sm">
                                            <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-1">Date</div>
                                            <div class="text-sm font-medium text-highlighted flex items-center gap-2">
                                                <UIcon name="i-lucide-calendar-days" class="w-4 h-4 text-primary" />
                                                {{ selectedRequest.date }}
                                            </div>
                                        </UCard>
                                        <UCard :ui="{ body: 'sm:p-4' }" class="shadow-sm">
                                            <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-1">Time Range</div>
                                            <div class="flex items-center gap-2 text-sm text-highlighted">
                                                <UIcon name="i-lucide-hourglass" class="w-4 h-4 text-primary shrink-0" />
                                                <span>{{ selectedRequest.timeStart }}</span>
                                                <span class="text-dimmed">&mdash;</span>
                                                <span>{{ selectedRequest.timeEnd }}</span>
                                            </div>
                                        </UCard>
                                    </div>
                                </template>

                                <!-- TIME ADJUSTMENT -->
                                <template v-else>
                                    <div class="grid grid-cols-1 gap-3">
                                        <UCard :ui="{ body: 'sm:p-4' }" class="shadow-sm">
                                            <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-1">Date</div>
                                            <div class="text-sm font-medium text-highlighted flex items-center gap-2">
                                                <UIcon name="i-lucide-calendar-days" class="w-4 h-4 text-primary" />
                                                {{ selectedRequest.date }}
                                            </div>
                                        </UCard>
                                        <UCard :ui="{ body: 'sm:p-4' }" class="shadow-sm">
                                            <div class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-3">Time Range Comparison</div>
                                            <div class="grid grid-cols-2 gap-4">
                                                <div>
                                                    <div class="text-xs text-dimmed mb-2 font-medium">Current (Recorded)</div>
                                                    <div class="flex items-center gap-2 text-sm">
                                                        <div class="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md text-toned">
                                                            <UIcon name="i-lucide-clock" class="size-3.5 text-warning" />
                                                            <span>{{ selectedRequest.currentTimeStart }}</span>
                                                        </div>
                                                        <span class="text-dimmed">&mdash;</span>
                                                        <div class="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md text-toned">
                                                            <UIcon name="i-lucide-clock" class="size-3.5 text-warning" />
                                                            <span>{{ selectedRequest.currentTimeEnd }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="text-xs text-dimmed mb-2 font-medium">Adjusted (Requested)</div>
                                                    <div class="flex items-center gap-2 text-sm">
                                                        <div class="flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-md text-primary">
                                                            <UIcon name="i-lucide-clock" class="size-3.5" />
                                                            <span>{{ selectedRequest.timeStart }}</span>
                                                        </div>
                                                        <span class="text-dimmed">&mdash;</span>
                                                        <div class="flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-md text-primary">
                                                            <UIcon name="i-lucide-clock" class="size-3.5" />
                                                            <span>{{ selectedRequest.timeEnd }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </UCard>
                                    </div>
                                </template>

                            </div>

                            <USeparator />

                            <!-- Section 3: Reason -->
                            <div>
                                <h4 class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <UIcon name="i-lucide-message-square-text" class="size-3.5" />
                                    {{ selectedRequest.requestType === 'overtime' ? 'Reason for Overtime' : (selectedRequest.requestType === 'adjustment' ? 'Reason for Adjustment' : 'Reason for Leave') }}
                                </h4>
                                <UCard class="shadow-sm" :ui="{ body: 'sm:p-4' }">
                                    <p class="text-sm text-highlighted leading-relaxed">{{ selectedRequest.reason }}</p>
                                </UCard>
                            </div>

                            <USeparator />

                            <!-- Section 4: Approval Process -->
                            <div>
                                <h4 class="text-xs font-semibold text-dimmed uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <UIcon name="i-lucide-shield-check" class="size-3.5" />
                                    Approval Process
                                </h4>
                                <UCard class="shadow-sm" :ui="{ body: 'sm:p-4' }">
                                    <div class="space-y-3">
                                        <div v-for="(approver, idx) in selectedRequest.approvers" :key="idx"
                                            class="flex items-center justify-between text-sm">
                                            <div class="flex items-center gap-2">
                                                <UAvatar :src="approver.avatar" :alt="approver.name" size="xs" />
                                                <div>
                                                    <div class="text-sm font-medium">{{ approver.name }}</div>
                                                    <div class="text-xs text-dimmed">{{ approver.role }}</div>
                                                </div>
                                            </div>
                                            <div class="flex items-center gap-1.5" :class="{
                                                'text-green-600 dark:text-green-400': approver.status === 'APPROVED',
                                                'text-red-600 dark:text-red-400': approver.status === 'REJECTED',
                                                'text-orange-500 dark:text-orange-400': approver.status === 'PENDING'
                                            }">
                                                <UIcon :name="getStatusIcon(approver.status)" class="w-4 h-4" />
                                                <span class="capitalize text-xs font-medium">{{ approver.status }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </UCard>
                            </div>

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
            <div v-if="selectedRequest.status === 'PENDING'" class="flex gap-3">
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
    <UModal v-model:open="isModalOpen" close
      :ui="{
        content: 'overflow-visible group',
        header: `relative bg-linear-to-r rounded-t-lg ${modalAction === 'approve' ? 'from-green-500/15 to-green-500/0' : 'from-red-500/15 to-red-500/0'}`
      }">
      <template #header>
        <div class="absolute overflow-hidden inset-0">
          <UIcon :name="modalAction === 'approve' ? 'i-lucide-check-square' : 'i-lucide-x-square'" 
            class="size-24 opacity-10 absolute -bottom-7 end-4" 
            :class="modalAction === 'approve' ? 'text-green-500' : 'text-red-500'" />
        </div>
        <div class="flex flex-col">
          <h2 class="text-highlighted font-semibold capitalize">{{ modalAction }} Request</h2>
          <p class="text-muted text-sm mt-1">Please provide a comment for your action.</p>
        </div>
        <UButton icon="i-lucide-x" variant="outline" color="neutral" class="absolute -top-4 -end-4 opacity-0 group-hover:opacity-100 transition-opacity" @click="isModalOpen = false" />
      </template>
      <template #body>
          <UTextarea v-model="actionComment" placeholder="Add a comment... (optional)" :rows="4" autofocus
              class="w-full" />
      </template>

      <template #footer>
          <div class="flex justify-end gap-3 w-full">
              <UButton color="neutral" variant="ghost" @click="isModalOpen = false">Cancel</UButton>
              <UButton :color="modalAction === 'approve' ? 'green' : 'red'" @click="confirmAction">
                  Confirm <span class="capitalize">{{ modalAction }}</span>
              </UButton>
          </div>
      </template>
    </UModal>
</template>
