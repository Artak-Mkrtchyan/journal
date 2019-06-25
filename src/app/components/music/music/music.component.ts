import { Component, OnInit } from '@angular/core';

import { NapsterService } from '@service/napster.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  constructor(private napsterService: NapsterService) {
    this.napsterService.loadTracks();
  }

  ngOnInit() {}
}
