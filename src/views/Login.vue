<template>
  <h1>Login</h1>
  <form @submit.prevent="handleSubmit" class="signup-form">
    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required class="form-input">

    <label for="email">Password:</label>
    <input type="password" name="password" v-model="password" required class="form-input">

    <button class="login-button">Login</button>
    <div v-if="error">{{error}}</div>
  </form>
</template>
  
<script lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  
  export default {
    setup() {
      const email = ref('')
      const password = ref('')
      const error = ref(null)
      const store = useStore()
      const router = useRouter()
      
      const handleSubmit = async () => {
        try {
          await store.dispatch('login', {
            email: email.value, 
            password: password.value
          })
          router.push('/')
        } catch(err:any) {
            error.value = err.message
            console.log(error.value);
        }
      }
  
      return { handleSubmit, email, password, error, store }
    }
  }
</script>
<style>
  .signup-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
  .form-input {
      width: 50%;
      height: 4.5vh;
      margin-bottom: 15px;
      border-radius: 10px;
      color-scheme: dark;
      margin-top: 10px;
  }
  .login-button {
      width: 40%;
      height: 4.5vh;
      margin-top: 15px;
  }
  h1 {
      margin-bottom: 15px;
  }
  @media only screen and (min-width: 1024px) {
    input {
      width: 30vw;
    }
    .login-button {
      width: 25vw;
    }
  }
  </style>