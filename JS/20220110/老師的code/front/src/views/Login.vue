<template lang="pug">
b-container#register
  b-row
    b-col(cols='12')
      h1.text-center 登入
    b-col(cols='12')
      b-form(@submit.prevent="login")
        b-form-group(label='帳號' label-for='input-account' description='帳號長度為 4 到 20 個字' :state="state.account" invalid-feedback="帳號格式不正確")
          b-form-input#input-account(v-model="form.account" required placeholder='請輸入帳號' type='text' :state="state.account")
        b-form-group(label='密碼' label-for='input-password' description='密碼長度為 4 到 20 個字' :state="state.password" invalid-feedback="密碼格式不正確")
          b-form-input#input-password(v-model="form.password" required placeholder='請輸入密碼' type='password' :state="state.password")
        .text-center
          b-btn.mx-1(variant='success' type='submit') 登入
</template>

<script>
export default {
  data () {
    return {
      form: {
        account: '',
        password: ''
      }
    }
  },
  computed: {
    state () {
      return {
        account: this.form.account.length === 0 ? null : this.form.account.length >= 4 && this.form.account.length <= 20,
        password: this.form.password.length === 0 ? null : this.form.password.length >= 4 && this.form.password.length <= 20
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('user/login', this.form)
    }
  }
}
</script>
