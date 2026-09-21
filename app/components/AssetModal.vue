<script setup lang="ts">
import { watch } from 'vue'
import type { Asset } from '~/types'

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{
    asset?: Asset
}>()

const categories = ['Electronics', 'Furniture', 'Vehicle', 'Software', 'Other']
const statuses = [
    { label: 'Available', value: 'AVAILABLE' },
    { label: 'Assigned', value: 'ASSIGNED' },
    { label: 'Maintenance', value: 'MAINTENANCE' },
    { label: 'Broken', value: 'BROKEN' },
    { label: 'Under Repair', value: 'UNDER REPAIR' },
    { label: 'Retired', value: 'RETIRED' }
]
const locations = ['Head Office', 'Branch A', 'Branch B', 'Remote']

const state = reactive({
    assetTag: '',
    name: '',
    category: '',
    brand: '',
    model: '',
    purchaseDate: '',
    cost: 0,
    status: 'AVAILABLE',
    location: ''
})

watch(() => props.asset, (newAsset) => {
    if (newAsset) {
        state.assetTag = newAsset.assetTag
        state.name = newAsset.name
        state.category = newAsset.category
        state.brand = newAsset.brandModel?.split(' / ')[0] || ''
        state.model = newAsset.brandModel?.split(' / ')[1] || ''
        state.purchaseDate = newAsset.purchased
        state.cost = newAsset.cost
        state.status = newAsset.status
        state.location = newAsset.location
    } else {
        state.assetTag = ''
        state.name = ''
        state.category = ''
        state.brand = ''
        state.model = ''
        state.purchaseDate = ''
        state.cost = 0
        state.status = 'AVAILABLE'
        state.location = ''
    }
}, { immediate: true })

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
                <UIcon name="i-lucide-box" class="size-24 text-primary-500 opacity-10 absolute -bottom-7 end-2" />
            </div>
            <div class="flex flex-col">
                <h2 class="text-primary font-semibold">{{ asset ? 'Edit Asset' : 'Add Asset' }}</h2>
                <p class="text-primary/60 text-sm mt-1">{{ asset ? 'Update the details of the asset below.' : 'Fill in the form below to add a new asset.' }}</p>
            </div>
            <UButton icon="i-lucide-x" variant="outline" color="neutral"
                class="absolute -top-4 -end-4 opacity-0 group-hover:opacity-100 transition-opacity"
                @click="open = false" />
        </template>

        <template #body>
            <UForm :state="state" class="space-y-4">
                <UFormField label="Asset Tag / Serial No." required>
                    <UInput v-model="state.assetTag" class="w-full" autofocus />
                </UFormField>

                <UFormField label="Name" required>
                    <UInput v-model="state.name" class="w-full" />
                </UFormField>

                <UFormField label="Category" required>
                    <USelectMenu v-model="state.category" :items="categories" class="w-full" />
                </UFormField>

                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Brand">
                        <UInput v-model="state.brand" class="w-full" />
                    </UFormField>
                    <UFormField label="Model">
                        <UInput v-model="state.model" class="w-full" />
                    </UFormField>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Purchase Date">
                        <UInput type="date" v-model="state.purchaseDate" class="w-full" />
                    </UFormField>
                    <UFormField label="Cost">
                        <UInput type="number" v-model="state.cost" class="w-full" />
                    </UFormField>
                </div>

                <UFormField label="Status">
                    <USelectMenu v-model="state.status" value-key="value" :items="statuses" class="w-full" />
                </UFormField>

                <UFormField label="Location">
                    <USelectMenu v-model="state.location" :items="locations" class="w-full" />
                </UFormField>
            </UForm>
        </template>

        <template #footer>
            <div class="flex justify-end gap-3">
                <UButton label="Cancel" variant="ghost" color="neutral" @click="open = false" />
                <UButton :label="asset ? 'Save Changes' : 'Add Asset'" color="primary" />
            </div>
        </template>
    </UModal>
</template>
