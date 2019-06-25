import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  selectPlayer,
  selectPlayerTrackName,
  selectPlayerStatus
} from '@store/selectors/player.selector';

import { IAppState } from '@store/state/app.state';
import { IPlayer } from '@models/player.interface';
import {
  TogglePlayerStatus,
  LoadSong,
  SwitchSongStatus,
  SetVolume,
  PlaySong,
  StopSong,
  NextSong,
  PreviousSong,
  SetCurrentPlaylistIndex
} from '@store/actions/player.actions';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private store: Store<IAppState>, private http: HttpClient) {}

  getPlayerState(): Observable<any> {
    return this.store.select(selectPlayer);
  }

  getPlayerStatus() {
    return this.store.select(selectPlayerStatus);
  }

  setAudioFile(file: File, musicSrc: string | ArrayBuffer) {
    const name = file.name.split('.')[0];
    const fileData = (musicSrc as string).split(',')[1];
    this.store.dispatch(new LoadSong({ name, musicSrc }));
    this.http.post('api/player', { name, fileData }).subscribe((data: any) => {
      console.log('Subscribe data', data);
    });
  }

  setTrackIndex(trackIndex: number) {
    this.store.dispatch(new SetCurrentPlaylistIndex(trackIndex));
  }

  nextSong() {
    this.store.dispatch(new NextSong());
  }

  previousSong() {
    this.store.dispatch(new PreviousSong());
  }

  setVolume(volumeValue: number) {
    this.store.dispatch(new SetVolume(volumeValue));
  }

  playSong() {
    this.store.dispatch(new PlaySong());
  }

  stopSong() {
    this.store.dispatch(new StopSong());
  }

  switchSongStatus() {
    this.store.dispatch(new SwitchSongStatus());
  }

  getPlayerTrackName() {
    return this.store.select(selectPlayerTrackName);
  }

  togglePlayerStatus() {
    this.store.dispatch(new TogglePlayerStatus());
  }
}
