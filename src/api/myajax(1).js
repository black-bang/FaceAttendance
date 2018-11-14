import axios from 'axios';
import baseUrl from "@/api/config";

export default {
    axios(config){
        var { method,url,responseType,success,error,data } = config
        axios({
            method,
            url:baseUrl + url,
            responseType
        }).then((response) => {
            switch(response.data.Code){
                case "0":
                    throw response.data.Tips
                break;
                case "1":
                    success(response.data)

                break;
                case "-1":
                    throw "网络超时"
                break;
                case "-2":
                    throw "无权限,非法访问"
                break;
            }
            
        }).catch((err)=>{
   
            error(err)
        })
    }
}
