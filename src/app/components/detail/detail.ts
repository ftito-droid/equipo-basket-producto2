import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayersService } from '../../services/players.service';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail.html',
  styleUrls: ['./detail.css']
})
export class DetailComponent implements OnChanges {
  @Input() selectedPlayer: any = null;
  @Output() clearSelection = new EventEmitter<void>();


  editando: boolean = false;
  playerEditado: any = {};
  constructor(private playersService: PlayersService) {}


  ngOnChanges(changes: SimpleChanges): void {
  if (changes['selectedPlayer'] && this.selectedPlayer) {
    document.documentElement.style.setProperty('--color1', this.selectedPlayer.color1);
    document.documentElement.style.setProperty('--color2', this.selectedPlayer.color2);

    this.playerEditado = { ...this.selectedPlayer };
  }
}


  onClearSelection(): void {
    this.clearSelection.emit();
  }


  onEdit(): void {
  this.editando = true;
  this.playerEditado = { ...this.selectedPlayer };
  alert('Modo edición activado');
}

  async onSave(): Promise<void> {
  try {
    await this.playersService.updatePlayer(this.selectedPlayer.id, {
      nombre: this.playerEditado.nombre,
      apellidos: this.playerEditado.apellidos,
      posicion: this.playerEditado.posicion,
      edad: this.playerEditado.edad,
      altura: this.playerEditado.altura,
      equipo: this.playerEditado.equipo
    });

    this.editando = false;
    alert('Cambios guardados');
  } catch (error) {
    console.error('Error al guardar:', error);
    alert('Error al guardar los cambios');
  }
}


  onCancel(): void {
  this.editando = false;
  this.playerEditado = { ...this.selectedPlayer };
  alert('Edición cancelada');
  }
}
