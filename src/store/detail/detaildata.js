import myajax from "@/api/myajax.js";
import axios from "axios";
import PubSub from "pubsub-js";
import moment from "moment";

export default {
  getdata(cbdata, cb) {
    // let now = new Date();
    // let year = now.getFullYear();
    // let month = now.getMonth() + 1;
    let Year = cbdata[1][0];
    let Month = cbdata[1][1];
  
    // console.log(Year)
    // console.log(Month)
    return axios
      .get(
        "http://api.jzker.cn/api/Wl_Inshop_Device_Record_RuiWein/ModelCheckWorkRecordAsync?param.accountId=" +
          cbdata[0].accountId +
          "&param.translateId=" +
          cbdata[0].translateId +
          "&param.year=" +
          Year +
          "&param.month=" +
          Month
      )
      .then(function(response) {
                   switch(response.data.Code){
                case "0":
                    throw response.data.Tips
                break;
                case "1":
                    let data = response.data.Result 
                    cb (data);
                    return data

                break;
                case "-1":
                    throw "网络超时"
                break;
                case "-2":
                    throw "无权限,非法访问"
                break;
            }
        //console.log(response.data.Result)
        //cb(response.data.Result);
   
      })
      .catch(error => {
        PubSub.publish("AJAX_ERROR", error);
      });
  }
};
