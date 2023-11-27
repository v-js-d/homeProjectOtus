<template>
  <nav class="flex items-center gap-x-3">
    <router-link :to="{ name: 'ProductsPage' }"> Products </router-link>
    <router-link :to="{ name: 'CreateProductPage' }">
      Create Product
    </router-link>
    <router-link :to="{ name: 'BasketPage' }"> BasketPage </router-link>
    <router-link :to="{ name: 'LoginPage' }" @click="logOut">
      Log Out
    </router-link>
  </nav>
</template>

<script setup lang="ts">
function logOut() {
  sessionStorage.setItem("token", "");
}
</script>

<style scoped lang="scss" />
