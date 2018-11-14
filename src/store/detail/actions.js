import detaildata from './detaildata'
import {DETAIL_DATA} from '@/store/mutation-types'
import {CART_STATS} from '@/store/mutation-types'
import myajax from '@/api/myajax'

export default {

    getdetail1(context,cbdata){
       // console.log(cbdata)
            return detaildata.getdata(cbdata,(result) => {
               // console.log(result)
                context.commit(DETAIL_DATA,result)
                
            })

    },
    
}