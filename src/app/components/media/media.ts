import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media.html',
  styleUrls: ['./media.css']
})
export class MediaComponent implements OnChanges {

  @Input() selectedPlayer: any = null;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPlayer']) {
      const videoElement = this.videoPlayer?.nativeElement;
      if (videoElement) {
        videoElement.load();
      }
    }
  }

  play() {
    this.videoPlayer.nativeElement.play();
  }

  pause() {
    this.videoPlayer.nativeElement.pause();
  }

  stop() {
    const video = this.videoPlayer.nativeElement;
    video.pause();
    video.currentTime = 0;
  }
}
