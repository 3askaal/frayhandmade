<template>
  <div class="products">
    <div class="products__item" v-for="product in products" :key="product.id">
      <div class="products__item__image" v-if="product.images[0] && product.images[0].src">
        <img :src="product.images[0].src" alt="">
      </div>
      <div class="products__item__content">
        <p v-html="product.name"></p>
        <p v-html="product.description"></p>
        <p v-html="product.price"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { WooCommerceApi } from '../api'
import to from 'await-to-js'

export default {
  async mounted() {
    const [getProductsErr, getProductsSuccess] = await to(WooCommerceApi.get("products", { per_page: 20 }))

    if (getProductsErr) {
      throw getProductsErr
    }

    this.products = getProductsSuccess.data
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

.products__item {
  flex-basis: 50%;
  border: 1px solid black;
  border-radius: 2px;
}

.products__item__image {
  img {
    display: block;
    width: 100%;
    object-fit: contain;
    object-position: center center;
  }
}

.products__item__content {
  padding: 1rem;
}
</style>
