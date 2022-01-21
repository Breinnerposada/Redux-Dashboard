import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this._auth.closeSession().then( () => this.router.navigate(['/login']) )
  }
}
