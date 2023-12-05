<template>
  <div class="app-menu">
    <el-menu
      active-text-color="rgb(29, 147, 171)"
      background-color="#fafafa"
      class="el-menu-vertical-demo"
      default-active="2"
      @open="handleOpen"
      @close="handleClose"
      :collapse="$store.state.isCollapse"
      router
    >
      <el-menu-item index="/">
        <el-icon><House /></el-icon>
        <span>首页</span>
      </el-menu-item>
  
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Operation /></el-icon>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/permission/permission_admin">
          管理员列表
        </el-menu-item>
        <el-menu-item index="/permission/permission_role">
          角色列表
        </el-menu-item>
        <el-menu-item index="/permission/permission_rule">
          规则列表
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
    
  <script lang="ts" setup>
    import {
      House,
      Operation,
    } from '@element-plus/icons-vue'
  
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
  </script>
  
  <style lang="scss" scoped>
  .el-menu {
      border-right: none;
      height: 100%;
      box-shadow: 5px 0 5px -5px rgba(0, 0, 0, 0.2);
  }
  .el-menu:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  </style>