<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const login = () => {
  console.log(username.value, password.value)
}
</script>

<template>
  <div class="container d-flex align-items-center justify-content-center vh-100">
    <div class="card p-4 shadow" style="width: 400px;">
      <h2 class="text-center mb-4">Login</h2>
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input type="text" v-model="username" class="form-control" placeholder="Username" />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" v-model="password" class="form-control" placeholder="Password" />
      </div>
      <button class="btn btn-primary w-100" @click="login">Login</button>
    </div>
  </div>
</template>
