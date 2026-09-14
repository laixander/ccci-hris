<script setup lang="ts">
import { ref, computed } from 'vue'
import { Radar, Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  BarElement,
  CategoryScale,
  LinearScale
)

// ─── State ───────────────────────────────────────────────────────────────────

const year = ref(new Date().getFullYear())
const quarter = ref(Math.ceil((new Date().getMonth() + 1) / 3))

const years = Array.from({ length: 5 }, (_, i) => ({
  label: (new Date().getFullYear() - 2 + i).toString(),
  value: new Date().getFullYear() - 2 + i
}))

const quarters = [
  { label: 'Q1', value: 1 },
  { label: 'Q2', value: 2 },
  { label: 'Q3', value: 3 },
  { label: 'Q4', value: 4 }
]

// ─── KPIs ────────────────────────────────────────────────────────────────────

const kpis = [
  { label: 'Overall Rating', icon: 'i-lucide-star', color: 'text-amber-500', bg: 'bg-amber-500/10', value: '4.2', sublabel: 'OUT OF 5.0' },
  { label: 'Goals Completed', icon: 'i-lucide-target', color: 'text-sky-500', bg: 'bg-sky-500/10', value: '85%', sublabel: 'ON TRACK' },
  { label: 'Core Values', icon: 'i-lucide-heart-handshake', color: 'text-rose-500', bg: 'bg-rose-500/10', value: '92%', sublabel: 'EXCEEDS' },
  { label: 'Peer Feedback', icon: 'i-lucide-users', color: 'text-emerald-500', bg: 'bg-emerald-500/10', value: '4.5', sublabel: 'POSITIVE' }
]

// ─── Chart Data ──────────────────────────────────────────────────────────────

const radarData = computed(() => ({
  labels: ['Technical', 'Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Adaptability'],
  datasets: [
    {
      label: 'Self Evaluation',
      backgroundColor: 'rgba(56, 189, 248, 0.2)', // sky-400
      borderColor: 'rgba(56, 189, 248, 1)',
      pointBackgroundColor: 'rgba(56, 189, 248, 1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(56, 189, 248, 1)',
      data: [4.5, 3.8, 4.2, 4.8, 4.5, 4.0]
    },
    {
      label: 'Manager Evaluation',
      backgroundColor: 'rgba(34, 197, 94, 0.2)', // green-500
      borderColor: 'rgba(34, 197, 94, 1)',
      pointBackgroundColor: 'rgba(34, 197, 94, 1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(34, 197, 94, 1)',
      data: [4.2, 4.0, 4.5, 4.5, 4.2, 4.3]
    }
  ]
}))

const radarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      min: 0,
      max: 5,
      ticks: { stepSize: 1, backdropColor: 'transparent', color: '#9ca3af' },
      grid: { color: 'rgba(156, 163, 175, 0.2)' },
      angleLines: { color: 'rgba(156, 163, 175, 0.2)' },
      pointLabels: { color: '#9ca3af', font: { size: 12, family: 'Inter' } }
    }
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { color: '#9ca3af', font: { family: 'Inter' }, padding: 20 }
    },
    tooltip: {
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      titleFont: { family: 'Inter', size: 13 },
      bodyFont: { family: 'Inter', size: 13 },
      padding: 12,
      cornerRadius: 8
    }
  }
}

const barData = computed(() => ({
  labels: ['Q4 2025', 'Q1 2026', 'Q2 2026', 'Q3 2026'],
  datasets: [
    {
      label: 'Your Score',
      backgroundColor: 'rgba(56, 189, 248, 0.8)',
      borderRadius: 4,
      data: [3.8, 4.0, 4.1, 4.2]
    },
    {
      label: 'Company Average',
      backgroundColor: 'rgba(156, 163, 175, 0.4)',
      borderRadius: 4,
      data: [3.5, 3.6, 3.8, 3.7]
    }
  ]
}))

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      max: 5,
      border: { color: 'rgba(156, 163, 175, 0.1)' },
      grid: { color: 'rgba(156, 163, 175, 0.1)' },
      ticks: { color: '#9ca3af', font: { family: 'Inter' } }
    },
    x: {
      grid: { display: false },
      ticks: { color: '#9ca3af', font: { family: 'Inter' } }
    }
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { color: '#9ca3af', font: { family: 'Inter' }, padding: 20 }
    },
    tooltip: {
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      titleFont: { family: 'Inter', size: 13 },
      bodyFont: { family: 'Inter', size: 13 },
      padding: 12,
      cornerRadius: 8
    }
  }
}

// ─── Data Sections ───────────────────────────────────────────────────────────

const okrs = [
  { id: 1, title: 'Launch New Internal Dashboard', progress: 100, status: 'Completed', color: 'success' },
  { id: 2, title: 'Reduce Onboarding Time by 20%', progress: 75, status: 'On Track', color: 'primary' },
  { id: 3, title: 'Implement Automated Testing Suite', progress: 40, status: 'At Risk', color: 'warning' },
  { id: 4, title: 'Improve Employee Retention Rate', progress: 90, status: 'On Track', color: 'primary' }
]

const feedbackList = [
  { id: 1, author: 'Maxiane Maniquiz', role: 'Direct Manager', rating: '4.5', comment: 'Consistently delivers high-quality work and mentors junior team members effectively.' },
  { id: 2, author: 'Alex Chen', role: 'Peer', rating: '4.8', comment: 'Great collaborator. Always willing to jump in and help troubleshoot complex issues.' },
  { id: 3, author: 'Sarah Jenkins', role: 'Peer', rating: '4.2', comment: 'Strong technical skills, but could improve on cross-departmental communication.' }
]

