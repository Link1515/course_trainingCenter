<template lang="pug">
b-container
  p.text-center 總金額 {{ total }}
  b-btn(variant="success" block @click="checkout" :disabled="products.length === 0") 結帳
  b-table(:items="products" :fields="fields" :tbody-tr-class="rowClass")
    template(#cell(image)='data')
      img(v-if="data.item.product.image" :src="data.item.product.image" style="height: 50px;")
    template(#cell(name)="data")
      | {{ data.item.product.name }}
    template(#cell(price)="data")
      | {{ data.item.product.price }}
    template(#cell(action)="data")
      b-form-spinbutton(v-model="data.item.quantity" min="1" inline @change="updateCart(data.index, data.item.quantity)")
      | &emsp;
      b-btn(variant="danger" @click="updateCart(data.index, 0)") X
</template>

<script>
export default {
  data () {
    return {
      products: [],
      fields: [
        { key: 'image', label: '圖片' },
        { key: 'name', label: '名稱' },
        { key: 'price', label: '價格' },
        { key: 'action', label: '操作' }
      ]
    }
  },
  methods: {
    async updateCart (index, quantity) {
      try {
        await this.api.patch('/users/me/cart', {
          product: this.products[index].product._id,
          quantity
        }, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })

        if (quantity === 0) {
          this.products.splice(index, 1)
          this.$store.commit('user/updateCart', this.user.cart - 1)
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: '修改購物車失敗'
        })
      }
    },
    async checkout () {
      try {
        await this.api.post('/orders', {}, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.$router.push('/orders')
        this.$store.commit('user/updateCart', 0)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: '結帳失敗'
        })
      }
    },
    rowClass (item, type) {
      if (!item || type !== 'row') return
      return !item.product.sell ? 'bg-danger' : ''
    }
  },
  computed: {
    total () {
      return this.products.reduce((acc, cur) => {
        return acc + cur.quantity * cur.product.price
      }, 0)
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('users/me/cart', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.products = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '失敗',
        text: '取得購物車失敗'
      })
    }
  }
}
</script>
