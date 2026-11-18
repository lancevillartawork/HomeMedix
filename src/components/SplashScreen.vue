<script setup lang="ts">
</script>

<template>
  <div class="splash-screen">
    <div class="splash-content">

      <div class="logo-wrap">
        <img
          src="/assets/homemedix-logo.png"
          alt="HomeMedix Logo"
          class="logo"
        />
      </div>

      <h1>HomeMedix</h1>

      <p>
        Compassionate care. Trusted support.
      </p>

      <div class="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>
  </div>
</template>

<style scoped>
.splash-screen {
  position: fixed;
  inset: 0;

  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #ffffff;
}

.splash-content {
  text-align: center;

  animation: fadeIn 0.6s ease;
}

.logo-wrap {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 20px;
}

.logo {
  width: 100px;
  height: 100px;

  object-fit: contain;
}

h1 {
  margin: 0;

  color: #1a3575;

  font-size: 42px;
  font-weight: 700;
}

p {
  margin: 10px 0 30px;

  color: #677184;

  font-size: 16px;
}

.loader {
  display: flex;
  justify-content: center;

  gap: 8px;
}

.loader span {
  width: 10px;
  height: 10px;

  border-radius: 50%;

  background: #4bc8ec;

  animation: bounce 1.2s infinite ease-in-out;
}

.loader span:nth-child(2) {
  animation-delay: 0.15s;
}

.loader span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0.7);
    opacity: 0.4;
  }

  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>