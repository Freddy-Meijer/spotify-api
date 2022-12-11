<script setup lang="ts">
import axios from "axios";
import {onBeforeMount, ref, watch} from "vue";
import { useSpotifyStore } from "@/stores/spotify";
import ListResults from "@/components/ListResults.vue";

const spotifyStore = useSpotifyStore();

const accessToken = ref<string>("");
const refreshToken = ref<string>("");

const login = () => {
  location.href = "http://localhost:3000/spotify_login";
};

const search = async (searchString: string) => {
  const Q = `?q=${searchString}&type=album,artist,track&limit=20`;
  try {
    const results = await axios.get("https://api.spotify.com/v1/search" + Q, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        "Content-Type": "application/json",
      },
    });
    if (results) {
      spotifyStore.$patch({
        spotifySearchResults: results.data
      })
    }
  } catch (error: any) {
    console.log(error);
    if (error.response.data.error.status === 401) {
      const updated = await updateToken();
      if (updated) {
        await search(searchString);
      }
    }
  }
};

const updateToken = async () => {
  console.info("refreshing token");
  try {
    const newToken = await axios.post("http://localhost:3000/refresh_token", {
      refresh_token: refreshToken,
    });
    accessToken.value = newToken.data.access_token;
    console.info("successfully updated token");
    return true;
  } catch (e) {
    console.error("error updating token: ", e);
    return false;
  }
};

watch(spotifyStore.getSearchString(), (value) => {
  search(value)
});

onBeforeMount(async () => {
  if (document.cookie.includes("spotify=")) {
    const cookies = document.cookie;
    const spotify = JSON.parse(
      decodeURIComponent(
        cookies.substring(cookies.indexOf("spotify=") + "spotify=".length)
      )
    );
    accessToken.value = spotify.access_token;
    refreshToken.value = spotify.refresh_token;
    spotifyStore.$patch({
      isAuthenticated: true,
    });
  }
});
</script>

<template>
  <div id="spotify">
    <h2>SpotifySearch</h2>
    <div
      class="btn btn-primary"
      v-if="!spotifyStore.isAuthenticated"
      @click="login"
    >
      Login to Spotify
    </div>
    <ListResults
      :results="spotifyStore.spotifySearchResults"
      v-if="Object.keys(spotifyStore.spotifySearchResults).length"
    />
  </div>
</template>

<style lang="scss" scoped></style>
