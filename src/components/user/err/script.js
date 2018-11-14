import { mapState } from "vuex";
import myajax from "@/api/myajax";
import Vue from "vue";
import vuePickers from "vue-pickers";
import moment from "moment";
import datas from "@/store/detail/detaildata.js";
import store from "@/store";
import { Indicator } from "mint-ui";
import PubSub from "pubsub-js";
import WeiChatWebView from '@/piiiy.js'

export default {
  data() {
    return {
      device: "",
      accountName:'',
      accountId:'',
      time_data:[],
    };
  },
  mounted() {
    document.title="出错了呢"
    this.accountName = this.$route.query.accountName
    this.accountId = this.$route.query.accountId

    let now = new Date();

    Indicator.open("发生错误了呢");
    setTimeout(() => Indicator.close(), 1000);
    let year = now.getFullYear();
    let month = now.getMonth() + 1; //月
    let date = "";
    if (month < 10) date += "0";
    date += month;;
    this.time_data =[year,month]
    this.box_data = [this.$route.query ,this.time_data ]
    var id = this.box_data;
    this.$store.dispatch("getdetail1", id);
    PubSub.subscribe("AJAX_ERROR", (eventName, arg) => {
      this.device = arg;
      if (arg) {
        let allContent = document.getElementsByClassName('conmin')[0]
        allContent.style.display='block'
        let Infom = document.getElementsByClassName("infom")[0];
           Infom.innerHTML = arg;
        if (arg == "Error: Request failed with status code 500" || arg == "Error: Network Error") {
          Infom.innerHTML = "服务器开小差了呢...";
          
        }
        
        
      }
    });
  },
  methods: {
    // load(){
    //   this.$router.go(0)
    // },
    load() {
      // if (this.device == "Error: Request failed with status code 500" || this.device == "Error: Network Error") {
      //   this.$router.go(0);
        
      // }else{
        this.$router.back(-1)
      // }
      
    }
  },
  beforeDestroy() {
    Indicator.close();
  }
};
