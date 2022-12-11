<script setup lang="ts">
import TitleComponent from "@/components/TitleComponent.vue";
import SearchSpotifyComponent from "@/components/SearchSpotifyComponent.vue";
import SpotifyComponent from "@/components/SpotifyComponent.vue";
import {useSpotifyStore} from "@/stores/spotify";

const spotifyStore = useSpotifyStore()
</script>

<template>
  <transition appear name="components">
    <div class="container">
      <div class="row">
        <div class="col">
          <TitleComponent text="Home"/>
          <p v-if="!spotifyStore.isAuthenticated">Login to spotify to start your search</p>
          <p v-else>You're all set, lets do some searches</p>
          <SearchSpotifyComponent v-if="spotifyStore.authenticated"/>
          <SpotifyComponent/>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.components-enter-from {
  opacity: 0;
}

.components-enter-active {
  transition: all .3s ease;
}
</style>
