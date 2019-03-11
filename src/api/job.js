import fetch from '../common/js/fetch.js';


let jobServer = process.env.JOB_URL;
let collectionService = process.env.COLLECTION_URL;

/***********************登陆注册************************/
export const signInAPI= data=>{return fetch(jobServer+'/api/login/in', data, 'POST')}; //登录
export const personSignUpAPI= data=>{return fetch(jobServer+'/api/login/register/person', data, 'POST')}; //true 个人注册
export const companySignUpAPI= data=>{return fetch(jobServer+'/api/login/register/company', data, 'POST')}; //true 公司注册
export const signOutAPI= data=>{return fetch(jobServer+'/api/login/out', data, 'POST')}; //注销登录
export const getCodeAPI= data=>{return fetch(jobServer+'/api/login/code/send', data, 'POST')}; //获取验证码
export const checkEmailAPI= data=>{return fetch(jobServer+'/api/login/isExist', data, 'POST')}; //true 已使用 检验邮箱是否已被使用
export const checkCodeAPI= data=>{return fetch(jobServer+'/api/login/code/check/', data, 'POST')}; //true 检验验证码是否正确

/*************************用户相关******************************/
export const userPageFindAPI= data=>{return fetch(jobServer+'/tApi/user/pageFind', data, 'POST',"")}; //true 用户分页查询
export const deleteUserAPI= data=>{return fetch(jobServer+'/tApi/user', data, 'DELETE',"")}; //true 删除用户
export const getUserAPI= data=>{return fetch(jobServer+'/api/user', data, 'GET',"")}; //true 删除用户
export const getGroupUserAPI= data=>{return fetch(jobServer+'/api/user/group', data, 'POST',"")}; //true 获取用户组
export const changeUserHeadImgAPI= data=>{return fetch(jobServer+'/tApi/user/headImg', data, 'PATCH',"")}; //true 获取用户组
export const changeUserResumeUrlAPI= data=>{return fetch(jobServer+'/tApi/user/resumeUrl', data, 'PATCH',"")}; //true 获取用户组
/***********************下拉列表************************/
export const dropListOneGetApi= data=>{return fetch(jobServer+'/api/drop/one', data, 'GET',"")}; //获取下拉列表


/***********************通用接口********************************/
export const getJobTypeAPI = data=>{return fetch(jobServer+'/api/universal/list/jobType', data, 'POST')};
export const addOrEditCompanyKanBan = data=>{return fetch(jobServer+'/api/companyKanBan/', data, 'POST')};


/***********************兼职相关的接口********************************/
export const addJobAPI = data=>{return fetch(jobServer+'/tApi/jobInfo/', data, 'POST')};
export const updateJobAPI = data=>{return fetch(jobServer+'/tApi/jobInfo/', data, 'PATCH')};
export const getJobAPI = data=>{return fetch(jobServer+'/api/jobInfo', data, 'GET')};
export const deleteJobAPI = data=>{return fetch(jobServer+'/tApi/jobInfo', data, 'DELETE')};
export const companyJobPageAPI = data=>{return fetch(jobServer+'/tApi/jobInfo/company/pageFind', data, 'POST')};
export const personJobPageAPI = data=>{return fetch(jobServer+'/api/jobInfo/normal/pageFind', data, 'POST')};
/***********************公司相关接口********************************/
export const addCompanyAPI = data=>{return fetch(jobServer+'/api/companyInfo/', data, 'POST')};
export const updateCompanyAPI = data=>{return fetch(jobServer+'/api/companyInfo/', data, 'PATCH')};
export const getCompanyAPI = data=>{return fetch(jobServer+'/api/companyInfo', data, 'GET')};//查询公司详细信息
export const getCompanyListAPI = data=>{return fetch(jobServer+'/api/companyInfo/all', data, 'GET')}; //获取公司列表

/***********************地区相关接口********************************/
export const getRegionAPI = data=>{return fetch(jobServer+'/api/region/', data, 'POST')};//获取地区详细信息

/***********************聊天消息相关接口********************************/
export const getToFromMessage = data=>{return fetch(collectionService +'/tApi/message', data, 'GET')};//获取地区详细信息
export const getRecentUserList = data=>{return fetch(collectionService +'/tApi/message/userList', data, 'POST')};//获取最近联系人列表

/***********************在线简历相关接口********************************/
export const addOnlineResumeAPI = data=>{return fetch(jobServer+'/tApi/onlineResumeInfo', data, 'POST')};//新增在线简历
export const updateOnlineResumeAPI = data=>{return fetch(jobServer+'/tApi/onlineResumeInfo', data, 'PATCH')};
export const getOnlineResumeByUserIdAPI = data=>{return fetch(jobServer+'/api/onlineResumeInfo', data, 'GET')};//根据用户id查询在线简历
export const getOnlineResumeAPI = data=>{return fetch(jobServer+'/tApi/onlineResumeInfo', data, 'GET')};//获取自己的在线简历
