<template>
  <div class="grid grid-cols-5 gap-5">
    <my-products
      v-for="item in json"
      :key="item.id"
      :image="item.image"
      :title="item.title"
      :category="item.category"
      :price="item.price"
      :description="item.description"
      :rating="item.rating"
    />
  </div>
</template>

<script setup lang="ts">
import MyProducts from "./components/MyProducts.vue";
import json from "./products.json";
</script>
<style scoped />
