import { Component, OnInit, Input } from '@angular/core';

import { NapsterService } from '@service/napster.service';
import { PlayerService } from '@service/player.service';

// неработает переключение трека

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
  }
}
