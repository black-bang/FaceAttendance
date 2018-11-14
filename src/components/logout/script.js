import Vue from 'vue'
import { Field,Button,Cell, Toast  } from 'mint-ui';
import myajax from '@/api/myajax'
import baseUrl from '@/api/config'

Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);

export default {
  data () {
    return {
      account:'',
      password:'',
      flag:false,
      temp:'0'
    }
  },
  // watch: {
  //   phonenum(){
  //     if(/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.phonenum)){
  //       this.phonenumstate = "success"
  //     }else{
  //       this.phonenumstate = "error"
  //     }
  //   },
  //   password(){
  //     if(this.password.length >= 6){
  //       this.passwordstate = "success"
  //     }else{
  //       this.passwordstate = "error"
  //     }
  //   },
  //   code() {
  //     if(this.code.length == 6){
  //       this.codestate = "success"
  //     }else{
  //       this.codestate = "error"
  //     }
  //   }
  // },
  methods: {
      // sendcode(){
      //   let time = 30;
      //   if(this.phonenumstate == "success") {
      //     this.temp = '1'
      //     this.send()
      //     let timer = setInterval(() => {
      //       time--;
      //       this.message = time + "s后重新发送";
      //       this.flag = true;
      //       if(time == 0) {
      //         this.message = "发送验证码"
      //         this.flag = false;
      //         clearInterval(timer)
      //       }
      //     },1000)
      //   }else{
      //     this.temp = '0'
      //     Toast({
      //       message: '请填写正确格式手机号',
      //       duration: 3000
      //     });
      //   }
      // },
      // 短信验证码
      send(){
        myajax.axios({
          method: "get",
          url: "sendCode?PhoneNumbers="+this.phonenum,
          data:{},
          responseType: "json",
          success:(data) => {
            console.log(data)
            if(data.stats == 1){
              Toast({
                message: '短信验证码已发送至您的手机',
                position: 'middle',
                duration: 3000
              });
            }else if(data.stats == 0){
              Toast({
                message: '短信验证码发送失败',
                position: 'middle',
                duration: 3000
              });
            }else if(data.stats == 2){
              Toast({
                message: '该用户已经注册，请直接登录',
                position: 'middle',
                duration: 3000
              });
            }
          }
        })
      },
      // 点击登陆
      logout(){
        if(this.temp == '1'){
          myajax.axios({
            method: "get",
            url: "User_Account/LoginAsync?param.account="+this.phonenum+"&password="+this.password+"&code="+this.code,
            data:{},
            responseType: "json",
            success:(data) => {
              console.log(data)
              if(data.stats == 3){
                Toast('注册成功');
                this.$router.push('/user')
              }else if(data.stats == 4){
                Toast({
                  message: '请输入正确的手机号或验证码',
                  position: 'middle',
                  duration: 3000
                });
              }
            }
          })
        }else{
          Toast({
            message: '请输入正确的手机号或验证码',
            duration: 3000
          });
        }
      }
  }
}