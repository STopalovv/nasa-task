<template>
  <div class="container">
    <form @submit.prevent="getData">
       <label for="date">Select date: </label>
       <input type="date" id="date" v-model="date" class="datepicker">
       <button type="submit" :disabled="date == ''">Submit</button>
     </form>
     <div v-if="imageUrl">
       <img :src=imageUrl alt="Enhanced picture" @load="imageLoaded = true" />
     </div>
     <div v-if="loading">
       <div v-if="!imageLoaded">Loading...</div>
     </div>
  </div>
  </template>
  
  <script lang="ts">
     import axios from 'axios'
     import { ref } from 'vue'

export default {
  setup() {
    const date = ref('')
    const imageUrl = ref()
    const loading = ref(false)
    const imageLoaded = ref(false)

    const getData = async () => {
      //gettting a response based on the chosen date
      try {
        const response = await axios.get(`https://api.nasa.gov/EPIC/api/enhanced/date/${date.value}?api_key=L3AB47KMzFm7OszU4M9DEucigDva0W58u30pnxTx`)
        console.log(response);
        
        let imageDate = date.value
        let image = response.data[0].image
        console.log(image);
        
        //creating the url for the image
        imageUrl.value = `https://epic.gsfc.nasa.gov/archive/enhanced/${imageDate.substring(0, 4)}/${imageDate.substring(5, 7)}/${imageDate.substring(8, 10)}/png/${image}.png`;  
        loading.value = true
      } catch (error) {
        console.error(error)
      }
    }
    return {
      date,
      getData,
      imageUrl,
      imageLoaded,
      loading
    }
  }
}
</script>  
  <style scoped>
    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 60%;
    }
</style>