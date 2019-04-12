import { constantRouterMap } from '@/router'
import { getRoute } from '@/api/login'
import store from '../index'
import { arrayToMenu } from '@/utils/public'

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
        getRoute(store.getters.uid).then(res => {
          // TODO
          const accessedRouters = arrayToMenu(res.data)
          const org = res.data.org
          accessedRouters.concat([{ path: '*', redirect: '/404', hidden: true }])
          commit('SET_ROUTERS', accessedRouters)
          commit('SET_ORG', org)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default permission
