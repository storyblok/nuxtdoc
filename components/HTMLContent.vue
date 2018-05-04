<template>
  <div class="markdown" v-html="content"></div>
</template>

<script>
export default {
  props: ['content']
}
</script>

<style lang='scss'>
@import '~assets/_variables.scss';

.markdown {
  h3, h4, h5, h6 {
    font-weight: $html-content-headline-font-weight;
  }

  h2 {
    font-weight: $html-content-headline-font-weight;
    padding-bottom: 10px;
    border-bottom: 1px solid $html-content-headline-border-color;
  }

  img {
    max-width: 100%;
    border-radius: 4px;
  }

  a {
    border-bottom: 0px;
    color: $html-content-link-color;
    font-weight: 600;
    text-decoration: none;
    &:hover {
      color: $html-content-link-hover-color;
      text-decoration: underline;
    }
  }

  p {
    line-height: 1.5;
    code {
      display: inline;
      background: $html-content-code-background;
      border-radius: 4px;
      border: 1px solid $html-content-code-border;
      font-family: $html-content-code-font-family;
      font-size: 90%;
    }
  }


  pre {
    display: block;
    padding: 20px;
    background: $html-content-code-background;
    border-radius: 4px;
    border: 1px solid $html-content-code-border;
    font-size: $html-content-code-font-size;
    font-family: $html-content-code-font-family;
    color: $html-content-code-color;
    tab-size: 4;
    overflow: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    th, td {
      border: 1px solid $html-content-table-border-color;
      padding: 15px;
      text-align: left;
    }
  }

  iframe {
    max-width: 100%;
  }

  blockquote {
    background: $html-content-quote-background;
    color: $html-content-quote-color;
    margin: 0;
    padding: 10px 0px;
    border: 0px;
    border-left: 10px;    
    border-style: solid;
    border-color: darken($html-content-quote-background, 10%);
    p {
      margin: 0;
      padding-left: 10px;
    }
  }

  li {
    ul, ol {
      padding-top: 6px;
      padding-bottom: 6px;
    }
  }
}
</style>