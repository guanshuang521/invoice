/**
 * @author Linzb
 * @date 2019/3/29
 * @Description: 数据字典
 */
import { getDictList } from '@/api/system'
import { arrayToMap } from '@/utils/public'
const dictionary = {
  state: {
    dictList: []
  },
  actions: {
    GetDictList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getDictList().then(res => {
          commit('SET_DICT_LIST', arrayToMap(res.data.list, 'paramCode'))
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  mutations: {
    SET_DICT_LIST(state, args) {
      state.dictList = args
    }
  }
}
export default dictionary
