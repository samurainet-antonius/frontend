import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index'
import ListMember from '../components/members/List.vue'
import CreateMember from '../components/members/Create.vue'
import UpdateMember from '../components/members/Update.vue'

import Login from '../components/auth/Login.vue'

Vue.use(Router);

const routes = [
    {
      path: '/',
      name: 'login',
      title: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      title: 'Register',
      component: ListMember,
    },
    {
      path: '/members',
      name: 'members',
      title: 'Members',
      component: ListMember,
    },
    {
      path: '/profile',
      name: 'profile', 
      component:ListMember,
        meta: {
          auth: true
        }
    },
    {
      path: '/member/create',
      name: 'create-member',
      title: 'Create New Member',
      component: CreateMember,
      meta: {
        auth: true
      }
    },
    {
      path: '/member/update/:uuid',
      name: 'update-member',
      title: 'Update Member',
      component: UpdateMember,
      meta: {
        auth: true
      }
    },
];

const router  = new Router({
    mode:'history',
    routes,
})

router.beforeEach((to, from, next) => { 
  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters.isLoggedIn && store.getters.user) {
      next()
      return
    }
    next('/')
  }

  if (to.matched.some(record => record.meta.guest)) {
    if (!store.getters.isLoggedIn) {
      next()
      return
    }
    next('/profile')
  }

  next()
})

export default router

