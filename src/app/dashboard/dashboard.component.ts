import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setItem } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSuscription: Subscription;
  ingresosSuscription: Subscription;
  constructor(private store: Store<AppState>, private ingresoEgreso: IngresoEgresoService) { }

  ngOnInit() {
    this.userSuscription = this.store.select('auth')
    .pipe(filter( auth => auth.user !== null ))
    .subscribe( ({ user: { uid } }) => {
    this.ingresosSuscription = this.ingresoEgreso.getIngresoEgreso( uid )
      .subscribe(( ingresosEgresosFB ) => {
        this.store.dispatch( setItem( { items: ingresosEgresosFB } ) )
      })
     })
  }

  ngOnDestroy(): void {
      this.userSuscription.unsubscribe()
      this.ingresosSuscription.unsubscribe()
  }

}
