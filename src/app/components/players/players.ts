import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPlayersPipe } from '../../pipes/filterPlayers.pipe';
import { PlayersService } from '../../services/players.service';  // 👈 Importa tu servicio
import { Observable } from 'rxjs';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPlayersPipe],
  templateUrl: './players.html',
  styleUrls: ['./players.css']
})
export class PlayersComponent implements OnInit{
  
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
    // Cargamos los jugadores desde Firebase al arrancar (forma dinamica de acceso)
    this.players$ = this.playersService.getPlayers();
    // Añade esto para espiar qué llega de Firebase:
    this.players$.subscribe(data => console.log('Datos de Firebase:', data));
  }
 
  // Método para seleccionar un jugador y emitir el evento
  selectPlayer(player: any) {
    this.playerSelected.emit(player);
  }

  // Método para borrar un jugador  
  async deletePlayer(id: string) {
  if (confirm('¿Estás seguro de que quieres eliminar este jugador?')) {
      try {
        await this.playersService.deletePlayer(id);
        console.log('Jugador eliminado');
        // La lista se actualiza sola gracias al Observable
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  }
}