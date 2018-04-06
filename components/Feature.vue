<template>
  <div class="feature" v-editable="blok">
    <img class="feature__image" :src="blok.logo" :alt="blok.name">
    <h2 class="feature__name">{{ blok.name }}</h2>
    <p class="feature__description">{{blok.description}}</p>
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
  padding: 20px;
}

.feature__name {
  font-weight: 300;
}

.feature__description {
  font-weight: 300;
}

.feature__image {
  height: 70px;
  margin: 0 auto;
  display: block;
}
</style>