<template>
  <el-container>
    <el-header class="flex items-center justify-between">
      <h1>Header</h1>
      <div class="flex items-center">
        <el-button type="primary" size="small" @click="isShowDialog('create')">
          Создать
        </el-button>
        <el-button type="primary" size="small" @click="isShowDialog('order')">
          Заказать
        </el-button>
        <my-input v-model="search" />
      </div>
      <my-order-form v-model="dialogOrder" />
      <my-create-product v-model="dialogCreateProduct" />
    </el-header>
    <el-main>
      <div
        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
      >
        <my-products
          v-for="item in filterTableData"
          :key="item.id"
          :image="item.image"
          :title="item.title"
          :category="item.category"
          :price="item.price"
          :description="item.description"
          :rating="item.rating"
        />
      </div>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script setup lang="ts">
import MyProducts from "./components/MyProducts.vue";
import axios from "axios";
import { onMounted, ref, computed } from "vue";
import MyOrderForm from "./components/MyOrderForm.vue";
import MyInput from "./components/MyInput.vue";
import MyCreateProduct from "./components/MyCreateProduct.vue";

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
    console.log(e);
  }
});

const products = ref<Product[]>([]);
const search = ref<string>("");
const dialogOrder = ref<boolean>(false);
const dialogCreateProduct = ref<boolean>(false);

const filterTableData = computed(() =>
  products.value.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase()) ||
      data.price.toString().toLowerCase().includes(search.value.toLowerCase()),
  ),
);

function isShowDialog(el: string) {
  if (el === "order") {
    dialogOrder.value = !dialogOrder.value;
  }
  if (el === "create") {
    dialogCreateProduct.value = !dialogCreateProduct.value;
  }
}
</script>
<style scoped lang="scss" />
