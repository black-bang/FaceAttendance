import {KIND_DATA} from '@/store/mutation-types'
import {REMOVES_STATS} from '@/store/mutation-types'
export default {
    [KIND_DATA] (state ,data) {
        state.list ={
            AccountId: data.Result.AccountId,
            AccountName: data.Result.AccountName,
            Picture: data.Result.Picture,
            RoleName: data.Result.RoleName,
            SumTime: data.Result.SumTime, 
            SumTopNo: data.Result.SumTopNo,   
            SortList: data.Result.SortList,
            WorkHours: data.Result.WorkHours,
  
          
    
        }
    },

    [REMOVES_STATS] (state ,data) {
        state.stats = data=data
        // console.log(state.cartlist)
    }
}