// import Vue from 'vue'
// import { Field,Button,Cell, Toast  } from 'mint-ui';
// import myajax from '@/api/myajax'
// import baseUrl from '@/api/config'

// Vue.component(Field.name, Field);
// Vue.component(Button.name, Button);
// Vue.component(Cell.name, Cell);

// export default {
   
//     data () {
//         return {
//             account:'',
//             password:'',
//             plantFrom:'1',
//             translateId:'1',
//         }
//     },
//     // watch: {
       

//     //     phonenum(){
//     //         if(/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.phonenum)){
//     //             this.phonenumstate = "success"
//     //         }else{
//     //             this.phonenumstate = "error"
//     //         }
//     //     },
//     //     password(){
//     //         if(this.password.length >= 6){
//     //           this.passwordstate = "success"
//     //         }else{
//     //           this.passwordstate = "error"
//     //         }
//     //     }
//     // },


//     methods: {
//         testarea(){
           
//         },
//         // 登陆
//         login(){
//             myajax.axios({
//                 method: "get",
//                 url: "User_Account/LoginAsync?account="+this.phonenum+"&password="+this.password,
//                 data:{},
//                 responseType: "json",
//                 success:(data) => {
//                     // console.log(data)
//                     var head = false
//                     if(/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.phonenum)){
//                         head = true
//                     }else{
//                         Toast({
//                             message: '请输入正确的手机号和密码',
//                             position: 'middle',
//                             duration: 3000
//                         });
//                     }
//                     if(head){
//                         if(data.length == 0 ){
//                             Toast({
//                                 message: '该手机号未注册',
//                                 position: 'middle',
//                                 duration: 3000
//                             });
//                         }else{
//                             var phone = false
//                             var pd = false
//                             if(this.password.length<= 0){
//                                 Toast({
//                                     message: '请输入密码',
//                                     position: 'middle',
//                                     duration: 3000
//                                 });
//                             }
//                             if(this.phonenum == data[0].PhoneNumbers){
//                                 phone = true
//                             }
//                             if(phone && this.password == data[0].password){
//                                 localStorage.setItem("isLogin", "1");
//                                 this.$router.push('/user/login')
//                             }else{
//                                 Toast({
//                                     message: '密码错误！',
//                                     position: 'middle',
//                                     duration: 3000
//                                 });
//                             }
//                         }
//                     }
//                 }
//             })
//         }
//     }
// }