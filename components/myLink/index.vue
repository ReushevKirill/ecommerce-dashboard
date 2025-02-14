<template>
  <NuxtLink>
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { NuxtLinkProps } from '#app';

  const props = defineProps<NuxtLinkProps>()
</script>
