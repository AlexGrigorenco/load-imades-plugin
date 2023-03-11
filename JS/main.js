

import { initializeApp } from "firebase/app";
import 'firebase/storage'
import {upload} from './upload'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCIh1U47yglvOxQGqyGjgU0U-Kn7zuxrqo",  
    authDomain: "upload-image-94ecb.firebaseapp.com",  
    projectId: "upload-image-94ecb",  
    storageBucket: "upload-image-94ecb.appspot.com",  
    messagingSenderId: "87505592202",  
    appId: "1:87505592202:web:6c383b22d4ef2523077273"  
  };  
  // Initialize Firebase  
  const app = initializeApp(firebaseConfig);

  const storage = app.storage
  console.log(storage)


upload('#file', {

    multi: true,
    accept:['.png', '.jpg', '.jpeg', '.gif', '.svg'],

    onUpload(files){
        console.log(files)
    }
})


