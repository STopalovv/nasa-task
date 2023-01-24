import router from '@/router';
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// import {getDatabase, ref, set} from 'firebase/database'
import { collection, addDoc } from "firebase/firestore"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAo9Qf_gPocQQ-a91XMSNrn5e49JkU9dJM",
    authDomain: "nasa-f036d.firebaseapp.com",
    databaseURL: "https://nasa-f036d-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "nasa-f036d",
    storageBucket: "nasa-f036d.appspot.com",
    messagingSenderId: "795771566996",
    appId: "1:795771566996:web:333159a23591931657ed81"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const database  = getFirestore(app)

async function writeUserData (imageURL:string) {
    const colRef = collection(database, 'favorites')
    const data = {data: imageURL}

    const docRef = await addDoc(colRef, data)
    alert('Pictute saved with ID ' + docRef.id)
    
  }

  router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (!auth.currentUser) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      next()
    }
  })

export { auth, database, writeUserData }