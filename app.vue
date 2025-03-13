<template>
    <TheHeader/>
    <NuxtLayout />
</template>
<script setup>
import {useLocalStorage} from "@vueuse/core";
import { useWebAppViewport } from 'vue-tg';
const route = useRoute()
const tokenForStorage = useLocalStorage('tokenForStorage', '');
const chatIdForStorage = useLocalStorage('chatIdForStorage', '');
if (!tokenForStorage.value) {
  tokenForStorage.value = route.query.token;
  chatIdForStorage.value = route.query.chatId;
}
onMounted(() => {
    const { disableVerticalSwipes, expand } = useWebAppViewport();
    disableVerticalSwipes();
    expand();
});
</script>