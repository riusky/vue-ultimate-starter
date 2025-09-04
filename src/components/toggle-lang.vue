<script setup lang="ts">
import { setLocale, currentLocale } from '@/plugins/i18n'
import { Languages, Check } from 'lucide-vue-next'

const availableLocales = [
  { code: 'en', name: 'English' },
  { code: 'zh-CN', name: '中文' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'ru', name: 'Русский' }
]

const changeLanguage = (lang: string) => {
  setLocale(lang)
}
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="outline" size="icon">
        <Languages class="h-[1.2rem] w-[1.2rem]" />
        <span class="sr-only">Toggle language</span>
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end" class="w-[180px]">
      <UiDropdownMenuItem
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="changeLanguage(locale.code)"
      >
        <span class="flex items-center justify-between w-full">
          <span>{{ locale.name }}</span>
          <Check
            v-if="currentLocale === locale.code"
            class="h-4 w-4 text-primary"
          />
        </span>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
