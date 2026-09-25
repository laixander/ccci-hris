<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { AssetLocation } from '~/types'

const open = defineModel<boolean>('open', { default: false })

const props = defineProps<{
    mode: 'create' | 'edit'
    initialData?: AssetLocation
}>()

const emit = defineEmits<{
    save: [data: { id: number; name: string; description: string; icon: string }]
}>()

const iconOptions = [
    { label: 'Map Pin',        value: 'i-lucide-map-pin' },
    { label: 'Building',       value: 'i-lucide-building' },
    { label: 'Building 2',     value: 'i-lucide-building-2' },
    { label: 'Coffee',         value: 'i-lucide-coffee' },
    { label: 'Headset',        value: 'i-lucide-headset' },
    { label: 'Briefcase',      value: 'i-lucide-briefcase' },
    { label: 'Monitor',        value: 'i-lucide-monitor' },
    { label: 'Pencil Ruler',   value: 'i-lucide-pencil-ruler' },
    { label: 'Users',          value: 'i-lucide-users' },
    { label: 'Archive',        value: 'i-lucide-archive' },
    { label: 'Presentation',   value: 'i-lucide-presentation' },
    { label: 'Server',         value: 'i-lucide-server' },
    { label: 'Warehouse',      value: 'i-lucide-warehouse' },
    { label: 'Door Open',      value: 'i-lucide-door-open' },
    { label: 'Laptop',         value: 'i-lucide-laptop' },
    { label: 'Layers',         value: 'i-lucide-layers' },
    { label: 'Home',           value: 'i-lucide-home' },
    { label: 'Box',            value: 'i-lucide-box' },
    { label: 'Truck',          value: 'i-lucide-truck' },
    { label: 'Lock',           value: 'i-lucide-lock' },
    { label: 'Shield',         value: 'i-lucide-shield' },
    { label: 'Wifi',           value: 'i-lucide-wifi' },
    { label: 'Wrench',         value: 'i-lucide-wrench' },
    { label: 'Package',        value: 'i-lucide-package' },
    { label: 'Factory',        value: 'i-lucide-factory' },
    { label: 'Store',          value: 'i-lucide-store' },
    { label: 'Tent',           value: 'i-lucide-tent' },
    { label: 'Navigation',     value: 'i-lucide-navigation' },
]

const formData = reactive({
    id: 0,
    name: '',
    description: '',
    icon: 'i-lucide-map-pin'
})

const formErrors = reactive({ name: '' })

watch(open, (val) => {
    if (val && props.initialData) {
        formData.id = props.initialData.id
        formData.name = props.initialData.name
        formData.description = props.initialData.description
        formData.icon = props.initialData.icon
    } else if (val) {
        formData.id = 0
        formData.name = ''
        formData.description = ''
        formData.icon = 'i-lucide-map-pin'
    }
    formErrors.name = ''
})

function save() {
    if (!formData.name.trim()) {
        formErrors.name = 'Location name is required.'
        return
    }
    emit('save', { ...formData })
    open.value = false
}

const { register } = useOverlayVisibility()
register(open)
</script>

<template>
    <UModal
        v-model:open="open"
        class="w-full max-w-[480px]"
        :ui="{
            content: 'overflow-visible group',
            header: 'relative bg-linear-to-r from-primary-500/15 to-primary-500/0 rounded-t-lg',
            body: 'scrollbar',
        }"
    >
        <template #header>
            <div class="absolute overflow-hidden inset-0">
                <UIcon name="i-lucide-map-pin" class="size-24 text-primary-500 opacity-10 absolute -bottom-7 end-2" />
            </div>
            <div class="flex flex-col relative z-10">
                <h2 class="text-primary font-semibold">{{ mode === 'create' ? 'Add Location' : 'Edit Location' }}</h2>
                <p class="text-primary/60 text-sm mt-1">
                    {{ mode === 'create' ? 'Create a new asset location.' : 'Update the location details below.' }}
                </p>
            </div>
            <UButton
                icon="i-lucide-x"
                variant="outline"
                color="neutral"
                class="absolute -top-4 -end-4 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                @click="open = false"
            />
        </template>

        <template #body>
            <UForm :state="formData" class="space-y-4">
                <UFormField label="Icon">
                    <div class="flex flex-wrap justify-center gap-4 p-4 rounded-lg border border-default bg-muted/40">
                        <UTooltip
                            v-for="option in iconOptions"
                            :key="option.value"
                            :text="option.label"
                            :delay-duration="200"
                            :content="{ side: 'top', sideOffset: 6 }"
                        >
                            <UButton
                                square
                                :ui="{ base: 'p-2.5' }"
                                :color="formData.icon === option.value ? 'primary' : 'neutral'"
                                :variant="formData.icon === option.value ? 'solid' : 'ghost'"
                                class="group/icon"
                                @click="formData.icon = option.value"
                            ><UIcon :name="option.value" class="size-5 transition-opacity duration-150" :class="formData.icon === option.value ? 'opacity-100' : 'opacity-20 group-hover/icon:opacity-100'" /></UButton>
                        </UTooltip>
                    </div>
                    <template #hint>
                        <p class="text-xs text-dimmed flex items-center gap-1.5">
                            <UIcon :name="formData.icon" class="size-3.5 text-primary" />
                            {{ iconOptions.find(o => o.value === formData.icon)?.label ?? 'None selected' }}
                        </p>
                    </template>
                </UFormField>

                <UFormField label="Location Name" required :error="formErrors.name">
                    <UInput
                        v-model="formData.name"
                        placeholder="e.g. Workspace Area"
                        class="w-full"
                        @input="formErrors.name = ''"
                    />
                </UFormField>

                <UFormField label="Description">
                    <UTextarea
                        v-model="formData.description"
                        placeholder="Optional description..."
                        :rows="4"
                        class="w-full"
                    />
                </UFormField>
            </UForm>
        </template>

        <template #footer>
            <div class="flex justify-end gap-3">
                <UButton label="Cancel" variant="ghost" color="neutral" @click="open = false" />
                <UButton
                    :label="mode === 'create' ? 'Add Location' : 'Save Changes'"
                    color="primary"
                    @click="save"
                />
            </div>
        </template>
    </UModal>
</template>
