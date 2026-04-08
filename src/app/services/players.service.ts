import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  // ✅ El inject() aquí arriba asegura el contexto de Angular
  private firestore: Firestore = inject(Firestore);

  getPlayers(): Observable<any[]> {
    // Referencia simple a la colección
    const colRef = collection(this.firestore, 'players') as CollectionReference<DocumentData>;
    
    // ✅ rxfire es más flexible con los tipos que @angular/fire
    return collectionData(colRef as any, { idField: 'id' }) as Observable<any[]>;
  }

  deletePlayer(id: string) {
    const playerDoc = doc(this.firestore, 'players', id);
    return deleteDoc(playerDoc);
  }

  
}
