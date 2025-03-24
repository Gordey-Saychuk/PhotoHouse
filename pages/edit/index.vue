<script setup lang="ts">
import {useCartStore} from "~/store/useCart";
import {useLocalStorage} from "@vueuse/core";
import {dataUrlToFile} from "~/composables/dataUrlToFile";
import { useWebApp } from 'vue-tg';
const { close } = useWebApp();
const store = useCartStore();
const tabs = ref([
  {id: 1, icon: 'i-heroicons-paint-brush-16-solid', color: 'dark:text-white', custom: false},
  {id: 2, icon: 'i-solar-eraser-bold', color: 'dark:text-white', custom: false},
  {id: 3, icon: 'i-ic-twotone-circle', color: 'dark:text-pink-500', custom: true},
  {id: 4, icon: 'i-ion-trash-sharp', color: 'dark:text-white', custom: false},
])

const tokenForStorage = useLocalStorage('tokenForStorage', '');
const chatIdForStorage = useLocalStorage('chatIdForStorage', '');
const sizePencil = ref<number>(25)
const sizeEraser = ref<number>(20)
const opacityPencil = ref<number>(30)
const softnessPencil = ref<number>(5)

const clearMask = ref<boolean>(false)
const device = ref<string>('pencil')
const mainColor = ref<string>('236, 72, 153')


const activeTab = ref<number>(5)
const loading = ref<boolean>(false)
const isOpen = ref<boolean>(false)
const isOpenCloth = ref<boolean>(false)
const visibleHand = ref<boolean>(true)
const generate = ref<boolean>(false);
const mask = ref<string>('');
const sendClothing = async () => {
  loading.value = true
  const formData = new FormData()
  const file = dataUrlToFile(store.cartBottom, 'image.png');
  const maskClient = dataUrlToFile(mask.value, 'image.png');

  if (store.cartId) {
    formData.append('clothingId', store.cartId)
  } else {
    const clothImage = dataUrlToFile(store.cart, 'image.png');
    formData.append('clothingImage', clothImage)
  }

  formData.append('mask', maskClient)
  formData.append('photo', file)
  formData.append('token', tokenForStorage.value)
  formData.append('chat', chatIdForStorage.value)

  const {data} = await useFetch('/api/sendClothing', {
    method: 'POST',
    body: formData,
  })
  setTimeout(() => { loading.value = false; generate.value = false; close()}, 200)
}
const startDrawing = ():boolean => visibleHand.value = false

const stopDrawing = (image: string, canvas): void => {
  mask.value = image;
  generate.value = true;
  const ctx = canvas.getContext('2d');

  // Получаем данные пикселей с канваса
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Проходим по всем пикселям
  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3]; // Альфа-канал (прозрачность)

    // Если пиксель непрозрачный, меняем его на белый
    if (alpha > 0) {
      data[i] = 255;     // Красный
      data[i + 1] = 255; // Зеленый
      data[i + 2] = 255; // Синий
    } else {
      // Если пиксель прозрачный, меняем его на черный
      data[i] = 0;       // Красный
      data[i + 1] = 0;   // Зеленый
      data[i + 2] = 0;   // Синий
      data[i + 3] = 255;
    }
  }

  // Обновляем канвас с новыми данными
  ctx.putImageData(imageData, 0, 0);

  // Логируем данные канваса
  mask.value = canvas.toDataURL();
};

//Обновляем размеры карандаша
const updateSettingsForPencil = (softness:number, size:number, opacity:number):void => {
  softnessPencil.value = softness;
  opacityPencil.value = opacity
  sizePencil.value = size * 5;
  activeTab.value = 1;
  device.value = 'pencil'
}
///


// //Обновляем размеры ластика
const updateSettingsForEraser = (size:number):number => {
  device.value = 'eraser'
  return sizePencil.value = size * 10
}
///

//Обновляем цвет
const updateSettingsForColor = (color:string):string => {
  device.value = 'pencil'
  return  mainColor.value = color
}
///


