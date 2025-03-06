<script setup lang="ts">
import {useCartStore} from "~/store/useCart";
import {onMounted, ref} from "vue";
const store = useCartStore();




const activeTab = ref<number>(5)
const checkPhoto = ref<boolean>(false)
const isOpen = ref<boolean>(false)

const tabs = ref([
  {id: 1, icon: 'i-heroicons-paint-brush-16-solid', color: 'dark:text-white', custom: false},
  {id: 2, icon: 'i-solar-eraser-bold', color: 'dark:text-white', custom: false},
  {id: 3, icon: 'i-ic-twotone-circle', color: 'dark:text-pink-500', custom: true},
  {id: 4, icon: 'i-ion-trash-sharp', color: 'dark:text-white', custom: false},
])

const colors = ref([
  {id: 1, color: 'dark:bg-pink-500 bg-pink-500'},
  {id: 2, color: 'dark:bg-green-500 bg-green-500'},
  {id: 3, color: 'dark:bg-white bg-white'},
  {id: 4,  color: 'dark:bg-black bg-black'},
])













const isOpenCloth = ref<boolean>(false)
const visibleHand = ref<boolean>(true)
const canvas = ref(null);
const ctx = ref(null);
const isDrawing = ref(false);
const tool = ref('pencil');
const imgToCanvas = ref(null);
const photo = ref('');
const canvasWidth = ref(300); // Ширина канваса
const canvasHeight = ref(500); // Высота канваса



const color = ref<string>('rgba(236, 72, 153, 1)')

const imageSrc = ref(store.cartBottom);
onMounted(() => {
  // canvasWidth.value = imgToCanvas.value.width
  // canvasHeight.value = imgToCanvas.value.height
  ctx.value = canvas.value.getContext('2d');
  ctx.value.lineWidth = 25;
  ctx.value.lineCap = 'round';
});

const startDrawing = (event) => {
  visibleHand.value = false;
  isDrawing.value = true;
  ctx.value.beginPath();
  const { offsetX, offsetY } = getMousePosition(event);
  ctx.value.moveTo(offsetX, offsetY);
};

const stopDrawing = () => {
  isDrawing.value = false;
  ctx.value.closePath();
  photo.value = canvas.value.toDataURL();
};

const draw = (event) => {
  if (!isDrawing.value) return;
  const { offsetX, offsetY } = getMousePosition(event);
  if (tool.value === 'pencil') {
    ctx.value.lineTo(offsetX, offsetY);
    ctx.value.strokeStyle = color.value;
    ctx.value.stroke();
  } else if (tool.value === 'eraser') {
    ctx.value.clearRect(offsetX - 10, offsetY - 10, 20, 20); // Стираем область
  }
};

const getMousePosition = (event) => {
  const rect = canvas.value.getBoundingClientRect();
  const x = event.touches ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
  const y = event.touches ? event.touches[0].clientY - rect.top : event.clientY - rect.top;
  return { offsetX: x, offsetY: y };
};

const setTool = (selectedTool) => {
  tool.value = selectedTool;
};

const updateSettingsForPencil = (weight:number, size:number, opacity:number) => {
  setTool('pencil')
  ctx.value.lineWidth = size * 5;
  color.value = `rgba(236, 72, 153, ${opacity / 10})`;

}

const deleteMask = () => {
  ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
  activeTab.value = 5;
  photo.value = '';
}
















watch(()=> activeTab.value, () => {
  activeTab.value === 3 ? isOpen.value = true : false
  activeTab.value === 2 ? setTool('eraser'): false
})
</script>

<template>
<main>
  <section>
    <UContainer class="relative">
      <div :class="{'opacity-100 z-20': checkPhoto}" class="w-3/4 absolute bottom-0 left-3 transition-opacity duration-300 opacity-0">
        <UButton @click.prevent="checkPhoto = !checkPhoto" :ui="{variant: {solid: 'ring-0 dark:bg-white/40 dark:text-zinc-700 p-0 w-fit rounded-md'}}" class="absolute top-3 rotate-180 right-3 z-10"  icon="i-material-symbols-arrow-outward"></UButton>
        <img class="object-cover dark:bg-white rounded-lg shadow-[0_-5px_150px_100px_rgba(0,0,0,0.2)]" :src="store.cart ? store.cart : ''" alt="image">
      </div>
      <div class="relative z-20">
        <canvas
            class="mx-auto mb-5 relative z-10"
            ref="canvas"
            @mousedown="startDrawing"
            @mouseup="stopDrawing"
            @mousemove="draw"
            @touchstart="startDrawing"
            @touchend="stopDrawing"
            @touchmove="draw"
            :width="canvasWidth"
            :height="canvasHeight"
        ></canvas>
        <img ref="imgToCanvas" class="absolute top-0 left-0 -z-10" :src="imageSrc" alt="">
        <EditHand :visible="visibleHand"/>
      </div>
      <div class="flex items-start justify-between flex-wrap z-10 mb-5 relative">
        <div class="w-[calc(18%-0.375rem)] h-16 relative">
          <UButton @click.prevent="isOpenCloth = true" :ui="{variant: {solid: 'ring-0 dark:bg-white/40 dark:text-zinc-700 p-0 w-fit rounded-md'}}" class="absolute top-1 right-1 z-10"  icon="i-material-symbols-arrow-outward"></UButton>
          <img class="object-cover dark:bg-white h-full w-full rounded-lg transition-all duration-700" :src="store.cart ? store.cart : ''" alt="image">
        </div>
        <EditButtons v-for="(tab, i) in tabs" :tab="tab" v-model="activeTab" :key="i"/>
        <EditModal :visible="activeTab" @update-settings="updateSettingsForPencil" @delete-mask-from-canvas="deleteMask"/>
      </div>
<!--      <div>-->
<!--        <UButton v-for="btn in colors" :class="`${btn.color}`"></UButton>-->
<!--      </div>-->
      <div>

<!--        <div class="relative z-20">-->
<!--          <button @click="setTool('pencil')">Карандаш</button>-->
<!--          <button @click="setTool('eraser')">Ластик</button>-->
<!--        </div>-->
      </div>
      <UButton :disabled="!photo" to="/edit" :class="{'dark:bg-zinc-800': !photo, 'dark:text-zinc-500': !photo, 'bg-neutral-200': !photo, 'text-zinc-400': !photo}" class="ms-auto transition-all duration-700" :ui="{variant: {solid: 'dark:bg-blue-500 dark:text-white font-normal'},gap: { xl: 'gap-x-2'}}">
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

<style scoped>
canvas {
  touch-action: none; /* Отключаем стандартные действия для сенсорных экранов */
}
</style>