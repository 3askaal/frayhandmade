export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Fray Handmade',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/style/global.scss',
    'normalize.css/normalize.css',
    // 'reset-css/reset.css',
    '~/assets/fonts/onyx/stylesheet.css',
    // '~/assets/fonts/fonts.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/video.js', mode: 'client' },
    { src: '~/plugins/icons.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  styleResources: {
    scss: [
      '~/style/variables.scss',
      'bootstrap/scss/bootstrap-reboot.scss',
    ]
  },

  axios: {
    baseURL: process.env.BASE_URL + '/api',

    headers: {
      common: {
        'Authorization': `bearer ${process.env.API_KEY}`
      }
    }
  },

  env: {
    baseUrl: process.env.BASE_URL,
    apiKey: process.env.API_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  }
}
