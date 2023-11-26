<template>
  <div class="flex items-center justify-between py-3">
    <h1>Header</h1>
    <my-navbar v-if="$route.path !== '/'" />
  </div>
</template>

<script setup lang="ts">
import MyNavbar from "./MyNavbar.vue";
</script>

<style scoped lang="scss" />
