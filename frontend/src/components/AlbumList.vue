<script setup lang="ts">
import type {Obj} from "@popperjs/core";

const props = defineProps<{
  albums: Object;
}>();
</script>

<template>
    <h3>Album list</h3>
  <div class="album-list">
    <div class="album" v-for="album in props.albums" :key="album.id">
      <div class="card">
        <div class="card-img-top">
          <img :src="album.images[0].url" alt="Album cover" class="img-fluid">
        </div>
        <div class="card-body">
          {{ album.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.album-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
}

.card {
  padding: 4px;
  height: 100%;

  .card-body {
    color: $spotify-bg-color;
  }
}
</style>