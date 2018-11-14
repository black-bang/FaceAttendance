import detaildata from './detaildata'
import {CART_DATA} from '@/store/mutation-types'
import myajax from '@/api/myajax'

export default {

    getdetail3(context,earyData){
        detaildata.getdata(earyData,(result) => {
           // console.log(result)
            context.commit(CART_DATA,result)
        })
    },
    setcartproducts(context ,earyData){
        myajax.axios({
            method:'post',
            url:'Wl_Inshop_Device_Record_RuiWein/EarlyAvgTopNoAsync?param.accountId=201&param.translateId=1&param.year=2018&param.month=8',
            responseType:'json',
            success:(result) => {
                //console.log('stats',result)
            
            }
        })
    }
}