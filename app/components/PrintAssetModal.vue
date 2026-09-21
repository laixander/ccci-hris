<script setup lang="ts">
import type { Asset } from '~/types'
import QrcodeVue from 'qrcode.vue'

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{
    asset?: Asset
}>()

const handlePrint = () => {
    window.print()
}
</script>

<template>
    <UModal v-model:open="open" class="w-full max-w-[600px]" :ui="{
        content: 'overflow-visible group print:shadow-none print:bg-transparent',
        header: 'relative bg-linear-to-r from-primary-500/15 to-primary-500/0 rounded-t-lg hide-on-print',
        body: 'scrollbar print:p-0',
        footer: 'hide-on-print'
    }">
        <template #header>
            <div class="absolute overflow-hidden inset-0">
                <UIcon name="i-lucide-printer" class="size-24 text-primary-500 opacity-10 absolute -bottom-7 end-2" />
            </div>
            <div class="flex flex-col relative z-10">
                <h2 class="text-primary font-semibold">Print Asset Stickers</h2>
                <p class="text-primary/60 text-sm mt-1">1 sticker(s) ready to print</p>
            </div>
            <UButton icon="i-lucide-x" variant="outline" color="neutral"
                class="absolute -top-4 -end-4 opacity-0 group-hover:opacity-100 transition-opacity hide-on-print z-20"
                @click="open = false" />
        </template>

        <template #body>
            <div class="flex justify-center py-4 print:py-0">
                <div v-if="asset" class="inline-flex border border-dashed border-gray-400 rounded-lg p-6 w-[450px] gap-6 print:border-none print:p-0 bg-white">
                    <!-- QR Code -->
                    <div class="shrink-0 flex items-center">
                        <qrcode-vue :value="asset.assetTag" :size="140" level="H" />
                    </div>
                    <!-- Details -->
                    <div class="flex flex-col justify-center w-full min-w-0">
                        <div class="font-bold text-gray-900 text-lg truncate">{{ asset.assetTag }}</div>
                        <div class="text-sm text-gray-600 truncate">{{ asset.name }}</div>
                        <div class="text-xs text-gray-400 mb-2 truncate">{{ asset.brandModel?.split(' / ')[0] || '' }}</div>
                        
                        <!-- Barcode -->
                        <div class="mt-auto">
                            <Barcode :value="asset.assetTag" />
                        </div>
                    </div>
                </div>
            </div>
        </template>
        
        <template #footer>
            <div class="flex justify-end gap-3 hide-on-print">
                <UButton label="Cancel" variant="ghost" color="neutral" @click="open = false" />
                <UButton label="Print" icon="i-lucide-printer" color="primary" @click="handlePrint" />
            </div>
        </template>
    </UModal>
</template>

<style scoped>
@media print {
    .hide-on-print {
        display: none !important;
    }
}
</style>
