<template>
  <div class="status spacer">
    <template v-if="status === 'pending'">
      <h1 class="status__title">Your order is being processed!</h1>
    </template>
    <template v-if="status === 'success'">
      <h1 class="status__title">Payment Completed</h1>
      <p class="status__order-desc">Your order with Order ID: #{{ order.id }} was successful.</p>
      <ul class="status__products">
        <li class="status__products__product" v-for="product in order.products" :key="product.id">
          <span>{{ product.title }}</span>
          <span>-</span>
          <span>€ {{ product.price }}</span>
        </li>
      </ul>
      <p class="status__order-extra">You've received a confirmation email with further information.<br />For questions or requests please contact our support email.</p>
    </template>
    <template v-if="status === 'error'">
      <h1 class="status__title">Payment Failed</h1>
      <p></p>
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

      console.log(order)
      this.status = 'success'
      this.order = order
    } catch (err) {
      this.status = 'error'
    }
  },
  data() {
    return {
      status: 'pending',
      order: null
    }
  }
}
</script>

<style lang="scss">
.status {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  align-items: center;
  text-align: center;
}

.status__products {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.status__products__product {
  display: flex;
  justify-content: space-between;
  width: 140%;
}

.status__order-extra {
  margin-top: $spacer * 3;
  color: $subtle;
}
</style>
