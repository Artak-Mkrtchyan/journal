import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NapsterService } from '@service/napster.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-napster-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit {
  search = new FormControl('');

  constructor(private napsterService: NapsterService) {}
  // http://api.napster.com/v2.2/search/verbose?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&query=eminem
  searchTrack() {
    console.log(this.search.value);
    this.napsterService.loadSearchTracks(this.search.value);
  }

  ngOnInit() {}
}
