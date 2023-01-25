<script lang="ts">
  import { computed, defineComponent, ref } from '@vue/runtime-core'
  import { RouterLink, RouterView } from 'vue-router'
  import { useStore } from 'vuex'
  import store from './store'
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { useRouter } from 'vue-router'
  export default defineComponent({
    setup() {
      const router = useRouter()
      const handleClick = () => {
        store.dispatch('logout')
        location.reload()
      }
      const googleLogin = () => {
        store.dispatch('googleLogin')
      } 
      return {
        handleClick,
        user : computed(() => store.state.user),
        authIsReady: computed(() => store.state.authIsReady),
        store,
        googleLogin
      }
    }
  })
</script>

<template>
  <div class="navContainer">
    <div class="navTwo">
      <nav class="nav">
        <RouterLink to="/" class="router">Home</RouterLink>
        <RouterLink to="/poad" class="router">Picture of the day</RouterLink>
        <RouterLink to="/earth" class="router">The Earth</RouterLink>
        <RouterLink to="/epic" class="router">EPIC Earth</RouterLink>
      </nav>
    </div>
    <!-- for logged in users -->
    <div v-if="user" class="signup">
      <RouterLink to="/profile" class="router">Hello, {{store.state.user.displayName ? store.state.user.displayName : store.state.user.email}}</RouterLink>
      <button @click="handleClick">Logout</button>
    </div>
    <!-- for logged out users -->
    <div class="signup" v-if="!user">
      <RouterLink to="/login" class="login">Login</RouterLink>
      <RouterLink to="/signup">Signup</RouterLink>
      <button @click="googleLogin">Login with Google</button>
    </div>
  </div>
  <RouterView />
</template>

<style scoped>
  .nav {
    margin-bottom: 5rem;
  }
  .navContainer {
    display: flex;
    justify-content: space-between;
  }
  .navTwo {
    width: 60%;
  }
  .signup {
    display: flex;
    justify-content: right;
    height: fit-content;
  }
  .login {
    margin-right: 25px;
  }
  button {
    margin-left: 20px;
  }
  .nav-menu {
    background-color: white;
  }
  .nav-content {
    display: flex;
    justify-content: space-between;
    padding: 10px 30px;
    align-items: center;
  }
  .nav-items {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    padding: 0 10px;
  }
  i {
    display: none;
  }
  @media screen and (max-width: 768px) {
    .nav-menu {
      padding-top: 10px;
      position: absolute;
      width: 100%;
    }
  .open-menu {
    opacity: 1;
    height: 150px;
  }
  .closed-menu {
    opacity: 0;
    height: 0;
    padding: 0;
  }
  .nav-content {
    flex-direction: column;
    z-index: 100;
    position: relative;
    transition: all 0.2s ease-out;
  }
  .nav-items {
    flex-direction: column;
  }
  i {
    display: block;
    text-align: right;
    padding: 0 10px 10px 0;
  }
} 
@media only screen and (max-width: 768px) {
  .navContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .router {
    margin-bottom: 15px;
  }
  .signup {
    margin-top: -3rem;
    margin-bottom: 3rem;
  }
}
</style>