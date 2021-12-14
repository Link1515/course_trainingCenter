<template>
  <div id="app">
    <h2>用戶列表</h2>
    <hr>
    <table border="1">
      <tr v-for="(user, idx) in users" :key="user._id">
        <td>{{ user.account }}</td>
        <td>{{ user.age }}</td>
        <td>{{ user.email }}</td>
        <td>
          <input type="button" value="編輯">
          <input type="button" value="刪除" @click="del(idx)">
        </td>
      </tr>
    </table>
    <br>
    <br>
    <hr>
    <h2>新增用戶</h2>
    <form @submit.prevent="add">
      <table>
        <tr>
          <td>帳號 account</td>
          <td>密碼 password</td>
          <td>電子信箱 email</td>
          <td>年齡 age</td>
        </tr>
        <tr>
          <td><input type="text" v-model="form.account"></td>
          <td><input type="password" v-model="form.password"></td>
          <td><input type="email" v-model="form.email"></td>
          <td><input type="number" v-model="form.age"></td>
        </tr>
        <input type="submit">
      </table>
    </form>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      users: [],
      form: {
        account: '',
        password: '',
        age: '',
        email: ''
      }
    }
  },
  async created () {
    try {
      const { data } = await this.axios.get('/')
      this.users = data.result
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async del (idx) {
      try {
        await this.axios.delete('/' + this.users[idx]._id)
        this.users.splice(idx, 1)
      } catch (error) {
        alert('刪除失敗')
      }
    },
    async add () {
      try {
        const { data } = await this.axios.post('/', this.form)
        this.users.push(data.result)
        this.form = {
          account: '',
          password: '',
          age: '',
          email: ''
        }
      } catch (error) {
        alert(error.response.data.message)
      }
    }
  }
}
</script>
