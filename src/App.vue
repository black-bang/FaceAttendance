<template>
  <div class="container">
    <header>
      <router-view name="header" ></router-view>
    </header>

    <div class="content">
      <transition name = "fade">
        <router-view name="content" ></router-view>
      </transition>
    </div>

    <router-view id="footer" name="footer" ></router-view>
    
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
li{
  list-style:none;
}

@import '@/lib/reset.scss';
html,body,.container{
  @include rect(100%, 100%);
}
.container{
  @include flexbox();
  @include flex-direction(column);
  .content{
    @include flex();
    @include rect(100%, 100%);
    @include background-color(#fff);
    overflow: auto;
    .list_box{
      display: flex;
    }
            .hide-box{ 
        @include rect(0.6rem,1.2rem);
        background-color:#eee;
        position: absolute;
        right: 0.21rem;
        top: 0.3rem; 
        overflow:auto;
        z-index: 999999;
        li{
            @include rect(100%,0.3rem);
            text-align:center;
        }       
       }

       .go_time,
       .out_time
       {
         span{
           i{
             display:block;
            float:right;
            @include rect(0.3rem,0.2rem);
            border:1px solid #eee;
            background-color:#fff;
            margin-right:1rem;
           }
         }
       }
  }
  footer{
    @include rect(100%, 0.5rem);
    @include border(1px 0 0 0 , #e5e5e5 , solid);
    @include background-color(#fafafa);

      ul{
        @include rect(100%, 100%);
        @include flexbox();
        li{
          @include flex();
          @include rect(auto, 100%);
          @include flexbox();
          @include flex-direction(column);
          @include justify-content();
          @include align-items();
          figure{
            @include rect(100%, 100%);
            @include text-align();
            i{
              @include font-size(0.2rem);
            }
            figcaption{
              @include rect(100% ,auto);
              @include line-height();
            }
          }
          &.router-link-exact-active.router-link-active, &.router-link-active{
            @include text-color(#f36);
          }
        }
      }
  }
}
.fade-enter-active {
  animation: fade-in .5s;
}
.fade-leave-active {
  animation: fade-in .5s reverse;
}
@keyframes fade-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

// .fade-enter{
//   opacity:0;
// }
// .fade-enter-active{
//   transition:opacity .5s;
// }
// .fade-leave-active{
//   transition:transform .5s;
// }
// .fade-leave-to{
//   transform:translateX(-10px);
// }

// .fade-enter-active, .fade-leave-active {
//   transition: opacity .5s;
// }
// .fade-enter, .fade-leave-to  {
//   opacity: 0;
// }
</style>
