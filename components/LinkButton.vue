<template>
  <div class="link-button-wrapper">
    <nuxt-link v-if="!external" class="link-button" :class="linkTheme" :to="to">{{text}}</nuxt-link>
    <a v-if="external" target="_blank" rel="nofollow noopener" class="link-button" :class="linkTheme" :href="to">{{text}}</a>
  </div>
</template>

<script>
export default {
  computed: {
    external: function() {
      return this.to.startsWith('http')
    },
    linkTheme: function () {
      let themeClass = {}
      if(typeof this.theme !== 'undefined') {
        themeClass[`link-button--${this.theme}`] = true
      }
      return themeClass
    }
  },
  props: [ 'to', 'text', 'theme' ]
}
</script>

<style lang='scss'>
@import '~assets/_variables.scss';
.link-button {
  position: relative;
  z-index: 1;
  display: inline-block;
  vertical-align: middle;
  padding: 10px 20px;
  outline: 0;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.2222222;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: $link-button-background;
  color: $link-button-color;
  transform: translateY(0px);
  transition: transform 200ms ease;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &:hover, &:focus {
    text-decoration: none;
    color: $link-button-hover-color;
    background-color: $link-button-hover-background;
    transform: translateY(-1px);
    border-bottom: 0px;
  }
}

.link-button--dark {
  background: $link-button-background--dark;
  color: $link-button-color--dark;
  &:hover, &:focus {
    color: $link-button-hover-color--dark;;
    background-color: $link-button-hover-background--dark;
  }
}

.link-button-wrapper {
  display: inline-block;
}

.link-button-wrapper + .link-button-wrapper {
  margin-left: 10px;
}
</style>