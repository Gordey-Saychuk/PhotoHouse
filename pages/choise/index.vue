<script setup lang="ts">
import {useCartStore} from "~/store/useCart";

const ready = ref(true)
const loadImage = ref(false)
const store = useCartStore()
const router = useRouter()
const toast = useToast()


const handleImageLoad = (e) => {
  loadImage.value = false
  if (!store.loadPhoto) {
    router.push('/edit')
    store.initLoadPhoto(true)
  }
}
const convertImage = async (file) => {
  loadImage.value = true
  const formData = new FormData()
  formData.append('image', file)
  const {data} = await useFetch('/api/sendImage', {
    method: 'POST',
    body: formData,
  })
  store.initCartBottom(data.value.url);
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
    store.initLoadPhoto(false)
    convertImage(target.files[0])
    return;
  }


  // Проверяем MIME-тип файла
  const supportedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
  if (!supportedFormats.includes(file.type) && !isHEIC) {
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
    console.log('da')
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
        <div class="w-full h-[calc(45vh-40px)] mb-1.5 dark:bg-zinc-800 rounded-xl">
          <img  class="w-full h-full object-contain mb-2" :src="store.cart ? store.cart : ''" alt="hero">
        </div>
        <div class="w-full h-[calc(55vh-50px)]  mb-1.5 overflow-hidden dark:bg-zinc-800 rounded-xl relative ">
          <label v-if="!store.cartBottom" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <input @change="handleFileUpload" type="file" hidden>
            Загрузите фотографию, на которой вы хотете примерить одежу
          </label>
          <img style="filter: brightness(5); opacity: 0.05"  v-if="!store.cartBottom" class="w-full h-full rounded-xl object-contain mb-2 cursor-pointer" :src="store.cartBottom ? store.cartBottom : photo" alt="heroBottom">
          <img v-else class="w-full h-full object-contain cursor-pointer" :src="store.cartBottom ? store.cartBottom : photo" alt="heroBottom" @load="handleImageLoad">
          <div class="absolute w-full transition-all duration-500 h-full top-0 left-0 flex flex-col gap-3 items-center justify-center bg-black border border-blue-200/50 rounded-xl" :class="loadImage ?  'opacity-1' : 'opacity-0'">
            <UIcon class="w-10 h-10 animate-spin" name="ant-design:loading-3-quarters-outlined"/>
            <p>Обработка фото...</p>
          </div>
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