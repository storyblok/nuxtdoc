<template>
  <div class="home-teaser" v-editable="blok">
    <div class="home-teaser__inner">
      <h1 class="home-teaser__title">{{blok.title}}</h1>
      <h2 class="home-teaser__subtitle">{{blok.subtitle}}</h2>
      <nuxt-link class="home-teaser__button" to="/v1/guide">Get me to the Docs</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style>
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

.home-teaser {
  background-image: url('https://a.storyblok.com/f/43760/2500x900/8c300ba091/background.svg'); 
  background-size: cover;
  background-position: bottom;
  height: 500px;
  text-align: left;
  padding-top: 60px;
}

.home-teaser__inner {
  max-width: 1000px;
  padding: 20px 0px;
  margin: 0 auto;
}

.home-teaser__button {
  position: relative;
  z-index: 1;
  display: inline-block;
  vertical-align: middle;
  padding: 10px 20px;
  outline: 0;
  font-family: inherit;
  font-size: .9rem;
  font-weight: 500;
  line-height: 1.2222222;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(14,30,37,.12);
  cursor: pointer;
  background: #00b09f;
  color: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.home-teaser__button:hover {
  text-decoration: none;
  background-color: #00c2b2;
}
</style>