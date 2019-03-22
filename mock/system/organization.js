/**
 * Created by admin on .
 */
const organization = {
  'node-detail': {
    name: 'nodeName',
    nodeType: 'system1'
  },
  'node-tree': [{
    id: 1,
    label: 'Level one 1',
    children: [{
      id: 4,
      label: 'Level two 1-1',
      children: [{
        id: 9,
        label: 'Level three 1-1-1'
      }, {
        id: 10,
        label: 'Level three 1-1-2'
      }]
    }]
  }, {
    id: 2,
    label: 'Level one 2',
    children: [{
      id: 5,
      label: 'Level two 2-1'
    }, {
      id: 6,
      label: 'Level two 2-2'
    }]
  }, {
    id: 3,
    label: 'Level one 3',
    children: [{
      id: 7,
      label: 'Level two 3-1'
    }, {
      id: 8,
      label: 'Level two 3-2'
    }]
  }]
}
export default {
  getlist: res => {
    const info = organization['node-tree']
    if (info) {
      return {
        code: '0000',
        data: info
      }
    }
  },
  nodeDetail: res => {
    const info = organization['node-detail']
    if (info) {
      return {
        code: '0000',
        data: info
      }
    }
  }
}
