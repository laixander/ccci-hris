<script setup lang="ts">
import { ref, computed } from 'vue'
import { Doughnut, Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
)

definePageMeta({
    isTable: true
})

// ─── KPIs ────────────────────────────────────────────────────────────────────
const kpis = [
  { label: 'Total assets', icon: 'i-lucide-box', color: 'text-sky-500', bg: 'bg-sky-500/10', value: '46', sublabel: 'TOTAL' },
  { label: 'Total asset value', icon: 'i-lucide-wallet', color: 'text-emerald-500', bg: 'bg-emerald-500/10', value: '₱ 0.00', sublabel: 'VALUE' },
  { label: '87% utilization', icon: 'i-lucide-arrow-left-right', color: 'text-purple-500', bg: 'bg-purple-500/10', value: '40 / 46', sublabel: 'ASSIGNED' },
  { label: 'Under repair', icon: 'i-lucide-wrench', color: 'text-amber-500', bg: 'bg-amber-500/10', value: '0', sublabel: 'ATTENTION' }
]

// Common Chart Options
const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { color: '#9ca3af', font: { family: 'Inter', size: 11 }, padding: 20 }
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

// ─── Chart Data ──────────────────────────────────────────────────────────────
const doughnutOptions = {
    ...commonOptions,
    cutout: '75%',
    elements: {
        arc: {
            borderWidth: 2,
            borderColor: '#0f172a' // Dark background color to create spacing between slices
        }
    }
}

const assetsByStatusData = computed(() => ({
  labels: ['Available', 'Assigned', 'Under Repair', 'Retired'],
  datasets: [
    {
      data: [6, 40, 0, 0],
      backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#6b7280']
    }
  ]
}))

const assetsByCategoryData = computed(() => ({
  labels: ['Desktop Computers', 'Mobile Phones', 'Routers', 'Printers', 'Headsets & Audio Devices', 'Webcams', 'Mouse', 'Keyboards', 'Monitors', 'External Storage', 'Software Licenses', 'Biometric Devices', 'Laptop Computers'],
  datasets: [
    {
      label: 'Count',
      data: [13, 2, 0, 0, 0, 0, 8, 8, 12, 0, 0, 0, 3],
      backgroundColor: '#3b82f6',
      borderRadius: 4
    }
  ]
}))

const assetsByLocationData = computed(() => ({
  labels: ['Pantry', 'Support Team Area', 'Executive Room', 'Workspace Area', 'UI/UX Room', 'Leads Room'],
  datasets: [
    {
      label: 'Count',
      data: [0, 10, 0, 25, 10, 1],
      backgroundColor: '#06b6d4',
      borderRadius: 4
    }
  ]
}))

const horizontalBarOptions = {
  ...commonOptions,
  indexAxis: 'y' as const,
  scales: {
    x: { grid: { color: 'rgba(156, 163, 175, 0.1)' }, ticks: { color: '#9ca3af', font: { family: 'Inter', size: 10 } } },
    y: { grid: { display: false }, ticks: { color: '#9ca3af', font: { family: 'Inter', size: 10 } } }
  },
  plugins: { ...commonOptions.plugins, legend: { display: false } }
}

const verticalBarOptions = {
  ...commonOptions,
  scales: {
    y: { grid: { color: 'rgba(156, 163, 175, 0.1)' }, ticks: { color: '#9ca3af', font: { family: 'Inter', size: 10 } } },
    x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { family: 'Inter', size: 9 }, maxRotation: 45, minRotation: 45 } }
  },
  plugins: { ...commonOptions.plugins, legend: { display: false } }
}

const assetValueByCategoryData = computed(() => ({
  labels: ['Desktop Computers', 'Mobile Phones', 'Routers', 'Printers', 'Headsets & Audio Devices', 'Webcams', 'Mouse', 'Keyboards', 'Monitors', 'External Storage', 'Software Licenses', 'Biometric Devices', 'Laptop Computers'],
  datasets: [
    {
      label: 'Value (₱)',
      data: [39000, 3000, 0, 0, 0, 0, 0, 0, 2000, 0, 0, 0, 25000],
      backgroundColor: '#10b981',
      borderRadius: 4
    }
  ]
}))

const assignmentStatusData = computed(() => ({
  labels: ['Active', 'Returned'],
  datasets: [
    {
      data: [41, 4],
      backgroundColor: ['#3b82f6', '#10b981']
    }
  ]
}))

