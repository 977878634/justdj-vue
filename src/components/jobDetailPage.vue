<template>
  <section>
    <el-row>
      <el-col :span="24" style="display: flex;justify-content: flex-start">
        <el-button icon="el-icon-arrow-left"  @click="goUp" style="margin: 0">
        </el-button>
      </el-col>
    </el-row>

    <div class="job-main-info" style="width:70%;display: flex;justify-content: center;align-items: center;margin: auto">
      <div class="job-detail-head-left" style="width: 50%;">
        <el-row style="margin-bottom: 15px">
          <span style="font-size: 22px;font-weight: bold">{{job.jobName}}</span>
        </el-row>
        <el-row style="font-size: 16px;margin-bottom: 10px;font-weight: bold">
          薪资 <span
          style="color: rgb(255,129,45);font-size: 18px;font-weight: bold;margin-right: 35px">{{job.salary}}</span>
          <span> {{formatPayMethod(job)}}  |  {{ formatJobType(job.jobType )}}  |  需要{{job.requireNum}}人 | {{formatGender()}}</span>
        </el-row>
        <el-row v-show="!isAuth">
          <el-button >
            报名参加
          </el-button>
          <el-button  @click="toChatPage">
            聊一聊
          </el-button>
          <el-button >
            收藏
          </el-button>
        </el-row>
      </div>
      <div style="width: 50%;height: 160px;background-color: #eee">
        待完善 公司信息
      </div>
    </div>

    <!--<div class="cell_dashed"></div>-->

    <div class="job-detail"
         style="width: 70%;margin: auto;display: flex;flex-direction: column;margin-top: 25px;
         justify-content: flex-start;align-items: center">

      <el-card v-show="!this.isEmpty(formatJobSalaryTreatment())"
        shadow="hover" style="width: 100%;height: 60px;margin-bottom: 20px;display: flex;justify-content: flex-start">
         <span style="margin-bottom: 10px;font-size: 16px;font-weight: bold">福利 :
           <el-tag v-for="item in formatJobSalaryTreatment()" style="margin-right: 10px">{{item}}</el-tag>
        </span>
      </el-card>

      <el-card shadow="hover" style="width: 100%;height: 60px;margin-bottom: 20px;display: flex;justify-content: flex-start">
        <span v-show="job.type === 0"
              style="margin-bottom: 10px;font-size: 16px;font-weight: bold">详细地址 :
        </span>
        <span  style="font-size: 16px">  {{job.workLocation}}</span>
      </el-card>

      <el-card shadow="hover" style="width: 100%;;">
        <span style="font-size: 18px;margin-bottom: 15px;font-weight: bold">兼职详情</span>
        <div class="detail" v-html="job.jobDetails" ></div>
      </el-card>


    </div>
  </section>
</template>

<script>
  import {dropListOneGetApi, getJobAPI, getJobTypeAPI} from "../api/job";
  import store from "../vuex/store"
  import * as util from "../common/utils/util"

  export default {
    name: "jobDetailPage",
    data() {
      return {
        editForm_gender_options: [{
          value: -1,
          label: '无性别要求'
        }, {
          value: 0,
          label: '仅限男生'
        }, {
          value: 1,
          label: '仅限女生'
        }],
        job: {},
        job_type_options: [],
        job_type_child: [],
        jobTYPE:[],
        job_salary_treatment_options:[],
        isAuth:false
      }
    },
    computed: {},
    methods: {
      toChatPage:function(){
        this.$router.push({path: '/messagePage/', query: {id: this.job.createUserId}});
      },

      isEmpty:function(v) {
        switch (typeof v) {
          case 'undefined':
            return true;
          case 'string':
            if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) return true;
            break;
          case 'boolean':
            if (!v) return true;
            break;
          case 'number':
            if (0 === v || isNaN(v)) return true;
            break;
          case 'object':
            if (null === v || v.length === 0) return true;
            for (let i in v) {
              return false;
            }
            return true;
        }
        return false;
      },

      goUp: function () {
        this.$router.go(-1)
      },

      formatGender: function(){
        let result = "";
        this.editForm_gender_options.forEach(a => {
          if (a.value == this.job.gender+"") {
            result = a.label;
          }
        })
        return result;
      },

      formatJobType:function(jobType) {
        let temp = this.jobTYPE.concat();
        let lastItem = temp.pop();
        let result = "";
        this.job_type_child.forEach(a => {
          if (lastItem == a.value) {
            result = a.label;
          }
        });
        return result;
      },

      formatJobSalaryTreatment:function(){
        let temp = this.job.salaryTreatment;
        let result = [];
        this.job_salary_treatment_options.forEach(a => {
          if (util.contains(temp,a.value)){
            result.push(a.label);
          }
        });
        return result;
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
    },
    mounted() {
      // const loading = this.$loading({
      //   lock: true,
      //   text: '拼命加载中',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // });

      // getJobAPI(this.$route.params.id).then(res => {
      //   loading.close();
      //   if (res.code === 200){
      //     this.job = res.data;
      //   } else {
      //     console.error("获取详情失败");
      //   }
      // });

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

      this.job = JSON.parse(this.$route.query.job);
      if (util.isEmpty(this.$route.query.isAuth)){
        this.isAuth = false;
      } else if (this.$route.query.isAuth === true) {
        this.isAuth = true;
      }

      this.jobTYPE = this.job.jobType.concat();

      dropListOneGetApi("job_salary_treatment").then(res => {
        if (res.code === 200) {
          this.job_salary_treatment_options = res.data;
        } else {
          console.error("福利下拉列表获取失败");
        }
      });

    }
  }
</script>

<style scoped>
  .cell_dashed {

    border-bottom: 1px dashed #999999;
    height: 1rem;
    width: 70%;
    margin: auto;
    margin-top: 15px;
    margin-bottom: 20px;
  }

  >>> .detail > p{
    display: flex ;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
  }
</style>
