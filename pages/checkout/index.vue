<template>
  <div class="checkout mt-5">
    <div class="checkout__form">
      <b-row>

        <b-col cols="6">
          <p>First Name</p>
          <b-input v-model="customerInfo.name" />
        </b-col>
        <b-col cols="6">
          <p>Last Name</p>
          <b-input v-model="customerInfo.lastName" />
        </b-col>

        <b-col cols="6">
          <p>Street Address</p>
          <b-input v-model="customerInfo.streetAddress" />
        </b-col>
        <b-col cols="6">
          <p>House Number</p>
          <b-input v-model="customerInfo.houseNumber" />
        </b-col>

        <b-col cols="6">
          <p>Postal Code</p>
          <b-input v-model="customerInfo.postalCode" />
        </b-col>
        <b-col cols="6">
          <p>Country</p>
          <b-input v-model="customerInfo.country" />
        </b-col>

        <b-col cols="6">
          <p>Email</p>
          <b-input v-model="customerInfo.email" />
        </b-col>
        <b-col cols="6">
          <p>Phone Number</p>
          <b-input v-model="customerInfo.phoneNumber" />
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
  data() {
    return {
      customerInfo: {
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
      const stripe = await stripePromise;

      const { sessionId } = await this.$api.post('orders', {
        productIds: this.products.map(({product}) => product.id),
        customerInfo: this.customerInfo
      })

      await stripe.redirectToCheckout({
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
      return this.$store.state.cart.products
    }
  }
}
</script>

<style lang="scss">
.checkout {
  .row {
    > * {
      margin-bottom: $spacer;

      p {
        margin-bottom: $spacer * .5;
      }
    }
  }
}

.checkout__form {
  border-top: 1px solid $subtle;
  border-bottom: 1px solid $subtle;
  padding: $spacer * 3 0;
  margin-bottom: $spacer * 2;
}
</style>