const topAssetsData = computed(() => ({
  labels: ['C07HN0RVQ6NV — Apple...', 'HGN0CX28793382H — A...', 'C07DP00DPJH7 — Apple...', 'C07CJ0ZFPJH7 — Apple...', 'C07HN0RSC6NV — Apple...'],
  datasets: [
    {
      label: 'Value (₱)',
      data: [48500, 48500, 48500, 48500, 39000],
      backgroundColor: '#ef4444',
      borderRadius: 4
    }
  ]
}))
</script>

<template>
  <div class="flex-1 flex flex-col p-4 space-y-6 overflow-y-auto scrollbar">
    <!-- Header -->
    <UPageCard
        title="Asset Analytics"
        description="View asset utilization, value distribution, and assignment metrics."
        variant="naked"
        class="w-full"
        :ui="{ title: 'text-2xl font-bold' }"
    />
    
    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <UCard v-for="(kpi, index) in kpis" :key="index" class="shadow-sm flex-1 min-w-[200px]" :ui="{ body: 'sm:p-4' }">
            <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between">
                    <div class="rounded-lg p-2 shrink-0 flex" :class="kpi.bg">
                        <UIcon :name="kpi.icon" class="size-4" :class="kpi.color" />
                    </div>
                    <span class="text-[10px] font-semibold text-dimmed uppercase tracking-wider">{{ kpi.sublabel }}</span>
                </div>
                <div>
                    <div class="text-2xl font-bold leading-none">{{ kpi.value }}</div>
                    <div class="text-xs text-dimmed mt-1">{{ kpi.label }}</div>
                </div>
            </div>
        </UCard>
    </div>

    <!-- Main Content Grid -->
    <div class="flex flex-col gap-6">
      
      <!-- Row 1 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UCard class="shadow-sm flex flex-col" :ui="{ body: 'flex flex-col h-full' }">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-pie-chart" class="text-primary size-4" />
              <h3 class="font-semibold text-sm">Assets by Status</h3>
            </div>
          </template>
          <div class="relative h-[300px] w-full flex items-center justify-center">
            <Doughnut :data="assetsByStatusData" :options="doughnutOptions" />
          </div>
        </UCard>

        <UCard class="shadow-sm flex flex-col" :ui="{ body: 'flex flex-col h-full' }">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-bar-chart-2" class="text-primary size-4" />
              <h3 class="font-semibold text-sm">Assets by Category</h3>
            </div>
          </template>
          <div class="relative h-[300px] w-full flex items-center justify-center">
            <Bar :data="assetsByCategoryData" :options="verticalBarOptions" />
          </div>
        </UCard>
      </div>

      <!-- Row 2 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UCard class="shadow-sm flex flex-col" :ui="{ body: 'flex flex-col h-full' }">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-map-pin" class="text-primary size-4" />
              <h3 class="font-semibold text-sm">Assets by Location</h3>
            </div>
          </template>
          <div class="relative h-[300px] w-full flex items-center justify-center">
            <Bar :data="assetsByLocationData" :options="horizontalBarOptions" />
          </div>
        </UCard>

        <UCard class="shadow-sm flex flex-col" :ui="{ body: 'flex flex-col h-full' }">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-bar-chart" class="text-primary size-4" />
              <h3 class="font-semibold text-sm">Asset Value by Category</h3>
            </div>
          </template>
          <div class="relative h-[300px] w-full flex items-center justify-center">
            <Bar :data="assetValueByCategoryData" :options="verticalBarOptions" />
          </div>
        </UCard>
      </div>

      <!-- Row 3 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UCard class="shadow-sm flex flex-col" :ui="{ body: 'flex flex-col h-full' }">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-arrow-left-right" class="text-primary size-4" />
              <h3 class="font-semibold text-sm">Assignment Status</h3>
            </div>
          </template>
          <div class="relative h-[300px] w-full flex items-center justify-center">
            <Doughnut :data="assignmentStatusData" :options="doughnutOptions" />
          </div>
        </UCard>

        <UCard class="shadow-sm flex flex-col" :ui="{ body: 'flex flex-col h-full' }">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-trending-up" class="text-primary size-4" />
              <h3 class="font-semibold text-sm">Top 5 Most Valuable Assets</h3>
            </div>
          </template>
          <div class="relative h-[300px] w-full flex items-center justify-center">
            <Bar :data="topAssetsData" :options="horizontalBarOptions" />
          </div>
        </UCard>
      </div>

    </div>
  </div>
</template>