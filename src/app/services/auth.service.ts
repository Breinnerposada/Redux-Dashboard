
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../auth/auth.actions';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;

  constructor( public auth: AngularFireAuth, public fireStore: AngularFirestore, private store: Store<AppState>){}

  createUser( name: string, email: string, password : string){
    return this.auth.createUserWithEmailAndPassword(email,password)
    .then( ({ user: { uid ,email} }) => {

      const newUser = new User(  uid, name, email );
      debugger
      return this.fireStore.doc(`${uid}/usuario`)
        .set( { ...newUser } )
    })
  }


  loginUser(email: string, password : string){
    return this.auth.signInWithEmailAndPassword(email,password)
  }

  closeSession(){
   return this.auth.signOut();
  }


  initAuthListener(){
    this.auth.authState.subscribe( fuser => {
      if(fuser){

       this.userSubscription = this.fireStore.doc(`${fuser.uid}/usuario`).valueChanges()

        .subscribe( (fireUser: any) => {

          const user = User.fromFirebase( fireUser )
          this.store.dispatch( setUser ( { user } ))

        })
      }
      else{
        this.userSubscription.unsubscribe()
        this.store.dispatch( unSetUser() )

      }
    })
  }


  isAuth(){
    return this.auth.authState.pipe(map(fbUser => fbUser != null));
  }
}
