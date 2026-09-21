<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import JsBarcode from 'jsbarcode'

const props = defineProps<{
    value: string
}>()

const barcodeRef = ref<HTMLCanvasElement | null>(null)

const generateBarcode = () => {
    if (barcodeRef.value && props.value) {
        JsBarcode(barcodeRef.value, props.value, {
            format: 'CODE128',
            displayValue: false,
            height: 40,
            width: 1.5,
            margin: 0
        })
    }
}

onMounted(() => {
    generateBarcode()
})

watch(() => props.value, () => {
    generateBarcode()
})
</script>

<template>
    <canvas ref="barcodeRef"></canvas>
</template>
