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
  
  searchTrack() {
    this.napsterService.loadSearchTracks(this.search.value);
  }

  ngOnInit() {}
}
