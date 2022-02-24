<template>
  <div class="checkout mt-5">
    <div class="checkout__products">
      <b-row class="checkout__products__product" v-for="product in products" :key="product.title">
        <b-col cols="3">
          <img :src="product.image" alt="" class="checkout__products__product__image" />
        </b-col>
        <b-col cols="7">
          <div class="checkout__products__product__title">{{ product.title }}</div>
          <small class="checkout__products__product__desc">{{ product.desc.slice(0, 100) }}</small>
        </b-col>
        <b-col cols="2" class="d-flex align-items-center">
          <b-form-input size="sm" type="number" v-model="product.amount" class="checkout__products__product__amount" />
          <b-button size="sm" class="checkout__products__product__remove" variant="outline-danger">
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

export default {
  components: {
    StripeCheckout
  },
  data() {
    this.publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

    return {
      products: [
        {
          image: 'https://picsum.photos/600/900',
          title: 'Product 1',
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet fuga tempore omnis? Voluptas corrupti sapiente ipsam unde libero, dolorem itaque rerum quis consequatur at exercitationem ea perferendis. Assumenda, soluta nulla.',
          amount: 1
        },
        {
          image: 'https://picsum.photos/600/900',
          title: 'Product 1',
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet fuga tempore omnis? Voluptas corrupti sapiente ipsam unde libero, dolorem itaque rerum quis consequatur at exercitationem ea perferendis. Assumenda, soluta nulla.',
          amount: 2
        },
      ],
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
    checkoutProducts () {
      return this.products.map(
        ({ stripePriceId, amount }) => ({ price: stripePriceId, quantity: amount })
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
