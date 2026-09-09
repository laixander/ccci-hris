<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })

const requestTypes = [
    'IT Support',
    'HR Concern',
    'Administrative Request',
    'Facilities & Maintenance',
    'Payroll Inquiry',
    'Document Request',
    'Other',
]

const formState = reactive({
    requestType: '',
    remarks: '',
})

const files = ref<File[]>([])

const handleReset = () => {
    formState.requestType = ''
    formState.remarks = ''
    files.value = []
}
</script>

<template>
    <UModal v-model:open="open" class="w-full max-w-[600px]" :ui="{
        content: 'overflow-visible group',
        header: 'relative bg-linear-to-r from-primary-500/15 to-primary-500/0 rounded-t-lg',
        body: 'scrollbar',
    }">
        <template #header>
            <div class="absolute overflow-hidden inset-0">
                <UIcon name="i-lucide-headset"
                    class="size-24 text-primary-500 opacity-10 absolute -bottom-7 end-2" />
            </div>
            <div class="flex flex-col">
                <h2 class="text-primary font-semibold">New Service Request</h2>
                <p class="text-primary/60 text-sm mt-1">Fill in the form below to submit a service request.</p>
            </div>
            <UButton icon="i-lucide-x" variant="outline" color="neutral"
                class="absolute -top-4 -end-4 opacity-0 group-hover:opacity-100 transition-opacity"
                @click="open = false" />
        </template>

        <template #body>
            <div class="space-y-4">
                <!-- Note Banner -->
                <div class="flex gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                    <UIcon name="i-lucide-info" class="size-4 text-primary mt-0.5 shrink-0" />
                    <div class="text-sm text-muted">
                        <span class="font-semibold text-primary">Note</span><br />
                        Submit a service request for IT, HR, or administrative concerns. Your request will be reviewed
                        and you will be notified of any updates.
                    </div>
                </div>

                <UForm :state="formState" class="space-y-4">
                    <UFormField label="Request Type" required>
                        <USelectMenu v-model="formState.requestType" :items="requestTypes"
                            placeholder="Select request type" class="w-full" />
                    </UFormField>

                    <UFormField label="Remarks (optional)">
                        <UTextarea v-model="formState.remarks"
                            placeholder="Describe your concern or request in detail..."
                            :rows="4" class="w-full" />
                    </UFormField>

                    <UFormField label="Attachments">
                        <UFileUpload
                            class="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg min-h-[120px]">
                            <template #leading>
                                <div class="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl mb-3">
                                    <UIcon name="i-lucide-cloud-upload" class="size-5 text-dimmed shrink-0 block" />
                                </div>
                            </template>
                            <template #label>
                                <p class="text-sm font-medium mb-1">Click to upload files</p>
                            </template>
                            <template #description>
                                <p class="text-xs text-dimmed">PNG, JPG, PDF (max. 5MB)</p>
                            </template>
                        </UFileUpload>
                    </UFormField>
                </UForm>
            </div>
        </template>

        <template #footer>
            <div class="flex justify-end gap-3">
                <UButton label="Reset" variant="ghost" color="neutral" @click="handleReset" />
                <UButton label="Submit" color="primary" />
            </div>
        </template>
    </UModal>
</template>
