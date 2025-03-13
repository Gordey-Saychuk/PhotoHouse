<script setup lang="ts">
import {useCartStore} from "~/store/useCart";

const ready = ref(true)
const store = useCartStore()



const handleFileUpload = async (e) => {
  const target = e.target;
  if (!FileReader) {
    alert('FileReader не поддерживается');
    return;
  }

  const fileReader = new FileReader();
  fileReader.onload = function () {
    store.initCartBottom(fileReader.result)
    photo.value = fileReader.result;
  }

  fileReader.readAsDataURL(target.files[0]);
}
const photo = ref('/assets/images/1fcf85459c321dd939ae5a1140fef82b-removebg-preview.png');

watchEffect(() => {
  store.cartBottom ? ready.value = false : ready.value = true
})

</script>

<template>
  <main>
    <section class="relative">
      <UContainer>
        <div class="w-full h-[32vh] mb-1.5 dark:bg-zinc-800 rounded-xl">
          <img  class="w-full h-full object-contain mb-2" :src="store.cart ? store.cart : ''" alt="hero">
        </div>
        <div class="w-full h-[37vh]  mb-1.5 overflow-hidden dark:bg-zinc-800 rounded-xl relative ">
          <label v-if="!store.cartBottom" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <input @change="handleFileUpload" type="file" hidden>
            Загрузите фотографию, на которой вы хотете примерить одежу
          </label>
          <img style="filter: brightness(5); opacity: 0.05"  v-if="!store.cartBottom" class="w-full h-full rounded-xl object-contain mb-2 cursor-pointer" :src="store.cartBottom ? store.cartBottom : photo" alt="heroBottom">
          <img v-else class="w-full h-full object-contain cursor-pointer" :src="store.cartBottom ? store.cartBottom : photo" alt="heroBottom">
        </div>
        <label class="flex mb-1.5 cursor-pointer">
          <input @change="handleFileUpload" type="file" hidden>
          <UButton class=" pointer-events-none" >Загрузить фото
          </UButton>
        </label>
        <UButton v-if="store.cartBottom" class="sticky bottom-2" :disabled="ready" to="/edit" :class="{'dark:bg-zinc-800': ready, 'dark:text-zinc-500': ready, 'bg-neutral-200': ready, 'text-zinc-400': ready}" >Продолжить</UButton>
      </UContainer>
    </section>
  </main>

</template>

<style scoped>

</style>