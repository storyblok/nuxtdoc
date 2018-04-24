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

    <div class="sidebar__inner">
      <div class="sidebar__category">
        <button class="clippy-button" v-if="allowMore" @click="help">Need help?</button>
        <button class="clippy-button" v-if="allowMoreHelp" @click="moreHelp">You actually do need help?</button>
        <button class="clippy-button clippy-button--dark" v-if="allowForgetIt" @click="forgetIt">Forget it...</button>
        <button class="clippy-button clippy-button--dark" v-if="allowYouToo" @click="youToo">YOU TOO!</button>
        <button class="clippy-button clippy-button--invisible" v-if="allowEnd" @click="end">now</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import cheerio from 'cheerio'

export default {
  data() {
    return {
      allowMore: true,
      allowMoreHelp: false,
      allowForgetIt: false,
      allowYouToo: false,
      merlin: null,
      rover: null,
      links: null
    }
  },
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
  },
  methods: {
    help() {
      this.$store.state.clippyAgent.moveTo(300,800)
      this.$store.state.clippyAgent.speak(`You need help?`)
      this.$store.state.clippyAgent.speak(`Give me a second!`)
      this.$store.state.clippyAgent.play(`SendMail`)
      this.$store.state.clippyAgent.speak(`Nope didn't find help, sorry!`)
      this.$store.state.clippyAgent.play('IdleSnooze')
      setTimeout( () => {
        this.allowMore = false
        this.allowMoreHelp = true
        this.$store.state.clippyAgent.play('GestureRight')
      }, 15000)
    },
    moreHelp() {
      clippy.load('Merlin', (agent) => {
        this.merlin = agent
        agent.show()
        agent.moveTo(450,800)
        agent.play('Greeting')
        agent.speak(`We can't help you either.`)

      })
      setTimeout(() => {
        clippy.load('Rover', (agent) => {
          this.rover = agent
          agent.show()
          agent.moveTo(650,800)
          agent.play('Greeting')
          agent.speak(`But we hope you liked this demo`)
        })

        setTimeout(() => {
          clippy.load('Links', (agent) => {
            this.links = agent
            agent.show()
            agent.moveTo(850,800)
            agent.play('Greeting')
            agent.speak(`If not - well, there is still beer!`)
          })

          this.allowMoreHelp = false
          this.allowForgetIt = true
        }, 6000)
      }, 6000)
    },
    forgetIt() {
      this.merlin.play('GoodBye')
      this.merlin.hide()
      this.rover.play('GoodBye')
      this.rover.hide()
      this.links.speak('At least we tried guys')
      this.links.play('GoodBye')
      setTimeout(() => {
        this.links.hide()
      }, 1000)

      this.allowForgetIt = false
      this.allowYouToo = true
    },
    youToo() {
      this.$store.state.clippyAgent.speak(`You want me to leave?`)
      setTimeout( () => {
        this.$store.state.clippyAgent.speak(`I don't think so`)
        this.$store.state.clippyAgent.play('IdleSnooze')
        this.allowYouToo = false
        this.allowEnd = true
      }, 2000)
    },
    end() {
      this.$store.state.clippyAgent.speak(`Did he say pizza?`)
      setTimeout( () => {
        this.$store.state.clippyAgent.play('Thinking')
        setTimeout( () => {
          this.$store.state.clippyAgent.speak(`Okay okay - I'm out`)
          this.$store.state.clippyAgent.play('GoodBye')
        }, 5000)
      }, 2000)
    }
  }
}
</script>

<style lang='scss'>
@import '~assets/_variables.scss';

.clippy-button {
  display: block;
  font-size: inherit;
  border: 0px;
  background: $primary-color;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: $link-button-hover-background;
  }
}

.clippy-button--dark {
  background: $link-button-background--dark;
  &:hover {
    background: $link-button-hover-background--dark;
  }
}

.clippy-button--invisible {
  background: rgba(0,0,0,0.03);
  &:hover {
    background: rgba(0,0,0,0.03);
  }
}

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
