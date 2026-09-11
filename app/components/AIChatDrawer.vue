<script setup lang="ts">
const { isAIChatOpen, aiInput, chatMessages, chatEndRef, quickPrompts, sendMessage } = useAIChat()
const { isAnyOverlayOpen } = useOverlayVisibility()
</script>

<template>
    <!-- AI FAB -->
    <Teleport to="body">
        <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-75"
        >
        <div v-show="!isAIChatOpen && !isAnyOverlayOpen" class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
            <!-- Tooltip bubble -->
            <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 translate-y-2 scale-95"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 translate-y-0 scale-100"
                leave-to-class="opacity-0 translate-y-2 scale-95"
            >
                <div
                    v-if="!isAIChatOpen && !isAnyOverlayOpen && chatMessages.length === 0"
                    class="bg-white dark:bg-neutral-800 rounded-md shadow-xl ring-1 ring-neutral-200 dark:ring-neutral-700 p-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-200 max-w-[200px]"
                >
                    👋 Hi! Ask me anything.
                </div>
            </Transition>

            <!-- FAB button -->
            <div class="relative">
                <UButton
                    square
                    color="primary"
                    class="rounded-full shadow-lg shadow-primary-500/40 hover:scale-110 active:scale-95 transition-transform duration-200 flex items-center justify-center size-12"
                    aria-label="Open AI Chat"
                    @click="isAIChatOpen = true"
                >
                    <UIcon name="i-lucide-sparkles" class="size-5" />
                </UButton>
                <span
                    v-if="chatMessages.length > 0"
                    class="absolute -top-[2px] -right-[2px] flex size-4 items-center justify-center rounded-full bg-error-500 text-white text-[10px] font-bold pointer-events-none"
                >{{ chatMessages.filter(m => m.role === 'ai').length }}</span>
            </div>
        </div>
        </Transition>
    </Teleport>

    <!-- AI Chat Slideover -->
    <USlideover
        v-model:open="isAIChatOpen"
        side="right"
        close
        :ui="{ header: 'border-b border-default', body: 'flex flex-col overflow-hidden' }"
    >
        <template #header>
            <div class="flex items-center gap-3">
                <div class="relative flex items-center justify-center size-9 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400">
                    <UIcon name="i-lucide-sparkles" class="size-5" />
                    <span class="absolute -top-0.5 -right-0.5 flex size-2.5">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full size-2.5 bg-primary-400"></span>
                    </span>
                </div>
                <div>
                    <div class="font-bold text-sm">AI Assistant</div>
                    <div class="text-xs text-dimmed">Always here to help</div>
                </div>
            </div>
        </template>

        <template #body>
            <div class="flex-1 overflow-y-auto scrollbar flex flex-col">
                <!-- Empty state -->
                <div v-if="chatMessages.length === 0" class="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                    <div class="flex items-center justify-center size-16 rounded-2xl bg-primary-500/10 text-primary-500">
                        <UIcon name="i-lucide-bot" class="size-8" />
                    </div>
                    <div>
                        <p class="font-semibold text-sm">How can I help you today?</p>
                        <p class="text-xs text-dimmed mt-1">Ask me about leaves, DTR, payslips, and more.</p>
                    </div>
                    <div class="flex flex-wrap justify-center gap-2 mt-2">
                        <UButton
                            v-for="p in quickPrompts"
                            :key="p.label"
                            :label="p.label"
                            :icon="p.icon"
                            color="primary"
                            variant="soft"
                            size="sm"
                            @click="sendMessage(p.label)"
                        />
                    </div>
                </div>

                <!-- Messages -->
                <div v-else class="flex-1 flex flex-col gap-4">
                    <TransitionGroup name="chat">
                        <div
                            v-for="(msg, i) in chatMessages"
                            :key="i"
                            :class="['flex gap-2', msg.role === 'user' ? 'justify-end' : 'justify-start']"
                        >
                            <!-- AI avatar -->
                            <div v-if="msg.role === 'ai'" class="flex items-end shrink-0">
                                <div class="flex items-center justify-center size-7 rounded-full bg-primary-500/10 text-primary-500">
                                    <UIcon name="i-lucide-sparkles" class="size-4" />
                                </div>
                            </div>
                            <div :class="[
                                'max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed',
                                msg.role === 'user'
                                    ? 'bg-primary-600 text-white rounded-br-sm'
                                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-bl-sm'
                            ]">{{ msg.text }}</div>
                        </div>
                    </TransitionGroup>
                    <div ref="chatEndRef" />
                </div>
            </div>
        </template>

        <template #footer>
            <div class="flex items-center gap-2 w-full">
                <UInput
                    v-model="aiInput"
                    placeholder="Type a message..."
                    class="flex-1"
                    size="md"
                    @keydown.enter="sendMessage()"
                />
                <UButton icon="i-lucide-arrow-up" color="primary" size="md" @click="sendMessage()" />
            </div>
        </template>
    </USlideover>
</template>

<style scoped>
.chat-enter-active {
  transition: all 0.25s ease-out;
}
.chat-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
</style>
