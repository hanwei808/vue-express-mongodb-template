<template>
  <div>{{ data }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { currentUser } from '../../../api/user'

const data = ref({})

onMounted(async () => {
    const { error, response } = await currentUser()
    data.value = {
        error,
        response
    }
})



</script>