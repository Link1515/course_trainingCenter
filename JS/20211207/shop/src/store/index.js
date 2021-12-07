import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [
      {
        id: 1,
        name: '雪碧',
        price: 20,
        image: 'https://www.costco.com.tw/medias/sys_master/images/h06/h39/11953650106398.jpg'
      },
      {
        id: 2,
        name: '可口可樂',
        price: 20,
        image: 'https://vgbbq.co/wp-content/uploads/2021/06/11953645322270.jpg'
      },
      {
        id: 3,
        name: '維他露P',
        price: 10,
        image: 'https://cdn.shopify.com/s/files/1/1166/5522/products/sglQTO9i05_1024x1024.jpg?v=1623454191'
      },
      {
        id: 4,
        name: '維大力',
        price: 20,
        image: 'https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/N01/100/68/N011006811.jpg&v=57db7495&w=280&h=280'
      },
      {
        id: 5,
        name: '百事可樂',
        price: 20,
        image: 'https://www.vedan.com.tw/cache/520/520/uploads-products-5acb0724ca7df.jpg'
      },
      {
        id: 6,
        name: '阿薩姆奶茶',
        price: 20,
        image: 'https://www.taifoods.com/upload/products/20201228150221tjfz7.jpg'
      }
    ],
    cart: []
  },
  mutations: {
    addCart (state, data) {
      const idx = state.cart.findIndex(product => {
        return product.id === data
      })
      if (idx > -1) {
        state.cart[idx].count++
      } else {
        const pidx = state.products.findIndex(product => {
          return product.id === data
        })

        state.cart.push({ ...state.products[pidx], count: 1 })
      }
    },
    delCart (state, data) {
      const idx = state.cart.findIndex(product => {
        return product.id === data
      })
      state.cart.splice(idx, 1)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      // localStorage 的 key，不設的話是 vuex
      key: 'shop-practice',
      // 指定只保存 state 裡的哪個資料
      paths: ['cart']
    })
  ]
})
