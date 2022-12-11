import { ref } from "vue";
import { defineStore } from "pinia";

export const useSpotifyStore = defineStore("spotify-store", () => {
  const searchString = ref<string>("");
  const isAuthenticated = ref<boolean>(false);
  const spotifySearchResults = ref<object>({});

  const getSearchString = () => searchString;
  const getSpotifySearchResults = () => spotifySearchResults;

  return {
    searchString,
    isAuthenticated,
    spotifySearchResults,
    getSearchString,
    getSpotifySearchResults,
  };
});
