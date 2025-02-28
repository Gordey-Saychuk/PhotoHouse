<script setup lang="ts">
import {useCartStore} from "~/store/useCart";

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
const store = useCartStore()
const loadPhoto = (photo) => {
  store.initCart(photo)
}
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
            <button class="relative">
              <img class="h-32 object-cover rounded-xl" :src="slide.icon" alt="slide.icon">
              <UButton  @click.prevent="loadPhoto(slide.icon)">выбрать</UButton>
            </button>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
    </UContainer>
  </section>
</template>

<style scoped>

</style>