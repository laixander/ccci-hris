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

// d3-org-chart ships no TypeScript declarations, so we type the node
// wrapper object that its callbacks receive.
type D3OrgNode = {
  data: OrgNode
  depth: number
  width: number
  height: number
  id: string
  parentId: string | null
}

const props = defineProps<{
  data: OrgNode[]
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

onMounted(() => {
  if (chartContainer.value) {
    chart = new D3OrgChart()
      .container(chartContainer.value)
      .data(props.data)
      .nodeHeight(() => 175)
      .nodeWidth(() => 205)
      .childrenMargin(() => 65)
      .compactMarginBetween(() => 40)
      .compactMarginPair(() => 35)
      .siblingsMargin(() => 20)
      .linkUpdate(function (this: SVGPathElement, _d: D3OrgNode) {
        this.style.stroke = '#6366f1'
        this.style.strokeWidth = '2'
        this.style.strokeOpacity = '0.35'
      })
      .nodeContent(function (d: D3OrgNode) {
        const node = d.data
        const gradient = getGradient(d.depth)

        const avatarsHtml = node.avatars.slice(0, 4).map((seed, idx) => `
          <img
            src="${dicebearUrl(seed)}"
            alt="${seed}"
            style="width:26px;height:26px;border-radius:9999px;outline:2px solid #fff;
                   margin-left:${idx === 0 ? '0' : '-8px'};display:inline-block;
                   object-fit:cover;box-shadow:0 1px 3px rgba(0,0,0,.25);
                   position:relative;z-index:${idx + 1};"
          />`
        ).join('')

        const extra = node.avatars.length > 4 ? `
          <div style="display:inline-flex;align-items:center;justify-content:center;
                      border-radius:9999px;background:rgba(255,255,255,.25);color:#fff;
                      font-size:9px;font-weight:700;outline:2px solid #fff;
                      width:26px;height:26px;margin-left:-8px;position:relative;z-index:10;">
            +${node.avatars.length - 4}
          </div>` : ''

        return `
          <div style="width:205px;height:175px;padding:10px;box-sizing:border-box;">
            <div style="
              width:100%;height:100%;
              background:${gradient};
              border-radius:16px;padding:14px 12px 12px;
              box-sizing:border-box;display:flex;flex-direction:column;
              align-items:center;justify-content:space-between;
              box-shadow:0 4px 20px rgba(99,102,241,.28),0 1px 4px rgba(0,0,0,.15);
              position:relative;overflow:hidden;">

              <!-- shine overlay -->
              <div style="position:absolute;inset:0;
                          background:linear-gradient(135deg,rgba(255,255,255,.18) 0%,rgba(255,255,255,0) 60%);
                          border-radius:16px;pointer-events:none;"></div>

              <!-- icon badge -->
              <div style="background:rgba(255,255,255,.2);border-radius:8px;
                          width:30px;height:30px;display:flex;align-items:center;
                          justify-content:center;backdrop-filter:blur(4px);">
                <span class="${node.icon}"
                      style="width:14px;height:14px;display:inline-block;background-color:#fff;"></span>
              </div>

              <!-- title -->
              <div style="font-size:11px;font-weight:700;text-align:center;line-height:1.35;
                          width:100%;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.2);
                          padding:0 4px;display:-webkit-box;-webkit-line-clamp:2;
                          -webkit-box-orient:vertical;overflow:hidden;"
                   title="${node.title}">${node.title}</div>

              <!-- avatars + count -->
              <div style="display:flex;flex-direction:column;align-items:center;gap:5px;width:100%;">
                <div style="display:flex;align-items:center;justify-content:center;">
                  ${avatarsHtml}${extra}
                </div>
                <div style="font-size:9px;font-weight:600;letter-spacing:.04em;
                            background:rgba(255,255,255,.22);color:#fff;
                            border-radius:20px;padding:2px 10px;backdrop-filter:blur(4px);">
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
</script>

<template>
  <div ref="chartContainer" class="w-full h-full" />
</template>
