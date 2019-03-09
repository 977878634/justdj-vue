<template>
  <section>
    <el-input v-model="inputData"></el-input>
    <el-button @click="sendToUserMessage(JSON.parse(JSON
    .stringify(inputData)),'15c7e444106955f315c7e143e')">发送</el-button>
    <div v-html="content"></div>
  </section>
</template>

<script>
  import store from "../vuex/store"
  import * as util from "../common/utils/util"

  export default {
      name: "messagePage",
    data() {
        return {
          user:{},
          token:"",
          websocket: null,
          content:'',
          inputData:'',
          message:{
            toUserType:0,
            messageType:0,
            from:'',
            to:'',
            fromUserName:'',
            toUserName:'',
            data:''
          }
        }
    },
    computed:{

    },
    methods:{

      sendToUserMessage:function(msg,to){
        this.message.from = this.user.id;
        this.message.to = to;
        this.message.data = msg;
        this.message.toUserType = 0;
        this.message.messageType = 1;
        this.send(this.message);
      },

      sendToAllUserMessage:function(msg,to){
        this.message.from = this.user.id;
        this.message.to = to;
        this.message.data = msg;
        this.message.toUserType = 0;
        this.message.messageType = 1;
        this.send(message);
      },

      //todo 这个部分可以处理一下  判断信息类型
      //将消息显示在网页上
      handlecontent:function (data){
        this.content += data.from + " 发来消息 " +  data.data + '<br/>';
      },


      //关闭连接
      closeWebSocket:function (){
        this.websocket.close();
      },

      //发送消息
      send:function (message){
        this.websocket.send(JSON.stringify(message));
        this.content += "我发的消息 " + this.message.data + '<br/>';
        this.message.data = "";
      }
    },
    mounted (){
      let that = this;
      this.user = JSON.parse(localStorage.getItem("user"));
      this.token = localStorage.getItem("token");
      if (util.isEmpty(this.user)) {
        //弹出登录框
        this.$store.commit('signInDialogVisibleTrue');
      }
      //判断当前浏览器是否支持WebSocket
      if('WebSocket' in window){
        let url = "ws://" + process.env.COLLECTION_URL.toString().replace('http://','') + "/api/webSocket/";
        // let url = "ws://47.102.199.98:9003/api/webSocket/";
        console.log("地址 " + url);
        this.websocket = new WebSocket(url + this.token);
      }
      else{
        alert('Not support websocket')
      }

      //连接发生错误的回调方法
      this.websocket.onerror = function(){
        that.$message.error("webSocket 连接错误");
      };

      //连接成功建立的回调方法
      this.websocket.onopen = function(event){
        that.$message.success("webSocket 会话连接成功");
      };

      //接收到消息的回调方法
      this.websocket.onmessage = function(event){
        let data = JSON.parse(event.data);
        console.log("收到的消息 " + data);
        if (data.messageType === -1){
          console.log("连接信息 不予显示");
        } else{
          that.handlecontent(data);
        }
      };

      //连接关闭的回调方法
      this.websocket.onclose = function(){
        that.$message.info("webSocket 连接已关闭");
      };

      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function(){
        that.websocket.close();
      }

    }
  }
</script>

<style scoped>

</style>
