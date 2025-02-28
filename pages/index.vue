<script setup lang="ts">
import {useCartStore} from "~/store/useCart";

const ready = ref(true)
const store = useCartStore()
const loadPhoto = () => {
  store.initCart('wadawd')
}
</script>

<template>
  <main>
    <section class="mb-5 relative">
      <UContainer>
        <img class="w-full mb-2" src="/assets/images/hero.webp" alt="hero">
        <UButton to="/catalog" class="mb-5" >Выбрать в каталоге примеров</UButton>
        <img class="w-full mb-2 cursor-pointer" src="/assets/images/heroBottom.webp" alt="heroBottom">
        <UButton @click.prevent="loadPhoto" type="file" class="mb-5" >Загрузить фото с одеждой</UButton>
        <UButton :disabled="ready" to="/catalog" :class="{'dark:bg-zinc-800': ready, 'dark:text-zinc-500': ready, 'bg-neutral-200': ready, 'text-zinc-400': ready}" >Продолжить</UButton>
        {{store.cart}}
      </UContainer>
    </section>
  </main>

</template>

<style scoped>

</style>