<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const route = useRoute()

</script>

<template>
  <header class="mb-4 p-2 relative">
    <UContainer>
      <UButton v-show="route.path !== '/'" :ui="{variant: {outline: 'ring-0 gap-x-0 dark:text-blue-600'}}" @click.prevent="$router.back()" class="absolute left-0 top-0" variant="outline" icon="i-material-symbols-chevron-left">Назад</UButton>
      <RouterLink to="/"><h1 class="text-xl text-center">Примерочная</h1></RouterLink>
      <p class="text-center text-zinc-500">Фотобудка</p>
      <ClientOnly>
        <UButton
            class="absolute right-1 top-1"
            :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
        />
        <template #fallback>
          <div class="w-8 h-8" />
        </template>
      </ClientOnly>
    </UContainer>
  </header>
</template>

<style scoped>

</style>