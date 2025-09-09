<script setup lang="ts">
import { ref } from 'vue'
import { transformI18n } from '@/plugins/i18n'

// 患者状态数据
const patientStatus = ref({
  name: '张伟',
  age: 15,
  gender: '男',
  patientId: 'PT-20250101',
  admissionDate: '2025-01-01',
  diagnosis: '心律失常',
  attendingDoctor: '李医生',
  status: 'stable',
  lastUpdate: '10:25:47',
})
</script>

<template>
  <div class="space-y-4">
    <!-- 患者基本信息 -->
    <UiCard>
      <UiCardHeader class="text-primary">
        <UiCardTitle>{{ transformI18n('ecg.patient.infoTitle') }}</UiCardTitle>
        <UiCardDescription>{{ transformI18n('ecg.patient.infoDescription') }}</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="grid gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-muted-foreground">
              {{ transformI18n('ecg.patient.fields.name') }}
            </p>
            <p class="font-medium text-primary">{{ patientStatus.name }}</p>
          </div>
          <div>
            <p class="text-sm text-muted-foreground">
              {{ transformI18n('ecg.patient.fields.age') }}
            </p>
            <p class="font-medium text-primary">{{ patientStatus.age }}</p>
          </div>
          <div>
            <p class="text-sm text-muted-foreground">
              {{ transformI18n('ecg.patient.fields.gender') }}
            </p>
            <p class="font-medium text-primary">{{ patientStatus.gender }}</p>
          </div>
          <div>
            <p class="text-sm text-muted-foreground">
              {{ transformI18n('ecg.patient.fields.patientId') }}
            </p>
            <p class="font-medium text-primary">{{ patientStatus.patientId }}</p>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">
            {{ transformI18n('ecg.patient.fields.diagnosis') }}
          </p>
          <p class="font-medium text-primary">{{ patientStatus.diagnosis }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-muted-foreground">
              {{ transformI18n('ecg.patient.fields.doctor') }}
            </p>
            <p class="font-medium text-primary">{{ patientStatus.attendingDoctor }}</p>
          </div>
          <div>
            <p class="text-sm text-muted-foreground">
              {{ transformI18n('ecg.patient.fields.admissionDate') }}
            </p>
            <p class="font-medium text-primary">{{ patientStatus.admissionDate }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <UiBadge :variant="patientStatus.status === 'stable' ? 'default' : 'destructive'">
            {{ transformI18n(`ecg.status.${patientStatus.status}`) }}
          </UiBadge>
          <p class="text-sm text-muted-foreground">
            {{ transformI18n('ecg.patient.fields.lastUpdate') }}: {{ patientStatus.lastUpdate }}
          </p>
        </div>
      </UiCardContent>
    </UiCard>

    <!-- 快速操作 -->
    <div class="grid grid-cols-2 gap-4">
      <UiButton variant="outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2"
        >
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
        </svg>
        {{ transformI18n('ecg.actions.refresh') }}
      </UiButton>
      <UiButton variant="outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {{ transformI18n('ecg.actions.contact') }}
      </UiButton>
    </div>
  </div>
</template>
