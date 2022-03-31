<template>
  <div class="section">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.section {
  margin-top: 8rem;

  &.video {
    display: none;
  }
}
</style>
