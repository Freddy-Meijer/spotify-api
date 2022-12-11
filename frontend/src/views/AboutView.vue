<template>
  <main class="about">
    <div class="container">
      <div class="row">
        <div class="col">
          <TitleComponent text="About" />
          <p>This app allows searching spotify either by manually typing your query if speech recognition is not supported, or by using your voice to search for albums and tracks.</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import TitleComponent from "@/components/TitleComponent.vue";
</script>