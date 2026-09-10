<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { OrgChart as D3OrgChart } from 'd3-org-chart'

type OrgNode = {
  id: string
  parentId: string
  title: string
  icon: string
  employees: number
  avatars: string[]
}

type FloatingRole = {
  title: string
  icon: string
  employees: number
  avatars: string[]
}

// d3-org-chart ships no TypeScript declarations, so we type the node
// wrapper object that its callbacks receive.
type D3OrgNode = {
  data: OrgNode & { _directSubordinatesPaging?: number }
  depth: number
  width: number
  height: number
  id: string
  parentId: string | null
  children?: D3OrgNode[]
}

const props = defineProps<{
  data: OrgNode[]
  floatingRoles?: FloatingRole[]
}>()

const chartContainer = ref<HTMLElement | null>(null)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let chart: any = null

const dicebearUrl = (seed: string) =>
    `https://api.dicebear.com/10.x/thumbs/svg?seed=${encodeURIComponent(seed)}`

// Gradient palette — one per depth level
const depthGradients = [
  'linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)',   // root — violet
  'linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%)',   // depth 1 — sky→violet
  'linear-gradient(135deg,#14b8a6 0%,#0ea5e9 100%)',   // depth 2 — teal→sky
  'linear-gradient(135deg,#22c55e 0%,#14b8a6 100%)',   // depth 3 — green→teal
  'linear-gradient(135deg,#f59e0b 0%,#22c55e 100%)',   // depth 4+
]
const getGradient = (depth: number) =>
  depthGradients[Math.min(depth, depthGradients.length - 1)] ?? depthGradients[depthGradients.length - 1]

