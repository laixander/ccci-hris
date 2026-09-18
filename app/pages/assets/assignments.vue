<script setup lang="ts">
definePageMeta(
    {
        isTable: true
    }
)
</script>
<template>
    <div class="flex-1 flex flex-col p-4 space-y-6 overflow-y-auto scrollbar">
        <!-- Page header -->
        <div class="flex items-center gap-4">
            <UPageCard title="Asset Assignments" description="Manage employee assets" variant="naked" class="flex-1"
                :ui="{
                    title: 'text-2xl font-bold'
                }" />
        </div>
    </div>
</template>