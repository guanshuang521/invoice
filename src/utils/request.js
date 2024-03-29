import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['x-access-token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      /* config.headers['fapiao_token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改*/
      /* config.headers['fapiao_token'] = '1e00be39-9ddb-4673-90e6-1dd1fb8b36f0' // 让每个请求携带自定义token 请根据实际情况自行修改*/
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非0000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (!res.code) {
      return res
    }
    if (res.code !== '0000') {
      // 90001:非法的token; 90002:其他客户端登录了;  90003:Token 过期了;
      if (res.code === '90001' || res.code === '90002' || res.code === '90003') {
        MessageBox.alert('你已被登出，或者重新登录!', '登录超时', {
          confirmButtonText: '重新登录', callback: action => {
            store.dispatch('FedLogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          }
        })
        return false
      }
      return Promise.reject(res.message)
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    let errorMsg = '请求失败'
    if (error.config.url === '/print') {
      errorMsg = '调起打印客户端失败，请确认是否已打开客户端'
    }
    Message({
      message: errorMsg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
