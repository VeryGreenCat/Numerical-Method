<script setup lang="ts">
import { ref } from 'vue'

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const toggleMode = () => {
  isLogin.value = !isLogin.value
  password.value = ''
  confirmPassword.value = ''
}

const handleSubmit = () => {
  if (isLogin.value) {
    console.log('Login attempt:', { email: email.value, password: password.value })
  } else {
    if (password.value !== confirmPassword.value) {
      console.log('Passwords do not match')
      return
    }
    console.log('Register attempt:', {
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    })
  }
}
</script>

<template>
  <div class="login-form-container position-relative">
    <!-- Close Button for Modal -->
    <button
      type="button"
      class="btn-close btn-close-white position-absolute top-0 end-0 m-4"
      data-bs-dismiss="modal"
      aria-label="Close"
    ></button>

    <!-- Header -->
    <div class="text-center mb-4">
      <div class="icon-box mx-auto mb-3">
        <Transition name="fade-scale" mode="out-in">
          <i
            :key="isLogin ? 'login' : 'register'"
            :class="isLogin ? 'bi-shield-lock-fill' : 'bi-person-plus-fill'"
            class="bi text-gradient-cyan fs-2"
          ></i>
        </Transition>
      </div>
      <Transition name="fade-slide" mode="out-in">
        <h3 :key="isLogin ? 'login' : 'register'" class="fw-bold text-white">
          {{ isLogin ? 'Log In' : 'Create Account' }}
        </h3>
      </Transition>
    </div>

    <!-- Form Inputs -->
    <div class="form-body">
      <div class="mb-2">
        <label class="form-label text-secondary small fw-bold tracking-wider mb-1">Email</label>
        <div class="input-group-custom">
          <i class="bi bi-person input-icon text-secondary"></i>
          <input
            type="text"
            v-model="email"
            placeholder="Enter Email"
            class="form-control-custom text-white"
          />
        </div>
      </div>

      <div :class="isLogin ? 'mb-4' : 'mb-2'">
        <label class="form-label text-secondary small fw-bold tracking-wider mb-1">Password</label>
        <div class="input-group-custom">
          <i class="bi bi-key input-icon text-secondary"></i>
          <input
            type="password"
            v-model="password"
            placeholder="Enter Password"
            class="form-control-custom text-white"
          />
        </div>
      </div>

      <Transition name="expand">
        <div v-if="!isLogin" class="mb-4 overflow-hidden">
          <label class="form-label text-secondary small fw-bold tracking-wider mb-1"
            >Confirm Password</label
          >
          <div class="input-group-custom">
            <i class="bi bi-check-all input-icon text-secondary"></i>
            <input
              type="password"
              v-model="confirmPassword"
              placeholder="Confirm Password"
              class="form-control-custom text-white"
            />
          </div>
        </div>
      </Transition>

      <!-- Login selection -->
      <div class="d-flex flex-column justify-content-between align-items-center gap-3">
        <button
          @click="handleSubmit"
          class="btn btn-primary btn-lg w-100 py-3 py-md-2.5 fw-bold custom-login-btn"
        >
          <Transition name="fade-slide" mode="out-in">
            <span :key="isLogin ? 'login' : 'register'">
              {{ isLogin ? 'LOG IN' : 'CREATE ACCOUNT' }}
            </span>
          </Transition>
        </button>

        <button class="btn btn-outline-light btn-lg w-100 py-3 py-md-2.5 fw-bold google-login-btn">
          <i class="bi bi-google me-2"></i>
          <Transition name="fade-slide" mode="out-in">
            <span :key="isLogin ? 'login' : 'register'">
              {{ isLogin ? 'LOGIN WITH GOOGLE' : 'SIGN UP WITH GOOGLE' }}
            </span>
          </Transition>
        </button>
      </div>

      <div class="text-center pt-2 mt-3">
        <p class="small text-secondary mb-0">
          {{ isLogin ? 'First time here?' : 'Already have an account?' }}
          <a
            href="javascript:void(0)"
            @click.prevent="toggleMode"
            class="text-gradient-cyan text-decoration-none fw-bold ms-1"
            >{{ isLogin ? 'Create an Account' : 'Log In' }}</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-form-container {
  background: rgba(15, 23, 42, 0.9);
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.25rem;
  /* equal to p-4.5 in bootstrap */
}

@media (min-width: 768px) {
  .login-form-container {
    padding: 3rem;
    /* equal to p-5 in bootstrap */
  }
}

.icon-box {
  width: 64px;
  height: 64px;
  background: rgba(13, 110, 253, 0.1);
  border: 1px solid rgba(13, 110, 253, 0.2);
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-group-custom {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1.25em;
  font-size: 1.1rem;
}

.form-control-custom {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  width: 100%;
  padding: 1rem 1.25rem 1rem 3.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  outline: none;
  transition: all 0.2s ease;
}

.form-control-custom::placeholder {
  color: rgba(255, 255, 255, 0.2);
}

.form-control-custom:focus {
  background: rgba(255, 255, 255, 0.05);
  border-color: #0d6efd;
  box-shadow: 0 0 15px rgba(13, 110, 253, 0.2);
}

.custom-login-btn {
  font-size: 1rem;
  background: linear-gradient(135deg, #0d6efd 0%, #3b82f6 100%);
  border: none;
  border-radius: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(13, 110, 253, 0.4);
}

.custom-login-btn:active {
  transform: translateY(0);
}

.google-login-btn {
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  color: rgba(255, 255, 255, 0.9);
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.google-login-btn:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.google-login-btn i {
  color: #ea4335;
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.google-login-btn:hover i {
  transform: scale(1.1);
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 100px;
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  margin-bottom: 0 !important;
  transform: translateY(-10px);
}
</style>
