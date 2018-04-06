<template>
  <div class="home" v-editable="story.content">
    <component v-if="story.content.component" :key="story.content._uid" :blok="story.content" :is="story.content.component"></component>
  </div>
</template>

<script>
export default {
  data () {
    return { story: { content: {} } }
  },
  mounted () {
    if (this.$storyblok.inEditor) {
      this.$storyblok.init()
      this.$storyblok.on('change', () => {
        location.reload(true)
      })
    }
  },
  async asyncData (context) {
    const { data } = await context.app.$storyapi.get(`cdn/stories/home`, { version: 'draft' })
    console.log(data);
    return { story: data.story }
  }
}
</script>

<style>
</style>
