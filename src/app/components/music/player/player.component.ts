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

  constructor(
    private playerService: PlayerService
  ) {
    this.playerService.getPlayerState().subscribe((player: IPlayer) => {
      console.log(player);
      this.playerState = player;

    });
  }

  getVolumeIcon() {
    const pS = this.playerState;

    const volumeUp = pS.volume >= 0.70 ? 'volume_up' : false;
    const volumeDown = pS.volume >= 0.30 && pS.volume < 0.70 ? 'volume_down' : false;
    const volumeMute = pS.volume <= 0.29 && pS.volume !== 0.00 ? 'volume_mute' : false;
    const volumeOff = pS.volume === 0.00 || this.volumeOff ? 'volume_off' : false;

    const resultIcon =  volumeOff || volumeDown || volumeUp || volumeMute;

    return resultIcon;
  }

  changeVolume(event: {value: number}) {
    this.music.volume = event.value;
    // this.store.dispatch(new SetVolume(event.value));
    this.playerService.setVolume(event.value);
  }

  setCurrentTime(event: {value: number}) {
    // console.log('123456', event);
    // this.progressValue = this.music.currentTime / (this.music.duration / 100);
    const currentTime = (this.music.duration / 100) * event.value;
    // this.playerService.setCurrentTime(currentTime);
    this.music.currentTime = currentTime;
  }

  load() {
    this.name = this.playerState.file.name;
    const reader = new FileReader();
    this.togglePlayerStatus();
    reader.readAsDataURL(this.playerState.file);
    reader.onload = () => {
      this.music.src = reader.result as string;
      this.music.ontimeupdate = () => {
        console.log(this.progressValue, this.music.currentTime);
        // this.playerService.setCurrentTime(this.music.currentTime);
        this.progressValue = this.music.currentTime / (this.music.duration / 100);
      };
    };
  }

  togglePlay() {
    this.playerService.switchSongStatus();

    return this.music.paused ? this.music.play() : this.music.pause();
  }

  toggleVolume() {
    console.log(this.music.volume);
    this.volumeOff = !this.volumeOff;
    return (this.music.volume !== 0) ? this.music.volume = 0 : this.music.volume = this.playerState.volume;
  }

  togglePlayerStatus() {
    this.playerService.togglePlayerStatus();
  }

  ngOnInit() {}
}
