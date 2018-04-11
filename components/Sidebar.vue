<template>
  <div class="sidebar">
    <div class="sidebar__inner" v-bind:key="version.item.id" v-for="version in $store.state.sitemap">
      <nav class="sidebar__category" v-bind:key="category.item.id" v-for="category in version.children">
        <nuxt-link class="sidebar__link sidebar__link--category" :to="'/' + category.item.slug">{{category.item.name}}</nuxt-link>
        
        <ul class="sidebar__docs">
          <li v-bind:key="doc.item.id" v-for="doc in category.children">
            <nuxt-link class="sidebar__link sidebar__link--doc" :to="'/' + doc.item.slug">{{doc.item.name}}</nuxt-link>
            
            <ul class="sidebar__subdocs" v-if="doc.item.slug == $route.path.substr(1) && subnav.length > 0">
              <li v-bind:key="navitem.id" v-for="navitem in subnav">
                
                <nuxt-link class="sidebar__link" :to="navitem.id">{{navitem.text}}</nuxt-link>
                <ul v-if="navitem.children.length > 0">
                  <li v-bind:key="child.id" v-for="child in navitem.children">
                    <nuxt-link class="sidebar__link" :to="child.id">{{child.text}}</nuxt-link>
                  </li>
                </ul>

              </li>
            </ul>

          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import cheerio from 'cheerio'

export default {
  computed: {
    subnav() {
      const $ = cheerio.load(this.$store.state.currentContent)
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
@import '~assets/_variables.scss';

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
  
  display: none;
  @media screen and (min-width: 835px) {
    display: block;
  }

  li {
    list-style-type: none;
    display: block;
  }
}

.sidebar__link {
  display: inline-block;
  padding-bottom: 2px;
  margin-bottom: 2px;
  color: $sidebar-link-color-inactive;

  &.nuxt-link-active {
    font-weight: 600;
    color: $sidebar-link-color-active;
  }

  &.sidebar__link--doc {
    font-size: 0.85em;
  }

  &.sidebar__link--category {
    color: initial;
    font-weight: 600;
  }
}

.sidebar__category {
  padding: 10px 0px;
}

.sidebar__inner {
  width: 230px;
  padding: 40px 20px 60px 60px;
}

.sidebar__docs {
  margin: 0px;
  padding-left: 0px;
}

.sidebar__subdocs {
  list-style-type: none;
  margin: 0;
  padding-left: 10px;
  font-size: 0.80em;
  .sidebar__link {
    color: $sidebar-subnav-link-color-inactive;
  }
  ul {
    padding-left: 10px;
  }
}

</style>
