<template>
  <div>
    <Header/>
    <nuxt/>
    <Sidebar/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default {
  components: {
    Header,
    Sidebar
  },
}
</script>

<style>
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
  color: #34495e;
  text-decoration: none;
  border-bottom: 2px solid transparent;
}

a:hover {
  border-bottom: 2px solid #42b983;
}
</style>
