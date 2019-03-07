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
// 静态路由表
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
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
  }
]
// 动态路由表
export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '系统管理', icon: 'example', roles: ['admin2', 'superAdmin'] },
    children: [
      {
        path: 'organization',
        name: 'organization',
        component: () => import('@/views/system/organization'),
        meta: { title: '组织机构管理', icon: 'table', roles: ['admin1', 'superAdmin'] }
      },
      {
        path: 'shop',
        name: 'shop',
        component: () => import('@/views/system/shop'),
        meta: { title: '门店管理', icon: 'table', roles: ['admin', 'superAdmin'] }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/system/user'),
        meta: { title: '用户管理', icon: 'table', roles: ['admin', 'superAdmin'] }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/role'),
        meta: { title: '角色权限管理', icon: 'table', roles: ['admin', 'superAdmin'] }
      },
      {
        path: 'template',
        name: 'template',
        component: () => import('@/views/system/template'),
        meta: { title: '开票规则模板', icon: 'table', roles: ['admin', 'superAdmin'] }
      },
      {
        path: 'infoMaintenance',
        name: 'infoMaintenance',
        component: () => import('@/views/system/infoMaintenance'),
        meta: { title: '购方信息维护', icon: 'table', roles: ['admin', 'superAdmin'] }
      },
      {
        path: 'codeManagement',
        name: 'codeManagement',
        component: () => import('@/views/system/codeManagement'),
        meta: { title: '税收分类编码管理', icon: 'table', roles: ['admin', 'superAdmin'] }
      },
      {
        path: 'infoManagement',
        name: 'infoManagement',
        component: () => import('@/views/system/infoManagement'),
        meta: { title: '商品信息管理', icon: 'table', roles: ['admin', 'superAdmin'] }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'order',
    meta: { title: '订单管理', icon: 'nested' },
    children: [
      {
        path: 'service',
        component: () => import('@/views/order/service'), // Parent router-view
        name: 'service',
        meta: { title: '服务类订单管理', icon: 'table', roles: ['admin', 'jinxiang'] }
      },
      {
        path: 'pos',
        component: () => import('@/views/order/pos'),
        meta: { title: 'POS订单管理', icon: 'table', roles: ['admin', 'jinxiang'] }
      },
      {
        path: 'commodity',
        component: () => import('@/views/order/commodity'),
        meta: { title: '商品类订单管理', icon: 'table', roles: ['admin', 'jinxiang'] }
      }
    ]
  },
  {
    path: '/invoice',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'invoice',
    meta: { title: '发票管理', icon: 'nested' },
    children: [
      {
        path: 'wSpecial',
        component: () => import('@/views/invoice/wSpecial'), // Parent router-view
        name: 'wSpecial',
        meta: { title: '待开专票管理', icon: 'table', roles: ['admin', 'jinxiang'] }
      },
      {
        path: 'wOrdinary',
        component: () => import('@/views/invoice/wOrdinary'),
        meta: { title: '待开普票管理', icon: 'table', roles: ['admin', 'jinxiang'] }
      },
      {
        path: 'wElectronic',
        component: () => import('@/views/invoice/wElectronic'),
        meta: { title: '待开电子发票管理', icon: 'table', roles: ['admin', 'jinxiang'] }
      },
      {
        path: 'oSpecial',
        component: () => import('@/views/invoice/oSpecial'),
        meta: { title: '已开专票管理', icon: 'table', roles: ['admin', 'jinxiang'] }
      },
      {
        path: 'oOrdinary',
        component: () => import('@/views/invoice/oOrdinary'),
        meta: { title: '已开普票管理', icon: 'table', roles: ['admin', 'jinxiang'] }
      },
      {
        path: 'oElectronic',
        component: () => import('@/views/invoice/oElectronic'),
        meta: { title: '已开电子发票管理', icon: 'table', roles: ['admin', 'jinxiang'] }
      },
      {
        path: 'redTable',
        component: () => import('@/views/invoice/redTable'),
        meta: { title: '红字信息表管理', icon: 'table', roles: ['admin', 'jinxiang'] }
      }
    ]
  },
  {
    path: '/invoiceOpening',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'invoiceOpening',
    meta: { title: '发票填开', icon: 'nested' },
    children: [
      {
        path: 'special',
        component: () => import('@/views/invoiceOpening/special'), // Parent router-view
        name: 'special',
        meta: { title: '手工填开专票', icon: 'table', roles: ['admin', 'jinxiang'] }
      },
      {
        path: 'ordinary',
        component: () => import('@/views/invoiceOpening/ordinary'),
        meta: { title: '手工填开普票', icon: 'table', roles: ['admin', 'jinxiang'] }
      },
      {
        path: 'electronic',
        component: () => import('@/views/invoiceOpening/electronic'),
        meta: { title: '手工填开电子发票', icon: 'table', roles: ['admin', 'jinxiang'] }
      },
      {
        path: 'buyFarm',
        component: () => import('@/views/invoiceOpening/buyFarm'),
        meta: { title: '手工填开农产品收购', icon: 'table', roles: ['admin', 'jinxiang'] }
      }
    ]
  },
  {
    path: '/queryStatistics',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'queryStatistics',
    meta: { title: '查询与统计', icon: 'nested' },
    children: [
      {
        path: 'openInvoice',
        component: () => import('@/views/queryStatistics/openInvoice'), // Parent router-view
        name: 'openInvoice',
        meta: { title: '已开发票查询', icon: 'table', roles: ['admin', 'jinxiang'] }
      },
      {
        path: 'orderOpenMessage',
        component: () => import('@/views/queryStatistics/orderOpenMessage'),
        meta: { title: '订单开票信息查询', icon: 'table', roles: ['admin', 'jinxiang'] }
      },
      {
        path: 'invoiceOrderMessage',
        component: () => import('@/views/queryStatistics/invoiceOrderMessage'),
        meta: { title: '发票订单信息查询', icon: 'table', roles: ['admin', 'jinxiang'] }
      }
    ]
  },
  {
    path: '/dataSync',
    component: Layout,
    redirect: '/dataSync',
    name: 'dataSync',
    meta: { title: '数据同步', icon: 'nested' },
    children: [
      {
        path: 'taskQuery',
        component: () => import('@/views/dataSync/taskQuery'), // Parent router-view
        name: 'taskQuery',
        meta: { title: '任务查询', icon: 'table', roles: ['admin', 'jinxiang'] }
      },
      {
        path: 'taskSettings',
        component: () => import('@/views/dataSync/taskSettings'),
        meta: { title: '任务设置', icon: 'table', roles: ['admin', 'jinxiang'] }
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

