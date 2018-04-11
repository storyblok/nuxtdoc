<template>
  <div class="menu">  
    <div class="menu__inner" v-bind:key="version.item.id" v-for="version in $store.state.sitemap">
      Version: {{version.item.name}}
      <nav class="menu__category" v-bind:key="category.item.id" v-for="category in version.children">
        <nuxt-link class="menu__link menu__link--category" :to="'/' + category.item.slug">{{category.item.name}}</nuxt-link>
        <ul class="menu__docs">
          <li v-bind:key="doc.item.id" v-for="doc in category.children">
            <nuxt-link class="menu__link menu__link--doc" :to="'/' + doc.item.slug">{{doc.item.name}}</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style lang='scss'>
.menu {
  margin: 0 auto;
  margin-top: 61px;
  max-width: 600px;

  ul, li {
    margin: 0px;
    padding: 0px;
    list-style: none;
  }
}

.menu__inner {
  padding: 40px 20px;
}

.menu__link--category {
  padding: 20px 0px 10px 0px;
  font-weight: 600;
}

.menu__link {
  display: block;
  padding: 10px 0px 5px 0px;
  border-color: #fff;
  color: #34495e;
}
</style>