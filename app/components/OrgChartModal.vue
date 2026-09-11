<script setup lang="ts">
type OrgNode = {
  id: string
  parentId: string
  title: string
  icon: string
  employees: number
  avatars: string[]
}

type FloatingRole = {
  title: string
  icon: string
  employees: number
  avatars: string[]
}

const open = defineModel<boolean>('open', { default: false })

const props = withDefaults(defineProps<{
  data?: OrgNode[]
  floatingRoles?: FloatingRole[]
}>(), {
  data: () => [],
  floatingRoles: () => []
})

const { register } = useOverlayVisibility()
register(open)
</script>

<template>
    <UModal
        v-model:open="open"
        fullscreen
        :ui="{
            content: 'flex flex-col',
            header: 'relative bg-linear-to-r from-primary-500/15 to-primary-500/0 group',
            body: 'flex-1 min-h-0 p-0 sm:p-0 overflow-hidden'
        }"
    >
        <template #header>
            <div class="absolute overflow-hidden inset-0 pointer-events-none">
                <UIcon name="i-lucide-git-fork" class="size-24 text-primary-500 opacity-10 absolute -bottom-7 end-2 rotate-180" />
            </div>
            <div class="flex items-center justify-between relative z-10 w-full">
                <div class="flex items-center gap-3 flex-1">
                    <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <UIcon name="i-lucide-git-fork" class="size-5 text-primary rotate-180" />
                    </div>
                    <div>
                        <h2 class="text-primary font-semibold leading-tight">Organization Chart</h2>
                        <p class="text-primary/60 text-sm">CCCI Company Structure</p>
                    </div>
                </div>
                <UButton
                    color="neutral"
                    variant="ghost"
                    icon="i-lucide-x"
                    class="hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                    @click="open = false"
                />
            </div>
        </template>
        <template #body>
            <div class="relative w-full h-full overflow-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
                <!-- Subtle grid background -->
                <div
                    class="absolute inset-0 opacity-30"
                    style="background-image: radial-gradient(circle, var(--ui-border) 1px, transparent 1px); background-size: 28px 28px;"
                />

                <!-- Main Org Chart — fills full area, floating roles rendered inside component -->
                <ClientOnly>
                    <OrgChart :data="props.data" :floating-roles="props.floatingRoles" />
                </ClientOnly>
            </div>
        </template>
    </UModal>
</template>
