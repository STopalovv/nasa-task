<template>
  <h1>Satelite view - Sofia</h1>
    <img 
      :src="data.url" 
      alt="Picture of the day" 
      @load="imageLoaded = true" 
      @mouseover="zoomIn" 
      @mouseout="zoomOut" 
      @click="toggleZoom"
      ref="imageRef"
      class="image"
    />
    <div v-if="!imageLoaded">Loading...</div>
</template>
  
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    setup() {
      const imageRef = ref<HTMLImageElement | null>(null)
      function zoomIn(){
      imageRef.value!.style.cursor = "zoom-in"
      imageRef.value!.style.transform = "scale(1.5)"
    }
    function zoomOut(){
      imageRef.value!.style.cursor = "default"
      imageRef.value!.style.transform = "scale(1)"
    }
    function toggleZoom(){
      if(imageRef.value!.style.transform === "scale(1.5)") {
        zoomOut()
      } else {
        zoomIn()
      }
    }
      function fetchUrl(url: string) {
        return fetch(url).then(res => res.json());
      }
      const data = ref();
      const imageLoaded = ref(false);
      
      //Getting data from the Earth API 
      async function getData() {
          data.value = await fetchUrl('https://api.nasa.gov/planetary/earth/assets?lon=23.32&lat=42.70&date=2022-01-17&&dim=0.10&api_key=L3AB47KMzFm7OszU4M9DEucigDva0W58u30pnxTx');
      }
      getData();
      return {data, getData, imageLoaded, imageRef, zoomIn, zoomOut, toggleZoom};
    },
    mounted() {
      this.imageRef = this.$refs.imageRef as HTMLImageElement
    }
  });
</script>
  
<style scoped>
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
  }
.image {
  transition: transform .2s;
}
</style>