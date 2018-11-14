<template>
    <div class="con">
     <div class="qqlogin">
        <img src="/static/upload_qq.png" alt="">
      </div>
      <mt-field label="账号:" placeholder="请输入手机号" type="tel"></mt-field>
    
       <mt-field label="密码:" placeholder="请输入密码" type="password"></mt-field>

      <mt-field label="验证码" placeholder="请输入验证码" v-model="code" >
        <mt-button type="default" :disabled = "flag" plain size="small" @click= "sendcode()" >{{ message }} </mt-button>
      </mt-field>
    
      <br>
      <div class="login" @click="logout()" >一键注册</div>
      <br>
      <div class="other">
        <router-link to="/user/">账号密码登陆</router-link>

      </div>
      <div class="underline">
        <span></span>
        <span>Or</span>
        <span></span>
      </div>

      </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src = "./style.scss" scoped></style>
