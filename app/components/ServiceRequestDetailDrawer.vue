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

const { register } = useOverlayVisibility()
register(open)
</script>

<template>
    <UDrawer
        v-model:open="open"
        direction="right"
        title="Service Request Details"
        inset
        close
        class="w-full max-w-[480px]"
        :ui="{
            container: 'pr-0',
            header: 'pr-4',
            footer: 'pr-4',
            body: 'pr-4 overflow-y-auto scrollbar'
        }"
    >
        <template #body>
            <div v-if="props.request" class="space-y-4">
                <!-- Header Banner Card -->
                <div class="relative overflow-hidden p-4 rounded-lg bg-linear-to-r from-primary-500/15 to-primary-500/0 border border-[var(--ui-border)] shadow-xs">
                    <div class="absolute overflow-hidden inset-0 pointer-events-none">
                        <UIcon name="i-lucide-headset" class="size-24 text-primary-500 opacity-10 absolute -bottom-7 end-2" />
                    </div>
                    <div class="flex items-center justify-between gap-3 relative z-10">
                        <div class="flex items-center gap-3">
                            <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <UIcon name="i-lucide-headset" class="size-5 text-primary" />
                            </div>
                            <div class="min-w-0">
                                <h3 class="text-base font-semibold text-highlighted leading-tight truncate">{{ props.request.requestType }}</h3>
                                <p class="text-xs text-dimmed mt-0.5">{{ props.request.dateApplied }}</p>
                            </div>
                        </div>
                        <StatusBadge :status="props.request.status" />
                    </div>
                </div>

                <!-- Note Banner -->
                <!-- <div class="flex gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                    <UIcon name="i-lucide-info" class="size-4 text-primary mt-0.5 shrink-0" />
                    <div class="text-sm text-muted">
                        <span class="font-semibold text-primary">Note</span><br />
                        Submit a service request for IT, HR, or administrative concerns. Your request will be reviewed
                        and you will be notified of any updates.
                    </div>
                </div> -->

                <!-- Details -->
                <div class="space-y-2">
                    <p class="text-xs font-semibold text-dimmed uppercase tracking-wider">Request Information</p>
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
            </div>
        </template>

        <template #footer>
            <div class="flex justify-end">
                <UButton label="Close" variant="ghost" color="neutral" @click="open = false" />
            </div>
        </template>
    </UDrawer>
</template>
