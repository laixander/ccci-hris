<script setup lang="ts">
import { reactive } from 'vue'

const open = defineModel<boolean>('open', { default: false })

const state = reactive({
    assetId: undefined as string | undefined,
    employeeId: undefined as string | undefined,
    assignedDate: '',
    conditionNotes: ''
})

const availableAssets: { label: string, value: string }[] = []
const employees: { label: string, value: string }[] = []

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
                <UIcon name="i-lucide-shapes" class="size-24 text-primary-500 opacity-10 absolute -bottom-7 end-2" />
            </div>
            <div class="flex flex-col relative z-10">
                <h2 class="text-primary font-semibold">Assign Asset</h2>
                <p class="text-primary/60 text-sm mt-1">Select an available asset and assign it to an employee.</p>
            </div>
            <UButton icon="i-lucide-x" variant="outline" color="neutral"
                class="absolute -top-4 -end-4 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                @click="open = false" />
        </template>

        <template #body>
            <UForm :state="state" class="space-y-4">
                <UFormField label="Asset" required>
                    <USelectMenu v-model="state.assetId" placeholder="Select an available asset" :items="availableAssets" value-key="value" class="w-full" autofocus />
                </UFormField>

                <UFormField label="Employee" required>
                    <USelectMenu v-model="state.employeeId" placeholder="Select an employee" :items="employees" value-key="value" class="w-full" />
                </UFormField>

                <UFormField label="Assigned Date" required>
                    <UInput type="date" v-model="state.assignedDate" class="w-full" />
                </UFormField>

                <UFormField label="Condition Notes">
                    <UTextarea v-model="state.conditionNotes" class="w-full" :rows="3" />
                </UFormField>
            </UForm>
        </template>

        <template #footer>
            <div class="flex justify-end gap-3">
                <UButton label="Cancel" variant="ghost" color="neutral" @click="open = false" />
                <UButton label="Assign" color="primary" />
            </div>
        </template>
    </UModal>
</template>
