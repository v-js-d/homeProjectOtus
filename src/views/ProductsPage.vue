<template>
  <div class="grid grid-cols-1 gap-y-5">
    <div class="flex items-center justify-between">
      <h1>Products</h1>
      <my-input v-model="search" class="max-w-[300px]" />
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
    >
      <my-products-card
        v-for="item in filterTableData"
        :id="item.id"
        :key="item.id"
        :image="item.image"
        :title="item.title"
        :category="item.category"
        :price="item.price"
        :description="item.description"
        :rating="item.rating"
        @click="handleClick(item.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MyProductsCard from "../components/MyProductsCard.vue";
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import MyInput from "../components/MyInput.vue";
import { useRouter } from "vue-router";
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

onMounted(async () => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    products.value = res.data;
  } catch (e) {
    ElMessage({
      message: "Что то пошло не так",
      type: "error",
    });
  }
});

const router = useRouter();
const products = ref<Product[]>([]);
const search = ref<string>("");

const filterTableData = computed(() =>
  products.value.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase()) ||
      data.price.toString().toLowerCase() === parseInt(search.value).toString(),
  ),
);

const handleClick = (id: number) => {
  router.push(`product/${id}`);
};
</script>

<style scoped lang="scss" />
