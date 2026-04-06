import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor() {}

  async getPlayers() {
    const ref = collection(db, 'players');
    const snapshot = await getDocs(ref);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
}
