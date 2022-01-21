import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }


  error(error){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
    })
    Swal.hideLoading()
  }
}
