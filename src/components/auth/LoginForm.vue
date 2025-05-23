<template>
  <div class="auth-container">
    <div class="login-logo-title">
      <span class="logo-circle">
        <img src="/dog.svg" alt="로고" class="login-logo" />
      </span>
      <span class="login-title">펫펠리스</span>
    </div>
    <form @submit.prevent="handleSubmit" class="auth-form">
      <div class="form-group">
        <label for="username">아이디</label>
        <input 
          type="text" 
          id="username" 
          v-model="formData.email" 
          required
          placeholder="아이디"
          @input="emailError = ''"
        >
        <span v-if="emailError" class="error-message">{{ emailError }}</span>
      </div>

      <div class="form-group">
        <label for="password">비밀번호</label>
        <input 
          type="password" 
          id="password" 
          v-model="formData.password" 
          required
          @input="passwordError = ''"
        >
        <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
      </div>

      <div class="form-group">
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            v-model="formData.remember"
          >
          <span>로그인 상태 유지</span>
        </label>
      </div>

      <button type="submit" class="submit-button">로그인</button>
    </form>
    <div class="auth-links">
      <a href="#" class="forgot-id">아이디 찾기</a>
      <a href="#" class="forgot-password">비밀번호 찾기</a>
      <p class="auth-link">
        계정이 없으신가요? <router-link to="/signup">회원가입</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/store/user'

export default {
  name: 'LoginForm',
  data() {
    return {
      formData: {
        email: '',
        password: '',
        remember: false
      },
      emailError: '',
      passwordError: ''
    }
  },
  methods: {
    async handleSubmit() {
      // 아이디 유효성 검사: 영문+숫자 조합만 허용, 공백/특수문자/숫자만 불가
      const email = this.formData.email.trim();
      if (!email || !/^[a-zA-Z0-9]+$/.test(email) || /^[0-9]+$/.test(email)) {
        this.emailError = '아이디는 영문+숫자 조합으로 입력해야 합니다';
        return;
      }
      // 비밀번호 유효성 검사: 8자리 이상, 공백 불가
      const password = this.formData.password;
      if (!password || /^\s+$/.test(password) || password.length < 8) {
        this.passwordError = '비밀번호는 8자리 이상 입력하세요';
        return;
      }
      try {
        const userStore = useUserStore()
        await userStore.login(this.formData)
        this.$router.push('/')
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style scoped>
.login-logo-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 2rem;
}
.logo-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #21c200;
  border-radius: 50%;
  width: 48px;
  height: 48px;
}
.login-logo {
  width: 32px;
  height: 32px;
}
.login-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary-color);
}
.error-message {
  color: #ff4444;
  font-size: 0.95rem;
  margin-top: 0.2rem;
}
</style> 