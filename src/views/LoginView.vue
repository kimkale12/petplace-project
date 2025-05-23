<template>
  <div class="login-view">
    
    <div class="login-form-wrapper">
      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue'

export default {
  name: 'LoginView',
  components: {
    LoginForm
  }
}
</script>

<style scoped>
.login-view {
  background: #f7f7f7;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 120px;
  padding-bottom: 60px;
}
</style> 