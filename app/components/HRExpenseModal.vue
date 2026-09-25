<script setup lang="ts">
import { ref, computed } from 'vue'

const open = defineModel<boolean>('open', { default: false })
const { register } = useOverlayVisibility()
register(open)

const state = ref({
    employee: '',
    dateOfExpense: '',
    category: '',
    merchant: '',
    merchantAddress: '',
    amount: '',
    tin: '',
    notes: ''
})

const employees = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Williams']
const categories = ['Meals', 'Transportation', 'Office Supplies', 'Travel', 'Others']

const vatableAmount = computed(() => {
    const amt = parseFloat(state.value.amount) || 0
    return (amt / 1.12).toFixed(2)
})

const vat = computed(() => {
    const amt = parseFloat(state.value.amount) || 0
    return (amt - (amt / 1.12)).toFixed(2)
})

const submit = () => {
    // submit logic
    open.value = false
}
</script>

<template>
    <UModal v-model:open="open" title="Submit Expense on Behalf" :ui="{ content: 'sm:max-w-4xl' }">
        <template #body>
            <div class="flex flex-col md:flex-row gap-6">
                <!-- Receipt -->
                <div class="w-full md:w-1/3 flex flex-col gap-2">
                    <p class="text-[10px] font-semibold text-dimmed/70 uppercase tracking-wider">Receipt</p>
                    <div class="flex-1 min-h-[300px] border-2 border-dashed border-muted rounded-xl flex flex-col items-center justify-center p-6 text-center">
                        <div class="p-3 bg-muted/50 rounded-xl mb-3">
                            <UIcon name="i-lucide-cloud-upload" class="size-6 text-dimmed" />
                        </div>
                        <p class="text-sm font-medium">Drop receipt here or <span class="text-primary cursor-pointer">browse</span></p>
                        <p class="text-xs text-dimmed mt-1">PNG, JPG, HEIC accepted</p>
                    </div>
                </div>

                <!-- Expense Details -->
                <div class="flex-1 flex flex-col gap-4 border-l border-muted pl-0 md:pl-6">
                    <p class="text-[10px] font-semibold text-dimmed/70 uppercase tracking-wider">Expense Details</p>
                    
                    <UFormField label="Employee" required>
                        <USelect v-model="state.employee" :items="employees" placeholder="Select employee" class="w-full" />
                    </UFormField>

                    <div class="grid grid-cols-2 gap-4">
                        <UFormField label="Date of Expense" required>
                            <UInput v-model="state.dateOfExpense" type="date" class="w-full" />
                        </UFormField>
                        <UFormField label="Category" required>
                            <USelect v-model="state.category" :items="categories" placeholder="Select category" class="w-full" />
                        </UFormField>
                    </div>

                    <UFormField label="Merchant / Vendor" required>
                        <UInput v-model="state.merchant" placeholder="e.g. Jollibee Foods Corp." class="w-full" />
                    </UFormField>

                    <UFormField label="Merchant Address">
                        <UInput v-model="state.merchantAddress" placeholder="e.g. Makati City" class="w-full" />
                    </UFormField>

                    <div class="grid grid-cols-3 gap-4">
                        <UFormField label="Amount (PHP)" required>
                            <UInput v-model="state.amount" type="number" placeholder="0.00" class="w-full">
                                <template #leading>
                                    <span class="text-dimmed text-sm">₱</span>
                                </template>
                            </UInput>
                        </UFormField>
                        <UFormField label="VATable Amount">
                            <UInput :model-value="vatableAmount" readonly class="w-full bg-muted/30">
                                <template #leading>
                                    <span class="text-dimmed text-sm">₱</span>
                                </template>
                            </UInput>
                        </UFormField>
                        <UFormField label="VAT">
                            <UInput :model-value="vat" readonly class="w-full bg-muted/30">
                                <template #leading>
                                    <span class="text-dimmed text-sm">₱</span>
                                </template>
                            </UInput>
                        </UFormField>
                    </div>

                    <UFormField label="TIN">
                        <UInput v-model="state.tin" placeholder="000-000-000-000" class="w-full" />
                    </UFormField>

                    <UFormField label="Notes">
                        <UTextarea v-model="state.notes" placeholder="Optional notes..." class="w-full" :rows="3" />
                    </UFormField>
                </div>
            </div>
        </template>
        
        <template #footer>
            <div class="flex items-center justify-end gap-2 w-full">
                <UButton label="Cancel" variant="ghost" color="neutral" @click="open = false" />
                <UButton label="Submit" color="primary" @click="submit" />
            </div>
        </template>
    </UModal>
</template>
