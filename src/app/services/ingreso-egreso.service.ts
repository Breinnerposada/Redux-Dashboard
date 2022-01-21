import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egresos.model';
import { AuthService } from './auth.service';
import { doc, setDoc } from "firebase/firestore/bundle";
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { map } from 'rxjs/operators';
import { setItem } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  constructor( private fireStore: AngularFirestore, private auth: AuthService, private store: Store<AppState>) { }


  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ){
    const uid = this.auth.user.uid
    const path = `${ uid }/ingresos-egresos`;
    return this.fireStore.doc(path)
      .collection('items')
        .add( {
          description: ingresoEgreso.description,
          monto: ingresoEgreso.monto,
          type: ingresoEgreso.type,
        })
  }


  getIngresoEgreso( uid: string ){
   return this.fireStore.collection(`${uid }/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map( snapshot => snapshot.map( doc => ({
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any
          })
        ))
      )
  }


  deleteIngresoEgreso( uid: string ){
    const uidUser = this.auth.user.uid
    return this.fireStore.doc(`${uidUser}/ingresos-egresos/items/${uid}`)
      .delete()
  }


}
