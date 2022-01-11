<template>
  <div>
    <Section v-if="content">
      <div v-html="content.content.rendered" />
    </Section>
    <Section>
      <Gallery :items="[]" />
    </Section>
  </div>
</template>

<script>
import { times } from 'lodash'

export default {
  async mounted() {
    const pages = await this.$axios.$get(`https://3as.me/wp-json/wp/v2/posts`)

    this.content = pages.find((page) => page.slug === 'hello-world')

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
