<script setup lang="ts">
import { getDaysArray } from './utils';
import { computed, ref } from 'vue';
import { createDate, DawnDate } from '../../utils/DateUtils';

interface AppDatepickerCalendarProps {
  modelValue: string | null | undefined;
  /**
   * 3-character labels for weekday names ordered from Sunday to Saturday
   * Default: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
   */
  weekdayNames?: string[];
  /**
   * Labels for the names of months ordered from January to December
   * Default: ['january', 'february', 'march', 'april', 'may', 'june', 'july',
   * 'august', 'september', 'october', 'november', 'december']
   */
  monthNames?: string[];
}

interface AppDatepickerCalendarEmits {
  (e: 'update:model-value', value: string): void;
}

const props = withDefaults(defineProps<AppDatepickerCalendarProps>(), {
  weekdayNames: () => ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
  monthNames: () => [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ],
});
const emit = defineEmits<AppDatepickerCalendarEmits>();

const model = computed<DawnDate>({
  get() {
    return createDate(props.modelValue);
  },
  set(newValue: DawnDate) {
    emit('update:model-value', newValue.toISODate());
  },
});

const dateToShow = ref<DawnDate>(createDate());

const daysArray = computed<DawnDate[]>(() => {
  return getDaysArray(dateToShow.value.getMonth(), dateToShow.value.getYear());
});

function handleDayClick(date: DawnDate): void {
  if (model.value.getMonth() !== date.getMonth()) {
    dateToShow.value = createDate(date.toObject());
  }

  model.value = date;
}

function getDayClasses(day: DawnDate): Record<string, boolean> {
  const isSelected = model.value.toISODate() === day.toISODate();
  const isCurrentMonth = dateToShow.value.getMonth() === day.getMonth();

  return {
    'not-from-current-month': !isCurrentMonth,
    selected: isSelected,
  };
}

function handlePreviousMonthClick(): void {
  const oldDateObj = dateToShow.value.toObject();

  const newYear = oldDateObj.month > 1 ? oldDateObj.year : oldDateObj.year - 1;
  const newMonth = oldDateObj.month > 1 ? oldDateObj.month - 1 : 12;

  dateToShow.value = createDate({
    year: newYear,
    month: newMonth,
    day: 1,
  });
}

function handleNextMonthClick(): void {
  const oldDateObj = dateToShow.value.toObject();

  const newYear = oldDateObj.month < 12 ? oldDateObj.year : oldDateObj.year + 1;
  const newMonth = oldDateObj.month < 12 ? oldDateObj.month + 1 : 1;

  dateToShow.value = createDate({
    year: newYear,
    month: newMonth,
    day: 1,
  });
}

function handlePreviousYearClick(): void {
  const oldDateObj = dateToShow.value.toObject();

  dateToShow.value = createDate({
    year: oldDateObj.year - 1,
    month: oldDateObj.month,
    day: 1,
  });
}

function handleNextYearClick(): void {
  const oldDateObj = dateToShow.value.toObject();

  dateToShow.value = createDate({
    year: oldDateObj.year + 1,
    month: oldDateObj.month,
    day: 1,
  });
}
</script>

<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <div class="header-control">
        <button @click="handlePreviousMonthClick">
          <i class="previous" />
        </button>
        <span class="header-label">
          {{ props.monthNames[dateToShow.getMonth() - 1] }}
        </span>
        <button @click="handleNextMonthClick">
          <i class="next" />
        </button>
      </div>
      <div class="header-control">
        <button @click="handlePreviousYearClick">
          <i class="previous" />
        </button>
        <span class="header-label">
          {{ dateToShow.getYear().toString().padStart(4, '0') }}
        </span>
        <button @click="handleNextYearClick">
          <i class="next" />
        </button>
      </div>
    </div>
    <div
      v-for="(weekday, weekdayIndex) in props.weekdayNames"
      :key="weekdayIndex"
      class="calendar-grid-cell day-header"
    >
      {{ weekday }}
    </div>
    <div
      v-for="(dayDate, dayIndex) in daysArray"
      :key="dayIndex"
      class="calendar-grid-cell day-cell"
      :class="getDayClasses(dayDate)"
      @click="handleDayClick(dayDate)"
    >
      {{ dayDate.getDay() }}
    </div>
  </div>
</template>

<style>
.calendar-container {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.25rem;

  max-width: 19rem;
}

.calendar-header {
  grid-column: span 7 / span 7;

  margin-bottom: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1 1 0%;
}

.header-label {
  margin: 0 0.25rem;

  height: 1.5rem;

  text-transform: capitalize;
}

.calendar-grid-cell {
  grid-column: span 1 / span 1;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 2.5rem;

  border-radius: 50%;
}

.day-header {
  height: 1.25rem;

  color: rgb(136, 136, 136);
  font-size: 0.75rem;
  font-weight: 700;

  text-transform: capitalize;
}

.day-cell {
  height: 2.5rem;

  cursor: pointer;
}

.day-cell:hover {
  background-color: rgb(209, 209, 209);
}

.day-cell.selected {
  background-color: rgb(37, 99, 235);

  color: rgb(255, 255, 255);
}

.day-sell.selected:hover {
  background-color: rgb(37, 99, 235);
}

.not-from-current-month {
  color: rgb(136, 136, 136);
}

.header-control button {
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  border: none;

  width: 1.5rem;
  height: 1.5rem;

  background-color: transparent;
}

.header-control button:hover {
  background-color: rgb(209, 209, 209);
}

.header-control button i::before {
  display: inline-block;
  content: '';
  vertical-align: -0.125em;
  background-repeat: no-repeat;
  background-size: 1rem 1rem;
  width: 1rem;
  height: 1rem;
}

.header-control button i.previous::before {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-left' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0'/></svg>");
}

.header-control button i.next::before {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-right' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708'/></svg>");
}
</style>
