<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { OnboardingTemplate } from '~~/app/types'

definePageMeta({
    isTable: true
})

// ─── Data ─────────────────────────────────────────────────────────────────────
// Shared template store (module-level so new.vue can push here via navigateTo + state)
const { templates, deleteTemplate } = useTemplates()

// ─── State ────────────────────────────────────────────────────────────────────
const isConfirmDeleteOpen = ref(false)
const templateIdToDelete = ref<number | null>(null)

// ─── Methods ──────────────────────────────────────────────────────────────────
function confirmDelete(id: number) {
    templateIdToDelete.value = id
    isConfirmDeleteOpen.value = true
}

function executeDelete() {
    if (templateIdToDelete.value !== null) {
        deleteTemplate(templateIdToDelete.value)
        templateIdToDelete.value = null
        isConfirmDeleteOpen.value = false
    }
}

// ─── Table columns ────────────────────────────────────────────────────────────
const StatusBadge = resolveComponent('StatusBadge')
const UButton = resolveComponent('UButton')

const columns: TableColumn<OnboardingTemplate>[] = [
    { accessorKey: 'name', header: 'Template Name' },
    { accessorKey: 'description', header: 'Description' },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => h(StatusBadge, {
            status: row.original.status
        }),
    },
    {
        id: 'actions',
        header: '',
        meta: { class: { td: 'text-right space-x-1' } },
        cell: ({ row }) => [
            h(resolveComponent('UButton'), {
                color: 'neutral',
                variant: 'ghost',
                icon: 'i-lucide-pencil',
                size: 'sm',
                to: `/onboarding/templates/${row.original.id}/edit`,
                'aria-label': 'Edit template',
            }),
            h(resolveComponent('UButton'), {
                color: 'error',
                variant: 'ghost',
                icon: 'i-lucide-trash-2',
                size: 'sm',
                'aria-label': 'Delete template',
                onClick: () => confirmDelete(row.original.id),
            }),
        ],
    },
]

const container = useTemplateRef('container')
const header = useTemplateRef('header')
const getScrollElement = () => container.value
const { height: headerHeight } = useElementSize(header, undefined, { box: 'border-box' })

// Search and filter state
const search = ref('')
const selectedStatus = ref('All')
const viewMode = ref<'grid' | 'table'>('table') // Default to table
const status = [
    { label: 'All', value: 'All' },
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Published', value: 'PUBLISHED' },
]

const filteredTemplates = computed(() => {
    let result = templates.value

    if (selectedStatus.value !== 'All') {
        result = result.filter(t => t.status === selectedStatus.value)
    }

    if (search.value) {
        const q = search.value.toLowerCase()
        result = result.filter(t => 
            t.name.toLowerCase().includes(q) || 
            t.description.toLowerCase().includes(q)
        )
    }

    return result
})
</script>

<template>
    <div ref="container" class="flex-1 overflow-y-auto scrollbar">
        <div ref="header">
            <!-- Header -->
            <div class="flex items-center gap-4 p-4">
                <UPageCard
                    title="Onboarding Templates"
                    description="Build reusable new-hire onboarding checklists."
                    variant="naked"
                    orientation="horizontal"
                    class="w-full"
                    :ui="{ title: 'text-2xl font-bold' }"
                >
                    <div class="flex justify-end gap-2 flex-1">
                        <UFieldGroup>
                            <UButton icon="i-lucide-list" color="neutral" :variant="viewMode === 'table' ? 'subtle' : 'outline'" @click="viewMode = 'table'" />
                            <UButton icon="i-lucide-layout-grid" color="neutral" :variant="viewMode === 'grid' ? 'subtle' : 'outline'" @click="viewMode = 'grid'" />
                        </UFieldGroup>
                        <UButton color="primary" to="/onboarding/templates/new">
                            <UIcon name="i-lucide-plus" class="size-4" />
                            Create Template
                        </UButton>
                    </div>
                </UPageCard>
            </div>

            <!-- Search & filter -->
            <div class="flex items-center gap-3 px-4 pb-4">
                <UInput
                    v-model="search"
                    placeholder="Search..."
                    icon="i-lucide-search"
                    class="flex-1"
                />
                <USelect v-model="selectedStatus" :items="status" class="w-32" />
            </div>

            <!-- Separator -->
            <USeparator />
        </div>

        <!-- Templates Table -->
        <UTable v-if="viewMode === 'table'" :data="filteredTemplates" :columns="columns">
            <template #empty>
                <UEmpty
                    icon="i-lucide-file-check"
                    title="No templates found"
                    description="No templates match your search criteria."
                    variant="naked"
                />
            </template>
        </UTable>

        <!-- Templates Grid -->
        <div v-else>
            <div v-if="filteredTemplates.length > 0" class="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <UCard v-for="template in filteredTemplates" :key="template.id" class="flex flex-col h-full shadow-sm group hover:ring-1 hover:ring-primary/50 transition-all" :ui="{ root: 'flex flex-col', body: 'flex-1 flex flex-col gap-4 sm:p-4 group-hover:bg-linear-to-tl group-hover:from-primary/10 group-hover:from-5% group-hover:to-default transition-all duration-300 ease-out' }">
                    <div class="flex items-start justify-between gap-2">
                        <div class="min-w-0">
                            <div class="font-semibold text-highlighted group-hover:text-primary transition-colors truncate">{{ template.name }}</div>
                            <!-- <div class="text-xs text-dimmed">{{ template.dateCreated }}</div> -->
                        </div>
                        <!-- <StatusBadge :status="template.status" class="shrink-0" /> -->
                    </div>
                    <p class="text-sm text-muted flex-1">
                        {{ template.description }}
                    </p>

                    <!-- Animated bottom row -->
                    <div class="relative mt-auto">
                        <!-- Default: status + dateCreated -->
                        <div class="flex items-center justify-between transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-1">
                            <StatusBadge :status="template.status" />
                            <span class="text-[10px] font-semibold text-dimmed/70 uppercase tracking-wider">{{ template.dateCreated }}</span>
                        </div>
                        <!-- Hover: Actions -->
                        <div class="absolute inset-0 flex items-center gap-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                            <UButton
                                color="warning"
                                variant="soft"
                                :to="`/onboarding/templates/${template.id}/edit`"
                                aria-label="Edit template"
                                class="flex-1 justify-center"
                            >
                                <UIcon name="i-lucide-pencil" class="size-4" />
                                Edit
                            </UButton>
                            <UButton
                                color="error"
                                variant="soft"
                                aria-label="Delete template"
                                @click="confirmDelete(template.id)"
                                class="flex-1 justify-center"
                            >
                                <UIcon name="i-lucide-trash-2" class="size-4" />
                                Delete
                            </UButton>
                        </div>
                    </div>
                </UCard>
            </div>
            <div v-else class="p-4">
                <UEmpty
                    icon="i-lucide-file-check"
                    title="No templates found"
                    description="No templates match your search criteria."
                    variant="naked"
                />
            </div>
        </div>

        <ConfirmModal
            v-model:open="isConfirmDeleteOpen"
            title="Delete Template"
            description="Are you sure you want to delete this template? This action cannot be undone."
            confirm-label="Delete"
            color="error"
            icon="i-lucide-trash-2"
            :success-toast="{ title: 'Template deleted successfully' }"
            @confirm="executeDelete"
        />
    </div>
</template>