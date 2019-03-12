<template>
  <section style="height: 100%">
    <div style="margin-bottom: 10px">
      <el-radio-group v-model="labelPosition" >
        <el-radio-button label="collection">我的收藏</el-radio-button>
        <el-radio-button label="delivery">我的投递</el-radio-button>
      </el-radio-group>
    </div>
    <div v-if="labelPosition === 'collection'" style="width: 100%;height: calc(100% - 45px);">
      <el-scrollbar ref="myScrollbar">
        <div v-for="item in collectionJobList" class="job-item" v-bind:key="item.id" style="">
          <!--background-color:#fcfaf2-->
          <div class="body-left" style="height:100%;width:60%;padding-left: 20px">
            <div class="job-title">
              {{item.jobName}}
            </div>
            <div class="job-detail">
              <div class="detail-row">
              <span class="detail-item" style="width: 400px;display: flex;justify-content: flex-start">
                工作类型: {{ formatJobType(item.jobType )}}
              </span>
                <span style="color: #006284;font-size: 16px">
                招聘人数: {{item.requireNum}}
              </span>
              </div>
              <div class="detail-row">
              <span class="detail-item" style="width: 400px;display: flex;justify-content: flex-start">
                工作地点: {{formatRegion(item.region)  }}
              </span>
                <span style="color: #006284;font-size: 16px">
                学历要求: {{ formatAcademicRequirements(item.academicRequirements) }}
              </span>
              </div>
            </div>
          </div>
          <div class="body-right" style="padding-right: 20px">
            <span style="font-size: 16px;color: #006284;margin-right: 25px">
              薪资 <span style="color: rgb(255,129,45);font-size: 1.4rem;font-weight: bold">{{item.salary }}</span>
            </span>
            <span style="font-size: 16px;color: #006284;margin-right: 25px">{{formatPayMethod(item,'')}}</span>
            <el-button type="primary" @click="toDetailPage(item)">查看详情</el-button>
          </div>
          <!--<div class="cell_dashed"></div>-->
        </div>
      </el-scrollbar>
    </div>
    <div v-else style="width: 100%;height: calc(100% - 45px);background-color: #aaa;">

    </div>
  </section>
</template>

<script>
  import {

  } from "../api/job";
  import * as util from "../common/utils/util"
  import store from "../vuex/store"
  import {getAllCollectionJobAPI} from "../api/job";
  import {getPositionOption} from "../common/js/position";
  import {getJobTypeAPI} from "../api/job";
  export default {
      name: "appliedJob",
      data(){
        return {
          labelPosition:'collection',
          collectionJobList:[],
          job_type_options: [],
          job_type_child: [],
          addressArray: [],
          region_options:[],

        }
      },
      computed:{
        user: {
          get: function () {
            return this.$store.state.user;
          },
          set: function () {

          }
        },
      },
      methods:{
        deepTraversal: function (node) {
          if (!util.isEmpty(node)) {
            node.forEach(a => {
              let temp = JSON.parse(JSON.stringify(a));
              this.deepTraversal(temp.children);
              temp.children = "";
              this.addressArray.push(temp);
            });
          }
        },
        //format函数--------------------------------------
        formatPayMethod: function (row) {
          switch (row.payMethod) {
            case "0" :
              return "不限";
            case "1" :
              return "日结";
            case "2" :
              return "周结";
            case "3" :
              return "月结";
            case "4" :
              return "完工结";
            case "5" :
              return "按件结";
            default:
              return "";
          }

        },

        formatJobType: function (jobType) {
          let temp = JSON.parse(JSON.stringify(jobType));
          let lastItem = temp.pop();
          let result = "";
          this.job_type_child.forEach(a => {
            if (lastItem == a.value) {
              result = a.label;
            }
          });
          return result;
        },
        formatRegion: function (address) {
          let result = "";
          if (util.isEmpty(address)) {
            return result;
          } else {
            let temp = JSON.parse(JSON.stringify(address));
            let last = temp.pop();
            this.addressArray.forEach(a => {
              if (a.value === last) {
                result = a.label;
              }
            });
            return result;
          }
        },
        formatAcademicRequirements: function (index) {
          switch (index) {
            case "0":
              return "不限";
            case "1":
              return "专科";
            case "2":
              return "本科";
            case "3":
              return "研究生";
            case "4":
              return "硕士";
            default:
              break;
          }
        },
        toDetailPage:function(row){
          this.$router.push({path: '/jobDetail/', query: {job: JSON.stringify(row)}});
        },
      },
      mounted(){

        this.region_options = getPositionOption();
        this.deepTraversal(this.region_options);
        //获取所有收藏的兼职
        getAllCollectionJobAPI({}).then(res=>{
          if (res.code === 200){
            this.collectionJobList = res.data;
          } else {
            if (res.code === 2) {
              this.$store.commit('signInDialogVisibleTrue');
            }
            this.$message.error(res.msg);
          }
        });

        getJobTypeAPI().then(res => {
          if (res.code === 200) {
            this.job_type_options = res.data;
            console.log("123 " + res.data)
            if (!util.isEmpty(res.data)) {
              this.job_type_options.forEach(a => {
                let child = a.children;
                this.job_type_child = this.job_type_child.concat(child);
              })
            }
          } else {
            console.error("工作类型下拉列表获取失败");
          }

        });
      }
  }
</script>

<style scoped>
  .job-item {
    width: 100%;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    /*border: 1px solid rgb(238, 238, 238);*/
    margin-bottom: 18px;
  }

  .job-item .body-right {
    height: 100%;
    width: 40%;
    display: flex;
    justify-content: flex-end;
    align-items: center
  }

  .job-item .job-title {
    height: 40%;
    width: 100%;
    font-size: 18px;
    display: flex;
    justify-content: flex-start;
    align-items: center
  }

  .job-item .job-detail {
    height: 60%;
    width: 100%;
  }

  .job-item .job-detail .detail-row {
    height: 50%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .detail-row .detail-item {
    color: #006284;
    font-size: 16px;
    margin-right: 150px
  }

  .cell_dashed {

    border-bottom: 1px dashed #999999;
    height: 1rem;
    /*width: 70%;*/
    margin: auto;
    margin-top: 15px;
    margin-bottom: 20px;
  }


  >>> .el-scrollbar {
    height: 100%;
    max-height: 100%;
  }
</style>
