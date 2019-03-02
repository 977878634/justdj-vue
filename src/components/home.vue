<template>
    <section style="height: 100%">
      <el-container class="el-container main-page">
        <el-header style="position: relative">
          <div class="home-log">
            校园兼职
            <span style="font-size: 1rem;margin-left: 10px">
              <i class="el-icon-location-outline"></i>
              北京
            </span>
          </div>
          <el-menu :default-active="this.$route.path"
                   class="el-menu-demo"
                   mode="horizontal"
                   router
                   @select="handleSelect">
            <el-menu-item index="/indexPage" key="">首页</el-menu-item>
            <el-menu-item index="/jobPage" >兼职查询</el-menu-item>
            <el-menu-item index="/userManagerPage">用户管理</el-menu-item>
            <el-menu-item index="/jobTypeManagerPage">类别管理</el-menu-item>
            <el-menu-item index="/jobManagerPage">兼职管理</el-menu-item>
            <el-menu-item index="/dataAnalysePage">数据分析</el-menu-item>
            <el-menu-item index="/messagePage">消息</el-menu-item>
          </el-menu>

          <div class="main-signIn"  >
            <el-button type="text" @click = "signInDialogVisible = true" v-show="!isLogin">登录</el-button>
            <el-button type="text" @click = "signUpDialogVisible = true" v-show="!isLogin">注册</el-button>

            <el-dropdown v-show="isLogin">
              <span class="el-dropdown-link">
                {{user === null ? '' : user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item divided @click.native="">个人中心</el-dropdown-item>
                <el-dropdown-item divided @click.native="updatePasswordVisible = true">修改密码</el-dropdown-item>
                <el-dropdown-item divided @click.native="signOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view style="height: 100%"></router-view>
        </el-main>

        <!--登录弹窗-->
        <el-dialog title="登录" :visible.sync="signInDialogVisible"
                   center
                   width="31%"
                   :close-on-click-modal="false"
                    >
          <el-form :model="signInForm" :rules="signInRules"
                   label-width="6.25rem"
                   label-position="left">
            <el-form-item label="手机号"  prop="phone">
              <el-input v-model="signInForm.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码"  prop="password">
              <el-input type="password" v-model="signInForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" center="true">
            <el-button @click="signInDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="signIn">确 定</el-button>
          </div>
        </el-dialog>

        <!--注册弹窗-->
        <el-dialog title="注册"
                   :visible.sync="signUpDialogVisible"
                   center
                   :close-on-click-modal="false">
          <div style="width: 100%;display: flex;justify-content: center;margin-bottom: 10px">
            <el-radio-group v-model="labelPosition" size="small" >
              <el-radio-button label="left">普通用户</el-radio-button>
              <el-radio-button label="right">企业用户</el-radio-button>
            </el-radio-group>
          </div>
          <el-form :model="signUpForm"
                   v-show="labelPosition === 'left'"
                   label-position="left"
                   label-width="6rem">

            <el-row>
              <el-col :span="12">
                <el-form-item label="手机号"  >
                  <el-input v-model="signUpForm.name" autocomplete="off" style="width: 18.75rem"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" label="">
                <el-button style="margin-left: 3.5rem">发送验证码</el-button>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名" >
                  <el-input v-model="signUpForm.name" autocomplete="off" style="width: 18.75rem"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别" style="float: right" >
                  <el-radio-group v-model="signUpForm.name" size="normal" style="width: 18.75rem">
                    <el-radio-button label="boy">男</el-radio-button>
                    <el-radio-button label="girl">女</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="密码" >
                  <el-input v-model="signUpForm.name" autocomplete="off" style="width: 18.75rem"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="重复密码" style="float: right">
                  <el-input v-model="signUpForm.name" autocomplete="off" style="width: 18.75rem"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>

          <el-form :model="signUpForm"
                   v-show="labelPosition === 'right'"
                   label-position="left"
                   label-width="6rem">

            <el-row>
              <el-col :span="12">
                <el-form-item label="手机号"  >
                  <el-input v-model="signUpForm.name" autocomplete="off" style="width: 18.75rem"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" label="">
                <el-button style="margin-left: 3.5rem">发送验证码</el-button>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人" >
                  <el-input v-model="signUpForm.name" autocomplete="off" style="width: 18.75rem"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司名称" style="float: right">
                  <el-input v-model="signUpForm.name" autocomplete="off" style="width: 18.75rem"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="密码" >
                  <el-input v-model="signUpForm.name" autocomplete="off" style="width: 18.75rem"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="重复密码" style="float: right">
                  <el-input v-model="signUpForm.name" autocomplete="off" style="width: 18.75rem"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="signUpDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="signUp">确 定</el-button>
          </div>
        </el-dialog>
      </el-container>
    </section>
</template>

<script>

  import {signInAPI,
    signOutAPI
  } from "../api/job";

  export default {
    data() {
      return {
        labelPosition:"left",
        isLogin:false,
        signInDialogVisible:false,
        signInForm:{
          "phone":"",
          "password":""
        },
        signInRules:{
          "phone":[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号为11个数字', trigger: 'blur' }
          ],
          "password":[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        signUpForm:{
          "name":"",
          "area":""
        },
        signUpDialogVisible:false,
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    computed:{
      user:{
        get:function () {
          console.log("get  " + localStorage.getItem("user"));
          return JSON.parse(localStorage.getItem("user"));
        },
        set:function () {

        }
      }
    },
    methods: {
      handleSelect: function (a, b) {
        console.log("当前路径" + this.$route.path);
      },

      signIn: function () {
        var loginParams = { phone:this.signInForm.phone,password: this.signInForm.password };

        signInAPI(loginParams).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.msg);
            sessionStorage.setItem('token', res.data.t);
            localStorage.setItem('token', res.data.t);
            sessionStorage.setItem('user', JSON.stringify(res.data.u));
            localStorage.setItem('user', JSON.stringify(res.data.u));
            this.signInDialogVisible = false;
            this.isLogin = true;
          } else {
            this.$message.error({message: res.msg});
            this.isLogin = false;
          }
        }).catch((err) => {
          console.log(err);
          this.$message.error('登录失败，网络异常,请重试');
        });
      },

      signOut: function () {
        var loginParams = { phone:this.signInForm.phone,password: this.signInForm.password };

        signOutAPI().then((res) => {
          this.isLogin = false;
          if (res.code === 200) {
            this.$message.success("退出登录成功");
          } else {
            this.$message.error({message: res.msg});
            this.isLogin = false;
            sessionStorage.clear();
            localStorage.clear();
          }
        }).catch((err) => {
          console.log(err);
          this.$message.error('登录失败，网络异常,请重试');
        });
      },

      signUp: function () {

      }
    },
    mounted() {

    }
  }

</script>
<style scoped>
  .el-container{
    width: 100%;
    height: 100%;
    min-width: 1024px;
  }

  .main-page{
    padding: 0 9rem;
  }


  /*.signInDialog{*/
    /*width: 80%;*/
  /*}*/

  .el-header {
    /*background-color: #B3C0D1;*/
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .home-log{
    width: 160px;
    height: 100%;
    background-color: #eee;
    margin-right: 15px;
    font-size: 1.4rem;
    display: flex;
    justify-content: center;
    padding-bottom: 4px;
  }

  .main-signIn{
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 120px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: calc(100% - 60px);
  }

</style>
