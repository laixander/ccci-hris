<script setup lang="ts">
import { CalendarDate, Time, today, getLocalTimeZone } from '@internationalized/date'

const open = defineModel<boolean>('open', { default: false })

const overtimeState = reactive({
    reason: '',
})

const overtimeDate = shallowRef<CalendarDate | undefined>(today(getLocalTimeZone()))
const overtimeTimeRange = shallowRef<{ start: Time | undefined, end: Time | undefined }>({
    start: undefined,
    end: undefined
})

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
                <UIcon name="i-lucide-clock" class="size-24 text-primary-500 opacity-10 absolute -bottom-7 end-2" />
            </div>
            <div class="flex flex-col">
                <h2 class="text-primary font-semibold">Request Overtime</h2>
                <p class="text-primary/60 text-sm mt-1">Fill in the form below to request an overtime.</p>
            </div>
            <UButton icon="i-lucide-x" variant="outline" color="neutral"
                class="absolute -top-4 -end-4 opacity-0 group-hover:opacity-100 transition-opacity"
                @click="open = false" />
        </template>
        <template #body>
            <UForm :state="overtimeState" class="space-y-4">
                <UFormField label="Date" required>
                    <UInputDate ref="inputDate" v-model="overtimeDate" class="w-full" autofocus>
                        <template #trailing>
                            <UPopover :reference="inputDate?.inputsRef[0]?.$el" :content="{
                                align: 'center'
                            }">
                                <UButton color="neutral" variant="link" size="sm" icon="i-lucide-calendar"
                                    aria-label="Select a date" class="px-0" />
                                <template #content>
                                    <UCalendar v-model="overtimeDate" class="p-2" />
                                </template>
                            </UPopover>
                        </template>
                    </UInputDate>
                </UFormField>

                <UFormField label="Time Range" required>
                    <UInputTime v-model="overtimeTimeRange" range class="w-full" trailing-icon="i-lucide-clock"
                        separator-icon="i-lucide-arrow-right" :ui="{
                            separatorIcon: 'mx-auto',
                            trailingIcon: 'size-4'
                        }" />
                </UFormField>

                <UFormField label="Reason">
                    <UTextarea v-model="overtimeState.reason" class="w-full" />
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
