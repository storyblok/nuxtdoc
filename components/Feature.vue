<template>
  <div class="feature" v-editable="blok">
    <img class="feature__image" :src="blok.logo" :alt="blok.name">
    <h2 class="feature__name">{{ blok.name }}</h2>
    <p class="feature__description">{{blok.description}}</p>
    <link-button :to="'/' + blok.link.cached_url" :text="blok.link_text"/>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style>
.feature {
  flex: 1;
  position: relative;
  padding: 20px;
}

.feature__name {
  font-weight: 300;
  margin-top: 0px;
  padding-left: 50px;
}

.feature__description {
  font-weight: 300;
}

.feature__image {
  height: 30px;
  position: absolute;
  left: 20px;
}
</style>