import { Component, OnInit } from '@angular/core';

import { PlayerService } from '@service/player.service';

import { IPlayer } from '@models/player.interface';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  playerState: IPlayer;
  progressValue = 0;
  name = 'Select song';
  duration = 0;
  volumeOff = false;
  music = new Audio();

  constructor(private playerService: PlayerService) {
    this.playerService.getPlayerState().subscribe((player: IPlayer) => {
      this.playerState = player;
    });
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
    console.log(this.music.currentTime, this.music.src);

    return this.playerState.isPlay ? this.music.play() : this.music.pause();
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

  ngOnInit() {
    this.playerService.getPlayerTrackName().subscribe(songName => {
      console.log('changeStatus', songName);
      if (songName) {
        this.name = this.playerState.name;
        this.music.src = this.playerState.musicSrc as string;
        this.music.ontimeupdate = () => {
          this.progressValue =
            this.music.currentTime / (this.music.duration / 100);
        };
      }
    });
  }
}
