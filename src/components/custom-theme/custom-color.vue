<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { THEMES, themes, useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const { setTheme } = themeStore
const { theme: t } = storeToRefs(themeStore)
const { theme: currentTheme } = storeToRefs(themeStore)

// 处理Select组件的值变化
const handleValueChange = (value: string) => {
  if (value && THEMES.includes(value as any)) {
    setTheme(value as typeof THEMES[number])
  }
}

watchEffect(() => {
  document.documentElement.classList.remove(...THEMES.map(theme => `theme-${theme}`))
  document.documentElement.classList.add(`theme-${t.value}`)
})
</script>

<template>
  <div class="space-y-1.5 pt-6">
    <UiLabel for="theme-select" class="text-xs">
      Color
    </UiLabel>
    <Select :model-value="currentTheme" @update:model-value="handleValueChange">
      <SelectTrigger id="theme-select" class="w-full">
        <SelectValue>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1">
              <template v-if="themes.find(t => t.theme === currentTheme)">
                <span
                  :style="{ '--theme-color': themes.find(t => t.theme === currentTheme)?.colors.primary }"
                  class="size-2.5 rounded-full bg-[var(--theme-color)]"
                />
                <span
                  :style="{ '--theme-color': themes.find(t => t.theme === currentTheme)?.colors.secondary }"
                  class="size-2.5 rounded-full bg-[var(--theme-color)] ring-1 ring-border/50"
                />
                <span
                  :style="{ '--theme-color': themes.find(t => t.theme === currentTheme)?.colors.muted }"
                  class="size-2.5 rounded-full bg-[var(--theme-color)] ring-1 ring-border/50"
                />
                <span
                  :style="{ '--theme-color': themes.find(t => t.theme === currentTheme)?.colors.accent }"
                  class="size-2.5 rounded-full bg-[var(--theme-color)]"
                />
                <span
                  :style="{ '--theme-color': themes.find(t => t.theme === currentTheme)?.colors.destructive }"
                  class="size-2.5 rounded-full bg-[var(--theme-color)]"
                />
              </template>
            </div>
            <span>{{ currentTheme[0].toUpperCase() }}{{ currentTheme.slice(1) }}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Themes</SelectLabel>
          <SelectItem
            v-for="theme in themes"
            :key="theme.theme"
            :value="theme.theme"
          >
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1">
                <span
                  :style="{ '--theme-color': theme.colors.primary }"
                  class="size-2.5 rounded-full bg-[var(--theme-color)]"
                />
                <span
                  :style="{ '--theme-color': theme.colors.secondary }"
                  class="size-2.5 rounded-full bg-[var(--theme-color)] ring-1 ring-border/50"
                />
                <span
                  :style="{ '--theme-color': theme.colors.muted }"
                  class="size-2.5 rounded-full bg-[var(--theme-color)] ring-1 ring-border/50"
                />
                <span
                  :style="{ '--theme-color': theme.colors.accent }"
                  class="size-2.5 rounded-full bg-[var(--theme-color)]"
                />
                <span
                  :style="{ '--theme-color': theme.colors.destructive }"
                  class="size-2.5 rounded-full bg-[var(--theme-color)]"
                />
              </div>
              <span>{{ theme.theme[0].toUpperCase() }}{{ theme.theme.slice(1) }}</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
