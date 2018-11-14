<template>
  <footer>
    <ul>
        <router-link to="/home" tag="li">
          <figure>
            <i>&#xe64f;</i>
            <figcaption>首页</figcaption>
          </figure>
        </router-link>
        <router-link to="/kind" tag="li">
          <figure>
            <i>&#xe6b4;</i>
            <figcaption>分类</figcaption>
          </figure>
        </router-link>
        <router-link to="/cart" tag="li">
          <figure>
            <i>&#xe698;</i>
            <figcaption>购物车</figcaption>
          </figure>
        </router-link>
        <router-link to="/user" tag="li">
          <figure>
            <i>&#xe6b8;</i>
            <figcaption>我的</figcaption>
          </figure>
        </router-link>
      </ul>
  </footer>
</template>

<script src="./script.js"></script>

<style lang="scss" src = "./style.scss" ></style>
