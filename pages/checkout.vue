<template>
  <div class="container">
    <div class="checkout">
      <div class="checkout__products">
        <div class="checkout__products__product">
          <div class="checkout__products__product__image"></div>
          <div class="checkout__products__product__title"></div>
          <div class="checkout__products__product__amount"></div>
          <div class="checkout__products__product__remove"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
  },
  data() {
    return {
      products: []
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.products {
  display: flex;
}
</style>
