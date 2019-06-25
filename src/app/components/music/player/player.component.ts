import { Component, OnInit } from '@angular/core';

import { PlayerService } from '@service/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  playerState;
  progressValue = 0;
  name = 'Select song';
  volumeOff = false;
  music = new Audio();
  isLoaded = false;
  duration: number;
  currentTrackIndex: number;

  constructor(private playerService: PlayerService) {
    this.playerService.getPlayerState().subscribe(playerState => {
      this.playerState = playerState;
      this.isLoaded = playerState.artistInfo ? true : false;
    });

    this.playerService
      .getPlayerTrackName()
      .subscribe(({ songName, currentTrackIndex }) => {
        if (this.currentTrackIndex !== currentTrackIndex) {
          this.resetPlayer();
        }
        this.currentTrackIndex = currentTrackIndex;
        if (songName && this.playerState.activePlaylist) {
          this.music.src = this.playerState.activePlaylist[
            currentTrackIndex
          ].previewURL;
          this.music.preload = 'metadata';
        }
      });

    this.music.onloadedmetadata = () => {
      this.duration = this.music.duration;
    };
  }

  resetPlayer() {
    this.music.currentTime = 0;
    this.progressValue = 0;
  }

  getVolumeIcon() {
    const pS = this.playerState;

    const volumeUp = pS.volume >= 0.7 ? 'volume_up' : false;
    const volumeDown =
      pS.volume >= 0.3 && pS.volume < 0.7 ? 'volume_down' : false;
    const volumeMute =
      pS.volume <= 0.29 && pS.volume !== 0.0 ? 'volume_mute' : false;
    const volumeOff =
      pS.volume === 0.0 || this.volumeOff ? 'volume_off' : false;
    const resultIcon = volumeOff || volumeDown || volumeUp || volumeMute;

    return resultIcon;
  }

  changeVolume(event: { value: number }) {
    this.music.volume = event.value;
    this.playerService.setVolume(event.value);
  }

  setCurrentTime(event: { value: number }) {
    const currentTime = (this.music.duration / 100) * event.value;
    this.music.currentTime = currentTime;
  }

  togglePlay() {
    this.playerService.switchSongStatus();
  }

  toggleVolume() {
    this.volumeOff = !this.volumeOff;
    return this.music.volume !== 0
      ? (this.music.volume = 0)
      : (this.music.volume = this.playerState.volume);
  }

  togglePlayerStatus() {
    this.playerService.togglePlayerStatus();
  }

  nextSong() {
    this.playerService.nextSong();
  }

  previousSong() {
    this.playerService.previousSong();
  }

  ngOnInit() {
    this.playerService.getPlayerStatus().subscribe(({ isPlay, name }) => {
      this.name = name;
      return isPlay ? this.music.play().catch(() => {}) : this.music.pause();
    });

    this.music.ontimeupdate = () => {
      if (!this.music.paused) {
        if (this.progressValue !== 0 && this.music.currentTime === 0) {
          this.music.currentTime = (this.duration / 100) * this.progressValue;
        }
        this.progressValue = this.music.currentTime / (this.duration / 100);
      }
    };

    this.music.onended = () => {
      this.playerService.stopSong();
      this.resetPlayer();
    };
  }
}
