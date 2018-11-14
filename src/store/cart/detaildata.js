import myajax from '@/api/myajax.js'
import PubSub from 'pubsub-js'
export default{
    getdata(earyData,cb){
        //console.log(earyData)
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth()+1;
        myajax.axios({
            method:'post',
            url:'Wl_Inshop_Device_Record_RuiWein/EarlyAvgTopNoAsync?param.accountId='+earyData.accountId+'&param.translateId='+earyData.translateId+'&param.year='+year+'&param.month='+month,
            responseType:'json',
            data:{},
            success:(data)=> {
                cb(data)
                //console.log(data)
               
           
            },
            error:(error)=>{
                PubSub.publish("AJAX_ERROR",error)
            }
        })

    }
}