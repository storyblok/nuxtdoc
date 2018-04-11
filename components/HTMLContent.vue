<template>
  <div class="markdown" v-html="content"></div>
</template>

<script>
export default {
  props: ['content']
}
</script>

<style lang='scss'>
.markdown {
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