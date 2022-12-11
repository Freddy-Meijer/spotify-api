<script setup lang="ts"></script>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="row">
        <div class="col d-flex align-items-center">
          <div class="navbar-brand">
            <img src="@/assets/images/svg/spotify-logo.svg" alt="spotify-logo">
          </div>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.navbar {
  .navbar-brand {
    max-width: 200px;

    img {
      max-width: 100%;
    }
  }

  .nav-link {
    padding: .5rem 1rem;
    margin-left: .5rem;
    color: #FFF;
  }
  .router-link {
    border-bottom: 2px solid transparent;
  }
  .router-link-active {
    border-bottom: 2px solid $spotify-green;
  }
}
</style>