<script setup lang="ts">
import VueSlider from "vue-3-slider-component";

const valueSoftness = ref<number>(5)
const valueSize = ref<number>(5)
const valueSizeEraser = ref<number>(2)
const valueOpacity = ref<number>(30)
const selectColor = ref<string>('')
const isOpen= ref<boolean>(false)
const isOpenColor= ref<boolean>(false)
const isOpenDeleteModal= ref<boolean>(false)
const isOpenEraser= ref<boolean>(false)
const emit = defineEmits(['updateSettings', 'updateSettingsEraser', 'updateSettingsColor', 'deleteMaskFromCanvas', 'closeDeleteModal'])
const props = defineProps<{color:string;visible: number}>()

const saveSettings = ():void => {
  emit('updateSettings', valueSoftness.value, valueSize.value, valueOpacity.value)
  isOpen.value = false
}

const saveSettingsEraser = ():void => {
  emit('updateSettingsEraser', valueSizeEraser.value)
  isOpenEraser.value = false
}

const saveSettingsForColor = ():void => {
  emit('updateSettingsColor', selectColor.value)
  isOpenColor.value = false
}

const deleteMask = ():void => {
  emit('deleteMaskFromCanvas')
  isOpenDeleteModal.value = false
}
const closeDelete = ():void => {
  emit('closeDeleteModal')
  isOpenDeleteModal.value = false
}

const getColor = (color:string):void => {
  selectColor.value = color
  saveSettingsForColor()
}

watch(()=> props.visible, (val) => {
  val === 1 ? isOpen.value = true : isOpen.value = false
  val === 2 ? isOpenEraser.value = true : isOpenEraser.value = false
  val === 3 ? isOpenColor.value = true : isOpenColor.value = false
  val === 4 ? isOpenDeleteModal.value = true : isOpenDeleteModal.value = false
})

watch(() => isOpen.value, (val) => {
  if(val === false) emit('updateSettings', valueSoftness.value, valueSize.value, valueOpacity.value)
})
watch(() => isOpenEraser.value, (val) => {
  if(val === false) emit('updateSettingsEraser', valueSizeEraser.value)
})
</script>

<template>
  <UModal :ui="{overlay: {background: 'bg-gray-200/35 dark:bg-gray-800/25'}, container: 'items-center w-[90%] mx-auto', background: 'dark:bg-black/60 backdrop-blur-lg', shadow: 'shadow-none'}" v-model="isOpen">
    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="m-1 absolute right-0" @click="isOpen = false" />
    <div class="p-4 flex flex-col gap-3">
      <div
          :style="`width: calc(7px * ${valueSize}); height: calc(7px * ${valueSize});
                   opacity: ${valueOpacity / 30};
                   box-shadow: 0 0 ${valueSoftness / 10}px ${valueSoftness / 10}px currentColor;
                   background-color: rgba(${color});
                   color: rgba(${color})`"
          class="min-w-[7px] min-h-[7px] transition-all duration-300 mx-auto mb-5 border-spacing-4 border-dotted dark:border-white rounded-full "></div>
      <p class="mb-2">Размер</p>
      <VueSlider class="mb-3"  v-model="valueSize" :min="1" :max="7" :dot-size="24" tooltip="none"/>
      <p class="mb-2">Мягкость</p>
      <VueSlider class="mb-3" v-model="valueSoftness" :min="0" :max="20" :dot-size="24" tooltip="none"/>
      <p class="mb-2">Прозрачность</p>
      <VueSlider v-model="valueOpacity" :min="10" :max="30" :dot-size="24" tooltip="none"/>
      <UButton class="mt-8" @click.prevent="saveSettings" >Применить</UButton>
    </div>
  </UModal>
  <UModal :ui="{overlay: {background: 'bg-gray-200/35 dark:bg-gray-800/25'}, container: 'items-center', background: 'dark:bg-black/65', shadow: 'shadow-none'}" v-model="isOpenDeleteModal">
    <div class="p-4">
      <h5 class="font-semibold text-lg text-center mb-2">Вы уверены?</h5>
      <p class="text-center mb-3 px-20">Если удалите маску, то придется рисовать заново</p>
      <UButton @click="deleteMask" class="dark:bg-red-500  bg-red-500  dark:text-white mb-2">Удалить</UButton>
      <UButton @click="closeDelete" :ui="{variant: {solid: 'dark:bg-blue-500 dark:text-white'}}">Отмена</UButton>
    </div>
  </UModal>
  <UModal :ui="{overlay: {background: 'bg-gray-200/35 dark:bg-gray-800/25'}, container: 'items-center w-[90%] mx-auto', background: 'dark:bg-black/60 backdrop-blur-md', shadow: 'shadow-none'}" v-model="isOpenEraser">
    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="m-1 absolute right-0" @click="isOpenEraser = false" />
    <div class="p-4 flex flex-col gap-3">
      <div
          :style="`width: calc(15px * ${valueSizeEraser}); height: calc(15px * ${valueSizeEraser})`"
          class="min-w-[10px] min-h-[10px] transition-all dark:text-white duration-300 mx-auto mb-5 border-spacing-4 border-dotted dark:border-white rounded-full bg-white"></div>
      <p class="mb-2">Размер</p>
      <VueSlider class="mb-3" v-model="valueSizeEraser" :min="1" :max="5" :dot-size="24" tooltip="none"/>
      <UButton class="mt-8" @click.prevent="saveSettingsEraser" >Применить</UButton>
    </div>
  </UModal>
  <UModal :ui="{overlay: {background: 'bg-gray-200/35 dark:bg-gray-800/25'} ,container: 'items-end pb-48 w-[90%] mx-auto', background: 'dark:bg-black/60 backdrop-blur-lg', shadow: 'shadow-none'}" v-model="isOpenColor">
    <div class="p-4 flex  gap-3">
      <div @click="getColor('236, 72, 153')" :class="{'border-4': selectColor === '236, 72, 153'}" class="w-10 h-10 transition-all dark:text-white duration-300 mx-auto border-spacing-4 border dark:border-white rounded-full bg-pink-500"></div>
      <div @click="getColor('34, 197, 94')" :class="{'border-4': selectColor === '34, 197, 94'}" class="w-10 h-10 transition-all dark:text-white duration-300 mx-auto border-spacing-4 border dark:border-white rounded-full bg-green-500"></div>
      <div @click="getColor('255, 255, 255')" :class="{'border-4 dark:border-blue-500': selectColor === '255, 255, 255'}" class="w-10 h-10  transition-all dark:text-white duration-300 mx-auto border-spacing-4 border-2  rounded-full bg-white"></div>
      <div @click="getColor('0, 0, 0')" :class="{'border-4': selectColor === '0, 0, 0'}" class="w-10 h-10 transition-all dark:text-white duration-300 mx-auto border-spacing-4 border dark:border-white rounded-full bg-black"></div>
    </div>
  </UModal>
</template>

<style scoped>

</style>