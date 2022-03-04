<script setup>
import { inject } from 'vue';

const msg = inject('msg');
</script>

<template>
  <h1>CompProvide</h1>
  <input type="text" v-model="msg" />
</template>
