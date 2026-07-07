<template>
  <div class="login-container">
    <div class="login-card">
      <img src="/susi-air-logo.png" alt="Susi Air Logo" class="brand-logo" style="width: 150px; margin-bottom: 16px;" />
      <p class="subtitle">Pilot Operations Portal</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required placeholder="Enter username" />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required placeholder="Enter password" />
        </div>

        <button type="submit" class="btn-primary">Sign In</button>
      </form>

      <a href="#" class="help-link">Need help? Contact CRD</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'


definePageMeta({
  layout: false
})

const router = useRouter()
const username = ref('')
const password = ref('')

const handleLogin = () => {
  router.push('/home')
}
</script>

<style scoped lang="scss">
@import "~/assets/scss/main.scss";

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.login-card {
  background-color: $color-surface;
  padding: 32px 24px;
  border-radius: $border-radius-card;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.brand-title {
  color: $color-primary;
  margin-bottom: 4px;
  font-size: 24px;
  font-weight: 700;
}

.subtitle {
  color: $color-text-secondary;
  font-size: 14px;
  margin-bottom: 32px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  text-align: left;
  
  label {
    display: block;
    font-size: 13px;
    color: $color-text-primary;
    margin-bottom: 8px;
    font-weight: 600;
  }

  input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    font-family: inherit;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: $color-primary;
    }
  }
}

.btn-primary {
  background-color: $color-primary;
  color: white;
  border: none;
  padding: 14px;
  border-radius: $border-radius-button;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
}

.help-link {
  display: inline-block;
  margin-top: 24px;
  font-size: 13px;
  color: $color-brand;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>