import { api } from '@/plugins/axios.js'
import swal from 'sweetalert2'
import router from '@/router'

export const login = async ({ commit }, form) => {
  try {
    const { data } = await api.post('/users/login', form)
    commit('login', data.result)
    router.push('/')
    swal.fire({
      icon: 'success',
      title: '成功',
      text: '登入成功'
    })
  } catch (error) {
    swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.response.data.message
    })
  }
}

export const logout = async ({ commit, state }) => {
  try {
    await api.delete('/users/logout', {
      headers: {
        authorization: 'Bearer ' + state.token
      }
    })
    router.push('/')
    commit('logout')
    swal.fire({
      icon: 'success',
      title: '成功',
      text: '登出成功'
    })
  } catch (error) {
    swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.response.data.message
    })
  }
}

export const getInfo = async ({ commit, state }) => {
  if (state.token.length === 0) return
  try {
    const { data } = await api.get('/users/me', {
      headers: {
        authorization: 'Bearer ' + state.token
      }
    })
    commit('getInfo', data.result)
  } catch (error) {
    commit('logout')
  }
}

export const addCart = async ({ commit, state }, data) => {
  if (state.token.length === 0) {
    swal.fire({
      icon: 'error',
      title: '錯誤',
      text: '請先登入'
    })
    router.push('/login')
    return
  }

  if (data.quantity <= 0) {
    swal.fire({
      icon: 'error',
      title: '錯誤',
      text: '請輸入正確數量'
    })
    return
  }
  try {
    const { data: resData } = await api.post('/users/me/cart', data, {
      headers: {
        authorization: 'Bearer ' + state.token
      }
    })
    commit('updateCart', resData.result)
    swal.fire({
      icon: 'success',
      title: '成功',
      text: '加入購物車成功'
    })
  } catch (error) {
    swal.fire({
      icon: 'error',
      title: '錯誤',
      text: '加入購物車失敗'
    })
  }
}
