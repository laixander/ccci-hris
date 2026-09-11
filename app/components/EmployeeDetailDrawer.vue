<script setup lang="ts">
export type Employee = {
    id: number
    name: string
    employeeNo: string
    department: string
    designation: string
    dateHired: string
    employmentType: string
    status: 'ACTIVE' | 'INACTIVE'
    email: string
}

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{
    employee: Employee | null
}>()

// DiceBear avatar URL — matches project pattern (10.x/thumbs/svg)
const dicebearUrl = (seed: string) =>
    `https://api.dicebear.com/10.x/thumbs/svg?seed=${encodeURIComponent(seed)}`

const { register } = useOverlayVisibility()
register(open)
</script>

<template>
    <UDrawer
        v-model:open="open"
        direction="right"
        title="Employee Details"
        inset
        close
        class="w-full max-w-[460px]"
        :ui="{
            container: 'pr-0',
            header: 'pr-4',
            footer: 'pr-4',
            body: 'pr-4 overflow-y-auto scrollbar'
        }"
    >
        <template #body>
            <div v-if="props.employee" class="space-y-4">
                <!-- Employee Header Card -->
                <div class="relative overflow-hidden p-4 rounded-lg bg-linear-to-r from-primary-500/15 to-primary-500/0 border border-[var(--ui-border)] shadow-xs">
                    <div class="absolute overflow-hidden inset-0 pointer-events-none">
                        <UIcon name="i-lucide-user" class="size-24 text-primary-500 opacity-10 absolute -bottom-7 end-2" />
                    </div>
                    <div class="flex items-center gap-3.5 relative z-10">
                        <UAvatar
                            :src="dicebearUrl(props.employee.name.split(' ')[0] || props.employee.name)"
                            :alt="props.employee.name"
                            size="lg"
                            :chip="{ color: props.employee.status === 'ACTIVE' ? 'success' : 'neutral', inset: true, position: 'bottom-right' }"
                        />
                        <div class="min-w-0 flex-1">
                            <h2 class="text-base font-semibold text-highlighted leading-tight truncate">{{ props.employee.name }}</h2>
                            <p class="text-xs text-dimmed mt-0.5 truncate">{{ props.employee.designation }}</p>
                        </div>
                    </div>
                </div>

                <!-- Employment Details -->
                <div class="space-y-2">
                    <p class="text-xs font-semibold text-dimmed uppercase tracking-wider">Employment Details</p>
                    <div class="grid grid-cols-2 gap-3 text-sm bg-muted dark:bg-muted/30 p-4 rounded-lg">
                        <div>
                            <div class="text-xs text-dimmed mb-0.5">Department</div>
                            <div class="font-medium">{{ props.employee.department }}</div>
                        </div>
                        <div>
                            <div class="text-xs text-dimmed mb-0.5">Designation</div>
                            <div class="font-medium">{{ props.employee.designation }}</div>
                        </div>
                        <USeparator class="col-span-2" />
                        <div>
                            <div class="text-xs text-dimmed mb-0.5">Employee No.</div>
                            <div class="font-medium tabular-nums">{{ props.employee.employeeNo }}</div>
                        </div>
                        <div>
                            <div class="text-xs text-dimmed mb-0.5">Date Hired</div>
                            <div class="font-medium">{{ props.employee.dateHired }}</div>
                        </div>
                        <USeparator class="col-span-2" />
                        <div>
                            <div class="text-xs text-dimmed mb-0.5">Employment Type</div>
                            <div class="font-semibold text-xs tracking-wider">{{ props.employee.employmentType }}</div>
                        </div>
                        <div>
                            <div class="text-xs text-dimmed mb-1">Status</div>
                            <StatusBadge :status="props.employee.status" />
                        </div>
                        <USeparator class="col-span-2" />
                        <div class="col-span-2">
                            <div class="text-xs text-dimmed mb-0.5">Email</div>
                            <div class="font-medium">{{ props.employee.email }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="flex justify-end">
                <UButton label="Close" variant="ghost" color="neutral" @click="open = false" />
            </div>
        </template>
    </UDrawer>
</template>
