import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },
  {
    path: '/merchant',
    component: Layout,
    meta: { title: 'Merchant Manage', icon: 'form' },
    children: [
      {
        path: 'index',
        name: 'Merchant',
        component: _import('merchant/index'),
        meta: { title: 'Merchant', icon: 'form' }
      },
      {
        path: 'create',
        name: 'Merchant Create',
        component: _import('merchant/create'),
        meta: { title: 'Merchant Create', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: 'Merchant Edit',
        component: _import('merchant/edit'),
        meta: { title: 'Merchant Edit', icon: 'form' },
        hidden: true
      }
    ]
  },
  {
    path: '/coupon',
    component: Layout,
    meta: { title: 'Coupon Manage', icon: 'form' },
    hidden: true,
    children: [
      {
        path: 'index/merchant/:merchant_id',
        alias: ['index'],
        name: 'Coupon',
        component: _import('coupon/index'),
        meta: { title: 'Coupon', icon: 'form' }
      },
      {
        path: 'create/merchant/:merchant_id',
        alias: ['create'],
        name: 'Coupon Create',
        component: _import('coupon/create'),
        meta: { title: 'Coupon Create', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: 'Coupon Edit',
        component: _import('coupon/edit'),
        meta: { title: 'Coupon Edit', icon: 'form' },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

