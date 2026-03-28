import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PLAYERS } from '../../data/players';
import { FilterPlayersPipe } from '../../pipes/filterPlayers.pipe';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPlayersPipe],
  templateUrl: './players.html',
  styleUrls: ['./players.css']
})
export class PlayersComponent {
  players = PLAYERS;

  search = '';
  positionFilter = '';
  ageFilter: number | null = null;
  teamFilter = '';

  @Output() playerSelected = new EventEmitter<any>();

  selectPlayer(player: any) {
    this.playerSelected.emit(player);
  }
}