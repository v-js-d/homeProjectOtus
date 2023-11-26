<template>
  <el-container>
    <el-header>
      <my-header />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>
      <my-footer />
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import MyFooter from "./components/MyFooter.vue";
import MyHeader from "./components/MyHeader.vue";
</script>
<style scoped lang="scss" />
