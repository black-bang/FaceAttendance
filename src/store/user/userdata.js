import myajax from '@/api/myajax.js'
import PubSub from 'pubsub-js'
export default{
    getdata(listData,cb){
        //console.log(listData)
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth()+1;
        let day = now.getDate()
        let date = "";
        if (month < 10) date += "0";
        date += month+"-";
        if (day < 10) date += "0";
        date += day;
        //console.log(year + "-" + date)
        myajax.axios({
            method:'post',
            url:'Wl_Inshop_Device_Record_RuiWein/WorkStartTopNoAsync?param.accountId='+listData.accountId+'&param.translateId='+listData.translateId+'&param.date='+year + "-" + date,
            responseType:'json',
            data:{},
            success:(data)=> {
                cb(data)
                //console.log(localStorage.companyName+'2222222222')
               
           
            },
            error:(error)=>{
                PubSub.publish("AJAX_ERROR",error)
            }
        })

    }
}