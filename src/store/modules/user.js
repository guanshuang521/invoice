import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, setUserId, getUserId } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    id: getUserId(),
    isAddRoute: false,
    isAutoLoadData: false,
    org: {},
    info: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles // 角色
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_ISADDROUTE: (state, isAddRoute) => {
      state.isAddRoute = isAddRoute
    },
    SET_ORG: (state, org) => {
      state.org = org
    },
    SET_INFO: (state, org) => {
      state.info = org
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(res => {
          commit('SET_ID', res.data.userId)
          commit('SET_TOKEN', res.data.token)
          setToken(res.data.token)
          setUserId(res.data.userId)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.getters.uid).then(response => {
          // commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.id).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 切换登录状态
    toggleIsAddRoute({ commit }) {
      return new Promise(resolve => {
        commit('SET_ISADDROUTE', true)
        resolve()
      })
    }
  }
}

export default user
