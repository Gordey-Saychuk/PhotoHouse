<script setup lang="ts">
const breakpoints = ref({
  1: {
    slidesPerView: 4.15,
    spaceBetween: 10
  }
})
defineProps({
  title: {
    type: String,
    required: false
  },
  slides: {
    type: Array,
  }
})

const containerRef = ref(null)
const swiper = useSwiper(containerRef, {
  breakpoints: breakpoints.value,
})

</script>

<template>
  <section class="catalog pb-4">
    <UContainer>
      <h2 class="text-xl mb-3">{{title}}</h2>
      <ClientOnly>
        <swiper-container ref="containerRef">
          <swiper-slide
              v-for="(slide, idx) in slides"
              :key="idx"
          >
            <a class="relative" :href="slide.icon" data-fancybox="gallery">
              <img class="h-32 object-cover rounded-xl" :src="slide.icon" alt="slide.icon">
            </a>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
    </UContainer>
  </section>
</template>

<style scoped>

</style>