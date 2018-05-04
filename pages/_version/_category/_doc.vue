<template>
  <article class="doc" v-editable="story.content">
    <h1 class="doc__title" :id="story.slug">{{story.name}}</h1>
    <HTMLContent :content="parsed"/>
  </article>
</template>

<script>
import marked from 'marked'
import HTMLContent from '@/components/HTMLContent.vue'
import { markdown, checkAndInitEditMode } from '@/plugins/helper'

export default {
  data() {
    return {
      story: {},
      parsed: ''
    }
  },
  mounted () {
    checkAndInitEditMode(this)
  },
  components: {
    HTMLContent
  },
  async asyncData (context) {
    const res = await context.app.$storyapi
    .get(`cdn/stories/${context.params.version}/${context.params.category}/${context.params.doc}`, 
      { version: context.isDev ? 'draft' : 'published', 
        cv: context.store.state.cache_version  
      })
    .catch((e) => { 
      context.error({ statusCode: e.response.status, message: e.response.statusText }) 
    })

    if (!!res) {
      // prepare data
      const parsed = markdown(res.data.story.content.content, '1000x0')

      // push into store
      context.store.commit('SET_CURRENT_CONTENT', parsed)

      return { story: res.data.story, parsed: parsed }
    }
  }
}
</script>

<style lang='scss'>
.doc {
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

.doc__title {
  margin-top: 0px;
  font-size: 1.8em;
  padding-bottom: 10px;
  border-bottom: 1px solid #d8d8d8;
}
</style>
