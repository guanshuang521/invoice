import { constantRouterMap } from '@/router'
import { getRoute } from '@/api/login'
import store from '../index'
import { arrayToMenu } from '@/utils/public'
import { getUserId } from '@/utils/auth'
import { MessageBox } from 'element-ui'

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve, reject) => {
        getRoute(getUserId()).then(res => {
          // TODO
          const accessedRouters = arrayToMenu(res.data.menus)
          if (accessedRouters && accessedRouters.length) {
            accessedRouters.concat([{ pafth: '*', redirect: '/404', hidden: true }])
            commit('SET_ROUTERS', accessedRouters)
            commit('SET_ORG', res.data.orgInfo)
            commit('SET_INFO', res.data.user)
            resolve()
          } else {
            MessageBox.alert('你没有访问系统的权限，请联系管理员！', '无权限', {
              confirmButtonText: '确定', callback: action => {
                store.dispatch('FedLogOut').then(() => {
                  location.reload() // 为了重新实例化vue-router对象 避免bug
                })
              }
            })
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default permission
