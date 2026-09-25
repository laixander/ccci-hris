<script setup lang="ts">
import { h, resolveComponent, ref, computed, useTemplateRef } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { AssetLocation } from '~/types'
import { useElementSize } from '@vueuse/core'

definePageMeta({
    isTable: true
})

const UButton = resolveComponent('UButton')
const ConfirmModal = resolveComponent('ConfirmModal')
const UIcon = resolveComponent('UIcon')

const { data: locationData } = await useFetch('/api/asset-locations')
const locations = ref<AssetLocation[]>(locationData.value?.locations ?? [])

const viewMode = ref<'grid' | 'table'>('table')
const search = ref('')

const filteredLocations = computed(() => {
    return locations.value.filter(l =>
        l.name.toLowerCase().includes(search.value.toLowerCase()) ||
        l.description.toLowerCase().includes(search.value.toLowerCase())
    )
})

const columns: TableColumn<AssetLocation>[] = [
    {
        id: 'icon',
        header: '',
        meta: { class: { th: 'w-10', td: 'w-10' } },
        cell: ({ row }) => h('div', { class: 'flex items-center justify-center size-8 rounded-md bg-primary/10' },
            h(UIcon, { name: row.original.icon, class: 'size-4 text-primary' })
        )
    },
    {
        accessorKey: 'name',
        header: 'Name',
        meta: { class: { th: 'w-56' } },
        cell: ({ row }) => h('span', { class: 'font-semibold text-highlighted' }, row.original.name)
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => h('span', { class: 'text-dimmed' }, row.original.description)
    },
    {
        id: 'actions',
        header: '',
        meta: { class: { th: 'w-24', td: 'text-right' } },
        cell: ({ row }) => h('div', { class: 'flex items-center justify-end gap-1' }, [
            h(UButton, {
                icon: 'i-lucide-pencil',
                color: 'neutral',
                variant: 'ghost',
                size: 'sm',
                onClick: () => openModal(row.original)
            }),
            h(UButton, {
                icon: 'i-lucide-trash-2',
                color: 'error',
                variant: 'ghost',
                size: 'sm',
                onClick: () => confirmDelete(row.original)
            })
        ])
    }
]

const container = useTemplateRef('container')
const header = useTemplateRef('header')
const getScrollElement = () => container.value
const { height: headerHeight } = useElementSize(header, undefined, { box: 'border-box' })

const toast = useToast()

// Form modal
const isModalOpen = ref(false)
const modalMode = ref<'create' | 'edit'>('create')
const selectedLocation = ref<AssetLocation | undefined>(undefined)

const openModal = (location?: AssetLocation) => {
    selectedLocation.value = location
    modalMode.value = location ? 'edit' : 'create'
    isModalOpen.value = true
}

const handleSave = (data: { id: number; name: string; description: string; icon: string }) => {
    if (modalMode.value === 'create') {
        locations.value.unshift({
            id: Date.now(),
            name: data.name,
            description: data.description,
            icon: data.icon
        })
        toast.add({ title: 'Location added', description: 'The new location has been successfully created.', color: 'success', icon: 'i-lucide-check-circle' })
    } else {
        const index = locations.value.findIndex(l => l.id === data.id)
        if (index !== -1) {
            locations.value[index] = { id: data.id, name: data.name, description: data.description, icon: data.icon }
            toast.add({ title: 'Location updated', description: 'The location details have been saved.', color: 'success', icon: 'i-lucide-check-circle' })
        }
    }
}

// Delete modal
const isConfirmOpen = ref(false)
const locationToDelete = ref<AssetLocation | null>(null)

const confirmDelete = (location: AssetLocation) => {
    locationToDelete.value = location
    isConfirmOpen.value = true
}

const performDelete = () => {
    if (locationToDelete.value) {
        locations.value = locations.value.filter(l => l.id !== locationToDelete.value!.id)
        toast.add({ title: 'Location deleted', description: `"${locationToDelete.value.name}" has been removed.`, color: 'success', icon: 'i-lucide-trash' })
    }
    isConfirmOpen.value = false
}
</script>

