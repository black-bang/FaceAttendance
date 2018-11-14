import {CART_DATA} from '@/store/mutation-types'
import {REMOVE_STATS} from '@/store/mutation-types'

export default {
    [CART_DATA] (state ,data) {
       // console.log(data)
        state.cartlist ={
            AccountId: data.Result.AccountId,
            AccountName: data.Result.AccountName,
            Picture: data.Result.Picture,
            RoleName: data.Result.RoleName,
            AvgTime: data.Result.AvgTime,    
            AvGTopNo: data.Result.AvGTopNo,
            SortList: data.Result.SortList,
            FirstTimeText:data.Result.FirstTimeText,
            TopNo:data.Result.TopNo
        }
    
        // console.log(state.cartlist)
    },
    [REMOVE_STATS] (state ,data) {
        state.stats = data=data
        // console.log(state.cartlist)
    }
}