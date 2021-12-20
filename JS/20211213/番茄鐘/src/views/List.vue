<template lang="pug">
#list.py-3
  b-container
    b-row
      b-col(cols="12")
        h1.text-center 待辦事項
      b-col(cols="12")
        b-form-group(
          label="新增事項"
          label-for="newinput"
          valid-feedback="OK !"
          invalid-feedback="字數太少")
          b-form-input#newinput(
            v-model="newinput"
            :state="newinputstate"
            @keydown.enter="additem")
        b-btn.w-25.d-block.mx-auto(variant="success" size="lg" @click="additem") 新增
      b-col(cols="12")
        b-table.my-3(:items="items" :fields="fields" show-empty striped hover)
          template(#empty)
            p.text-center 沒有項目
          template(#cell(name)="data")
            b-form-input(
              autofocus
              v-if="data.item.edit"
              v-model="data.item.model"
              :state="data.item.state"
              @keydown.enter="submitedit(data.index)"
              @keydown.esc="canceledit(data.index)")
            span(v-else) {{ data.value }}
            b-form-invalid-feedback 字數太少
            b-form-valid-feedback OK !
          template(#cell(action)="data")
            span(v-if="data.item.edit")
              b-btn.mx-1(varient="success" @click="submitedit(data.index)")
                b-icon(icon="check")
              b-btn.mx-1(varient="danger" @click="canceledit(data.index)")
                b-icon(icon="arrow-counterclockwise")
            span(v-else)
              b-btn.mx-1(variant="success" @click="edititem(data.index)")
                b-icon(icon="pencil")
              b-btn.mx-1(variant="danger" @click="delitem(data.index)")
                b-icon(icon="trash")
      b-col(cols="12")
        h1.text-center 已完成
      b-col(cols="12")
        b-table-simple
          thead
            th 名稱
            th 操作
          tbody
            tr(v-for="(item, idx) in finished")
              td {{ item }}
              td
                b-btn(variant="danger" @click="delfinish(idx)")
                  b-icon(icon="trash")
            tr(v-if="finished.length === 0")
              td.text-center(colspan="2") 沒有項目

</template>

<script>
export default {
  data () {
    return {
      newinput: '',
      fields: [
        { key: 'name', label: '名稱' },
        { key: 'action', label: '操作' }
      ]
    }
  },
  computed: {
    newinputstate () {
      return this.newinput.length > 2 ? true : this.newinput.length === 0 ? null : false
    },
    items () {
      return this.$store.state.items.map(item => {
        item.state = item.model.length > 2
        return item
      })
    },
    finished () {
      return this.$store.state.finished
    }
  },
  methods: {
    additem () {
      if (this.newinputstate) {
        this.$store.commit('additem', this.newinput)
        this.newinput = ''
      }
    },
    edititem (index) {
      this.$store.commit('edititem', index)
    },
    delitem (index) {
      this.$store.commit('delitem', index)
    },
    submitedit (index) {
      if (this.items[index].state) {
        this.$store.commit('submitedit', index)
      }
    },
    canceledit (index) {
      this.$store.commit('canceledit', index)
    },
    delfinish (index) {
      this.$store.commit('delfinish', index)
    }
  }
}
</script>
