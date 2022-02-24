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
      <button class="checkout__submit" @click="submit">Pay now!</button>
    </div>

    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="checkoutProducts"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="v => loading = v"
    />
  </div>
</template>

<script>
export default {
  data() {
    this.publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

    return {
      products: [],
      loading: false,
      successURL: window.location.href + '/status?status=success',
      cancelURL: window.location.href + '/status?status=error',
    };
  },
  methods: {
    submit () {
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
  computed: {
    checkoutProducts: () => {
      return products.map(
        ({ stripePriceId, amount }) => ({ price: stripePriceId, quantity: amount })
      )
    }
  }
}
</script>

<style lang="scss">
.products {
  display: flex;
}
</style>
