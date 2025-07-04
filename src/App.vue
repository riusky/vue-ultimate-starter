<script setup lang="ts">
import { RouterView } from 'vue-router'
// import Loading from '@/components/loading.vue'
import { Toaster } from '@/components/ui/sonner'
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
