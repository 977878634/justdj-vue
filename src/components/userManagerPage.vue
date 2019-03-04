<template>
  <section>
    <!--<div v-if="sele">-->
    <div style="width: 100%;height: 100%;position: relative;">
      <!--工具条-->
      <div style="width: 100%;" class="global_toolbar">
        <el-form :inline="true"  ref="filter" :model="this.filter">

          <el-form-item>
            <el-button v-if="add" type="primary" icon="el-icon-plus"
                       @click="add('other')">
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
            <el-button type="success" icon="el-icon-search" @click.native="query" >查询</el-button>
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
                  :cell-class-name="global_table_normal"
                  style="width: 100%;position: absolute;top: 0;left: 0">
          <el-table-column prop="name" label="用户名" min-width="60" align="center">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" min-width="80" align="center">
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
              <el-tooltip  class="item" effect="dark" content="编辑" placement="top">
                <el-button size="mini" type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip  class="item" effect="dark" content="删除" placement="top">
                <el-button size="mini" type="text" icon="el-icon-delete"  @click="handleDel(scope.$index, scope.row)"></el-button>
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
    <el-dialog title="添加维护记录" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="150px" :rules="editFormRules" ref="editForm">
        <el-form-item label="执行维护时间" prop="time">
          <el-date-picker
            :editable="false"
            v-model="editForm.time"
            type="datetime" format="yyyy-MM-dd HH:mm:ss"
            placeholder="执行维护时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="执行维护人" prop="userId">
          <el-select v-model="editForm.userId" placeholder="执行维护人">
            <el-option
              v-for="item in editForm_users_options"
              :key="item.id"
              :label="item.nickName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="维护内容" prop="content">
          <el-input type="textarea" placeholder="请输入维护内容" v-model="editForm.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editFormLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--</div>-->
    <!--<div v-else>-->
    <!--<center><h2>亲爱的用户,您暂时没有权限查看哦.</h2></center>-->
    <!--</div>-->
  </section>
</template>

<script>
  import {dropListOneGetApi, userPageFindAPI} from "../api/job";

  export default {
    name: "usermanagerpage",
    data() {

      return {
        filter: {
          name: "",
          email: "",
          userType: "",
          userStatus: "",
          pageNum:0,
          pageSize:10
        },
        userList: [],
        total:0,
        userTypeList:[],
        userStatusList:[],

        editForm: {
          id: '',
          userId: '',
          time: '',
          content: ''
        },
        editFormRules: {
          userId: [{required: true, message: '请选择执行维护人', trigger: 'blur'}],
          time: [{required: true, message: '请选择执行维护时间', trigger: 'blur'}],
          content: [{required: true, message: '请填写维护内容', trigger: 'blur'}],
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
      resetFilters: function(){
        this.filter = {
          name: "",
          email: "",
          userType: "",
          userStatus: "",
          pageNum:0,
          pageSize:10
        }
        console.log("全局变量 " + this.$store.count )
      },
      add: function () {

      },
      //处理页面跳转事件
      handleCurrentChange: function (val) {
        this.filter.currentPage = val;
        this.query();
      },
      query: function () {
        console.log("分页请求");
        userPageFindAPI(this.filter).then(res => {
          if (res.code === 200){
            this.userList = res.data.content;
            this.total = res.data.totalElements;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(e => {
          console.log("出错了" + e);
        });

      }, //todo 编辑
      handleEdit: function () {

      },
//todo 删除
      handleDel: function () {

      },
      formatUserType: function (row, column) {
        if (row.type === 0){
          return "普通用户";
        } else {
          return "企业用户";
        }
      },

    },
    mounted(){

      dropListOneGetApi("user_type").then(res => {
        if (res.code === 200){
          this.userTypeList = res.data;
        } else {
          this.$message.error("用户类型下拉列表获取失败");
        }
      });

      dropListOneGetApi("user_status").then(res => {
        if (res.code === 200){
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
