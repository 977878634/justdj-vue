<template>
  <section>
    <el-row>
      <el-col :span="24" style="display: flex;justify-content: flex-start">
        <el-button type="primary" @click="goUp">
          返回上一页
        </el-button>
      </el-col>
    </el-row>

    <div class="job-main-info">
      <el-row style="margin-bottom: 15px">
        <span style="font-size: 22px;font-weight: bold">{{job.jobName}}</span>
      </el-row>
      <el-row style="font-size: 16px;margin-bottom: 10px;font-weight: bold">
        薪资 <span
        style="color: rgb(255,129,45);font-size: 1.4rem;font-weight: bold;margin-right: 35px">{{job.salary}}</span>
        <span> {{formatPayMethod(job)}}  |  {{ formatJobType(job.jobType )}}  |  需要{{job.requireNum}}人</span>
      </el-row>
      <el-row>
        <el-button type="primary">
          报名参加
        </el-button>
      </el-row>
    </div>

    <!--<div class="cell_dashed"></div>-->

    <div class="job-detail"
         style="width: 70%;margin: auto;display: flex;flex-direction: column;margin-top: 25px;
         justify-content: flex-start;align-items: center">

      <el-card shadow="hover" style="width: 100%;height: 60px;margin-bottom: 20px">
         <span v-show="job.type === 0"
               style="margin-bottom: 10px;font-size: 16px">福利 :
          <span style="font-weight: bold">  {{job.workLocation}}</span>
        </span>
      </el-card>

      <el-card shadow="hover" style="width: 100%;height: 60px;margin-bottom: 20px">
        <span v-show="job.type === 0"
              style="margin-bottom: 10px;font-size: 16px">详细地址 :
          <span  style="font-weight: bold">  {{job.workLocation}}</span>
        </span>
      </el-card>

      <el-card shadow="hover" style="width: 100%;">
        <span style="font-size: 18px;margin-bottom: 15px;font-weight: bold">兼职详情</span>
        <div v-html="job.jobDetails"></div>
      </el-card>


    </div>
  </section>
</template>

<script>
  import {getJobAPI, getJobTypeAPI} from "../api/job";
  import store from "../vuex/store"
  import * as util from "../common/utils/util"

  export default {
    name: "jobDetailPage",
    data() {
      return {
        job: {},
        job_type_options: [],
        job_type_child: [],
        jobTYPE:[]
      }
    },
    computed: {},
    methods: {
      goUp: function () {
        this.$router.go(-1)
      },
      formatJobType:function(jobType) {
        let temp = this.jobTYPE.concat();
        let lastItem = temp.pop();
        console.log("111 " + this.jobTYPE + "  222  "+  temp + JSON.stringify(this.job_type_child))
        let result = "";
        this.job_type_child.forEach(a => {
          console.log(a.label);
          if (lastItem == a.value) {
            console.log(123);
            result = a.label;
          }
        });
        console.log("result " + result)
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
      this.jobTYPE = this.job.jobType.concat();


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
</style>
