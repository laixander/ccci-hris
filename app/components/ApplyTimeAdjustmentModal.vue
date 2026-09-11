<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })

defineProps<{
  record: {
    day: number
    timeIn: string | null
    timeOut: string | null
  } | null
  monthLabel: string | undefined
  year: number
}>()

const { register } = useOverlayVisibility()
register(open)
</script>

<template>
  <UModal
    v-model:open="open"
    class="w-full max-w-[460px]"
    :ui="{
      content: 'overflow-visible group',
      header: 'relative bg-linear-to-r from-primary-500/15 to-primary-500/0 rounded-t-lg',
      body: 'scrollbar',
    }"
  >
    <template #header>
      <div class="absolute overflow-hidden inset-0">
        <UIcon name="i-lucide-clock" class="size-24 text-primary-500 opacity-10 absolute -bottom-7 end-2" />
      </div>
      <div class="flex flex-col">
        <h2 class="text-primary font-semibold">Request Time Adjustment</h2>
        <p class="text-primary/60 text-sm mt-1">Submit a correction for your time in or time out.</p>
      </div>
      <UButton icon="i-lucide-x" variant="outline" color="neutral"
        class="absolute -top-4 -end-4 opacity-0 group-hover:opacity-100 transition-opacity"
        @click="open = false" />
    </template>
    <template #body>
      <div v-if="record" class="space-y-4">
        <div class="bg-muted px-3 py-2 rounded-md text-sm text-dimmed">
          Requesting adjustment for
          <strong class="text-highlighted">{{ monthLabel }} {{ record.day }}, {{ year }}</strong>.
        </div>

        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Current Time In">
            <UInput :model-value="record.timeIn || '--:--'" disabled class="w-full" />
          </UFormField>
          <UFormField label="Current Time Out">
            <UInput :model-value="record.timeOut || '--:--'" disabled class="w-full" />
          </UFormField>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <UFormField label="Adjusted Time In" required>
            <UInputTime class="w-full" />
          </UFormField>
          <UFormField label="Adjusted Time Out" required>
            <UInputTime class="w-full" />
          </UFormField>
        </div>

        <UFormField label="Reason for Adjustment" required>
          <UTextarea placeholder="Explain why you are requesting this adjustment..." :rows="3" class="w-full" />
        </UFormField>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-3 w-full">
        <UButton label="Cancel" variant="ghost" color="neutral" @click="open = false" />
        <UButton label="Submit Request" color="primary" @click="open = false" />
      </div>
    </template>
  </UModal>
</template>
