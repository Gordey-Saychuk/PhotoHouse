<script setup lang="ts">
import {useCartStore} from "~/store/useCart";

const ready = ref(true)
const store = useCartStore()
const file = ref()
const getPhoto = (e) => {
  console.log(e.target.files[0])
}
watch(() => store.cart,() => {
  store.cart ? ready.value = false : ready.value = true
})
</script>

<template>
  <main>
    <section class="mb-5 relative">
      {{ready}}
      <UContainer>
        <img v-if="!store.cart" class="w-full mb-2" src="/assets/images/hero.webp" alt="hero">
        <div class="w-full h-72 mb-2 dark:bg-zinc-800 rounded-xl" v-else>
          <img  class="w-full h-full object-contain mb-2" :src="store.cart" alt="hero">
        </div>
        <UButton to="/catalog" class="mb-5" >Выбрать в каталоге примеров</UButton>
        <img class="w-full mb-2 cursor-pointer" src="/assets/images/heroBottom.webp" alt="heroBottom">
        <div v-if="false" class="w-full h-72 mb-2 dark:bg-zinc-800 rounded-xl">
          <img  class="w-full h-full object-contain mb-2" :src="store.cart" alt="hero">
        </div>
        <label class="flex mb-5 cursor-pointer">
          <input @change="getPhoto" type="file" hidden>
          <UButton  class=" pointer-events-none" >Загрузить фото с одеждой
          </UButton>
        </label>
        <UButton :disabled="ready" to="/catalog" :class="{'dark:bg-zinc-800': ready, 'dark:text-zinc-500': ready, 'bg-neutral-200': ready, 'text-zinc-400': ready}" >Продолжить</UButton>
      </UContainer>
    </section>
  </main>

</template>

<style scoped>

</style>