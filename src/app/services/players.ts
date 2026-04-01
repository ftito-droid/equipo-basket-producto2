import { Injectable, Inject } from '@angular/core'; // 1. Añadimos Inject aquí
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

   // 2. Usamos @Inject(Firestore) antes del parámetro
  constructor(@Inject(Firestore) private firestore: Firestore) {}

  getPlayers(): Observable<any[]> {
    const ref = collection(this.firestore, 'players');
    return collectionData(ref, { idField: 'id' });
  }

  deletePlayer(id: string) {
    const playerDoc = doc(this.firestore, `players/${id}`);
    return deleteDoc(playerDoc);
  }
}