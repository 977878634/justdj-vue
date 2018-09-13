// import HelloWorld from '../components/HelloWorld'
import KanBanInfo from '../components/KanBanInfo.vue'


let routes = [
  {
    path: '/',
    redirect: '/kanbaninfo/0',
  },
  {
    path: '/kanbaninfo/:id',
    name: '',
    component: KanBanInfo
  }
];

export default routes;
