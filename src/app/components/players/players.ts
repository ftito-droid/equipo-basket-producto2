import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PLAYERS } from '../../data/players';
import { FilterPlayersPipe } from '../../pipes/filterPlayers.pipe';
import { PlayersService } from '../../services/players';  // 👈 Importa tu servicio
import { Observable } from 'rxjs';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPlayersPipe],
  templateUrl: './players.html',
  styleUrls: ['./players.css']
})
export class PlayersComponent {
  // players = PLAYERS;
   // Ahora usamos un Observable para los datos en tiempo real
  players$!: Observable<any[]>;

  search = '';
  positionFilter = '';
  ageFilter: number | null = null;
  teamFilter = '';

  @Output() playerSelected = new EventEmitter<any>();

   // Inyectamos el servicio en el constructor
  constructor(private playersService: PlayersService) {}

  ngOnInit() {
    // Cargamos los jugadores desde Firebase al arrancar
    this.players$ = this.playersService.getPlayers();
  }

  selectPlayer(player: any) {
    this.playerSelected.emit(player);
  }

  // Método para borrar un jugador  
  async deletePlayer(id: string) {
    try {
      await this.playersService.deletePlayer(id);
      console.log('Jugador eliminado');
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  }
}