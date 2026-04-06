import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyD7L5kB4dNtcQ9lWZtEPtk9SQM_UIMOKIA",
  authDomain: "equipo-basket-producto2-1ba96.firebaseapp.com",
  projectId: "equipo-basket-producto2-1ba96",
  storageBucket: "equipo-basket-producto2-1ba96.firebasestorage.app",
  messagingSenderId: "395814843943",
  appId: "1:395814843943:web:04652a11059fe5d0dd8002"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
