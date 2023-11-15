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
      :rate="item.rating.rate"
      :count="item.rating.count"
    />
  </div>
</template>

<script setup lang="ts">
import MyProducts from "./components/MyProducts.vue";
import json from "../public/products.json";
</script>

<style scoped />
