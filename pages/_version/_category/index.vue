<template>
  <article class="category">
    <h1 class="category__title">{{title}}</h1>
    <div v-bind:key="doc.id" v-for="doc in docs">
      <h2><nuxt-link :to="'/' + doc.full_slug">{{doc.name}}</nuxt-link></h2>
      <HTMLContent :content="markdown(doc.content.summary)"/>
    </div>
  </article>
</template>

<script>
import HTMLContent from '@/components/HTMLContent'
import { checkAndInitEditMode, markdown } from '@/plugins/helper'

export default {
  data() {
    return {
      docs: []
    }
  },
  computed: {
    title() {
      let key = Object.keys(this.$store.state.links).find((key) => {
        if (this.$store.state.links[key].slug == this.$route.path.substr(1)) {
          return key
        }
      })
      return this.$store.state.links[key] ? this.$store.state.links[key].name : ''
    }
  },
  methods: {
    markdown: (string) => markdown(string, '1000x0')
  },
  mounted () {
    checkAndInitEditMode(this)
  },
  components: {
    HTMLContent
  },
  async asyncData (context) {
    const res = await context.app.$storyapi
    .get(`cdn/stories/`, { 
        starts_with: `${context.params.version}/${context.params.category}`,
        version: context.isDev ? 'draft' : 'published',
        cv: context.store.state.cache_version })
    
    return { docs: res.data.stories }
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
