import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import 'firebase/storage';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAuFcJ8SLI7Mhk0y9kl9ebgVxweV6UvRrs",
    authDomain: "olxclone-7568a.firebaseapp.com",
    projectId: "olxclone-7568a",
    storageBucket: "olxclone-7568a.appspot.com",
    messagingSenderId: "1017735720617",
    appId: "1:1017735720617:web:543a74c023121defc403b8",
    measurementId: "G-1C8G5JWQ5B"
  }

  export const Firebase = initializeApp(firebaseConfig)
  export const auth = getAuth(Firebase);
  export const db = getFirestore(Firebase);
  export const storage = getStorage(Firebase)

