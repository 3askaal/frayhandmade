<template>
  <div class="gallery" />
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  mounted() {
    this.getImages()
  },
  data() {
    return {

    }
  },
  methods: {
    async getImages() {
      await this.$axios.$get(`https://3as.me/frayhandmade/wp-json/wp/v2/media`)
    }
  }
}
</script>

<style lang="scss" scoped>
.gallery {}
</style>
