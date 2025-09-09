<script setup lang="ts">
import { partnerActivities } from '~/data'
</script>
<template>
    <UContainer>
        <Page>
            <Block>
                <div class="lg:flex items-center justify-between lg:space-y-0 space-y-4">
                    <div class="flex items-center gap-2">
                        <UIcon name="i-lucide-cloud-sun" class="size-10 text-amber-500 shrink-0" />
                        <div class="grid gap-0.5">
                            <span class="font-bold text-xl text-highlighted">Good morning, Jane Copper!</span>
                            <span class="text-sm text-muted">Here's what's happening with your team today.</span>
                        </div>
                    </div>
                    <div class="lg:flex items-center gap-10 lg:space-y-0 space-y-4">
                        <div class="flex items-center gap-2">
                            <UIcon name="i-lucide-building" class="size-6 text-rose-400 shrink-0" />
                            <div class="grid">
                                <span class="font-semibold text-xs text-highlighted">Site Reporting:</span>
                                <span class="text-sm text-muted">Rufino Branch, Makati City</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <UIcon name="i-lucide-calendar-days" class="size-6 text-teal-400 shrink-0" />
                            <div class="grid">
                                <span class="font-semibold text-xs text-highlighted">Schedule Today:</span>
                                <span class="text-sm text-muted flex items-center gap-2">8:00 AM - 5:00 PM <UBadge label="Regular" color="primary" size="sm" variant="soft" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </Block>

            <Grid :lg="4" :gap="4">
                <StatCard
                    label="Today’s Time"
                    count="09:00 AM"
                    icon="i-lucide-calendar-clock"
                    color="secondary"
                    hasDetails
                    trendValue="8h 30m"
                    trendDescription="Regular shift"
                    useGradient
                />
                <StatCard
                    label="Leave Credits"
                    count="12"
                    icon="i-lucide-umbrella"
                    color="success"
                    hasDetails
                    trendValue="-1"
                    trendDescription="After applying sick leave"
                    useGradient
                />
                <StatCard
                    label="Overtime Hours"
                    count="14h"
                    icon="i-lucide-hourglass"
                    color="warning"
                    hasDetails
                    trendValue="+2h"
                    trendDescription="From last week’s report"
                    useGradient
                />
                <StatCard
                    label="Avg. Performance"
                    count="87%"
                    icon="i-lucide-bar-chart-3"
                    color="purple"
                    hasDetails
                    trendValue="+5%"
                    trendDescription="Improved compared to last evaluation"
                    useGradient
                />
            </Grid>

            <Grid :lg="2" :gap="4">
                <Block
                    title="Recent Activity"
                    description="A quick overview of your latest actions and updates."
                >
                    <UTimeline color="info" size="3xs" :default-value="0" :items="partnerActivities" class="w-96" :ui="{indicator: 'mt-0.5 w-2.5 h-2.5'}">
                        <template #indicator="{ item }">
                            <span></span>
                        </template>
                        <!-- Custom title slot for "proposal" -->
                        <template #title="{ item }">
                            <div>{{ item.title }}</div>
                        </template>
                    </UTimeline>
                </Block>
                <Block
                    title="Upcoming Events"
                    description="Stay informed about scheduled events and important dates."
                >
                </Block>
            </Grid>
        </Page>
    </UContainer>
</template>