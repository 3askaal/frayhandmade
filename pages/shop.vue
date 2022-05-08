<template>
  <div class="products">
    <b-row>
      <b-col cols="4" class="products__item" v-for="product in products" :key="product.id">
        <router-link :to="`/product/${product.id}`">
          <div class="products__item__image" v-if="product.images[0] && product.images[0].src">
            <img :src="product.images[0].src" alt="">
          </div>
          <div class="products__item__content">
            <p v-html="product.name"></p>
            <p v-html="product.description"></p>
            <p v-html="product.price">€{{ product.price }}}</p>
          </div>
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import to from 'await-to-js'
import { WooCommerceApi, products } from '../api'

export default {
  async mounted() {
    const [getProductsErr, getProductsSuccess] = await to(products.list());

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
  padding: 2rem;

  a {
    color: inherit;

    &:hover {
      text-decoration: unset;
    }
  }

  &:hover {
    /* box-shadow: 0 0 0 1px $black; */

    .products__item__content {
      justify-content: space-between;

      :first-child {
        left: 0;
        transform: none;
      }

      :last-child {
        display: block;
        opacity: 1;
      }
    }
  }
}

.products__item__image {
  display: flex;
  min-height: 320px;
  align-items: center;

  img {
    display: block;
    width: 100%;
    object-fit: contain;
    object-position: center center;
  }
}

.products__item__content {
  display: flex;
  margin-top: 1rem;
  width: 100%;
  position: relative;

  > * {
    transition: all .4s ease;
  }

  :first-child {
    display: block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  :last-child {
    display: none;
    right: 0;
    opacity: 0;
  }
}
</style>
