<template>
    <section>

      <div class="person-center" style="width: 100%;height: 100%;display: flex;justify-content: flex-start">
        <div class="person-center-left" style="width: 30%;height: 100%">
          <el-row class="info-row">
            <span class="info-row-label" >头像 :</span>
            <el-upload
              class="avatar-uploader"
              :action="api + '/api/universal/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              accept=".jpg,.jpeg,.png,.JPG,.JPEG"
              :before-upload="beforeAvatarUpload">
              <img v-if="!isEmpty(imageUrl)" :src="imageUrl" class="avatar"
                   style="width: 180px;height: 180px;min-width: 180px;min-height: 180px">
              <div v-else style="width:180px;height: 180px;position: relative;border: 1px dotted black">
                <i class="el-icon-plus avatar-uploader-icon"  style="font-size: 70px"></i>
                <span style="position: absolute;top:140px;left: 59px;font-size: 1.125em;">添加图片</span>
              </div>
            </el-upload>
          </el-row>
          <el-row class="info-row">
            <span class="info-row-label">姓名 :</span>
            <span class="info-row-value">{{user.name}}</span>
          </el-row>
          <el-row class="info-row">
            <span class="info-row-label">性别 :</span>
            <span class="info-row-value">{{user.sex === "0" ? '男':'女'}}</span>
          </el-row>
          <el-row class="info-row">
            <span class="info-row-label">邮箱 :</span>
            <span class="info-row-value">{{formatEmail(user.email)}}</span>
          </el-row>
          <!--<el-row class="info-row">-->
            <!--<span class="info-row-label">出生年份 :</span>-->
            <!--<span class="info-row-value">{{user.birthday}}</span>-->
          <!--</el-row>-->
          <el-row style="margin-top: 50px">
            <el-radio-group v-model="labelPosition" size="small">
              <el-radio-button label="online">在线简历</el-radio-button>
              <el-radio-button label="upload">上传简历</el-radio-button>
            </el-radio-group>
          </el-row>

          <el-row style="margin-top: 50px">
            <el-button v-show="labelPosition  === 'online'" @click="handleEdit" label="online">编辑在线简历</el-button>
            <el-upload
              v-show="labelPosition  === 'upload'"
              :show-file-list="false"
              accept=".pdf,.PDF"
              class="upload-demo"
              :on-success="handlePDFSuccess"
              :before-upload="beforePDFUpload"
              :action="api + '/api/universal/upload'">
              <el-button  >上传简历</el-button>
              <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过2M</div>
            </el-upload>

            <a :href="user.resumeUrl" download="简历.pdf">
              <el-button v-show="labelPosition  === 'upload' && !isEmpty(user.resumeUrl)" style="margin-top: 20px;" >
                下载简历
              </el-button>
            </a>
          </el-row>

        </div>

        <div style="width: 70%;height: 100%">
          <div v-show="labelPosition === 'online'" style="width: 100%;height: 100%;max-height:100%;">
            <el-scrollbar>
              <el-form :model="editForm"
                       disabled
                       label-width="7rem"
                       :rules="editFormRules"
                       ref="editForm">

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="求职状态" >
                      <el-select v-model="editForm.jobStatus" placeholder="请选择求职状态" style="width: 25rem">
                        <el-option
                          v-for="item in job_status_options"
                          :label="item.label"
                          :value="parseInt(item.value)">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="意向职位" >
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
                    <el-form-item label="偏好区域">
                      <el-cascader
                        style="width: 25rem"
                        :options="region_options"
                        v-model="editForm.preferredArea">
                      </el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="学历" >
                      <el-select v-model="editForm.academic"
                                 placeholder="请选择学历要求" style="width: 25rem">
                        <el-option
                          v-for="item in job_academic_requirements_options"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row >
                  <el-col :span="24">
                    <el-form-item label="空闲时间" >
                      <el-input v-model="editForm.idleTime" autocomplete="off" style="width: 60.625rem"
                                placeholder="请输入空闲时间"></el-input>
                    </el-form-item>

                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="薪资下限" >
                      <el-input-number v-model="editForm.expectingSalaryDown" :precision="0" :min="1" :max="1000000" :step="1"
                                       label="请输入招聘人数" style="width: 25rem"></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="薪资上限" >
                      <el-input-number v-model="editForm.expectingSalaryUp" :precision="0" :min="1" :max="100000" :step="1"
                                       label="请输入招聘人数" style="width: 25rem"></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="个人描述" >
                      <el-card shadow="hover" style="width: 60.625rem;margin-left: 1.875rem">
                        <div class="online-resume-detail" v-html="editForm.selfDesc">

                        </div>
                      </el-card>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
            </el-scrollbar>
          </div>
          <div v-show="labelPosition === 'upload'" style="width: 100%;height: 100%;background-color: #eeeeee;display: flex;justify-content: center;align-items: center">
            <span v-show="isEmpty(user.resumeUrl)" style="font-size: 18px;">未上传简历</span>
            <div    v-show="!isEmpty(user.resumeUrl)" style="width: 100%;height: 100%;">
              <!--<el-scrollbar style="height: 100%">-->
                <pdf
                  :src="pdfUrl"
                  :page="currentPage"
                  @num-pages="pageCount=$event"
                  @page-loaded="currentPage=$event"
                  @loaded="loadPdfHandler">
                </pdf>
              <!--</el-scrollbar>-->
            </div>

          </div>
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
              <el-form-item label="求职状态" prop="jobStatus">
                <el-select v-model="editForm.jobStatus" placeholder="请选择求职状态" style="width: 25rem">
                  <el-option
                    v-for="item in job_status_options"
                    :label="item.label"
                    :value="parseInt(item.value)">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="意向职位" prop="jobType">
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
                <el-form-item label="偏好区域" prop="preferredArea">
                  <el-cascader
                    style="width: 25rem"
                    :options="region_options"
                    v-model="editForm.preferredArea">
                  </el-cascader>
                </el-form-item>
              </el-col>
            <el-col :span="12">
              <el-form-item label="学历" prop="academic">
                <el-select v-model="editForm.academic"
                           placeholder="请选择学历要求" style="width: 25rem">
                  <el-option
                    v-for="item in job_academic_requirements_options"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <el-col :span="24">
              <el-form-item label="空闲时间" prop="idleTime">
                <el-input v-model="editForm.idleTime" autocomplete="off" style="width: 64.125rem"
                          placeholder="请输入空闲时间"></el-input>
              </el-form-item>

            </el-col>
          </el-row>



          <el-row>
            <el-col :span="12">
              <el-form-item label="薪资下限" prop="expectingSalaryDown">
                <el-input-number v-model="editForm.expectingSalaryDown" :precision="0" :min="1" :max="1000000" :step="1"
                                 label="请输入招聘人数" style="width: 25rem"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="薪资上限" prop="expectingSalaryUp">
                <el-input-number v-model="editForm.expectingSalaryUp" :precision="0" :min="1" :max="100000" :step="1"
                                 label="请输入招聘人数" style="width: 25rem"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-form-item label="个人描述" prop="selfDesc">
              <vue-editor v-model="editForm.selfDesc" style="width: 64.125rem"></vue-editor>
            </el-form-item>
          </el-row>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="add">提交</el-button>
        </div>
      </el-dialog>
    </section>
