<script setup>
import Comp from './components/Comp1.vue';
import CompProvide from './components/CompProvide1.vue';
import { ref, provide } from 'vue';
import { useUserStore } from './store/user';
import { storeToRefs } from 'pinia';

const msg = ref('Hello Vite!');

// provide(名稱, 值)
provide('msg', msg);

const user = useUserStore();
const { age, isAdult } = storeToRefs(user);

const editAge = () => {
  user.$patch((state) => {
    state.age = 30;
  });
};
</script>

<template>
  {{ msg }}
  <hr />

  <input type="text" v-model="msg" />
  <hr />

  <Comp :msg="msg" />
  <hr />

  <CompProvide />
  <hr />

  <input type="button" value="-" @click="user.age--" />
  {{ user.age }}
  <input type="button" value="+" @click="user.age++" />
  <input type="button" value="直接 18 歲" @click="user.setAge(18)" />
  <input type="button" value="直接 30 歲" @click="editAge" />
  <p v-if="user.isAdult">滿十八</p>
  <p v-else>未成年</p>
  <hr />

  <input type="button" value="-" @click="age--" />
  {{ age }}
  <input type="button" value="+" @click="age++" />
  <p v-if="isAdult">滿十八</p>
  <p v-else>未成年</p>
  <hr />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
