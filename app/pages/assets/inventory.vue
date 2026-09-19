<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Asset } from '~/types'

definePageMeta({
    isTable: true
})

const UButton = resolveComponent('UButton')
const StatusBadge = resolveComponent('StatusBadge')

// ─── Data ─────────────────────────────────────────────────────────────────────
const { data } = useLazyFetch('/api/assets')

const assets = computed<Asset[]>(() => data.value?.assets || [])

const container = useTemplateRef('container')
const header = useTemplateRef('header')
const getScrollElement = () => container.value
const { height: headerHeight } = useElementSize(header, undefined, { box: 'border-box' })

// ─── State ────────────────────────────────────────────────────────────────────
const search = ref('')
const selectedCategory = ref('All Categories')
const selectedStatus = ref('All Statuses')
const viewMode = ref<'grid' | 'table'>('table')

const categories = computed(() => [
    'All Categories',
    ...new Set(assets.value.map(a => a.category))
])

const statuses = computed(() => [
    { label: 'All Statuses', value: 'All Statuses' },
    ...Array.from(new Set(assets.value.map(a => a.status))).map(status => ({
        label: status.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()),
        value: status
    }))
])

const filteredAssets = computed(() => {
    return assets.value.filter(a => {
        const matchesSearch =
            a.name.toLowerCase().includes(search.value.toLowerCase()) ||
            a.assetTag.toLowerCase().includes(search.value.toLowerCase()) ||
            a.brandModel.toLowerCase().includes(search.value.toLowerCase())
        const matchesCat = selectedCategory.value === 'All Categories' || a.category === selectedCategory.value
        const matchesStatus = selectedStatus.value === 'All Statuses' || a.status === selectedStatus.value
        return matchesSearch && matchesCat && matchesStatus
    })
})

// ─── Table columns ────────────────────────────────────────────────────────────
const columns: TableColumn<Asset>[] = [
    { accessorKey: 'assetTag', header: 'Asset Tag' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'brandModel', header: 'Brand / Model' },
    { accessorKey: 'purchased', header: 'Purchased' },
    {
        accessorKey: 'cost',
        header: 'Cost',
        cell: ({ row }) => h('span', {}, `₱ ${(row.original.cost).toLocaleString(undefined, { minimumFractionDigits: 2 })}`)
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => h(StatusBadge, { status: row.original.status })
    },
    { accessorKey: 'location', header: 'Location' },
    {
        accessorKey: 'actions',
        header: '',
        meta: { class: { th: 'w-24', td: 'text-right' } },
        cell: ({ row }) => {
            return h('div', { class: 'flex items-center gap-1 justify-end' }, [
                h(UButton, {
                    icon: 'i-lucide-qr-code',
                    color: 'neutral',
                    variant: 'ghost',
                    size: 'sm',
                    'aria-label': 'QR Code'
                }),
                h(UButton, {
                    icon: 'i-lucide-edit-3',
                    color: 'neutral',
                    variant: 'ghost',
                    size: 'sm',
                    'aria-label': 'Edit'
                }),
                h(UButton, {
                    icon: 'i-lucide-trash-2',
                    color: 'error',
                    variant: 'ghost',
                    size: 'sm',
                    'aria-label': 'Delete'
                })
            ])
        }
    }
]

const isAddAssetModalOpen = ref(false)
</script>

