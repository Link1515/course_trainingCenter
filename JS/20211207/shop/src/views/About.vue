<template>
<div id="about">
  <b-container>
    <h1 class="text-center py-3">關於</h1>
    <b-row>
      <b-col cols="12" class="text-center py-3">
        <p>網頁設計及維護: XXOOO <br> 最近更新日期: {{ date }}</p>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
export default {
  data () {
    return {
      date: new Date().toLocaleDateString()
    }
  }
}
</script>
