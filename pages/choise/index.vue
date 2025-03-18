<script setup lang="ts">
import {useCartStore} from "~/store/useCart";

const ready = ref(true)
const store = useCartStore()
const router = useRouter()
const toast = useToast()

const handleFileUpload = async (e) => {
  const target = e.target;
  if (!target.files || target.files.length === 0) {
    toast.add({ title: 'Файл не выбран'})
    return;
  }

  const file = target.files[0];

  // Проверяем MIME-тип файла
  const supportedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
  if (!supportedFormats.includes(file.type)) {
    toast.add({ title: 'Неподдерживаемый формат файла. Пожалуйста, загрузите изображение в формате JPEG, PNG, WebP или SVG.' })
    return;
  }

  if (!FileReader) {
    toast.add({ title: 'FileReader не поддерживается' })
    return;
  }

  const fileReader = new FileReader();
  fileReader.onload = function () {
    store.initCartBottom(fileReader.result);
    photo.value = fileReader.result;
    router.push('/edit')

  };

  fileReader.readAsDataURL(file);
};

const photo = ref('/assets/images/1fcf85459c321dd939ae5a1140fef82b-removebg-preview.png');

watchEffect(() => {
  store.cartBottom ? ready.value = false : ready.value = true
})

</script>

<template>
  <main>
    <section class="relative pt-3">
      <UContainer>
        <UNotifications />
        <div class="w-full h-[calc(45vh-54px)] mb-1.5 dark:bg-zinc-800 rounded-xl">
          <img  class="w-full h-full object-contain mb-2" :src="store.cart ? store.cart : ''" alt="hero">
        </div>
        <div class="w-full h-[calc(55vh-54px)]  mb-1.5 overflow-hidden dark:bg-zinc-800 rounded-xl relative ">
          <label v-if="!store.cartBottom" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <input @change="handleFileUpload" type="file" hidden>
            Загрузите фотографию, на которой вы хотете примерить одежу
          </label>
          <img style="filter: brightness(5); opacity: 0.05"  v-if="!store.cartBottom" class="w-full h-full rounded-xl object-contain mb-2 cursor-pointer" :src="store.cartBottom ? store.cartBottom : photo" alt="heroBottom">
          <img v-else class="w-full h-full object-contain cursor-pointer" :src="store.cartBottom ? store.cartBottom : photo" alt="heroBottom">
        </div>
        <label class="flex mb-1.5 cursor-pointer">
          <input @change="handleFileUpload" type="file" hidden>
          <UButton :ui="{variant: {solid: 'dark:bg-blue dark:text-white'}}" class=" pointer-events-none" >Загрузить фото
          </UButton>
        </label>
<!--        <UButton :ui="{variant: {solid: 'dark:bg-blue dark:text-white'}}" v-if="store.cartBottom"  class="sticky bottom-2" :disabled="ready" to="/edit" :class="{'dark:bg-zinc-800': ready, 'dark:text-zinc-500': ready, 'bg-neutral-200': ready, 'text-zinc-400': ready}" >Продолжить</UButton>-->
      </UContainer>
    </section>
  </main>

</template>

<style scoped>

</style>