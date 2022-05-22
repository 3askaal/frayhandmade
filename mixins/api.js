export default {
  created() {
    this.$api = {
      get: this.apiGet,
      post: this.apiPost,
    }
  },
  methods: {
    async apiGet(path) {
      const data = await this.$axios.get(path);

      if (!data) {
        throw new Error(data.message)
      }

      return data.data.data.attributes;
    },
    async apiPost(path, payload) {
      const data = await this.$axios.post(path, payload);

      if (!data) {
        throw new Error(data.message)
      }

      return data.data.data.attributes;
    },
  }
}
