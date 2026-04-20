<script setup lang="ts">
import LoginForm from '../components/auth/LoginForm.vue'
</script>

<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center text-center min-vh-100 px-4 py-5"
  >
    <!-- Main Hero Content -->
    <div class="d-flex flex-column justify-content-center align-items-center gap-4">
      <h1 class="display-0 tracking-tight">
        <span class="text-gradient-cyan fw-bold">Numerical Methods</span>
      </h1>

      <p class="hero-description text-secondary mb-2">
        Master complex mathematical problems from
        <span class="text-white fw-semibold">Roots of Equations</span> to
        <span class="text-white fw-semibold">Linear Algebra</span>. Experience precision through
        interactive visualization.
      </p>

      <div class="d-flex flex-column flex-md-row gap-3 gap-md-4 justify-content-center">
        <button
          type="button"
          class="btn btn-primary btn-lg rounded-pill custom-btn pulse-glow px-5 py-2 py-md-3"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
        >
          Launch Visualizer
        </button>
        <button
          type="button"
          class="btn btn-outline-light btn-lg rounded-pill custom-btn-secondary px-5 py-2 py-md-3"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
        >
          Try as Guest
        </button>
      </div>
    </div>

    <!-- Feature Cards Layer -->
    <div
      class="d-flex flex-column flex-md-row gap-3 gap-md-4 justify-content-center align-items-center mt-5"
    >
      <div class="feature-card rounded-4 p-4">
        <div class="feature-icon-wrapper mb-3 mx-auto">
          <i class="bi bi-graph-up fs-3"></i>
        </div>
        <h5 class="text-white fw-bold">Root Solving</h5>
        <p class="small text-secondary">
          Bisection, Newton-Raphson, and Secant methods with real-time graphical feedback.
        </p>
      </div>

      <div class="feature-card rounded-4 p-4">
        <div class="feature-icon-wrapper mb-3 mx-auto">
          <i class="bi bi-grid-3x3 fs-3"></i>
        </div>
        <h5 class="text-white fw-bold">Linear Algebra</h5>
        <p class="small text-secondary">
          Matrix inversion, decomposition, and system solvers visualized for deep intuition.
        </p>
      </div>
    </div>
  </div>

  <!-- Login Modal -->
  <div class="modal fade" id="loginModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
      <div class="modal-content border-0 rounded-md-4 overflow-hidden">
        <div class="modal-body p-0">
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rounded-md-4 {
  border-radius: 0; /* Sharp on mobile */

  @media (min-width: 768px) {
    border-radius: 1rem !important; /* Rounded on Desktop (matches rounded-4) */
  }
}

.hero-description {
  max-width: 800px;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.6;
}

.feature-card {
  max-width: 350px;
  width: 100%;
}
</style>
