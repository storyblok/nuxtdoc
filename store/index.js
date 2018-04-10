import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      version: 'v1',
      sitemap: {},
      links: {}
    },
    mutations: {
     SET_VERSION(state, version) {
      state.version = version
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
      }
    },
    actions: {
      async GET_SITEMAP ({ commit }, context) {
        if (Object.keys(context.store.state.links).length == 0) {
          const { data } = await context.app.$storyapi.get(`cdn/links`, { starts_with: 'v1', version: 'draft' })
          commit('SET_SITEMAP', data.links)
        }
      }
    }
  })
}

export default createStore