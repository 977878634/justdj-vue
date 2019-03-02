import fetch from '../common/js/fetch.js';


let base = '';
// export const that = data => {return data};

let jobServer = process.env.JOB_URL;
//let userServer='http://mes.mes.ycxz-china.com'



/***********************现场看板************************/

export const kanbanGetData= data=>{return fetch(jobServer+'/api/kanban/getData', data, 'GET')}; //获取看板数据
/*******************************************************/

/***********************公司看板************************/

/*******************************************************/
export const getCompanyKanBanOne = data=>{return fetch(jobServer+'/api/companyKanBan/one', data, 'GET')};
export const addOrEditCompanyKanBan = data=>{return fetch(jobServer+'/api/companyKanBan/', data, 'POST')};
/*******************************************************/
