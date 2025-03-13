<script setup lang="ts">
import type {Slide} from "~/types/slide";
import type {Category} from "~/types/category";
const route = useRoute()
const {fetchCategories} = useCategories()
const {data: userData, refresh} = await useAsyncData(() => fetchCategories())
const currentCategory = computed<Category>(() => userData.value.categories.find((category: Category) => category.id === Number(route.params.id)))
const currentSubCategory = computed<Category>(() => userData.value.categories.find((category: Category) => category.id === Number(route.params.id)))
const favorites = computed<Slide[]>(() => userData.value.favourites)
const favoritesIds = computed<number[]>(() => favorites.value.map((el:Slide) => el.id))
</script>

<template>
  <main>
    <pre>{{currentCategory}}</pre>
<!--    <SubCategorySlider v-for="category in currentCategory.subCategories" :id="category.id" :favorites="favoritesIds"  :title="category.title" :slides="category.clothes" @update="refresh" :small="true"/>-->
<!--    <MainSlider v-if="currentCategory.clothes.length" :id="currentCategory.id"  :title="currentCategory.title" :slides="currentCategory.clothes"  @update="refresh" :small="true"/>-->
  </main>
</template>

<style scoped>

</style>