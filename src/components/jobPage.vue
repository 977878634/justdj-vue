<template>
  <section>
    <!--<div v-if="sele">-->
    <div style="width: 100%;height: 100%;position: relative;">
      <!--工具条-->
      <div style="width: 100%;" class="global_toolbar">
        <el-form :inline="true" ref="filter" :model="this.filter">

          <el-form-item>
            <el-button type="primary" icon="el-icon-plus"
                       :disabled="userState"
                       @click="addButtonClick">
              <span class="toolbar_device_add">新增</span>
            </el-button>
          </el-form-item>

          <el-form-item>
            <el-input v-model="filter.jobName" placeholder="兼职名" style="width: 14rem">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-input v-model="filter.contactPerson" placeholder="联系人" style="width: 14rem">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-cascader
              style="width: 14rem"
              :options="job_type_options"
              placeholder="所属分类"
              v-model="filter.jobType">
            </el-cascader>
          </el-form-item>

          <el-form-item>
            <el-select v-model="filter.payMethod" placeholder="结算方式" style="width: 14rem">
              <el-option
                v-for="item in job_pay_method_options"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item v-show=" isEmpty(user)?false:this.contain(user.roleId,3)">
            <el-select v-model="filter.companyId" placeholder="公司" style="width: 14rem">
              <el-option
                v-for="item in companyList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="success" icon="el-icon-search" @click.native="query" :disabled="userState">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click.native="resetFilters" :disabled="userState">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-for="item in dataList" class="job-item" v-bind:key="item.id">
        <div class="body-left" style="height:100%;width:60%;">
          <div class="job-title">
            {{item.jobName}}
          </div>
          <div class="job-detail">
            <div class="detail-row">
              <span class="detail-item">
                地区: {{item.region}}
              </span>
              <span style="color: #aaa;font-size: 1.2rem">
                招聘人数: {{item.requireNum}}
              </span>
            </div>
            <div class="detail-row">
              <span class="detail-item">
                地区: {{item.region}}
              </span>
              <span style="color: #aaa;font-size: 1.2rem">
                招聘人数: {{item.requireNum}}
              </span>
            </div>
          </div>
        </div>
        <div class="body-right">
          <span style="font-size: 1.2rem;color: #aaa;margin-right: 25px">
            薪资 <span style="color: rgb(255,129,45);font-size: 1.4rem;font-weight: bold">{{item.salary }}</span>
          </span>
          <span style="font-size: 1.2rem;color: #aaa;margin-right: 25px">{{formatPayMethod(item,'')}}</span>
          <el-button type="primary">查看详情</el-button>
        </div>

      </div>

      <!--分页-->
      <div :span="24" class="toolbar" style="position: absolute;right: 0;bottom: 10px">
        <el-pagination style="float:right;"
                       :disabled="userState"
                       @current-change="handleCurrentChange"
                       :current-page="filter.currentPage"
                       :page-size="filter.pageSize"
                       layout="total,  prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>

    <!--弹出框-->
    <el-dialog
      :title="title"
      width="70%"
      center
      :close-on-press-escape="true"
      @close="editDialogClose"
      :visible.sync="editFormVisible"
      :close-on-click-modal="false">

      <el-form :model="editForm"
               label-width="7rem"
               :rules="editFormRules"
               ref="editForm">

        <el-row>
          <el-col :span="12">
            <el-form-item label="兼职名称" prop="jobName">
              <el-input v-model="editForm.jobName" autocomplete="off" style="width: 25rem"
                        placeholder="请输入兼职名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属分类" prop="jobType">
              <el-cascader
                style="width: 25rem"
                :options="job_type_options"
                v-model="editForm.jobType">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人" prop="contactPerson">
              <el-input v-model="editForm.contactPerson" autocomplete="off" style="width: 25rem"
                        placeholder="请输入联系人名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="editForm.phone" autocomplete="off" style="width: 25rem"
                        placeholder="请输入联系方式"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="薪资" prop="salary">
              <el-input-number v-model="editForm.salary" :precision="2" :min="1" :max="1000000" :step="10"
                               label="请输入招聘人数" style="width: 25rem"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招聘人数" prop="requireNum">
              <el-input-number v-model="editForm.requireNum" :precision="0" :min="1" :max="1000" :step="1"
                               label="请输入招聘人数" style="width: 25rem"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>

          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-select v-model="editForm.type" placeholder="请选择类型" style="width: 25rem">
                <el-option
                  v-for="item in editForm_type_options"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="地区" v-show="editForm.type === 0">
              <el-cascader
                style="width: 25rem"
                :options="region_options"
                v-model="editForm.region">
              </el-cascader>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row v-show="editForm.type === 0">
          <el-col :span="24">
            <el-form-item label="详细地址">
              <el-input v-model="editForm.workLocation" autocomplete="off" style="width: 65.875rem"
                        placeholder="请输入详细地址"></el-input>
            </el-form-item>

          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="结算方式" prop="payMethod">
              <el-select v-model="editForm.payMethod" placeholder="请选择结算方式" style="width: 25rem">
                <el-option
                  v-for="item in job_pay_method_options"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="福利" prop="salaryTreatment">
              <el-select v-model="editForm.salaryTreatment"
                         multiple
                         placeholder="请选择福利" style="width: 25rem">
                <el-option
                  v-for="item in job_salary_treatment_options"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="性别要求" prop="gender">
              <el-select v-model="editForm.gender" placeholder="请选择性别要求" style="width: 25rem">
                <el-option
                  v-for="item in editForm_gender_options"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需要简历" prop="needResume">
              <el-radio-group v-model="editForm.needResume" size="normal" style="width: 25rem">
                <el-radio-button label="false">否</el-radio-button>
                <el-radio-button label="true">是</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="状态" prop="enableStatus">
              <el-select v-model="editForm.enableStatus" placeholder="请设置兼职状态" style="width: 25rem">
                <el-option
                  v-for="item in editForm_enableStatus_options"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="兼职详情" prop="jobDetails">
            <vue-editor v-model="editForm.jobDetails"></vue-editor>
          </el-form-item>
        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="add">提交</el-button>
      </div>
    </el-dialog>
    <!--</div>-->
    <!--<div v-else>-->
    <!--<center><h2>亲爱的用户,您暂时没有权限查看哦.</h2></center>-->
    <!--</div>-->
  </section>
