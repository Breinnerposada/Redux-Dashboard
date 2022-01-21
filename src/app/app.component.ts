import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { AppState } from './app.reducer';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private auth: AuthService, private store: Store<AppState>){
    this.auth.initAuthListener()
    this.store.select('ui').subscribe({
      next: ({isLoading}) => isLoading ?
      Swal.showLoading()
      : Swal.close() ,
      error: (err) => console.error(err)
   })

  }

}
