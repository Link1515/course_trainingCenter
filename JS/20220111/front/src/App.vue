<template lang="pug">
#app
  b-navbar(toggleable="lg" type="dark" variant="info")
    b-container
      b-navbar-brand(to="/") 購物網
      b-navbar-toggle(target="nav-collapse")
      b-collapse#nav-collapse(is-nav)
        b-navbar-nav.ml-auto
          b-nav-item(v-if="!user.isLogin" to="/register") 註冊
          b-nav-item(v-if="!user.isLogin" to="/login") 登入
          b-nav-item(v-if="user.isLogin" to="/cart")
            | 購物車
            b-badge(variant="danger") {{ user.cart }}
          b-nav-item(v-if="user.isLogin" to='/orders') 訂單
          b-nav-item(v-if="user.isLogin && user.isAdmin" to="/admin") 管理
          b-nav-item(v-if="user.isLogin" @click="logout") 登出
  router-view(:key="$route.fullPath")
</template>

<script>

export default {
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
    }
  },
  async created () {
    this.$store.dispatch('user/getInfo')
  }
}
</script>
