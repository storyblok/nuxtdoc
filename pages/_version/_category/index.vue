<template>
  <div class="docs">
    <article class="docs__content">
      <h1 class="docs__title">{{title}}</h1>
      <div v-bind:key="doc" v-for="doc in docs">
        <h2><nuxt-link :to="'/' + doc.full_slug">{{doc.name}}</nuxt-link></h2>
        <div v-html="markdown(doc.content.summary)"></div>
      </div>
    </article>

    <Header/>
    <Sidebar :currentPage="currentPage" />
  
  </div>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import marked from 'marked'
import { checkAndInitEditMode } from '@/plugins/helper'

export default {
  data() {
    return {
      currentPage: '',
      docs: []
    }
  },
  computed: {
    title() {
      let title = ''
      let links = this.$store.state.links
      Object.keys(links).forEach((key) => {
        if (links[key].slug == this.currentPage) {
          title = links[key].name
        }
      })
      return title
    }
  },
  components: {
    Header,
    Sidebar
  },
  mounted () {
    checkAndInitEditMode(this)
  },
  methods: {
    markdown(string) {
      return marked(string || '')
    }
  },
  async asyncData (context) {
    const { data } = await context.app.$storyapi.get(`cdn/stories/`, { 
        starts_with: `${context.params.version}/${context.params.category}/`,
        version: 'draft' })
    return { docs: data.stories, 
             currentPage: `${context.params.version}/${context.params.category}` }
  }
}
</script>

<style lang='scss'>
.docs {
  margin-top: 61px;
}

.docs__title {
  margin-top: 0px;
}

.docs__content {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  margin-left: auto;
  @media screen and (min-width: 835px) {
    margin-left: 310px;
  }
  @media screen and (min-width: 1300px) {
    margin-left: auto;
  }
  img {
    max-width: 100%;
  }
}
</style>