//Удаляем маску полностью
const deleteMask = ():void => {
  clearMask.value = !clearMask.value
  activeTab.value = 5;
  generate.value = false
}
///


// //повторное открывание модалки
const openAgainModal = (id:number):void => {
  activeTab.value = 5
  setTimeout(() => {activeTab.value = id},1)
}



watch(()=> activeTab.value, () => {
  activeTab.value === 3 ? isOpen.value = true : false
  activeTab.value === 2 ? device.value = 'eraser': false
})
</script>

<template>
<main>
  <section class="pt-3 h-screen">
    <UContainer>
      <div class="relative z-20  h-[calc(100vh-175px)] dark:bg-zinc-800 rounded-xl mb-2 ">
        <UButton to="/help" class="absolute top-5 right-5 w-10 h-10 z-10 rounded-full" icon="ion:help" :ui="{variant: {solid: 'dark:bg-black/50 dark:text-white font-normal'},gap: { xl: 'gap-x-2'}}"/>
      <Canvas @start-drawing="startDrawing" @stop-drawing="stopDrawing" :loading="loading" :main-color="mainColor" :device="device" :eraser-size="sizeEraser" :size="sizePencil" :clear="clearMask" :opacity="100 - opacityPencil" :softness="softnessPencil" />
      </div>
      <div class="flex items-start justify-between flex-wrap z-10 mb-6 relative">
        <div class="w-[calc(18%-0.375rem)] h-16 relative">
          <UButton @click.prevent="isOpenCloth = true" :ui="{variant: {solid: 'ring-0 dark:bg-white/40 dark:text-zinc-700 p-0 w-fit rounded-md'}}" class="absolute top-1 right-1 z-10"  icon="i-material-symbols-arrow-outward"></UButton>
          <img class="object-contain dark:bg-white h-full w-full rounded-lg transition-all duration-700" :src="store.cart ? store.cart : ''" alt="image">
        </div>
        <EditButtons v-for="(tab, i) in tabs" :tab="tab" v-model="activeTab" :key="i"  @open-again="openAgainModal" :color="mainColor"/>
        <EditModal :color="mainColor" :visible="activeTab" @update-settings="updateSettingsForPencil" @delete-mask-from-canvas="deleteMask" @close-delete-modal="activeTab = 5" @update-settings-eraser="updateSettingsForEraser" @update-settings-color="updateSettingsForColor" />
      </div>
      <UButton @click.prevent="sendClothing"   to="/edit" :class="{'dark:bg-zinc-800': !generate, 'dark:text-zinc-500': !generate, 'bg-neutral-200': !generate, 'text-zinc-400': !generate, 'pointer-events-none': loading}" class="ms-auto transition-all duration-700 relative focus:outline-0" :ui="{variant: {solid: 'dark:bg-blue-500 dark:text-white font-normal disabled:pointer-events-none'},gap: { xl: 'gap-x-2'}}">
        <template #trailing>
          <div v-if="!loading" class="flex items-center gap-x-2">
            Генерировать
            <UIcon name="i-iconoir-spark-solid" class="w-5 h-5 rotate-90" />
            2
          </div>
          <div v-else>
            <svg aria-hidden="true" class="inline w-5 h-5 text-white animate-spin dark:text-white fill-blue-600 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
          </div>
        </template>
      </UButton>
    </UContainer>
     <UModal :ui="{overlay: {background: 'bg-gray-200/75 dark:bg-gray-800/35'}, container: 'items-end pb-28 w-[80%]', background: 'dark:bg-white'}" v-model="isOpenCloth">
      <UButton @click.prevent="isOpenCloth = false" :ui="{variant: {solid: 'ring-0 dark:bg-gray-900/10 dark:text-zinc-700 p-0 w-fit rounded-md'}}" class="absolute top-3 rotate-180 right-3 z-10"  icon="i-material-symbols-arrow-outward"></UButton>
      <img class="rounded-xl h-[50vh]  object-contain" :src="store.cart ? store.cart : ''" alt="image">
    </UModal>
    <EditHand :visible="visibleHand"/>

  </section>
</main>
</template>
