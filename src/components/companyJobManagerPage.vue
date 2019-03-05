<template>
  <section>
    <!--<div v-if="sele">-->
    <div style="width: 100%;height: 100%;position: relative;">
      <!--工具条-->
      <div style="width: 100%;" class="global_toolbar">
        <el-form :inline="true" ref="filter" :model="this.filter">

          <el-form-item>
            <el-button type="primary" icon="el-icon-plus"
                       @click="editFormVisible = true">
              <span class="toolbar_device_add">新增</span>
            </el-button>
          </el-form-item>

          <el-form-item>
            <el-input v-model="filter.name" placeholder="用户名" style="width: 14rem">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-input v-model="filter.email" placeholder="邮箱" style="width: 14rem">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-select v-model="filter.userType" placeholder="用户类型" style="width: 14rem">
              <el-option
                v-for="item in userTypeList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select v-model="filter.userStatus" placeholder="用户状态" style="width: 14rem">
              <el-option
                v-for="item in userStatusList"
                :label="item.label"
                :value="parseInt(item.value)">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="el-icon-search" @click.native="query">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click.native="resetFilters">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--table-->
      <div style="position: relative">
        <!--列表-->
        <el-table :data="userList"
                  highlight-current-row
                  v-loading="listLoading"
                  :header-row-class-name="'global_table_th'"
                  :row-class-name="'global_table_tr'"
                  :cell-class-name="'global_table_normal'"
                  style="width: 100%;position: absolute;top: 0;left: 0">
          <el-table-column prop="name" label="用户名" min-width="30" align="center">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="sex" label="性别" min-width="60" :formatter="formatUserSex" align="center">
          </el-table-column>
          <el-table-column prop="creditRating" label="信誉分" min-width="60" align="center">
          </el-table-column>
          <el-table-column prop="type" label="用户类型" min-width="80" :formatter="formatUserType" align="center">
          </el-table-column>
          <el-table-column prop="userStatus" label="用户状态" min-width="80" align="center">
            <template scope="scope">
              <el-tag v-if="scope.row.userStatus === 0" type="warning">账号停用</el-tag>
              <el-tag v-if="scope.row.userStatus === 2" type="success">帐号正常</el-tag>
              <el-tag v-if="scope.row.userStatus === 4" type="danger">未认证账户</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140" align="center">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button size="mini" type="text" icon="el-icon-edit"
                           @click="handleEdit(scope.$index, scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button size="mini" type="text" icon="el-icon-delete"
                           @click="handleDel(scope.$index, scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div :span="24" class="toolbar" style="position: absolute;right: 0;bottom: 10px">
        <el-pagination style="float:right;"
                       @current-change="handleCurrentChange"
                       :current-page="filter.currentPage"
                       :page-size="filter.pageSize"
                       layout="total,  prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>

    <!--弹出框-->
    <el-dialog title="新增兼职"
               width="70%"
               center
               :visible.sync="editFormVisible"
               :close-on-click-modal="false">

      <el-form :model="editForm"
               label-width="7rem"
               :rules="editFormRules"
               ref="editForm">

        <el-row>
          <el-col :span="12">
            <el-form-item label="兼职名称" prop="time">
              <el-input v-model="editForm.jobName" autocomplete="off" style="width: 25rem" placeholder="请输入兼职名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属分类" prop="userId">
              <el-select v-model="editForm.jobType" placeholder="请选择兼职所属分类" style="width: 25rem">
                <el-option
                  v-for="item in editForm_users_options"
                  :key="item.id"
                  :label="item.nickName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人" prop="time">
              <el-input v-model="editForm.contactPerson" autocomplete="off" style="width: 25rem" placeholder="请输入联系人名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="userId">
              <el-input v-model="editForm.phone" autocomplete="off" style="width: 25rem" placeholder="请输入联系方式"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="薪资" prop="userId">
              <el-input-number v-model="editForm.salary" @change="handleChange" :precision="2" :min="1" :max="1000000" :step="10" label="请输入招聘人数" style="width: 25rem"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招聘人数" prop="userId">
              <el-input-number v-model="editForm.requireNum" @change="handleChange" :precision="0" :min="1" :max="1000" :step="1" label="请输入招聘人数" style="width: 25rem"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>

          <el-col :span="12">
            <el-form-item label="类型" prop="userId">
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
            <el-form-item label="地区" prop="userId">
              <el-select v-model="editForm.region" placeholder="请选择地区" style="width: 25rem">
                <el-option
                  v-for="item in editForm_users_options"
                  :key="item.id"
                  :label="item.nickName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="详细地址" prop="content">
              <el-input v-model="editForm.workLocation" autocomplete="off" style="width: 65.875rem" placeholder="请输入详细地址"></el-input>
            </el-form-item>

          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="结算方式" prop="userId">
              <el-select v-model="editForm.payMethod" placeholder="请选择结算方式" style="width: 25rem">
                <el-option
                  v-for="item in editForm_users_options"
                  :key="item.id"
                  :label="item.nickName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="福利" prop="userId">
              <el-select v-model="editForm.salaryTreatment" placeholder="请选择薪资待遇" style="width: 25rem">
                <el-option
                  v-for="item in editForm_users_options"
                  :key="item.id"
                  :label="item.nickName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="性别要求" prop="userId">
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
            <el-form-item label="需要简历" prop="userId">
              <el-radio-group v-model="editForm.needResume" size="normal" style="width: 25rem">
                <el-radio-button label="false">否</el-radio-button>
                <el-radio-button label="true">是</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
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

  import {deleteUserAPI, dropListOneGetApi, userPageFindAPI} from "../api/job";
  import store from "../vuex/store"

  export default {
    name: "jobManagerPage",
    data() {

      return {
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
        editForm_type_options:[{
          value: 0,
          label: '线下'
        }, {
          value: 1,
          label: '线上'
        }],
        filter: {
          name: "",
          email: "",
          userType: "",
          userStatus: "",
          pageNum: 0,
          pageSize: 10
        },
        userList: [],
        total: 0,
        userTypeList: [],
        userStatusList: [],

        editForm: {
          jobName: '',
          jobType: '',
          contactPerson: '',
          phone: '',
          salary: '',
          requireNum: '',
          type: '',
          region: '',
          workLocation: '',
          payMethod: '',
          salaryTreatment: '',
          gender: -1,
          needResume: false,
          jobDetails:'',

          popularScore:0,
          enableStatus: 1
        },
        editFormRules: {
          // userId: [{required: true, message: '请选择执行维护人', trigger: 'blur'}],
          // time: [{required: true, message: '请选择执行维护时间', trigger: 'blur'}],
          // content: [{required: true, message: '请填写维护内容', trigger: 'blur'}],
        },
        editFormVisible: false,

        loading: false,
        editFormLoading: false,
        listLoading: false,

        maintenance: [],
        total: 0,
        page: 1,
        device_options: [],
        users_options: [],
        editForm_users_options: [],
        lunarData: [],
      }

    },
    methods: {
      resetFilters: function () {
        this.filter = {
          name: "",
          email: "",
          userType: "",
          userStatus: "",
          pageNum: 0,
          pageSize: 10
        };
      },
      add: function () {

      },
      //处理页面跳转事件
      handleCurrentChange: function (val) {
        this.filter.pageNum = val - 1;
        this.query();
      },
      query: function () {
        console.log("分页请求");
        userPageFindAPI(this.filter).then(res => {
          if (res.code === 200) {
            this.userList = res.data.content;
            this.total = res.data.totalElements;
          } else {
            if (res.code === 2) {
              this.$store.commit('signInDialogVisibleTrue');
            }
            this.$message.error(res.msg);
          }
        }).catch(e => {
          console.log("出错了" + e);
        });

      },
      //todo 编辑
      handleEdit: function () {

      },

      handleDel: function (scop, row) {

        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUserAPI(row.id).then(res => {
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

      formatUserType: function (row, column) {
        if (row.type === 0) {
          return "普通用户";
        } else if (row.type === 1) {
          return "企业用户";
        } else {
          return "";
        }
      },

      formatUserSex: function (row, column) {
        if (row.sex === "0") {
          return "男";
        } else if (row.sex === "1") {
          return "女";
        } else {
          return "";
        }
      }
    },
    mounted() {

      dropListOneGetApi("user_type").then(res => {
        if (res.code === 200) {
          this.userTypeList = res.data;
        } else {
          this.$message.error("用户类型下拉列表获取失败");
        }
      });

      dropListOneGetApi("user_status").then(res => {
        if (res.code === 200) {
          this.userStatusList = res.data;
        } else {
          this.$message.error("用户类型下拉列表获取失败");
        }
      });

      this.query();
    }
  }
</script>

<style scoped>

</style>
