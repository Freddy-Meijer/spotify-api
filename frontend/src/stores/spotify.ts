import { ref } from "vue";
import { defineStore } from "pinia";

export const useSpotifyStore = defineStore('spotify', {
  state: () => ({
    authenticated: false,
    searchString: '',
    searchResults: {},
  }),
  getters: {
    isAuthenticated: (state) => state.authenticated,
    getSearchString: (state) => state.searchString,
    getSearchResults: (state) => state.searchResults,
  }
})