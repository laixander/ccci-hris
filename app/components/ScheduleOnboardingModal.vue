<script setup lang="ts">
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'

const open = defineModel<boolean>('open', { default: false })

const { templates } = useTemplates()
const publishedTemplates = computed(() => 
    templates.value.filter(t => t.status === 'Published').map(t => t.name)
)

const employees = ['John Doe', 'Jane Smith', 'Alice Johnson']

const state = reactive({
    employee: '',
    template: '',
})
const startDate = shallowRef<CalendarDate | undefined>(today(getLocalTimeZone()))
const inputDate = useTemplateRef('inputDate')

const { register } = useOverlayVisibility()
register(open)
</script>

<template>
    <UModal v-model:open="open" class="w-full max-w-[460px]" :ui="{
        content: 'overflow-visible group',
        header: 'relative bg-linear-to-r from-primary-500/15 to-primary-500/0 rounded-t-lg',
        body: 'scrollbar',
    }">
        <template #header>
            <div class="absolute overflow-hidden inset-0">
                <UIcon name="i-lucide-calendar" class="size-24 text-primary-500 opacity-10 absolute -bottom-7 end-2" />
            </div>
            <div class="flex flex-col">
                <h2 class="text-primary font-semibold">Schedule Onboarding</h2>
                <p class="text-primary/60 text-sm mt-1">Fill in the form below to schedule a new onboarding.</p>
            </div>
            <UButton icon="i-lucide-x" variant="outline" color="neutral"
                class="absolute -top-4 -end-4 opacity-0 group-hover:opacity-100 transition-opacity"
                @click="open = false" />
        </template>
        <template #body>
            <UForm :state="state" class="space-y-4">
                <UFormField label="Employee" required>
                    <USelectMenu v-model="state.employee" :items="employees" placeholder="Select an employee" class="w-full" />
                </UFormField>

                <div class="space-y-1">
                    <UFormField label="Onboarding Template" required>
                        <USelectMenu v-model="state.template" :items="publishedTemplates" placeholder="Select a template" class="w-full" />
                    </UFormField>
                    <p v-if="publishedTemplates.length === 0" class="text-sm text-warning mt-1">
                        No published templates. <NuxtLink to="/onboarding/templates/new" class="underline text-warning hover:text-warning-600 transition-colors">Create one first.</NuxtLink>
                    </p>
                </div>

                <UFormField label="Start Date" required>
                    <UInputDate ref="inputDate" v-model="startDate" class="w-full">
                        <template #trailing>
                            <UPopover :reference="inputDate?.inputsRef[0]?.$el" :content="{ align: 'center' }">
                                <UButton color="neutral" variant="link" size="sm" icon="i-lucide-calendar" aria-label="Select a date" class="px-0" />
                                <template #content>
                                    <UCalendar v-model="startDate" class="p-2" />
                                </template>
                            </UPopover>
                        </template>
                    </UInputDate>
                </UFormField>
            </UForm>
        </template>

        <template #footer>
            <div class="flex justify-end gap-3">
                <UButton label="Cancel" variant="ghost" color="neutral" @click="open = false" />
                <UButton label="Schedule" color="primary" @click="open = false" />
            </div>
        </template>
    </UModal>
</template>
