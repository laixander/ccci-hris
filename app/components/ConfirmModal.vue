<script setup lang="ts">
const props = withDefaults(defineProps<{
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
  color?: 'yellow' | 'error' | 'primary' | 'success' | 'info' | 'neutral'
  /** Loading state for the confirm button */
  loading?: boolean
}>(), {
  icon: 'i-lucide-triangle-alert',
  title: 'Confirmation',
  description: 'Are you sure you want to proceed?',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  color: 'yellow',
  loading: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  confirm: []
  cancel: []
}>()

// Full static class maps so Tailwind JIT can detect all used classes at scan time.
const colorMap = {
  yellow: {
    modalContent: 'ring ring-yellow-500/25 dark:ring-yellow-400/25 bg-yellow-50 dark:bg-yellow-950',
    iconWrapper: 'flex items-center justify-center size-16 rounded-full bg-yellow-100 dark:bg-yellow-900',
    icon: 'size-8 text-yellow-500 dark:text-yellow-400',
    title: 'text-yellow-900 dark:text-yellow-200 text-xl font-bold',
    description: 'text-sm text-yellow-700 dark:text-yellow-400 leading-relaxed',
  },
  error: {
    modalContent: 'ring ring-error-500/25 dark:ring-error-400/25 bg-error-50 dark:bg-error-950',
    iconWrapper: 'flex items-center justify-center size-16 rounded-full bg-error-100 dark:bg-error-900',
    icon: 'size-8 text-error-500 dark:text-error-400',
    title: 'text-error-900 dark:text-error-200 text-xl font-bold',
    description: 'text-sm text-error-700 dark:text-error-400 leading-relaxed',
  },
  primary: {
    modalContent: 'ring ring-primary-500/25 dark:ring-primary-400/25 bg-primary-50 dark:bg-primary-950',
    iconWrapper: 'flex items-center justify-center size-16 rounded-full bg-primary-100 dark:bg-primary-900',
    icon: 'size-8 text-primary-500 dark:text-primary-400',
    title: 'text-primary-900 dark:text-primary-200 text-xl font-bold',
    description: 'text-sm text-primary-700 dark:text-primary-400 leading-relaxed',
  },
  success: {
    modalContent: 'ring ring-success-500/25 dark:ring-success-400/25 bg-success-50 dark:bg-success-950',
    iconWrapper: 'flex items-center justify-center size-16 rounded-full bg-success-100 dark:bg-success-900',
    icon: 'size-8 text-success-500 dark:text-success-400',
    title: 'text-success-900 dark:text-success-200 text-xl font-bold',
    description: 'text-sm text-success-700 dark:text-success-400 leading-relaxed',
  },
  info: {
    modalContent: 'ring ring-info-500/25 dark:ring-info-400/25 bg-info-50 dark:bg-info-950',
    iconWrapper: 'flex items-center justify-center size-16 rounded-full bg-info-100 dark:bg-info-900',
    icon: 'size-8 text-info-500 dark:text-info-400',
    title: 'text-info-900 dark:text-info-200 text-xl font-bold',
    description: 'text-sm text-info-700 dark:text-info-400 leading-relaxed',
  },
  neutral: {
    modalContent: 'ring ring-neutral-500/25 dark:ring-neutral-400/25 bg-neutral-50 dark:bg-neutral-950',
    iconWrapper: 'flex items-center justify-center size-16 rounded-full bg-neutral-100 dark:bg-neutral-900',
    icon: 'size-8 text-neutral-500 dark:text-neutral-400',
    title: 'text-neutral-900 dark:text-neutral-200 text-xl font-bold',
    description: 'text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed',
  },
} as const

const classes = computed(() => colorMap[props.color ?? 'yellow'])

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
      content: classes.modalContent,
      header: 'hidden',
    }"
    @update:open="emit('update:open', $event)"
  >
    <template #body>
      <div class="flex flex-col items-center gap-3 text-center pt-2">
        <!-- Icon -->
        <div :class="classes.iconWrapper">
          <UIcon :name="icon" :class="classes.icon" />
        </div>

        <!-- Title -->
        <slot name="title">
          <div :class="classes.title">{{ title }}</div>
        </slot>

        <!-- Description -->
        <slot name="description">
          <p :class="classes.description">
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
