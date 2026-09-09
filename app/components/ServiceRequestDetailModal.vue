<script setup lang="ts">
type ServiceRequest = {
    id: number
    dateApplied: string
    requestType: string
    remarks: string
    status: string
    lastUpdatedBy: string
    lastUpdate: string
}

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{ request: ServiceRequest | null }>()
</script>

<template>
    <UModal v-model:open="open" class="w-full max-w-[520px]" :ui="{
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
                <h2 class="text-primary font-semibold">Service Request Details</h2>
                <p class="text-primary/60 text-sm mt-1">{{ props.request?.requestType }}</p>
            </div>
            <UButton icon="i-lucide-x" variant="outline" color="neutral"
                class="absolute -top-4 -end-4 opacity-0 group-hover:opacity-100 transition-opacity"
                @click="open = false" />
        </template>

        <template #body>
            <div v-if="props.request" class="space-y-4">
                <!-- Note Banner -->
                <div class="flex gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                    <UIcon name="i-lucide-info" class="size-4 text-primary mt-0.5 shrink-0" />
                    <div class="text-sm text-muted">
                        <span class="font-semibold text-primary">Note</span><br />
                        Submit a service request for IT, HR, or administrative concerns. Your request will be reviewed
                        and you will be notified of any updates.
                    </div>
                </div>

                <!-- Details -->
                <div class="grid grid-cols-2 gap-3 text-sm bg-muted dark:bg-muted/30 p-4 rounded-lg">
                    <div class="col-span-2">
                        <div class="text-xs text-dimmed mb-0.5">Request Type</div>
                        <div class="font-semibold">{{ props.request.requestType }}</div>
                    </div>
                    <USeparator class="col-span-2" />
                    <div class="col-span-2">
                        <div class="text-xs text-dimmed mb-0.5">Date Applied</div>
                        <div class="font-medium">{{ props.request.dateApplied }}</div>
                    </div>
                    <USeparator class="col-span-2" />
                    <div class="col-span-2">
                        <div class="text-xs text-dimmed mb-0.5">Remarks</div>
                        <div class="font-medium">{{ props.request.remarks || '—' }}</div>
                    </div>
                    <USeparator class="col-span-2" />
                    <div>
                        <div class="text-xs text-dimmed mb-0.5">Status</div>
                        <StatusBadge :status="props.request.status" />
                    </div>
                    <div>
                        <div class="text-xs text-dimmed mb-0.5">Last Updated By</div>
                        <div class="font-medium">{{ props.request.lastUpdatedBy }}</div>
                    </div>
                    <USeparator class="col-span-2" />
                    <div class="col-span-2">
                        <div class="text-xs text-dimmed mb-0.5">Last Update</div>
                        <div class="font-medium">{{ props.request.lastUpdate }}</div>
                    </div>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="flex justify-end">
                <UButton label="Close" variant="ghost" color="neutral" @click="open = false" />
            </div>
        </template>
    </UModal>
</template>
