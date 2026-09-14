<script setup lang="ts">
import { ref, reactive } from 'vue'

definePageMeta({
    isTable: true
})

const template = reactive({
    name: '',
    description: '',
    status: 'Draft'
})

const categories = ['Documentation', 'Hardware', 'Software', 'Training', 'Introduction']
const assignees = ['HR', 'IT', 'Manager', 'Buddy']
const statuses = ['Draft', 'Published']

const tasks = ref([
    { id: 1, name: '', description: '', category: 'Documentation', assignee: 'HR', dueDays: 1, required: true }
])

const expandedTasks = ref<Set<number>>(new Set([1]))

function addTask() {
    const id = Date.now()
    tasks.value.push({
        id,
        name: '',
        description: '',
        category: 'Documentation',
        assignee: 'HR',
        dueDays: 1,
        required: true
    })
    expandedTasks.value.add(id)
}

function removeTask(index: number) {
    const id = tasks.value[index]?.id
    if (id) expandedTasks.value.delete(id)
    tasks.value.splice(index, 1)
}

function toggleExpand(id: number) {
    if (expandedTasks.value.has(id)) {
        expandedTasks.value.delete(id)
    } else {
        expandedTasks.value.add(id)
    }
}

function moveTaskUp(index: number) {
    if (index > 0) {
        const temp = tasks.value[index]!
        tasks.value[index] = tasks.value[index - 1]!
        tasks.value[index - 1] = temp
    }
}

function moveTaskDown(index: number) {
    if (index < tasks.value.length - 1) {
        const temp = tasks.value[index]!
        tasks.value[index] = tasks.value[index + 1]!
        tasks.value[index + 1] = temp
    }
}
</script>

