<template>
  <div>
    <div class="flex items-center justify-between">
      <h1>BasketPage</h1>
      <div class="flex items-center">
        <el-button type="primary" size="small" @click="isShowDialog">
          Заказать
        </el-button>
        <el-button type="danger" size="small" @click="clearBasketPage">
          Очистить
        </el-button>
      </div>

      <my-order-form v-model="dialogOrder" />
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
    >
      <my-products-card
        v-for="item in products"
        :id="item.id"
        :key="item.id"
        :image="item.image"
        :title="item.title"
        :category="item.category"
        :price="item.price"
        :description="item.description"
        :rating="item.rating"
        :quantity="item.quantity"
        :delete-handler="deleteProduct"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MyProductsCard from "../components/MyProductsCard.vue";
import { computed, ref } from "vue";
import MyOrderForm from "../components/MyOrderForm.vue";
import { Product } from "../store/product.ts";

const dialogOrder = ref<boolean>(false);
const storedProducts = computed(() => localStorage.getItem("basketProducts"));

const products = ref(
  storedProducts.value ? JSON.parse(storedProducts.value) : [],
);

const deleteProduct = (productId: number) => {
  const updatedProducts = products.value.filter(
    (product: Product) => product.id !== productId,
  );
  products.value = updatedProducts;
  localStorage.setItem("basketProducts", JSON.stringify(updatedProducts));
};

function clearBasketPage() {
  products.value = [];
  localStorage.setItem("basketProducts", "");
}

function isShowDialog() {
  dialogOrder.value = !dialogOrder.value;
}
</script>

<style scoped lang="scss" />
