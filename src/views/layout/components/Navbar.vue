<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img src="static/avatar.jpg" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided style="overflow-x: hidden">
          <span style="display:block;padding: 0 20px" @click="changePassword">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided style="overflow-x: hidden">
          <span style="display:block;padding: 0 20px" @click="logout">登出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import changePassword from '@/components/changePassword'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    changePassword
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    // 展开收起菜单
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    // 登出
    logout() {
      this.$confirm('确定退出?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    },
    // 显示更改密码
    changePassword() {
      this.$store.dispatch('ToggleShowPassword', true)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  background-color: #ffffff;
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
.el-dropdown-menu{
  padding: 0!important;
}
/deep/ .el-dropdown-menu__item{
  padding: 0!important;
  overflow-x: hidden;
  text-align: center;
}
</style>

