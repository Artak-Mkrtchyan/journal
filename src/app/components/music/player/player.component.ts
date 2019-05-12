import { SetVolume } from './../../../store/actions/player.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { PlayerService } from '@service/player.service';

import { IPlayer } from '@models/player.interface';
import { IAppState } from '@store/state/app.state';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  playerState: IPlayer;
  progressValue = 0;
  name = '';
  duration = 0;

  music = new Audio();

  constructor(
    private playerService: PlayerService,
    private store: Store<IAppState>
  ) {
    this.playerService.getPlayerState().subscribe((player: IPlayer) => {
      console.log(player);
      this.playerState = player;
    });
  }

  changeVolume(event: {value: number}) {
    console.log('chnged', event.value);

    this.music.volume = event.value * 0.01;
    this.store.dispatch(new SetVolume(event.value));
  }

  load() {
    this.name = this.playerState.file.name;
    const reader = new FileReader();
    reader.readAsDataURL(this.playerState.file);
    reader.onload = () => {
      this.music.src = reader.result as string;
      this.music.ontimeupdate = () => {
        this.progressValue = this.music.currentTime / (this.music.duration / 100);
      };

    };
  }

  startPlayer() {
    this.music.play();
    this.playerService.startPlayer();
  }

  stopPlayer() {
    this.music.pause();
    this.playerService.stopPlayer();
  }

  openPlayer() {
    this.playerService.openPlayer();
  }

  closePlayer() {
    this.playerService.closePlayer();
  }

  ngOnInit() {}
}
