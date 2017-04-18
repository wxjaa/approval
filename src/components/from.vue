<template>
  <div class="" style="margin-top:-15px;">
    <div style="background: #ccc" v-for="(child,index) in childComponents">
      <div class="weui-cell" style="padding-bottom: 0;">
        <div class="weui-cell__bd">{{label}}
          <small>（{{index+1}}）</small>
        </div>
        <div class="weui-cell__hd" :data-index="index" v-if="index>0" @click="delChild" style="color:dodgerblue">删除
        </div>
      </div>
      <div style="margin-top: 0.5em;background: #fff" v-for="(item,i) in child">
        <!-------单行输入------>
        <x-input v-if="item.componentName=='textfield'" :show-clear="false" :placeholder="item.defaultProps"
                 v-bind:title="item.defaultLable" v-model="childDataList[index].rowValue[i].value"></x-input>
        <!-------多行输入------>
        <x-textarea v-if="item.componentName=='textareafield'" :placeholder="item.defaultProps"
                    v-bind:title="item.defaultLable" v-model="childDataList[index].rowValue[i].value"></x-textarea>
        <!-------数字------>
        <x-number v-if="item.componentName=='numberfield'" :placeholder="item.defaultProps"
                  v-bind:title="item.defaultLable" v-model="childDataList[index].rowValue[i].value"></x-number>
        <!-------单选------>
        <selector v-if="item.componentName=='ddselectfield'" direction="right" :options="item.defaultOptions"
                  :placeholder="item.defaultProps" v-model="childDataList[index].rowValue[i].value"
                  v-bind:title="item.defaultLable"></selector>
        <!-------多选框------>
        <div class="weui-cell box" v-if="item.componentName=='ddmultiselectfield'">
          <div class="weui-cell__hd" style="width:4.5em">{{item.defaultLable}}</div>
          <checker type="checkbox" v-model="childDataList[index].rowValue[i].value" default-item-class="demo1-item"
                   selected-item-class="demo1-item-selected">
            <checker-item v-for="(option,index) in item.defaultOptions" :value="option.idx">{{option.text}}
            </checker-item>
          </checker>
        </div>
        <!-------日期时间------>
        <datetime v-model="childDataList[index].rowValue[i].value" v-if="item.componentName=='dddatefield'"
                  :format="item.defaultFormat" :placeholder="item.defaultProps"
                  :title="item.defaultLable" :confirm-text="确定" :cancel-text="取消"></datetime>
        <!-------日期区间------>
        <div v-if="item.componentName=='dddaterangefield'">
          <datetime class="vux-1px-b" v-model="childDataList[index].rowValue[i].value[0]" :format="item.defaultFormat"
                    :placeholder="item.defaultProps"
                    :title="item.defaultLable" :confirm-text="确定" :cancel-text="取消"></datetime>
          <datetime v-model="childDataList[index].rowValue[i].value[1]" :format="item.defaultFormat"
                    :placeholder="item.defaultProps2"
                    :title="item.defaultLable2" :confirm-text="确定" :cancel-text="取消"></datetime>
          <x-input class="vux-1px-t" v-model="childDataList[index].rowValue[i].value[2]"
                   v-if="item.defaultAutorekonTime"
                   title="时长"></x-input>
        </div>
        <!-------说明文字------>
        <x-input v-if="item.componentName=='textnote'" v-model="childDataList[index].rowValue[i].value"
                 :placeholder="item.defaultProps"
                 v-bind:title="item.defaultLable"></x-input>
        <!-------金额------>
        <x-input v-if="item.componentName=='moneyfield'" v-model="childDataList[index].rowValue[i].value"
                 :placeholder="item.defaultProps"
                 v-bind:title="item.defaultLable"></x-input>
        <!-------图片------>
        <div class="weui-cell" v-if="item.componentName=='ddphotofield'">
          <div class="weui-cell_hd" style="width:4.5em;">
            {{item.defaultLable}}
          </div>
          <input @change="uploadImg" :data-index="index" :data-idx="i" class="weui-cell__bd" style="opacity: 0"
                 type="file" accept="image/*">
          <div class="weui-cell__ft right"></div>
          <grid>
            <grid-item style="margin-top:.5em;" class="no-padding" v-for="(img,idx) in imgList">
              <span :data-index="idx" @click="delImg" class="close">+</span>
              <img slot="icon" :src="img">
            </grid-item>
          </grid>
        </div>
        <!-----文件----->
        <div class="weui-cell" :data-index="index" :data-idx="i" v-if="item.componentName=='ddattachment'">
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
        <cell islink v-if="item.componentName=='externalcontactfield'" v-model="childDataList[index].rowValue[i].value"
              :title="item.defaultLable">
          <div slot="value">
            <span>{{item.defaultProps}}</span>
          </div>
        </cell>
      </div>
    </div>
    <div @click="addChild" class="weui-flex vux-1px-tb" style="padding:10px 0">
      <div class="weui-flex__item" style="display:flex;justify-content: center">
        <x-icon type="ios-plus-empty" size="30"></x-icon>
        <span style="line-height: 30px;color:dodgerblue">{{action}}</span>
      </div>
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
        childComponents: [],
        unitData: [],
        childDataList: []
      }
    },
    props: ['dataList', 'label', 'action'],
    mounted: function () {
      let self = this
      self.dataList.forEach(function (item) {
        switch (item.componentName) {
          case 'textfield':
          case 'textareafield' :
          case 'numberfield' :
          case 'ddselectfield':
          case 'dddatefield' :
          case 'textnote':
          case 'moneyfield':
          case 'externalcontactfield':
            self.unitData.push({
              label: item.defaultLable,
              value: ''
            })
            break;
          case 'ddmultiselectfield':
          case 'ddphotofield':
          case 'ddattachment':
            self.unitData.push({
              label: item.defaultLable,
              value: []
            })
            break;
          case 'dddaterangefield':
            if (item.defaultAutorekonTime) {
              self.unitData.push({
                label: [item.defaultLable, item.defaultLable2],
                value: ['', '', '']
              })
            } else {
              self.unitData.push({
                label: [item.defaultLable, item.defaultLable2],
                value: ['', '']
              })
            }
            break;
        }
      })
      self.childComponents.push(self.dataList)
      self.childDataList.push({rowValue: JSON.parse(JSON.stringify(self.unitData))})
    },
    methods: {
      addChild: function () {
        this.childComponents.push(this.dataList)
        this.childDataList.push({rowValue: JSON.parse(JSON.stringify(this.unitData))})
      },
      delChild: function (e) {
        let idx = e.currentTarget.getAttribute('data-index')
        this.childComponents.splice(idx, 1)
        this.childDataList.splice(idx, 1)
      },
      uploadImg: function (e) {
        let self = this
        let dom = e.currentTarget
        let childDataListIndex = dom.getAttribute('date-index')
        let rowValueIndex = dom.getAttribute('date-idx')
        let file = dom.files[0];
        let FileRead = new FileReader();
        FileRead.onload = function (event) {
          self.childDataList[childDataListIndex].rowValue[rowValueIndex].push(event.target.result);
          dom.value = ''
        }
        FileRead.readAsDataURL(file)
      },
      uploadFile: function (e) {
        let self = this;
        let dom = e.currentTarget;
        let file = dom.files[0];
        let size = (file.size / 1024).toFixed(2) + 'kb';
        let name = file.name;
        let type = file.type;
        let src = '';
        if (/image/.test(type)) {
          src = '123'
        } else {
          src = '456'
        }
        let FileRead = new FileReader();
        FileRead.onload = function (event) {
          self.fileList.push({
            title: name,
            desc: size,
            src: src,
            base: event.target.result
          })
          dom.value = ''
        }
        FileRead.readAsDataURL(file)
      },
      delImg: function (e) {
        let idx = e.currentTarget.getAttribute('data-index');
        this.imgList.splice(idx, 1)
      },
      delFile: function (e) {
        let idx = e.currentTarget.getAttribute('data-index');
        this.fileList.splice(idx, 1)
      }
    }
  }
</script>
