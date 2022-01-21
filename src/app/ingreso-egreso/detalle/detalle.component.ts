import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egresos.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import { isLoading, stopLoading } from 'src/app/shared/ui-redux/ui.actions';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../redux/ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[];
  detalleSubscription: Subscription
  constructor( private store: Store<AppStateWithIngreso>, private _ingresoEgreso: IngresoEgresoService) { }

  ngOnInit() {
   this.detalleSubscription =  this.store.select('ingresoEgreso').subscribe( ({items}) => this.ingresosEgresos = items)
  }

  ngOnDestroy(): void {
      this.detalleSubscription.unsubscribe()
  }

  delete(uid:string){
    this.store.dispatch( isLoading() )
    this._ingresoEgreso.deleteIngresoEgreso( uid )
    .then( () => {
      this.store.dispatch( stopLoading() )
      Swal.fire('Borrado correctamente', uid , 'success')
    })
    .catch( err => {
      this.store.dispatch( stopLoading() )
      Swal.fire('Error!', 'No se pudo borra el item: ' + uid , 'error')
    })
  }
}
