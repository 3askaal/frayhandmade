<template>
  <div class="products">
    <b-row>
      <b-col cols="4" class="products__item" v-for="product in products" :key="product.id">
        <router-link :to="`/product/${product.id}`">
          <div class="products__item__image" v-if="product.image.data.url">
            <img :src="baseUrl + product.image.data.url" alt="">
          </div>
          <div class="products__item__content">
            <p v-html="product.title" />
            <p>€ {{ product.price }}</p>
          </div>
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import to from 'await-to-js'

export default {
  async mounted() {
    this.products = await this.$api.get('products')
  },
  data() {
    return {
      products: []
    }
  }
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
    background-color: rgba(black, .1);

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
  /* border: 1px solid red; */

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
