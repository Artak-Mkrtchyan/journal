import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  SetSearchPlaylist,
  SetTopPlaylist
} from '@store/actions/playlist.actions';
import {
  LoadSong,
  SetCurrentPlaylistIndex,
  SetMaxPlaylistIndex,
  SetActivePlaylist
} from '@store/actions/player.actions';
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
      .subscribe(({ search }: any) => {
        const { tracks } = search.data;
        this.setSearchPlaylist(tracks);
        this.store.dispatch(
          new SetMaxPlaylistIndex('search', tracks.length - 1)
        );
      });
  }

  loadTracks() {
    this.http
      .get(
        'http://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10'
      )
      .subscribe(({ tracks }: any) => {
        this.setTopPlaylist(tracks);
        this.setSong(tracks[0]);
        this.store.dispatch(new SetCurrentPlaylistIndex(0));
        this.store.dispatch(new SetMaxPlaylistIndex('top', tracks.length - 1));

        this.store.dispatch(new SetActivePlaylist(tracks));
      });
  }

  setSong(track: any) {
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

  getPlaylist(): Observable<any> {
    return this.store.select(selectPlaylist);
  }

  setSearchPlaylist(playlist: Array<object>) {
    this.store.dispatch(new SetSearchPlaylist(playlist));
  }

  setTopPlaylist(playlist: Array<object>) {
    this.store.dispatch(new SetTopPlaylist(playlist));
  }
}
