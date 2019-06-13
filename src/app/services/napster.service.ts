import { LoadSong } from '../store/actions/player.actions';
import { IPlaylist } from '@models/playlist.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  SetSearchPlaylist,
  SetTopPlaylist
} from '@store/actions/playlist.actions';
import { IAppState } from '@store/state/app.state';
import { selectPlaylist } from '@store/selectors/playlist.selector';

@Injectable({
  providedIn: 'root'
})
export class NapsterService {
  constructor(private store: Store<IAppState>, private http: HttpClient) {}

  loadSearchTracks(searchText: string) {
    this.http
      .get(
        `http://api.napster.com/v2.2/search/verbose?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&query=${searchText}`
      )
      .subscribe((response: any) => {
        // this.setPlaylist(response.tracks);
        this.setSearchPlaylist(response.search.data.tracks);
        // this.setSong(response.tracks[0]);
        console.log(response);
      });
  }

  loadTracks() {
    this.http
      .get(
        'http://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10'
      )
      .subscribe((response: { tracks: Array<any> }) => {
        this.setTopPlaylist(response.tracks);
        this.setSong(response.tracks[0]);
      });
  }

  setSong(track) {
    const { albumId, albumName, artistName, previewURL, name } = track;
    this.store.dispatch(
      new LoadSong({
        albumId,
        albumName,
        artistName,
        musicSrc: previewURL,
        name
      })
    );
  }

  getPlaylist(): Observable<IPlaylist> {
    return this.store.select(selectPlaylist);
  }

  setSearchPlaylist(playlist: Array<object>) {
    this.store.dispatch(new SetTopPlaylist(playlist));
  }

  setTopPlaylist(playlist: Array<object>) {
    this.store.dispatch(new SetSearchPlaylist(playlist));
  }
}
