<template>
  <div class="docs">
    <article class="docs__content" v-editable="blok">
      <h1 class="docs__title" :id="slug">{{title}}</h1>
      <div v-html="parsed"></div>
    </article>

    <Header/>
    <Sidebar :currentPage="full_slug" :pageNavigation="parsed"/>
    
  </div>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import marked from 'marked'

export default {
  data() {
    return {
      content: '',
      title: ''
    }
  },
  computed: {
    parsed() {
      return marked(this.content)
    }
  },
  components: {
    Header,
    Sidebar
  },
  mounted () {
    if (this.$storyblok.inEditor) {
      this.$storyblok.init()
      this.$storyblok.on('change', () => {
        location.reload(true)
      })
    }
  },
  async fetch (context) {
    await context.store.dispatch('GET_SITEMAP', context)
  },
  async asyncData (context) {
    const { data } = await context.app.$storyapi.get(`cdn/stories/${context.params.version}/${context.params.category}/${context.params.doc}`, { version: 'draft' })
    return { title: data.story.name, 
             slug: data.story.slug,
             full_slug: data.story.full_slug,
             content: data.story.content.content,
             blok: data.story.content }
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
}
</style>
