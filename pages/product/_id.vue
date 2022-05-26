<template>
  <div class="product" v-if="product">
    <div class="product__carousel">
      <b-carousel>
        <b-carousel-slide v-for="image in [product.image.data]" :img-src="image.url" :key="image.id" />
      </b-carousel>
    </div>
    <div class="product__details">
      <h1 class="product__title">{{ product.title }}</h1>
      <p class="product__price">&euro;{{ product.price }}</p>
      <p class="product__description">{{ product.description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa unde quod facere natus quo incidunt nesciunt porro, sed, est deleniti culpa eligendi ducimus rerum distinctio officia, error magni officiis harum?' }}</p>
      <Button @click="() => add(product)" :state="productInCart && 'success'" :disabled="productInCart">
        {{ productInCart ? 'Added to cart' : 'Add to cart' }}
        <b-icon-check v-if="productInCart" />
        <b-icon-plus v-else />
      </Button>
    </div>
  </div>
</template>

<script>
import to from 'await-to-js'
import { mapMutations, mapState } from 'vuex'

export default {
  async mounted() {
    const productId = this.$route.params.id;
    const data = await to(this.$api.get(`products/${productId}`));

    this.product = data[1];
  },
  data() {
    return {
      product: null
    }
  },
  methods: {
    ...mapMutations({
      add: 'cart/add'
    }),
    ...mapState(['cart'])
  },
  computed: {
    productInCart() {
      return !!this.$store.state.cart.products.find(({ product }) => product.id === this.product?.id)
    }
  }
}
</script>

<style lang="scss">
.product {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 600px;
  padding-bottom: 4rem;
}

.product__details {
  > * + * {
    margin-top: $spacer;
  }
}

.product__carousel {
  margin-bottom: 3rem;
}

.product__price {
  font-weight: bold;
  font-size: 1.25rem;
  color: $subtle;
}

.product__description {
  margin-bottom: 2rem;
}
</style>
