<template>
  <div class="flex items-center justify-center">
    <my-products-card
      v-if="product"
      :id="product.id"
      class="w-[400px]"
      :image="product.image"
      :title="product.title"
      :category="product.category"
      :price="product.price"
      :description="product.description"
      :rating="product.rating"
    />
  </div>
</template>

<script setup lang="ts">
import MyProductsCard from "../components/MyProductsCard.vue";
import axios from "axios";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
}

const route = useRoute();
const product = ref<Product>();

onMounted(() => {
  watch(
    () => route.params.id,
    async (newId) => {
      try {
        const res = await axios.get(
          `https://fakestoreapi.com/products/${newId}`,
        );
        product.value = res.data;
      } catch (e) {
        ElMessage({
          message: "Что то пошло не так",
          type: "error",
        });
      }
    },
    { immediate: true },
  );
});
</script>

<style scoped lang="scss" />
