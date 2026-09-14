<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'

const columns: ColumnDef<any>[] = [
    // use nuxt ui columns
    { accessorKey: 'name', header: 'Template Name' },
    { accessorKey: 'roles', header: 'Assigned Roles' },
    { accessorKey: 'description', header: 'Description' },
    { accessorKey: 'actions', header: 'Actions' },
]

const templates = [
    {
        id: 1,
        name: 'Software Engineer Onboarding',
        roles: ['Software Engineer'],
        description: 'Standard onboarding for new software engineers',
    },
    {
        id: 2,
        name: 'HR Generalist Onboarding',
        roles: ['HR Generalist'],
        description: 'Standard onboarding for new HR generalists',
    },
]

</script>
<template>
    <div class="space-y-6">
        <!-- Header -->
        <UPageCard
            title="Onboarding Templates"
            description="Build reusable new-hire onboarding checklists."
            variant="naked"
            orientation="horizontal"
            class="w-full"
            :ui="{ title: 'text-2xl font-bold' }"
        >
            <div class="flex justify-end gap-2 flex-1">
                <UButton color="primary" to="/onboarding/templates/new">
                    <UIcon name="i-lucide-plus" class="size-4" />
                    Create Template
                </UButton>
            </div>
        </UPageCard>

        <!-- Templates Table -->
        <UCard>
            <div class="overflow-x-auto">
                <UTable :items="templates" :columns="columns" />
            </div>
        </UCard>
    </div>
</template>