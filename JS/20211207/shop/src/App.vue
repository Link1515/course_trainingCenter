<template>
<div id="app">
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-container>
      <b-navbar-brand to="/" class="mr-auto mr-lg-0">購物商城</b-navbar-brand>
      <b-btn to="/cart" class="order-lg-12">
        <font-awesome-icon :icon="['fas', 'shopping-cart']" class="mr-1" /><b-badge class="ml-1" variant="danger">{{ cartAmount }}</b-badge>
      </b-btn>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/"><font-awesome-icon :icon="['fas', 'home']" class="mr-1" />首頁</b-nav-item>
          <b-nav-item to="/products"><font-awesome-icon :icon="['fas', 'shopping-bag']" class="mr-1" />商品</b-nav-item>
          <!-- <b-nav-item to="/cart">
            <font-awesome-icon :icon="['fas', 'shopping-cart']" class="mr-1" />購物車<b-badge class="ml-1" variant="danger">{{ cartAmount }}</b-badge>
          </b-nav-item> -->
          <b-nav-item to="/about">
            <font-awesome-icon :icon="['fas', 'info-circle']" class="mr-1" />關於
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
  <router-view />
</div>
</template>

<script>
export default {
  computed: {
    cartAmount () {
      return this.$store.state.cart.length
    }
  }
}
</script>
