import { IPlaylist } from '@models/playlist.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { SetPlaylist } from '@store/actions/playlist.actions';
import { IAppState } from '@store/state/app.state';

import { selectPlaylist } from '@store/selectors/playlist.selector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(private store: Store<IAppState>, private http: HttpClient) {}

  loadTracks() {
    this.http
      .get(
        'http://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10'
      )
      .subscribe((response: { tracks: Array<object> }) => {
        console.log(response);
        this.setPlaylist(response.tracks);
      });
  }

  getPlaylist(): Observable<IPlaylist> {
    return this.store.select(selectPlaylist);
  }

  setPlaylist(playlist: Array<object>) {
    this.store.dispatch(new SetPlaylist(playlist));
  }
}
