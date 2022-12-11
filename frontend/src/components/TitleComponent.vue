<script setup lang="ts">
const props = defineProps<{
  text: string
}>()

</script>

<template>
  <transition name="title" appear>
    <h1>{{ props.text }}</h1>
  </transition>
</template>


<style lang="scss" scoped>
@import "@/assets/variables.scss";
  h1 {
    color: $spotify-green;
    padding: 2rem 0;
  }

//  transitions
  .title-enter-from {
    opacity: 0;
    transform: translateY(-2rem);
  }
  .title-enter-active {
    transition: all .5s ease;
  }
</style>