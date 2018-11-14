<template>
  <div class="min">
    <header>
      <router-view name="userhead"></router-view>
    </header>
    <div class="user_content">
      <router-view name="usercon" ></router-view>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src = "./style.scss"></style>
