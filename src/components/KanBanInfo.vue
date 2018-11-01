<template>

  <div class="kanban-container"
       style="width:100%;height:100%;box-sizing: border-box;padding: 0.875rem 3.625rem 0 3.625rem;">

    <vue-particles
      color="#ffffff"
      :particleOpacity="0.4"
      :particlesNumber="30"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0"
      :linesDistance="150"
      :moveSpeed="0.8"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    >

    </vue-particles>

    <div v-show="isLogin" style="position: fixed;top: 85%;left: calc(50% - 59px);z-index: 200">

      <el-button @click="$router.back(-1)">
        返回上一页
      </el-button>

    </div>

    <!--公司logo等-->
    <div class="kanban-header"
         style="width: 100%;height: 5.75rem;display: flex;justify-content: space-between;align-items: center;">

      <div class="header-logo"
           style="width: 18.75rem;height: 100%;display: flex;justify-content: flex-start;align-items: center">
        <img src="/static/img/company-log.png" style="height: 2.5rem;width: 8.625rem;"/>
      </div>

      <div class="header-title"
           @click="handleItemClick(-1)"
           style="width:70%;height:100%;cursor: pointer;
                  display: flex;justify-content: center;align-items: center;position: relative">

        <img src="/static/img/kanban-header-main-bg.png"
             style="position:absolute;top:0;left:0;width: 100%;height: 100%;"/>

        <span style="color: #fff;font-size: 2.5rem;z-index: 100">
          {{ title }}
        </span>

      </div>

      <div class="header-time"
           style="width: 18.75rem;">

        <span style="color: #fff;font-size: 1.5625rem;float: right">
           {{ nowTime }}
        </span>

      </div>

    </div>

    <!--主体信息-->
    <div class="kanban-body" style="width: 100%;">

      <!--流程-->
      <div class="body-process"
           style="margin-top: 1.5625rem;padding: 0 2.375rem;display: flex;justify-content: center;align-items: center;position: relative;
                  height: 13.9375rem">

        <img src="/static/img/kanban-header-left.png"
             style="position: absolute;top: -2.4375rem;left: -2.0625rem;height: 18.0625rem;width:13.3125rem "/>

        <div class="process-item"
             v-for="(item,index) in process"
             style="display:flex;justify-content: flex-start;align-items: center;">

          <div class="process-item-info"
               style="display: flex;flex-direction: column;justify-content: flex-start;align-items: flex-start">

            <div style="height:7.875rem;display: flex;justify-content: flex-start;align-items: center">

              <div class="item-info-name center"
                   @click="handleItemClick(index)"
                   style="width:7.875rem; height: 100%; margin-bottom: 0.625rem;position: relative;cursor: pointer">

                <img style="width: 100%;height: 100%;position: absolute;top: 0;left: 0"
                     src="/static/img/process_item_bg.png"/>

                <span class="item-name" style="font-size: 1.625rem;color: #fff">
                                  {{ item.name }}
                                </span>

              </div>

              <img v-show="index < process.length - 1"
                   src="/static/img/double-arrow-right.png"
                   class="item-next"
                   style="color: #fff;height: 2.125rem;width: 2.125rem;margin: 0 1.25rem"/>


            </div>


            <span v-if="index + 1 < 10" class="item-info-index center special-font"
                  style="width:7.875rem;color: rgb(67,154,247);font-size: 2.125rem">
                          0{{index + 1}}
                        </span>
            <span v-else class="item-info-index center special-font"
                  style="width:7.875rem;color: rgb(67,154,247);font-size: 2.125rem">
                          {{ index + 1}}
                        </span>

          </div>


        </div>

        <img src="/static/img/kanban-header-right.png"
             style="position: absolute;bottom: -2.4375rem;right: -2.0625rem;height: 18.0625rem;width:13.3125rem "/>
      </div>

      <!--信息展示小面板-->
      <div class="body-main"
           style="display: flex;justify-content: space-between;align-items: flex-start;flex-wrap: wrap;
                        align-content: space-between;">

        <div v-for="(item,index) in process" class="panel-item"
             @click="handleItemClick(index)"
             style="width: 25.875rem;height: 18.125rem;padding: 0 1.6875rem;cursor: pointer;
                            margin-bottom: 2.5rem;box-sizing: border-box;position: relative;">

          <img src="/static/img/panel-item-bg.png"
               style="width: 100%;height: 100%;position: absolute;top: -0.5rem;left:-0.3125rem;z-index: 10"/>

          <div class="panel-item-header"
               style="margin-bottom: 1.75rem;margin-top: 1.625rem;display: flex;justify-content: flex-start;align-items: flex-end">

                    <span v-if="index + 1  < 10" class="special-font"
                          style="color: rgb(67,154,247);font-size: 2.375rem;margin-right: 0.625rem;line-height: 2.375rem">
                      0{{index + 1}}\
                    </span>
            <span v-else class="special-font"
                  style="color: rgb(67,154,247);font-size: 2.375rem;margin-right: 0.625rem;line-height: 2.375rem">
                          {{index + 1}}\
                        </span>

            <span style="color: #fff;font-size:1.875rem;margin-right: 0.625rem">
                          {{item.name }}
                        </span>

            <span style="color: rgb(153,153,153);font-size:1.25rem;">
                          {{ item.ename }}
                        </span>

          </div>

          <div class="panel-item-body"
               style="display: flex;justify-content: flex-start;align-items: flex-start;flex-wrap: wrap">

            <div v-for="(childItem,index) in item.child" class="little-panel"
                 style="width: 45%;height: 4.125rem;flex-direction: column;justify-content: center;align-items: flex-start;">
                          <span class="little-panel-name" style="color: #fff;font-size: 1.625rem">
                            {{childItem.name}}
                          </span>

              <br/>
              <span class="little-panel-data"
                    style="color: rgb(67,154,247);font-size: 1.625rem;margin-top: 0.3125rem;display: inline-block;margin-top: 0;width: 200px">
                                {{ childItem.value }} {{childItem.unit}}
                              </span>
            </div>

          </div>

        </div>

        <div v-for="(item,index) in hiddenItem" class="panel-item"
             :v-show="true"
             style="width: 25.875rem;height: 18.125rem;padding: 0 1.6875rem;cursor: pointer;
                margin-bottom: 2.5rem;box-sizing: border-box;position: relative">
        </div>

      </div>

    </div>

    <el-dialog title="操作" :visible.sync="dialogVisible"
               @close="dialogClose">

      <el-form :model="formData" label-width="6.25rem">
        <el-row>
          <el-col :span="12">

            <el-form-item label="流程名称" prop="name">
              <el-input v-model="formData.name" style="width: 18.75rem"></el-input>
            </el-form-item>

          </el-col>

          <el-col :span="12">
            <el-form-item label="流程简称" prop="ename">
              <el-input v-model="formData.ename" style="width: 18.75rem"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="温度指标ID">
              <el-input v-model="formData.child[0].quotaId" style="width: 18.75rem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">

            <el-form-item label="访问间隔 S">
              <el-input-number v-model="formData.child[0].interval" style="width: 18.75rem"
                               :min="2"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="压力指标ID">
              <el-input v-model="formData.child[1].quotaId" style="width: 18.75rem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">

            <el-form-item label="访问间隔 S">
              <el-input-number v-model="formData.child[1].interval" style="width: 18.75rem"
                               :min="2"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="PH指标ID">
              <el-input v-model="formData.child[2].quotaId" style="width: 18.75rem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">

            <el-form-item label="访问间隔 S">
              <el-input-number v-model="formData.child[2].interval" style="width: 18.75rem"
                               :min="2"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="电导率指标ID">
              <el-input v-model="formData.child[3].quotaId" style="width: 18.75rem"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">

            <el-form-item label="访问间隔 S">
              <el-input-number v-model="formData.child[3].interval" style="width: 18.75rem"
                               :min="2"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>


      </el-form>

      <div slot="footer" class="dialog-footer">

        <div class="center" style="width: 100%;height: 100%;">
          <el-button type="primary" @click="addProcess">新增</el-button>
          <el-button type="primary" @click="changeProcess" :disabled="selectItemIndex < 0">修改</el-button>
          <el-button type="primary" @click="delProcess" :disabled="selectItemIndex < 0 ">删除</el-button>
          <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
        </div>

      </div>
    </el-dialog>

  </div>

