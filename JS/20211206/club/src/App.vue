<template lang="pug">
#app
  Top
  #middle
    #left
      Menu
      Update
    #right
      marquee 歡迎光臨校園社團介紹網，參觀後請支持社團活動並熱烈參與
      Content
  Footer
</template>

<script>
// 引用自己的元件
import Top from './components/Top.vue'
import Menu from './components/Menu.vue'
import Update from './components/Update.vue'
import Content from './components/Content.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  // 引用後註冊元件
  components: {
    Top,
    Menu,
    Update,
    Content,
    Footer
  }
}
</script>
