<template>
  <div class="app-header">
    <div class="left">
      <ToggleSidebar />
      <Breadcrumb />
    </div>
    {{ '用户：' + store?.state?.user?.username }}
    <div class="right">
      <FullScreen />
      <el-button
        :icon="Avatar"
        circle
        @click="gotoLogin"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
    Avatar
  } from '@element-plus/icons-vue'
import ToggleSidebar from './ToggleSidebar.vue';
import Breadcrumb from './Breadcrumb.vue'
import FullScreen from './FullScreen.vue'
import router from '@/router/index';
import { useStore } from '@/store'
const store = useStore()

const gotoLogin = () => {
  if (localStorage.getItem('token')) {
    router.push('/user/user_info')
  } else {
    router.push('/login')
  }
}
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