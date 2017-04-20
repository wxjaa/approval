<template>
  <div>
    <!--<div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1></h1>
    </div>
    <group title="cell demo">
      <cell title="Vux" value="Cool" is-link></cell>
    </group>-->
    <group id="group" label-width="4.5em" label-margin-right="2em" label-align="left">
      <div style="margin-top: 0.5em;background: #fff" v-for="(item,i) in dataList">
        <!-------单行输入------>
        <x-input v-model="unitData[i].value" v-if="item.componentName=='textfield'" :show-clear="false"
                 :placeholder="item.defaultProps"
                 v-bind:title="item.defaultLable"></x-input>
        <!-------多行输入------>
        <x-textarea v-model="unitData[i].value" v-if="item.componentName=='textareafield'"
                    :placeholder="item.defaultProps"
                    v-bind:title="item.defaultLable"></x-textarea>
        <!-------数字------>
        <x-number v-model="unitData[i].value" v-if="item.componentName=='numberfield'"
                  :placeholder="item.defaultProps"
                  v-bind:title="item.defaultLable"></x-number>
        <!-------单选------>
        <selector v-model="unitData[i].value" v-if="item.componentName=='ddselectfield'"
                  :options="item.defaultOptions"
                  :placeholder="item.defaultProps" v-bind:title="item.defaultLable"></selector>
        <!-------多选框------>
        <div class="weui-cell box" v-if="item.componentName=='ddmultiselectfield'">
          <div class="weui-cell__hd" style="width:4.5em">{{item.defaultLable}}</div>
          <checker v-model="unitData[i].value" type="checkbox" default-item-class="demo1-item"
                   selected-item-class="demo1-item-selected">
            <checker-item v-for="(option,index) in item.defaultOptions" :value="option.idx">{{option.text}}
            </checker-item>
          </checker>
        </div>
        <!-------日期时间------>
        <datetime v-model="unitData[i].value" v-if="item.componentName=='dddatefield'" :format="item.defaultFormat"
                  :placeholder="item.defaultProps"
                  :title="item.defaultLable"></datetime>
        <!-------日期区间------>
        <div v-if="item.componentName=='dddaterangefield'">
          <datetime v-model="unitData[i].value[0]" :format="item.defaultFormat" :placeholder="item.defaultProps"
                    :title="item.defaultLable"></datetime>
          <datetime v-model="unitData[i].value[1]" :format="item.defaultFormat" :placeholder="item.defaultProps2"
                    :title="item.defaultLable2"></datetime>
          <x-input v-model="unitData[i].value[2]" v-if="item.defaultAutorekonTime"
                   title="时长"></x-input>
        </div>
        <!-------说明文字------>
        <x-input v-model="unitData[i].value" v-if="item.componentName=='textnote'" :placeholder="item.defaultProps"
                 v-bind:title="item.defaultLable"></x-input>
        <!-------金额------>
        <x-input v-model="unitData[i].value" v-if="item.componentName=='moneyfield'"
                 :placeholder="item.defaultProps"
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
        <cell v-model="unitData[i].value" islink v-if="item.componentName=='externalcontactfield'"
              :title="item.defaultLable">
          <div slot="value">
            <span>{{item.defaultProps}}</span>
          </div>
        </cell>
        <!-----明细------>
        <child v-if="item.componentName=='tablefield'" :idx="i" :action="item.defaultAction"
               :label="item.defaultLable"
               :dataList="item.components">

        </child>
      </div>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState,mapActions} from 'vuex'
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
  import child from './from.vue'
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
      child,
      XImg
    },

    data () {
      return {
        msg: '',
        dataList: [],
        imgList: [],
        fileList: [],
        unitData: []
      }
    },
    mounted: function () {
      let self = this;
      this.$http.get('http://192.168.31.105:3000/components').then(function (res) {
        self.$store.dispatch('changeTitle', res.data.title)

        res.data.components.forEach(function (item) {
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
            case 'tablefield':
              self.unitData.push({
                label: item.defaultLable,
                value: []
              });
              self.$store.dispatch('addTableComponentsTotal')
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
        console.log(self.unitData)

        self.dataList = res.data.components
      }, function (res) {
        console.error(res)
      })
    },
    methods: {
      uploadImg: function (e) {
        let self = this
        let dom = e.currentTarget
        let file = dom.files[0];
        let FileRead = new FileReader();
        FileRead.onload = function (event) {
          self.imgList.push(event.target.result);
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
    },

    computed: mapState({
      isLoading: state=>state.isLoading
    }),
    created: function () {
      let self = this;
      vue.$on("save", function () {
        console.log('save save save')
        self.$store.dispatch('updateData', self.unitData)
        vue.$emit('saveChild')
        /* self.unitData.forEach(function (item) {

         })*/
      })
    }
  }
</script>

<style>
  #group > div {
    background: #ccc !important;
  }

  .demo1-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
  }

  .vux-x-icon {
    fill: red
  }

  .demo1-item-selected {
    border: 1px solid green;
  }

  .close {
    position: absolute;
    top: -.5em;
    right: .5em;
    background: red;
    font-weight: bold;
    color: #fff;
    width: 1em;;
    height: 1em;
    border-radius: 100%;
    text-align: center;
    line-height: .9em;
    transform: rotate(45deg);
  }

  .no-padding {
    padding: 0 1em 0 0 !important;
  }

  .weui-grid__icon {
    width: 100% !important;
    height: auto !important;
    margin: 0 auto;
  }

  .right:after {
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 15px;
  }
</style>
