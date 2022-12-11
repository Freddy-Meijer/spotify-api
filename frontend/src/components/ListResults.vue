<script setup lang="ts">
import AlbumList from "@/components/AlbumList.vue";
import TracksList from "@/components/TracksList.vue";

const props = defineProps<{
  results: object;
}>();
</script>

<template>
  <section id="results">
    <AlbumList :albums="props.results.albums.items" />
    <TracksList :tracks="props.results.tracks.items" />
  </section>
</template>

<style lang="scss" scoped>
#results {

}
</style>