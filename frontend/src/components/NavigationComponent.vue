<script setup lang="ts">
import { useSpotifyStore } from "@/stores/spotify";

const spotifyStore = useSpotifyStore();

const handleClick = () => {
  if (spotifyStore.isAuthenticated) {
    document.cookie =
      "spotify=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    spotifyStore.$reset();
  } else {
    window.location.href = "http://localhost:3000/spotify_login";
  }
};
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="row">
        <div class="col d-flex align-items-center">
          <div class="navbar-brand">
            <img
              src="@/assets/images/svg/spotify-logo.svg"
              alt="spotify-logo"
            />
          </div>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
          </ul>
          <button class="btn btn-primary" @click="handleClick">
            {{
              spotifyStore.isAuthenticated
                ? "Logout of Spotify"
                : "Login to Spotify"
            }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.container {
  position: relative;
  button {
    position: absolute;
    right: 0;
  }
}
.navbar {
  .navbar-brand {
    max-width: 200px;

    img {
      max-width: 100%;
    }
  }

  .nav-link {
    padding: 0.5rem 1rem;
    margin-left: 0.5rem;
    color: #fff;
  }

  .router-link {
    border-bottom: 2px solid transparent;
  }

  .router-link-active {
    border-bottom: 2px solid $spotify-green;
  }
}
</style>
