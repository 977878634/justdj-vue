<template>
  <div id="app">

    <router-view/>

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
    overflow-y: scroll;
    overflow-x: hidden;
    font-size: 16px;
  }

  #app {
    width: 100%;
    height: 100%;
    color: #2c3e50;
  }

  body {
    /*下面三行解决在iphone以及safari上overFlow:hidden无效*/
    overflow: hidden;
    position: relative;
    background: url(../static/img/background/main_bg.png) center center repeat;
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 100%;
  }


</style>
