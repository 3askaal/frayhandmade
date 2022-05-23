<template>
  <component
    :is="type"
    class="button"
    :to="to"
    :class="{
      'button--block': block,
      [`button--${size}`]: size,
    }"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    },
    to: {
      type: String
    },
    block: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'm'
    },
  }
}
</script>

<style lang="scss" scoped>
.button {
  border: 0;
  outline: 0;
  border: 1px solid $primary;
  background-color: transparent;
  color: $primary;
  border-radius: 1px;

  &:hover {
    background-color: $primary;
    color: $white;
  }

  &--block {
    width: 100%;
  }

  &--s {
    padding: $spacer * .25 $spacer * .75;
  }

  &--m {
    padding: $spacer * .5 $spacer * 1;
  }

  &--l {
    padding: $spacer * .75 $spacer * 1.5;
  }
}
</style>
