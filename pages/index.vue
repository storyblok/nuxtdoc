<template>
  <div class="home" v-editable="story.content">
    <component v-if="story.content.component" :key="story.content._uid" :blok="story.content" :is="story.content.component"></component>
  </div>
</template>

<script>
import { checkAndInitEditMode } from '@/plugins/helper'

export default {
  data () {
    return { story: { content: {} } }
  },
  mounted () {
    checkAndInitEditMode(this)
  },
  async asyncData (context) {
    const { data } = await context.app.$storyapi.get(`cdn/stories/home`, 
      { version: context.isDev ? 'draft' : 'published', 
        cv: context.store.state.cache_version  
      })
    
    return { story: data.story }
  }
}
</script>

<style>
</style>
