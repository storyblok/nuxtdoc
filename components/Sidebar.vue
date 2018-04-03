<template>
  <div class="sidebar">
    <nav class="sidebar__inner">
      <ul>
        <li>
          <a href="">Page Title (h1)</a>
          <ul>
            <li>
              <a href="">Some h2 Headline text</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

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