<template>
    <div class="flex flex-col min-h-full">
        <div class="flex-1 overflow-y-auto scrollbar p-4">
            <UContainer class="space-y-6">
                <!-- Header -->
                <div class="flex items-center gap-4">
                    <UButton color="neutral" variant="ghost" icon="i-lucide-arrow-left" to="/onboarding/templates"
                        aria-label="Back to templates" />
                    <UPageCard
                        title="New Template"
                        description="Define the checklist tasks for a new-hire onboarding template"
                        variant="naked"
                        orientation="horizontal"
                        class="flex-1"
                        :ui="{
                            title: 'text-2xl font-bold'
                        }"
                    >
                        <div class="flex justify-end gap-2 flex-1">
                            <UButton color="neutral" variant="outline" icon="i-lucide-save">
                                Save as Draft
                            </UButton>
                            <UButton color="primary" icon="i-lucide-send-horizontal">
                                Publish
                            </UButton>
                        </div>
                    </UPageCard>
                </div>

                <!-- Template Details -->
                <UCard class="shadow-sm" :ui="{ body: 'space-y-4' }">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <UIcon name="i-lucide-file-text" class="size-4 text-primary" />
                            <span class="font-semibold text-highlighted">Template Details</span>
                        </div>
                    </template>

                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <UFormField label="Template Name" required class="md:col-span-3">
                            <UInput v-model="template.name" placeholder="e.g. Software Engineer Onboarding"
                                icon="i-lucide-tag" class="w-full" />
                        </UFormField>

                        <UFormField label="Status">
                            <USelect v-model="template.status" :items="statuses" class="w-full" />
                        </UFormField>

                        <UFormField label="Description" class="md:col-span-4">
                            <UTextarea v-model="template.description" placeholder="Brief description of this template..."
                                :rows="2" class="w-full" />
                        </UFormField>
                    </div>
                </UCard>

                <!-- Tasks Section -->
                <div class="space-y-4">
                    <!-- Section header -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <UIcon name="i-lucide-list-checks" class="size-4 text-primary" />
                            <span class="font-semibold text-highlighted">Checklist Tasks</span>
                            <UBadge :label="String(tasks.length)" color="primary" variant="subtle" size="sm" />
                        </div>
                        <UButton color="primary" variant="soft" icon="i-lucide-plus" size="sm" @click="addTask">
                            Add Task
                        </UButton>
                    </div>

                    <!-- Empty State -->
                    <UCard v-if="tasks.length === 0" :ui="{ body: 'py-10' }">
                        <UEmpty icon="i-lucide-clipboard-list" title="No tasks yet"
                            description="Click 'Add Task' to start building your onboarding checklist." variant="naked" />
                    </UCard>

                    <!-- Task Cards -->
                    <UCard v-for="(task, index) in tasks" :key="task.id" :ui="{ body: 'p-4 sm:p-4' }"
                        class="shadow-sm group transition-all duration-150 hover:ring-1 hover:ring-primary/30">
                        <!-- Primary row: always visible -->
                        <div class="flex items-center gap-2">
                            <!-- Step badge -->
                            <div
                                class="shrink-0 size-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center select-none">
                                {{ index + 1 }}
                            </div>

                            <!-- Task Name -->
                            <UInput v-model="task.name" placeholder="Task name..." class="flex-1 min-w-0" />

                            <!-- Category -->
                            <USelect v-model="task.category" :items="categories" class="w-36 hidden md:flex" />

                            <!-- Assignee -->
                            <USelect v-model="task.assignee" :items="assignees" class="w-28 hidden md:flex" />

                            <!-- Due Days -->
                            <UInputNumber v-model="task.dueDays" :min="1" class="w-20 hidden md:flex" />

                            <!-- Required toggle -->
                            <UTooltip :text="task.required ? 'Mark as optional' : 'Mark as required'">
                                <UButton :icon="task.required ? 'i-lucide-star' : 'i-lucide-star-off'"
                                    :color="task.required ? 'warning' : 'neutral'"
                                    :variant="task.required ? 'soft' : 'ghost'"
                                    @click="task.required = !task.required" />
                            </UTooltip>

                            <!-- Expand toggle -->
                            <UTooltip :text="expandedTasks.has(task.id) ? 'Collapse' : 'Add description'">
                                <UButton
                                    :icon="expandedTasks.has(task.id) ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                                    color="neutral" variant="ghost" @click="toggleExpand(task.id)" />
                            </UTooltip>

                            <!-- Reorder + Delete -->
                            <div class="flex items-center gap-0.5 border-l border-default pl-2 ml-1">
                                <UButton color="neutral" variant="ghost" icon="i-lucide-arrow-up"
                                    :disabled="index === 0" @click="moveTaskUp(index)" />
                                <UButton color="neutral" variant="ghost" icon="i-lucide-arrow-down"
                                    :disabled="index === tasks.length - 1" @click="moveTaskDown(index)" />
                                <UButton color="error" variant="ghost" icon="i-lucide-trash-2"
                                    @click="removeTask(index)" />
                            </div>
                        </div>

                        <!-- Mobile: Category / Assignee / Due -->
                        <div class="md:hidden flex items-center gap-2 mt-2 ml-8">
                            <USelect v-model="task.category" :items="categories" class="flex-1" />
                            <USelect v-model="task.assignee" :items="assignees" class="flex-1" />
                            <UInputNumber v-model="task.dueDays" :min="1" class="w-20" />
                        </div>

                        <!-- Expanded: description (smooth height animation via grid) -->
                        <div class="grid transition-[grid-template-rows] duration-200 ease-out"
                            :class="expandedTasks.has(task.id) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
                            <div class="overflow-hidden">
                                <div class="mt-3 ml-8 pt-3 border-t border-default">
                                    <UFormField label="Description"
                                        hint="Optional — add instructions or context for this task">
                                        <UTextarea v-model="task.description"
                                            placeholder="Additional details or instructions..." :rows="2" class="w-full" />
                                    </UFormField>
                                </div>
                            </div>
                        </div>
                    </UCard>


                    <!-- Add Task Button (secondary, bottom) -->
                    <UButton v-if="tasks.length > 0" color="neutral" variant="subtle" icon="i-lucide-plus"
                        class="w-full justify-center" @click="addTask">
                        Add Another Task
                    </UButton>
                </div>
            </UContainer>
        </div>

        <!-- Sticky Footer -->
        <!-- <div class="sticky bottom-0 bg-default/95 backdrop-blur border-t border-default p-4 z-10">
            <div class="flex items-center justify-between">
                <p class="text-sm text-dimmed hidden sm:block">
                    <UIcon name="i-lucide-info" class="size-3.5 inline-block mr-1" />
                    {{ tasks.length }} task{{ tasks.length !== 1 ? 's' : '' }} in this template
                </p>
                <div class="flex items-center gap-3 ml-auto">
                    <UButton color="neutral" variant="ghost" to="/onboarding/templates">
                        Cancel
                    </UButton>
                    <UButton color="neutral" variant="outline" icon="i-lucide-save">
                        Save as Draft
                    </UButton>
                    <UButton color="primary" icon="i-lucide-send-horizontal">
                        Publish
                    </UButton>
                </div>
            </div>
        </div> -->
    </div>
</template>
