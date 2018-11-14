import {DETAIL_DATA} from '@/store/mutation-types'
import {CART_STATS} from '@/store/mutation-types'

export default {
    [DETAIL_DATA] (state ,data) {
        //console.log(data)
        state.product = {  
            
            AccountId: data.AccountId,
            AccountName: data.AccountName,
            Picture: data.Picture,
            RoleName: data.RoleName,
            TodayTopNo: data.TodayTopNo,
            WorkStartTime: data.WorkStartTime,
            WorkEndTime: data.WorkEndTime,
            CheckList: data.CheckList   
        }
    },

    [CART_STATS](state , data){
        state.stats = data;    
    }
}