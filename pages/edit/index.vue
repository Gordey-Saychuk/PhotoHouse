<script setup lang="ts">
import {useCartStore} from "~/store/useCart";
import {useLocalStorage} from "@vueuse/core";
const store = useCartStore();
const tabs = ref([
  {id: 1, icon: 'i-heroicons-paint-brush-16-solid', color: 'dark:text-white', custom: false},
  {id: 2, icon: 'i-solar-eraser-bold', color: 'dark:text-white', custom: false},
  {id: 3, icon: 'i-ic-twotone-circle', color: 'dark:text-pink-500', custom: true},
  {id: 4, icon: 'i-ion-trash-sharp', color: 'dark:text-white', custom: false},
])

const tokenForStorage = useLocalStorage('tokenForStorage', '');
const chatIdForStorage = useLocalStorage('chatIdForStorage', '');
const sizePencil = ref<number>(15)
const sizeEraser = ref<number>(20)
const opacityPencil = ref<number>(30)
const softnessPencil = ref<number>(5)

const clearMask = ref<boolean>(false)
const device = ref<string>('pencil')
const mainColor = ref<string>('236, 72, 153')


const activeTab = ref<number>(5)
const checkPhoto = ref<boolean>(false)
const isOpen = ref<boolean>(false)
const isOpenCloth = ref<boolean>(false)
const visibleHand = ref<boolean>(true)
const generate = ref<boolean>(false);
const mask = ref<string>('');


const {postClothing} = usePostClothing()
const sendClothing = async () => {
  const formData = new FormData()
  formData.append('mask', store.cart)
  formData.append('photo', store.cartBottom)
  await useFetch('/api/sendClothing', {
    method: 'POST',
    body: formData,
  })
  console.log('da')
}
const {data: userData, refresh} = await useAsyncData(() => postClothing(), {immediate: false})

const startDrawing = ():boolean => visibleHand.value = false
const stopDrawing = ():boolean => generate.value = true


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
const updateSettingsForColor = (color:string):string => mainColor.value = color
///


//Удаляем маску полностью
const deleteMask = ():void => {
  clearMask.value = !clearMask.value
  activeTab.value = 5;
  generate.value = false
}
///


//Удаляем маску полностью
const sendCloth = async ():void => {
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
  <section>
    <UContainer>
      {{store.cartBottom}}
      <div :class="{'opacity-100 z-20': checkPhoto}" class="w-3/4 absolute bottom-0 left-3 transition-opacity duration-300 opacity-0">
        <UButton @click.prevent="checkPhoto = !checkPhoto" :ui="{variant: {solid: 'ring-0 dark:bg-white/40 dark:text-zinc-700 p-0 w-fit rounded-md'}}" class="absolute top-3 rotate-180 right-3 z-10"  icon="i-material-symbols-arrow-outward"></UButton>
        <img class="object-cover dark:bg-white rounded-lg shadow-[0_-5px_150px_100px_rgba(0,0,0,0.2)]" :src="store.cart ? store.cart : ''" alt="image">
      </div>
      <div class="relative z-20">
      <Canvas @start-drawing="startDrawing" @stop-drawing="stopDrawing" :main-color="mainColor" :device="device" :eraser-size="sizeEraser" :size="sizePencil" :clear="clearMask" :opacity="100 - opacityPencil" :softness="softnessPencil" />
      <EditHand :visible="visibleHand"/>
      </div>
      <div class="flex items-start justify-between flex-wrap z-10 mb-5 relative">
        <div class="w-[calc(18%-0.375rem)] h-16 relative">
          <UButton @click.prevent="isOpenCloth = true" :ui="{variant: {solid: 'ring-0 dark:bg-white/40 dark:text-zinc-700 p-0 w-fit rounded-md'}}" class="absolute top-1 right-1 z-10"  icon="i-material-symbols-arrow-outward"></UButton>
          <img class="object-contain dark:bg-white h-full w-full rounded-lg transition-all duration-700" :src="store.cart ? store.cart : ''" alt="image">
        </div>
        <EditButtons v-for="(tab, i) in tabs" :tab="tab" v-model="activeTab" :key="i"  @open-again="openAgainModal" :color="mainColor"/>
        <EditModal :color="mainColor" :visible="activeTab" @update-settings="updateSettingsForPencil" @delete-mask-from-canvas="deleteMask" @close-delete-modal="activeTab = 5" @update-settings-eraser="updateSettingsForEraser" @update-settings-color="updateSettingsForColor" />
      </div>
      <UButton @click.prevent="sendClothing"  to="/edit" :class="{'dark:bg-zinc-800': !generate, 'dark:text-zinc-500': !generate, 'bg-neutral-200': !generate, 'text-zinc-400': !generate}" class="ms-auto transition-all duration-700" :ui="{variant: {solid: 'dark:bg-blue-500 dark:text-white font-normal'},gap: { xl: 'gap-x-2'}}">
        <template #trailing>
          Генерировать
          <UIcon name="i-iconoir-spark-solid" class="w-5 h-5 rotate-90" />
          2
        </template>
      </UButton>
    </UContainer>
    <UModal :ui="{container: 'items-center', background: 'dark:bg-white'}" v-model="isOpenCloth">
      <UButton @click.prevent="isOpenCloth = false" :ui="{variant: {solid: 'ring-0 dark:bg-gray-900/10 dark:text-zinc-700 p-0 w-fit rounded-md'}}" class="absolute top-3 rotate-180 right-3 z-10"  icon="i-material-symbols-arrow-outward"></UButton>
      <img class="rounded-xl" :src="store.cart ? store.cart : ''" alt="image">
    </UModal>
  </section>
</main>
</template>
