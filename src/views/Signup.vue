<template>
  <h1>Sign up</h1>
  <form @submit.prevent="handleSubmit">

    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required class="form-input">

    <label for="email">Password:</label>
    <input type="password" name="password" v-model="password" required class="form-input">

    <button class="login-button">Sign up</button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>
  
<script lang="ts">
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import store from '@/store'
  
  export default {
    setup() {
      const email = ref('')
      const password = ref('')
      const store = useStore()
      const router= useRouter()
      const error = ref(null)
  
      const handleSubmit = async () => {
        try {
          await store.dispatch('signup', {
          email: email.value, 
          password: password.value
        })
        router.push('/')
        } catch(err:any) {
          error.value = err.message
        }
      }
  
      return { handleSubmit, email, password, error }
    }
  }
</script>