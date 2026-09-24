<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

definePageMeta({
	isTable: true
})

// ─── State ───────────────────────────────────────────────────────────────────

const month = ref(new Date().getMonth() + 1)
const year = ref(new Date().getFullYear())

const viewMode = ref<'month' | 'week' | 'day'>('month')
const selectedWeekIndex = ref(0)
const selectedDay = ref(new Date().getDate())

// ─── Calendar ─────────────────────────────────────────────────────────────────

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

type CalendarCell = {
	day: number
	date: Date
	isToday: boolean
	isWeekend: boolean
} | null

const calendarDays = computed<CalendarCell[]>(() => {
	const y = year.value
	const m = month.value // 1-based

	const today = new Date()
	const daysInMonth = new Date(y, m, 0).getDate()       // last day of month
	const firstDayOfWeek = new Date(y, m - 1, 1).getDay() // 0=Sun … 6=Sat

	const cells: CalendarCell[] = []

	// Leading empty cells so day-1 lands in the correct column
	for (let i = 0; i < firstDayOfWeek; i++) {
		cells.push(null)
	}

	for (let day = 1; day <= daysInMonth; day++) {
		const date = new Date(y, m - 1, day)
		const dow = date.getDay()
		cells.push({
			day,
			date,
			isToday: today.getFullYear() === y && today.getMonth() + 1 === m && today.getDate() === day,
			isWeekend: dow === 0 || dow === 6,
		})
	}

	// Trailing empty cells so the grid always has complete rows
	const remainder = cells.length % 7
	if (remainder !== 0) {
		for (let i = 0; i < 7 - remainder; i++) {
			cells.push(null)
		}
	}

	return cells
})

const calendarWeeks = computed(() => {
	const weeks = []
	for (let i = 0; i < calendarDays.value.length; i += 7) {
		weeks.push(calendarDays.value.slice(i, i + 7))
	}
	return weeks
})

const daysInCurrentMonth = computed(() => new Date(year.value, month.value, 0).getDate())

const weeksItems = computed(() => {
	return calendarWeeks.value.map((_, index) => ({
		label: `Week ${index + 1}`,
		value: index
	}))
})

const dayItems = computed(() => {
	return Array.from({ length: daysInCurrentMonth.value }, (_, i) => ({
		label: (i + 1).toString(),
		value: i + 1
	}))
})

watch([month, year], () => {
	selectedWeekIndex.value = 0
	selectedDay.value = 1
})

// ─── Months / Years ───────────────────────────────────────────────────────────

const months = [
	{ label: 'January', value: 1 },
	{ label: 'February', value: 2 },
	{ label: 'March', value: 3 },
	{ label: 'April', value: 4 },
	{ label: 'May', value: 5 },
	{ label: 'June', value: 6 },
	{ label: 'July', value: 7 },
	{ label: 'August', value: 8 },
	{ label: 'September', value: 9 },
	{ label: 'October', value: 10 },
	{ label: 'November', value: 11 },
	{ label: 'December', value: 12 },
]

const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i + 5) // Added +5 to show future years for events

function prevMonth() {
	if (month.value === 1) {
		month.value = 12
		year.value--
	} else {
		month.value--
	}
}

function nextMonth() {
	if (month.value === 12) {
		month.value = 1
		year.value++
	} else {
		month.value++
	}
}

function prevWeek() {
	if (selectedWeekIndex.value > 0) {
		selectedWeekIndex.value--
	} else {
		prevMonth()
		nextTick(() => {
			selectedWeekIndex.value = calendarWeeks.value.length - 1
		})
	}
}

function nextWeek() {
	if (selectedWeekIndex.value < calendarWeeks.value.length - 1) {
		selectedWeekIndex.value++
	} else {
		nextMonth()
		selectedWeekIndex.value = 0
	}
}

function prevDay() {
	if (selectedDay.value > 1) {
		selectedDay.value--
	} else {
		prevMonth()
		nextTick(() => {
			selectedDay.value = daysInCurrentMonth.value
		})
	}
}

function nextDay() {
	if (selectedDay.value < daysInCurrentMonth.value) {
		selectedDay.value++
	} else {
		nextMonth()
		selectedDay.value = 1
	}
}
</script>

