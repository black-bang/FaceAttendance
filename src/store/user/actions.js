import {USER_DATA} from '@/store/mutation-types'
import myajax from '@/api/myajax'
import userdata from './userdata'
export default {
    getdetail5(context,listData){
        userdata.getdata(listData,(result) => {
            //console.log(result)
            context.commit(USER_DATA,result)
        })
    },
    getdata(context){
        myajax.axios({
            method:'post',
            url:'Wl_Inshop_Device_Record_RuiWein/WorkStartTopNoAsync?param.accountId=201&param.translateId=1&param.date=2018-08-20',
            responseTpye:'json',
            success:(result) => {
                // console.log(result)
                context.commit(USER_DATA , result)
            }
        })
    }
}