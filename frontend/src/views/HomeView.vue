<script setup lang="ts">
import TitleComponent from "@/components/TitleComponent.vue";
import SearchSpotifyComponent from "@/components/SearchSpotifyComponent.vue";
import SpotifyComponent from "@/components/SpotifyComponent.vue";
import { useSpotifyStore } from "@/stores/spotify";

const spotifyStore = useSpotifyStore();
</script>

<template>
  <transition appear name="components">
    <div class="container">
      <div class="row">
        <div class="col">
          <TitleComponent text="Home" />

          <p v-if="!spotifyStore.isAuthenticated">
            Login to spotify to start your search
          </p>

          <template v-else>
            <h3>
              Welcome back
              {{
                spotifyStore.user.display_name
                  ? spotifyStore.user.display_name
                  : spotifyStore.user.email
              }}!
            </h3>
            <p>Lets do some searches</p>
          </template>
          <SearchSpotifyComponent v-if="spotifyStore.authenticated" />
          <SpotifyComponent />
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.switch-enter-from {
  opacity: 0;
  transform: rotateY(90deg);
}

.components-enter-from {
  opacity: 0;
}

.components-enter-active,
.switch-enter-active {
  transition: all 1s ease;
}
</style>
