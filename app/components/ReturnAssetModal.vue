<script setup lang="ts">
import { reactive } from 'vue'
import type { AssetAssignment } from '~/types'

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{
    assignment?: AssetAssignment
}>()

const statuses = ['Available', 'Under Repair', 'Broken', 'Retired']

const state = reactive({
    returnDate: '',
    conditionNotes: '',
    status: 'Available'
})

const { register } = useOverlayVisibility()
register(open)
</script>

<template>
    <UModal v-model:open="open" class="w-full max-w-[600px]" :ui="{
        content: 'overflow-visible group',
        header: 'relative bg-linear-to-r from-primary-500/15 to-primary-500/0 rounded-t-lg',
        body: 'scrollbar',
    }">
        <template #header>
            <div class="absolute overflow-hidden inset-0">
                <UIcon name="i-lucide-corner-up-left" class="size-24 text-primary-500 opacity-10 absolute -bottom-7 end-2" />
            </div>
            <div class="flex flex-col relative z-10">
                <h2 class="text-primary font-semibold">Return Asset</h2>
                <p class="text-primary/60 text-sm mt-1">Record the return of an assigned asset and update its status.</p>
            </div>
            <UButton icon="i-lucide-x" variant="outline" color="neutral"
                class="absolute -top-4 -end-4 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                @click="open = false" />
        </template>

        <template #body>
            <div v-if="assignment" class="grid grid-cols-1 gap-2 text-sm bg-muted dark:bg-muted/30 p-3 rounded-md mb-4">
                <div class="flex items-center justify-between">
                    <span class="text-xs text-dimmed">Asset</span>
                    <span class="text-xs font-medium text-right ml-4">{{ assignment.assetTag }} — {{ assignment.name }}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-xs text-dimmed">Assigned To</span>
                    <span class="text-xs font-medium text-right ml-4">{{ assignment.employee }}</span>
                </div>
            </div>

            <UForm :state="state" class="space-y-4">
                <UFormField label="Return Date" required>
                    <UInput type="date" v-model="state.returnDate" class="w-full" autofocus />
                </UFormField>

                <UFormField label="Return Condition Notes">
                    <UTextarea v-model="state.conditionNotes" class="w-full" :rows="3" />
                </UFormField>

                <UFormField label="Resulting Asset Status">
                    <USelectMenu v-model="state.status" :items="statuses" class="w-full" />
                </UFormField>
            </UForm>
        </template>

        <template #footer>
            <div class="flex justify-end gap-3">
                <UButton label="Cancel" variant="ghost" color="neutral" @click="open = false" />
                <UButton label="Return Asset" color="primary" />
            </div>
        </template>
    </UModal>
</template>
