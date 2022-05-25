<template>
  <div class="status">
    <template v-if="status === 'pending'">
      <h1 class="status__title">Your order is being processed!</h1>
    </template>
    <template v-if="status === 'success'">
      <h1 class="status__title">Payment successful.</h1>
    </template>
    <template v-if="status === 'error'">
      <h1 class="status__title">Your order was not successful.</h1>
    </template>
  </div>
</template>

<script>
export default {
  async mounted() {
    const sessionId = this.$route.params.id;

    try {
      const order = await this.$api.post('orders/confirm', {
        sessionId
      })

      this.status = 'success'
      this.order = order
    } catch (err) {
      this.status = 'error'
    }
  },
  data() {
    return {
      status: 'pending',
      order: {}
    }
  }
}
</script>

<style lang="scss">
.status {
  display: flex;
  justify-content: center;
  border: 1px solid red;
  flex-grow: 1;
  height: 100%;
}
</style>
