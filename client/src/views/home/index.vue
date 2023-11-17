<script setup lang="ts">
  import { onMounted } from 'vue'
  import router from '@/router/index'

  onMounted(() => {
    if (!localStorage.getItem('token')) router.push('/login')
  })
</script>

<template>
  <h1>首页</h1>
</template>
