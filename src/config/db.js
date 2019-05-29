import Firebase from 'firebase';
let config = {
  apiKey: "AIzaSyAx_k_5yZvOcmORZbvAYT8Ce94KCYC4P6E",
  authDomain: "myfood-73b65.firebaseapp.com",
  databaseURL: "https://myfood-73b65.firebaseio.com",
  projectId: "myfood-73b65",
  storageBucket: "myfood-73b65.appspot.com",
  messagingSenderId: "721790040542",
  appId: "1:721790040542:web:4d2b72a621ce8a36"
};
let app = Firebase.initializeApp(config);
export const db = app.database();
export const storage = app.storage();