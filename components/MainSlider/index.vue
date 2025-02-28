<script setup lang="ts">
const breakpoints = ref({
  1: {
    slidesPerView: 3.15,
    spaceBetween: 10
  }
})
const containerRef = ref(null)
const swiper = useSwiper(containerRef, {
  breakpoints: breakpoints.value,
})
const cooperationItems = ref([
  {
    name: 'Home',
    icon: '/assets/images/hero.webp'
  },
  {
    name: 'Home',
    icon: '/assets/images/hero.webp'
  },
  {
    name: 'Home',
    icon: '/assets/images/hero.webp'
  },
  {
    name: 'Home',
    icon: '/assets/images/hero.webp'
  },
  {
    name: 'Home',
    icon: '/assets/images/hero.webp'
  },
  {
    name: 'Home',
    icon: '/assets/images/hero.webp'
  },
])
</script>

<template>
  <section class="catalog pb-4">
    <UContainer>
      <h2 class="text-2xl mb-4">Бренды</h2>
      <ClientOnly>
        <swiper-container ref="containerRef">
          <swiper-slide
              v-for="(slide, idx) in cooperationItems"
              :key="idx"
          >
            <a class="relative" :href="slide.icon" data-fancybox="gallery">
              <img class="h-44 object-cover rounded-xl" :src="slide.icon" alt="slide.icon">
              <span class="absolute h-full w-full flex items-end justify-center font-semibold text-black bottom-0 left-1/2 -translate-x-1/2 rounded-xl catalog__bg">{{slide.name}}</span>
            </a>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
    </UContainer>
  </section>
</template>

<style scoped>

</style>