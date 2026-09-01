<script setup lang="ts">
withDefaults(defineProps<{
  /** Controls modal visibility via v-model:open */
  open: boolean
  /** Icon name (Iconify) */
  icon?: string
  /** Modal title */
  title?: string
  /** Modal description / message body */
  description?: string
  /** Label for the confirm button */
  confirmLabel?: string
  /** Label for the cancel button */
  cancelLabel?: string
  /**
   * Color theme. Matches Nuxt UI semantic colors.
   * e.g. 'warning' | 'error' | 'primary' | 'success' | 'info' | 'neutral'
   */
  color?: 'warning' | 'error' | 'primary' | 'success' | 'info' | 'neutral'
  /** Loading state for the confirm button */
  loading?: boolean
}>(), {
  icon: 'i-lucide-triangle-alert',
  title: 'Confirmation',
  description: 'Are you sure you want to proceed?',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  color: 'warning',
  loading: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  confirm: []
  cancel: []
}>()

function onConfirm() {
  emit('confirm')
}

function onCancel() {
  emit('update:open', false)
  emit('cancel')
}
</script>

<template>
  <UModal
    :open="open"
    :close="false"
    :ui="{
      content: `ring ring-${color}-500/25 dark:ring-${color}-400/25 bg-${color}-50 dark:bg-${color}-950`,
      header: 'hidden',
    }"
    @update:open="emit('update:open', $event)"
  >
    <template #body>
      <div class="flex flex-col items-center gap-3 text-center pt-2">
        <!-- Icon -->
        <div :class="`flex items-center justify-center size-16 rounded-full bg-${color}-100 dark:bg-${color}-900`">
          <UIcon :name="icon" :class="`size-8 text-${color}-500 dark:text-${color}-400`" />
        </div>

        <!-- Title -->
        <slot name="title">
          <div :class="`text-${color}-900 dark:text-${color}-200 text-xl font-bold`">{{ title }}</div>
        </slot>

        <!-- Description -->
        <slot name="description">
          <p :class="`text-sm text-${color}-700 dark:text-${color}-400 leading-relaxed`">
            {{ description }}
          </p>
        </slot>

        <!-- Actions -->
        <slot name="actions">
          <div class="flex flex-col gap-2 w-full pt-6">
            <UButton
              block
              size="lg"
              :label="confirmLabel"
              :color="color"
              :loading="loading"
              @click="onConfirm"
            />
            <UButton
              block
              size="lg"
              :label="cancelLabel"
              variant="ghost"
              :color="color"
              @click="onCancel"
            />
          </div>
        </slot>
      </div>
    </template>
  </UModal>
</template>