</template>

<script>
  import {addOrEditCompanyKanBan, getCompanyKanBanOne, kanbanGetData} from "../api/mes";

  export default {
    name: 'kanbaninfo',

    data() {
      return {
        selectItemIndex: -1,
        formData: {
          "name": "",
          "ename": "",
          "child": [
            {
              "name": "温度",
              "value": 0,
              "unit": "℃",
              "quotaId": "",
              "interval": 2
            },
            {
              "name": "压力",
              "value": 0,
              "unit": "Mpa",
              "quotaId": "",
              "interval": 2
            },
            {
              "name": "PH",
              "value": 0,
              "unit": "",
              "quotaId": "",
              "interval": 2
            },
            {
              "name": "电导率",
              "value": 0,
              "unit": "us/cm",
              "quotaId": "",
              "interval": 2
            },

          ],

        },
        dialogVisible: false,
        nowTimeInterval: 0,
        nowTime: '',
        intervalHandle: [],
        title: '智能前处理工艺看板',
        url: "http://mes.mes.ycxz-china.com/api/kanban/getData",
        company_id: "5b762ff95c2ba90001130cde",
        process:
          [
            {
              "name": "预脱脂",
              "ename": "Pre-degreasing",
              "child": [
                {
                  "name": "温度",
                  "value": 0,
                  "unit": "℃",
                  "quotaId": "0",
                  "interval": 2
                },
                {
                  "name": "压力",
                  "value": 0,
                  "unit": "Mpa",
                  "quotaId": "0",
                  "interval": 2
                },
                {
                  "name": "PH",
                  "value": 0,
                  "unit": "",
                  "quotaId": "0",
                  "interval": 2
                },
                {
                  "name": "电导率",
                  "value": 0,
                  "unit": "us/cm",
                  "quotaId": "0",
                  "interval": 2
                }
              ]
            },
            {
              "name": "主脱脂",
              "ename": "Main-degreasing",
              "child": [
                {
                  "name": "温度",
                  "value": "0",
                  "unit": "℃",
                  "quotaId": "0",
                  "interval": 2
                },
                {
                  "name": "压力",
                  "value": "0",
                  "unit": "Mpa",
                  "quotaId": "0",
                  "interval": 2
                },
                {
                  "name": "PH",
                  "value": "0",
                  "unit": "",
                  "quotaId": "0",
                  "interval": 2
                },
                {
                  "name": "电导率",
                  "value": "0",
                  "unit": "us/cm",
                  "quotaId": "0",
                  "interval": 2
                }

              ]
            },
            {
              "name": "水洗一",
              "ename": "Washed 1",
              "child": [
                {
                  "name": "温度",
                  "value": "0",
                  "unit": "℃",
                  "quotaId": "0",
                  "interval": 2
                },
                {
                  "name": "压力",
                  "value": "0",
                  "unit": "Mpa",
                  "quotaId": "0",
                  "interval": 2
                },
                {
                  "name": "PH",
                  "value": "0",
                  "unit": "",
                  "quotaId": "0",
                  "interval": 2
                },
                {
                  "name": "电导率",
                  "value": "0",
                  "unit": "us/cm",
                  "quotaId": "1234567 ",
                  "interval": 2
                }

              ]
            },
            {
              "name": "水洗二",
              "ename": "Washed 2",
              "child": [
                {
                  "name": "温度",
                  "value": "0",
                  "unit": "℃",
                  "quotaId": "0",
                  "interval": 2
                },
                {
                  "name": "压力",
                  "value": "0",
                  "unit": "Mpa",
                  "quotaId": "0",
                  "interval": 2
                },
                {
                  "name": "PH",
                  "value": "0",
                  "unit": "",
                  "quotaId": "0",
                  "interval": 2
                },
                {
                  "name": "电导率",
                  "value": "0",
                  "unit": "us/cm",
                  "quotaId": "0",
                  "interval": 2
                }

              ]
            },
            {
              "name": "活化",
              "ename": "activation",
              "child": [
                {
                  "name": "温度",
                  "value": "0",
                  "unit": "℃",
                  "quotaId": "0",
                  "interval": 2
                },
                {
                  "name": "压力",
                  "value": "0",
                  "unit": "Mpa",
                  "quotaId": "0",
                  "interval": 2
                },
                {
                  "name": "PH",
                  "value": "0",
                  "unit": "",
                  "quotaId": "0",
                  "interval": 2
                },
                {
                  "name": "电导率",
                  "value": "0",
                  "unit": "us/cm",
                  "quotaId": "0",
                  "interval": 2
                }

              ]
            }
          ],
        resData:{},
      }
    },

    watch: {},

    computed: {
      isLogin: {
        get: function () {
          let temp = sessionStorage.getItem("token");
          console.log("token信息" + temp);
          return !this.isEmpty(temp);
        },
        set: function () {

        }
      },
      isSuperUser: {
        get: function () {
          //是不是超级管理员
        },
        set: function () {

        }
      },
      hiddenItem: {
        get: function () {
          let temp = 8 - this.process.length;
          let hiddenItem = [];
          for (let i = 0; i < temp; ++i) {
            hiddenItem.push("");
          }
          return hiddenItem;

        },
        set: function () {

        }
      }

    },

    methods: {
      dialogClose: function () {
        this.formData = {
          "name": "",
          "ename": "",
          "child": [
            {
              "name": "温度",
              "value": 0,
              "unit": "℃",
              "quotaId": "",
              "interval": 2
            },
            {
              "name": "压力",
              "value": 0,
              "unit": "Mpa",
              "quotaId": "",
              "interval": 2
            },
            {
              "name": "PH",
              "value": 0,
              "unit": "",
              "quotaId": "",
              "interval": 2
            },
            {
              "name": "电导率",
              "value": 0,
              "unit": "us/cm",
              "quotaId": "",
              "interval": 2
            },

          ],

        };
        this.selectItemIndex = -1;
      },

      getParam: function (company_id, quotaId) {

        let temp = {
          "id":"",
          "quotaId":""
        };
        if (this.isEmpty(company_id)) {
          return "";
        }


        if (this.isEmpty(quotaId))
          return "";

        temp.id = company_id;
        temp.quotaId = quotaId;

        return temp;
      },


      addProcess: function () {
        this.process.push(this.formData);
        this.dialogVisible = false;
        this.addOrUpdate();
      },

      changeProcess: function () {
        this.process[this.selectItemIndex] = this.formData;

        this.addOrUpdate();
      },

      delProcess: function () {
        this.process.splice(this.selectItemIndex, 1);
        this.dialogVisible = false;
        this.addOrUpdate();
      },

      handleItemClick: function (index) {
        if (!this.isLogin) {
          this.$message.info("用户未登录，无法编辑");
          return;
        }

        this.selectItemIndex = index;
        this.dialogVisible = true;

        if (index > -1) {
          let temp = this.process[index];
          this.formData = JSON.parse(JSON.stringify(temp));
        } else {
          this.formData = {
            "name": "",
            "ename": "",
            "child": [
              {
                "name": "温度",
                "value": 0,
                "unit": "℃",
                "quotaId": "",
                "interval": 2
              },
              {
                "name": "压力",
                "value": 0,
                "unit": "Mpa",
                "quotaId": "",
                "interval": 2
              },
              {
                "name": "PH",
                "value": 0,
                "unit": "",
                "quotaId": "",
                "interval": 2
              },
              {
                "name": "电导率",
                "value": 0,
                "unit": "us/cm",
                "quotaId": "",
                "interval": 2
              },

            ],

          }
        }


      },


      getNowTime: function () {
        // console.log(this.nowTime);
        let date = new Date();
        let splitter = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        if (month < 10) month = "0" + month;
        if (strDate < 10) strDate = "0" + strDate;
        if (hour < 10) hour = "0" + hour;
        if (minute < 10) minute = "0" + minute;
        if (second < 10) second = "0" + second;

        this.nowTime = year + splitter + month + splitter + strDate + "  " + hour + splitter + minute + splitter + second;

      },

      //设置定时访问
      getDataInterval: function () {
        let that = this;

        this.process.forEach(item => {

          item.child.forEach(child => {

            let param = that.getParam(that.company_id, child.quotaId);
            console.log("param " + JSON.stringify(param));

            if (!that.isEmpty(param)) {
              console.log("可用参数 " + JSON.stringify(param));
              //这里循环访问接口
              let temp = window.setInterval(function () {

                  kanbanGetData(param).then(res => {

                    if ( ! that.isEmpty(res[0])) {
                      child.value = res[0].value;
                    }else {
                      child.value = 0;
                    }


                    // console.log("实时刷新的数据" + JSON.stringify(child));

                  });

                }
                , child.interval * 1000);

              that.intervalHandle.push(temp);


            }

          })


        })

      },

      isEmpty: function (val) {

        return val == undefined || val == null || val === "" || val === "www.baidu.com";
      },

      //初始化数据
      initData: function () {
        let that = this;

        if (! this.isEmpty(this.company_id)) {
          getCompanyKanBanOne({company_id:this.company_id}).then(res => {
            that.resData = res;
            if (!that.isEmpty(res.process)) {
              that.process = res.process;
              console.log("初始化数据" + JSON.stringify(that.process));

              that.getDataInterval();
            }

          });
        }

      },

      addOrUpdate: function () {

        this.resData.process = this.process;

        addOrEditCompanyKanBan({companyKanBanInfo:JSON.stringify(this.resData)}).then(res => {
          if (res.code === 200){

            this.$message.success("新增或修改看板信息成功");
            this.dialogVisible = false;

          } else if(res.code === -1){

            this.$message.error("新增或修改看板信息失败");

          }
        }).catch(e => {

        });

      }

    },



    mounted: function () {

      this.nowTimeInterval = window.setInterval(this.getNowTime, 1000);

      this.company_id = this.$route.query.id;

      this.initData();

      console.log("缓存数据" + JSON.stringify(sessionStorage.getItem("token")));

    },

    destroyed: function () {

      window.clearInterval(this.nowTimeInterval);

      this.intervalHandle.forEach(item => {
        window.clearInterval(item);
      })


    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .kanban-container{
    position: fixed;
    left: 0;
    top: 0;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-info-name {
  }

  .kanban-container .kanban-body .body-process {

    background: -webkit-linear-gradient(left top, rgb(26, 35, 78), rgb(11, 23, 49)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, rgb(26, 35, 78), rgb(11, 23, 49)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, rgb(26, 35, 78), rgb(11, 23, 49)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, rgb(26, 35, 78), rgb(11, 23, 49)); /* 标准的语法（必须放在最后） */

  }

  .body-main .panel-item .panel-item-body .little-panel:first-child {

    margin-bottom: 1.5625rem;
  }

  .body-process {
    margin-bottom: 3.25rem;
  }

  @media screen and (max-width: 1366px) {

    .body-process {
      margin-bottom: 2.25rem;
    }
  }

  @media screen and (max-height: 960px){

    .kanban-container{
      /*border: 5px solid red;*/
      /*overflow: scroll;*/
      /*overflow-x: hidden;*/
    }

  }

  .lizi{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

</style>
