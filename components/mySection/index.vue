<template>
  <section :class="classes">
    <slot />
  </section>
</template>

<script lang="ts" setup>
  const classes = computed(() => [
    'section',
  ])
</script>
