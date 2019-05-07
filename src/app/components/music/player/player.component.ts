import { Component, OnInit } from '@angular/core';

import { PlayerService } from './../../../services/player.service';

import { IPlayer } from './../../../models/player.interface';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  playerState: IPlayer;

  constructor(
    private playerService: PlayerService
  ) {
    this.playerService.getPlayerState().subscribe((player: IPlayer) => {
      console.log(player);
      this.playerState = player;
    });
  }

  getPlayerState() {
    this.playerService.getPlayerState().subscribe((player: IPlayer) => {
      console.log(player);
    });
  }

  startPlayer() {
    this.playerService.startPlayer();
  }

  stopPlayer() {
    this.playerService.stopPlayer();
  }

  openPlayer() {
    this.playerService.openPlayer();
  }

  closePlayer() {
    this.playerService.closePlayer();
  }

  ngOnInit() {
    console.log(this.playerState);
  }

}
