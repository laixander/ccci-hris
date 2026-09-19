<script setup lang="ts">
import type { OnboardingTask } from '~~/app/types'

definePageMeta({
    isTable: true
})

// ─── State ────────────────────────────────────────────────────────────────────
const { addTemplate } = useTemplates()
const toast = useToast()

const scrollContainer = useTemplateRef<HTMLElement>('scrollContainer')
const sentinel = useTemplateRef<HTMLElement>('sentinel')
const isSticky = ref(false)

useIntersectionObserver(
    sentinel,
    (entries) => {
        if (entries && entries[0]) {
            isSticky.value = !entries[0].isIntersecting
        }
    },
    { root: scrollContainer, rootMargin: '-1px 0px 0px 0px' }
)

const template = reactive({
    name: '',
    description: '',
    status: 'DRAFT' as 'DRAFT' | 'PUBLISHED',
})

// ─── Data ─────────────────────────────────────────────────────────────────────
const categories = ['Documentation', 'Hardware', 'Software', 'Training', 'Introduction']
const assignees = ['HR', 'IT', 'Manager', 'Buddy']
const statuses = ['DRAFT', 'PUBLISHED']

const tasks = ref<OnboardingTask[]>([
    { id: 1, name: '', description: '', category: 'Documentation', assignee: 'HR', dueDays: 1, required: true }
])

const expandedTasks = ref<Set<number>>(new Set())

// ─── Methods ──────────────────────────────────────────────────────────────────
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

const draggedIndex = ref<number | null>(null)

function onDragStart(event: DragEvent, index: number) {
    draggedIndex.value = index
    if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('text/plain', index.toString())
        
        const target = event.target as HTMLElement
        const card = target.closest('.task-card')
        if (card) {
            event.dataTransfer.setDragImage(card, 20, 20)
        }
    }
}

function onDragEnter(event: DragEvent, index: number) {
    if (draggedIndex.value !== null && draggedIndex.value !== index) {
        const item = tasks.value.splice(draggedIndex.value, 1)[0]
        if (item) {
            tasks.value.splice(index, 0, item)
            draggedIndex.value = index
        }
    }
}

function onDragEnd() {
    draggedIndex.value = null
}

function saveTemplate(status: 'DRAFT' | 'PUBLISHED') {
    if (!template.name.trim()) {
        toast.add({ title: 'Template name is required', color: 'error', icon: 'i-lucide-alert-circle' })
        return
    }
    addTemplate({
        name: template.name.trim(),
        description: template.description.trim(),
        status,
        tasks: tasks.value,
    })
    toast.add({
        title: status === 'PUBLISHED' ? 'Template published!' : 'Template saved as draft',
        color: 'success',
        icon: 'i-lucide-check-circle',
    })
    navigateTo('/onboarding/templates')
}
</script>

<template>
    <div class="flex flex-col min-h-full">
        <div class="flex-1 overflow-y-auto scrollbar p-4" ref="scrollContainer">
            <div class="space-y-6">
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
                        <div class="flex justify-end gap-2 flex-1 transition-opacity duration-300" :class="isSticky ? 'opacity-0 pointer-events-none' : 'opacity-100'">
                            <UButton color="neutral" variant="outline" icon="i-lucide-save" @click="saveTemplate('DRAFT')">
                                Save as Draft
                            </UButton>
                            <UButton color="primary" icon="i-lucide-send-horizontal" @click="saveTemplate('PUBLISHED')">
                                Publish
                            </UButton>
                        </div>
                    </UPageCard>
                </div>

                <div class="flex flex-col lg:flex-row items-start gap-6 relative">
                    <div ref="sentinel" class="absolute top-0 left-0 w-full h-px pointer-events-none opacity-0 invisible"></div>
                    <!-- Template Details -->

                    <!-- if this wrapper reach top-0, show the other save and publish buttons -->
                    <div class="lg:w-[620px] w-full space-y-4 sticky top-0">
                        <UCard class="shadow-sm" :ui="{ body: 'space-y-4' }">
                            <template #header>
                                <div class="flex items-center gap-2">
                                    <UIcon name="i-lucide-file-text" class="size-4 text-primary" />
                                    <span class="font-semibold text-highlighted">Template Details</span>
                                </div>
                            </template>

                            <div class="grid grid-cols-1 gap-4">
                                <UFormField label="Template Name" required>
                                    <UInput v-model="template.name" placeholder="e.g. Software Engineer Onboarding"
                                        icon="i-lucide-tag" class="w-full" />
                                </UFormField>

                                <UFormField label="Status">
                                    <USelect v-model="template.status" :items="statuses" class="w-full" />
                                </UFormField>

                                <UFormField label="Description">
                                    <UTextarea v-model="template.description" placeholder="Brief description of this template..."
                                        :rows="6" class="w-full" />
                                </UFormField>
                            </div>
                        </UCard>

                        <!-- show this only if wrapper reach top-0 -->
                        <div class="flex gap-2 w-full transition-all duration-300" :class="isSticky ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'">
                            <UButton block color="neutral" variant="outline" icon="i-lucide-save" @click="saveTemplate('DRAFT')">
                                Save as Draft
                            </UButton>
                            <UButton block color="primary" icon="i-lucide-send-horizontal" @click="saveTemplate('PUBLISHED')">
                                Publish
                            </UButton>
                        </div>
                    </div>

                    <!-- Tasks Section -->
                    <div class="space-y-4 w-full">
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
                            class="task-card shadow-sm group transition-all duration-150"
                            :class="draggedIndex === index ? 'opacity-30 ring-2 ring-primary scale-[0.98]' : 'hover:ring-1 hover:ring-primary/30'"
                            @dragenter.prevent="onDragEnter($event, index)"
                            @dragover.prevent
                            @drop.prevent
                        >
                            <div :class="draggedIndex !== null ? 'pointer-events-none' : ''">
                                <!-- Primary row: always visible -->
                                <div class="flex items-center gap-2">
                                    <!-- Drag Handle -->
                                    <div class="cursor-grab active:cursor-grabbing text-muted hover:text-primary p-1 pointer-events-auto"
                                        draggable="true"
                                        @dragstart="onDragStart($event, index)"
                                        @dragend="onDragEnd"
                                    >
                                        <UIcon name="i-lucide-grip-vertical" class="size-4 flex" />
                                    </div>

                                    <!-- Step badge -->
                                    <div
                                        class="shrink-0 size-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center select-none">
                                        {{ index + 1 }}
                                    </div>

                                    <!-- Task Name -->
                                    <UInput v-model="task.name" placeholder="Task name..." class="flex-1 min-w-0" />

                                    <!-- Category -->
                                    <USelect v-model="task.category" :items="categories" class="w-38 hidden md:flex" />

                                    <!-- Assignee -->
                                    <USelect v-model="task.assignee" :items="assignees" class="w-28 hidden md:flex" />

                                    <!-- Due Days -->
                                    <UInputNumber v-model="task.dueDays" :min="1" class="w-24 hidden md:flex" />

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
                            </div>
                        </UCard>


                        <!-- Add Task Button (secondary, bottom) -->
                        <UButton v-if="tasks.length > 0" color="neutral" variant="ghost" icon="i-lucide-plus"
                            class="w-full justify-center p-4 rounded-xl border-2 border-dashed border-default text-dimmed opacity-60 hover:opacity-100 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-200"
                            @click="addTask">
                            Add Another Task
                        </UButton>
                    </div>
                </div>
            </div>
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
