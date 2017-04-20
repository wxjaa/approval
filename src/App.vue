<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">{{title}}</x-header>
      <router-view></router-view>
      <tabbar slot="bottom">
        <div class="weui-cell" style="flex: 1;">
          <button @click="save"
                  style="padding:.5em;width:100%;background: dodgerblue;color:white;border: none;font-size: 1.2rem;">提&nbsp;交
          </button>
        </div>
      </tabbar>
    </view-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ViewBox,XHeader,Tabbar} from 'vux'
  import {mapState,mapActions} from 'vuex'
  export default {
    name: 'app',
    data(){
      return {}
    },
    components: {
      ViewBox, XHeader, Tabbar
    },
    methods: {
      save: function () {
        vue.$emit("save")
      }
    },
    computed: mapState({
      title: state=>state.title
    }),
    created: function () {
      console.log(this.$store)
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/close.less';

  body {
    background-color: #fbf9fe;
  }
</style>
