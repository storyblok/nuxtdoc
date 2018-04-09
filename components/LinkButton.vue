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
  background: #00b09f;
  color: #fff;
  transform: translateY(0px);
  transition: transform 200ms ease;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  &:hover {
    text-decoration: none;
    background-color: lighten(#00b09f, 5%);
    transform: translateY(-1px);
    border-bottom: 0px;
  }
}

.link-button--dark {
  background: #24292e;
  &:hover {
    background-color: lighten(#24292e, 5%);
  }
}

.link-button-wrapper {
  display: inline-block;
}

.link-button-wrapper + .link-button-wrapper {
  margin-left: 10px;
}
</style>