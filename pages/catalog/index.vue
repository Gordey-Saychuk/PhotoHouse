<script setup lang="ts">
import type {Category} from "~/types/category";
import type {Slide} from "~/types/slide";
// import {useWebApp, MainButton, useWebAppPopup, useWebAppTheme, BackButton} from "vue-tg";
// const app = useWebApp()
//
// const { showAlert } = useWebAppPopup();
// const { colorScheme} = useWebAppTheme()

const {fetchCategories} = useCategories()
const {data: userData} = await useAsyncData(() => fetchCategories())
const {data: userDataFavorites, refresh} = await useAsyncData(() => fetchCategories())

const brand = computed<Category>(() => userData.value.categories.find((el: Category) => el.title === 'Бренды'))
const anyBrand = computed<Category[]>(() => userData.value.categories.filter((el: Category) => el.title !== 'Бренды'))
const favorites = computed<Slide[]>(() => userDataFavorites.value.favourites)
const favoritesIds = computed<number[]>(() => favorites.value.map((el:Slide) => el.id))
</script>

<template>
  <main>
    <MainSlider :title="brand.title" :slides="brand.clothes" :favorites="favoritesIds" @update="refresh"/>
    <MainSlider v-if="favorites.length" title="Избранное" :slides="favorites" :favorites="favoritesIds" @update="refresh" :small="true"/>
    <MainSlider v-for="category in anyBrand"  :title="category.title" :slides="category.clothes" :favorites="favoritesIds" @update="refresh" :small="true"/>
  </main>
</template>

<style scoped>

</style>