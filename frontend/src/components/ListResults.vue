<script setup lang="ts">
import AlbumList from "@/components/AlbumList.vue";

const props = defineProps<{
  results: object;
}>();
</script>

<template>
  <section id="results">
    <AlbumList :albums="props.results.albums.items" />
  </section>
</template>

<style lang="scss" scoped>
#results {

}
</style>