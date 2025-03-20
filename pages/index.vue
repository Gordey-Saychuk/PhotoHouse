<script setup lang="ts">
import {useCartStore} from "~/store/useCart";
const ready = ref(true)
const heicImage = ref(false)
const heicImageUrl = ref('')
const heicImageObject = ref(null)
const store = useCartStore()
const toast = useToast()
const loadImage = ref(false)

const handleImageLoad = (e) => {
  loadImage.value = false
}

const convertImage = async (file) => {
  loadImage.value = true
  const formData = new FormData()
  formData.append('image', file)
  const {data} = await useFetch('/api/sendImage', {
    method: 'POST',
    body: formData,
  })
  heicImageUrl.value = data.value.url
  heicImage.value = true
  store.initCart(data.value.url, null);
}

const handleFileUpload = async (e) => {
  const target = e.target;
  if (!target.files || target.files.length === 0) {
    toast.add({ title: 'Файл не выбран'})
    return;
  }

  const file = target.files[0];
  const fileName = file.name.toLowerCase();
  const isHEIC = fileName.endsWith('.heic') || fileName.endsWith('.heif');
  if  (isHEIC) {
    convertImage(target.files[0])
  }

  // Проверяем MIME-тип файла
  const supportedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/heic'];
  if (!supportedFormats.includes(file.type) && !isHEIC) {
    toast.add({ title: 'Неподдерживаемый формат файла. Пожалуйста, загрузите изображение в формате JPEG, PNG, HEIC, WebP или SVG.' })
    return;
  }

  if (!FileReader) {
    toast.add({ title: 'FileReader не поддерживается' })
    return;
  }

  const fileReader = new FileReader();
  fileReader.onload = function () {
    store.initCart(fileReader.result, null);
    photo.value = fileReader.result;
  };

  fileReader.readAsDataURL(file);
};
const photo = ref('/assets/images/heroBottom.webp');

watchEffect(() => {
  store.cart ? ready.value = false : ready.value = true
})
</script>

<template>
  <main>
    <section class="relative h-screen pt-3">
      <UContainer class="flex-1">
        <UNotifications />
        <img v-if="!store.cart" class="w-full h-[calc(100vh-230px)] object-cover rounded-xl mb-1.5" src="/assets/images/hero.jpg" alt="hero">
        <div v-else class="w-full h-[calc(100vh-230px)]  mb-1.5 dark:bg-zinc-800 rounded-xl relative" >
          <img v-if="!heicImage"  class="w-full h-full object-contain mb-2 rounded-xl" :src="store.cart" alt="hero">
          <img v-else ref="heicImageObject" class="w-full h-full object-contain mb-2 rounded-xl" :src="heicImageUrl" alt="hero" @load="handleImageLoad">
          <div  class="absolute w-full transition-all duration-500 h-full top-0 left-0 flex flex-col gap-3 items-center justify-center bg-black border border-blue-200/50 rounded-xl" :class="loadImage ?  'opacity-1' : 'opacity-0'">
            <UIcon class="w-10 h-10 animate-spin" name="ant-design:loading-3-quarters-outlined"/>
            <p>Обработка фото...</p>
          </div>
        </div>
        <UButton to="/catalog" class="mb-1.5" >Выбрать в каталоге примеров</UButton>
        <p class="text-center mb-1.5">или</p>
<!--        <div class="w-full h-[33vh]  mb-1.5 overflow-hidden dark:bg-zinc-800 rounded-xl relative">-->
<!--          <label v-if="!store.cartBottom" class="flex items-center justify-center border-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 rounded-full w-14 h-14">-->
<!--            <input @change="handleFileUpload" type="file" hidden>-->
<!--            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--              <path d="M10.8013 10.8018V17.7578H7.21533V10.8018H0.226074V7.18262H7.21533V0.243164H10.8013V7.18262H17.7739V10.8018H10.8013Z" fill="white"/>-->
<!--            </svg>-->
<!--          </label>-->
<!--          <img  v-if="!store.cartBottom" class="w-full h-full rounded-xl opacity-40 object-cover mb-2 cursor-pointer" :src="store.cartBottom ? store.cartBottom : photo" alt="heroBottom">-->
<!--          <img v-else class="w-full h-full object-contain mb-2 cursor-pointer" :src="store.cartBottom ? store.cartBottom : photo" alt="heroBottom">-->
<!--        </div>-->
        <label class="flex mb-6 cursor-pointer">
          <input @change="handleFileUpload" type="file" hidden>
          <UButton  class=" pointer-events-none" >Загрузить фото с одеждой
          </UButton>
        </label>
        <UButton  :ui="{variant: {solid: 'dark:bg-blue dark:text-white'}}" :disabled="ready" to="/choise" :class="{'dark:bg-zinc-800': ready, 'dark:text-zinc-500': ready, 'bg-neutral-200': ready, 'text-zinc-400': ready}" >Продолжить</UButton>
      </UContainer>
    </section>
  </main>

</template>

<style scoped>

</style>