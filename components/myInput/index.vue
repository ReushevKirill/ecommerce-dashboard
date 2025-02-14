<template>
  <div class="input">
    <div v-if="$slots.icon" class="input__icon">
      <slot name="icon" />
    </div>
    <input class="input__item" v-bind="$attrs">
  </div>
</template>

<script lang="ts" setup>
</script>
