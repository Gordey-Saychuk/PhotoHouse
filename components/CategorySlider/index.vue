<script setup lang="ts">
import {useCartStore} from "~/store/useCart";
import type {Slide} from "~/types/slide";
const router = useRouter()
const store = useCartStore()
const {addFavorites} = useAddFavorites()
const emit = defineEmits(['update'])
const props = defineProps<{id?:number,title: string;slides: Slide[];favorites: number[];small?: boolean}>()

const breakpoints = ref({1: {slidesPerView: props.small ? 4.15 : 3.15, spaceBetween: 8}})
const containerRef = ref(null)
const photo = ref<string>('')
const itemId = ref<number>(0)

const {refresh} = await useAsyncData(() => addFavorites(itemId.value), {immediate: false})


const isOpenModal = ref<boolean>(false);
const inFavorite = ref<boolean>(false);
const openModal = (image:string, id:number):void => {
  itemId.value = id
  photo.value = image
  isOpenModal.value = true
}
const loadPhotoToStore = (photo:string, id:number):void => {
  store.initCart(photo, id)
  isOpenModal.value = false
  setTimeout(() => router.push('/'), 400)
}
const addToFavorites = async () => {
  emit('update')
  await refresh()
  inFavorite.value = !inFavorite.value
}

const inFavoriteBtn = computed<number | undefined>(() => {
  return props.favorites.find((el:number) => el === itemId.value)
});
</script>

<template>
  <section class="catalog pb-4">
    <UContainer>
      <div class="flex">
        <RouterLink v-if="title !== 'Избранное'" :to="`/products/${props.id}`">
          <h2 :class="small ? 'text-xl mb-3 relative' : 'text-2xl mb-4 relative'">{{title}}
            <UIcon v-if="title === 'Избранное'" name="i-noto-red-heart" class="absolute -right-6 bottom-0.5 w-5 h-5" />
            <UIcon v-else name="i-material-symbols-chevron-right" class="absolute -right-6 bottom-0 w-6 h-6" />
          </h2>
        </RouterLink>
          <h2 v-else :class="small ? 'text-xl mb-3 relative' : 'text-2xl mb-4 relative'">{{title}}
            <UIcon v-if="title === 'Избранное'" name="i-noto-red-heart" class="absolute -right-6 bottom-0.5 w-5 h-5" />
            <UIcon v-else name="i-material-symbols-chevron-right" class="absolute -right-6 bottom-0 w-6 h-6" />
          </h2>
      </div>
      <ClientOnly>
        <swiper-container :breakpoints="breakpoints" ref="containerRef">
          <swiper-slide
              v-for="(slide, idx) in slides"
              :key="idx"
          >
            <button @click.prevent="openModal(slide.image, slide.id)" class="relative dark:bg-white bg-black/5 rounded-xl w-full">
              <img :class="small ? 'h-28' : 'h-36'" class="object-contain rounded-xl mx-auto" :src="slide.image" alt="slide.icon">
              <span v-if="!small" class="absolute h-full w-full flex items-end justify-center font-semibold text-black bottom-0 left-1/2 -translate-x-1/2 rounded-xl catalog__bg">{{slide.title}}</span>
            </button>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
      <UModal :ui="{container: 'items-center', background: 'dark:bg-transparent'}" v-model="isOpenModal">
          <div class="pt-8 mb-4 relative dark:bg-white rounded-xl">
            <img class="rounded-xl h-[63vh] mx-auto object-contain" :src="photo ? photo : ''" alt="image">
            <UButton :ui="{variant: {link: 'focus-visible:ring-0 dark:focus-visible:ring-0'}, padding: {square: 'p-1'}}" @click.prevent="addToFavorites" v-if="inFavoriteBtn !== undefined" class="p-1.5 absolute bottom-1 left-1 dark:text-red-600 focus-visible:ring-0 dark:focus-visible:ring-none "  variant="link" icon="i-solar-heart-bold"></UButton>
            <UButton :ui="{variant: {link: 'focus-visible:ring-0 dark:focus-visible:ring-0'}, padding: {square: 'p-1'}}" @click.prevent="addToFavorites" v-else class="p-1.5 absolute bottom-1 left-1 dark:text-red-600 focus-visible:ring-0 dark:focus-visible:ring-none"  variant="link" icon="i-solar-heart-linear"></UButton>
          </div>
        <UButton @click.prevent="loadPhotoToStore(photo, itemId)" :ui="{variant: {solid: 'dark:bg-blue-500 dark:text-white font-medium'}}">Выбрать</UButton>
      </UModal>
    </UContainer>
  </section>
</template>

<style scoped>

</style>