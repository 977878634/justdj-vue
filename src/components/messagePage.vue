<template>
  <section>

    <div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center">

      <div
        style="width: 15%;height: 100%;display: flex;flex-direction: column;justify-content: flex-start;align-items: center">
        <div  style="display: flex;justify-content: flex-start;width: 100%">
          <el-button icon="el-icon-arrow-left" type="primary" @click="goUp" style="margin: 0">
          </el-button>
        </div>
        <span style="font-size: 18px;font-weight: bold;margin-bottom: 15px;margin-top: 10px">最近联系列表</span>
        <div class="user_item"
             style="width: 100%;height: 40px;background-color: #67c23a;display: flex;justify-content: flex-start;align-items: center">
          <span>用户名</span>
          <span>公司名</span>
        </div>
      </div>

      <div class="chat-body"
           style="width: 85%;height: 100%;max-height:100%;box-sizing: border-box;overflow: hidden;display: flex;flex-direction: column;justify-content: flex-start;align-items: left">

        <!--<div style="width: 100%;height: 60%;max-height:60%;background-color: #a4da89">-->

        <div style="width: 85%;height: 58%;max-height:60%;overflow-y: scroll;overflow-x: hidden;margin-bottom: 1.5%">
          <!--<div v-html="content"></div>-->
          <div v-for="item in messageList">
            <el-row style="width: 100%">
              <el-col v-if="item.from !== user.id && item.from !== 'system'" :span="18" :offset="0"
                      style="margin-bottom: 10px;display: flex;justify-content: flex-start;align-items: center">
                <span style="font-size: 16px;font-weight: bold">{{item.fromUserName}}  : </span>
                <el-card shadow="hover" >
                  <span v-html="item.data">
                  </span>
                </el-card>
              </el-col>
              <el-col v-if="item.from === user.id" :span="18" :offset="6"
                      style="margin-bottom: 10px;display: flex;justify-content: flex-end;align-items: center">
                <el-card shadow="hover" >
                  <span v-html="item.data">
                  </span>
                </el-card>
                <span style="font-size: 16px;font-weight: bold"> : {{user.name}} </span>
              </el-col>
              <el-col v-if="item.from === 'system'" :span="24" style="display: flex;justify-content: center;align-items: center;margin-bottom: 10px" >
                <el-card shadow="hover" >
                  <span style="color: #e6a23c">系统消息: {{item.data}}</span>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="tool-pane"
             style="height:40%;max-height:40%;width:100%;display: flex;justify-content: flex-start;align-items: left">
          <vue-editor v-model="inputData" style="width: 85%;height: 80%;min-height: 0"></vue-editor>

          <div class="pane-button"
               style="width: 15%;height: 100%;display: flex;flex-direction: column;justify-content: flex-start;">

            <div style="margin-bottom: 15px;margin-top: 15px">
              <el-button type="primary" @click="sendToUserMessage(inputData,toUserId)">发送
              </el-button>
            </div>

            <div style="margin-bottom: 15px">
              <el-button type="primary">清空</el-button>
            </div>

            <div style="margin-bottom: 15px">
              <el-button type="primary">删除聊天记录</el-button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
  import store from "../vuex/store"
  import * as util from "../common/utils/util"
  import {VueEditor} from 'vue2-editor'

  export default {
    name: "messagePage",
    components: {
      VueEditor
    },
    data() {
      return {
        user: {},
        token: "",
        websocket: null,
        content: '',
        inputData: '',
        message: {
          toUserType: 0,
          messageType: 0,
          from: '',
          to: '',
          fromUserName: '',
          toUserName: '',
          data: ''
        },
        toUserId: '',
        messageList:[]
      }
    },
    computed: {},
    methods: {
      goUp: function () {
        this.$router.go(-1)
      },

      sendToUserMessage: function (msg, to) {
        let that = this;
        if (util.isEmpty(this.inputData)) {
          that.$message.info("信息不能为空");
          return;
        }
        console.log("数据长度 " + this.inputData.length );
        if (this.inputData.length > 5000){
          that.$message.info("数据太大");
          return;
        }
        this.message.from = this.user.id;
        this.message.to = to;
        this.message.data = this.inputData.concat("");
        this.message.toUserType = 0;
        this.message.messageType = 1;
        this.message.fromUserName = this.user.name;
        this.send(this.message);
        this.inputData = "";
      },

      sendToAllUserMessage: function (msg, to) {
        let that = this;
        if (util.isEmpty(this.inputData)) {
          that.$message.info("信息不能为空");
          return;
        }
        if (this.inputData.length > 5000){
          that.$message.info("数据太大");
          return;
        }
        this.message.from = this.user.id;
        this.message.to = to;
        this.message.data = this.inputData.concat("");
        this.message.toUserType = 0;
        this.message.messageType = 1;
        this.message.fromUserName = this.user.name;
        this.send(message);
        this.inputData = "";
      },

      //todo 这个部分可以处理一下  判断信息类型
      //将消息显示在网页上
      handlecontent: function (message) {
        this.messageList.push(JSON.parse(JSON.stringify(message)));
        //todo 这里偷懒先实现双向通信 后面再根据情况绑定这个字段
        if (message.from === "system"){
          //系统消息
        } else{
          //用户消息
          this.toUserId = message.from;
        }
      },


      //关闭连接
      closeWebSocket: function () {
        this.websocket.close();
      },

      //发送消息
      send: function (message) {
        this.messageList.push(JSON.parse(JSON.stringify(message)));
        this.websocket.send(JSON.stringify(message));
      }
    },
    mounted() {
      let that = this;
      this.user = JSON.parse(localStorage.getItem("user"));
      this.token = localStorage.getItem("token");
      if (util.isEmpty(this.user)) {
        //弹出登录框
        this.$store.commit('signInDialogVisibleTrue');
      }

      this.toUserId = this.$route.query.id;
      if (util.isEmpty(this.toUserId)) {
        //todo 正常打开页面的逻辑
      } else {
        //todo 应该弹出聊天框
      }

      //判断当前浏览器是否支持WebSocket
      if ('WebSocket' in window) {
        let url = "ws://" + process.env.COLLECTION_URL.toString().replace('http://', '') + "/api/webSocket/";
        // let url = "ws://47.102.199.98:9003/api/webSocket/";
        console.log("地址 " + url);
        this.websocket = new WebSocket(url + this.token);
      }
      else {
        alert('Not support websocket')
      }

      //连接发生错误的回调方法e
      this.websocket.onerror = function (e) {
        that.$message.error("webSocket 连接错误" + e.code);
      };

      //连接成功建立的回调方法
      this.websocket.onopen = function (event) {
        that.$message.success("webSocket 会话连接成功");
      };

      //接收到消息的回调方法
      this.websocket.onmessage = function (event) {
        let data = JSON.parse(event.data);
        console.log("收到的消息 " + JSON.stringify(data));
        if (data.messageType === -1) {
          console.log("连接信息 不予显示");
        } else {
          that.handlecontent(data);
        }
      };

      //连接关闭的回调方法
      this.websocket.onclose = function () {
        that.$message.info("webSocket 连接已关闭");
      };

      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function () {
        that.websocket.close();
      }

    }
  }
</script>

<style scoped>
  >>> .el-card__body{
    padding-top: 5px;
    padding-bottom: 5px;
  }
</style>
