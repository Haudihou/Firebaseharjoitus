import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot, orderBy, limit } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBQyS_Fq3yXSF6WVFNVnedaAnwyxbuE9Bk",
    authDomain: "fir-9c32c.firebaseapp.com",
    projectId: "fir-9c32c",
    storageBucket: "fir-9c32c.appspot.com",
    messagingSenderId: "187815503995",
    appId: "1:187815503995:web:95defe071fcacecd02dade"
  };

  initializeApp(firebaseConfig);

  const firestore = getFirestore();
  const MESSAGES = 'messages';
  
  export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    MESSAGES,
    query,
    onSnapshot,
    orderBy, 
    limit,  
  };
  