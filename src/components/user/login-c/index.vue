<template>
  <div class="conmin">
    <div class="top">
         <div class="top_data">    <div class="tap" @click="hide()"><span class="dataTime"></span><i class="hide" id="hide" ></i></div>
          </div>
          <mt-datetime-picker
        type="date"
        ref="picker"
        year-format="{value} 年"
        month-format="{value}月"
        date-format="{value}月"
         v-model="dataVal"
        @confirm="handleConfirm"
        :endDate="endDate"
       >
      </mt-datetime-picker> 
    </div>

    <div class="DataBox" style="display:none" >
          <div class="header_data">
            <div class="team_name">
                <div class="name_pic"  @click="backTo"><img :src='list.Picture'></div>
                <span  @click="backTo_">{{list.AccountName}}</span>
                <p >本月工作<i class="SumTime">{{list.SumTime}}</i>小时</p>
            </div>
            <div class="team_info">{{list.SumTopNo}}</div>
     </div>
       <div class="smallBox" ></div>
     <li class="DataBoxlist"v-for="(item,index) in list.SortList" >
     <span>{{list.SortList[index].TopNo}}</span>
     <div class="DataRight">
     <div class="pic"><img :src='list.SortList[index].Picture'></div>
     <p class="DataName">{{list.SortList[index].Name}}</p>
     <p class="DataTime">本月工作<i>{{list.SortList[index].WorkHours}}</i>小时</p>
     </div>
     </li>
     </div>
      <div class="DataBox" style="display:none" >
            <div class="header_data">
            <div class="team_name">
                <div class="name_pic"  @click="backTo"><img :src='list.Picture'></div>
                <span>{{list.AccountName}}</span>
                <p >本月工作<i class="SumTime">{{list.SumTime}}</i>小时</p>
            </div>
            <div class="team_info">{{list.SumTopNo}}</div>
     </div>
       <div class="smallBox"></div>
     <li class="DataBoxlist_" v-for="(item,index) in dataBox" >
     <span>{{dataBox[index].TopNo}}</span>
     <div class="DataRight">
     <div class="pic"><img :src='dataBox[index].Picture'></div>
     <p class="DataName"  @click="backTo_">{{dataBox[index].Name}}</p>
     <p class="DataTime">本月工作<i>{{dataBox[index].WorkHours}}</i>小时</p>
     </div>
     </li>
     </div>
        <ul class="footer">
          <a class="eary_" @click="eary_btn"><li>早到排行</li></a> 
          <router-link to="/user/login-c" class="work_"><li>工时排行</li></router-link>

        </ul>
   
     </div>
 
</template>

<script src="./script.js"></script>

<style lang="scss" src = "./style.scss" scoped></style>
<style lang="scss" >

  .picker-slot-center:nth-of-type(3){
  display:none;

}
</style>