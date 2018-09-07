import HelloWorld from '../components/HelloWorld'
import Static from '../components/Static'


let routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/static',
    name: '',
    component: Static
  }
];

export default routes;
