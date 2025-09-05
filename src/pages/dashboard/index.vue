<script lang="ts" setup>
import { toast } from 'vue-sonner'
import { transformI18n, setLocale, getLocale } from '@/plugins/i18n'
import Page from '@/components/global-layout/basic-page.vue'
import { Button } from '@/components/ui/button'
import OverviewContent from './components/overview-content.vue'

const tabs = ref([
  { name: transformI18n('ecg.tabs.overview'), value: 'overview' },
  { name: transformI18n('ecg.tabs.analytics'), value: 'analytics', disabled: true },
  { name: transformI18n('ecg.tabs.reports'), value: 'reports', disabled: true },
  { name: transformI18n('ecg.tabs.notifications'), value: 'notifications', disabled: true },
])

const activeTab = ref(tabs.value[0].value)

// 获取当前语言
const currentLang = getLocale()

// 使用翻译
const title = transformI18n('buttons.theme')

// 切换语言
const changeLanguage = (lang: string) => {
  console.log(currentLang)
  setLocale(lang)
  console.log(currentLang)
}
</script>

<template>
  <Page
    :title="transformI18n('ecg.page.title')"
    :description="transformI18n('ecg.page.description')"
    sticky
  >
    <UiTabs :default-value="activeTab" class="w-full text-primary">
      <UiTabsList>
        <UiTabsTrigger
          v-for="tab in tabs" :key="tab.value"
          :value="tab.value"
          :disabled="tab.disabled"
          class="text-primary"
        >
          {{ tab.name }}
        </UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent value="overview" class="space-y-4">
        <OverviewContent />
      </UiTabsContent>
    </UiTabs>
  </Page>
</template>

<style>
</style>