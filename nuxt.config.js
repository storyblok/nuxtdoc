const axios = require('axios')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'NuxtDoc - Combining Nuxt.js, Storyblok and Netlify',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A setup to build beautiful documentation with Nuxt and Storyblok deployed on Netlify' }
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
    middleware: [ 'navigation-loader', 'cache-version-loader' ],
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
  css: [
    '@/assets/_variables.scss'
  ],
  plugins: [
    '@/plugins/components'
  ],
  modules: [
    ['storyblok-nuxt', {accessToken: 'R5hUgUB9PGoRq2XwtYw14wtt', cacheProvider: 'memory'}]
  ],
  generate: {
    routes: function (callback) {
      const token = `R5hUgUB9PGoRq2XwtYw14wtt`
      const per_page = 100
      const version = 'published'
      let cache_version = 0
      
      let page = 1
      let routes = [
        'v1/menu'
      ]

      // Load space and receive latest cache version key to improve performance
      axios.get(`https://api.storyblok.com/v1/cdn/spaces/me?token=${token}`).then((space_res) => {

        // timestamp of latest publish
        cache_version = space_res.data.space.version
      
        // Call first Page of the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
        axios.get(`https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&per_page=${per_page}&page=${page}&cv=${cache_version}`).then((res) => {
          Object.keys(res.data.links).forEach((key) => {
            if (res.data.links[key].slug != 'home') {
              routes.push('/' + res.data.links[key].slug)
            }
          })

          // Check if there are more pages available otherwise execute callback with current routes.
          const total = res.headers.total
          const maxPage = Math.ceil(total / per_page)
          if(maxPage <= 1) {
            callback(null, routes)
          }

          // Since we know the total we now can pregenerate all requests we need to get all Links
          let contentRequests = [] 
          for (let page = 2; page <= maxPage; page++) {
            contentRequests.push(axios.get(`https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&per_page=${per_page}&page=${page}`))
          }

          // Axios allows us to exectue all requests using axios.spread we will than generate our routes and execute the callback
          axios.all(contentRequests).then(axios.spread((...responses) => {
            responses.forEach((response) => {
              Object.keys(response.data.links).forEach((key) => {
                if (response.data.links[key].slug != 'home') {
                  routes.push('/' + response.data.links[key].slug)
                }
              })
            })
          
            callback(null, routes)
          })).catch(callback)
        })
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
