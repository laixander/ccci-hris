<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

const open = defineModel<boolean>('open', { default: false })

const categories = ['Travel', 'Meals', 'Office Supplies', 'Transportation', 'Others']

const formState = shallowReactive({
    date: undefined as CalendarDate | undefined,
    category: '',
    merchantName: '',
    merchantAddress: '',
    amount: '',
    vatableAmount: '',
    vat: '',
    tin: '',
    notes: ''
})

const inputDate = useTemplateRef('inputDate')
</script>

<template>
    <UModal v-model:open="open" class="w-full max-w-4xl" :ui="{
        content: 'overflow-visible group',
        header: 'relative bg-linear-to-r from-primary-500/15 to-primary-500/0 rounded-t-lg',
        body: 'scrollbar',
    }">
        <template #header>
            <div class="absolute overflow-hidden inset-0">
                <UIcon name="i-lucide-receipt-text"
                    class="size-24 text-primary-500 opacity-10 absolute -bottom-7 end-2" />
            </div>
            <div class="flex flex-col">
                <h2 class="text-primary font-semibold">File Reimbursement</h2>
                <p class="text-primary/60 text-sm mt-1">Fill in the form below to request a reimbursement.</p>
            </div>
            <UButton icon="i-lucide-x" variant="outline" color="neutral"
                class="absolute -top-4 -end-4 opacity-0 group-hover:opacity-100 transition-opacity"
                @click="open = false" />
        </template>
        <template #body>
            <div class="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8">
                <!-- Receipt Side -->
                <div class="flex flex-col gap-4">
                    <h3 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Receipt</h3>
                    <UFileUpload
                        class="flex-1 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg min-h-[300px]">
                        <template #leading>
                            <div class="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl mb-4">
                                <UIcon name="i-lucide-cloud-upload" class="size-6 text-dimmed shrink-0 block" />
                            </div>
                        </template>
                        <template #label>
                            <p class="text-sm font-medium mb-1">Drop receipt here or <span
                                    class="text-primary cursor-pointer">browse</span></p>
                        </template>
                        <template #description>
                            <p class="text-xs text-dimmed">PNG, JPG, HEIC (max. 2MB)</p>
                        </template>
                    </UFileUpload>

                    <div class="flex items-center gap-3">
                        <hr class="flex-1 border-neutral-200 dark:border-neutral-800" />
                        <span class="text-xs text-neutral-500">or</span>
                        <hr class="flex-1 border-neutral-200 dark:border-neutral-800" />
                    </div>

                    <UButton label="Take a Photo" icon="i-lucide-camera" variant="outline" color="neutral"
                        class="w-full justify-center" />
                </div>

                <!-- Expense Details Side -->
                <div class="flex flex-col gap-4">
                    <h3 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Expense Details</h3>

                    <UForm :state="formState" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <UFormField label="Date of Expense" required>
                                <UInputDate ref="inputDate" v-model="formState.date" class="w-full">
                                    <template #trailing>
                                        <UPopover :reference="inputDate?.inputsRef[0]?.$el"
                                            :content="{ align: 'center' }">
                                            <UButton color="neutral" variant="link" size="sm" icon="i-lucide-calendar"
                                                class="px-0" />
                                            <template #content>
                                                <UCalendar v-model="formState.date" class="p-2" />
                                            </template>
                                        </UPopover>
                                    </template>
                                </UInputDate>
                            </UFormField>

                            <UFormField label="Category" required>
                                <USelectMenu v-model="formState.category" :items="categories"
                                    placeholder="Select category" class="w-full" />
                            </UFormField>
                        </div>

                        <UFormField label="Merchant / Vendor" required>
                            <UInput v-model="formState.merchantName" placeholder="e.g. Jollibee Foods Corp."
                                class="w-full" />
                        </UFormField>

                        <UFormField label="Merchant Address">
                            <UInput v-model="formState.merchantAddress" placeholder="e.g. Makati City" class="w-full" />
                        </UFormField>

                        <div class="grid grid-cols-3 gap-4">
                            <UFormField label="Amount (PHP)" required>
                                <UInput v-model="formState.amount" placeholder="0.00" class="w-full">
                                    <template #leading>
                                        <span class="text-neutral-500 text-sm font-sans font-medium">₱</span>
                                    </template>
                                </UInput>
                            </UFormField>

                            <UFormField label="VATable Amount">
                                <UInput v-model="formState.vatableAmount" placeholder="0.00" class="w-full">
                                    <template #leading>
                                        <span class="text-neutral-500 text-sm font-sans font-medium">₱</span>
                                    </template>
                                </UInput>
                            </UFormField>

                            <UFormField label="VAT">
                                <UInput v-model="formState.vat" placeholder="0.00" class="w-full">
                                    <template #leading>
                                        <span class="text-neutral-500 text-sm font-sans font-medium">₱</span>
                                    </template>
                                </UInput>
                            </UFormField>
                        </div>

                        <UFormField label="TIN">
                            <UInput v-model="formState.tin" placeholder="000-000-000-000" class="w-full" />
                        </UFormField>

                        <UFormField label="Notes">
                            <UTextarea v-model="formState.notes" placeholder="Optional notes or context..."
                                class="w-full" />
                        </UFormField>
                    </UForm>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="flex justify-end gap-3">
                <UButton label="Cancel" variant="ghost" color="neutral" @click="open = false" />
                <UButton label="Submit" color="primary" />
            </div>
        </template>
    </UModal>
</template>
