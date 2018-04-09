<template>
  <div class="home-teaser" :style="homeTeaserStyles" v-editable="blok">
    <div class="home-teaser__inner">
      <h1 class="home-teaser__title">{{blok.title}}</h1>
      <h2 class="home-teaser__subtitle">{{blok.subtitle}}</h2>
      <link-button :to="'/' + blok.button_link.cached_url" :text="blok.button_text"/>
      <link-button to="https://github.com/storyblok/nuxtdoc" text="Github" theme="dark"/>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    homeTeaserStyles: function() {
      return { backgroundImage: `url('${this.blok.background_image || 'https://a.storyblok.com/f/43760/2500x900/8c300ba091/background.svg'}')` }
    }
  },
  props: ['blok']
}
</script>

<style>
.home-teaser {
  background-size: cover;
  background-position: bottom;
  height: 400px;
  text-align: left;
  padding-top: 60px;
  background-repeat: no-repeat;
}

.home-teaser__inner {
  max-width: 1000px;
  padding: 20px 20px;
  margin: 0 auto;
}

.home-teaser__title {
  padding-top: 20px;
  color: #fff;
  margin: 0;
  font-weight: 300;
  font-size: 3.5em;
}

.home-teaser__subtitle {
  color: #fff;
  font-weight: 300;
}
</style>