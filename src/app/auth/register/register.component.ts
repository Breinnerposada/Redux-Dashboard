import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registroFomrGroup: FormGroup;
  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router) { }

  ngOnInit() {
      this.registroFomrGroup = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      })
  }


  createUser(){

    if(this.registroFomrGroup.invalid){return;}
    const {name,email,password} = this.registroFomrGroup.value;

    this._authService.createUser(name,email,password).then( credentials => {
      debugger
      this.router.navigate(['/'])
    })
    .catch(err => console.error(err))

  }

}
