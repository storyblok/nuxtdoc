<template>
  <div class="docs">
    <article class="docs__content" v-editable="blok">
      <h1 class="docs__title" :id="slug">{{title}}</h1>
      <div v-html="parsed"></div>
    </article>
  </div>
</template>

<script>

import marked from 'marked'
import { resizeImages, checkAndInitEditMode } from '@/plugins/helper'

export default {
  data() {
    return {
      title: '',
      parsed: ''
    }
  },
  mounted () {
    checkAndInitEditMode(this)
  },
  async asyncData (context) {
    const { data } = await context.app.$storyapi.get(`cdn/stories/${context.params.version}/${context.params.category}/${context.params.doc}`, { version: 'draft' })

    // prepare data
    const parsed = marked(resizeImages(data.story.content.content, '1000x0'))

    // push into store
    context.store.commit('SET_CURRENT_CONTENT', parsed)

    return { title: data.story.name, 
             slug: data.story.slug,
             parsed: parsed,
             blok: data.story.content }
  }
}
</script>

<style lang='scss'>
.docs {
  margin-top: 61px;
}

.docs__title {
  margin-top: 0px;
  font-weight: 300;
  padding-bottom: 10px;
  border-bottom: 1px solid #d8d8d8;
}

.docs__content {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  margin-left: auto;
  @media screen and (min-width: 835px) {
    margin-left: 310px;
  }
  @media screen and (min-width: 1300px) {
    margin-left: auto;
  }

  h3, h4, h5, h6 {
    font-weight: 300;
    &:before {
      content: '# ';
    }
  }

  h2 {
    font-weight: 300;
    padding-bottom: 10px;
    border-bottom: 1px solid #d8d8d8;
  }

  img {
    max-width: 100%;
    border-radius: 4px;
  }

  a {
    border-bottom: 0px;
    color: #42b983;
    font-weight: 600;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  p {
    line-height: 1.5;
    code {
      display: inline;
      background: #f5f5f5;
      border-radius: 4px;
      border: 1px solid #d8d8d8;
      font-size: 90%;
    }
  }


  pre {
    display: block;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 4px;
    border: 1px solid #d8d8d8;
    font: 14px Consolas,monospace,serif;
    color: #444;
    tab-size: 4;
    overflow: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    th, td {
      border: 1px solid #d8d8d8;
      padding: 15px;
      text-align: left;
    }
  }

  iframe {
    max-width: 100%;
  }
}
</style>
