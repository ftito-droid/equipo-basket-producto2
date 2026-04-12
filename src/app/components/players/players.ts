import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
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
  private playersService = inject(PlayersService);

  // 2. Inicialización directa del Observable
  players$: Observable<any[]> = this.playersService.getPlayers();
   // Ahora usamos un Observable para los datos en tiempo real
  //players$!: Observable<any[]>;

  search = '';
  positionFilter = '';
  ageFilter: number | null = null;
  teamFilter = '';
  showNewPlayerForm = false; // Controla si se muestra el formulario para añadir un nuevo jugador

  // Datos del nuevo jugador que se añadirán a Firebase
  newPlayer = {
    nombre: '',
    apellidos: '',
    posicion: '',
    edad: null,
    altura: '',
    equipo: '',
    foto: '',
    video: '',
    color1: '',
    color2: '',
    logo: ''
  };

  successMessage = '';
  errorMessage = '';

  @Output() playerSelected = new EventEmitter<any>();

   // Inyectamos el servicio en el constructor
  //constructor(private playersService: PlayersService) {}
  constructor() {}

  ngOnInit() {
    // Cargamos los jugadores desde Firebase al arrancar (forma dinamica de acceso)
    //this.players$ = this.playersService.getPlayers();
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

// Método para mostrar el formulario de nuevo jugador
  openNewPlayerForm() {
    this.showNewPlayerForm = true;
  }

// Método para ocultar el formulario de nuevo jugador
  closeNewPlayerForm() {
    this.showNewPlayerForm = false;
  }


  // Método para guardar un nuevo jugador en Firebase
 async saveNewPlayer() {
  this.errorMessage = '';

  if (!this.newPlayer.nombre.trim() || !this.newPlayer.apellidos.trim() || !this.newPlayer.posicion.trim()) {
    this.errorMessage = 'Debes completar los campos obligatorios: nombre, apellidos y posición.';
    return;
  }

  const playerToSave = { ...this.newPlayer };

  this.newPlayer = {
    nombre: '',
    apellidos: '',
    posicion: '',
    edad: null,
    altura: '',
    equipo: '',
    foto: '',
    video: '',
    color1: '',
    color2: '',
    logo: ''
  };

  this.showNewPlayerForm = false;

  try {
    await this.playersService.addPlayer(playerToSave);
    alert('Jugador añadido correctamente');
  } catch (error) {
    alert('Error al añadir jugador');
    console.error(error);
  }
}

  // Método para seleccionar la foto y guardar su ruta
  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.newPlayer.foto = `assets/images/${file.name}`;
    }
  }

  // Método para seleccionar el vídeo y guardar su ruta
  onVideoSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.newPlayer.video = `assets/videos/${file.name}`;
    }
  }

}