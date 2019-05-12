import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectPlayer } from '@store/selectors/player.selector';

import { IAppState } from '@store/state/app.state';
import { IPlayer } from '@models/player.interface';
import { OpenPlayer, ClosePlayer, StartPlayer, StopPlayer } from '@store/actions/player.actions';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private store: Store<IAppState>
  ) {}

  getPlayerState(): Observable<IPlayer> {
    return this.store.select(selectPlayer);
  }

  startPlayer() {
    this.store.dispatch(new StartPlayer());
  }

  stopPlayer() {
    this.store.dispatch(new StopPlayer());
  }

  openPlayer() {
    this.store.dispatch(new OpenPlayer());
  }

  closePlayer() {
    this.store.dispatch(new ClosePlayer());
  }
}
