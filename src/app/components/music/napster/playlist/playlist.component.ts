import { IAppState } from '@store/state/app.state';
import { Component, OnInit } from '@angular/core';

import { NapsterService } from '@service/napster.service';
import { Store } from '@ngrx/store';
import { LoadSong } from '@store/actions/player.actions';

// неработает завершение трека
// и переключение

@Component({
  selector: 'app-napster-playlist',
  templateUrl: 'playlist.component.html',
  styleUrls: ['playlist.component.scss']
})
export class NapsterPlaylistComponent implements OnInit {
  music = new Audio();
  tracks = null;

  constructor(
    private napsterService: NapsterService,
    private store: Store<IAppState>
  ) {
    this.napsterService.loadTracks();
    // this.http
    //   .get(
    //     'http://api.napster.com/v2.2/tracks/tra.5156528?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4'
    //   )
    //   .subscribe(info => {
    //     console.log(info);
    //   });
  }

  toggleTrack(indexTrack: string) {
    this.store.dispatch(new LoadSong(this.tracks[indexTrack]));
  }

  ngOnInit() {
    this.napsterService.getPlaylist().subscribe(response => {
      console.log(response);
      this.tracks = response.tracks;
    });
    // this.http
    //   .get(
    //     'http://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4'
    //   )
    //   .subscribe(info => {
    //     console.log(info);
    //   });
  }
}
