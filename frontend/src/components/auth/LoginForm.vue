<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleSubmit = () => {
  console.log('Login attempt:', { email: email.value, password: password.value })
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
        <i class="bi bi-shield-lock-fill text-gradient-cyan fs-2"></i>
      </div>
      <h3 class="fw-bold text-white">Log In</h3>
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

      <div class="mb-4">
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

      <!-- Login selection -->
      <div class="d-flex flex-column justify-content-between align-items-center gap-3">
        <button
          @click="handleSubmit"
          class="btn btn-primary btn-lg w-100 py-3 py-md-2.5 fw-bold custom-login-btn"
        >
          LOG IN
        </button>

        <button class="btn btn-outline-light btn-lg w-100 py-3 py-md-2.5 fw-bold google-login-btn">
          <i class="bi bi-google me-2"></i> LOGIN WITH GOOGLE
        </button>
      </div>

      <div class="text-center pt-2 mt-3">
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
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
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
</style>
