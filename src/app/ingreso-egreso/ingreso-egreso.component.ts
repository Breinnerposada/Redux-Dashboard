import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egresos.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { isLoading, stopLoading } from '../shared/ui-redux/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  formIngreso: FormGroup;
  type: string = 'ingreso'
  constructor( private fb : FormBuilder, private _ingresoEgreso: IngresoEgresoService, private store: Store<AppState> ) {
    this.formIngreso = this.fb.group({
      description: ['',Validators.required],
      monto: [0, Validators.required]
    })
  }

  ngOnInit() {
  }


  save(){
    this.store.dispatch( isLoading() );
    const { description, monto } = this.formIngreso.value;
    const ingresoEgreso: IngresoEgreso = new IngresoEgreso( description, monto, this.type)

    this._ingresoEgreso.crearIngresoEgreso( ingresoEgreso )
    .then( (ref) => {
      this.formIngreso.reset();
      this.store.dispatch( stopLoading() );
      Swal.fire('Registro creado con exito', description , 'success');
    })
    .catch(err => {
      this.store.dispatch( stopLoading() );
      Swal.fire('Upss', 'ha ocurrido un error agregando' + description , 'error')}
    )

  }
}
