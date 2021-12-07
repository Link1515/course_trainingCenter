<template>
<div id="notfound" class="text-center">
  <h1>找不到</h1>
  <b-btn size="lg" variant="primary" @click="gohome">回首頁</b-btn>
</div>
</template>

<script>
export default {
  methods: {
    gohome () {
      this.$router.push('/')
    }
  }
}
</script>