<template>
    <div ref="container" class="flex-1 overflow-y-auto scrollbar">
        <div ref="header">
            <!-- Page header -->
            <div class="flex items-center gap-4 p-4">
                <UPageCard
                    title="Asset Inventory"
                    description="Inventory management and tracking"
                    variant="naked"
                    class="flex-1"
                    :ui="{
                        title: 'text-2xl font-bold'
                    }"
                />
                <div class="flex items-center gap-2">
                    <UFieldGroup>
                        <UButton icon="i-lucide-layout-grid" color="neutral" :variant="viewMode === 'grid' ? 'subtle' : 'outline'" @click="viewMode = 'grid'" />
                        <UButton icon="i-lucide-list" color="neutral" :variant="viewMode === 'table' ? 'subtle' : 'outline'" @click="viewMode = 'table'" />
                    </UFieldGroup>
                    <UButton icon="i-lucide-plus" label="Add Asset" @click="isAddAssetModalOpen = true" />
                </div>
            </div>

            <!-- Search & filter -->
            <div class="flex items-center gap-3 px-4 pb-4">
                <UInput
                    v-model="search"
                    placeholder="Search asset tag, name, brand, model..."
                    icon="i-lucide-search"
                    class="flex-1 max-w-md"
                />
                <USelect
                    v-model="selectedStatus"
                    :items="statuses"
                    class="w-48"
                />
                <USelect
                    v-model="selectedCategory"
                    :items="categories"
                    class="w-48"
                />
            </div>

            <USeparator />
        </div>

        <!-- Grid view -->
        <div v-if="viewMode === 'grid'" class="flex-1 flex flex-col p-4">
            <div v-if="filteredAssets.length === 0" class="flex-1 flex items-center justify-center py-16">
                <UEmpty
                    icon="i-lucide-box"
                    title="No assets found"
                    description="Try adjusting your search or filter."
                    variant="naked"
                />
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <UCard
                    v-for="asset in filteredAssets"
                    :key="asset.id"
                    class="shadow-sm cursor-pointer group hover:ring-1 hover:ring-primary/40 transition-all"
                    :ui="{ body: 'flex flex-col gap-4 sm:p-4 group-hover:bg-linear-to-tl group-hover:from-primary/10 group-hover:from-5% group-hover:to-default transition-all duration-300 ease-out' }"
                >
                    <!-- Header -->
                    <div class="flex items-start justify-between gap-4">
                        <div class="min-w-0">
                            <div class="font-semibold text-highlighted group-hover:text-primary transition-colors truncate">{{ asset.name }}</div>
                            <div class="text-xs text-dimmed truncate">{{ asset.assetTag }}</div>
                        </div>
                        <StatusBadge :status="asset.status" class="shrink-0" />
                    </div>

                    <!-- Details -->
                    <div class="grid grid-cols-1 gap-2 text-sm bg-muted dark:bg-muted/30 p-3 rounded-md">
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-dimmed">Category</span>
                            <span class="text-xs font-medium">{{ asset.category }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-dimmed">Brand / Model</span>
                            <span class="text-xs font-medium truncate ml-2 text-right">{{ asset.brandModel }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-dimmed">Location</span>
                            <span class="text-xs font-medium truncate ml-2 text-right">{{ asset.location }}</span>
                        </div>
                    </div>

                    <!-- Animated bottom row -->
                    <div class="relative mt-auto">
                        <div class="flex items-center justify-between transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-1">
                            <span class="text-xs text-dimmed">{{ asset.purchased }}</span>
                            <span class="text-sm font-semibold">₱ {{ (asset.cost).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</span>
                        </div>
                        <!-- Hover: View Details button -->
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 gap-2">
                            <UButton icon="i-lucide-qr-code" variant="soft" color="primary" />
                            <UButton icon="i-lucide-edit-3" variant="soft" color="primary" />
                        </div>
                    </div>
                </UCard>
            </div>
        </div>

        <!-- Table view -->
        <UTable
            v-else
            :data="filteredAssets"
            :columns="columns"
            sticky
            class="flex-1 min-h-0"
            :virtualize="{ scrollMargin: headerHeight, getScrollElement }"
        >
            <template #empty>
                <UEmpty
                    icon="i-lucide-box"
                    title="No assets found"
                    description="Try adjusting your search or filter."
                    variant="naked"
                />
            </template>
        </UTable>
        
        <AddAssetModal v-model:open="isAddAssetModalOpen" />
    </div>
</template>