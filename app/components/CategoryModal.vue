<script setup lang="ts">
import { reactive, watch } from 'vue'

const open = defineModel<boolean>('open', { default: false })

const props = defineProps<{
    mode: 'create' | 'edit'
    initialData?: {
        id: number
        name: string
        description: string
        icon: string
    }
}>()

const emit = defineEmits<{
    save: [data: { id: number; name: string; description: string; icon: string }]
}>()

const iconOptions = [
    { label: 'Monitor',        value: 'i-lucide-monitor' },
    { label: 'Laptop',         value: 'i-lucide-laptop' },
    { label: 'Smartphone',     value: 'i-lucide-smartphone' },
    { label: 'Monitor Dot',    value: 'i-lucide-monitor-dot' },
    { label: 'Keyboard',       value: 'i-lucide-keyboard' },
    { label: 'Mouse Pointer',  value: 'i-lucide-mouse-pointer-2' },
    { label: 'Printer',        value: 'i-lucide-printer' },
    { label: 'Router',         value: 'i-lucide-router' },
    { label: 'Headphones',     value: 'i-lucide-headphones' },
    { label: 'Webcam',         value: 'i-lucide-webcam' },
    { label: 'Hard Drive',     value: 'i-lucide-hard-drive' },
    { label: 'Package',        value: 'i-lucide-package' },
    { label: 'Fingerprint',    value: 'i-lucide-fingerprint' },
    { label: 'Armchair',       value: 'i-lucide-armchair' },
    { label: 'Server',         value: 'i-lucide-server' },
    { label: 'Tablet',         value: 'i-lucide-tablet' },
    { label: 'Camera',         value: 'i-lucide-camera' },
    { label: 'Battery',        value: 'i-lucide-battery' },
    { label: 'Cable',          value: 'i-lucide-cable' },
    { label: 'Cpu',            value: 'i-lucide-cpu' },
    { label: 'Microphone',     value: 'i-lucide-mic' },
    { label: 'Phone',          value: 'i-lucide-phone' },
    { label: 'Network',        value: 'i-lucide-network' },
    { label: 'Tags',           value: 'i-lucide-tags' },
    { label: 'Wrench',         value: 'i-lucide-wrench' },
    { label: 'Box',            value: 'i-lucide-box' },
    { label: 'Briefcase',      value: 'i-lucide-briefcase' },
    { label: 'Building',       value: 'i-lucide-building' },
]

const formData = reactive({
    id: 0,
    name: '',
    description: '',
    icon: 'i-lucide-tags'
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
        formData.icon = 'i-lucide-tags'
    }
    formErrors.name = ''
})

function save() {
    if (!formData.name.trim()) {
        formErrors.name = 'Category name is required.'
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
                <UIcon name="i-lucide-tags" class="size-24 text-primary-500 opacity-10 absolute -bottom-7 end-2" />
            </div>
            <div class="flex flex-col relative z-10">
                <h2 class="text-primary font-semibold">{{ mode === 'create' ? 'Add Category' : 'Edit Category' }}</h2>
                <p class="text-primary/60 text-sm mt-1">
                    {{ mode === 'create' ? 'Create a new asset category.' : 'Update the category details below.' }}
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

                <UFormField label="Category Name" required :error="formErrors.name">
                    <UInput
                        v-model="formData.name"
                        placeholder="e.g. Desktop Computers"
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
                    :label="mode === 'create' ? 'Add Category' : 'Save Changes'"
                    color="primary"
                    @click="save"
                />
            </div>
        </template>
    </UModal>
</template>
