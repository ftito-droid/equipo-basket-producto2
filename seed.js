import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Tu configuración REAL de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD7L5kB4dNtcQ9lWZtEPtk9SQM_UIMOKIA",
  authDomain: "equipo-basket-producto2-1ba96.firebaseapp.com",
  projectId: "equipo-basket-producto2-1ba96",
  storageBucket: "equipo-basket-producto2-1ba96.firebasestorage.app",
  messagingSenderId: "395814843943",
  appId: "1:395814843943:web:04652a11059fe5d0dd8002"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Lista de jugadores
const players = [
  {
    nombre: "Michael",
    apellidos: "Jordan",
    edad: 21,
    altura: 198,
    posicion: "Escolta",
    equipo: "North Carolina",
    foto: "assets/images/jordan.png",
    video: "assets/videos/jordan.mp4",
    color1: "#CE1141",
    color2: "#000000"
  },
  {
    nombre: "Magic",
    apellidos: "Johnson",
    edad: 20,
    altura: 206,
    posicion: "Base",
    equipo: "Michigan State",
    foto: "assets/images/magic.png",
    video: "assets/videos/magic.mp4",
    color1: "#552583",
    color2: "#FDB927"
  },
  {
    nombre: "Kobe",
    apellidos: "Bryant",
    edad: 18,
    altura: 198,
    posicion: "Escolta",
    equipo: "Lower Merion High School",
    foto: "assets/images/kobe.png",
    video: "assets/videos/kobe.mp4",
    color1: "#552583",
    color2: "#FDB927"
  },
  {
    nombre: "Kareem",
    apellidos: "Abdul-Jabbar",
    edad: 22,
    altura: 218,
    posicion: "Pívot",
    equipo: "UCLA",
    foto: "assets/images/kareem.png",
    video: "assets/videos/kareem.mp4",
    color1: "#552583",
    color2: "#FDB927"
  },
  {
    nombre: "LeBron",
    apellidos: "James",
    edad: 18,
    altura: 206,
    posicion: "Alero",
    equipo: "St. Vincent–St. Mary High School",
    foto: "assets/images/lebron.png",
    video: "assets/videos/lebron.mp4",
    color1: "#6F263D",
    color2: "#FFB81C"
  },
  {
    nombre: "Larry",
    apellidos: "Bird",
    edad: 23,
    altura: 206,
    posicion: "Alero",
    equipo: "Indiana State",
    foto: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Larrybird.jpg",
    video: "https://www.youtube.com/watch?v=JH6qYhJv1nA",
    color1: "#007A33",
    color2: "#BA9653"
  },
  {
    nombre: "Stephen",
    apellidos: "Curry",
    edad: 21,
    altura: 191,
    posicion: "Base",
    equipo: "Davidson",
    foto: "https://upload.wikimedia.org/wikipedia/commons/8/89/Stephen_Curry.jpg",
    video: "https://www.youtube.com/watch?v=Jf6p0i5lHnA",
    color1: "#1D428A",
    color2: "#FFC72C"
  },
  {
    nombre: "Shaquille",
    apellidos: "O'Neal",
    edad: 20,
    altura: 216,
    posicion: "Pívot",
    equipo: "LSU",
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Shaquille_O%27Neal.jpg",
    video: "https://www.youtube.com/watch?v=Q2xO2jGZb9E",
    color1: "#552583",
    color2: "#FDB927"
  },
  {
    nombre: "Tim",
    apellidos: "Duncan",
    edad: 21,
    altura: 211,
    posicion: "Ala-Pívot",
    equipo: "Wake Forest",
    foto: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Tim_Duncan.jpg",
    video: "https://www.youtube.com/watch?v=1iG5cDIeE7c",
    color1: "#000000",
    color2: "#C4CED4"
  },
  {
    nombre: "Kevin",
    apellidos: "Durant",
    edad: 19,
    altura: 208,
    posicion: "Alero",
    equipo: "Texas",
    foto: "https://upload.wikimedia.org/wikipedia/commons/2/25/Kevin_Durant.jpg",
    video: "https://www.youtube.com/watch?v=5yZ0pQfM9vA",
    color1: "#1D428A",
    color2: "#FFC72C"
  }
];

// Función para insertar los jugadores
async function seed() {
  const ref = collection(db, "players");

  for (const p of players) {
    await addDoc(ref, p);
    console.log("Jugador añadido:", p.nombre);
  }

  console.log("Importación completada.");
}

seed();
