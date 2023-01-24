<template>
  <div class="profile">
    <img v-if="!store.state.user.photoURL" class="profilePicture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVhCD6NnlRJmc7YxhCpA2FeKYpYHMYfaMT7w5mSk_fxIMmXo0wkxj4fDGhoGiOySLLq1o&usqp=CAU" alt="">
    <img v-if="store.state.user.photoURL" :src="store.state.user.photoURL" alt="ProfilePicture" class="profilePicture">
    <p class="attribute">{{ store.state.user.displayName ? store.state.user.displayName : store.state.user.email }}</p>
    <h3 class="attribute">Email: {{ store.state.user.email }}</h3>
    <p class="attribute">Phone number: {{ store.state.user.phoneNumber }}</p>
    <p class="attribute">Registered at: {{ new Date(store.state.user.reloadUserInfo.validSince * 1000).toISOString().substring(0, 10)}}</p>
  </div>
</template>

<script lang="ts">
import store from "@/store"
import { computed, defineComponent } from "@vue/runtime-core"

export default defineComponent({
  setup() {
    const handleClick = () => {
      store.dispatch('logout')
    }
    return {
      handleClick,
       user : computed(() => store.state.user),
       authIsReady: computed(() => store.state.authIsReady),
       store
    }
  }
})
</script>

<style>
    .profile {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .profilePicture {
        border-radius: 50%;
        width: 8vw;
    }
    .attribute {
        margin-top: 15px;
    }
</style>