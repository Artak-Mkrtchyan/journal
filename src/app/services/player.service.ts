import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectPlayer } from '@store/selectors/player.selector';

import { IAppState } from '@store/state/app.state';
import { IPlayer } from '@models/player.interface';
import {
  TogglePlayerStatus,
  LoadLocalFile,
  SwitchSongStatus,
  // SetCurrentTime,
  SetVolume
} from '@store/actions/player.actions';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private store: Store<IAppState>,
    private http: HttpClient
  ) {}

  getPlayerState(): Observable<IPlayer> {
    return this.store.select(selectPlayer);
  }

  setAudioFile(file: File, fileData: string) {
    this.store.dispatch(new LoadLocalFile(file));

    this.http.post('api/player', { file: fileData })
      .subscribe(
          (data: any) => {
              console.log('Subscribe data', data);
          }
      );

  }

  setVolume(volumeValue: number) {
    this.store.dispatch(new SetVolume(volumeValue));
  }

  // setCurrentTime(currentTime: number) {
  //   this.store.dispatch(new SetCurrentTime(currentTime));
  // }

  switchSongStatus() {
    this.store.dispatch(new SwitchSongStatus());
  }

  togglePlayerStatus() {
    this.store.dispatch(new TogglePlayerStatus());
  }
}
