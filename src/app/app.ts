import { Component, inject } from '@angular/core';
import { PlayersComponent } from './components/players/players';
import { DetailComponent } from './components/detail/detail';
import { MediaComponent } from './components/media/media';
import { MessagingService } from './services/messaging.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PlayersComponent, DetailComponent, MediaComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  selectedPlayer: any = null;
  private messagingService = inject(MessagingService);

  constructor() {
    this.messagingService.listenMessages();
  }

  activateNotifications() {
    this.messagingService.requestPermission();
  }

  onPlayerSelected(player: any) {
    this.selectedPlayer = player;
  }

  onClearSelection() {
    this.selectedPlayer = null;
  }
}