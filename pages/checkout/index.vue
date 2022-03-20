<template>
  <div class="checkout mt-5">
    <div class="checkout__products">
      <b-row class="checkout__products__product" v-for="product in products" :key="product.product.title">
        <b-col cols="3">
          <img :src="product.product.images[0].src" alt="" class="checkout__products__product__image" />
        </b-col>
        <b-col cols="7">
          <div class="checkout__products__product__title">{{ product.product.title }}</div>
          <small class="checkout__products__product__desc">{{ product.product.description || 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate vitae eum quibusdam in voluptatem? Expedita blanditiis culpa sunt at, labore tempora placeat. Quos, libero nulla quae reiciendis tempora velit earum.' }}</small>
        </b-col>
        <b-col cols="2" class="d-flex align-items-center">
          <b-form-input size="sm" type="number" v-model="product.amount" class="checkout__products__product__amount" />
          <b-button
            size="sm"
            class="checkout__products__product__remove"
            variant="outline-danger"
            @click="() => remove(product.product.id)"
          >
            <b-icon-x />
          </b-button>
        </b-col>
      </b-row>
    </div>

    <b-row class="justify-content-end">
      <b-button variant="primary" class="checkout__submit" @click="submit">Pay now!</b-button>
    </b-row>

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
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import { mapMutations } from 'vuex'

export default {
  components: {
    StripeCheckout
  },
  data() {
    this.publishableKey = process.env.stripePublishableKey;

    return {
      loading: false,
      successURL: window.location.href + '/status?status=success',
      cancelURL: window.location.href + '/status?status=error',
    };
  },
  methods: {
    submit () {
      this.$refs.checkoutRef.redirectToCheckout();
    },
    ...mapMutations({
      remove: 'checkout/remove'
    })
  },
  computed: {
    products () {
      return this.$store.state.checkout.products
    },
    checkoutProducts () {
      return this.products.map(
        ({ stripePriceId, amount }) => ({ price: stripePriceId || 'asdasdasd', quantity: amount })
      )
    }
  }
}
</script>

<style lang="scss">
.checkout {}

.checkout__products {
  margin-bottom: 1rem;
}

.checkout__products__product {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.checkout__products__product__image {
  display: block;
  width: 100%;
  max-height: 160px;
  object-fit: cover;
  object-position: center;
}


.checkout__products__product__title {
  margin-bottom: 1rem;
}

.checkout__products__product__desc {}

.checkout__products__product__amount {
  min-width: 50px;
  width: 50px;
}

.checkout__products__product__remove {}

</style>
