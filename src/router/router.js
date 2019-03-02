import home from '../components/home.vue'
import indexPage from '../components/indexPage.vue'
import dataAnalysePage from '../components/dataAnalysePage.vue'
import jobManagerPage from '../components/jobManagerPage.vue'
import jobPage from '../components/jobPage.vue'
import jobTypeManagerPage from '../components/jobTypeManagerPage.vue'
import messagePage from '../components/messagePage.vue'
import userManagerPage from '../components/userManagerPage.vue'



let routes = [
  {
    path: '/',
    component: home,
    name: '导航一',
    iconCls: 'el-icon-message',//图标样式class
    children: [
      {path: '/indexPage', component: indexPage, name: '首页', hidden: true},
      {path: '/jobPage', component: jobPage, name: '兼职查询', hidden: true},
      {path: '/userManagerPage', component: userManagerPage, name: '用户管理', hidden: true},
      {path: '/jobTypeManagerPage', component: jobTypeManagerPage, name: '类别管理', hidden: true},
      {path: '/jobManagerPage', component: jobManagerPage, name: '兼职管理', hidden: true},
      {path: '/dataAnalysePage', component: dataAnalysePage, name: '数据分析', hidden: true},
      {path: '/messagePage', component: messagePage, name: '消息', hidden: true}
    ]
  },
];

export default routes;
