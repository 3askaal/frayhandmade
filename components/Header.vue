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
        <span class="header__nav__item__indicator" v-if="this.$store.state.checkout.products.length">
          {{ this.$store.state.checkout.products.length }}
        </span>
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
  font-size: 3rem;
}

.header__nav {
  text-transform: uppercase;
}

.header__nav__item {
  position: relative;
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

.header__nav__item__indicator {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $primary;
  width: 28px;
  height: 28px;
  top: calc(100% + .5rem);
  left: calc(100% + .5rem);
  border-radius: 100%;
  font-size: .75rem;
  color: $white;
}
</style>
