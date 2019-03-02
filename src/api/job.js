import fetch from '../common/js/fetch.js';


// export const that = data => {return data};

let jobServer = process.env.JOB_URL;
//let userServer='http://mes.mes.ycxz-china.com'



/***********************登陆注册************************/
export const signInAPI= data=>{return fetch(jobServer+'/api/login/in', data, 'post')}; //登录
export const signOutAPI= data=>{return fetch(jobServer+'/api/login/out', data, 'post')}; //注销
/*******************************************************/

/***********************公司看板************************/

/*******************************************************/
export const getCompanyKanBanOne = data=>{return fetch(jobServer+'/api/companyKanBan/one', data, 'GET')};
export const addOrEditCompanyKanBan = data=>{return fetch(jobServer+'/api/companyKanBan/', data, 'POST')};
/*******************************************************/
