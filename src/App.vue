<template>
  <div id="app">
    <transition name="fade"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>


<style>

  html, body {
    height: 100%;
    width: 100%;
    font-size: 16px;
  }

  #app {
    width: 100%;
    height: 100%;
    color: #2c3e50;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 100%;
  }

  .el-dialog{
    border-radius: 8px;
  }

</style>
