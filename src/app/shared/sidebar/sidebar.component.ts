import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from '../ui.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  currentUser;
  currentUserSuscription: Subscription;
  constructor(private _auth: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.currentUserSuscription = this.store.select('auth')
    .subscribe( ({user}) => this.currentUser = user)
  }

  ngOnDestroy(): void {
      this.currentUserSuscription.unsubscribe()
  }

  logout(){
    this.store.dispatch( isLoading() )
    this._auth.closeSession().then( () => {
    this.store.dispatch( stopLoading() )
      this.router.navigate(['/login'])
    } )
  }
}
