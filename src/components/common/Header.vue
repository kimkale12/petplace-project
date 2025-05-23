<script setup>
  import dogLogo from '@/assets/images/dog.svg'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  function scrollToRooms() {
    // 홈이 아닐 경우 홈으로 이동 후 스크롤
    if (router.currentRoute.value.path !== '/') {
      router.push('/').then(() => {
        setTimeout(() => {
          const el = document.querySelector('.room-title')
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 300)
      })
    } else {
      const el = document.querySelector('.room-title')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
  }

  function logout() {
    if (confirm('로그아웃 하시겠습니까?')) {
      localStorage.clear();
      router.push('/')
    }
  }
</script>


<template>
  <header class="header">
    <nav class="nav-container">
      <div class="logo">
        <div class="logo-icon">
          <img :src="dogLogo" alt="펫팰리스 로고" />
        </div>
        <h1>펫팰리스</h1>
      </div>
      <ul class="nav-menu">
        <li><router-link to="/">홈</router-link></li>
        <li><router-link to="/service">서비스</router-link></li>
        <li><a href="#" @click.prevent="scrollToRooms">객실</a></li>
        <li><router-link to="/location">오시는길</router-link></li>
        <li><router-link to="/reservation">예약하기</router-link></li>
        <li><router-link to="/#contact">문의하기</router-link></li>
        <li class="my-page-link"><router-link to="/myinfo">마이페이지</router-link></li>
        <li class="auth-link"><router-link to="/profile">회원정보</router-link></li>
        <li class="auth-link"><a href="#" @click.prevent="logout">로그아웃</a></li>
        <li class="logout-btn"><router-link to="/login">로그인</router-link></li>
        <li class="logout-btn"><router-link to="/signup">회원가입</router-link></li>
      </ul>
      <div class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* styles.css의 헤더 관련 스타일을 여기로 이동 */
</style> 