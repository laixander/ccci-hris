<script setup lang="ts">
definePageMeta({
    layout: 'landing'
})

// Props so you can reuse this component elsewhere
defineProps<{
    comparisonData?: {
        feature: string
        seas: string
        irs: string
    }[]
}>()

// Example data (default fallback)
const sampleComparison = [
    {
        feature: "Target Audience",
        seas: "Students (K-12, Higher Education)",
        irs: "General public (adults, employees, residents, etc.)"
    },
    {
        feature: "User Interface",
        seas: "Simple, intuitive, and engaging for young users or students",
        irs: "More formal, but simple enough for wide demographic appeal"
    },
    {
        feature: "Access Control",
        seas: "Students may have accounts linked to a school/college portal, access may be role-based (student, teacher, admin)",
        irs: "Typically public access or requires login based on service provider"
    },
    {
        feature: "Incident Types",
        seas: "Academic issues, bullying, harassment, campus safety, personal well-being",
        irs: "Crime reporting, health and safety concerns, environmental hazards"
    },
    {
        feature: "Privacy & Anonymity",
        seas: "High emphasis on anonymity for sensitive issues like bullying, mental health",
        irs: "Varies; may allow anonymous reporting but often linked to incident type"
    },
    {
        feature: "Reporting Channels",
        seas: "Mobile app, web portal, SMS, email",
        irs: "Web portal, mobile app, phone hotline, email"
    },
    {
        feature: "Data Analysis/Reporting",
        seas: "Tailored reports on student-related issues; may involve educational metrics (e.g., attendance issues, well-being trends)",
        irs: "Broad analytics for multiple sectors (public health, safety, etc.)"
    },
    {
        feature: "Customization",
        seas: "Can be customized for specific school needs (e.g., anti-bullying programs, mental health initiatives)",
        irs: "Limited customization for mass use, designed for broader applicability"
    },
    {
        feature: "Incident Resolution Workflow",
        seas: "May integrate with campus-based support systems (counselors, academic advisors, safety officers)",
        irs: "Often linked to government, law enforcement, or public service entities"
    },
    {
        feature: "Confidentiality & Security",
        seas: "High focus on confidentiality (especially for sensitive student issues)",
        irs: "May be less focused on confidentiality, depending on the nature of the incident"
    },
    {
        feature: "Integration with Other Systems",
        seas: "Integrated with school databases, learning management systems (LMS), or campus safety systems",
        irs: "Integrates with public service systems (e.g., police, fire departments, public health agencies)"
    },
    {
        feature: "Feedback Mechanism",
        seas: "Provides feedback to the student (e.g., follow-up on resolved issues)",
        irs: "Varies depending on the system; feedback might not be as direct or frequent"
    },
    {
        feature: "Notifications",
        seas: "Push notifications, email, or SMS alerts for students or administrators",
        irs: "Alerts and notifications can be sent to relevant authorities or stakeholders"
    },
    {
        feature: "Accessibility Features",
        seas: "High focus on accessibility for students with disabilities (e.g., screen readers, easy-to-navigate UI)",
        irs: "Generally aims for broader accessibility but might not be as tailored for specific groups"
    },
    {
        feature: "Language Support",
        seas: "May support multiple languages based on student demographics (e.g., ESL students)",
        irs: "Often supports multiple languages, but more generalized for large regions"
    },
    {
        feature: "Incident Severity & Impact",
        seas: "Generally focuses on low to medium severity incidents impacting student life",
        irs: "Can handle both low and high-severity incidents impacting a broad range of people"
    },
    {
        feature: "Escalation Options",
        seas: "Incidents may be escalated to on-campus counselors, faculty, or campus safety",
        irs: "Incidents can be escalated to police, emergency services, or governmental bodies"
    },
    {
        feature: "User Education & Training",
        seas: "Often requires educational materials or tutorials on proper reporting",
        irs: "May not offer as much education on how to report or what is considered an incident"
    },
    {
        feature: "Data Retention",
        seas: "Retains records based on academic year or student lifecycle; sensitive data often purged after resolution",
        irs: "Retains data per government or organizational policy; often longer retention periods"
    }
]

</script>

<template>
    <section class="max-w-6xl mx-auto p-6">
        <!-- Header -->
        <header class="flex items-start gap-4 mb-6">
            <div class="flex items-center justify-center w-13 h-13 rounded-full bg-gradient-to-br from-sky-500 to-sky-300">
                <UIcon name="i-lucide-table" class="size-6 flex shrink-0 text-white" />
            </div>
            <div class="flex-1">
                <h1 class="text-xl font-semibold text-gray-900">
                    SEAS vs Incident Reporting System — Visual Comparison
                </h1>
                <p class="text-sm text-gray-600 mt-1">
                    Side-by-side feature / aspect summary (student-focused SEAS vs general Incident Reporting System)
                </p>
            </div>

            <div class="flex gap-3 items-center">
                <div class="flex items-center gap-2 text-sm text-gray-600">
                    <span class="w-4 h-4 rounded-sm bg-sky-500 block"></span> SEAS
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                    <span class="w-4 h-4 rounded-sm bg-orange-500 block"></span> IRS
                </div>
            </div>
        </header>

        <!-- Comparison Grid -->
        <UCard>
            <!-- Table header -->
            <div class="hidden md:grid grid-cols-12 gap-4 items-center pb-3 border-b border-gray-200 mb-3">
                <div class="col-span-3 text-gray-800 font-medium">Feature / Aspect</div>
                <div class="col-span-4 text-sky-700 font-semibold">SEAS (Students)</div>
                <div class="col-span-5 text-orange-700 font-semibold">
                    Incident Reporting System (Public)
                </div>
            </div>

            <div class="space-y-3">
                <!-- Dynamic Rows -->
                <div v-for="(row, idx) in comparisonData || sampleComparison" :key="idx"
                    class="grid grid-cols-1 md:grid-cols-12 gap-3 items-start bg-white rounded-lg p-3 border border-gray-200">
                    <div class="col-span-3">
                        <div class="text-gray-900 font-semibold">{{ row.feature }}</div>
                    </div>

                    <div class="col-span-4">
                        <div class="rounded-lg p-3 bg-sky-50 border border-sky-100 min-h-[72px]">
                            <div class="text-sm text-sky-800">{{ row.seas }}</div>
                        </div>
                    </div>

                    <div class="col-span-5">
                        <div class="rounded-lg p-3 bg-orange-50 border border-orange-100 min-h-[72px]">
                            <div class="text-sm text-orange-800">{{ row.irs }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-4 flex flex-wrap gap-3 justify-between items-center text-sm text-gray-500">
                SEAS vs Incident Reporting System — CCCI Inc.
            </div>
        </UCard>
    </section>
</template>
