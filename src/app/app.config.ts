import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// 🔥 Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// ✅ Importamos la configuración que ya tienes en firebase.config.ts
import { firebaseConfig } from './firebase.config'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // 🔥 Firebase
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};
