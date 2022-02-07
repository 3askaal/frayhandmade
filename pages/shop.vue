<template>
  <div class="products">
    <div class="products__item" v-for="product in products" :key="product.id">
      <div class="products__item__image">
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
import { times } from 'lodash'
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import axios from "axios";
import to from 'await-to-js'


export default {
  async mounted() {

    const api = new WooCommerceRestApi({
      url: process.env.baseUrl,
      consumerKey: process.env.woocommerce.key,
      consumerSecret: process.env.woocommerce.secret,
      version: "wc/v3",
      queryStringAuth: true
    });

    const [getProductsErr, getProductsSuccess] = await to(api.get("products", { per_page: 20 }))

    if (getProductsErr) {
      throw getProductsErr
    }

    this.products = getProductsSuccess.data

    console.log(this.products)
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
