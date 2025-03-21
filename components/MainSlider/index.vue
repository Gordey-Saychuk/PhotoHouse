<script setup lang="ts">
import {useCartStore} from "~/store/useCart";
import type {Slide} from "~/types/slide";
import type {Category} from "~/types/category";
const router = useRouter()
const emit = defineEmits(['update'])
const props = defineProps<{id?:number,title: string;slides: Category[];favorites?: number[];small?: boolean}>()

const breakpoints = ref({1: {slidesPerView: props.small ? 4.15 : 3.15, spaceBetween: 8}})
const containerRef = ref(null)
const photo = ref<string>('')

const isOpenModal = ref<boolean>(false);

const goto = (id) => {
  router.push(`/products/1/${id}?category=1`)
}

</script>

<template>
  <section class="catalog pb-4 pt-3">
    <UContainer>
      <div class="flex">
        <RouterLink :to="`/category/${id}`">
          <h2 :class="small ? 'text-xl mb-3 relative' : 'text-2xl mb-4 relative'">{{title}}
            <UIcon v-if="title === 'Избранное'" name="i-noto-red-heart" class="absolute -right-6 bottom-0.5 w-5 h-5" />
            <UIcon v-else name="i-material-symbols-chevron-right" class="absolute -right-6 bottom-0 w-6 h-6" />
          </h2>
        </RouterLink>
      </div>
      <ClientOnly>
        <swiper-container :breakpoints="breakpoints" ref="containerRef">
          <swiper-slide
              v-for="(slide, idx) in slides"
              :key="idx"
          >
            <button @click.prevent="goto(slide.id)" class="relative dark:bg-white bg-black/5 rounded-xl w-full">
              <img :class="small ? 'h-36' : 'h-40'" class="object-contain rounded-xl" :src="slide.image" alt="slide.icon">
              <span v-if="!small" class="absolute h-full w-full flex items-end justify-center font-semibold text-black bottom-0 left-1/2 -translate-x-1/2 rounded-xl catalog__bg">{{slide.title}}</span>
            </button>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
      <UModal :ui="{container: 'items-center', background: 'dark:bg-white'}" v-model="isOpenModal">
          <div class="pt-8 mb-4 relative">
            <img class="rounded-xl " :src="photo ? photo : ''" alt="image">
          </div>
      </UModal>
    </UContainer>
  </section>
</template>

<style scoped>

</style>