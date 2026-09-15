<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

definePageMeta({
    isTable: true
})

// Shared template store (module-level so new.vue can push here via navigateTo + state)
const { templates, deleteTemplate } = useTemplates()

type OnboardingTemplate = {
    id: number
    name: string
    description: string
    status: 'Draft' | 'Published'
    dateCreated: string
}

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const columns: TableColumn<OnboardingTemplate>[] = [
    { accessorKey: 'name', header: 'Template Name' },
    { accessorKey: 'description', header: 'Description' },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => h(UBadge, {
            label: row.original.status,
            color: row.original.status === 'Published' ? 'success' : 'neutral',
            variant: 'subtle',
            size: 'sm',
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
                onClick: () => deleteTemplate(row.original.id),
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
    { label: 'Draft', value: 'Draft' },
    { label: 'Published', value: 'Published' },
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
                            <UButton icon="i-lucide-layout-grid" color="neutral" :variant="viewMode === 'grid' ? 'subtle' : 'outline'" @click="viewMode = 'grid'" />
                            <UButton icon="i-lucide-list" color="neutral" :variant="viewMode === 'table' ? 'subtle' : 'outline'" @click="viewMode = 'table'" />
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
                <UCard v-for="template in filteredTemplates" :key="template.id" class="flex flex-col h-full shadow-sm group hover:ring-1 hover:ring-primary/50 transition-all" :ui="{ root: 'flex flex-col', body: 'flex-1 flex flex-col gap-4 sm:p-4', footer: 'p-0 sm:p-0' }">
                    <div class="flex items-start justify-between gap-2">
                        <div class="space-y-0.5 min-w-0">
                            <div class="font-semibold text-highlighted group-hover:text-primary transition-colors truncate">{{ template.name }}</div>
                            <div class="text-xs text-dimmed">{{ template.dateCreated }}</div>
                        </div>
                        <UBadge
                            :label="template.status"
                            :color="template.status === 'Published' ? 'success' : 'neutral'"
                            variant="subtle"
                            size="sm"
                            class="shrink-0"
                        />
                    </div>
                    <p class="text-sm text-muted">
                        {{ template.description }}
                    </p>
                    <template #footer>
                        <div class="flex items-stretch">
                            <UButton
                                block
                                color="neutral"
                                variant="ghost"
                                :to="`/onboarding/templates/${template.id}/edit`"
                                aria-label="Edit template"
                                class="flex-1 rounded-none py-2"
                            >
                                <UIcon name="i-lucide-pencil" class="size-4" />
                                Edit
                            </UButton>
                            <USeparator orientation="vertical" class="h-auto" />
                            <UButton
                                block
                                color="error"
                                variant="ghost"
                                aria-label="Delete template"
                                @click="deleteTemplate(template.id)"
                                class="flex-1 rounded-none py-2"
                            >
                                <UIcon name="i-lucide-trash-2" class="size-4" />
                                Delete
                            </UButton>
                        </div>
                    </template>
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
    </div>
</template>