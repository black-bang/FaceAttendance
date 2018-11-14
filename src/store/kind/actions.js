import detaildata from './kinddata'
import {KIND_DATA} from '@/store/mutation-types'
import myajax from '@/api/myajax'

export default {

    getdetail4(context,montnData){
        detaildata.getdata(montnData,(result) => {
            //console.log(result)
            context.commit(KIND_DATA,result)
        })
    },
    setcartproducts(context ,montnData){
        myajax.axios({
            method:'post',
            url:'Wl_Inshop_Device_Record_RuiWein/WorkTimeSumTopNoAsync?param.accountId=201&param.translateId=1&param.year=2018&param.month=8',
            responseType:'json',
            success:(result) => {
                //console.log('stats',result)
            
            }
        })
    }
}