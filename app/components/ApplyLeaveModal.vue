<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

const open = defineModel<boolean>('open', { default: false })

const leaveTypes = ['Other Leave', 'Birthday Leave', 'Paternity Leave', 'Maternity Leave', 'Emergency Leave', 'Vacation Leave', 'Sick Leave']
const scheduleTypes = ['Whole Day', 'Half Day (AM)', 'Half Day (PM)']

const leaveState = reactive({
    leaveType: '',
    scheduleType: 'Whole Day',
    startDate: '',
    endDate: '',
    reason: '',
})

const inputDate = useTemplateRef('inputDate')

// Replaces separate leaveState.startDate / leaveState.endDate strings
const leaveDateRange = shallowRef<{ start: CalendarDate | undefined, end: CalendarDate | undefined }>({
    start: undefined,
    end: undefined
})

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
                <UIcon name="i-lucide-file-text" class="size-24 text-primary-500 opacity-10 absolute -bottom-7 end-2" />
            </div>
            <div class="flex flex-col">
                <h2 class="text-primary font-semibold">Apply for Leave</h2>
                <p class="text-primary/60 text-sm mt-1">Fill in the form below to request a leave.</p>
            </div>
            <UButton icon="i-lucide-x" variant="outline" color="neutral"
                class="absolute -top-4 -end-4 opacity-0 group-hover:opacity-100 transition-opacity"
                @click="open = false" />
        </template>
        <template #body>
            <UForm :state="leaveState" class="space-y-4">
                <UFormField label="Leave Type" required>
                    <USelectMenu v-model="leaveState.leaveType" :items="leaveTypes" placeholder="leave type"
                        class="w-full" :ui="{
                            viewport: 'scrollbar'
                        }" autofocus />
                </UFormField>

                <UFormField label="Schedule Type">
                    <USelectMenu v-model="leaveState.scheduleType" :items="scheduleTypes" class="w-full" />
                </UFormField>

                <div class="flex gap-4">
                    <UFormField label="Leave Dates" required class="flex-1">
                        <UInputDate ref="inputDate" v-model="leaveDateRange" range separator-icon="i-lucide-arrow-right"
                            class="w-full" :ui="{
                                separatorIcon: 'mx-auto'
                            }">
                            <template #trailing>
                                <UPopover :reference="inputDate?.inputsRef[0]?.$el" :content="{
                                    align: 'center'
                                }">
                                    <UButton color="neutral" variant="link" size="sm" icon="i-lucide-calendar"
                                        aria-label="Select a date range" class="px-0" />
                                    <template #content>
                                        <UCalendar v-model="leaveDateRange" class="p-2" :number-of-months="2" range />
                                    </template>
                                </UPopover>
                            </template>
                        </UInputDate>
                    </UFormField>
                </div>

                <UFormField label="Reason">
                    <UTextarea v-model="leaveState.reason" class="w-full" />
                </UFormField>

                <UFormField label="Attachments (images, PDF)">
                    <UFileUpload multiple />
                </UFormField>
            </UForm>
        </template>
        <template #footer>
            <div class="flex justify-end gap-3">
                <UButton label="Cancel" variant="ghost" color="neutral" @click="open = false" />
                <UButton label="Submit" color="primary" />
            </div>
        </template>
    </UModal>
</template>
