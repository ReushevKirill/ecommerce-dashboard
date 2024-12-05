<script lang="ts" setup>
  const route = useRoute()
  const router = useRouter()
</script>

<template>
  <button @click="router.back()">Назад</button>
  <div class="product">
    <h1>Product {{ route.params.id }}</h1>
  </div>
</template>