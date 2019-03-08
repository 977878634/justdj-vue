import home from '../components/home.vue'
import indexPage from '../components/indexPage.vue'
import dataAnalysePage from '../components/dataAnalysePage.vue'
import companyJobManagerPage from '../components/companyJobManagerPage.vue'
import adminJobManagerPage from '../components/adminJobManagerPage.vue'
import jobPage from '../components/jobPage.vue'
import jobTypeManagerPage from '../components/jobTypeManagerPage.vue'
import messagePage from '../components/messagePage.vue'
import userManagerPage from '../components/userManagerPage.vue'
import personCenter from '../components/personCenter.vue'
import jobDetail from '../components/jobDetailPage.vue'

let routes = [
  {
    path: '/',
    component: home,
    redirect:'/indexPage',
    name: '导航一',
    iconCls: 'el-icon-message',//图标样式class
    children: [
      {path: '/indexPage', component: indexPage, meta: { keepAlive: true },name: '首页', hidden: true},
      {path: '/jobPage', component: jobPage, meta: { keepAlive: true },name: '兼职查询', hidden: true},
      {path: '/userManagerPage', component: userManagerPage, meta: { keepAlive: true }, name: '用户管理', hidden: true},
      {path: '/jobTypeManagerPage', component: jobTypeManagerPage, meta: { keepAlive: false }, name: '类别管理', hidden: true},
      {path: '/companyJobManagerPage', component: companyJobManagerPage, meta: { keepAlive: true }, name: '企业兼职管理', hidden: true},
      {path: '/adminJobManagerPage', component: adminJobManagerPage,  meta: { keepAlive: true },name: '兼职管理', hidden: true},
      {path: '/dataAnalysePage', component: dataAnalysePage,  meta: { keepAlive: false },name: '数据分析', hidden: true},
      {path: '/messagePage', component: messagePage,  meta: { keepAlive: false },name: '消息', hidden: true},
      {path: '/personCenter', component: personCenter, meta: { keepAlive: false }, name: '个人中心', hidden: true},
      {path: '/jobDetail', component: jobDetail,  meta: { keepAlive: false},name: '兼职详情', hidden: true}
    ]
  },
];

export default routes;
