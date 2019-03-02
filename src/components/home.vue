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

          <div class="main-signIn">
            <el-button type="text">登录/注册</el-button>
          </div>
        </el-header>
        <el-main>
          <router-view style="height: 100%"></router-view>
        </el-main>
      </el-container>
    </section>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect: function (a, b) {
        console.log("当前路径" + this.$route.path);
      },
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
    margin-right: 20px;
    font-size: 1.7rem;
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
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: calc(100% - 60px);
  }

</style>
