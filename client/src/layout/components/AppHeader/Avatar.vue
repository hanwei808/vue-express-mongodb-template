<template>
  <div
    class="avatar"
    @click="gotoUserInfo"
  >
    <span>{{ store.state.user.username }}</span>
    <el-dropdown v-model="subMenuVisible">
      <el-icon :size="20">
        <Avatar />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>更多</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import {
    Avatar
  } from '@element-plus/icons-vue'
import router from '@/router/index';
import { useStore } from '@/store'
import { ref } from 'vue'

const store = useStore()

let subMenuVisible = ref(false)

const gotoUserInfo = () => {
    if (localStorage.getItem('token')) {
    router.push('/user/user_info')
  } else {
    router.push('/login')
  }
    
}
</script>

<style scoped lang="scss">
.avatar {
    margin-right: 16px;
    cursor: pointer;
}
.avatar:hover {
    color: #409eff;
}
.avatar>span {
    margin-right: 8px;
}
</style>