</template>

<script>
  import store from "../vuex/store"
  import {
    addOnlineResumeAPI,
    changeUserHeadImgAPI, changeUserResumeUrlAPI,
    dropListOneGetApi,
    getJobTypeAPI,
    getOnlineResumeAPI
  } from "../api/job";
  import {VueEditor} from 'vue2-editor'
  import {getPositionOption} from "../common/js/position";
  import pdf from 'vue-pdf'

  export default {
      name: "personCenter",
      components: {
        VueEditor,
        pdf
      },
      data(){
          return{
            currentPage: 0, // pdf文件页码
            pageCount: 0, // pdf文件总页数
            fileType: 'pdf', // 文件类型
            mainName: "在线简历",
            labelPosition:"online",
            api:'',
            user:{},
            imageUrl:'',
            pdfUrl:'',
            job_type_options: [],
            region_options:[],
            job_academic_requirements_options:[],
            job_status_options:[],
            editForm: {
              jobStatus: '',
              jobType: [],
              preferredArea: [],
              idleTime:'',
              expectingSalaryDown:0,
              expectingSalaryUp:0,
              academic:'',
              selfDesc:'',
            },
            editFormRules: {
              jobStatus: [{required: true, message: '请选择求职状态', trigger: 'blur'}],
              jobType: [{required: true, message: '请选择求职类型', trigger: 'blur'}],
              preferredArea: [{required: true, message: '请选择偏好区域', trigger: 'blur'}],
              idleTime: [{required: true, message: '请输入空闲时间', trigger: 'blur'}],
              expectingSalaryDown: [{required: true, message: '请输入薪资下限', trigger: 'blur'}],
              expectingSalaryUp: [{required: true, message: '请输入薪资上线', trigger: 'blur'}],
              academic: [{required: true, message: '请选择学历', trigger: 'blur'}],
              // selfDesc: [{required: true, message: '请选择结算方式', trigger: 'blur'}]
            },
            editFormVisible: false,
            title: "",
          }
      },
      methods:{
        loadPdfHandler (e) {
          this.currentPage = 1 // 加载的时候先加载第一页
        },
        //需要修改的函数------------------------------

        resetEditForm: function () {
          this.$refs["editForm"].resetFields();
          this.editForm = {
            jobStatus: '',
            jobType: [],
            preferredArea: [],
            idleTime:'',
            expectingSalaryDown:0,
            expectingSalaryUp:0,
            academic:'',
            selfDesc:'',
          };
        },

        //基本不需要修改的函数-----------------------

        handleEdit: function () {
          // this.editForm = JSON.parse(JSON.stringify(row));
          this.editFormVisible = true;
          this.title = "编辑" + this.mainName;
        },

        editDialogClose: function () {
        },

        //新增或编辑提交  修改接口
        add: function () {
          this.$refs["editForm"].validate((valid) => {
            if (valid) {
              addOnlineResumeAPI(this.editForm).then(res => {
                if (res.code === 200) {
                   this.$message.success("编辑"+ this
                      .mainName + "成功");
                  this.editFormVisible = false;
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

        handleAvatarSuccess(res, file) {
          if (res.code === 200){
            this.imageUrl = res.msg;
            // todo 更新用户信息
            this.user.headImg = this.imageUrl;
            changeUserHeadImgAPI(this.imageUrl).then(res=>{
              if (res.code === 200){
                this.$message.success("头像修改成功");
              } else {
                console.log("头像修改失败")
              }
            });
            this.$store.commit('setHeadImg',{name:'stark',user:this.user});
            localStorage.setItem("user",JSON.stringify(this.user));
            sessionStorage.setItem("user",JSON.stringify(this.user));
          } else {
            this.$message.error("头像上传失败");
          }

        },

        beforeAvatarUpload(file) {
          // const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          // if (!isJPG) {
          //   this.$message.error('上传头像图片只能是 JPG 格式!');
          // }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return  isLt2M;
        },


        handlePDFSuccess(res, file,fileList) {
          if (res.code === 200){
            this.pdfUrl = res.msg;
            // todo 更新用户信息
            this.user.resumeUrl = this.pdfUrl;
            changeUserResumeUrlAPI( this.pdfUrl).then(res=>{
              if (res.code === 200){
                this.$message.success("个人简历上传成功");
              } else {
                console.log("个人简历上传失败")
              }
            });
            this.$store.commit('setHeadImg',{name:'stark',user:this.user});
            localStorage.setItem("user",JSON.stringify(this.user));
            sessionStorage.setItem("user",JSON.stringify(this.user));
          } else {
            this.$message.error("个人简历上传失败");
          }

        },

        beforePDFUpload(file) {
          // const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          // if (!isJPG) {
          //   this.$message.error('上传头像图片只能是 JPG 格式!');
          // }
          if (!isLt2M) {
            this.$message.error('上传个人简历大小不能超过 2MB!');
          }
          return  isLt2M;
        },

        isEmpty:function(v) {
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

        contain:function(arr, val) {
          return arr.indexOf(val) != -1 ? true : false;
        },

        formatEmail:function (email) {
          if (this.isEmpty(email))
            return "";
          let index = email.toString().indexOf('@');
          email = email.split('');
          for (let i = 3; i < index; ++i) {
            email[i] = '*';
          }
          return email.join('');
        }
      },
    created(){
      this.user = JSON.parse(localStorage.getItem("user"));
      if (!this.isEmpty(this.user)) {
        this.imageUrl = this.user.headImg;
        this.pdfUrl = pdf.createLoadingTask(this.user.resumeUrl);
      }
    },
      mounted(){

        this.api = process.env.JOB_URL;

        getJobTypeAPI().then(res => {
          if (res.code === 200) {
            this.job_type_options = res.data;
          } else {
            console.error("工作类型下拉列表获取失败");
          }

        });

        dropListOneGetApi("job_academic_options").then(res => {
          if (res.code === 200) {
            this.job_academic_requirements_options = res.data;
          } else {
            console.error("学历要求下拉列表获取失败");
          }
        });

        dropListOneGetApi("job_status_options").then(res => {
          if (res.code === 200) {
            this. job_status_options = res.data;
          } else {
            console.error("学历要求下拉列表获取失败");
          }
        });

        this.region_options = getPositionOption();

        getOnlineResumeAPI().then(res => {
          if(res.code === 200){
            if (this.isEmpty(res.data)){
              console.log("当前用户没有简历");
            } else {
              this.editForm = res.data;
            }
          }else {
            console.log("获取个人简历失败");
          }
        });

      }
    }
</script>

<style scoped>
  .info-row{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;
  }

  .info-row-label{
    font-size: 16px;
    font-weight: bold;
    margin-right: 50px;
  }

  .info-row-value{
    font-size: 16px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  >>> .online-resume-detail p{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
  }
</style>
