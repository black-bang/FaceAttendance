import {USER_DATA} from '@/store/mutation-types'
import {USERS_DATA} from '@/store/mutation-types'
export default {
    [USER_DATA] (state ,data) {
        state.userlist = {
            AccountId: data.Result.AccountId,
            AccountName: data.Result.AccountName,
            Picture: data.Result.Picture,
            RoleName: data.Result.RoleName,
            AvgTime: data.Result.AvgTime,    
            TopNo: data.Result.TopNo,
            SortList: data.Result.SortList,
            StartTime:data.Result.StartTime,
        }
    },
    [USERS_DATA] (state ,data) {
        state.stats = data=data
        // console.log(state.cartlist)
    }
}