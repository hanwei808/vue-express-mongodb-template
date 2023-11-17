<template>
  <div class="app-header">
    <div class="left">
      <ToggleSidebar />
      <Breadcrumb />
    </div>
    <div class="right">
      <Avatar />
      <FullScreen />
    </div>
  </div>
</template>

<script setup lang="ts">

import ToggleSidebar from './ToggleSidebar.vue';
import Breadcrumb from './Breadcrumb.vue'
import FullScreen from './FullScreen.vue'
import Avatar from './Avatar.vue';
</script>

<style lang="scss" scoped>
.app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    .left,.right {
        display: flex;
        align-items: center;
    }
}
</style>