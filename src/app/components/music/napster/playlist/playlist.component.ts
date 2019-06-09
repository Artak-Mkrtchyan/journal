import { Component, OnInit, Input } from '@angular/core';

import { NapsterService } from '@service/napster.service';
import { PlayerService } from '@service/player.service';

// неработает завершение трека
// и переключение

@Component({
  selector: 'app-napster-playlist',
  templateUrl: 'playlist.component.html',
  styleUrls: ['playlist.component.scss']
})
export class NapsterPlaylistComponent implements OnInit {
  @Input() isSearchPlaylist: boolean;
  tracks = null;
  isPlay: boolean;
  name: string;

  constructor(
    private napsterService: NapsterService,
    private playerService: PlayerService
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

  togglePlayTrack(indexTrack: number, isPlay: boolean) {
    this.napsterService.setSong(this.tracks[indexTrack]);

    return isPlay
      ? this.playerService.playSong()
      : this.playerService.stopSong();
  }

  ngOnInit() {
    this.napsterService.getPlaylist().subscribe(response => {
      this.tracks = this.isSearchPlaylist
        ? response.searchTracks
        : response.topTracks;
    });
    this.playerService.getPlayerStatus().subscribe(({ isPlay, name }) => {
      this.isPlay = isPlay;
      this.name = name;
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
