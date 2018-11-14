<template>
  <div class="conmin">
    <div class="top">
      <div class="top_data">    <div class="tap" @click="toShow()"><span class="dataTime">{{dateTime}}</span><i class="hide" id="hide" ></i></div>
          </div>


            <mt-datetime-picker class="databox"
      type="date"
      ref="picker"
        v-model="dataVal"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm"
      :endDate="endDate"
      >
    </mt-datetime-picker>   
    </div>
  
     

  <div class="DataBox" style="display:none" >
   <div class="header_data">
          <div class="team_name">
          <div class="name_pic" @click="backTo"><img :src='userlist.Picture'/></div>
          <span @click="backTo_">{{userlist.AccountName}}</span>
           <p class="StartTime">{{userlist.StartTime}}</p>
      </div>
      <div class="team_info">{{userlist.TopNo}}</div>
     </div>
      <div class="smallBox"></div>
    <li class="DataBoxlist" v-for="(items,index) in userlist.SortList" >
      <span>{{userlist.SortList[index].TopNo}}</span>
    <div class="DataRight">
    <div class="pic"><img :src='userlist.SortList[index].Picture'></div>
    <p class="DaataName">{{userlist.SortList[index].AccountName}}</p>
    <p class="DaataTime">{{userlist.SortList[index].TimeText}}</p>
    </div>
    </li>
  </div>

      <div class="DataBox" style="display:none" >
       <div class="header_data">
          <div class="team_name">
          <div class="name_pic"  @click="backTo"><img :src='userlist.Picture'/></div>
          <span  @click="backTo_">{{userlist.AccountName}}</span>
           <p class="StartTime">{{userlist.StartTime}}</p>
      </div>
      <div class="team_info">{{userlist.TopNo}}</div>
     </div>
      <div class="smallBox"></div>
     <li class="DataBoxlist" v-for="(item,index) in dataBox" >
     <span>{{dataBox[index].TopNo}}</span>
     <div class="DataRight">
     <div class="pic"  @click="backTo"><img :src='dataBox[index].Picture'></div>
     <p class="DaataName"  @click="backTo_">{{dataBox[index].AccountName}}</p>
     <p class="DaataTime">{{dataBox[index].TimeText}}</p>
     </div>
     </li>
     </div>
   
     </div>
 
</template>

<script src="./script.js"></script>

<style lang="scss" src = "./style.scss" scoped></style>
<style lang="scss"  >
 .databox{
   .picker-slot-center:nth-of-type(3){
      display:block ;
    }

}
</style>