<template>
  <div ref="container" class="relative h-[60vh] mb-5">
    <canvas
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
    <img ref="imgToCanvas" class="absolute top-0 left-0  object-contain -z-10 w-full h-full" :src="imageSrc ? imageSrc : ''" alt="">
  </div>
</template>

<script setup>
import {useCartStore} from "~/store/useCart";

const emit = defineEmits(["startDrawing", "stopDrawing"]);
const props = defineProps({
  size: {
    type: Number,
  },
  softness: {
    type: Number,
  },
  opacity: {
    type: Number,
  },
  clear: {
    type: Boolean,
  },
  device: {
    type: String,
  },
  eraserSize: {
    type: Number,
  },
  mainColor: {
    type: String,
  }
})

const canvas = ref(null);
const ctx = ref(null);
const drawing = ref(false);
const tool = ref('pencil');
const lastX = ref(null);
const lastY = ref(null);
const container = ref(null);
const photo = ref('');

const store = useCartStore();
const imageSrc = ref(store.cartBottom);
const imgToCanvas = ref(null);
const canvasWidth = ref(300); // Ширина канваса
const canvasHeight = ref(400); // Высота канваса

const startDrawing = (event) => {
  drawing.value = true;
  draw(event, true); // Рисуем первую точку сразу
  emit('startDrawing');
};

const stopDrawing = () => {
  drawing.value = false;
  lastX.value = null;
  lastY.value = null;
  photo.value = canvas.value.toDataURL();
  emit('stopDrawing')
};

const draw = (event, isStarting = false) => {
  if (!drawing.value) return;

  const rect = canvas.value.getBoundingClientRect();
  const x = event.touches ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
  const y = event.touches ? event.touches[0].clientY - rect.top : event.clientY - rect.top;

  // Изменяем режим композитного рисования в зависимости от выбранного инструмента
  ctx.value.globalCompositeOperation = tool.value === 'eraser' ? 'destination-out' : 'source-over';

  if (isStarting || lastX.value === null || lastY.value === null) {
    // Если это первый штрих, просто нарисуем точку
    drawBrushStroke(x, y);
  } else {
    // Заполняем пробелы между быстрыми движениями мыши
    const steps = Math.max(Math.abs(x - lastX.value), Math.abs(y - lastY.value));
    for (let i = 0; i < steps; i++) {
      let interpX = lastX.value + ((x - lastX.value) * i) / steps;
      let interpY = lastY.value + ((y - lastY.value) * i) / steps;
      drawBrushStroke(interpX, interpY);
    }
  }

  lastX.value = x;
  lastY.value = y;
};

const drawBrushStroke = (x, y) => {
  const gradient = ctx.value.createRadialGradient(x, y, 0, x, y, props.size);
  gradient.addColorStop(0, `rgba(${props.mainColor}, ${1.01 - props.opacity / 100})`);
  gradient.addColorStop(1, `rgba(${props.mainColor}, ${1.01 - (props.opacity + props.softness) / 100})`);

  ctx.value.fillStyle = gradient;
  ctx.value.beginPath();
  ctx.value.arc(x, y, props.size, 0, Math.PI * 2);
  ctx.value.fill();
};

const deleteMask = () => {
  ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
}

const setTool = (selectedTool) => {
  tool.value = selectedTool;
};

onMounted(() => {
  // canvasWidth.value =  100
  // canvasHeight.value =  100
  ctx.value = canvas.value.getContext('2d');
  ctx.value.lineCap = 'round';
  ctx.value.lineJoin = 'round';
  if (container.value) {
    const rect = container.value.getBoundingClientRect();
    canvasWidth.value = rect.width;
    canvasHeight.value = rect.height;
  }
});

onBeforeUnmount(() => {
  ctx.value = null;
});

watch(() => props.clear, () => deleteMask())
watch(() => props.device, () => setTool(props.device, props.eraserSize))
</script>

<style scoped>
canvas {
  background-color: transparent;
  touch-action: none;
}
</style>