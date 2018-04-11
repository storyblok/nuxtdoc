<template>
  <div>
    <Header v-if="showHeader"/>
    <nuxt/>
    <Sidebar v-if="showSidebar"/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default {
  computed: {
    currentPage() {
      return this.$route.path.length >= 0 ? this.$route.path.substr(1) : ''
    },
    showSidebar() {
      return this.currentPage != ''
    },
    showHeader() {
      return this.currentPage != ''
    }
  },
  components: {
    Header,
    Sidebar
  },
}
</script>

<style lang='scss'>
@import '~assets/_variables.scss';

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  margin: 0;
}

a { 
  color: $link-color;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  &:hover, &:focus {
    color: $link-color-hover;
  }
}

a:hover {
  border-bottom: 2px solid $link-color-hover
}
</style>
