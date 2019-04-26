import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.post('api/user/profile', {}).subscribe(
      data => console.log(data)
    );
  }

}
