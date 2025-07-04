<!-- 万能匹配动态路由 -->
 <!-- 文件名为 [...path].vue 的组件会匹配所有未定义的路由路径，并将匹配到的路径片段作为参数传递给组件。 -->

<script setup lang="ts">
import Error from '@/components/custom-error.vue'
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <Error
      :code="404"
      subtitle="Page Not Found"
      error="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
    />
  </div>
</template>

<style scoped>
</style>

<route lang="yaml">
  meta:
    layout: false
</route>
