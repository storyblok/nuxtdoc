import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      version: 'v1',
      sitemap: {},
      links: {},
      currentContent: '',
      cache_version: 0
    },
    mutations: {
     SET_VERSION(state, version) {
      state.version = version
     },
     SET_CURRENT_CONTENT(state, currentContent) {
      state.currentContent = currentContent
     },
     async SET_SITEMAP (state, links) {
        const generateTree = (parent, items) => {
          let node = {}
          if (typeof items[parent] !== 'undefined') {
            items[parent].forEach((item) => {
              node[item.id] = {
                item: item,
                children : generateTree(item.id, items)
              }
            })
          }
          return node
        }

        let items = {}
        Object.keys(links).forEach((key) => {
          const item = links[key]
          if (typeof items[item.parent_id] === 'undefined') items[item.parent_id] = [] 
          items[item.parent_id].push(item)
        })

        state.sitemap = generateTree(Object.keys(items)[0], items)
        state.links = links
      },
      async SET_CACHE_VERSION(state, cache_version) {
        state.cache_version = cache_version
      }
    },
    actions: {
      async GET_SITEMAP ({ commit }, context) {
        if (Object.keys(context.store.state.links).length == 0) {
          const { data } = await context.app.$storyapi.get(`cdn/links`, { starts_with: 'v1', version: 'draft' })
          commit('SET_SITEMAP', data.links)
        }
      },
      async GET_CACHE_VERSION ({ commit }, context) {
        if (context.store.state.cache_version == 0) {
          // initial cache version call to improve further requests
          // since they now only hit the CDN.
          const { data } = await context.app.$storyapi.get(`cdn/spaces/me`)
          commit('SET_CACHE_VERSION', data.space.version)
        }
      }
    }
  })
}

export default createStore