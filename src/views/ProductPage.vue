<template>
  <div class="flex items-center justify-center">
    <div
      v-if="loading"
      v-loading="loading"
      class="w-screen h-screen"
      element-loading-text="Loading..."
    />
    <my-products-card
      v-if="projectStore.product && !loading"
      :id="projectStore.product.id"
      class="w-[400px]"
      :image="projectStore.product.image"
      :title="projectStore.product.title"
      :category="projectStore.product.category"
      :price="projectStore.product.price"
      :description="projectStore.product.description"
      :rating="projectStore.product.rating"
    />
  </div>
</template>

<script setup lang="ts">
import MyProductsCard from "../components/MyProductsCard.vue";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStoreProduct } from "../store/product.ts";
import { ElMessage } from "element-plus";
import { ref } from "vue";

const route = useRoute();
const projectStore = useStoreProduct();
const loading = ref(false);

onMounted(() => {
  watch(
    () => route.params.id,
    async (newId) => {
      try {
        loading.value = true;
        await projectStore.getProduct(Number(newId));
      } catch (e) {
        ElMessage({
          message: "Что то пошло не так",
          type: "error",
        });
      } finally {
        loading.value = false;
      }
    },
    { immediate: true },
  );
});
</script>

<style scoped lang="scss" />
