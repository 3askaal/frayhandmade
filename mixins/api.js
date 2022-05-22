export default {
  computed: {
    $api() {
      return {
        get: this.apiGet,
        post: this.apiPost,
      }
    }
  },
  methods: {
    async apiGet(path) {
      try {
        const data = await this.$axios.get(path);

        return data.data.data.attributes;
      } catch (err) {
        throw err
      }
    },
    async apiPost(path, payload) {
      try {
        const data = await this.$axios.post(path, payload);

        return data.data.data.attributes;
      } catch (err) {
        throw err
      }
    },
  }
}
