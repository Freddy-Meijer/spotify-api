<script setup lang="ts">
import axios from "axios";
import { onBeforeMount, ref, watch } from "vue";
import { useSpotifyStore } from "@/stores/spotify";
import ListItems from "@/components/ListItems.vue";

const spotifyStore = useSpotifyStore();

const accessToken = ref<string>("");
const refreshToken = ref<string>("");

const getUser = async (token: string) => {
  try {
  const { data } = await axios.post('http://localhost:3000/api/user', {token})
  spotifyStore.$patch({
    user: data,
  })
  } catch (e) {
    console.warn("unable to fetch user data", e)
  }
}

const search = async (searchString: string) => {
  const Q = `?q=${searchString}&type=album,artist,track&limit=20`;
  try {
    const { data } = await axios.get("https://api.spotify.com/v1/search" + Q, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        "Content-Type": "application/json",
      },
    });
    if (data) {
      spotifyStore.$patch({
        searchResults: data,
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
    const { data } = await axios.post("http://localhost:3000/api/refresh_token", {
      refresh_token: refreshToken,
    });
    accessToken.value = data.access_token;
    console.info("successfully updated token");
    return true;
  } catch (e) {
    console.error("error updating token: ", e.error.message);
    return false;
  }
};

watch(() => spotifyStore.searchString, (oldValue: string, newValue: string) => {
  if (spotifyStore.searchString && oldValue !== newValue) search(spotifyStore.searchString)
})

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
    await getUser(accessToken.value);
    spotifyStore.$patch({
      authenticated: true,
    });
  } else {
    spotifyStore.$patch({
      authenticated: false,
    })
  }
});
</script>

<template>
  <div id="spotify">
    <ListItems type="" :items="spotifyStore.getSearchResults" />
  </div>
</template>

<style lang="scss" scoped></style>