// function getStatusColor(status: string) {
//   if (status === 'Completed') return 'bg-success-500/10 text-success-600 dark:text-success-400'
//   if (status === 'On Track') return 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
//   if (status === 'At Risk') return 'bg-warning-500/10 text-warning-600 dark:text-warning-400'
//   return 'bg-gray-500/10 text-gray-600 dark:text-gray-400'
// }
</script>

<template>
  <div class="space-y-6">
    
    <!-- Header -->
    <UPageCard
        title="My Performance"
        description="View your OKRs, competencies, and 360-feedback."
        variant="naked"
        orientation="horizontal"
        class="w-full"
        :ui="{ title: 'text-2xl font-bold' }"
    >
        <div class="flex justify-end gap-2 flex-1">
        <USelect v-model="quarter" :items="quarters" class="w-32" />
        <USelect v-model="year" :items="years" class="w-24" />
        <UButton color="neutral" variant="outline">
            <UIcon name="i-lucide-download" class="size-4" />
            Download Report
        </UButton>
        <UButton color="primary">
            <UIcon name="i-lucide-message-square-plus" class="size-4" />
            Request Feedback
        </UButton>
        </div>
    </UPageCard>
    

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <UCard v-for="(kpi, index) in kpis" :key="index" class="shadow-sm flex-1 min-w-[200px]" :ui="{ body: 'sm:p-4' }">
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
      

    <!-- Main Content Grid -->
    <div class="flex flex-col gap-6">
      
      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Competency Radar -->
        <UCard class="shadow-sm flex flex-col" :ui="{ body: 'flex flex-col h-full' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">Core Competencies</h3>
              <UIcon name="i-lucide-radar" class="text-dimmed size-4" />
            </div>
          </template>
          <div class="relative h-[300px] w-full flex items-center justify-center">
            <Radar :data="radarData" :options="radarOptions" />
          </div>
        </UCard>

        <!-- Historical Bar -->
        <UCard class="shadow-sm flex flex-col" :ui="{ body: 'flex flex-col h-full' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">Historical Performance</h3>
              <UIcon name="i-lucide-bar-chart-3" class="text-dimmed size-4" />
            </div>
          </template>
          <div class="relative h-[300px] w-full flex items-center justify-center">
            <Bar :data="barData" :options="barOptions" />
          </div>
        </UCard>
      </div>

      <!-- OKRs & Feedback Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- OKRs -->
        <UCard class="shadow-sm" :ui="{ body: 'p-0 sm:p-0' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">Current OKRs</h3>
              <UButton color="primary" variant="ghost" size="xs" trailing-icon="i-lucide-arrow-right" label="View All" />
            </div>
          </template>
          <div v-if="okrs.length === 0" class="flex-1 flex items-center justify-center p-8">
            <UEmpty
              icon="i-lucide-target"
              title="No OKRs found"
              description="You don't have any OKRs set for this period."
              variant="naked"
            />
          </div>
          <div v-else class="divide-y divide-[var(--ui-border)]">
            <div v-for="okr in okrs" :key="okr.id" class="p-4 hover:bg-[var(--ui-bg-muted)]/50 transition-colors">
              <div class="flex items-start justify-between mb-2">
                <span class="font-medium text-sm text-highlighted">{{ okr.title }}</span>
                <UBadge :label="okr.status.toUpperCase()" size="sm" variant="subtle" :color="(okr.color as any)" :ui="{ base: 'font-semibold tracking-wider' }" />
              </div>
              <div class="flex items-center gap-3">
                <UProgress :model-value="okr.progress" :color="(okr.color as any)" size="sm" class="flex-1" />
                <span class="text-xs font-semibold text-dimmed w-8 text-right">{{ okr.progress }}%</span>
              </div>
            </div>
          </div>
        </UCard>

        <!-- 360 Feedback -->
        <UCard class="shadow-sm" :ui="{ body: 'p-0 sm:p-0' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">Recent 360-Feedback</h3>
              <UButton color="primary" variant="ghost" size="xs" trailing-icon="i-lucide-arrow-right" label="View All" />
            </div>
          </template>
          <div v-if="feedbackList.length === 0" class="flex-1 flex items-center justify-center p-8">
            <UEmpty
              icon="i-lucide-message-square-off"
              title="No feedback found"
              description="You don't have any 360-feedback for this period."
              variant="naked"
            />
          </div>
          <div v-else class="divide-y divide-[var(--ui-border)]">
            <div v-for="feedback in feedbackList" :key="feedback.id" class="p-4 hover:bg-[var(--ui-bg-muted)]/50 transition-colors">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <UAvatar :src="`https://api.dicebear.com/9.x/thumbs/svg?seed=${feedback.author}`" size="sm" />
                  <div>
                    <div class="text-sm font-semibold text-highlighted leading-none">{{ feedback.author }}</div>
                    <div class="text-xs text-dimmed">{{ feedback.role }}</div>
                  </div>
                </div>
                <div class="flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-1 rounded text-xs font-bold">
                  <UIcon name="i-lucide-star" class="size-3" />
                  {{ feedback.rating }}
                </div>
              </div>
              <p class="text-sm text-toned mt-3 line-clamp-2">
                "{{ feedback.comment }}"
              </p>
            </div>
          </div>
        </UCard>

      </div>
    </div>
  </div>
</template>