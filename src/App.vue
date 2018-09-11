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

  @media screen and (min-height: 1080px) {
    html, body {
      overflow: hidden;
    }
  }

  @media screen and (max-width: 2040px) {
    html {
      font-size: 17px;
      box-sizing: border-box;
    }
  }

  @media screen and (max-width: 1920px) {
    html {
      font-size: 16px;
    }
  }

  @media screen and (max-width: 1680px) {
    html {
      font-size: 15px;
    }
  }

  @media screen and (max-width: 1480px) {
    html {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 1440px) {
    html {
      font-size: 13px;
    }
  }

  @media screen and (max-width: 1366px) {

    body, html {
      font-size: 11.3776px;
    }
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
