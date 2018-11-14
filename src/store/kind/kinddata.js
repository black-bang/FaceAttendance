import myajax from '@/api/myajax.js'
import PubSub from 'pubsub-js'
export default{
    getdata(montnData,cb){
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth()+1;
        //console.log(montnData)
        myajax.axios({
            method:'post',
            url:'Wl_Inshop_Device_Record_RuiWein/WorkTimeSumTopNoAsync?param.accountId='+montnData.accountId+'&param.translateId='+montnData.translateId+'&param.year='+year+'&param.month='+month,
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