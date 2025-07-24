<script setup lang="ts">
import { RouterView } from 'vue-router'
// import Loading from '@/components/loading.vue'
import { Toaster } from '@/components/ui/sonner'

// 每次加载时，移除所有主题类并添加当前主题类
import { storeToRefs } from 'pinia'
import { THEMES, useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
const { theme: currentTheme } = storeToRefs(themeStore)
document.documentElement.classList.remove(...THEMES.map(theme => `theme-${theme}`))
document.documentElement.classList.add(`theme-${currentTheme.value}`)
</script>

<template>
  <Toaster />
  <!-- <VueQueryDevtools /> -->

  <Suspense>
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route" />
    </router-view>

    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>
