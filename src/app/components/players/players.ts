import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPlayersPipe } from '../../pipes/filterPlayers.pipe';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPlayersPipe],
  templateUrl: './players.html',
  styleUrls: ['./players.css']
})
export class PlayersComponent implements OnInit {

  players: any[] = [];

  search = '';
  positionFilter = '';
  ageFilter: number | null = null;
  teamFilter = '';

  @Output() playerSelected = new EventEmitter<any>();

  constructor(private playersService: PlayersService) {}

  async ngOnInit() {
    this.players = await this.playersService.getPlayers();
  }

  selectPlayer(player: any) {
    this.playerSelected.emit(player);
  }
}
