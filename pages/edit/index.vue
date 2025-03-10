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
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref(null);
const isDrawing = ref(false);
const tool = ref('pencil');
const imgToCanvas = ref<HTMLImageElement | null>(null);
const photo = ref<string | undefined>('');
const canvasWidth = ref<number | undefined>(100 ); // Ширина канваса
const canvasHeight = ref(400); // Высота канваса
const sizeEraser = ref(10); // Высота канваса
const softness = ref(2);
const sizePencil = ref(10)

const color = ref<string>('rgba(236, 72, 153, 1)')
const imageSrc = ref(store.cartBottom);

onMounted(() => {
  canvasWidth.value = imgToCanvas.value.width
  canvasHeight.value = imgToCanvas.value.height
  ctx.value = canvas.value.getContext('2d');

  ctx.value.shadowColor = `rgba(236, 72, 153, 1)`;
  ctx.value.shadowBlur = softness.value;

});

const startDrawing = (event) => {
  ctx.value.lineJoin = 'round'
  ctx.value.lineCap = 'round';
  ctx.value.shadowColor = `rgba(236, 72, 153, 1)`; // Цвет тени должен совпадать с цветом кисти
  ctx.value.shadowBlur = softness.value;
  ctx.value.lineWidth = sizePencil.value;
  visibleHand.value = false;
  isDrawing.value = true;
  ctx.value.beginPath();
  const { offsetX, offsetY } = getMousePosition(event);
  ctx.value.moveTo(offsetX, offsetY);
};

const stopDrawing = () => {
  ctx.value.lineCap = 'round';
  ctx.value.lineJoin = 'round'
  ctx.value.shadowColor = `rgba(236, 72, 153, 1)`; // Цвет тени должен совпадать с цветом кисти
  ctx.value.shadowBlur = softness.value;
  isDrawing.value = false;
  ctx.value.closePath();
  photo.value = canvas.value.toDataURL();
};

const draw = (event) => {
  if (!isDrawing.value) return;
  const rect = canvas.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const { offsetX, offsetY } = getMousePosition(event);
  if (tool.value === 'pencil') {
    ctx.value.lineJoin = 'round'
    ctx.value.lineCap = 'round';
    ctx.value.shadowColor = `rgba(236, 72, 153, 1)`; // Цвет тени должен совпадать с цветом кисти
    ctx.value.shadowBlur = softness.value;
    ctx.value.lineWidth = sizePencil.value;
    ctx.value.lineTo(offsetX, offsetY);
    ctx.value.strokeStyle = color.value;
    ctx.value.stroke();
  } else if (tool.value === 'eraser') {
    erase(x, y);// Стираем область
  }
};


//Определяем позицию мышки на канвасе
const getMousePosition = (event) => {
  const rect = canvas.value.getBoundingClientRect();
  const x = event.touches ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
  const y = event.touches ? event.touches[0].clientY - rect.top : event.clientY - rect.top;
  return { offsetX: x, offsetY: y };
};
///

//Обновляем размеры карандаша
const updateSettingsForPencil = (weight:number, size:number, opacity:number):void => {
  setTool('pencil')
  softness.value = weight;
  sizePencil.value = size * 5;
  color.value = `rgba(236, 72, 153, ${opacity / 10})`;
}
///


const erase = (x, y) => {
  ctx.value.save();
  ctx.value.globalCompositeOperation = 'destination-out'; // Устанавливаем режим стирания
  ctx.value.beginPath();
  ctx.value.arc(x, y, 10, 0, Math.PI * 2, false); // Рисуем круг для ластика
  ctx.value.fill();
  ctx.value.restore();
};


//Меняем инструмент(карандаш/ластик)
const setTool = (selectedTool:string):string => tool.value = selectedTool;
///

//Обновляем размеры ластика
const updateSettingsForEraser = (size:number):number => sizeEraser.value = size * 10
///

//Удаляем маску полностью
const deleteMask = ():void => {
  ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
  activeTab.value = 5;
  photo.value = '';

}
///

//повторное открывание модалки
const openAgainModal = (id:number):void => {
  activeTab.value = 5
  setTimeout(() => {activeTab.value = id},1)
}
///

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
        <img ref="imgToCanvas" class="absolute top-0 left-0 w-full h-full object-contain -z-10" :src="imageSrc ? imageSrc : ''" alt="">
        <EditHand :visible="visibleHand"/>
      </div>
      <div class="flex items-start justify-between flex-wrap z-10 mb-5 relative">
        <div class="w-[calc(18%-0.375rem)] h-16 relative">
          <UButton @click.prevent="isOpenCloth = true" :ui="{variant: {solid: 'ring-0 dark:bg-white/40 dark:text-zinc-700 p-0 w-fit rounded-md'}}" class="absolute top-1 right-1 z-10"  icon="i-material-symbols-arrow-outward"></UButton>
          <img class="object-cover dark:bg-white h-full w-full rounded-lg transition-all duration-700" :src="store.cart ? store.cart : ''" alt="image">
        </div>
        <EditButtons v-for="(tab, i) in tabs" :tab="tab" v-model="activeTab" :key="i" @open-again="openAgainModal" />
        <EditModal :visible="activeTab" @update-settings="updateSettingsForPencil" @delete-mask-from-canvas="deleteMask" @close-delete-modal="activeTab = 5" @update-settings-eraser="updateSettingsForEraser"/>
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
  <img :src="photo" alt="">
  <Canvas/>
</main>
</template>

<style scoped>
canvas {
  touch-action: none; /* Отключаем стандартные действия для сенсорных экранов */
}
</style>