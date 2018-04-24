<template>
  <div>
    <link rel="stylesheet" type="text/css" media="all" href="https://cdn.rawgit.com/smore-inc/clippy.js/master/build/clippy.css">
    <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
    <script async deffer src="https://cdn.rawgit.com/smore-inc/clippy.js/master/build/clippy.min.js"></script>
  </div>
</template>

<script>
export default {
  mounted() {
    clippy.load('Clippy', (agent) => {
      this.$store.commit('SET_CLIPPY_AGENT', agent)
      this.$store.state.clippyAgent.show()
      this.$store.state.clippyAgent.play('Greeting')
      this.$store.state.clippyAgent.speak(`When all else fails, bind some paper together. My name is Clippy.`)
    })
  }
}
</script>