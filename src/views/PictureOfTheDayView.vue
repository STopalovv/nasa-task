<template>
  <img :src="data.url" alt="Picture of the day" @load="imageLoaded = true" />
  <div v-if="!imageLoaded">Loading...</div>
</template>

<script lang="ts">
   import { defineComponent, ref } from 'vue';

    export default defineComponent({
  setup() {
    function fetchUrl(url: string) {
      return fetch(url).then(res => res.json());
    }

    const data = ref();
    const imageLoaded = ref(false);
    async function getData() {
        data.value = await fetchUrl('https://api.nasa.gov/planetary/apod?api_key=L3AB47KMzFm7OszU4M9DEucigDva0W58u30pnxTx');
        console.log(data.value);
    }
    getData();
    return {data, getData, imageLoaded};
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