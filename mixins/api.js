import { formatResponse } from "../helpers/formatResponse";

export default {
  computed: {
    $api() {
      return {
        get: this.apiGet,
        post: this.apiPost,
      }
    },
    baseUrl() {
      return process.env.nodeEnv === 'development' ? process.env.apiBaseUrl : ''
    }
  },
  methods: {
    async apiGet(path) {
      try {
        const { data } = await this.$axios.get(`${path}?populate=%2A`);

        return formatResponse(data).data;
      } catch (err) {
        throw err
      }
    },
    async apiPost(path, payload) {
      try {
        const { data } = await this.$axios.post(path, payload);

        return formatResponse(data);
      } catch (err) {
        throw err
      }
    },
  }
}
