<template>
  <div class="sidebar">
    <nav class="sidebar__inner" v-bind:key="version" v-for="version in $store.state.sitemap">
      {{version.item.name}}
      <ul>
        <li v-bind:key="category" v-for="category in version.children">
          <nuxt-link :to="'/' + category.item.slug">{{category.item.name}}</nuxt-link>
          <ul>
            <li v-bind:key="doc" v-for="doc in category.children">
              <nuxt-link :to="'/' + doc.item.slug">{{doc.item.name}}</nuxt-link>
              <ul v-if="doc.item.slug == currentPage && subnav.length > 0">
                <li v-bind:key="navitem.id" v-for="navitem in subnav">
                  <a :href="navitem.id">{{navitem.text}}</a>
                  <ul v-if="navitem.children.length > 0">
                    <li v-bind:key="child.id" v-for="child in navitem.children">
                      <a :href="child.id">{{child.text}}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import cheerio from 'cheerio'

export default {
  props: [ 'currentPage', 'pageNavigation' ],
  data() {
    return {
      stories: []
    }
  },
  computed: {
    subnav() {
      const $ = cheerio.load(this.pageNavigation)
      let pageNav = []
      $('h2, h3').each((i, elem) => {
        let $elem = $(elem)
        if ($elem[0].name == 'h2') {
          pageNav.push({
            id: `#${$elem.attr('id')}`,
            text: $elem.text(),
            children: []
          })
        } else {
          pageNav[pageNav.length - 1].children.push({
            id: `#${$elem.attr('id')}`,
            text: $elem.text(),
          })
        }
      })
      return pageNav
    }
  }
}
</script>

<style lang='scss'>
.sidebar {
  position: fixed;
  z-index: 10;
  top: 61px;
  left: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
}

.sidebar__inner {
  width: 260px;
  padding: 40px 20px 60px 60px;

  > ul {
    padding: 0px;
  }

  ul {
    list-style-type: none;
    margin: 0;
  }

  li {
    list-style-type: none;
    display: block;
  }
}
</style>
