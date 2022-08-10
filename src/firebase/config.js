// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtz-gjRIv9x94iwzOVTu14gLmGN_gHX84",
  authDomain: "estagio-2139b.firebaseapp.com",
  projectId: "estagio-2139b",
  storageBucket: "estagio-2139b.appspot.com",
  messagingSenderId: "707328078192",
  appId: "1:707328078192:web:30f5065678a269af6fdfb5",
  measurementId: "G-41SKXE44G7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//INICIALIZANDO O BANCO DE DADOS
const db = getFirestore(app);

export {db};