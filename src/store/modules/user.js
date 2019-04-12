import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    id: '',
    isAddRoute: false,
    isAutoLoadData: false,
    org: {
      mc: '顺丰快递公司',
      nsrsbh: '1101011234567890000Q',
      zcDzdh: '中国北京 13587954531',
      khhMczh: '中国工商银行 6895758965487415',
      kpr: '管理员'
    }
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
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
          data.token = '19668890-ec09-4c8a-aef2-5d7b559c9983'
          commit('SET_ID', data.id)
          commit('SET_TOKEN', data.token)
          setToken(data.token)
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
        logout(state.token).then(() => {
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
