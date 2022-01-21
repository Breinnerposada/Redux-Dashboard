import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egresos.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    if(items){
      return items.sort((a,b) => {
        if(a.type === 'ingreso'){
          return 1;
        }else {
          return 1;
        }
      });
    }

  }

}
