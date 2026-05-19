import { Injectable, inject } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private messaging = inject(Messaging);
  private firestore = inject(Firestore);

  async requestPermission() {
    try {
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        console.log('Permiso de notificaciones denegado');
        return;
      }

      const token = await getToken(this.messaging, {
        vapidKey: 'BMaRaud3GtzqC8mxuoaNBaC1I-eDfpHh9zBxOauceyRmGMdDQujTXm7mNWS_Amu_M0oRkxek2gaT9M9B2q2OMqI'
      });

      if (token) {
        console.log('Token web:', token);

        await addDoc(collection(this.firestore, 'tokens'), {
          token: token,
          type: 'web',
          createdAt: new Date()
        });
      }
    } catch (error) {
      console.error('Error al obtener el token:', error);
    }
  }

  listenMessages() {
    onMessage(this.messaging, (payload) => {
      console.log('Mensaje recibido en foreground:', payload);
      console.log(payload.notification);
    });
  }
}