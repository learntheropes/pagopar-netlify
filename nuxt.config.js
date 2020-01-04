require('dotenv').config()

export default {
  mode: 'spa',
  env: {
    PAGOPAR_PUBLIC: process.env.PAGOPAR_PUBLIC,
    PAGOPAR_PRIVATE: process.env.PAGOPAR_PRIVATE
  },
  /*
  ** Headers of the page
  */

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    debug: true,
    baseURL:  (process.env.URL) ? process.env.URL : 'http://localhost:34567',
    proxyHeaders: true
  },

  router: {
    middleware: [
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
