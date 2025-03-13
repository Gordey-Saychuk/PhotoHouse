<script setup lang="ts">
import type {Category} from "~/types/category";
import type {Slide} from "~/types/slide";

const route = useRoute()
const {fetchCategories} = useCategories()
const {data: userData} = await useAsyncData(() => fetchCategories())
const currentCategory = computed<Category>(() => userData.value.categories.find((category: Category) => category.id === Number(route.params.id)))
const favorites = computed<Slide[]>(() => userData.value.favourites)
const favoritesIds = computed<number[]>(() => favorites.value.map((el:Slide) => el.id))
</script>

<template>
  {{currentCategory}}
  <!--    <ProductsList :slides="currentCategory.clothes" :favorites="favoritesIds"/>-->
</template>

<style scoped>

</style>