/**
 * @author Linzb
 * @date 2019/4/18
 * @Description: 定义全局公共函数文件
 */

/**
 * 将接口返回的数组结构的数据转化为树形结构
 */
import Layout from '../views/layout/Layout'
const _import = require('@/router/_import_' + process.env.NODE_ENV) // 动态获取组件的方法
export function arrayToMenu(array) {
  const nodes = []
  // 获取顶级节点
  for (let i = 0; i < array.length; i++) {
    const row = array[i]
    if (!exists(array, row.parentId)) {
      nodes.push({
        path: row.path,
        component: Layout,
        name: row.name,
        meta: { title: row.title, icon: row.name },
        id: row.id,
        redirect: 'noredirect'
      })
    }
  }
  const toDo = Array.from(nodes)
  while (toDo.length) {
    const node = toDo.shift()
    // 获取子节点
    for (let i = 0; i < array.length; i++) {
      const row = array[i]
      if (row.parentId === node.id) {
        const child = {
          path: row.path,
          name: row.name,
          component: _import(row.component),
          meta: { title: row.title, icon: row.name },
          id: row.id
        }
        if (node.children) {
          node.children.push(child)
        } else {
          node.children = [child]
        }
        toDo.push(child)
      }
    }
  }
  return nodes
}
/**
 * @author Wujy
 * @date 2019/3/21
 * @Description: 将接口返回的数组结构的数据转化为树型结构
*/
export function arrayToTree(array, targetField) {
  const nodes = []
  // 获取顶级节点`
  for (let i = 0; i < array.length; i++) {
    const row = array[i]
    if (!exists(array, row.parentId)) {
      nodes.push({
        label: row[targetField],
        id: row.id
      })
    }
  }
  const toDo = Array.from(nodes)
  while (toDo.length) {
    const node = toDo.shift()
    // 获取子节点
    for (let i = 0; i < array.length; i++) {
      const row = array[i]
      if (row.parentId === node.id) {
        const child = {
          label: row[targetField],
          id: row.id
        }
        if (node.children) {
          node.children.push(child)
        } else {
          node.children = [child]
        }
        toDo.push(child)
      }
    }
  }
  return nodes
}
function exists(rows, parentId) {
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].id === parentId) return true
  }
  return false
}
/**
 * @author Linzb
 * @date 2019/3/29
 * @Description: 将数组结构数据按照指定字段转化成对象结构
*/
export function arrayToMap(arr, targetField) {
  const map = {}
  const t = targetField
  if (arr instanceof Array) {
    arr.forEach(function(item) {
      if (!map[item[t]]) {
        map[item[t]] = []
      }
    })
    for (const p in map) {
      arr.forEach(function(item) {
        if (p === item[t]) {
          map[p].push(item)
        }
      })
    }
  }
  return map
}
/**
 * @author Linzb
 * @date 2019/3/29
 * @Description: 将数组结构数据按照指定字段转化成对象结构
 */
export function arrayToMapField(arr, targetField, itemField) {
  const map = {}
  const t = targetField
  if (arr instanceof Array) {
    arr.forEach(function(item) {
      if (!map[item[t]]) {
        map[item[t]] = ''
      }
    })
    for (const p in map) {
      arr.forEach(function(item) {
        if (p === item[t]) {
          map[p] = item[itemField]
        }
      })
    }
  }
  return map
}
// arrayToMapField
// export function arrayToMapField1(arr, targetField, itemField) {
//   const map = {}
//   const t = targetField
//   if (arr instanceof Array) {
//     arr.forEach(function(item) {
//       if (!map[item[t]]) {
//         map[item[t]] = ''
//       }
//     })
//     for (const p in map) {
//       arr.forEach(function(item) {
//         if (p === item[t]) {
//           map[p] = item[itemField]
//         }
//       })
//     }
//   }
//   return map
// }
