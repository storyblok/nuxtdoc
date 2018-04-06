<template>
  <div class="grid" v-editable="blok">
    <component :key="blok._uid" v-for="blok in blok.columns" :blok="blok" :is="blok.component"></component>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style>
.grid {
  max-width: 1000px;
  padding: 20px 0px;
  margin: 0 auto;
  display: flex;
}
</style>