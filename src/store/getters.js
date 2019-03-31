const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  isAddRoute: state => state.user.isAddRoute,
  avatar: state => state.user.avatar,
  uid: state => state.user.id,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  dictList: state => state.dictionary.dictList,
  // 发票类型
  fplx_ele: state => state.fplx.fplx_ele,
  fplx_gen: state => state.fplx.fplx_gen,
  fplx_spe: state => state.fplx.fplx_spe
}
export default getters
