<template lang="pug">
p#update 最近更新日期: {{ year }}/{{ month }}/{{ date }}
</template>

<script>
export default {
  name: 'Update',
  data () {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth().toString().padStart(2, 0),
      date: new Date().getDate().toString().padStart(2, 0)
    }
  }
}
</script>
