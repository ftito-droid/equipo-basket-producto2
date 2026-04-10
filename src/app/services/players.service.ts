import { Injectable, inject } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  // ✅ El inject() aquí arriba asegura el contexto de Angular
  private firestore = inject(Firestore);

   getPlayers(): Observable<any[]> {
    return new Observable(subscriber => {
      const colRef = collection(this.firestore, 'players');
      
      // Usamos onSnapshot de Firebase directamente. 
      // Esto SALTA la validación de _Query que está fallando.
      const unsubscribe = onSnapshot(colRef, (snapshot) => {
        const players = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        subscriber.next(players);
      }, (error) => {
        subscriber.error(error);
      });

      return () => unsubscribe();
    });
  }
  async deletePlayer(id: string) {
    const playerDoc = doc(this.firestore, `players/${id}`);
    return await deleteDoc(playerDoc);
  }

  
}
