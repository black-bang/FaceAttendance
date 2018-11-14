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
        @confirm="handle"
         v-model="dataVal"
        :startTime="startTime"
        :endDate="endDate"
       >
      </mt-datetime-picker> 
    </div>
 
     <div class="DataBox" style="display:none">
          <div class="header_data">
            <div class="team_name">
                <div class="name_pic" @click="backTo"><img :src='cartlist.Picture'/></div>
                <span  @click="backTo_">{{cartlist.AccountName}}</span>
                <p class="Avg">{{cartlist.AvgTime}}</p>
            </div>
            <div class="team_info">{{cartlist.AvGTopNo}}</div>
     </div>
     <div class="smallBox"></div>
     <li  class="DataBoxlist" v-for="(items,index) in cartlist.SortList" >
     <span >{{cartlist.SortList[index].TopNo}}</span>
     <div class="DataRight">
     <div class="pic" ><img :src='cartlist.SortList[index].Picture'></div>
     <p class="DaataName" >{{cartlist.SortList[index].AccountName}}</p>
     <p class="DaataTime">{{cartlist.SortList[index].FirstTimeText}}</p>
     </div>
     </li>
      </div>
     <div class="DataBox"  style="display:none" >
              <div class="header_data">
            <div class="team_name">
                <div class="name_pic"  @click="backTo"><img :src='cartlist.Picture'/></div>
                <span  @click="backTo_">{{cartlist.AccountName}}</span>
                <p class="Avg">{{cartlist.AvgTime}}</p>
            </div>
            <div class="team_info">{{cartlist.AvGTopNo}}</div>
     </div>
     <div class="smallBox"></div>
     <li  class="DataBoxlist_" v-for="(item,index) in dataBox" >
     <span>{{dataBox[index].TopNo}}</span>
     <div class="DataRight">
     <div class="pic"><img :src='dataBox[index].Picture'></div>
     <p class="DaataName">{{dataBox[index].AccountName}}</p>
     <p class="DaataTime">{{dataBox[index].FirstTimeText}}</p>
     </div>
     </li>
     </div>
       <ul class="footer">

        <a class="eary_"><li>早到排行</li></a> 
        <a class="work_" @click="work()"><li>工时排行</li></a>

  </ul>
   
  </div>
 
</template>

<script src="./script.js"></script>

<style lang="scss" src = "./style.scss" scoped></style>
<style lang="scss">
.picker-slot-center:nth-of-type(3){
  display:none;
}
</style>