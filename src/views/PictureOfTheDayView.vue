<template>
  <h1>Picture of the day</h1>
  <div class="container">
    <form @submit.prevent="getData">
      <label for="date">Select date: </label>
      <input type="date" id="date" v-model="date" class="datepicker">
      <button type="submit" @click="getData" :disabled="!date">Submit</button>
    </form>
    <div v-if="data" class="data">
      <img :src=data.url alt="Enhanced picture" @load="imageLoaded = true" />
      <button @click="writeUserData(data.url)">Save as favourite</button>
    </div>
    <div v-if="loading">
      <div v-if="!imageLoaded">Loading...</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { writeUserData } from '@/firebase/firebase';
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    setup() {
      function fetchUrl(url: string) {
        return fetch(url).then(res => res.json());
      }
      const data = ref();
      const date = ref();
      const loading = ref(false)
      const imageLoaded = ref(false);

      //Getting data from the POAD API
      async function getData() {
          data.value = await fetchUrl(`https://api.nasa.gov/planetary/apod?api_key=L3AB47KMzFm7OszU4M9DEucigDva0W58u30pnxTx&date=${date.value}`);
          imageLoaded.value = true
          loading.value = true
      }

      return {data, getData, imageLoaded, date, loading, writeUserData};
    },
  });
</script>

<style scoped>
  .datepicker {
    border-radius: 5px;
    width: 10vw;
    height: 3.5vh;
  }
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
  }
  @media only screen and (max-width: 768px) {
    img {
      width: 100%;
      height: 100%;
    }
    .datepicker {
      width: 20vw;
    }
  }
  .data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .data > button {
    margin-top: 3rem;
    width: 40%;
  }
</style>