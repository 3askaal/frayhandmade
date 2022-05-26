<template>
  <div class="section">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.section {
  margin-top: 8rem;
  margin-bottom: 8rem;

  &.video {
    display: none;
  }
}
</style>
