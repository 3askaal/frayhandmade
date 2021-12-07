<template>
  <div class="header">
    <div class="header__logo">Fray Handmade</div>
    <div class="header__nav">
      <a href="/" class="header__nav__item">Home</a>
      <a href="/shop" class="header__nav__item">Shop</a>
      <a href="/contact" class="header__nav__item">Contact</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: $spacer * 2;
}

.header__logo {
  // font-family: $font-logo;
  font-size: 3rem;
  // margin-bottom: 2rem;
}

.header__nav {
  display: none;
}

.header__nav__item {
  +.header__nav__item {
    margin-left: 1rem;
  }
}
</style>
