import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {collection, doc, getFirestore, serverTimestamp, updateDoc, setDoc} from 'firebase/firestore'

console.log("firebase ok")

const firebaseConfig = {
  apiKey: "AIzaSyAVbB1KwwFCw6ECUUyXqtLCqV1sFbZJuMc",
  authDomain: "fire-chat-2c6af.firebaseapp.com",
  projectId: "fire-chat-2c6af",
  storageBucket: "fire-chat-2c6af.appspot.com",
  messagingSenderId: "448905124766",
  appId: "1:448905124766:web:26d8921f63be27afdbd48f"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const marcaTiempo = serverTimestamp;


//Metodo para actualizar un objeto en una colección
const actualizar = async (coleccion,id,data) => {
await updateDoc(doc(collection(db, coleccion), id), data);
}
//Metodo para crear un objeto en una colección
const crear = async (coleccion,id,data) => {
  await setDoc(doc(collection(db, coleccion), id), data);
}


export { auth, marcaTiempo, actualizar, crear };

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
})
