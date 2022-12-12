<script setup lang="ts">
import {RouterView} from "vue-router";
import NavigationComponent from "@/components/NavigationComponent.vue";
</script>

<template>
  <div id="wrapper">
    <NavigationComponent/>
    <RouterView/>
  </div>
</template>

<style scoped></style>
