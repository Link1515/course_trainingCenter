<template>
<div id="products">
  <b-container>
    <b-row align-h="center">
      <b-col cols="12">
        <h1 class="text-center my-3">所有商品</h1>
      </b-col>
      <b-col cols="12" md="6" lg="3" v-for="product in products" :key="product.id">
        <ProductCard :product="product"/>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'

export default {
  components: {
    ProductCard
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>
