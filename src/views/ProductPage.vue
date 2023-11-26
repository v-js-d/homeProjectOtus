<template>
  <div class="flex items-center justify-center">
    <div
      v-if="loading"
      v-loading="loading"
      class="w-screen h-screen"
      element-loading-text="Loading..."
    />
    <my-products-card
      v-if="store.product && !loading"
      :id="store.product.id"
      class="w-[400px]"
      :image="store.product.image"
      :title="store.product.title"
      :category="store.product.category"
      :price="store.product.price"
      :description="store.product.description"
      :rating="store.product.rating"
    />
  </div>
</template>

<script setup lang="ts">
import MyProductsCard from "../components/MyProductsCard.vue";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "../store";
import { ElMessage } from "element-plus";
import { ref } from "vue";

const route = useRoute();
const store = useStore();
const loading = ref(false);

onMounted(() => {
  watch(
    () => route.params.id,
    async (newId) => {
      try {
        loading.value = true;
        await store.getProduct(Number(newId));
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
