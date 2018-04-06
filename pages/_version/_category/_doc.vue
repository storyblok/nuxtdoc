<template>
  <div class="docs">
    <Header/>
    <Sidebar :currentPage="slug" :pageNavigation="parsed"/>
    <article class="docs__content">
      <h1 class="docs__title" :id="slug">{{title}}</h1>
      <div v-html="parsed"></div>
    </article>
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
  async asyncData (context) {
    let { data } = await context.app.$storyapi.get(`cdn/stories/${context.params.version}/${context.params.category}/${context.params.doc}`, { version: 'draft' })
    return { title: data.story.name, 
             slug: data.story.slug,
             full_slug: data.story.full_slug,
             content: data.story.content.content }
  }
}
</script>

<style>
.doc {
  padding-top: 60px;
}

.docs__title {
  margin-top: 0px;
}

.docs__content {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  padding-left: 50px;
  margin-top: 61px;
}
</style>
