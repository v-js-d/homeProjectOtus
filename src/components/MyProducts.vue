<template>
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
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string;
  title: string;
  category: string;
  price: number;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}>();
</script>

<style scoped />
