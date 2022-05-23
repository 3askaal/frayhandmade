<template>
  <div class="checkout mt-5">
    <div class="checkout__form">
      <b-row>

        <b-col cols="6">
          <b-input v-model="checkout.name" />
        </b-col>
        <b-col cols="6">
          <b-input v-model="checkout.lastName" />
        </b-col>

        <b-col cols="6">
          <b-input v-model="checkout.streetAddress" />
        </b-col>
        <b-col cols="6">
          <b-input v-model="checkout.houseNumber" />
        </b-col>

        <b-col cols="6">
          <b-input v-model="checkout.postalCode" />
        </b-col>
        <b-col cols="6">
          <b-input v-model="checkout.country" />
        </b-col>

        <b-col cols="6">
          <b-input v-model="checkout.email" />
        </b-col>
        <b-col cols="6">
          <b-input v-model="checkout.phoneNumber" />
        </b-col>

      </b-row>
    </div>

    <b-row class="justify-content-end" v-if="products.length">
      <b-col cols="5">
        <div class="d-flex justify-content-between mb-4">
          <p><strong>Subtotal:</strong></p>
          <p><strong>{{ subTotal }}</strong></p>
        </div>

        <Button block variant="primary" class="checkout__submit" @click="submit">Checkout</Button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.stripePublishableKey)

export default {
  components: {
    StripeCheckout
  },
  data() {
    return {
      checkout: {
        name: '',
        lastName: '',
        streetAddress: '',
        houseNumber: '',
        postalCode: '',
        country: '',
        email: '',
        phoneNumber: ''
      }
    };
  },
  methods: {
    async submit () {
      const stripe = await stripePromise

      const data = await this.$api.post('order', {
        products: [],
        info: this.data.checkout
      })

      const sessionId = data.id

      const result = await stripe.redirectToCheckout({
        sessionId
      })
    },
  },
  computed: {
    subTotal() {
      return this.products.reduce((accumulator, { product }) => {
        return accumulator + product.price
      }, 0)
    },
    products () {
      return this.$store.state.checkout.products
    }
  }
}
</script>

<style lang="scss">
.checkout {}

.checkout__products {
  border-top: 1px solid $subtle;
  border-bottom: 1px solid $subtle;
  padding: $spacer * 3 0;
  margin-bottom: $spacer * 2;
}

.checkout__products__message {
  display: flex;
  color: $subtle;
  justify-content: center;
}

.checkout__products__product {
  display: flex;

  + .checkout__products__product {
    margin-top: $spacer * 2;
  }
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

.checkout__products__product__desc {
  margin-bottom: 1rem;
}

.checkout__products__product__amount {
  min-width: 50px;
  width: 50px;
}

.checkout__products__product__remove {}

</style>
