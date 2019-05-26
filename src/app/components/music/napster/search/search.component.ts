// import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { NapsterService } from '@service/napster.service';

@Component({
  selector: 'app-napster-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
