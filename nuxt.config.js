/* eslint-disable nuxt/no-cjs-in-config */
/* eslint-disable import/order */
// const pkg = require('./package')
const siteConfig = require('./config/site')
const analyticsID = 'UA-145893871-1'
const siteUrl = 'https://www.greatmindsnairobi.co.ke'
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  mode: 'universal',

  watch: ['~/config/*'],
  /*
   ** Headers of the page
   */
  head: {
    title: 'Great Minds Nairobi',
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
    },
    {
      'http-equiv': 'x-ua-compatible',
      content: 'ie=edge'
    },
    {
      hid: 'description',
      name: 'description',
      content: siteConfig.description
    },
    {
      hid: 'robots',
      name: 'robots',
      content: siteConfig.index === false ? 'noindex,nofollow' : 'index,follow'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:site_name',
      content: siteConfig.title
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: siteConfig.title
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: process.env.NODE_ENV === 'production'
        ? `${siteConfig.url}/${siteConfig.ogImage}` : `http://localhost:3000/${siteConfig.ogImage}`
    },

    {
      hid: 'og:description',
      property: 'og:description',
      content: siteConfig.description
    },
    {
      hid: 'google-site-verification',
      name: 'google-site-verification',
      content: 'rD0ww0onzejSz3QS0Jrl-als30HUz9pYDcuVi2dXzNo'
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
    },
    {
      rel: 'stylesheet',
      href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css'
    }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  // loading: { color: '#fff' },
  loading: '~/components/loading.vue',

  /*
   ** Global CSS
   */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vuetify'
  ],

  generate: {
    // routes:
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/dotenv',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-analytics',
    '@nuxt/http'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Proxy config
   */
  proxy: {
    //
  },

  http: {
    // proxyHeaders: false
  },

  googleAnalytics: {
    id: analyticsID
  },

  sitemap: {
    hostname: siteUrl
  },

  /*
   ** Build configuration
   */
  build: {
    vendor: ['axios', 'vuetify'],

    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  buildDir: 'nuxt'
}
