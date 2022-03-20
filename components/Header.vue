<template>
  <div class="header">
    <!-- <div class="header__logo">Fray Handmade</div> -->
    <div class="header__nav">
      <div class="header__nav__links">
        <a href="/" class="header__nav__item">Home</a>
        <a href="/shop" class="header__nav__item">Shop</a>
        <a href="/contact" class="header__nav__item">Contact</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: $spacer * 4;
  z-index: 100;
}

.header__logo {
  // font-family: $font-logo;
  font-size: 3rem;
  // margin-bottom: 2rem;
}

.header__nav {
  text-transform: uppercase;
}

.header__nav__item {
  color: $black;
  letter-spacing: .125rem;

  &:hover {
    text-decoration: unset;
    padding-bottom: .5rem;
    border-bottom: 1px solid $primary;
  }

  +.header__nav__item {
    margin-left: 4rem;
  }
}
</style>
