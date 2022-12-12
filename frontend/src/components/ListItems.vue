<script setup lang="ts">
const props = defineProps<{
  items: object;
}>();

import { useSpotifyStore } from "@/stores/spotify";

const spotifyStore = useSpotifyStore();

const getImgSrc = (key: string, item: object) => {
  switch (key) {
    case "tracks":
      if (item.album.images.length) {
        return item.album.images[0].url;
      }
      return "";
    default:
      if (item.images.length) {
        return item.images[0].url;
      }
      return "";
  }
};
</script>

<template>
  <div id="list-items" v-if="Object.keys(items).length">
    <h2 class="header">
      Results for <span>{{ spotifyStore.searchString }}</span>
    </h2>
    <div class="d-flex flex-column justify-content-evenly">
      <template v-for="key in Object.keys(props.items)" :key="key">
        <h3 class="key">{{ key }}</h3>

        <transition-group class="wrapper" name="wrapper" tag="div" appear>
          <div
            class="card"
            v-for="item in props.items[key].items"
            :key="item.id"
          >
            <div class="card-img-top">
              <img :src="getImgSrc(key, item)" alt="" class="img-fluid" />
            </div>
            <div class="card-body">
              {{ item.name }}
            </div>
          </div>
        </transition-group>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

#list-items {
  .header {
    margin-bottom: 2rem;

    span {
      color: $spotify-green;
    }
  }

  .key {
    text-transform: capitalize;
    border-bottom: 1px solid $spotify-green;
    padding-bottom: 0.5rem;
    margin-bottom: 2rem;
  }

  .wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    margin-bottom: 2rem;
  }

  .card {
    .card-img-top {
      padding: 5px;
      img {
        border-radius: 5px;
      }
    }
    .card-body {
      color: #333;
    }
  }
}

.wrapper-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.wrapper-enter-active {
  transition: all 1s ease;
}
</style>
