/**
 * Created by linzibin on 2019.3.8.
 * defined some public methods
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
 * 将接口返回的数组结构的数据转化为菜单树
 */
export function arrayToTree(array) {
  const nodes = []
  // 获取顶级节点`
  for (let i = 0; i < array.length; i++) {
    const row = array[i]
    if (!exists(array, row.parentId)) {
      nodes.push({
        lable: row.title,
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
          lable: row.title,
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
