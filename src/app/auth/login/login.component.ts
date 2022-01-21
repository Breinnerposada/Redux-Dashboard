import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/shared/ui/ui.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private UiService: UiService,
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }


  login(){
    if(this.loginForm.invalid){return }
    const {email,password} = this.loginForm.value;
    Swal.showLoading()
    this._authService.loginUser(email,password).then( credentials => {

      Swal.close()

      this.router.navigate(['/'])
    })
    .catch( err => this.UiService.error(err.message))
  }

}
