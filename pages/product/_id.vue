<template>
  <div class="product" v-if="product">
    <div class="product__carousel">
      <b-carousel>
        <b-carousel-slide v-for="image in [product.image.data]" :img-src="image.url" :key="image.id" />
      </b-carousel>
    </div>
    <div class="product__details">
      <h1 class="product__title">{{ product.title }}</h1>
      <p class="product__description">{{ product.description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa unde quod facere natus quo incidunt nesciunt porro, sed, est deleniti culpa eligendi ducimus rerum distinctio officia, error magni officiis harum?' }}</p>
      <b-button @click="() => add(product)">
        Add to cart
        <b-icon-plus />
      </b-button>
    </div>
  </div>
</template>

<script>
import to from 'await-to-js'
import { mapMutations } from 'vuex'

export default {
  async mounted() {
    const productId = this.$route.params.id
    const data = await to(this.$api.get(`products/${productId}`));

    this.product = data[1]

    console.log(this.product)
  },
  data() {
    return {
      product: null
    }
  },
  methods: {
    ...mapMutations({
      add: 'checkout/add'
    })
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

.product__carousel {
  margin-bottom: 2rem;
}

.product__title {
  margin-bottom: 1rem;
}

.product__description {
  margin-bottom: 2rem;
}
</style>
