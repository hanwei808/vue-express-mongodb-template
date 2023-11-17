<template>
  <div
    class="avatar"
    @click.prevent="gotoUserInfo"
  >
    <span>{{ store.state.user.username }}</span>
    <el-dropdown v-model="subMenuVisible">
      <el-icon :size="20">
        <Avatar />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-link
              :underline="false"
              @click="gotoUserInfo"
            >
              个人中心
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-link
              :underline="false"
              @click="logout"
            >
              退出登录
            </el-link>
          </el-dropdown-item>
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
import { ref, getCurrentInstance, ComponentInternalInstance } from 'vue'

const store = useStore()

let subMenuVisible = ref(false)

const gotoUserInfo = () => {
    if (localStorage.getItem('token')) {
        router.push('/user/user_info')
    } else {
        router.push('/login')
    }
}

const logout = () => {
    localStorage.removeItem('token')
    store.commit('setUser', {})
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    proxy!.$forceUpdate()
    router.push('/')
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