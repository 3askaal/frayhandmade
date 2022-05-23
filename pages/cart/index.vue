<template>
  <div class="cart mt-5">
    <div class="cart__products">
      <template v-if="products.length">
        <b-row class="cart__products__product" v-for="product in products" :key="product.product.title">
          <b-col cols="3">
            <img :src="product.product.image.data.url" alt="" class="cart__products__product__image" />
          </b-col>
          <b-col cols="9">
            <div class="cart__products__product__title">{{ product.product.title }}</div>
            <p class="cart__products__product__desc">
              <small>{{ product.product.description || 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate vitae eum quibusdam in voluptatem? Expedita blanditiis culpa sunt at, labore tempora placeat. Quos, libero nulla quae reiciendis tempora velit earum.' }}</small>
            </p>
            <Button
              size="s"
              class="cart__products__product__remove"
              variant="outline-danger"
              @click="() => remove(product.product.id)"
            >
              Remove from cart
            </Button>
          </b-col>
        </b-row>
      </template>
      <template v-else>
        <div class="cart__products__message">
          <p>No items in cart, go to our <router-link to="/shop">shop</router-link> page to see what's available for sale.</p>
        </div>
      </template>
    </div>

    <b-row class="justify-content-end" v-if="products.length">
      <b-col cols="5">
        <div class="d-flex justify-content-between mb-4">
          <p><strong>Subtotal:</strong></p>
          <p><strong>{{ subTotal }}</strong></p>
        </div>

        <Button block variant="primary" class="cart__submit" @click="submit">Checkout</Button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import { mapMutations } from 'vuex'

export default {
  components: {
    StripeCheckout
  },
  methods: {
    ...mapMutations({
      remove: 'cart/remove'
    })
  },
  computed: {
    subTotal() {
      return this.products.reduce((accumulator, { product }) => accumulator + product.price, 0)
    },
    products () {
      return this.$store.state.cart.products
    }
  }
}
</script>

<style lang="scss">
.cart__products {
  border-top: 1px solid $subtle;
  border-bottom: 1px solid $subtle;
  padding: $spacer * 3 0;
  margin-bottom: $spacer * 2;
}

.cart__products__message {
  display: flex;
  color: $subtle;
  justify-content: center;
}

.cart__products__product {
  display: flex;

  + .cart__products__product {
    margin-top: $spacer * 2;
  }
}

.cart__products__product__image {
  display: block;
  width: 100%;
  max-height: 160px;
  object-fit: cover;
  object-position: center;
}


.cart__products__product__title {
  margin-bottom: 1rem;
}

.cart__products__product__desc {
  margin-bottom: 1rem;
}

.cart__products__product__amount {
  min-width: 50px;
  width: 50px;
}
</style>
