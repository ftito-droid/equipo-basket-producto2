import { Component } from '@angular/core';
import { PlayersComponent } from './components/players/players';
import { DetailComponent } from './components/detail/detail';
import { MediaComponent } from './components/media/media';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PlayersComponent, DetailComponent, MediaComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  selectedPlayer: any = null;

  onPlayerSelected(player: any) {
    this.selectedPlayer = player;
  }
  
  onClearSelection() {
    this.selectedPlayer = null;
  }
}