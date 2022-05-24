<template>
  <div class="container">
    <template v-if="status === 'pending'">
      <p>Your order is being processed!</p>
    </template>
    <template v-if="status === 'success'">
      <p>Your order was successful.</p>
    </template>
    <template v-if="status === 'error'">
      <p>Your order was not successful.</p>
    </template>
  </div>
</template>

<script>
export default {
  async mounted() {
    const sessionId = this.$route.params.id;

    const order = await this.$api.post('orders/confirm', {
      sessionId
    })
  },
  data() {
    return {
      status: 'pending'
    }
  }
}
</script>

<style lang="scss">
.products {
  display: flex;
}
</style>
