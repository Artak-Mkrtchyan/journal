import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private http: HttpClient,  private router: Router) { }

  ngOnInit() {
    this.http.get('api/user/logout').pipe(map((data: any) => {
        console.log(data);
        this.router.navigate(['/']);
        return;
    }))
  }

}
