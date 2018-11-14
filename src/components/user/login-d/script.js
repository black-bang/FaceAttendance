import { mapState } from "vuex";
import myajax from "@/api/myajax";
import Vue from "vue";
import vuePickers from "vue-pickers";
import moment from "moment";
import datas from "@/store/user/userdata.js";
import store from "@/store";
import { Indicator } from "mint-ui";
import PubSub from "pubsub-js";

export default {
  data() {
    return {
      dateTime: "",
      dataVal: new Date(),
      dataBox: [],
      dataBox_: [],
      endDate: new Date()
    };
  },
  computed: {
    ...mapState({
      userlist: state => state.user.userlist
    })
  },
  mounted() {
    document.title = "早到排行榜";
    PubSub.subscribe("AJAX_ERROR", (eventName, arg) => {
      if (arg) {
        this.$router.push(
          "/user/err?accountId=" +
            this.$route.query.accountId +
            "&translateId=" +
            this.$route.query.translateId
        );
      }
    });
    let dataTime = document.getElementsByClassName("dataTime")[0];
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1; //月
    let day = now.getDate();
    let date = "";
    if (month < 10) date += "0";
    date += month + "-";
    if (day < 10) date += "0";
    date += day;
    dataTime.innerHTML = year + "-" + date;
    let dataList = document.getElementsByClassName("DataBox")[0];
    Indicator.open({ spinnerType: "fading-circle" });
    setTimeout(() => Indicator.close(), 500);
    setTimeout(() => {
      dataList.style.display = "block";
    }, 400);

    var id = this.$route.query;
    this.$store.dispatch("getdetail5", id);
    // console.log(this.$store)
  },
  methods: {
    toShow() {
      this.$refs.picker.open();
    },

    handleConfirm(data) {
      let dataTime = document.getElementsByClassName("dataTime")[0];
      let date = moment(data).format("YYYY-MM-DD");
      this.dateTime = date;
      dataTime.innerHTML = this.dateTime;
      let dataList = document.getElementsByClassName("DataBox")[0];
      let dataList0 = document.getElementsByClassName("DataBox")[1];
      dataList.style.display = "none";
      Indicator.open({ spinnerType: "fading-circle" });
      setTimeout(() => Indicator.close(), 500);
      setTimeout(() => {
        dataList0.style.display = "block";
      }, 300);
      myajax.axios({
        method: "post",
        url:
          "Wl_Inshop_Device_Record_RuiWein/WorkStartTopNoAsync?param.accountId=" +
          this.$route.query.accountId +
          "&param.translateId=" +
          this.$route.query.translateId +
          "&param.date=" +
          this.dateTime,
        data: {},
        responseType: "json",
        success: res => {
          this.dataBox = res.Result.SortList;
          this.dataBox_ = res.Result;
          //console.log(this.dataBox_.StartTime)

          let teamInfo = document.getElementsByClassName("team_info")[1];
          let StartTime = document.getElementsByClassName("StartTime")[1];
          if (this.dataBox_.StartTime == "打卡时间:未打卡") {
            // console.log('1111')
            teamInfo.innerHTML = this.dataBox_.TopNo;
            StartTime.innerHTML = this.dataBox_.StartTime;
          } else {
            //console.log('222222')
            teamInfo.innerHTML = this.dataBox_.TopNo;
            StartTime.innerHTML = this.dataBox_.StartTime;
          }
        }
        //   error:(error)=>{
        //     PubSub.publish("AJAX_ERROR",error)
        // }
      });
    },
    backTo() {
      this.$router.replace(
        "/user/login?accountId=" +
          this.$route.query.accountId +
          "&translateId=" +
          this.$route.query.translateId
      );
    },
    backTo_() {
      this.$router.replace(
        "/user/login?accountId=" +
          this.$route.query.accountId +
          "&translateId=" +
          this.$route.query.translateId
      );
    }
  },
  beforeDestroy() {
    Indicator.close();
  }
};
