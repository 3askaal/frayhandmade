<template>
  <div class="product">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non magnam nulla adipisci aperiam totam fugit temporibus? Minus fugit aperiam odio ipsa quis rem corrupti incidunt? Ea sed ab ullam perspiciatis.
  </div>
</template>

<script>
import { WooCommerceApi } from '../api'
import to from 'await-to-js'

export default {
  async mounted() {
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
.products {}

.products__item {}

.products__item__image {
  img {
    display: block;
    width: 100%;
    object-fit: contain;
    object-position: center center;
  }
}

.products__item__content {}
</style>
