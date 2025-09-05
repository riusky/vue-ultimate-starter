<script lang="ts" setup>
import { transformI18n } from '@/plugins/i18n'
import ECGOverviewChart from './ecg-overview-chart.vue'
import PatientStatus from './patient-status.vue'
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <UiCard>
      <UiCardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <UiCardTitle class="text-sm font-medium text-primary">
          {{ transformI18n('ecg.metrics.heartRate') }}
        </UiCardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          class="size-4  text-primary"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </UiCardHeader>
      <UiCardContent>
        <div class="text-2xl font-bold  text-primary">
          78 <span class="text-base font-normal">{{ transformI18n('ecg.units.bpm') }}</span>
        </div>
        <p class="text-xs  text-muted-foreground">
          {{ transformI18n('ecg.ranges.heartRate') }}
        </p>
      </UiCardContent>
    </UiCard>
    <UiCard>
      <UiCardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <UiCardTitle class="text-sm font-medium text-primary">
          {{ transformI18n('ecg.metrics.bloodPressure') }}
        </UiCardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          class="size-4 text-primary"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </UiCardHeader>
      <UiCardContent>
        <div class="text-2xl font-bold text-primary">
          120/80 <span class="text-base font-normal">{{ transformI18n('ecg.units.mmHg') }}</span>
        </div>
        <p class="text-xs text-muted-foreground">
          {{ transformI18n('ecg.ranges.bloodPressure') }}
        </p>
      </UiCardContent>
    </UiCard>
    <UiCard>
      <UiCardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <UiCardTitle class="text-sm font-medium text-primary">
          {{ transformI18n('ecg.metrics.oxygenSaturation') }}
        </UiCardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          class="size-4 text-primary"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
        </svg>
      </UiCardHeader>
      <UiCardContent>
        <div class="text-2xl font-bold text-primary">
          98 <span class="text-base font-normal">{{ transformI18n('ecg.units.percent') }}</span>
        </div>
        <p class="text-xs text-muted-foreground">
          {{ transformI18n('ecg.ranges.oxygenSaturation') }}
        </p>
      </UiCardContent>
    </UiCard>
    <UiCard>
      <UiCardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <UiCardTitle class="text-sm font-medium text-primary">
          {{ transformI18n('ecg.metrics.temperature') }}
        </UiCardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          class="size-4 text-primary"
        >
          <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
        </svg>
      </UiCardHeader>
      <UiCardContent>
        <div class="text-2xl font-bold text-primary">
          36.5 <span class="text-base font-normal">{{ transformI18n('ecg.units.celsius') }}</span>
        </div>
        <p class="text-xs text-muted-foreground">
          {{ transformI18n('ecg.ranges.temperature') }}
        </p>
      </UiCardContent>
    </UiCard>
  </div>

  <div class="grid grid-cols-1 gap-4 lg:grid-cols-7">
    <UiCard class="col-span-1 lg:col-span-4 text-primary">
      <UiCardHeader>
        <UiCardTitle>{{ transformI18n('ecg.monitoring.title') }}</UiCardTitle>
        <UiCardDescription>
          {{ transformI18n('ecg.monitoring.description') }}
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <ECGOverviewChart />
      </UiCardContent>
    </UiCard>
    <UiCard class="col-span-1 lg:col-span-3">
      <UiCardHeader class="text-primary">
        <UiCardTitle>{{ transformI18n('ecg.patientStatus.title') }}</UiCardTitle>
        <UiCardDescription>
          {{ transformI18n('ecg.patientStatus.description') }}
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <PatientStatus />
      </UiCardContent>
    </UiCard>
  </div>
</template>