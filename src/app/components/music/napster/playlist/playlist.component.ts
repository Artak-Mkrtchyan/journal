import { Component, OnInit, Input } from '@angular/core';

import { NapsterService } from '@service/napster.service';
import { PlayerService } from '@service/player.service';

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
  ) {}

  togglePlayTrack(indexTrack: number, isPlay: boolean) {
    this.napsterService.setSong(this.tracks[indexTrack]);

    this.playerService.setTrackIndex(indexTrack);

    return isPlay
      ? this.playerService.playSong()
      : this.playerService.stopSong();
  }

  ngOnInit() {
    this.napsterService.getPlaylist().subscribe(playlist => {
      this.tracks = this.isSearchPlaylist
        ? playlist.topTracks
        : playlist.searchTracks;
    });
    this.playerService.getPlayerStatus().subscribe(({ isPlay, name }) => {
      this.isPlay = isPlay;
      this.name = name;
    });
  }
}
