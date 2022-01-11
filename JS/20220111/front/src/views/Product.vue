<template lang="pug">
b-container#product
  b-overlay(:show="!sell")
    template(#overlay)
      h1 商品已下架
    b-row
      b-col(cols="6")
        h1 {{ name }}
      b-col(cols="6")
        h4.text-right ${{ price }}
        b-form-input(type="number" v-model.number="quantity" :state="quantityState" min="0")
        b-btn(variant="primary" @click="addCart") add to cart
      b-col(cols="12")
        img.w-100(:src="image")
        p(style="white-space: pre;") {{ description }}
</template>

<script>
export default {
  data () {
    return {
      name: '',
      price: 0,
      description: '',
      image: '',
      sell: false,
      category: '',
      quantity: 0
    }
  },
  methods: {
    addCart () {
      this.$store.dispatch('user/addCart', { product: this.$route.params.id, quantity: this.quantity })
    }
  },
  computed: {
    quantityState () {
      return this.quantity === 0 ? null : this.quantity > 0
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/products/' + this.$route.params.id)
      this.name = data.result.name
      this.price = data.result.price
      this.description = data.result.description
      this.image = data.result.image
      this.sell = data.result.sell
      this.category = data.result.category
      document.title = `${this.name} | 購物網`
    } catch (error) {
      this.$router.push('/')
    }
  }
}
</script>
