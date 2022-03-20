<template>
  <div class="product" v-if="product">
    <div class="product__carousel">
      <b-carousel>
        <b-carousel-slide v-for="image in product.images" :img-src="image.src" :key="image.id" />
      </b-carousel>
    </div>
    <div class="product__details">
      <h1 class="product__title">{{ product.name }}</h1>
      <p class="product__desc">{{ product.description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa unde quod facere natus quo incidunt nesciunt porro, sed, est deleniti culpa eligendi ducimus rerum distinctio officia, error magni officiis harum?' }}</p>
    </div>
  </div>
</template>

<script>
import to from 'await-to-js'

export default {
  async mounted() {
    const productId = this.$route.params.id
    const [getProductErr, getProductSuccess] = await to(this.$axios.$get(`${process.env.baseUrl}/wp-json/wc/v3/products/${productId}`));

    if (getProductErr) {
      throw getProductErr
    }

    console.log(getProductSuccess)

    this.product = getProductSuccess
  },
  data() {
    return {
      product: null
    }
  },
  methods: {}
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

.product__details {

}
</style>
