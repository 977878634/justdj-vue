import fetch from '@/common/js/fetch.js';


let base = '';
// export const that = data => {return data};
// let userServer='http://127.0.0.1:9003'
//let userServer='http://192.168.3.32:9003'
//let userServer='http://mes.mes.ycxz-china.com'

let userServer = "https://test-mes.ycxz-china.com";
//let userServer='http://mes.mes.ycxz-china.com'



/***********************现场看板************************/

export const kanbanGetData= data=>{return fetch(userServer+'/api/kanban/getData', data, 'GET','')}; //获取看板数据
/*******************************************************/

/***********************公司看板************************/

/*******************************************************/
export const getCompanyKanBanOne = data=>{return fetch(userServer+'/api/companyKanBan/one', data, 'GET','')};
export const addOrEditCompanyKanBan = data=>{return fetch(userServer+'/api/companyKanBan/', data, 'POST','')};
/*******************************************************/
