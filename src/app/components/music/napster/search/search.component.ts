// import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { PlaylistService } from '@service/playlist.service';

@Component({
  selector: 'app-napster-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit {
  songs;
  info;
  music = new Audio();

  constructor(
    private http: HttpClient,
    private playlistService: PlaylistService
  ) {
    this.playlistService.loadTracks();
    // this.http
    //   .get(
    //     'http://api.napster.com/v2.2/tracks/tra.5156528?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4'
    //   )
    //   .subscribe(info => {
    //     console.log(info);
    //   });
  }

  ngOnInit() {
    this.playlistService
      .getPlaylist()
      .subscribe(playlist => console.log(playlist));
    // this.http
    //   .get(
    //     'http://api.napster.com/v2.2/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4'
    //   )
    //   .subscribe(info => {
    //     console.log(info);
    //   });
  }
}
