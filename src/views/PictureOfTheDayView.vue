<template>
  <div class="container">
    <form @submit.prevent="getData">
       <label for="date">Select date: </label>
       <input type="date" id="date" v-model="date" class="datepicker">
       <button type="submit" @click="getData" :disabled="!date">Submit</button>
     </form>
     <div v-if="data">
       <img :src=data.url alt="Enhanced picture" @load="imageLoaded = true" />
     </div>
     <div v-if="loading">
       <div v-if="!imageLoaded">Loading...</div>
     </div>
  </div>
</template>

<script lang="ts">
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
        async function getData() {
            data.value = await fetchUrl(`https://api.nasa.gov/planetary/apod?api_key=L3AB47KMzFm7OszU4M9DEucigDva0W58u30pnxTx&date=${date.value}`);
            imageLoaded.value = true
            loading.value = true
        }

      return {data, getData, imageLoaded, date, loading};
  },
});
</script>

<style scoped>
    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 60%;
    }
</style>