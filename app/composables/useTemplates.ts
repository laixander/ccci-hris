export type OnboardingTemplate = {
    id: number
    name: string
    description: string
    status: 'Draft' | 'Published'
    tasks: OnboardingTask[]
    dateCreated: string
    dateUpdated?: string
}

export type OnboardingTask = {
    id: number
    name: string
    description: string
    category: string
    assignee: string
    dueDays: number
    required: boolean
}

// Module-level state — shared across all component instances (like a lightweight store)
const templates = ref<OnboardingTemplate[]>([
    {
        id: 1,
        name: 'Software Engineer Onboarding',
        description: 'Standard onboarding for new software engineers',
        status: 'Published',
        tasks: [],
        dateCreated: 'October 1, 2023 at 09:00 AM',
    },
    {
        id: 2,
        name: 'HR Generalist Onboarding',
        description: 'Standard onboarding for new HR generalists',
        status: 'Published',
        tasks: [],
        dateCreated: 'October 2, 2023 at 10:30 AM',
    },
    {
        id: 3,
        name: 'Sales Representative Onboarding',
        description: 'Standard onboarding for new sales representatives',
        status: 'Draft',
        tasks: [],
        dateCreated: 'October 5, 2023 at 01:15 PM',
    },
    {
        id: 4,
        name: 'Marketing Manager Onboarding',
        description: 'Standard onboarding for new marketing managers',
        status: 'Published',
        tasks: [],
        dateCreated: 'October 10, 2023 at 11:45 AM',
    },
    {
        id: 5,
        name: 'Customer Support Onboarding',
        description: 'Standard onboarding for new customer support specialists',
        status: 'Draft',
        tasks: [],
        dateCreated: 'October 12, 2023 at 03:20 PM',
    },
    {
        id: 6,
        name: 'Executive Onboarding',
        description: 'Standard onboarding for new executives',
        status: 'Published',
        tasks: [],
        dateCreated: 'October 15, 2023 at 08:30 AM',
    },
    {
        id: 7,
        name: 'Intern Onboarding',
        description: 'Standard onboarding for new interns',
        status: 'Draft',
        tasks: [],
        dateCreated: 'October 20, 2023 at 02:00 PM',
    },
    {
        id: 8,
        name: 'Contractor Onboarding',
        description: 'Standard onboarding for new contractors',
        status: 'Published',
        tasks: [],
        dateCreated: 'October 25, 2023 at 04:45 PM',
    },
])

export function useTemplates() {
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
