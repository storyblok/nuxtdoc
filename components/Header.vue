<template>
  <header class="header">
    <nuxt-link class="header__logo" to="/">
      <img src="https://a.storyblok.com/f/39898/766x200/643e23f56d/nuxt-doc.svg" alt="NuxtDoc Logo">
    </nuxt-link>
    <nav>
      <ul class="header__nav">
        <li class="header__nav-item header__nav-item--mobile">
          <nuxt-link to="/v1/menu">Menu</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang='scss'>
.header {
  background-color: #fff;
  padding: 10px 40px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  height: 60px;
  line-height: 40px;

  background-color: rgba(255,255,255,0.4);
  box-shadow: 0 0 1px rgba(0,0,0,0.25);
  transition: background-color 0.3s ease-in-out;

  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  @media screen and (min-width: 725px) {
    padding: 10px 60px;
  }
}

.header__logo {
  &:hover {
    border-color: #fff;
  }
  img {
    height: 30px;
    padding-right: 10px;
    padding-top: 5px;
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

.header__nav-item--mobile {
  display: inline-block;
  @media screen and (min-width: 835px) {
    display: none;
  }
}
</style>
