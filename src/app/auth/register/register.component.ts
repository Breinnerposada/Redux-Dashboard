import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/shared/ui-redux/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  loading: boolean;
  registroFomrGroup: FormGroup;
  uiSubscription: Subscription

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
      this.registroFomrGroup = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      })
    this.uiSubscription = this.store.select('ui').subscribe( ({isLoading}) => this.loading = isLoading  )

  }



   ngOnDestroy(){
     this.uiSubscription.unsubscribe()
   }



  createUser(){

    if(this.registroFomrGroup.invalid){return;}
    this.store.dispatch( isLoading() )

    const {name,email,password} = this.registroFomrGroup.value;

    this._authService.createUser(name,email,password).then( credentials => {
      this.store.dispatch( stopLoading())
      this.router.navigate(['/'])
    })
    .catch(err => {
      this.store.dispatch( stopLoading())
      console.error(err)
    })

  }

}
