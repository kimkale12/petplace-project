<script>
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'

import { useUserStore } from '@/store/user'

export default {
  name: 'App',
  components: {
    Header,
    Footer

  },
  computed: {
    isLoggedIn() {
      const userStore = useUserStore()
      return userStore.isLoggedIn
    }
  },
  methods: {
    async handleLogout() {
      const userStore = useUserStore()
      await userStore.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <div id="app">
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<style>
:root {
  --primary-color: #2ecc71;
  --secondary-color: #27ae60;
  --text-color: #333;
  --background-color: #f5f5f5;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.router-view {
  flex: 1;
  padding: 2rem;
}
</style>
