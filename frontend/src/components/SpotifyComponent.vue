<script setup lang="ts">
import axios from "axios";
import { onBeforeMount, ref, watchEffect } from "vue";
import { useSpotifyStore } from "@/stores/spotify";
import ListItems from "@/components/ListItems.vue";

const spotifyStore = useSpotifyStore();

const accessToken = ref<string>("");
const refreshToken = ref<string>("");

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
        searchResults: results.data,
      });
    }
  } catch (error: any) {
    console.warn("Unable to get results:", error);
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

watchEffect(() => {
  const searchString = spotifyStore.getSearchString;
  if (searchString !== "") search(searchString);
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
      authenticated: true,
    });
  }
});
</script>

<template>
  <div id="spotify">
    <ListItems type="" :items="spotifyStore.getSearchResults" />
  </div>
</template>

<style lang="scss" scoped></style>
