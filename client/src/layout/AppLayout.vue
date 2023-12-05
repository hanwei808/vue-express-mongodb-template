<template>
  <el-container class="container">
    <AppMenu />
    <el-container>
      <AppHeader />
      <el-main>
        <RouterView />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AppHeader from '@/layout/components/AppHeader/index.vue'
import AppMenu from '@/layout/components/AppMenu/index.vue'
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
}
.el-footer {
  border-top: solid 1px #bebebe;
}
</style>