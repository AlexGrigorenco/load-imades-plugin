

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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

  const storage = getStorage();
  const storageRef = ref(storage);

upload('#file', {

    multi: true,
    accept:['.png', '.jpg', '.jpeg', '.gif', '.svg'],

    onUpload(files, blocks){
      files.forEach((file, index) => {

        const spaceRef = ref(storage, `images/${file.name}`);

        const uploadTask = uploadBytesResumable(spaceRef, file)

        uploadTask.on('state_changed', snapshot => {
          const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'   
          const block = blocks[index].querySelector('.preview-info-progress')
          block.textContent = progress
          block.style.width = progress
        }, 
        error => {
          console.log('upload error')
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          })
        })

      })
    }
})


