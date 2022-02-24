<template>
  <div class="container">
    <template v-if="paymentStatus === 'success'">
      <h1>Your order went successfull.</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti excepturi distinctio cupiditate repudiandae obcaecati eligendi fuga unde qui, animi saepe aliquam nesciunt adipisci vero sit mollitia amet consequatur error dolorum!</p>
    </template>
    <template v-if="paymentStatus === 'error'">
      <h1>Something went wrong.</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti excepturi distinctio cupiditate repudiandae obcaecati eligendi fuga unde qui, animi saepe aliquam nesciunt adipisci vero sit mollitia amet consequatur error dolorum!</p>
    </template>
  </div>
</template>

<script>
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
.products {
  display: flex;
}
</style>
