<template>
  <NuxtLoadingIndicator color="rgb(59 130 246)"/>
  <NuxtPage/>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0.5;
  filter: blur(.1rem);
}
</style>