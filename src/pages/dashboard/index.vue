<script lang="ts" setup>
import { toast } from 'vue-sonner'

import Page from '@/components/global-layout/basic-page.vue'
import { Button } from '@/components/ui/button'

import OverviewContent from './components/overview-content.vue'

const tabs = ref([
  { name: 'Overview', value: 'overview' },
  { name: 'Analytics', value: 'analytics', disabled: true },
  { name: 'Reports', value: 'reports', disabled: true },
  { name: 'Notifications', value: 'notifications', disabled: true },
])

const activeTab = ref(tabs.value[0].value)

import { transformI18n, setLocale, getLocale } from '@/plugins/i18n'

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
    title="workspace"
    description="workspace description"
    sticky
  >
    <template #actions>
      <Button
        @click="changeLanguage('en')"
      >
        英文 {{ transformI18n('buttons.theme') }}
      </Button>
            <Button
        @click="changeLanguage('zh-CN')"
      >
        中文 {{ transformI18n('buttons.theme') }}
      </Button>
    </template>

    <UiTabs :default-value="activeTab" class="w-full">
      <UiTabsList>
        <UiTabsTrigger
          v-for="tab in tabs" :key="tab.value"
          :value="tab.value"
          :disabled="tab.disabled"
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
