<template>
  <div class="gallery">
    <div v-for="image in images" class="gallery__item" :key="image.id">
      <img :src="image.src" alt="" class="gallery__item__image" />
    </div>
  </div>
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
      images: []
    }
  },
  methods: {
    async getImages() {
      const media = await this.$axios.$get(`https://3as.me/frayhandmade/wp-json/wp/v2/media`)

      this.images = media.map((image) => ({
        id: image.id,
        src: image.media_details.sizes.medium.source_url
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.gallery {}
</style>
