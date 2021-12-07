<template>
<div>
  <b-container >
    <b-row>
      <b-col cols="12">
        <h1 class="text-center py-3">購物車</h1>
      </b-col>
      <b-col cols="12">
        <b-table responsive hover  :fields="fields"  :items="cart">
          <template #cell(image)="data">
            <img :src="data.value" width="50">
          </template>
          <template #cell(action)="data">
            <b-button variant="danger" @click="delCart(data.item.id)"><font-awesome-icon :icon="['fas', 'times']" /></b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
export default {
  data () {
    return {
      fields: [
        { key: 'id', label: '商品編號', sortable: true },
        { key: 'image', label: '圖片' },
        { key: 'name', label: '名稱', sortable: true },
        { key: 'price', label: '價格', sortable: true },
        { key: 'count', label: '數量', sortable: true },
        { key: 'action', label: '動作' }
      ]
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    }
  },
  methods: {
    delCart (id) {
      this.$store.commit('delCart', id)
      this.$swal({
        icon: 'success',
        title: '成功',
        text: '已刪除'
      })
    }
  }
}
</script>
