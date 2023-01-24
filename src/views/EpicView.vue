<template>
  <h1>EPIC Earth Picture</h1>
  <div class="container">
    <form @submit.prevent="getData">
       <label for="date">Select date: </label>
       <select v-model="date" class="datepicker">
        <option v-for="date in dates" :value="date" :key="date">{{ date }}</option>
      </select>
       <button type="submit">Submit</button>
     </form>
     <div v-if="loading">
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
      let dates: Array<string> = []
      
      const loadData = async () => {
        const response = await axios.get(`https://epic.gsfc.nasa.gov/api/enhanced/available?api_key=L3AB47KMzFm7OszU4M9DEucigDva0W58u30pnxTx`)
        loading.value = true
        for (let i = 0; i < response.data.length; i++) {
          dates.push(response.data[i]) 
        }
      }

      loadData()

      const getData = async () => {
        //gettting a response based on the chosen date
        try {
          const urlResponse = await axios.get(`https://api.nasa.gov/EPIC/api/enhanced/date/${date.value}?api_key=L3AB47KMzFm7OszU4M9DEucigDva0W58u30pnxTx`)
          let imageDate = date.value;
          let image = urlResponse.data[0].image
          let caption = urlResponse.data[0].caption
          console.log(urlResponse);
          
          //creating the url for the image
          imageUrl.value = `https://epic.gsfc.nasa.gov/archive/enhanced/${imageDate.substring(0, 4)}/${imageDate.substring(5, 7)}/${imageDate.substring(8, 10)}/png/${image}.png`;  
        
        } catch (error) {
          console.error(error)
        }
      }
      getData()
    
      return {
        date,
        getData,
        imageUrl,
        imageLoaded,
        loading,
        dates
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
.datepicker {
  border-radius: 5px;
  width: 10vw;
  height: 3.5vh;
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
</style>