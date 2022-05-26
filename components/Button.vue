<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    :class="{
      'button': true,
      'button--block': block,
      'button--disabled': disabled,
      [`button--${size}`]: size,
      [`button--${state}`]: state,
    }"
    @click="!to && $emit('click')"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'm'
    },
    state: {
      type: String
    },
    to: {
      type: String
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
  text-decoration: none;
  user-select: none;

  &:hover {
    background-color: $primary;
    color: $white;
  }

  &--block {
    display: block;
    text-align: center;
    width: 100%;
  }

  &--disabled {
    opacity: .6;
    pointer-events: none;
  }

  &--success {
    border-color: $success;
    color: $success;

    &:hover {
      background-color: $success;
    }
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
