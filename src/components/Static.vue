<template>

  <div class="kanban-container"
       style="width:100%;height:100%;box-sizing: border-box;padding: 14px 58px 0 58px">

    <!--公司logo等-->
    <div class="kanban-header"
         style="width: 100%;height: 92px;display: flex;justify-content: space-between;align-items: center;">

      <div class="header-logo"
           style="width: 300px;height: 100%;display: flex;justify-content: flex-start;align-items: center">
        <img src="../../static/img/company-log.png" style="height: 40px;width: 138px;"/>
      </div>

      <div class="header-title"
           @click="handleItemClick(-1)"
           style="width:70%;height:100%;cursor: pointer;
                  display: flex;justify-content: center;align-items: center;position: relative">

        <img src="/static/img/kanban-header-main-bg.png"
             style="position:absolute;top:0;left:0;width: 100%;height: 100%;"/>

        <span style="color: #fff;font-size: 40px;z-index: 100">
          {{ title }}
        </span>

      </div>

      <div class="header-time"
           style="width: 300px;">

        <span style="color: #fff;font-size: 25px;float: right">
           {{ nowTime }}
        </span>

      </div>

    </div>

    <!--主体信息-->
    <div class="kanban-body" style="width: 100%;height: 100%">

      <!--流程-->
      <div class="body-process"
           style="margin-bottom:52px;margin-top: 25px;padding: 0 38px;display: flex;justify-content: center;align-items: center;position: relative;
                  height: 223px">

        <img src="/static/img/kanban-header-left.png" style="position: absolute;top: -39px;left: -33px;height: 289px;width:213px "/>

        <div class="process-item"
             v-for="(item,index) in process"
             style="display:flex;justify-content: flex-start;align-items: center;">

          <div class="process-item-info"
               style="display: flex;flex-direction: column;justify-content: flex-start;align-items: flex-start">

            <div style="height:126px;display: flex;justify-content: flex-start;align-items: center">

              <div class="item-info-name center"
                   @click="handleItemClick(index)"
                   style="width:126px; height: 100%; margin-bottom: 10px;position: relative;cursor: pointer">

                <img style="width: 100%;height: 100%;position: absolute;top: 0;left: 0"
                     src="../../static/img/process_item_bg.png"/>

                <span class="item-name" style="font-size: 26px;color: #fff">
                  {{ item.name }}
                </span>

              </div>

              <img v-show="index < process.length - 1"
                   src="/static/img/double-arrow-right.png"
                   class="item-next" style="color: #fff;height: 34px;width: 34px;margin: 0 20px" />



            </div>


            <span v-if="index + 1 < 10" class="item-info-index center special-font" style="width:126px;color: rgb(67,154,247);font-size: 34px">
              0{{index + 1}}
            </span>
            <span v-else class="item-info-index center special-font" style="width:138px;color: rgb(67,154,247);font-size: 34px">
              {{ index + 1}}
            </span>

          </div>


        </div>

        <img src="/static/img/kanban-header-right.png" style="position: absolute;bottom: -39px;right: -33px;height: 289px;width:213px "/>
      </div>

      <!--信息展示小面板-->
      <div class="body-main" style="display: flex;justify-content: space-between;align-items: flex-start;flex-wrap: wrap;margin-right: -27px">

        <div v-for="(item,index) in process" class="panel-item"
             @click="handleItemClick(index)"
             style="width: 430px;height: 290px;margin-right: 27px;padding: 0 27px;cursor: pointer;
                margin-bottom: 40px;box-sizing: border-box;position: relative">

          <img src="/static/img/panel-item-bg.png"
          style="width: 430px;height: 290px;position: absolute;top: -8px;left:-5px;z-index: -1"/>

          <div class="panel-item-header" style="margin-bottom: 28px;margin-top: 26px;display: flex;justify-content: flex-start;align-items: flex-end">

            <span v-if="index + 1  < 10" class="special-font" style="color: rgb(67,154,247);font-size: 38px;margin-right: 10px;line-height: 38px">
              0{{index + 1}}\
            </span>
            <span v-else class="special-font" style="color: rgb(67,154,247);font-size: 38px;margin-right: 10px;line-height: 38px">
              {{index + 1}}\
            </span>

            <span style="color: #fff;font-size:30px;margin-right: 10px">
              {{item.name }}
            </span>

            <span style="color: rgb(153,153,153);font-size:20px;">
              {{ item.ename }}
            </span>

          </div>

          <div class="panel-item-body" style="display: flex;justify-content: flex-start;align-items: flex-start;flex-wrap: wrap">

            <div v-for="(childItem,index) in item.child" class="little-panel" style="width: 50%;height: 66px;flex-direction: column;justify-content: center;align-items: flex-start;" >
              <span class="little-panel-name" style="color: #fff;font-size: 26px">
                {{childItem.name}}
              </span>

              <br/>
              <span class="little-panel-data" style="color: rgb(67,154,247);font-size: 26px;margin-top: 5px">
                {{ childItem.value }} {{childItem.unit}}
              </span>
            </div>

          </div>

        </div>


      </div>

    </div>


    <el-dialog title="操作" :visible.sync="dialogVisible"
        @close="dialogClose">

      <el-form :model="formData" label-width="6.25rem">
        <el-row>
          <el-col :span="12">

            <el-form-item label="流程名称" prop="name">
              <el-input  v-model="formData.name" style="width: 18.75rem" ></el-input>
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
            <el-form-item label="温度URL" >
              <el-input  v-model="formData.child[0].url" style="width: 18.75rem" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">

            <el-form-item label="访问间隔 S">
              <el-input-number  v-model="formData.child[0].interval" style="width: 18.75rem" :min="1"> </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="压力URL" >
              <el-input  v-model="formData.child[1].url" style="width: 18.75rem" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">

            <el-form-item label="访问间隔 S">
              <el-input-number  v-model="formData.child[1].interval" style="width: 18.75rem" :min="1"> </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="PHURL" >
              <el-input  v-model="formData.child[2].url" style="width: 18.75rem" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">

            <el-form-item label="访问间隔 S">
              <el-input-number  v-model="formData.child[2].interval" style="width: 18.75rem" :min="1"> </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="电导率URL" >
              <el-input  v-model="formData.child[3].url" style="width: 18.75rem" ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">

            <el-form-item label="访问间隔 S">
              <el-input-number  v-model="formData.child[3].interval" style="width: 18.75rem" :min="1"> </el-input-number>
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
  export default {
    name: 'Static',

    data() {
      return {
        selectItemIndex: -1,
        formData:{
          "name": "",
          "ename": "",
          "child": [
            {
              "name": "温度",
              "value": 0,
              "unit": "℃",
              "url": "",
              "interval": 2
            },
            {
              "name": "压力",
              "value": 0,
              "unit": "Mpa",
              "url": "",
              "interval": 2
            },
            {
              "name": "PH",
              "value": 0,
              "unit": "",
              "url": "",
              "interval": 2
            },
            {
              "name": "电导率",
              "value": 0,
              "unit": "us/cm",
              "url": "",
              "interval": 2
            },

          ],

        },
        dialogVisible:false,
        nowTimeInterval: 0,
        nowTime: '',
        intervalHandle: [],
        title: '智能前处理工艺看板',
        process: [
          {
            "name": "预脱脂",
            "ename": "Pre-degreasing",
            "child": [
              {
                "name": "温度",
                "value": 31,
                "unit": "℃",
                "url": "http://mes.mes.ycxz-china.com/api/kanban/getData?id=5b762ff95c2ba90001130cde&quotaId=8520082569",
                "interval": 2
              },
              {
                "name": "压力",
                "value": 0.07,
                "unit": "Mpa",
                "url": "http://mes.mes.ycxz-china.com/api/kanban/getData?id=5b762ff95c2ba90001130cde&quotaId=8520082569",
                "interval": 2
              },
              {
                "name": "PH",
                "value": 9.1,
                "unit": "",
                "url": "http://mes.mes.ycxz-china.com/api/kanban/getData?id=5b762ff95c2ba90001130cde&quotaId=8349651742",
                "interval": 2
              },
              {
                "name": "电导率",
                "value": 2020.00,
                "unit": "us/cm",
                "url": "http://mes.mes.ycxz-china.com/api/kanban/getData?id=5b762ff95c2ba90001130cde&quotaId=2441859916",
                "interval": 2
              },

            ],

          },
          {
            "name": "主脱脂",
            "ename": "Main-degreasing",
            "child": [
              {
                "name": "温度",
                "value": "31",
                "unit": "℃",
                "url": "www.baidu.com",
                "interval": 12
              },
              {
                "name": "压力",
                "value": "0.07",
                "unit": "Mpa",
                "url": "www.baidu.com",
                "interval": 12
              },
              {
                "name": "PH",
                "value": "9.1",
                "unit": "",
                "url": "www.baidu.com",
                "interval": 12
              },
              {
                "name": "电导率",
                "value": "2020.00",
                "unit": "us/cm",
                "url": "www.baidu.com",
                "interval": 12
              },

            ],

          },
          {
            "name": "水洗一",
            "ename": "Washed 1",
            "child": [
              {
                "name": "温度",
                "value": "31",
                "unit": "℃",
                "url": "www.baidu.com",
                "interval": 12
              },
              {
                "name": "压力",
                "value": "0.07",
                "unit": "Mpa",
                "url": "www.baidu.com",
                "interval": 12
              },
              {
                "name": "PH",
                "value": "9.1",
                "unit": "",
                "url": "www.baidu.com",
                "interval": 12
              },
              {
                "name": "电导率",
                "value": "2020.00",
                "unit": "us/cm",
                "url": "www.baidu.com",
                "interval": 12
              },

            ],

          },
          {
            "name": "水洗二",
            "ename": "Washed 2",
            "child": [
              {
                "name": "温度",
                "value": "31",
                "unit": "℃",
                "url": "www.baidu.com",
                "interval": 12
              },
              {
                "name": "压力",
                "value": "0.07",
                "unit": "Mpa",
                "url": "www.baidu.com",
                "interval": 12
              },
              {
                "name": "PH",
                "value": "9.1",
                "unit": "",
                "url": "www.baidu.com",
                "interval": 12
              },
              {
                "name": "电导率",
                "value": "2020.00",
                "unit": "us/cm",
                "url": "www.baidu.com",
                "interval": 12
              },

            ],

          },
          {
            "name": "活化",
            "ename": "activation",
            "child": [
              {
                "name": "温度",
                "value": "31",
                "unit": "℃",
                "url": "www.baidu.com",
                "interval": 12
              },
              {
                "name": "压力",
                "value": "0.07",
                "unit": "Mpa",
                "url": "www.baidu.com",
                "interval": 12
              },
              {
                "name": "PH",
                "value": "9.1",
                "unit": "",
                "url": "www.baidu.com",
                "interval": 12
              },
              {
                "name": "电导率",
                "value": "2020.00",
                "unit": "us/cm",
                "url": "www.baidu.com",
                "interval": 12
              },

            ]

          },
        ]
      }
    },

    watch: {

    },

    computed: {},

    methods: {
      dialogClose: function(){
        this.formData = {
          "name": "",
          "ename": "",
          "child": [
            {
              "name": "温度",
              "value": 0,
              "unit": "℃",
              "url": "",
              "interval": 2
            },
            {
              "name": "压力",
              "value": 0,
              "unit": "Mpa",
              "url": "",
              "interval": 2
            },
            {
              "name": "PH",
              "value": 0,
              "unit": "",
              "url": "",
              "interval": 2
            },
            {
              "name": "电导率",
              "value": 0,
              "unit": "us/cm",
              "url": "",
              "interval": 2
            },

          ],

        };
        this.selectItemIndex = -1;
      },

      addProcess: function(){
        this.process.push(this.formData);
        this.dialogVisible = false;
      },

      changeProcess: function(){
        this.process[this.selectItemIndex] = this.formData;
        this.dialogVisible = false;
      },

      delProcess: function(){
        this.process.splice(this.selectItemIndex, 1);
        this.dialogVisible = false;
      },

      handleItemClick: function(index){
        this.selectItemIndex = index;
        this.dialogVisible = true;

        if (index > -1){
          let temp = this.process[index];
          this.formData = JSON.parse(JSON.stringify(temp));
        } else{
          this.formData = {
            "name": "",
            "ename": "",
            "child": [
              {
                "name": "温度",
                "value": 0,
                "unit": "℃",
                "url": "",
                "interval": 2
              },
              {
                "name": "压力",
                "value": 0,
                "unit": "Mpa",
                "url": "",
                "interval": 2
              },
              {
                "name": "PH",
                "value": 0,
                "unit": "",
                "url": "",
                "interval": 2
              },
              {
                "name": "电导率",
                "value": 0,
                "unit": "us/cm",
                "url": "",
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

      getDataInterval: function () {
        let that = this;

        this.process.forEach(item => {

          item.child.forEach(child =>{

            //这里循环访问接口
            let temp = window.setInterval(function () {
              if (! that.isEmpty(child.url)){
                that.$axios.get(child.url)
                  .then(res => {

                    child.value = res.data[0].value;
                    console.log("qwe" +that.process[0].child[3].value)

                  });
              }
            },child.interval * 1000);

            that.intervalHandle.push(temp);

          })


        })

      },

      isEmpty: function (val) {

        return val == undefined || val == null || val === "" || val === "www.baidu.com";
      }

    },

    mounted: function () {

      this.nowTimeInterval = window.setInterval(this.getNowTime, 1000);
      this.getDataInterval();

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

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-info-name {
  }


  .kanban-container .kanban-body .body-process{

    background: -webkit-linear-gradient(left top, rgb(26,35,78) , rgb(11,23,49)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, rgb(26,35,78) , rgb(11,23,49)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, rgb(26,35,78) , rgb(11,23,49)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, rgb(26,35,78) , rgb(11,23,49)); /* 标准的语法（必须放在最后） */

  }

  .body-main .panel-item .panel-item-body .little-panel:first-child{

    margin-bottom: 25px;
  }

</style>
