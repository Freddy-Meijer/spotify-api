<script setup lang="ts">
const props = defineProps<{
  tracks: Object;
}>();
</script>

<template>
  <div id="tracks-list">
    <h3>Track list</h3>
    <div class="list">
      <div class="album" v-for="track in props.tracks" :key="track.id">
        <div class="card">
          <div class="card-img-top">
            <img :src="track.album.images[0].url" alt="Album cover" class="img-fluid">
          </div>
          <div class="card-body">
            {{ track.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

#tracks-list {
  margin: 2rem 0;
  padding-top: 1rem;
  border-top: 1px solid $spotify-green ;
  .list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;

    .card {
      padding: 4px;
      height: 100%;

      .card-body {
        color: $spotify-bg-color;
      }
    }
  }
}

</style>