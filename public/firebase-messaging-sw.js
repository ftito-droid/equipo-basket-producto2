importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD7L5kB4dNtcQ9lWZtEPtk9SQM_UIMOKIA",
  authDomain: "equipo-basket-producto2-1ba96.firebaseapp.com",
  projectId: "equipo-basket-producto2-1ba96",
  storageBucket: "equipo-basket-producto2-1ba96.firebasestorage.app",
  messagingSenderId: "395814843943",
  appId: "1:395814843943:web:04652a11059fe5d0dd8002"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );

  const notificationTitle = payload.notification?.title || 'Equipo Basket';
  const notificationOptions = {
    body: payload.notification?.body || 'Nueva notificación',
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});