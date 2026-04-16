<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleSubmit = () => {
  console.log('Login attempt:', { email: email.value, password: password.value })
}
</script>

<template>
  <div class="login-form-container position-relative p-4 p-md-5">
    <!-- Close Button for Modal -->
    <button
      type="button"
      class="btn-close btn-close-white position-absolute top-0 end-0 m-4"
      data-bs-dismiss="modal"
      aria-label="Close"
    ></button>

    <!-- Header -->
    <div class="text-center mb-3">
      <div class="icon-box mx-auto mb-3">
        <i class="bi bi-shield-lock-fill text-gradient-cyan fs-2"></i>
      </div>
      <h3 class="fw-bold text-white mb-2 tracking-tight">Log In</h3>
      <p class="text-secondary small opacity-75">Enter your email and password to continue</p>
    </div>

    <!-- Form Inputs -->
    <div class="form-body">
      <div class="mb-4">
        <label class="form-label text-secondary small fw-bold tracking-wider">EMAIL</label>
        <div class="input-group-custom">
          <i class="bi bi-person input-icon text-secondary"></i>
          <input
            type="text"
            v-model="email"
            placeholder="[EMAIL_ADDRESS]"
            class="form-control-custom text-white"
          />
        </div>
      </div>

      <div class="mb-5">
        <label class="form-label text-secondary small fw-bold tracking-wider">PASSWORD</label>
        <div class="input-group-custom">
          <i class="bi bi-key input-icon text-secondary"></i>
          <input
            type="password"
            v-model="password"
            placeholder="••••••••••••"
            class="form-control-custom text-white"
          />
        </div>
      </div>

      <!-- Actions -->
      <button
        @click="handleSubmit"
        class="btn btn-primary btn-lg w-100 py-3 fw-bold custom-login-btn mb-4"
      >
        LOG IN <i class="bi bi-arrow-right-short ms-1"></i>
      </button>

      <div class="text-center pt-2">
        <p class="small text-secondary mb-0">
          First time here?
          <a href="#" class="text-gradient-cyan text-decoration-none fw-bold ms-1"
            >Initialize Account</a
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

.tracking-wider {
  letter-spacing: 0.1em;
  font-size: clamp(0.8rem, 2vw, 1rem);
}

.tracking-tight {
  letter-spacing: -0.02em;
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
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  background: linear-gradient(135deg, #0d6efd 0%, #3b82f6 100%);
  border: none;
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.custom-login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(13, 110, 253, 0.4);
}

.custom-login-btn:active {
  transform: translateY(0);
}
</style>
