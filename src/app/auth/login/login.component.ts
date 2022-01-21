import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/shared/ui-redux/ui.actions';
import { UiService } from 'src/app/shared/ui/ui.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup

  loading: boolean;
  uiSubscription: Subscription
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private UiService: UiService,
    private store: Store<AppState>
    ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

  }

  ngOnInit() {
   this.uiSubscription = this.store.select('ui').subscribe( ({isLoading}) => this.loading = isLoading  )
  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe()
  }


  login(){
    if(this.loginForm.invalid){return }

    this.store.dispatch( isLoading() )

    const {email,password} = this.loginForm.value;


    this._authService.loginUser(email,password).then( credentials => {
      this.store.dispatch( stopLoading())
      this.router.navigate(['/'])
    })

    .catch( err => {
      this.store.dispatch( stopLoading())
      this.UiService.error(err.message)
    })
  }

}
