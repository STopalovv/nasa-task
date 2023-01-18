<template>
    <img :src=imageUrl alt="Enhanced picture" @load="imageLoaded = true" />
    <div v-if="!imageLoaded">Loading...</div>
  </template>
  
  <script lang="ts">
     import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const imageUrl = ref("");
    const imageLoaded = ref(false);

    async function fetchImage() {
      const response = await fetch("https://api.nasa.gov/EPIC/api/enhanced?api_key=L3AB47KMzFm7OszU4M9DEucigDva0W58u30pnxTx", {
        method: "GET"
      });
      const data = await response.json();
      const image = data[0];
      imageUrl.value = `https://epic.gsfc.nasa.gov/archive/enhanced/${image.date.substring(0, 4)}/${image.date.substring(5, 7)}/${image.date.substring(8, 10)}/png/${image.image}.png`;  
    }
    fetchImage();
    return {imageUrl, fetchImage, imageLoaded};
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