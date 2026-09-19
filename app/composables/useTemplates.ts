import type { OnboardingTemplate, OnboardingTask } from '~~/app/types'

export type { OnboardingTemplate, OnboardingTask }

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(date)
}

// ─── Module-level state ───────────────────────────────────────────────────────
// Shared across all component instances (lightweight store).
// Seeded once from the API; subsequent CRUD ops mutate local state only
// (a real backend would call POST/PATCH/DELETE endpoints instead).

const templates = ref<OnboardingTemplate[]>([])
let initialized = false

async function initTemplates() {
    if (initialized) return
    initialized = true
    const data = await $fetch<OnboardingTemplate[]>('/api/onboarding/templates')
    templates.value = data
}

// ─── Composable ───────────────────────────────────────────────────────────────

export function useTemplates() {
    // Seed on first use (no-op on subsequent calls)
    initTemplates()

    function addTemplate(template: Omit<OnboardingTemplate, 'id' | 'dateCreated' | 'dateUpdated'>) {
        const id = Date.now()
        const dateCreated = formatDate(new Date())
        templates.value.push({ id, dateCreated, ...template })
        return id
    }

    function updateTemplate(id: number, data: Partial<Omit<OnboardingTemplate, 'id' | 'dateCreated' | 'dateUpdated'>>) {
        const idx = templates.value.findIndex(t => t.id === id)
        if (idx !== -1) {
            templates.value[idx] = {
                ...templates.value[idx],
                ...data,
                dateUpdated: formatDate(new Date())
            } as OnboardingTemplate
        }
    }

    function deleteTemplate(id: number) {
        const idx = templates.value.findIndex(t => t.id === id)
        if (idx !== -1) templates.value.splice(idx, 1)
    }

    function getTemplate(id: number) {
        return templates.value.find(t => t.id === id)
    }

    return { templates, addTemplate, updateTemplate, deleteTemplate, getTemplate }
}
