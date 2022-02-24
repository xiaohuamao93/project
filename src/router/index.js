import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios';
import util from '../common/util';
import host from '../../utils/address';

import Login from '../components/Login'
import Home from '../components/home/home.vue';

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {requiresAuth: true}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/thyroid',
      name: 'Thyroid',
      component: () => import('../components/thyroid/thyroid.vue'),
      meta: {requiresAuth: true}
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user = util.session.get('user');
    if (!user) {
      axios.get(host + '/api/user')
          .then(res => {
            let result = res.data;
            if (result.code === 0 && result.data.user) {
              util.session.set('user', result.data.user);
              next();
            } else {
              next({
                path: '/login',
                query: {redirect: to.fullPath}
              });
            }
          })
          .catch(() => {
            next({
              path: '/login',
              query: {redirect: to.fullPath}
            });
          });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