<template>
    <div ref="container" class="flex-1 overflow-y-auto scrollbar flex flex-col">
        <div ref="header">
            <!-- Page header -->
            <div class="flex items-center justify-between p-4">
                <UPageCard
                    title="Asset Locations"
                    description="Manage asset locations"
                    variant="naked"
                    class="flex-1"
                    :ui="{ title: 'text-2xl font-bold' }"
                />
                <div class="flex items-center gap-2">
                    <UFieldGroup>
                        <UButton icon="i-lucide-list" color="neutral" :variant="viewMode === 'table' ? 'subtle' : 'outline'" @click="viewMode = 'table'" />
                        <UButton icon="i-lucide-layout-grid" color="neutral" :variant="viewMode === 'grid' ? 'subtle' : 'outline'" @click="viewMode = 'grid'" />
                    </UFieldGroup>
                    <UButton icon="i-lucide-plus" label="Add Location" color="primary" @click="openModal()" />
                </div>
            </div>

            <!-- Search -->
            <div class="flex items-center gap-3 px-4 pb-4">
                <UInput
                    v-model="search"
                    placeholder="Search locations..."
                    icon="i-lucide-search"
                    class="w-full"
                />
            </div>

            <USeparator />
        </div>

        <!-- Grid view -->
        <div v-if="viewMode === 'grid'" class="flex-1 flex flex-col p-4">
            <div v-if="filteredLocations.length === 0" class="flex-1 flex items-center justify-center py-16">
                <UEmpty
                    icon="i-lucide-map-pin"
                    title="No locations found"
                    description="Try adjusting your search."
                    variant="naked"
                />
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <UCard
                    v-for="location in filteredLocations"
                    :key="location.id"
                    class="shadow-sm group hover:ring-1 hover:ring-primary/40 transition-all flex flex-col"
                    :ui="{ body: 'relative flex flex-col flex-1 gap-2 sm:p-4 group-hover:bg-linear-to-tl group-hover:from-primary/10 group-hover:from-5% group-hover:to-default transition-all duration-300 ease-out' }"
                >
                    <div class="flex items-center gap-3">
                        <div class="flex-shrink-0 flex items-center justify-center size-9 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <UIcon :name="location.icon" class="size-4 text-primary" />
                        </div>
                        <div class="font-semibold text-highlighted group-hover:text-primary transition-colors leading-tight">{{ location.name }}</div>
                    </div>

                    <!-- Animated swap on hover -->
                    <div class="relative mt-auto">
                        <!-- Default: Description -->
                        <div class="text-sm text-dimmed transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-1">
                            <div class="line-clamp-2">{{ location.description || 'No description provided.' }}</div>
                        </div>

                        <!-- Hover: Actions -->
                        <div class="absolute inset-0 flex items-center gap-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                            <UButton color="warning" variant="soft" class="flex-1 justify-center" @click="openModal(location)">
                                <UIcon name="i-lucide-pencil" class="size-4" />
                                Edit
                            </UButton>
                            <UButton color="error" variant="soft" class="flex-1 justify-center" @click="confirmDelete(location)">
                                <UIcon name="i-lucide-trash-2" class="size-4" />
                                Delete
                            </UButton>
                        </div>
                    </div>
                </UCard>
            </div>
        </div>

        <!-- Table view -->
        <UTable
            v-else
            :data="filteredLocations"
            :columns="columns"
            sticky
            class="flex-1 min-h-0"
            :virtualize="{ scrollMargin: headerHeight, getScrollElement }"
        >
            <template #empty>
                <UEmpty
                    icon="i-lucide-map-pin"
                    title="No locations found"
                    description="Try adjusting your search."
                    variant="naked"
                />
            </template>
        </UTable>
    </div>

    <!-- Add/Edit Modal -->
    <LocationModal
        v-model:open="isModalOpen"
        :mode="modalMode"
        :initial-data="selectedLocation"
        @save="handleSave"
    />

    <!-- Delete Confirm Modal -->
    <ConfirmModal
        v-model:open="isConfirmOpen"
        title="Delete Location"
        :description="`Are you sure you want to delete '${locationToDelete?.name}'? This action cannot be undone.`"
        confirm-label="Delete"
        color="error"
        icon="i-lucide-trash-2"
        @confirm="performDelete"
    />
</template>