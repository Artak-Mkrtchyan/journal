import { LoadSong } from '../store/actions/player.actions';
import { IPlaylist } from '@models/playlist.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SetPlaylist } from '@store/actions/playlist.actions';
import { IAppState } from '@store/state/app.state';
import { selectPlaylist } from '@store/selectors/playlist.selector';

@Injectable({
  providedIn: 'root'
})
export class NapsterService {
  constructor(private store: Store<IAppState>, private http: HttpClient) {}

  loadTracks() {
    this.http
      .get(
        'http://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=10'
      )
      .subscribe((response: { tracks: Array<any> }) => {
        console.log(response);
        this.setPlaylist(response.tracks);
        const {
          albumId,
          albumName,
          artistName,
          previewURL,
          name
        } = response.tracks[0];
        this.store.dispatch(
          new LoadSong({
            albumId,
            albumName,
            artistName,
            musicSrc: previewURL,
            name
          })
        );
      });
  }

  loadImageTrack(albId: string): Observable<any> {
    return this.http.get(
      `https://api.napster.com/imageserver/v2/albums/Alb.111750366/images/170x170.jpg`
    );
  }

  getPlaylist(): Observable<IPlaylist> {
    return this.store.select(selectPlaylist);
  }

  setPlaylist(playlist: Array<object>) {
    this.store.dispatch(new SetPlaylist(playlist));
  }
}
