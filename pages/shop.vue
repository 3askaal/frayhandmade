<template>
  <div class="products">
    <b-row>
      <b-col cols="4" class="products__item" v-for="product in products" :key="product.id">
        <div class="products__item__image" v-if="product.images[0] && product.images[0].src">
          <img :src="product.images[0].src" alt="">
        </div>
        <div class="products__item__content">
          <p v-html="product.name"></p>
          <p v-html="product.description"></p>
          <p v-html="product.price">€{{ product.price }}}</p>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import to from 'await-to-js'

export default {
  async mounted() {
    const [getProductsErr, getProductsSuccess] = await to(this.$axios.$get(`${process.env.baseUrl}/wp-json/wc/v3/products`));

    if (getProductsErr) {
      throw getProductsErr
    }

    this.products = getProductsSuccess
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
  margin-bottom: 2rem;
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
  display: flex;
  padding: 1rem .5rem;
  width: 100%;
  justify-content: space-between;
}
</style>
