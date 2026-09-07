<script setup lang="ts">
const isModalOpen = ref(false)
</script>

<template>
    <div class="p-8">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold">Reimbursements</h1>
            <UButton icon="i-lucide-plus" label="File Reimbursement" @click="isModalOpen = true" />
        </div>
        
        <ApplyReimbursementModal v-model:open="isModalOpen" />
    </div>
</template>