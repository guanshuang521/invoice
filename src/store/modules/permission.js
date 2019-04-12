import { constantRouterMap } from '@/router'
import { getRoute } from '@/api/login'
import store from '../index'
import { arrayToMenu } from '@/utils/public'
import { getUserId } from '@/utils/auth'
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
          accessedRouters.concat([{ pafth: '*', redirect: '/404', hidden: true }])
          commit('SET_ROUTERS', accessedRouters)
          commit('SET_ORG', res.data.orgInfo)
          commit('SET_INFO', res.data.user)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default permission
