<template>
  <div class="">
    <div>{{label}}</div>
    <div v-for="item in dataList">
      <!-------单行输入------>
      <x-input v-if="item.componentName=='textfield'" :show-clear="false" :placeholder="item.defaultProps"
               v-bind:title="item.defaultLable"></x-input>
      <!-------多行输入------>
      <x-textarea v-if="item.componentName=='textareafield'" :placeholder="item.defaultProps"
                  v-bind:title="item.defaultLable"></x-textarea>
      <!-------数字------>
      <x-number v-if="item.componentName=='numberfield'" :placeholder="item.defaultProps"
                v-bind:title="item.defaultLable"></x-number>
      <!-------单选------>
      <selector v-if="item.componentName=='ddselectfield'" :options="item.defaultOptions"
                :placeholder="item.defaultProps" v-bind:title="item.defaultLable"></selector>
      <!-------多选框------>
      <div class="weui-cell box" v-if="item.componentName=='ddmultiselectfield'">
        <div class="weui-cell__hd" style="width:4.5em">{{item.defaultLable}}</div>
        <checker type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
          <checker-item v-for="(option,index) in item.defaultOptions" :value="option.idx">{{option.text}}
          </checker-item>
        </checker>
      </div>
      <!-------日期时间------>
      <datetime v-if="item.componentName=='dddatefield'" :format="item.defaultFormat" :placeholder="item.defaultProps"
                :title="item.defaultLable"></datetime>
      <!-------日期区间------>
      <div v-if="item.componentName=='dddaterangefield'">
        <datetime :format="item.defaultFormat" :placeholder="item.defaultProps"
                  :title="item.defaultLable"></datetime>
        <datetime :format="item.defaultFormat" :placeholder="item.defaultProps2"
                  :title="item.defaultLable2"></datetime>
        <x-input v-if="item.defaultAutorekonTime"
                 title="时长"></x-input>
      </div>
      <!-------说明文字------>
      <x-input v-if="item.componentName=='textnote'" :placeholder="item.defaultProps"
               v-bind:title="item.defaultLable"></x-input>
      <!-------金额------>
      <x-input v-if="item.componentName=='moneyfield'" :placeholder="item.defaultProps"
               v-bind:title="item.defaultLable"></x-input>
      <!-------图片------>
      <div class="weui-cell" v-if="item.componentName=='ddphotofield'">
        <div class="weui-cell_hd" style="width:4.5em;">
          {{item.defaultLable}}
        </div>
        <input @change="uploadImg" class="weui-cell__bd" style="opacity: 0" type="file" accept="image/*">
        <div class="weui-cell__ft right"></div>
        <grid>
          <grid-item style="margin-top:.5em;" class="no-padding" v-for="(img,index) in imgList">
            <span :data-index="index" @click="delImg" class="close">+</span>
            <img slot="icon" :src="img">
          </grid-item>
        </grid>
      </div>
      <!-----文件----->
      <div class="weui-cell" v-if="item.componentName=='ddattachment'">
        <div class="weui-cell_hd" style="width:4.5em;">
          {{item.defaultLable}}
        </div>
        <input @change="uploadFile" class="weui-cell__bd" style="opacity: 0" type="file">
        <div class="weui-cell__ft right"></div>
        <div v-for="(file,index) in fileList">
          <div class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img :src="file.src" alt="img" class="weui-media-box__thumb">
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{file.title}}</h4>
              <div class="weui-media-box__desc">{{file.desc}}</div>
            </div>
            <x-icon @click="delFile" :data-index="index" type="ios-close" size="30"></x-icon>
          </div>
        </div>
      </div>
      <!----外部联系人----->
      <cell islink v-if="item.componentName=='externalcontactfield'" :title="item.defaultLable">
        <div slot="value">
          <span>{{item.defaultProps}}</span>
        </div>
      </cell>
    </div>
    <div style="text-align: center">
      <x-icon type="ios-plus-empty" size="30"></x-icon>
      <span>{{action}}</span>
    </div>
  </div>
</template>
<script>
  import {
    Group,
    Cell,
    XInput,
    Selector,
    PopupPicker,
    Datetime,
    XNumber,
    ChinaAddressData,
    XAddress,
    XTextarea,
    Checker,
    CheckerItem,
    XImg,
    Grid,
    GridItem,
    Panel
  } from 'vux'
  export default {
    components: {
      Group,
      Panel,
      Grid,
      GridItem,
      Cell,
      XInput,
      Selector,
      PopupPicker,
      Datetime,
      XNumber,
      ChinaAddressData,
      XAddress,
      XTextarea,
      Checker,
      CheckerItem,
      XImg
    },
    data(){
      return {
        childComponents: []
      }
    },
    props: ['dataList', 'label', 'action'],
    mounted: function () {

    }
  }
</script>
