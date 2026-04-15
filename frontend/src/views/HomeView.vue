<script setup lang="ts">
import LoginForm from '../components/auth/LoginForm.vue'
</script>

<template>
  <div class="hero-section position-relative overflow-hidden">
    <!-- Main Content -->
    <div
      class="container d-flex align-items-center justify-content-center min-vh-100 position-relative z-1 py-5"
    >
      <div class="row w-100 justify-content-center">
        <div class="col-lg-8 text-center">
          <!-- Main Hero Content -->
          <div
            class="hero-content mb-5 d-flex flex-column justify-content-center align-items-center"
          >
            <h1 class="display-0 fw-bold mb-4 tracking-tight">
              <span class="text-gradient-cyan">Numerical Methods</span>
            </h1>

            <p class="hero-description mb-5 text-secondary mx-auto">
              Master complex mathematical problems from
              <span class="text-white fw-semibold">Roots of Equations</span> to
              <span class="text-white fw-semibold">Linear Algebra</span>. Experience precision
              through interactive visualization.
            </p>

            <div
              class="w-75 w-md-100 d-flex flex-column flex-md-row justify-content-center gap-3 gap-md-4"
            >
              <button
                type="button"
                class="btn btn-primary btn-lg px-4 px-md-5 py-2 py-md-3 rounded-pill shadow-lg custom-btn pulse-glow"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Launch Visualizer
              </button>
              <button
                type="button"
                class="btn btn-outline-light btn-lg px-4 px-md-5 py-2 py-md-3 rounded-pill custom-btn-secondary transition-all"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Try as Guest
              </button>
            </div>
          </div>

          <!-- Feature Cards Layer -->
          <div class="row mt-5 pt-3 g-4 justify-content-center">
            <div class="col-md-5">
              <div class="feature-card h-100 p-4 rounded-4 transition-all">
                <div class="feature-icon-wrapper mb-3 mx-auto">
                  <i class="bi bi-graph-up text-cyan fs-3"></i>
                </div>
                <h5 class="text-white fw-bold mb-2">Root Solving</h5>
                <p class="small text-secondary mb-0">
                  Bisection, Newton-Raphson, and Secant methods with real-time graphical feedback.
                </p>
              </div>
            </div>
            <div class="col-md-5">
              <div class="feature-card h-100 p-4 rounded-4 transition-all">
                <div class="feature-icon-wrapper mb-3 mx-auto">
                  <i class="bi bi-grid-3x3 text-purple fs-3"></i>
                </div>
                <h5 class="text-white fw-bold mb-2">Linear Algebra</h5>
                <p class="small text-secondary mb-0">
                  Matrix inversion, decomposition, and system solvers visualized for deep intuition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Login Modal -->
  <div class="modal fade" id="loginModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
      <div class="modal-content glass-card border-0 rounded-4 overflow-hidden h-100">
        <div class="modal-body p-0 h-100">
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  min-height: 100vh;
}

.z-1 {
  z-index: 1;
}

.transition-all {
  transition: all 0.3s ease;
}
</style>
