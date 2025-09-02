<script setup lang="ts">
import { UAvatar } from '#components';
import type { ListItemProps } from '~/types/models'

// extend props with "read"
const props = defineProps<ListItemProps & {
    read?: boolean
}>()
</script>

<template>
    <div class="flex items-center gap-3 w-full">
        <UAvatar icon="i-lucide-mail" 
            :class="[
                props.read ? 'opacity-50' : undefined
            ]" 
        />

        <div class="flex-1 space-y-0.5">
            <div v-if="$slots.title || title" :class="[
                'text-sm line-clamp-1',
                props.read ? 'text-muted font-semibold' : 'text-highlighted font-bold'
            ]">
                <slot name="title">
                    {{ title }}
                </slot>
            </div>

            <div v-if="$slots.description || description" :class="[
                'text-xs',
                props.read ? 'text-dimmed' : 'text-default'
            ]">
                <slot name="description">
                    {{ description }}
                </slot>
            </div>
        </div>

        <!-- show chip only if NOT read -->
        <UChip v-if="!props.read" standalone inset color="emerald" />
    </div>
</template>