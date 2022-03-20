<template>
  <div class="header">
    <div class="header__logox">Fray</div>
    <div class="header__nav">
        <router-link to="/" class="header__nav__item">Home</router-link>
        <router-link to="/shop" class="header__nav__item">Shop</router-link>
        <router-link to="/contact" class="header__nav__item">Contact</router-link>
    </div>
    <div class="header__extra">
      <router-link to="/checkout" class="header__nav__item">
        <b-icon-cart />
      </router-link>
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
  justify-content: space-between;
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
