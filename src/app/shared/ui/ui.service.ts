import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private store: Store<AppState>) {

  }


  error(error){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
    })
    Swal.hideLoading()
  }
}
