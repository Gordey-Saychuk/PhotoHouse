<template>
  <div ref="container" class="relative h-full w-full flex items-center justify-center">
    <canvas
        class=""
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
    <img
        ref="imgToCanvas"
        class="absolute top-0  object-contain w-full h-full -z-10"
        :src="imageSrc ? imageSrc : ''"
        alt=""
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useCartStore } from '~/store/useCart';

const emit = defineEmits(['startDrawing', 'stopDrawing']);
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
  },
});

const canvas = ref(null);
const ctx = ref(null);
const drawing = ref(false);
const tool = ref('pencil');
const lastX = ref(null);
const lastY = ref(null);
const container = ref(null);
const photo = ref('');

const store = useCartStore();
const canvasWidth = ref(300); // Начальная ширина канваса
const canvasHeight = ref(500); // Начальная высота канваса

const imgToCanvas = ref(null);
const imageSrc = ref(store.cartBottom);
const imageSize = ref(null);

// Функция для обновления размеров canvas
const updateCanvasSize = () => {
  if (container.value && imgToCanvas.value) {
    const containerWidth = container.value.clientWidth;
    const containerHeight = container.value.clientHeight;

    const imageAspectRatio = imgToCanvas.value.naturalWidth / imgToCanvas.value.naturalHeight;
    const containerAspectRatio = containerWidth / containerHeight;

    if (containerAspectRatio > imageAspectRatio) {
      // Контейнер шире, чем изображение
      canvasHeight.value = containerHeight;
      canvasWidth.value = containerHeight * imageAspectRatio;
    } else {
      // Контейнер уже, чем изображение
      canvasWidth.value = containerWidth;
      canvasHeight.value = containerWidth / imageAspectRatio;
    }

    canvasWidth.value += 2;
    canvasHeight.value += 2;
  }
};

// Обработчик загрузки изображения
const onImageLoad = () => {
  if (imgToCanvas.value) {
    imageSize.value = {
      width: imgToCanvas.value.naturalWidth,
      height: imgToCanvas.value.naturalHeight,
    };
    console.log('Исходный размер изображения:', imageSize.value);
    updateCanvasSize(); // Обновляем размеры canvas после загрузки изображения
  }
};

// Функция для создания нового canvas с размерами 1:1
const createScaledCanvas = () => {
  if (!imageSize.value || !canvas.value) {
    console.error('imageSize или canvas не определены');
    return null;
  }

  const { width, height } = imageSize.value;

  // Создаем новый canvas с размерами исходного изображения
  const scaledCanvas = document.createElement('canvas');
  scaledCanvas.width = width;
  scaledCanvas.height = height;
  const scaledCtx = scaledCanvas.getContext('2d');

  if (!scaledCtx) {
    console.error('Не удалось получить контекст для нового canvas');
    return null;
  }

  // Переносим рисунок из текущего canvas на новый с масштабированием
  scaledCtx.drawImage(canvas.value, 0, 0, width, height);

  // Возвращаем новый canvas
  return scaledCanvas;
};

const startDrawing = (event) => {
  drawing.value = true;
  draw(event, true); // Рисуем первую точку сразу
  emit('startDrawing');
};

const stopDrawing = () => {
  drawing.value = false;
  lastX.value = null;
  lastY.value = null;

  // Создаем новый canvas с размерами 1:1
  const scaledCanvas = createScaledCanvas();
  if (scaledCanvas) {
    try {
      photo.value = scaledCanvas.toDataURL(); // Сохраняем изображение с новым canvas
      emit('stopDrawing', photo.value, scaledCanvas);
    } catch (error) {
      console.error('Ошибка при создании DataURL:', error);
    }
  } else {
    console.error('Не удалось создать масштабированный canvas');
  }
};

const draw = (event, isStarting = false) => {
  if (!drawing.value || !canvas.value || !ctx.value) return;

  const rect = canvas.value.getBoundingClientRect();
  const x = event.touches ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
  const y = event.touches ? event.touches[0].clientY - rect.top : event.clientY - rect.top;

  // Изменяем режим композитного рисования в зависимости от выбранного инструмента
  if (tool.value === 'eraser') {
    ctx.value.globalCompositeOperation = 'destination-out'; // Полностью стираем пиксели
  } else {
    ctx.value.globalCompositeOperation = 'source-over'; // Обычное рисование
  }

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
  if (!ctx.value) return;

  if (tool.value === 'eraser') {
    // Для стирания используем прозрачный цвет
    ctx.value.fillStyle = 'rgba(0, 0, 0, 1)'; // Прозрачность 100%
  } else {
    // Для рисования используем градиент
    const gradient = ctx.value.createRadialGradient(x, y, 0, x, y, props.size);
    gradient.addColorStop(0, `rgba(${props.mainColor}, ${1.01 - props.opacity / 100})`);
    gradient.addColorStop(1, `rgba(${props.mainColor}, ${1.01 - (props.opacity + props.softness) / 100})`);
    ctx.value.fillStyle = gradient;
  }

  ctx.value.beginPath();
  ctx.value.arc(x, y, props.size, 0, Math.PI * 2);
  ctx.value.fill();
};

const deleteMask = () => {
  if (ctx.value) {
    ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
  }
};

const setTool = (selectedTool) => {
  tool.value = selectedTool;
};

const changeCanvasColor = (newColor) => {
  if (!canvas.value || !ctx.value) return;

  // Получаем данные изображения
  const imageData = ctx.value.getImageData(0, 0, canvasWidth.value, canvasHeight.value);
  const data = imageData.data;

  // Преобразуем новый цвет в RGB
  const [r, g, b] = newColor.split(',').map(Number);

  // Проходим по всем пикселям
  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3]; // Альфа-канал (прозрачность)

    // Если пиксель непрозрачный, меняем его цвет
    if (alpha > 0) {
      data[i] = r;     // Красный
      data[i + 1] = g; // Зеленый
      data[i + 2] = b; // Синий
    }
  }

  // Обновляем canvas с новыми данными
  ctx.value.putImageData(imageData, 0, 0);
};

onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d');
    ctx.value.lineCap = 'round';
    ctx.value.lineJoin = 'round';
  }
  onImageLoad()
});

onBeforeUnmount(() => {
  ctx.value = null;
});

watch(() => props.clear, () => deleteMask());
watch(() => props.device, () => setTool(props.device, props.eraserSize));
watch(() => props.mainColor, (newColor) => {
  changeCanvasColor(newColor);
});
</script>

<style scoped>
canvas {
  background-color: transparent;
  touch-action: none;
}
</style>