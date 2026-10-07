// =====================================================
// FIREBASE AND FIRESTORE CONFIGURATION
// =====================================================

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// =====================================================
// FIREBASE PROJECT CONFIGURATION
// =====================================================

const firebaseConfig = {
  apiKey: "AIzaSyCYVlDkN71Udgf7y72ndvmDuwQIUbSghDE",
  authDomain: "fir-project-31e6d.firebaseapp.com",
  projectId: "fir-project-31e6d",
  storageBucket: "fir-project-31e6d.firebasestorage.app",
  messagingSenderId: "716964118561",
  appId: "1:716964118561:web:64541c4c243a5d9ae7a360"
};


// =====================================================
// INITIALIZE FIREBASE
// =====================================================

const app = initializeApp(firebaseConfig);


// =====================================================
// INITIALIZE CLOUD FIRESTORE
// =====================================================

const db = getFirestore(app);


// =====================================================
// EXPORT FIRESTORE DATABASE
// =====================================================

export { db };