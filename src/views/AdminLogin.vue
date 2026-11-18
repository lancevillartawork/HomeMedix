<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const passcode = ref('')
const errorMessage = ref('')

// Change this passcode or connect it to your backend/Supabase auth later
const ADMIN_PASSCODE = 'homemedix2026'

function handleLogin() {
  if (passcode.value === ADMIN_PASSCODE) {
    sessionStorage.setItem('homemedix_admin_auth', 'true')
    errorMessage.value = ''
    router.push('/employees')
  } else {
    errorMessage.value = 'Invalid admin passcode. Please try again.'
  }
}
</script>

<template>
  <section class="login-section">
    <div class="login-card">
      <img
        src="/assets/homemedix-logo.png"
        alt="HomeMedix logo"
        class="login-logo"
      >
      <span class="login-eyebrow">RESTRICTED ACCESS</span>
      <h1 class="login-title">Admin Portal Login</h1>
      <p class="login-subtitle">
        Enter the administrator passcode to access the HomeMedix Employee Management System.
      </p>

      <form
        class="login-form"
        @submit.prevent="handleLogin"
      >
        <div class="form-field">
          <label for="admin-passcode">Admin Passcode</label>
          <input
            id="admin-passcode"
            v-model="passcode"
            type="password"
            class="form-input"
            placeholder="Enter admin passcode"
            required
          >
        </div>

        <p
          v-if="errorMessage"
          class="error-text"
        >
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="btn btn-primary w-full"
        >
          Unlock Employee Database
        </button>

        <RouterLink
          to="/"
          class="back-link"
        >
          &larr; Return to HomeMedix Public Site
        </RouterLink>
      </form>
    </div>
  </section>
</template>

<style scoped>
.login-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f9fc;
  padding: 24px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border: 1px solid #e4eaf3;
  border-radius: 10px;
  padding: 36px 32px;
  text-align: center;
  box-shadow: 0 12px 30px rgba(23, 55, 121, 0.08);
}

.login-logo {
  width: 140px;
  height: auto;
  margin: 0 auto 18px;
  display: block;
}

.login-eyebrow {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #173779;
  margin-bottom: 6px;
}

.login-title {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 700;
  color: #1a3575;
}

.login-subtitle {
  margin: 0 0 24px;
  font-size: 14px;
  color: #54688a;
  line-height: 1.5;
}

.login-form {
  text-align: left;
}

.form-field {
  margin-bottom: 16px;
}

.form-field label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: #34466b;
  margin-bottom: 6px;
}

.form-input {
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #d5dfec;
  border-radius: 6px;
  font-size: 14px;
  color: #1c2e4a;
}

.form-input:focus {
  outline: none;
  border-color: #173779;
}

.error-text {
  color: #b42318;
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 14px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: background 0.2s ease;
}

.btn-primary {
  background: #173779;
  color: #ffffff;
}

.btn-primary:hover {
  background: #102d64;
}

.w-full {
  width: 100%;
}

.back-link {
  display: block;
  margin-top: 18px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #54688a;
  text-decoration: none;
}

.back-link:hover {
  color: #173779;
}
</style>