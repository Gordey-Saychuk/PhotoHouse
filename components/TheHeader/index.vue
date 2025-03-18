<script setup>
const route = useRoute()
const router = useRouter()
import { useWebAppBackButton } from 'vue-tg';
const backButton = useWebAppBackButton()

// Функция для обновления видимости кнопки "Назад"
const updateBackButtonVisibility = () => {
  if (route.path === '/') {
    backButton.hideBackButton() // Скрыть кнопку на главной странице
  } else {
    backButton.showBackButton() // Показать кнопку на других страницах
  }
};

// Подписываемся на событие нажатия кнопки "Назад"
backButton.onBackButtonClicked(() => router.back())

// Обновляем видимость кнопки при изменении маршрута
watch(() => route.path, () => updateBackButtonVisibility())

// Инициализация при монтировании компонента
onMounted(() => updateBackButtonVisibility())
</script>

<template>
<!--  <header class="p-2 relative">-->
<!--    <UContainer>-->
<!--      <UButton v-show="route.path !== '/'" :ui="{variant: {outline: 'ring-0 gap-x-0 dark:text-blue-600'}}" @click.prevent="router.back()" class="absolute left-0 top-0" variant="outline" icon="i-material-symbols-chevron-left">Назад</UButton>-->
<!--      <RouterLink to="/"><h1 class="text-xl text-center">Примерочная</h1></RouterLink>-->
<!--      <p class="text-center text-zinc-500">Фотобудка</p>-->
<!--    </UContainer>-->
<!--  </header>-->
</template>
