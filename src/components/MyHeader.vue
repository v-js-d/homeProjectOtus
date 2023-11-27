<template>
  <div class="flex items-center justify-between py-3">
    <div>
      <h1 v-if="$route.path === '/'">Header</h1>
      <h1 v-else>{{ store.userName }}</h1>
    </div>
    <my-navbar v-if="$route.path !== '/'" />
  </div>
</template>

<script setup lang="ts">
import MyNavbar from "./MyNavbar.vue";
import { useStore } from "../store";
const store = useStore();
</script>

<style scoped lang="scss" />
