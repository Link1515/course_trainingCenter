<template>
  <b-card
    :title="product.name"
    :img-src="product.image"
    img-alt="Image"
    img-top
    tag="article"
    class="mb-2 card-product"
  >
    <b-card-text>{{ product.price }}</b-card-text>

    <b-button href="#" variant="primary" @click="addCart"><font-awesome-icon :icon="['fas', 'cart-arrow-down']" class="mr-3" />加入購物車</b-button>
  </b-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default () {
        return {
          id: 0,
          name: '',
          price: 0,
          image: ''
        }
      }
    }
  },
  methods: {
    addCart () {
      // $store.commit(mutation的function名, 傳入的資料)
      this.$store.commit('addCart', this.product.id)
      this.$swal({
        icon: 'success',
        title: '成功',
        text: '加入購物車'
      })
    }
  }
}
</script>
