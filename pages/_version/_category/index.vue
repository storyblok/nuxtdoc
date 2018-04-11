<template>
  <article class="category">
    <h1 class="category__title">{{title}}</h1>
    <div v-bind:key="doc" v-for="doc in docs">
      <h2><nuxt-link :to="'/' + doc.full_slug">{{doc.name}}</nuxt-link></h2>
      <html-content :content="markdown(doc.content.summary)"/>
    </div>
  </article>
</template>

<script>
import marked from 'marked'
import { checkAndInitEditMode } from '@/plugins/helper'

export default {
  data() {
    return {
      docs: []
    }
  },
  computed: {
    title() {
      let title = ''
      let links = this.$store.state.links
      Object.keys(links).forEach((key) => {
        if (links[key].slug == this.$route.path.substr(1)) {
          title = links[key].name
        }
      })
      return title
    }
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
    return { docs: data.stories }
  }
}
</script>

<style lang='scss'>
.category {
  max-width: 600px;
  margin: 61px auto 0px auto;
  padding: 40px;

  @media screen and (min-width: 835px) {
    margin-left: 310px;
  }

  @media screen and (min-width: 1300px) {
    margin-left: auto;
  }
}

.category__title {
  margin-top: 0px;
  font-size: 1.8em;
  padding-bottom: 10px;
  border-bottom: 1px solid #d8d8d8;
}
</style>