<template>
	<div class="flex flex-col flex-1 overflow-y-auto scrollbar">

		<!-- Header ────────────────────────────────────────────────────────────── -->
		<div>
			<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
				<UPageCard title="Company Calendar" description="View upcoming company events and holidays."
					variant="naked" orientation="horizontal" class="w-full" :ui="{
						title: 'text-2xl font-bold'
					}">
					<div class="flex justify-end gap-2 flex-1 flex-wrap">
						<UFieldGroup>
							<UButton icon="i-lucide-calendar-days" color="neutral"
								:variant="viewMode === 'month' ? 'subtle' : 'outline'" @click="viewMode = 'month'" />
							<UButton icon="i-lucide-columns-3" color="neutral"
								:variant="viewMode === 'week' ? 'subtle' : 'outline'" @click="viewMode = 'week'" />
							<UButton icon="i-lucide-square-chart-gantt" color="neutral"
								:variant="viewMode === 'day' ? 'subtle' : 'outline'" @click="viewMode = 'day'" />
						</UFieldGroup>

						<div class="flex gap-2 ml-2">
							<USelect v-model="month" :items="months" class="w-32" />
							<USelect v-model="year" :items="years" class="w-24" />
						</div>

						<!-- <UButton color="primary" class="ml-2">
              <UIcon name="i-lucide-plus" class="size-4" />
              Add Event
            </UButton> -->
					</div>
				</UPageCard>
			</div>
			<USeparator />
		</div>

		<!-- Month view ────────────────────────────────────────────────────────────── -->
		<template v-if="viewMode === 'month'">
			<div class="flex items-center justify-between px-4 py-3">
				<UButton square color="neutral" variant="ghost" @click="prevMonth">
					<UIcon name="i-lucide-chevron-left" class="size-4" />
				</UButton>
				<!-- <p class="text-lg font-semibold text-toned">{{months.find(m => m.value === month)?.label}} {{ year }}
				</p> -->
				<div class="flex items-center gap-2">
					<USelect v-model="month" :items="months" class="w-32" />
					<USelect v-model="year" :items="years" class="w-24" />
				</div>
				<UButton square color="neutral" variant="ghost" @click="nextMonth">
					<UIcon name="i-lucide-chevron-right" class="size-4" />
				</UButton>
			</div>
			<USeparator />

			<div class="flex-1 flex flex-col overflow-x-auto scrollbar">
				<div class="flex flex-col flex-1 min-w-[800px]">
					<!-- Day-of-week header -->
					<div
						class="grid grid-cols-7 gap-px bg-[var(--ui-border)] shrink-0 border-b border-[var(--ui-border)]">
						<div v-for="wd in WEEK_DAYS" :key="wd"
							class="bg-[var(--ui-bg)] py-2 text-center text-xs font-medium"
							:class="wd === 'Sun' || wd === 'Sat' ? 'text-dimmed' : 'text-toned'">
							{{ wd }}
						</div>
					</div>

					<!-- Calendar grid -->
					<div class="grid grid-cols-7 gap-px bg-[var(--ui-border)] flex-1 auto-rows-fr">
						<div v-for="(cell, idx) in calendarDays" :key="idx"
							class="p-2 flex flex-col transition-colors group relative" :class="[
								!cell
									? 'bg-[var(--ui-bg)]'
									: cell.isWeekend
										? 'bg-[var(--ui-bg)] cursor-default'
										: 'bg-[var(--ui-bg)] hover:bg-primary/5 cursor-pointer',
							]">
							<template v-if="cell">
								<!-- Day number -->
								<div class="flex items-center justify-between mb-1">
									<span
										class="text-sm font-medium leading-none w-6 h-6 flex items-center justify-center rounded-full"
										:class="[
											cell.isToday
												? 'bg-primary text-white font-bold'
												: cell.isWeekend
													? 'text-dimmed'
													: 'text-highlighted',
										]">
										{{ cell.day }}
									</span>
								</div>
							</template>
						</div>
					</div>
				</div>
			</div>
		</template>

		<!-- Week view ─────────────────────────────────────────────────────────────── -->
		<template v-else-if="viewMode === 'week'">
			<div class="flex items-center justify-between px-4 py-3">
				<UButton square color="neutral" variant="ghost" @click="prevWeek">
					<UIcon name="i-lucide-chevron-left" class="size-4" />
				</UButton>
				<!-- <p class="text-lg font-semibold text-toned">
					Week {{ selectedWeekIndex + 1 }} of {{months.find(m => m.value === month)?.label}} {{ year }}
				</p> -->
				<div class="text-lg font-semibold text-toned flex items-center gap-2">
					<USelect v-model="selectedWeekIndex" :items="weeksItems" class="w-28" />
					<span>of</span>
					<USelect v-model="month" :items="months" class="w-32" />
					<USelect v-model="year" :items="years" class="w-24" />
				</div>
				<UButton square color="neutral" variant="ghost" @click="nextWeek">
					<UIcon name="i-lucide-chevron-right" class="size-4" />
				</UButton>
			</div>
			<USeparator />

			<div class="flex-1 flex flex-col overflow-x-auto scrollbar">
				<div class="flex flex-col flex-1 min-w-[1200px]">
					<!-- Day-of-week header -->
					<div
						class="grid grid-cols-7 gap-px bg-[var(--ui-border)] shrink-0 border-b border-[var(--ui-border)]">
						<div v-for="wd in WEEK_DAYS" :key="wd"
							class="bg-[var(--ui-bg)] py-2 text-center text-xs font-medium"
							:class="wd === 'Sun' || wd === 'Sat' ? 'text-dimmed' : 'text-toned'">
							{{ wd }}
						</div>
					</div>

					<!-- Week grid -->
					<div class="grid grid-cols-7 gap-px bg-[var(--ui-border)] flex-1">
						<div v-for="(cell, idx) in (calendarWeeks[selectedWeekIndex] || [])" :key="idx"
							class="p-4 flex flex-col transition-colors group relative h-full" :class="[
								!cell
									? 'bg-[var(--ui-bg)]'
									: cell.isWeekend
										? 'bg-[var(--ui-bg)] cursor-default'
										: 'bg-[var(--ui-bg)] hover:bg-primary/5 cursor-pointer',
							]">
							<template v-if="cell">
								<!-- Day number -->
								<div class="flex items-center justify-between mb-4">
									<span
										class="text-sm font-medium leading-none w-8 h-8 flex items-center justify-center rounded-full"
										:class="[
											cell.isToday
												? 'bg-primary text-white font-bold'
												: cell.isWeekend
													? 'text-dimmed'
													: 'text-highlighted',
										]">
										{{ cell.day }}
									</span>
								</div>
								<!-- Content placeholder -->
								<div class="flex flex-col gap-1 flex-1">
								</div>
							</template>
						</div>
					</div>
				</div>
			</div>
		</template>

		<!-- Day view ──────────────────────────────────────────────────────────────── -->
		<template v-else-if="viewMode === 'day'">
			<div class="flex items-center justify-between px-4 py-3">
				<UButton square color="neutral" variant="ghost" @click="prevDay">
					<UIcon name="i-lucide-chevron-left" class="size-4" />
				</UButton>
				<div class="text-lg font-semibold text-toned flex items-center gap-2">
					<span>{{ WEEK_DAYS[new Date(year, month - 1, selectedDay).getDay()] }},</span>
					<USelect v-model="month" :items="months" class="w-32" />
					<USelect v-model="selectedDay" :items="dayItems" class="w-20" />
					<USelect v-model="year" :items="years" class="w-24" />
				</div>
				<UButton square color="neutral" variant="ghost" @click="nextDay">
					<UIcon name="i-lucide-chevron-right" class="size-4" />
				</UButton>
			</div>
			<USeparator />

			<div class="flex-1 flex flex-col bg-[var(--ui-bg)] p-4 sm:p-6">
				<div
					class="flex-1 border border-[var(--ui-border)] rounded-md p-4 relative flex flex-col bg-[var(--ui-bg)] shadow-sm">
					<div class="absolute inset-0 flex flex-col items-center justify-center text-dimmed">
						<UIcon name="i-lucide-calendar-x" class="size-12 mb-4 opacity-50" />
						<span class="text-sm font-medium">No events scheduled for today</span>
					</div>
				</div>
			</div>
		</template>

	</div>
</template>