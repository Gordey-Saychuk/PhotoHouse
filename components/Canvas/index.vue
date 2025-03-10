Вот обновленный код, который добавляет поддержку мобильных устройств и делает ластик круглым, чтобы он стирал нарисованные линии, а не рисовал поверх белым. Я также добавил обработчики событий для мобильных устройств.

Код
Копировать
<template>
  <div>
    <canvas
        ref="canvas"
        @mousedown="startDrawing"
        @mouseup="stopDrawing"
        @mousemove="draw"
        @touchstart="startDrawing"
        @touchend="stopDrawing"
        @touchmove="draw"
        width="800"
        height="600"
    ></canvas>
    <div>
      <label for="brushSize">Размер кисти:</label>
      <input type="range" id="brushSize" v-model="brushSize" min="1" max="100" />
      <label for="eraserSize">Размер ластика:</label>
      <input type="range" id="eraserSize" v-model="eraserSize" min="1" max="100" />
      <label for="softness">Мягкость:</label>
      <input type="range" id="softness" v-model="softness" min="0" max="100" />
      <button @click="setTool('pencil')">Карандаш</button>
      <button @click="setTool('eraser')">Ластик</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const canvas = ref(null);
const ctx = ref(null);
const drawing = ref(false);
const brushSize = ref(10);
const eraserSize = ref(10);
const softness = ref(50);
const tool = ref('pencil');
const photo = ref('');

const setTool = (selectedTool) => {
  tool.value = selectedTool;
};

const startDrawing = (event) => {
  drawing.value = true;
  draw(event);
};

const stopDrawing = () => {
  drawing.value = false;
  ctx.value.beginPath();
  photo.value = canvas.value.toDataURL();
};

const draw = (event) => {
  if (!drawing.value) return;

  const rect = canvas.value.getBoundingClientRect();
  const x = event.touches ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
  const y = event.touches ? event.touches[0].clientY - rect.top : event.clientY - rect.top;

  ctx.value.lineWidth = tool.value === 'eraser' ? eraserSize.value : brushSize.value;
  ctx.value.lineCap = 'round';
  ctx.value.strokeStyle = tool.value === 'eraser' ? 'rgba(0, 0, 0, 0)' : createGradient(x, y);

  if (tool.value === 'eraser') {
    ctx.value.globalCompositeOperation = 'destination-out'; // Устанавливаем режим для стирания
  } else {
    ctx.value.globalCompositeOperation = 'source-over'; // Устанавливаем режим для рисования
  }

  ctx.value.lineTo(x, y);
  ctx.value.stroke();
  ctx.value.beginPath();
  ctx.value.moveTo(x, y);
};

const createGradient = (x, y) => {
  const gradient = ctx.value.createRadialGradient(x, y, 0, x, y, brushSize.value);
  gradient.addColorStop(0, `rgba(0, 0, 0, ${1 - softness.value / 100})`);
  gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
  return gradient;
};

onMounted(() => {
  ctx.value = canvas.value.getContext('2d');
});

onBeforeUnmount(() => {
  ctx.value = null;
});
</script>

<style scoped>
canvas {
  border: 1px solid #000;
}
</style>