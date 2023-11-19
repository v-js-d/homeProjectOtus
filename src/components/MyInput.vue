<template>
  <el-input
    v-model="text"
    size="small"
    placeholder="Поиск ..."
    :prefix-icon="Search"
    class="w-[180px] ml-3"
  />
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { computed } from "vue";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const text = computed({
  get() {
    return props.modelValue;
  },
  set(nv) {
    return emit("update:modelValue", nv);
  },
});
</script>

<style scoped></style>
