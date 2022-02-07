<template>
  <div>
    <Section v-if="content">
      <div class="body" v-html="content.content.rendered" />
    </Section>
    <!-- <Section>
      <Gallery :items="[]" />
    </Section> -->
  </div>
</template>

<script>
import { times } from 'lodash'

export default {
  layout: 'home',
  async mounted() {
    const pages = await this.$axios.$get(`${process.env.baseUrl}/wp-json/wp/v2/pages`)
    console.log(pages)
    this.content = pages.find((page) => page.slug === 'home')

    console.log(this.content)
  },
  data() {
    return {
      content: null,
      items: times(40, () => {
        return {
          title: 'Lorem ipsum',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ipsa quidem voluptas optio accusamus voluptate facilis hic a sapiente excepturi iure, explicabo architecto nostrum magnam velit neque deleniti inventore magni.',
        }
      })
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.gallery--home {
  .wp-block-gallery {
    display: flex;
    flex-wrap: wrap;
  }

  .wp-block-image {
    flex-basis: 25%;
    /* min-width: 25%; */
  }

  img {
    width: 100%;
    height: auto;
  }
}
</style>
