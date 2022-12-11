<template>
  <main class="about">
    <div class="container">
      <div class="row">
        <div class="col">
          <TitleComponent text="AboutView" />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@import '@/assets/variables.scss';
.about {
}
</style>
<script setup lang="ts">
import TitleComponent from "@/components/TitleComponent.vue";
</script>