<script setup>
const route = useRoute()
const router = useRouter()
</script>

<template>
  <header class="p-2 relative">
    <UContainer>
      <UButton v-show="route.path !== '/'" :ui="{variant: {outline: 'ring-0 gap-x-0 dark:text-blue-600'}}" @click.prevent="router.back()" class="absolute left-0 top-0" variant="outline" icon="i-material-symbols-chevron-left">Назад</UButton>
      <RouterLink to="/"><h1 class="text-xl text-center">Примерочная</h1></RouterLink>
<!--      <RouterLink to="/"><h1 class="text-xl text-center"><span class="text-[6px]">плавик</span>Примерочная<span class="text-[6px]">лох</span> </h1></RouterLink>-->
      <p class="text-center text-zinc-500">Фотобудка</p>
    </UContainer>
  </header>
</template>

<style scoped>

</style>