<template>
  <Section>
    <h3>Lorem ipsum</h3>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio magnam, quod illo repellat debitis optio similique corrupti dolore nemo, minus a fuga veritatis iste porro quaerat voluptates, inventore aut ipsum.</p>
  </Section>
</template>

<script>
import { times } from 'lodash'

export default {
  data() {
    return {
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
