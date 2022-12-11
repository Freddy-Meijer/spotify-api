<script setup lang="ts">
import TitleComponent from "@/components/TitleComponent.vue";
import SearchSpotifyComponent from "@/components/SearchSpotifyComponent.vue";
import SpotifyComponent from "@/components/SpotifyComponent.vue";

const setResult = (e: Event) => {
  console.log(e)
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <TitleComponent text="HomeView" />
        <SearchSpotifyComponent />
        <SpotifyComponent />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
