<template lang="pug">
b-container#admin.mt-5
  b-row
    b-col(cols='12')
      b-nav(pills justified)
        b-nav-item(to='/admin/products' exact exact-active-class='active') 商品管理
        b-nav-item(to='/admin/orders' exact exact-active-class='active') 訂單管理
    b-col(cols='12')
      router-view
</template>
