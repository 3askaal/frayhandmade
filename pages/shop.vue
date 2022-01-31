<template>

</template>

<script>
import { times } from 'lodash'

export default {
  async mounted() {
    const products = await this.$axios.$get(
      `${process.env.baseUrl}/wc-api/v3/products`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
      {
        auth: {
          username: process.env.woocommerce.key,
          password: process.env.woocommerce.secret
        }
      }
    )

    this.products = products
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
