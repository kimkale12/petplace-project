<template>
  <div class="signup-container">
    <h2>회원가입</h2>
    <form @submit.prevent="handleSignup" class="signup-form">
      <div class="form-group">
        <label for="username">아이디</label>
        <div style="display: flex; gap: 8px;">
          <input
            type="text"
            id="username"
            v-model="formData.username"
            required
            placeholder="아이디"
            @input="usernameChecked = false; usernameError = ''"
          >
          <button type="button" class="check-btn" @click="checkUsername">중복체크</button>
        </div>
        <span v-if="usernameError" class="error-message">{{ usernameError }}</span>
        <span v-if="usernameChecked && !usernameError" class="success-message">사용 가능한 아이디입니다.</span>
      </div>

      <div class="form-group">
        <label for="email">이메일</label>
        <div style="display: flex; gap: 8px;">
          <input 
            type="email" 
            id="email" 
            v-model="formData.email" 
            required
            placeholder="이메일"
            @input="emailChecked = false; validateEmail(); emailError = ''"
          >
          <button type="button" class="check-btn" @click="checkEmail">중복체크</button>
        </div>
        <span v-if="emailError" class="error-message">{{ emailError }}</span>
        <span v-if="emailChecked && !emailError" class="success-message">사용 가능한 이메일입니다.</span>
      </div>

      <div class="form-group">
        <label for="password">비밀번호</label>
        <input 
          type="password" 
          id="password" 
          v-model="formData.password" 
          required
          placeholder="비밀번호"
          @input="passwordError = ''"
        >
        <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
      </div>

      <div class="form-group">
        <label for="passwordConfirm">비밀번호 확인</label>
        <input 
          type="password" 
          id="passwordConfirm" 
          v-model="formData.passwordConfirm" 
          required
          placeholder="비밀번호 확인"
        >
      </div>

      <div class="form-group">
        <label for="name">이름</label>
        <input 
          type="text" 
          id="name" 
          v-model="formData.name" 
          required
          placeholder="이름"
        >
      </div>

      <div class="form-group">
        <label for="phone">전화번호</label>
        <input 
          type="tel" 
          id="phone" 
          v-model="formData.phone" 
          required
          placeholder="전화번호"
        >
      </div>

      <div class="form-group">
        <label for="address">주소</label>
        <div style="display: flex; gap: 8px;">
          <input 
            type="text" 
            id="address" 
            v-model="formData.address" 
            required
            placeholder="주소"
            readonly
            style="flex:1"
          >
          <button type="button" class="check-btn" @click="openPostcode">검색</button>
        </div>
      </div>

      <button type="submit" class="signup-button">회원가입</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignupForm',
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        name: '',
        phone: '',
        address: ''
      },
      usernameChecked: false,
      usernameError: '',
      emailChecked: false,
      emailError: '',
      passwordError: ''
    }
  },
  mounted() {
    if (!window.daum) {
      const script = document.createElement('script');
      script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.onload = () => {};
      document.body.appendChild(script);
    }
  },
  methods: {
    checkUsername() {
      // 예시: 이미 사용 중인 아이디 배열
      const usedUsernames = ['testuser', 'admin', 'petplace'];
      if (!this.formData.username) {
        this.usernameError = '아이디를 입력하세요.';
        this.usernameChecked = false;
      } else if (usedUsernames.includes(this.formData.username)) {
        this.usernameError = '이미 사용 중인 아이디입니다.';
        this.usernameChecked = false;
      } else {
        this.usernameError = '';
        this.usernameChecked = true;
      }
    },
    checkEmail() {
      // 예시: 이미 사용 중인 이메일 배열
      const usedEmails = ['test@naver.com', 'admin@petplace.com', 'user@gmail.com'];
      if (!this.formData.email) {
        this.emailError = '이메일을 입력하세요.';
        this.emailChecked = false;
      } else if (this.emailError) {
        this.emailChecked = false;
      } else if (usedEmails.includes(this.formData.email)) {
        this.emailError = '이미 사용 중인 이메일입니다.';
        this.emailChecked = false;
      } else {
        this.emailError = '';
        this.emailChecked = true;
      }
    },
    validateEmail() {
      // 간단한 이메일 형식 체크
      const email = this.formData.email;
      if (!email) {
        this.emailError = '';
        return;
      }
      const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailRegex.test(email)) {
        this.emailError = '올바른 이메일 형식이 아닙니다.';
      } else {
        this.emailError = '';
      }
    },
    handleSignup() {
      // 비밀번호 확인
      if (this.formData.password !== this.formData.passwordConfirm) {
        this.passwordError = '비밀번호가 일치하지 않습니다.';
        return;
      }
      this.passwordError = '';

      // 아이디 중복 체크
      if (!this.usernameChecked || this.usernameError) {
        this.usernameError = '아이디 중복 체크를 해주세요.';
        return;
      }

      // 이메일 형식 체크
      if (this.emailError) {
        this.emailError = '이메일 형식을 확인해주세요.';
        return;
      }

      // 회원가입 데이터 저장
      localStorage.setItem('userId', this.formData.username);
      localStorage.setItem('userEmail', this.formData.email);
      localStorage.setItem('userName', this.formData.name);
      localStorage.setItem('userPhone', this.formData.phone);
      localStorage.setItem('userAddress', this.formData.address);
      localStorage.setItem('isLoggedIn', 'true');

      alert('회원가입이 완료되었습니다.');
      this.$router.push('/'); // 홈페이지로 이동
    },
    openPostcode() {
      if (!window.daum || !window.daum.Postcode) {
        alert('주소 검색 기능을 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.');
        return;
      }
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.formData.address = data.roadAddress || data.jibunAddress;
        }
      }).open();
    }
  }
}
</script>

<style scoped>
.signup-container {
  max-width: 500px;
  margin: 0 auto;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

label {
  font-weight: bold;
  color: #333;
}

input {
  padding: 0.4rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.check-btn {
  background: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.check-btn:hover {
  background: #388e3c;
}

.error-message {
  color: #ff4444;
  font-size: 0.9rem;
}
.success-message {
  color: #2e8b57;
  font-size: 0.9rem;
}

.signup-button {
  background-color: #4CAF50;
  color: white;
  padding: 0.4rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  max-width: 220px;
  margin: 2.5rem auto 0 auto;
  display: block;
}

.signup-button:hover {
  background-color: #45a049;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 800;
}
</style> 