// Map UnoCSS/Iconify class names to inline SVG paths so they render
// inside d3-org-chart's foreignObject HTML strings (no CSS dependency needed).
const iconSvgPaths: Record<string, string> = {
  'i-lucide-briefcase': `<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>`,
  'i-lucide-lock': `<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
  'i-lucide-users': `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  'i-lucide-user': `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
  'i-lucide-star': `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
  'i-lucide-building-2': `<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>`,
  'i-lucide-git-fork': `<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/>`,
}
function getIconSvg(iconClass: string): string {
  const path = iconSvgPaths[iconClass] ?? `<circle cx="12" cy="12" r="9"/>`
  return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`
}

onMounted(() => {
  if (chartContainer.value) {
    chart = new D3OrgChart()
      .container(chartContainer.value as unknown as string)
      .data(props.data)
      .nodeHeight(() => 175)
      .nodeWidth(() => 205)
      .childrenMargin(() => 65)
      .compactMarginBetween(() => 40)
      .compactMarginPair(() => 35)
      .siblingsMargin(() => 20)
      // Custom expand/collapse toggle button — inline SVG, no CSS class needed
      .buttonContent(({ node }: any) => {
        const isExpanded = !!node.children
        const count = node.data._directSubordinatesPaging ?? 0
        const chevron = isExpanded
          ? `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`
          : `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`
        return `<div class="flex flex-col items-center justify-center gap-px w-7 h-7 rounded-md mx-auto border border-indigo-500 bg-indigo-500/20 text-white backdrop-blur-sm shadow-[0_2px_8px_rgba(99,102,241,0.2)]">${chevron}<span class="text-white font-bold leading-none" style="font-size:7px;">${count}</span></div>`
      })
      .linkUpdate(function (this: SVGPathElement, _d: any) {
        this.style.stroke = '#6366f1'
        this.style.strokeWidth = '2'
        this.style.strokeOpacity = '0.35'
      })
      .nodeContent(function (d: any) {
        const node = d.data as D3OrgNode['data']
        const gradient = getGradient(d.depth)
        const iconSvg = getIconSvg(node.icon)

        const avatarsHtml = node.avatars.slice(0, 4).map((seed, idx) => `
          <img
            src="${dicebearUrl(seed)}"
            alt="${seed}"
            style="width:26px;height:26px;margin-left:${idx === 0 ? '0' : '-8px'};z-index:${idx + 1};"
            class="rounded-full outline outline-2 outline-white inline-block object-cover shadow-sm relative"
          />`
        ).join('')

        const extra = node.avatars.length > 4 ? `
          <div class="inline-flex items-center justify-center rounded-full bg-white/25 text-white outline outline-2 outline-white relative" style="width:26px;height:26px;margin-left:-8px;z-index:10;font-size:9px;font-weight:700;">
            +${node.avatars.length - 4}
          </div>` : ''

        return `
          <div class="box-border" style="width:205px;height:175px;padding:10px;">
            <div class="flex flex-col items-center gap-3 w-full h-full rounded-2xl box-border relative overflow-hidden" style="background:${gradient};padding:14px 12px 12px;box-shadow:0 4px 20px rgba(99,102,241,.28),0 1px 4px rgba(0,0,0,.15);">

              <!-- shine overlay -->
              <div class="absolute inset-0 rounded-2xl pointer-events-none" style="background:linear-gradient(135deg,rgba(255,255,255,.18) 0%,rgba(255,255,255,0) 60%);"></div>

              <!-- halftone dot texture -->
              <div class="absolute inset-0 rounded-2xl pointer-events-none opacity-60" style="background-image:radial-gradient(circle,rgba(255,255,255,0.22) 1px,transparent 1px);background-size:7px 7px;"></div>

              <!-- icon badge -->
              <div class="flex items-center justify-center rounded-lg backdrop-blur-sm bg-white/20" style="width:30px;height:30px;">
                ${iconSvg}
              </div>

              <!-- title -->
              <div class="w-full text-center font-bold text-white overflow-hidden px-1" style="font-size:11px;line-height:1.35;text-shadow:0 1px 2px rgba(0,0,0,.2);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;" title="${node.title}">${node.title}</div>

              <!-- avatars + count -->
              <div class="flex flex-col items-center gap-1 w-full">
                <div class="flex items-center justify-center">
                  ${avatarsHtml}${extra}
                </div>
                <div class="text-white font-semibold rounded-full backdrop-blur-sm bg-white/20 px-2.5 py-0.5" style="font-size:9px;letter-spacing:.04em;">
                  ${node.employees} ${node.employees === 1 ? 'employee' : 'employees'}
                </div>
              </div>
            </div>
          </div>`
      })
      .render()

    chart.expandAll()
  }
})

watch(() => props.data, (newData) => {
  if (chart) {
    chart.data(newData).render()
    chart.expandAll()
  }
}, { deep: true })

function zoomIn() { chart?.zoomIn() }
function zoomOut() { chart?.zoomOut() }
function fitChart() {
  if (chart) {
    chart.fit()
  }
}
function expandAll() { chart?.expandAll() }
function collapseAll() { chart?.collapseAll() }
</script>

<template>
  <div class="relative w-full h-full">
    <!-- Chart canvas -->
    <div ref="chartContainer" class="w-full h-full" />

    <!-- Floating roles (top right) -->
    <div v-if="props.floatingRoles?.length" class="absolute top-6 right-6 flex flex-col gap-3 z-20">
      <div class="text-[9px] font-semibold text-dimmed uppercase tracking-widest text-right mb-1 mx-auto">Floating Roles</div>
      <div
        v-for="role in props.floatingRoles"
        :key="role.title"
        class="relative overflow-hidden w-36 bg-default/80 backdrop-blur-sm border border-[var(--ui-border)] rounded-xl p-3 shadow-lg hover:border-primary/50 hover:shadow-primary/10 hover:shadow-xl transition-all"
      >
        <!-- halftone dot texture -->
        <div
          class="absolute inset-0 rounded-xl pointer-events-none opacity-20"
          style="background-image:radial-gradient(circle,color-mix(in srgb,var(--ui-primary) 30%,transparent) 1px,transparent 1px);background-size:7px 7px;"
        />
        <!-- card content -->
        <div class="relative">
          <div class="flex justify-center mb-2">
            <div class="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <UIcon :name="role.icon" class="size-3.5 text-primary" />
            </div>
          </div>
          <div class="text-[10px] font-semibold text-center mb-2 leading-tight px-1">
            {{ role.title }}
          </div>
          <div class="flex justify-center mb-2">
            <UAvatar
              :src="dicebearUrl(role.avatars[0] || '')"
              :alt="role.avatars[0]"
              size="xs"
              class="ring-2 ring-background"
            />
          </div>
          <div class="flex justify-center">
            <div class="text-[9px] bg-muted px-2 py-0.5 rounded-full text-dimmed font-medium">
              {{ role.employees }} employee
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating controls toolbar -->
    <div
      class="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5
             bg-default/80 backdrop-blur-md border border-[var(--ui-border)] rounded-2xl
             shadow-xl px-3 py-2"
    >
      <!-- Zoom in -->
      <UTooltip text="Zoom in">
        <UButton
          variant="ghost"
          color="neutral"
          size="xs"
          icon="i-lucide-zoom-in"
          @click="zoomIn"
        />
      </UTooltip>

      <!-- Zoom out -->
      <UTooltip text="Zoom out">
        <UButton
          variant="ghost"
          color="neutral"
          size="xs"
          icon="i-lucide-zoom-out"
          @click="zoomOut"
        />
      </UTooltip>

      <div class="w-px h-5 bg-[var(--ui-border)]" />

      <!-- Fit to screen -->
      <UTooltip text="Fit to screen">
        <UButton
          variant="ghost"
          color="neutral"
          size="xs"
          icon="i-lucide-maximize-2"
          @click="fitChart"
        />
      </UTooltip>

      <div class="w-px h-5 bg-[var(--ui-border)]" />

      <!-- Expand all -->
      <UTooltip text="Expand all">
        <UButton
          variant="ghost"
          color="neutral"
          size="xs"
          icon="i-lucide-unfold-vertical"
          @click="expandAll"
        />
      </UTooltip>

      <!-- Collapse all -->
      <UTooltip text="Collapse all">
        <UButton
          variant="ghost"
          color="neutral"
          size="xs"
          icon="i-lucide-fold-vertical"
          @click="collapseAll"
        />
      </UTooltip>
    </div>
  </div>
</template>

<style>
.svg-chart-container {
  height: 100% !important;
}
</style>
