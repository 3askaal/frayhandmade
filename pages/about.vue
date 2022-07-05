<template>
  <div class="about">
    <div class="container--text">
      <h1>About</h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem distinctio saepe ducimus inventore sunt. Perspiciatis fuga, suscipit eligendi pariatur quia omnis quis dignissimos, ipsam asperiores alias assumenda adipisci, praesentium deserunt.</p>
    </div>
  </div>
</template>

<script>
import to from 'await-to-js'

export default {
  async mounted() {
    const productId = this.$route.params.id;
    const data = await to(this.$api.get(`general`));
  },
  data() {
    return {
      general: {}
    }
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style lang="scss">
.about {}
</style>
