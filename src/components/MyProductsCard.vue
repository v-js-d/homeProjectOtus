<template>
  <el-card class="cursor-pointer">
    <div class="flex flex-col gap-y-1 p-3">
      <div
        class="h-[200px] bg-neutral-200 p-3 rounded flex items-center justify-center"
      >
        <img class="h-full rounded" :src="image" alt="img" />
      </div>
      <span>{{ title }}</span>
      <span class="text-sm">category: {{ category }}</span>
      <span>{{ price }}</span>
      <span class="text-sm">description: {{ description }}</span>
      <div class="flex items-center justify-between text-sm">
        <span>rate: {{ rating.rate }}</span>
        <span>count: {{ rating.count }}</span>
      </div>
      <el-input-number
        v-model="quantity"
        :min="0"
        @click.stop
        @change="updateQuantity"
      />
      <el-button
        :disabled="quantity <= 0"
        type="primary"
        @click.stop="getProduct(props, quantity)"
      >
        В корзину
      </el-button>
      <el-button
        v-if="$route.path === '/basket-page'"
        class="!ml-0"
        type="danger"
        @click.stop="deleteHandler?.(id)"
      >
        Удалить
      </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Product } from "../store/product.ts";

const props = defineProps<{
  id: number;
  image: string;
  title: string;
  category: string;
  price: number;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity?: number;
  deleteHandler?: (productId: number) => void;
}>();

const quantity = ref<number>(props.quantity ? Number(props.quantity) : 0);

const updateQuantity = (value: number | undefined) => {
  if (value) {
    quantity.value = value;
  }
};

// TODO: нужно как будет время переделать все через стор
const getProduct = (item: Product, qty: number) => {
  const productWithQuantity = {
    ...item,
    quantity: qty,
  };
  const storedProducts = localStorage.getItem("basketProducts");
  const existingProducts = ref<Array<Product>>(
    storedProducts ? JSON.parse(storedProducts) : [],
  );
  if (existingProducts.value) {
    const product = existingProducts.value.find((el) => el.id === item.id);
    if (product) {
      // TODO: нужно будет доделать чтобы колличество productWithQuantity складывалось
      return;
    } else {
      const updatedProducts = [...existingProducts.value, productWithQuantity];
      localStorage.setItem("basketProducts", JSON.stringify(updatedProducts));
    }
  }
};
</script>

<style scoped lang="scss" />
