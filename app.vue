<template>
    <TheHeader/>
    <NuxtLayout />
</template>
<script setup lang="ts">
import {useTelegramStore} from "~/store/useTelegram";
const tg = useTelegramStore();
onMounted(() => {
  tg.init()
  tg.disableVerticalSwipesForClient()
})
</script>