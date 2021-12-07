<template>
  <div></div>
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
