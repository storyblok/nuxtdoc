const axios = require('axios')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxtdoc',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A setup to build beautiful documentation with Nuxt and Storyblok' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  router: {
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        if (to.matched.length < 2) {
          position = { x: 0, y: 0, offset: { x: 0, y: 80 } }
        } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
          position = { x: 0, y: 0 }
        }
        if (to.hash) {
          position = { selector: to.hash, offset: { x: 0, y: 80 } }
        }
        return position
      }
    }
  },
  plugins: [
    '@/plugins/components'
  ],
  modules: [
    ['storyblok-nuxt', {accessToken: 'R5hUgUB9PGoRq2XwtYw14wtt', cacheProvider: 'memory'}]
  ],
  generate: {
    routes: function () {
      return axios.get('https://api.storyblok.com/v1/cdn/links?token=R5hUgUB9PGoRq2XwtYw14wtt&version=draft').then((res) => {
        let routes = []
        Object.keys(res.data.links).forEach((key) => {
          if (res.data.links[key].slug != 'home') {
            routes.push('/' + res.data.links[key].slug)
          }
        })
        return routes
      })
    }
  },
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
