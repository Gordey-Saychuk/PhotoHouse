<script setup lang="ts">
const second = ref([
  { name: 'Home', icon: '/assets/images/5537dd98bf673f9339cc72fd401894d0.webp'},
  { name: 'Home', icon: '/assets/images/5537dd98bf673f9339cc72fd401894d0.webp'},
  { name: 'Home', icon: '/assets/images/5537dd98bf673f9339cc72fd401894d0.webp'},
  { name: 'Home', icon: '/assets/images/5537dd98bf673f9339cc72fd401894d0.webp'},
  { name: 'Home', icon: '/assets/images/5537dd98bf673f9339cc72fd401894d0.webp'},
])
const first = ref([
  { name: 'Home', icon: '/assets/images/232c1e1efff3fb083d004a2f23559e66.webp'},
  { name: 'Home', icon: '/assets/images/232c1e1efff3fb083d004a2f23559e66.webp'},
  { name: 'Home', icon: '/assets/images/232c1e1efff3fb083d004a2f23559e66.webp'},
  { name: 'Home', icon: '/assets/images/232c1e1efff3fb083d004a2f23559e66.webp'},
  { name: 'Home', icon: '/assets/images/232c1e1efff3fb083d004a2f23559e66.webp'},
])
const third = ref([
  { name: 'Home', icon: '/assets/images/7bca804ed7fad6d0410586e80f49a7ef.webp'},
  { name: 'Home', icon: '/assets/images/7bca804ed7fad6d0410586e80f49a7ef.webp'},
  { name: 'Home', icon: '/assets/images/7bca804ed7fad6d0410586e80f49a7ef.webp'},
  { name: 'Home', icon: '/assets/images/7bca804ed7fad6d0410586e80f49a7ef.webp'},
  { name: 'Home', icon: '/assets/images/7bca804ed7fad6d0410586e80f49a7ef.webp'},
])
</script>

<template>
<main>
  <MainSlider/>
  <SecondSlider title="Верхняя одежда" :slides="third"/>
  <SecondSlider title="Платья" :slides="first"/>
  <SecondSlider title="Костюмы" :slides="second"/>
</main>
</template>

<style scoped>

</style>