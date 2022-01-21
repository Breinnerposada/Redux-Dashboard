import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egresos.model';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';
import { ChartData, ChartType } from 'chart.js';@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {
  ingresos:number = 0;
  egresos:number = 0;

  totalIngresos:number = 0;
  totalEgresos:number = 0;

  public doughnutChartLabels: string[] = ['Egresos','Ingresos' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: []
  };
  public doughnutChartType: ChartType = 'doughnut';
  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    Swal.showLoading()
    this.store.select('ingresoEngreso')
      .subscribe( ({items}) => this.generarEstadisticas(items) )
  }

  generarEstadisticas(items:IngresoEgreso[]){

    this.totalIngresos = 0;
    this.ingresos = 0
    this.egresos = 0;
    this.totalEgresos = 0;

    for (const iterator of items) {
        if( iterator.type === 'ingreso'){
          this.totalIngresos += iterator.monto;
          this.ingresos ++;
        }else{
          this.totalEgresos += iterator.monto;
          this.egresos ++;
        }
    }

    this.doughnutChartData.datasets = [ { data: [ this.totalEgresos, this.totalIngresos]} ]

    this.store.dispatch( stopLoading() )
    Swal.close()


  }

}
