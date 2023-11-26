<template>
  <div class="grid grid-cols-1 gap-y-5">
    <div class="flex items-center justify-between">
      <h1>Products</h1>
      <my-input v-model="search" class="max-w-[300px]" />
    </div>
    <div
      v-if="loading"
      v-loading="loading"
      class="w-screen h-screen"
      element-loading-text="Loading..."
    />
    <div
      v-if="!loading"
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
import { computed, onMounted, ref } from "vue";
import MyInput from "../components/MyInput.vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import { ElMessage } from "element-plus";

const store = useStore();
const router = useRouter();
const loading = ref(false);
const search = ref<string>("");

onMounted(async () => {
  try {
    loading.value = true;
    await store.getProducts();
  } catch (e) {
    ElMessage({
      message: "Что то пошло не так",
      type: "error",
    });
  } finally {
    loading.value = false;
  }
});

const filterTableData = computed(() =>
  store.products.filter(
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
