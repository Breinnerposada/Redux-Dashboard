
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../auth/redux/auth.actions';
import { unSetItem } from '../ingreso-egreso/redux/ingreso-egreso.actions';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: User;
  userSubscription: Subscription;

  get user() {
    return {...this._user};
  }

  constructor( public auth: AngularFireAuth, public fireStore: AngularFirestore, private store: Store<AppState>){}

  createUser( name: string, email: string, password : string){
    return this.auth.createUserWithEmailAndPassword(email,password)
    .then( ({ user: { uid ,email} }) => {

      const newUser = new User(  uid, name, email );

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
          this._user = user;
          this.store.dispatch( setUser ( { user } ))

        })
      }
      else{
        this._user = null;
        this.userSubscription?.unsubscribe()
        this.store.dispatch( unSetUser() )
        this.store.dispatch( unSetItem() )

      }
    })
  }


  isAuth(){
    return this.auth.authState.pipe(map(fbUser => fbUser != null));
  }
}