</template>

<script>

  import {
    addJobAPI,
    companyJobPageAPI, deleteJobAPI,
    deleteUserAPI,
    dropListOneGetApi, getCompanyListAPI,
    getJobTypeAPI,
    userPageFindAPI
  } from "../api/job";
  import store from "../vuex/store"
  import * as util from "../common/utils/util"
  import {VueEditor} from 'vue2-editor'
  import {getPositionOption} from "../common/js/position";

  export default {
    name: "jobpage",
    components: {
      VueEditor
    },
    data() {

      return {
        mainName: "兼职",
        //options --------------------------
        editForm_gender_options: [{
          value: -1,
          label: '无限制'
        }, {
          value: 0,
          label: '仅限男生'
        }, {
          value: 1,
          label: '仅限女生'
        }],
        editForm_type_options: [{
          value: 0,
          label: '线下'
        }, {
          value: 1,
          label: '线上'
        }],
        job_salary_treatment_options: [],
        job_pay_method_options: [],
        job_type_options: [],
        region_options: [],
        editForm_enableStatus_options: [],
        userTypeList: [],
        userStatusList: [],
        companyList: [],
        //稍微修改--------
        filter: {
          jobName: "",
          contactPerson: "",
          jobType: [],
          payMethod: "",
          companyId: '',
          pageNum: 0,
          pageSize: 10
        },
        editForm: {
          jobName: '',
          jobType: [],
          contactPerson: '',
          phone: '',
          salary: '',
          requireNum: '',
          type: '',
          region: [],
          workLocation: '',
          payMethod: '0',
          salaryTreatment: [],
          gender: -1,
          needResume: false,
          jobDetails: '',

          popularScore: 0,
          enableStatus: "3"
        },
        editFormRules: {
          jobName: [{required: true, message: '请输入兼职名称', trigger: 'blur'}],
          jobType: [{required: true, message: '请选择所属分类', trigger: 'blur'}],
          contactPerson: [{required: true, message: '请输入联系人', trigger: 'blur'}],
          phone: [{required: true, message: '请输入联系方式', trigger: 'blur'}],
          salary: [{required: true, message: '请输入薪资', trigger: 'blur'}],
          requireNum: [{required: true, message: '请输入招聘人数', trigger: 'blur'}],
          type: [{required: true, message: '请选择类型', trigger: 'blur'}],
          payMethod: [{required: true, message: '请选择结算方式', trigger: 'blur'}],
          gender: [{required: true, message: '请选择性别要求', trigger: 'blur'}],
          needResume: [{required: true, message: '请选择是否需要简历', trigger: 'blur'}],
          jobDetails: [{required: true, message: '请输入兼职详情', trigger: 'blur'}],
          enableStatus: [{required: true, message: '请选择兼职状态', trigger: 'blur'}]
        },
        //不用改----------
        dataList: [],
        total: 0,
        editFormVisible: false,
        total: 0,
        title: "",
      }

    },
    computed: {
      userState: {
        get: function () {
          let str = localStorage.getItem("user");
          if (util.isEmpty(str)) {
            console.log("user 为空")
            return true;
          } else {
            let user = JSON.parse(str);
            if (user.userStatus === 4) {
              console.log("用户状态异常");
              return true;
            } else {
              console.log("用户状态异常");
              return false;
            }
          }
        },
        set: function () {

        }
      },
      user: {
        get: function () {
          let str = localStorage.getItem("user");
          if (util.isEmpty(str)) {
            console.log("user 为空")
            return "";
          } else {
            let temp = JSON.parse(str);
            console.log("生气  " + this.contain(temp.roleId, 3));
            return temp;
          }
        },
        set: function () {

        }
      }
    },
    methods: {
      //todo 预览效果
      handleShow: function (index, row) {

      },
      //需要修改的函数------------------------------
      resetFilters: function () {
        this.filter = {
          jobName: "",
          contactPerson: "",
          jobType: [],
          payMethod: "",
          companyId: '',
          pageNum: 0,
          pageSize: 10
        };
        this.query();
      },

      resetEditForm: function () {
        this.$refs["editForm"].resetFields();
        this.editForm = {
          jobName: '',
          jobType: [],
          contactPerson: JSON.parse(localStorage.getItem("user")).name,
          phone: JSON.parse(localStorage.getItem("user")).phone,
          salary: '',
          requireNum: '',
          type: '',
          region: [],
          workLocation: '',
          payMethod: '0',
          salaryTreatment: [],
          gender: -1,
          needResume: false,
          jobDetails: '',

          popularScore: 0,
          enableStatus: "3"
        };
      },

      //基本不需要修改的函数-----------------------
      isEmpty: function (v) {
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

      contain: function (arr, val) {
        return arr.indexOf(val) != -1 ? true : false;
      },

      handleEdit: function (index, row) {
        this.editForm = JSON.parse(JSON.stringify(row));
        this.editFormVisible = true;
        this.title = "编辑" + this.mainName;
      },

      editDialogClose: function () {
        this.resetEditForm();
      },

      //处理页面跳转事件
      handleCurrentChange: function (val) {
        this.filter.pageNum = val - 1;
        this.query();
      },

      //新增或编辑提交  修改接口
      add: function () {
        this.$refs["editForm"].validate((valid) => {
          if (valid) {
            addJobAPI(this.editForm).then(res => {
              if (res.code === 200) {
                if (this.title === "编辑" + this.mainName) {
                  this.$message.success("编辑" + this
                    .mainName + "成功");
                } else {
                  this.$message.success("新增" + this.mainName + "成功");
                }
                this.editFormVisible = false;
                this.query();
              } else if (res.code === 2) {
                this.$store.commit('signInDialogVisibleTrue');
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            return false;
          }
        });
      },

      query: function () {
        console.log("分页请求");
        companyJobPageAPI(this.filter).then(res => {
          if (res.code === 200) {
            this.dataList = res.data.content;
            this.total = res.data.totalElements;
          } else if (res.code === 2) {
            this.$store.commit('signInDialogVisibleTrue');
          } else {
            this.$message.error(res.msg)
          }
        }).catch(e => {
          console.log("出错了" + e);
        });

      },

      //点击新增按钮
      addButtonClick: function () {
        this.editFormVisible = true;
        this.title = '新增' + this.mainName;
      },
      //点击删除按钮
      handleDel: function (scop, row) {

        this.$confirm('此操作将永久删除该' + this.mainName + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteJobAPI(row.id).then(res => {
            if (res.code === 200) {
              this.query();
              this.$message.success("删除成功");
            } else {
              if (res.code === 2) {
                this.$store.commit('signInDialogVisibleTrue');
              }
              this.$message.error(res.msg);
            }
          })
        }).catch(() => {
        });

      },

      //format函数--------------------------------------
      formatPayMethod: function (row, column) {
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

      formatNeedResume: function (row, column) {
        if (row.needResume === true) {
          return "需要";
        } else if (row.needResume === false) {
          return "不需要";
        } else {
          return "";
        }
      },

      formatUserSex: function (row, column) {
        if (row.gender === 0) {
          return "限男生";
        } else if (row.sex === 1) {
          return "限女生";
        } else {
          return "无限制";
        }
      }
    },
    mounted() {

      dropListOneGetApi("user_type").then(res => {
        if (res.code === 200) {
          this.userTypeList = res.data;
        } else {
          console.error("用户类型下拉列表获取失败");
        }
      });

      dropListOneGetApi("user_status").then(res => {
        if (res.code === 200) {
          this.userStatusList = res.data;
        } else {
          console.error("用户状态下拉列表获取失败");
        }
      });

      dropListOneGetApi("job_pay_method").then(res => {
        if (res.code === 200) {
          this.job_pay_method_options = res.data;
        } else {
          console.error("结算方式下拉列表获取失败");
        }
      });

      dropListOneGetApi("job_salary_treatment").then(res => {
        if (res.code === 200) {
          this.job_salary_treatment_options = res.data;
        } else {
          console.error("福利下拉列表获取失败");
        }
      });

      dropListOneGetApi("editForm_enableStatus_options").then(res => {
        if (res.code === 200) {
          this.editForm_enableStatus_options = res.data;
        } else {
          console.error("兼职状态下拉列表获取失败");
        }
      });

      getJobTypeAPI().then(res => {
        if (res.code === 200) {
          this.job_type_options = res.data;
        } else {
          console.error("工作类型下拉列表获取失败");
        }

      });

      getCompanyListAPI().then(res => {
        if (res.code === 200) {
          this.companyList = res.data;
        } else {
          console.error("工作类型下拉列表获取失败");
        }

      });

      this.editForm.contactPerson = JSON.parse(localStorage.getItem("user")).name;
      this.editForm.phone = JSON.parse(localStorage.getItem("user")).phone;
      this.region_options = getPositionOption();
      this.query();
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
    font-size: 22px;
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
    color: #aaa;
    font-size: 1.2rem;
    margin-right: 150px
  }
</style>
