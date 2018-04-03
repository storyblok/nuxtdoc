<template>
  <header class="header">
    <a class="header__logo" href="">Logo</a>
    <nav>
      <ul class="header__nav">
        <li class="header__nav-item">
          <a href="">Guide</a>
        </li>
        <li class="header__nav-item">
          <a href="">API</a>
        </li>
        <li class="header__nav-item">
          <a href="">Style Guide</a>
        </li>
        <li class="header__nav-item">
          <a href="">Examples</a>
        </li>
        <li class="header__nav-item">
          <a href="">Cookbook</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang='scss'>
.header {
  background-color: #fff;
  padding: 10px 60px;
  position: relative;
  z-index: 100;
  line-height: 40px;

  background-color: rgba(255,255,255,0.4);
  box-shadow: 0 0 1px rgba(0,0,0,0.25);
  transition: background-color 0.3s ease-in-out;

  display: flex;
  justify-content: space-between;

  & .docs {
    position: fixed;
    width: 100%;
    top: 0;
  }
}

.header__nav {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.header__nav-item {
  display: inline-block;
  margin: 0 0.6em;
}
</style>
