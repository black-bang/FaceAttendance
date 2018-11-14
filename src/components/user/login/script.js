import { mapState } from "vuex";
import myajax from "@/api/myajax";
import axios from "axios";
import datas from "@/store/detail/detaildata.js";
import store from "@/store";
import Vue from "vue";
import { DatetimePicker } from "mint-ui";
import moment from "moment";
import PlLazy from "./PlLazy";
import { Indicator } from "mint-ui";
import PubSub from "pubsub-js";
import WeiChatWebView from "@/piiiy.js";
import { MessageBox } from "mint-ui";

export default {
  data() {
    return {
      userName: this.$store.state.detail.product,
      dateTime: [],
      boxList: [],
      DataBox: [],
      elseList: [],
      dataVal: new Date(),
      endDate: new Date(),
      translateId: "",
      accountId: "",
      time_data: []
    };
  },
  components: {
    PlLazy
  },
  name: "test-lazy",
  computed: {
    ...mapState({
      product: state => state.detail.product
    })
  },
  created() {
    PubSub.subscribe("AJAX_ERROR", (eventName, arg) => {
      if (arg) {
        let allContent = document.getElementsByClassName("conmin")[0];
        allContent.style.display = "none";
        setTimeout(() => {
          if (arg == "员工还未绑定设备,进入失败") {
           // MessageBox("Notice", "You clicked the button");
            if (WeiChatWebView.isWebView) {
              MessageBox.alert("员工还未绑定设备，请绑定设备").then(
                action => {
                  WeiChatWebView.emit(
                    "BindingDevice",
                    this.$route.query
                  );
                  console.log("111111111");
                }
              );
            } else {
              MessageBox.alert("员工还未绑定设备，请绑定设备").then(action => {
                  window.location.replace(
                    `http://jzker.cn/#/WeiChat/LinkDevice?AccountId=${this.accountId}&AccountName=${this.accountName}`
                    )
                    /*
                    "http://jzker.cn/#/WeiChat/LinkDevice?AccountId=" +
                    this.accountId +
                    "&AccountName=" +
                    this.accountName;
                    */
                });
            }
          } else {
            console.log(arg);
            this.$router.replace(
              "/user/err?accountId=" +
                this.$route.query.accountId +
                "&translateId=" +
                this.$route.query.translateId +
                "&accountName=" +
                this.$route.query.accountName
            );
          }
        }, 500);
      }
    });
  },
  mounted() {
    this.translateId = this.$route.query.translateId;
    this.accountId = this.$route.query.accountId;
    this.accountName = this.$route.query.accountName;
    //console.log(WeiChatWebView)
    // let roys = document.getElementsByClassName('conmin')[0]
    // if(localStorage.getItem("Code") == 0){
    //   roys.style.display="none"
    //   Indicator.open('');
    //   setTimeout(() => Indicator.close(), 1000);
    // }
    let dataTime = document.getElementsByClassName("dataTime")[0];
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1; //月
    let date = "";
    if (month < 10) date += "0";
    date += month;
    dataTime.innerHTML = year + "-" + date;
    this.time_data = [year, month];
    let DataShow = document.getElementsByClassName("list_box")[0];
    let DataList_ = document.getElementsByClassName("DataList");
    let goDate_ = document.getElementsByClassName("go_data")[0];
    let outDate = document.getElementsByClassName("out_data")[0];
    let State_go = document.getElementsByClassName("State_go")[0];
    let State_out = document.getElementsByClassName("State_out")[0];
    // let State_out_ = document.getElementsByClassName("State_out")[0];
    let DataText_ = document.getElementsByClassName("DataText_");
    let goDate = document.getElementsByClassName("time_text")[0];
    let Mark = document.getElementsByClassName("mark");
    this.box_data = [this.$route.query, this.time_data];
    var id = this.box_data;
    this.$store.dispatch("getdetail1", id).then(result => {
      //console.log(result)
      Indicator.open({ spinnerType: "fading-circle" });
      setTimeout(() => Indicator.close(), 1000);
      //console.log( this.$store.state.detail.product)
      this.elseList = result.CheckList;
      this.elseList.forEach((item, p) => {
        // console.log(elseList.CheckList[p])
        let data_0 = this.elseList[p];

        let data = new Date();
        let dates = moment(data).format("MM.DD");
        if (data_0.DayText == dates) {
          //console.log(data_0.DayText)
          if (data_0.Record[0]) {
            goDate_.innerHTML = data_0.Record[0].TimeText;
            if (data_0.Record[0].State == 1) {
              DataList_[p].classList.add("State");
              goDate.classList.remove("State_late0");
              goDate.classList.remove("State_late1");
              goDate.classList.remove("State_late2");
              goDate.classList.remove("State_ever");
              goDate.classList.remove("State_never");
              goDate.classList.add("State_late");
              State_go.innerHTML = "迟到";
              outDate.innerHTML = "";
              State_out.style.display = "none";
            }
            if (data_0.Record[0].State == 0) {
              DataList_[p].classList.add("State1");
              goDate.classList.remove("State_late");
              goDate.classList.remove("State_late0");
              goDate.classList.remove("State_late2");
              goDate.classList.add("State_late1");
              goDate.classList.remove("State_never");
              goDate.classList.remove("State_ever");
              State_go.innerHTML = "正常";
              outDate.innerHTML = "";
              State_out.style.display = "none";
            }
            if (data_0.Record[1]) {
              State_out.style.display = "block";
              outDate.innerHTML = data_0.Record[1].TimeText;
              if (data_0.Record[1].State == 2) {
                State_out.innerHTML = "早退";
              }
              if (data_0.Record[1].State == 0) {
                State_out.innerHTML = "正常";
              }
            }
          }
        }
        //console.log(data_0)
        if (data_0.Record[0] && (data_0.Record[1] || {})) {
          if (
            data_0.Record[0].State == 1 ||
            (data_0.Record[1] || {}).State == 2
          ) {
            DataList_[p].classList.add("State");
          }
          if (
            data_0.Record[0].State == 1 &&
            (data_0.Record[1] || {}).State == 0
          ) {
            goDate.classList.remove("State_late");
            DataList_[p].classList.add("State0");
          }
          if (
            data_0.Record[0].State == 0 &&
            (data_0.Record[1] || {}).State == 2
          ) {
            DataList_[p].classList.remove("State");
            DataList_[p].classList.add("State0");
          }
          if (
            data_0.Record[0].State == 0 &&
            (data_0.Record[1] || {}).State == 0
          ) {
            DataList_[p].classList.remove("State");
            DataList_[p].classList.remove("State0");
            DataList_[p].classList.add("State1");
          }
        }
        //console.log(data_0.State)
        if (data_0.State == -1) {
          DataList_[p].classList.add("else");
          // goDate_.innerHTML = "未打卡";
          // outDate.innerHTML = "未打卡";
        } else {
          DataList_[p].classList.remove("else");
        }
        DataList_[p].onclick = function() {
          State_out.style.display = "block";
          if (data_0.Record[0]) {
            goDate_.innerHTML = data_0.Record[0].TimeText;
            if (data_0.Record[0].State == 1) {
              goDate.classList.remove("State_late0");
              goDate.classList.remove("State_late1");
              goDate.classList.remove("State_late2");
              goDate.classList.remove("State_ever");
              goDate.classList.remove("State_never");
              goDate.classList.remove("State_late");
              goDate.classList.add("State_late_");
              State_go.innerHTML = "迟到";
              outDate.innerHTML = "";
              State_out.style.display = "none";
            }
            if (data_0.Record[0].State == 0) {
              goDate.classList.remove("State_late");
              goDate.classList.remove("State_late0");
              goDate.classList.remove("State_late2");
              goDate.classList.add("State_late1");
              goDate.classList.remove("State_never");
              goDate.classList.remove("State_ever");
              goDate.classList.remove("State_late_");
              State_go.innerHTML = "正常";
              outDate.innerHTML = "";
              State_out.style.display = "none";
            }
          }
          // 未打卡&&未开始
          State_out.style.display = "block";
          if (data_0.State == -1) {
            goDate.classList.remove("State_late");
            goDate.classList.remove("State_late0");
            goDate.classList.remove("State_late1");
            goDate.classList.remove("State_late2");
            goDate.classList.add("State_ever");
            goDate.classList.remove("State_never");
            goDate_.innerHTML = "打卡时间" + " " + data_0.DayText + " ";
            outDate.innerHTML = "打卡时间" + " " + data_0.DayText + " ";
            State_go.innerHTML = "未打卡";
            State_out.innerHTML = "未打卡";
          }
          if (data_0.State == 3) {
            goDate.classList.remove("State_late");
            goDate.classList.remove("State_late0");
            goDate.classList.remove("State_late1");
            goDate.classList.remove("State_late2");
            goDate.classList.add("State_never");
            goDate.classList.remove("State_ever");
            goDate_.innerHTML = "打卡时间" + " " + data_0.DayText + " ";
            outDate.innerHTML = "打卡时间" + " " + data_0.DayText + " ";
            State_go.innerHTML = "未开始";
            State_out.innerHTML = "未开始";
          }

          // 考勤状态
          if (data_0.Record[0] && (data_0.Record[1] || {})) {
            goDate_.innerHTML = data_0.Record[0].TimeText;
            // outDate.innerHTML = "打卡时间"+' '+data_0.DayText+' ';
            if (
              data_0.Record[0].State == 1 ||
              (data_0.Record[1] || {}).State == 2
            ) {
              goDate.classList.remove("State_late0");
              goDate.classList.remove("State_late1");
              goDate.classList.remove("State_late2");
              goDate.classList.remove("State_ever");
              goDate.classList.remove("State_never");
              goDate.classList.add("State_late");
              State_go.innerHTML = "迟到";
              State_out.innerHTML = "早退";
            }
            if (
              data_0.Record[0].State == 1 &&
              (data_0.Record[1] || {}).State == 0
            ) {
              goDate.classList.remove("State_late");
              goDate.classList.remove("State_late1");
              goDate.classList.remove("State_late2");
              goDate.classList.add("State_late0");
              goDate.classList.remove("State_ever");
              goDate.classList.remove("State_never");
              State_go.innerHTML = "迟到";
              State_out.innerHTML = "正常";
            }
            if (
              data_0.Record[0].State == 0 &&
              (data_0.Record[1] || {}).State == 2
            ) {
              goDate.classList.remove("State_late");
              goDate.classList.remove("State_late0");
              goDate.classList.remove("State_late2");
              goDate.classList.add("State_late1");
              goDate.classList.remove("State_never");
              State_go.innerHTML = "正常";
              State_out.innerHTML = "早退";
            }
            if (
              data_0.Record[0].State == 0 &&
              (data_0.Record[1] || {}).State == 0
            ) {
              goDate.classList.remove("State_late");
              goDate.classList.remove("State_late0");
              goDate.classList.remove("State_late1");
              goDate.classList.add("State_late2");
              goDate.classList.remove("State_ever");
              goDate.classList.remove("State_never");
              State_go.innerHTML = "正常";
              State_out.innerHTML = "正常";
            }
            if (data_0.Record[1]) {
              outDate.innerHTML = data_0.Record[1].TimeText;
              State_out.style.display = "block";
            } else {
              // goDate.classList.remove("State_late");
              // goDate.classList.remove("State_late0");
              // goDate.classList.remove("State_late1");
              // goDate.classList.remove("State_late2");
              // goDate.classList.remove("State_ever");
              // goDate.classList.remove("State_never");
              outDate.innerHTML = "";
              State_out.style.display = "none";
              //State_out.innerHTML=''
            }
          }
        };
      });
    });
  },
  methods: {
    monthList() {
      this.$router.push({
        path: "/user/login-b",
        query: { accountId: this.accountId, translateId: this.translateId }
      });
    },
    list() {
      this.$router.push({
        path: "/user/login-d",
        query: { accountId: this.accountId, translateId: this.translateId }
      });
    },
    hide() {
      this.$refs.picker.open();
    },
    handleConfirm(data) {
      let DataShow = document.getElementsByClassName("list_box")[0];
      Indicator.open({ spinnerType: "fading-circle" });
      setTimeout(() => Indicator.close(), 1000);
      let dataTime = document.getElementsByClassName("dataTime")[0];
      let date = moment(data).format("YYYY.M");
      let Year = moment(data).format("YYYY");
      let Month = moment(data).format("M");
      this.dateTime = date;
      dataTime.innerHTML = this.dateTime;
      this.time_data = [Year, Month];
      this.box_data = [this.$route.query, this.time_data];
      //console.log(this.box_data[1])
      var id = this.box_data;
      this.$store.dispatch("getdetail1", id).then(res => {
        // console.log(res)
        let DataShow = document.getElementsByClassName("list_box")[0];
        let DataList = document.getElementsByClassName("DataList");
        let DataText = document.getElementsByClassName("DataText");
        let pic = document.getElementsByClassName("DataPic");
        let goDate_ = document.getElementsByClassName("go_data")[0];
        let goDate = document.getElementsByClassName("time_text")[0];
        let outDate = document.getElementsByClassName("out_data")[0];
        let State_go = document.getElementsByClassName("State_go")[0];
        let State_out = document.getElementsByClassName("State_out")[0];
        this.boxList = res.CheckList;
        this.boxList.forEach((item, j) => {
          let data_ = this.boxList[j];
          if (data_.Record[0]) {
            if (data_.Record[0].State == 1) {
              DataList[j].classList.add("State");
            }
            if (data_.Record[0].State == 0) {
              DataList[j].classList.add("State1");
            }
          }
          if (data_.State == -1) {
            DataList[j].classList.add("else");
          } else {
            DataList[j].classList.remove("else");
          }
          if (data_.Record[0] && (data_.Record[1] || {})) {
            if (
              data_.Record[0].State == 1 ||
              (data_.Record[1] || {}).State == 2
            ) {
              DataList[j].classList.add("State");
            }
            if (
              data_.Record[0].State == 1 &&
              (data_.Record[1] || {}).State == 0
            ) {
              DataList[j].classList.remove("State");
              DataList[j].classList.add("State0");
            }
            if (
              data_.Record[0].State == 0 &&
              (data_.Record[1] || {}).State == 2
            ) {
              DataList[j].classList.remove("State");
              DataList[j].classList.add("State0");
            }
            if (
              data_.Record[0].State == 0 &&
              (data_.Record[1] || {}).State == 0
            ) {
              DataList[j].classList.remove("State");
              DataList[j].classList.remove("State0");
              DataList[j].classList.add("State1");
            }
          } else {
            DataList[j].classList.remove("State");
            DataList[j].classList.remove("State0");
            DataList[j].classList.remove("State1");
          }
          DataList[j].onclick = function() {
            State_out.style.display = "block";
            if (data_.Record[0]) {
              goDate_.innerHTML = data_.Record[0].TimeText;
              if (data_.Record[0].State == 1) {
                goDate.classList.remove("State_late0");
                goDate.classList.remove("State_late1");
                goDate.classList.remove("State_late2");
                goDate.classList.remove("State_ever");
                goDate.classList.remove("State_never");
                goDate.classList.remove("State_late");
                goDate.classList.add("State_late_");
                State_go.innerHTML = "迟到";
                outDate.innerHTML = "";
                State_out.style.display = "none";
              }
              if (data_.Record[0].State == 0) {
                goDate.classList.remove("State_late");
                goDate.classList.remove("State_late0");
                goDate.classList.remove("State_late2");
                goDate.classList.add("State_late1");
                goDate.classList.remove("State_never");
                goDate.classList.remove("State_ever");
                goDate.classList.remove("State_late_");
                State_go.innerHTML = "正常";
                outDate.innerHTML = "";
                State_out.style.display = "none";
              }
            }
            // 未打卡&&未开始'
            if (data_.State == -1) {
              goDate.classList.remove("State_late");
              goDate.classList.remove("State_late0");
              goDate.classList.remove("State_late1");
              goDate.classList.remove("State_late2");
              goDate.classList.add("State_ever");
              goDate.classList.remove("State_never");
              goDate_.innerHTML = "打卡时间" + " " + data_.DayText + " ";
              outDate.innerHTML = "打卡时间" + " " + data_.DayText + " ";
              State_go.innerHTML = "未打卡";
              State_out.innerHTML = "未打卡";
            }
            if (data_.State == 3) {
              goDate.classList.remove("State_late");
              goDate.classList.remove("State_late0");
              goDate.classList.remove("State_late1");
              goDate.classList.remove("State_late2");
              goDate.classList.add("State_never");
              goDate.classList.remove("State_ever");
              goDate_.innerHTML = "打卡时间" + " " + data_.DayText + " ";
              outDate.innerHTML = "打卡时间" + " " + data_.DayText + " ";
              State_go.innerHTML = "未开始";
              State_out.innerHTML = "未开始";
            }

            if (data_.Record[0] && (data_.Record[1] || {})) {
              goDate_.innerHTML = data_.Record[0].TimeText;
              State_out.innerHTML = "";
              // outDate.innerHTML = "打卡时间"+' '+data_0.DayText+' ';

              if (
                data_.Record[0].State == 1 ||
                (data_.Record[1] || {}).State == 2
              ) {
                goDate.classList.remove("State_late0");
                goDate.classList.remove("State_late1");
                goDate.classList.remove("State_late2");
                goDate.classList.add("State_late");
                goDate.classList.remove("State_ever");
                goDate.classList.remove("State_never");
                State_go.innerHTML = "迟到";
                State_out.innerHTML = "早退";
              }
              if (
                data_.Record[0].State == 1 &&
                (data_.Record[1] || {}).State == 0
              ) {
                goDate.classList.remove("State_late");
                goDate.classList.remove("State_late1");
                goDate.classList.remove("State_late2");
                goDate.classList.add("State_late0");
                goDate.classList.remove("State_ever");
                goDate.classList.remove("State_never");
                State_go.innerHTML = "迟到";
                State_out.innerHTML = "正常";
              }
              if (
                data_.Record[0].State == 0 &&
                (data_.Record[1] || {}).State == 2
              ) {
                goDate.classList.remove("State_late");
                goDate.classList.remove("State_late0");
                goDate.classList.remove("State_late2");
                goDate.classList.add("State_late1");
                goDate.classList.remove("State_ever");
                goDate.classList.remove("State_never");
                State_go.innerHTML = "正常";
                State_out.innerHTML = "早退";
              }
              if (
                data_.Record[0].State == 0 &&
                (data_.Record[1] || {}).State == 0
              ) {
                goDate.classList.remove("State_late");
                goDate.classList.remove("State_late0");
                goDate.classList.remove("State_late1");
                goDate.classList.add("State_late2");
                goDate.classList.remove("State_ever");
                goDate.classList.remove("State_never");
                State_go.innerHTML = "正常";
                State_out.innerHTML = "正常";
              }
              if (data_.Record[1]) {
                outDate.innerHTML = data_.Record[1].TimeText;
                State_out.style.display = "block";
              } else {
                outDate.innerHTML = "";
                State_out.style.display = "none";
              }
            }
          };
        });
      });
    }
  },
  beforeDestroy() {
    Indicator.close();
  }
};
