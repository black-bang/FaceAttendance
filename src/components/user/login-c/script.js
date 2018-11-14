import {mapState} from 'vuex'
import myajax from "@/api/myajax";
import datas from "@/store/kind/kinddata.js";
import store from '@/store';
import Vue from "vue";
import vuePickers from 'vue-pickers'
import moment from 'moment'
import { Indicator } from  'mint-ui';
import PubSub from 'pubsub-js'

export default {
  data(){
    return{
      dataBox:[],
      dataUser:[],
      dataVal: new Date,
      endDate:new Date(),
      translateId:'',
      accountId:''
    }
  },
  computed: {
    ...mapState({
      list:state => state.kind.list
    })
  },
  mounted () {
    document.title="工时排行耪"
    this.translateId = this.$route.query.translateId
    this.accountId = this.$route.query.accountId

    PubSub.subscribe("AJAX_ERROR",(eventName,arg)=>{
      if(arg){
        this.$router.push("/user/err?accountId=" +
        this.$route.query.accountId +
        "&translateId=" +
        this.$route.query.translateId)
      }
     })
    let dataTime = document.getElementsByClassName("dataTime")[0];
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1; //月
    let date = "";
    if (month < 10) date += "0";
    date += month;;
    dataTime.innerHTML = year + "-" + date;
    var id = this.$route.query;
    this.$store.dispatch("getdetail4", id);
    let dataList = document.getElementsByClassName('DataBox')[0]
    Indicator.open({ spinnerType: 'fading-circle' });
    setTimeout(() => Indicator.close(), 500);
      setTimeout(()=>{
        dataList.style.display="block"
      },400)
    
  },
  methods:{
    hide() {
      //console.log("11");
      this.$refs.picker.open()
    },
    handleConfirm(data) {
        let dataList = document.getElementsByClassName('DataBox')[0]
        let dataList0 = document.getElementsByClassName('DataBox')[1]
        dataList.style.display = "none";
        Indicator.open({ spinnerType: "fading-circle" });
        setTimeout(() => Indicator.close(), 500);
        setTimeout(() => {
          dataList0.style.display = "block";
        }, 300);
        let dataTime = document.getElementsByClassName("dataTime")[0];
        let date = moment(data).format('YYYY.M')
        let Year = moment(data).format('YYYY')
        let Month = moment(data).format('M')
        this.dateTime = date
        dataTime.innerHTML = this.dateTime
        //console.log(Year)
            myajax.axios({
            method: "post",
            url: "Wl_Inshop_Device_Record_RuiWein/WorkTimeSumTopNoAsync?param.accountId=" +this.$route.query.accountId+"&param.translateId=" +this.$route.query.translateId+"&param.year="+Year+"&param.month="+Month,
            data:{},
            responseType: "json",
      success:(data) => {
        this.dataBox = data.Result.SortList
        this.dataUser = data.Result
       // console.log(this.dataBox)
        let teamInfo = document.getElementsByClassName('team_info')[1]
        let SumTime = document.getElementsByClassName('SumTime')[1]
        let dataList_ = document.getElementsByClassName('DataBoxlist_')
      if( this.dataUser.SumTime =="0"){
        teamInfo.innerHTML = this.dataUser.SumTopNo
        SumTime .innerHTML= this.dataUser.SumTime
      }else{
        teamInfo.innerHTML = this.dataUser.SumTopNo
        SumTime .innerHTML= this.dataUser.SumTime
       
      }
    }
  })
    },
    eary_btn(){
      this.$router.replace({path:'/user/login-b',query:{accountId:this.accountId,translateId:this.translateId}})
    },
    backTo(){
      this.$router.replace({path:'/user/login',query:{accountId:this.accountId,translateId:this.translateId}})
    },
    backTo_(){
      this.$router.replace({path:'/user/login',query:{accountId:this.accountId,translateId:this.translateId}})
    }
  },
  beforeDestroy() {
    Indicator.close();
  }
}