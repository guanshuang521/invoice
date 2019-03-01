import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '系统管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '组织机构管理', icon: 'table' }
      },
      {
        path: 'table1',
        name: 'Table1',
        component: () => import('@/views/table/index'),
        meta: { title: '门店管理', icon: 'table' }
      },
      {
        path: 'table2',
        name: 'Table2',
        component: () => import('@/views/table/index'),
        meta: { title: '用户管理', icon: 'table' }
      },
      {
        path: 'table3',
        name: 'Table3',
        component: () => import('@/views/table/index'),
        meta: { title: '角色权限管理', icon: 'table' }
      },
      {
        path: 'table4',
        name: 'Table4',
        component: () => import('@/views/table/index'),
        meta: { title: '开票规则模板', icon: 'table' }
      },
      {
        path: 'table5',
        name: 'Table5',
        component: () => import('@/views/table/index'),
        meta: { title: '购方信息维护', icon: 'table' }
      },
      {
        path: 'table6',
        name: 'Table6',
        component: () => import('@/views/table/index'),
        meta: { title: '税收分类编码管理', icon: 'table' }
      },
      {
        path: 'table7',
        name: 'Table7',
        component: () => import('@/views/table/index'),
        meta: { title: '商品信息管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: { title: '订单管理', icon: 'nested' },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '服务类订单管理', icon: 'table' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'POS订单管理', icon: 'table' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '商品类订单管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/nested1',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: { title: '发票管理', icon: 'nested' },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '待开专票管理', icon: 'table' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '待开普票管理', icon: 'table' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '待开电子发票管理', icon: 'table' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '已开专票管理', icon: 'table' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '已开普票管理', icon: 'table' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '已开电子发票管理', icon: 'table' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '红字信息表管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/nested2',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: { title: '发票填开', icon: 'nested' }
  },
  {
    path: '/nested3',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: { title: '查询与统计', icon: 'nested' },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '已开发票查询', icon: 'table' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '订单开票信息查询', icon: 'table' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '发票订单信息查询', icon: 'table' }
      }
    ]
  },
  {
    path: '/nested4',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: { title: '数据同步', icon: 'nested' },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '任务查询', icon: 'table' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '任务设置', icon: 'table' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '发票订单信息查询', icon: 'table' }
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
