 <template>

  <div class="conmin">
     
    <div class="top">
         <div class="top_data">
           <div class="tap" @click="hide()"><span class="dataTime"></span><i class="hide" id="hide" ></i></div>
           </div>
        <mt-datetime-picker
        type="date"
        ref="picker"
         v-model="dataVal"
        year-format="{value} 年"
        month-format="{value}月"
        @confirm="handleConfirm"
        :endDate="endDate"
      
       >
      </mt-datetime-picker>   

    </div>

     <div class="time_data">

             <div class="header_data">
            <div class="team_name">
                <div class="name_pic"> <img :src="product.Picture" alt=""></div>
                <span>{{product.AccountName}}</span>
                <p>{{product.RoleName}}</p>
            </div>
             <a > <div @click="monthList()" class="team_list">月排行</div></a>
              <div class="team_info" @click="list()">{{product.TodayTopNo}}</div>
     </div>
        <div class="else">
            <span class="one_r"></span>
            <span class="two_r"></span>
            <span class="tree_r"></span>           
        </div>
        <div class="time_text">
          <div class="go_time">
            <p>上班时间{{product.WorkStartTime}}</p>
            <p><span class="go_data"></span>
                <span class="State_go"></span>
            </p>
          </div>
          <div class="out_time">
            <p>下班时间{{product.WorkEndTime}}</p>
            <p><span class="out_data"></span>
            <span class="State_out"></span>
            </p>
          </div>
        </div>
     </div>
 <div class="list_header">打卡日历</div> 
     <div class="list">
       
         <div style="display:flex"  class="list_box"  >
       <figure class="DataList"v-for="(item,index) in product.CheckList" >
       
       <span ><img :src ='product.CheckList[index].ShowImag'/> 
            <i class="never" >未打卡</i>
            <p class="mark"></p>
            </span>
       <figcaption  class="DataText_" > {{product.CheckList[index].DayText}}</figcaption>
       </figure>
        </div>

     </div>
       
  </div>
  
</template>

<script src="./script.js"></script>

<style lang="scss" src = "./style.scss" scoped></style>
<style lang="scss" >
.picker-slot-center:nth-of-type(3) {
  display: none;
}
</style>
