<script setup lang="ts">

</script>

<template>
<main>
  <section class="pt-3">
    <UContainer>
      <p class="text-center pb-3">Закрасьте <span class="font-semibold">примерную</span> область на фото, на которой должен появиться новый наряд</p>
      <img src="/assets/images/03-Help.jpg" alt="helpPhoto">
      <p class="py-5">Если это шуба, то ей нужен объем. Новая одежда может появиться только в указанной области, а значит для ИИ нужно больше пространства</p>
      <img src="/assets/images/04-Help.jpg" alt="helpPhoto">
      <p class="py-5">Если это расклешенное платье, укажите для него достаточно пространства. Если вы просто обведете тело, то платье будет облегающим</p>
      <img src="/assets/images/02-Help.jpg" alt="helpPhoto">
      <p class="py-5">Мы не закрашиваем старое, мы указываем пространство для нового. Например здесь мы четко указали длину брюк, а остальное указали примерно</p>
      <img src="/assets/images/01-Help.jpg" alt="helpPhoto">
      <p class="py-5">А здесь мы не хотим что бы пиджак был застегнут и не хотим что бы перерисовывались ладони. Так же, мы указали нейросети длину рукавов.</p>
    </UContainer>
  </section>
</main>
</template>

<style scoped>

</style>