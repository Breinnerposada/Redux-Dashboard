
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth, public fireStore: AngularFirestore){}

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
      console.log(fuser?.uid);
      console.log(fuser?.email);
    })
  }


  isAuth(){
    return this.auth.authState.pipe(map(fbUser => fbUser != null));
  }
}
