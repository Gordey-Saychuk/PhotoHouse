<script setup lang="ts">
const valueWeight = ref(3)
const valueSize = ref(5)
const valueOpacity = ref(10)
const isOpen= ref(false)
const isOpenDeleteModal= ref(false)
const emit = defineEmits(['updateSettings', 'deleteMaskFromCanvas'])
const props = defineProps<{visible: number}>()

const saveSettings = ():void => {
  emit('updateSettings', valueWeight.value, valueSize.value, valueOpacity.value)
  isOpen.value = false
}

const deleteMask = ():void => {
  emit('deleteMaskFromCanvas')
  isOpenDeleteModal.value = false
}

watch(()=> props.visible, (val) => {
  val === 1 ? isOpen.value = true : isOpen.value = false
  val === 4 ? isOpenDeleteModal.value = true : isOpenDeleteModal.value = false
})
</script>

<template>
  <UModal :ui="{container: 'items-start mt-24', background: 'dark:bg-black/60 backdrop-blur-md', shadow: 'shadow-none'}" v-model="isOpen">
    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="m-1 absolute right-0" @click="isOpen = false" />
    <div class="p-4 flex flex-col gap-3">
      <div
          :style="`width: calc(3rem * ${valueSize / 4}); height: calc(3rem * ${valueSize / 4});
                   opacity: ${valueOpacity / 10};
                   box-shadow: 0 0 ${valueWeight}px ${valueWeight}px currentColor;`"
          class="min-w-[20px] min-h-[20px] transition-all dark:text-pink-500 duration-300 mx-auto mb-5 border-spacing-4 border-dotted dark:border-white rounded-full bg-pink-500"></div>
      <p class="mb-2">Размер</p>
      <URange class="mb-3" v-model="valueSize" :min="1" :max="5"/>
      <p class="mb-2">Жёсткость</p>
      <URange class="mb-3" v-model="valueWeight" :min="0" :max="7"/>
      <p class="mb-2">Непрозрачность</p>
      <URange v-model="valueOpacity" :min="5" :max="10"/>
      <UButton class="mt-8" @click.prevent="saveSettings" >Применить</UButton>
    </div>
  </UModal>
  <UModal :ui="{container: 'items-center', background: 'dark:bg-black/55', shadow: 'shadow-none'}" v-model="isOpenDeleteModal">
    <div class="p-4">
      <h5 class="font-semibold text-lg text-center">Вы уверены?</h5>
      <p class="text-center mb-3">Если удалите маску, то придется рисовать заново</p>
      <UButton @click="deleteMask" class="dark:bg-red-500 bg-red-500 dark:text-white mb-2">Удалить</UButton>
      <UButton @click="isOpenDeleteModal = false" :ui="{variant: {solid: 'dark:bg-blue-500 dark:text-white'}}">Отмена</UButton>
    </div>
  </UModal>
</template>

<style scoped>

</style>