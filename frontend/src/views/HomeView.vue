<script setup lang="ts">
import LoginForm from '../components/auth/LoginForm.vue'
</script>

<template>
  <div class="hero-section position-relative overflow-hidden">
    <!-- Background Effects -->
    <div class="math-grid"></div>
    <div class="glow-orb top-orb"></div>
    <div class="glow-orb bottom-orb"></div>

    <!-- Main Content -->
    <div
      class="container d-flex align-items-center justify-content-center min-vh-100 position-relative z-1 pt-5"
    >
      <div class="row w-100 justify-content-center">
        <div class="col-lg-8 text-center">
          <!-- Main Hero Content -->
          <div class="hero-content mb-5">
            <h1 class="display-0 fw-bold mb-4 tracking-tight">
              <span class="text-gradient-cyan">Numerical Methods</span>
            </h1>

            <p
              class="lead mb-5 text-secondary mx-auto"
              style="max-width: 600px; font-size: 1.25rem"
            >
              Master complex mathematical problems from
              <span class="text-white fw-semibold">Roots of Equations</span> to
              <span class="text-white fw-semibold">Linear Algebra</span>. Experience precision
              through interactive visualization.
            </p>

            <div class="d-flex justify-content-center gap-4">
              <button
                type="button"
                class="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-lg custom-btn pulse-glow"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Launch Visualizer
              </button>
              <button
                type="button"
                class="btn btn-outline-light btn-lg px-5 py-3 rounded-pill custom-btn-secondary transition-all"
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
  background-color: var(--bg-darker);
  min-height: 100vh;
}

.display-0 {
  font-size: clamp(3rem, 10vw, 5.5rem);
  line-height: 1;
}

.math-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 50px 50px;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  mask-image: radial-gradient(circle, black, transparent 80%);
}

.glow-orb {
  position: absolute;
  width: 60vh;
  height: 60vh;
  border-radius: 50%;
  filter: blur(120px);
  z-index: 0;
  opacity: 0.12;
  animation: orb-float 20s infinite alternate ease-in-out;
}

@keyframes orb-float {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(50px, 30px) scale(1.1);
  }
}

.top-orb {
  top: -10%;
  right: -5%;
  background: var(--accent-cyan);
}

.bottom-orb {
  bottom: -10%;
  left: -5%;
  background: var(--accent-purple);
  animation-delay: -5s;
}

.tracking-tight {
  letter-spacing: -0.04em;
}

.feature-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(34, 211, 238, 0.2);
  transform: translateY(-5px);
}

.feature-icon-wrapper {
  width: 60px;
  height: 60px;
  background: rgba(34, 211, 238, 0.1);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  border: none;
  background: linear-gradient(135deg, #0d6efd 0%, #3b82f6 100%);
  position: relative;
  overflow: hidden;
}

.custom-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 15px 30px rgba(13, 110, 253, 0.4) !important;
}

.custom-btn-secondary {
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  font-weight: 600;
  color: #f8fafc;
}

.custom-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px);
  color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.pulse-glow {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(13, 110, 253, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
  }
}

.z-1 {
  z-index: 1;
}

.transition-all {
  transition: all 0.3s ease;
}
</style>
